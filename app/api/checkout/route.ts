import { NextRequest, NextResponse } from 'next/server';

/**
 * Server-Side Paddle Transaction Minting Endpoint
 *
 * Calculates the exact charge in USD cents server-side based on the authoritative unit pricing curve ($100/domain).
 * Creates an ad-hoc immutable Paddle transaction with quantity: 1 attached to PADDLE_PRODUCT_ID.
 * Bypasses client catalog limits and quantity stepper manipulation.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const domainsRaw = body?.domains;

    // 1. Sanitize and clamp domain count: integer between 1 and 100
    const parsedDomains = parseInt(String(domainsRaw), 10);
    const clampedDomains = Math.min(100, Math.max(1, isNaN(parsedDomains) ? 10 : parsedDomains));

    // 2. Authoritative server-side pricing curve ($100 USD per domain = 10,000 cents per domain)
    const unitPriceUsd = 100;
    const totalUsd = clampedDomains * unitPriceUsd;
    const totalCents = totalUsd * 100;

    const apiKey = process.env.PADDLE_API_KEY;
    if (!apiKey) {
      console.error('[Paddle API /api/checkout] Missing PADDLE_API_KEY in server environment.');
      return NextResponse.json(
        {
          error: 'PADDLE_API_KEY is not configured on the server. Please set PADDLE_API_KEY in your environment.',
        },
        { status: 500 }
      );
    }

    // Determine environment (sandbox vs production)
    const isSandbox =
      process.env.PADDLE_ENV === 'sandbox' ||
      process.env.NEXT_PUBLIC_PADDLE_ENV === 'sandbox' ||
      Boolean(apiKey.startsWith('paddlesandbox_')) ||
      Boolean(process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN?.startsWith('test_'));

    const paddleBaseUrl = isSandbox
      ? 'https://sandbox-api.paddle.com'
      : 'https://api.paddle.com';

    const productId =
      process.env.PADDLE_PRODUCT_ID ||
      process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID ||
      'pro_01kzwg1zzgxcwgfjfye4308vx0';

    if (!productId) {
      console.error('[Paddle Checkout] Missing PADDLE_PRODUCT_ID');
      return NextResponse.json(
        { error: 'Server configuration error: Product ID missing' },
        { status: 500 }
      );
    }

    // 3. Mint immutable Paddle transaction with ad-hoc price
    const transactionPayload = {
      items: [
        {
          quantity: 1,
          price: {
            description: `Dedicated Outbound Fleet — ${clampedDomains} Domains`,
            product_id: productId,
            unit_price: {
              amount: totalCents.toString(),
              currency_code: 'USD',
            },
            quantity: {
              minimum: 1,
              maximum: 1,
            },
          },
        },
      ],
      custom_data: {
        provision_domains: clampedDomains,
        expected_cents: totalCents,
      },
    };

    const paddleRes = await fetch(`${paddleBaseUrl}/transactions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionPayload),
    });

    const paddleData = await paddleRes.json();

    if (!paddleRes.ok) {
      console.error('[Paddle Transaction Error]', paddleData);
      return NextResponse.json(
        {
          error: paddleData.error?.message || 'Paddle transaction creation failed',
          details: paddleData.error,
        },
        { status: paddleRes.status }
      );
    }

    const transactionId = paddleData.data?.id || paddleData.id;
    return NextResponse.json({ transactionId });
  } catch (err: any) {
    console.error('[API Checkout Error]', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
