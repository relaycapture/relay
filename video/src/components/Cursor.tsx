import React from 'react';
import { interpolate, spring, useCurrentFrame } from 'remotion';
import { CursorKeyframe } from '../types';

interface CursorProps {
  keyframes: CursorKeyframe[];
  fps?: number;
}

export function Cursor({ keyframes, fps = 60 }: CursorProps) {
  const frame = useCurrentFrame();

  if (!keyframes || keyframes.length === 0) return null;

  // Find surrounding keyframes
  let prevKf = keyframes[0];
  let nextKf = keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i].frame <= frame) {
      prevKf = keyframes[i];
      nextKf = keyframes[Math.min(i + 1, keyframes.length - 1)];
    }
  }

  // Calculate spring progress from prevKf to nextKf
  const duration = Math.max(1, nextKf.frame - prevKf.frame);
  const frameSincePrev = Math.max(0, frame - prevKf.frame);

  // Main Cursor Spring
  const mainProgress = prevKf === nextKf
    ? 1
    : spring({
        frame: frameSincePrev,
        fps,
        config: { damping: 18, mass: 0.6, stiffness: 120 },
        durationInFrames: duration,
      });

  const clampedMainProgress = Math.min(1, Math.max(0, mainProgress));

  // Interpolated position for the pointer tip
  const currentX = interpolate(clampedMainProgress, [0, 1], [prevKf.x, nextKf.x]);
  const currentY = interpolate(clampedMainProgress, [0, 1], [prevKf.y, nextKf.y]);

  // Trailing "RELAY" Badge Spring (Softer, higher damping for realistic mechanical trailing)
  const trailingProgress = prevKf === nextKf
    ? 1
    : spring({
        frame: Math.max(0, frameSincePrev - 2),
        fps,
        config: { damping: 26, mass: 1.1, stiffness: 75 },
        durationInFrames: duration + 10,
      });

  const clampedTrailingProgress = Math.min(1, Math.max(0, trailingProgress));
  const trailingX = interpolate(clampedTrailingProgress, [0, 1], [prevKf.x, nextKf.x]);
  const trailingY = interpolate(clampedTrailingProgress, [0, 1], [prevKf.y, nextKf.y]);

  // Action detection (Click pulse, Typing indicator)
  const isClickAction = prevKf.action === 'click' && frameSincePrev < 18;
  const isTypingAction = prevKf.action === 'type' && frameSincePrev < (prevKf.duration || 45);

  const clickScale = isClickAction
    ? interpolate(frameSincePrev, [0, 4, 18], [1, 0.8, 1])
    : 1;

  const rippleScale = isClickAction
    ? interpolate(frameSincePrev, [0, 18], [0.6, 2.4])
    : 0;

  const rippleOpacity = isClickAction
    ? interpolate(frameSincePrev, [0, 18], [0.9, 0])
    : 0;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 overflow-visible"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Click Ripple Wave */}
      {isClickAction && (
        <div
          className="absolute rounded-full border-2 border-emerald-400/80 pointer-events-none"
          style={{
            left: `${currentX}px`,
            top: `${currentY}px`,
            width: '42px',
            height: '42px',
            marginLeft: '-21px',
            marginTop: '-21px',
            transform: `scale(${rippleScale})`,
            opacity: rippleOpacity,
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.8)',
          }}
        />
      )}

      {/* Trailing "RELAY" Damped Badge */}
      <div
        className="absolute transition-transform select-none pointer-events-none flex items-center gap-1 bg-neutral-900/90 text-white border border-emerald-500/40 rounded-full px-2 py-0.5 shadow-xl backdrop-blur-md"
        style={{
          left: `${trailingX + 18}px`,
          top: `${trailingY + 20}px`,
          transform: `scale(${isClickAction ? 0.94 : 1})`,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), 0 0 10px rgba(16, 185, 129, 0.25)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
          RELAY
        </span>
        {prevKf.label && (
          <span className="font-mono text-[9px] text-neutral-300 font-normal pl-1 border-l border-white/20">
            {prevKf.label}
          </span>
        )}
      </div>

      {/* Main Precision Cursor Pointer */}
      <div
        className="absolute pointer-events-none select-none transition-transform"
        style={{
          left: `${currentX}px`,
          top: `${currentY}px`,
          transform: `scale(${clickScale})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Custom SVG Precision Arrow */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="rc-cursor-glow"
        >
          <path
            d="M5.5 3.5L18.5 11.5L11.5 13.5L8.5 20.5L5.5 3.5Z"
            fill="#09090b"
            stroke="#10b981"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
        </svg>

        {/* Typing Caret Animation when action is 'type' */}
        {isTypingAction && (
          <div
            className="absolute -right-2 top-0 w-0.5 h-5 bg-emerald-400 animate-pulse rounded-full shadow-[0_0_8px_#10b981]"
          />
        )}
      </div>
    </div>
  );
}
