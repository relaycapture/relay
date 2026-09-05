'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from 'lucide-react';

function IntakeContent() {
  const searchParams = useSearchParams();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [domainCount, setDomainCount] = useState<number>(10);
  const [orderId, setOrderId] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isBriefLoading, setIsBriefLoading] = useState(true);

  // Manual Order ID unlock state for the security gate
  const [manualOrderId, setManualOrderId] = useState<string>('');
  const [isManualChecking, setIsManualChecking] = useState<boolean>(false);
  const [manualError, setManualError] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBriefLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);



  const txnParam = searchParams.get('txn') || searchParams.get('order_id') || '';
  const emailParam = searchParams.get('email') || '';
  const domainsParam = searchParams.get('domains') || searchParams.get('provision_domains') || '';

  // 1. Authoritatively ensure clean native cursor on intake page and remove any dangling elements
  useEffect(() => {
    const forceHidden = document.getElementById('force-system-cursor-hidden');
    if (forceHidden) {
      forceHidden.remove();
    }
  }, []);

  // 2. Authoritative parameter sync & Paddle verification check
  useEffect(() => {
    if (emailParam) setCustomerEmail(emailParam);
    if (txnParam) setOrderId(txnParam);
    if (domainsParam && !isNaN(parseInt(domainsParam, 10))) {
      setDomainCount(parseInt(domainsParam, 10));
    }

    if (txnParam) {
      setIsVerifying(true);
      let attempts = 0;
      const maxAttempts = 4;

      const checkVerification = () => {
        fetch(`/api/checkout/verify?txn=${encodeURIComponent(txnParam)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.verified) {
              setIsVerified(true);
              setIsVerifying(false);
              if (data.email) setCustomerEmail(data.email);
              if (data.domains) setDomainCount(data.domains);
            } else if (attempts < maxAttempts) {
              attempts++;
              setTimeout(checkVerification, 2000);
            } else {
              setIsVerified(false);
              setIsVerifying(false);
            }
          })
          .catch(() => {
            setIsVerified(false);
            setIsVerifying(false);
          });
      };

      checkVerification();
    } else {
      setIsVerified(null);
      setIsVerifying(false);
    }
  }, [txnParam, emailParam, domainsParam]);

  const handleCopyOrderId = async () => {
    if (!orderId) return;
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  // Authoritative manual verification for customers unlocking via Order ID on the security gate
  const handleManualVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = manualOrderId.trim();
    if (!cleanId) return;

    setIsManualChecking(true);
    setManualError('');

    try {
      const res = await fetch(`/api/checkout/verify?txn=${encodeURIComponent(cleanId)}`);
      const data = await res.json();

      if (data.verified) {
        setIsVerified(true);
        setOrderId(cleanId);
        if (data.email) setCustomerEmail(data.email);
        if (data.domains) setDomainCount(data.domains);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('txn', cleanId);
        newUrl.searchParams.set('order_id', cleanId);
        window.history.replaceState({}, '', newUrl.toString());
      } else {
        setManualError(
          data.error ||
            'Order ID not found or transaction is not settled in Paddle. Please ensure payment completed successfully.'
        );
      }
    } catch (err: any) {
      setManualError('Network error checking verification status. Please retry.');
    } finally {
      setIsManualChecking(false);
    }
  };

  // Construct forwardable query string for Tally hidden fields
  const tallyQuery = new URLSearchParams();
  // Ensure transparentBackground=1 is explicitly set so the website's rich canvas shines through
  tallyQuery.set('transparentBackground', '1');
  if (customerEmail) tallyQuery.set('email', customerEmail);
  if (orderId) {
    tallyQuery.set('order_id', orderId);
    tallyQuery.set('txn', orderId);
  }
  if (domainCount) tallyQuery.set('domains', String(domainCount));

  // Forward all other query parameters automatically to Tally
  searchParams.forEach((value, key) => {
    if (!tallyQuery.has(key)) {
      tallyQuery.set(key, value);
    }
  });

  const tallyBaseUrl = 'https://tally.so/r/KYEpy8';
  const queryString = tallyQuery.toString();
  const tallyFullUrl = `${tallyBaseUrl}?${queryString}`;

  return (
    <div
      id="relay-intake-root"
      className="h-screen w-screen overflow-hidden bg-[#08080a] text-[#F4F4F2] flex flex-col font-sans antialiased relative selection:bg-white/20 selection:text-white"
    >

      {/* High-specificity styling: native cursor, strict viewport containment, and obsidian dark scrollbar */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html,
            body {
              overflow: hidden !important;
              height: 100% !important;
              max-height: 100vh !important;
              background-color: #08080a !important;
            }
            html,
            body,
            #relay-intake-root,
            #relay-intake-root *,
            header,
            header *,
            nav,
            nav * {
              cursor: auto !important;
            }
            a,
            a *,
            button,
            button *,
            [role="button"],
            [role="button"] *,
            .cursor-pointer {
              cursor: pointer !important;
            }
            input,
            textarea,
            .cursor-text {
              cursor: text !important;
            }
            * {
              scrollbar-width: thin !important;
              scrollbar-color: rgba(255, 255, 255, 0.18) #08080a !important;
            }
            ::-webkit-scrollbar {
              width: 6px !important;
              height: 6px !important;
            }
            ::-webkit-scrollbar-track {
              background: #08080a !important;
            }
            ::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.18) !important;
              border-radius: 9999px !important;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.35) !important;
            }
          `,
        }}
      />

      {/* Atmospheric Canvas Layers Behind Transparent Form */}


      {/* 2. Atmospheric Top Radial Vignette */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(255,255,255,0.04),transparent)]"
        aria-hidden="true"
      />

      {/* 3. Hardware-Accelerated SVG Noise Grain Texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 select-none mix-blend-overlay opacity-[0.038]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
        aria-hidden="true"
      />

      {/* Official Tally Embed Widget Script */}
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          const win = window as any;
          if (win.Tally && typeof win.Tally.loadEmbeds === 'function') {
            win.Tally.loadEmbeds();
          }
        }}
      />

      {/* Sleek, Expensive Brief Reveal Transition */}
      <div
        className={`fixed inset-0 z-50 bg-[#08080a] flex flex-col items-center justify-center text-center px-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isBriefLoading
            ? 'opacity-100 pointer-events-auto visible'
            : 'opacity-0 pointer-events-none invisible'
        }`}
      >
        <div className="relative z-10 max-w-md w-full">
          <h2 className="font-sans text-3xl font-medium tracking-tight text-white mb-2">
            {isVerified === true
              ? 'Payment confirmed.'
              : isVerified === false
              ? 'Settlement unconfirmed.'
              : 'Engineering Brief.'}
          </h2>
          <p className="font-sans text-sm text-neutral-400 font-normal mb-8">
            {isVerified === true
              ? 'Preparing your engineering brief.'
              : isVerified === false
              ? 'Transaction was not settled or is pending.'
              : 'Initializing intake workspace.'}
          </p>
          <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
          </div>
          {orderId && (
            <div className="font-mono text-xs text-neutral-500 tracking-wide">
              Order <span className="text-neutral-300 font-medium">{orderId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sleek, Expensive Floating Telemetry Command Bar */}
      {!isFocusMode && (
        <header
          style={{ cursor: 'auto' }}
          className="h-13 sm:h-14 border-b border-white/[0.07] bg-[#08080a]/75 backdrop-blur-2xl px-4 sm:px-6 flex items-center justify-between z-30 shrink-0 select-none relative"
        >
          <div className="flex items-center gap-3 sm:gap-5 overflow-hidden">
            <Link
              href="/"
              style={{ cursor: 'pointer' }}
              className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors py-1.5 px-2.5 -ml-1 rounded hover:bg-white/[0.05] shrink-0 tracking-tight"
              title="Return to Relay Capture overview"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden min-[540px]:inline">RELAY CAPTURE</span>
            </Link>

            <span className="h-3.5 w-px bg-white/[0.08] hidden min-[540px]:block shrink-0" />

            {/* Verification Status Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              {isVerifying ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-medium tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Verifying settlement</span>
                </span>
              ) : isVerified === true ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>Payment confirmed</span>
                </span>
              ) : isVerified === false ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[11px] font-medium tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>Payment unconfirmed or declined</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] text-neutral-300 border border-white/[0.08] text-[11px] font-medium tracking-tight">
                  <ShieldCheck className="w-3 h-3 text-neutral-400" />
                  <span>Engineering intake</span>
                </span>
              )}
            </div>

            {/* Real Authoritative Transaction Order ID with 1-Click Copy */}
            {orderId && (
              <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-300 bg-white/[0.03] border border-white/[0.07] px-2.5 py-1 rounded max-w-[260px] sm:max-w-[400px] md:max-w-none overflow-hidden">
                <span className="text-neutral-500 text-[11px] hidden md:inline">Order:</span>
                <span className="text-neutral-200 tracking-tight truncate font-medium" title={orderId}>
                  {orderId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  style={{ cursor: 'pointer' }}
                  className="ml-1 p-1 hover:bg-white/[0.08] rounded transition-colors text-neutral-400 hover:text-white shrink-0 inline-flex items-center gap-1 text-[11px]"
                  title="Copy transaction ID to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium hidden sm:inline text-[10px]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="hidden sm:inline text-[10px] text-neutral-400">COPY</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Action & SLA Indicators */}
          <div className="flex items-center gap-3 sm:gap-5 font-mono text-xs text-neutral-400 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>SLA: <strong className="text-white font-medium">48-Hour Provisioning</strong></span>
            </div>

            {/* Focus / Fullscreen Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsFocusMode(true)}
              style={{ cursor: 'pointer' }}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-xs py-1 px-2.5 rounded hover:bg-white/[0.05]"
              title="Hide top bar for borderless full-window view"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Full Window</span>
            </button>


          </div>
        </header>
      )}

      {/* Unconfirmed / Declined Payment Banner */}
      {!isFocusMode && isVerified === false && (
        <div className="bg-rose-950/40 border-b border-rose-500/30 px-4 sm:px-6 py-2 flex items-center justify-between text-xs font-mono text-rose-200 z-20 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
            <span>Order #{orderId || 'N/A'} has not been settled (card was declined or payment canceled).</span>
          </div>
          <Link
            href="/"
            className="text-rose-300 hover:text-white underline transition-colors ml-4 shrink-0 font-medium"
          >
            Return to checkout →
          </Link>
        </div>
      )}

      {/* Floating Restore Button when in Focus Mode */}
      {isFocusMode && (
        <button
          type="button"
          onClick={() => setIsFocusMode(false)}
          style={{ cursor: 'pointer' }}
          className="fixed top-4 right-4 z-50 bg-[#09090b]/80 border border-white/15 text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-mono backdrop-blur-xl shadow-2xl inline-flex items-center gap-1.5 hover:bg-white/10 transition-all cursor-pointer"
          title="Restore top status bar"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>Exit Full Window</span>
        </button>
      )}

      {/* Main Content: Authenticated Brief OR Authoritative Security Gate */}
      <main className="flex-1 min-h-0 relative w-full h-full bg-[#08080a] overflow-y-auto z-10">
        {isVerifying ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
            <div className="w-10 h-10 rounded-full border border-white/10 border-t-white animate-spin mb-4" />
            <h3 className="font-sans text-xl font-medium text-white mb-1">
              Authenticating Deployment Order
            </h3>
            <p className="font-mono text-xs text-neutral-400">
              Verifying cryptographic transaction settlement with Paddle...
            </p>
          </div>
        ) : isVerified === true ? (
          <iframe
            data-tally-src={tallyFullUrl}
            src={tallyFullUrl}
            width="100%"
            height="100%"
            style={{ background: 'transparent' }}
            className="absolute inset-0 w-full h-full border-0 bg-transparent"
            title={`Engineering Intake Brief · Order #${orderId || customerEmail || 'RELAY'}`}
          />
        ) : (
          <div className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="max-w-xl w-full border border-white/[0.08] bg-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] rounded-2xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
              {/* Corner hair-line coordinate */}
              <div className="absolute top-4 right-4 font-mono text-[10px] text-neutral-600 tracking-wider">
                AUTH // RESTRICTED
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white mb-6">
                <Lock className="w-5 h-5 text-neutral-300" />
              </div>

              {/* Security Notice */}
              <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                01 // AUTHORIZED ACCESS REQUIRED
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-medium tracking-tight text-white mb-3">
                Engineering Brief Restricted
              </h2>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed mb-6 font-normal">
                Access to the Relay Capture technical brief is strictly reserved for confirmed, settled fleet deployments. If you recently completed payment, enter your Paddle Order ID below to unlock your workspace.
              </p>

              {/* Order ID Verification Form */}
              <form onSubmit={handleManualVerify} className="space-y-3 mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={manualOrderId}
                    onChange={(e) => {
                      setManualOrderId(e.target.value);
                      if (manualError) setManualError('');
                    }}
                    placeholder="Enter Paddle Order ID (e.g. txn_01m1...)"
                    className="w-full bg-[#08080a] border border-white/15 focus:border-white/40 rounded-lg px-4 py-3 text-xs sm:text-sm font-mono text-white placeholder:text-neutral-600 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={isManualChecking || !manualOrderId.trim()}
                    style={{ cursor: 'pointer' }}
                    className="mt-3 sm:mt-0 sm:absolute sm:right-1.5 sm:top-1.5 sm:bottom-1.5 px-4 py-2 bg-white text-black hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed rounded-md font-mono text-xs font-medium transition-all inline-flex items-center justify-center gap-2 shrink-0"
                  >
                    {isManualChecking ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Unlock Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

                {manualError && (
                  <div className="flex items-start gap-2 text-rose-400 font-mono text-xs mt-2 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{manualError}</span>
                  </div>
                )}
              </form>

              {/* Divider */}
              <div className="h-px w-full bg-white/[0.08] mb-6" />

              {/* Call to Actions for Unpaid Visitors */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <Link
                  href="/#fleet-pricing-section"
                  style={{ cursor: 'pointer' }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] text-white font-mono text-xs transition-all tracking-tight"
                >
                  <span>Provision New Fleet ($1,000 / 10 domains)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </Link>

                <Link
                  href="/"
                  style={{ cursor: 'pointer' }}
                  className="inline-flex items-center justify-center text-xs font-mono text-neutral-400 hover:text-neutral-200 transition-colors py-2 px-2"
                >
                  Return to Overview
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function IntakePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#08080a] text-neutral-400 font-sans text-sm flex items-center justify-center">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-neutral-400 font-normal">Loading engineering brief...</span>
          </div>
        </div>
      }
    >
      <IntakeContent />
    </Suspense>
  );
}
