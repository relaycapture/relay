'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLightMode: boolean;
  isHidden?: boolean;
  activeSection?: string;
}

export function Navbar({
  currentView,
  onNavigate,
  isLightMode,
  isHidden = false,
  activeSection,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 120) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const frostedGlassContainerStyle: React.CSSProperties = isLightMode
    ? {
        backgroundColor: 'rgba(255, 255, 255, 0.65)',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow:
          '0 8px 30px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      }
    : {
        backgroundColor: 'rgba(10, 10, 12, 0.55)',
        borderColor: 'rgba(255, 255, 255, 0.12)',
        boxShadow:
          '0 12px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      };

  return (
    <header
      className={`fixed top-3 sm:top-5 left-3 sm:left-5 z-40 transition-all duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="relative">
        {/* Blurry Frosted Glass Container */}
        <div
          className={`relative flex items-stretch gap-1 sm:gap-1.5 p-1 rounded-[3px] border backdrop-blur-md sm:backdrop-blur-lg transition-all duration-300 select-none h-9 sm:h-10 ${
            isLightMode ? 'text-[#1d1d1f]' : 'text-white'
          }`}
          style={frostedGlassContainerStyle}
        >

          {/* 1. Geometric Logo (Toggles dropdown menu when scrolled) */}
          <button
            data-cursor="grow"
            onClick={() => {
              if (isScrolled) {
                setIsDropdownOpen(!isDropdownOpen);
              } else {
                onNavigate('home');
              }
            }}
            className="group relative z-10 p-1.5 sm:p-2 rounded-[2px] transition-all hover:bg-white/[0.1] active:scale-95 cursor-pointer flex items-center justify-center"
            aria-label={isScrolled ? 'Open navigation menu' : 'Relay Capture Home'}
          >
            {/* Minimal Double Chevron Geometric Icon (Slightly larger) */}
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6 block"
              animate={{
                rotate: isScrolled ? 180 : -14,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {/* Left Bar */}
              <motion.path
                fill="currentColor"
                className={
                  isLightMode
                    ? 'text-[#1d1d1f] group-hover:text-black transition-colors duration-200'
                    : 'text-white group-hover:text-neutral-200 transition-colors duration-200'
                }
                d="M 10 1.5 L 10.2 1.5 L 10.2 18.5 L 2 18.5 Z"
              />
              {/* Right Bar */}
              <motion.path
                fill="currentColor"
                className={
                  isLightMode
                    ? 'text-[#1d1d1f] group-hover:text-black transition-colors duration-200'
                    : 'text-white group-hover:text-neutral-200 transition-colors duration-200'
                }
                d="M 9.8 1.5 L 10 1.5 L 18 18.5 L 9.8 18.5 Z"
              />
            </motion.svg>
          </button>

          {/* 2. Secondary Links: PRICING & CONTACT (Collapse when scrolled) */}
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="expanded-nav-links"
                initial={{ opacity: 0, width: 0, scale: 0.98 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex items-center gap-1 sm:gap-1.5 overflow-hidden"
              >
                {/* Pricing */}
                <button
                  id="nav-btn-pricing"
                  data-cursor="grow"
                  onClick={() => onNavigate('pricing')}
                  className={`text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-[2px] whitespace-nowrap leading-none flex items-center justify-center cursor-pointer ${
                    currentView === 'pricing' || (currentView === 'landing' && activeSection === 'fleet-pricing-section')
                      ? isLightMode
                        ? 'text-black bg-neutral-200/90 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                        : 'text-white bg-white/20 font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.3)]'
                      : isLightMode
                        ? 'text-neutral-700 hover:text-black hover:bg-black/[0.05]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
                  aria-label="Navigate to Pricing"
                >
                  PRICING
                </button>

                {/* Contact */}
                <button
                  id="nav-btn-contact"
                  data-cursor="grow"
                  onClick={() => onNavigate('contact')}
                  className={`text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-[2px] whitespace-nowrap leading-none flex items-center justify-center cursor-pointer ${
                    currentView === 'landing' && activeSection === 'contact-section'
                      ? isLightMode
                        ? 'text-black bg-neutral-200/90 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]'
                        : 'text-white bg-white/20 font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.3)]'
                      : isLightMode
                        ? 'text-neutral-700 hover:text-black hover:bg-black/[0.05]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.1]'
                  }`}
                  aria-label="Navigate to Contact"
                >
                  CONTACT
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Primary CTA: CONFIGURE FLEET — Teleports to Pre-Order Checklist ("Have These Ready") */}
          <button
            id="nav-btn-configure-fleet"
            data-cursor="grow"
            onClick={() => onNavigate('checklist')}
            className={`relative z-10 self-stretch h-full text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-150 px-3.5 sm:px-4 rounded-[2px] whitespace-nowrap leading-none flex items-center justify-center gap-1 font-semibold border cursor-pointer ${
              isLightMode
                ? 'bg-neutral-900 hover:bg-black text-white border-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.15)]'
                : 'bg-neutral-100 hover:bg-white text-neutral-900 border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_2px_12px_rgba(0,0,0,0.5)]'
            }`}
            aria-label="Configure Fleet CTA"
          >
            <span>Configure Fleet</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>
        </div>

        {/* Scrolled Dropdown Menu for secondary items when logo is clicked */}
        <AnimatePresence>
          {isScrolled && isDropdownOpen && (
            <motion.div
              key="nav-dropdown-menu"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-full left-0 mt-2 min-w-[150px] p-1.5 rounded-[3px] border shadow-2xl backdrop-blur-md sm:backdrop-blur-lg z-50 flex flex-col gap-0.5 select-none overflow-hidden`}
              style={frostedGlassContainerStyle}
            >

              <button
                id="nav-dropdown-home"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate('home');
                }}
                className={`relative z-10 w-full text-left px-3 py-1.5 rounded-[2px] text-xs font-mono tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                  isLightMode
                    ? 'hover:bg-black/[0.06] text-neutral-800'
                    : 'hover:bg-white/[0.12] text-neutral-200'
                }`}
              >
                <span>HOME</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>

              <button
                id="nav-dropdown-pricing"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate('pricing');
                }}
                className={`relative z-10 w-full text-left px-3 py-1.5 rounded-[2px] text-xs font-mono tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                  isLightMode
                    ? 'hover:bg-black/[0.06] text-neutral-800'
                    : 'hover:bg-white/[0.12] text-neutral-200'
                }`}
              >
                <span>PRICING</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>

              <button
                id="nav-dropdown-contact"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate('contact');
                }}
                className={`relative z-10 w-full text-left px-3 py-1.5 rounded-[2px] text-xs font-mono tracking-wider transition-colors flex items-center justify-between cursor-pointer ${
                  isLightMode
                    ? 'hover:bg-black/[0.06] text-neutral-800'
                    : 'hover:bg-white/[0.12] text-neutral-200'
                }`}
              >
                <span>CONTACT</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
