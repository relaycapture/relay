'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, HTMLMotionProps } from 'framer-motion';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function MagneticButton({
  children,
  className = '',
  variant = 'primary',
  onClick,
  id,
  type = 'button',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic pull offset
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Elastic spring physics for returning to center
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      // Trigger magnetic attraction when cursor is within 50px of button edge
      const magneticRadius = Math.max(rect.width, rect.height) / 2 + 50;

      if (distance < magneticRadius) {
        const pullFactor = 1 - distance / magneticRadius;
        const maxOffset = 12;
        x.set((distX / distance) * maxOffset * pullFactor);
        y.set((distY / distance) * maxOffset * pullFactor);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  const isPrimary = variant === 'primary';

  return (
    <motion.button
      ref={buttonRef}
      id={id}
      type={type}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.94 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-[2px] font-sans transition-all duration-200 select-none cursor-pointer border ${
        isPrimary
          ? 'bg-neutral-100 hover:bg-white text-neutral-900 font-medium border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_4px_16px_rgba(0,0,0,0.5)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
          : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 font-medium border-white/[0.12] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]'
      } ${className}`}
      {...props}
    >
      {/* Specular Sheen Sweep Animation on hover */}
      {isPrimary && (
        <motion.span
          className="pointer-events-none absolute inset-0 -skew-x-12 opacity-40 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ x: '-100%' }}
          animate={isHovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] as const }}
          aria-hidden="true"
        />
      )}

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
