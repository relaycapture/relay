import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface IntakeDispatchPayload {
  transactionId: string;
  domains: number;
  expectedCents: number;
  settledCents: number;
  currency: string;
  customerEmail?: string;
  timestamp: string;
}

/**
 * In-memory idempotency cache for deduplicating webhook retries within the runtime process.
 * In a distributed multi-node / serverless cluster, persist transactionId with a UNIQUE primary key constraint
 * in your persistent database (PostgreSQL, Redis SETNX, DynamoDB, etc.) to drop duplicate executions.
 */
const processedTransactions = new Set<string>();

/**
 * Intake Dispatch & Provisioning Execution Handler
 * Dispatches verified orders directly to the infrastructure automation pipeline.
 * Enforces idempotency on payload.transactionId to guarantee single execution.
 */
async function dispatchIntakeProvisioning(payload: IntakeDispatchPayload) {
  if (processedTransactions.has(payload.transactionId)) {
    console.warn(
      `[Intake Dispatch] Duplicate transaction ${payload.transactionId} detected. Provisioning already initiated. Skipping duplicate.`
    );
    return {
      success: true,
      duplicate: true,
      jobId: `job_${payload.transactionId}`,
      dispatchedAt: payload.timestamp,
    };
  }

  // Record transaction ID in idempotency set
  processedTransactions.add(payload.transactionId);
  // Cap set size to avoid memory growth over long-running processes
  if (processedTransactions.size > 10000) {
    const [oldest] = processedTransactions;
    processedTransactions.delete(oldest);
  }

  console.log(
    `[Intake Dispatch] Initializing 48h SLA provisioning for ${payload.domains} domains (Transaction: ${payload.transactionId}, Subtotal: $${(payload.settledCents / 100).toFixed(2)})`
  );

  // Here the system initiates the automated DNS / registrar allocation and tenant invitation workflow.
  return {
    success: true,
    duplicate: false,
    jobId: `job_${payload.transactionId}`,
    dispatchedAt: payload.timestamp,
  };
}

/**
 * Paddle Cryptographic Webhook Receiver
 *
 * Verifies the raw request HMAC SHA-256 signature against PADDLE_WEBHOOK_SECRET.
 * Authoritatively handles transaction.completed events, cross-verifies financial totals,
 * and triggers infrastructure provisioning.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signatureHeader = request.headers.get('paddle-signature');

    if (!signatureHeader) {
      return NextResponse.json(
        { error: 'Missing paddle-signature header' },
        { status: 400 }
      );
    }

    const secret = process.env.PADDLE_WEBHOOK_SECRET;
    if (!secret) {
      console.warn(
        '[Paddle Webhook Warning] PADDLE_WEBHOOK_SECRET is not configured in server environment.'
      );
      return NextResponse.json(
        { error: 'Server configuration error: Webhook secret missing' },
        { status: 500 }
      );
    }

    // 1. Parse ts and h1 components from paddle-signature header (format: "ts=1671552777; h1=0bc...")
    // Trim tokens to defend against reverse proxy whitespace normalization (Cloudflare / Vercel edge)
    const parts = signatureHeader.split(';');
    let ts: string | undefined;
    let h1: string | undefined;

    for (const part of parts) {
      const [rawKey, rawVal] = part.split('=');
      const key = rawKey?.trim();
      const val = rawVal?.trim();
      if (key === 'ts') ts = val;
      if (key === 'h1') h1 = val;
    }

    if (!ts || !h1) {
      return NextResponse.json(
        { error: 'Malformed paddle-signature header' },
        { status: 400 }
      );
    }

    // 2. Prevent replay attacks (5 minute threshold)
    const timestampSec = parseInt(ts, 10);
    const nowSec = Math.floor(Date.now() / 1000);
    if (isNaN(timestampSec) || Math.abs(nowSec - timestampSec) > 300) {
      return NextResponse.json(
        { error: 'Webhook timestamp outside tolerance window' },
        { status: 401 }
      );
    }

    // 3. Cryptographic HMAC SHA-256 Verification
    const signedPayload = `${ts}:${rawBody}`;
    const computedHmac = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex');

    const signatureBuffer = Buffer.from(h1, 'hex');
    const computedBuffer = Buffer.from(computedHmac, 'hex');

    if (
      signatureBuffer.length !== computedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, computedBuffer)
    ) {
      return NextResponse.json(
        { error: 'Invalid cryptographic webhook signature' },
        { status: 401 }
      );
    }

    // 4. Parse verified event payload
    const event = JSON.parse(rawBody);
    const eventType = event.event_type || event.eventType;

    if (eventType === 'transaction.completed') {
      const transaction = event.data;
      const transactionId = transaction?.id;

      // 5. Webhook Retry Race (Idempotency Protection)
      // Paddle webhooks have at-least-once delivery; short-circuit retried deliveries immediately
      if (transactionId && processedTransactions.has(transactionId)) {
        console.log(
          `[Paddle Webhook Idempotency] Duplicate transaction ${transactionId} received. Dropping retry cleanly.`
        );
        return NextResponse.json(
          { received: true, duplicate: true },
          { status: 200 }
        );
      }

      const customData = transaction.custom_data || {};
      const provisionDomains = Number(customData.provision_domains || 0);
      const expectedCents = Number(customData.expected_cents || 0);

      // Extract transaction subtotal to isolate raw engineering fee from sales tax / VAT
      // Paddle sends totals.subtotal as a decimal string e.g. "1000.00"
      const subtotalStr =
        transaction.details?.totals?.subtotal ||
        transaction.details?.totals?.total ||
        '0';
      const settledCents = Math.round(parseFloat(subtotalStr) * 100);

      // Validate payment integrity against expected cents
      if (expectedCents > 0 && settledCents < expectedCents) {
        console.error(
          `[Paddle Webhook Alert] Settlement mismatch for transaction ${transaction.id}. Settled: ${settledCents}¢, Expected: ${expectedCents}¢`
        );
        return NextResponse.json(
          { error: 'Settlement amount below expected value' },
          { status: 400 }
        );
      }

      // Trigger intake dispatch / provisioning logic using verified server domain count
      await dispatchIntakeProvisioning({
        transactionId: transaction.id,
        domains: provisionDomains,
        expectedCents,
        settledCents,
        currency: transaction.currency_code || 'USD',
        customerEmail: transaction.customer?.email,
        timestamp: event.occurred_at || new Date().toISOString(),
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: any) {
    console.error('[Paddle Webhook Exception]', err);
    return NextResponse.json(
      { error: 'Webhook processing exception', details: err.message },
      { status: 500 }
    );
  }
}
