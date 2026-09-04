'use client'

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';
import { PreOrderChecklist } from './sections/pre-order-checklist';
import { FleetPricing } from './sections/fleet-pricing';
import { ArchitectureComparison } from './sections/architecture-comparison';
import { FaqSection } from './sections/faq-section';

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenCheckout?: (tierName: string, price: string) => void;
  onOpenSampleModal?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
  isLightMode?: boolean;
}

export function PricingPage({
  onBackToHome,
  onOpenSampleModal,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
  isLightMode = false,
}: PricingPageProps) {
  return (
    <div
      id="dedicated-pricing-page"
      className={`min-h-screen pt-20 sm:pt-24 pb-24 sm:pb-32 transition-colors duration-300 relative overflow-x-clip ${
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#08080a] rc-page-grain-08080a text-[#F4F4F2]'
      }`}
    >
      {/* Top Navigation Bar with Return button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 mb-2 sm:mb-4 flex items-center">
        <button
          onClick={onBackToHome}
          data-cursor="grow"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-[2px] font-mono text-xs transition-all border cursor-pointer ${
            isLightMode
              ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Return to Overview</span>
        </button>
      </div>

      {/* 1. Prerequisites ("Have These Ready Before Ordering") */}
      <PreOrderChecklist isLightMode={isLightMode} />

      {/* 2. Fleet Pricing */}
      <FleetPricing
        isLightMode={isLightMode}
        onOpenSampleModal={onOpenSampleModal}
      />

      {/* 3. Architecture Comparison ("Direct Tenancy vs. Reseller Wrappers") */}
      <ArchitectureComparison isLightMode={isLightMode} />

      {/* 4. Technical Architecture FAQ */}
      <FaqSection isLightMode={isLightMode} />

      {/* Global Footer Bottom Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 pt-16 sm:pt-20">
        <FooterBottom
          isLightMode={isLightMode}
          onNavigateToTerms={onNavigateToTerms}
          onNavigateToPrivacy={onNavigateToPrivacy}
          onNavigateToRefunds={onNavigateToRefunds}
        />
      </div>
    </div>
  );
}
