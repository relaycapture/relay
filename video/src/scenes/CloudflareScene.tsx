import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { ShieldCheck, Plus, Check, Search, Globe, ChevronDown, CheckCircle2 } from 'lucide-react';

interface CloudflareSceneProps {
  sceneStartFrame: number;
}

export function CloudflareScene({ sceneStartFrame }: CloudflareSceneProps) {
  const frame = useCurrentFrame();
  const sceneFrame = Math.max(0, frame - sceneStartFrame);

  // Animated typing of the DMARC string
  const fullDmarcString = 'v=DMARC1; p=reject; rua=mailto:dmarc@relaycapture.com; sp=reject; pct=100';
  const typeStartFrame = 120; // 2 seconds into Cloudflare scene
  const typeDuration = 240; // 4 seconds typing
  const charsTyped = Math.floor(
    interpolate(sceneFrame, [typeStartFrame, typeStartFrame + typeDuration], [0, fullDmarcString.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const typedDmarcText = fullDmarcString.substring(0, charsTyped);
  const isSaved = sceneFrame >= 480; // After save click at 8s

  return (
    <div className="w-full h-full bg-[#0d0d12] text-white p-8 flex flex-col justify-between select-none">
      {/* Top Cloudflare Navigation Bar */}
      <div>
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Globe className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-sans tracking-tight">apexglobalfreight.com</h1>
                <span className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> ACTIVE ON CLOUDFLARE
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">
                Primary Authoritative DNS • Nameservers: kurt.ns.cloudflare.com / melody.ns.cloudflare.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-neutral-800 border border-white/10 text-xs font-mono text-neutral-300 flex items-center gap-2">
              <Search className="w-3.5 h-3.5" /> Filter records
            </button>
            <div
              id="cloudflare-add-record-btn"
              className={`px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all flex items-center gap-2 shadow-lg ${
                isSaved
                  ? 'bg-emerald-500 text-black border border-emerald-400 shadow-emerald-950/40'
                  : 'bg-amber-500 hover:bg-amber-400 text-black border border-amber-400 shadow-amber-950/40'
              }`}
            >
              {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isSaved ? 'DMARC Record Synced' : 'Add record'}</span>
            </div>
          </div>
        </div>

        {/* Live DMARC Record Editor Row (Target for Camera Zoom & Cursor) */}
        <div
          id="cloudflare-dmarc-editor-row"
          className={`p-6 rounded-2xl border transition-all duration-300 mb-6 relative overflow-hidden ${
            isSaved
              ? 'bg-emerald-950/15 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
              : 'bg-[#15151c] border-amber-500/40 shadow-xl'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
                Authoritative TXT Specification // RFC 7489
              </span>
            </div>
            {isSaved && (
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                PROPAGATED WORLDWIDE (p=reject)
              </span>
            )}
          </div>

          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Record Type Dropdown */}
            <div className="col-span-2 space-y-1">
              <label className="font-mono text-[10px] text-neutral-400 uppercase">Type</label>
              <div className="h-10 px-3 rounded-xl bg-black/60 border border-white/20 flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                <span>TXT</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </div>
            </div>

            {/* Name / Subdomain */}
            <div className="col-span-3 space-y-1">
              <label className="font-mono text-[10px] text-neutral-400 uppercase">Name (required)</label>
              <div className="h-10 px-3 rounded-xl bg-black/60 border border-white/20 flex items-center text-xs font-mono text-white">
                <span className="text-emerald-400 font-bold">_dmarc</span>
                <span className="text-neutral-500 text-[11px]">.apexglobalfreight.com</span>
              </div>
            </div>

            {/* Value / DMARC String */}
            <div className="col-span-5 space-y-1">
              <label className="font-mono text-[10px] text-neutral-400 uppercase">Content / Raw Policy</label>
              <div className="h-10 px-3.5 rounded-xl bg-black/80 border border-emerald-500/50 flex items-center text-xs font-mono text-emerald-300 shadow-inner overflow-hidden">
                <span className="truncate">{typedDmarcText}</span>
                {sceneFrame < typeStartFrame + typeDuration && (
                  <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-0.5" />
                )}
              </div>
            </div>

            {/* TTL & Save Action */}
            <div className="col-span-2 space-y-1 flex flex-col justify-end">
              <label className="font-mono text-[10px] text-neutral-400 uppercase">TTL</label>
              <div className="h-10 px-3 rounded-xl bg-black/60 border border-white/20 flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>Auto</span>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Authoritative DNS Records Table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#111116]">
          <div className="h-9 px-4 bg-[#181820] border-b border-white/10 flex items-center font-mono text-[11px] text-neutral-400 uppercase">
            <span className="w-20">Type</span>
            <span className="w-56">Name</span>
            <span className="flex-1">Content</span>
            <span className="w-28 text-center">Proxy Status</span>
            <span className="w-24 text-right">TTL</span>
          </div>

          <div className="divide-y divide-white/5 font-mono text-xs">
            {/* SPF Row */}
            <div className="h-12 px-4 flex items-center hover:bg-white/[0.02]">
              <span className="w-20 font-bold text-amber-400">TXT</span>
              <span className="w-56 text-neutral-200">@</span>
              <span className="flex-1 text-neutral-300 truncate">v=spf1 include:_spf.google.com include:sendgrid.net -all</span>
              <span className="w-28 text-center text-[10px] text-neutral-500">DNS only</span>
              <span className="w-24 text-right text-neutral-400">Auto</span>
            </div>

            {/* DKIM 2048 Selector Row */}
            <div className="h-12 px-4 flex items-center hover:bg-white/[0.02]">
              <span className="w-20 font-bold text-amber-400">TXT</span>
              <span className="w-56 text-neutral-200 truncate">google._domainkey</span>
              <span className="flex-1 text-neutral-300 truncate">v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0r...</span>
              <span className="w-28 text-center text-[10px] text-neutral-500">DNS only</span>
              <span className="w-24 text-right text-neutral-400">Auto</span>
            </div>

            {/* MX Google Workspace */}
            <div className="h-12 px-4 flex items-center hover:bg-white/[0.02]">
              <span className="w-20 font-bold text-blue-400">MX</span>
              <span className="w-56 text-neutral-200">@</span>
              <span className="flex-1 text-neutral-300 truncate">1 aspmx.l.google.com</span>
              <span className="w-28 text-center text-[10px] text-neutral-500">DNS only</span>
              <span className="w-24 text-right text-neutral-400">Auto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cloudflare Footer Telemetry Strip */}
      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>DNSSEC Active (ECDSA Curve P-256)</span>
        </div>
        <div>Total Queries: 1,489,204 • Fast DNS Cache Hit Rate: 99.8%</div>
      </div>
    </div>
  );
}
