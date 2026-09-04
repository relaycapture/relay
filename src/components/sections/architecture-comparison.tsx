'use client'

import React, { useState } from 'react';
import { Info, Check, X, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface ArchitectureComparisonProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

interface ParameterRow {
  id: string;
  parameter: string;
  directTitle: string;
  directDetail: string;
  resellerTitle: string;
  resellerDetail: string;
}

const COMPARISON_ROWS: ParameterRow[] = [
  {
    id: 'workspace-hierarchy',
    parameter: 'Workspace Hierarchy',
    directTitle: 'Direct Super-Admin Console',
    directDetail: 'Unrestricted access to master audit logs, custom SAML/SSO, and direct API token generation.',
    resellerTitle: 'Restricted Virtualized Seats',
    resellerDetail: 'No master console access. Inability to export identity logs, modify core security policies, or audit tenant health.',
  },
  {
    id: 'asset-ownership',
    parameter: 'Asset Ownership & Portability',
    directTitle: '100% Client-Owned',
    directDetail: 'Registered inside your Cloudflare and registrar accounts. Permanently portable to any MTA or sequencer.',
    resellerTitle: 'Proprietary Vendor Lock-in',
    resellerDetail: 'DNS zones managed via third-party routing. Cancellation of monthly subscription terminates asset control.',
  },
  {
    id: 'network-topology',
    parameter: 'Network & IP Topology',
    directTitle: 'Zero Cross-Tenant Contamination',
    directDetail: 'Reputation is strictly isolated to your verified sending volume and list quality.',
    resellerTitle: 'Shared /24 CIDR Subnets',
    resellerDetail: 'IP Risk: Reckless sending behavior from an unrelated user risks blacklisting the entire IP block.',
  },
  {
    id: 'dkim-architecture',
    parameter: 'DKIM Architecture',
    directTitle: 'Isolated 2048-Bit RSA Keys',
    directDetail: 'Unique cryptographic selectors generated per sending subdomain with zero cross-tenant key reuse.',
    resellerTitle: 'Shared / Dynamic Selectors',
    resellerDetail: 'Rotation risk: shared selectors rotate unpredictably across the entire tenant pool.',
  },
  {
    id: 'unit-economics',
    parameter: 'Unit Economics',
    directTitle: 'Fixed CapEx',
    directDetail: 'One-time engineering implementation fee. Upstream provider seats (Google/M365) billed strictly at wholesale cost.',
    resellerTitle: 'Compounding OpEx',
    resellerDetail: 'Monthly subscription cost scales with inbox count, creating compounding operational expenses that exceed the value of shared infrastructure.',
  },
];

export function ArchitectureComparison({
  isLightMode = false,
  isLivePreview = false,
}: ArchitectureComparisonProps) {
  const [pinnedInfoId, setPinnedInfoId] = useState<string | null>(null);
  const [hoveredInfoId, setHoveredInfoId] = useState<string | null>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const togglePin = (id: string) => {
    setPinnedInfoId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="comparison-section"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Center-Left Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 15% 50%, rgba(0,0,0,0.03) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 15% 50%, rgba(255,255,255,0.045) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="MTA"
        mobileText="MTA"
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
        {/* Asymmetric Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8 text-left">

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[1.65rem] min-[390px]:text-[1.85rem] min-[440px]:text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
                }`}
            >
              <span className="block whitespace-nowrap">Direct Dedicated vs.</span>
              <span className="block whitespace-nowrap">Automated Reseller Pools</span>
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
              The structural difference between sovereign digital assets and shared SaaS rental dependencies:
            </motion.p>
          </div>
        </div>

        {/* Dense Architectural Spec Table without dividers */}
        <div className="w-full">
          {/* Column Headers */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 sm:gap-8 pb-4 font-mono text-[10px] tracking-widest uppercase text-neutral-500 select-none">
            <div className="md:col-span-4">ARCHITECTURAL PARAMETER</div>
            <div className="md:col-span-4 flex items-center gap-2 text-white font-semibold">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>DIRECT DEDICATED ARCHITECTURE</span>
            </div>
            <div className="md:col-span-4 flex items-center gap-2 text-neutral-400">
              <span className="w-1.5 h-1.5 bg-neutral-600" />
              <span>AUTOMATED RESELLER POOLS</span>
            </div>
          </div>

          {/* Rows without horizontal dividers */}
          <div className="space-y-3">
            {COMPARISON_ROWS.map((row, idx) => {
              const isExpanded = pinnedInfoId === row.id || hoveredInfoId === row.id;
              const isRowHovered = hoveredRowId === row.id;
              const hasHoveredRow = hoveredRowId !== null;
              const isDimmed = hasHoveredRow && !isRowHovered;

              return (
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                  onMouseEnter={() => setHoveredRowId(row.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  className={`relative py-5 sm:py-7 transition-all duration-300 ${isDimmed ? 'opacity-30' : 'opacity-100'
                    }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
                    {/* Left Column: Parameter Name */}
                    <div className="md:col-span-4 flex items-baseline justify-between pr-4">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`font-sans font-medium text-base sm:text-lg tracking-tight ${isLightMode
                              ? 'text-neutral-900'
                              : isRowHovered
                                ? 'text-white'
                                : 'text-neutral-200'
                            }`}
                        >
                          {row.parameter}
                        </span>
                        <button
                          type="button"
                          onClick={() => togglePin(row.id)}
                          onMouseEnter={() => setHoveredInfoId(row.id)}
                          onMouseLeave={() => setHoveredInfoId(null)}
                          className={`p-1 rounded transition-colors cursor-pointer flex items-center justify-center ${isExpanded
                              ? 'text-white bg-white/10 ring-1 ring-white/30'
                              : isLightMode
                                ? 'text-neutral-400 hover:text-black hover:bg-black/5'
                                : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            }`}
                          title={isExpanded ? 'Click to close specifications' : 'Hover or click to view architectural specifications'}
                          aria-label={`Toggle description for ${row.parameter}`}
                        >
                          <Info className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Center Column: Direct Dedicated */}
                    <div className="md:col-span-4 flex flex-col justify-start">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                        <div className="space-y-1.5 flex-1">
                          <span
                            className={`font-sans font-medium text-sm sm:text-base tracking-tight block ${isLightMode
                                ? 'text-neutral-900'
                                : isRowHovered
                                  ? 'text-neutral-100'
                                  : 'text-neutral-200'
                              }`}
                          >
                            {row.directTitle}
                          </span>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                className={`text-xs font-mono leading-relaxed overflow-hidden ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'
                                  }`}
                              >
                                ({row.directDetail})
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <span className="md:hidden block text-[10px] font-mono tracking-widest text-neutral-300 uppercase mt-1 pl-6">
                        Dedicated Architecture
                      </span>
                    </div>

                    {/* Right Column: Reseller Pools */}
                    <div className="md:col-span-4 flex flex-col justify-start">
                      <div className="flex items-start gap-2.5">
                        <X className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                        <div className="space-y-1.5 flex-1">
                          <span
                            className={`font-sans font-normal text-sm sm:text-base tracking-tight block ${isLightMode
                                ? 'text-neutral-600'
                                : 'text-neutral-400'
                              }`}
                          >
                            {row.resellerTitle}
                          </span>
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                className={`text-xs font-mono leading-relaxed overflow-hidden ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                                  }`}
                              >
                                ({row.resellerDetail})
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <span className="md:hidden block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1 pl-6">
                        Reseller Pools
                      </span>
                    </div>
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
