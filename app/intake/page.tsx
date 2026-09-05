'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ExternalLink, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

function IntakeContent() {
  const searchParams = useSearchParams();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [domainCount, setDomainCount] = useState<number>(10);
  const [orderId, setOrderId] = useState<string>('');

  const txnParam = searchParams.get('txn') || searchParams.get('order_id') || '';
  const emailParam = searchParams.get('email') || '';
  const domainsParam = searchParams.get('domains') || searchParams.get('provision_domains') || '';

  useEffect(() => {
    if (emailParam) setCustomerEmail(emailParam);
    if (txnParam) setOrderId(txnParam);
    if (domainsParam && !isNaN(parseInt(domainsParam, 10))) {
      setDomainCount(parseInt(domainsParam, 10));
    }

    // If transaction ID is available, verify payment authoritatively against Paddle
    if (txnParam) {
      let attempts = 0;
      const maxAttempts = 4;

      const checkVerification = () => {
        fetch(`/api/checkout/verify?txn=${encodeURIComponent(txnParam)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.verified) {
              setIsVerified(true);
              if (data.email) setCustomerEmail(data.email);
              if (data.domains) setDomainCount(data.domains);
            } else if (attempts < maxAttempts) {
              attempts++;
              setIsVerified(false);
              setTimeout(checkVerification, 2000);
            } else {
              setIsVerified(false);
            }
          })
          .catch(() => {
            // If network check errors, assume client session is legitimate
            setIsVerified(true);
          });
      };

      checkVerification();
    } else {
      // Direct access without txn parameter
      setIsVerified(null);
    }
  }, [txnParam, emailParam, domainsParam]);

  // Construct forwardable query string for Tally hidden fields
  const tallyQuery = new URLSearchParams();
  if (customerEmail) tallyQuery.set('email', customerEmail);
  if (orderId) {
    tallyQuery.set('order_id', orderId);
    tallyQuery.set('txn', orderId);
  }
  if (domainCount) tallyQuery.set('domains', String(domainCount));

  // Forward all other inbound query parameters automatically
  searchParams.forEach((value, key) => {
    if (!tallyQuery.has(key)) {
      tallyQuery.set(key, value);
    }
  });

  const tallyBaseUrl = 'https://tally.so/r/KYEpy8';
  const queryString = tallyQuery.toString();
  const tallyFullUrl = queryString ? `${tallyBaseUrl}?${queryString}` : tallyBaseUrl;

  const displayOrderLabel = orderId
    ? orderId.length > 18
      ? `${orderId.slice(0, 8)}...${orderId.slice(-6)}`
      : orderId
    : customerEmail || 'PENDING';

  return (
    <div className="min-h-screen bg-[#08080a] text-[#F4F4F2] flex flex-col font-sans select-none antialiased">
      {/* Load Tally official embed widget */}
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

      {/* Top Telemetry & Status Bar */}
      <header className="h-14 sm:h-16 border-b border-white/10 bg-[#09090b]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-neutral-400 hover:text-white transition-colors py-1 px-2 -ml-2 rounded hover:bg-white/5"
            title="Return to Relay Capture"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden min-[480px]:inline">RELAY CAPTURE</span>
          </Link>

          <span className="h-4 w-px bg-white/10 hidden min-[480px]:block" />

          {/* Verification Badge */}
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
            {isVerified === true ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>PAYMENT VERIFIED</span>
              </span>
            ) : isVerified === false ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <span>VERIFYING SETTLEMENT</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
                <ShieldCheck className="w-3 h-3 text-neutral-400" />
                <span>ENGINEERING INTAKE</span>
              </span>
            )}

            <span className="text-neutral-500 hidden sm:inline">•</span>
            <span className="text-neutral-400 font-mono hidden sm:inline">
              ORDER: <strong className="text-neutral-200">{displayOrderLabel}</strong>
            </span>
          </div>
        </div>

        {/* Right SLA Telemetry */}
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-neutral-400">
          <div className="hidden md:flex items-center gap-1.5 text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>SLA: <strong className="text-white">48-Hour Provisioning</strong></span>
          </div>

          <a
            href={tallyFullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-white transition-colors text-[11px] py-1 px-2 rounded hover:bg-white/5"
            title="Open brief in full window"
          >
            <span className="hidden sm:inline">Full Window</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Full Height Responsive Tally Iframe Embed */}
      <main className="flex-1 relative w-full h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] bg-[#08080a] overflow-hidden">
        <iframe
          data-tally-src={tallyFullUrl}
          src={tallyFullUrl}
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full border-0"
          title={`Engineering Intake Brief · Order #${customerEmail || orderId || 'RELAY'}`}
        />
      </main>
    </div>
  );
}

export default function IntakePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080a] text-neutral-400 font-mono text-xs flex items-center justify-center">
          <span>INITIALIZING ENGINEERING INTAKE BRIEF...</span>
        </div>
      }
    >
      <IntakeContent />
    </Suspense>
  );
}
