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
      className={`pt-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11.5px] font-mono leading-relaxed ${
        isLightMode ? 'text-neutral-600' : 'text-neutral-400'
      }`}
    >
      <div className="space-y-1 text-center sm:text-left">
        <div className={isLightMode ? 'text-neutral-900 font-semibold' : 'text-neutral-200 font-medium'}>
          © 2026 Relay Capture. All rights reserved.
        </div>
        <div className="text-xs text-neutral-500">
          Payments Secured by Paddle.
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-500">
          <span>Legal:</span>
          <button
            type="button"
            onClick={onNavigateToTerms}
            data-cursor="grow"
            className={`hover:underline cursor-pointer ${
              isLightMode ? 'text-neutral-700 hover:text-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Terms of Service
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onNavigateToPrivacy}
            data-cursor="grow"
            className={`hover:underline cursor-pointer ${
              isLightMode ? 'text-neutral-700 hover:text-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={onNavigateToRefunds}
            data-cursor="grow"
            className={`hover:underline cursor-pointer ${
              isLightMode ? 'text-neutral-700 hover:text-black' : 'text-neutral-300 hover:text-white'
            }`}
          >
            Refund Policy
          </button>
        </div>

        <div className="sm:border-l sm:pl-6 border-neutral-700/40">
          <span>Contact: </span>
          <a
            href="mailto:sam@relaycapture.com"
            className={`hover:underline font-semibold ${
              isLightMode ? 'text-black' : 'text-white'
            }`}
          >
            sam@relaycapture.com
          </a>
        </div>
      </div>
    </div>
  );
}
