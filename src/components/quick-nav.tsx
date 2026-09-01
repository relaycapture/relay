'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  ArrowRight,
} from 'lucide-react';
import { HeroSection } from './sections/hero-section';
import { DomainCheckerSection } from './sections/domain-checker-section';
import { FinancialLeakage } from './sections/financial-leakage';
import { InboxComparison } from './sections/inbox-comparison';
import { LiveProtocolFeed } from './sections/live-protocol-feed';
import { ThreeCards } from './sections/three-cards';
import { FaqSection } from './sections/faq-section';
import { FooterContact } from './sections/footer-contact';

export interface QuickNavSection {
  id: string;
  label: string;
}

interface QuickNavProps {
  sections: QuickNavSection[];
  activeSection: string;
  onSelectSection: (id: string) => void;
  isLightMode?: boolean;
  onNearChange?: (isNear: boolean) => void;
  isVisible?: boolean;
}

export function QuickNav({
  sections,
  activeSection,
  onSelectSection,
  isLightMode,
  onNearChange,
  isVisible = true,
}: QuickNavProps) {
  const [isNear, setIsNear] = useState(false);
  const [hoveredSectionId, setHoveredSectionId] = useState<string | null>(null);
  const leftNavRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const isNearRef = useRef(isNear);
  isNearRef.current = isNear;
  const suppressedRef = useRef(false);

  // Notify parent on near change
  useEffect(() => {
    onNearChange?.(isNear);
  }, [isNear, onNearChange]);

  // Reset open state if quicknav is hidden
  useEffect(() => {
    if (!isVisible) {
      setIsNear(false);
      setHoveredSectionId(null);
      suppressedRef.current = false;
    }
  }, [isVisible]);

  // Select section handler that immediately closes QuickNav and suppresses reopening
  const handleSelect = (sectionId: string) => {
    setIsNear(false);
    setHoveredSectionId(null);
    isNearRef.current = false;
    suppressedRef.current = true;
    onNearChange?.(false);
    onSelectSection(sectionId);
  };

  // Precise proximity & hover detection with requestAnimationFrame throttling for butter-smooth 60fps
  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const target = e.target as Node;
        const leftEl = leftNavRef.current;
        const carouselEl = carouselContainerRef.current;
        const currentlyOpen = isNearRef.current;

        const isMouseInsideEl = (el: HTMLElement | null, padding = 0) => {
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return (
            e.clientX >= rect.left - padding &&
            e.clientX <= rect.right + padding &&
            e.clientY >= rect.top - padding &&
            e.clientY <= rect.bottom + padding
          );
        };

        // If user just clicked an item, stay suppressed until mouse leaves the quicknav bounds
        if (suppressedRef.current) {
          const isOverLeftNav =
            leftEl ? leftEl.contains(target) || isMouseInsideEl(leftEl, 20) : false;
          const isOverCarousel =
            carouselEl ? carouselEl.contains(target) || isMouseInsideEl(carouselEl, 20) : false;

          if (!isOverLeftNav && !isOverCarousel) {
            suppressedRef.current = false;
          } else {
            return;
          }
        }

        if (!currentlyOpen) {
          // IDLE: Only open if hovering directly over the bottom-left tick lines element
          const isOverLeftTicks =
            leftEl ? leftEl.contains(target) || isMouseInsideEl(leftEl, 20) : false;

          if (isOverLeftTicks) {
            setIsNear(true);
          }
        } else {
          // ACTIVE: Keep open while over left nav list OR over right preview carousel
          const isOverLeftNav =
            leftEl ? leftEl.contains(target) || isMouseInsideEl(leftEl, 30) : false;

          const isOverCarousel =
            carouselEl ? carouselEl.contains(target) || isMouseInsideEl(carouselEl, 30) : false;

          if (!isOverLeftNav && !isOverCarousel) {
            setIsNear(false);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  const currentPreviewId = hoveredSectionId || activeSection || sections[0]?.id;
  const currentPreviewIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === currentPreviewId)
  );

  // Prevent any website scroll while Quick Nav is open & cycle preview on scroll
  useEffect(() => {
    if (!isNear) return;

    const handleWindowWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.deltaY > 15) {
        setHoveredSectionId((prev) => {
          const curId = prev || activeSection || sections[0]?.id;
          const curIdx = Math.max(0, sections.findIndex((s) => s.id === curId));
          const nextIdx = Math.min(sections.length - 1, curIdx + 1);
          return sections[nextIdx].id;
        });
      } else if (e.deltaY < -15) {
        setHoveredSectionId((prev) => {
          const curId = prev || activeSection || sections[0]?.id;
          const curIdx = Math.max(0, sections.findIndex((s) => s.id === curId));
          const prevIdx = Math.max(0, curIdx - 1);
          return sections[prevIdx].id;
        });
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWindowWheel);
  }, [isNear, activeSection, sections]);

  // Handle scrollwheel to smoothly cycle through previews
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY > 15) {
      // scroll down
      const nextIdx = Math.min(sections.length - 1, currentPreviewIndex + 1);
      setHoveredSectionId(sections[nextIdx].id);
    } else if (e.deltaY < -15) {
      // scroll up
      const prevIdx = Math.max(0, currentPreviewIndex - 1);
      setHoveredSectionId(sections[prevIdx].id);
    }
  };

  const CARD_HEIGHT = 450;
  const CARD_GAP = 24;
  const STRIDE = CARD_HEIGHT + CARD_GAP;

  return (
    <>
      {/* 
        1. Full Website Grainy Blur Backdrop
        Layered between website content and the floating HUD with hardware acceleration
      */}
      <div
        id="quick-nav-grainy-backdrop"
        aria-hidden="true"
        className={`fixed inset-0 z-[38] pointer-events-none transition-all duration-350 ease-out ${isNear ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        style={{
          backdropFilter: isNear ? 'blur(10px) saturate(120%)' : 'blur(0px)',
          WebkitBackdropFilter: isNear ? 'blur(10px) saturate(120%)' : 'blur(0px)',
          backgroundColor: isNear
            ? isLightMode
              ? 'rgba(244, 244, 242, 0.5)'
              : 'rgba(6, 6, 9, 0.6)'
            : 'transparent',
          transform: 'translateZ(0)',
          willChange: 'opacity, backdrop-filter',
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '160px 160px',
          }}
        />
      </div>

      {/* 
        2. LEFT SIDE: Quick-Nav List (No outer box / border / background container)
        Text 01 to 09 is larger, tight vertical rhythm, floating directly on screen.
      */}
      <div
        ref={leftNavRef}
        id="section-quick-nav-left"
        onMouseEnter={() => setIsNear(true)}
        onWheel={handleWheel}
        aria-label="Interactive Section Quick Navigation"
        className={`hidden md:flex fixed left-8 bottom-8 z-[45] flex-col select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
          }`}
        style={{ transform: 'translateZ(0)' }}
      >
        {/* IDLE STATE: Compressed tick lines in bottom left */}
        {!isNear && (
          <nav className="flex flex-col gap-2 p-2 group bg-transparent">
            {sections.map((section, idx) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleSelect(section.id)}
                  aria-label={`Jump to ${section.label}`}
                  className="bg-transparent border-0 p-0 cursor-pointer outline-none flex items-center group"
                >
                  <div
                    className="rounded-full transition-all duration-300 group-hover:w-9"
                    style={{
                      height: '2.5px',
                      width: isActive ? '34px' : idx % 3 === 0 ? '22px' : '14px',
                      backgroundColor: isActive
                        ? isLightMode
                          ? '#000000'
                          : '#ffffff'
                        : isLightMode
                          ? 'rgba(0, 0, 0, 0.45)'
                          : 'rgba(255, 255, 255, 0.45)',
                      boxShadow: isActive
                        ? isLightMode
                          ? '0 0 10px rgba(0,0,0,0.3)'
                          : '0 0 12px rgba(255,255,255,0.7)'
                        : 'none',
                    }}
                  />
                </button>
              );
            })}
          </nav>
        )}

        {/* EXPANDED HOVER STATE: Bold editorial typography 01 to 09, tight spacing, NO outer box */}
        {isNear && (
          <div className="flex flex-col gap-1 animate-fade-in p-2">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-500 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>NAVIGATION / JUMP</span>
            </div>

            {sections.map((section, index) => {
              const isSelected = currentPreviewId === section.id;
              const numStr = String(index + 1).padStart(2, '0');

              return (
                <button
                  key={section.id}
                  id={`quick-nav-btn-${section.id}`}
                  onClick={() => handleSelect(section.id)}
                  onMouseEnter={() => setHoveredSectionId(section.id)}
                  className={`group flex items-center gap-3 py-1.5 text-left bg-transparent border-0 outline-none cursor-pointer transition-all duration-200 ${isSelected ? 'translate-x-2' : 'hover:translate-x-1'
                    }`}
                >
                  {/* Floating tick indicator */}
                  <div
                    className="h-[2px] rounded-full transition-all duration-300 flex-shrink-0"
                    style={{
                      width: isSelected ? '28px' : '10px',
                      backgroundColor: isSelected
                        ? isLightMode
                          ? '#000000'
                          : '#ffffff'
                        : isLightMode
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(255, 255, 255, 0.3)',
                    }}
                  />

                  {/* Section Label: Bigger font, high contrast, subtle scale */}
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`font-mono text-base md:text-lg font-bold transition-all duration-200 ${isSelected
                        ? isLightMode
                          ? 'text-black scale-105'
                          : 'text-white scale-105'
                        : isLightMode
                          ? 'text-neutral-500 group-hover:text-neutral-800'
                          : 'text-neutral-400 group-hover:text-neutral-200'
                        }`}
                    >
                      {numStr}
                    </span>

                    <span
                      className={`font-mono text-sm md:text-base tracking-tight transition-all duration-200 ${isSelected
                        ? isLightMode
                          ? 'text-black font-bold scale-[1.03]'
                          : 'text-white font-bold scale-[1.03]'
                        : isLightMode
                          ? 'text-neutral-600 group-hover:text-neutral-900'
                          : 'text-neutral-400 group-hover:text-neutral-200'
                        }`}
                    >
                      // {section.label.replace(/^\d+\s*\/\/\s*/, '')}
                    </span>
                  </div>

                  {isSelected && (
                    <ArrowRight
                      className={`w-4 h-4 ml-1 flex-shrink-0 animate-pulse ${isLightMode ? 'text-black' : 'text-white'
                        }`}
                    />
                  )}
                </button>
              );
            })}

            <div className="mt-3 pt-2 text-[11px] font-mono text-neutral-400">
              [Scroll or hover to preview • Click to jump]
            </div>
          </div>
        )}
      </div>

      {/* 
        3. RIGHT SIDE: Floating Desktop-Ratio Viewport Carousel
        - Lightweight lazy mounting for active & adjacent previews to maintain 60fps
        - Center active card: sharp, highlighted with emerald accent
        - Smooth vertical sliding scroll transition with hardware acceleration
      */}
      {isNear && (
        <div
          ref={carouselContainerRef}
          id="quick-nav-preview-viewport-carousel"
          onWheel={handleWheel}
          className="hidden md:block fixed right-6 lg:right-10 top-3 bottom-3 w-[620px] lg:w-[720px] xl:w-[780px] z-[45] pointer-events-auto overflow-hidden animate-fade-in select-none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div className="w-full h-full relative overflow-hidden">
            {/* Sliding vertical stack strictly calculated from vertical center */}
            <div
              className="w-full absolute left-0 right-0 transition-transform duration-350 ease-out flex flex-col items-center"
              style={{
                top: '50%',
                transform: `translate3d(0, -${currentPreviewIndex * STRIDE + CARD_HEIGHT / 2}px, 0)`,
                willChange: 'transform',
              }}
            >
              {sections.map((section, idx) => {
                const isCenter = idx === currentPreviewIndex;
                const isAdjacent = Math.abs(idx - currentPreviewIndex) === 1;
                const shouldRenderLive = Math.abs(idx - currentPreviewIndex) <= 1;

                return (
                  <div
                    key={section.id}
                    onClick={() => handleSelect(section.id)}
                    onMouseEnter={() => setHoveredSectionId(section.id)}
                    className={`w-full rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col ${isCenter
                      ? 'scale-100 shadow-2xl z-20 ring-1 ring-emerald-500/40'
                      : isAdjacent
                        ? 'scale-[0.94] shadow-lg z-10 hover:scale-[0.96]'
                        : 'scale-[0.88] z-0'
                      }`}
                    style={{
                      height: `${CARD_HEIGHT}px`,
                      marginBottom: `${CARD_GAP}px`,
                      opacity: 1, // 100% OPACITY FOR ALL PREVIEWS
                      backgroundColor: isLightMode
                        ? '#ffffff'
                        : '#0d0d12',
                      borderColor: isCenter
                        ? isLightMode
                          ? 'rgba(0, 0, 0, 0.25)'
                          : 'rgba(255, 255, 255, 0.28)'
                        : isLightMode
                          ? 'rgba(0, 0, 0, 0.12)'
                          : 'rgba(255, 255, 255, 0.12)',
                      boxShadow: isCenter
                        ? isLightMode
                          ? '0 25px 60px -12px rgba(0, 0, 0, 0.28), 0 0 1px 1px rgba(0, 0, 0, 0.1)'
                          : '0 30px 70px -12px rgba(0, 0, 0, 0.95), 0 0 1px 1px rgba(255, 255, 255, 0.18)'
                        : isLightMode
                          ? '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                          : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                      transform: 'translateZ(0)',
                    }}
                  >
                    {/* Desktop Browser Top Frame Window Bar */}
                    <div
                      className={`h-7 px-3.5 border-b flex items-center justify-between font-mono text-[10px] select-none z-30 flex-shrink-0 ${isLightMode
                        ? 'bg-neutral-100 border-black/10 text-neutral-600'
                        : 'bg-black/80 border-white/10 text-neutral-400'
                        }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      </div>

                      <div className="flex items-center gap-1.5 opacity-90">
                        <Lock className="w-2.5 h-2.5 text-emerald-500" />
                        <span className="truncate max-w-[260px] font-mono text-[10px] text-neutral-400">
                          relaycapture.com/#{section.id}
                        </span>
                      </div>

                      <span
                        className={`text-[9px] font-bold uppercase font-mono ${isCenter ? 'text-emerald-500' : 'text-neutral-400'
                          }`}
                      >
                        {String(idx + 1).padStart(2, '0')} // LIVE STREAM
                      </span>
                    </div>

                    {/* Desktop Live Section Screen Body - Scaled with Lazy Mounting */}
                    <div className="flex-1 overflow-hidden relative w-full h-full bg-inherit">
                      {shouldRenderLive ? (
                        <ScaledLiveSectionRenderer
                          sectionId={section.id}
                          isLightMode={isLightMode}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center select-none opacity-40">
                          <span className="font-mono text-xs uppercase tracking-widest mb-1">
                            {String(idx + 1).padStart(2, '0')} // {section.label.replace(/^\d+\s*\/\/\s*/, '')}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500">
                            Click to jump to section
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * ScaledLiveSectionRenderer
 * Mounts the exact, genuine React section component scaled to fit into the live preview viewport.
 * Uses isLivePreview={true} so backgrounds, canvas elements, and headlines align 100% with the card frame.
 */
function ScaledLiveSectionRenderer({
  sectionId,
  isLightMode,
}: {
  sectionId: string;
  isLightMode?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.58);
  const [unscaledHeight, setUnscaledHeight] = useState(760);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      if (width > 0 && height > 0) {
        // Target standard desktop canvas width of 1240px
        const currentScale = width / 1240;
        setScale(currentScale);
        // Calculate exact unscaled height needed so unscaledHeight * currentScale == container height
        setUnscaledHeight(Math.ceil(height / currentScale));
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const renderLiveComponent = () => {
    switch (sectionId) {
      case 'hero-section':
        return (
          <HeroSection
            isLightMode={!!isLightMode}
            onScanClick={() => { }}
            onExploreClick={() => { }}
            isLivePreview={true}
          />
        );
      case 'domain-checker-section':
        return (
          <DomainCheckerSection
            onScanResult={() => { }}
            isLightMode={!!isLightMode}
            isLivePreview={true}
          />
        );
      case 'financial-leakage':
        return (
          <FinancialLeakage
            scanResult={null}
            isLightMode={!!isLightMode}
            isLivePreview={true}
          />
        );
      case 'inbox-comparison':
        return (
          <InboxComparison
            isLightMode={!!isLightMode}
            isLivePreview={true}
          />
        );
      case 'protocol-feed':
        return (
          <LiveProtocolFeed
            isLightMode={!!isLightMode}
            isLivePreview={true}
          />
        );
      case 'three-cards-section':
        return (
          <ThreeCards
            onSelectTier={() => {}}
            onOpenSampleModal={() => {}}
            isLightMode={!!isLightMode}
            isLivePreview={true}
          />
        );
      case 'faq-section':
        return <FaqSection isLightMode={!!isLightMode} />;
      case 'contact-section':
      default:
        return (
          <FooterContact
            isLightMode={!!isLightMode}
            onNavigateToPricing={() => { }}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-inherit pointer-events-none select-none"
    >
      <div
        className="origin-top-left"
        style={{
          width: '1240px',
          height: `${unscaledHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {renderLiveComponent()}
      </div>
    </div>
  );
}
