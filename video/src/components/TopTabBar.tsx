import React from 'react';
import { Globe, Cpu, Mail, Lock, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface TopTabBarProps {
  activeTab: ActiveTab;
  onTabChange?: (tab: ActiveTab) => void;
}

export function TopTabBar({ activeTab }: TopTabBarProps) {
  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode; url: string; badge?: string }[] = [
    {
      id: 'cloudflare',
      label: 'Cloudflare DNS',
      icon: <Globe className="w-3.5 h-3.5 text-amber-500" />,
      url: 'dash.cloudflare.com/apexglobalfreight.com/dns/records',
      badge: 'DNS v4',
    },
    {
      id: 'make',
      label: 'Make.com Telemetry',
      icon: <Cpu className="w-3.5 h-3.5 text-purple-400" />,
      url: 'us1.make.com/scenarios/94821/dmarc-drift-router',
      badge: 'WEBHOOK',
    },
    {
      id: 'gmail',
      label: 'Gmail (Sarah Chen)',
      icon: <Mail className="w-3.5 h-3.5 text-rose-500" />,
      url: 'mail.google.com/mail/u/0/#inbox',
      badge: 'PROSPECT',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="w-full select-none bg-[#121217] border-b border-white/[0.08] flex flex-col z-30">
      {/* 1. Top Tab Strip + macOS Traffic Lights */}
      <div className="h-11 px-4 flex items-center justify-between gap-4 border-b border-white/[0.04] bg-[#0c0c10]">
        {/* Left: macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 shadow-sm" />
        </div>

        {/* Center: Active Tab Bar Buttons */}
        <div className="flex items-center gap-1.5 flex-1 max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <div
                key={tab.id}
                className={`flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-[#181820] text-white border-white/15 shadow-md shadow-black/40'
                    : 'bg-transparent text-neutral-400 border-transparent hover:text-neutral-200 hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {tab.icon}
                  <span className="truncate">{tab.label}</span>
                </div>
                {tab.badge && (
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.2 rounded-full uppercase ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/5 text-neutral-500'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Security & Sync Status */}
        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider text-neutral-400 hidden sm:inline">
            TLS 1.3 ENFORCED
          </span>
        </div>
      </div>

      {/* 2. Chrome Address Bar & Breadcrumbs */}
      <div className="h-10 px-4 py-1.5 flex items-center gap-3 bg-[#14141a]">
        <div className="flex-1 flex items-center gap-2.5 px-3 py-1 rounded-xl bg-[#09090d] border border-white/10 text-xs font-mono text-neutral-300">
          <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span className="text-emerald-400">https://</span>
          <span className="text-neutral-200 font-medium truncate">{currentTab.url}</span>
          <div className="ml-auto flex items-center gap-1.5 text-[10px] text-neutral-400">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>2048-BIT SSL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
