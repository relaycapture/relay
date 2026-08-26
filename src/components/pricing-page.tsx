'use client'

import { useState, FormEvent } from 'react';
import { Check, X, ShieldCheck, ArrowRight, ArrowLeft, Lock, CheckCircle2, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import Silk from './Silk';
import { NumberTicker } from './number-ticker';
import { FooterBottom } from './footer-bottom';

interface PricingPageProps {
  onBackToHome: () => void;
  onOpenCheckout: (tierName: string, price: string) => void;
  onOpenSampleModal?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
  isLightMode?: boolean;
}

interface MatrixFeature {
  name: string;
  category: string;
  snapshot: boolean | string;
  audit: boolean | string;
  monitoring: boolean | string;
}

const COMPARISON_MATRIX: MatrixFeature[] = [
  // Core DNS Analysis
  { name: 'Root SPF TXT Mechanism Audit', category: 'Core DNS Analysis', snapshot: true, audit: true, monitoring: true },
  { name: 'SPF 10-DNS Lookup Limit Verification', category: 'Core DNS Analysis', snapshot: true, audit: true, monitoring: true },
  { name: 'DKIM Selector Public Key Probing', category: 'Core DNS Analysis', snapshot: 'Top 10 selectors', audit: '100+ ESP selectors', monitoring: 'Continuous probe' },
  { name: '2048-bit vs 1024-bit RSA Key Analysis', category: 'Core DNS Analysis', snapshot: true, audit: true, monitoring: true },
  { name: 'DMARC Policy Evaluation (p=none/quarantine/reject)', category: 'Core DNS Analysis', snapshot: true, audit: true, monitoring: true },
  { name: 'Subdomain Policy (sp=) Inheritance Audit', category: 'Core DNS Analysis', snapshot: false, audit: true, monitoring: true },
  { name: 'BIMI & VMC Certificate Readiness Score', category: 'Core DNS Analysis', snapshot: false, audit: true, monitoring: true },

  // Remediation & Action Kit
  { name: 'Executive Deliverable PDF + Raw JSON Bundle', category: 'Remediation & Action Kit', snapshot: true, audit: true, monitoring: true },
  { name: 'Custom Copy-Paste DNS TXT Records', category: 'Remediation & Action Kit', snapshot: false, audit: true, monitoring: true },
  { name: 'Provider Recipes (Google, M365, and more)', category: 'Remediation & Action Kit', snapshot: false, audit: true, monitoring: true },
  { name: 'Registrar Steps (Cloudflare, Route53, GoDaddy)', category: 'Remediation & Action Kit', snapshot: false, audit: true, monitoring: true },
  { name: '30-Day Follow-Up Verification Re-Scan', category: 'Remediation & Action Kit', snapshot: false, audit: true, monitoring: true },
  { name: 'Priority Engineering Validation Review', category: 'Remediation & Action Kit', snapshot: false, audit: true, monitoring: true },

  // Ongoing Governance
  { name: '24/7 Background DNS Drift Polling', category: 'Continuous Governance', snapshot: false, audit: false, monitoring: 'Every 15 mins' },
  { name: 'Slack & Email Policy Break Alerts', category: 'Continuous Governance', snapshot: false, audit: false, monitoring: true },
  { name: 'Google/Yahoo Compliance Drift Watch', category: 'Continuous Governance', snapshot: false, audit: false, monitoring: true },
  { name: 'Monthly Historical Deliverability Delta Reports', category: 'Continuous Governance', snapshot: false, audit: false, monitoring: true },
  { name: 'Subdomain Monitoring Capacity', category: 'Continuous Governance', snapshot: '1 domain', audit: '1 domain', monitoring: 'Up to 5 domains' },
];

export function PricingPage({
  onBackToHome,
  onOpenSampleModal,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
  isLightMode,
}: PricingPageProps) {
  const [checkoutModal, setCheckoutModal] = useState<{ open: boolean; tier: string; price: string }>({
    open: false,
    tier: '',
    price: '',
  });
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutDomain, setCheckoutDomain] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = (tierName: string, price: string) => {
    setCheckoutModal({ open: true, tier: tierName, price });
    setCheckoutSuccess(false);
  };

  const handleConfirmCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutEmail || !checkoutDomain) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: isLightMode ? ['#000000', '#444444', '#10B981'] : ['#ffffff', '#aaaaaa', '#10B981'],
    });

    setCheckoutSuccess(true);
  };

  return (
    <div
      id="dedicated-pricing-page"
      className={`min-h-screen pt-28 sm:pt-32 pb-28 sm:pb-36 px-4 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300 ${isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#070709] text-[#F4F4F2]'
        }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back navigation */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={onBackToHome}
            data-cursor="grow"
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-mono text-xs transition-colors border min-h-[40px] ${isLightMode
              ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10'
              : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Return to Diagnostic Scanner</span>
          </button>
        </div>

        {/* Hero header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div
            className={`rc-grain-surface inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider mb-4 border backdrop-blur-md min-h-[32px] ${isLightMode
              ? 'bg-black/[0.03] border-black/10 text-neutral-700'
              : 'bg-white/[0.04] border-white/10 text-neutral-300'
              }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>COMMERCIAL ENGAGEMENT SPECIFICATION</span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans tracking-tight leading-[1.15] mb-4 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
          >
            Transparent pricing.
          </h1>

          <p
            className={`text-xs sm:text-base md:text-lg font-normal leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            Eliminate inbox quarantine, prevent sender domain forging, and guarantee compliance with major receiving providers.
          </p>
        </div>

        {/* Three Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 items-stretch max-w-6xl mx-auto">
          {/* Tier 1: Self-Serve Blueprint (Understated & low-contrast) */}
          <div
            id="pricing-card-tier-snapshot"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden ${isLightMode
              ? 'bg-white/35 border border-black/5 opacity-70 hover:opacity-100 hover:border-black/15 shadow-none text-[#1d1d1f]'
              : 'bg-[#121216]/30 border border-white/5 opacity-60 hover:opacity-100 hover:border-white/15 shadow-none text-white'
              }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                One-Time Deliverable
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Self-Serve Blueprint
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                For teams with an in-house engineer or technical founder.
              </p>

              <div className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${isLightMode ? 'border-black/10' : 'border-white/10'
                }`}>
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={247} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Core Deliverables:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Full-stack DNS deliverability & spoofing risk scorecard</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Root SPF mechanism validation & 10-lookup limit audit</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Authoritative DMARC policy check (p=quarantine / p=reject)</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>DKIM selector probing & syntax validation</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Exact copy-paste DNS TXT records for your domain</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Shareable confidential PDF + JSON bundle</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-neutral-400">
                  <X className="w-4 h-4 text-neutral-400 flex-shrink-0 mt-0.5" />
                  <span>Direct infrastructure setup & live hands-on DNS execution</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCheckout('Self-Serve Blueprint', '$247')}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-colors border min-h-[48px] ${isLightMode
                ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-black/10'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
            >
              Order Self-Serve Blueprint ($247)
            </button>
          </div>

          {/* Tier 2: Turnkey Remediation (Featured with Silk background & glow) */}
          <div
            id="pricing-card-tier-audit"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden ${isLightMode
              ? 'bg-white/95 border-2 border-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.09)] text-[#1d1d1f]'
              : 'bg-[#121216]/95 border-2 border-white/90 shadow-[0_20px_60px_rgba(255,255,255,0.07)] text-white'
              }`}
          >
            {/* Animated Faint Grainy Silk Background */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
              <div className="absolute inset-0 opacity-30 mix-blend-screen">
                <Silk
                  speed={0.4}
                  scale={1.05}
                  color={isLightMode ? '#c8c2d4' : '#24202d'}
                  noiseIntensity={2.0}
                  rotation={0}
                />
              </div>
              <div className={`absolute inset-0 pointer-events-none ${isLightMode ? 'bg-white/40' : 'bg-[#121216]/60'
                }`} />
            </div>

            {/* Recommended Pill */}
            <div
              className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${isLightMode
                ? 'bg-black/90 text-white shadow-sm'
                : 'bg-white/95 text-black shadow-md'
                }`}
            >
              RECOMMENDED
            </div>

            <div className="relative z-10">
              <div className="font-mono text-xs uppercase tracking-wider mb-1 opacity-70">
                Complete One-Time Execution
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Turnkey Remediation
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                For founders who value their time and refuse to touch DNS records.
              </p>

              <div className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${isLightMode ? 'border-black/10' : 'border-white/10'
                }`}>
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={547} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time flat</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase font-semibold">Everything in Self-Serve Blueprint, plus:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Fully automated DNS records configuration</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Provider recipes (Google Workspace, M365, and more)</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Subdomain inheritance policy hardening & alignment</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>14-day post-launch engineering support & verification check</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Guaranteed 100% Google / Yahoo bulk sender compliance</span>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <button
                onClick={() => handleCheckout('Turnkey Remediation', '$547')}
                data-cursor="grow"
                className={`w-full py-4 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-all shadow-md min-h-[48px] ${isLightMode
                  ? 'bg-black text-white hover:bg-neutral-800'
                  : 'bg-white text-black hover:bg-neutral-200'
                  }`}
              >
                Get Turnkey Remediation ($547)
              </button>
            </div>
          </div>

          {/* Tier 3: Managed Outbound Infrastructure (Enterprise Anchor) */}
          <div
            id="pricing-card-tier-managed"
            data-cursor="grow"
            className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden opacity-100 ${isLightMode
              ? 'bg-white/90 border border-black/20 hover:border-black/35 shadow-[0_10px_35px_rgba(0,0,0,0.06)] text-[#1d1d1f]'
              : 'bg-[#121216]/90 border border-white/20 hover:border-white/35 shadow-[0_10px_40px_rgba(0,0,0,0.45)] text-white'
              }`}
          >
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-1">
                The Enterprise Anchor
              </div>
              <h2 className={`text-2xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
                Managed Outbound Infrastructure
              </h2>
              <p className={`text-xs min-h-[36px] mb-6 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                A fully scaled, dedicated cold email engine. We build, warm, manage, and maintain your sending architecture.
              </p>

              <div className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${isLightMode ? 'border-black/10' : 'border-white/10'
                }`}>
                <span className={`font-mono text-5xl font-bold ${isLightMode ? 'text-black' : 'text-white'}`}>
                  <NumberTicker value={1247} prefix="$" duration={900} />
                </span>
                <span className="font-mono text-xs text-neutral-400">one-time setup</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="text-[11px] font-mono uppercase text-neutral-400">Infrastructure Scope:</div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>10 Dedicated Sending Domains</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>30 Authenticated Inboxes</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Automated IP Warmup</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>24/7 Deliverability Monitoring</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Full SPF, DKIM & DMARC Enforced</span>
                </div>
                <div className={`flex items-start gap-2 text-xs ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span>Continuous Drift & Reputation Protection</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleCheckout('Managed Outbound Infrastructure', '$1,247')}
              data-cursor="grow"
              className={`w-full py-3.5 px-4 rounded-xl font-sans font-medium text-xs tracking-wide transition-colors border min-h-[48px] ${isLightMode
                ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-black/10'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
            >
              Order Managed Outbound ($1,247)
            </button>
          </div>
        </div>

        {/* Sample Deliverable Trigger Link Beneath the Cards */}
        {onOpenSampleModal && (
          <div className="text-center mb-20">
            <button
              type="button"
              onClick={onOpenSampleModal}
              data-cursor="grow"
              className={`group inline-flex items-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3 rounded-full border text-xs sm:text-[13px] font-sans font-medium transition-all duration-300 backdrop-blur-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] ${isLightMode
                ? 'bg-white/80 hover:bg-white text-neutral-800 border-black/10 hover:border-black/20 shadow-black/[0.04]'
                : 'bg-[#121216]/80 hover:bg-[#18181f] text-neutral-200 hover:text-white border-white/10 hover:border-white/20 shadow-black/40'
                }`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                Want to inspect a real report first?
              </span>
              <span className={`font-semibold underline underline-offset-4 decoration-emerald-500/40 group-hover:decoration-emerald-500 transition-colors ${isLightMode ? 'text-black' : 'text-white'}`}>
                View Sample Deliverable (PDF + JSON)
              </span>
              <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        )}

        {/* Feature Comparison Matrix */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-10">
            <h2 className={`text-2xl sm:text-3xl font-semibold mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'}`}>
              Full Technical Capability Matrix
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Direct comparison of diagnostic, turnkey, and managed outbound scopes
            </p>
          </div>

          <div className={`rounded-2xl border overflow-hidden shadow-2xl max-w-5xl mx-auto ${isLightMode ? 'bg-white border-black/10' : 'bg-[#0C0C10] border-white/10'
            }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b ${isLightMode ? 'border-black/10 bg-neutral-50' : 'border-white/10 bg-white/[0.02]'}`}>
                    <th className="p-4 sm:p-5 font-mono text-xs text-neutral-400 uppercase font-semibold">
                      Technical Capability
                    </th>
                    <th className={`p-4 sm:p-5 font-mono text-xs text-center uppercase font-bold w-36 sm:w-44 ${isLightMode ? 'text-black' : 'text-white'
                      }`}>
                      Blueprint ($247)
                    </th>
                    <th className={`p-4 sm:p-5 font-mono text-xs text-center uppercase font-bold w-36 sm:w-44 ${isLightMode ? 'text-black bg-neutral-100' : 'text-white bg-white/5'
                      }`}>
                      Turnkey ($547)
                    </th>
                    <th className={`p-4 sm:p-5 font-mono text-xs text-center uppercase font-bold w-36 sm:w-44 ${isLightMode ? 'text-black' : 'text-white'
                      }`}>
                      Managed ($1,247)
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono text-xs ${isLightMode ? 'divide-black/5' : 'divide-white/5'}`}>
                  {COMPARISON_MATRIX.map((feature, idx) => (
                    <tr key={idx} className={isLightMode ? 'hover:bg-neutral-50 transition-colors' : 'hover:bg-white/[0.02] transition-colors'}>
                      <td className={`p-4 sm:p-5 font-sans font-medium ${isLightMode ? 'text-neutral-800' : 'text-neutral-200'}`}>
                        {feature.name}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-neutral-400">
                        {typeof feature.snapshot === 'boolean' ? (
                          feature.snapshot ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-neutral-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px] text-neutral-400">{feature.snapshot}</span>
                        )}
                      </td>
                      <td className={`p-4 sm:p-5 text-center font-semibold ${isLightMode ? 'bg-neutral-50 text-black' : 'bg-white/5 text-white'
                        }`}>
                        {typeof feature.audit === 'boolean' ? (
                          feature.audit ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-neutral-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px] font-bold">{feature.audit}</span>
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-neutral-400">
                        {typeof feature.monitoring === 'boolean' ? (
                          feature.monitoring ? (
                            <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-neutral-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-[11px] text-neutral-400">{feature.monitoring}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

      {/* Checkout Simulator Modal */}
      {checkoutModal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setCheckoutModal({ open: false, tier: '', price: '' })}
        >
          <div
            className={`w-full max-w-md border rounded-3xl p-6 sm:p-8 shadow-2xl relative ${isLightMode ? 'bg-white border-black/15 text-black' : 'bg-[#0F0F14] border-white/20 text-white'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setCheckoutModal({ open: false, tier: '', price: '' })}
              className={`absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center ${isLightMode ? 'bg-black/5 hover:bg-black/10 text-neutral-700' : 'bg-white/5 hover:bg-white/15 text-neutral-400'
                }`}
            >
              <X className="w-4 h-4" />
            </button>

            {checkoutSuccess ? (
              <div className="py-6 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold font-sans">
                  Deliverable Initialized
                </h3>
                <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                  Your order for <strong>{checkoutModal.tier}</strong> ({checkoutModal.price}) has been generated for domain <strong>{checkoutDomain}</strong>.
                </p>
                <div className={`p-3 rounded-xl border font-mono text-[11px] ${isLightMode ? 'bg-black/5 border-black/10 text-black' : 'bg-black/60 border-white/10 text-white'
                  }`}>
                  Check inbox at {checkoutEmail} for the confidential deliverable payload.
                </div>
                <button
                  onClick={() => {
                    setCheckoutModal({ open: false, tier: '', price: '' });
                    onBackToHome();
                  }}
                  data-cursor="grow"
                  className={`w-full py-3 rounded-xl font-sans font-medium text-xs tracking-wide ${isLightMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmCheckout} className="space-y-4">
                <div className="space-y-1 mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                    CHECKOUT INITIATION
                  </div>
                  <h3 className="text-xl font-semibold font-sans">
                    {checkoutModal.tier}
                  </h3>
                  <div className="font-mono text-2xl font-bold">
                    {checkoutModal.price}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs opacity-70">Target Sending Domain</label>
                  <input
                    type="text"
                    required
                    value={checkoutDomain}
                    onChange={(e) => setCheckoutDomain(e.target.value)}
                    placeholder="company.com"
                    className={`w-full px-4 py-2.5 rounded-xl border font-mono text-xs outline-none ${isLightMode
                      ? 'bg-black/[0.03] border-black/10 text-black focus:border-black'
                      : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                      }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs opacity-70">Deliverable Work Email</label>
                  <input
                    type="email"
                    required
                    value={checkoutEmail}
                    onChange={(e) => setCheckoutEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-2.5 rounded-xl border font-mono text-xs outline-none ${isLightMode
                      ? 'bg-black/[0.03] border-black/10 text-black focus:border-black'
                      : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                      }`}
                  />
                </div>

                <div className="p-3 rounded-xl border text-[11px] font-mono opacity-75 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>256-bit encrypted checkout simulator • Instant delivery</span>
                </div>

                <button
                  type="submit"
                  data-cursor="grow"
                  className={`w-full py-3.5 rounded-xl font-sans font-medium text-xs tracking-wide transition-colors shadow-lg flex items-center justify-center gap-2 ${isLightMode
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-white text-black hover:bg-neutral-200'
                    }`}
                >
                  <span>Confirm Order ({checkoutModal.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
