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
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#08080a] rc-page-grain-08080a text-[#F4F4F2]'
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

          <div className="space-y-6 sm:space-y-8 font-sans">
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Legal Specification</div>
              <h1 className={`text-3xl sm:text-4xl font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                Refund Policy
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last updated: August 13, 2026</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  1. Snapshot Report & Audit + Fix-It Kit (one-time purchases)
                </h2>
                <p>
                  These are instant digital deliverables generated at the moment of purchase. Because the product is fully delivered on payment, we do not offer refunds once your report or kit has been generated and sent, except in the case of: a duplicate charge, a failed delivery (you paid and never received your deliverable), or a materially broken output (the scan failed to run against your domain and returned no usable result). Contact{' '}
                  <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                    sam@relaycapture.com
                  </a>{' '}
                  within 7 days of purchase for any of these cases and we'll make it right.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  2. Continuous Monitoring (subscription)
                </h2>
                <p>
                  New subscribers get a 14-day free trial; you won't be charged until it ends, and you can cancel any time before then at no cost. Once billing has started, charges are non-refundable for that billing period, but you can cancel to stop future charges at any time — cancellation takes effect at the end of the current period.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  3. Merchant of Record
                </h2>
                <p>
                  All payments are processed by Paddle.com, our Merchant of Record, who handles billing, tax, and payment-related support.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-white/10">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  4. Contact Information
                </h2>
                <p>
                  If you have questions regarding your billing or this Refund Policy, please contact our support team at:
                </p>
                <div className="font-mono text-xs space-y-1 pl-2 border-l border-white/20">
                  <p>
                    Email:{' '}
                    <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                      sam@relaycapture.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="pt-16 sm:pt-20">
          <FooterBottom
            isLightMode={isLightMode}
            onNavigateToTerms={onNavigateToTerms}
            onNavigateToPrivacy={onNavigateToPrivacy}
            onNavigateToRefunds={onNavigateToRefunds}
          />
        </div>
      </div>
    </div>
  );
}
