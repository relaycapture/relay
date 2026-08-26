'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FaqItem[] = [
  {
    category: 'Security & Access',
    q: 'How does Relay Capture inspect our domain without account credentials?',
    a: 'Email authentication protocols (SPF, DKIM, DMARC, BIMI) are by architectural design published on public DNS nameservers so receiving mail servers worldwide can verify them. Relay Capture acts identically to receiving mail transfer agents (MTAs) at Google and Microsoft: querying public authoritative nameservers via DNS-over-HTTPS. We never request API keys, OAuth tokens, inbox access, or sensitive message data.',
  },
  {
    category: 'Compliance',
    q: 'What are the major receiving mailbox provider enforcement requirements?',
    a: 'Major mailbox providers mandate that sending domains must: 1) Publish valid SPF and DKIM authentication, 2) Enforce a DMARC policy of at least p=none, 3) Align From: headers with either SPF or DKIM domains, 4) Provide one-click RFC 8058 unsubscribe headers, and 5) Maintain spam complaint rates strictly below 0.3%. Failure to meet these criteria triggers automatic spam quarantine or permanent 550 SMTP rejection.',
  },
  {
    category: 'Protocol Mechanics',
    q: 'Why is an SPF "~all" (softfail) policy dangerous for outbound deliverability?',
    a: 'SPF softfail (~all) signals that unlisted IPs sending from your domain should not be explicitly rejected. While intended as a transitional posture, modern spam filters (Microsoft EOP, Gmail) treat ~all with suspicion, often downgrading sender reputation and routing messages to Spam or Quarantine. Enforcing DMARC at p=quarantine or p=reject removes ambiguity.',
  },
  {
    category: 'Architecture',
    q: 'How does Relay Capture differ from ongoing SaaS monitoring tools?',
    a: 'Relay Capture is a precision infrastructure audit and enforcement service, not a monthly SaaS subscription. Most monitoring tools generate endless dashboard alerts without fixing the root DNS records. We deliver exact, validated, drop-in DNS configurations within 24 hours, verify end-to-end cryptographic alignment, and exit cleanly.',
  },
  {
    category: 'Implementation',
    q: 'Will applying these DNS record changes disrupt our existing email operations?',
    a: 'No. Every remediation blueprint is generated specifically to preserve your existing authorized sending services (Google Workspace, Microsoft 365, Postmark, SendGrid, Amazon SES, HubSpot, etc.). We validate selector uniqueness and SPF mechanism limits (RFC 7208 10-lookup rule) to guarantee zero downtime during DNS propagation.',
  },
];

export function FaqSection({ isLightMode }: { isLightMode?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-section"
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 section-content-auto"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Heading - Integrated with background */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">Questions.</span>
            <span className="block">Answered.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            <span className="block">Direct answers regarding DNS architecture, sender compliance,</span>
            <span className="block">and mailbox deliverability protection.</span>
          </p>
        </div>

        {/* Integrated Accordion List - Seamless with background */}
        <div className="divide-y divide-black/[0.08] dark:divide-white/[0.1] border-t border-b border-black/[0.08] dark:border-white/[0.1]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-4 sm:py-6 transition-colors">
                <button
                  onClick={() => toggleFaq(index)}
                  data-cursor="grow"
                  className={`w-full text-left flex items-center justify-between gap-4 font-sans font-medium text-sm sm:text-lg transition-colors group min-h-[48px] ${
                    isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs uppercase tracking-wider opacity-50 flex-shrink-0">
                      0{index + 1}.
                    </span>
                    <span className="group-hover:opacity-80 transition-opacity leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 text-black dark:text-white'
                        : isLightMode
                        ? 'text-neutral-400'
                        : 'text-neutral-500'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    className={`pt-4 pl-8 sm:pl-9 pr-4 text-sm sm:text-base leading-relaxed font-mono animate-fade-in ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
