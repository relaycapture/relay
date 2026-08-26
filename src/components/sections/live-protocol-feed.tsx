'use client'

import { useState, useRef, useEffect } from 'react';
import { PROTOCOL_EVENTS } from '../../data/protocol-events';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ProtocolEnforcementEvent } from '../../types';

export function LiveProtocolFeed({
  isLightMode,
  isLivePreview = false,
}: {
  isLightMode?: boolean;
  isLivePreview?: boolean;
}) {
  const [selectedEvent, setSelectedEvent] = useState<ProtocolEnforcementEvent | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Duplicate items for continuous seamless loop
  const duplicatedEvents = [...PROTOCOL_EVENTS, ...PROTOCOL_EVENTS, ...PROTOCOL_EVENTS];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    const sec = sectionRef.current;
    if (!el) return;

    let scrollPos = 0;
    const speed = 1.35; // Smooth continuous transport velocity
    let isVisible = true;

    const step = () => {
      if (el && isVisible) {
        scrollPos += speed;
        const oneThird = el.scrollWidth / 3;
        if (scrollPos >= oneThird) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      if (isVisible) {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);

    // Viewport-gated Intersection Observer
    let observer: IntersectionObserver | null = null;
    if (sec) {
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          const visible = entry?.isIntersecting ?? true;
          if (visible !== isVisible) {
            isVisible = visible;
            if (isVisible) {
              if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
              animFrameRef.current = requestAnimationFrame(step);
            } else if (animFrameRef.current) {
              cancelAnimationFrame(animFrameRef.current);
            }
          }
        },
        { rootMargin: '200px 0px' }
      );
      observer.observe(sec);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="protocol-feed"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 ${
        isLivePreview
          ? 'h-full min-h-full flex flex-col justify-center py-6'
          : 'py-20 sm:py-28 md:py-36 section-content-auto'
      }`}
      style={isLivePreview ? { height: '100%', minHeight: '100%' } : undefined}
    >
      {/* Background Soft Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 z-0" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/3 w-[55vw] h-[35vw] rounded-full blur-[140px] ${
            isLightMode ? 'bg-neutral-200' : 'bg-white/5'
          }`}
        />
      </div>

      <div
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-24 w-full ${
          isLivePreview ? 'mb-4' : 'mb-6 sm:mb-8'
        }`}
      >
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">Global mail standard</span>
            <span className="block">enforcement stream.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            <span className="block">Major inbox providers mandate automated protocol compliance.</span>
            <span className="block">Ongoing transport policy enforcement stream.</span>
          </p>
        </div>
      </div>

      {/* Moving On-Screen Cards Stream - Non-stopping continuous movement */}
      <div className="relative w-full overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-28 pointer-events-none z-20 ${
            isLightMode
              ? 'bg-gradient-to-r from-[#F4F4F2] to-transparent'
              : 'bg-gradient-to-r from-[#0A0A0C] to-transparent'
          }`}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 sm:w-28 pointer-events-none z-20 ${
            isLightMode
              ? 'bg-gradient-to-l from-[#F4F4F2] to-transparent'
              : 'bg-gradient-to-l from-[#0A0A0C] to-transparent'
          }`}
        />

        {/* Continuous Horizontal Scroll Container (Does NOT pause on hover) */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden py-3 px-4 sm:px-8 select-none no-scrollbar cursor-pointer"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedEvents.map((event, idx) => {
            const isMandatory = event.impactLevel === 'Mandatory' || event.impactLevel === 'Critical';
            return (
              <div
                key={`${event.id}-${idx}`}
                data-cursor="grow"
                onClick={() => setSelectedEvent(event)}
                className={`rc-grain-surface w-[260px] sm:w-[290px] h-[220px] sm:h-[230px] flex-shrink-0 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border backdrop-blur-xl transition-transform duration-200 ${
                  isLightMode
                    ? 'bg-white/85 border-black/10 text-[#1d1d1f] shadow-sm'
                    : 'bg-[#101014]/90 border-white/10 text-white shadow-md'
                }`}
              >
                {/* Top Badge & Date */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold border ${
                        event.impactLevel === 'Mandatory'
                          ? isLightMode
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                          : event.impactLevel === 'Critical'
                          ? isLightMode
                            ? 'bg-amber-50 border-amber-200 text-amber-700'
                            : 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                          : isLightMode
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                      }`}
                    >
                      {event.impactLevel}
                    </span>
                    <span className="text-neutral-400 font-mono text-[10px]">{event.date}</span>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide">
                    {event.authority}
                  </div>

                  {/* Title */}
                  <h3 className="font-sans font-semibold text-sm sm:text-base leading-snug tracking-tight line-clamp-1">
                    {event.title}
                  </h3>
                </div>

                {/* Body Description */}
                <p
                  className={`text-[11px] leading-relaxed line-clamp-2 font-mono ${
                    isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
                >
                  {event.description}
                </p>

                {/* Footer RFC Specification & Status */}
                <div className="pt-2.5 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-neutral-400 truncate max-w-[150px]">
                    {event.rfcOrPolicy}
                  </span>
                  <div className="flex items-center gap-1 font-semibold text-emerald-500 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>ENFORCED</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Modal if Card Clicked */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className={`rc-grain-surface max-w-lg w-full rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4 animate-scale-in ${
              isLightMode ? 'bg-white text-black border-black/15' : 'bg-[#121216] text-white border-white/20'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 uppercase">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>{selectedEvent.authority}</span>
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-xs font-mono px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 hover:opacity-80"
              >
                CLOSE
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400">Effective: {selectedEvent.date}</span>
              <h3 className="text-xl font-bold tracking-tight">{selectedEvent.title}</h3>
              <p className="text-xs sm:text-sm font-mono leading-relaxed text-neutral-400">
                {selectedEvent.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 space-y-1 font-mono text-xs">
              <div className="text-neutral-400 uppercase text-[10px]">Mandated Specification:</div>
              <div className="text-emerald-500 font-semibold text-xs">{selectedEvent.rfcOrPolicy}</div>
            </div>

            <button
              onClick={() => setSelectedEvent(null)}
              className={`w-full py-2.5 rounded-xl font-sans font-medium text-xs tracking-wide transition-all ${
                isLightMode ? 'bg-black text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-neutral-200'
              }`}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
