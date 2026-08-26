'use client'

interface SectionDividerProps {
  isLightMode?: boolean;
}

export function SectionDivider({ isLightMode }: SectionDividerProps) {
  return (
    <div
      className="relative w-full h-16 sm:h-24 my-3 sm:my-6 pointer-events-none z-20 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className={`w-3/4 max-w-4xl h-px transition-colors duration-300 ${
          isLightMode
            ? 'bg-gradient-to-r from-transparent via-black/[0.08] to-transparent'
            : 'bg-gradient-to-r from-transparent via-white/[0.08] to-transparent'
        }`}
      />
    </div>
  );
}
