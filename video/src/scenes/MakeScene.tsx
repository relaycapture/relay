import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { Play, Webhook, FileCode2, MessageSquare, PhoneCall, Sparkles, CheckCircle2, Split } from 'lucide-react';

interface MakeSceneProps {
  sceneStartFrame: number;
}

export function MakeScene({ sceneStartFrame }: MakeSceneProps) {
  const frame = useCurrentFrame();
  const sceneFrame = Math.max(0, frame - sceneStartFrame);

  // Wire snapping animation (at 5.5s into Make scene)
  const snapFrame = 330;
  const isSnapped = sceneFrame >= snapFrame;
  const isRunning = sceneFrame >= 420;

  // Particle flow along bezier curves
  const particleOffset = (sceneFrame * 4) % 200;

  return (
    <div className="w-full h-full bg-[#101017] text-white p-8 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Background Dot Grid Canvas */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Make.com Scenario Controls */}
      <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
            <span className="font-bold font-mono text-purple-400 text-sm">M</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-sans tracking-tight">DMARC Telemetry & Drift Guard</h2>
              <span className="bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                SCENARIO ID: 94821
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-400">
              Live ingest of RUA forensic reports • Instant SMS & Slack dispatch on compliance drift
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-lg ${
              isRunning
                ? 'bg-emerald-500 text-black border border-emerald-400 shadow-emerald-950/40'
                : 'bg-purple-600 hover:bg-purple-500 text-white border border-purple-400/50 shadow-purple-950/40'
            }`}
          >
            {isRunning ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Execution Successful (200 OK)' : 'Run once'}</span>
          </div>
        </div>
      </div>

      {/* Visual Canvas with Flow Nodes & Bezier Connectors */}
      <div className="flex-1 relative my-6 flex items-center justify-center overflow-visible">
        {/* SVG Bezier Cable Connectors */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Node 1 to Node 2 */}
          <path
            d="M 320 280 C 420 280, 480 280, 580 280"
            fill="none"
            stroke="#a855f7"
            strokeWidth="3.5"
            strokeDasharray={isRunning ? '8 8' : 'none'}
            strokeDashoffset={isRunning ? -particleOffset : 0}
            className="transition-all"
          />

          {/* Node 2 to Router Node 3 */}
          <path
            d="M 680 280 C 780 280, 840 280, 940 280"
            fill="none"
            stroke="#a855f7"
            strokeWidth="3.5"
            strokeDasharray={isRunning ? '8 8' : 'none'}
            strokeDashoffset={isRunning ? -particleOffset : 0}
          />

          {/* Router Node 3 to Slack Node 4 (Top Branch) */}
          <path
            d="M 1040 280 C 1140 280, 1180 160, 1280 160"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray={isRunning ? '8 8' : 'none'}
            strokeDashoffset={isRunning ? -particleOffset : 0}
          />

          {/* Router Node 3 to Twilio SMS Node 5 (Bottom Branch - Snaps via Cursor) */}
          <path
            d="M 1040 280 C 1140 280, 1180 400, 1280 400"
            fill="none"
            stroke={isSnapped ? '#f43f5e' : '#4b5563'}
            strokeWidth="3.5"
            strokeDasharray={isSnapped && isRunning ? '8 8' : 'none'}
            strokeDashoffset={isRunning ? -particleOffset : 0}
            className="transition-all duration-300"
          />
        </svg>

        {/* Node 1: Webhook Inbound */}
        <div
          style={{ left: '220px', top: '230px' }}
          className="absolute z-10 flex flex-col items-center gap-2 select-none"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 p-1 shadow-2xl shadow-purple-950/60 border-2 border-purple-400 flex items-center justify-center relative">
            <Webhook className="w-9 h-9 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center justify-center border border-black shadow">
              1
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-200">Custom Webhook</span>
          <span className="font-mono text-[10px] text-neutral-400">/dmarc-rua-stream</span>
        </div>

        {/* Node 2: DMARC XML Parser */}
        <div
          style={{ left: '580px', top: '230px' }}
          className="absolute z-10 flex flex-col items-center gap-2 select-none"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 p-1 shadow-2xl shadow-pink-950/60 border-2 border-pink-400 flex items-center justify-center relative">
            <FileCode2 className="w-9 h-9 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center justify-center border border-black shadow">
              2
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-200">XML Telemetry Parser</span>
          <span className="font-mono text-[10px] text-neutral-400">Extract SPF & DKIM</span>
        </div>

        {/* Node 3: Router */}
        <div
          id="make-router-node"
          style={{ left: '940px', top: '230px' }}
          className="absolute z-10 flex flex-col items-center gap-2 select-none"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 p-1 shadow-2xl shadow-orange-950/60 border-2 border-amber-400 flex items-center justify-center relative">
            <Split className="w-9 h-9 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center justify-center border border-black shadow">
              3
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-200">Compliance Router</span>
          <span className="font-mono text-[10px] text-amber-400">Failure Filter</span>
        </div>

        {/* Node 4: Slack Dispatch */}
        <div
          style={{ left: '1280px', top: '110px' }}
          className="absolute z-10 flex flex-col items-center gap-2 select-none"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-600 to-blue-700 p-1 shadow-2xl shadow-sky-950/60 border-2 border-sky-400 flex items-center justify-center relative">
            <MessageSquare className="w-9 h-9 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center justify-center border border-black shadow">
              4
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-200">Slack Dispatch</span>
          <span className="font-mono text-[10px] text-sky-400">#sec-deliverability</span>
        </div>

        {/* Node 5: Twilio Emergency SMS (Snapping Target for Cursor) */}
        <div
          id="make-twilio-node"
          style={{ left: '1280px', top: '350px' }}
          className={`absolute z-10 flex flex-col items-center gap-2 select-none transition-all duration-300 ${
            isSnapped
              ? 'scale-105 filter drop-shadow-[0_0_25px_rgba(244,63,94,0.5)]'
              : 'scale-100 opacity-70'
          }`}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-600 to-red-700 p-1 shadow-2xl shadow-rose-950/60 border-2 border-rose-400 flex items-center justify-center relative">
            <PhoneCall className="w-9 h-9 text-white" />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold flex items-center justify-center border border-black shadow">
              5
            </div>
          </div>
          <span className="font-mono text-xs font-bold text-neutral-200">Twilio Urgent SMS</span>
          <span className="font-mono text-[10px] text-rose-400">
            {isSnapped ? 'CONNECTED • DRIFT ALERT ACTIVE' : 'Awaiting Connection...'}
          </span>
        </div>
      </div>

      {/* Bottom Telemetry Output Console */}
      <div className="relative z-10 p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between font-mono text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Real-time webhook router listening on 0.0.0.0:443</span>
        </div>
        <div className="text-emerald-400">Payload Status: 100% Validated • 0 Dropouts</div>
      </div>
    </div>
  );
}
