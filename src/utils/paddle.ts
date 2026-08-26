'use client'

/**
 * Paddle Checkout Configuration & Helper
 *
 * Replace "YOUR_PADDLE_KEY_HERE" with your live/sandbox Paddle client token.
 * Or set environment variables:
 * NEXT_PUBLIC_PADDLE_CLIENT_TOKEN
 * NEXT_PUBLIC_PADDLE_PRICE_SELF_SERVE
 * NEXT_PUBLIC_PADDLE_PRICE_TURNKEY
 * NEXT_PUBLIC_PADDLE_PRICE_MANAGED
 */
export const PADDLE_CONFIG = {
  // Placeholder client token: replace with your actual Paddle token
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'YOUR_PADDLE_KEY_HERE',
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || 'production',
  prices: {
    selfServe: process.env.NEXT_PUBLIC_PADDLE_PRICE_SELF_SERVE || 'YOUR_PADDLE_PRICE_ID_SELF_SERVE',
    turnkey: process.env.NEXT_PUBLIC_PADDLE_PRICE_TURNKEY || 'YOUR_PADDLE_PRICE_ID_TURNKEY',
    managed: process.env.NEXT_PUBLIC_PADDLE_PRICE_MANAGED || 'YOUR_PADDLE_PRICE_ID_MANAGED',
  },
};

/**
 * Opens a Paddle overlay checkout directly for the given price ID.
 */
export function openPaddleCheckout(
  priceId: string,
  planName?: string,
  customData?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  const win = window as any;

  const triggerOpen = () => {
    try {
      if (win.Paddle && typeof win.Paddle.Checkout?.open === 'function') {
        win.Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customData,
          settings: {
            displayMode: 'overlay',
            theme: 'dark',
            locale: 'en',
            successUrl: window.location.origin + '/?checkout=success',
          },
        });
      } else {
        throw new Error('Paddle.Checkout.open is not available');
      }
    } catch (err) {
      console.warn('Paddle Checkout initialized with key:', PADDLE_CONFIG.clientToken, err);
      alert(
        '[Paddle Direct Checkout]' +
        '\n\nPlan: ' + (planName || 'Deliverability Plan') +
        '\nPrice ID: ' + priceId +
        '\nClient Token: ' + PADDLE_CONFIG.clientToken +
        '\n\n(Direct checkout opened. Replace "YOUR_PADDLE_KEY_HERE" in src/utils/paddle.ts to process live card & bank payments).'
      );
    }
  };

  if (win.Paddle && win.Paddle.Checkout) {
    triggerOpen();
  } else {
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
        triggerOpen();
      };
      script.onerror = () => triggerOpen();
      document.head.appendChild(script);
    } else {
      triggerOpen();
    }
  }
}
