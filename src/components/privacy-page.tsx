'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface PrivacyPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function PrivacyPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: PrivacyPageProps) {
  return (
    <div
      id="privacy-page"
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
                Privacy & Data Architecture
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last Updated: October 2024</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  1. Public Nameserver Telemetry Only
                </h2>
                <p>
                  Relay inspects publicly published DNS records (TXT, MX, CNAME, NS) queryable by any recursive resolver on the global Internet. We do not inspect private inbox contents, email message bodies, contact address books, or internal server logs.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  2. Redacted Diagnostic Storage
                </h2>
                <p>
                  Diagnostic reports generated for demonstration or verification are redacted to protect internal selector keys and IP routing tables. We never resell, share, or monetize domain audit data with third-party data brokers or marketing aggregators.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  3. Payment Security & Zero Card Data Retention
                </h2>
                <p>
                  All commercial checkout transactions are processed directly by Paddle.com (Merchant of Record). Relay does not store, process, or transmit credit card numbers, CVVs, or banking credentials on its servers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  4. Inquiries & Data Removal
                </h2>
                <p>
                  To request immediate purge of cached diagnostic telemetry for your sending domain, email <strong>sam@relaycapture.com</strong>.
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
