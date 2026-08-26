import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import {
  Inbox,
  AlertOctagon,
  Search,
  SlidersHorizontal,
  Star,
  Square,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Archive,
  Trash2,
  MoreVertical,
  Paperclip,
} from 'lucide-react';

interface GmailSceneProps {
  sceneStartFrame: number;
}

export function GmailScene({ sceneStartFrame }: GmailSceneProps) {
  const frame = useCurrentFrame();
  const sceneFrame = Math.max(0, frame - sceneStartFrame);

  // Transition from Spam to Primary Inbox at 4s into Gmail scene (240 frames)
  const isEnforced = sceneFrame >= 240;

  return (
    <div className="w-full h-full bg-[#111114] text-white flex flex-col justify-between select-none overflow-hidden">
      {/* Top Gmail App Bar */}
      <div className="px-6 py-3 border-b border-white/[0.08] flex items-center justify-between gap-4 bg-[#18181c]">
        {/* Left: Gmail Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          <img src="/gmail-logo.png" alt="Gmail" className="w-6 h-6 object-contain" />
          <span className="font-semibold text-sm tracking-tight text-white">Gmail</span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-4">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full text-xs font-sans bg-white/5 border border-white/10 text-neutral-300">
            <Search className="w-4 h-4 text-neutral-400 shrink-0" />
            <input
              type="text"
              readOnly
              value={isEnforced ? 'in:inbox label:authenticated' : 'in:spam'}
              className="bg-transparent border-none outline-none w-full font-mono text-xs text-white select-none"
            />
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          </div>
        </div>

        {/* Right: Prospect Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-200">Sarah Chen (Prospect)</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-xs">
            SC
          </div>
        </div>
      </div>

      {/* Main Gmail Viewport (Sidebar + Email List) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-56 p-3 border-r border-white/[0.06] flex flex-col gap-1 bg-[#141418] shrink-0 font-sans text-xs">
          <div
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
              isEnforced ? 'bg-white/10 text-white font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4 text-emerald-400" />
              <span>Inbox</span>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-400">{isEnforced ? '1' : '0'}</span>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-400">
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4" />
              <span>Starred</span>
            </div>
          </div>

          <div
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
              !isEnforced ? 'bg-rose-500/15 text-rose-300 font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>Spam</span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-400">{!isEnforced ? '4' : '3'}</span>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl text-neutral-400">
            <div className="flex items-center gap-3">
              <Trash2 className="w-4 h-4" />
              <span>Trash</span>
            </div>
          </div>
        </div>

        {/* Right Email List View */}
        <div className="flex-1 flex flex-col bg-[#0e0e12] overflow-hidden">
          {/* Subheader Action Bar */}
          <div className="h-10 px-4 border-b border-white/[0.06] flex items-center justify-between text-xs text-neutral-400 bg-[#121217]">
            <div className="flex items-center gap-4">
              <Square className="w-4 h-4 text-neutral-500" />
              <Archive className="w-3.5 h-3.5 hover:text-white" />
              <Trash2 className="w-3.5 h-3.5 hover:text-white" />
              <Mail className="w-3.5 h-3.5 hover:text-white" />
            </div>
            <div className="font-mono text-[11px]">1–25 of 1,842</div>
          </div>

          {/* Email Rows */}
          <div className="flex-1 divide-y divide-white/[0.04] overflow-y-auto">
            {/* Target Email: Steve Miller Proposal */}
            <div
              id="gmail-steve-email-row"
              className={`p-4 transition-all duration-500 flex flex-col gap-2 ${
                isEnforced
                  ? 'bg-emerald-950/20 border-l-4 border-emerald-500 shadow-lg'
                  : 'bg-rose-950/20 border-l-4 border-rose-500'
              }`}
            >
              {/* Top Warning Banner (Only in Spam state) */}
              {!isEnforced && (
                <div className="p-3 rounded-xl bg-rose-900/30 border border-rose-500/30 flex items-center justify-between text-xs font-mono text-rose-300">
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 text-rose-400" />
                    <span>Why is this message in spam? Gmail could not verify that it actually came from apexglobalfreight.com.</span>
                  </div>
                  <span className="font-bold uppercase text-[10px] text-rose-400">UNAUTHENTICATED</span>
                </div>
              )}

              {/* Authenticated Pass Banner (In Enforced state) */}
              {isEnforced && (
                <div className="p-3 rounded-xl bg-emerald-900/25 border border-emerald-500/30 flex items-center justify-between text-xs font-mono text-emerald-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Cryptographically verified via RFC 7489 (SPF: pass, DKIM: 2048-bit pass, DMARC: p=reject).</span>
                  </div>
                  <span className="font-bold uppercase text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded-full">
                    100% INBOX LANDING
                  </span>
                </div>
              )}

              {/* Main Email Row Data */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Square className="w-4 h-4 text-neutral-500" />
                  <Star className={`w-4 h-4 ${isEnforced ? 'text-amber-400 fill-amber-400' : 'text-neutral-500'}`} />
                  <span className="font-bold text-white text-sm">Steve Miller</span>
                  <span className="text-neutral-400 text-xs">&lt;s.miller@apexglobalfreight.com&gt;</span>
                </div>
                <div className="flex items-center gap-2">
                  <Paperclip className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono text-xs text-neutral-400">11:24 AM</span>
                </div>
              </div>

              {/* Subject & Snippet */}
              <div className="pl-7 text-xs">
                <span className="font-bold text-white">Q3 Trans-Pacific Ocean Freight proposal & drayage allocation</span>
                <span className="text-neutral-400"> — Hey Sarah, Looking at Vanguard's recent expansion into the Dallas facility...</span>
              </div>
            </div>

            {/* Background Email 1 */}
            <div className="p-4 flex items-center justify-between text-xs opacity-60">
              <div className="flex items-center gap-3">
                <Square className="w-4 h-4 text-neutral-500" />
                <Star className="w-4 h-4 text-neutral-500" />
                <span className="font-medium text-neutral-300">DocuSign Trust Center</span>
                <span className="text-neutral-400">Completed: Master Service Agreement (signed by Legal)</span>
              </div>
              <span className="font-mono text-xs text-neutral-500">Aug 21</span>
            </div>

            {/* Background Email 2 */}
            <div className="p-4 flex items-center justify-between text-xs opacity-40">
              <div className="flex items-center gap-3">
                <Square className="w-4 h-4 text-neutral-500" />
                <Star className="w-4 h-4 text-neutral-500" />
                <span className="font-medium text-neutral-300">Amazon Web Services</span>
                <span className="text-neutral-400">AWS Monthly Billing Invoice: Available for Download</span>
              </div>
              <span className="font-mono text-xs text-neutral-500">Aug 20</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Banner */}
      <div className="p-3 border-t border-white/[0.08] bg-[#121217] flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Google Workspace Enterprise Compliance: 100% Guaranteed</span>
        </div>
        <div className="text-neutral-500">End-to-End Encryption: TLS 1.3</div>
      </div>
    </div>
  );
}
