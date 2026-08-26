'use client'

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

const clamp = (v: number, a: number, b: number): number => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

type ConfigKey =
  | 'startWidth'
  | 'startHeight'
  | 'startRadius'
  | 'endRadius'
  | 'mediaZoom'
  | 'scrollDistance'
  | 'holdDistance'
  | 'smoothing'
  | 'overlayScrim'
  | 'useWindowScroll'
  | 'enabled';

export interface ScrollExpandProps {
  src?: string;
  mediaType?: 'image' | 'video';
  mediaNode?: ReactNode;
  poster?: string;
  alt?: string;
  title?: ReactNode;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  isLightMode?: boolean;
  onProgressChange?: (progress: number) => void;
  onComplete?: () => void;
  [key: string]: unknown;
}

export function ScrollExpand({
  src = '',
  mediaType = 'image',
  mediaNode,
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 46,
  startHeight = 56,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.2,
  scrollDistance = 1.4,
  holdDistance = 0.5,
  smoothing = 0.1,
  overlayScrim = 0.3,
  useWindowScroll = true,
  enabled = true,
  children,
  className = '',
  style,
  isLightMode = false,
  onProgressChange,
  onComplete,
  ...rest
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const hasCompletedRef = useRef<boolean>(false);

  const propsRef = useRef<{
    startWidth: number;
    startHeight: number;
    startRadius: number;
    endRadius: number;
    mediaZoom: number;
    scrollDistance: number;
    holdDistance: number;
    smoothing: number;
    overlayScrim: number;
    useWindowScroll: boolean;
    enabled: boolean;
    onProgressChange?: (p: number) => void;
    onComplete?: () => void;
  }>({} as any);

  propsRef.current = {
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    onProgressChange,
    onComplete,
  };

  const applyProgress = useCallback((p: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const c = propsRef.current;

    c.onProgressChange?.(p);
    if (p >= 0.92 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      c.onComplete?.();
    }

    const e = smoothstep(0, 1, p);

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseStartW = isMobile ? 86 : c.startWidth;
    const baseStartH = isMobile ? 22 : c.startHeight;
    const baseStartR = isMobile ? 16 : c.startRadius;

    const w = baseStartW + (100 - baseStartW) * e;
    const h = baseStartH + (100 - baseStartH) * e;
    const ix = Math.max(0, (100 - w) / 2);
    const iy = Math.max(0, (100 - h) / 2);
    const r = baseStartR + (c.endRadius - baseStartR) * e;
    frame.style.clipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${r}px)`;

    if (mediaRef.current) {
      mediaRef.current.style.transform = `scale(${c.mediaZoom + (1 - c.mediaZoom) * e})`;
    }

    if (scrimRef.current) {
      scrimRef.current.style.opacity = `${c.overlayScrim * e}`;
    }

    // Title moves smoothly from center (0) to its exact destination position in the final hero layout (-64px desktop / -40px mobile)
    if (titleRef.current) {
      const grow = smoothstep(0, 0.75, p);
      const out = smoothstep(0.72, 0.94, p);
      const yOffset = (isMobile ? -36 : -64) * grow;
      titleRef.current.style.opacity = `${1 - out}`;
      titleRef.current.style.transform = `translate3d(0, ${yOffset}px, 0) scale(${1 + (isMobile ? 0.22 : 0.38) * grow})`;
    }

    if (hintRef.current) {
      const gone = smoothstep(0, 0.14, p);
      hintRef.current.style.opacity = `${1 - gone}`;
      hintRef.current.style.transform = `translate3d(0, ${8 * gone}px, 0)`;
    }

    if (overlayRef.current) {
      const inn = smoothstep(0.72, 0.95, p);
      overlayRef.current.style.opacity = `${inn}`;
      overlayRef.current.style.transform = `translate3d(0, ${16 * (1 - inn)}px, 0)`;
      overlayRef.current.style.pointerEvents = inn > 0.8 ? 'auto' : 'none';
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!root || !track || !stage) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = 0;
    let target = 0;
    let stageH = 0;
    let running = false;

    const measure = () => {
      const c = propsRef.current;
      stageH = c.useWindowScroll ? window.innerHeight : root.clientHeight;
      if (stageH <= 0) return;
      stage.style.height = `${stageH}px`;
      const totalH = stageH * (1 + Math.max(0.5, c.scrollDistance) + Math.max(0.2, c.holdDistance));
      track.style.height = `${totalH}px`;
      track.style.minHeight = `${totalH}px`;

      const w = root.clientWidth || window.innerWidth || stageH;
      const isMobile = w < 768;
      const titlePx = isMobile
        ? clamp(w * 0.082, 28, 42)
        : clamp(w * 0.045, 32, 64);
      stage.style.setProperty('--se-title-size', `${titlePx}px`);
    };

    const readProgress = () => {
      const c = propsRef.current;
      if (!c.enabled) return 1;
      const span = stageH * Math.max(0.01, c.scrollDistance);
      if (c.useWindowScroll) {
        const top = track.getBoundingClientRect().top;
        return clamp(-top / span, 0, 1);
      }
      return clamp(root.scrollTop / span, 0, 1);
    };

    const tick = () => {
      const c = propsRef.current;
      const k = c.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * c.smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.0004) {
        current = target;
        running = false;
      }
      applyProgress(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target;
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(root);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [applyProgress, useWindowScroll]);

  const renderMedia = () => {
    if (mediaNode) {
      return (
        <div
          ref={mediaRef as React.RefObject<HTMLDivElement>}
          className="absolute inset-0 w-full h-full origin-center select-none [will-change:transform]"
        >
          {mediaNode}
        </div>
      );
    }

    if (mediaType === 'video') {
      return (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
        />
      );
    }

    return (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className="absolute inset-0 w-full h-full object-cover origin-center select-none [will-change:transform]"
        src={src}
        alt={alt}
        draggable={false}
      />
    );
  };

  const initialIx = Math.max(0, (100 - startWidth) / 2);
  const initialIy = Math.max(0, (100 - startHeight) / 2);

  return (
    <div
      ref={rootRef}
      className={`relative w-full ${
        useWindowScroll
          ? ''
          : 'h-full overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
      } ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="relative w-full">
        <div
          ref={stageRef}
          className="sticky top-0 w-full h-screen overflow-hidden z-10 [--se-title-size:3.5rem]"
        >
          <div
            ref={frameRef}
            className="absolute inset-0 [will-change:clip-path]"
            style={{
              clipPath: `inset(${initialIy}% ${initialIx}% ${initialIy}% ${initialIx}% round ${startRadius}px)`,
            }}
          >
            {renderMedia()}
            <div
              ref={scrimRef}
              className="absolute inset-0 opacity-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.65),rgba(0,0,0,0.05)_45%,rgba(0,0,0,0.25))]"
            />
            {children ? (
              <div
                ref={overlayRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-[4%] sm:p-[6%] opacity-0 [will-change:opacity,transform]"
              >
                {children}
              </div>
            ) : null}
          </div>

          {title ? (
            <div
              ref={titleRef}
              className={`absolute inset-0 flex items-center justify-center m-0 px-[6%] text-center font-sans font-semibold leading-[1.14] tracking-[-0.035em] ${
                isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              } [font-size:var(--se-title-size)] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] pointer-events-none [will-change:opacity,transform]`}
            >
              {title}
            </div>
          ) : null}

          {scrollHint ? (
            <div
              ref={hintRef}
              className={`absolute inset-x-0 bottom-6 text-center text-xs font-mono tracking-wider pointer-events-none [will-change:opacity,transform] ${
                isLightMode ? 'text-black/50' : 'text-white/50'
              }`}
            >
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ScrollExpand;
