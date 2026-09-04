'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function InteractiveHeroTriangle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for mouse coordinates relative to container center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D perspective tilts driven by cursor
  const rotateX = useTransform(smoothY, [-300, 300], [18, -18]);
  const rotateY = useTransform(smoothX, [-300, 300], [-22, 22]);
  const rotateZ = useTransform(smoothX, [-300, 300], [-6, 6]);
  const translateX = useTransform(smoothX, [-300, 300], [-15, 15]);
  const translateY = useTransform(smoothY, [-300, 300], [-15, 15]);

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 1200 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[42%] w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] lg:w-[660px] lg:h-[660px] pointer-events-auto z-10 select-none flex items-center justify-center cursor-crosshair"
      aria-label="Interactive Architectural Prism"
    >
      {/* Ambient White Aura Glow behind the prism */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.25 : 0.12,
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(255,255,255,0.4),transparent_65%)] blur-3xl pointer-events-none"
      />

      {/* Interactive 3D Tilting Monolith Triangle */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          rotateZ,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Primary Face Gradient: Machined White Frosted Specular */}
            <linearGradient id="triangleFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#E4E4E7" stopOpacity="0.85" />
              <stop offset="85%" stopColor="#A1A1AA" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#71717A" stopOpacity="0.65" />
            </linearGradient>

            {/* Chamfered Bevel Rim Gradient */}
            <linearGradient id="triangleBevelGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="50%" stopColor="#D4D4D8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3F3F46" stopOpacity="0.4" />
            </linearGradient>

            {/* Directional Specular Reflection Shimmer */}
            <linearGradient id="triangleSpecularSweep" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter id="chamferGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#FFFFFF" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Facet 1: Main Facing Equilateral Triangle (Apex pointing leftward into viewport) */}
          {/* Points: Apex at (80, 250), Top Right at (440, 60), Bottom Right at (440, 440) */}
          <polygon
            points="80,250 440,60 440,440"
            fill="url(#triangleFaceGrad)"
            stroke="url(#triangleBevelGrad)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* Internal Precision Facet Lines (Architectural Prism Creases) */}
          <line
            x1="80"
            y1="250"
            x2="320"
            y2="250"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1="320"
            y1="250"
            x2="440"
            y2="60"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="1"
          />
          <line
            x1="320"
            y1="250"
            x2="440"
            y2="440"
            stroke="rgba(0, 0, 0, 0.25)"
            strokeWidth="1"
          />

          {/* Center Precision Vertex Node */}
          <circle cx="320" cy="250" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="80" cy="250" r="2.5" fill="#FFFFFF" opacity="0.95" />

          {/* Top Apex Rim Highlight (Specular Edge Catching Light) */}
          <line
            x1="80"
            y1="250"
            x2="440"
            y2="60"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={isHovered ? 0.95 : 0.75}
          />
        </svg>

        {/* Minimalist Coordinate Micro-Readout when Hovered */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-12 left-10 font-mono text-[9px] tracking-widest text-neutral-400 uppercase select-none pointer-events-none"
        >
          <span>PRISM_VERTEX // ROT: </span>
          <span className="text-white font-medium">3D_TILT</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
