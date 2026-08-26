'use client'

import React, { useState } from 'react';
import {
  Search, Lock, HelpCircle, Sparkles, User, Star, SlidersHorizontal,
  ChevronDown, BookOpen, Filter, AlertTriangle, Upload, Download,
  Plus, Check, ChevronUp, ChevronRight, Home, BarChart2, Shield,
  Zap, Sliders, Cpu, Key, FileText, Settings, Radio, Globe, Layers
} from 'lucide-react';

// ───────── Cloudflare Official SVG Cloud Icons ─────────
function CloudflareLogo() {
  return (
    <svg className="w-8 h-8 text-[#f6821f]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
    </svg>
  );
}

function OrangeCloudIcon() {
  return (
    <svg className="w-4 h-4 text-[#f6821f] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

function GrayCloudIcon() {
  return (
    <svg className="w-4 h-4 text-[#9ca3af] shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
  );
}

// ───────── DNS Record Data ─────────
interface DnsRecord {
  name: string;
  type: string;
  content: string;
  proxyStatus: 'proxied' | 'dns-only';
  ttl: string;
  isWarning?: boolean;
}

const RECORDS: DnsRecord[] = [
  {
    name: 'mail',
    type: 'A',
    content: '192.0.2.1',
    proxyStatus: 'proxied',
    ttl: 'Auto',
    isWarning: true,
  },
  {
    name: 'track',
    type: 'CNAME',
    content: 'custom-tracking.instantly.ai',
    proxyStatus: 'proxied',
    ttl: 'Auto',
    isWarning: true,
  },
  {
    name: 'www',
    type: 'CNAME',
    content: 'cname.vercel-dns.com',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
  },
  {
    name: 'stevesdomain.com',
    type: 'MX',
    content: 'aspmx.l.google.com (Priority: 1)',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
  },
  {
    name: '_dmarc',
    type: 'TXT',
    content: '"v=DMARC1; p=none;"',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
    isWarning: true,
  },
  {
    name: 'google._domainkey',
    type: 'TXT',
    content: '"v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs0sj..."',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
  },
  {
    name: 'stevesdomain.com',
    type: 'TXT',
    content: '"openai-domain-verification=dv-jebyTLmXcCoeyjbB9ltvwMt5"',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
  },
  {
    name: 'stevesdomain.com',
    type: 'TXT',
    content: '"google-site-verification=0efXs4Fd-kX_mZArtflON-0mcY3scqFF1g5TN6-ulJs"',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
  },
  {
    name: 'stevesdomain.com',
    type: 'TXT',
    content: '"v=spf1 include:_spf.google.com include:sendgrid.net include:hubspotemail.net include:mailgun.org include:createsend.com include:outreach.io ~all"',
    proxyStatus: 'dns-only',
    ttl: 'Auto',
    isWarning: true,
  },
];

export function DeliverabilitySimulator({ isLightMode }: { isLightMode?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleSelectAll = () => {
    if (selectedRows.length === RECORDS.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(RECORDS.map((_, i) => i));
    }
  };

  const toggleSelectRow = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const filteredRecords = RECORDS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="demo-section"
      className="relative z-20 py-8 sm:py-12 px-2 sm:px-4 md:px-8 max-w-[1340px] mx-auto w-full font-sans"
    >
      {/* Cloudflare Exact Page Surface Container */}
      <div className="bg-white text-[#1d2228] border border-[#e5e7eb] rounded-xl overflow-hidden shadow-xl select-none">
        {/* ───────── Top Cloudflare Global Nav ───────── */}
        <header className="h-12 border-b border-[#e5e7eb] bg-white px-3 sm:px-4 flex items-center justify-between">
          {/* Left: Cloudflare Logo + Star + Domain Selector */}
          <div className="flex items-center gap-3">
            <CloudflareLogo />

            <div className="flex items-center gap-1.5 text-xs text-[#374151]">
              <Star className="w-3.5 h-3.5 text-neutral-400 hover:text-amber-400 cursor-pointer" />
              <div className="flex items-center gap-1.5 border border-[#e5e7eb] hover:border-neutral-400 rounded-md px-2 py-1 bg-white cursor-pointer transition-colors">
                <span className="font-semibold text-[#111827]">stevesdomain.com</span>
                <span className="bg-[#f3f4f6] text-[#6b7280] text-[10px] px-1.5 py-0.5 rounded font-medium">free</span>
                <div className="flex flex-col text-[7px] text-neutral-400 leading-[7px] ml-0.5">
                  <span>▲</span>
                  <span>▼</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Ask AI + Support + Avatar */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-[#4b5563]">
            <button className="flex items-center gap-1.5 hover:text-[#111827] font-medium transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-[#0051c3]" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
            <button className="flex items-center gap-1.5 hover:text-[#111827] font-medium transition-colors">
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Support</span>
            </button>
            <div className="w-6 h-6 rounded-full bg-[#374151] text-white flex items-center justify-center font-semibold text-[11px]">
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </header>

        {/* ───────── Main Content Area with Left Sidebar ───────── */}
        <div className="flex bg-white min-h-[580px]">
          {/* Left Vertical Icon Bar */}
          <aside className="w-11 border-r border-[#e5e7eb] bg-white py-3 flex flex-col items-center gap-3.5 text-[#9ca3af] shrink-0 hidden md:flex">
            <Search className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Home className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            {/* Active DNS Tab */}
            <div className="p-1.5 rounded-md bg-[#0051c3]/10 text-[#0051c3] cursor-pointer">
              <Globe className="w-4 h-4" />
            </div>
            <BarChart2 className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Lock className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Shield className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Zap className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Sliders className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Cpu className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Key className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
            <Settings className="w-4 h-4 hover:text-[#111827] cursor-pointer" />
          </aside>

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-7 max-w-6xl mx-auto overflow-x-auto">
            {/* Title & Setup Badge Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#111827]">
                  DNS records for stevesdomain.com
                </h1>
                <p className="text-xs text-[#6b7280] mt-1">
                  Manage how the Internet finds your web content, verifies services, and routes traffic..
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-medium bg-[#f3f4f6] text-[#4b5563] px-2.5 py-1 rounded border border-[#e5e7eb]">
                  DNS Setup: Full
                </span>
                <button className="flex items-center gap-1.5 text-xs font-medium text-[#111827] bg-white border border-[#d1d5db] hover:bg-[#f9fafb] px-3 py-1 rounded transition-colors shadow-sm">
                  <BookOpen className="w-3.5 h-3.5 text-[#6b7280]" />
                  <span>DNS documentation</span>
                </button>
              </div>
            </div>

            {/* Recommendations Bar */}
            <div className="mt-4 mb-5 p-2.5 rounded-lg border border-[#e5e7eb] bg-white flex items-center justify-between text-xs text-[#4b5563]">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-[#111827]">Recommendations</span>
                <span className="text-[#9ca3af]">⊘ All set</span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#9ca3af] cursor-pointer hover:text-[#111827]" />
            </div>

            {/* Search & Action Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 mb-3">
              {/* Search input */}
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-[#9ca3af] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search DNS Records"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border border-[#d1d5db] bg-white focus:outline-none focus:ring-1 focus:ring-[#0051c3] text-[#111827] placeholder-[#9ca3af]"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#374151] bg-white border border-[#d1d5db] hover:bg-[#f9fafb] rounded-md transition-colors shadow-sm">
                  <Filter className="w-3 h-3 text-[#6b7280]" />
                  <span>Filters</span>
                </button>

                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#dc2626] bg-white border border-[#fca5a5] hover:bg-[#fef2f2] rounded-md transition-colors shadow-sm">
                  <AlertTriangle className="w-3 h-3 text-[#dc2626]" />
                  <span>Display options</span>
                </button>

                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#374151] bg-white border border-[#d1d5db] hover:bg-[#f9fafb] rounded-md transition-colors shadow-sm">
                  <Upload className="w-3 h-3 text-[#6b7280]" />
                  <span>Import</span>
                </button>

                <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#374151] bg-white border border-[#d1d5db] hover:bg-[#f9fafb] rounded-md transition-colors shadow-sm">
                  <Download className="w-3 h-3 text-[#6b7280]" />
                  <span>Export</span>
                </button>

                <button className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0051c3] hover:bg-[#003e99] rounded-md transition-colors shadow-sm">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add record</span>
                </button>
              </div>
            </div>

            {/* Records Used Counter */}
            <div className="text-xs text-[#6b7280] mb-2.5">
              You have used <span className="font-bold text-[#111827]">9 of 200</span> available DNS records in this domain.
            </div>

            {/* ───────── DNS Records Table ───────── */}
            <div className="rounded-lg border border-[#e5e7eb] bg-white overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-[#e5e7eb] font-semibold text-[#4b5563] text-[11px]">
                      <th className="py-2.5 px-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedRows.length === RECORDS.length}
                          onChange={toggleSelectAll}
                          className="rounded border-[#d1d5db] text-[#0051c3] focus:ring-0 cursor-pointer"
                        />
                      </th>
                      <th className="py-2.5 px-2 w-5 text-neutral-400">
                        <span className="cursor-pointer">ⓘ</span>
                      </th>
                      <th className="py-2.5 px-3 min-w-[130px]">
                        <span className="inline-flex items-center gap-1 cursor-pointer">
                          Name <span className="text-[10px] text-neutral-400">⇅</span>
                        </span>
                      </th>
                      <th className="py-2.5 px-3 min-w-[70px]">
                        <span className="inline-flex items-center gap-1 text-[#111827] cursor-pointer">
                          Type <span className="text-[9px]">▲</span>
                        </span>
                      </th>
                      <th className="py-2.5 px-3 min-w-[260px]">
                        <span className="inline-flex items-center gap-1 cursor-pointer">
                          Content <span className="text-[10px] text-neutral-400">ⓘ</span> <span className="text-[10px] text-neutral-400">⇅</span>
                        </span>
                      </th>
                      <th className="py-2.5 px-3 min-w-[140px]">
                        <span className="inline-flex items-center gap-1 cursor-pointer">
                          Proxy status <span className="text-[10px] text-neutral-400">ⓘ</span> <span className="text-[10px] text-neutral-400">⇅</span>
                        </span>
                      </th>
                      <th className="py-2.5 px-3 min-w-[60px]">
                        <span className="inline-flex items-center gap-1 cursor-pointer">
                          TTL <span className="text-[10px] text-neutral-400">ⓘ</span> <span className="text-[10px] text-neutral-400">⇅</span>
                        </span>
                      </th>
                      <th className="py-2.5 px-3 text-right min-w-[50px]"></th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#f3f4f6] text-[11px] font-mono text-[#1f2937]">
                    {filteredRecords.map((record, index) => {
                      const isSelected = selectedRows.includes(index);
                      return (
                        <tr
                          key={index}
                          className={`transition-colors ${isSelected ? 'bg-[#f0f7ff]' : 'hover:bg-[#fafafa]'}`}
                        >
                          <td className="py-2.5 px-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectRow(index)}
                              className="rounded border-[#d1d5db] text-[#0051c3] focus:ring-0 cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-2"></td>
                          <td className="py-2.5 px-3 font-medium text-[#111827] truncate max-w-[140px]">
                            {record.name}
                          </td>
                          <td className="py-2.5 px-3 font-bold text-[#111827] font-sans">
                            {record.type}
                          </td>
                          <td className="py-2.5 px-3 font-normal text-[#374151] break-all max-w-[340px]">
                            {record.content}
                          </td>
                          <td className="py-2.5 px-3 font-sans">
                            {record.proxyStatus === 'proxied' ? (
                              <div className="inline-flex items-center gap-1.5 text-[#374151]">
                                <OrangeCloudIcon />
                                <span>Proxied</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1.5 text-[#6b7280]">
                                <GrayCloudIcon />
                                <span>DNS only</span>
                              </div>
                            )}
                          </td>
                          <td className="py-2.5 px-3 font-sans text-[#6b7280]">
                            {record.ttl}
                          </td>
                          <td className="py-2.5 px-3 text-right font-sans">
                            <button className="text-[#0051c3] hover:underline font-medium text-[11px]">
                              Edit
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination / Row Counter */}
            <div className="text-xs text-[#6b7280] mt-3">
              Showing 1-9 of 9
            </div>
          </main>
        </div>

        {/* ───────── Cloudflare Footer ───────── */}
        <footer className="border-t border-[#e5e7eb] bg-white px-4 py-3 text-[11px] text-[#6b7280] flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
          <a href="#" className="hover:text-[#111827] hover:underline">Support</a>
          <a href="#" className="hover:text-[#111827] hover:underline">System Status</a>
          <a href="#" className="hover:text-[#111827] hover:underline">Careers</a>
          <a href="#" className="hover:text-[#111827] hover:underline">Terms of Use</a>
          <a href="#" className="hover:text-[#111827] hover:underline">Report Security Issues</a>
          <a href="#" className="hover:text-[#111827] hover:underline">Privacy Policy</a>
          <span className="inline-flex items-center gap-1 hover:text-[#111827] cursor-pointer">
            <span className="text-[#0051c3]">☑</span> Cookie Preferences
          </span>
          <span>© 2026 Cloudflare, Inc.</span>
        </footer>
      </div>
    </section>
  );
}
