'use client'

import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Lock,
  ArrowLeft,
  ChevronDown,
  Clock,
  Shield,
  CreditCard,
  Building,
} from 'lucide-react';
import { NumberTicker } from './number-ticker';
import confetti from 'canvas-confetti';
import Silk from './Silk';
import { openPaddleCheckout, PADDLE_CONFIG } from '../utils/paddle';

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenCheckout?: (tierName: string, price: string) => void;
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
  isLightMode,
}: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSelectTier = (tierName: string, priceId: string) => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (_) {}
    openPaddleCheckout(priceId, tierName);
  };

  const faqs = [
    {
      q: 'Are there any recurring subscription fees?',
      a: 'Zero. Every plan is a strictly one-time flat fee. You receive verified DNS records, custom copy-paste configurations, and complete documentation that you own forever.',
    },
    {
      q: 'Do you need login credentials to our email or DNS provider?',
      a: 'Never. Relay operates on a zero-credential architecture. We audit via public DNS nameservers and generate ready-to-paste records that your team or IT administrator applies in seconds.',
    },
    {
      q: 'How fast is the turnaround?',
      a: 'The Self-Serve Blueprint is delivered instantly after purchase. Turnkey Remediation deliverables and testing receipts are delivered within 24 to 48 business hours.',
    },
    {
      q: 'What if our DNS lookups already exceed the RFC 10-lookup limit?',
      a: 'We generate an automated flattened SPF record (or dynamic macro routing) that reduces your lookups to 1/10 while preserving full authorization for all your marketing and CRM tools.',
    },
    {
      q: 'Will this fix our cold email deliverability in Smartlead / Instantly?',
      a: 'Yes. We configure dedicated custom tracking domains with valid SSL (fixing the Cloudflare orange-cloud handshake error), ensure strict DKIM alignment, and isolate your primary domain reputation.',
    },
  ];

  return (
    <div
      className={`min-h-screen pt-28 pb-20 px-4 sm:px-8 md:px-12 transition-colors duration-300 ${
        isLightMode ? 'bg-[#F4F4F2] text-[#0A0A0C]' : 'bg-[#121212] rc-page-grain-121212 text-white'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          data-cursor="grow"
          className={`group inline-flex items-center gap-2 mb-10 text-xs font-mono tracking-wider transition-all duration-200 px-3.5 py-1.5 rounded-full border shadow-sm ${
            isLightMode
              ? 'bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Overview</span>
        </button>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">One-Time Technical Deliverables.</span>
            <span className={`block ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Permanent Infrastructure Health.
            </span>
          </h1>

          <p
            className={`text-sm sm:text-base font-normal leading-relaxed text-center max-w-2xl mx-auto ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            No monthly retainers. No recurring SaaS seat licenses. Select your domain tier and receive verified, copy-paste DNS records and automated inbox placement receipts.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-16">
          {/* Card 1: Self-Serve Blueprint */}
          <div
            className={`rc-grain-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border backdrop-blur-xl ${
              isLightMode
                ? 'bg-white/80 border-black/10 hover:border-black/25 shadow-sm text-black'
                : 'bg-[#18181f]/80 border-white/10 hover:border-white/20 shadow-lg text-white'
            }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                Single Domain Scan
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Self-Serve Blueprint
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Automated diagnostic with step-by-step remediation instructions for technical founders and webmasters.
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
                <div className="text-[11px] font-mono uppercase text-neutral-400">Included Scope:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Raw DNS syntax &amp; lookup bloat audit</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Flattened SPF record generation</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>DKIM selector probe &amp; key audit</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Instant JSON &amp; Markdown export</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Self-serve execution checklist</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTier('Self-Serve Blueprint', PADDLE_CONFIG.prices.selfServe)}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all border min-h-[48px] shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                isLightMode
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              Get Instant Blueprint ($247)
            </button>
          </div>

          {/* Card 2: Turnkey Remediation (Popular) */}
          <div
            className={`rc-grain-surface relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border-2 backdrop-blur-xl ${
              isLightMode
                ? 'bg-white border-black shadow-xl text-black'
                : 'bg-[#18181f] border-white/30 shadow-2xl text-white'
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-black shadow-md z-10">
              RECOMMENDED
            </div>

            <div>
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-1">
                Core Sending Domain
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Turnkey Remediation
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Full diagnostic + engineer-verified implementation, custom tracking domain, and seed testing.
              </p>

              <div
                className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                  isLightMode ? 'border-black/10' : 'border-white/10'
                }`}
              >
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={997} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Included Scope:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Everything in Self-Serve Blueprint</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Engineer-crafted DNS records for your DNS host</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Subdomain &amp; secondary sender cataloging</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>30-seed inbox placement validation</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Direct email engineer support (30 days)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTier('Turnkey Remediation', PADDLE_CONFIG.prices.turnkey)}
              data-cursor="grow"
              className="w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all shadow-md bg-emerald-500 hover:bg-emerald-400 text-black min-h-[48px] hover:scale-[1.01] active:scale-[0.99]"
            >
              Deploy Turnkey Fix ($997)
            </button>
          </div>

          {/* Card 3: Managed Infrastructure */}
          <div
            className={`rc-grain-surface rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 border backdrop-blur-xl ${
              isLightMode
                ? 'bg-white/80 border-black/10 hover:border-black/25 shadow-sm text-black'
                : 'bg-[#18181f]/80 border-white/10 hover:border-white/20 shadow-lg text-white'
            }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                Up to 5 Sending Domains
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Managed Infrastructure
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Multi-domain architecture, ongoing monitoring, and continuous DMARC enforcement.
              </p>

              <div
                className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                  isLightMode ? 'border-black/10' : 'border-white/10'
                }`}
              >
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={1850} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Included Scope:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Everything in Turnkey Remediation</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Multi-domain envelope alignment</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Continuous DMARC failure monitoring</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Rogue sender blocking (p=reject)</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Dedicated engineering Slack channel</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleSelectTier('Managed Infrastructure', PADDLE_CONFIG.prices.managed)}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all border min-h-[48px] shadow-sm hover:scale-[1.01] active:scale-[0.99] ${
                isLightMode
                  ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              Activate Managed Fleet ($1,850)
            </button>
          </div>
        </div>

        {/* Questions. Answered. FAQ Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2
            className={`text-xl sm:text-2xl font-bold font-sans tracking-tight text-center mb-8 ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            Questions. Answered.
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
