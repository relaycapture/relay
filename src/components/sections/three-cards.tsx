'use client'

import { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { NumberTicker } from '../number-ticker';
import Silk from '../Silk';
import { openPaddleCheckout, PADDLE_CONFIG } from '../../utils/paddle';

interface ThreeCardsProps {
  onSelectTier?: (tierId: string) => void;
  onOpenSampleModal?: () => void;
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

interface Tier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  ctaLabel: string;
  popular?: boolean;
  features: string[];
}

const TIERS: Tier[] = [
  {
    id: 'tier-self',
    name: 'Self-Serve Blueprint',
    tagline: 'Automated diagnostic with step-by-step remediation instructions.',
    price: '$247',
    period: 'Single Domain Scan',
    ctaLabel: 'Get Instant Blueprint',
    features: [
      'Raw DNS syntax & lookup audit',
      'Flattened SPF record generation',
      'DKIM alignment & selector discovery',
      'Instant JSON & Markdown export',
      'Self-serve execution checklist',
    ],
  },
  {
    id: 'tier-audit',
    name: 'Turnkey Remediation',
    tagline: 'Full diagnostic + engineer-verified implementation & testing.',
    price: '$997',
    period: 'Core Sending Domain',
    popular: true,
    ctaLabel: 'Deploy Turnkey Fix',
    features: [
      'Everything in Self-Serve Blueprint',
      'Engineer-crafted DNS records',
      'Subdomain & secondary sender catalog',
      '30-seed inbox placement validation',
      'Direct email engineer support (30 days)',
    ],
  },
  {
    id: 'tier-managed',
    name: 'Managed Infrastructure',
    tagline: 'Multi-domain architecture, ongoing monitoring, and DMARC enforcement.',
    price: '$1,850',
    period: 'Up to 5 Sending Domains',
    ctaLabel: 'Activate Managed Fleet',
    features: [
      'Everything in Turnkey Remediation',
      'Multi-domain envelope alignment',
      'Continuous DMARC failure monitoring',
      'Rogue sender blocking (p=reject)',
      'Dedicated engineering Slack channel',
    ],
  },
];

export function ThreeCards({
  onSelectTier,
  onOpenSampleModal,
  isLightMode,
  isLivePreview = false,
}: ThreeCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleCheckout = (tier: Tier) => {
    const priceMap: Record<string, string> = {
      'tier-self': PADDLE_CONFIG.prices.selfServe,
      'tier-audit': PADDLE_CONFIG.prices.turnkey,
      'tier-managed': PADDLE_CONFIG.prices.managed,
    };
    openPaddleCheckout(priceMap[tier.id] || PADDLE_CONFIG.prices.selfServe, tier.name);
  };

  return (
    <section
      id="three-cards-section"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 select-none section-content-auto ${
        isLivePreview
          ? 'py-6'
          : 'py-24 sm:py-28 md:py-36'
      }`}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full blur-[160px] pointer-events-none transition-opacity ${
            isLightMode ? 'bg-neutral-200/40 opacity-30' : 'bg-white/[0.03] opacity-25'
          }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">Zero subscriptions.</span>
            <span className="block">One-time flat fee.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed text-center ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            We audit, flatten, align, and authenticate. You own the verified DNS records forever.
          </p>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {TIERS.map((tier) => {
            const isPopular = tier.popular;
            const isHovered = hoveredCard === tier.id;

            return (
              <div
                key={tier.id}
                onMouseEnter={() => setHoveredCard(tier.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`rc-grain-surface relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl ${
                  isPopular
                    ? isLightMode
                      ? 'bg-white/95 border-2 border-black/80 shadow-2xl shadow-black/10 text-black'
                      : 'bg-[#18181f]/90 border border-white/20 shadow-2xl shadow-black/50 text-white'
                    : isLightMode
                    ? 'bg-white/60 border border-black/10 opacity-80 hover:opacity-100 hover:border-black/20 shadow-sm text-black'
                    : 'bg-[#121216]/30 border border-white/5 opacity-60 hover:opacity-100 hover:border-white/15 shadow-none text-white'
                }`}
                style={{
                  transform: isHovered
                    ? 'scale(1.02) translateY(-6px)'
                    : 'none',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: isHovered ? 20 : isPopular ? 10 : 5,
                }}
              >
                {/* Popular Card Animated Faint Grainy Dark Veil Background */}
                {tier.id === 'tier-audit' && (
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
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '16px 16px, 8px 8px',
                        backgroundPosition: '0 0, 8px 8px',
                      }}
                    />
                    <div className={`absolute inset-0 pointer-events-none ${
                      isLightMode ? 'bg-white/40' : 'bg-[#121216]/60'
                    }`} />
                  </div>
                )}

                {/* Popular Pill */}
                {isPopular && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${
                      isLightMode
                        ? 'bg-black/90 text-white shadow-sm'
                        : 'bg-white/95 text-black shadow-md'
                    }`}
                  >
                    RECOMMENDED
                  </div>
                )}

                <div className="relative z-10">
                  {/* Top Tier Info */}
                  <div className="mb-6">
                    <span className={`font-mono text-xs uppercase tracking-wider block mb-1 ${
                      isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      {tier.period}
                    </span>
                    <h3 className={`text-2xl font-semibold tracking-tight mb-2 ${
                      isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                    }`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs leading-relaxed min-h-[36px] ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${
                    isLightMode ? 'border-black/10' : 'border-white/10'
                  }`}>
                    <span className={`font-mono text-4xl sm:text-5xl font-bold ${
                      isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                    }`}>
                      <NumberTicker value={parseInt(tier.price.replace(/[$,]/g, ''), 10)} prefix="$" duration={900} />
                    </span>
                    <span className={`font-mono text-xs ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      flat / one-time
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-[11px] font-mono uppercase ${
                      isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      Included Scope:
                    </div>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                        <span className={`leading-snug ${
                          isLightMode ? 'text-neutral-700' : 'text-neutral-300'
                        }`}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Paddle Checkout CTA Button */}
                <button
                  onClick={() => handleCheckout(tier)}
                  data-cursor="grow"
                  className={`relative z-10 w-full py-3.5 px-5 rounded-xl font-sans font-medium text-xs tracking-wide transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 min-h-[48px] ${
                    isPopular
                      ? isLightMode
                        ? 'bg-black/90 text-white hover:bg-black shadow-sm'
                        : 'bg-white/90 text-black hover:bg-white'
                      : isLightMode
                      ? 'bg-black/[0.04] text-neutral-800 hover:bg-black/[0.08] border border-black/10'
                      : 'bg-white/[0.08] text-white hover:bg-white/[0.14] border border-white/10'
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
