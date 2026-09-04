'use client'

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface CryptographicBaselineProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

const BASELINE_CRITERIA = [
  {
    standard: 'RFC 7208',
    protocol: 'SPF',
    label: 'Sender Policy Framework',
    spec: 'Flattened, single-include architecture. Lookup depth locked at \u2264 2 (RFC limit: 10).',
    detail: 'v=spf1 include:_spf.google.com ~all \u2014 Zero DNS resolution overflow risk.',
  },
  {
    standard: 'RFC 6376',
    protocol: 'DKIM',
    label: 'DomainKeys Identified Mail',
    spec: 'Dedicated 2048-bit RSA keys per subdomain.',
    detail: 'Unique cryptographic selector key pairs generated per sending entity with 0% cross-tenant reuse.',
  },
  {
    standard: 'RFC 7489',
    protocol: 'DMARC',
    label: 'Message Authentication & Reporting',
    spec: 'Strict domain alignment enforced with active RUA aggregate reporting.',
    detail: 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@... Forensic telemetry active at dispatch.',
  },
  {
    standard: 'Edge Security',
    protocol: 'TLS 1.3',
    label: 'Custom Tracking Domain CNAMEs',
    spec: 'TLS 1.3 enforced across all custom tracking CNAME records with automated HTTP-to-HTTPS redirection.',
    detail: 'Eliminates Cloudflare SSL handshake mismatch errors and spam filter proxy flags.',
  },
];

export function CryptographicBaseline({
  isLightMode = false,
  isLivePreview = false,
}: CryptographicBaselineProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="cryptographic-baseline"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Bottom-Left Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 15% 85%, rgba(0,0,0,0.03) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 15% 85%, rgba(255,255,255,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="RFC"
        mobileText="RFC"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8 text-left">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
                }`}
            >
              <span className="block whitespace-nowrap">Hardened Cryptographic</span>
              <span className="block whitespace-nowrap">Baseline.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4 text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
              <span className="block">What receiving mail servers see.</span>
              <span className="block">Every domain we deploy is engineered to pass strict RFC criteria before handoff:</span>
            </motion.p>
          </div>
        </div>

        {/* Full-Width Horizontal Data Strips — Borderless Telemetry Ledger */}
        <div className="w-full space-y-4">
          {BASELINE_CRITERIA.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const hasHover = hoveredIdx !== null;
            const isDimmed = hasHover && !isHovered;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative py-6 sm:py-8 transition-all duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'
                  }`}
              >
                {/* Horizontal Data Strip Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Standard Code & Protocol */}
                  <div className="lg:col-span-3 flex flex-col gap-1">
                    <div className="font-mono text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <span>{item.standard}</span>
                      <span className="text-neutral-600 font-normal">/</span>
                      <span className="text-neutral-400 font-medium">{item.protocol}</span>
                    </div>
                    <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                      {item.label}
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`w-1.5 h-1.5 bg-white transition-shadow duration-300 ${isHovered ? 'shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'shadow-[0_0_4px_rgba(255,255,255,0.4)]'}`} />
                      <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 font-medium">
                        ENFORCED
                      </span>
                    </div>
                  </div>

                  {/* Center Column: Specification Rationale */}
                  <div className="lg:col-span-4">
                    <p
                      className={`font-sans font-medium text-sm sm:text-base tracking-tight leading-snug ${isLightMode ? 'text-neutral-900' : 'text-neutral-200'
                        }`}
                    >
                      {item.spec}
                    </p>
                  </div>

                  {/* Right Column: Technical Detail String */}
                  <div className="lg:col-span-5">
                    <div className="font-mono text-xs leading-relaxed text-white/60 overflow-x-auto whitespace-nowrap [scrollbar-width:none]">
                      <span className="text-neutral-500 mr-2 select-none">›</span>
                      {item.detail}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
