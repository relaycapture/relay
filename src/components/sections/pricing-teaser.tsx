'use client'

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface PricingTeaserProps {
  onNavigateToPricing: () => void;
  isLightMode?: boolean;
}

export function PricingTeaser({ onNavigateToPricing, isLightMode }: PricingTeaserProps) {
  const [selectedNeed, setSelectedNeed] = useState<'onetime' | 'audit' | 'ongoing'>('audit');

  return (
    <section
      id="pricing-teaser"
      className={`relative py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 transition-colors ${
        isLightMode ? 'bg-[#fbfbfd]' : 'bg-[#09090C]'
      }`}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs uppercase tracking-wider mb-4 min-h-[32px] ${
              isLightMode
                ? 'bg-black/[0.03] border-black/10 text-neutral-700'
                : 'bg-white/5 border-white/10 text-neutral-300'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE TIER CONFIGURATOR</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans tracking-tight leading-[1.15] mb-3 ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            Calibrated to your exact need.
          </h2>
          <p
            className={`text-xs sm:text-base md:text-lg font-normal leading-relaxed ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            Select your immediate infrastructure objective to highlight the ideal deliverable package.
          </p>
        </div>

        {/* Interactive Stated Need Switcher */}
        <div
          className={`flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-8 sm:mb-10 p-1.5 rounded-2xl border ${
            isLightMode ? 'bg-neutral-100/80 border-black/10' : 'bg-black/60 border-white/10'
          }`}
        >
          <button
            onClick={() => setSelectedNeed('onetime')}
            data-cursor="grow"
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
              selectedNeed === 'onetime'
                ? isLightMode
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'bg-white text-black shadow-sm font-semibold'
                : isLightMode
                ? 'text-neutral-600 hover:text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. Self-Serve Blueprint ($247)
          </button>
          <button
            onClick={() => setSelectedNeed('audit')}
            data-cursor="grow"
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
              selectedNeed === 'audit'
                ? isLightMode
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'bg-white text-black shadow-sm font-semibold'
                : isLightMode
                ? 'text-neutral-600 hover:text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            2. Turnkey Remediation ($547)
          </button>
          <button
            onClick={() => setSelectedNeed('ongoing')}
            data-cursor="grow"
            className={`px-4 py-2 rounded-xl font-mono text-xs transition-all duration-200 ${
              selectedNeed === 'ongoing'
                ? isLightMode
                  ? 'bg-white text-black shadow-sm font-semibold'
                  : 'bg-white text-black shadow-sm font-semibold'
                : isLightMode
                ? 'text-neutral-600 hover:text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            3. Managed Outbound ($1,247)
          </button>
        </div>

        {/* Dynamic Highlight Card */}
        <div
          className={`p-8 sm:p-10 rounded-3xl border shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 ${
            isLightMode ? 'bg-white border-black/10' : 'bg-[#0F0F14] border-white/15'
          }`}
        >
          <div className="space-y-3 max-w-xl">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-semibold ${
                isLightMode ? 'bg-black/5 text-black' : 'bg-white/10 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>
                {selectedNeed === 'onetime'
                  ? 'SELF-SERVE SPECIFICATION'
                  : selectedNeed === 'audit'
                  ? 'RECOMMENDED: COMPLETE REMEDIATION KIT'
                  : 'THE ENTERPRISE ANCHOR'}
              </span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-semibold font-sans ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
              {selectedNeed === 'onetime'
                ? 'Self-Serve Blueprint ($247)'
                : selectedNeed === 'audit'
                ? 'Turnkey Remediation ($547)'
                : 'Managed Outbound Infrastructure ($1,247)'}
            </h3>

            <p className={`text-sm font-normal leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
              {selectedNeed === 'onetime'
                ? 'Receive a forensic PDF/JSON assessment of SPF syntax, DKIM key resolution, and DMARC enforcement policy with calculated risk grades.'
                : selectedNeed === 'audit'
                ? 'Everything in Self-Serve Blueprint plus zero-touch direct DNS execution, provider configurations, and 14-day post-launch verification.'
                : 'A fully scaled, dedicated cold email engine. We build, warm, manage, and maintain your sending architecture with 10 dedicated domains and 30 authenticated inboxes.'}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full md:w-auto">
            <button
              id="teaser-pricing-cta"
              onClick={onNavigateToPricing}
              data-cursor="grow"
              className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-sans font-medium text-xs tracking-wide active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-md min-h-[48px] ${
                isLightMode
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              <span>Explore Full Pricing Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="font-mono text-[11px] text-neutral-400">
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
