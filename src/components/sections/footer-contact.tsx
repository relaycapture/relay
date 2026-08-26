'use client'

import { useState, FormEvent } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';
import { FooterBottom } from '../footer-bottom';

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
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-8 md:px-12 lg:px-24 z-10 transition-colors section-content-auto"
    >
      <div className="max-w-5xl mx-auto">
        {/* Contact Section - Fully Integrated with Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <h3
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] ${
                isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
            >
              Get In Touch.
            </h3>

            <p
              className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed ${
                isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
            >
              Have custom infrastructure with hybrid on-premise Exchange or multiple sub-brands? Send us your parameters for a tailored architectural roadmap.
            </p>
          </div>

          {/* Right Form Column (7 Cols) */}
          <div className="lg:col-span-7">
            {submissionState === 'loading' && (
              <div
                className={`p-10 sm:p-14 rounded-3xl border flex flex-col items-center justify-center text-center space-y-4 animate-fade-in transition-all ${
                  isLightMode
                    ? 'bg-white/60 border-black/10 shadow-lg'
                    : 'bg-[#18181f]/60 border-white/10 shadow-2xl'
                }`}
              >
                <div className="relative">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                  <div className="absolute inset-0 rounded-full blur-sm bg-emerald-500/20" />
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
                className={`p-8 sm:p-12 rounded-3xl border text-center space-y-4 animate-fade-in transition-all ${
                  isLightMode
                    ? 'bg-white/80 border-black/10 shadow-lg'
                    : 'bg-[#18181f]/80 border-white/10 shadow-2xl'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
                    isLightMode ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h4 className={`text-2xl font-semibold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                    Inquiry Dispatched Successfully
                  </h4>
                  <p
                    className={`text-xs sm:text-sm font-mono max-w-md mx-auto leading-relaxed ${
                      isLightMode ? 'text-neutral-600' : 'text-neutral-400'
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
                  className={`mt-4 px-4 py-2 rounded-xl font-mono text-xs transition-colors border ${
                    isLightMode
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
                  className={`p-6 sm:p-8 rounded-3xl border space-y-4 transition-all ${
                    isLightMode
                      ? 'bg-white/60 border-black/10 shadow-sm'
                      : 'bg-[#18181f]/60 border-white/10 shadow-lg'
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
                        className={`w-full px-4 py-3 rounded-xl border font-mono text-xs outline-none transition-colors min-h-[48px] ${
                          isLightMode
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
                        className={`w-full px-4 py-3 rounded-xl border font-mono text-xs outline-none transition-colors min-h-[48px] ${
                          isLightMode
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
                      className={`w-full px-4 py-3 rounded-xl border font-mono text-xs outline-none resize-none transition-colors min-h-[80px] ${
                        isLightMode
                          ? 'bg-white border-black/10 text-black focus:border-black'
                          : 'bg-white/[0.04] border-white/10 text-white focus:border-white'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    data-cursor="grow"
                    className={`w-full py-3.5 px-6 rounded-xl font-sans font-medium text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 shadow-md min-h-[48px] ${
                      isLightMode
                        ? 'bg-[#1d1d1f] hover:bg-black text-white'
                        : 'bg-white text-black hover:bg-neutral-200'
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
                      className={`underline transition-colors font-medium ${
                        isLightMode ? 'text-black hover:text-neutral-700' : 'text-white hover:text-neutral-300'
                      }`}
                    >
                      sam@relaycapture.com
                    </a>
                  </span>
                </div>
              </>
            )}
          </div>
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
