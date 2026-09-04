'use client'

/**
 * Paddle Checkout Configuration & Helper
 *
 * Price key: pri_01m0ad0sn09xvkymfy1t7588a8
 * Client key: live_df20b9edfa397b87a234a04e7df
 */
const defaultToken = 'test_1f8686b5f0144f0c19f74bdef50';
const activeToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || defaultToken;

export const PADDLE_CONFIG = {
  clientToken: activeToken,
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || (activeToken.startsWith('test_') ? 'sandbox' : 'production'),
  prices: {
    selfServe: process.env.NEXT_PUBLIC_PADDLE_PRICE_SELF_SERVE || 'pri_01kzwg4sqpmgbd2rx264awn6ve',
    turnkey: process.env.NEXT_PUBLIC_PADDLE_PRICE_TURNKEY || 'pri_01kzwg4sqpmgbd2rx264awn6ve',
    managed: process.env.NEXT_PUBLIC_PADDLE_PRICE_MANAGED || 'pri_01kzwg4sqpmgbd2rx264awn6ve',
  },
};

let lockedPriceId: string | null = null;
let lockedQuantity: number = 1;
let isRevertingQuantity = false;

/**
 * Handles Paddle checkout lifecycle events to strictly prevent users from
 * tampering with or reducing the fleet domain quantity inside the Paddle overlay.
 */
function handlePaddleEvent(event: any) {
  if (!event || !event.name) return;

  if (
    (event.name === 'checkout.items.updated' || event.name === 'checkout.updated') &&
    lockedPriceId &&
    lockedQuantity > 0 &&
    !isRevertingQuantity
  ) {
    const items = event.data?.items;
    if (Array.isArray(items) && items.length > 0) {
      const currentItem = items[0];
      const currentQuantity = currentItem?.quantity;
      if (typeof currentQuantity === 'number' && currentQuantity !== lockedQuantity) {
        isRevertingQuantity = true;
        try {
          const win = window as any;
          if (win.Paddle && typeof win.Paddle.Checkout?.updateCheckout === 'function') {
            win.Paddle.Checkout.updateCheckout({
              items: [{ priceId: lockedPriceId, quantity: lockedQuantity }],
            });
          }
        } catch (e) {
          console.warn('Quantity lock revert notice:', e);
        } finally {
          setTimeout(() => {
            isRevertingQuantity = false;
          }, 350);
        }
      }
    }
  }

  if (event.name === 'checkout.closed') {
    lockedPriceId = null;
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
          if (PADDLE_CONFIG.environment === 'sandbox') {
            win.Paddle.Environment?.set('sandbox');
          }
          win.Paddle.Initialize({
            token: PADDLE_CONFIG.clientToken,
            eventCallback: handlePaddleEvent,
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
 * Opens a Paddle overlay checkout directly for the given price ID and quantity.
 * Charges $100 per domain / per notch in slider.
 */
export function openPaddleCheckout(
  priceId?: string,
  planName?: string,
  customData?: Record<string, any>,
  quantity: number = 1
) {
  if (typeof window === 'undefined') return;

  const win = window as any;
  const effectivePriceId = priceId || PADDLE_CONFIG.prices.turnkey;
  const effectiveQuantity = Math.max(1, quantity || 1);

  const triggerOpen = () => {
    try {
      if (win.Paddle && typeof win.Paddle.Checkout?.open === 'function') {
        win.Paddle.Checkout.open({
          items: [{ priceId: effectivePriceId, quantity: effectiveQuantity }],
          customData: {
            ...customData,
            quantity: effectiveQuantity,
            domainCount: effectiveQuantity,
            unitPrice: 100,
            totalPrice: effectiveQuantity * 100,
          },
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
      console.warn('Paddle Checkout invocation note:', err);
      alert(
        '[Paddle Direct Checkout]' +
        '\n\nPlan: ' + (planName || 'Fleet Deployment') +
        '\nDomains: ' + effectiveQuantity + ' ($' + (effectiveQuantity * 100).toLocaleString() + ')' +
        '\nPrice Key: ' + effectivePriceId +
        '\nClient Token: ' + PADDLE_CONFIG.clientToken
      );
    }
  };

  lockedPriceId = effectivePriceId;
  lockedQuantity = effectiveQuantity;

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
              eventCallback: handlePaddleEvent,
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
