'use client'

import { useEffect, useRef, useState } from 'react';

interface NumberTickerProps {
  value: number;
  duration?: number; // duration in ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function NumberTicker({
  value,
  duration = 1200,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  delay = 0,
}: NumberTickerProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let startTime: number | null = null;
    let animId: number | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      const startVal = prevValueRef.current;
      const endVal = value;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutCubic: 1 - Math.pow(1 - progress, 3)
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = startVal + (endVal - startVal) * ease;

        setDisplayValue(current);

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endVal);
          prevValueRef.current = endVal;
        }
      };

      animId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          if (delay > 0) {
            timeoutId = setTimeout(startAnimation, delay);
          } else {
            startAnimation();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // If already in view and value changes (e.g. dynamic slider or domain scan), re-animate smoothly
    if (hasAnimatedRef.current && prevValueRef.current !== value) {
      startAnimation();
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, duration, delay]);

  const formattedNumber = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
