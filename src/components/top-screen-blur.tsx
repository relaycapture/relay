'use client';

import React from 'react';

export interface TopScreenBlurProps {
  /**
   * Height of the blur ribbon.
   * Accepts:
   * - Standard Tailwind classes: "h-16 sm:h-20", "h-20 sm:h-24", "h-14 sm:h-16"
   * - Direct CSS values: "70px", "80px", "4.5rem", "6vh"
   * - Direct numbers: 70, 80 (converted to px)
   * Default: "h-20 sm:h-24 md:h-28"
   */
  height?: string | number;
  isLightMode?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

function resolveHeight(height: string | number | undefined): {
  className?: string;
  style?: React.CSSProperties;
} {
  if (height === undefined || height === null || height === '') {
    return { className: 'h-20 sm:h-24 md:h-28' };
  }

  if (typeof height === 'number') {
    return { style: { height: `${height}px` } };
  }

  const str = String(height).trim();

  if (/^\d+$/.test(str)) {
    return { style: { height: `${str}px` } };
  }

  if (/^\d+(\.\d+)?(px|rem|em|vh|%)$/i.test(str)) {
    return { style: { height: str } };
  }

  const bracketMatch = str.match(/^h-\[(.+)\]$/);
  if (bracketMatch) {
    return { style: { height: bracketMatch[1] } };
  }

  const standardTwHeights = new Set([
    '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56',
    '60', '64', '72', '80', '96', 'auto', 'full', 'screen'
  ]);

  const tokens = str.split(/\s+/);
  const classes: string[] = [];
  let inlineHeight: string | undefined;

  tokens.forEach((token) => {
    const m = token.match(/^(?:([a-z]+):)?h-(\d+(?:\.\d+)?)$/);
    if (m) {
      const prefix = m[1];
      const numStr = m[2];
      if (standardTwHeights.has(numStr)) {
        classes.push(token);
      } else {
        const px = Math.round(parseFloat(numStr) * 4);
        if (!prefix) {
          inlineHeight = `${px}px`;
        } else {
          classes.push(`${prefix}:h-[${px}px]`);
        }
      }
    } else {
      classes.push(token);
    }
  });

  return {
    className: classes.length > 0 ? classes.join(' ') : undefined,
    style: inlineHeight ? { height: inlineHeight } : undefined,
  };
}

/**
 * TopScreenBlur
 * Luxurious progressive optical lens gradient blur at top of viewport.
 * Intense frosted obsidian glass right at the top edge (top: 0),
 * progressively and smoothly fading out downward into crystal sharpness.
 * Zero hard boundaries or blurry block edges.
 */
export function TopScreenBlur({
  height = 'h-20 sm:h-24 md:h-28',
  isLightMode = false,
  className = '',
  style,
}: TopScreenBlurProps) {
  const parsed = resolveHeight(height);

  return (
    <div
      className={`fixed top-0 left-0 right-0 ${parsed.className || ''} pointer-events-none z-30 select-none overflow-hidden ${className}`}
      style={{ ...parsed.style, ...style }}
      aria-hidden="true"
    >
      {/* High-Performance Optical Dissipation Blur: Single GPU composited layer */}
      <div
        className="absolute inset-0 backdrop-blur-md will-change-transform"
        style={{
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 75%, transparent 100%)',
        }}
      />

      {/* Atmospheric Edge Grounding Tint */}
      <div
        className="absolute inset-0"
        style={{
          background: isLightMode
            ? 'linear-gradient(to bottom, rgba(244,244,242,0.85) 0%, rgba(244,244,242,0.2) 50%, transparent 100%)'
            : 'linear-gradient(to bottom, rgba(8,8,10,0.85) 0%, rgba(8,8,10,0.2) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
