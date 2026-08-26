'use client'

import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ProductTier } from '../../types';
import Silk from '../Silk';
import { NumberTicker } from '../number-ticker';
import { openPaddleCheckout, PADDLE_CONFIG } from '../../utils/paddle';

const TIERS: ProductTier[] = [
  {
    id: 'tier-snapshot',
    name: 'Self-Serve Blueprint',
    price: '$247',
    period: 'one-time deliverable',
    tagline: 'For teams with an in-house engineer or technical founder.',
    features: [
      'Full-stack DNS deliverability & spoofing risk scorecard',
      'Root SPF mechanism validation & 10-lookup limit audit',
      'Authoritative DMARC policy check (p=quarantine / p=reject)',
      'DKIM selector probing & syntax validation',
      'Exact copy-paste DNS TXT records for your domain',
      'Shareable confidential PDF + JSON bundle',
    ],
    omits: [
      'Direct infrastructure setup & live hands-on DNS execution',
      '14-day post-launch engineering verification & support',
    ],
    ctaLabel: 'Select Self-Serve Blueprint',
  },
  {
    id: 'tier-audit',
    name: 'Turnkey Remediation',
    price: '$547',
    period: 'complete one-time execution',
    popular: true,
    tagline: 'For founders who value their time and refuse to touch DNS records.',
    features: [
      'Everything in Self-Serve Blueprint',
      'Fully automated DNS records configuration',
      'Provider recipes (Google Workspace, M365, and more)',
      'Subdomain inheritance policy hardening & alignment',
      '14-day post-launch engineering support & verification check',
      'Guaranteed 100% Google / Yahoo bulk sender compliance',
    ],
    ctaLabel: 'Get Turnkey Remediation',
  },
  {
    id: 'tier-managed',
    name: 'Managed Outbound Infrastructure',
    price: '$1,247',
    period: 'managed infrastructure',
    tagline: 'A fully scaled, dedicated cold email engine. We build, warm, manage, and maintain your sending architecture.',
    features: [
      '10 Dedicated Sending Domains',
      '30 Authenticated Inboxes',
      'Automated IP Warmup',
      '24/7 Deliverability Monitoring',
      'Continuous Drift & Reputation Protection',
      'Full RFC 7489 Alignment & Zero-Touch Maintenance',
    ],
    ctaLabel: 'Deploy Managed Outbound',
  },
];

interface ThreeCardsProps {
  onSelectTier?: (tierId: string) => void;
  onOpenSampleModal?: () => void;
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

export function ThreeCards({
  onSelectTier,
  onOpenSampleModal,
  isLightMode,
  isLivePreview = false,
}: ThreeCardsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Background: Floating dust-motes particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Dust particles
    const particleCount = 28;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.3 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? `rgba(0, 0, 0, ${p.opacity * 0.35})`
          : `rgba(255, 255, 255, ${p.opacity * 0.65})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightMode]);

  const handleCheckout = (tier: ProductTier) => {
    const priceMap: Record<string, string> = {
      'tier-snapshot': PADDLE_CONFIG.prices.selfServe,
      'tier-audit': PADDLE_CONFIG.prices.turnkey,
      'tier-managed': PADDLE_CONFIG.prices.managed,
    };
    openPaddleCheckout(priceMap[tier.id] || PADDLE_CONFIG.prices.selfServe, tier.name);
  };

  return (
    <section
      id="three-cards-section"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 select-none section-content-auto ${isLivePreview
        ? 'py-6'
        : 'py-24 sm:py-28 md:py-36'
        }`}
    >
      {/* Background canvas for dust motes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full blur-[160px] pointer-events-none transition-opacity ${isLightMode ? 'bg-neutral-200/40 opacity-30' : 'bg-white/[0.03] opacity-25'
            }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
          >
            <span className="block">Transparent Pricing.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed text-center ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            Because <b>&quot;Sent to Spam&quot;</b> is a <i>very</i> expensive way to say hello.
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
                className={`rc-grain-surface relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl opacity-100 ${isPopular
                  ? isLightMode
                    ? 'bg-white/95 border-2 border-black/80 shadow-2xl shadow-black/10 text-black'
                    : 'bg-[#121216]/95 border border-white/25 shadow-2xl shadow-black/60 text-white'
                  : isLightMode
                    ? 'bg-white/80 border border-black/10 hover:border-black/25 shadow-sm text-black'
                    : 'bg-[#121216]/75 border border-white/10 hover:border-white/20 shadow-md text-white'
                  }`}
                style={{
                  transform: isHovered
                    ? 'scale(1.02) translateY(-6px)'
                    : 'none',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  zIndex: isHovered ? 20 : isPopular ? 10 : 5,
                }}
              >
                {/* $547 Popular Card Animated Faint Grainy Dark Veil Background */}
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
                    <div className={`absolute inset-0 pointer-events-none ${isLightMode ? 'bg-white/40' : 'bg-[#121216]/60'
                      }`} />
                  </div>
                )}

                {/* Popular Pill */}
                {isPopular && (
                  <div
                    className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-md z-10 ${isLightMode
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
                    <span className={`font-mono text-xs uppercase tracking-wider block mb-1 ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                      {tier.period}
                    </span>
                    <h3 className={`text-2xl font-semibold tracking-tight mb-2 ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                      }`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs leading-relaxed min-h-[36px] ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className={`flex items-baseline gap-2 pb-6 mb-6 border-b ${isLightMode ? 'border-black/10' : 'border-white/10'
                    }`}>
                    <span className={`font-mono text-4xl sm:text-5xl font-bold ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                      }`}>
                      <NumberTicker value={parseInt(tier.price.replace(/[$,]/g, ''), 10)} prefix="$" duration={900} />
                    </span>
                    <span className={`font-mono text-xs ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      flat / one-time
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-[11px] font-mono uppercase ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'
                      }`}>
                      Included Scope:
                    </div>
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500" />
                        <span className={`leading-snug ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'
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
                  className={`relative z-10 w-full py-3.5 px-5 rounded-xl font-sans font-medium text-xs tracking-wide transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 min-h-[48px] ${isPopular
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
