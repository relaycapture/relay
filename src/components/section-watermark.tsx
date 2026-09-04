'use client';

import React from 'react';

export interface SectionWatermarkProps {
  /**
   * Watermark text on desktop / fallback for all screens.
   * e.g. "RELAY", "AUDIT", "RFC", "CAPEX", "03", "48H", "MTA", "PRE", "FAQ"
   */
  text: string;
  /**
   * Optional separate text specifically for phone view.
   * If omitted, `text` is used on all screen sizes.
   */
  mobileText?: string;

  // ==========================================
  // DESKTOP & TABLET CONTROLS (>= 640px)
  // ==========================================
  /**
   * Top position.
   * Accepts: "20px", "-50px", 20, -40, "10%", "5rem", "top-4", "-top-10"
   */
  top?: string | number;
  /**
   * Bottom position.
   * When set, top is automatically omitted so bottom positioning works properly.
   * Accepts: "20px", "-50px", 20, "10%", "bottom-0", "bottom-4"
   */
  bottom?: string | number;
  /**
   * Left position.
   * Accepts: "-100px", "0px", 40, -40, "10%", "-left-10", "left-0"
   */
  left?: string | number;
  /**
   * Right position.
   * When set, left is automatically omitted so right positioning works properly.
   * Accepts: "20px", "0px", 40, "right-0", "right-4"
   */
  right?: string | number;
  /**
   * Quick alignment helper: 'left' | 'center' | 'right'
   * If align="center" or center={true}:
   * Automatically centers the watermark horizontally with left: 50% & translateX(-50%).
   */
  align?: 'left' | 'center' | 'right';
  center?: boolean;
  /**
   * Text size.
   * Accepts: "28rem", "24rem", "350px", 350, "text-[28rem]", "text-9xl", "14vw"
   * Default: "26rem"
   */
  size?: string | number;
  /**
   * Opacity.
   * Accepts: 0.02, 0.03, "0.025", "opacity-[0.02]"
   * Default: 0.02
   */
  opacity?: string | number;

  // ==========================================
  // DEDICATED PHONE VIEW CONTROLS (< 640px)
  // ==========================================
  mobileTop?: string | number;
  mobileBottom?: string | number;
  mobileLeft?: string | number;
  mobileRight?: string | number;
  mobileAlign?: 'left' | 'center' | 'right';
  mobileCenter?: boolean;
  mobileSize?: string | number;
  mobileOpacity?: string | number;
  /**
   * If true, hide watermark completely on phone view.
   */
  hideOnMobile?: boolean;

  // ==========================================
  // FADE & MASK (OPTIONAL)
  // ==========================================
  /**
   * Optional subtle fade at the bottom.
   * Default: false (so glyphs are 100% visible and NEVER cut off!)
   */
  bottomFade?: boolean;
  fadeMask?: string;

  className?: string;
  style?: React.CSSProperties;
}

// Spacing map to convert any Tailwind spacing tokens to exact CSS units
const TAILWIND_SPACING: Record<string, string> = {
  '0': '0px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
  'auto': 'auto',
  'full': '100%',
  '1/2': '50%',
};

/**
 * Universal Coordinate Parser:
 * Translates numbers (20, -40), CSS units ("20px", "-50px", "10%", "5rem"),
 * Tailwind bracket classes ("top-[20px]", "-left-[40px]"), and standard Tailwind classes ("top-4", "-left-10")
 * directly into foolproof inline CSS strings.
 */
function parseCoord(val: string | number | undefined): string | undefined {
  if (val === undefined || val === null || val === '') return undefined;

  // 1. Raw numeric value
  if (typeof val === 'number') {
    return `${val}px`;
  }

  const str = String(val).trim();

  // 2. String numeric value ("20", "-50")
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return `${str}px`;
  }

  // 3. Direct CSS unit ("20px", "-50px", "10%", "5rem", "15vw", "auto")
  if (/^-?\d+(\.\d+)?(px|rem|em|%|vw|vh|vmin|vmax)$/i.test(str) || str === 'auto') {
    return str;
  }

  // 4. Tailwind arbitrary bracket value: e.g. "top-[20px]", "-left-[50px]"
  const bracketMatch = str.match(/^-?[a-z]+-\[(.+)\]$/);
  if (bracketMatch) {
    const isNeg = str.startsWith('-');
    const inner = bracketMatch[1];
    return isNeg && !inner.startsWith('-') ? `-${inner}` : inner;
  }

  // 5. Tailwind standard spacing: e.g. "top-4", "-left-10", "right-0"
  const twMatch = str.match(/^(-)?(?:top|bottom|left|right)-(.+)$/);
  if (twMatch) {
    const isNeg = Boolean(twMatch[1]);
    const token = twMatch[2];
    if (TAILWIND_SPACING[token]) {
      const base = TAILWIND_SPACING[token];
      if (base === '0px' || base === 'auto') return base;
      return isNeg ? `-${base}` : base;
    }
  }

  // Fallback: return as-is
  return str;
}

/**
 * Universal Font Size Parser:
 * Supports CSS units ("28rem", "350px"), numbers (300 -> "300px"),
 * Tailwind bracket classes ("text-[28rem]"), and standard text sizes ("text-9xl").
 */
function parseSize(val: string | number | undefined): string | undefined {
  if (val === undefined || val === null || val === '') return undefined;

  if (typeof val === 'number') {
    return `${val}px`;
  }

  const str = String(val).trim();

  // String number ("300")
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return `${str}px`;
  }

  // Direct CSS unit
  if (/^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/i.test(str)) {
    return str;
  }

  // Tailwind bracket: "text-[28rem]"
  const bracketMatch = str.match(/^text-\[(.+)\]$/);
  if (bracketMatch) {
    return bracketMatch[1];
  }

  // Tailwind named sizes
  const TW_SIZES: Record<string, string> = {
    'text-9xl': '8rem',
    'text-8xl': '6rem',
    'text-7xl': '4.5rem',
    'text-6xl': '3.75rem',
    'text-5xl': '3rem',
  };
  if (TW_SIZES[str]) return TW_SIZES[str];

  // Compound classes like "text-[24rem] md:text-[28rem]"
  const parts = str.split(/\s+/);
  for (const part of parts.reverse()) {
    const m = part.match(/(?:[a-z]+:)?text-\[(.+)\]/);
    if (m) return m[1];
  }

  return str;
}

/**
 * Universal Opacity Parser:
 * Converts 0.02, "0.025", "opacity-[0.02]", "opacity-10" to numeric opacity.
 */
function parseOpacity(val: string | number | undefined): number | undefined {
  if (val === undefined || val === null || val === '') return undefined;

  if (typeof val === 'number') return val;

  const str = String(val).trim();

  if (/^\d+(\.\d+)?$/.test(str)) {
    return parseFloat(str);
  }

  const bracketMatch = str.match(/^opacity-\[(.+)\]$/);
  if (bracketMatch) {
    return parseFloat(bracketMatch[1]);
  }

  const twMatch = str.match(/^opacity-(\d+)$/);
  if (twMatch) {
    return parseInt(twMatch[1], 10) / 100;
  }

  return undefined;
}

interface ComputeStyleArgs {
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  align?: 'left' | 'center' | 'right';
  center?: boolean;
  size?: string | number;
  opacity?: string | number;
  defaultTop?: string;
  defaultLeft?: string;
  defaultSize?: string;
  defaultOpacity?: number;
}

function computeStyles({
  top,
  bottom,
  left,
  right,
  align,
  center,
  size,
  opacity,
  defaultTop = '0px',
  defaultLeft = '0px',
  defaultSize = '26rem',
  defaultOpacity = 0.02,
}: ComputeStyleArgs): React.CSSProperties {
  const s: React.CSSProperties = {};

  // 1. Vertical Positioning: If bottom is set, top is NOT set to avoid conflicts
  if (bottom !== undefined && bottom !== null && bottom !== '') {
    s.bottom = parseCoord(bottom);
  } else if (top !== undefined && top !== null && top !== '') {
    s.top = parseCoord(top);
  } else {
    s.top = defaultTop;
  }

  // 2. Horizontal Positioning & Alignment
  const isCentered = center === true || align === 'center';
  if (isCentered) {
    s.left = '50%';
    s.transform = 'translateX(-50%)';
  } else if (right !== undefined && right !== null && right !== '') {
    s.right = parseCoord(right);
  } else if (left !== undefined && left !== null && left !== '') {
    s.left = parseCoord(left);
  } else if (align === 'right') {
    s.right = '0px';
  } else {
    s.left = defaultLeft;
  }

  // 3. Size
  s.fontSize = parseSize(size) || defaultSize;

  // 4. Opacity
  s.opacity = parseOpacity(opacity) ?? defaultOpacity;

  return s;
}

/**
 * SectionWatermark
 * Renders monumental background typography that:
 * 1. Positions by default at the exact top-left corner (top: 0px, left: 0px) of its section.
 * 2. Never fixed - scrolls naturally with the section.
 * 3. Accurately moves with ANY input: pixels ("20px", "-50px"), rems, percentages, numbers (20, -50), or Tailwind classes.
 * 4. Never conflicts: setting bottom automatically unsets top; setting right unsets left.
 * 5. Never cuts off: no clipping mask by default, overflow visible, whitespace nowrap.
 * 6. Separate phone (<640px) vs desktop (>=640px) controls.
 */
export function SectionWatermark({
  text,
  mobileText,
  top,
  bottom,
  left,
  right,
  align,
  center,
  size,
  opacity,
  mobileTop,
  mobileBottom,
  mobileLeft,
  mobileRight,
  mobileAlign,
  mobileCenter,
  mobileSize,
  mobileOpacity,
  hideOnMobile = false,
  bottomFade = true,
  fadeMask,
  className = '',
  style,
}: SectionWatermarkProps) {
  // Desktop computed styles (anchored at top-left corner -30px, -30px by default)
  const desktopStyles = computeStyles({
    top,
    bottom,
    left,
    right,
    align,
    center,
    size,
    opacity,
    defaultTop: '-30px',
    defaultLeft: '-30px',
    defaultSize: '28rem',
    defaultOpacity: 0.02,
  });

  // Mobile computed styles (falls back cleanly to desktop values if mobile-specific not provided)
  const mobileStyles = computeStyles({
    top: mobileTop !== undefined ? mobileTop : top,
    bottom: mobileBottom !== undefined ? mobileBottom : bottom,
    left: mobileLeft !== undefined ? mobileLeft : (right !== undefined ? undefined : left),
    right: mobileRight !== undefined ? mobileRight : right,
    align: mobileAlign !== undefined ? mobileAlign : align,
    center: mobileCenter !== undefined ? mobileCenter : center,
    size: mobileSize !== undefined ? mobileSize : (size ? undefined : '9rem'),
    opacity: mobileOpacity !== undefined ? mobileOpacity : opacity,
    defaultTop: '-10px',
    defaultLeft: '-10px',
    defaultSize: '9rem',
    defaultOpacity: 0.025,
  });

  // Subtle black fade out at the bottom of the watermark text
  const defaultFadeMask =
    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.35) 80%, rgba(0,0,0,0) 100%)';
  const maskStyles: React.CSSProperties = bottomFade !== false
    ? {
        maskImage: fadeMask || defaultFadeMask,
        WebkitMaskImage: fadeMask || defaultFadeMask,
      }
    : {};

  const commonClasses =
    'pointer-events-none absolute font-mono font-black tracking-tighter text-white leading-[0.88] whitespace-nowrap select-none overflow-visible z-0';

  return (
    <>
      {/* Phone View (< 640px) */}
      {!hideOnMobile && (
        <div
          className={`sm:hidden ${commonClasses} ${className}`}
          style={{ ...mobileStyles, ...maskStyles, ...style }}
          aria-hidden="true"
        >
          {mobileText || text}
        </div>
      )}

      {/* Desktop & Tablet View (>= 640px) */}
      <div
        className={`hidden sm:block ${commonClasses} ${className}`}
        style={{ ...desktopStyles, ...maskStyles, ...style }}
        aria-hidden="true"
      >
        {text}
      </div>
    </>
  );
}
