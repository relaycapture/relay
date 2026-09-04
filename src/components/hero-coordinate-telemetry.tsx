'use client';

import React from 'react';
import { motion } from 'framer-motion';

// =========================================================================
// FIXED GEODETIC NETWORK CONSTANTS
// Completely static, permanent, and rock-solid architectural apparatus.
// Zero moving lines. Zero floating-point hydration drift.
// =========================================================================

const S1 = { x: 270, y: 70, label: 'S₁' };
const S2 = { x: 80, y: 395, label: 'S₂' };
const S3 = { x: 460, y: 395, label: 'S₃' };
const BARYCENTER = { x: 270, y: 286.67, label: 'G₀' };
const TARGET_Q = { x: 270, y: 260, label: 'Q' };

// Static Midpoints of the Outer Baselines
const M12 = { x: 175, y: 232.5 };
const M23 = { x: 270, y: 395 };
const M31 = { x: 365, y: 232.5 };

// Static Midpoints of Range Vectors to Target Q
const MID_Q1 = { x: 270, y: 165 };
const MID_Q2 = { x: 175, y: 327.5 };
const MID_Q3 = { x: 365, y: 327.5 };

// Baseline Metric Lengths (Static Constants)
const L12 = 376.5;
const L23 = 380.0;
const L31 = 376.5;

// Range Vector Distances and Azimuth Angles (Static Constants)
const R1 = 190;
const R2 = 233;
const R3 = 233;
const THETA1 = 30.3;
const THETA2 = 59.7;
const THETA3 = 59.7;

// Concentric Geodesic Polar Calibration Rings
const S1_RINGS = [24, 52, 88, 130];
const S2_RINGS = [20, 46, 78, 118];
const S3_RINGS = [20, 46, 78, 118];

// Pre-computed, deterministic arc strings (guaranteed exact match between SSR and client)
const ARC_S1 = 'M 252.84 99.35 A 34 34 0 0 0 270.00 104.00';
const ARC_S2 = 'M 114.00 395.00 A 34 34 0 0 0 107.72 375.31';
const ARC_S3 = 'M 442.84 365.65 A 34 34 0 0 0 432.28 375.31';

// Helper: polar to cartesian with fixed 2-decimal rounding for zero hydration discrepancies
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: Number((centerX + radius * Math.cos(angleInRadians)).toFixed(2)),
    y: Number((centerY + radius * Math.sin(angleInRadians)).toFixed(2)),
  };
}

// Helper to generate static subdivision ticks along baselines
function renderGraduationTicks(
  pA: { x: number; y: number },
  pB: { x: number; y: number },
  fractions: number[],
  tickLen = 4
) {
  const dx = pB.x - pA.x;
  const dy = pB.y - pA.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;

  return fractions.map((t, idx) => {
    const px = Number((pA.x + dx * t).toFixed(2));
    const py = Number((pA.y + dy * t).toFixed(2));
    return (
      <line
        key={`tick-${idx}`}
        x1={Number((px - nx * (tickLen / 2)).toFixed(2))}
        y1={Number((py - ny * (tickLen / 2)).toFixed(2))}
        x2={Number((px + nx * (tickLen / 2)).toFixed(2))}
        y2={Number((py + ny * (tickLen / 2)).toFixed(2))}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="0.8"
      />
    );
  });
}

interface HeroCoordinateTelemetryProps {
  className?: string;
  scale?: number;
  rotation?: number;
}

export function HeroCoordinateTelemetry({
  className = '',
  scale = 1,
  rotation = 0,
}: HeroCoordinateTelemetryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1 }}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`relative w-full max-w-[540px] sm:max-w-[640px] lg:max-w-[720px] aspect-[540/480] select-none pointer-events-auto ${className}`}
      aria-label="Scientific Geodetic Triangulation Apparatus"
    >
      <svg
        viewBox="0 0 540 480"
        className="w-full h-full overflow-visible font-mono"
        style={{ filter: 'drop-shadow(0 0 24px rgba(255,255,255,0.04))' }}
        suppressHydrationWarning
      >
        <defs>
          <pattern id="scientific-grid-540" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.75" />
          </pattern>
          <radialGradient id="scientificBarycenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.008)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ambient Scientific Metric Grid */}
        <rect width="540" height="480" fill="url(#scientific-grid-540)" />

        {/* Subtle Ambient Barycenter Aura */}
        <circle
          cx={BARYCENTER.x}
          cy={BARYCENTER.y}
          r="140"
          fill="url(#scientificBarycenterGlow)"
          className="pointer-events-none"
        />

        {/* TRUE GEOMETRIC MEDIANS (From vertices to opposite side midpoints, intersecting at Barycenter G0) */}
        <line
          x1={S1.x}
          y1={S1.y}
          x2={M23.x}
          y2={M23.y}
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />
        <line
          x1={S2.x}
          y1={S2.y}
          x2={M31.x}
          y2={M31.y}
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />
        <line
          x1={S3.x}
          y1={S3.y}
          x2={M12.x}
          y2={M12.y}
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="0.75"
          strokeDasharray="2 3"
        />

        {/* Midpoint Orthogonal Markers (M12, M23, M31) */}
        <circle cx={M12.x} cy={M12.y} r="2" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.75" />
        <circle cx={M23.x} cy={M23.y} r="2" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.75" />
        <circle cx={M31.x} cy={M31.y} r="2" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="0.75" />

        {/* Calibrated Concentric Geodesic Rings around Station S1 */}
        {S1_RINGS.map((radius, i) => (
          <g key={`s1-ring-${i}`}>
            <circle
              cx={S1.x}
              cy={S1.y}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.75"
              strokeDasharray={i % 2 === 1 ? '2 3' : undefined}
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const p1 = polarToCartesian(S1.x, S1.y, radius - 2, deg);
              const p2 = polarToCartesian(S1.x, S1.y, radius + 2, deg);
              return (
                <line
                  key={`s1-tick-${i}-${deg}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(255, 255, 255, 0.22)"
                  strokeWidth="0.75"
                />
              );
            })}
          </g>
        ))}

        {/* Calibrated Concentric Geodesic Rings around Station S2 */}
        {S2_RINGS.map((radius, i) => (
          <g key={`s2-ring-${i}`}>
            <circle
              cx={S2.x}
              cy={S2.y}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.75"
              strokeDasharray={i % 2 === 1 ? '2 3' : undefined}
            />
            {[0, 90, 180, 270].map((deg) => {
              const p1 = polarToCartesian(S2.x, S2.y, radius - 2, deg);
              const p2 = polarToCartesian(S2.x, S2.y, radius + 2, deg);
              return (
                <line
                  key={`s2-tick-${i}-${deg}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="0.75"
                />
              );
            })}
          </g>
        ))}

        {/* Calibrated Concentric Geodesic Rings around Station S3 */}
        {S3_RINGS.map((radius, i) => (
          <g key={`s3-ring-${i}`}>
            <circle
              cx={S3.x}
              cy={S3.y}
              r={radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.07)"
              strokeWidth="0.75"
              strokeDasharray={i % 2 === 1 ? '2 3' : undefined}
            />
            {[0, 90, 180, 270].map((deg) => {
              const p1 = polarToCartesian(S3.x, S3.y, radius - 2, deg);
              const p2 = polarToCartesian(S3.x, S3.y, radius + 2, deg);
              return (
                <line
                  key={`s3-tick-${i}-${deg}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="0.75"
                />
              );
            })}
          </g>
        ))}

        {/* ========================================================= */}
        {/* STATIC OUTER LINES: Fixed Geodetic Network Baselines     */}
        {/* Precision structural lines, completely static and stable  */}
        {/* ========================================================= */}

        {/* Baseline 1: S1 -> S2 (Fixed Static Line) */}
        <line x1={S1.x} y1={S1.y} x2={S2.x} y2={S2.y} stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
        {renderGraduationTicks(S1, S2, [0.2, 0.4, 0.6, 0.8])}

        {/* Baseline 2: S2 -> S3 (Fixed Static Line) */}
        <line x1={S2.x} y1={S2.y} x2={S3.x} y2={S3.y} stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
        {renderGraduationTicks(S2, S3, [0.2, 0.4, 0.6, 0.8])}

        {/* Baseline 3: S3 -> S1 (Fixed Static Line) */}
        <line x1={S3.x} y1={S3.y} x2={S1.x} y2={S1.y} stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
        {renderGraduationTicks(S3, S1, [0.2, 0.4, 0.6, 0.8])}

        {/* Scientific Baseline Distance Telemetry Tags (Static Constants) */}
        <g transform={`translate(${M12.x - 52}, ${M12.y - 12})`}>
          <rect x="-2" y="-9" width="56" height="14" fill="rgba(8, 8, 10, 0.85)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.6" />
          <text x="3" y="2" fill="rgba(255, 255, 255, 0.8)" fontSize="8" letterSpacing="0.06em">
            L₁₂: {L12}
          </text>
        </g>

        <g transform={`translate(${M23.x - 24}, ${M23.y + 14})`}>
          <rect x="-2" y="-9" width="56" height="14" fill="rgba(8, 8, 10, 0.85)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.6" />
          <text x="3" y="2" fill="rgba(255, 255, 255, 0.8)" fontSize="8" letterSpacing="0.06em">
            L₂₃: {L23}
          </text>
        </g>

        <g transform={`translate(${M31.x + 8}, ${M31.y - 12})`}>
          <rect x="-2" y="-9" width="56" height="14" fill="rgba(8, 8, 10, 0.85)" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.6" />
          <text x="3" y="2" fill="rgba(255, 255, 255, 0.8)" fontSize="8" letterSpacing="0.06em">
            L₃₁: {L31}
          </text>
        </g>

        {/* Inscribed Medial Network (Connecting midpoints, strictly mathematical & static) */}
        <polygon
          points={`${M12.x},${M12.y} ${M23.x},${M23.y} ${M31.x},${M31.y}`}
          fill="rgba(255, 255, 255, 0.015)"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="0.8"
          strokeDasharray="3 3"
        />

        {/* Static Barycenter Node G0 (Center of Mass) */}
        <circle cx={BARYCENTER.x} cy={BARYCENTER.y} r="3" fill="none" stroke="#ffffff" strokeWidth="1" />
        <circle cx={BARYCENTER.x} cy={BARYCENTER.y} r="1" fill="#ffffff" />
        <text x={BARYCENTER.x + 8} y={BARYCENTER.y + 3} fill="rgba(255, 255, 255, 0.6)" fontSize="8.5" letterSpacing="0.1em">
          G₀ (BARYCENTER)
        </text>

        {/* Station Azimuth Caliper Arcs (Pre-computed static SVG paths) */}
        <path d={ARC_S1} fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" strokeDasharray="2 2" suppressHydrationWarning />
        <path d={ARC_S2} fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" strokeDasharray="2 2" suppressHydrationWarning />
        <path d={ARC_S3} fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" strokeDasharray="2 2" suppressHydrationWarning />

        {/* Angle Readouts anchored to stations */}
        <text x={S1.x - 56} y={S1.y + 46} fill="#ffffff" fontSize="9.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
          θ₁: {THETA1}°
        </text>
        <text x={S2.x + 42} y={S2.y - 12} fill="#ffffff" fontSize="9.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
          θ₂: {THETA2}°
        </text>
        <text x={S3.x - 78} y={S3.y - 12} fill="#ffffff" fontSize="9.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
          θ₃: {THETA3}°
        </text>

        {/* Range Vectors from Stations S1, S2, S3 to Observation Target Q (Fixed Static Lines) */}
        <line
          x1={S1.x}
          y1={S1.y}
          x2={TARGET_Q.x}
          y2={TARGET_Q.y}
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.1"
          strokeDasharray="4 3"
        />
        <line
          x1={S2.x}
          y1={S2.y}
          x2={TARGET_Q.x}
          y2={TARGET_Q.y}
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.1"
          strokeDasharray="4 3"
        />
        <line
          x1={S3.x}
          y1={S3.y}
          x2={TARGET_Q.x}
          y2={TARGET_Q.y}
          stroke="rgba(255, 255, 255, 0.65)"
          strokeWidth="1.1"
          strokeDasharray="4 3"
        />

        {/* Range Vector Distance Badges */}
        <g transform={`translate(${MID_Q1.x + 8}, ${MID_Q1.y - 6})`}>
          <rect x="-3" y="-9" width="60" height="15" fill="rgba(8, 8, 10, 0.9)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" />
          <text x="2" y="2" fill="#ffffff" fontSize="8.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
            r₁: {R1}px
          </text>
        </g>

        <g transform={`translate(${MID_Q2.x - 65}, ${MID_Q2.y + 10})`}>
          <rect x="-3" y="-9" width="60" height="15" fill="rgba(8, 8, 10, 0.9)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" />
          <text x="2" y="2" fill="#ffffff" fontSize="8.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
            r₂: {R2}px
          </text>
        </g>

        <g transform={`translate(${MID_Q3.x + 10}, ${MID_Q3.y + 10})`}>
          <rect x="-3" y="-9" width="60" height="15" fill="rgba(8, 8, 10, 0.9)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" />
          <text x="2" y="2" fill="#ffffff" fontSize="8.5" fontWeight="600" letterSpacing="0.05em" suppressHydrationWarning>
            r₃: {R3}px
          </text>
        </g>

        {/* Observation Coordinate Target Q (Surveying Reticle) - Static */}
        <g transform={`translate(${TARGET_Q.x}, ${TARGET_Q.y})`}>
          <circle r="18" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.75" strokeDasharray="3 3" />
          <circle r="8" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
          <circle r="2.5" fill="#ffffff" />
          <line x1="-22" y1="0" x2="22" y2="0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
          <line x1="0" y1="-22" x2="0" y2="22" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.75" />
          <text x="12" y="-12" fill="#ffffff" fontSize="9.5" fontWeight="700" letterSpacing="0.06em">
            Q (TARGET)
          </text>
        </g>

        {/* Primary Observation Stations (S1, S2, S3) - Static */}
        <g transform={`translate(${S1.x}, ${S1.y})`}>
          <circle r="6" fill="#08080a" stroke="#ffffff" strokeWidth="1.5" />
          <circle r="2.5" fill="#ffffff" />
          <text x="-26" y="-14" fill="#ffffff" fontSize="11" fontWeight="700">
            S₁ [APEX]
          </text>
        </g>

        <g transform={`translate(${S2.x}, ${S2.y})`}>
          <circle r="6" fill="#08080a" stroke="#ffffff" strokeWidth="1.5" />
          <circle r="2.5" fill="#ffffff" />
          <text x="-48" y="22" fill="#ffffff" fontSize="11" fontWeight="700">
            S₂ [ZONE_A]
          </text>
        </g>

        <g transform={`translate(${S3.x}, ${S3.y})`}>
          <circle r="6" fill="#08080a" stroke="#ffffff" strokeWidth="1.5" />
          <circle r="2.5" fill="#ffffff" />
          <text x="14" y="22" fill="#ffffff" fontSize="11" fontWeight="700">
            S₃ [ZONE_B]
          </text>
        </g>
      </svg>
    </motion.div>
  );
}
