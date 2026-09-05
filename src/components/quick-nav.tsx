'use client'

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSection } from './sections/hero-section';
import { DomainCheckerSection } from './sections/domain-checker-section';
import { CryptographicBaseline } from './sections/cryptographic-baseline';
import { HowItWorks } from './sections/how-it-works';
import { PostInvoiceTimeline } from './sections/post-invoice-timeline';
import { ArchitectureComparison } from './sections/architecture-comparison';
import { PreOrderChecklist } from './sections/pre-order-checklist';
import { FleetPricing } from './sections/fleet-pricing';
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
      const nextIdx = Math.min(sections.length - 1, currentPreviewIndex + 1);
      setHoveredSectionId(sections[nextIdx].id);
    } else if (e.deltaY < -15) {
      const prevIdx = Math.max(0, currentPreviewIndex - 1);
      setHoveredSectionId(sections[prevIdx].id);
    }
  };

  const CARD_HEIGHT = 450;
  const CARD_GAP = 24;
  const STRIDE = CARD_HEIGHT + CARD_GAP;

  return (
    <>
      {/* 1. Full Website Grainy Blur Backdrop */}
      <div
        id="quick-nav-grainy-backdrop"
        aria-hidden="true"
        className={`fixed inset-0 z-[38] pointer-events-none transition-all duration-350 ease-out ${
          isNear ? 'opacity-100' : 'opacity-0 pointer-events-none'
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

      {/* 2. LEFT SIDE: Quick-Nav List */}
      <div
        ref={leftNavRef}
        id="section-quick-nav-left"
        onMouseEnter={() => setIsNear(true)}
        onWheel={handleWheel}
        aria-label="Interactive Section Quick Navigation"
        className={`hidden md:flex fixed left-8 bottom-8 z-[45] flex-col select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
          isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
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

        {/* EXPANDED HOVER STATE: Machined Obsidian Glass Panel */}
        {isNear && (
          <div className="flex flex-col gap-0.5 animate-fade-in p-3 bg-[#08080a]/92 border border-white/[0.1] backdrop-blur-2xl rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_48px_rgba(0,0,0,0.85)] min-w-[270px]">
            <div className="mb-2 pb-2 border-b border-white/[0.07] flex items-center justify-between text-[11px] font-mono tracking-widest text-neutral-400 uppercase select-none">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-white font-medium">DIRECTORY</span>
              </div>
              <span className="text-neutral-500 text-[10px]">10 SECTIONS</span>
            </div>

            {sections.map((section, index) => {
              const isSelected = currentPreviewId === section.id;
              const numStr = String(index + 1).padStart(2, '0');
              const cleanLabel = section.label.replace(/^\d+\s*\/\/\s*/, '');

              return (
                <button
                  key={section.id}
                  id={`quick-nav-btn-${section.id}`}
                  onClick={() => handleSelect(section.id)}
                  onMouseEnter={() => setHoveredSectionId(section.id)}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-[2px] text-left bg-transparent border-0 outline-none cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-white/[0.08] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isSelected ? 'text-white font-semibold' : 'text-neutral-500'
                      }`}
                    >
                      {numStr}
                    </span>
                    <span
                      className={`font-mono text-xs tracking-tight ${
                        isSelected ? 'text-white font-medium' : 'text-neutral-300'
                      }`}
                    >
                      {cleanLabel}
                    </span>
                  </div>

                  {isSelected && (
                    <ArrowRight className="w-3.5 h-3.5 text-white/80 shrink-0" />
                  )}
                </button>
              );
            })}

            <div className="mt-2 pt-2 border-t border-white/[0.07] text-[10px] font-mono text-neutral-500 text-center select-none">
              CLICK TO NAVIGATE · SCROLL TO CYCLE
            </div>
          </div>
        )}
      </div>

      {/* 3. RIGHT SIDE: Floating Desktop-Ratio Viewport Carousel */}
      {isNear && (
        <div
          ref={carouselContainerRef}
          id="quick-nav-preview-viewport-carousel"
          onWheel={handleWheel}
          className="hidden md:block fixed right-6 lg:right-10 top-3 bottom-3 w-[620px] lg:w-[720px] xl:w-[780px] z-[45] pointer-events-auto overflow-hidden animate-fade-in select-none"
          style={{ transform: 'translateZ(0)', willChange: 'transform' }}
        >
          <div className="w-full h-full relative overflow-hidden">
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
                    className={`w-full rounded-[3px] border transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col ${
                      isCenter
                        ? 'scale-100 shadow-2xl z-20'
                        : isAdjacent
                          ? 'scale-[0.94] shadow-lg z-10 hover:scale-[0.96]'
                          : 'scale-[0.88] z-0'
                    }`}
                    style={{
                      height: `${CARD_HEIGHT}px`,
                      marginBottom: `${CARD_GAP}px`,
                      opacity: 1,
                      backgroundColor: '#08080a',
                      borderColor: isCenter
                        ? 'rgba(255, 255, 255, 0.22)'
                        : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: isCenter
                        ? '0 24px 64px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                        : '0 12px 32px rgba(0, 0, 0, 0.6)',
                      transform: 'translateZ(0)',
                    }}
                  >
                    {/* Precision Telemetry Header */}
                    <div
                      className="h-8 px-4 border-b border-white/[0.08] bg-[#0a0a0c] flex items-center justify-between font-mono text-[10px] text-neutral-400 select-none z-30 flex-shrink-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
                        <span className="text-neutral-300 tracking-wider font-medium">RELAY // ARCHITECTURE VIEWPORT</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 font-mono">
                          [{String(idx + 1).padStart(2, '0')}/10]
                        </span>
                        <span className="text-neutral-300 font-medium tracking-tight uppercase">
                          {section.id.replace(/-/g, '_')}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Live Section Screen Body */}
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
        const currentScale = width / 1240;
        setScale(currentScale);
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
      case 'cryptographic-baseline':
        return <CryptographicBaseline isLightMode={!!isLightMode} isLivePreview={true} />;
      case 'how-it-works':
        return <HowItWorks isLightMode={!!isLightMode} isLivePreview={true} />;
      case 'invoice-settle-timeline':
        return <PostInvoiceTimeline isLightMode={!!isLightMode} isLivePreview={true} />;
      case 'comparison-section':
        return <ArchitectureComparison isLightMode={!!isLightMode} isLivePreview={true} />;
      case 'prerequisites-section':
        return <PreOrderChecklist isLightMode={!!isLightMode} isLivePreview={true} />;
      case 'fleet-pricing-section':
      case 'three-cards-section':
        return (
          <FleetPricing
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
