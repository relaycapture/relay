'use client'

import { useState, useEffect, useMemo, useRef } from 'react';
import { ScanResult } from '../../types';
import { NumberTicker } from '../number-ticker';
import { DomainFavicon } from '@/components/domain-favicon';
import { Info, Globe, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialLeakageProps {
  isOpen?: boolean;
  onClose?: () => void;
  scanResult?: ScanResult | null;
  currentDomain?: string | null;
  lastScannedTime?: Date | null;
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

// 12-point exact topology normalized from reference model
const REFERENCE_TOPOLOGY = [
  0.08, // P1
  0.38, // P2
  0.44, // P3
  0.64, // P4
  0.96, // P5
  0.72, // P6
  0.52, // P7
  0.38, // P8
  0.88, // P9
  0.66, // P10
  0.60, // P11
  0.92, // P12
];

const SUM_REFERENCE_TOPOLOGY = REFERENCE_TOPOLOGY.reduce((acc, v) => acc + v, 0);
const FIXED_MAX_Y = 50000;

export function FinancialLeakage({
  isOpen = false,
  onClose,
  scanResult,
  currentDomain,
  lastScannedTime,
  isLightMode = false,
  isLivePreview = false,
}: FinancialLeakageProps) {
  const [outboundVolume, setOutboundVolume] = useState<number>(10000);
  const [bounceRate, setBounceRate] = useState<number>(35);
  const [dealValue, setDealValue] = useState<number>(3500);
  const [conversionRatePct, setConversionRatePct] = useState<number>(0.15);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen && !isLivePreview) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && onClose) {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, isLivePreview, onClose]);

  useEffect(() => {
    if (scanResult && scanResult.summary) {
      setBounceRate(scanResult.summary.quarantineRiskPct || 35);
    }
  }, [scanResult]);

  // Mathematical Calculations:
  const quarantinedMessages = Math.round(outboundVolume * (bounceRate / 100));
  const conversionMultiplier = conversionRatePct / 100;
  const monthlyRevenueLeakage = Math.round(quarantinedMessages * conversionMultiplier * dealValue);
  const annualLeakage = monthlyRevenueLeakage * 12;

  // Severity Status:
  const severityStatus = useMemo(() => {
    if (bounceRate <= 10) {
      return {
        label: 'Healthy',
        color: '#10b981',
        badgeBg: isLightMode ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.18)',
        badgeText: isLightMode ? '#047857' : '#34d399',
        badgeBorder: 'rgba(16, 185, 129, 0.3)',
      };
    } else if (bounceRate <= 24) {
      return {
        label: 'At Risk',
        color: '#f59e0b',
        badgeBg: isLightMode ? 'rgba(245, 158, 11, 0.15)' : 'rgba(245, 158, 11, 0.20)',
        badgeText: isLightMode ? '#b45309' : '#fbbf24',
        badgeBorder: 'rgba(245, 158, 11, 0.35)',
      };
    } else {
      return {
        label: 'Elevated Risk',
        color: '#ef4444',
        badgeBg: isLightMode ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.22)',
        badgeText: isLightMode ? '#b91c1c' : '#f87171',
        badgeBorder: 'rgba(239, 68, 68, 0.35)',
      };
    }
  }, [bounceRate, isLightMode]);

  const themeColor = useMemo(() => {
    if (bounceRate <= 10) {
      return {
        stroke: '#10b981',
        fill: 'rgba(16, 185, 129, 0.12)',
        glow: 'rgba(16, 185, 129, 0.45)',
        dotBorder: '#059669',
        accentHex: '#10b981',
      };
    } else if (bounceRate <= 24) {
      return {
        stroke: '#f59e0b',
        fill: 'rgba(245, 158, 11, 0.15)',
        glow: 'rgba(245, 158, 11, 0.45)',
        dotBorder: '#d97706',
        accentHex: '#f59e0b',
      };
    } else {
      return {
        stroke: '#ef4444',
        fill: 'rgba(239, 68, 68, 0.2)',
        glow: 'rgba(239, 68, 68, 0.5)',
        dotBorder: '#dc2626',
        accentHex: '#ef4444',
      };
    }
  }, [bounceRate]);

  // 12-Month Mathematical Data Engine:
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

    const computedLosses: number[] = [];
    let runningSum = 0;

    for (let i = 0; i < 12; i++) {
      if (i === 11) {
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

  const svgWidth = 880;
  const svgHeight = 440;
  const padding = { top: 20, right: 24, bottom: 26, left: 52 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const points = useMemo(() => {
    return graphPointsData.map((d, i) => {
      const x = padding.left + (i / (graphPointsData.length - 1)) * graphWidth;
      const normalizedRatio = Math.min(d.monthlyLoss / FIXED_MAX_Y, 1);
      const y = padding.top + graphHeight - normalizedRatio * graphHeight;
      return { x, y, ...d };
    });
  }, [graphPointsData, graphWidth, graphHeight, padding.left, padding.top]);

  const polylinePath = useMemo(() => {
    if (points.length === 0) return '';
    return points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }, [points]);

  const areaPath = useMemo(() => {
    if (!polylinePath || points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    return `${polylinePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [polylinePath, points, padding.top, graphHeight]);

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

  const modalContent = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 md:gap-6 items-stretch max-w-6xl mx-auto">
      {/* 1. Left Panel (Display Card / Graph + Horizontal KPI Ribbon): 8 Columns on lg */}
      <div className="lg:col-span-8 h-full flex flex-col justify-end">
        {/* Outer Browser-Style Tab Bar */}
        <div className="flex flex-wrap sm:flex-nowrap items-end justify-between gap-2 px-0 -mb-[1px] relative z-20">
          <div
            className={`rc-grain-surface border-t border-l border-r border-b-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-tl-2xl sm:rounded-tl-3xl rounded-tr-xl sm:rounded-tr-2xl flex items-center gap-2.5 shadow-sm transition-all duration-300 relative z-20 backdrop-blur-xl shrink min-w-0 ${
              isLightMode
                ? 'bg-black/[0.015] border-black/[0.08] text-black'
                : 'bg-white/[0.02] border-white/[0.08] text-white'
            }`}
          >
            {currentDomain || scanResult?.domain ? (
              <>
                <div
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded flex items-center justify-center overflow-hidden shrink-0 ${
                    isLightMode ? 'bg-neutral-100' : 'bg-white/10'
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

          {/* Right Side of Tab Row */}
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
              ● {currentDomain || scanResult?.domain ? severityStatus.label : 'Scenario Model'}
            </div>
          </div>
        </div>

        {/* Main Display Card Body */}
        <div
          className={`rc-grain-surface p-1 sm:p-2.5 md:p-3 rounded-b-2xl sm:rounded-b-3xl rounded-tr-2xl sm:rounded-tr-3xl rounded-tl-none border backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between flex-1 shadow-xl ${
            isLightMode
              ? 'bg-black/[0.015] border-black/[0.08]'
              : 'bg-white/[0.02] border-white/[0.08]'
          }`}
        >
          <div className="w-full relative flex-1 flex items-center justify-center my-0">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto overflow-visible cursor-crosshair select-none"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Grid Lines */}
              {yTicks.map((tick, idx) => {
                const yPos = padding.top + graphHeight - tick.pct * graphHeight;
                return (
                  <g key={idx}>
                    <line
                      x1={padding.left}
                      y1={yPos}
                      x2={padding.left + graphWidth}
                      y2={yPos}
                      stroke={isLightMode ? '#000000' : '#ffffff'}
                      strokeOpacity={isLightMode ? (tick.isSpecial ? 0.2 : 0.08) : tick.isSpecial ? 0.22 : 0.07}
                      strokeWidth={tick.isSpecial ? 1.5 : 1}
                      strokeDasharray={tick.isSpecial ? '4 4' : '3 3'}
                    />
                    <text
                      x={padding.left - 6}
                      y={yPos + 4.5}
                      textAnchor="end"
                      className={`font-mono ${
                        tick.isSpecial
                          ? 'text-[14px] sm:text-[15px] font-bold'
                          : 'text-[12.5px] sm:text-[13.5px] font-semibold'
                      }`}
                      fill={
                        tick.isSpecial
                          ? isLightMode ? '#000000' : '#ffffff'
                          : isLightMode ? '#222222' : '#e0e0e0'
                      }
                    >
                      {tick.label}
                    </text>
                  </g>
                );
              })}

              {/* Area Fill */}
              {areaPath && (
                <path
                  d={areaPath}
                  fill={themeColor.fill}
                  className="transition-all duration-300 pointer-events-none"
                />
              )}

              {/* Polyline */}
              {polylinePath && (
                <path
                  d={polylinePath}
                  fill="none"
                  stroke={themeColor.stroke}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 pointer-events-none"
                />
              )}

              {/* All 12 Data Nodes */}
              {points.map((p, idx) => {
                const isHovered = hoveredIndex === idx;
                return (
                  <g key={idx} className="cursor-pointer">
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? 6 : p.isQuarterNode ? 4.5 : 3.5}
                      fill={isHovered ? themeColor.stroke : isLightMode ? '#ffffff' : '#0A0A0C'}
                      stroke={themeColor.stroke}
                      strokeWidth={isHovered ? 3 : 2}
                      className="transition-all duration-150"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Dense Horizontal KPI Ribbon */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-3.5 border-t border-black/[0.06] dark:border-white/[0.08] grid grid-cols-2 divide-x divide-black/[0.06] dark:divide-white/[0.08] items-center font-mono select-none text-center">
            <div className="px-2 sm:px-4 flex flex-col items-center">
              <span className={`text-[11px] sm:text-xs uppercase tracking-wider font-bold ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Estimated Pipeline Impact
              </span>
              <span className="font-black text-lg sm:text-2xl md:text-3xl tracking-tight mt-1" style={{ color: themeColor.stroke }}>
                <NumberTicker value={annualLeakage} prefix="$" duration={900} />
                <span className={`text-xs sm:text-sm font-normal ml-0.5 ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>/yr (Scenario Model)</span>
              </span>
            </div>

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

      {/* 2. Right Panel: 4 Parameter Sliders */}
      <div className="lg:col-span-4 h-full flex flex-col justify-between gap-2.5 sm:gap-3">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 flex-1">
          {/* Box 1: Monthly Outbound */}
          <div
            className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${
              isLightMode
                ? 'bg-black/[0.015] border-black/[0.08]'
                : 'bg-white/[0.02] border-white/[0.08]'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                Monthly Outbound
              </span>
              <span
                className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${
                  isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
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
                className={`w-full h-1 appearance-none cursor-pointer rounded-full ${
                  isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
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
            className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${
              isLightMode
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
            className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${
              isLightMode
                ? 'bg-black/[0.015] border-black/[0.08]'
                : 'bg-white/[0.02] border-white/[0.08]'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                Deal Value
              </span>
              <span
                className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${
                  isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
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
                className={`w-full h-1 appearance-none cursor-pointer rounded-full ${
                  isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
                }`}
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                <span>$100</span>
                <span>$50k+</span>
              </div>
            </div>
          </div>

          {/* Box 4: Assumed Opportunity Rate */}
          <div
            className={`rc-grain-surface p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border backdrop-blur-md flex flex-col justify-between transition-all duration-200 shadow-sm ${
              isLightMode
                ? 'bg-black/[0.015] border-black/[0.08]'
                : 'bg-white/[0.02] border-white/[0.08]'
            }`}
          >
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className={`text-[11px] sm:text-xs font-medium truncate ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
                Assumed Opportunity Rate
              </span>
              <span
                className={`font-mono text-[10.5px] sm:text-xs px-1.5 py-0.5 rounded-md shrink-0 ${
                  isLightMode ? 'bg-black/5 text-black font-semibold' : 'bg-white/10 text-white font-semibold'
                }`}
              >
                {conversionRatePct}%
              </span>
            </div>
            <div className="mt-1">
              <input
                type="range"
                min={0.05}
                max={1.0}
                step={0.01}
                value={conversionRatePct}
                onChange={(e) => setConversionRatePct(Number(Number(e.target.value).toFixed(2)))}
                className={`w-full h-1 appearance-none cursor-pointer rounded-full ${
                  isLightMode ? 'bg-neutral-200 accent-black' : 'bg-neutral-800 accent-white'
                }`}
              />
              <div className="flex justify-between text-[9px] font-mono text-neutral-400 mt-1">
                <span>0.05%</span>
                <span>1.00%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-1 flex items-start gap-1.5 text-[9px] sm:text-[9.5px] font-mono leading-relaxed text-neutral-500 dark:text-white/40">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-500" />
          <span>
            * Scenario sensitivity model based on user-adjustable conversion & volume assumptions to illustrate potential pipeline impact when deliverability degrades.
          </span>
        </div>
      </div>
    </div>
  );

  if (isLivePreview) {
    return (
      <div className="p-4 w-full">
        {modalContent}
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="financial-leakage-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 backdrop-blur-2xl bg-black/80 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget && onClose) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`rc-grain-surface relative w-full max-w-6xl rounded-3xl border shadow-2xl overflow-hidden my-auto ${
              isLightMode
                ? 'bg-[#fbfbfd] border-black/15 text-[#1d1d1f]'
                : 'bg-[#100e16] border-white/15 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Modal Header Bar with Title & Close X */}
            <div
              className={`p-4 sm:p-5 md:p-6 border-b flex items-center justify-between gap-4 select-none ${
                isLightMode ? 'border-black/10 bg-black/[0.02]' : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <div>
                <h2 className={`text-lg sm:text-xl md:text-2xl font-semibold tracking-tight ${
                  isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                }`}>
                  Estimated Pipeline Impact (Scenario Model)
                </h2>
                <p className={`text-xs sm:text-sm font-normal mt-0.5 ${
                  isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  Adjust sending volume and conversion assumptions to estimate potential revenue vulnerability.
                </p>
              </div>

              {/* X Exit Button */}
              <button
                onClick={onClose}
                data-cursor="grow"
                aria-label="Close Revenue Impact Modal"
                className={`p-2 rounded-full border transition-all shrink-0 ${
                  isLightMode
                    ? 'bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-200 border-white/10'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Body: Unified 2-Panel Cockpit HUD */}
            <div className="p-4 sm:p-6 md:p-8">
              {modalContent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
