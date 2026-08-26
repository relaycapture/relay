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
                Refund & Guarantee Policy
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last Updated: October 2024</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  1. The 100% Deliverability Execution Guarantee
                </h2>
                <p>
                  Relay guarantees that all DNS records, macros, and public keys generated as part of the Turnkey Remediation tier comply strictly with RFC 7208 (SPF), RFC 6376 (DKIM), and RFC 7489 (DMARC). If your receiving compliance check does not pass standard validation after proper DNS propagation (24-48 hours), our engineering team will continue manual intervention until alignment is achieved at zero additional charge.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  2. Diagnostic Blueprints & Digital Reports
                </h2>
                <p>
                  Due to the immediate delivery of digital diagnostic files, raw nameserver telemetry, and proprietary lookup flattening instructions, Self-Serve Blueprint purchases ($247) are non-refundable once the deliverable bundle has been generated and dispatched.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  3. Turnkey Execution Services
                </h2>
                <p>
                  If you purchase a Turnkey Remediation plan and our engineers determine during initial nameserver probing that your sending architecture cannot be supported due to hard registrar locks or upstream provider bans prior to record generation, a full 100% refund will be issued immediately upon notification.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  4. Dispute Resolution & Contact
                </h2>
                <p>
                  For refund inquiries, verification disputes, or technical questions regarding your deliverable receipt, contact engineering directly at <strong>sam@relaycapture.com</strong> with your transaction reference.
                </p>
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
