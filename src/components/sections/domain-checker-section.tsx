'use client'

import React, { useRef } from 'react';
import { DomainChecker } from '../domain-checker';
import { SectionWatermark } from '../section-watermark';
import { ScanResult } from '../../types';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface DomainCheckerSectionProps {
  onScanResult: (result: ScanResult) => void;
  onDomainChange?: (domain: string) => void;
  onOpenRevenueImpact?: () => void;
  isLightMode: boolean;
  isLivePreview?: boolean;
}

export function DomainCheckerSection({
  onScanResult,
  onDomainChange,
  onOpenRevenueImpact,
  isLightMode,
  isLivePreview = false,
}: DomainCheckerSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Cursor-tracking radial glow
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { damping: 35, stiffness: 220 });
  const springY = useSpring(mouseY, { damping: 35, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowBackground = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.025), transparent 80%)`;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="domain-checker-section"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 ${isLivePreview
        ? 'h-full min-h-full flex flex-col justify-center items-center py-8'
        : 'py-32 sm:py-40 md:py-48'
        }`}
      style={isLivePreview ? { height: '100%', minHeight: '100%' } : undefined}
    >
      {/* Top-Right Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 85% 15%, rgba(0,0,0,0.03) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 85% 15%, rgba(255,255,255,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Cursor-Tracking Radial Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: glowBackground }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="AUDIT"
        mobileText="AUDIT"
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
        {/* Section Header (No Section Index banner, No Eyebrow per directive) */}
        <div className="mb-12 sm:mb-16 text-left max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
              }`}
          >
            <span className="block whitespace-nowrap">Inspect Any Domain</span>
            <span className="block whitespace-nowrap">in Real-Time.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed mt-4 max-w-2xl ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            <span className="block">Enter a domain to query root nameservers directly</span>
            <span className="block">via Cloudflare DNS-over-HTTPS.</span>
          </motion.p>
        </div>

        {/* Full-Width Edge-to-Edge Domain Checker Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-full"
        >
          <DomainChecker
            onResultCalculated={onScanResult}
            onDomainChange={onDomainChange}
            onOpenRevenueImpact={onOpenRevenueImpact}
            isLightMode={isLightMode}
          />
        </motion.div>

        {/* Minimal Scope Callout */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 font-mono text-[10px] tracking-wider leading-relaxed text-neutral-500"
        >
          <span className="text-neutral-300 mr-1.5 font-bold">›</span>
          PUBLIC DNS ONLY · NO CREDENTIALS REQUIRED · NO MAILBOX ACCESS
        </motion.div>
      </div>
    </section>
  );
}
