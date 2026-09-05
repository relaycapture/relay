'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionWatermark } from '../section-watermark';

interface PostInvoiceTimelineProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

const TIMELINE_EVENTS = [
  {
    num: '01',
    timeBadge: 'Minute 01',
    title: 'Intake Dispatch',
    description:
      'Paddle settles the transaction and issues an enterprise tax invoice with your corporate VAT/tax details. Your browser redirects immediately to your private Technical Brief.',
  },
  {
    num: '02',
    timeBadge: 'Minute 05',
    title: 'The Handoff',
    description:
      'You submit three fields: your naming preferences, your sequencer workspace invite, and scoped operator invites to your Cloudflare and Workspace accounts. You never touch raw DNS records, TXT strings, or user provisioning.',
  },
  {
    num: '03',
    timeBadge: 'Hour 01 – Hour 24',
    title: 'Cryptographic Infrastructure Hardening',
    description:
      'We configure your secondary domains inside Cloudflare. We provision isolated Workspace/M365 accounts, generate unique 2048-bit DKIM keys per subdomain, flatten SPF mechanisms to ≤ 2 lookups, stage DMARC at p=quarantine with forensic reporting, and configure TLS 1.3 encrypted tracking subdomains.',
  },
  {
    num: '04',
    timeBadge: 'Hour 24 – Hour 44',
    title: 'Warmup Ignition',
    description:
      'We connect every inbox to your Smartlead or Instantly workspace via direct API/OAuth. Custom tracking CNAMEs are validated. Catch-all forwarding is routed to your designated triage address. Automated warmup schedules are initialized at a conservative ramp curve (2 sends/day increment).',
  },
  {
    num: '05',
    timeBadge: 'Hour 48',
    title: 'Audit Delivery & Revocation',
    description:
      'You receive a Master Deployment Sheet containing every domain record, individual mailbox credentials, and raw third-party verification links (MXToolbox, Mail-Tester, Dmarcian) showing a 100% pass score. You rotate master tenant passwords, delete our operator seat with one click, and own the infrastructure outright.',
  },
  {
    num: '06',
    timeBadge: 'Days 03 to 14',
    title: 'Sequencer Warmup',
    description:
      'Your sequencer ramps volume automatically. If an inbox disconnects due to an automated security challenge, an OAuth desync, or initial DNS propagation drift during the 14-day warmup window, open an async ticket in your portal. We re-authenticate and resolve the record within 12 hours.',
  },
];

export function PostInvoiceTimeline({
  isLightMode = false,
  isLivePreview = false,
}: PostInvoiceTimelineProps) {
  const timelineTrackRef = useRef<HTMLDivElement>(null);

  // Timed precisely to the milestone track: starts when milestone 1 enters reading zone (65% viewport)
  // and reaches completion when the final boundary reaches 70% viewport
  const { scrollYProgress } = useScroll({
    target: timelineTrackRef,
    offset: ['start 65%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 25,
    stiffness: 220,
    mass: 0.3,
  });

  return (
    <section
      id="invoice-settle-timeline"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 select-none section-content-auto ${isLivePreview ? 'py-6' : 'py-32 sm:py-40 md:py-48'
        }`}
    >
      {/* Center Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 85% 50%, rgba(0,0,0,0.03) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 85% 50%, rgba(255,255,255,0.05) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="48H"
        mobileText="48H"
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
        <div className="mb-16 sm:mb-24 text-left max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[1.65rem] min-[390px]:text-[1.85rem] min-[440px]:text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-neutral-100'
              }`}
          >
            <span className="block whitespace-nowrap">What Happens The Second</span>
            <span className="block whitespace-nowrap">You Settle The Invoice</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed mt-4 max-w-2xl ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            Exact milestone chronology from transaction settlement to sovereign asset handoff.
          </motion.p>
        </div>

        {/* Vertical Timeline Track with Progressive Left Rail — Targeted Scroll Reference for Precision Timing */}
        <div ref={timelineTrackRef} className="relative pl-6 sm:pl-10">
          {/* Baseline Left Guide Wire */}
          <div
            className="absolute left-2 sm:left-3 top-2 bottom-3 w-[1px] bg-white/[0.1] pointer-events-none"
            aria-hidden="true"
          />

          {/* Animated Glowing Progress Line on the Left */}
          <motion.div
            style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
            className="absolute left-2 sm:left-3 top-2 bottom-3 w-[2px] -translate-x-[0.5px] bg-gradient-to-b from-white via-zinc-200 to-white shadow-[0_0_14px_rgba(255,255,255,0.9)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Vertical Milestone Items */}
          <div className="space-y-16 sm:space-y-24">
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div
                key={event.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                className="relative pl-8 sm:pl-14"
              >
                {/* Left Node Indicator anchored right onto the vertical line */}
                <div
                  className="absolute -left-[1.375rem] sm:-left-[1.875rem] top-1.5 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#08080a] border border-white/40 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                  </div>
                </div>

                {/* Milestone Content */}
                <div className="space-y-4">
                  {/* Top Meta Line: Time Badge & Phase Indicator */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 font-mono">
                    <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold tracking-wider uppercase">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                      <span>{event.timeBadge}</span>
                    </div>
                    <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
                      PHASE {event.num} // 06
                    </span>
                  </div>

                  {/* Milestone Monumental Title */}
                  <h3
                    className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-snug ${isLightMode ? 'text-neutral-900' : 'text-neutral-100'
                      }`}
                  >
                    {event.title}
                  </h3>

                  {/* Milestone Description */}
                  <p
                    className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-3xl ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'
                      }`}
                  >
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Scope Boundary Final Station */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 sm:pl-14 pt-4"
            >
              <div
                className="absolute -left-[1.375rem] sm:-left-[1.875rem] top-5 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#08080a] border border-white/25 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-neutral-400" />
                </div>
              </div>

              <div className="flex items-start gap-3 text-neutral-400">
                <AlertCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-300">
                    SCOPE BOUNDARY SPECIFICATION
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-neutral-400 max-w-3xl">
                    (Scope boundary: We do not monitor ongoing campaign deliverability, rewrite copy, or replace domains burned by sending &gt;35 emails/inbox/day or unverified lead lists. At Day 14, the deployment window permanently closes.)
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
