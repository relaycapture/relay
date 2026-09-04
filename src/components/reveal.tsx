'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  blur?: number;
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 22,
  duration = 0.85,
  blur = 10,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? `blur(${blur}px)` : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

