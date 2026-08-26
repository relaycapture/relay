'use client'

import { useEffect, useState } from 'react';

export type PagePhase = 'boot' | 'idle' | 'covering' | 'revealing';

interface TeleportOverlayProps {
  phase: PagePhase;
  destination?: string;
  reducedMotion?: boolean;
}

export function TeleportOverlay({
  phase,
  destination = '',
  reducedMotion = false,
}: TeleportOverlayProps) {
  const [displayedText, setDisplayedText] = useState(destination);

  // Update displayed text when destination changes, and keep it until fade out completes
  useEffect(() => {
    if (destination) {
      setDisplayedText(destination);
    }
  }, [destination]);

  // Active visibility states
  const isVisible = phase === 'boot' || phase === 'covering';
  const isIdle = phase === 'idle';

  const transitionDuration = reducedMotion ? '220ms' : '480ms';
  const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      id="teleport-grain-overlay"
      aria-hidden={isIdle}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#000000',
        pointerEvents: isIdle ? 'none' : 'auto',
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${transitionDuration} ${ease}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Spotlight Light Effect Beam */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 50% 48%, rgba(255, 255, 255, 0.14) 0%, rgba(210, 220, 255, 0.05) 42%, rgba(0, 0, 0, 0) 75%)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
          transition: `opacity ${transitionDuration} ${ease}, transform ${transitionDuration} ${ease}`,
        }}
      />

      {/* Core Soft Ambient Center Glow */}
      <div
        className="absolute w-[540px] h-[320px] rounded-full pointer-events-none blur-[100px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, rgba(160, 180, 240, 0.04) 50%, transparent 80%)',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.85)',
          transition: `opacity ${transitionDuration} ${ease}, transform ${transitionDuration} ${ease}`,
        }}
      />

      {/* High-density Organic Black Grain Texture (Authentic In-Place CCTV Noise Jitter) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
          opacity: 0.13,
          mixBlendMode: 'screen',
          animation: reducedMotion ? 'none' : 'rc-grain 0.28s steps(1) infinite',
        }}
      />

      {/* Deep Vignette Edge Shadow Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.9) 80%, #000000 100%)',
        }}
      />

      {/* Center Destination Typography with smooth Fade In / Fade Out */}
      <div
        className="relative z-10 text-center px-6 flex flex-col items-center justify-center select-none"
        style={{
          transform: isVisible
            ? 'scale(1) translateY(0)'
            : 'scale(1.03) translateY(-8px)',
          opacity: isVisible && displayedText ? 1 : 0,
          filter: isVisible ? 'blur(0px)' : 'blur(3px)',
          transition: `transform ${transitionDuration} ${ease}, opacity ${transitionDuration} ${ease}, filter ${transitionDuration} ${ease}`,
        }}
      >
        {displayedText && (
          <h2
            className="font-sans text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white/95"
            style={{
              textShadow:
                '0 0 40px rgba(255, 255, 255, 0.35), 0 0 80px rgba(255, 255, 255, 0.15), 0 4px 24px rgba(0, 0, 0, 0.9)',
            }}
          >
            {displayedText}
          </h2>
        )}
      </div>
    </div>
  );
}
