'use client'

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { TeleportOverlay } from './components/teleport-overlay';
import { CustomCursor } from './components/custom-cursor';
import { Navbar } from './components/navbar';
import { CornerElements } from './components/corner-elements';
import { QuickNav, QuickNavSection } from './components/quick-nav';
import { HeroSection } from './components/sections/hero-section';
import { DomainCheckerSection } from './components/sections/domain-checker-section';
import { FinancialLeakage } from './components/sections/financial-leakage';
import { InboxComparison } from './components/sections/inbox-comparison';
import { DeliverabilitySimulator } from './components/sections/deliverability-simulator';
import { LiveProtocolFeed } from './components/sections/live-protocol-feed';
import { ThreeCards } from './components/sections/three-cards';
import { SampleDeliverableModal } from './components/sections/sample-deliverable-modal';
import { FaqSection } from './components/sections/faq-section';
import { FooterContact } from './components/sections/footer-contact';
import { SectionDivider } from './components/section-divider';
import { PricingPage } from './components/pricing-page';
import { TermsPage } from './components/terms-page';
import { PrivacyPage } from './components/privacy-page';
import { RefundsPage } from './components/refunds-page';
import { PagePhase, CurrentView, ScanResult } from './types';

const SECTIONS: QuickNavSection[] = [
  { id: 'hero-section', label: '01 // Overview' },
  { id: 'domain-checker-section', label: '02 // Domain Audit' },
  { id: 'inbox-comparison', label: '03 // Inbox Simulation' },
  { id: 'protocol-feed', label: '04 // Protocol Stream' },
  { id: 'three-cards-section', label: '05 // Deliverables' },
  { id: 'faq-section', label: '06 // Architecture FAQ' },
  { id: 'contact-section', label: '07 // Engineering Contact' },
];

export default function App() {
  const [phase, setPhase] = useState<PagePhase>('boot');
  const [teleportDestination, setTeleportDestination] = useState<string>('');
  const [currentView, setCurrentView] = useState<CurrentView>('landing');
  const [activeSection, setActiveSection] = useState('hero-section');
  const [isLightMode, setIsLightMode] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);
  const [lastScannedTime, setLastScannedTime] = useState<Date | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isRevenueImpactOpen, setIsRevenueImpactOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [showThemeToggle, setShowThemeToggle] = useState(true);
  const [showQuickNav, setShowQuickNav] = useState(true);

  const lenisRef = useRef<Lenis | null>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Page boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('idle');
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Proximity to top & bottom detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY < 50) {
        setShowNavbar(true);
        setShowThemeToggle(true);
      } else {
        setShowNavbar(true);
        setShowThemeToggle(true);
      }

      if (scrollY + windowHeight >= documentHeight - 100) {
        setShowQuickNav(true);
      } else {
        setShowQuickNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    if (currentView !== 'landing') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [currentView]);

  // Teleportation Transition Handler
  const triggerTeleportTransition = (destinationName: string, onExecute: () => void) => {
    if (reducedMotion) {
      onExecute();
      return;
    }

    setTeleportDestination(destinationName);
    setPhase('covering');

    setTimeout(() => {
      onExecute();
      setPhase('revealing');

      setTimeout(() => {
        setPhase('idle');
        setTeleportDestination('');
      }, 500);
    }, 450);
  };

  // Navigation handlers
  const handleNavigate = (target: string) => {
    setIsQuickNavOpen(false);
    document.body.style.overflow = '';
    lenisRef.current?.start();

    if (target === 'pricing') {
      triggerTeleportTransition('One-Time Pricing', () => {
        setCurrentView('pricing');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else if (target === 'terms') {
      triggerTeleportTransition('Terms of Service', () => {
        setCurrentView('terms');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else if (target === 'privacy') {
      triggerTeleportTransition('Privacy Policy', () => {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else if (target === 'refunds') {
      triggerTeleportTransition('Refund Policy', () => {
        setCurrentView('refunds');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else if (target === 'home') {
      triggerTeleportTransition('Overview', () => {
        setCurrentView('landing');
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    } else if (target === 'checker') {
      if (currentView !== 'landing') {
        triggerTeleportTransition('Domain Checker', () => {
          setCurrentView('landing');
          setTimeout(() => {
            const el = document.getElementById('hero-section') || document.getElementById('domain-checker-section');
            el?.scrollIntoView({ behavior: 'instant' });
          }, 20);
        });
      } else {
        triggerTeleportTransition('Domain Checker', () => {
          const el = document.getElementById('hero-section') || document.getElementById('domain-checker-section');
          el?.scrollIntoView({ behavior: 'instant' });
        });
      }
    }
  };

  // Teleportation for QuickNav with section titles
  const SECTION_TITLES: Record<string, string> = {
    'hero-section': 'Overview',
    'domain-checker-section': 'Domain Audit',
    'financial-leakage': 'Revenue Impact',
    'inbox-comparison': 'Inbox Simulation',
    'protocol-feed': 'Protocol Stream',
    'three-cards-section': 'Deliverables',
    'faq-section': 'Architecture FAQ',
    'contact-section': 'Engineering Contact',
    'financial-leakage-section': 'Revenue Impact',
    'inbox-comparison-section': 'Inbox Simulation',
    'protocol-feed-section': 'Protocol Stream',
  };

  const handleSelectSection = (sectionId: string) => {
    setIsQuickNavOpen(false);
    document.body.style.overflow = '';
    lenisRef.current?.start();

    const title =
      SECTION_TITLES[sectionId] ||
      SECTIONS.find((s) => s.id === sectionId)?.label.replace(/^\d+\s*\/\/\s*/, '') ||
      'Overview';

    triggerTeleportTransition(title, () => {
      if (currentView !== 'landing') {
        setCurrentView('landing');
      }
      document.body.style.overflow = '';
      lenisRef.current?.start();

      const el = document.getElementById(sectionId);
      if (el) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(el, { immediate: true });
        } else {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }
    });
  };

  const handleToggleTheme = () => {
    setIsLightMode(!isLightMode);
    document.documentElement.classList.toggle('light', !isLightMode);
    document.documentElement.classList.toggle('dark', isLightMode);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${isLightMode
        ? 'bg-[#F4F4F2] text-[#0A0A0C] light'
        : (currentView === 'landing' || currentView === 'pricing' || currentView === 'terms' || currentView === 'privacy' || currentView === 'refunds')
          ? 'bg-[#0f0d13] rc-page-grain-0f0d13 text-[#F4F4F2] dark'
          : 'bg-[#0f0d13] text-[#F4F4F2] dark'
        }`}
    >
      {/* Custom Refractive Cursor. Hidden for now */}
      {/* <CustomCursor /> */}

      {/* Teleport Black Grainy Fade Overlay with Destination Indicator */}
      <TeleportOverlay phase={phase} destination={teleportDestination} reducedMotion={reducedMotion} />

      {/* Top-Left Dynamic Collapsible Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        isLightMode={isLightMode}
        isHidden={!showNavbar || isQuickNavOpen}
        isQuickNavOpen={isQuickNavOpen}
      />

      {/* Top-Right Fixed Theme Toggle */}
      <CornerElements
        isLightMode={isLightMode}
        onToggleTheme={handleToggleTheme}
        isQuickNavOpen={isQuickNavOpen}
        showThemeToggle={showThemeToggle}
      />

      {/* Compressed Bottom-Left Proximity Section Quick-Nav with Full Backdrop Blur & Teleport */}
      {currentView === 'landing' && (
        <QuickNav
          sections={SECTIONS}
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
          isLightMode={isLightMode}
          onNearChange={setIsQuickNavOpen}
          isVisible={showQuickNav}
        />
      )}

      {/* Views */}
      {currentView === 'landing' ? (
        <main className="relative w-full overflow-x-clip">
          {/* 1. Hero Section */}
          <HeroSection
            isLightMode={isLightMode}
            onScanClick={() => {
              const el = document.getElementById('domain-checker-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onExploreClick={() => handleNavigate('pricing')}
          />

          {/* 2. Standalone Domain Checker Section */}
          <DomainCheckerSection
            onScanResult={(res) => {
              setScanResult(res);
              if (res.domain) {
                setCurrentDomain(res.domain);
                setLastScannedTime(new Date());
              }
            }}
            onDomainChange={(d) => setCurrentDomain(d)}
            onOpenRevenueImpact={() => setIsRevenueImpactOpen(true)}
            isLightMode={isLightMode}
          />

          {/* 4. Real-World Gmail Inbox Simulation (Before / After) */}
          <InboxComparison
            currentDomain={currentDomain || undefined}
            isLightMode={isLightMode}
          />

          {/* 5. Cloudflare DNS Zone Mockup Demo Tab (Hidden per request, files kept intact) */}
          {/* <DeliverabilitySimulator isLightMode={isLightMode} /> */}

          {/* 5. Live Protocol Enforcement Feed (Moving Vertical Cards Stream) */}
          <LiveProtocolFeed isLightMode={isLightMode} />

          {/* 6. Three Structured Deliverables Cards */}
          <ThreeCards
            onSelectTier={() => handleNavigate('pricing')}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
            isLightMode={isLightMode}
          />

          {/* 7. Technical Architecture & Questions Answered FAQ */}
          <FaqSection isLightMode={isLightMode} />

          {/* 8. Direct Technical Contact Block */}
          <FooterContact
            isLightMode={isLightMode}
            onNavigateToPricing={() => handleNavigate('pricing')}
            onNavigateToTerms={() => handleNavigate('terms')}
            onNavigateToPrivacy={() => handleNavigate('privacy')}
            onNavigateToRefunds={() => handleNavigate('refunds')}
          />
        </main>
      ) : currentView === 'pricing' ? (
        /* Dedicated Pricing Sub-page */
        <PricingPage
          onBackToHome={() => handleNavigate('home')}
          onOpenCheckout={() => { }}
          onOpenSampleModal={() => setIsSampleModalOpen(true)}
          onNavigateToTerms={() => handleNavigate('terms')}
          onNavigateToPrivacy={() => handleNavigate('privacy')}
          onNavigateToRefunds={() => handleNavigate('refunds')}
          isLightMode={isLightMode}
        />
      ) : currentView === 'terms' ? (
        /* Standalone Terms of Service Page */
        <TermsPage
          onBackToHome={() => handleNavigate('home')}
          onNavigateToTerms={() => handleNavigate('terms')}
          onNavigateToPrivacy={() => handleNavigate('privacy')}
          onNavigateToRefunds={() => handleNavigate('refunds')}
          isLightMode={isLightMode}
        />
      ) : currentView === 'privacy' ? (
        /* Standalone Privacy Policy Page */
        <PrivacyPage
          onBackToHome={() => handleNavigate('home')}
          onNavigateToTerms={() => handleNavigate('terms')}
          onNavigateToPrivacy={() => handleNavigate('privacy')}
          onNavigateToRefunds={() => handleNavigate('refunds')}
          isLightMode={isLightMode}
        />
      ) : (
        /* Standalone Refund Policy Page */
        <RefundsPage
          onBackToHome={() => handleNavigate('home')}
          onNavigateToTerms={() => handleNavigate('terms')}
          onNavigateToPrivacy={() => handleNavigate('privacy')}
          onNavigateToRefunds={() => handleNavigate('refunds')}
          isLightMode={isLightMode}
        />
      )}

      {/* Interactive Revenue Impact Sensitivity Modal */}
      <FinancialLeakage
        isOpen={isRevenueImpactOpen}
        onClose={() => setIsRevenueImpactOpen(false)}
        scanResult={scanResult}
        currentDomain={currentDomain}
        lastScannedTime={lastScannedTime}
        isLightMode={isLightMode}
      />

      {/* Confidential Redacted Deliverable Sample Modal */}
      <SampleDeliverableModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        isLightMode={isLightMode}
      />
    </div>
  );
}
