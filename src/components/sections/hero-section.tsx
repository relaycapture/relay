'use client'

import { ArrowUpRight } from 'lucide-react';
import { openPaddleCheckout, PADDLE_CONFIG } from '../../utils/paddle';
import { DomainChecker } from '../domain-checker';
import { ScanResult } from '../../types';

interface HeroSectionProps {
  isLightMode: boolean;
  onScanResult?: (result: ScanResult) => void;
  onDomainChange?: (domain: string) => void;
  onScanClick?: () => void;
  onExploreClick?: () => void;
  isLivePreview?: boolean;
}

export function HeroSection({
  isLightMode,
  onScanResult,
  onDomainChange,
  onExploreClick,
  isLivePreview = false,
}: HeroSectionProps) {
  const handlePricingCheckout = () => {
    openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden z-10 select-none transition-colors duration-300 ${
        isLivePreview
          ? 'py-6 px-4 sm:px-8'
          : 'pt-28 sm:pt-32 md:pt-36 pb-16 sm:pb-20 md:pb-28 px-4 sm:px-8 md:px-12 lg:px-24'
      } bg-transparent`}
    >
      {/* Subtle Ambient Radial Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle at 50% 25%, rgba(0, 0, 0, 0.02) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.025) 0%, transparent 70%)',
        }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        {/* Clean Text Tagline - No shield icon, no pill background */}
        <p className={`font-mono text-[11px] sm:text-xs md:text-sm tracking-wider uppercase mb-4 sm:mb-6 select-none transition-colors ${
          isLightMode ? 'text-neutral-500' : 'text-neutral-400'
        }`}>
          PUBLIC DNS ONLY · NO CREDENTIALS · NO MAILBOX ACCESS
        </p>

        {/* Fact-Based Modern Headline */}
        <h1
          className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 sm:mb-6 text-center ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <span className="block">Every mail server already has</span>
          <span className={`block ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
            an opinion about your domain.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p
          className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          SPF, DKIM, and DMARC — Gmail and Outlook check all three before your email is even opened. See exactly what they see, using nothing but public DNS.
        </p>

        {/* Real-time Domain Checker Input & Live Scorecard - Pulled Above The Fold */}
        <div id="domain-checker-section" className="w-full max-w-4xl mx-auto mb-6 sm:mb-8">
          <DomainChecker
            onResultCalculated={onScanResult}
            onDomainChange={onDomainChange}
            isLightMode={isLightMode}
          />
        </div>

        {/* Secondary Action - View Pricing */}
        <div className="flex items-center justify-center gap-3">
          <button
            id="hero-explore-cta-btn"
            data-cursor="grow"
            onClick={handlePricingCheckout}
            className={`rc-grain-surface px-4 sm:px-5 py-2.5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-1.5 border shadow-sm min-h-[38px] ${
              isLightMode
                ? 'bg-black/[0.04] hover:bg-black/[0.08] text-neutral-800 border-black/10'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border-white/10'
            }`}
          >
            <span>One-Time Remediation ($247+)</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>
    </section>
  );
}
