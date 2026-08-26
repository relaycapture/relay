'use client'

import { ArrowDown, ArrowUpRight, ShieldCheck } from 'lucide-react';
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
    openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-center items-center text-center overflow-hidden z-10 select-none transition-colors duration-300 ${
        isLivePreview
          ? 'py-6 px-8'
          : 'pt-32 sm:pt-36 pb-20 sm:pb-28 md:pb-36 px-4 sm:px-8 md:px-12 lg:px-24'
      } bg-transparent`}
    >
      {/* Subtle Ambient Radial Lighting Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: isLightMode
            ? 'radial-gradient(circle at 50% 35%, rgba(0, 0, 0, 0.02) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.025) 0%, transparent 70%)',
        }}
      />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center my-auto">
        {/* Human Language Tagline Badge */}
        <div
          className={`rc-grain-surface inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs tracking-wider uppercase mb-6 sm:mb-8 border backdrop-blur-md ${
            isLightMode
              ? 'bg-black/[0.03] border-black/10 text-neutral-700'
              : 'bg-white/[0.04] border-white/10 text-neutral-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>PUBLIC DNS ONLY · NO CREDENTIALS · NO MAILBOX ACCESS</span>
        </div>

        {/* Staggered Apple-Inspired Typography */}
        <h1
          className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 sm:mb-6 text-center ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <span className="block">Is your outbound email</span>
          <span className={`block ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
            actually authenticated?
          </span>
        </h1>

        {/* Subtitle Description */}
        <p
          className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-12 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          Check your configuration before mailbox providers do it for you.
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
            <span>Check Deliverability</span>
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
            <span>View Pricing</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </button>
        </div>
      </div>
    </section>
  );
}
