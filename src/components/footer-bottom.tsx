'use client'

interface FooterBottomProps {
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function FooterBottom({
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: FooterBottomProps) {
  return (
    <div
      className={`pt-10 border-t flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono ${
        isLightMode ? 'border-black/10 text-neutral-500' : 'border-white/10 text-neutral-400'
      }`}
    >
      <div className="space-y-1 text-center sm:text-left">
        <div>© 2026 Relay Capture. All rights reserved. Cloudflare DNS over HTTPS.</div>
        <div>PCI-DSS compliant checkout provided by Paddle.</div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
        <button
          type="button"
          onClick={onNavigateToTerms}
          data-cursor="grow"
          className={`py-2 px-1 min-h-[44px] flex items-center hover:underline transition-colors cursor-pointer ${
            isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Terms
        </button>
        <button
          type="button"
          onClick={onNavigateToPrivacy}
          data-cursor="grow"
          className={`py-2 px-1 min-h-[44px] flex items-center hover:underline transition-colors cursor-pointer ${
            isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Privacy
        </button>
        <button
          type="button"
          onClick={onNavigateToRefunds}
          data-cursor="grow"
          className={`py-2 px-1 min-h-[44px] flex items-center hover:underline transition-colors cursor-pointer ${
            isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
          }`}
        >
          Refunds
        </button>
      </div>
    </div>
  );
}
