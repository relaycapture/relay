'use client'

/**
 * Paddle Checkout Configuration & Helper
 *
 * Supports both:
 * 1. Server-side transaction minting (when PADDLE_API_KEY is configured in production).
 * 2. Direct client token + priceId checkout (for sandbox testing and direct client flows).
 */
const defaultSandboxToken = 'test_1f8686b5f0144f0c19f74bdef50';
const activeToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || defaultSandboxToken;
const activePriceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || 'pri_01m0ad0sn09xvkymfy1t7588a8';

export const PADDLE_CONFIG = {
  clientToken: activeToken,
  priceId: activePriceId,
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || (activeToken.startsWith('live_') ? 'production' : 'sandbox'),
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
          if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
            win.Paddle.Environment.set('sandbox');
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
  } else if (win.Paddle && !win.Paddle._initialized) {
    try {
      if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
        win.Paddle.Environment.set('sandbox');
      }
      win.Paddle.Initialize({
        token: PADDLE_CONFIG.clientToken,
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
          },
          items: [
            {
              priceId: effectivePriceId,
              quantity: clampedDomains,
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
 * Mints an immutable server-side Paddle transaction if configured, or seamlessly
 * falls back to direct client checkout with client token & price ID.
 */
export async function openServerPaddleCheckout(domains: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const win = window as any;
  initPaddle();

  // 1. Attempt authoritative server-side transaction minting if API key is configured
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domains }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.transactionId) {
        return new Promise((resolve) => {
          const triggerOpen = () => {
            if (win.Paddle && win.Paddle.Checkout && typeof win.Paddle.Checkout.open === 'function') {
              win.Paddle.Checkout.open({
                transactionId: data.transactionId,
                settings: {
                  displayMode: 'overlay',
                  theme: 'dark',
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
    }
  } catch {
    // Server minting unconfigured or unavailable
  }

  // 2. Direct client token + priceId checkout
  return openPaddleDirectCheckout(domains);
}

/**
 * Compatibility alias for callers passing domains
 */
export async function openPaddleCheckout(
  priceId?: string,
  _planName?: string,
  customData?: Record<string, any>,
  quantity: number = 10
): Promise<void> {
  const domains = customData?.domainCount || quantity || 10;
  return openPaddleDirectCheckout(domains, priceId);
}
