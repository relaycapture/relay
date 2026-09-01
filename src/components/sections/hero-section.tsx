'use client'

import { Search, ArrowUpRight } from 'lucide-react';
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
  const handleDeployBuildout = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
    }
  };

  const handleCheckDomain = () => {
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
          className={`font-mono text-[9.5px] sm:text-[11px] md:text-xs tracking-widest uppercase mb-5 sm:mb-7 select-none transition-colors ${
            isLightMode ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          PUBLIC DNS ONLY · NO CREDENTIALS · NO MAILBOX ACCESS
        </p>

        {/* Fact-Based Modern Headline: STRICTLY TWO BIG VISIBLE LINES ON ANY SCREEN SIZE */}
        <h1
          className={`font-sans font-semibold tracking-[-0.035em] leading-[1.12] mb-4 sm:mb-6 text-center text-[clamp(1.65rem,5.2vw,3.75rem)] ${
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
          className={`text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed max-w-lg mx-auto mb-7 sm:mb-9 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          Check your configuration before mailbox providers do it for you.
        </p>

        {/* Two Centralized Action CTAs: 1. Deploy Buildout  2. Check Domain */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
          {/* 1. Primary CTA: Deploy Buildout */}
          <button
            id="hero-deploy-buildout-btn"
            data-cursor="grow"
            onClick={handleDeployBuildout}
            className={`rc-grain-surface w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md border shadow-lg flex items-center justify-center gap-2 min-h-[44px] ${
              isLightMode
                ? 'bg-[#1d1d1f]/90 hover:bg-black text-white border-black/20 shadow-black/10'
                : 'bg-white/90 hover:bg-white text-[#0a0a0c] border-white/30 shadow-white/5'
            }`}
          >
            <span>Deploy Buildout</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* 2. Secondary Button: Check Domain */}
          <button
            id="hero-check-domain-btn"
            data-cursor="grow"
            onClick={handleCheckDomain}
            className={`rc-grain-surface w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-full font-sans font-medium text-xs sm:text-sm transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-1.5 border shadow-sm min-h-[44px] ${
              isLightMode
                ? 'bg-black/[0.04] hover:bg-black/[0.08] text-neutral-800 border-black/10'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-neutral-200 border-white/10'
            }`}
          >
            <Search className="w-3.5 h-3.5 opacity-60" />
            <span>Check Domain</span>
          </button>
        </div>
      </div>
    </section>
  );
}
