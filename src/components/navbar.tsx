'use client'

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CurrentView } from '../types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: CurrentView;
  onNavigate: (target: 'home' | 'pricing' | 'contact' | 'checker') => void;
  isLightMode: boolean;
  isHidden?: boolean;
  isQuickNavOpen?: boolean;
}

export function Navbar({
  currentView,
  onNavigate,
  isLightMode,
  isHidden,
  isQuickNavOpen,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop;
          const scrolled = y > 24;
          setIsScrolled(scrolled);
          if (!scrolled) {
            setIsDropdownOpen(false);
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const handleLogoClick = () => {
    if (isScrolled) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      onNavigate('home');
    }
  };

  return (
    <header
      className={`fixed top-3 sm:top-4 left-3 sm:left-6 z-50 flex items-center pointer-events-none transition-all duration-300 ease-out ${isHidden ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
    >
      <div ref={dropdownRef} className="relative pointer-events-auto flex flex-col items-start">
        {/* Main Floating Navbar Pill - Aligned to Top-Left */}
        <div
          id="main-navbar-pill"
          className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border shadow-2xl rc-grain-surface backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[44px] select-none"
          style={{
            backgroundColor: isLightMode ? 'rgba(244, 244, 242, 0.85)' : 'rgba(10, 10, 12, 0.80)',
            borderColor: isLightMode ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.10)',
            boxShadow: isLightMode
              ? '0 8px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'
              : '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* 1. [Logo] Triangle Button (Rotates pointing straight at bottom when scrolled) */}
          <button
            id="nav-btn-logo"
            data-cursor="grow"
            onClick={handleLogoClick}
            className={`group flex items-center justify-center p-1.5 sm:p-2 rounded-full transition-all duration-200 focus:outline-none ${isScrolled && isDropdownOpen
              ? isLightMode ? 'bg-black/10' : 'bg-white/15'
              : 'hover:scale-105'
              }`}
            aria-label={isScrolled ? "Open navigation menu" : "Relay Capture Home"}
            title={isScrolled ? "Menu" : "Relay Capture"}
          >
            <motion.svg
              viewBox="0 0 20 20"
              className="w-5 h-5 sm:w-5.5 sm:h-5.5 overflow-visible"
              animate={{
                rotate: isScrolled ? 180 : isQuickNavOpen ? 0 : -14,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              {/* Left Bar / Left Triangle Facet */}
              <motion.path
                fill="currentColor"
                className={
                  isLightMode
                    ? 'text-[#1d1d1f] group-hover:text-black transition-colors duration-200'
                    : 'text-white group-hover:text-neutral-200 transition-colors duration-200'
                }
                animate={{
                  d: isQuickNavOpen && !isScrolled
                    ? 'M 4 2.5 L 8 2.5 L 8 17.5 L 4 17.5 Z'
                    : 'M 10 1.5 L 10.2 1.5 L 10.2 18.5 L 2 18.5 Z',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              />
              {/* Right Bar / Right Triangle Facet */}
              <motion.path
                fill="currentColor"
                className={
                  isLightMode
                    ? 'text-[#1d1d1f] group-hover:text-black transition-colors duration-200'
                    : 'text-white group-hover:text-neutral-200 transition-colors duration-200'
                }
                animate={{
                  d: isQuickNavOpen && !isScrolled
                    ? 'M 12 2.5 L 16 2.5 L 16 17.5 L 12 17.5 Z'
                    : 'M 9.8 1.5 L 10 1.5 L 18 18.5 L 9.8 18.5 Z',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              />
            </motion.svg>
          </button>

          {/* 2. [Contact] & [Pricing] (Collapses smoothly on scroll from right to left) */}
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="expanded-nav-links"
                initial={{ opacity: 0, width: 0, scale: 0.95 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.95 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 overflow-hidden"
              >
                {/* Contact */}
                <button
                  id="nav-btn-contact"
                  data-cursor="grow"
                  onClick={() => onNavigate('contact')}
                  className={`rc-grain-surface text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap leading-none flex items-center justify-center ${isLightMode
                    ? 'text-neutral-700 hover:text-black hover:bg-neutral-200/60'
                    : 'text-neutral-400 hover:text-[#F4F4F2] hover:bg-white/10'
                    }`}
                  aria-label="Navigate to Contact"
                >
                  CONTACT
                </button>

                {/* Pricing */}
                <button
                  id="nav-btn-pricing"
                  data-cursor="grow"
                  onClick={() => onNavigate(currentView === 'pricing' ? 'home' : 'pricing')}
                  className={`rc-grain-surface text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-full flex items-center justify-center gap-1 whitespace-nowrap leading-none ${currentView === 'pricing'
                    ? isLightMode
                      ? 'text-black bg-black/10 font-bold'
                      : 'text-white bg-white/15 font-bold'
                    : isLightMode
                      ? 'text-neutral-700 hover:text-black hover:bg-neutral-200/60'
                      : 'text-neutral-400 hover:text-[#F4F4F2] hover:bg-white/10'
                    }`}
                  aria-label="Navigate to Pricing"
                >
                  <span>{currentView === 'pricing' ? 'OVERVIEW' : 'PRICING'}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. [Check Domain (CTA)] Button (Magnetic disabled) */}
          <button
            id="nav-btn-cta"
            data-cursor="grow"
            onClick={() => onNavigate('checker')}
            className={`rc-grain-surface relative group px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans font-semibold text-[10.5px] sm:text-xs tracking-tight transition-all duration-200 flex items-center gap-1 shadow-sm whitespace-nowrap leading-none ${isLightMode
              ? 'bg-[#1d1d1f] hover:bg-black text-white'
              : 'bg-white hover:bg-neutral-100 text-[#0A0A0C]'
              }`}
            aria-label="Scan Domain CTA"
          >
            <span>{currentView === 'pricing' ? 'RUN SCAN' : 'CHECK DOMAIN'}</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Small Minimalistic Clean Menu (Opened by clicking rotating Logo when scrolled) */}
        <AnimatePresence>
          {isScrolled && isDropdownOpen && (
            <motion.div
              key="nav-dropdown-menu"
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-full left-0 mt-2 min-w-[160px] p-1.5 rounded-2xl border shadow-2xl backdrop-blur-2xl rc-grain-surface z-50 flex flex-col gap-0.5 select-none ${isLightMode
                ? 'bg-[#f4f4f2]/95 border-black/10 text-neutral-800'
                : 'bg-[#0e0e12]/95 border-white/10 text-neutral-200'
                }`}
              style={{
                boxShadow: isLightMode
                  ? '0 16px 40px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)'
                  : '0 16px 40px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.4)',
              }}
            >
              {/* Contact Link */}
              <button
                id="nav-dropdown-contact"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate('contact');
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${isLightMode
                  ? 'hover:bg-black/5 hover:text-black text-neutral-700'
                  : 'hover:bg-white/10 hover:text-white text-neutral-300'
                  }`}
              >
                <span>CONTACT</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>

              {/* Pricing / Overview Link */}
              <button
                id="nav-dropdown-pricing"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate(currentView === 'pricing' ? 'home' : 'pricing');
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${isLightMode
                  ? 'hover:bg-black/5 hover:text-black text-neutral-700'
                  : 'hover:bg-white/10 hover:text-white text-neutral-300'
                  }`}
              >
                <span>{currentView === 'pricing' ? 'OVERVIEW' : 'PRICING'}</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
