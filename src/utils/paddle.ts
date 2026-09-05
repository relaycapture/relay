'use client'

/**
 * Paddle Checkout Configuration & Helper
 *
 * Supports both:
 * 1. Server-side transaction minting (when PADDLE_API_KEY is configured in production).
 * 2. Direct client token + priceId checkout (for sandbox testing and direct client flows).
 */
const defaultToken = 'live_045505a4686cb238475db57dfe0';
const rawToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || defaultToken;
const activeToken = rawToken.trim().replace(/^["']|["']$/g, '');

const rawPriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || 'pri_01m1q092mvmewcdyey2rs8w4tr';
const activePriceId = rawPriceId.trim().replace(/^["']|["']$/g, '');

export const PADDLE_CONFIG = {
  clientToken: activeToken,
  priceId: activePriceId,
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || (activeToken.startsWith('live_') ? 'production' : 'sandbox'),
};

/**
 * Global handler for Paddle checkout lifecycle events.
 * When payment completes and is verified, automatically redirects to the Engineering Intake Brief.
 */
function handlePaddleCheckoutEvent(event: any) {
  if (event && event.name === 'checkout.completed') {
    try {
      const data = event.data || {};
      const txnId = data.id || data.transaction_id || '';
      const email = data.customer?.email || '';
      const customData = data.custom_data || {};
      const domains = customData.provision_domains || '';

      const params = new URLSearchParams();
      if (txnId) {
        params.set('txn', txnId);
        params.set('order_id', txnId);
      }
      if (email) params.set('email', email);
      if (domains) params.set('domains', String(domains));

      const redirectUrl = `/intake?${params.toString()}`;
      window.location.href = redirectUrl;
    } catch (err) {
      console.error('[Paddle Checkout Redirect Error]', err);
      window.location.href = '/intake';
    }
  }
}

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
          if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
            win.Paddle.Environment.set('sandbox');
          }
          win.Paddle.Initialize({
            token: PADDLE_CONFIG.clientToken,
            eventCallback: handlePaddleCheckoutEvent,
          });
        }
      } catch (e) {
        console.warn('Paddle initialization notice:', e);
      }
    };
    document.head.appendChild(script);
  } else if (win.Paddle && !win.Paddle._initialized) {
    try {
      if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
        win.Paddle.Environment.set('sandbox');
      }
      win.Paddle.Initialize({
        token: PADDLE_CONFIG.clientToken,
        eventCallback: handlePaddleCheckoutEvent,
      });
      win.Paddle._initialized = true;
    } catch (e) {
      console.warn('Paddle re-initialization notice:', e);
    }
  }
}

/**
 * Direct client-side Paddle checkout using client token and price ID (Sandbox & direct flows).
 */
export function openPaddleDirectCheckout(domains: number, priceId?: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();

    const win = window as any;
    initPaddle();

    const effectivePriceId = priceId || PADDLE_CONFIG.priceId;
    const clampedDomains = Math.min(100, Math.max(1, domains || 10));
    const successUrl = `${window.location.origin}/intake?domains=${clampedDomains}`;

    const triggerOpen = () => {
      if (win.Paddle && win.Paddle.Checkout && typeof win.Paddle.Checkout.open === 'function') {
        if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
          win.Paddle.Environment.set('sandbox');
        }
        win.Paddle.Checkout.open({
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            locale: 'en',
            successUrl,
          },
          items: [
            {
              priceId: effectivePriceId,
              quantity: 1,
            },
          ],
          customData: {
            domains: clampedDomains,
            domainCount: clampedDomains,
            expectedCents: clampedDomains * 10000,
          },
        });
        resolve();
      } else {
        setTimeout(triggerOpen, 100);
      }
    };

    triggerOpen();
  });
}

/**
 * Authoritatively mints a server transaction with dynamic unit price,
 * and opens Paddle checkout with the transaction ID and success redirect.
 */
export async function openServerPaddleCheckout(domains: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const win = window as any;
  initPaddle();

  const clampedDomains = Math.min(100, Math.max(1, domains || 10));

  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domains: clampedDomains }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.transactionId) {
      const successUrl = `${window.location.origin}/intake?txn=${encodeURIComponent(data.transactionId)}&order_id=${encodeURIComponent(data.transactionId)}&domains=${clampedDomains}`;

      return new Promise((resolve) => {
        const triggerOpen = () => {
          if (win.Paddle && win.Paddle.Checkout && typeof win.Paddle.Checkout.open === 'function') {
            if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
              win.Paddle.Environment.set('sandbox');
            }
            win.Paddle.Checkout.open({
              transactionId: data.transactionId,
              settings: {
                displayMode: 'overlay',
                theme: 'dark',
                successUrl,
              },
            });
            resolve();
          } else {
            setTimeout(triggerOpen, 100);
          }
        };
        triggerOpen();
      });
    } else {
      console.error('[Paddle Checkout] /api/checkout failed:', data);
      // Fallback only if single domain (where 1 unit = $100 exactly)
      if (clampedDomains === 1) {
        return openPaddleDirectCheckout(1);
      }
      throw new Error(data.error || 'Server checkout minting failed.');
    }
  } catch (err: any) {
    console.error('[Paddle Checkout] Checkout error:', err);
    if (clampedDomains === 1) {
      return openPaddleDirectCheckout(1);
    }
    throw err;
  }
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
