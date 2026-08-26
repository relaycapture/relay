'use client'

import { useEffect, useRef } from 'react';

export function DarkWatercolorCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Watercolor pigment blobs with fluid drift and organic bleed
    const blobs = [
      { x: width * 0.25, y: height * 0.3, r: Math.min(width, height) * 0.45, vx: 0.3, vy: 0.2, hue: 245, sat: 45, light: 12, alpha: 0.65 },
      { x: width * 0.75, y: height * 0.4, r: Math.min(width, height) * 0.5, vx: -0.25, vy: 0.35, hue: 275, sat: 50, light: 10, alpha: 0.6 },
      { x: width * 0.5, y: height * 0.75, r: Math.min(width, height) * 0.55, vx: 0.2, vy: -0.3, hue: 220, sat: 55, light: 14, alpha: 0.7 },
      { x: width * 0.85, y: height * 0.8, r: Math.min(width, height) * 0.4, vx: -0.3, vy: -0.2, hue: 290, sat: 40, light: 9, alpha: 0.5 },
      { x: width * 0.15, y: height * 0.7, r: Math.min(width, height) * 0.42, vx: 0.35, vy: -0.25, hue: 205, sat: 60, light: 11, alpha: 0.55 },
      { x: width * 0.5, y: height * 0.25, r: Math.min(width, height) * 0.48, vx: -0.15, vy: 0.2, hue: 260, sat: 50, light: 13, alpha: 0.6 },
    ];

    let t = 0;

    let isVisible = true;

    const render = () => {
      if (!isVisible) return;
      t += 0.008;

      // Base deep obsidian wash
      ctx.fillStyle = '#060608';
      ctx.fillRect(0, 0, width, height);

      // Composite mode for watercolor pigment layering
      ctx.globalCompositeOperation = 'screen';

      blobs.forEach((b, i) => {
        // Fluid organic movement
        b.x += Math.sin(t * 0.8 + i) * 0.8 + b.vx;
        b.y += Math.cos(t * 0.7 + i * 1.5) * 0.8 + b.vy;

        // Bounce within padded boundaries
        if (b.x < -width * 0.2) b.vx = Math.abs(b.vx);
        if (b.x > width * 1.2) b.vx = -Math.abs(b.vx);
        if (b.y < -height * 0.2) b.vy = Math.abs(b.vy);
        if (b.y > height * 1.2) b.vy = -Math.abs(b.vy);

        // Radial watercolor pigment bloom with soft feathering
        const currentR = b.r * (1 + Math.sin(t * 1.2 + i * 2) * 0.15);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, currentR);
        
        // Evolving pigment hue
        const dynamicHue = b.hue + Math.sin(t + i) * 15;
        grad.addColorStop(0, `hsla(${dynamicHue}, ${b.sat}%, ${b.light}%, ${b.alpha})`);
        grad.addColorStop(0.35, `hsla(${dynamicHue + 10}, ${b.sat - 10}%, ${b.light * 0.8}%, ${b.alpha * 0.75})`);
        grad.addColorStop(0.7, `hsla(${dynamicHue - 15}, ${b.sat - 15}%, ${b.light * 0.5}%, ${b.alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(6, 6, 8, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, currentR, 0, Math.PI * 2);
        ctx.fill();
      });

      // Swirling pigment texture & subtle watercolor paper grain
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Viewport-gated Intersection Observer
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const visible = entry?.isIntersecting ?? true;
        if (visible !== isVisible) {
          isVisible = visible;
          if (isVisible) {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          } else if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      },
      { rootMargin: '200px 0px' }
    );
    intersectionObserver.observe(canvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ filter: 'blur(30px) saturate(140%)' }}
      />
      {/* Organic Watercolor Grain Texture overlay */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), radial-gradient(rgba(0,0,0,0.2) 1px, transparent 1px)`,
          backgroundSize: '24px 24px, 12px 12px',
          backgroundPosition: '0 0, 12px 12px',
        }}
      />
      {/* Soft Dark Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#060608]/40 to-[#060608]/90 pointer-events-none" />
    </div>
  );
}
