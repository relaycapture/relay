'use client'

import { useState } from 'react';
import { X, FileText, Code2 } from 'lucide-react';

interface SampleDeliverableModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLightMode?: boolean;
}

export function SampleDeliverableModal({ isOpen, onClose, isLightMode }: SampleDeliverableModalProps) {
  const [activeTab, setActiveTab] = useState<'pdf' | 'json'>('pdf');

  if (!isOpen) return null;

  const sampleJson = {
    audit_id: "rc_live_9f82d1c049",
    timestamp: "2026-08-22T21:10:00Z",
    target_domain: "██████████████.com",
    nameserver_authority: [
      "ns-cloud-e1.googledomains.com",
      "ns-cloud-e2.googledomains.com"
    ],
    computed_health_grade: "B+",
    composite_security_score: 78,
    spf_analysis: {
      status: "PASS_WITH_WARNING",
      record: "v=spf1 include:_spf.google.com include:sendgrid.net ip4:198.51.100.██ ~all",
      dns_lookup_count: 7,
      max_allowed_lookups: 10,
      terminator: "~all (Softfail)",
      vulnerability: "Permissive terminator enables unauthorized sender forging under specific MTAs"
    },
    dkim_signatures: [
      {
        selector: "google._domainkey",
        key_length_bits: 2048,
        algorithm: "rsa-sha256",
        status: "VALID_VERIFIED",
        public_key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA██████████████..."
      },
      {
        selector: "s1._domainkey",
        key_length_bits: 1024,
        algorithm: "rsa-sha256",
        status: "DEPRECATED_KEY_LENGTH",
        public_key: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC██████████████...",
        remediation_required: "Upgrade 1024-bit key to 2048-bit to satisfy Google 2024 compliance"
      }
    ],
    dmarc_policy: {
      status: "ENFORCING_QUARANTINE",
      record: "v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc-reports@████████.com; sp=none",
      subdomain_policy: "p=none (Subdomains Unprotected)",
      remediation: "Add sp=quarantine or sp=reject to prevent shadow subdomain spoofing"
    },
    remediation_punchlist: [
      {
        step: 1,
        target_record: "_dmarc.██████████.com",
        record_type: "TXT",
        action: "UPDATE",
        recommended_value: "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@relaycapture.com"
      },
      {
        step: 2,
        target_record: "@",
        record_type: "TXT",
        action: "HARDEN_SPF",
        recommended_value: "v=spf1 include:_spf.google.com include:sendgrid.net -all"
      }
    ]
  };

  return (
    <div
      id="sample-deliverable-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        id="sample-deliverable-modal-content"
        className={`rc-grain-surface relative w-full max-w-4xl max-h-[90vh] border rounded-3xl overflow-hidden shadow-2xl flex flex-col ${
          isLightMode ? 'bg-white border-black/15 text-black' : 'bg-[#0D0D11] border-white/20 text-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`px-4 sm:px-6 py-3.5 sm:py-4 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isLightMode ? 'bg-neutral-50 border-black/10' : 'bg-[#121218] border-white/10'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              isLightMode ? 'bg-black/5 text-black' : 'bg-white/10 text-white'
            }`}>
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-xs sm:text-sm flex items-center gap-2">
                <span>Confidential Deliverable Artifact (Redacted)</span>
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 font-mono text-[10px] text-neutral-400">
                  SAMPLE SPEC
                </span>
              </h3>
              <p className="font-mono text-[10px] sm:text-[11px] text-neutral-400">
                Generated via Relay Capture Engine v2.4
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            {/* Tab switch */}
            <div className={`flex items-center p-1 rounded-xl border text-xs font-mono min-h-[44px] ${
              isLightMode ? 'bg-black/5 border-black/10' : 'bg-black/40 border-white/10'
            }`}>
              <button
                onClick={() => setActiveTab('pdf')}
                data-cursor="grow"
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors min-h-[36px] ${
                  activeTab === 'pdf'
                    ? isLightMode
                      ? 'bg-black text-white font-semibold'
                      : 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive PDF</span>
              </button>
              <button
                onClick={() => setActiveTab('json')}
                data-cursor="grow"
                className={`px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors min-h-[36px] ${
                  activeTab === 'json'
                    ? isLightMode
                      ? 'bg-black text-white font-semibold'
                      : 'bg-white text-black font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>JSON Payload</span>
              </button>
            </div>

            <button
              onClick={onClose}
              data-cursor="grow"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors min-h-[40px] flex-shrink-0 ${
                isLightMode ? 'bg-black/5 hover:bg-black/10 text-neutral-700' : 'bg-white/5 hover:bg-white/15 text-neutral-400'
              }`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 ${isLightMode ? 'bg-[#f4f4f6]' : 'bg-[#09090C]'}`}>
          {activeTab === 'pdf' ? (
            /* PDF Document Mockup */
            <div className="max-w-2xl mx-auto rounded-xl bg-white text-[#0A0A0C] p-8 shadow-xl font-sans border border-neutral-300">
              {/* Document Header */}
              <div className="flex items-start justify-between border-b-2 border-neutral-900 pb-4 mb-6">
                <div>
                  <div className="font-mono text-[11px] font-bold tracking-widest text-neutral-600 uppercase">
                    RELAY CAPTURE INFRASTRUCTURE REPORT
                  </div>
                  <h4 className="text-2xl font-bold tracking-tight mt-1">
                    DNS Authentication & Risk Audit
                  </h4>
                  <div className="font-mono text-xs text-neutral-700 mt-1">
                    Domain Target: <span className="bg-neutral-900 text-neutral-900 select-none px-2 rounded">redacted-enterprise</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold font-mono text-neutral-900">
                    B+
                  </div>
                  <div className="font-mono text-[10px] text-neutral-600">
                    Health Score: 78/100
                  </div>
                </div>
              </div>

              {/* Section 1: Executive Summary */}
              <div className="mb-6">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-300 pb-1">
                  1. Executive Finding & Exposure Profile
                </h5>
                <p className="text-xs text-neutral-800 leading-relaxed">
                  The subject domain has published active SPF and DMARC records, successfully preventing direct impersonation attacks. However, a deprecated 1024-bit DKIM key combined with unmanaged subdomain inheritance exposes outbound corporate communications to selective quarantine.
                </p>
              </div>

              {/* Section 2: Concrete Technical Findings */}
              <div className="mb-6">
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-300 pb-1">
                  2. Protocol Audit Breakdown
                </h5>
                <div className="space-y-2 text-xs font-mono">
                  <div className="p-2.5 rounded bg-neutral-100 flex items-center justify-between">
                    <div>
                      <strong>SPF:</strong> v=spf1 include:_spf.google.com ~all
                    </div>
                    <span className="text-amber-700 font-bold">WARNING (Softfail)</span>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-100 flex items-center justify-between">
                    <div>
                      <strong>DKIM:</strong> selector1 (2048-bit) + s1 (1024-bit)
                    </div>
                    <span className="text-amber-700 font-bold">LEGACY KEY</span>
                  </div>
                  <div className="p-2.5 rounded bg-neutral-100 flex items-center justify-between">
                    <div>
                      <strong>DMARC:</strong> v=DMARC1; p=quarantine; pct=100
                    </div>
                    <span className="text-emerald-700 font-bold">ENFORCING</span>
                  </div>
                </div>
              </div>

              {/* Section 3: Exact Remediation Action Plan */}
              <div>
                <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2 border-b border-neutral-300 pb-1">
                  3. Exact Copy-Paste Remediation DNS Kit
                </h5>
                <div className="p-3 bg-neutral-900 text-neutral-200 font-mono text-[11px] rounded space-y-1.5">
                  <div className="text-neutral-400"># Step 1: Upgrade DMARC policy to Reject with Subdomain Lock</div>
                  <div className="text-white bg-neutral-800 p-1.5 rounded">
                    _dmarc TXT "v=DMARC1; p=reject; sp=reject; pct=100; rua=mailto:dmarc-rua@██████.com"
                  </div>
                  <div className="pt-1 text-neutral-400"># Step 2: Transition SPF terminator to Hardfail</div>
                  <div className="text-white bg-neutral-800 p-1.5 rounded">
                    @ TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* JSON Payload View */
            <div className={`p-6 rounded-2xl border overflow-x-auto ${
              isLightMode ? 'bg-white border-black/10' : 'bg-black/90 border-white/10'
            }`}>
              <pre className={`font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                isLightMode ? 'text-neutral-800' : 'text-neutral-200'
              }`}>
                {JSON.stringify(sampleJson, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLightMode ? 'bg-neutral-50 border-black/10' : 'bg-[#121218] border-white/10'
        }`}>
          <div className="text-xs font-mono text-neutral-400">
            Full unredacted report generated instantly upon tier checkout.
          </div>
          <button
            onClick={onClose}
            data-cursor="grow"
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-sans font-medium text-xs tracking-wide transition-colors ${
              isLightMode
                ? 'bg-black text-white hover:bg-neutral-800'
                : 'bg-white text-black hover:bg-neutral-200'
            }`}
          >
            Close Sample & Proceed to Tiers
          </button>
        </div>
      </div>
    </div>
  );
}
