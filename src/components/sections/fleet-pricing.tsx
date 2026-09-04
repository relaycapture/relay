'use client'

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { MechanicalOdometer } from '../mechanical-odometer';
import Silk from '../Silk';
import { SectionWatermark } from '../section-watermark';
import { openServerPaddleCheckout } from '../../utils/paddle';

interface FleetPricingProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
  onOpenSampleModal?: () => void;
}

export function FleetPricing({
  isLightMode = false,
  isLivePreview = false,
}: FleetPricingProps) {
  const [domainCount, setDomainCount] = useState<number>(10);
  const [isMintingTransaction, setIsMintingTransaction] = useState(false);

  const inboxes = domainCount * 3;
  const engineeringFee = domainCount * 100;
  const minEmails = inboxes * 30 * 30;
  const maxEmails = inboxes * 40 * 30;
  const fillPercent = Math.min(100, Math.max(0, ((domainCount - 1) / 99) * 100));

  const handleCheckout = async () => {
    if (isMintingTransaction) return;
    setIsMintingTransaction(true);

    try {
      await openServerPaddleCheckout(domainCount);
    } catch (err: any) {
      console.error('Checkout initialization failed:', err);
    } finally {
      setIsMintingTransaction(false);
    }
  };

  const tickCount = 20;

  return (
    <section
      id="fleet-pricing-section"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Center Radial Ambient Spotlight for Pricing Section */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0.035) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 45%, rgba(255,255,255,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="CAPEX"
        mobileText="CAPEX"
        top="-30px"
        left="-30px"
        size="text-[28rem]"
        mobileTop="-10px"
        mobileLeft="-10px"
        mobileSize="text-[9rem]"
        opacity="opacity-[0.02]"
        mobileOpacity="opacity-[0.025]"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header (No Section Index, No Eyebrow) */}
        <div className="text-left max-w-3xl mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] mb-4 ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
              }`}
          >
            <span className="block whitespace-nowrap">Transparent Pricing.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            Because <strong className="font-semibold text-white">"Sent to Spam"</strong> is an expensive way to say hello.
          </motion.p>
        </div>

        {/* Detached Two-Part Pricing Architecture */}
        <div className="space-y-6 sm:space-y-8">
          {/* PART 1: The Fleet Configurator (Slider & Dynamic Changing Numbers) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`p-7 sm:p-10 border transition-all duration-300 relative ${isLightMode
              ? 'bg-white/95 border-black/10 text-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
              : 'bg-[#09090b]/90 border-white/[0.08] text-white shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              }`}
          >
            {/* Top Label & Mechanical Live Counter */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
              <span
                className={`font-mono text-[10px] uppercase tracking-widest font-semibold ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                  }`}
              >
                DOMAINS FLEET SIZE
              </span>

              <div className="flex items-baseline gap-2 font-mono text-xl sm:text-2xl font-bold text-white">
                <MechanicalOdometer value={domainCount} />
                <span className="text-base font-medium text-neutral-200">
                  {domainCount === 1 ? 'Domain' : 'Domains'}
                </span>
                <span className="text-neutral-400 text-sm font-normal">
                  (<MechanicalOdometer value={inboxes} /> Inboxes)
                </span>
              </div>
            </div>

            {/* Precision Mechanical Scale & Illuminated Ticks */}
            <div className="relative pt-2 pb-6">
              <div
                className="flex justify-between items-end h-5 w-full px-1 mb-2 pointer-events-none select-none"
                aria-hidden="true"
              >
                {Array.from({ length: tickCount + 1 }).map((_, idx) => {
                  const isMajor = idx % 5 === 0;
                  const percent = (idx / tickCount) * 100;
                  const isPassed = domainCount >= (idx / tickCount) * 99 + 1;

                  return (
                    <div
                      key={idx}
                      style={{ left: `${percent}%` }}
                      className={`w-[1.5px] transition-all duration-150 ${isMajor
                        ? isPassed
                          ? 'h-4 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                          : isLightMode
                            ? 'h-4 bg-neutral-400'
                            : 'h-4 bg-neutral-700'
                        : isPassed
                          ? 'h-2.5 bg-white/90 shadow-[0_0_4px_rgba(255,255,255,0.5)]'
                          : isLightMode
                            ? 'h-2 bg-neutral-300'
                            : 'h-2 bg-neutral-800'
                        }`}
                    />
                  );
                })}
              </div>

              {/* Input Range Slider with Filled Illuminated Track */}
              <div className="relative flex items-center h-8 my-1 select-none">
                {/* Background Inactive Track */}
                <div className="absolute inset-x-0 h-2 rounded-full bg-white/[0.08] border border-white/[0.04] overflow-hidden pointer-events-none">
                  {/* Glowing Filled Track */}
                  <div
                    className="h-full bg-gradient-to-r from-white/90 via-white to-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.45)]"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>

                <input
                  id="fleet-domain-slider"
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={domainCount}
                  onInput={(e) => setDomainCount(parseInt((e.target as HTMLInputElement).value, 10))}
                  onChange={(e) => setDomainCount(parseInt(e.target.value, 10))}
                  className="relative w-full h-8 appearance-none bg-transparent cursor-grab active:cursor-grabbing z-10 focus:outline-none custom-fleet-slider"
                />
              </div>

              {/* Scale Readout Labels */}
              <div className="flex justify-between font-mono text-[10px] tracking-widest text-neutral-500 uppercase mt-3">
                <span>01 Domain</span>
                <span className="text-center">50 Domains</span>
                <span className="text-right">100 Domains</span>
              </div>
            </div>

            {/* Dynamic Email Capacity Calculation */}
            <div className="border-t border-white/[0.06] pt-6 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span
                  className={`text-[10px] uppercase font-mono tracking-widest block mb-1 font-semibold ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}
                >
                  EMAIL CAPACITY
                </span>
                <div className="flex items-baseline gap-1.5 font-mono font-bold text-base sm:text-lg text-white">
                  <MechanicalOdometer value={minEmails} />
                  <span className="text-neutral-500">–</span>
                  <MechanicalOdometer value={maxEmails} />
                  <span className="text-xs font-normal text-neutral-400">/ month</span>
                </div>
              </div>

              <span className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase">
                (30 – 50 emails / day / inbox)
              </span>
            </div>
          </motion.div>

          {/* PART 2: The Commercial Settlement Console with Silk Background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`p-7 sm:p-10 border transition-all duration-300 relative overflow-hidden rounded-[2px] ${isLightMode
              ? 'bg-white/95 border-black/10 text-neutral-900 shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
              : 'bg-[#09090b]/90 border-white/[0.08] text-white shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              }`}
          >
            {/* Silk.tsx WebGL Shader Background on the Card itself */}
            <div className="absolute inset-0 z-0 opacity-45 pointer-events-none overflow-hidden">
              <Silk
                color="#36343fff"
                speed={0.7}
                scale={0.75}
                noiseIntensity={0.95}
                rotation={0.35}
              />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-8 mb-8 pb-6 border-b border-white/[0.06]">
              {/* Left: Engineering Fee Price Block */}
              <div className="text-left">
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest block mb-1.5 font-semibold ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}
                >
                  ENGINEERING FEE
                </span>
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-white">
                    <MechanicalOdometer value={engineeringFee} prefix="$" />
                  </div>
                  <span
                    className={`font-mono text-xs ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}
                  >
                    (One-time)
                  </span>
                </div>
              </div>

              {/* Right: Pass-through Provider Costs strictly in two lines, aligned on all screens */}
              <div
                className={`text-left sm:text-right shrink-0 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
              >
                <div className="text-[9.5px] min-[390px]:text-[10px] sm:text-[11px] font-mono leading-snug">
                  <span className="block whitespace-nowrap text-neutral-300">
                    <strong className="text-white font-semibold">PROVIDER COSTS:</strong> Billed directly to your corporate card
                  </span>
                  <span className="block whitespace-nowrap text-neutral-500 mt-0.5">
                    at wholesale cost by Google/Cloudflare
                  </span>
                </div>
              </div>
            </div>

            <button
              id="btn-deploy-fleet-checkout"
              type="button"
              data-cursor="grow"
              onClick={handleCheckout}
              disabled={isMintingTransaction}
              className={`relative z-10 w-full py-4 sm:py-5 px-6 font-mono text-sm tracking-wide font-semibold transition-all duration-150 rounded-[2px] flex items-center justify-center gap-3 cursor-pointer select-none border ${
                isMintingTransaction ? 'opacity-70 cursor-wait' : ''
              } ${isLightMode
                ? 'bg-black text-white hover:bg-neutral-800 border-black/30 shadow-[0_4px_16px_rgba(0,0,0,0.2)]'
                : 'bg-white text-black hover:bg-neutral-200 border-white/60 shadow-[0_4px_24px_rgba(255,255,255,0.2),inset_0_1px_0_0_rgba(255,255,255,0.9)]'
                }`}
            >
              <span>Deploy {domainCount}-Domain Fleet (${engineeringFee.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Discreet Bottom Footer: Paddle Guarantee (aligned left) & Delivery SLA (swapped) */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-neutral-500 leading-relaxed">
            <p className="text-left max-w-md">
              Secure checkout powered by Paddle (Merchant of Record). 100% automated refund if any domain fails strict RFC verification at Hour 48 delivery.
            </p>

            <div className="flex items-center gap-2 text-neutral-400 shrink-0">
              <Check className="w-3.5 h-3.5 text-white shrink-0" />
              <span>DELIVERY: 48-Hour SLA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
