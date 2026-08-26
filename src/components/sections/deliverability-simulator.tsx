'use client'

import React, { useState } from 'react';
import {
  Search, Lock, HelpCircle, Sparkles, User, Star, ChevronDown,
  BookOpen, Filter, AlertTriangle, Upload, Download, Plus,
  ChevronLeft, ChevronRight, Check, ArrowRight, ShieldAlert,
  ShieldCheck, CheckCircle2, Globe, KeyRound, Mail, AlertOctagon,
  RefreshCw, Copy, ExternalLink, Settings, Home, BarChart2,
  Shield, Zap, Sliders, Cpu, Key, Menu, Grid, Trash2, Paperclip,
  MoreVertical, Inbox, Send, AlertCircle, ShoppingCart, SlidersHorizontal,
  Navigation, MessageSquare, Phone, Bot, Award, Calendar, Folder,
  ExternalLink as LinkIcon, Edit2, Building2, CreditCard
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
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

function GrayCloudIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-[#9ca3af] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

// ───────── Screen 1: Redacted Cloudflare DNS Records Mockup ─────────
function CloudflareDnsMockup() {
  const records = [
    { name: 'mail', type: 'A', content: '192.0.***.***', proxy: 'proxied', ttl: 'Auto' },
    { name: 'track', type: 'CNAME', content: 'cus***-tracking.instantly.ai', proxy: 'proxied', ttl: 'Auto' },
    { name: 'www', type: 'CNAME', content: 'cname.ver***-dns.com', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'vor***tech.io', type: 'MX', content: 'aspmx.l.goo***.com (Priority: 1)', proxy: 'dns-only', ttl: 'Auto' },
    { name: '_dmarc', type: 'TXT', content: '"v=DMARC1; p=none; rua=mailto:dmarc-rep***@vor***tech.io"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'google._domainkey', type: 'TXT', content: '"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs0sj***QIDAQAB"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'vor***tech.io', type: 'TXT', content: '"openai-domain-verification=dv-jeb***"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'vor***tech.io', type: 'TXT', content: '"google-site-verification=0efXs4***"', proxy: 'dns-only', ttl: 'Auto' },
    { name: 'vor***tech.io', type: 'TXT', content: '"v=spf1 include:_spf.google.com include:send***.net include:hub***email.net include:mail***.org ~all"', proxy: 'dns-only', ttl: 'Auto' },
  ];

  return (
    <div className="h-full flex flex-col bg-white text-[#1d2228] select-none font-sans text-xs">
      {/* Cloudflare App Header */}
      <header className="h-11 border-b border-[#e5e7eb] bg-white px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <CloudflareLogo />
          <Star className="w-3.5 h-3.5 text-neutral-400" />
          <div className="flex items-center gap-1.5 border border-[#e5e7eb] rounded px-2 py-0.5 bg-white text-xs">
            <span className="font-semibold text-[#111827]">vor***tech.io</span>
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
            V
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
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#111827]">
                DNS records for vor***tech.io
              </h2>
              <p className="text-[10.5px] text-[#6b7280]">
                Manage how the Internet finds your web content, verifies services, and routes traffic..
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] bg-[#f3f4f6] text-[#4b5563] px-2 py-0.5 rounded border border-[#e5e7eb]">
                DNS Setup: Full
              </span>
              <span className="text-[10px] bg-white text-[#111827] px-2 py-0.5 rounded border border-[#d1d5db] font-medium flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#6b7280]" /> Docs
              </span>
            </div>
          </div>

          {/* Search & Actions Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
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

          <div className="text-[10.5px] text-[#6b7280] mb-1.5">
            You have used <span className="font-bold text-[#111827]">9 of 200</span> available DNS records in this domain.
          </div>

          {/* Table */}
          <div className="rounded border border-[#e5e7eb] bg-white overflow-x-auto shadow-sm">
            <table className="w-full text-left text-[10.5px] border-collapse">
              <thead>
                <tr className="bg-white border-b border-[#e5e7eb] font-semibold text-[#4b5563] text-[10px]">
                  <th className="py-1.5 px-2 w-6"><input type="checkbox" readOnly className="rounded" /></th>
                  <th className="py-1.5 px-2">Name ⇅</th>
                  <th className="py-1.5 px-2">Type ▲</th>
                  <th className="py-1.5 px-2 min-w-[200px]">Content ⓘ</th>
                  <th className="py-1.5 px-2 min-w-[100px]">Proxy status</th>
                  <th className="py-1.5 px-2">TTL</th>
                  <th className="py-1.5 px-2 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3f4f6] font-mono text-[10px] text-[#1f2937]">
                {records.map((r, i) => (
                  <tr key={i} className="hover:bg-[#fafafa]">
                    <td className="py-1.5 px-2"><input type="checkbox" readOnly className="rounded" /></td>
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
          <div className="text-[10px] text-[#6b7280] mt-1.5">Showing 1-9 of 9</div>
        </div>
      </div>
    </div>
  );
}

// ───────── Screen 2: Google Workspace Admin Console (Screenshot 5 Exact Replica) ─────────
function GoogleAdminMockup() {
  return (
    <div className="h-full flex flex-col bg-white text-[#202124] select-none font-sans text-xs overflow-hidden">
      {/* Top Google Admin Navbar */}
      <header className="h-12 border-b border-[#dadce0] px-3 sm:px-4 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <Menu className="w-5 h-5 text-[#5f6368] cursor-pointer" />
          <div className="flex items-center gap-2">
            {/* Google Blue Hexagon Icon */}
            <div className="w-6 h-6 rounded bg-[#1a73e8] flex items-center justify-center text-white text-[11px] font-bold shadow-sm">
              <span className="transform rotate-12">❖</span>
            </div>
            <span className="text-base font-semibold text-[#3c4043] tracking-tight">Admin</span>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#f1f3f4] text-xs text-[#5f6368] border border-transparent focus-within:border-[#dadce0] focus-within:bg-white shadow-inner">
            <Search className="w-4 h-4 text-[#5f6368]" />
            <span className="text-xs text-[#5f6368] truncate">
              Ask me anything e.g., how to create a support email ID for my company
            </span>
          </div>
        </div>

        {/* Right Tools & Random Letter Profile Photo */}
        <div className="flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-[#5f6368] cursor-pointer hidden sm:block" />
          <HelpCircle className="w-4 h-4 text-[#5f6368] cursor-pointer" />
          <Grid className="w-4 h-4 text-[#5f6368] cursor-pointer hidden sm:block" />
          {/* Random Letter Profile Avatar */}
          <div className="w-7 h-7 rounded-full bg-[#e8710a] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white">
            R
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Vertical Strip with Admin Icons */}
        <aside className="w-11 border-r border-[#dadce0] bg-white py-2 flex flex-col items-center gap-2.5 text-[#5f6368] shrink-0 hidden sm:flex">
          <Home className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <Grid className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <User className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <Building2 className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <Shield className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <Folder className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <BarChart2 className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <CreditCard className="w-4 h-4 hover:text-[#1a73e8] cursor-pointer" />
          <span className="font-mono text-xs font-bold text-[#5f6368]">@</span>
        </aside>

        {/* Left Sub-card (Gmail info) */}
        <div className="w-48 border-r border-[#dadce0] bg-[#ffffff] p-4 hidden lg:flex flex-col shrink-0">
          <div className="flex items-center gap-2.5 mb-4">
            <Mail className="w-6 h-6 text-[#ea4335]" />
            <span className="text-base font-semibold text-[#202124]">Gmail</span>
          </div>

          <div className="pt-2 border-t border-[#f1f3f4]">
            <span className="text-[11px] text-[#5f6368] block">Status</span>
            <span className="text-xs font-bold text-[#137333]">ON for everyone</span>
          </div>
        </div>

        {/* Right DKIM Form Area */}
        <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="text-[11px] text-[#5f6368] mb-2 font-medium">
            Apps &gt; Google Workspace &gt; Settings for Gmail &gt; <span className="text-[#202124] font-semibold">Authenticate email</span>
          </div>

          {/* Accordion Box */}
          <div className="border border-[#dadce0] rounded-lg bg-white overflow-hidden shadow-sm">
            <div className="p-3 border-b border-[#dadce0] flex items-center justify-between bg-white">
              <span className="font-bold text-xs text-[#202124]">Authenticate email</span>
              <ChevronDown className="w-4 h-4 text-[#5f6368] transform rotate-180" />
            </div>

            <div className="p-3.5 sm:p-4 space-y-3">
              {/* DKIM explanation */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                <span className="font-semibold text-[#202124]">DKIM authentication</span>
                <span className="md:col-span-3 text-[#5f6368] text-[11px]">
                  The domains you select will use the DKIM (DomainKeys Identified Mail) protocol for authenticating outgoing emails. <a href="#" className="text-[#1a73e8] hover:underline">Learn more</a>
                </span>
              </div>

              {/* Selected domain selector */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs items-center pt-2">
                <span className="text-[#5f6368]">Selected domain</span>
                <div className="md:col-span-3">
                  <div className="inline-flex items-center gap-2 border border-[#dadce0] rounded px-2.5 py-1 text-xs font-semibold text-[#202124] bg-white cursor-pointer shadow-sm">
                    <span>vor***tech.io</span>
                    <span className="text-[9px] text-[#5f6368]">▼</span>
                  </div>
                </div>
              </div>

              {/* Status and instructions */}
              <div className="text-xs space-y-1 pt-1">
                <div className="font-bold text-[#202124]">Status: Not authenticating email</div>
                <p className="text-[11px] text-[#5f6368] leading-relaxed">
                  You must update the DNS records for this domain. To start authenticating email for the domain selected above, enter the following DNS TXT record into your domain provider&apos;s DNS settings page. Then click &quot;Start authentication.&quot;
                </p>
              </div>

              {/* DNS TXT Code Box */}
              <div className="p-3 rounded bg-[#f1f3f4] border border-[#dadce0] text-[10.5px] font-mono text-[#202124] space-y-2">
                <div>
                  <span className="font-sans font-semibold text-[#5f6368] block text-[10px]">DNS Host name (TXT record name):</span>
                  <span className="font-bold text-[#202124]">google._domainkey</span>
                </div>

                <div>
                  <span className="font-sans font-semibold text-[#5f6368] block text-[10px]">TXT record value:</span>
                  <p className="text-[#137333] break-all leading-snug">
                    v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxD1DeeNhXF1/T3pzc7mlgVSSrZ2yXjDy05o134/tJzjYyh8bakLvRSTs2/6LxFwRJiTrl3oOas126nmWGF8IAsyqdM89HVowAsVH8MgHpNJ5NNvBGFwKFnCmlkX0ybHCMbem6oe7Cl/eV4G/g6KGVp+VzMifTvo5qJwblVg2DRjP0iQ8KOSIPdYZ5bsjbReFCZxko6Dhocndsh8Z6j2yqmEkPejb79y5KfI8OSfZzKVz04v51mcNCsIW0JxRLLX6fF3xpfg2OpGcE2MlvfvXcd73J+8MWQi1zf0m/PM2CKEMkA5WVySrH5lb+JBE/Y9AlH5dJtD9OGU1aR6zIYddQIDAQAB
                  </p>
                </div>
              </div>

              {/* Action Button & Note */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button className="px-3.5 py-1.5 rounded border border-[#dadce0] text-[#1a73e8] font-semibold text-xs bg-white hover:bg-[#f8f9fa] transition-colors shadow-sm uppercase tracking-wider">
                  Generate New Record
                </button>

                <div className="flex items-center gap-1.5 text-[10.5px] text-[#5f6368]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#1a73e8]" />
                  <span>It may take up to 48 hours for DNS changes to fully propagate.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Screen 3: Smartlead.ai (Interactive 3-View Exact Replica) ─────────
function SmartleadMockup() {
  // view: 'accounts' (Screenshot 1) | 'detail' (Screenshot 2 + 3 combined) | 'campaigns' (Screenshot 4)
  const [smartleadView, setSmartleadView] = useState<'accounts' | 'detail' | 'campaigns'>('accounts');

  return (
    <div className="h-full flex flex-col bg-[#f8fafc] text-[#1e293b] select-none font-sans text-xs overflow-hidden">
      {/* Smartlead Deep Navy Top Navbar */}
      <header className="h-11 bg-[#0b0c36] text-white px-3 sm:px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Menu className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
          <div className="flex items-center gap-2">
            {/* Purple Megaphone Logo */}
            <div className="w-6 h-6 rounded bg-[#6366f1] flex items-center justify-center text-white text-xs font-bold shadow">
              📢
            </div>
            <span className="font-bold text-sm text-white tracking-tight">Smartlead.ai</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button className="flex items-center gap-1.5 bg-white text-[#0b0c36] hover:bg-neutral-100 font-semibold px-2.5 py-1 rounded text-[11px] shadow-sm transition-colors">
            <Sparkles className="w-3 h-3 text-[#6366f1]" />
            <span>Ask AI</span>
          </button>
          <AlertCircle className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
          <HelpCircle className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
          {/* Avatar */}
          <div className="w-6 h-6 rounded-full bg-[#6366f1] text-white flex items-center justify-center font-bold text-[10px] ring-2 ring-white/20">
            K
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Icon Strip */}
        <aside className="w-10 border-r border-[#e2e8f0] bg-white py-2.5 flex flex-col items-center gap-3 text-[#94a3b8] shrink-0">
          <div onClick={() => setSmartleadView('accounts')} title="Dashboard">
            <Grid className="w-4 h-4 hover:text-[#6366f1] cursor-pointer" />
          </div>
          {/* 2nd Icon: Flying Paper Airplane -> Switches to Screenshot 4 (Campaigns) */}
          <div
            onClick={() => setSmartleadView('campaigns')}
            className={`p-1 rounded cursor-pointer transition-colors ${
              smartleadView === 'campaigns'
                ? 'bg-[#6366f1]/10 text-[#6366f1]'
                : 'hover:text-[#6366f1] text-[#94a3b8]'
            }`}
            title="Campaigns (Flying Paper Airplane)"
          >
            <Send className="w-4 h-4 transform -rotate-45" />
          </div>
          <MessageSquare className="w-4 h-4 hover:text-[#6366f1] cursor-pointer" />
          {/* 4th Icon: Mail -> Switches to Accounts View */}
          <div
            onClick={() => setSmartleadView('accounts')}
            className={`p-1 rounded cursor-pointer transition-colors ${
              smartleadView === 'accounts' || smartleadView === 'detail'
                ? 'bg-[#6366f1]/10 text-[#6366f1]'
                : 'hover:text-[#6366f1] text-[#94a3b8]'
            }`}
            title="Email Accounts"
          >
            <Mail className="w-4 h-4" />
          </div>
          <Phone className="w-4 h-4 hover:text-[#94a3b8]" />
          <Sparkles className="w-4 h-4 hover:text-[#94a3b8]" />
          <Bot className="w-4 h-4 hover:text-[#94a3b8]" />
          <Shield className="w-4 h-4 hover:text-[#94a3b8]" />
        </aside>

        {/* ───────── View A: Email Accounts Table (Screenshot 1) ───────── */}
        {smartleadView === 'accounts' && (
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
            {/* Warmup Pool Banner */}
            <div className="p-2.5 rounded-lg bg-[#e6fffa] border border-[#b2f5ea] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#319795]" />
                <span className="font-bold text-[#234e52]">Current Warmup Pool</span>
                <span className="text-[10px] bg-white text-[#319795] border border-[#81e6d9] px-1.5 py-0.5 rounded font-mono font-semibold">
                  Foundation Pool
                </span>
              </div>

              <button className="px-2.5 py-1 rounded bg-[#2c7a7b] hover:bg-[#285e61] text-white text-[10.5px] font-semibold flex items-center gap-1 transition-colors">
                <span>See How to Upgrade</span>
                <span>→</span>
              </button>
            </div>

            {/* Navigation Tabs and Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e8f0] pb-2">
              <div className="flex items-center gap-4 text-xs">
                <button className="font-bold text-[#6366f1] border-b-2 border-[#6366f1] pb-2 -mb-2">
                  Email Accounts (1)
                </button>
                <button className="text-[#64748b] hover:text-[#1e293b]">Domains</button>
                <button className="text-[#64748b] hover:text-[#1e293b]">SmartSenders Orders</button>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search className="w-3 h-3 text-[#94a3b8] absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search Email Account"
                    readOnly
                    className="pl-7 pr-2 py-1 text-[10.5px] rounded border border-[#cbd5e1] bg-white text-[#1e293b]"
                  />
                </div>
                <button className="p-1 rounded border border-[#cbd5e1] bg-white text-[#64748b]">
                  <Filter className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 rounded border border-[#cbd5e1] bg-white text-[#64748b]">
                  <Settings className="w-3.5 h-3.5" />
                </button>
                <button className="px-2 py-1 rounded border border-[#cbd5e1] bg-white text-[#1e293b] text-[10.5px] font-semibold flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add
                </button>
                <button className="px-2.5 py-1 rounded bg-[#6366f1] hover:bg-[#4f46e5] text-white text-[10.5px] font-semibold flex items-center gap-1 shadow-sm">
                  <ShoppingCart className="w-3 h-3" /> Purchase
                </button>
              </div>
            </div>

            {/* Email Accounts Table */}
            <div className="rounded border border-[#e2e8f0] bg-white overflow-x-auto shadow-sm">
              <table className="w-full text-left text-[10.5px] border-collapse">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] font-semibold text-[#64748b] text-[10px]">
                    <th className="py-2 px-2.5 w-6"><input type="checkbox" readOnly className="rounded" /></th>
                    <th className="py-2 px-2">Name</th>
                    <th className="py-2 px-2">Vendors</th>
                    <th className="py-2 px-2">Daily Limit</th>
                    <th className="py-2 px-2">Warmup Enabled</th>
                    <th className="py-2 px-2">Warmup Reputation</th>
                    <th className="py-2 px-2">Mailbox Issue</th>
                    <th className="py-2 px-2">Expiry Date</th>
                    <th className="py-2 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* First Row (Clickable to switch to Detail view Screenshot 2 & 3) */}
                  <tr
                    onClick={() => setSmartleadView('detail')}
                    className="hover:bg-[#f1f5f9] cursor-pointer transition-colors group"
                  >
                    <td className="py-2 px-2.5"><input type="checkbox" readOnly className="rounded" /></td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1 font-semibold text-[#1e293b] group-hover:text-[#6366f1]">
                        <span>Alex M.</span>
                        <LinkIcon className="w-3 h-3 text-[#94a3b8] group-hover:text-[#6366f1]" />
                      </div>
                      <div className="flex items-center gap-1 text-[#64748b] text-[9.5px]">
                        <span className="text-red-500 font-bold">M</span>
                        <span>a***@vor***tech.io</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="w-5 h-5 rounded bg-[#6366f1] text-white flex items-center justify-center text-[10px] font-bold">
                        ❖
                      </div>
                    </td>
                    <td className="py-2 px-2 font-mono font-bold text-[#1e293b]">
                      0 / 80
                    </td>
                    <td className="py-2 px-2">
                      <span className="bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0] px-2 py-0.5 rounded text-[9.5px] font-bold">
                        Yes
                      </span>
                    </td>
                    <td className="py-2 px-2 font-bold text-[#16a34a]">
                      100%
                    </td>
                    <td className="py-2 px-2 text-[#94a3b8]">-</td>
                    <td className="py-2 px-2 text-[#94a3b8]">-</td>
                    <td className="py-2 px-2 text-right">
                      <div className="inline-flex items-center gap-1.5 text-[#94a3b8]">
                        <Edit2 className="w-3 h-3 hover:text-[#1e293b]" />
                        <Trash2 className="w-3 h-3 hover:text-red-500" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Hint below table */}
            <div className="text-[10px] text-[#64748b] flex items-center justify-between">
              <span>💡 Click on the email row to inspect 100% Warmup &amp; Inbox placement analytics.</span>
              <span>Showing 1-1 of 1</span>
            </div>
          </div>
        )}

        {/* ───────── View B: Combined Screenshot 2 + 3 (Compact Zero-Scroll Detail) ───────── */}
        {smartleadView === 'detail' && (
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5">
            {/* Header with back button */}
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSmartleadView('accounts')}
                  className="px-2 py-0.5 rounded border border-[#cbd5e1] text-[10.5px] font-semibold text-[#64748b] hover:text-[#1e293b] bg-white"
                >
                  ← Back
                </button>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#1e293b]">Alex M.</span>
                  <span className="text-[#64748b] text-xs font-mono">(a***@vor***tech.io)</span>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-3 text-xs">
                <span className="font-bold text-[#6366f1] border-b-2 border-[#6366f1] pb-1">Overview</span>
                <span className="text-[#64748b] hover:text-[#1e293b] cursor-pointer">General</span>
                <span className="text-[#64748b] hover:text-[#1e293b] cursor-pointer">Warm Up</span>
                <span className="text-[#64748b] hover:text-[#1e293b] cursor-pointer">Management</span>
                <span className="text-[#64748b] hover:text-[#1e293b] cursor-pointer">Campaigns</span>
              </div>
            </div>

            {/* Summary (last 7 days) 4 Cards with Elevated Numbers */}
            <div>
              <span className="text-[11px] font-bold text-[#1e293b] block mb-1.5">Summary (last 7 days)</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-center shadow-sm">
                  <div className="font-bold text-lg text-[#3b82f6]">284</div>
                  <div className="text-[9.5px] text-[#64748b]">Warmup emails sent</div>
                </div>

                <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-center shadow-sm">
                  <div className="font-bold text-lg text-[#16a34a]">284</div>
                  <div className="text-[9.5px] text-[#64748b]">Landed in inbox</div>
                </div>

                <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-center shadow-sm">
                  <div className="font-bold text-lg text-[#dc2626]">0</div>
                  <div className="text-[9.5px] text-[#64748b]">Saved from spam</div>
                </div>

                <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white text-center shadow-sm">
                  <div className="font-bold text-lg text-[#d97706]">216</div>
                  <div className="text-[9.5px] text-[#64748b]">Emails received</div>
                </div>
              </div>
            </div>

            {/* Middle Row: Email Performance + Outbound Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white space-y-1 shadow-sm">
                <span className="text-[10px] font-bold text-[#64748b] uppercase">Email Performance</span>
                <div className="flex items-center gap-1 text-xs font-bold text-[#16a34a]">
                  <span>😍 Super</span>
                </div>
                <p className="text-[10.5px] text-[#1e293b] font-medium">
                  100% of your warmup emails landed in inbox
                </p>
              </div>

              <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-bold text-[#64748b]">
                  <span>Outbound Status ⓘ</span>
                  <span>Use for outbound</span>
                </div>
                <div className="w-full bg-[#e2e8f0] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#6366f1] h-full w-[85%]" />
                </div>
                <span className="text-[9.5px] text-[#64748b] block">
                  Enabled on Tuesday, Aug 18, 2026
                </span>
              </div>
            </div>

            {/* Note banner */}
            <div className="p-1.5 rounded bg-[#fffbeb] border border-[#fef3c7] text-[9.5px] text-[#92400e]">
              Note: Auto-adjust warmup activated. You will be sending a maximum of 40 warmup mails per day
            </div>

            {/* Bottom Row: Inbox vs Spam Donut + Warmup Email Sent Stacked Bar Chart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Inbox vs Spam Donut Chart */}
              <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10.5px] font-bold text-[#1e293b] block mb-1">Inbox vs Spam</span>
                  <div className="space-y-1 text-[10px]">
                    <div className="font-bold text-[#16a34a]">
                      100% <span className="text-[#64748b] font-normal">(284) Landed in inbox</span>
                    </div>
                    <div className="font-bold text-[#64748b]">
                      0% <span className="text-[#64748b] font-normal">(0) Saved from spam</span>
                    </div>
                  </div>
                </div>

                {/* SVG Donut Circle */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#e2e8f0]"
                      strokeWidth="4"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#22c55e]"
                      strokeDasharray="100, 100"
                      strokeWidth="4"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-[#16a34a]">100%</span>
                </div>
              </div>

              {/* Warmup Email Sent Stacked Bar Chart */}
              <div className="p-2.5 rounded-lg border border-[#e2e8f0] bg-white shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10.5px] font-bold text-[#1e293b]">Warmup email sent</span>
                  <div className="flex items-center gap-2 text-[8.5px]">
                    <span className="inline-flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-full" /> Sent</span>
                    <span className="inline-flex items-center gap-0.5"><span className="w-1.5 h-1.5 bg-[#ec4899] rounded-full" /> Replied</span>
                  </div>
                </div>

                {/* Bars */}
                <div className="flex items-end justify-between h-14 pt-2 gap-1 border-b border-[#e2e8f0]">
                  {[
                    { day: '19 Aug', sent: 18, rep: 12 },
                    { day: '20 Aug', sent: 26, rep: 16 },
                    { day: '21 Aug', sent: 32, rep: 20 },
                    { day: '22 Aug', sent: 0, rep: 0 },
                    { day: '23 Aug', sent: 0, rep: 0 },
                    { day: '24 Aug', sent: 42, rep: 28 },
                    { day: '25 Aug', sent: 58, rep: 36 },
                    { day: '26 Aug', sent: 64, rep: 40 },
                  ].map((b, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                      <div className="w-full max-w-[14px] flex flex-col justify-end rounded-t overflow-hidden">
                        {b.rep > 0 && (
                          <div
                            style={{ height: `${(b.rep / 70) * 100}%` }}
                            className="bg-[#ec4899] w-full"
                          />
                        )}
                        {b.sent > 0 && (
                          <div
                            style={{ height: `${(b.sent / 70) * 100}%` }}
                            className="bg-[#3b82f6] w-full"
                          />
                        )}
                      </div>
                      <span className="text-[7.5px] text-[#94a3b8] truncate">{b.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───────── View C: Campaigns View (Screenshot 4 - Flying Paper Airplane) ───────── */}
        {smartleadView === 'campaigns' && (
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3">
            {/* Top Tabs & Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2e8f0] pb-2">
              <div className="flex items-center gap-4 text-xs">
                <button className="font-bold text-[#6366f1] border-b-2 border-[#6366f1] pb-2 -mb-2">
                  All Campaigns (1)
                </button>
                <button className="text-[#64748b] hover:text-[#1e293b]">Folders</button>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="inline-flex rounded border border-[#cbd5e1] bg-white text-[10px] font-medium overflow-hidden">
                  <span className="px-2 py-1 bg-[#f1f5f9] text-[#1e293b] font-semibold border-r border-[#cbd5e1]">Old Version</span>
                  <span className="px-2 py-1 text-[#6366f1] flex items-center gap-1">✦ New Version</span>
                </div>
                <div className="relative">
                  <Search className="w-3 h-3 text-[#94a3b8] absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder="Search Campaigns"
                    readOnly
                    className="pl-7 pr-2 py-1 text-[10.5px] rounded border border-[#cbd5e1] bg-white text-[#1e293b]"
                  />
                </div>
                <button className="px-2.5 py-1 rounded bg-[#6366f1] hover:bg-[#4f46e5] text-white text-[10.5px] font-semibold flex items-center gap-1 shadow-sm">
                  <Plus className="w-3 h-3" /> Create Campaign
                </button>
              </div>
            </div>

            {/* Campaign Table */}
            <div className="rounded border border-[#e2e8f0] bg-white overflow-x-auto shadow-sm">
              <div className="p-2.5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc] text-[10px] font-semibold text-[#64748b]">
                <span>Campaign Details</span>
                <span>Report Metrics</span>
              </div>

              <div className="p-3 flex items-center justify-between hover:bg-[#fafafa] transition-colors gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f1f5f9] border border-[#cbd5e1] flex items-center justify-center font-mono text-[10px] font-bold text-[#64748b]">
                    C%
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-bold text-xs text-[#1e293b]">
                      <span>Outbound Sequence Alpha</span>
                      <LinkIcon className="w-3 h-3 text-[#94a3b8]" />
                    </div>
                    <div className="text-[10px] text-[#64748b]">
                      <span className="text-emerald-600 font-semibold">Active</span> | Created At: 26 Aug, 05:39 pm | 1 sequence
                    </div>
                  </div>
                </div>

                {/* Metrics with Elevated Numbers */}
                <div className="flex items-center gap-3 sm:gap-5 text-center text-xs">
                  <div>
                    <div className="font-mono font-bold text-[#1e293b]">3,420</div>
                    <div className="text-[9px] text-[#64748b] flex items-center gap-0.5"><Mail className="w-2.5 h-2.5 text-[#3b82f6]" /> Sent</div>
                  </div>

                  <div>
                    <div className="font-mono font-bold text-[#1e293b]">2,480</div>
                    <div className="text-[9px] text-[#64748b] flex items-center gap-0.5"><Mail className="w-2.5 h-2.5 text-[#a855f7]" /> Opened</div>
                  </div>

                  <div>
                    <div className="font-mono font-bold text-[#1e293b]">412</div>
                    <div className="text-[9px] text-[#64748b] flex items-center gap-0.5"><Mail className="w-2.5 h-2.5 text-[#06b6d4]" /> Replied</div>
                  </div>

                  <div className="relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-1 py-0.2 bg-[#dcfce7] text-[#166534] rounded text-[7.5px] font-bold whitespace-nowrap">
                      Go To Master inbox
                    </span>
                    <div className="font-mono font-bold text-[#16a34a]">184</div>
                    <div className="text-[9px] text-[#16a34a] font-semibold">$ Positive</div>
                  </div>

                  <div>
                    <div className="font-mono font-bold text-[#dc2626]">4</div>
                    <div className="text-[9px] text-[#dc2626]">Bounced</div>
                  </div>

                  <div className="flex items-center gap-1.5 pl-2 border-l border-[#e2e8f0]">
                    <Edit2 className="w-3.5 h-3.5 text-[#94a3b8] hover:text-[#1e293b] cursor-pointer" />
                    <MoreVertical className="w-3.5 h-3.5 text-[#94a3b8] hover:text-[#1e293b] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#64748b] flex items-center justify-between">
              <span>💡 Click the 4th icon (envelope) in the left sidebar to return to Email Accounts.</span>
              <span>Showing 1-1 of 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ───────── Screen 4: Gmail Inbox Mockup ─────────
function GmailInboxMockup() {
  return (
    <div className="h-full flex flex-col bg-white text-[#202124] select-none font-sans text-xs">
      {/* Gmail Header */}
      <header className="h-11 border-b border-[#e5e7eb] px-4 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-3">
          <Menu className="w-4 h-4 text-[#5f6368]" />
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#ea4335]" />
            <span className="font-semibold text-sm text-[#202124]">Gmail</span>
          </div>
        </div>

        <div className="flex-1 max-w-sm mx-4 hidden sm:block">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#f1f3f4] text-xs text-[#5f6368]">
            <Search className="w-3.5 h-3.5" />
            <span>Search mail</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#5f6368] font-medium hidden sm:inline">Sarah C.</span>
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
            S
          </div>
        </div>
      </header>

      {/* Main Email View */}
      <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto max-w-3xl mx-auto w-full space-y-3">
        {/* Yellow Unverified Warning Banner */}
        <div className="p-3 rounded-xl bg-[#fef7e0] border border-[#fce8b2] text-[11px] text-[#744210] flex items-start gap-2.5 shadow-sm">
          <AlertTriangle className="w-4 h-4 text-[#b06000] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Be careful with this message</span>
            <span>Gmail could not verify that it actually came from vor***tech.io. Avoid clicking links, downloading attachments, or replying with sensitive info.</span>
          </div>
        </div>

        {/* Email Card */}
        <div className="rounded-xl border border-[#dadce0] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-bold text-xs shrink-0">
                AM
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#202124]">Alex Miller</span>
                  <span className="text-[10px] text-[#5f6368]">&lt;a***@vor***tech.io&gt;</span>
                </div>
                <span className="text-[10px] text-[#5f6368]">to sarah.chen@vanguardindustrial.com</span>
              </div>
            </div>
            <span className="text-[10px] text-[#5f6368]">11:24 AM</span>
          </div>

          <h3 className="font-bold text-sm text-[#202124]">
            Q3 Cloud Infrastructure &amp; Data Pipeline Architecture
          </h3>

          <p className="text-xs text-[#3c4043] leading-relaxed">
            Hey Sarah, Following up on Vanguard&apos;s recent expansion into the Dallas facility, I wanted to share our updated cloud infrastructure blueprints and automated routing architecture for Q3...
          </p>

          {/* Signature */}
          <div className="pt-3 border-t border-[#f1f3f4] text-[11px] text-[#5f6368] space-y-0.5">
            <div className="font-bold text-[#202124]">Alex Miller</div>
            <div>Engineering Lead | Vortex Technologies</div>
            <div>(555) 019-2834 • a***@vor***tech.io</div>
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
      url: 'dash.cloudflare.com/vor***tech.io/dns/records',
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
          Click the arrows to step through the exact onboarding journey across Cloudflare, Google Admin, Smartlead, and Gmail.
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
