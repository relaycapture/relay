'use client'

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { openPaddleCheckout, PADDLE_CONFIG } from '../../utils/paddle';

interface HeroSectionProps {
  isLightMode: boolean;
  onScanClick: () => void;
  onExploreClick: () => void;
  isLivePreview?: boolean;
}

export function HeroSection({
  isLightMode,
  onScanClick,
  onExploreClick,
  isLivePreview = false,
}: HeroSectionProps) {
  const handlePricingCheckout = () => {
    // Open Paddle Checkout directly for Turnkey remediation
    openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden z-10 select-none transition-colors duration-300 ${
        isLivePreview
          ? 'py-6 px-8'
          : 'pt-32 sm:pt-36 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-8 md:px-12 lg:px-24'
      } ${isLightMode ? 'bg-[#fbfbfd]' : 'bg-[#0f0d13]'}`}
    >
      {/* Subtle Ambient Radial Lighting Gradient to blend seamlessly */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle at 50% 35%, rgba(0, 0, 0, 0.03) 0%, rgba(251, 251, 253, 0.8) 60%, #fbfbfd 100%)'
            : 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.035) 0%, rgba(15, 13, 19, 0.8) 60%, #0f0d13 100%)',
        }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        {/* Staggered Apple-Inspired Typography */}
        <h1
          className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 sm:mb-6 text-center ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <span className="block">Your domain is speaking.</span>
          <span className={`block ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
            Do you know what it says?
          </span>
        </h1>

        {/* Subtitle Description */}
        <p
          className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          <span className="block">Since 2024, if your domain pisses off Google or Microsoft.</span>
          <span className="block">They grab it to a dark corner and beat it to death.</span>
        </p>

        {/* Centralized Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-xs sm:max-w-none">
          <button
            id="hero-scan-cta-btn"
            data-cursor="grow"
            onClick={onScanClick}
            className={`rc-grain-surface w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md border shadow-xl flex items-center justify-center gap-2 min-h-[48px] ${
              isLightMode
                ? 'bg-[#1d1d1f]/90 hover:bg-black text-white border-black/20 shadow-black/10'
                : 'bg-white/90 hover:bg-white text-[#0a0a0c] border-white/30 shadow-white/5'
            }`}
          >
            <span>Scan Your Domain</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            id="hero-explore-cta-btn"
            data-cursor="grow"
            onClick={handlePricingCheckout}
            className={`rc-grain-surface w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-1.5 border shadow-md min-h-[48px] ${
              isLightMode
                ? 'bg-black/[0.04] hover:bg-black/[0.08] text-neutral-800 border-black/10'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border-white/10'
            }`}
          >
            <span>One-Time Pricing</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>

      {/* Subtle bottom fade to blend smoothly into next section */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-28 sm:h-36 pointer-events-none ${
          isLightMode
            ? 'bg-gradient-to-t from-[#fbfbfd] via-[#fbfbfd]/80 to-transparent'
            : 'bg-gradient-to-t from-[#0f0d13] via-[#0f0d13]/80 to-transparent'
        }`}
      />
    </section>
  );
}
