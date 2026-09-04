'use client';

import { useEffect, useRef, useId, memo } from 'react';

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
  col: number;
  row: number;
}

interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
  [key: string]: unknown;
}

const DotField = memo(({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 450,
  cursorForce = 0.05,
  bulgeOnly = false,
  bulgeStrength = 53,
  glowRadius = 110,
  sparkle = false,
  waveAmplitude = 1,
  gradientFrom = '#1e1e1e',
  gradientTo = '#848484',
  glowColor = '#131313',
  ...rest
}: DotFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0, cols: 0, rows: 0, padX: 0, padY: 0, step: 0 });
  const glowOpacity = useRef(0);
  const engagement = useRef(0);
  const propsRef = useRef<Record<string, unknown>>({});
  propsRef.current = { dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, sparkle, waveAmplitude, gradientFrom, gradientTo };
  const rebuildRef = useRef<(() => void) | null>(null);
  const uniqueId = useId().replace(/:/g, '-');
  const glowIdRef = useRef(`dot-field-glow-${uniqueId}`);

  useEffect(() => {
    const canvas = canvasRef.current;
    const glowEl = glowRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Cap DPR at 1.5 to reduce fill-rate memory bandwidth on high-DPI screens
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let resizeTimer: ReturnType<typeof setTimeout>;
    let isVisible = false;
    let cachedGrad: CanvasGradient | null = null;
    let lastGradW = 0;
    let lastGradH = 0;
    let lastGradFrom = '';
    let lastGradTo = '';

    function resize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(doResize, 80);
    }

    function doResize() {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (w <= 0 || h <= 0) return;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      sizeRef.current.w = w;
      sizeRef.current.h = h;
      sizeRef.current.offsetX = rect.left + window.scrollX;
      sizeRef.current.offsetY = rect.top + window.scrollY;

      buildDots(w, h);
    }

    function buildDots(w: number, h: number) {
      const p = propsRef.current;
      // Enforce a minimum step of 13.5px for smooth 60fps rendering without lag
      const step = Math.max((p.dotRadius as number) + (p.dotSpacing as number), 13.5);
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const dots: Dot[] = new Array(rows * cols);
      let idx = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay, col, row };
        }
      }
      dotsRef.current = dots;
      sizeRef.current.cols = cols;
      sizeRef.current.rows = rows;
      sizeRef.current.padX = padX;
      sizeRef.current.padY = padY;
      sizeRef.current.step = step;
    }

    const lastClientPos = { x: -9999, y: -9999 };

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      lastClientPos.x = e.clientX;
      lastClientPos.y = e.clientY;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scaleX = sizeRef.current.w / rect.width;
      const scaleY = sizeRef.current.h / rect.height;
      mouseRef.current.x = (e.clientX - rect.left) * scaleX;
      mouseRef.current.y = (e.clientY - rect.top) * scaleY;
    }

    function onScroll() {
      if (!canvas || lastClientPos.x === -9999) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const scaleX = sizeRef.current.w / rect.width;
      const scaleY = sizeRef.current.h / rect.height;
      mouseRef.current.x = (lastClientPos.x - rect.left) * scaleX;
      mouseRef.current.y = (lastClientPos.y - rect.top) * scaleY;
    }

    function onMouseLeave() {
      lastClientPos.x = -9999;
      lastClientPos.y = -9999;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }

    function updateMouseSpeed() {
      const m = mouseRef.current;
      const dx = m.prevX - m.x;
      const dy = m.prevY - m.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      m.speed += (dist - m.speed) * 0.5;
      if (m.speed < 0.001) m.speed = 0;
      m.prevX = m.x;
      m.prevY = m.y;
    }

    let frameCount = 0;

    function tick() {
      if (!isVisible) return;

      updateMouseSpeed();
      frameCount++;
      const dots = dotsRef.current;
      const m = mouseRef.current;
      const { w, h, cols, rows, padX, padY, step } = sizeRef.current;
      const p = propsRef.current;
      const len = dots.length;
      if (len === 0 || w <= 0 || h <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const t = frameCount * 0.02;

      const targetEngagement = Math.min(m.speed / 5, 1);
      engagement.current += (targetEngagement - engagement.current) * 0.06;
      if (engagement.current < 0.001) engagement.current = 0;
      const eng = engagement.current;

      glowOpacity.current += (eng - glowOpacity.current) * 0.08;

      if (glowEl && glowOpacity.current > 0.005) {
        glowEl.setAttribute('cx', String(m.x));
        glowEl.setAttribute('cy', String(m.y));
        glowEl.style.opacity = String(glowOpacity.current);
      } else if (glowEl && glowEl.style.opacity !== '0') {
        glowEl.style.opacity = '0';
      }

      ctx!.clearRect(0, 0, w, h);

      // Cache gradient to avoid 60x/sec reallocation
      const gradFrom = p.gradientFrom as string;
      const gradTo = p.gradientTo as string;
      if (!cachedGrad || lastGradW !== w || lastGradH !== h || lastGradFrom !== gradFrom || lastGradTo !== gradTo) {
        cachedGrad = ctx!.createLinearGradient(0, 0, w, h);
        cachedGrad.addColorStop(0, gradFrom);
        cachedGrad.addColorStop(1, gradTo);
        lastGradW = w;
        lastGradH = h;
        lastGradFrom = gradFrom;
        lastGradTo = gradTo;
      }
      ctx!.fillStyle = cachedGrad;

      const cr = p.cursorRadius as number;
      const crSq = cr * cr;
      const rad = (p.dotRadius as number) / 2;
      const isBulge = p.bulgeOnly as boolean;
      const waveAmp = (p.waveAmplitude as number) || 0;
      const bulgeStr = (p.bulgeStrength as number) || 53;
      const curForce = (p.cursorForce as number) || 0.05;

      // Pre-compute wave per column & row (100x fewer Math.sin/cos calls)
      let colWaveY: Float32Array | null = null;
      let rowWaveX: Float32Array | null = null;
      if (waveAmp > 0 && cols > 0 && rows > 0) {
        colWaveY = new Float32Array(cols);
        for (let c = 0; c < cols; c++) {
          const ax = padX + c * step + step / 2;
          colWaveY[c] = Math.sin(ax * 0.03 + t) * waveAmp;
        }
        rowWaveX = new Float32Array(rows);
        for (let r = 0; r < rows; r++) {
          const ay = padY + r * step + step / 2;
          rowWaveX[r] = Math.cos(ay * 0.03 + t * 0.7) * waveAmp * 0.5;
        }
      }

      ctx!.beginPath();

      const hasSparkle = Boolean(p.sparkle);

      for (let i = 0; i < len; i++) {
        const d = dots[i];
        const dx = m.x - d.ax;
        const dy = m.y - d.ay;

        // Quick bounding box rejection before squaring
        if (Math.abs(dx) < cr && Math.abs(dy) < cr) {
          const distSq = dx * dx + dy * dy;
          if (distSq < crSq && eng > 0.01) {
            const dist = Math.sqrt(distSq);
            if (isBulge) {
              const pushFactor = (1 - dist / cr);
              const push = pushFactor * pushFactor * bulgeStr * eng;
              const angle = Math.atan2(dy, dx);
              d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
              d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
            } else {
              const angle = Math.atan2(dy, dx);
              const move = (500 / dist) * (m.speed * curForce);
              d.vx += Math.cos(angle) * -move;
              d.vy += Math.sin(angle) * -move;
            }
          } else if (isBulge) {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }
        } else if (isBulge) {
          if (Math.abs(d.sx - d.ax) > 0.01 || Math.abs(d.sy - d.ay) > 0.01) {
            d.sx += (d.ax - d.sx) * 0.1;
            d.sy += (d.ay - d.sy) * 0.1;
          }
        }

        if (!isBulge) {
          // Only update displaced dots to conserve CPU
          if (Math.abs(d.vx) > 0.001 || Math.abs(d.vy) > 0.001 || Math.abs(d.sx - d.ax) > 0.01 || Math.abs(d.sy - d.ay) > 0.01) {
            d.vx *= 0.9;
            d.vy *= 0.9;
            if (Math.abs(d.vx) < 0.001) d.vx = 0;
            if (Math.abs(d.vy) < 0.001) d.vy = 0;
            d.x = d.ax + d.vx;
            d.y = d.ay + d.vy;
            d.sx += (d.x - d.sx) * 0.1;
            d.sy += (d.y - d.sy) * 0.1;
          } else {
            d.sx = d.ax;
            d.sy = d.ay;
          }
        }

        let drawX = d.sx;
        let drawY = d.sy;
        if (colWaveY && rowWaveX) {
          drawY += colWaveY[d.col];
          drawX += rowWaveX[d.row];
        }

        if (hasSparkle) {
          const hash = ((i * 2654435761) ^ (frameCount >> 3)) >>> 0;
          const r = (hash % 100) < 3 ? rad * 1.8 : rad;
          ctx!.moveTo(drawX + r, drawY);
          ctx!.arc(drawX, drawY, r, 0, TWO_PI);
        } else {
          ctx!.moveTo(drawX + rad, drawY);
          ctx!.arc(drawX, drawY, rad, 0, TWO_PI);
        }
      }

      ctx!.fill();

      rafRef.current = requestAnimationFrame(tick);
    }

    doResize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // IntersectionObserver: Pause completely when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false;
        if (visible !== isVisible) {
          isVisible = visible;
          if (isVisible) {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(tick);
          } else if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
          }
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(canvas);

    rebuildRef.current = () => {
      const { w, h } = sizeRef.current;
      if (w > 0 && h > 0) buildDots(w, h);
    };

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    rebuildRef.current?.();
  }, [dotRadius, dotSpacing]);

  return (
    <div className="w-full h-full relative" {...rest}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id={glowIdRef.current}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowIdRef.current})`}
          style={{ opacity: 0, willChange: 'opacity' }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
