import React from 'react';
import { TopTabBar } from './TopTabBar';
import { ActiveTab } from '../types';

interface BrowserShellProps {
  activeTab: ActiveTab;
  children: React.ReactNode;
}

export function BrowserShell({ activeTab, children }: BrowserShellProps) {
  return (
    <div className="w-[1840px] h-[1000px] mx-auto my-auto rounded-2xl border border-white/15 overflow-hidden flex flex-col bg-[#0b0b10] shadow-[0_30px_90px_rgba(0,0,0,0.85)] relative">
      {/* Top Window Bar + Tabs */}
      <TopTabBar activeTab={activeTab} />

      {/* Main Viewport Content Area */}
      <div className="flex-1 w-full h-full relative overflow-hidden bg-[#0e0e14]">
        {children}
      </div>
    </div>
  );
}
