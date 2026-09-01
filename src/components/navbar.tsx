'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Zap } from 'lucide-react';
import { openPaddleCheckout, PADDLE_CONFIG } from '../utils/paddle';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLightMode: boolean;
  isHidden?: boolean;
  isQuickNavOpen?: boolean;
}

export function Navbar({
  currentView,
  onNavigate,
  isLightMode,
  isHidden = false,
  isQuickNavOpen = false,
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

  const handleDeployBuildout = () => {
    openPaddleCheckout(PADDLE_CONFIG.prices.turnkey, 'Turnkey Remediation ($547)');
  };

  return (
    <header
      className={`fixed top-3 sm:top-5 left-3 sm:left-5 z-40 transition-all duration-300 ${
        isHidden ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="relative">
        <div
          className={`rc-grain-surface flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-md select-none ${
            isLightMode
              ? 'bg-[#fbfbfd]/90 border-black/10 text-[#1d1d1f]'
              : 'bg-[#121216]/90 border-white/10 text-white'
          }`}
        >
          {/* 1. Geometric Logo (Toggles drop menu when scrolled) */}
          <button
            data-cursor="grow"
            onClick={() => {
              if (isScrolled) {
                setIsDropdownOpen(!isDropdownOpen);
              } else {
                onNavigate('home');
              }
            }}
            className={`group p-1.5 sm:p-2 rounded-full transition-transform ${
              isScrolled ? 'hover:scale-105 active:scale-95' : 'hover:scale-105'
            }`}
            aria-label={isScrolled ? 'Open navigation menu' : 'Relay Capture Home'}
          >
            {/* Minimal Double Chevron Geometric Icon */}
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 sm:w-5 sm:h-5 block"
              animate={{
                rotate: isScrolled ? 180 : isQuickNavOpen ? 0 : -14,
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
                animate={{
                  d:
                    isQuickNavOpen && !isScrolled
                      ? 'M 4 2.5 L 8 2.5 L 8 17.5 L 4 17.5 Z'
                      : 'M 10 1.5 L 10.2 1.5 L 10.2 18.5 L 2 18.5 Z',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              />
              {/* Right Bar */}
              <motion.path
                fill="currentColor"
                className={
                  isLightMode
                    ? 'text-[#1d1d1f] group-hover:text-black transition-colors duration-200'
                    : 'text-white group-hover:text-neutral-200 transition-colors duration-200'
                }
                animate={{
                  d:
                    isQuickNavOpen && !isScrolled
                      ? 'M 12 2.5 L 16 2.5 L 16 17.5 L 12 17.5 Z'
                      : 'M 9.8 1.5 L 10 1.5 L 18 18.5 L 9.8 18.5 Z',
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              />
            </motion.svg>
          </button>

          {/* 2. Expanded Links Row: PRICING, CONTACT, and DEPLOY BUILDOUT CTA */}
          <AnimatePresence initial={false}>
            {!isScrolled && (
              <motion.div
                key="expanded-nav-links"
                initial={{ opacity: 0, width: 0, scale: 0.95 }}
                animate={{ opacity: 1, width: 'auto', scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.95 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 sm:gap-1.5 overflow-hidden pr-1"
              >
                {/* Pricing */}
                <button
                  id="nav-btn-pricing"
                  data-cursor="grow"
                  onClick={() => onNavigate('pricing')}
                  className={`rc-grain-surface text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap leading-none flex items-center justify-center ${
                    currentView === 'pricing'
                      ? isLightMode
                        ? 'text-black bg-neutral-200/80 font-bold'
                        : 'text-white bg-white/15 font-bold'
                      : isLightMode
                        ? 'text-neutral-700 hover:text-black hover:bg-neutral-200/60'
                        : 'text-neutral-400 hover:text-[#F4F4F2] hover:bg-white/10'
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
                  className={`rc-grain-surface text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-200 px-2.5 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap leading-none flex items-center justify-center ${
                    isLightMode
                      ? 'text-neutral-700 hover:text-black hover:bg-neutral-200/60'
                      : 'text-neutral-400 hover:text-[#F4F4F2] hover:bg-white/10'
                  }`}
                  aria-label="Navigate to Contact"
                >
                  CONTACT
                </button>

                {/* Deploy Buildout CTA */}
                <button
                  id="nav-btn-deploy-buildout"
                  data-cursor="grow"
                  onClick={handleDeployBuildout}
                  className={`rc-grain-surface text-[10px] sm:text-xs font-mono tracking-wider transition-all duration-200 px-3.5 sm:px-4 py-1.5 rounded-full whitespace-nowrap leading-none flex items-center justify-center gap-1.5 font-semibold border shadow-sm ${
                    isLightMode
                      ? 'bg-[#1d1d1f] hover:bg-black text-white border-black/20'
                      : 'bg-white hover:bg-neutral-200 text-[#0a0a0c] border-white/30'
                  }`}
                  aria-label="Deploy Buildout CTA"
                >
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span>Deploy Buildout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small Minimalistic Dropdown Menu when scrolled */}
        <AnimatePresence>
          {isScrolled && isDropdownOpen && (
            <motion.div
              key="nav-dropdown-menu"
              initial={{ opacity: 0, y: -6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-full left-0 mt-2 min-w-[170px] p-1.5 rounded-2xl border shadow-2xl backdrop-blur-2xl rc-grain-surface z-50 flex flex-col gap-0.5 select-none ${
                isLightMode
                  ? 'bg-[#f4f4f2]/95 border-black/10 text-neutral-800'
                  : 'bg-[#0e0e12]/95 border-white/10 text-neutral-200'
              }`}
            >
              <button
                id="nav-dropdown-pricing"
                onClick={() => {
                  setIsDropdownOpen(false);
                  onNavigate('pricing');
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${
                  isLightMode
                    ? 'hover:bg-black/5 hover:text-black text-neutral-700'
                    : 'hover:bg-white/10 hover:text-white text-neutral-300'
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
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors flex items-center justify-between ${
                  isLightMode
                    ? 'hover:bg-black/5 hover:text-black text-neutral-700'
                    : 'hover:bg-white/10 hover:text-white text-neutral-300'
                }`}
              >
                <span>CONTACT</span>
                <ArrowRight className="w-3 h-3 opacity-40" />
              </button>

              <button
                id="nav-dropdown-deploy-buildout"
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleDeployBuildout();
                }}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider font-semibold transition-colors flex items-center justify-between mt-0.5 ${
                  isLightMode
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <span>Deploy Buildout</span>
                <ArrowUpRight className="w-3 h-3 opacity-70" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
