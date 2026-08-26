'use client'

import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Check, FileText } from 'lucide-react';
import { ProductTier } from '../../types';
import Silk from '../Silk';
import { NumberTicker } from '../number-ticker';

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
    period: 'the enterprise anchor',
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
  onSelectTier: (tierId: string) => void;
  onOpenSampleModal: () => void;
  isLightMode?: boolean;
}

export function ThreeCards({ onSelectTier, onOpenSampleModal, isLightMode }: ThreeCardsProps) {
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

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLightMode
          ? `rgba(0, 0, 0, ${p.opacity * 0.6})`
          : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Viewport-gated Intersection Observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const visible = entry?.isIntersecting ?? true;
        if (visible !== isVisible) {
          isVisible = visible;
          if (isVisible) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          } else if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { rootMargin: '200px 0px' }
    );
    intersectionObserver.observe(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
    };
  }, [isLightMode]);

  return (
    <section
      id="three-cards-section"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 section-content-auto"
    >
      {/* Background: Floating dust motes canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">One Time.</span>
            <span className="block">Zero Retainers.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            <span className="block">No recurring SaaS fees. No 30-minute discovery meetings.</span>
            <span className="block">We fix it in 24 hours, and get out of your way.</span>
          </p>
        </div>

        {/* Three Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto pt-4">
          {TIERS.map((tier) => {
            const isPopular = tier.popular;
            const isHovered = hoveredCard === tier.id;

            return (
              <div
                key={tier.id}
                id={`product-card-${tier.id}`}
                data-cursor="grow"
                onMouseEnter={() => setHoveredCard(tier.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`rc-grain-surface relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl overflow-hidden ${
                  isLightMode
                    ? isPopular
                      ? 'bg-white/95 border-2 border-black/90 shadow-[0_20px_50px_rgba(0,0,0,0.09)] text-[#1d1d1f]'
                      : tier.id === 'tier-managed'
                      ? 'bg-white/90 border border-black/20 hover:border-black/35 shadow-[0_10px_35px_rgba(0,0,0,0.06)] opacity-100 text-[#1d1d1f]'
                      : 'bg-white/35 border border-black/5 opacity-70 hover:opacity-100 hover:border-black/15 shadow-none text-[#1d1d1f]'
                    : isPopular
                    ? 'bg-[#121216]/95 border-2 border-white/90 shadow-[0_20px_60px_rgba(255,255,255,0.07)] text-white'
                    : tier.id === 'tier-managed'
                    ? 'bg-[#121216]/90 border border-white/20 hover:border-white/35 shadow-[0_10px_40px_rgba(0,0,0,0.45)] opacity-100 text-white'
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
                {/* $547 Popular Card Animated Faint Grainy Dark Veil Background (same color as Silk #484452) */}
                {tier.id === 'tier-audit' && (
                  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-0">
                    {/* Animated Silk shader veil */}
                    <div className="absolute inset-0 opacity-30 mix-blend-screen">
                      <Silk
                        speed={0.4}
                        scale={1.05}
                        color={isLightMode ? '#c8c2d4' : '#24202d'}
                        noiseIntensity={2.0}
                        rotation={0}
                      />
                    </div>
                    {/* Grainy dark veil overlay for tactile texture */}
                    <div
                      className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.3) 1px, transparent 1px)`,
                        backgroundSize: '16px 16px, 8px 8px',
                        backgroundPosition: '0 0, 8px 8px',
                      }}
                    />
                    {/* Soft dark radial vignette to preserve sharp contrast */}
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

                {/* Bottom CTA Button with subtle 2D glass blur */}
                <button
                  onClick={() => onSelectTier(tier.id)}
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

        {/* Deliverable Proof trigger with premium glass styling */}
        <div className="mt-10 sm:mt-14 text-center">
          <button
            id="view-sample-deliverable-btn"
            data-cursor="grow"
            onClick={onOpenSampleModal}
            className={`group inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 sm:px-7 py-3.5 rounded-full border text-xs sm:text-[13px] font-sans font-medium transition-all duration-300 backdrop-blur-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] min-h-[48px] max-w-full ${
              isLightMode
                ? 'bg-white/80 hover:bg-white text-neutral-800 border-black/10 hover:border-black/20 shadow-black/[0.04]'
                : 'bg-[#121216]/80 hover:bg-[#18181f] text-neutral-200 hover:text-white border-white/10 hover:border-white/20 shadow-black/40'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform flex-shrink-0">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span className="text-neutral-500 dark:text-neutral-400 font-normal hidden xs:inline">
              Want to inspect a real report first?
            </span>
            <span className={`font-semibold underline underline-offset-4 decoration-emerald-500/40 group-hover:decoration-emerald-500 transition-colors ${
              isLightMode ? 'text-black' : 'text-white'
            }`}>
              View Sample Deliverable (PDF + JSON)
            </span>
            <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
