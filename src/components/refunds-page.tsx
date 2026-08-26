'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface RefundsPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function RefundsPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: RefundsPageProps) {
  return (
    <div
      id="refunds-page"
      className={`min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300 ${
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#070709] text-[#F4F4F2]'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-12rem)] justify-between">
        <div>
          {/* Back navigation */}
          <div className="mb-10">
            <button
              onClick={onBackToHome}
              data-cursor="grow"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-colors border ${
                isLightMode
                  ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Home</span>
            </button>
          </div>

          {/* Page Header */}
          <div className="mb-12">
            <h1
              className={`text-3xl sm:text-5xl font-semibold font-sans tracking-tight leading-tight mb-3 ${
                isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
            >
              Refund and Cancellation Policy
            </h1>

            <p className="font-mono text-xs text-neutral-400">
              Last updated: August 13, 2026
            </p>
          </div>

          {/* Content Area */}
          <div
            className={`rc-grain-surface p-8 sm:p-12 rounded-3xl border min-h-[350px] leading-relaxed text-sm sm:text-base font-sans mb-16 space-y-8 ${
              isLightMode
                ? 'bg-white border-black/10 text-neutral-800'
                : 'bg-[#101014] border-white/10 text-neutral-300'
            }`}
          >
            <div className="space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                1. Snapshot Report &amp; Audit + Fix-It Kit (one-time purchases)
              </h2>
              <p className="leading-relaxed">
                These are instant digital deliverables generated at the moment of purchase. Because the product is fully delivered on payment, we do not offer refunds once your report or kit has been generated and sent, except in the case of: a duplicate charge, a failed delivery (you paid and never received your deliverable), or a materially broken output (the scan failed to run against your domain and returned no usable result). Contact <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a> within 7 days of purchase for any of these cases and we&apos;ll make it right.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                2. Continuous Monitoring (subscription)
              </h2>
              <p className="leading-relaxed">
                New subscribers get a 14-day free trial; you won&apos;t be charged until it ends, and you can cancel any time before then at no cost. Once billing has started, charges are non-refundable for that billing period, but you can cancel to stop future charges at any time — cancellation takes effect at the end of the current period.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                3. Merchant of Record
              </h2>
              <p className="leading-relaxed">
                All payments are processed by Paddle.com, our Merchant of Record, who handles billing, tax, and payment-related support.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
              <h2 className={`text-lg sm:text-xl font-semibold font-sans ${isLightMode ? 'text-black' : 'text-white'}`}>
                4. Contact Information
              </h2>
              <p className="leading-relaxed">
                If you have questions regarding your billing or this Refund Policy, please contact our support team at:
              </p>
              <p className="font-mono text-sm">
                Email: <a href="mailto:sam@relaycapture.com" className="text-blue-500 hover:underline">sam@relaycapture.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
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
