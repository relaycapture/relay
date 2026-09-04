'use client'

import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterBottom } from '../footer-bottom';
import { SectionWatermark } from '../section-watermark';
import DotField from '../DotField';

interface FooterContactProps {
  isLightMode?: boolean;
  onNavigateToPricing: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
  onNavigateToRefunds?: () => void;
}

export function FooterContact({
  isLightMode,
  onNavigateToPricing,
  onNavigateToTerms,
  onNavigateToPrivacy,
  onNavigateToRefunds,
}: FooterContactProps) {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [message, setMessage] = useState('');
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'submitted'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmissionState('loading');
    setTimeout(() => {
      setSubmissionState('submitted');
    }, 1600);
  };

  return (
    <footer
      id="contact-section"
      className="relative py-32 sm:py-40 md:py-48 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 z-10 transition-colors section-content-auto overflow-x-clip"
    >
      {/* Interactive Reactive DotField Particle Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <DotField
          dotRadius={1.5}
          dotSpacing={14}
          bulgeStrength={53}
          glowRadius={110}
          sparkle={false}
          waveAmplitude={1}
          cursorRadius={450}
          cursorForce={0.05}
          bulgeOnly={false}
          gradientFrom="#1e1e1e"
          gradientTo="#848484"
          glowColor="#131313"
        />
      </div>

      {/* Bottom-Center Ambient Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: isLightMode
            ? 'radial-gradient(ellipse at 50% 85%, rgba(0,0,0,0.03) 0%, transparent 65%)'
            : 'radial-gradient(ellipse at 50% 85%, rgba(255,255,255,0.045) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Monumental Background Watermark (Positioned at top-left corner of the section) */}
      <SectionWatermark
        text="RELAY"
        mobileText="RELAY"
        top="-30px"
        left="-30px"
        size="text-[28rem]"
        mobileTop="-10px"
        mobileLeft="-10px"
        mobileSize="text-[9rem]"
        opacity="opacity-[0.02]"
        mobileOpacity="opacity-[0.025]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          {/* Left Info Column with Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4 sm:space-y-6 text-left"
          >

            <h3
              className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.98] ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
                }`}
            >
              <span className="block whitespace-nowrap">Get In Touch.</span>
            </h3>

            <p
              className={`text-xs sm:text-sm md:text-base font-normal leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
              Have custom infrastructure with hybrid on-premise Exchange or multiple sub-brands? Send us your parameters for a tailored architectural roadmap.
            </p>
          </motion.div>

          {/* Right Form Column with Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7"
          >
            {submissionState === 'loading' && (
              <div
                className={`p-10 sm:p-14 border flex flex-col items-center justify-center text-center space-y-4 animate-fade-in transition-all ${isLightMode
                    ? 'bg-white/60 border-black/10 shadow-lg'
                    : 'bg-[#09090b]/80 border-white/10 shadow-2xl'
                  }`}
              >
                <div className="relative">
                  <Loader2 className="w-8 h-8 animate-spin text-white" />
                  <div className="absolute inset-0 rounded-full blur-sm bg-white/15" />
                </div>
                <div className="space-y-1">
                  <h4 className={`text-lg font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                    Dispatching to Engineering Relay...
                  </h4>
                  <p className="text-xs font-mono text-neutral-400">
                    Querying public nameservers for {domain || 'your domain'}
                  </p>
                </div>
              </div>
            )}

            {submissionState === 'submitted' && (
              <div
                className={`p-8 sm:p-12 border text-center space-y-4 animate-fade-in transition-all ${isLightMode
                    ? 'bg-white/80 border-black/10 shadow-lg'
                    : 'bg-[#09090b]/80 border-white/10 shadow-2xl'
                  }`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center mx-auto ${isLightMode ? 'bg-neutral-100 text-neutral-800 border border-neutral-300' : 'bg-white/10 text-white border border-white/20'
                    }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h4 className={`text-2xl font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                    Inquiry Dispatched Successfully
                  </h4>
                  <p
                    className={`text-xs sm:text-sm font-mono max-w-md mx-auto leading-relaxed ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                      }`}
                  >
                    We have received your request. An email engineer will review your DNS records and follow up shortly at <strong>{email}</strong>.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSubmissionState('idle');
                    setEmail('');
                    setDomain('');
                    setMessage('');
                  }}
                  className={`mt-4 px-4 py-2 font-mono text-xs transition-colors border cursor-pointer ${isLightMode
                      ? 'bg-black/5 hover:bg-black/10 border-black/10 text-neutral-800'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
                    }`}
                >
                  Send another inquiry
                </button>
              </div>
            )}

            {submissionState === 'idle' && (
              <>
                <form
                  onSubmit={handleSubmit}
                  className={`p-6 sm:p-8 border space-y-4 transition-all ${isLightMode
                      ? 'bg-white/60 border-black/10 shadow-sm'
                      : 'bg-[#09090b]/80 border-white/10 shadow-lg'
                    }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className={`font-mono text-xs ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}
                      >
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3 rounded-[2px] border font-mono text-xs outline-none transition-colors min-h-[48px] ${isLightMode
                            ? 'bg-white border-black/10 text-black focus:border-black'
                            : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                          }`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-domain"
                        className={`font-mono text-xs ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}
                      >
                        Sending Domain
                      </label>
                      <input
                        id="contact-domain"
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="company.com"
                        className={`w-full px-4 py-3 rounded-[2px] border font-mono text-xs outline-none transition-colors min-h-[48px] ${isLightMode
                            ? 'bg-white border-black/10 text-black focus:border-black'
                            : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                          }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className={`font-mono text-xs ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}
                    >
                      Context or Questions
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="We currently use Google Workspace + SendGrid. Checking our configuration..."
                      className={`w-full px-4 py-3 rounded-[2px] border font-mono text-xs outline-none resize-none transition-colors min-h-[80px] ${isLightMode
                          ? 'bg-white border-black/10 text-black focus:border-black'
                          : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                        }`}
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="grow"
                    className={`w-full py-3.5 px-6 rounded-[2px] font-sans font-medium text-xs tracking-wide transition-all duration-150 flex items-center justify-center gap-2 border min-h-[48px] cursor-pointer ${isLightMode
                        ? 'bg-neutral-900 hover:bg-black text-white border-black/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_4px_12px_rgba(0,0,0,0.15)]'
                        : 'bg-neutral-100 hover:bg-white text-neutral-900 border-white/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_6px_20px_rgba(0,0,0,0.6)]'
                      }`}
                  >
                    <span>Submit to Engineering</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>

                {/* Direct email contact beneath the form */}
                <div className="mt-4 text-center">
                  <span className={`text-xs font-mono ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                    Prefer direct?{' '}
                    <a
                      href="mailto:sam@relaycapture.com"
                      className="underline hover:text-white transition-colors"
                    >
                      sam@relaycapture.com
                    </a>
                  </span>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Minimal Clean Bottom Copyright & Legal Links Bar */}
        <FooterBottom
          isLightMode={isLightMode}
          onNavigateToTerms={onNavigateToTerms}
          onNavigateToPrivacy={onNavigateToPrivacy}
          onNavigateToRefunds={onNavigateToRefunds}
        />
      </div>
    </footer>
  );
}
