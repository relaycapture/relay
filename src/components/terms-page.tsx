'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface TermsPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function TermsPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: TermsPageProps) {
  return (
    <div
      id="terms-page"
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
                Terms of Service
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last Updated: October 2024</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  1. Zero-Credential Architecture
                </h2>
                <p>
                  Relay operates on a zero-credential framework. We never request, process, or store passwords, OAuth tokens, or administrative access keys to your domain registrar, DNS hosting provider, or email workspace. All diagnostics and verification checks are conducted via public DNS nameservers using DNS-over-HTTPS (DoH).
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  2. Intellectual Property & Deliverables Ownership
                </h2>
                <p>
                  Upon completion of purchase and deliverable generation, you retain 100% unencumbered perpetual ownership of all generated DNS records, flattened TXT configurations, macro routes, and audit documentation. Relay claims no ongoing license or royalty on records deployed to your nameservers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  3. Service Scope & Limitations
                </h2>
                <p>
                  Relay provides DNS deliverability architecture, authentication alignment, and infrastructure hardening. Relay does not operate an email sending service, does not host SMTP relays, and cannot guarantee inbox placement for sender identities actively engaging in prohibited spam or content violations.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className={`text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  4. Governing Law
                </h2>
                <p>
                  These Terms of Service are governed by and construed in accordance with standard commercial practices, and disputes are subject to direct engineering resolution via <strong>sam@relaycapture.com</strong>.
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
