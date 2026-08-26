'use client'

import React, { useState, FormEvent } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Lock,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Clock,
  Shield,
  FileText,
  Mail,
  User,
  CreditCard,
  Building,
} from 'lucide-react';
import { NumberTicker } from './number-ticker';
import confetti from 'canvas-confetti';
import Silk from './Silk';

// ───────── Paddle Checkout Configuration & Placeholders ─────────
// Replace these placeholder values with your live Paddle credentials in production
export const PADDLE_CONFIG = {
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || 'test_token_placeholder_your_paddle_client_token_here',
  environment: (process.env.NEXT_PUBLIC_PADDLE_ENV as 'sandbox' | 'production') || 'sandbox',
  prices: {
    selfServe: process.env.NEXT_PUBLIC_PADDLE_PRICE_SELF_SERVE || 'pri_01_placeholder_self_serve_blueprint',
    turnkey: process.env.NEXT_PUBLIC_PADDLE_PRICE_TURNKEY || 'pri_02_placeholder_turnkey_remediation',
    managed: process.env.NEXT_PUBLIC_PADDLE_PRICE_MANAGED || 'pri_03_placeholder_managed_infrastructure',
  },
};

export function openPaddleCheckout(priceId: string, planName?: string, customData?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const win = window as any;

  const triggerOpen = () => {
    try {
      if (win.Paddle && typeof win.Paddle.Checkout?.open === 'function') {
        win.Paddle.Checkout.open({
          items: [{ priceId, quantity: 1 }],
          customData,
          successUrl: window.location.origin + '/?checkout=success',
        });
      } else {
        throw new Error('Paddle.Checkout.open is not available');
      }
    } catch (err) {
      console.warn('Paddle Checkout Notice (Placeholder Key):', err);
      alert(
        `🚀 [Paddle Checkout Triggered]` +
        `\n\nPlan: ${planName || 'Deliverability Plan'}` +
        `\nPrice ID: ${priceId}` +
        `\nClient Token: ${PADDLE_CONFIG.clientToken}` +
        `\n\n(Replace placeholder tokens in PADDLE_CONFIG with your real Paddle credentials to process live transactions).`
      );
    }
  };

  if (win.Paddle) {
    triggerOpen();
  } else {
    const script = document.createElement('script');
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
        console.warn('Paddle initialization with placeholder:', e);
      }
      triggerOpen();
    };
    script.onerror = () => triggerOpen();
    document.head.appendChild(script);
  }
}

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenCheckout?: () => void;
  onOpenSampleModal?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
  isLightMode?: boolean;
}

export function PricingPage({
  onBackToHome,
  onOpenCheckout,
  onOpenSampleModal,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
  isLightMode = false,
}: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSelectTier = (tierName: string, priceId: string) => {
    openPaddleCheckout(priceId, tierName);
  };

  const faqs = [
    {
      q: 'How does the direct DNS remediation process work?',
      a: 'After checkout, our deliverability engineers generate cryptographically verified 2048-bit DKIM private/public key pairs, assemble flattened RFC 7208-compliant SPF mechanisms under the 10-lookup limit, and enforce strict DMARC p=quarantine/reject policies tailored for your sending domain.',
    },
    {
      q: 'Will my cold outbound or marketing emails stop landing in spam?',
      a: 'Yes. By aligning SPF and DKIM signatures strictly with your envelope sender (From header), your domain passes Google Workspace, Microsoft 365, and Yahoo DMARC alignment checks, preventing automated quarantine and spam filtering.',
    },
    {
      q: 'How long does DNS propagation take after setup?',
      a: 'Most global authoritative DNS changes on Cloudflare, AWS Route 53, or Google Cloud DNS take effect within 5 to 15 minutes, with full global recursive resolver propagation taking up to 24-48 hours.',
    },
    {
      q: 'What is the difference between Self-Serve and Turnkey Remediation?',
      a: 'The Self-Serve Blueprint delivers exact copy-paste DNS record strings and diagnostic audit scorecards for in-house engineering teams. Turnkey Remediation includes live hands-on DNS implementation, provider alignment, and 14 days of active deliverability monitoring.',
    },
  ];

  return (
    <div
      id="dedicated-pricing-page"
      className={`min-h-screen pt-28 sm:pt-32 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300 ${
        isLightMode
          ? 'bg-[#fbfbfd] text-[#1d1d1f]'
          : 'bg-[#151515] rc-page-grain-151515 text-[#F4F4F2]'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back navigation */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={onBackToHome}
            data-cursor="grow"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs transition-colors border min-h-[40px] ${
              isLightMode
                ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10'
                : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Diagnostic Scanner</span>
          </button>
        </div>

        {/* Hero header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div
            className={`rc-grain-surface inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4 border backdrop-blur-md min-h-[32px] ${
              isLightMode
                ? 'bg-black/[0.03] border-black/10 text-neutral-700'
                : 'bg-white/[0.04] border-white/10 text-neutral-300'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>COMMERCIAL ENGAGEMENT SPECIFICATION</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans tracking-tight leading-[1.15] mb-4 ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            Transparent pricing.
          </h1>

          <p
            className={`text-xs sm:text-base md:text-lg font-normal leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            Eliminate inbox quarantine, prevent sender domain forging, and guarantee compliance with major receiving providers.
          </p>
        </div>

        {/* Three Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch max-w-6xl mx-auto">
          {/* Tier 1: Self-Serve Blueprint */}
          <div
            id="pricing-card-tier-snapshot"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden ${
              isLightMode
                ? 'bg-white/40 border border-black/10 shadow-sm text-[#1d1d1f]'
                : 'bg-[#1e1e24]/50 border border-white/10 shadow-md text-white'
            }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                One-Time Deliverable
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Self-Serve Blueprint
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                For teams with an in-house engineer or technical founder.
              </p>

              <div
                className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                  isLightMode ? 'border-black/10' : 'border-white/10'
                }`}
              >
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={247} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Core Deliverables:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Full-stack DNS deliverability &amp; spoofing risk scorecard</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Root SPF mechanism validation &amp; 10-lookup limit audit</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Authoritative DMARC policy check (p=quarantine / p=reject)</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>DKIM selector probing &amp; syntax validation</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Exact copy-paste DNS TXT records for your domain</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Shareable confidential PDF + JSON bundle</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-400">
                  <X className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <span>Direct infrastructure setup &amp; live hands-on DNS execution</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTier('Self-Serve Blueprint', PADDLE_CONFIG.prices.selfServe)}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all border min-h-[48px] shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                isLightMode
                  ? 'bg-neutral-900 hover:bg-black text-white border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              Order Self-Serve Blueprint ($247)
            </button>
          </div>

          {/* Tier 2: Turnkey Remediation (Featured) */}
          <div
            id="pricing-card-tier-audit"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden ${
              isLightMode
                ? 'bg-white/95 border-2 border-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.09)] text-[#1d1d1f]'
                : 'bg-[#1a1a22]/95 border-2 border-white/90 shadow-[0_20px_60px_rgba(255,255,255,0.07)] text-white'
            }`}
          >
            {/* Silk Glow Background */}
            <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
              <div className="w-full h-full transform scale-125">
                <Silk
                  speed={3}
                  scale={1.2}
                  color={isLightMode ? '#cccccc' : '#555566'}
                  noiseIntensity={0.8}
                  rotation={0}
                />
              </div>
            </div>

            {/* Recommended Pill */}
            <div
              className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${
                isLightMode
                  ? 'bg-black/90 text-white shadow-sm'
                  : 'bg-white/95 text-black shadow-md'
              }`}
            >
              RECOMMENDED
            </div>

            <div className="relative z-10">
              <div className="font-mono text-xs uppercase tracking-wider mb-1 opacity-70">
                Complete One-Time Execution
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Turnkey Remediation
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                For founders who value their time and refuse to touch DNS records.
              </p>

              <div
                className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                  isLightMode ? 'border-black/10' : 'border-white/10'
                }`}
              >
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={547} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase font-semibold">Everything in Self-Serve Blueprint, plus:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Fully automated DNS records configuration</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Provider recipes (Google Workspace, M365, Smartlead, Instantly)</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Subdomain inheritance policy hardening &amp; alignment</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>14-day post-launch engineering support &amp; verification check</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Guaranteed 100% Google / Yahoo bulk sender compliance</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => handleSelectTier('Turnkey Remediation', PADDLE_CONFIG.prices.turnkey)}
                data-cursor="grow"
                className={`w-full py-4 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all shadow-md min-h-[48px] hover:scale-[1.02] active:scale-[0.98] ${
                  isLightMode
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                Get Turnkey Remediation ($547)
              </button>
            </div>
          </div>

          {/* Tier 3: Managed Outbound Infrastructure */}
          <div
            id="pricing-card-tier-managed"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden opacity-100 ${
              isLightMode
                ? 'bg-white/90 border border-black/20 hover:border-black/35 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-[#1d1d1f]'
                : 'bg-[#1e1e24]/90 border border-white/20 hover:border-white/35 shadow-[0_10px_40px_rgba(0,0,0,0.45)] text-white'
            }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                The Enterprise Anchor
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Managed Outbound Infrastructure
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                A fully scaled, dedicated cold email engine. We build, warm, manage, and maintain your sending architecture.
              </p>

              <div
                className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                  isLightMode ? 'border-black/10' : 'border-white/10'
                }`}
              >
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={1247} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time setup</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Infrastructure Scope:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>10 Dedicated Sending Domains</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>30 Authenticated Inboxes</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Automated IP Warmup &amp; Custom Tracking Domains</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>24/7 Deliverability Monitoring</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Full SPF, DKIM &amp; DMARC Enforced</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Continuous Drift &amp; Reputation Protection</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTier('Managed Outbound Infrastructure', PADDLE_CONFIG.prices.managed)}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all border min-h-[48px] shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                isLightMode
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              Retain Managed Infrastructure ($1,247)
            </button>
          </div>
        </div>

        {/* Deliverables sample preview banner */}
        <div
          className={`rc-grain-surface rounded-2xl p-6 sm:p-8 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 border backdrop-blur-xl ${
            isLightMode ? 'bg-black/[0.02] border-black/10' : 'bg-white/[0.02] border-white/10'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                isLightMode ? 'bg-black/5 border-black/10 text-black' : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-semibold text-base mb-1 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Confidential Deliverables Bundle
              </h3>
              <p className={`text-xs ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Every package includes redacted executive audit reports, copy-paste TXT records, and automated test receipts.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenSampleModal}
            data-cursor="grow"
            className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors border whitespace-nowrap min-h-[42px] ${
              isLightMode
                ? 'bg-black/5 hover:bg-black/10 text-black border-black/15'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            Inspect Sample Deliverable
          </button>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2
            className={`text-xl sm:text-2xl font-bold font-sans tracking-tight text-center mb-8 ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            Frequently Answered Questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all ${
                    isLightMode
                      ? isOpen
                        ? 'bg-white border-black/15 shadow-sm'
                        : 'bg-black/[0.01] border-black/5 hover:border-black/10'
                      : isOpen
                      ? 'bg-white/[0.03] border-white/15 shadow-md'
                      : 'bg-white/[0.01] border-white/5 hover:border-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                  >
                    <span className={`font-semibold text-xs sm:text-sm ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180 text-emerald-500' : 'text-neutral-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={`px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3 ${
                        isLightMode
                          ? 'border-black/5 text-neutral-600'
                          : 'border-white/5 text-neutral-400'
                      }`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
