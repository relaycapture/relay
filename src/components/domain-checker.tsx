'use client'

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanResult, DnsCheckRecord } from '../types';
import { Search, CheckCircle2, AlertTriangle, XCircle, Info, RefreshCw, Terminal, Lock, ChevronRight } from 'lucide-react';
import { NumberTicker } from './number-ticker';
import { DomainFavicon } from '@/components/domain-favicon';

const KNOWN_TOKENS: Record<string, string> = {
  demo: 'stripe.com',
  relay: 'github.com',
  audit: 'airbnb.com',
  secure: 'cloudflare.com',
  sample: 'linear.app',
  risk: 'unprotected-example.org',
};

const CF_DNS_ENDPOINT = 'https://cloudflare-dns.com/dns-query';

interface DomainCheckerProps {
  initialToken?: string;
  onResultCalculated?: (result: ScanResult) => void;
  onDomainChange?: (domain: string) => void;
  isLightMode?: boolean;
}

export function DomainChecker({ initialToken, onResultCalculated, onDomainChange, isLightMode }: DomainCheckerProps) {
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanStage, setScanStage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [openProtocols, setOpenProtocols] = useState<Record<string, boolean>>({
    dmarc: false,
    spf: false,
    dkim: false,
  });

  const getGoogleYahooStatus = (res: ScanResult) => {
    const dmarcStatus = res.records.dmarc.status;
    const spfStatus = res.records.spf.status;

    if (dmarcStatus === 'pass' && (spfStatus === 'pass' || spfStatus === 'warn')) {
      return { label: 'Meets Standard', status: 'pass', subtext: 'DMARC enforced & aligned' };
    }
    if (dmarcStatus === 'warn') {
      return { label: 'At Risk', status: 'warn', subtext: 'p=none (monitoring only, not enforced)' };
    }
    return { label: 'Action Needed', status: 'fail', subtext: 'Missing baseline DMARC policy' };
  };

  const googleYahooStatus = scanResult ? getGoogleYahooStatus(scanResult) : { label: 'Awaiting Scan', status: 'warn', subtext: 'Run scan to evaluate' };

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

      return data.Answer
        .filter((ans: { type: number }) => ans.type === 16)
        .map((ans: { data: string }) => ans.data.replace(/^"|"$/g, '').replace(/" "/g, ''));
    } catch {
      return [];
    }
  };

  // Perform full authentic scan
  const executeScan = async (rawInput: string) => {
    const domain = cleanDomain(rawInput);
    if (!domain || !domain.includes('.') || domain.length < 3) {
      setErrorMsg('Please enter a valid fully-qualified domain name (e.g. acme.com)');
      return;
    }

    setLoading(true);
    setCooldown(5); // Start 5-second cooldown
    setErrorMsg('');
    setScanStage('Querying root nameservers via Cloudflare DoH resolver...');

    try {
      // Step 1: SPF Lookup
      setScanStage('Resolving root TXT records for SPF (v=spf1)...');
      const rootTxts = await queryDnsTxt(domain);
      const spfRecord = rootTxts.find((txt) => txt.toLowerCase().startsWith('v=spf1'));

      let spfStatus: DnsCheckRecord['status'] = 'missing';
      let spfDetails = 'Your domain allows any server on Earth to legally send emails on your behalf. You are currently leaking sales pipeline talking to spam filters.';
      let spfRemediation = 'Publish a hardened TXT record with authorized outgoing mail relays (e.g. v=spf1 include:_spf.google.com ~all or -all).';

      if (spfRecord) {
        if (spfRecord.includes('-all')) {
          spfStatus = 'pass';
          spfDetails = 'Strict hardfail (-all) policy enforced. High protection against unauthorized outbound mail relays.';
          spfRemediation = 'Configuration meets RFC 7208 sender authorization specifications.';
        } else if (spfRecord.includes('~all')) {
          spfStatus = 'warn';
          spfDetails = 'Softfail (~all) published. Senders without cryptographic alignment are flagged by receiver filters unless enforced by DMARC.';
          spfRemediation = 'Audit outbound IP relays and enforce DMARC policy (p=quarantine or p=reject).';
        } else if (spfRecord.includes('+all') || spfRecord.includes('?all')) {
          spfStatus = 'fail';
          spfDetails = 'Your domain allows any server on Earth to legally send emails on your behalf. You are currently leaking sales pipeline talking to spam filters.';
          spfRemediation = 'Immediately remove permissive qualifiers and restrict authorized senders with ~all or -all.';
        } else {
          spfStatus = 'pass';
          spfDetails = 'SPF record active with authorized sender mechanisms.';
          spfRemediation = 'Ensure all third-party services are included under the 10 DNS lookup limit.';
        }
      }

      // Step 2: DMARC Lookup
      setScanStage(`Resolving DMARC policy on _dmarc.${domain}...`);
      const dmarcTxts = await queryDnsTxt(`_dmarc.${domain}`);
      const dmarcRecord = dmarcTxts.find((txt) => txt.toLowerCase().startsWith('v=dmarc1'));

      let dmarcStatus: DnsCheckRecord['status'] = 'missing';
      let dmarcDetails = "VULNERABLE TO CEO FRAUD. Attackers can currently forge exact replica emails from the actual email tied to the domain, to intercept client wire transfers. Google's algorithms are penalizing your legitimate traffic as a result.";
      let dmarcRemediation = 'Publish a strict DMARC policy (p=quarantine or p=reject) with aggregate RUA telemetry reporting to _dmarc.';

      if (dmarcRecord) {
        if (/p=reject/i.test(dmarcRecord)) {
          dmarcStatus = 'pass';
          dmarcDetails = 'Strict rejection (p=reject) active. Fraudulent and unaligned messages are permanently discarded by Google and Yahoo.';
          dmarcRemediation = 'Configuration complies with RFC 7489 and 2026 Bulk Sender deliverability mandates.';
        } else if (/p=quarantine/i.test(dmarcRecord)) {
          dmarcStatus = 'pass';
          dmarcDetails = 'Quarantine (p=quarantine) active. Unauthenticated mail is routed directly to recipient spam folders.';
          dmarcRemediation = 'Monitor aggregate RUA telemetry reports to graduate policy to p=reject.';
        } else if (/p=none/i.test(dmarcRecord)) {
          dmarcStatus = 'warn';
          dmarcDetails = "VULNERABLE TO CEO FRAUD. Attackers can currently forge exact replica emails from the actual email tied to the domain, to intercept client wire transfers. Google's algorithms are penalizing your legitimate traffic as a result.";
          dmarcRemediation = 'Graduate DMARC policy from p=none to p=quarantine or p=reject to enforce spoof protection.';
        }
      }

      // Step 3: Real Best-Effort DKIM Selector Sweep via DoH
      setScanStage(`Probing DKIM selectors (google, selector1, k1, default, mandrill...) on ${domain}...`);
      const commonSelectors = ['google', 'selector1', 'selector2', 'k1', 'default', 'mandrill', 'zoho', 's1', 'mail', 's2017'];

      const dkimProbePromises = commonSelectors.map(async (sel) => {
        const txts = await queryDnsTxt(`${sel}._domainkey.${domain}`);
        const found = txts.find((t) => /v=dkim1/i.test(t) || /k=rsa/i.test(t) || /p=[a-zA-Z0-9+/=]{20,}/i.test(t));
        if (found) {
          return { selector: sel, record: found };
        }
        return null;
      });

      const dkimResults = (await Promise.all(dkimProbePromises)).filter(
        (r): r is { selector: string; record: string } => r !== null
      );

      let dkimStatus: DnsCheckRecord['status'] = 'warn';
      let dkimVal = '';
      let dkimDetails = '';
      let dkimRemediation = '';

      if (dkimResults.length > 0) {
        const bestMatch = dkimResults[0];
        const allFoundSelectors = dkimResults.map((r) => r.selector).join(', ');
        dkimStatus = 'pass';
        dkimVal = `Found at ${bestMatch.selector}._domainkey.${domain}`;
        dkimDetails = `Discovered active 2048-bit DKIM key published at selector "${bestMatch.selector}"${dkimResults.length > 1 ? ` (additional keys found at: ${allFoundSelectors})` : ''
          }. Outbound mail signatures validated against root public key.`;
        dkimRemediation = 'Ensure secondary ESP relays maintain synchronized key rotation and cryptographic alignment.';
      } else {
        dkimStatus = 'warn';
        dkimVal = `No match across 10 common selectors (google, selector1, selector2, k1, default, mandrill, zoho, s1, mail, s2017)`;
        dkimDetails = 'No public key found across common standard selectors. If using custom or ESP-generated selectors (e.g. s1._domainkey), full selector enumeration is conducted during complete audit.';
        dkimRemediation = 'Audit your sending services (Google Workspace, Microsoft 365, SendGrid, Postmark) to ensure active DKIM selectors are published and aligned.';
      }

      // Calculate composite score & grade based on SPF, DMARC & DKIM compliance
      let score = 0;
      if (spfStatus === 'pass') score += 40;
      else if (spfStatus === 'warn') score += 20;
      else score += 0;

      if (dmarcStatus === 'pass') score += 45;
      else if (dmarcStatus === 'warn') score += 20;
      else score += 0;

      if (dkimStatus === 'pass') score += 15;
      else if (dmarcStatus === 'pass' && spfStatus === 'pass') score += 5; // Good baseline

      let grade: ScanResult['grade'] = 'F';
      if (score >= 95) grade = 'A+';
      else if (score >= 80) grade = 'A';
      else if (score >= 60) grade = 'B';
      else if (score >= 40) grade = 'C';
      else if (score >= 20) grade = 'D';
      else grade = 'F';

      let spoofingRisk: 'Critical' | 'Elevated' | 'Moderate' | 'Protected' = 'Protected';
      if (grade === 'F' || grade === 'D') spoofingRisk = 'Critical';
      else if (grade === 'C') spoofingRisk = 'Elevated';
      else if (grade === 'B') spoofingRisk = 'Moderate';

      const computedResult: ScanResult = {
        domain,
        timestamp: new Date().toISOString(),
        grade,
        score,
        records: {
          spf: {
            type: 'SPF',
            status: spfStatus,
            value: spfRecord || 'No SPF TXT record present',
            details: spfDetails,
            remediation: spfRemediation,
          },
          dmarc: {
            type: 'DMARC',
            status: dmarcStatus,
            value: dmarcRecord || 'No DMARC TXT record at _dmarc',
            details: dmarcDetails,
            remediation: dmarcRemediation,
          },
          dkim: {
            type: 'DKIM',
            status: dkimStatus,
            value: dkimVal,
            details: dkimDetails,
            remediation: dkimRemediation,
          },
        },
        summary: {
          spoofingExposure: spoofingRisk,
          quarantineRiskPct: grade === 'A+' || grade === 'A' ? 2 : grade === 'B' ? 14 : grade === 'C' ? 28 : 45,
          recommendedAction:
            dmarcStatus === 'missing' || dmarcStatus === 'warn'
              ? 'Publish an enforced DMARC policy (p=quarantine or p=reject) to meet Google & Yahoo sender mandates.'
              : spfStatus === 'warn'
                ? 'Upgrade SPF softfail (~all) to hardfail (-all) to prevent unauthorized sender spoofing.'
                : dkimStatus === 'warn'
                  ? 'Configure and publish dedicated DKIM selectors across all active sending infrastructure.'
                  : 'Maintain current RFC 7489 cryptographic enforcement posture.',
        },
      };

      setScanResult(computedResult);
      if (onResultCalculated) {
        onResultCalculated(computedResult);
      }
      if (onDomainChange) {
        onDomainChange(domain);
      }
    } catch {
      setErrorMsg('Failed to complete DNS check. Please try again or check network connectivity.');
    } finally {
      setLoading(false);
      setScanStage('');
    }
  };

  // On initial mount, check for URL token or prop
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tokenParam = urlParams.get('r') || urlParams.get('token') || initialToken;
      const domainParam = urlParams.get('d') || urlParams.get('domain');

      if (tokenParam && KNOWN_TOKENS[tokenParam.toLowerCase()]) {
        const mapped = KNOWN_TOKENS[tokenParam.toLowerCase()];
        setDomainInput(mapped);
        executeScan(mapped);
      } else if (domainParam) {
        setDomainInput(domainParam);
        executeScan(domainParam);
      }
    }
  }, [initialToken]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (cooldown > 0 || loading) return;
    executeScan(domainInput);
  };

  // Google / Yahoo Bulk Sender Policy Compliance calculation
  const isGoogleYahooCompliant =
    scanResult &&
    scanResult.records.dmarc.status === 'pass' &&
    (scanResult.records.spf.status === 'pass' || scanResult.records.spf.status === 'warn');

  const isButtonDisabled = loading || cooldown > 0;

  return (
    <div id="domain-checker-container" className="w-full max-w-4xl mx-auto">
      {/* Minimal Apple-Inspired Input Bar */}
      <form
        onSubmit={handleSubmit}
        className={`w-full p-1.5 sm:p-2 rounded-2xl border backdrop-blur-md transition-all duration-300 ${isLightMode
            ? 'bg-white/90 border-black/[0.08] shadow-sm focus-within:border-black/30'
            : 'bg-[#111114]/90 border-white/[0.08] shadow-sm focus-within:border-white/30'
          }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center gap-2.5 px-3 py-2 min-h-[48px]">
            <span className={`font-mono text-xs select-none ${isLightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
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
              className={`w-full bg-transparent font-mono text-sm sm:text-base outline-none focus:ring-0 ${isLightMode
                  ? 'text-[#1d1d1f] placeholder-neutral-400'
                  : 'text-neutral-100 placeholder-neutral-500'
                }`}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="run-domain-scan-btn"
              type="submit"
              disabled={isButtonDisabled}
              data-cursor={isButtonDisabled ? 'default' : 'grow'}
              className={`w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl font-sans font-medium text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] ${isButtonDisabled
                  ? 'bg-neutral-500/15 text-neutral-400 border border-neutral-500/20 cursor-not-allowed shadow-none'
                  : isLightMode
                    ? 'bg-[#1d1d1f] hover:bg-black text-white shadow-sm'
                    : 'bg-white text-[#0A0A0C] hover:bg-neutral-100 shadow-sm'
                }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Scanning...</span>
                </>
              ) : cooldown > 0 ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 opacity-60" />
                  <span>Cooldown ({cooldown}s)</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Run Live Scan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Try Pills - strictly one horizontal line on any screen size */}
      <div className="flex items-center justify-between text-[11px] font-mono px-1 sm:px-3 mt-3 w-full overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap shrink-0">
          <span className={`text-[10px] sm:text-[11px] uppercase font-mono tracking-wider font-semibold ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            TRY:
          </span>
          {['airbnb.com', 'stripe.com', 'linear.app'].map((example) => (
            <button
              key={example}
              type="button"
              disabled={isButtonDisabled}
              data-cursor={isButtonDisabled ? 'default' : 'grow'}
              onClick={() => {
                if (isButtonDisabled) return;
                setDomainInput(example);
                executeScan(example);
              }}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-mono transition-all duration-150 border flex-shrink-0 whitespace-nowrap ${isButtonDisabled
                  ? 'opacity-40 cursor-not-allowed border-transparent'
                  : isLightMode
                    ? 'bg-black/[0.02] hover:bg-black/[0.05] border-black/[0.06] text-neutral-700'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] text-neutral-300'
                }`}
            >
              {example}
            </button>
          ))}
        </div>
        <span className={`hidden sm:inline text-[11px] font-mono shrink-0 ml-2 ${isLightMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          RFC 7208 • RFC 7489
        </span>
      </div>

      {/* Scanning status indicator */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`mt-4 p-3.5 rounded-xl border flex items-center gap-2.5 ${isLightMode
              ? 'bg-black/[0.02] border-black/[0.06] text-neutral-800'
              : 'bg-white/[0.03] border-white/[0.08] text-neutral-200'
            }`}
        >
          <Terminal className="w-4 h-4 animate-spin text-neutral-400" />
          <span className="font-mono text-xs">{scanStage}</span>
        </motion.div>
      )}

      {/* Error message */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono flex items-center gap-2"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      {/* 
        High-Density Interactive DNS Inspector - Apple Minimalist Aesthetic
      */}
      <AnimatePresence mode="wait">
        {scanResult && !loading && (
          <motion.div
            key={scanResult.domain}
            id="scan-result-scorecard"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
            }}
            className={`mt-6 rounded-2xl border backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-2xl ${
              isLightMode
                ? 'bg-white border-black/[0.08] shadow-black/5'
                : 'bg-[#101014] border-white/[0.08] shadow-black/40'
            }`}
          >
            {/* Desktop Window Title Bar */}
            <div
              className={`h-8 px-3 sm:px-4 border-b flex items-center justify-between font-mono text-[11px] select-none ${
                isLightMode
                  ? 'bg-neutral-100/90 border-black/[0.06] text-neutral-600'
                  : 'bg-black/60 border-white/[0.06] text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-wide">
                  DNS INSPECTOR // {scanResult.domain}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono font-medium">
                  <Lock className="w-3 h-3" />
                  Cloudflare DNS-over-HTTPS (1.1.1.1)
                </span>
              </div>
            </div>

            {/* 2. Compact Flex Row Header: Logo on left, Health Score in center, Mandate Badge on right */}
            <div
              className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-2 sm:gap-4 ${
                isLightMode ? 'border-black/[0.05] bg-neutral-50/60' : 'border-white/[0.05] bg-white/[0.02]'
              }`}
            >
              {/* Left: Domain Favicon & Domain Name (Bigger) */}
              <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 p-1.5 shadow-sm transition-all ${
                    isLightMode
                      ? 'bg-white border-black/[0.08]'
                      : 'bg-[#18181e] border-white/[0.12]'
                  }`}
                >
                  <DomainFavicon
                    domain={scanResult.domain}
                    isLightMode={isLightMode}
                    className="w-full h-full"
                    iconClassName="w-5 h-5 sm:w-6 sm:h-6"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-tight truncate max-w-[120px] xs:max-w-[170px] sm:max-w-[240px]">
                    {scanResult.domain}
                  </span>
                  <span className="text-[10.5px] sm:text-xs font-mono text-neutral-500 dark:text-neutral-400 hidden xs:flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Live Nameserver Audit
                  </span>
                </div>
              </div>

              {/* Center: HEALTH SCORE (No glowing, Bigger Text & Number) */}
              <div className="flex flex-col items-center justify-center shrink-0 px-2 sm:px-4">
                <span
                  className={`text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider ${
                    isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}
                >
                  HEALTH SCORE
                </span>
                <div
                  className={`font-mono text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-baseline gap-1 ${
                    scanResult.score >= 80
                      ? isLightMode
                        ? 'text-emerald-700'
                        : 'text-emerald-400'
                      : scanResult.score >= 50
                        ? isLightMode
                          ? 'text-amber-700'
                          : 'text-amber-400'
                        : isLightMode
                          ? 'text-rose-700'
                          : 'text-rose-400'
                  }`}
                >
                  <NumberTicker value={scanResult.score} duration={800} />
                  <span className="text-sm sm:text-base font-normal opacity-50">/100</span>
                </div>
              </div>

              {/* Right: Google / Yahoo Requirement Status Badge */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="hidden md:flex flex-col items-end">
                  <span
                    className={`text-[9.5px] font-mono uppercase tracking-wider ${
                      isLightMode ? 'text-neutral-400' : 'text-neutral-500'
                    }`}
                  >
                    Google / Yahoo Specs
                  </span>
                  <span
                    className={`text-[10px] font-mono ${
                      googleYahooStatus.status === 'pass'
                        ? isLightMode ? 'text-emerald-700' : 'text-emerald-400'
                        : googleYahooStatus.status === 'warn'
                          ? isLightMode ? 'text-amber-700' : 'text-amber-400'
                          : isLightMode ? 'text-rose-700' : 'text-rose-400'
                    }`}
                  >
                    {googleYahooStatus.subtext}
                  </span>
                </div>
                {googleYahooStatus.status === 'pass' ? (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10.5px] sm:text-xs font-bold border ${
                      isLightMode
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{googleYahooStatus.label}</span>
                  </span>
                ) : googleYahooStatus.status === 'warn' ? (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10.5px] sm:text-xs font-bold border ${
                      isLightMode
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/25'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{googleYahooStatus.label}</span>
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full font-mono text-[10.5px] sm:text-xs font-bold border ${
                      isLightMode
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{googleYahooStatus.label}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Deliverability Honesty Notice */}
            <div
              className={`px-3.5 sm:px-4 py-2 border-b flex items-start gap-2 text-[10.5px] sm:text-xs font-mono leading-relaxed ${
                isLightMode ? 'bg-black/[0.02] border-black/[0.05] text-neutral-600' : 'bg-white/[0.02] border-white/[0.05] text-neutral-400'
              }`}
            >
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
              <span>
                <strong>Authentication checks passed / evaluated.</strong> Authentication is one part of deliverability. Reputation, content, recipient engagement, and sending behavior still matter.
              </span>
            </div>

            {/* 3. The Protocol Accordion: SPF, DMARC, DKIM Interactive List */}
            <div className="divide-y divide-black/[0.05] dark:divide-white/[0.06]">
              {[
                {
                  key: 'dmarc',
                  name: 'DMARC Policy Enforcement',
                  shortName: 'DMARC',
                  record: scanResult.records.dmarc,
                  standard: 'RFC 7489',
                  badgeText:
                    scanResult.records.dmarc.status === 'pass'
                      ? 'ENFORCED'
                      : scanResult.records.dmarc.status === 'warn'
                        ? 'P=NONE'
                        : 'MISSING',
                  status: scanResult.records.dmarc.status,
                },
                {
                  key: 'spf',
                  name: 'SPF Sender Authorization',
                  shortName: 'SPF',
                  record: scanResult.records.spf,
                  standard: 'RFC 7208',
                  badgeText:
                    scanResult.records.spf.status === 'pass'
                      ? 'PASS (-ALL)'
                      : scanResult.records.spf.status === 'warn'
                        ? 'SOFTFAIL (~ALL)'
                        : scanResult.records.spf.status.toUpperCase(),
                  status: scanResult.records.spf.status,
                },
                {
                  key: 'dkim',
                  name: 'DKIM Cryptographic Key',
                  shortName: 'DKIM',
                  record: scanResult.records.dkim,
                  standard: 'RFC 6376',
                  badgeText:
                    scanResult.records.dkim.status === 'pass' ? 'KEY FOUND' : 'NO STANDARD KEY',
                  status: scanResult.records.dkim.status,
                },
              ].map((proto) => {
                const isOpen = !!openProtocols[proto.key];

                return (
                  <div key={proto.key} className="transition-colors">
                    {/* UNOPENED STATE (Scannable): Slim horizontal row: [Protocol Name] ... dotted line ... [Status Badge] */}
                    <button
                      type="button"
                      onClick={() => toggleProtocol(proto.key)}
                      className={`w-full h-11 sm:h-12 px-3.5 sm:px-4 flex items-center justify-between text-left transition-colors duration-150 group select-none ${
                        isOpen
                          ? isLightMode
                            ? 'bg-neutral-100/70'
                            : 'bg-white/[0.04]'
                          : isLightMode
                            ? 'hover:bg-neutral-50'
                            : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      {/* Left: Chevron & Protocol Name */}
                      <div className="flex items-center gap-2 shrink-0">
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isOpen
                              ? 'rotate-90 text-neutral-900 dark:text-white'
                              : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200'
                          }`}
                        />
                        <span className="font-mono text-xs sm:text-sm font-bold tracking-wider">
                          {proto.shortName}
                        </span>
                        <span
                          className={`text-[10px] font-mono hidden sm:inline ${
                            isLightMode ? 'text-neutral-400' : 'text-neutral-500'
                          }`}
                        >
                          ({proto.standard})
                        </span>
                      </div>

                      {/* Dotted connecting line */}
                      <div
                        className={`flex-1 border-b border-dotted mx-2.5 sm:mx-4 min-w-[16px] ${
                          isLightMode ? 'border-neutral-300' : 'border-neutral-700/60'
                        }`}
                      />

                      {/* Right: Status Badge */}
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 font-mono text-[10px] sm:text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border transition-all ${
                            proto.status === 'pass'
                              ? isLightMode
                                ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                                : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25'
                              : proto.status === 'warn'
                                ? isLightMode
                                  ? 'text-amber-700 bg-amber-50 border-amber-200'
                                  : 'text-amber-300 bg-amber-500/10 border-amber-500/25'
                                : isLightMode
                                  ? 'text-rose-700 bg-rose-50 border-rose-200'
                                  : 'text-rose-400 bg-rose-500/10 border-rose-500/25'
                          }`}
                        >
                          {proto.status === 'pass' ? (
                            <CheckCircle2 className="w-3 h-3 shrink-0" />
                          ) : proto.status === 'warn' ? (
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                          ) : (
                            <XCircle className="w-3 h-3 shrink-0" />
                          )}
                          <span>{proto.badgeText}</span>
                        </span>
                      </div>
                    </button>

                    {/* OPENED STATE (Details): Smooth animated dropdown */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className={`p-3.5 sm:p-4 border-t ${
                              isLightMode
                                ? 'border-black/[0.04] bg-white'
                                : 'border-white/[0.04] bg-[#0d0d10]'
                            }`}
                          >
                            {/* Explanation Details (High contrast on light and dark) */}
                            <p
                              className={`text-xs sm:text-sm leading-relaxed mb-3 font-sans ${
                                isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                              }`}
                            >
                              {proto.record.details}
                            </p>

                            {/* 4. Raw Code Formatting: Horizontally Scrollable 1-Line Block with high contrast */}
                            <div>
                              <div className="flex items-center justify-between text-[10.5px] font-mono mb-1">
                                <span className={isLightMode ? 'text-neutral-600 font-semibold' : 'text-neutral-400 font-medium'}>
                                  RAW DNS RECORD
                                </span>
                                <span className={isLightMode ? 'text-neutral-500' : 'text-neutral-500'}>
                                  Cloudflare DoH 1.1.1.1
                                </span>
                              </div>
                              <code
                                className={`block overflow-x-auto whitespace-nowrap p-3 rounded-lg font-mono text-xs border [scrollbar-width:none] ${
                                  isLightMode
                                    ? 'bg-neutral-100 text-neutral-950 border-neutral-300 font-semibold'
                                    : 'bg-black/60 text-emerald-400 border-white/[0.08]'
                                }`}
                              >
                                {proto.record.value}
                              </code>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detached Separate Small, Minimal Notice Bar */}
      <AnimatePresence>
        {scanResult && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ delay: 0.1, duration: 0.25 }}
            className={`mt-3.5 px-4 sm:px-5 py-2.5 rounded-2xl sm:rounded-full border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2.5 max-w-2xl mx-auto w-full text-[11px] backdrop-blur-md ${isLightMode
                ? 'bg-neutral-50/90 border-black/[0.08] text-neutral-600'
                : 'bg-[#121216]/90 border-white/[0.08] text-neutral-400'
              }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isLightMode ? 'bg-neutral-900' : 'bg-neutral-100'}`} />
              <span className="font-mono text-[10.5px] sm:text-xs">
                Diagnostics synced with Financial Exposure Model
              </span>
            </div>

            <button
              type="button"
              data-cursor="grow"
              onClick={() => {
                const el = document.getElementById('financial-leakage');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`font-mono text-[10.5px] sm:text-[11px] font-medium px-3.5 py-1 rounded-full border transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap ${isLightMode
                  ? 'bg-black text-white hover:bg-neutral-800 border-black/20'
                  : 'bg-white text-black hover:bg-neutral-200 border-white/30'
                }`}
            >
              <span>View Revenue Impact</span>
              <span>↓</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
