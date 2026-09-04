'use client'

import React, { useState } from 'react';
import { FileCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface HowItWorksProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

const STEPS = [
  {
    step: '01',
    title: 'Scope & Checkout',
    body: 'Select your domain volume on the pricing engine. Settle the one-off infrastructure fee via Paddle.',
  },
  {
    step: '02',
    title: 'The Technical Intake',
    body: 'Complete a 3-minute brief: root naming preferences, target sequencer, and provider choice.',
  },
  {
    step: '03',
    title: 'The 48-Hour Handoff',
    body: 'Receive your encrypted deployment sheet, verify RFC compliance through third-party diagnostics, and revoke our temporary DNS permissions.',
  },
];

export function HowItWorks({
  isLightMode = false,
  isLivePreview = false,
}: HowItWorksProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="how-it-works"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Top-Left Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 15% 15%, rgba(0,0,0,0.03) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.045) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="03"
        mobileText="03"
        top="-30px"
        left="-30px"
        size="text-[28rem]"
        mobileTop="-10px"
        mobileLeft="-10px"
        mobileSize="text-[9rem]"
        opacity="opacity-[0.02]"
        mobileOpacity="opacity-[0.025]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Asymmetric Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column: Anchored Title */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6 text-left">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
                }`}
            >
              <span className="block whitespace-nowrap">Three Steps.</span>
              <span className="block whitespace-nowrap">Zero Friction.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-sm ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
              Zero discovery calls. Zero account lock-in. A straightforward, 3-step technical deployment.
            </motion.p>
          </div>

          {/* Right Column: Full-Width Horizontal Data Strips without Dividing Borders */}
          <div className="lg:col-span-7 space-y-3">
            {STEPS.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              const hasHover = hoveredIdx !== null;
              const isDimmed = hasHover && !isHovered;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`relative py-6 sm:py-8 transition-all duration-300 cursor-default ${isDimmed ? 'opacity-30' : 'opacity-100'
                    }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-neutral-600">
                        {item.step}
                      </span>
                      <h3
                        className={`font-sans font-medium text-lg sm:text-xl tracking-tight ${isLightMode ? 'text-neutral-900' : 'text-neutral-100'
                          }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`font-sans text-xs sm:text-sm leading-relaxed pl-[3.25rem] ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                        }`}
                    >
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* Disclosures without divider */}
            <div className="pt-6 pb-4 space-y-3 text-xs sm:text-[13px] leading-relaxed text-neutral-400">
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] shrink-0 mt-1.5" />
                <p className="font-bold text-neutral-300">
                  We never purchase domains under our entity. We deploy inside your Cloudflare and Google accounts using your delegated operator role. We cannot hold assets hostage because we never hold ownership.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)] shrink-0 mt-1.5" />
                <p className="font-bold text-neutral-300">
                  Paddle acts as the Merchant of Record. Your transaction is covered by standard SaaS chargeback and dispute protections. If we miss the 48h SLA or fail RFC checks, funds are reversed automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
