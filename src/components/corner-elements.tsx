'use client'

import { Sun, Moon } from 'lucide-react';

interface CornerElementsProps {
  isLightMode: boolean;
  onToggleTheme: () => void;
  isQuickNavOpen?: boolean;
  showThemeToggle?: boolean;
}

export function CornerElements({
  isLightMode,
  onToggleTheme,
  isQuickNavOpen,
  showThemeToggle = true,
}: CornerElementsProps) {
  return (
    <>
      {/* Top Right: Theme Toggle (Circle background, aligned horizontally with navbar) */}
      <div
        className={`fixed top-3 sm:top-4 right-3 sm:right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showThemeToggle && !isQuickNavOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 -translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <button
          id="corner-theme-toggle"
          data-cursor="grow"
          onClick={onToggleTheme}
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-2xl transition-all duration-200 shadow-md rc-grain-surface ${
            isLightMode
              ? 'bg-[#f4f4f2]/85 hover:bg-[#f4f4f2] border border-black/[0.08] hover:border-black/20 text-neutral-800'
              : 'bg-[#0a0a0c]/80 hover:bg-[#0a0a0c] border border-white/[0.10] hover:border-white/25 text-white/90'
          }`}
          aria-label={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
          title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {isLightMode ? (
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-900" />
          ) : (
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          )}
        </button>
      </div>
    </>
  );
}
