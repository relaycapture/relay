'use client'

import { ArrowLeft } from 'lucide-react';
import { FooterBottom } from './footer-bottom';

interface TermsPageProps {
  onBackToHome: () => void;
  isLightMode?: boolean;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function TermsPage({
  onBackToHome,
  isLightMode,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: TermsPageProps) {
  const headingClass = `text-base sm:text-lg font-semibold ${isLightMode ? 'text-black' : 'text-white'}`;
  const subheadingClass = `text-sm sm:text-base font-medium ${isLightMode ? 'text-black' : 'text-white'}`;
  const borderClass = isLightMode ? 'border-black/10' : 'border-white/10';

  return (
    <div
      id="terms-page"
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
                Terms of Service
              </h1>
              <p className="font-mono text-xs text-neutral-400 mt-1">Last updated: September 4, 2026</p>
            </div>

            <div className={`prose prose-sm max-w-none space-y-6 leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
              {/* AGREEMENT */}
              <section className="space-y-3">
                <h2 className={headingClass}>
                  AGREEMENT TO OUR LEGAL TERMS
                </h2>
                <p>
                  We are Relay Capture (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), operating the website{' '}
                  <a href="https://relaycapture.com" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    https://relaycapture.com
                  </a>{' '}
                  (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
                </p>
                <p>
                  Relay Capture provides dedicated outbound email fleet infrastructure provisioning. Our Services include the acquisition, configuration, and management of dedicated sending domains, SMTP mailbox inboxes, and associated DNS authentication records (SPF, DKIM, DMARC, forward/reverse PTR) on behalf of customers (&quot;Clients&quot;) for legitimate cold outreach operations.
                </p>
                <p>
                  You can contact us by email at{' '}
                  <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                    sam@relaycapture.com
                  </a>.
                </p>
                <p>
                  These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and Relay Capture, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                </p>
                <p>
                  These Legal Terms should be read in conjunction with our{' '}
                  <a href="/privacy" className="underline hover:text-white">Privacy Notice</a>{' '}
                  and our{' '}
                  <a href="/refund" className="underline hover:text-white">Refund Policy</a>,
                  both of which are incorporated herein by reference.
                </p>
                <p>
                  Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
                </p>
                <p>
                  The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
                </p>
                <p>
                  We recommend that you print a copy of these Legal Terms for your records.
                </p>
              </section>

              {/* TABLE OF CONTENTS */}
              <section className={`space-y-2 pt-2 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  TABLE OF CONTENTS
                </h2>
                <ol className="list-decimal list-inside space-y-1 text-xs font-mono">
                  <li>OUR SERVICES</li>
                  <li>MERCHANT OF RECORD &amp; BILLING</li>
                  <li>INTELLECTUAL PROPERTY RIGHTS</li>
                  <li>USER REPRESENTATIONS</li>
                  <li>PURCHASES, PAYMENT &amp; CAPITAL EXPENDITURE ALLOCATION</li>
                  <li>REFUND POLICY &amp; NON-REFUNDABLE PROVISIONING</li>
                  <li>SERVICE DELIVERY &amp; DNS COMPLIANCE WARRANTY</li>
                  <li>NO DELIVERABILITY OR INBOX PLACEMENT WARRANTY</li>
                  <li>ACCEPTABLE USE &amp; ANTI-SPAM COMPLIANCE</li>
                  <li>PROHIBITED ACTIVITIES</li>
                  <li>SERVICES MANAGEMENT</li>
                  <li>PRIVACY POLICY</li>
                  <li>TERM AND TERMINATION</li>
                  <li>MODIFICATIONS AND INTERRUPTIONS</li>
                  <li>GOVERNING LAW</li>
                  <li>DISPUTE RESOLUTION</li>
                  <li>CORRECTIONS</li>
                  <li>DISCLAIMER</li>
                  <li>LIMITATION OF LIABILITY</li>
                  <li>INDEMNIFICATION</li>
                  <li>USER DATA</li>
                  <li>ELECTRONIC COMMUNICATIONS</li>
                  <li>CALIFORNIA USERS AND RESIDENTS</li>
                  <li>MISCELLANEOUS</li>
                  <li>CONTACT US</li>
                </ol>
              </section>

              {/* 1. OUR SERVICES */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  1. OUR SERVICES
                </h2>
                <p>
                  Relay Capture provides a dedicated outbound email infrastructure provisioning service (the &quot;Fleet&quot;). Upon purchase, we perform the following on the Client&apos;s behalf:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Acquisition of dedicated sending domains from third-party ICANN-accredited registrars</li>
                  <li>Provisioning of dedicated SMTP mailbox inboxes via Google Workspace or equivalent enterprise email providers</li>
                  <li>Configuration of cryptographic DNS authentication records: SPF (Sender Policy Framework), DKIM (DomainKeys Identified Mail), DMARC (Domain-based Message Authentication, Reporting &amp; Conformance), and forward/reverse PTR (Pointer Record) alignment</li>
                  <li>Dedicated tenant reservation and network routing configuration for outbound mail delivery</li>
                </ul>
                <p>
                  The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
                </p>
              </section>

              {/* 2. MERCHANT OF RECORD & BILLING */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  2. MERCHANT OF RECORD &amp; BILLING
                </h2>
                <p>
                  <strong>Paddle.com Market Limited (&quot;Paddle&quot;) acts as the Merchant of Record for all orders placed through the Services.</strong> This means Paddle—not Relay Capture—is the entity that:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Processes all payment transactions and captures funds from your payment instrument</li>
                  <li>Handles regional currency conversion at prevailing exchange rates at time of checkout</li>
                  <li>Calculates, collects, and remits all applicable sales tax, VAT, GST, and other transaction taxes required by your jurisdiction</li>
                  <li>Issues receipts, invoices, and manages all billing-related customer support</li>
                  <li>Manages chargeback disputes and payment compliance (PCI DSS)</li>
                </ul>
                <p>
                  Relay Capture operates strictly as the technical infrastructure fulfillment partner. We receive disbursements from Paddle after successful payment settlement and are responsible solely for provisioning and delivering the purchased Fleet infrastructure.
                </p>
                <p>
                  By completing a purchase, you agree to Paddle&apos;s{' '}
                  <a href="https://www.paddle.com/legal/terms" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    Privacy Policy
                  </a>{' '}
                  as the Merchant of Record for your transaction. The charge on your bank or credit card statement will appear as &quot;PADDLE.NET* RELAYCAPT&quot; or a similar Paddle descriptor.
                </p>
              </section>

              {/* 3. INTELLECTUAL PROPERTY RIGHTS */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  3. INTELLECTUAL PROPERTY RIGHTS
                </h2>
                <h3 className={subheadingClass}>
                  Our intellectual property
                </h3>
                <p>
                  We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the &quot;Content&quot;), as well as the trademarks, service marks, and logos contained therein (the &quot;Marks&quot;).
                </p>
                <p>
                  Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world. The Content and Marks are provided in or through the Services &quot;AS IS&quot; for your personal, non-commercial use or internal business purpose only.
                </p>
                <h3 className={subheadingClass}>
                  Your use of our Services
                </h3>
                <p>
                  Subject to your compliance with these Legal Terms, including the &quot;PROHIBITED ACTIVITIES&quot; section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.
                </p>
                <p>
                  Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
                </p>
              </section>

              {/* 4. USER REPRESENTATIONS */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  4. USER REPRESENTATIONS
                </h2>
                <p>
                  By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; (5) your use of the Services will not violate any applicable law or regulation; and (6) you have the legal authority to bind the entity on whose behalf you are purchasing, and that entity agrees to be bound by these Legal Terms.
                </p>
              </section>

              {/* 5. PURCHASES, PAYMENT & CAPITAL EXPENDITURE ALLOCATION */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  5. PURCHASES, PAYMENT &amp; CAPITAL EXPENDITURE ALLOCATION
                </h2>
                <p>
                  All purchases through the Services are one-time capital expenditure transactions. The Engineering Fee is calculated at <strong>$100 USD per domain</strong>, multiplied by the number of domains selected in the Fleet configurator (1–100 domains). The total fee is computed and locked server-side at the time of transaction creation and cannot be modified client-side.
                </p>
                <p>
                  We accept major credit cards, debit cards, PayPal, Google Pay, and Apple Pay through Paddle, our Merchant of Record (see Section 2). Paddle handles all currency conversion, tax calculation, and payment compliance. The price displayed at checkout is the price charged; all pricing is denominated in United States Dollars (USD) before any regional tax or currency conversion applied by Paddle.
                </p>
                <p>
                  <strong>Irrevocable Capital Expenditure Commitment.</strong> Upon successful payment confirmation, Relay Capture immediately and automatically initiates the 48-hour provisioning sequence. This triggers the following irrevocable third-party capital expenditures on your behalf:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Domain registrar acquisitions:</strong> Dedicated sending domains are purchased from ICANN-accredited registrars and registered for the Client&apos;s exclusive use. Once registered, domain names cannot be &quot;un-purchased&quot; or returned to the registrar for a refund.</li>
                  <li><strong>Dedicated tenant reservations:</strong> Google Workspace (or equivalent) enterprise mailbox licenses are provisioned per-inbox. These licenses represent committed per-seat costs that are non-refundable once activated.</li>
                  <li><strong>Network routing configurations:</strong> DNS zone files are propagated across global nameserver infrastructure, PTR records are configured with upstream IP providers, and DKIM key pairs are generated and published. These cryptographic and network configurations represent engineering labor and infrastructure commitment that cannot be reversed.</li>
                </ul>
                <p>
                  Because these third-party expenditures are permanently committed the moment automated provisioning begins, all sales are strictly non-refundable once the provisioning sequence initiates. See our{' '}
                  <a href="/refund" className="underline hover:text-white">Refund Policy</a>{' '}
                  for full details.
                </p>
              </section>

              {/* 6. REFUND POLICY & NON-REFUNDABLE PROVISIONING */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  6. REFUND POLICY &amp; NON-REFUNDABLE PROVISIONING
                </h2>
                <p>
                  All sales processed through the Services are <strong>strictly non-refundable</strong> once the automated 48-hour provisioning clock has begun. This policy exists because payment confirmation triggers immediate, irrevocable third-party capital expenditures (domain registrations, enterprise mailbox licenses, and DNS/network configurations) that cannot be unwound.
                </p>
                <p>
                  <strong>Sole Exception — Failed RFC Verification:</strong> If, and only if, Relay Capture fails to deliver a fully provisioned Fleet that passes strict cryptographic DNS compliance verification (valid SPF, DKIM, DMARC, and forward/reverse PTR alignment) within the 48-hour Service Level Agreement window, the Client is entitled to a full refund of the Engineering Fee for the specific domains that failed verification.
                </p>
                <p>
                  For the complete refund policy, including the refund request procedure and timeline, see our{' '}
                  <a href="/refund" className="underline hover:text-white">Refund Policy</a>.
                </p>
              </section>

              {/* 7. SERVICE DELIVERY & DNS COMPLIANCE WARRANTY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  7. SERVICE DELIVERY &amp; DNS COMPLIANCE WARRANTY
                </h2>
                <p>
                  Relay Capture warrants that each provisioned Fleet will achieve full cryptographic DNS compliance within forty-eight (48) hours of payment confirmation. &quot;Full cryptographic DNS compliance&quot; is defined as:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>A valid SPF record published in the domain&apos;s DNS zone, authorizing the designated sending IP addresses</li>
                  <li>A valid DKIM key pair generated and the public key published as a DNS TXT record, with all outbound messages cryptographically signed</li>
                  <li>A valid DMARC policy record published in the domain&apos;s DNS zone at <code className="text-xs">_dmarc.&lt;domain&gt;</code></li>
                  <li>Forward PTR (A record) and reverse PTR (rDNS) alignment for all designated sending IP addresses</li>
                </ul>
                <p>
                  This 48-hour SLA is the sole and exclusive delivery warranty provided by Relay Capture. If the Fleet fails to achieve the above DNS compliance within 48 hours, the Client&apos;s sole remedy is a refund as described in our{' '}
                  <a href="/refund" className="underline hover:text-white">Refund Policy</a>.
                </p>
              </section>

              {/* 8. NO DELIVERABILITY OR INBOX PLACEMENT WARRANTY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  8. NO DELIVERABILITY OR INBOX PLACEMENT WARRANTY
                </h2>
                <p>
                  <strong>RELAY CAPTURE EXPLICITLY DISCLAIMS ANY AND ALL WARRANTIES, REPRESENTATIONS, OR GUARANTEES REGARDING EMAIL DELIVERABILITY, INBOX PLACEMENT, OPEN RATES, RESPONSE RATES, SENDER REPUTATION SCORES, OR THE BEHAVIOR OF THIRD-PARTY SPAM FILTERING ALGORITHMS.</strong>
                </p>
                <p>
                  Our warranty is limited exclusively to cryptographic DNS compliance as defined in Section 7 above. We guarantee that SPF, DKIM, DMARC, and forward/reverse PTR records will be correctly configured and verifiable within 48 hours.
                </p>
                <p>
                  We do not and cannot guarantee that emails sent from the provisioned Fleet will:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Reach any specific recipient&apos;s inbox (primary, promotions, social, updates, or any other folder/tab)</li>
                  <li>Avoid classification as spam, junk, or bulk mail by any recipient mail server</li>
                  <li>Achieve any specific open rate, click rate, reply rate, or conversion metric</li>
                  <li>Pass any proprietary reputation scoring system operated by Google (Gmail/Postmaster Tools), Microsoft (Outlook/Hotmail/Exchange Online Protection), Yahoo, Apple Mail Privacy Protection, or any other email service provider or Internet Service Provider (ISP)</li>
                </ul>
                <p>
                  Third-party spam filtering algorithms, machine learning classifiers, and reputation scoring systems are operated entirely at the discretion of those third parties (Google Workspace, Microsoft 365, Yahoo Mail, Apple, et al.). Relay Capture has no control over, affiliation with, or influence upon these systems. Inbox placement outcomes are a function of the Client&apos;s email content, sending volume, sending patterns, list quality, recipient engagement, and dozens of other variables that are entirely outside Relay Capture&apos;s control.
                </p>
              </section>

              {/* 9. ACCEPTABLE USE & ANTI-SPAM COMPLIANCE */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  9. ACCEPTABLE USE &amp; ANTI-SPAM COMPLIANCE
                </h2>
                <p>
                  <strong>The Client retains 100% legal liability for all email content transmitted through the provisioned Fleet and for compliance with all applicable anti-spam, privacy, and electronic communications statutes.</strong> These statutes include, but are not limited to:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>CAN-SPAM Act</strong> (15 U.S.C. §§ 7701–7713) — United States</li>
                  <li><strong>GDPR</strong> (Regulation (EU) 2016/679) — European Union and European Economic Area</li>
                  <li><strong>UK GDPR</strong> and the <strong>Privacy and Electronic Communications Regulations 2003 (PECR)</strong> — United Kingdom</li>
                  <li><strong>CASL</strong> (Canada&apos;s Anti-Spam Legislation, S.C. 2010, c. 23) — Canada</li>
                  <li><strong>Spam Act 2003</strong> — Australia</li>
                  <li><strong>POPIA</strong> (Protection of Personal Information Act, 2013) — South Africa</li>
                  <li>Any other applicable national, state, provincial, or local privacy or electronic communications statute</li>
                </ul>
                <p>
                  <strong>Immediate Severance Without Refund.</strong> Relay Capture reserves the absolute, unilateral, and irrevocable right to immediately suspend, disable, or permanently sever all Fleet infrastructure—including domain DNS records, mailbox access, and SMTP routing—without prior notice, without refund, and without liability if we determine, in our sole discretion, that the Fleet is being used for any of the following:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Phishing, spear-phishing, or social engineering attacks designed to fraudulently obtain credentials, financial information, or personal data</li>
                  <li>Credential harvesting or login page spoofing</li>
                  <li>Distribution of malware, ransomware, spyware, adware, or any malicious software payload</li>
                  <li>Financial fraud, wire fraud, advance-fee schemes, or business email compromise (BEC) attacks</li>
                  <li>Illegal outreach of any kind, including but not limited to solicitation of illegal goods or services</li>
                  <li>Sending to purchased, scraped, or non-consent-based email lists in jurisdictions that require affirmative opt-in consent</li>
                  <li>Any activity that results in the provisioned domains or IPs being listed on major DNS-based blacklists (Spamhaus, Barracuda, SORBS, et al.) due to the Client&apos;s sending practices</li>
                </ul>
                <p>
                  Relay Capture&apos;s determination under this section is final and is not subject to appeal, arbitration, or judicial review. The Client waives any and all claims arising from infrastructure severance under this section.
                </p>
              </section>

              {/* 10. PROHIBITED ACTIVITIES */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  10. PROHIBITED ACTIVITIES
                </h2>
                <p>
                  You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us. In addition to the Acceptable Use restrictions in Section 9, you are expressly prohibited from:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Systematically retrieving data or content from the Services to create a collection, compilation, database, or directory</li>
                  <li>Attempting to bypass, circumvent, or manipulate the server-side pricing calculation, transaction minting, or checkout flow</li>
                  <li>Using any automated system (bots, scrapers, spiders) to access the Services</li>
                  <li>Interfering with, disrupting, or creating an undue burden on the Services or connected networks</li>
                  <li>Reselling, sublicensing, or redistributing provisioned Fleet infrastructure to third parties without prior written authorization</li>
                  <li>Misrepresenting your identity or affiliation when purchasing Fleet infrastructure</li>
                </ul>
              </section>

              {/* 11. SERVICES MANAGEMENT */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  11. SERVICES MANAGEMENT
                </h2>
                <p>
                  We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including reporting such user to law enforcement authorities; (3) refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any Fleet infrastructure or portion thereof; (4) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.
                </p>
              </section>

              {/* 12. PRIVACY POLICY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  12. PRIVACY POLICY
                </h2>
                <p>
                  We care about data privacy and security. Please review our Privacy Notice:{' '}
                  <a href="/privacy" className="underline hover:text-white">
                    https://relaycapture.com/privacy
                  </a>. By using the Services, you agree to be bound by our Privacy Notice, which is incorporated into these Legal Terms.
                </p>
                <p>
                  As described in Section 2, all payment data is processed exclusively by Paddle (our Merchant of Record). Relay Capture does not store, process, or have access to your full credit card numbers, CVV codes, or other payment instrument security data. For details on how Paddle processes your payment information, see{' '}
                  <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    Paddle&apos;s Privacy Policy
                  </a>.
                </p>
              </section>

              {/* 13. TERM AND TERMINATION */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  13. TERM AND TERMINATION
                </h2>
                <p>
                  These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.
                </p>
                <p>
                  If we terminate or suspend your access for any reason, including violations of the Acceptable Use policy (Section 9), no refund of any previously paid Engineering Fee will be issued.
                </p>
              </section>

              {/* 14. MODIFICATIONS AND INTERRUPTIONS */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  14. MODIFICATIONS AND INTERRUPTIONS
                </h2>
                <p>
                  We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the Services without notice at any time. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.
                </p>
                <p>
                  We cannot guarantee the Services will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the Services, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Services at any time or for any reason without notice to you.
                </p>
              </section>

              {/* 15. GOVERNING LAW */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  15. GOVERNING LAW
                </h2>
                <p>
                  These Legal Terms shall be governed by and defined following the laws of Egypt. Relay Capture and yourself irrevocably consent that the courts of Egypt shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                </p>
              </section>

              {/* 16. DISPUTE RESOLUTION */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  16. DISPUTE RESOLUTION
                </h2>
                <h3 className={subheadingClass}>
                  Informal Negotiations
                </h3>
                <p>
                  To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a &quot;Dispute&quot; and collectively, the &quot;Disputes&quot;), the Parties agree to first attempt to negotiate any Dispute informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.
                </p>
                <h3 className={subheadingClass}>
                  Binding Arbitration
                </h3>
                <p>
                  If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute shall be finally and exclusively resolved by binding arbitration. The number of arbitrators shall be one (1). The seat, or legal place, of arbitration shall be Cairo, Egypt. The language of the proceedings shall be English. The governing law of these Legal Terms shall be the substantive law of Egypt.
                </p>
              </section>

              {/* 17. CORRECTIONS */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  17. CORRECTIONS
                </h2>
                <p>
                  There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.
                </p>
              </section>

              {/* 18. DISCLAIMER */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  18. DISCLAIMER
                </h2>
                <p>
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE SERVICES&apos; CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES.
                </p>
                <p>
                  WITHOUT LIMITING THE FOREGOING, THIS DISCLAIMER EXPRESSLY INCLUDES ANY AND ALL CLAIMS RELATED TO EMAIL DELIVERABILITY, INBOX PLACEMENT, SENDER REPUTATION, OPEN RATES, RESPONSE RATES, OR THE OPERATION OF THIRD-PARTY SPAM FILTERS, AS FURTHER DESCRIBED IN SECTION 8 ABOVE.
                </p>
              </section>

              {/* 19. LIMITATION OF LIABILITY */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  19. LIMITATION OF LIABILITY
                </h2>
                <p>
                  IN NO EVENT WILL RELAY CAPTURE, OUR DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
                <p>
                  <strong>NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATED TO THE SERVICES OR THESE LEGAL TERMS SHALL BE STRICTLY CAPPED AT THE EXACT AMOUNT PAID BY YOU TO RELAY CAPTURE (VIA PADDLE) FOR THE SPECIFIC ORDER GIVING RISE TO THE CLAIM IN THE THIRTY (30) DAYS IMMEDIATELY PRECEDING THE INCIDENT GIVING RISE TO THE CLAIM.</strong>
                </p>
                <p>
                  For the avoidance of doubt: if you purchased a 10-domain Fleet for $1,000 USD and a claim arises, our maximum aggregate liability for that claim is $1,000 USD—the exact amount of that specific order. This cap applies regardless of the legal theory under which liability is asserted (contract, tort, strict liability, or otherwise).
                </p>
              </section>

              {/* 20. INDEMNIFICATION */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  20. INDEMNIFICATION
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Relay Capture, its subsidiaries, affiliates, officers, agents, employees, contractors, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to: (1) your use of the Services; (2) any email content transmitted through the provisioned Fleet; (3) your violation of any applicable anti-spam, privacy, or electronic communications law (including CAN-SPAM, GDPR, CASL, or any other statute referenced in Section 9); (4) your breach of these Legal Terms; or (5) any third-party claim that your use of the Fleet infrastructure infringed or violated a third party&apos;s rights.
                </p>
              </section>

              {/* 21. USER DATA */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  21. USER DATA
                </h2>
                <p>
                  We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.
                </p>
              </section>

              {/* 22. ELECTRONIC COMMUNICATIONS */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  22. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES
                </h2>
                <p>
                  Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.
                </p>
              </section>

              {/* 23. CALIFORNIA USERS AND RESIDENTS */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  23. CALIFORNIA USERS AND RESIDENTS
                </h2>
                <p>
                  If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
                </p>
              </section>

              {/* 24. MISCELLANEOUS */}
              <section className={`space-y-3 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  24. MISCELLANEOUS
                </h2>
                <p>
                  These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control.
                </p>
                <p>
                  If any provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and enforceability of any remaining provisions.
                </p>
                <p>
                  These Legal Terms, our{' '}
                  <a href="/privacy" className="underline hover:text-white">Privacy Notice</a>, and our{' '}
                  <a href="/refund" className="underline hover:text-white">Refund Policy</a>{' '}
                  constitute the complete set of binding legal documents governing your use of the Services.
                </p>
              </section>

              {/* 25. CONTACT US */}
              <section className={`space-y-2 pt-4 border-t ${borderClass}`}>
                <h2 className={headingClass}>
                  25. CONTACT US
                </h2>
                <p>
                  In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
                </p>
                <div className="font-mono text-xs space-y-1 pl-2 border-l border-white/20">
                  <p>Relay Capture</p>
                  <p>
                    <a href="mailto:sam@relaycapture.com" className="underline hover:text-white">
                      sam@relaycapture.com
                    </a>
                  </p>
                </div>
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
