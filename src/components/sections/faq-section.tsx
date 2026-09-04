'use client'

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionWatermark } from '../section-watermark';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What access do you need from us?',
    a: 'Temporary operator access to your Cloudflare DNS and a delegated admin seat inside your Google Workspace or Microsoft 365 tenant. You never share your primary corporate email passwords, and you revoke our access in one click the second delivery verification clears.',
  },
  {
    q: 'How does billing work for domain registrations and mailbox seats?',
    a: 'You pay us a flat engineering fee via Paddle to build the infrastructure. Provider costs (domain registrations and workspace seats) are billed directly to your corporate card via your own master accounts. We never markup software licenses or act as an unnecessary financial intermediary.',
  },
  {
    q: 'What happens if a domain fails verification?',
    a: 'Every deployment includes external third-party validation reports (MXToolbox, Mail-Tester, Dmarcian). If a single record fails strict RFC alignment at Hour 48, we resolve it immediately or issue an automated 100% refund through Paddle.',
  },
  {
    q: 'Why do you use Paddle instead of standard invoicing?',
    a: 'Paddle acts as our Merchant of Record. They handle international sales tax compliance, automated VAT, PCI-DSS Level 1 security, and statutory buyer protections. You receive an instant commercial tax invoice immediately upon checkout.',
  },
  {
    q: 'How long does the setup take?',
    a: 'The 48-hour SLA begins the moment you complete the technical intake brief post-payment. We deliver the complete setup package, verification links, and ownership documentation within 48 hours.',
  },
  {
    q: 'Why not just use an automated mailbox rental platform?',
    a: 'Automated rental platforms place your inboxes on pooled reseller subnets without master Super-Admin console access. When another user on that shared subnet triggers a Spamhaus listing or exceeds Google\'s spam rate threshold, your inboxes take collateral damage. We build dedicated, isolated infrastructure that you own permanently.',
  },
  {
    q: 'Do I lose the domains if I stop working with you?',
    a: 'No. Everything is registered directly in your name inside your own accounts. We do not hold assets hostage or charge recurring maintenance fees to keep your DNS alive.',
  },
  {
    q: 'Do you write copy, scrape leads, or manage campaigns?',
    a: 'No. We do not write copy, build lead lists, or manage outbound campaigns. Our scope is strictly isolated to systems engineering, DNS hardening, and mailbox deliverability architecture.',
  },
];

export function FaqSection({ isLightMode }: { isLightMode?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq-section"
      className="relative py-32 sm:py-40 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 overflow-x-clip z-10 section-content-auto"
    >
      {/* Top-Center Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 50% 15%, rgba(0,0,0,0.03) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 50% 15%, rgba(255,255,255,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="FAQ"
        mobileText="FAQ"
        top="-30px"
        left="-30px"
        size="text-[28rem]"
        mobileTop="-10px"
        mobileLeft="-10px"
        mobileSize="text-[9rem]"
        opacity="opacity-[0.02]"
        mobileOpacity="opacity-[0.025]"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Section Header — Swiss Editorial Style */}
        <div className="text-left max-w-3xl mb-12 sm:mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[1.85rem] min-[390px]:text-[2.1rem] min-[440px]:text-4xl sm:text-6xl font-medium tracking-[-0.04em] leading-[1.05] ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
          >
            <span className="whitespace-nowrap">Questions. Answered.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-2xl ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            Direct answers regarding access, wholesale billing, and dedicated infrastructure ownership.
          </motion.p>
        </div>

        {/* Swiss Editorial Accordion List without dividing borders */}
        <div className="space-y-1">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
                className="py-1"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  data-cursor="grow"
                  className={`w-full text-left flex items-center justify-between gap-4 font-sans font-medium text-sm sm:text-lg py-5 sm:py-7 transition-colors group cursor-pointer ${
                    isOpen
                      ? 'text-white'
                      : isLightMode
                        ? 'text-neutral-500 hover:text-neutral-900'
                        : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className={`font-mono text-xs uppercase tracking-wider flex-shrink-0 transition-colors ${
                      isOpen ? 'text-white/80' : 'text-neutral-500'
                    }`}>
                      0{index + 1}.
                    </span>
                    <span className="transition-opacity leading-snug">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen
                        ? 'rotate-180 text-white'
                        : isLightMode
                          ? 'text-neutral-400 group-hover:text-neutral-600'
                          : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div
                        className={`pb-6 sm:pb-8 pl-8 sm:pl-[3.25rem] pr-4 text-xs sm:text-sm leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                          }`}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
