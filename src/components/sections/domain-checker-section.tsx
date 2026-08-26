'use client'

import { DomainChecker } from '../domain-checker';
import { ScanResult } from '../../types';

interface DomainCheckerSectionProps {
  onScanResult: (result: ScanResult) => void;
  onDomainChange?: (domain: string) => void;
  isLightMode: boolean;
  isLivePreview?: boolean;
}

export function DomainCheckerSection({
  onScanResult,
  onDomainChange,
  isLightMode,
  isLivePreview = false,
}: DomainCheckerSectionProps) {
  return (
    <section
      id="domain-checker-section"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 ${
        isLivePreview
          ? 'h-full min-h-full flex flex-col justify-center items-center py-8'
          : 'pt-24 sm:pt-28 md:pt-36 pb-24 sm:pb-28 md:pb-36'
      }`}
      style={isLivePreview ? { height: '100%', minHeight: '100%' } : undefined}
    >
      {/* Background Soft Ambient Dark Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[35vw] rounded-full blur-[160px] pointer-events-none transition-opacity ${
            isLightMode ? 'bg-neutral-200/40 opacity-30' : 'bg-white/[0.03] opacity-25'
          }`}
        />
      </div>

      <div
        className={`relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center w-full ${
          isLivePreview ? 'my-auto' : ''
        }`}
      >
        {/* Apple-Style Minimal Headline */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
        >
          <span className="block">Probe any domain</span>
          <span className="block">in milliseconds.</span>
        </h2>
        <p
          className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 text-center ${
            isLightMode ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          <span className="block">Enter a domain to query root nameservers directly</span>
          <span className="block">via Cloudflare DNS-over-HTTPS.</span>
        </p>

        {/* The Domain Checker Input and Live Scorecard */}
        <div className="w-full">
          <DomainChecker
            onResultCalculated={onScanResult}
            onDomainChange={onDomainChange}
            isLightMode={isLightMode}
          />
        </div>

        {/* Human Language Security Note */}
        <p
          className={`text-center font-mono text-[11px] sm:text-xs tracking-wider uppercase mt-8 select-none transition-colors ${
            isLightMode ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          PUBLIC DNS ONLY · NO CREDENTIALS REQUIRED · NO MAILBOX ACCESS
        </p>
      </div>
    </section>
  );
}
