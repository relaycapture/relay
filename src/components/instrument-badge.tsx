'use client';

import React from 'react';

interface InstrumentBadgeProps {
  status?: 'pass' | 'warn' | 'fail' | 'active' | 'info';
  label: string;
  code?: string;
  segments?: number;
  activeSegments?: number;
  className?: string;
}

export function InstrumentBadge({
  status = 'pass',
  label,
  code,
  segments = 4,
  activeSegments,
  className = '',
}: InstrumentBadgeProps) {
  const isPass = status === 'pass' || status === 'active';
  const isWarn = status === 'warn';

  const defaultActive = isPass ? segments : isWarn ? Math.floor(segments / 2) : 1;
  const numActive = activeSegments !== undefined ? activeSegments : defaultActive;

  // Strict Monochrome Palette (Black/White/Zinc/Gray only)
  const statusColor = isPass
    ? 'text-white border-white/25 bg-white/[0.05]'
    : isWarn
      ? 'text-zinc-300 border-zinc-600 bg-zinc-800/30'
      : 'text-zinc-400 border-zinc-700 bg-zinc-900/40';

  const diodeGlow = isPass
    ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.85)]'
    : isWarn
      ? 'bg-zinc-400 shadow-[0_0_4px_rgba(255,255,255,0.3)]'
      : 'bg-zinc-600';

  const segmentActiveColor = isPass
    ? 'bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)]'
    : isWarn
      ? 'bg-zinc-400'
      : 'bg-zinc-600';

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3 py-1 font-mono text-[10px] tracking-wider uppercase border select-none transition-all ${statusColor} ${className}`}
      style={{
        // CNC-style chamfered corner notches
        clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
      }}
    >
      {/* Hardware Status Diode with Pulsing Monochrome Glow */}
      <span className={`w-1.5 h-1.5 rounded-none ${diodeGlow} shrink-0 animate-pulse`} />

      {/* Code / Protocol standard */}
      {code && (
        <span className="opacity-70 font-semibold border-r border-current/20 pr-2">
          {code}
        </span>
      )}

      {/* Status Readout Label */}
      <span className="font-bold tracking-widest">{label}</span>

      {/* Segmented LED-Style Visual Meter */}
      <div className="flex items-center gap-0.5 ml-1 pl-1.5 border-l border-current/20" aria-hidden="true">
        {Array.from({ length: segments }).map((_, idx) => (
          <span
            key={idx}
            className={`w-1 h-2.5 transition-colors duration-200 ${
              idx < numActive ? segmentActiveColor : 'bg-white/10'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
