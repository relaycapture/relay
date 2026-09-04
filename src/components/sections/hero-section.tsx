'use client'

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface HeroSectionProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
  onScanClick?: () => void;
  onExploreClick?: () => void;
}

export function HeroSection({
  isLightMode = false,
  isLivePreview = false,
  onScanClick,
  onExploreClick,
}: HeroSectionProps) {
  const handleConfigureFleet = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('fleet-pricing-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewSpecs = () => {
    if (onScanClick) {
      onScanClick();
    } else {
      const el = document.getElementById('cryptographic-baseline') || document.getElementById('domain-checker-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="hero-section"
      className={`relative w-full min-h-screen h-[100dvh] min-h-[100dvh] flex flex-col justify-center items-start overflow-x-clip z-10 select-none transition-colors duration-300 ${isLivePreview
        ? 'py-6 px-4 sm:px-6'
        : 'py-20 sm:py-24 md:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14'
        } bg-transparent`}
    >
      {/* Center Radial Ambient Spotlight for Hero */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.035) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 35%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark */}
      <SectionWatermark
        text="RELAY"
        mobileText="RELAY"
        top="-30px"
        left="-30px"
        size="text-[28rem]"
        mobileTop="37px"
        mobileLeft="-10px"
        mobileSize="text-[10.2rem]"
        opacity="opacity-[0.02]"
        mobileOpacity="opacity-[0.025]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Paragraph, Machined CTAs */}
          <div className="lg:col-span-12 xl:col-span-10 text-left">
            {/* Subtle Clean Eyebrow / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`font-mono text-[9.5px] sm:text-[11px] md:text-xs tracking-widest uppercase mb-7 sm:mb-7 select-none transition-colors ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                }`}
            >
              ZERO CALLS · 48-HOUR SLA · SOVEREIGN ASSET OWNERSHIP
            </motion.p>

            {/* Fact-Based Modern Headline: Scoped to never bleed off screen while remaining two lines on desktop */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className={`font-sans font-medium tracking-[-0.04em] leading-[1.08] sm:leading-[0.98] mb-6 sm:mb-6 text-[1.65rem] min-[380px]:text-[1.85rem] min-[440px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                }`}
            >
              <span className="block sm:whitespace-nowrap">Dedicated Outbound Architecture.</span>
              <span className={`block sm:whitespace-nowrap mt-1 sm:mt-0 ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                Built By Hand. Owned By You.
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className={`text-xs sm:text-sm md:text-[15px] font-normal leading-[1.7] sm:leading-relaxed max-w-xl mb-8 sm:mb-9 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
              We engineer enterprise-grade secondary sending infrastructure. Delivered to your sequencer in 48 hours. No client contact. No middleman markups.
            </motion.p>

            {/* Two Action CTAs: Next to each other on phone view as well */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="flex flex-row items-center gap-2.5 sm:gap-4 pt-2 w-full max-w-lg"
            >
              {/* 1. Primary CTA: Configure Fleet */}
              <button
                id="hero-configure-fleet-btn"
                data-cursor="grow"
                onClick={handleConfigureFleet}
                className={`flex-1 sm:flex-initial px-3.5 sm:px-7 py-3 sm:py-3.5 rounded-[2px] font-sans font-medium text-xs sm:text-sm transition-all duration-150 border flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${isLightMode
                  ? 'bg-neutral-900 hover:bg-black text-white border-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.15)]'
                  : 'bg-neutral-100 hover:bg-white text-neutral-900 border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_6px_20px_rgba(0,0,0,0.6)]'
                  }`}
              >
                <span>Configure Fleet</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>

              {/* 2. Secondary CTA: View Technical Specs */}
              <button
                id="hero-view-specs-btn"
                data-cursor="grow"
                onClick={handleViewSpecs}
                className={`flex-1 sm:flex-initial px-3 sm:px-7 py-3 sm:py-3.5 rounded-[2px] font-sans font-medium text-xs sm:text-sm transition-all duration-150 border backdrop-blur-md flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap ${isLightMode
                  ? 'bg-transparent hover:bg-black/[0.04] text-neutral-800 border-black/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 border-white/[0.12] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                  }`}
              >
                <span>View Technical Specs</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
