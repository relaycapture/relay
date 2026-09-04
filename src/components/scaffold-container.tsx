'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScaffoldContainerProps {
  children: React.ReactNode;
  className?: string;
  sectionIndex?: string;
  sectionTitle?: string;
}

export function ScaffoldContainer({
  children,
  className = '',
  sectionIndex,
  sectionTitle,
}: ScaffoldContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full ${className}`}
    >
      {/* Functional Structural Margin Label (Clean, Authentic, Non-Greeble) */}
      {(sectionIndex || sectionTitle) && (
        <div
          className="flex items-center justify-between pb-3 mb-6 border-b border-white/[0.06] font-mono text-[10px] tracking-widest text-neutral-500 uppercase select-none"
          aria-hidden="true"
        >
          <span>{sectionIndex || 'INDEX'}</span>
          <span>{sectionTitle || ''}</span>
        </div>
      )}

      {/* Clean Structural Boundary Line */}
      <div className="relative z-10 w-full">{children}</div>
    </motion.div>
  );
}
