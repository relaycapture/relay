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

let hasRedirected = false;
let currentMintedTxnId: string = '';

/**
 * Safely navigates to the intake brief with authoritative transaction parameters.
 * Prevents multiple concurrent navigation attempts.
 */
function navigateToIntake(txnId?: string, email?: string, domains?: number | string) {
  if (hasRedirected || typeof window === 'undefined') return;
  hasRedirected = true;

  const effectiveTxn =
    txnId ||
    currentMintedTxnId ||
    '';

  const params = new URLSearchParams();
  if (effectiveTxn) {
    params.set('txn', effectiveTxn);
    params.set('order_id', effectiveTxn);
  }
  if (email) params.set('email', email);
  if (domains) params.set('domains', String(domains));

  const redirectUrl = `/intake?${params.toString()}`;
  window.location.href = redirectUrl;
}

/**
 * Global handler for Paddle checkout lifecycle events.
 * Listens for checkout completion and provides a fail-safe redirect to /intake.
 */
function handlePaddleCheckoutEvent(event: any) {
  if (!event) return;

  if (event.name === 'checkout.completed') {
    try {
      const data = event.data || {};
      const txnId =
        data.transaction_id ||
        data.transaction?.id ||
        currentMintedTxnId ||
        (typeof data.id === 'string' && data.id.startsWith('txn_') ? data.id : '') ||
        '';

      const email = data.customer?.email || '';
      const customData = data.custom_data || {};
      const domains = customData.provision_domains || '';

      // Paddle natively displays its confirmation screen and triggers successUrl redirect.
      // We set a fallback timer in case Paddle's native redirect is delayed or blocked by browser extensions.
      setTimeout(() => {
        navigateToIntake(txnId, email, domains);
      }, 2400);
    } catch (err) {
      console.error('[Paddle Checkout Redirect Error]', err);
      navigateToIntake();
    }
  } else if (event.name === 'checkout.closed') {
    // If user clicked Done or closed the modal after payment completed
    if (currentMintedTxnId) {
      navigateToIntake(currentMintedTxnId);
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

    let attempts = 0;
    const triggerOpen = () => {
      attempts++;
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
      } else if (attempts < 50) {
        setTimeout(triggerOpen, 100);
      } else {
        resolve();
      }
    };

    triggerOpen();
  });
}

/**
 * Authoritatively mints a server transaction with dynamic unit price,
 * and opens Paddle checkout with the transaction ID and native success redirect.
 * Includes automatic retry and resilient client fallback.
 */
export async function openServerPaddleCheckout(domains: number): Promise<void> {
  if (typeof window === 'undefined') return;

  const win = window as any;
  initPaddle();

  const clampedDomains = Math.min(100, Math.max(1, domains || 10));

  const mintTransaction = async (): Promise<{ ok: boolean; transactionId?: string; error?: string }> => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains: clampedDomains }),
      });

      const rawText = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { error: rawText || `HTTP ${res.status}: ${res.statusText}` };
      }

      if (res.ok && data.transactionId) {
        return { ok: true, transactionId: data.transactionId };
      }

      return {
        ok: false,
        error: data.error || data.details?.message || `Server checkout minting failed (${res.status})`,
      };
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Network error connecting to /api/checkout' };
    }
  };

  // Attempt 1
  let result = await mintTransaction();

  // If failed (e.g. during dev server compilation or transient blip), retry once after 500ms
  if (!result.ok) {
    console.warn('[Paddle Checkout] First transaction mint attempt failed, retrying in 500ms...', result.error);
    await new Promise((r) => setTimeout(r, 500));
    result = await mintTransaction();
  }

  if (result.ok && result.transactionId) {
    currentMintedTxnId = result.transactionId;
    const successUrl = `${window.location.origin}/intake?txn=${encodeURIComponent(result.transactionId)}&order_id=${encodeURIComponent(result.transactionId)}&domains=${clampedDomains}`;

    return new Promise((resolve) => {
      let attempts = 0;
      const triggerOpen = () => {
        attempts++;
        if (win.Paddle && win.Paddle.Checkout && typeof win.Paddle.Checkout.open === 'function') {
          if (PADDLE_CONFIG.environment === 'sandbox' && win.Paddle.Environment) {
            win.Paddle.Environment.set('sandbox');
          }
          win.Paddle.Checkout.open({
            transactionId: result.transactionId,
            settings: {
              displayMode: 'overlay',
              theme: 'dark',
              locale: 'en',
              successUrl,
            },
          });
          resolve();
        } else if (attempts < 50) {
          setTimeout(triggerOpen, 100);
        } else {
          resolve();
        }
      };
      triggerOpen();
    });
  }

  // Fallback only if single domain (where 1 unit = $100 exactly)
  if (clampedDomains === 1) {
    console.warn('[Paddle Checkout] Server transaction minting unavailable, engaging single-domain direct client checkout fallback:', result.error);
    return openPaddleDirectCheckout(1);
  }

  console.error('[Paddle Checkout] Server transaction minting failed:', result.error);
  throw new Error(result.error || 'Server checkout minting failed. Please verify PADDLE_API_KEY environment variable.');
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
