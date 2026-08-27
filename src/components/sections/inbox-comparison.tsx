'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
  Star,
  Square,
  Paperclip,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Trash2,
  Mail,
  Send,
  Sparkles,
  Tag,
  Archive,
  ArrowLeft,
  AlertTriangle,
  AlertCircle,
  Download,
  Lock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  XOctagon,
  Menu,
  RotateCw,
  Phone,
  Globe,
  HelpCircle,
  X,
} from 'lucide-react';

interface InboxComparisonProps {
  isLightMode?: boolean;
  isLivePreview?: boolean;
  currentDomain?: string;
}

interface EmailSignature {
  name: string;
  title: string;
  phone: string;
  email: string;
  domain: string;
}

interface SimulatedEmail {
  id: string;
  sender: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  snippet: string;
  time: string;
  hasAttachment?: string;
  type: 'spam-only' | 'steve-core' | 'sarah-reply' | 'background';
  warningType?: 'spam-reputation' | 'careful-unverified' | 'dangerous-phish';
  warningTitle?: string;
  warningText?: string;
  warningButtons?: string[];
  body: string[];
  signature?: EmailSignature;
}

const STEVE_SIGNATURE: EmailSignature = {
  name: 'Steve Miller',
  title: 'Founder | Apex Global Logistics',
  phone: '(555) 123-XXXX',
  email: 's.miller@apexglobalfreight.com',
  domain: 'apexglobalfreight.com',
};

const SARAH_SIGNATURE: EmailSignature = {
  name: 'Sarah Chen',
  title: 'VP of Growth | Vanguard Industrial Parts',
  phone: '(555) 123-XXXX',
  email: 's.chen@vanguardindustrial.com',
  domain: 'vanguardindustrial.com',
};

// Official Google Workspace Gmail Logo Component
function GmailLogo({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <img
      src="/gmail-logo.png"
      alt="Gmail"
      className={`${className} object-contain`}
      draggable={false}
    />
  );
}

// 1. Three Active Emails in BEFORE state
const SPAM_BEARNT_EMAIL: SimulatedEmail = {
  id: 'spam-bearnt',
  sender: 'Bob Bearnt',
  fromEmail: 'bearnt@hyper-growth-machine.co',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'Re: Re: Re: Re: Re: did you get eaten by a bear? dY?',
  snippet: 'Ive reached out a few times and havent heard back, so Im going to asume you were either eaten by a bear...',
  time: '11:24 AM',
  type: 'spam-only',
  warningType: 'spam-reputation',
  warningTitle: 'Why is this message in spam?',
  warningText: 'Lots of messages from hyper-growth-machine.co were identified as spam in the past',
  warningButtons: ['Report not spam'],
  body: [
    'Ive reached out a few times and havent heard back, so Im going to asume you were either eaten by a bear or the timing just isnt right for you to 10x your MRR this quarter dYs?',
    'I wont follqw up again, so ill go ahead and close your file. If you somehow survived the bear attack and still wanna talk about automating your Pipeline so you never have to send cold emails again then let me know !',
    'Wishing you all the best at your company. Remember to reply if you see this!!',
    'Warmly,\nBearnt\nGlobal Head of HyperGrowth',
  ],
};

const STEVE_PITCH_EMAIL: SimulatedEmail = {
  id: 'steve-pitch',
  sender: 'Steve Miller (You)',
  fromEmail: 's.miller@apexglobalfreight.com',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'Q3 Trans-Pacific routing & drayage capacity',
  snippet: 'Hey Sarah, Looking at Vanguard\'s recent expansion into the Dallas facility, I imagine you\'re evaluating Q3 container volumes...',
  time: 'Yesterday',
  type: 'steve-core',
  warningType: 'careful-unverified',
  warningTitle: 'Be careful with this message',
  warningText: 'Gmail could not verify that it actually came from apexglobalfreight.com. Avoid clicking links, downloading attachments, or replying with personal information.',
  warningButtons: ['Report spam', 'Report phishing'],
  body: [
    'Hey Sarah,',
    'Looking at Vanguard\'s recent expansion into the Dallas facility, I imagine you\'re evaluating Q3 container volumes out of Shenzhen.',
    'The spot market is tightening, but we just secured contracted space for the trans-Pacific eastbound lanes and have guaranteed drayage capacity at the Long Beach port, bypassing the current chassis shortage. We\'re currently saving mid-market manufacturers about 12-14% on their ocean freight landed costs compared to the legacy carriers.',
    'Are you open to a brief introductory call next week to see if our lanes align with your Q3 import schedule?',
    'Best regards,\nSteve Miller',
  ],
  signature: STEVE_SIGNATURE,
};

const SPAM_VAN_HUNTER_EMAIL: SimulatedEmail = {
  id: 'spam-van-hunter',
  sender: 'Van Hunter | VP of Growth',
  fromEmail: 'van.h@scale-max-synergy-ai.io',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'your crpyto SaaS scalling strategy',
  snippet: 'Hey friend, I know you\'re super busy crushing it. I was just looking at your site and honestly? You guys are leaving massive ARR...',
  time: 'Aug 22',
  type: 'spam-only',
  warningType: 'dangerous-phish',
  warningTitle: 'This message seems dangerous',
  warningText: 'Many people marked similar messages as phishing scams, so this might contain unsafe content. Avoid clicking links, downloading attachments, or replying with personal information.',
  warningButtons: ['Report dangerous', 'Looks safe'],
  body: [
    'Hey friend,',
    'I know you\'re super busy crushing it.\nI was just looking at your site and honestly? You guys are leaving massive ARR on the table. We just helped a similar web3 / defi SaaS scale their inbound by a whooping 400% in 12 days using our proprietary guranteed AI-driven intent-lead-gen algorithims.',
    'Are you the right person to talk to about 10x-ing your Q3 pipeline or should I be speaking to your CEO? (No offense man, just trying to be effecient lol).',
    'Let me know if you have 5 mins for a quick virtual coffee this thursday. You can grab a slot on my cal here: http://bit.ly/definitely-not-sus-calendar-link-4892',
    'Best,\nVan Hunter\nCo-Founder & VP of Hyper-Growth ScaleMax AI | "Pivoting your paradigms."',
  ],
};

// 2. Incoming Emails in AFTER State
const SARAH_REPLY_EMAIL: SimulatedEmail = {
  id: 'sarah-reply',
  sender: 'Sarah Chen (Prospect)',
  fromEmail: 's.chen@vanguardindustrial.com',
  toEmail: 'Steve Miller (You) <s.miller@apexglobalfreight.com>',
  subject: 'RE: Q3 Trans-Pacific routing & drayage capacity',
  snippet: 'Steve, We are actually dealing with a chassis shortage out of LB right now that is killing our lead times...',
  time: '10m ago',
  type: 'sarah-reply',
  body: [
    'Steve,',
    'We are actually dealing with a chassis shortage out of LB right now that is killing our lead times.',
    'I don\'t have time for a call next week, but if you can actually guarantee drayage, send me over your current rates for 40\' HQ containers from Ningbo to our Dallas DC. I need transit times included.',
    'Best,\nSarah',
  ],
  signature: SARAH_SIGNATURE,
};

// 3. Background Blurred Emails (Rows 4+)
const BACKGROUND_BLURRED_EMAILS: SimulatedEmail[] = [
  {
    id: 'bg-docusign',
    sender: 'DocuSign Trust Center',
    fromEmail: 'trust@docusign.net',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Completed: Enterprise Master Service Agreement — signed by Legal',
    snippet: 'All 3 signers have completed signing the Master Service Agreement effective immediately...',
    time: 'Aug 21',
    hasAttachment: 'MSA_Signed_Final.pdf',
    type: 'background',
    body: ['All parties have signed Enterprise Master Service Agreement (#MSA-2026-FINAL).'],
  },
  {
    id: 'bg-stripe',
    sender: 'Stripe Enterprise Relay',
    fromEmail: 'receipts@stripe.com',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Receipt for Annual Contract (#rec_9201948)',
    snippet: 'Your payment of $42,500.00 was successfully captured on card ending in 4242...',
    time: 'Aug 20',
    hasAttachment: 'Receipt.pdf',
    type: 'background',
    body: ['Your payment of $42,500.00 to Stripe Enterprise Relay was successful.'],
  },
  {
    id: 'bg-aws',
    sender: 'AWS Cloud Billing',
    fromEmail: 'no-reply-aws@amazon.com',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Amazon Web Services Invoice Available (Acct 8920-1194)',
    snippet: 'Your AWS invoice for US-East-1 and EU-West-1 compute is ready for download in the console...',
    time: 'Aug 19',
    type: 'background',
    body: ['Your Amazon Web Services billing statement for Account 8920-1194 is now available.'],
  },
  {
    id: 'bg-linear',
    sender: 'Linear Engineering',
    fromEmail: 'updates@linear.app',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Cycle 42 Completed: 18 Security & Deliverability Issues Resolved',
    snippet: 'Sprint velocity reached 100% with all high-priority SPF/DKIM verification tasks closed...',
    time: 'Aug 18',
    type: 'background',
    body: ['Cycle 42 has completed with 18 high-priority infrastructure and deliverability issues resolved.'],
  },
];

export function InboxComparison({ isLightMode, isLivePreview = false, currentDomain }: InboxComparisonProps) {
  const [viewState, setViewState] = useState<'before' | 'after'>('before');
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'spam'>('spam');
  const [selectedEmail, setSelectedEmail] = useState<SimulatedEmail | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [guideStep, setGuideStep] = useState<number | null>(1); // 1, 2, 3 or null (dismissed)

  // Counters
  const [counts, setCounts] = useState({
    inbox: 8562,
    inboxPct: 57.08,
    spam: 6438,
    spamPct: 42.92,
  });

  const animateNumbers = (toAfter: boolean) => {
    const startInbox = counts.inbox;
    const startInboxPct = counts.inboxPct;
    const startSpam = counts.spam;
    const startSpamPct = counts.spamPct;

    const targetInbox = toAfter ? 14973 : 8562;
    const targetInboxPct = toAfter ? 99.82 : 57.08;
    const targetSpam = toAfter ? 27 : 6438;
    const targetSpamPct = toAfter ? 0.18 : 42.92;

    const duration = 1200;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        inbox: Math.round(startInbox + (targetInbox - startInbox) * ease),
        inboxPct: Number((startInboxPct + (targetInboxPct - startInboxPct) * ease).toFixed(2)),
        spam: Math.round(startSpam + (targetSpam - startSpam) * ease),
        spamPct: Number((startSpamPct + (targetSpamPct - startSpamPct) * ease).toFixed(2)),
      });

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  };

  const handleToggleState = (newState: 'before' | 'after') => {
    if (newState === viewState) return;
    setViewState(newState);
    setSelectedEmail(null);
    setShowHeaders(false);
    setSelectedFolder(newState === 'before' ? 'spam' : 'inbox');
    animateNumbers(newState === 'after');

    if (guideStep === 2 && newState === 'after') {
      setGuideStep(3);
    }
  };

  const handleSelectEmail = (email: SimulatedEmail) => {
    setSelectedEmail(email);
    setShowHeaders(false);
    if (guideStep === 1 && email.id === 'steve-pitch') {
      setGuideStep(2);
    }
  };

  return (
    <section
      id="inbox-comparison"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 ${
        isLivePreview ? 'py-6' : 'py-20 sm:py-28 md:py-36 section-content-auto'
      }`}
      style={isLivePreview ? { height: '100%', minHeight: '100%' } : undefined}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${
              isLightMode ? 'text-[#1d1d1f]' : 'text-white'
            }`}
          >
            <span className="block">The difference between</span>
            <span className="block">Inbox and Quarantine.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${
              isLightMode ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            <span className="block">What happens when your outbound infrastructure meets modern spam filtering engines.</span>
          </p>
        </div>

        {/* Outer Control & Mode Switcher Bar */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 select-none">
          {/* Active Folder Title & Domain Indicator */}
          <div className="flex items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full font-mono text-xs font-semibold border flex items-center gap-1.5 ${
                viewState === 'before'
                  ? isLightMode
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
                  : isLightMode
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
              }`}
            >
              {viewState === 'before' ? (
                <>
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>Unauthenticated Outbound (Quarantined)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Authenticated & Aligned (Delivered)</span>
                </>
              )}
            </span>

            {/* Interactive Demo Tour Toggle Badge */}
            <button
              onClick={() => setGuideStep(guideStep ? null : 1)}
              className={`px-2.5 py-1 rounded-full font-mono text-[11px] border transition-colors flex items-center gap-1 ${
                guideStep
                  ? 'bg-amber-500/15 text-amber-500 border-amber-500/30'
                  : isLightMode
                    ? 'bg-black/5 text-neutral-600 border-black/10 hover:bg-black/10'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-3 h-3" />
              <span>{guideStep ? `Demo Guide: Step ${guideStep}/3` : 'Enable Guide'}</span>
            </button>
          </div>

          {/* Toggle Button Switcher */}
          <div className="relative">
            <div
              className={`rc-grain-surface p-1 rounded-full border flex items-center shadow-lg relative ${
                isLightMode ? 'bg-black/[0.04] border-black/10' : 'bg-white/[0.05] border-white/15'
              }`}
            >
              <button
                onClick={() => handleToggleState('before')}
                className={`px-4 sm:px-6 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 ${
                  viewState === 'before'
                    ? 'bg-rose-500 text-white shadow-md'
                    : isLightMode
                      ? 'text-neutral-600 hover:text-black'
                      : 'text-neutral-400 hover:text-white'
                }`}
              >
                Before Remediation
              </button>
              <button
                onClick={() => handleToggleState('after')}
                className={`px-4 sm:px-6 py-2 rounded-full font-mono text-xs font-bold transition-all duration-300 relative ${
                  viewState === 'after'
                    ? 'bg-emerald-500 text-white shadow-md'
                    : isLightMode
                      ? 'text-neutral-600 hover:text-black'
                      : 'text-neutral-400 hover:text-white'
                }`}
              >
                After Remediation
              </button>
            </div>

            {/* STEP 2 POINTER DOT & TOOLTIP (Points to After Remediation Button) */}
            {guideStep === 2 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 pointer-events-auto flex flex-col items-center animate-fade-in">
                <div className="w-3 h-3 rounded-full bg-emerald-500 relative flex items-center justify-center -mt-1.5 mb-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
                </div>
                <div
                  className={`rc-grain-surface p-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-xs max-w-xs text-center space-y-1.5 ${
                    isLightMode ? 'bg-white/95 border-black/15 text-black' : 'bg-[#18181f]/95 border-emerald-500/40 text-white'
                  }`}
                >
                  <div className="font-mono text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                    Step 2 of 3 · Click to Switch
                  </div>
                  <p className="font-medium text-[11.5px] leading-snug">
                    Click <strong>&quot;After Remediation&quot;</strong> to see the authenticated delivery state.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Gmail Window Mockup */}
        <div
          className={`rc-grain-surface max-w-6xl mx-auto rounded-2xl sm:rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 relative select-none ${
            isLightMode
              ? 'bg-white border-black/10 shadow-black/10'
              : 'bg-[#101014] border-white/10 shadow-black/60'
          }`}
        >
          {/* 1. Gmail Window Title Bar */}
          <div
            className={`px-3 sm:px-4 py-2 border-b flex items-center justify-between text-xs select-none ${
              isLightMode ? 'bg-neutral-100/90 border-black/10' : 'bg-black/40 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span className="font-mono text-[11px] font-semibold tracking-wide ml-2">
                Gmail // {viewState === 'before' ? 'Spam Folder Inspection' : 'Primary Inbox'}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10.5px] text-neutral-400">
              <span>{viewState === 'before' ? 'Folder: Spam (Filtered)' : 'Folder: Primary (Aligned)'}</span>
            </div>
          </div>

          {/* 2. Top Gmail Search & Profile Bar */}
          <div
            className={`px-3 sm:px-6 py-2.5 border-b flex items-center justify-between gap-3 select-none ${
              isLightMode ? 'bg-white border-black/5' : 'bg-[#141418] border-white/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <GmailLogo className="w-5 h-5" />
              <span className="font-sans font-medium text-sm hidden xs:inline">Gmail</span>
            </div>

            <div
              className={`flex-1 max-w-lg mx-2 px-3 py-1.5 rounded-full border text-xs flex items-center gap-2 transition-colors ${
                isLightMode ? 'bg-neutral-100 border-black/5 text-neutral-700' : 'bg-white/5 border-white/10 text-neutral-300'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate">{viewState === 'before' ? 'in:spam' : 'in:inbox'}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center">
                S
              </div>
            </div>
          </div>

          {/* 3. Main Workspace: Split into Left Sidebar and Right Message Area */}
          <div className="flex min-h-[380px] sm:min-h-[420px] relative overflow-hidden">
            {/* Left Gmail Sidebar */}
            <div
              className={`w-14 sm:w-48 p-2 border-r flex flex-col justify-between select-none shrink-0 transition-colors ${
                isLightMode ? 'bg-neutral-50 border-black/5' : 'bg-[#121216] border-white/5'
              }`}
            >
              <div className="space-y-1">
                {/* Inbox Tab */}
                <div
                  onClick={() => {
                    if (viewState === 'after') {
                      setSelectedFolder('inbox');
                      setSelectedEmail(null);
                    }
                  }}
                  className={`px-2 sm:px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    viewState === 'after'
                      ? isLightMode
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'bg-blue-500/15 text-blue-400 font-semibold'
                      : isLightMode
                        ? 'text-neutral-600 hover:bg-black/5'
                        : 'text-neutral-400 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Inbox</span>
                  </div>
                  <span className="font-mono text-[10.5px] font-bold hidden sm:inline">
                    {counts.inbox.toLocaleString()}
                  </span>
                </div>

                {/* Spam Tab */}
                <div
                  onClick={() => {
                    if (viewState === 'before') {
                      setSelectedFolder('spam');
                      setSelectedEmail(null);
                    }
                  }}
                  className={`px-2 sm:px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                    viewState === 'before'
                      ? isLightMode
                        ? 'bg-rose-50 text-rose-700 font-semibold'
                        : 'bg-rose-500/15 text-rose-400 font-semibold'
                      : isLightMode
                        ? 'text-neutral-600 hover:bg-black/5'
                        : 'text-neutral-400 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4 shrink-0 text-rose-500" />
                    <span className="hidden sm:inline">Spam</span>
                  </div>
                  <span className="font-mono text-[10.5px] font-bold text-rose-500 hidden sm:inline">
                    {counts.spam.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Main Message List or Detail Viewer */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
              {selectedEmail ? (
                /* ================= EMAIL DETAIL VIEW ================= */
                <motion.div
                  key="email-detail-view"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6"
                >
                  <div className="space-y-4">
                    {/* Header back & navigation */}
                    <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/5">
                      <button
                        onClick={() => setSelectedEmail(null)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                          isLightMode
                            ? 'bg-black/5 hover:bg-black/10 text-neutral-800 border-black/10'
                            : 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to list</span>
                      </button>

                      {/* Header Inspector Toggle */}
                      <button
                        onClick={() => setShowHeaders(!showHeaders)}
                        className={`px-2.5 py-1 rounded-md font-mono text-[11px] border transition-colors ${
                          showHeaders
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : isLightMode
                              ? 'bg-black/5 border-black/10 text-neutral-600 hover:bg-black/10'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10'
                        }`}
                      >
                        {showHeaders ? 'Hide Raw Headers' : 'Show Authentication-Results'}
                      </button>
                    </div>

                    {/* Email Subject */}
                    <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isLightMode ? 'text-black' : 'text-white'}`}>
                      {selectedEmail.subject}
                    </h3>

                    {/* Sender Info Row */}
                    <div className="flex items-start justify-between gap-3 text-xs">
                      <div>
                        <div className="font-semibold text-black dark:text-white">{selectedEmail.sender}</div>
                        <div className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                          {selectedEmail.fromEmail}
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-neutral-400 shrink-0">
                        {selectedEmail.time}
                      </div>
                    </div>

                    {/* Warning Banner (Shown if present on unauthenticated emails) */}
                    {selectedEmail.warningTitle && viewState === 'before' && (
                      <div
                        className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs ${
                          selectedEmail.warningType === 'dangerous-phish'
                            ? isLightMode
                              ? 'bg-rose-50 border-rose-200 text-rose-900'
                              : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                            : isLightMode
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : 'bg-amber-950/30 border-amber-500/30 text-amber-200'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                        <div className="space-y-1">
                          <div className="font-bold">{selectedEmail.warningTitle}</div>
                          <p className="text-[11.5px] leading-relaxed">{selectedEmail.warningText}</p>
                        </div>
                      </div>
                    )}

                    {/* Authentication-Results Raw Header Drawer */}
                    {showHeaders && (
                      <div
                        className={`p-3.5 rounded-xl border font-mono text-[11px] leading-relaxed space-y-1.5 ${
                          isLightMode ? 'bg-neutral-100 border-black/10 text-neutral-800' : 'bg-black/60 border-white/10 text-neutral-300'
                        }`}
                      >
                        <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">
                          RFC 8601 Authentication-Results Header
                        </div>
                        {viewState === 'before' ? (
                          <>
                            <div className="text-rose-400">
                              mx.google.com; dkim=none (no signature found);
                            </div>
                            <div className="text-amber-400">
                              spf=softfail (google.com: domain of {selectedEmail.fromEmail} does not designate 198.51.100.24 as permitted sender);
                            </div>
                            <div className="text-rose-400">
                              dmarc=fail (p=none sp=none dis=none) header.from={currentDomain || 'domain.com'};
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-emerald-400">
                              mx.google.com; dkim=pass header.i=@apexglobalfreight.com header.s=google header.b=k82J...;
                            </div>
                            <div className="text-emerald-400">
                              spf=pass (google.com: domain of s.miller@apexglobalfreight.com designates 198.51.100.24 as permitted sender);
                            </div>
                            <div className="text-emerald-400">
                              dmarc=pass (p=reject sp=reject dis=none) header.from=apexglobalfreight.com;
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* Email Message Body */}
                    <div className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-neutral-700 dark:text-neutral-200 pt-2">
                      {selectedEmail.body.map((p, idx) => (
                        <p key={idx} className="whitespace-pre-line">{p}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ================= EMAIL LIST VIEW (EXACTLY 3 CARDS IN BOTH STATES) ================= */
                <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
                  <div className="flex-1 overflow-y-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {/* Gmail Sub-header Category Bar */}
                    <div
                      className={`px-3 sm:px-4 py-2 border-b flex items-center justify-between text-xs select-none ${
                        isLightMode ? 'bg-neutral-50 border-black/5' : 'bg-[#111114] border-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <Inbox className="w-3.5 h-3.5" />
                        <span>{viewState === 'before' ? 'Quarantined Spam Messages' : 'Primary Inbox'}</span>
                      </div>
                      <span className="font-mono text-[10.5px] text-neutral-400">
                        {viewState === 'before' ? '3 active filtered' : '3 active priority'}
                      </span>
                    </div>

                    {/* 3 Visible Email Cards Container */}
                    <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06] relative">
                      {viewState === 'before' ? (
                        /* BEFORE STATE: Card 1 (Bearnt), Card 2 (Steve Miller unverified), Card 3 (Van Hunter) */
                        <>
                          {/* Card 1: Bob Bearnt */}
                          <div
                            onClick={() => handleSelectEmail(SPAM_BEARNT_EMAIL)}
                            className="px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs bg-rose-500/[0.04] hover:bg-rose-500/[0.08] cursor-pointer transition-colors"
                          >
                            <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <div className="w-32 sm:w-44 shrink-0 font-bold truncate text-rose-600 dark:text-rose-400 line-through opacity-75">
                              {SPAM_BEARNT_EMAIL.sender}
                            </div>
                            <div className="flex-1 min-w-0 truncate text-rose-600/80 dark:text-rose-300/80 line-through">
                              <span className="font-semibold">{SPAM_BEARNT_EMAIL.subject}</span>
                              <span className="hidden md:inline font-normal text-rose-400/60"> — {SPAM_BEARNT_EMAIL.snippet}</span>
                            </div>
                            <span className="font-mono text-[11px] text-rose-500/70 shrink-0">{SPAM_BEARNT_EMAIL.time}</span>
                          </div>

                          {/* Card 2: Steve Miller (You) - Unauthenticated Cold Outreach */}
                          <div className="relative">
                            <div
                              onClick={() => handleSelectEmail(STEVE_PITCH_EMAIL)}
                              className={`px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs border-l-4 border-amber-500 cursor-pointer transition-colors ${
                                isLightMode ? 'bg-amber-500/[0.08] hover:bg-amber-500/[0.14]' : 'bg-amber-500/[0.06] hover:bg-amber-500/[0.12]'
                              }`}
                            >
                              <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <div className="w-32 sm:w-44 shrink-0 font-bold truncate flex items-center gap-1 text-amber-700 dark:text-amber-300">
                                <span>{STEVE_PITCH_EMAIL.sender}</span>
                                <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                              </div>
                              <div className="flex-1 min-w-0 truncate text-amber-900 dark:text-amber-100">
                                <span className="font-semibold">{STEVE_PITCH_EMAIL.subject}</span>
                                <span className="hidden md:inline font-normal text-amber-700/70 dark:text-amber-300/60"> — {STEVE_PITCH_EMAIL.snippet}</span>
                              </div>
                              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 shrink-0">
                                UNVERIFIED
                              </span>
                              <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold shrink-0">{STEVE_PITCH_EMAIL.time}</span>
                            </div>

                            {/* STEP 1 POINTER DOT & TOOLTIP (Points to Steve's email) */}
                            {guideStep === 1 && (
                              <div className="absolute top-full left-10 sm:left-24 mt-2 z-50 pointer-events-auto flex items-start gap-2 animate-fade-in">
                                <div className="w-3 h-3 rounded-full bg-amber-500 relative flex items-center justify-center mt-1 shrink-0">
                                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping absolute inset-0 opacity-75" />
                                </div>
                                <div
                                  className={`rc-grain-surface p-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-xs max-w-xs space-y-1 ${
                                    isLightMode ? 'bg-white/95 border-black/15 text-black' : 'bg-[#18181f]/95 border-amber-500/40 text-white'
                                  }`}
                                >
                                  <div className="font-mono text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                                    Step 1 of 3 · Click to Inspect
                                  </div>
                                  <p className="font-medium text-[11.5px] leading-snug">
                                    Click <strong>Steve&apos;s cold email</strong> to see why Gmail flagged it with an unverified sender warning banner.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card 3: Van Hunter */}
                          <div
                            onClick={() => handleSelectEmail(SPAM_VAN_HUNTER_EMAIL)}
                            className="px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs bg-rose-500/[0.04] hover:bg-rose-500/[0.08] cursor-pointer transition-colors"
                          >
                            <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <div className="w-32 sm:w-44 shrink-0 font-bold truncate text-rose-600 dark:text-rose-400 line-through opacity-75">
                              {SPAM_VAN_HUNTER_EMAIL.sender}
                            </div>
                            <div className="flex-1 min-w-0 truncate text-rose-600/80 dark:text-rose-300/80 line-through">
                              <span className="font-semibold">{SPAM_VAN_HUNTER_EMAIL.subject}</span>
                              <span className="hidden md:inline font-normal text-rose-400/60"> — {SPAM_VAN_HUNTER_EMAIL.snippet}</span>
                            </div>
                            <span className="font-mono text-[11px] text-rose-500/70 shrink-0">{SPAM_VAN_HUNTER_EMAIL.time}</span>
                          </div>
                        </>
                      ) : (
                        /* AFTER STATE: Card 1 (Sarah Chen positive reply), Card 2 (Steve Miller authenticated), Card 3 (DocuSign) */
                        <>
                          {/* Card 1: Sarah Chen Reply */}
                          <div className="relative">
                            <div
                              onClick={() => handleSelectEmail(SARAH_REPLY_EMAIL)}
                              className={`px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs border-l-4 border-emerald-500 cursor-pointer transition-colors ${
                                isLightMode ? 'bg-emerald-50/70 hover:bg-emerald-50' : 'bg-emerald-950/25 hover:bg-emerald-950/40'
                              }`}
                            >
                              <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                              <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" />
                              <div className="w-32 sm:w-44 shrink-0 font-bold truncate flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                <span>{SARAH_REPLY_EMAIL.sender}</span>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              </div>
                              <div className="flex-1 min-w-0 truncate text-neutral-900 dark:text-neutral-100">
                                <span className="font-semibold">{SARAH_REPLY_EMAIL.subject}</span>
                                <span className="hidden md:inline font-normal text-neutral-400"> — {SARAH_REPLY_EMAIL.snippet}</span>
                              </div>
                              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shrink-0">
                                REPLIED
                              </span>
                              <span className="font-mono text-[11px] text-emerald-500 font-bold shrink-0">{SARAH_REPLY_EMAIL.time}</span>
                            </div>

                            {/* STEP 3 POINTER DOT & TOOLTIP (Points to Sarah's reply) */}
                            {guideStep === 3 && (
                              <div className="absolute top-full left-10 sm:left-24 mt-2 z-50 pointer-events-auto flex items-start gap-2 animate-fade-in">
                                <div className="w-3 h-3 rounded-full bg-emerald-500 relative flex items-center justify-center mt-1 shrink-0">
                                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping absolute inset-0 opacity-75" />
                                </div>
                                <div
                                  className={`rc-grain-surface p-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-xs max-w-xs space-y-2 ${
                                    isLightMode ? 'bg-white/95 border-black/15 text-black' : 'bg-[#18181f]/95 border-emerald-500/40 text-white'
                                  }`}
                                >
                                  <div className="font-mono text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
                                    Step 3 of 3 · Primary Inbox Delivery
                                  </div>
                                  <p className="font-medium text-[11.5px] leading-snug">
                                    With cryptographic SPF, DKIM, and DMARC aligned, the email lands in the Primary Inbox and Sarah replies!
                                  </p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setGuideStep(null);
                                    }}
                                    className="w-full py-1 px-2 rounded-lg bg-emerald-500 text-white font-mono text-[10px] font-bold hover:bg-emerald-600 transition-colors"
                                  >
                                    Finish Tour
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Card 2: Steve Miller (You) - Authenticated */}
                          <div
                            onClick={() => handleSelectEmail(STEVE_PITCH_EMAIL)}
                            className={`px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs cursor-pointer transition-colors ${
                              isLightMode ? 'bg-white hover:bg-neutral-50' : 'bg-[#111114] hover:bg-white/[0.03]'
                            }`}
                          >
                            <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <div className="w-32 sm:w-44 shrink-0 font-bold truncate flex items-center gap-1 text-black dark:text-white">
                              <span>{STEVE_PITCH_EMAIL.sender}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            </div>
                            <div className="flex-1 min-w-0 truncate text-neutral-900 dark:text-neutral-100">
                              <span className="font-semibold">{STEVE_PITCH_EMAIL.subject}</span>
                              <span className="hidden md:inline font-normal text-neutral-400"> — {STEVE_PITCH_EMAIL.snippet}</span>
                            </div>
                            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shrink-0">
                              AUTHENTICATED
                            </span>
                            <span className="font-mono text-[11px] text-neutral-400 font-bold shrink-0">{STEVE_PITCH_EMAIL.time}</span>
                          </div>

                          {/* Card 3: DocuSign Trust Center */}
                          <div
                            onClick={() => handleSelectEmail(BACKGROUND_BLURRED_EMAILS[0])}
                            className={`px-3 sm:px-4 py-2.5 flex items-center gap-2 sm:gap-3 text-xs cursor-pointer transition-colors ${
                              isLightMode ? 'bg-white hover:bg-neutral-50' : 'bg-[#111114] hover:bg-white/[0.03]'
                            }`}
                          >
                            <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                            <div className="w-32 sm:w-44 shrink-0 font-semibold truncate text-neutral-800 dark:text-neutral-200">
                              {BACKGROUND_BLURRED_EMAILS[0].sender}
                            </div>
                            <div className="flex-1 min-w-0 truncate text-neutral-600 dark:text-neutral-300">
                              <span className="font-medium">{BACKGROUND_BLURRED_EMAILS[0].subject}</span>
                            </div>
                            <span className="font-mono text-[11px] text-neutral-400 shrink-0">{BACKGROUND_BLURRED_EMAILS[0].time}</span>
                          </div>
                        </>
                      )}

                      {/* Remaining Background Blurred Emails */}
                      {BACKGROUND_BLURRED_EMAILS.slice(1).map((email, bgIdx) => (
                        <div
                          key={email.id}
                          className="px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 text-xs opacity-25 filter blur-[1.5px] pointer-events-none select-none"
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <Star className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                          <div className="w-32 sm:w-44 shrink-0 font-normal truncate">{email.sender}</div>
                          <div className="flex-1 min-w-0 truncate">{email.subject}</div>
                          <span className="font-mono text-[11px] text-neutral-400 shrink-0">{email.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deliverability Reality Subtext */}
        <div className="mt-4 text-center">
          <p className={`text-xs sm:text-sm font-mono tracking-tight ${isLightMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
            Checks the DNS and authentication controls that influence mailbox-provider filtering.
          </p>
        </div>
      </div>
    </section>
  );
}
