'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

interface AmbientCanvasWrapperProps {
  children: React.ReactNode;
}

export function AmbientCanvasWrapper({ children }: AmbientCanvasWrapperProps) {
  const pathname = usePathname();
  const isIntakePage = pathname?.startsWith('/intake');

  // Motion values for cursor coordinates (only active on main marketing pages)
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth trailing spring physics (damping: 45, stiffness: 180)
  const springConfig = { damping: 45, stiffness: 180, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isIntakePage) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isIntakePage]);

  // Soft, diffused radial spotlight smoothly tracking cursor coordinates (850px circle)
  const background = useMotionTemplate`radial-gradient(850px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.04), transparent 75%)`;

  return (
    <div className="relative min-h-screen w-full bg-[#08080a] text-[#F4F4F2] overflow-x-hidden">
      {/* Soft Diffused Radial Spotlight Tracking Cursor (Disabled on intake to preserve pure native cursor) */}
      {!isIntakePage && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
          style={{ background }}
          aria-hidden="true"
        />
      )}



      {/* Atmospheric Vignette Depth (Pure Monochrome) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,255,255,0.03),transparent)]"
        aria-hidden="true"
      />

      {/* Fixed Hardware-Accelerated SVG Noise Grain Overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] select-none mix-blend-overlay"
        style={{
          opacity: 0.038,
          mixBlendMode: 'overlay',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
        }}
        aria-hidden="true"
      />

      {/* Main Page Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
