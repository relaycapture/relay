'use client'

/**
 * Paddle Checkout Configuration & Helper
 *
 * Implements server-side transaction minting architecture:
 * The frontend never passes catalog price IDs or mutable quantities directly to Paddle.
 * All pricing, product IDs, and quantity calculations are authoritatively performed by /api/checkout.
 */
const defaultToken = 'test_1f8686b5f0144f0c19f74bdef50';
const activeToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || defaultToken;

export const PADDLE_CONFIG = {
  clientToken: activeToken,
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || (activeToken.startsWith('test_') ? 'sandbox' : 'production'),
};

/**
 * Pre-initializes the Paddle v2 SDK on page load so overlay opens with zero latency.
 */
export function initPaddle() {
  if (typeof window === 'undefined') return;
  const win = window as any;
  if (win.Paddle && win.Paddle.Checkout) return;

  const existingScript = document.getElementById('paddle-v2-sdk');
  if (!existingScript) {
    const script = document.createElement('script');
    script.id = 'paddle-v2-sdk';
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    script.onload = () => {
      try {
        if (win.Paddle) {
          if (PADDLE_CONFIG.environment === 'sandbox') {
            win.Paddle.Environment?.set('sandbox');
          }
          win.Paddle.Initialize({
            token: PADDLE_CONFIG.clientToken,
          });
        }
      } catch (e) {
        console.warn('Paddle initialization notice:', e);
      }
    };
    document.head.appendChild(script);
  }
}

/**
 * Mints an immutable server-side Paddle transaction and opens the overlay exclusively by transactionId.
 */
export async function openServerPaddleCheckout(domains: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const win = window as any;
  initPaddle();

  // 1. Authoritative server-side transaction minting
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domains }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Server returned HTTP ${res.status}`);
  }

  const data = await res.json();
  if (!data.transactionId) {
    throw new Error('No transactionId returned from server transaction minting');
  }

  // 2. Open Paddle using the transaction ID exclusively
  const triggerOpen = () => {
    if (win.Paddle && win.Paddle.Checkout && typeof win.Paddle.Checkout.open === 'function') {
      win.Paddle.Checkout.open({
        transactionId: data.transactionId,
        settings: {
          displayMode: 'overlay',
          theme: 'dark',
        },
      });
    } else {
      setTimeout(triggerOpen, 100);
    }
  };

  triggerOpen();
}

/**
 * Compatibility alias for callers passing domains
 */
export async function openPaddleCheckout(
  _priceId?: string,
  _planName?: string,
  customData?: Record<string, any>,
  quantity: number = 10
): Promise<void> {
  const domains = customData?.domainCount || quantity || 10;
  return openServerPaddleCheckout(domains);
}
