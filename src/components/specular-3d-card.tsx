'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

interface Specular3DCardProps {
  children: React.ReactNode;
  className?: string;
  glareOpacity?: number;
  maxTilt?: number;
}

export function Specular3DCard({
  children,
  className = '',
  glareOpacity = 0.15,
  maxTilt = 5,
}: Specular3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for normalized mouse positions (-1 to 1)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Absolute pixel coordinates for specular glare
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);

  // Smooth spring physics for heavy mechanical feel
  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothNormX = useSpring(normX, springConfig);
  const smoothNormY = useSpring(normY, springConfig);

  // Tilts: mouse moving right tilts card to the right (rotateY positive), moving down tilts card down (rotateX negative)
  const rotateX = useTransform(smoothNormY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothNormX, [-1, 1], [-maxTilt, maxTilt]);

  // Unconditional top-level hook call for glare background
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(450px circle at ${x}px ${y}px, rgba(255, 255, 255, ${glareOpacity}), transparent 75%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glareX.set(x);
    glareY.set(y);

    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;

    normX.set(Math.max(-1, Math.min(1, nx)));
    normY.set(Math.max(-1, Math.min(1, ny)));
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="relative w-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden transition-shadow duration-300 ${className}`}
      >
        {/* Directional Illuminated Hairline Rim (Bright top edge fading down) */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border-t border-white/25 border-b-transparent border-x-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_2px_4px_rgba(255,255,255,0.02)]"
          aria-hidden="true"
        />

        {/* Dynamic Specular Glare Gradient that tracks cursor (Hooks-compliant) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Card Content */}
        <div className="relative z-0 h-full w-full">{children}</div>
      </motion.div>
    </div>
  );
}
