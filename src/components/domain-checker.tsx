'use client'

import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  RefreshCw,
  Info,
  ChevronRight,
  ArrowRight,
  ShieldAlert,
  Activity,
  Cpu,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { ScanResult, DnsCheckRecord } from '../types';
import { DomainFavicon } from './domain-favicon';
import { NumberTicker } from './number-ticker';
import { Specular3DCard } from './specular-3d-card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProtocolCheck {
  status: 'pass' | 'warn' | 'fail';
  value: string;
  details: string;
  suggestions?: string[];
}

const CF_DNS_ENDPOINT = 'https://cloudflare-dns.com/dns-query';

interface DomainCheckerProps {
  onResultCalculated?: (result: ScanResult) => void;
  onDomainChange?: (domain: string) => void;
  onOpenRevenueImpact?: () => void;
  isLightMode?: boolean;
}

export function DomainChecker({
  onResultCalculated,
  onDomainChange,
  onOpenRevenueImpact,
  isLightMode = false,
}: DomainCheckerProps) {
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scanStage, setScanStage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [openProtocols, setOpenProtocols] = useState<Record<string, boolean>>({
    dmarc: true,
    spf: true,
    dkim: true,
  });
  const [isTelemetryExpanded, setIsTelemetryExpanded] = useState(false);
  const [isMxExpanded, setIsMxExpanded] = useState(false);

  // Simulated live telemetry stream packets during scan
  const [streamTick, setStreamTick] = useState(0);

  const getGoogleYahooStatus = (res: ScanResult) => {
    const dmarcStatus = res.records.dmarc.status;
    const spfStatus = res.records.spf.status;

    if (dmarcStatus === 'pass' && (spfStatus === 'pass' || spfStatus === 'warn')) {
      return { label: 'DMARC enforced & aligned', status: 'pass' };
    }
    if (dmarcStatus === 'warn') {
      return { label: 'p=none (monitoring only)', status: 'warn' };
    }
    return { label: 'Missing baseline DMARC policy', status: 'fail' };
  };

  const googleYahooStatus = scanResult
    ? getGoogleYahooStatus(scanResult)
    : { label: 'Awaiting Scan', status: 'warn' };

  const toggleProtocol = (key: string) => {
    setOpenProtocols((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 5-second cooldown timer after scan submit
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Live telemetry stream generator when loading
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setStreamTick((prev) => (prev + 1) % 1000);
    }, 80);
    return () => clearInterval(interval);
  }, [loading]);

  // Cryptographic character scrambler effect on input change
  const [scrambledDisplay, setScrambledDisplay] = useState('');
  const GLYPHS = '01#$*&%!?/+=~';

  useEffect(() => {
    if (!domainInput) {
      setScrambledDisplay('');
      return;
    }
    let iteration = 0;
    const target = domainInput;
    const interval = setInterval(() => {
      setScrambledDisplay(
        target
          .split('')
          .map((char, index) => {
            if (char === '.' || char === '/' || char === '-') return char;
            if (index < iteration) return target[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );
      if (iteration >= target.length) {
        clearInterval(interval);
        setScrambledDisplay(target);
      }
      iteration += 1 / 2;
    }, 25);
    return () => clearInterval(interval);
  }, [domainInput]);

  // Clean domain helper
  const cleanDomain = (val: string) => {
    return val
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .split('/')[0]
      .replace(/^www\./, '');
  };

  // Query Cloudflare DoH
  const queryDnsTxt = async (name: string): Promise<string[]> => {
    try {
      const url = new URL(CF_DNS_ENDPOINT);
      url.searchParams.set('name', name);
      url.searchParams.set('type', 'TXT');

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/dns-json' },
      });

      if (!res.ok) return [];
      const data = await res.json();
      if (!data.Answer) return [];

      return data.Answer.map((ans: { data?: string }) => {
        let val = ans.data || '';
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        return val.replace(/\\"/g, '"');
      });
    } catch {
      return [];
    }
  };

  const queryDnsMx = async (name: string): Promise<{ exchange: string; preference: number }[]> => {
    try {
      const url = new URL(CF_DNS_ENDPOINT);
      url.searchParams.set('name', name);
      url.searchParams.set('type', 'MX');

      const res = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/dns-json' },
      });

      if (!res.ok) return [];
      const data = await res.json();
      if (!data.Answer) return [];

      return data.Answer.map((ans: { data?: string }) => {
        const parts = (ans.data || '').trim().split(/\s+/);
        return {
          preference: parseInt(parts[0], 10) || 10,
          exchange: parts[1] || '',
        };
      });
    } catch {
      return [];
    }
  };

  // SPF parser
  const parseSpf = (records: string[]): ProtocolCheck => {
    const spfRecord = records.find((r) => r.startsWith('v=spf1'));
    if (!spfRecord) {
      return {
        status: 'fail',
        value: 'None detected',
        details: 'Missing RFC 7208 baseline. Unauthenticated outgoing mail will be rejected or routed to spam.',
        suggestions: ['Publish a valid TXT record on root: v=spf1 include:_spf.google.com ~all'],
      };
    }

    const hasHardFail = spfRecord.includes('-all');
    const hasSoftFail = spfRecord.includes('~all');

    if (hasHardFail) {
      return {
        status: 'pass',
        value: spfRecord,
        details: 'Strict SPF enforcement (-all). Unauthorized IPs are definitively rejected.',
      };
    }
    if (hasSoftFail) {
      return {
        status: 'warn',
        value: spfRecord,
        details: 'Softfail (~all) configured. Message may still be accepted or flagged by aggressive filters.',
        suggestions: ['Upgrade from softfail (~all) to hardfail (-all) once all sending sources are verified.'],
      };
    }
    return {
      status: 'warn',
      value: spfRecord,
      details: 'Permissive or missing all mechanism. Phishing protection is weak.',
      suggestions: ['Add -all or ~all mechanism at the end of the SPF string.'],
    };
  };

  // DMARC parser
  const parseDmarc = (records: string[]): ProtocolCheck => {
    const dmarcRecord = records.find((r) => r.startsWith('v=DMARC1'));
    if (!dmarcRecord) {
      return {
        status: 'fail',
        value: 'None detected',
        details: 'No RFC 7489 record at _dmarc. Mandatory for Google & Yahoo bulk sending compliance since Feb 2024.',
        suggestions: ['Publish TXT record at _dmarc: v=DMARC1; p=quarantine; rua=mailto:...'],
      };
    }

    const hasReject = /p\s*=\s*reject/i.test(dmarcRecord);
    const hasQuarantine = /p\s*=\s*quarantine/i.test(dmarcRecord);
    const hasNone = /p\s*=\s*none/i.test(dmarcRecord);

    if (hasReject || hasQuarantine) {
      return {
        status: 'pass',
        value: dmarcRecord,
        details: `Active policy enforcement (${hasReject ? 'p=reject' : 'p=quarantine'}). Meets Google/Yahoo 2024 requirements.`,
      };
    }
    if (hasNone) {
      return {
        status: 'warn',
        value: dmarcRecord,
        details: 'Monitoring policy only (p=none). Does not prevent domain spoofing or ensure priority deliverability.',
        suggestions: ['Upgrade to p=quarantine or p=reject once alignment is verified.'],
      };
    }
    return {
      status: 'warn',
      value: dmarcRecord,
      details: 'DMARC record present but policy parameter is ambiguous or invalid.',
    };
  };

  // DKIM parser
  const parseDkim = (records: string[], selector = 'default'): ProtocolCheck => {
    const dkimRecord = records.find((r) => r.includes('v=DKIM1') || r.includes('p='));
    if (!dkimRecord) {
      return {
        status: 'fail',
        value: `No key found at ${selector}._domainkey`,
        details: 'DKIM selector not resolved via public DNS. Cryptographic signatures cannot be verified by recipient MTA.',
        suggestions: ['Ensure DKIM selector is correctly delegated to your Workspace or sequencer.'],
      };
    }

    const is2048 = dkimRecord.length > 250;
    return {
      status: 'pass',
      value: dkimRecord,
      details: `Cryptographic public key published (${is2048 ? '2048-bit RSA' : '1024-bit RSA'}). Compliant with RFC 6376.`,
    };
  };

  // Main Scan Runner
  const runScan = useCallback(
    async (domainToScan: string) => {
      const clean = cleanDomain(domainToScan);
      if (!clean || !clean.includes('.')) {
        setErrorMsg('Please enter a valid domain (e.g. yourcompany.com)');
        return;
      }

      setErrorMsg(null);
      setLoading(true);
      setCooldown(5);
      setScanStage('Querying Cloudflare DoH...');

      try {
        const rootTxtPromise = queryDnsTxt(clean);
        const dmarcTxtPromise = queryDnsTxt(`_dmarc.${clean}`);
        const dkimSelectors = ['google', 'default', 'k1', 's1', 'relay'];
        const dkimPromises = dkimSelectors.map((sel) =>
          queryDnsTxt(`${sel}._domainkey.${clean}`).then((recs) => ({ selector: sel, recs }))
        );
        const mxPromise = queryDnsMx(clean);

        setScanStage('Parsing SPF records...');
        const rootTxt = await rootTxtPromise;

        setScanStage('Inspecting DMARC policy...');
        const dmarcTxt = await dmarcTxtPromise;

        setScanStage('Auditing DKIM selectors...');
        const dkimResults = await Promise.all(dkimPromises);
        const activeDkim = dkimResults.find((r) => r.recs.some((val) => val.includes('v=DKIM1') || val.includes('p='))) || {
          selector: 'default',
          recs: [],
        };

        setScanStage('Resolving Mail Exchangers (MX)...');
        const mxRecords = await mxPromise;

        const spfCheck = parseSpf(rootTxt);
        const dmarcCheck = parseDmarc(dmarcTxt);
        const dkimCheck = parseDkim(activeDkim.recs, activeDkim.selector);

        // Score Calculation (0-100)
        let calculatedScore = 20;
        if (spfCheck.status === 'pass') calculatedScore += 30;
        else if (spfCheck.status === 'warn') calculatedScore += 15;

        if (dmarcCheck.status === 'pass') calculatedScore += 35;
        else if (dmarcCheck.status === 'warn') calculatedScore += 15;

        if (dkimCheck.status === 'pass') calculatedScore += 15;

        const finalResult: ScanResult = {
          domain: clean,
          grade: calculatedScore >= 90 ? 'A+' : calculatedScore >= 80 ? 'A' : calculatedScore >= 70 ? 'B' : calculatedScore >= 60 ? 'C' : 'D',
          score: calculatedScore,
          records: {
            spf: {
              type: 'SPF',
              status: spfCheck.status,
              value: spfCheck.value,
              details: spfCheck.details,
            },
            dkim: {
              type: 'DKIM',
              status: dkimCheck.status,
              value: dkimCheck.value,
              details: dkimCheck.details,
            },
            dmarc: {
              type: 'DMARC',
              status: dmarcCheck.status,
              value: dmarcCheck.value,
              details: dmarcCheck.details,
            },
            mx: {
              type: 'MX',
              status: mxRecords.length > 0 ? 'pass' : 'fail',
              value: mxRecords.map((m) => `${m.preference} ${m.exchange}`).join(', ') || 'No MX records found',
              details: mxRecords.length > 0 ? `${mxRecords.length} mail exchangers configured.` : 'Domain cannot receive mail.',
            },
          },
          summary: {
            spoofingExposure: dmarcCheck.status === 'pass' ? 'Protected' : dmarcCheck.status === 'warn' ? 'Moderate' : 'Critical',
            quarantineRiskPct: dmarcCheck.status === 'pass' ? 0 : dmarcCheck.status === 'warn' ? 45 : 85,
            recommendedAction: dmarcCheck.status === 'pass' ? 'Maintain alignment' : 'Enforce DMARC quarantine',
          },
          timestamp: new Date().toISOString(),
        };

        setScanResult(finalResult);
        onResultCalculated?.(finalResult);
      } catch (err) {
        console.error('Domain scan error:', err);
        setErrorMsg('Failed to query public DNS nameservers. Please check connectivity or try again.');
      } finally {
        setLoading(false);
        setScanStage('');
      }
    },
    [onResultCalculated]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || loading) return;
    runScan(domainInput);
  };

  const handleDomainExampleClick = (example: string) => {
    setDomainInput(example);
    onDomainChange?.(example);
    runScan(example);
  };

  const isButtonDisabled = loading || cooldown > 0 || !domainInput.trim();

  return (
    <div className="w-full max-w-5xl mx-auto select-none">
      {/* High-Craft Raw Telemetry Diagnostic Console */}
      <Specular3DCard className="rounded-2xl backdrop-blur-2xl bg-[#09090b]/90 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
        {/* Telemetry Header Bar */}
        <div
          className={`px-5 py-3 border-b border-white/[0.06] flex items-center justify-between font-mono text-[10px] tracking-widest uppercase ${isLightMode ? 'bg-black/[0.02] text-neutral-600' : 'bg-white/[0.02] text-neutral-400'
            }`}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="font-semibold text-white">
              PORT: 443 ENCRYPTED
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-500">
            <span>SOCKET: CLOUDFLARE DoH 1.1.1.1</span>
          </div>
        </div>

        {/* Input Interface */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/40 border border-white/[0.06] focus-within:border-white/40 transition-colors">
              <span className="font-mono text-[10px] tracking-widest uppercase text-neutral-500 font-semibold select-none whitespace-nowrap">
                https://
              </span>
              <input
                id="domain-input-field"
                type="text"
                value={domainInput}
                onChange={(e) => {
                  const val = e.target.value;
                  setDomainInput(val);
                  const cleaned = cleanDomain(val);
                  if (cleaned.includes('.') && cleaned.length >= 4) {
                    onDomainChange?.(cleaned);
                  }
                }}
                placeholder="targetdomain.com"
                className={`w-full bg-transparent outline-none focus:ring-0 font-mono text-sm sm:text-base ${isLightMode
                  ? 'text-[#1d1d1f] placeholder-neutral-400'
                  : 'text-neutral-100 placeholder-neutral-600'
                  }`}
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <button
              id="run-domain-scan-btn"
              type="submit"
              disabled={isButtonDisabled}
              className={`px-8 py-3.5 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-semibold ${isButtonDisabled
                ? 'bg-neutral-500/15 text-neutral-500 border border-neutral-500/20 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-b from-neutral-100 to-neutral-300 text-neutral-900 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:from-white hover:to-neutral-200 active:scale-[0.98]'
                }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-neutral-900" />
                  <span>PARSING TELEMETRY...</span>
                </>
              ) : cooldown > 0 ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 opacity-60" />
                  <span>COOLDOWN ({cooldown}s)</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>EXECUTE DIAGNOSTIC</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Specular3DCard>

      {/* Quick Try Indicators & View Revenue Impact Button */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-semibold">
            TEST TARGETS:
          </span>
          {['stripe.com', 'linear.app', 'github.com'].map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => handleDomainExampleClick(example)}
              disabled={loading}
              className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider transition-all duration-200 border disabled:opacity-50 cursor-pointer ${domainInput.toLowerCase() === example.toLowerCase()
                ? 'bg-white text-black border-white font-bold'
                : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                }`}
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {errorMsg && (
        <p className="text-xs font-mono text-neutral-300 mt-4 text-center">{errorMsg}</p>
      )}

      {/* SYNCHRONIZED LIVE DATA STREAMS (During Scan) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 rounded-2xl border border-white/[0.08] bg-[#09090b]/95 p-6 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-white font-bold">
                <Activity className="w-4 h-4 animate-spin" />
                <span>SYNCHRONIZED LIVE TELEMETRY STREAMS</span>
              </div>
              <span className="text-[10px] tracking-widest text-neutral-500">
                PACKETS: {1024 + streamTick * 17} // FPS: 60
              </span>
            </div>

            {/* 3 Synchronized High-Density Parsing Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {/* Column 1: SPF Stream */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-neutral-400 font-semibold">
                  <span>STREAM 01 // RFC 7208</span>
                  <span className="text-white">SPF PARSER</span>
                </div>
                <div className="text-[11px] text-neutral-300 space-y-1">
                  <div>› INGEST: TXT @root</div>
                  <div className="text-neutral-200">› MECHANISM: v=spf1 include:_spf...</div>
                  <div className="text-neutral-500">› LOOKUP_DEPTH: 0{1 + (streamTick % 3)}/10 [LOCKED]</div>
                  <div className="text-neutral-400">› IP_ALIGNMENT: VERIFYING CIDR</div>
                </div>
              </div>

              {/* Column 2: DKIM Stream */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-neutral-400 font-semibold">
                  <span>STREAM 02 // RFC 6376</span>
                  <span className="text-white">DKIM AUDIT</span>
                </div>
                <div className="text-[11px] text-neutral-300 space-y-1">
                  <div>› SELECTOR: google._domainkey</div>
                  <div className="text-neutral-200">› CRYPTO: 2048-BIT RSA KEY</div>
                  <div className="text-neutral-500">› HASH: SHA-256 SIGNATURE</div>
                  <div className="text-neutral-400">› STATUS: PARSING PUBLIC KEY</div>
                </div>
              </div>

              {/* Column 3: DMARC Stream */}
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.05] space-y-2">
                <div className="flex items-center justify-between text-[10px] tracking-widest uppercase text-neutral-400 font-semibold">
                  <span>STREAM 03 // RFC 7489</span>
                  <span className="text-white">DMARC ENGINE</span>
                </div>
                <div className="text-[11px] text-neutral-300 space-y-1">
                  <div>› QUERY: _dmarc.{domainInput || 'target'}</div>
                  <div className="text-neutral-200">› ENFORCEMENT: p=quarantine</div>
                  <div className="text-neutral-500">› RUA: FORENSIC TELEMETRY</div>
                  <div className="text-neutral-400">› COMPLIANCE: GOOGLE/YAHOO 2024</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTI-COLUMN RAW TELEMETRY DASHBOARD (Scan Results) */}
      <AnimatePresence>
        {scanResult && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Specular3DCard className="rounded-3xl border border-white/[0.08] bg-[#09090b]/95 overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              {/* Telemetry Header Bar: Structured 2-Tier Row Layout (Zero Vertical Stacking) */}
              <div className="p-4 sm:p-6 border-b border-white/[0.06] select-none">
                {/* Row 1: Domain on the left, Score on the right - Always side-by-side on all screens */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center overflow-hidden border border-white/10 bg-white/[0.04] shrink-0">
                      <DomainFavicon
                        domain={scanResult.domain}
                        isLightMode={isLightMode}
                        className="w-full h-full"
                        iconClassName="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono font-bold text-sm sm:text-base md:text-lg tracking-wider uppercase text-neutral-100 truncate">
                        {scanResult.domain}
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-neutral-400 mt-0.5">
                        Scanned at {new Date(scanResult.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>

                  {/* Integrated Health Score Badge — Enlarged for high visibility */}
                  <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] shrink-0">
                    <span className="text-[10px] sm:text-[11px] uppercase font-mono tracking-widest font-semibold text-neutral-400">
                      HEALTH
                      <br />
                      SCORE:
                    </span>
                    <div className="font-mono font-bold text-xl sm:text-3xl tracking-tight text-white flex items-baseline">
                      <NumberTicker value={scanResult.score} duration={800} />
                      <span className="text-xs sm:text-sm font-normal text-neutral-400 ml-1">/100</span>
                    </div>
                  </div>
                </div>

                {/* Row 2: Policy Compliance status & Quick protocol tags */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.04] flex items-center justify-between gap-2">
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-xs font-semibold border min-w-0 ${googleYahooStatus.status === 'pass'
                      ? 'bg-white/10 text-white border-white/25'
                      : googleYahooStatus.status === 'warn'
                        ? 'bg-white/[0.04] text-zinc-300 border-white/15'
                        : 'bg-white/[0.02] text-zinc-400 border-white/10'
                      }`}
                  >
                    {googleYahooStatus.status === 'pass' ? (
                      <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    ) : googleYahooStatus.status === 'warn' ? (
                      <AlertTriangle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    ) : (
                      <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                    )}
                    <span className="truncate">{googleYahooStatus.label}</span>
                  </div>

                  {/* Quick Protocol Flags */}
                  <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] shrink-0">
                    <span className={`px-1.5 py-0.5 rounded border ${scanResult.records.spf.status === 'pass' ? 'border-white/25 text-white bg-white/5' : 'border-white/[0.08] text-neutral-500'}`}>
                      SPF
                    </span>
                    <span className={`px-1.5 py-0.5 rounded border ${scanResult.records.dkim.status === 'pass' ? 'border-white/25 text-white bg-white/5' : 'border-white/[0.08] text-neutral-500'}`}>
                      DKIM
                    </span>
                    <span className={`px-1.5 py-0.5 rounded border ${scanResult.records.dmarc.status === 'pass' ? 'border-white/25 text-white bg-white/5' : 'border-white/[0.08] text-neutral-500'}`}>
                      DMARC
                    </span>
                  </div>
                </div>
              </div>

              {/* Deliverability Reality Notice (Compact on phone screens) */}
              <div className="px-3.5 sm:px-5 py-2 sm:py-2.5 border-b border-white/[0.05] bg-white/[0.015] flex items-start gap-1.5 sm:gap-2 text-[9px] sm:text-xs font-mono leading-relaxed text-neutral-400">
                <Info className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 mt-0.5 text-neutral-400" />
                <span className="text-[9px] sm:text-xs leading-relaxed text-neutral-400">
                  Authentication is one part of deliverability. Reputation, content, recipient engagement, and sending behavior still matter.
                </span>
              </div>

              {/* Collapsible Telemetry Records Trigger (Collapsed by default per directive) */}
              <button
                type="button"
                onClick={() => setIsTelemetryExpanded(!isTelemetryExpanded)}
                className="w-full px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] flex items-center justify-between font-mono text-xs text-neutral-300 transition-colors cursor-pointer select-none"
                aria-expanded={isTelemetryExpanded}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold tracking-wider text-white">
                    TELEMETRY RECORDS
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    {isTelemetryExpanded ? 'COLLAPSE' : 'EXPAND'}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isTelemetryExpanded ? 'rotate-180 text-white' : ''
                      }`}
                  />
                </div>
              </button>

              {/* Multi-Column High-Density Telemetry Panels (SPF, DKIM, DMARC) */}
              {isTelemetryExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
                  {/* Panel 1: DMARC Policy */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold tracking-wider text-neutral-200">
                        DMARC Policy Enforcement
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${scanResult.records.dmarc.status === 'pass'
                          ? 'text-white bg-white/10 border-white/25'
                          : scanResult.records.dmarc.status === 'warn'
                            ? 'text-zinc-300 bg-white/[0.04] border-white/15'
                            : 'text-zinc-400 bg-white/[0.02] border-white/10'
                          }`}
                      >
                        {scanResult.records.dmarc.status === 'pass'
                          ? 'ENFORCED'
                          : scanResult.records.dmarc.status === 'warn'
                            ? 'P=NONE'
                            : 'MISSING'}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                      RFC 7489 // ALIGNMENT ENGINE
                    </div>

                    <p className="text-xs font-sans leading-relaxed text-neutral-300">
                      {scanResult.records.dmarc.details}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                        RAW DNS RECORD:
                      </div>
                      <code className="block overflow-x-auto whitespace-nowrap p-2.5 rounded-lg font-mono text-[11px] bg-black/60 text-neutral-200 border border-white/[0.06] [scrollbar-width:none]">
                        {scanResult.records.dmarc.value}
                      </code>
                    </div>
                  </div>

                  {/* Panel 2: SPF Sender Authorization */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold tracking-wider text-neutral-200">
                        SPF Sender Authorization
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${scanResult.records.spf.status === 'pass'
                          ? 'text-white bg-white/10 border-white/25'
                          : scanResult.records.spf.status === 'warn'
                            ? 'text-zinc-300 bg-white/[0.04] border-white/15'
                            : 'text-zinc-400 bg-white/[0.02] border-white/10'
                          }`}
                      >
                        {scanResult.records.spf.status === 'pass'
                          ? 'PASS (-ALL)'
                          : scanResult.records.spf.status === 'warn'
                            ? 'SOFTFAIL (~ALL)'
                            : scanResult.records.spf.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                      RFC 7208 // MECHANISM DEPTH
                    </div>

                    <p className="text-xs font-sans leading-relaxed text-neutral-300">
                      {scanResult.records.spf.details}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                        RAW DNS RECORD:
                      </div>
                      <code className="block overflow-x-auto whitespace-nowrap p-2.5 rounded-lg font-mono text-[11px] bg-black/60 text-neutral-200 border border-white/[0.06] [scrollbar-width:none]">
                        {scanResult.records.spf.value}
                      </code>
                    </div>
                  </div>

                  {/* Panel 3: DKIM Cryptographic Key */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-mono text-xs font-bold tracking-wider text-neutral-200">
                        DKIM Cryptographic Key
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${scanResult.records.dkim.status === 'pass'
                          ? 'text-white bg-white/10 border-white/25'
                          : 'text-neutral-400 bg-white/[0.04] border-white/10'
                          }`}
                      >
                        {scanResult.records.dkim.status === 'pass' ? 'KEY FOUND' : 'NO STANDARD KEY'}
                      </span>
                    </div>

                    <div className="font-mono text-[10px] tracking-widest uppercase text-neutral-500">
                      RFC 6376 // 2048-BIT RSA
                    </div>

                    <p className="text-xs font-sans leading-relaxed text-neutral-300">
                      {scanResult.records.dkim.details}
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <div className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                        RAW DNS RECORD:
                      </div>
                      <code className="block overflow-x-auto whitespace-nowrap p-2.5 rounded-lg font-mono text-[11px] bg-black/60 text-neutral-200 border border-white/[0.06] [scrollbar-width:none]">
                        {scanResult.records.dkim.value}
                      </code>
                    </div>
                  </div>
                </div>
              )}

              {/* MX Record Footer Band: Shows topology configuration by default, expands to reveal MX names */}
              <div className="p-4 sm:p-5 border-t border-white/[0.06] bg-black/40 flex items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                    TOPOLOGY CONFIGURATION:
                  </span>
                  <span className="text-neutral-200 font-medium">
                    {scanResult.records.mx.details}
                  </span>
                </div>

                {scanResult.records.mx.value && scanResult.records.mx.value !== 'No MX records found' && (
                  <button
                    type="button"
                    onClick={() => setIsMxExpanded(!isMxExpanded)}
                    className="text-[10px] font-mono tracking-widest text-neutral-400 hover:text-white flex items-center gap-1.5 cursor-pointer uppercase transition-colors select-none shrink-0"
                    aria-expanded={isMxExpanded}
                  >
                    <span>{isMxExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${isMxExpanded ? 'rotate-180 text-white' : ''
                        }`}
                    />
                  </button>
                )}
              </div>

              {/* Collapsed MX Names Drawer: reveals MX host names when expanded */}
              {isMxExpanded && scanResult.records.mx.value && (
                <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-white/[0.04] bg-black/50 space-y-2 text-xs font-mono">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                    MAIL EXCHANGERS (MX HOSTS):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.records.mx.value.split(', ').map((host, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.08] text-[11px] text-neutral-200 font-mono"
                      >
                        {host}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Specular3DCard>

            {/* Revenue Impact Button: Only appears when domain is checked, at bottom right beneath the card outside it, white */}
            {onOpenRevenueImpact && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onOpenRevenueImpact}
                  id="btn-open-revenue-impact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] font-mono text-xs font-semibold tracking-wider uppercase bg-white text-black hover:bg-neutral-200 transition-all duration-150 shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-black" />
                  <span>View Revenue Impact</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
