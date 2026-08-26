'use client'

import { useRef, useEffect } from 'react';

export function useMagnetic(strength = 0.25, maxOffset = 6, proximity = 45) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    let isLooping = false;

    const startAnimation = () => {
      if (!isLooping) {
        isLooping = true;
        raf = requestAnimationFrame(animate);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < proximity + rect.width / 2) {
        // Calculate clamped offset
        targetX = Math.max(-maxOffset, Math.min(maxOffset, distX * strength));
        targetY = Math.max(-maxOffset, Math.min(maxOffset, distY * strength));
      } else {
        targetX = 0;
        targetY = 0;
      }
      startAnimation();
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      const isMoving = Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02 || Math.abs(targetX) > 0;

      if (isMoving) {
        el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        raf = requestAnimationFrame(animate);
      } else {
        el.style.transform = 'translate3d(0px, 0px, 0)';
        isLooping = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength, maxOffset, proximity]);

  return ref;
}
