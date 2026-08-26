'use client'

import React, { useState } from 'react';
import {
  Search, Lock, HelpCircle, Sparkles, User, Star, ChevronDown,
  BookOpen, Filter, AlertTriangle, Upload, Download, Plus,
  ChevronLeft, ChevronRight, Check, ArrowRight, ShieldAlert,
  ShieldCheck, CheckCircle2, Globe, KeyRound, Mail, AlertOctagon,
  RefreshCw, Copy, ExternalLink, Settings, Home, BarChart2,
  Shield, Zap, Sliders, Cpu, Key, Menu, Grid, Trash2, Paperclip,
  MoreVertical, Inbox, Send, AlertCircle
} from 'lucide-react';

// ───────── Cloudflare Official SVG Cloud Icons ─────────
function CloudflareLogo() {
  return (
    <svg className="w-7 h-7 text-[#f6821f]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  );
}

function OrangeCloudIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#f6821f] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  );
}

function GrayCloudIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  );
}

// ───────── Screen 1: Cloudflare DNS Records Mockup ─────────
function CloudflareDnsMockup() {
  const records = [
    { name: 'mail', type: 'A', content: '192.0.2.1', proxy: 'proxied', ttl: 'Auto' },
    { name: 'track', type: 'CNAME', content: 'custom-tracking.instantly.ai', proxy: 'proxied', ttl: 'Auto' },
    { name: 'www', type: 'CNAME', content: 'cname.vercel-dns.com', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'stevesdomain.com', type: 'MX', content: 'aspmx.l.google.com (Priority: 1)', proxy: 'dns-only', ttl: 'Auto' },
    { name: '_dmarc', type: 'TXT', content: '"v=DMARC1; p=none;"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'google._domainkey', type: 'TXT', content: '"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs0sj..."', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'stevesdomain.com', type: 'TXT', content: '"openai-domain-verification=dv-jebyTLmXcCoeyjbB9ltvwMt5"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'stevesdomain.com', type: 'TXT', content: '"google-site-verification=0efXs4Fd-kX_mZArtflON-0mcY3scqFF1g5TN6-ulJs"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'stevesdomain.com', type: 'TXT', content: '"v=spf1 include:_spf.google.com include:sendgrid.net include:hubspotemail.net include:mailgun.org include:createsend.com include:outreach.io ~all"', proxy: 'dns-only', ttl: 'Auto' },
  ];

  return (
    <div className="h-full flex flex-col bg-white text-[#1d2228] select-none font-sans text-xs">
      {/* Cloudflare App Header */}
      <header className="h-11 border-b border-[#e5e7eb] bg-white px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <CloudflareLogo />
          <Star className="w-3.5 h-3.5 text-neutral-400" />
          <div className="flex items-center gap-1.5 border border-[#e5e7eb] rounded px-2 py-0.5 bg-white text-xs">
            <span className="font-semibold text-[#111827]">stevesdomain.com</span>
            <span className="bg-[#f3f4f6] text-[#6b7280] text-[10px] px-1 py-0.2 rounded font-medium">free</span>
            <span className="text-[8px] text-neutral-400">▼</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#4b5563]">
          <span className="flex items-center gap-1 font-medium text-[#0051c3]">
            <Sparkles className="w-3 h-3" /> Ask AI
          </span>
          <span className="flex items-center gap-1 font-medium text-[#4b5563]">
            <HelpCircle className="w-3 h-3" /> Support
          </span>
          <div className="w-5 h-5 rounded-full bg-[#374151] text-white flex items-center justify-center text-[10px] font-bold">
            S
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Icon Bar */}
        <aside className="w-10 border-r border-[#e5e7eb] bg-white py-2.5 flex flex-col items-center gap-3 text-[#9ca3af] shrink-0 hidden sm:flex">
          <Search className="w-3.5 h-3.5 text-[#9ca3af]" />
          <Home className="w-3.5 h-3.5 text-[#9ca3af]" />
          <div className="p-1 rounded bg-[#0051c3]/10 text-[#0051c3]">
            <Globe className="w-3.5 h-3.5" />
          </div>
          <BarChart2 className="w-3.5 h-3.5 text-[#9ca3af]" />
          <Lock className="w-3.5 h-3.5 text-[#9ca3af]" />
          <Shield className="w-3.5 h-3.5 text-[#9ca3af]" />
          <Zap className="w-3.5 h-3.5 text-[#9ca3af]" />
        </aside>

        {/* Records Table View */}
        <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#111827]">
                DNS records for stevesdomain.com
              </h2>
              <p className="text-[11px] text-[#6b7280]">
                Manage how the Internet finds your web content, verifies services, and routes traffic..
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded border border-[#e5e7eb]">
                DNS Setup: Full
              </span>
              <span className="text-[10px] bg-white text-[#111827] px-2 py-0.5 rounded border border-[#d1d5db] font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#6b7280]" /> Documentation
              </span>
            </div>
          </div>

          {/* Search & Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3 h-3 text-[#9ca3af] absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search DNS Records"
                readOnly
                className="w-full pl-7 pr-2.5 py-1 text-[11px] rounded border border-[#d1d5db] bg-white text-[#111827]"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-1 text-[10px] font-medium text-[#dc2626] bg-white border border-[#fca5a5] rounded flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Display options
              </span>
              <span className="px-2.5 py-1 text-[10px] font-semibold text-white bg-[#0051c3] rounded flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add record
              </span>
            </div>
          </div>

          <div className="text-[11px] text-[#6b7280] mb-1.5">
            You have used <span className="font-bold text-[#111827]">9 of 200</span> available DNS records in this domain.
          </div>

          {/* Table */}
          <div className="rounded border border-[#e5e7eb] bg-white overflow-x-auto shadow-sm">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#e5e7eb] font-semibold text-[#4b5563] text-[10px]">
                  <th className="py-2 px-2.5 w-6"><input type="checkbox" readOnly className="rounded" /></th>
                  <th className="py-2 px-2">Name ⇅</th>
                  <th className="py-2 px-2">Type ▲</th>
                  <th className="py-2 px-2 min-w-[200px]">Content ⓘ</th>
                  <th className="py-2 px-2 min-w-[110px]">Proxy status</th>
                  <th className="py-2 px-2">TTL</th>
                  <th className="py-2 px-2 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6] font-mono text-[10px] text-[#1f2937]">
                {records.map((r, i) => (
                  <tr key={i} className="hover:bg-[#fafafa]">
                    <td className="py-1.5 px-2.5"><input type="checkbox" readOnly className="rounded" /></td>
                    <td className="py-1.5 px-2 font-medium text-[#111827] truncate max-w-[110px]">{r.name}</td>
                    <td className="py-1.5 px-2 font-bold text-[#111827] font-sans">{r.type}</td>
                    <td className="py-1.5 px-2 font-normal text-[#374151] break-all max-w-[260px]">{r.content}</td>
                    <td className="py-1.5 px-2 font-sans">
                      {r.proxy === 'proxied' ? (
                        <div className="inline-flex items-center gap-1 text-[#374151]">
                          <OrangeCloudIcon /> <span>Proxied</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1 text-[#6b7280]">
                          <GrayCloudIcon /> <span>DNS only</span>
                        </div>
                      )}
                    </td>
                    <td className="py-1.5 px-2 font-sans text-[#6b7280]">{r.ttl}</td>
                    <td className="py-1.5 px-2 text-right font-sans">
                      <span className="text-[#0051c3] font-medium cursor-pointer">Edit</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-[10px] text-[#6b7280] mt-2">Showing 1-9 of 9</div>
        </div>
      </div>
    </div>
  );
}

// ───────── Screen 2: Google Admin Mockup ─────────
function GoogleAdminMockup() {
  return (
    <div className="h-full flex flex-col bg-[#f8f9fa] text-[#202124] select-none font-sans text-xs">
      {/* Google Admin Navbar */}
      <header className="h-12 bg-white border-b border-[#dadce0] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-4 h-4 text-[#5f6368]" />
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-[#5f6368]">Google</span>
            <span className="text-sm font-bold text-[#202124]">Admin</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f1f3f4] text-xs text-[#5f6368]">
            <Search className="w-3.5 h-3.5" />
            <span>Search across Google Admin Console</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HelpCircle className="w-4 h-4 text-[#5f6368]" />
          <div className="w-6 h-6 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs">
            A
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-4xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="text-[11px] text-[#5f6368] mb-2 font-medium">
          Apps &gt; Google Workspace &gt; Gmail &gt; Authenticate email
        </div>

        <h1 className="text-xl font-bold text-[#202124] mb-1">
          Authenticate email with DKIM
        </h1>
        <p className="text-xs text-[#5f6368] mb-4">
          To prevent spoofing and help ensure that messages aren&apos;t marked as spam, generate a DKIM key for your sending domain.
        </p>

        {/* Selected Domain Card */}
        <div className="bg-white rounded-lg border border-[#dadce0] p-4 mb-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f1f3f4]">
            <div>
              <span className="text-[11px] text-[#5f6368] block">Selected domain:</span>
              <span className="text-sm font-bold text-[#202124]">stevesdomain.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#5f6368]">Status:</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#b06000] bg-[#fef7e0] border border-[#fce8b2] px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b06000]" /> Not authenticating email
              </span>
            </div>
          </div>

          {/* Key Generation Section */}
          <div className="pt-3 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#202124]">DNS TXT Record Values</span>
              <span className="text-[11px] font-mono text-[#5f6368]">Prefix selector: google._domainkey</span>
            </div>

            <div>
              <span className="text-[10px] text-[#5f6368] block mb-0.5">TXT record name (host):</span>
              <div className="p-2 rounded bg-[#f8f9fa] border border-[#dadce0] font-mono text-xs text-[#202124] flex items-center justify-between">
                <span>google._domainkey.stevesdomain.com</span>
                <Copy className="w-3.5 h-3.5 text-[#5f6368] cursor-pointer" />
              </div>
            </div>

            <div>
              <span className="text-[10px] text-[#5f6368] block mb-0.5">TXT record value (DKIM public key):</span>
              <div className="p-2 rounded bg-[#f8f9fa] border border-[#dadce0] font-mono text-[11px] text-[#137333] break-all leading-relaxed">
                v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0rKx7J2vLp8N0089qXyK67z...
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button className="px-4 py-1.5 rounded bg-[#1a73e8] text-white font-medium text-xs shadow-sm hover:bg-[#1557b0] transition-colors">
                Start Authentication
              </button>
              <button className="px-3 py-1.5 rounded border border-[#dadce0] text-[#1a73e8] font-medium text-xs hover:bg-[#f8f9fa] transition-colors">
                Generate New Record
              </button>
            </div>
          </div>
        </div>

        {/* Warning Callout */}
        <div className="p-3 rounded-lg bg-[#fef7e0] border border-[#fce8b2] text-[11px] text-[#744210] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-[#b06000] shrink-0 mt-0.5" />
          <span>It may take up to 48 hours for DNS changes to propagate. You can start authentication after adding the TXT record in your DNS settings.</span>
        </div>
      </div>
    </div>
  );
}

// ───────── Screen 3: Smartlead.ai Mockup ─────────
function SmartleadMockup() {
  return (
    <div className="h-full flex flex-col bg-[#0b0f19] text-[#e2e8f0] select-none font-sans text-xs">
      {/* Smartlead Header */}
      <header className="h-12 bg-[#111827] border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            S
          </div>
          <span className="font-bold text-sm text-white">Smartlead.ai</span>
          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
            Email Accounts
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-bold">
            Warmup: 40/day
          </span>
          <div className="w-6 h-6 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs">
            SM
          </div>
        </div>
      </header>

      {/* Body Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-4xl mx-auto w-full space-y-4">
        {/* Account Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white">steve@stevesdomain.com</h2>
            <p className="text-[11px] text-neutral-400">Dedicated Cold Outbound Inbox &amp; Tracking Configuration</p>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/40 border border-amber-800/50 px-2.5 py-1 rounded">
            Deliverability: 58% (At Risk)
          </span>
        </div>

        {/* Custom Tracking Domain Warning Card */}
        <div className="p-4 rounded-xl bg-[#1e2230] border border-red-500/30 space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Custom Tracking Domain: SSL Handshake Failed</span>
            </div>
            <span className="text-[10px] font-mono bg-red-950/80 text-red-300 border border-red-800 px-2 py-0.5 rounded font-bold">
              ORANGE CLOUD DETECTED
            </span>
          </div>

          <p className="text-[11px] text-neutral-300 leading-relaxed">
            Target CNAME <span className="font-mono text-white">track.stevesdomain.com ➔ open.sleadtrack.com</span> is currently proxied through Cloudflare CDN. Cloudflare Anycast HTTP proxy is blocking automatic Let&apos;s Encrypt SSL certificate issuance and breaking open/click tracking.
          </p>

          <div className="p-2.5 rounded bg-black/40 border border-white/10 font-mono text-[11px] text-neutral-300 flex items-center justify-between">
            <span>Fix: Switch DNS Proxy Status to &quot;DNS Only&quot; (Grey Cloud) in Cloudflare.</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>

        {/* Outbound Health Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center font-mono">
          <div className="p-3 rounded-lg bg-[#151926] border border-white/10">
            <span className="text-[9px] text-neutral-400 block">ENVELOPE SENDER</span>
            <span className="text-xs font-bold text-red-400">mail-out.smartlead.io</span>
            <span className="text-[9px] text-red-400/80 block mt-0.5">SPF Misaligned</span>
          </div>

          <div className="p-3 rounded-lg bg-[#151926] border border-white/10">
            <span className="text-[9px] text-neutral-400 block">DKIM SELECTOR</span>
            <span className="text-xs font-bold text-amber-400">sl._domainkey</span>
            <span className="text-[9px] text-amber-400/80 block mt-0.5">Unsigned Key</span>
          </div>

          <div className="p-3 rounded-lg bg-[#151926] border border-white/10">
            <span className="text-[9px] text-neutral-400 block">DAILY VOLUME</span>
            <span className="text-xs font-bold text-emerald-400">50 / 50 Sent</span>
            <span className="text-[9px] text-neutral-500 block mt-0.5">Quota Max</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Screen 4: Gmail Inbox Mockup ─────────
function GmailInboxMockup() {
  return (
    <div className="h-full flex flex-col bg-white text-[#202124] select-none font-sans text-xs">
      {/* Gmail Header */}
      <header className="h-12 border-b border-[#e5e7eb] px-4 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <Menu className="w-4 h-4 text-[#5f6368]" />
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#ea4335]" />
            <span className="font-semibold text-sm text-[#202124]">Gmail</span>
          </div>
        </div>

        <div className="flex-1 max-w-sm mx-4 hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f1f3f4] text-xs text-[#5f6368]">
            <Search className="w-3.5 h-3.5" />
            <span>Search mail</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#5f6368] font-medium hidden sm:inline">Sarah Chen</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
            SC
          </div>
        </div>
      </header>

      {/* Main Email View */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-3xl mx-auto w-full space-y-3">
        {/* Yellow Unverified Warning Banner */}
        <div className="p-3 rounded-xl bg-[#fef7e0] border border-[#fce8b2] text-[11px] text-[#744210] flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-[#b06000] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Be careful with this message</span>
            <span>Gmail could not verify that it actually came from stevesdomain.com. Avoid clicking links, downloading attachments, or replying with sensitive info.</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="rounded-xl border border-[#dadce0] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs shrink-0">
                SM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#202124]">Steve Miller</span>
                  <span className="text-[10px] text-[#5f6368]">&lt;steve@stevesdomain.com&gt;</span>
                </div>
                <span className="text-[10px] text-[#5f6368]">to sarah.chen@vanguardindustrial.com</span>
              </div>
            </div>
            <span className="text-[10px] text-[#5f6368]">11:24 AM</span>
          </div>

          <h3 className="font-bold text-sm text-[#202124]">
            Q3 Trans-Pacific Freight Allocation &amp; Drayage Rates
          </h3>

          <p className="text-xs text-[#3c4043] leading-relaxed">
            Hey Sarah, Following up on Vanguard&apos;s recent expansion into the Dallas facility, I wanted to share our updated drayage allocation and ocean freight rates for Q3...
          </p>

          {/* Signature */}
          <div className="pt-3 border-t border-[#f1f3f4] text-[11px] text-[#5f6368] space-y-0.5">
            <div className="font-bold text-[#202124]">Steve Miller</div>
            <div>Founder | Apex Global Logistics</div>
            <div>(555) 123-4567 • steve@stevesdomain.com</div>
          </div>
        </div>

        {/* Raw Header Diagnostic Log */}
        <div className="p-3 rounded-lg bg-[#202124] text-white font-mono text-[10px] space-y-1">
          <div className="text-[#9aa0a6] pb-1 border-b border-neutral-700 font-bold">
            SECURITY HEADER DIAGNOSTIC
          </div>
          <div className="text-red-400">spf: permerror (lookup limit exceeded &gt; 10)</div>
          <div className="text-amber-400">dkim: neutral (unaligned signature)</div>
          <div className="text-red-400">dmarc: fail (p=none) action=MoveToSpam</div>
        </div>
      </div>
    </div>
  );
}

// ───────── Master Safari Deliverability Simulator ─────────
export function DeliverabilitySimulator({ isLightMode }: { isLightMode?: boolean }) {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const SLIDES = [
    {
      id: 'cloudflare',
      name: 'Cloudflare DNS',
      url: 'dash.cloudflare.com/stevesdomain.com/dns/records',
      component: <CloudflareDnsMockup />,
    },
    {
      id: 'google-admin',
      name: 'Google Admin',
      url: 'admin.google.com/ac/apps/gmail/authenticateemail',
      component: <GoogleAdminMockup />,
    },
    {
      id: 'smartlead',
      name: 'Smartlead.ai',
      url: 'app.smartlead.ai/app/email-accounts',
      component: <SmartleadMockup />,
    },
    {
      id: 'gmail',
      name: 'Gmail Inbox',
      url: 'mail.google.com/mail/u/0/#inbox',
      component: <GmailInboxMockup />,
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const currentSlide = SLIDES[activeSlide];

  return (
    <section
      id="demo-section"
      className="relative z-20 py-10 sm:py-16 px-3 sm:px-6 md:px-10 max-w-6xl mx-auto w-full font-sans"
    >
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>
          Live Infrastructure Diagnostic
        </h2>
        <p className={`mt-1.5 text-xs sm:text-sm max-w-xl mx-auto ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
          Click the arrows on either side of the browser to step through the exact onboarding journey across Cloudflare, Google Admin, Smartlead, and Gmail.
        </p>
      </div>

      {/* Main Container with Outside Navigation Arrows */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-4">
        {/* Left Arrow Button (Outside) */}
        <button
          onClick={prevSlide}
          aria-label="Previous tab"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 shrink-0 z-30 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Safari Browser Window Frame (Fixed Size) */}
        <div className="w-full max-w-[880px] h-[520px] sm:h-[550px] bg-white border border-[#d1d5db] dark:border-neutral-700 rounded-xl overflow-hidden shadow-2xl flex flex-col shrink-0">
          {/* Safari Browser Single-Bar Header */}
          <div className="h-10 bg-[#e8eaed] dark:bg-[#202124] border-b border-[#dadce0] dark:border-neutral-700 px-3 flex items-center justify-between select-none shrink-0 gap-3">
            {/* macOS Window Traffic Lights */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            </div>

            {/* Safari Center Address Bar */}
            <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-1.5 px-3 py-1 rounded-md bg-[#ffffff] dark:bg-[#303134] border border-[#dadce0] dark:border-neutral-600 text-[11px] font-sans text-neutral-700 dark:text-neutral-300 shadow-sm truncate">
              <Lock className="w-3 h-3 text-neutral-500 shrink-0" />
              <span className="truncate">{currentSlide.url}</span>
            </div>

            {/* Right Safari icons */}
            <div className="flex items-center gap-2 text-neutral-500 shrink-0">
              <RefreshCw className="w-3 h-3 cursor-pointer hover:text-neutral-900 dark:hover:text-white" />
            </div>
          </div>

          {/* Viewport Content Area (Fixed Height) */}
          <div className="flex-1 overflow-hidden relative bg-white">
            {currentSlide.component}
          </div>
        </div>

        {/* Right Arrow Button (Outside) */}
        <button
          onClick={nextSlide}
          aria-label="Next tab"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-neutral-800 dark:text-neutral-200 shrink-0 z-30 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Step Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 select-none">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(index)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              activeSlide === index
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-sm font-semibold'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>{slide.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
