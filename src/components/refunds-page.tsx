'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface RefundsPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function RefundsPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: RefundsPageProps) {
  const headingClass = `text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`;
  const subheadingClass = `text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`;
  const borderClass = isLightMode ? 'border-black/10' : 'border-white/10';

  return (
    <div
      id="refunds-page"
      className={`min-h-screen pt-28 sm:pt-32 pb-20 px-4 sm:px-8 md:px-12 lg:px-24 transition-colors duration-300 ${
        isLightMode ? 'bg-[#fbfbfd] text-[#1d1d1f]' : 'bg-[#08080a] rc-page-grain-08080a text-[#F4F4F2]'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col min-h-[calc(100vh-12rem)] justify-between">
        <div>
          {/* Back navigation */}
          <div className="mb-10">
            <button
              onClick={onBackToHome}
              data-cursor="grow"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-colors border ${
                isLightMode
                  ? 'bg-black/5 hover:bg-black/10 text-neutral-700 hover:text-black border-black/10'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Return to Home</span>
            </button>
          </div>

          <div className="space-y-6 sm:space-y-8 font-sans">
            <div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider mb-2">Legal Specification</div>
              <h1 className={`text-3xl sm:text-4xl font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                Refund Policy
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last updated: September 4, 2026</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {/* PREAMBLE */}
              <section className="space-y-3">
                <p>
                  This Refund Policy governs all purchases made through Relay Capture&apos;s Services at{' '}
                  <a href="https://relaycapture.com" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    relaycapture.com
                  </a>.
                  It should be read in conjunction with our{' '}
                  <a href="/terms" className="underline hover:text-white">Terms of Service</a>{' '}
                  and{' '}
                  <a href="/privacy" className="underline hover:text-white">Privacy Notice</a>,
                  both of which are incorporated herein by reference.
                </p>
                <p>
                  By completing a purchase, you acknowledge that you have read, understood, and agreed to this Refund Policy in its entirety.
                </p>
              </section>

              {/* 1. MERCHANT OF RECORD */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  1. MERCHANT OF RECORD
                </h2>
                <p>
                  All payments are processed by <strong>Paddle.com Market Limited (&quot;Paddle&quot;)</strong>, our Merchant of Record. Paddle handles all billing, transaction processing, regional currency conversion, and global sales tax/VAT compliance. The charge on your bank or credit card statement will appear as &quot;PADDLE.NET* RELAYCAPT&quot; or a similar Paddle descriptor.
                </p>
                <p>
                  Relay Capture operates strictly as the technical infrastructure fulfillment partner. We are responsible for provisioning and delivering the purchased Fleet infrastructure after Paddle confirms successful payment settlement. For billing inquiries, receipt requests, or payment disputes, you may contact Paddle directly through the link provided in your purchase receipt, or contact us at{' '}
                  <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                    sam@relaycapture.com
                  </a>{' '}
                  and we will assist in routing your inquiry. For full details on the Merchant of Record relationship, see our{' '}
                  <a href="/terms" className="underline hover:text-white">Terms of Service</a>, Section 2.
                </p>
              </section>

              {/* 2. NON-REFUNDABLE POLICY & CAPEX ALLOCATION */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  2. NON-REFUNDABLE POLICY &amp; CAPITAL EXPENDITURE ALLOCATION
                </h2>
                <p>
                  <strong>All sales are strictly non-refundable once automated provisioning initiates.</strong>
                </p>
                <p>
                  When Paddle confirms successful payment, Relay Capture immediately and automatically begins the 48-hour provisioning sequence. This automated process triggers irrevocable third-party capital expenditures that are permanently committed on your behalf:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Domain Registrar Acquisitions:</strong> Dedicated sending domains are purchased from ICANN-accredited registrars. Domain registrations are contractually non-refundable once completed—registrars do not accept returns of registered domain names.
                  </li>
                  <li>
                    <strong>Dedicated Tenant Reservations:</strong> Google Workspace (or equivalent) enterprise mailbox licenses are provisioned per-inbox. These represent committed per-seat costs that are activated immediately and cannot be reversed or refunded by the upstream provider.
                  </li>
                  <li>
                    <strong>Network Routing Configurations:</strong> DNS zone files are propagated across global nameserver infrastructure. SPF, DKIM, and DMARC records are generated and published. Reverse PTR (rDNS) records are configured with upstream IP providers. DKIM cryptographic key pairs are generated. These configurations represent engineering labor and infrastructure commitment that are permanently deployed.
                  </li>
                </ul>
                <p>
                  Because these expenditures are committed to third parties within minutes of payment confirmation and cannot be unwound, reversed, or returned, we cannot offer refunds, credits, or exchanges once provisioning has begun—regardless of the reason for the request.
                </p>
                <p>
                  This includes, without limitation: change of mind, business pivot, dissatisfaction with email deliverability outcomes, low open/response rates, spam folder placement by third-party ISPs, or any other performance outcome that falls outside our explicit DNS compliance warranty (see Section 3 below).
                </p>
              </section>

              {/* 3. SOLE EXCEPTION — FAILED DNS COMPLIANCE */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  3. SOLE EXCEPTION — FAILED RFC DNS COMPLIANCE VERIFICATION
                </h2>
                <p>
                  <strong>The sole and exclusive circumstance under which a refund will be issued is if Relay Capture fails to deliver a Fleet that passes strict cryptographic DNS compliance verification within the 48-hour Service Level Agreement (SLA) window.</strong>
                </p>
                <h3 className={subheadingClass}>
                  What constitutes &quot;DNS compliance&quot;
                </h3>
                <p>
                  DNS compliance means that each provisioned domain in the Fleet meets all four of the following criteria, as verifiable by standard public DNS lookup tools:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>A valid <strong>SPF</strong> record published in the domain&apos;s DNS zone, authorizing the designated sending IP addresses</li>
                  <li>A valid <strong>DKIM</strong> key pair generated and the public key published as a DNS TXT record, with all outbound messages cryptographically signed</li>
                  <li>A valid <strong>DMARC</strong> policy record published at <code className="text-xs">_dmarc.&lt;domain&gt;</code></li>
                  <li>Forward <strong>PTR</strong> (A record) and reverse <strong>PTR</strong> (rDNS) alignment for all designated sending IP addresses</li>
                </ul>
                <h3 className={subheadingClass}>
                  How this exception works
                </h3>
                <p>
                  If any domain in your Fleet fails to achieve DNS compliance within 48 hours of payment confirmation:
                </p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Contact us at{' '}
                    <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">sam@relaycapture.com</a>{' '}
                    within <strong>seven (7) calendar days</strong> of the 48-hour SLA expiration, identifying the specific domain(s) that failed verification
                  </li>
                  <li>We will independently verify the DNS records using public lookup tools</li>
                  <li>If our verification confirms the failure, we will issue a refund for the proportional Engineering Fee attributable to the specific non-compliant domain(s) — calculated at $100 USD per failed domain</li>
                  <li>Refunds will be processed through Paddle and returned to your original payment method within 5–10 business days</li>
                </ol>
                <p>
                  For clarity: if you purchased a 10-domain Fleet ($1,000 USD) and 2 domains fail DNS compliance verification within 48 hours, you are entitled to a $200 USD refund. The remaining 8 compliant domains remain active and non-refundable.
                </p>
              </section>

              {/* 4. NO DELIVERABILITY OR INBOX PLACEMENT WARRANTY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  4. NO DELIVERABILITY OR INBOX PLACEMENT WARRANTY
                </h2>
                <p>
                  <strong>Email deliverability, inbox placement, open rates, response rates, and sender reputation outcomes are explicitly excluded from refund eligibility.</strong>
                </p>
                <p>
                  Our warranty covers DNS compliance only (SPF, DKIM, DMARC, forward/reverse PTR alignment). We do not and cannot guarantee how third-party mail servers (Google Gmail/Workspace, Microsoft Outlook/365/Exchange Online Protection, Yahoo Mail, Apple Mail Privacy Protection, or any other ISP) will classify, filter, route, delay, quarantine, or reject emails sent from the provisioned Fleet.
                </p>
                <p>
                  Third-party spam filtering algorithms, machine learning classifiers, and reputation scoring systems are operated at the sole discretion of those third parties. Inbox placement outcomes are a function of the Client&apos;s email content, sending volume, sending patterns, list quality, recipient engagement, and numerous other variables that are entirely outside Relay Capture&apos;s control.
                </p>
                <p>
                  For full details, see our{' '}
                  <a href="/terms" className="underline hover:text-white">Terms of Service</a>, Section 8 (No Deliverability or Inbox Placement Warranty).
                </p>
              </section>

              {/* 5. ACCEPTABLE USE VIOLATIONS */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  5. ACCEPTABLE USE VIOLATIONS — NO REFUND ON SEVERANCE
                </h2>
                <p>
                  If Fleet infrastructure is suspended, disabled, or permanently severed due to a violation of our{' '}
                  <a href="/terms" className="underline hover:text-white">Acceptable Use Policy</a>{' '}
                  (Terms of Service, Section 9)—including but not limited to phishing, credential harvesting, malware distribution, financial fraud, or illegal outreach—<strong>no refund of any kind will be issued</strong>.
                </p>
                <p>
                  Relay Capture&apos;s determination that a violation has occurred is final, absolute, and not subject to appeal, arbitration, or judicial review. The Client waives any and all claims arising from infrastructure severance under this provision.
                </p>
              </section>

              {/* 6. LIMITATION OF LIABILITY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  6. LIMITATION OF LIABILITY
                </h2>
                <p>
                  In all cases, Relay Capture&apos;s total aggregate liability for any and all claims arising out of or related to a purchase shall be <strong>strictly capped at the exact amount paid by the Client (via Paddle) for the specific order giving rise to the claim in the thirty (30) days immediately preceding the incident</strong>.
                </p>
                <p>
                  This cap applies regardless of the legal theory under which liability is asserted (contract, tort, strict liability, statutory, or otherwise) and regardless of whether we have been advised of the possibility of such damages.
                </p>
                <p>
                  For full details on liability limitations, see our{' '}
                  <a href="/terms" className="underline hover:text-white">Terms of Service</a>, Section 19 (Limitation of Liability).
                </p>
              </section>

              {/* 7. CHARGEBACKS & DISPUTES */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  7. CHARGEBACKS &amp; PAYMENT DISPUTES
                </h2>
                <p>
                  If you believe a charge is unauthorized or incorrect, we strongly encourage you to contact us at{' '}
                  <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                    sam@relaycapture.com
                  </a>{' '}
                  before initiating a chargeback with your bank or card issuer. We are committed to resolving legitimate billing errors promptly.
                </p>
                <p>
                  Chargebacks initiated for legitimately delivered services (i.e., Fleet infrastructure that passed DNS compliance verification within 48 hours) may be contested by Paddle as the Merchant of Record, with full documentation of service delivery and DNS verification records.
                </p>
                <p>
                  Fraudulent chargebacks—chargebacks filed after receiving and using the provisioned Fleet infrastructure—may result in immediate infrastructure severance and may be reported to fraud prevention networks.
                </p>
              </section>

              {/* 8. CONTACT INFORMATION */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  8. CONTACT INFORMATION
                </h2>
                <p>
                  If you have questions regarding this Refund Policy, need to report a failed DNS compliance verification, or have any billing-related inquiry, please contact our support team:
                </p>
                <div className="font-mono text-xs space-y-1 pl-2 border-l border-white/20">
                  <p>Relay Capture</p>
                  <p>
                    Email:{' '}
                    <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                      sam@relaycapture.com
                    </a>
                  </p>
                </div>
                <p className="text-xs">
                  For billing, receipts, tax invoices, or payment disputes handled by Paddle (Merchant of Record), use the support link provided in your purchase confirmation email, or contact us and we will route your inquiry to Paddle on your behalf.
                </p>
                <p className="text-xs">
                  This Refund Policy, together with our{' '}
                  <a href="/terms" className="underline hover:text-white">Terms of Service</a>{' '}
                  and{' '}
                  <a href="/privacy" className="underline hover:text-white">Privacy Notice</a>,
                  constitutes the complete set of binding legal documents governing your purchase and use of the Services.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Global Footer Bottom Bar */}
        <div className="pt-16 sm:pt-20">
          <FooterBottom
            isLightMode={isLightMode}
            onNavigateToTerms={onNavigateToTerms}
            onNavigateToPrivacy={onNavigateToPrivacy}
            onNavigateToRefunds={onNavigateToRefunds}
          />
        </div>
      </div>
    </div>
  );
}
