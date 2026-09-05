'use client';

import { useEffect, useRef } from 'react';

interface CustomCursorProps {
  isLightMode?: boolean;
}

export function CustomCursor({ isLightMode: _isLightMode }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enable custom cursor suppression class on <html> only while mounted
    document.documentElement.classList.add('custom-cursor-active');

    // Clean up any old injected style tag
    const oldStyleTag = document.getElementById('force-system-cursor-hidden');
    if (oldStyleTag) oldStyleTag.remove();

    const cursor = cursorRef.current;
    const ripple = rippleRef.current;
    if (!cursor || !ripple) return;

    let isMouseActive = false;
    let posX = -100;
    let posY = -100;
    let targetScale = 1;
    let curScale = 1;
    let isPressed = false;
    let raf = 0;

    const activateCustomCursor = () => {
      if (!isMouseActive) {
        isMouseActive = true;
        cursor.style.display = 'block';
        cursor.style.opacity = '1';
      }
    };

    const deactivateCustomCursor = () => {
      if (isMouseActive) {
        isMouseActive = false;
        cursor.style.display = 'none';
        cursor.style.opacity = '0';
      }
    };

    // Ultra-fast zero-latency position update without any DOM traversal
    const onMove = (e: MouseEvent | PointerEvent) => {
      if ('pointerType' in e && e.pointerType === 'touch') {
        deactivateCustomCursor();
        return;
      }

      activateCustomCursor();
      posX = e.clientX;
      posY = e.clientY;

      cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-3px, -3px) scale(${curScale})`;
    };

    // Separate hover detection to pointerover/pointerout so onMove never walks the DOM
    const onOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        '[data-cursor="grow"], button, a, input, select, textarea, [role="button"], .interactive-target, #inbox-comparison, #pricing-tiers-grid'
      );
      targetScale = interactive ? 1.18 : 1;
    };

    const onDown = (e: MouseEvent | PointerEvent) => {
      if ('pointerType' in e && e.pointerType === 'touch') return;
      isPressed = true;

      // Tactile click confirmation ripple
      ripple.style.transition = 'none';
      ripple.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(0.3)`;
      ripple.style.opacity = '0.9';
      void ripple.offsetWidth; // force reflow
      ripple.style.transition =
        'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)';
      ripple.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%) scale(1.5)`;
      ripple.style.opacity = '0';
    };

    const onUp = () => {
      isPressed = false;
    };

    const onMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const onMouseEnter = () => {
      if (isMouseActive) cursor.style.opacity = '1';
    };

    // Smooth scale animation loop (only animates scale, position is instant hardware transform)
    const loop = () => {
      const activeTarget = isPressed ? targetScale * 0.86 : targetScale;
      if (Math.abs(activeTarget - curScale) > 0.005) {
        curScale += (activeTarget - curScale) * 0.3;
        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-3px, -3px) scale(${curScale})`;
      }

      raf = requestAnimationFrame(loop);
    };

    // Use PointerEvents if available, otherwise mouse events (never both together)
    if (window.PointerEvent) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      window.addEventListener('pointerup', onUp, { passive: true });
      document.addEventListener('pointerover', onOver, { passive: true });
    } else {
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mousedown', onDown, { passive: true });
      window.addEventListener('mouseup', onUp, { passive: true });
      document.addEventListener('mouseover', onOver, { passive: true });
    }

    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    raf = requestAnimationFrame(loop);

    return () => {
      if (window.PointerEvent) {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
        window.removeEventListener('pointerup', onUp);
        document.removeEventListener('pointerover', onOver);
      } else {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mousedown', onDown);
        window.removeEventListener('mouseup', onUp);
        document.removeEventListener('mouseover', onOver);
      }
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, []);

  return (
    <>
      {/* Modern Black Tailless Precision Cursor with Crisp White Outline */}
      <div
        id="custom-cursor"
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '28px',
          height: '28px',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transformOrigin: '3px 3px',
          willChange: 'transform',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0 2px 7px rgba(0, 0, 0, 0.85))',
          }}
        >
          {/* Modern Tailless Arrowhead (Zero Diagonal Tail / Stem) */}
          <path
            d="M 3 3 L 3 24 L 8.5 18.5 L 18.5 18.5 Z"
            fill="#050507"
            stroke="#ffffff"
            strokeWidth="1.65"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Tactile Click Confirmation Ripple */}
      <div
        id="custom-cursor-ripple"
        ref={rippleRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.45), inset 0 0 6px rgba(0, 0, 0, 0.5)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transformOrigin: 'center center',
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

