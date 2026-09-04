'use client'

import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface PreOrderChecklistProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

const PREREQUISITES = [
  {
    num: '1',
    title: 'Secondary Domains',
    desc: '10 pre-registered domains inside your registrar (or purchase our recommended name list via a 1-click bulk registrar cart link).',
  },
  {
    num: '2',
    title: 'Dedicated Tenant',
    desc: 'An active Google Workspace or Microsoft 365 parent tenant with one temporary delegated Administrator invite.',
  },
  {
    num: '3',
    title: 'Sequencer Access',
    desc: 'A member or API invite to your Smartlead or Instantly workspace.',
  },
];

export function PreOrderChecklist({
  isLightMode = false,
  isLivePreview = false,
}: PreOrderChecklistProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="prerequisites-section"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Bottom-Right Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 85% 85%, rgba(0,0,0,0.03) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 85% 85%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="PRE"
        mobileText="PRE"
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
        {/* Asymmetric Header Layout — 6/6 column split with calculated typography preventing cross-column collision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Anchored Title */}
          <div className="lg:col-span-6 lg:sticky lg:top-32 space-y-6 text-left">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-3xl sm:text-4xl lg:text-[2.5rem] xl:text-[3.25rem] 2xl:text-[3.75rem] font-medium tracking-[-0.04em] leading-[1.08] sm:leading-[1.02] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
                }`}
            >
              <span className="block whitespace-nowrap">Have These Ready</span>
              <span className="block whitespace-nowrap">Before Ordering</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-lg ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
              To maintain our strict 48-hour SLA without introductory calls or discovery delays, you must provide three assets in the technical brief immediately post-checkout:
            </motion.p>
          </div>

          {/* Right Column: Austere Technical Manifest without Dividers */}
          <div className="lg:col-span-6 space-y-4">
            {PREREQUISITES.map((item, idx) => {
              const isHovered = hoveredIdx === idx;
              const hasHover = hoveredIdx !== null;
              const isDimmed = hasHover && !isHovered;

              return (
                <motion.div
                  key={item.num}
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
                      <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        0{item.num}
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
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
