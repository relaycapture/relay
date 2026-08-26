'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  type: 'spam-only' | 'steve-core' | 'sarah-reply' | 'steve-top' | 'background';
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

// 1. Top 4 SPAM / BEFORE EMAILS (Exact specifications with user's intentional typos)
const SPAM_BEARNT_EMAIL: SimulatedEmail = {
  id: 'spam-bearnt',
  sender: 'Bob Bearnt',
  fromEmail: 'bearnt@hyper-growth-machine.co',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'Re: Re: Re: Re: Re: did you get eaten by a bear? 🐻',
  snippet: 'Ive reached out a few times and havent heard back, so Im going to asume you were either eaten  by a bear...',
  time: '11:24 AM',
  type: 'spam-only',
  warningType: 'spam-reputation',
  warningTitle: 'Why is this message in spam?',
  warningText: 'Lots of messages from hyper-growth-machine.co were identified as spam in the past',
  warningButtons: ['Report not spam'],
  body: [
    'Ive reached out a few times and havent heard back, so Im going to asume you were either eaten  by a bear or the timing just isnt right for you to 10x your MRR this quarter 🚀',
    'I wont follqw up again, so ill go ahead and close your file.  If you somehow survived the bear attack and still wanna talk about automating your Pipeline so you never have to send cold emails again then let me know !',
    'Wishing you all the best at your company. Remember to reply if you see this!!',
    'Warmly,\nBearnt\nGlobal Head of HyperGrowth',
  ],
};

const STEVE_FOLLOWUP_EMAIL: SimulatedEmail = {
  id: 'steve-followup',
  sender: 'Steve Miller (You)',
  fromEmail: 's.miller@apexglobalfreight.com',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'RE: Q3 Trans-Pacific routing & drayage capacity',
  snippet: 'Sarah - following up on my note below regarding the capacity at Long Beach. With the announced GRI (General Rate Increases)...',
  time: '10:18 AM',
  type: 'steve-core',
  warningType: 'careful-unverified',
  warningTitle: 'Be careful with this message',
  warningText: 'Gmail could not verify that it actually came from apexglobalfreight.com. Avoid clicking links, downloading attachments, or replying with personal information.',
  warningButtons: ['Report spam', 'Report phishing'],
  body: [
    'Sarah - following up on my note below regarding the capacity at Long Beach.',
    'With the announced GRI (General Rate Increases) hitting on the 15th, I\'d love to run a quick benchmark on one of your current high-volume lanes just to show you the delta in what we can offer.',
    'Let me know if you have 10 minutes next Tuesday.',
    'Best,\nSteve',
  ],
  signature: STEVE_SIGNATURE,
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
    'Let me know if you have 5 mins for a quick virtual coffee this thursday. You can grab a slot on my cal here: http://bit.ly/definitely- not sus-calendar-link-4892',
    'Best,\nVan Hunter\nCo-Founder & VP of Hyper-Growth ScaleMax AI | "Pivoting your paradigms."',
  ],
};

// 2. The 2 New Incoming Emails in AFTER State
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

const STEVE_TOP_EMAIL: SimulatedEmail = {
  id: 'steve-top',
  sender: 'Steve Miller (You)',
  fromEmail: 's.miller@apexglobalfreight.com',
  toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
  subject: 'RE: Q3 Trans-Pacific routing & drayage capacity',
  snippet: 'Sarah, Understood. We have dedicated assets on the ground at LB, so we aren\'t relying on the public chassis pools...',
  time: 'Just now',
  type: 'steve-top',
  body: [
    'Sarah,',
    'Understood. We have dedicated assets on the ground at LB, so we aren\'t relying on the public chassis pools. That\'s how we bypass the bottleneck.',
    'I will have my pricing team pull the spot rates and transit time estimates for Ningbo to Dallas and shoot them over to you by Monday morning for your review.',
    'Have a good weekend,\nSteve',
  ],
  signature: STEVE_SIGNATURE,
};

// 3. Background Blurred Emails (Indexes 4+)
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
  {
    id: 'bg-github',
    sender: 'GitHub Security',
    fromEmail: 'security@github.com',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: '[Security Advisory] Automated secret scanning alert resolved for apex-relay',
    snippet: 'Dependabot has verified that all cryptographic signature checks are passing...',
    time: 'Aug 17',
    type: 'background',
    body: ['All secret scanning alerts have been cleared and verified.'],
  },
  {
    id: 'bg-figma',
    sender: 'Figma Enterprise',
    fromEmail: 'notifications@figma.com',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Sarah, you were invited to review "Q3 Logistics Architecture Design"',
    snippet: 'Alex Rivera requested your review on the primary freight flow interactive diagrams...',
    time: 'Aug 16',
    type: 'background',
    body: ['You were invited to review the Q3 Logistics Architecture Design file.'],
  },
  {
    id: 'bg-slack',
    sender: 'Slack Enterprise',
    fromEmail: 'feedback@slack.com',
    toEmail: 'Sarah Chen (Prospect) <s.chen@vanguardindustrial.com>',
    subject: 'Weekly Digest: 14 new canvas mentions in #logistics-core and #supply-chain',
    snippet: 'Here is what your team worked on this week across Vanguard Enterprise channels...',
    time: 'Aug 15',
    type: 'background',
    body: ['Your weekly Slack Enterprise digest for Vanguard Industrial is ready.'],
  },
];

type AnimationState =
  | 'before'
  | 'fwd-swiping-spam'
  | 'fwd-moved-bottom'
  | 'fwd-sarah-in'
  | 'after'
  | 'rev-sliding-out-top'
  | 'rev-moving-steve-up'
  | 'rev-swiping-spam-in';

export function InboxComparison({ isLightMode, isLivePreview = false, currentDomain }: InboxComparisonProps) {
  const [viewState, setViewState] = useState<'before' | 'after'>('before');
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'spam'>('spam');
  const [selectedEmail, setSelectedEmail] = useState<SimulatedEmail | null>(null);
  const [showHeaders, setShowHeaders] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  // Bi-directional Animation Phase State Machine
  const [animState, setAnimState] = useState<AnimationState>('before');

  // Counters
  const [counts, setCounts] = useState({
    inbox: 8562,
    inboxPct: 57.08,
    spam: 6438,
    spamPct: 42.92,
  });

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Smooth numeric counter animation with relaxed duration
  const animateNumbers = (toAfter: boolean) => {
    const startInbox = counts.inbox;
    const startInboxPct = counts.inboxPct;
    const startSpam = counts.spam;
    const startSpamPct = counts.spamPct;

    const targetInbox = toAfter ? 14973 : 8562;
    const targetInboxPct = toAfter ? 99.82 : 57.08;
    const targetSpam = toAfter ? 27 : 6438;
    const targetSpamPct = toAfter ? 0.18 : 42.92;

    const duration = 2600; // ms
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

  // Handle bidirectional switching between BEFORE and AFTER with stable timings
  const handleToggle = (targetState: 'before' | 'after') => {
    if (targetState === viewState) return;

    clearAllTimeouts();
    setViewState(targetState);
    setSelectedEmail(null);
    setShowHeaders(false);
    animateNumbers(targetState === 'after');

    if (targetState === 'after') {
      setSelectedFolder('inbox');

      // Forward Step 1 (t = 0ms): Swipe away 1st (Bearnt) & 4th (Van Hunter)
      setAnimState('fwd-swiping-spam');

      // Forward Step 2 (t = 700ms): Spam removed. Steve's 2 emails smoothly drop down to bottom with gap at top
      const t1 = setTimeout(() => {
        setAnimState('fwd-moved-bottom');
      }, 700);
      timeoutsRef.current.push(t1);

      // Forward Step 3 (t = 1750ms): Sarah Chen's reply slides into 2nd slot
      const t2 = setTimeout(() => {
        setAnimState('fwd-sarah-in');
      }, 1750);
      timeoutsRef.current.push(t2);

      // Forward Step 4 (t = 2750ms): Steve Miller's confirmation arrives in top slot
      const t3 = setTimeout(() => {
        setAnimState('after');
      }, 2750);
      timeoutsRef.current.push(t3);
    } else {
      setSelectedFolder('spam');

      // Reverse Step 1 (t = 0ms): Steve Top and Sarah Chen slide out to right
      setAnimState('rev-sliding-out-top');

      // Reverse Step 2 (t = 650ms): Steve Followup & Steve Pitch smoothly animate back UP to middle slots (1 & 2)
      const t1 = setTimeout(() => {
        setAnimState('rev-moving-steve-up');
      }, 650);
      timeoutsRef.current.push(t1);

      // Reverse Step 3 (t = 1500ms): Bearnt & Van Hunter slide back in from left
      const t2 = setTimeout(() => {
        setAnimState('rev-swiping-spam-in');
      }, 1500);
      timeoutsRef.current.push(t2);

      // Complete (t = 2200ms): Reset back to pure 'before' state
      const t3 = setTimeout(() => {
        setAnimState('before');
      }, 2200);
      timeoutsRef.current.push(t3);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts();
  }, []);

  const activeFolder = viewState === 'before' ? 'spam' : selectedFolder;

  // Track if Steve Miller emails should be in the dropped bottom position and white card mode
  const isSteveDropped =
    animState === 'fwd-moved-bottom' ||
    animState === 'fwd-sarah-in' ||
    animState === 'after' ||
    animState === 'rev-sliding-out-top';

  return (
    <section
      id="inbox-comparison"
      className={`relative px-4 sm:px-8 md:px-12 lg:px-24 overflow-hidden z-10 ${isLivePreview ? 'py-6' : 'py-20 sm:py-28 md:py-36 section-content-auto'
        }`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] h-[45vw] rounded-full blur-[180px] pointer-events-none transition-opacity ${isLightMode ? 'bg-neutral-200/40 opacity-30' : 'bg-white/[0.02] opacity-20'
            }`}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.035em] leading-[1.15] mb-4 text-center ${isLightMode ? 'text-[#1d1d1f]' : 'text-white'
              }`}
          >
            <span className="block">Same email.</span>
            <span className="block">Two destinations.</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto text-center ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
              }`}
          >
            <span className="block">Welcome to Sarah's inbox. From her eyes, your $15K enterprise proposal is</span>
            <span className="block">currently flagged by the algorithm because of domain authentication failure.</span>
          </p>
        </div>

        {/* Compact Exterior Control Dock */}
        <div className="flex justify-center -mb-2 relative z-20 w-full max-w-full overflow-hidden px-1 sm:px-0">
          <div
            className="inline-flex items-center p-1 sm:p-1.5 rounded-t-xl border-t border-x shadow-xl backdrop-blur-2xl transition-all"
            style={{
              backgroundColor: isLightMode ? 'rgba(255, 255, 255, 0.94)' : 'rgba(20, 20, 24, 0.94)',
              borderColor: isLightMode ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <div className="flex items-center gap-1 sm:gap-1.5 justify-center">
              {/* Toggle 1: BEFORE (Spam) */}
              <button
                onClick={() => handleToggle('before')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-center ${viewState === 'before'
                  ? isLightMode
                    ? 'bg-rose-500/10 text-rose-700 border border-rose-500/30 shadow-sm'
                    : 'bg-rose-500/15 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-950/40'
                  : isLightMode
                    ? 'text-neutral-600 hover:text-black hover:bg-black/5'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all ${viewState === 'before' ? 'bg-rose-500 animate-pulse' : 'bg-neutral-500'
                    }`}
                />
                <span>BEFORE: Spam</span>
              </button>

              {/* Toggle 2: AFTER (Enforced) */}
              <button
                onClick={() => handleToggle('after')}
                className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 text-center ${viewState === 'after'
                  ? isLightMode
                    ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30 shadow-sm'
                    : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950/40'
                  : isLightMode
                    ? 'text-neutral-600 hover:text-black hover:bg-black/5'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all ${viewState === 'after' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-neutral-500'
                    }`}
                />
                <span>AFTER: Enforced</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gmail Window Shell */}
        <div
          className={`rounded-3xl border shadow-2xl overflow-hidden backdrop-blur-2xl transition-all duration-500 relative z-10 ${isLightMode
            ? 'bg-[#ffffff] border-black/10 shadow-[0_25px_70px_rgba(0,0,0,0.07)]'
            : 'bg-[#111114] border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.45)]'
            }`}
        >
          {/* Authentic Gmail Top App Bar with Burger Menu and Official Gmail Icon */}
          <div
            className={`px-2.5 sm:px-5 py-1.5 sm:py-2.5 border-b flex items-center justify-between gap-2 sm:gap-3 transition-colors ${isLightMode ? 'bg-[#f6f8fc] border-black/[0.06]' : 'bg-[#18181c] border-white/[0.06]'
              }`}
          >
            {/* Left: Burger Menu + Official Gmail Logo */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={() => setIsSidebarExpanded((prev) => !prev)}
                className={`p-1 sm:p-1.5 rounded-lg transition-colors ${isLightMode ? 'hover:bg-black/5 text-neutral-600' : 'hover:bg-white/10 text-neutral-400'
                  }`}
                title={isSidebarExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                <Menu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <GmailLogo className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className={`font-semibold text-xs sm:text-sm tracking-tight ${isLightMode ? 'text-[#1f1f1f]' : 'text-white'}`}>
                  Gmail
                </span>
              </div>
            </div>

            {/* Middle: Clean Search Bar */}
            <div className="flex-1 max-w-xl mx-1 sm:mx-4">
              <div
                className={`flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-sans border transition-all ${isLightMode
                  ? 'bg-[#eaf1fb] border-transparent text-[#1f1f1f] focus-within:bg-white focus-within:border-blue-500 focus-within:shadow-md'
                  : 'bg-white/5 border-white/5 text-neutral-300 focus-within:bg-[#1a1a1f] focus-within:border-white/20 focus-within:shadow-md'
                  }`}
              >
                <Search className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  readOnly
                  value={`in:${activeFolder}`}
                  className="bg-transparent border-none outline-none w-full text-[11px] sm:text-xs font-mono select-none"
                />
                <SlidersHorizontal className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400 shrink-0 cursor-pointer" />
              </div>
            </div>

            {/* Right: User Avatar & Live Status */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="hidden sm:flex flex-col text-right">
                <span className={`text-[11px] font-bold ${isLightMode ? 'text-neutral-800' : 'text-neutral-200'}`}>
                  Sarah Chen (Prospect)
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  s.chen@vanguardindustrial.com
                </span>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px] sm:text-xs shadow-sm">
                SC
              </div>
            </div>
          </div>

          {/* Main Layout Area: Left Collapsible Folder Bar + Right Email List */}
          <div className="flex min-h-[480px] sm:min-h-[540px]">
            {/* Left Sidebar (Collapsed by default, smoothly hidden when viewing email) */}
            <motion.div
              initial={false}
              animate={{
                width: selectedEmail !== null ? 0 : isSidebarExpanded ? 180 : 54,
                opacity: selectedEmail !== null ? 0 : 1,
              }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`border-r flex flex-col justify-between select-none overflow-hidden transition-colors ${isLightMode ? 'bg-[#fafafc] border-black/[0.06]' : 'bg-[#141417] border-white/[0.06]'
                }`}
            >
              <div className="p-2 space-y-1">
                {/* Compose Button */}
                <div className="pb-3 pt-1 flex justify-center sm:justify-start">
                  <div
                    className={`inline-flex items-center gap-2.5 p-2 sm:px-3 sm:py-2 rounded-2xl shadow-sm text-xs font-semibold cursor-pointer transition-all ${isLightMode
                      ? 'bg-[#c2e7ff] text-[#001d35] hover:shadow-md'
                      : 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30'
                      }`}
                  >
                    <Sparkles className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">Compose</span>}
                  </div>
                </div>

                {/* Inbox Folder */}
                <button
                  onClick={() => {
                    if (viewState === 'after') {
                      setSelectedFolder('inbox');
                      setSelectedEmail(null);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${activeFolder === 'inbox'
                    ? isLightMode
                      ? 'bg-[#d3e3fd] text-[#041e49] font-bold shadow-sm'
                      : 'bg-blue-500/15 text-blue-400 font-bold border border-blue-500/20'
                    : isLightMode
                      ? 'text-neutral-700 hover:bg-black/5'
                      : 'text-neutral-400 hover:bg-white/5'
                    }`}
                  title="Inbox"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Inbox className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">Inbox</span>}
                  </div>
                  {isSidebarExpanded && (
                    <span
                      className={`font-mono text-[10px] font-bold ${viewState === 'after' ? 'text-emerald-500' : 'text-neutral-400'
                        }`}
                    >
                      {counts.inbox.toLocaleString()}
                    </span>
                  )}
                </button>

                {/* Starred */}
                <div
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  title="Starred"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Star className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">Starred</span>}
                  </div>
                </div>

                {/* Sent */}
                <div
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  title="Sent"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Send className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">Sent</span>}
                  </div>
                </div>

                {/* Spam Quarantine Folder */}
                <button
                  onClick={() => {
                    setSelectedFolder('spam');
                    setSelectedEmail(null);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${activeFolder === 'spam'
                    ? isLightMode
                      ? 'bg-rose-100 text-rose-900 font-bold shadow-sm'
                      : 'bg-rose-500/15 text-rose-400 font-bold border border-rose-500/20'
                    : isLightMode
                      ? 'text-neutral-700 hover:bg-black/5'
                      : 'text-neutral-400 hover:bg-white/5'
                    }`}
                  title="Spam"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <AlertOctagon className="w-4 h-4 flex-shrink-0 text-rose-500" />
                    {isSidebarExpanded && <span className="truncate">Spam</span>}
                  </div>
                  {isSidebarExpanded && (
                    <span
                      className={`font-mono text-[10px] font-bold ${viewState === 'before' ? 'text-rose-500' : 'text-neutral-400'
                        }`}
                    >
                      {counts.spam.toLocaleString()}
                    </span>
                  )}
                </button>

                {/* Trash */}
                <div
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                    }`}
                  title="Trash"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Trash2 className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">Trash</span>}
                  </div>
                </div>

                {/* More / Arrow Down */}
                <div
                  className={`flex items-center justify-between p-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${isLightMode ? 'text-neutral-600 hover:bg-black/5' : 'text-neutral-400 hover:bg-white/5'
                    }`}
                  title="More"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    {isSidebarExpanded && <span className="truncate">More</span>}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Pane: Email List OR Realistic Email Reader View */}
            <div className="flex-1 flex flex-col justify-between overflow-hidden relative">
              <AnimatePresence mode="wait">
                {selectedEmail ? (
                  /* ================= REALISTIC EMAIL READER VIEW ================= */
                  <motion.div
                    key="email-reader-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col overflow-y-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {/* Top Reader Action Bar */}
                    <div
                      className={`sticky top-0 z-10 px-4 py-2 border-b flex items-center justify-between gap-4 text-xs select-none backdrop-blur-md ${isLightMode ? 'bg-[#fafafc]/95 border-black/[0.06]' : 'bg-[#16161a]/95 border-white/[0.06]'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedEmail(null)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors font-medium text-xs ${isLightMode ? 'hover:bg-black/5 text-neutral-700' : 'hover:bg-white/10 text-neutral-300'
                            }`}
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to {viewState === 'before' ? 'Spam' : 'Inbox'}</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-neutral-400">
                        <Star className="w-3.5 h-3.5 cursor-pointer hover:text-amber-400" />
                        <Trash2 className="w-3.5 h-3.5 cursor-pointer hover:text-rose-500" />
                        <Mail className="w-3.5 h-3.5 cursor-pointer hover:text-black dark:hover:text-white" />
                        <MoreVertical className="w-3.5 h-3.5 cursor-pointer hover:text-black dark:hover:text-white" />
                      </div>
                    </div>

                    {/* Email Reader Content */}
                    <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
                      {/* Subject Title */}
                      <div className="border-b pb-3 border-black/[0.06] dark:border-white/[0.06]">
                        <h3
                          className={`text-base sm:text-lg font-bold leading-snug ${isLightMode ? 'text-neutral-900' : 'text-white'
                            }`}
                        >
                          {selectedEmail.subject}
                        </h3>
                      </div>

                      {/* Sender Metadata Row */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-sm ${viewState === 'before' || selectedEmail.type === 'spam-only'
                              ? 'bg-rose-500 text-white'
                              : selectedEmail.type === 'sarah-reply'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-blue-600 text-white'
                              }`}
                          >
                            {selectedEmail.sender[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`font-bold text-xs sm:text-sm ${isLightMode ? 'text-black' : 'text-white'
                                  }`}
                              >
                                {selectedEmail.sender}
                              </span>
                              <span className="text-[11px] font-mono text-neutral-400">
                                &lt;{selectedEmail.fromEmail}&gt;
                              </span>
                              {viewState === 'after' && selectedEmail.type !== 'spam-only' && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                  AUTHENTICATED
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                              <span>to {selectedEmail.toEmail}</span>
                              <span>•</span>
                              <span>{selectedEmail.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Authentic Warning Banner (Only for spam/unverified in BEFORE mode or spam folder) */}
                      {selectedEmail.warningType === 'spam-reputation' ? (
                        /* 1. Bob Bearnt Warning Box in Clean Gray */
                        <div
                          className={`p-3.5 sm:p-4 rounded-xl border text-xs font-sans shadow-sm ${isLightMode
                            ? 'bg-[#f1f3f4] border-black/10 text-neutral-800'
                            : 'bg-[#202124] border-white/10 text-neutral-200'
                            }`}
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                            <div className="flex-1 space-y-2">
                              <div className="font-bold text-xs sm:text-sm">
                                {selectedEmail.warningTitle}
                              </div>
                              <p className="leading-relaxed opacity-90 text-xs">
                                {selectedEmail.warningText}
                              </p>
                              <div className="flex items-center gap-2 pt-1">
                                {selectedEmail.warningButtons?.map((btn, bIdx) => (
                                  <button
                                    key={bIdx}
                                    className={`px-3 py-1 rounded-md text-[11px] font-medium border transition-colors ${isLightMode
                                      ? 'bg-white border-neutral-300 hover:bg-neutral-50 text-neutral-800 shadow-sm'
                                      : 'bg-white/10 border-white/15 hover:bg-white/20 text-neutral-200'
                                      }`}
                                  >
                                    {btn}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : selectedEmail.warningType === 'dangerous-phish' ? (
                        /* 2. Van Hunter Dangerous Box */
                        <div className="p-3.5 sm:p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-950 dark:text-rose-200 text-xs font-sans shadow-sm">
                          <div className="flex items-start gap-3">
                            <XOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                            <div className="flex-1 space-y-2">
                              <div className="font-bold text-rose-900 dark:text-rose-300 text-xs sm:text-sm">
                                {selectedEmail.warningTitle}
                              </div>
                              <p className="leading-relaxed text-neutral-800 dark:text-neutral-200 text-xs">
                                {selectedEmail.warningText}
                              </p>
                              <div className="flex items-center gap-2 pt-1">
                                {selectedEmail.warningButtons?.map((btn, bIdx) => (
                                  <button
                                    key={bIdx}
                                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${bIdx === 0
                                      ? 'bg-rose-600/20 hover:bg-rose-600/30 text-rose-950 dark:text-rose-200 border border-rose-500/30'
                                      : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200'
                                      }`}
                                  >
                                    {btn}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (selectedEmail.warningType === 'careful-unverified' && viewState === 'before') ? (
                        /* 3. Steve Miller Unverified Warning Box (Shown in BEFORE mode) */
                        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-200 text-xs font-sans shadow-sm">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <div className="flex-1 space-y-2">
                              <div className="font-bold text-amber-900 dark:text-amber-300 text-xs sm:text-sm">
                                {selectedEmail.warningTitle}
                              </div>
                              <p className="leading-relaxed text-neutral-800 dark:text-neutral-200 text-xs">
                                {selectedEmail.warningText}
                              </p>
                              <div className="flex items-center gap-2 pt-1">
                                {selectedEmail.warningButtons?.map((btn, bIdx) => (
                                  <button
                                    key={bIdx}
                                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${bIdx === 0
                                      ? 'bg-amber-600/20 hover:bg-amber-600/30 text-amber-950 dark:text-amber-200 border border-amber-500/30'
                                      : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200'
                                      }`}
                                  >
                                    {btn}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {/* Email Body Paragraphs */}
                      <div className="space-y-3 text-xs sm:text-sm leading-relaxed font-sans pt-2">
                        {selectedEmail.body.map((para, pIdx) => (
                          <p
                            key={pIdx}
                            className={`whitespace-pre-line ${isLightMode ? 'text-neutral-800' : 'text-neutral-200'
                              }`}
                          >
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Signature Block (for Steve and Sarah) */}
                      {selectedEmail.signature && (
                        <div className={`pt-3 border-t mt-4 ${isLightMode ? 'border-black/[0.08]' : 'border-white/[0.08]'}`}>
                          <div className="space-y-1">
                            <div className={`font-semibold text-xs sm:text-sm ${isLightMode ? 'text-neutral-900' : 'text-white'}`}>
                              {selectedEmail.signature.name}
                            </div>
                            <div className={`text-xs ${isLightMode ? 'text-neutral-600' : 'text-neutral-300'}`}>
                              {selectedEmail.signature.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1.5 text-[11px] text-neutral-400 font-mono">
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3 text-neutral-400" />
                                <span>{selectedEmail.signature.phone}</span>
                              </div>
                              <span className="opacity-40">•</span>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-neutral-400" />
                                <span>{selectedEmail.signature.email}</span>
                              </div>
                              <span className="opacity-40">•</span>
                              <div className="flex items-center gap-1">
                                <Globe className="w-3 h-3 text-neutral-400" />
                                <span>{selectedEmail.signature.domain}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Attachment Card Preview (if any) */}
                      {selectedEmail.hasAttachment && (
                        <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                            1 Attachment
                          </div>
                          <div
                            className={`inline-flex items-center gap-3 p-3 rounded-xl border text-xs transition-all shadow-sm ${isLightMode
                              ? 'bg-white border-black/10 hover:border-black/20 text-neutral-900'
                              : 'bg-[#18181c] border-white/10 hover:border-white/20 text-neutral-200'
                              }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-bold font-mono text-xs">{selectedEmail.hasAttachment}</div>
                              <div className="text-[10px] text-neutral-400">148 KB • Verified cryptographic checksum</div>
                            </div>
                            <Download className="w-4 h-4 text-neutral-400 ml-2 cursor-pointer hover:text-black dark:hover:text-white" />
                          </div>
                        </div>
                      )}

                    </div>
                  </motion.div>
                ) : (
                  /* ================= EMAIL LIST VIEW ================= */
                  <div
                    key="email-list-view"
                    className="flex-1 flex flex-col justify-between overflow-hidden relative"
                  >
                    <div className="flex-1 overflow-y-auto relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                      {/* 1. Gmail Sub-header Action Bar */}
                      <div
                        className={`sticky top-0 z-10 px-2.5 sm:px-4 py-1.5 sm:py-2 border-b flex items-center justify-between gap-2 sm:gap-4 text-[10px] sm:text-xs select-none backdrop-blur-md ${isLightMode ? 'bg-[#fafafc]/95 border-black/[0.06]' : 'bg-[#16161a]/95 border-white/[0.06]'
                          }`}
                      >
                        {/* Left: Checkbox, Single Circular Reload Arrow, Three Dots */}
                        <div className="flex items-center gap-2 sm:gap-3.5 text-neutral-400">
                          <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                          <RotateCw className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                          <MoreVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                        </div>

                        {/* Right: Item Count and Pagination Navigation Arrows */}
                        <div className="flex items-center gap-1.5 sm:gap-2 text-neutral-400">
                          <span className="text-[10px] sm:text-[11px] font-mono">
                            {viewState === 'after' ? `1–50 of ${counts.inbox.toLocaleString()}` : `1–50 of ${counts.spam.toLocaleString()}`}
                          </span>
                          <div className="flex items-center gap-0.5 sm:gap-1 ml-0.5">
                            <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 cursor-pointer hover:text-black dark:hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* 2. Gmail Category Tabs Strip (Left-Aligned & Compact on Mobile) */}
                      <div
                        className={`px-2 sm:px-4 border-b flex items-center justify-start gap-0.5 sm:gap-2 text-[10.5px] sm:text-xs select-none overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${isLightMode ? 'bg-white border-black/[0.06]' : 'bg-[#111114] border-white/[0.06]'
                          }`}
                      >
                        <div
                          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 font-medium border-b-2 transition-all cursor-pointer ${viewState === 'after'
                            ? isLightMode
                              ? 'text-blue-600 border-blue-600 font-semibold'
                              : 'text-blue-400 border-blue-400 font-semibold'
                            : isLightMode
                              ? 'text-neutral-700 border-transparent hover:bg-black/5'
                              : 'text-neutral-300 border-transparent hover:bg-white/5'
                            }`}
                        >
                          <Inbox className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Primary</span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors cursor-pointer border-b-2 border-transparent">
                          <Tag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Promotions</span>
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 font-medium text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors cursor-pointer border-b-2 border-transparent">
                          <Archive className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Updates</span>
                        </div>
                      </div>

                      {/* ================= FIXED 4-ROW ANIMATED CONTAINER ================= */}
                      <div className="relative h-[168px] w-full overflow-hidden select-none">
                        {/* Background Grid Divider Lines */}
                        <div className="absolute inset-0 pointer-events-none divide-y divide-black/[0.04] dark:divide-white/[0.06]">
                          <div className="h-[42px]" />
                          <div className="h-[42px]" />
                          <div className="h-[42px]" />
                          <div className="h-[42px]" />
                        </div>

                        {/* 1. Bob Bearnt Email (Row 0, top: 0px) */}
                        <motion.div
                          key="card-bearnt"
                          initial={false}
                          animate={{
                            x: animState === 'before' || animState === 'rev-swiping-spam-in' ? 0 : -450,
                            opacity: animState === 'before' || animState === 'rev-swiping-spam-in' ? 1 : 0,
                          }}
                          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                          onClick={() => {
                            if (animState === 'before') {
                              setSelectedEmail(SPAM_BEARNT_EMAIL);
                            }
                          }}
                          className={`absolute left-0 right-0 top-0 h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs bg-rose-500/[0.05] hover:bg-rose-500/[0.09] transition-colors ${animState === 'before' ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
                            }`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                          <div className="w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate text-rose-600 dark:text-rose-400 line-through opacity-75">
                            <span className="truncate whitespace-nowrap">{SPAM_BEARNT_EMAIL.sender}</span>
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span className="font-semibold truncate text-rose-600/80 dark:text-rose-300/80 line-through">
                              {SPAM_BEARNT_EMAIL.subject}
                            </span>
                            <span className="font-normal truncate hidden md:inline text-rose-400/60 line-through">
                              — {SPAM_BEARNT_EMAIL.snippet}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-bold flex-shrink-0 text-rose-500/70">
                            {SPAM_BEARNT_EMAIL.time}
                          </span>
                        </motion.div>

                        {/* 2. Steve Miller Top Confirmation (Row 0, top: 0px, arrives in AFTER) */}
                        <motion.div
                          key="card-steve-top"
                          initial={false}
                          animate={{
                            x: animState === 'after' ? 0 : 450,
                            opacity: animState === 'after' ? 1 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          onClick={() => {
                            if (animState === 'after') {
                              setSelectedEmail(STEVE_TOP_EMAIL);
                            }
                          }}
                          className={`absolute left-0 right-0 top-0 h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs transition-colors border-l-4 border-emerald-500 ${isLightMode ? 'bg-emerald-50/70 hover:bg-emerald-50' : 'bg-emerald-950/20 hover:bg-emerald-950/30'
                            } ${animState === 'after' ? 'cursor-pointer pointer-events-auto z-20' : 'pointer-events-none'}`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400 fill-emerald-400/20" />
                          <div className="w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <span className="truncate whitespace-nowrap">{STEVE_TOP_EMAIL.sender}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span className={`font-semibold truncate ${isLightMode ? 'text-neutral-900' : 'text-neutral-100'}`}>
                              {STEVE_TOP_EMAIL.subject}
                            </span>
                            <span className="font-normal truncate hidden md:inline text-neutral-400">
                              — {STEVE_TOP_EMAIL.snippet}
                            </span>
                          </div>
                          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex-shrink-0">
                            AUTHENTICATED
                          </span>
                          <span className="font-mono text-[11px] font-bold flex-shrink-0 text-emerald-500">
                            {STEVE_TOP_EMAIL.time}
                          </span>
                        </motion.div>

                        {/* 3. Sarah Chen Reply (Row 1, top: 42px, arrives in AFTER) */}
                        <motion.div
                          key="card-sarah-reply"
                          initial={false}
                          animate={{
                            x: animState === 'fwd-sarah-in' || animState === 'after' ? 0 : 450,
                            opacity: animState === 'fwd-sarah-in' || animState === 'after' ? 1 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          onClick={() => {
                            if (animState === 'fwd-sarah-in' || animState === 'after') {
                              setSelectedEmail(SARAH_REPLY_EMAIL);
                            }
                          }}
                          className={`absolute left-0 right-0 top-[42px] h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs transition-colors border-l-4 border-emerald-500 ${isLightMode ? 'bg-emerald-50/70 hover:bg-emerald-50' : 'bg-emerald-950/20 hover:bg-emerald-950/30'
                            } ${animState === 'fwd-sarah-in' || animState === 'after'
                              ? 'cursor-pointer pointer-events-auto z-20'
                              : 'pointer-events-none'
                            }`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400 fill-emerald-400/20" />
                          <div className="w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate flex items-center gap-1 sm:gap-1.5 text-emerald-600 dark:text-emerald-400">
                            <span className="truncate whitespace-nowrap">{SARAH_REPLY_EMAIL.sender}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span className={`font-semibold truncate ${isLightMode ? 'text-neutral-900' : 'text-neutral-100'}`}>
                              {SARAH_REPLY_EMAIL.subject}
                            </span>
                            <span className="font-normal truncate hidden md:inline text-neutral-400">
                              — {SARAH_REPLY_EMAIL.snippet}
                            </span>
                          </div>
                          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex-shrink-0">
                            AUTHENTICATED
                          </span>
                          <span className="font-mono text-[11px] font-bold flex-shrink-0 text-emerald-500">
                            {SARAH_REPLY_EMAIL.time}
                          </span>
                        </motion.div>

                        {/* 4. Steve Followup (Row 1 at top: 42px -> Drops to Row 2 at top: 84px) */}
                        <motion.div
                          key="card-steve-followup"
                          initial={false}
                          animate={{
                            y: isSteveDropped ? 42 : 0,
                          }}
                          transition={{
                            y: { type: 'spring', stiffness: 220, damping: 22 },
                          }}
                          onClick={() => {
                            setSelectedEmail(STEVE_FOLLOWUP_EMAIL);
                          }}
                          className={`absolute left-0 right-0 top-[42px] h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs cursor-pointer z-10 transition-colors duration-300 ${isSteveDropped
                            ? isLightMode
                              ? 'bg-white hover:bg-neutral-50'
                              : 'bg-[#111114] hover:bg-white/[0.03]'
                            : 'bg-rose-500/[0.05] hover:bg-rose-500/[0.09]'
                            }`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                          <div
                            className={`w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 ${isSteveDropped
                              ? 'text-black dark:text-white'
                              : 'text-rose-600 dark:text-rose-400 line-through opacity-75'
                              }`}
                          >
                            <span className="truncate whitespace-nowrap">{STEVE_FOLLOWUP_EMAIL.sender}</span>
                            {isSteveDropped && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span
                              className={`font-semibold truncate transition-colors duration-300 ${isSteveDropped
                                ? isLightMode
                                  ? 'text-neutral-900'
                                  : 'text-neutral-100'
                                : 'text-rose-600/80 dark:text-rose-300/80 line-through'
                                }`}
                            >
                              {STEVE_FOLLOWUP_EMAIL.subject}
                            </span>
                            <span
                              className={`font-normal truncate hidden md:inline transition-colors duration-300 ${isSteveDropped ? 'text-neutral-400' : 'text-rose-400/60 line-through'
                                }`}
                            >
                              — {STEVE_FOLLOWUP_EMAIL.snippet}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[11px] font-bold flex-shrink-0 transition-colors duration-300 ${isSteveDropped ? 'text-black dark:text-white' : 'text-rose-500/70'
                              }`}
                          >
                            {STEVE_FOLLOWUP_EMAIL.time}
                          </span>
                        </motion.div>

                        {/* 5. Steve Pitch (Row 2 at top: 84px -> Drops to Row 3 at top: 126px right above blurred rows) */}
                        <motion.div
                          key="card-steve-pitch"
                          initial={false}
                          animate={{
                            y: isSteveDropped ? 42 : 0,
                          }}
                          transition={{
                            y: { type: 'spring', stiffness: 220, damping: 22 },
                          }}
                          onClick={() => {
                            setSelectedEmail(STEVE_PITCH_EMAIL);
                          }}
                          className={`absolute left-0 right-0 top-[84px] h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs cursor-pointer z-10 transition-colors duration-300 ${isSteveDropped
                            ? isLightMode
                              ? 'bg-white hover:bg-neutral-50'
                              : 'bg-[#111114] hover:bg-white/[0.03]'
                            : 'bg-rose-500/[0.05] hover:bg-rose-500/[0.09]'
                            }`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                          <div
                            className={`w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate flex items-center gap-1 sm:gap-1.5 transition-colors duration-300 ${isSteveDropped
                              ? 'text-black dark:text-white'
                              : 'text-rose-600 dark:text-rose-400 line-through opacity-75'
                              }`}
                          >
                            <span className="truncate whitespace-nowrap">{STEVE_PITCH_EMAIL.sender}</span>
                            {isSteveDropped && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span
                              className={`font-semibold truncate transition-colors duration-300 ${isSteveDropped
                                ? isLightMode
                                  ? 'text-neutral-900'
                                  : 'text-neutral-100'
                                : 'text-rose-600/80 dark:text-rose-300/80 line-through'
                                }`}
                            >
                              {STEVE_PITCH_EMAIL.subject}
                            </span>
                            <span
                              className={`font-normal truncate hidden md:inline transition-colors duration-300 ${isSteveDropped ? 'text-neutral-400' : 'text-rose-400/60 line-through'
                                }`}
                            >
                              — {STEVE_PITCH_EMAIL.snippet}
                            </span>
                          </div>
                          <span
                            className={`font-mono text-[11px] font-bold flex-shrink-0 transition-colors duration-300 ${isSteveDropped ? 'text-black dark:text-white' : 'text-rose-500/70'
                              }`}
                          >
                            {STEVE_PITCH_EMAIL.time}
                          </span>
                        </motion.div>

                        {/* 6. Van Hunter Email (Row 3, top: 126px) */}
                        <motion.div
                          key="card-van-hunter"
                          initial={false}
                          animate={{
                            x: animState === 'before' || animState === 'rev-swiping-spam-in' ? 0 : -450,
                            opacity: animState === 'before' || animState === 'rev-swiping-spam-in' ? 1 : 0,
                          }}
                          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                          onClick={() => {
                            if (animState === 'before') {
                              setSelectedEmail(SPAM_VAN_HUNTER_EMAIL);
                            }
                          }}
                          className={`absolute left-0 right-0 top-[126px] h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs bg-rose-500/[0.05] hover:bg-rose-500/[0.09] transition-colors ${animState === 'before' ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'
                            }`}
                        >
                          <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                          <Star className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400" />
                          <div className="w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate text-rose-600 dark:text-rose-400 line-through opacity-75">
                            <span className="truncate whitespace-nowrap">{SPAM_VAN_HUNTER_EMAIL.sender}</span>
                          </div>
                          <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                            <span className="font-semibold truncate text-rose-600/80 dark:text-rose-300/80 line-through">
                              {SPAM_VAN_HUNTER_EMAIL.subject}
                            </span>
                            <span className="font-normal truncate hidden md:inline text-rose-400/60 line-through">
                              — {SPAM_VAN_HUNTER_EMAIL.snippet}
                            </span>
                          </div>
                          <span className="font-mono text-[11px] font-bold flex-shrink-0 text-rose-500/70">
                            {SPAM_VAN_HUNTER_EMAIL.time}
                          </span>
                        </motion.div>
                      </div>

                      {/* ================= PERMANENTLY BLURRED BACKGROUND ROWS (5th Email Onward) ================= */}
                      <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06] relative">
                        {BACKGROUND_BLURRED_EMAILS.map((email, bgIdx) => {
                          const blurPx = Math.min(3.0 + bgIdx * 0.55, 6.5);
                          const opacityVal = Math.max(0.85 - bgIdx * 0.06, 0.45);

                          return (
                            <div
                              key={email.id}
                              style={{
                                filter: `blur(${blurPx}px)`,
                                opacity: opacityVal,
                                userSelect: 'none',
                                pointerEvents: 'none',
                              }}
                              className={`h-[42px] px-3 sm:px-4 flex items-center gap-2 sm:gap-3 text-xs transition-opacity ${isLightMode ? 'bg-white/80' : 'bg-[#111114]/80'
                                }`}
                            >
                              <Square className="w-3.5 h-3.5 text-neutral-400/80 dark:text-neutral-500 flex-shrink-0" />
                              <Star className="w-3.5 h-3.5 flex-shrink-0 text-neutral-400/80 dark:text-neutral-500" />
                              <div className="w-[125px] xs:w-[145px] sm:w-52 flex-shrink-0 font-bold truncate text-neutral-800 dark:text-neutral-200">
                                <span className="truncate whitespace-nowrap">{email.sender}</span>
                              </div>
                              <div className="flex-1 min-w-0 flex items-center gap-2 truncate">
                                <span className="font-semibold truncate text-neutral-800 dark:text-neutral-200">
                                  {email.subject}
                                </span>
                                <span className="font-normal truncate hidden md:inline text-neutral-500 dark:text-neutral-400">
                                  — {email.snippet}
                                </span>
                              </div>
                              {email.hasAttachment && (
                                <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-mono text-neutral-500 dark:text-neutral-400 border-black/10 dark:border-white/10">
                                  <Paperclip className="w-3 h-3 text-neutral-400" />
                                  <span className="truncate max-w-[120px]">{email.hasAttachment}</span>
                                </div>
                              )}
                              <span className="font-mono text-[11px] font-bold flex-shrink-0 text-neutral-600 dark:text-neutral-400">
                                {email.time}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom Status Bar: Pin Left & Pin Right for All Mobile Screens */}
                    <div
                      className={`px-3 sm:px-4 py-1.5 border-t flex items-center justify-between gap-2 text-[10px] font-sans relative z-30 w-full overflow-hidden ${isLightMode ? 'bg-[#f6f8fc] border-black/[0.06] text-neutral-500' : 'bg-[#141417] border-white/[0.06] text-neutral-400'
                        }`}
                    >
                      {/* Left: Storage Meter */}
                      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                        <div className="w-12 sm:w-16 h-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: '42.8%' }}
                          />
                        </div>
                        <span className="font-mono text-[9px] sm:text-[9.5px] whitespace-nowrap">
                          <span className="hidden xs:inline">2.14 TB of </span>5 TB (42.8%) used
                        </span>
                      </div>

                      {/* Right: Terms & Privacy Links */}
                      <div className="flex items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[9.5px] font-sans opacity-70 shrink-0 text-right whitespace-nowrap">
                        <span className="hover:underline cursor-pointer">Terms</span>
                        <span>•</span>
                        <span className="hover:underline cursor-pointer">Privacy</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline hover:underline cursor-pointer">Program Policies</span>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
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
