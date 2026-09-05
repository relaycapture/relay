import { NextRequest, NextResponse } from 'next/server';

/**
 * Authoritative Server-Side Transaction Verification Endpoint
 *
 * Verifies with Paddle API that a given transaction ID has been settled/completed.
 * Returns verified status, customer email, domains, and prepared Tally intake brief URL.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const txnId = searchParams.get('txn')?.trim();

    if (!txnId) {
      return NextResponse.json(
        { error: 'Missing txn parameter' },
        { status: 400 }
      );
    }

    // Security Hardening: Enforce strict Paddle transaction ID format to prevent SSRF or path traversal
    if (!/^txn_[a-zA-Z0-9]+$/.test(txnId)) {
      return NextResponse.json(
        { error: 'Invalid transaction ID format. Expected txn_[alphanumeric]' },
        { status: 400 }
      );
    }

    const rawApiKey = process.env.PADDLE_API_KEY;
    if (!rawApiKey) {
      return NextResponse.json(
        { error: 'Server configuration error: PADDLE_API_KEY missing' },
        { status: 500 }
      );
    }

    const apiKey = rawApiKey
      .trim()
      .replace(/^["']|["']$/g, '')
      .replace(/^Bearer\s+/i, '')
      .replace(/^["']|["']$/g, '')
      .trim();

    const isSandbox =
      process.env.PADDLE_ENV === 'sandbox' ||
      process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox' ||
      apiKey.startsWith('pdl_sdbx_') ||
      apiKey.startsWith('paddlesandbox_') ||
      Boolean(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.startsWith('test_'));

    const paddleBaseUrl = isSandbox
      ? 'https://sandbox-api.paddle.com'
      : 'https://api.paddle.com';

    const res = await fetch(`${paddleBaseUrl}/transactions/${txnId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return NextResponse.json(
        { verified: false, error: err.error?.message || 'Transaction not found' },
        { status: res.status }
      );
    }

    const json = await res.json();
    const transaction = json.data;
    const status = transaction?.status;

    // In Paddle Billing v2: 'completed' and 'billed' represent settled, paid transactions
    const isPaid = status === 'completed' || status === 'billed' || status === 'paid';

    // Extract customer email
    let email = transaction.customer?.email || transaction.billing_details?.email || '';
    if (!email && transaction.customer_id) {
      try {
        const custRes = await fetch(`${paddleBaseUrl}/customers/${transaction.customer_id}`, {
          headers: { 'Authorization': `Bearer ${apiKey}` },
        });
        if (custRes.ok) {
          const custJson = await custRes.json();
          email = custJson.data?.email || '';
        }
      } catch {
        // Fallback gracefully if customer lookup fails
      }
    }

    const customData = transaction.custom_data || {};
    const domains = Number(customData.provision_domains || 10);
    const totalCents = Number(transaction.details?.totals?.total || domains * 10000);

    const tallyUrl = new URL('https://tally.so/r/KYEpy8');
    if (email) tallyUrl.searchParams.set('email', email);
    tallyUrl.searchParams.set('txn', txnId);
    tallyUrl.searchParams.set('order_id', txnId);
    tallyUrl.searchParams.set('domains', String(domains));

    return NextResponse.json({
      verified: isPaid,
      status,
      transactionId: txnId,
      email,
      domains,
      totalCents,
      currency: transaction.currency_code || 'USD',
      tallyUrl: tallyUrl.toString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Verification exception' },
      { status: 500 }
    );
  }
}
