'use client'

import { useState, useEffect, useMemo, useRef } from 'react';
import { ScanResult } from '../../types';
import { NumberTicker } from '../number-ticker';
import { DomainFavicon } from '@/components/domain-favicon';
import { Info, Globe } from 'lucide-react';

interface FinancialLeakageProps {
  scanResult?: ScanResult | null;
  currentDomain?: string | null;
  lastScannedTime?: Date | null;
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

// 12-point exact topology normalized from user reference image
// Points: [low start, steep rise, slight rise, steep rise, Peak 1, slope drop, slope drop, trough dip, Peak 2, slope drop, slight dip, Peak 3]
const REFERENCE_TOPOLOGY = [
  0.08, // P1 (low start)
  0.38, // P2 (steep rise)
  0.44, // P3 (slight rise, Q1)
  0.64, // P4 (steep rise)
  0.96, // P5 (Peak 1)
  0.72, // P6 (slope drop, Q2)
  0.52, // P7 (slope drop)
  0.38, // P8 (trough dip)
  0.88, // P9 (Peak 2, Q3)
  0.66, // P10 (drop)
  0.60, // P11 (slight dip)
  0.92, // P12 (Peak 3, Q4)
];

const SUM_REFERENCE_TOPOLOGY = REFERENCE_TOPOLOGY.reduce((acc, v) => acc + v, 0); // 7.18

// Fixed $50,000 ceiling for immutable, constant axes
const FIXED_MAX_Y = 50000;

export function FinancialLeakage({
  scanResult,
  currentDomain,
  lastScannedTime,
  isLightMode,
  isLivePreview = false,
}: FinancialLeakageProps) {
  // Input parameters with requested defaults:
  // Monthly Outbound: default 10,000 (min 1,000, max 100,000)
  // Quarantine / Spam Rate: default 35% (min 1%, max 65%)
  // Value per Conversion: default $3,500 (min $100, max $50,000)
  // Conversion Opportunity Rate: default 0.15% (min 0.05%, max 1.00%)
  const [outboundVolume, setOutboundVolume] = useState<number>(10000);
  const [bounceRate, setBounceRate] = useState<number>(35);
  const [dealValue, setDealValue] = useState<number>(3500);
  const [conversionRatePct, setConversionRatePct] = useState<number>(0.15);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (scanResult && scanResult.summary) {
      setBounceRate(scanResult.summary.quarantineRiskPct || 35);
    }
  }, [scanResult]);

  // Transparent, Honest Mathematical Calculations:
  // 1. Quarantined Outbound = Monthly Outbound * Spam Rate
  // 2. Monthly Revenue Leakage = Quarantined Outbound * (Conversion Rate / 100) * Value per Conversion
  // 3. Annualized Pipeline Risk = Monthly Revenue Leakage * 12
  const quarantinedMessages = Math.round(outboundVolume * (bounceRate / 100));
  const conversionMultiplier = conversionRatePct / 100;
  const monthlyRevenueLeakage = Math.round(quarantinedMessages * conversionMultiplier * dealValue);
  const annualLeakage = monthlyRevenueLeakage * 12;

  // Severity Status & Color Triggers:
  // Trigger 1: When Spam Rate is below 10% -> Green (Healthy)
  // Trigger 2: When Spam Rate hits 11% to 24% -> Yellow/Amber (Uh oh...)
  // Trigger 3: When Spam Rate hits 25% or higher -> Aggressive Red (Blacklisted)
  const severityStatus = useMemo(() => {
    if (bounceRate <= 10) {
      return {
        label: 'Healthy',
        color: '#10b981', // Green
        badgeBg: isLightMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
        badgeText: isLightMode ? '#047857' : '#34d399',
        badgeBorder: 'rgba(16, 185, 129, 0.3)',
      };
    } else if (bounceRate <= 24) {
      return {
        label: 'Uh oh...',
        color: '#f59e0b', // Yellow / Amber
        badgeBg: isLightMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.20)',
        badgeText: isLightMode ? '#b45309' : '#fbbf24',
        badgeBorder: 'rgba(245, 158, 11, 0.35)',
      };
    } else {
      return {
        label: 'Blacklisted',
        color: '#ef4444', // Aggressive Red
        badgeBg: isLightMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.22)',
        badgeText: isLightMode ? '#b91c1c' : '#f87171',
        badgeBorder: 'rgba(239, 68, 68, 0.35)',
      };
    }
  }, [bounceRate, isLightMode]);

  // Determine theme color for cards & graph based on triggers
  const themeColor = useMemo(() => {
    if (bounceRate <= 10) {
      return {
        stroke: '#10b981', // Vibrant Green
        fill: 'rgba(16, 185, 129, 0.12)',
        glow: 'rgba(16, 185, 129, 0.45)',
        dotBorder: '#059669',
        accentHex: '#10b981',
      };
    } else if (bounceRate <= 24) {
      return {
        stroke: '#f59e0b', // Yellow / Amber
        fill: 'rgba(245, 158, 11, 0.15)',
        glow: 'rgba(245, 158, 11, 0.45)',
        dotBorder: '#d97706',
        accentHex: '#f59e0b',
      };
    } else {
      return {
        stroke: '#ef4444', // Aggressive Red
        fill: 'rgba(239, 68, 68, 0.2)',
        glow: 'rgba(239, 68, 68, 0.5)',
        dotBorder: '#dc2626',
        accentHex: '#ef4444',
      };
    }
  }, [bounceRate]);

  // 12-Month Mathematical Data Engine:
  // Each node represents that month's compound reputation decay.
  // The sum of all 12 nodes EXACTLY matches the Annualized Pipeline Risk (annualLeakage).
  const graphPointsData = useMemo(() => {
    const monthNames = [
      'Month 1 (Jan)',
      'Month 2 (Feb)',
      'Month 3 (Mar)',
      'Month 4 (Apr)',
      'Month 5 (May)',
      'Month 6 (Jun)',
      'Month 7 (Jul)',
      'Month 8 (Aug)',
      'Month 9 (Sep)',
      'Month 10 (Oct)',
      'Month 11 (Nov)',
      'Month 12 (Dec)',
    ];

    // Compute exact monthly distribution matching annual total
    const computedLosses: number[] = [];
    let runningSum = 0;

    for (let i = 0; i < 12; i++) {
      if (i === 11) {
        // Last month absorbs remainder so sum(M1..M12) === annualLeakage to the exact dollar
        const remainder = Math.max(annualLeakage - runningSum, 0);
        computedLosses.push(remainder);
      } else {
        const weight = REFERENCE_TOPOLOGY[i] / SUM_REFERENCE_TOPOLOGY;
        const loss = Math.round(annualLeakage * weight);
        computedLosses.push(loss);
        runningSum += loss;
      }
    }

    return computedLosses.map((monthlyLoss, i) => {
      return {
        index: i,
        monthNumber: i + 1,
        label: monthNames[i],
        monthlyLoss,
        isQuarterNode: i === 2 || i === 5 || i === 8 || i === 11,
        quarterLabel: i === 2 ? 'Q1' : i === 5 ? 'Q2' : i === 8 ? 'Q3' : i === 11 ? 'Q4' : null,
      };
    });
  }, [annualLeakage]);

  // Fixed static Y-axis ticks: 0, $10K, $20K, $30K, $40K, $50K+
  const yTicks = [
    { pct: 0.0, label: '0', isTop: false, isSpecial: false },
    { pct: 0.2, label: '$10K', isTop: false, isSpecial: false },
    { pct: 0.4, label: '$20K', isTop: false, isSpecial: false },
    { pct: 0.6, label: '$30K', isTop: false, isSpecial: false },
    { pct: 0.8, label: '$40K', isTop: false, isSpecial: false },
    { pct: 1.0, label: '$50K+', isTop: true, isSpecial: true },
  ];

  // SVG Canvas dimensions (Expanded viewport with breathing room on top and right)
  const svgWidth = 880;
  const svgHeight = 440;
  const padding = { top: 20, right: 24, bottom: 26, left: 52 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Compute SVG Coordinates for all 12 points
  const points = useMemo(() => {
    return graphPointsData.map((d, i) => {
      const x = padding.left + (i / (graphPointsData.length - 1)) * graphWidth;
      const normalizedRatio = Math.min(d.monthlyLoss / FIXED_MAX_Y, 1);
      const y = padding.top + graphHeight - normalizedRatio * graphHeight;
      return { x, y, ...d };
    });
  }, [graphPointsData, graphWidth, graphHeight, padding.left, padding.top]);

  // Polyline path connecting all 12 points
  const polylinePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [points]);

  // Area Fill path under polyline
  const areaPath = useMemo(() => {
    if (!polylinePath || points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    return `${polylinePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [polylinePath, points, padding.top, graphHeight]);

  // Baseline zero line
  const baselinePath = useMemo(() => {
    const bottomY = padding.top + graphHeight;
    return `M ${padding.left} ${bottomY} L ${padding.left + graphWidth} ${bottomY}`;
  }, [padding.left, padding.top, graphHeight, graphWidth]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * svgWidth;

    let closestIdx = 0;
    let minDist = Infinity;
    points.forEach((p, idx) => {
      const dist = Math.abs(p.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });
    setHoveredIndex(closestIdx);
  };

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <section
      id="financial-leakage"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 ${isLivePreview ? 'py-6' : 'py-20 sm:py-28 md:py-36 section-content-auto'
        }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
          >
            <span className="block">Email risk <i>rarely</i></span>
            <span className="block">arrives with a warning.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            <span className="block">It appears as lost replies, rejected invoices, impersonated executives,</span>
            <span className="block">and a sender reputation that takes months to rebuild.</span>
          </p>
        </div>

        {/* Unified 2-Panel Cockpit HUD (Desktop 8:4 Grid / Mobile Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 items-stretch max-w-6xl mx-auto">
          {/* 1. Left Panel (Display Card / Graph + Horizontal KPI Ribbon): 8 Columns on lg */}
          <div className="lg:col-span-8 h-full flex flex-col justify-end">
            {/* Outer Browser-Style Tab Bar: Attached seamlessly to outer top-left corner */}
            <div className="flex flex-wrap sm:flex-nowrap items-end justify-between gap-2 px-0 -mb-[1px] relative z-20">
              {/* Attached Browser Tab (Wider, fits any URL length, matching graph box surface) */}
              <div
                className={`rc-grain-surface border-t border-l border-r border-b-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-tl-2xl sm:rounded-tl-3xl rounded-tr-xl sm:rounded-tr-2xl flex items-center gap-2.5 shadow-sm transition-all duration-300 relative z-20 backdrop-blur-xl shrink min-w-0 ${isLightMode
                    ? 'bg-black/[0.015] border-black/[0.08] text-black'
                    : 'bg-white/[0.02] border-white/[0.08] text-white'
                  }`}
              >
                {currentDomain || scanResult?.domain ? (
                  <>
                    <div
                      className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded flex items-center justify-center overflow-hidden shrink-0 ${isLightMode ? 'bg-neutral-100' : 'bg-white/10'
                        }`}
                    >
                      <DomainFavicon
                        domain={currentDomain || scanResult?.domain || ''}
                        isLightMode={isLightMode}
                        className="w-full h-full"
                        iconClassName="w-3.5 h-3.5"
                      />
                    </div>
                    <span className="font-mono font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
                      {currentDomain || scanResult?.domain}
                    </span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="font-mono font-medium text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                      example.com
                    </span>
                  </>
                )}
              </div>

              {/* Right Side of Tab Row: Last Scanned (Phone & Desktop) + Status Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 pb-1.5 shrink-0 pr-1 ml-auto">
                {lastScannedTime && (
                  <span className={`text-[10px] xs:text-[10.5px] font-mono ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    <span className="hidden xs:inline">Last scanned: </span>
                    <span className="xs:hidden">Scanned: </span>
                    {lastScannedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
                <div
                  className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold tracking-wide border transition-all shrink-0"
                  style={{
                    backgroundColor: currentDomain || scanResult?.domain ? severityStatus.badgeBg : isLightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
                    color: currentDomain || scanResult?.domain ? severityStatus.badgeText : isLightMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
                    borderColor: currentDomain || scanResult?.domain ? severityStatus.badgeBorder : isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  ● {currentDomain || scanResult?.domain ? severityStatus.label : 'Awaiting Scan'}
                </div>
              </div>
            </div>

            {/* Main Display Card Body: Seamlessly attached to tab at top-left */}
            <div
              className={`rc-grain-surface p-1 sm:p-2.5 md:p-3 rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl rounded-tl-none border backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between flex-1 shadow-xl ${isLightMode
                  ? 'bg-black/[0.015] border-black/[0.08]'
                  : 'bg-white/[0.02] border-white/[0.08]'
                }`}
            >
              {/* 12-Node High-Precision Reference Topology Polyline SVG (Full-Bleed Wide & Tall) */}
              <div className="w-full relative flex-1 flex items-center justify-center my-0">
                <svg
                  ref={svgRef}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto overflow-visible cursor-crosshair select-none"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <defs>
                    <linearGradient id="financialPolyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={themeColor.stroke} stopOpacity="0.32" />
                      <stop offset="85%" stopColor={themeColor.stroke} stopOpacity="0.03" />
                      <stop offset="100%" stopColor={themeColor.stroke} stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="financialGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor={themeColor.stroke} floodOpacity="0.45" />
                    </filter>
                  </defs>

                  {/* Horizontal Static Y-Axis Grid Lines & Labels: 0, $10K, $20K, $30K, $40K, $50K+ */}
                  {yTicks.map((tick, idx) => {
                    const yPos = padding.top + graphHeight - tick.pct * graphHeight;
                    return (
                      <g key={idx}>
                        <line
                          x1={padding.left}
                          y1={yPos}
                          x2={padding.left + graphWidth}
                          y2={yPos}
                          stroke={
                            tick.isSpecial
                              ? isLightMode ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)'
                              : isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'
                          }
                          strokeDasharray={tick.isSpecial ? '4 4' : '2 2'}
                          strokeWidth={tick.isSpecial ? '1.5' : '1.0'}
                        />
                        <text
                          x={padding.left - 6}
                          y={yPos + 4.5}
                          textAnchor="end"
                          className={`font-mono ${tick.isSpecial
                              ? 'text-[14px] sm:text-[15px] font-bold'
                              : 'text-[12.5px] sm:text-[13.5px] font-semibold'
                            }`}
                          fill={
                            tick.isSpecial
                              ? isLightMode ? '#000000' : '#ffffff'
                              : isLightMode ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.65)'
                          }
                        >
                          {tick.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Baseline 0 Line */}
                  <path
                    d={baselinePath}
                    stroke={isLightMode ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'}
                    strokeWidth="1.5"
                  />

                  {/* Shaded Area Fill Under Polyline */}
                  {areaPath && (
                    <path
                      d={areaPath}
                      fill="url(#financialPolyGradient)"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* 12-Node Precise Straight Segment Polyline */}
                  {polylinePath && (
                    <path
                      d={polylinePath}
                      fill="none"
                      stroke={themeColor.stroke}
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#financialGlow)"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* 12 Precise Circular Segment Vertices */}
                  {points.map((p, idx) => {
                    const isHovered = hoveredIndex === idx;
                    return (
                      <g key={idx}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={isHovered ? '7' : p.isQuarterNode ? '5' : '3.8'}
                          fill={isHovered ? themeColor.stroke : isLightMode ? '#ffffff' : '#0A0A0C'}
                          stroke={themeColor.stroke}
                          strokeWidth={p.isQuarterNode ? '3' : '2.2'}
                          className="transition-all duration-150 cursor-pointer"
                        />
                      </g>
                    );
                  })}

                  {/* Quarter Markers on X Axis: Q1, Q2, Q3, Q4 */}
                  {[
                    { x: points[2]?.x ?? 0, label: 'Q1' },
                    { x: points[5]?.x ?? 0, label: 'Q2' },
                    { x: points[8]?.x ?? 0, label: 'Q3' },
                    { x: points[11]?.x ?? 0, label: 'Q4' },
                  ].map((q, idx) => {
                    return (
                      <g key={idx}>
                        <line
                          x1={q.x}
                          y1={padding.top + graphHeight}
                          x2={q.x}
                          y2={padding.top + graphHeight + 6}
                          stroke={isLightMode ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'}
                          strokeWidth="1.5"
                        />
                        <text
                          x={q.x}
                          y={padding.top + graphHeight + 18}
                          textAnchor="middle"
                          className="font-mono text-[12.5px] sm:text-[13.5px] font-bold"
                          style={{
                            fill: isLightMode ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.75)',
                          }}
                        >
                          {q.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Hover Cursor Vertical Guide Line & Active Vertex Indicator */}
                  {activePoint && (
                    <g>
                      <line
                        x1={activePoint.x}
                        y1={padding.top}
                        x2={activePoint.x}
                        y2={padding.top + graphHeight}
                        stroke={isLightMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)'}
                        strokeDasharray="2 2"
                      />
                      {/* Active Node Pulse */}
                      <circle
                        cx={activePoint.x}
                        cy={activePoint.y}
                        r="14"
                        fill={themeColor.stroke}
                        opacity="0.35"
                      />
                      <circle
                        cx={activePoint.x}
                        cy={activePoint.y}
                        r="6.5"
                        fill={themeColor.stroke}
                        stroke={isLightMode ? '#ffffff' : '#0A0A0C'}
                        strokeWidth="3"
                      />
                    </g>
                  )}

                  {/* Tooltip Hover Box directly on top of the active/hovered node */}
                  {activePoint && hoveredIndex !== null && (
                    <g
                      className="pointer-events-none transition-transform duration-100"
                      transform={`translate(${Math.min(Math.max(activePoint.x, 90), svgWidth - 90)}, ${Math.max(
                        activePoint.y - 54,
                        20
                      )})`}
                    >
                      <rect
                        x="-85"
                        y="-24"
                        width="170"
                        height="46"
                        rx="8"
                        fill={isLightMode ? '#ffffff' : '#141418'}
                        stroke={isLightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)'}
                        strokeWidth="1.2"
                        filter="drop-shadow(0 4px 14px rgba(0,0,0,0.25))"
                      />
                      <path
                        d="M -5 22 L 0 27 L 5 22 Z"
                        fill={isLightMode ? '#ffffff' : '#141418'}
                        stroke={isLightMode ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.2)'}
                        strokeWidth="1.2"
                      />
                      <line
                        x1="-4.5"
                        y1="22"
                        x2="4.5"
                        y2="22"
                        stroke={isLightMode ? '#ffffff' : '#141418'}
                        strokeWidth="2"
                      />
                      <text
                        x="0"
                        y="-6"
                        textAnchor="middle"
                        className="font-mono text-[10.5px] uppercase tracking-wider font-semibold"
                        fill={isLightMode ? '#111111' : '#ffffff'}
                      >
                        {activePoint.label}
                      </text>
                      <text
                        x="0"
                        y="9"
                        textAnchor="middle"
                        className="font-mono text-[11px] font-bold"
                        fill={themeColor.stroke}
                      >
                        Decay: ${activePoint.monthlyLoss.toLocaleString()}/mo
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* 2. Dense Horizontal KPI Ribbon: 2-Column Grid (Annualized Risk & Quarantined Outbound) */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-black/[0.06] dark:border-white/[0.08] grid grid-cols-2 divide-x divide-black/[0.06] dark:divide-white/[0.08] items-center font-mono select-none text-center">
                {/* Metric 1: Annualized Risk (Dynamically Colored & Enlarged) */}
                <div className="px-2 sm:px-4 flex flex-col items-center">
                  <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-bold mb-1 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Estimated Pipeline Impact
                  </span>
                  <div className="flex items-baseline justify-center gap-2 flex-wrap mt-0.5">
                    <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tight" style={{ color: themeColor.stroke }}>
                      <NumberTicker value={annualLeakage} prefix="$" duration={900} />
                      <span className="text-sm sm:text-base font-bold opacity-80">/yr</span>
                    </span>
                    <span
                      className={`font-black text-xs sm:text-sm md:text-base uppercase tracking-wider px-2 py-0.5 rounded border shadow-sm ${
                        isLightMode
                          ? 'bg-neutral-200/90 text-neutral-900 border-neutral-300'
                          : 'bg-white/10 text-white border-white/20'
                      }`}
                    >
                      Scenario Model
                    </span>
                  </div>
                </div>

                {/* Metric 2: Quarantined Outbound (Enlarged) */}
                <div className="px-2 sm:px-4 flex flex-col items-center">
                  <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-bold ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Est. Undelivered Messages
                  </span>
                  <span className={`font-black text-lg sm:text-2xl md:text-3xl tracking-tight mt-1 ${isLightMode ? 'text-black' : 'text-white'}`}>
                    ~<NumberTicker value={quarantinedMessages} duration={900} />
                    <span className={`text-xs sm:text-sm font-normal ml-1 ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>emails/mo</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Right Panel: 4 Parameter Boxes (Stacked 1-by-1 on Desktop, 2x2 on Mobile): 4 Columns on lg */}
          <div className="lg:col-span-4 h-full flex flex-col justify-between gap-2.5 sm:gap-3">
            {/* Parameter Boxes Grid: 1 col on Desktop (lg), 2 cols on Mobile */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 flex-1">
              {/* Box 1: Monthly Outbound */}
              <div
                className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${isLightMode
                    ? 'bg-black/[0.015] border-black/[0.08]'
                    : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
              >
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Monthly Outbound
                  </span>
                  <span
                    className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
                      }`}
                  >
                    {outboundVolume.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={1000}
                    value={outboundVolume}
                    onChange={(e) => setOutboundVolume(Number(e.target.value))}
                    className={`w-full h-1 appearance-none cursor-pointer rounded-full ${isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
                      }`}
                  />
                  <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                    <span>1k</span>
                    <span>100k</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Quarantine / Spam Rate */}
              <div
                className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${isLightMode
                    ? 'bg-black/[0.015] border-black/[0.08]'
                    : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
              >
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Spam / Quarantine Rate
                  </span>
                  <span
                    className="font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md font-semibold transition-colors shrink-0"
                    style={{
                      backgroundColor: themeColor.fill,
                      color: themeColor.stroke,
                    }}
                  >
                    {bounceRate}%
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    min={1}
                    max={65}
                    step={1}
                    value={bounceRate}
                    onChange={(e) => setBounceRate(Number(e.target.value))}
                    className="w-full h-1 appearance-none cursor-pointer rounded-full bg-neutral-200 dark:bg-neutral-800"
                    style={{ accentColor: themeColor.stroke }}
                  />
                  <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                    <span>1%</span>
                    <span>65%</span>
                  </div>
                </div>
              </div>

              {/* Box 3: Value per Deal */}
              <div
                className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${isLightMode
                    ? 'bg-black/[0.015] border-black/[0.08]'
                    : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
              >
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Deal Value
                  </span>
                  <span
                    className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
                      }`}
                  >
                    ${dealValue.toLocaleString()}
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    min={100}
                    max={50000}
                    step={100}
                    value={dealValue}
                    onChange={(e) => setDealValue(Number(e.target.value))}
                    className={`w-full h-1 appearance-none cursor-pointer rounded-full ${isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
                      }`}
                  />
                  <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                    <span>$100</span>
                    <span>$50k+</span>
                  </div>
                </div>
              </div>

              {/* Box 4: Assumed Reply-to-Deal Rate */}
              <div
                className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${isLightMode
                    ? 'bg-black/[0.015] border-black/[0.08]'
                    : 'bg-white/[0.02] border-white/[0.08]'
                  }`}
              >
                <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                  <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    Assumed Reply-to-Deal Rate
                  </span>
                  <span
                    className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
                      }`}
                  >
                    {conversionRatePct}%
                  </span>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    min={0.05}
                    max={0.50}
                    step={0.01}
                    value={conversionRatePct}
                    onChange={(e) => setConversionRatePct(Number(Number(e.target.value).toFixed(2)))}
                    className={`w-full h-1 appearance-none cursor-pointer rounded-full ${isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
                      }`}
                  />
                  <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                    <span>0.05%</span>
                    <span>0.50%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Subtle Micro-Sized Footer Assumption */}
            <div className="px-1 flex items-start gap-1.5 text-[9px] sm:text-[9.5px] font-mono leading-relaxed text-neutral-500 dark:text-white/40">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500" />
              <span>
                * Scenario sensitivity model based on user-adjustable conversion & volume assumptions to illustrate potential pipeline impact when deliverability degrades.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
