'use client'

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { openPaddleCheckout, PADDLE_CONFIG } from '../../utils/paddle';

interface HeroSectionProps {
  isLightMode: boolean;
  onScanClick?: () => void;
  onExploreClick?: () => void;
  isLivePreview?: boolean;
}

export function HeroSection({
  isLightMode,
  onScanClick,
  onExploreClick,
  isLivePreview = false,
}: HeroSectionProps) {
  const handlePricingCheckout = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
    }
  };

  const handleScanClick = () => {
    if (onScanClick) {
      onScanClick();
    } else {
      const el = document.getElementById('domain-checker-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden z-10 select-none transition-colors duration-300 ${
        isLivePreview
          ? 'py-6 px-4 sm:px-8'
          : 'pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-8 md:px-12 lg:px-24'
      } bg-transparent`}
    >
      {/* Subtle Ambient Radial Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle at 50% 30%, rgba(0, 0, 0, 0.02) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.025) 0%, transparent 70%)',
        }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        {/* Subtle Clean Eyebrow / Tagline */}
        <p
          className={`font-mono text-[10px] sm:text-[11px] md:text-xs tracking-widest uppercase mb-6 sm:mb-8 select-none transition-colors ${
            isLightMode ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          PUBLIC DNS ONLY · NO CREDENTIALS · NO MAILBOX ACCESS
        </p>

        {/* Fact-Based Modern Headline: FIXED TO TWO BIG VISIBLE LINES ON ALL SCREEN SIZES */}
        <h1
          className={`font-sans font-semibold tracking-[-0.035em] leading-[1.12] mb-4 sm:mb-6 text-center text-[clamp(1.75rem,5.2vw,3.75rem)] ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <span className="block whitespace-nowrap">Is your outbound email</span>
          <span className={`block whitespace-nowrap ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
            actually authenticated?
          </span>
        </h1>

        {/* Subtitle Description (A bit smaller but readable) */}
        <p
          className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          Check your configuration before mailbox providers do it for you.
        </p>

        {/* Two Centralized Action CTAs: One CTA, One Scan */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
          {/* 1. Primary Scan Button */}
          <button
            id="hero-scan-cta-btn"
            data-cursor="grow"
            onClick={handleScanClick}
            className={`rc-grain-surface w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md border shadow-lg flex items-center justify-center gap-2 min-h-[44px] ${
              isLightMode
                ? 'bg-[#1d1d1f]/90 hover:bg-black text-white border-black/20 shadow-black/10'
                : 'bg-white/90 hover:bg-white text-[#0a0a0c] border-white/30 shadow-white/5'
            }`}
          >
            <span>Scan Your Domain</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* 2. Secondary CTA Button */}
          <button
            id="hero-explore-cta-btn"
            data-cursor="grow"
            onClick={handlePricingCheckout}
            className={`rc-grain-surface w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-1.5 border shadow-sm min-h-[44px] ${
              isLightMode
                ? 'bg-black/[0.04] hover:bg-black/[0.08] text-neutral-800 border-black/10'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border-white/10'
            }`}
          >
            <span>View Pricing</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>
    </section>
  );
}
