'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Cloud, KeyRound, Radio, CheckCircle2 } from 'lucide-react';

interface TopologyNode {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  status: string;
  icon: React.ComponentType<{ className?: string }>;
  spec: {
    protocol: string;
    detail: string;
    record: string;
  };
}

const NODES: TopologyNode[] = [
  {
    id: 'node-client',
    step: '01',
    title: 'Client Domain',
    subtitle: 'Pre-registered in customer registrar',
    status: 'OWNED BY CLIENT',
    icon: Globe,
    spec: {
      protocol: 'REGISTRAR APEX',
      detail: 'Registered under customer legal entity. 0% vendor custody.',
      record: 'NS ns1.cloudflare.com / ns2.cloudflare.com',
    },
  },
  {
    id: 'node-edge',
    step: '02',
    title: 'Delegated Cloudflare Zone',
    subtitle: 'Isolated DNS edge environment',
    status: 'EDGE RESOLVED',
    icon: Cloud,
    spec: {
      protocol: 'DNS-OVER-HTTPS ANYCAST',
      detail: 'Direct DNS delegation. Automatic root propagation with zero TTL lag.',
      record: 'CNAME track.domain.com -> edge.relay.delivery',
    },
  },
  {
    id: 'node-tenant',
    step: '03',
    title: 'Isolated Tenant / 2048-bit DKIM',
    subtitle: 'Google Workspace / M365 Parent Tenant',
    status: 'CRYPTO ENFORCED',
    icon: KeyRound,
    spec: {
      protocol: 'RFC 6376 / RFC 7208',
      detail: '2048-bit RSA key selector generated uniquely per sending inbox.',
      record: 'TXT relay._domainkey.domain.com "v=DKIM1; k=rsa; p=MIIBIj..."',
    },
  },
  {
    id: 'node-sequencer',
    step: '04',
    title: 'Sequencer Handshake',
    subtitle: 'Smartlead / Instantly API integration',
    status: 'VERIFIED',
    icon: Radio,
    spec: {
      protocol: 'API HANDSHAKE',
      detail: 'Automated SMTP/IMAP OAuth token exchange. Custom tracking domain aligned.',
      record: 'STATUS: 200 OK · Inboxes Warmup Ready',
    },
  },
];

export function RoutingTopologySchematic() {
  const [activeNodeId, setActiveNodeId] = useState<string>('node-tenant');

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[2];

  return (
    <div className="w-full rounded-[4px] border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-left">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/[0.06] font-mono text-[10px] tracking-widest uppercase text-neutral-400">
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
          <span className="font-medium">DOMAIN ROUTING TOPOLOGY</span>
        </div>
        <span className="text-neutral-500 hidden sm:inline">SCHEMATIC // RFC_ALIGNED</span>
      </div>

      {/* Interactive Node Flow */}
      <div className="space-y-2">
        {NODES.map((node, index) => {
          const isActive = node.id === activeNodeId;
          const Icon = node.icon;

          return (
            <div key={node.id} className="relative">
              {/* Connector line between nodes */}
              {index < NODES.length - 1 && (
                <div
                  className="absolute left-[19px] top-[38px] w-[1px] h-[14px] bg-white/[0.12] z-0"
                  aria-hidden="true"
                >
                  <motion.div
                    animate={{ y: [0, 14], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: index * 0.4 }}
                    className="w-[2px] -left-[0.5px] h-[4px] bg-white absolute"
                  />
                </div>
              )}

              {/* Node Card */}
              <button
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={`w-full relative z-10 text-left transition-all duration-200 rounded-[2px] border p-2.5 sm:p-3 flex items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-white/[0.04] border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                    : 'bg-black/30 border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Step Icon with Status Halo */}
                  <div
                    className={`w-7 h-7 rounded-[2px] flex items-center justify-center border shrink-0 transition-colors ${
                      isActive
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-neutral-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-500">{node.step}</span>
                      <span className="font-medium text-xs sm:text-sm text-neutral-200 tracking-tight">
                        {node.title}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-normal leading-tight hidden sm:block">
                      {node.subtitle}
                    </div>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-white shrink-0">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse" />
                  <span className="hidden md:inline">{node.status}</span>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Node Live Record Inspector */}
      <div className="mt-4 pt-3.5 border-t border-white/[0.06] bg-black/40 rounded-[2px] p-3 border border-white/[0.04]">
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 mb-1.5">
          <span className="text-white font-semibold">{activeNode.spec.protocol}</span>
          <span className="text-neutral-500">LIVE SPECIFICATION</span>
        </div>
        <div className="text-xs text-neutral-300 font-sans mb-2 leading-relaxed">
          {activeNode.spec.detail}
        </div>
        <div className="p-2 rounded-[2px] bg-black/70 border border-white/[0.06] font-mono text-[11px] text-neutral-300 overflow-x-auto whitespace-nowrap">
          <span className="text-neutral-500 mr-2 select-none">$</span>
          {activeNode.spec.record}
        </div>
      </div>
    </div>
  );
}
