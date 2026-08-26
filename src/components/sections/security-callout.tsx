'use client'

import { ShieldCheck, Lock, EyeOff, Server } from 'lucide-react';

export function SecurityCallout({ isLightMode }: { isLightMode?: boolean }) {
  return (
    <section
      id="security-callout"
      className="relative z-20 py-6 sm:py-8 px-4 sm:px-8 md:px-12 lg:px-24 max-w-5xl mx-auto w-full"
    >
      <div
        className={`p-6 sm:p-7 rounded-2xl backdrop-blur-xl border transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg ${
          isLightMode
            ? 'bg-white/80 border-black/10 text-neutral-800'
            : 'bg-[#101014]/80 border-white/10 text-neutral-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border ${
              isLightMode
                ? 'bg-black/5 text-black border-black/10'
                : 'bg-white/10 text-white border-white/15'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-mono text-xs uppercase tracking-wider font-semibold ${
                  isLightMode ? 'text-black' : 'text-white'
                }`}
              >
                ZERO CREDENTIAL ACCESS ARCHITECTURE
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[10px] uppercase border ${
                  isLightMode ? 'bg-black/5 border-black/10 text-neutral-700' : 'bg-white/10 border-white/15 text-neutral-300'
                }`}
              >
                100% Privacy Enforced
              </span>
            </div>
            <p className={`text-sm sm:text-base leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
              Every diagnostic runs exclusively against public DNS and authoritative nameserver records. <strong className={isLightMode ? 'text-black' : 'text-white'}>No inbox, email content, or customer data is ever accessed, parsed, or stored.</strong>
            </p>
          </div>
        </div>

        {/* Feature pillars */}
        <div
          className={`flex flex-wrap md:flex-col gap-2.5 flex-shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 md:border-l md:pl-6 text-xs font-mono ${
            isLightMode ? 'border-black/10 text-neutral-600' : 'border-white/10 text-neutral-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Lock className={`w-3.5 h-3.5 ${isLightMode ? 'text-black' : 'text-white'}`} />
            <span>No OAuth or IMAP login</span>
          </div>
          <div className="flex items-center gap-2">
            <EyeOff className={`w-3.5 h-3.5 ${isLightMode ? 'text-black' : 'text-white'}`} />
            <span>Zero message inspection</span>
          </div>
          <div className="flex items-center gap-2">
            <Server className={`w-3.5 h-3.5 ${isLightMode ? 'text-black' : 'text-white'}`} />
            <span>RFC 1035 / DoH Public Only</span>
          </div>
        </div>
      </div>
    </section>
  );
}
