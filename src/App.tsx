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
  { id: 'financial-leakage', label: '03 // Revenue Impact' },
  { id: 'inbox-comparison', label: '04 // Inbox Simulation' },
  { id: 'demo-section', label: '05 // Demo' },
  { id: 'protocol-feed', label: '06 // Protocol Stream' },
  { id: 'three-cards-section', label: '07 // Deliverables' },
  { id: 'faq-section', label: '08 // Architecture FAQ' },
  { id: 'contact-section', label: '09 // Engineering Contact' },
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
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reducedMotion]);

  // Lock scrolling when QuickNav is open
  useEffect(() => {
    if (isQuickNavOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = '';
    }
  }, [isQuickNavOpen]);

  // Initial boot sequence (hold ~800ms, then fade out smoothly)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('idle');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Section Observer to track active section for QuickNav (RAF throttled)
  useEffect(() => {
    if (currentView !== 'landing') return;

    let ticking = false;
    let rafId = 0;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          const scrollPos = window.scrollY + window.innerHeight * 0.35;
          for (let i = SECTIONS.length - 1; i >= 0; i--) {
            const el = document.getElementById(SECTIONS[i].id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(SECTIONS[i].id);
              break;
            }
          }
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [currentView]);

  // Teleport Navigation Handler with black grainy fade in/out and destination label
  const triggerTeleportTransition = (destination: string, callback: () => void) => {
    setIsQuickNavOpen(false);
    document.body.style.overflow = '';
    lenisRef.current?.start();

    setTeleportDestination(destination);
    setPhase('covering');
    setTimeout(() => {
      callback();
      // Hold on the black grainy screen with destination text for ~550ms
      setTimeout(() => {
        setPhase('revealing');
        setTimeout(() => {
          setPhase('idle');
          setTeleportDestination('');
        }, 500);
      }, 550);
    }, 380);
  };

  const handleNavigate = (target: 'home' | 'pricing' | 'contact' | 'checker' | 'terms' | 'privacy' | 'refunds') => {
    if (target === 'pricing') {
      triggerTeleportTransition('Pricing', () => {
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
    } else if (target === 'contact') {
      if (currentView !== 'landing') {
        triggerTeleportTransition('Engineering Contact', () => {
          setCurrentView('landing');
          setTimeout(() => {
            const el = document.getElementById('contact-section');
            el?.scrollIntoView({ behavior: 'instant' });
          }, 20);
        });
      } else {
        triggerTeleportTransition('Engineering Contact', () => {
          const el = document.getElementById('contact-section');
          el?.scrollIntoView({ behavior: 'instant' });
        });
      }
    } else if (target === 'checker') {
      if (currentView !== 'landing') {
        triggerTeleportTransition('Domain Checker', () => {
          setCurrentView('landing');
          setTimeout(() => {
            const el = document.getElementById('domain-checker-section');
            el?.scrollIntoView({ behavior: 'instant' });
          }, 20);
        });
      } else {
        triggerTeleportTransition('Domain Checker', () => {
          const el = document.getElementById('domain-checker-section');
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
    'demo-section': 'Demo',
    'demo': 'Demo',
    'protocol-feed': 'Protocol Stream',
    'three-cards-section': 'Deliverables',
    'faq-section': 'Architecture FAQ',
    'contact-section': 'Engineering Contact',
    // Section ID aliases
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
      className={`min-h-screen transition-colors duration-300 ${
        isLightMode
          ? 'bg-[#F4F4F2] text-[#0A0A0C] light'
          : (currentView === 'landing' || currentView === 'pricing')
          ? 'bg-[#151515] rc-page-grain-151515 text-[#F4F4F2] dark'
          : 'bg-[#0A0A0C] text-[#F4F4F2] dark'
      }`}
    >
      {/* Custom Refractive Cursor */}
      <CustomCursor />

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
            onScanClick={() => handleNavigate('checker')}
            onExploreClick={() => handleNavigate('pricing')}
          />

          {/* 2. Real-time Domain Checker Section with Zero Credential Note Line */}
          <DomainCheckerSection
            onScanResult={(res) => {
              setScanResult(res);
              if (res.domain) {
                setCurrentDomain(res.domain);
                setLastScannedTime(new Date());
              }
            }}
            isLightMode={isLightMode}
          />

          {/* 3. Financial Leakage Section */}
          <FinancialLeakage
            scanResult={scanResult}
            currentDomain={currentDomain}
            lastScannedTime={lastScannedTime}
            isLightMode={isLightMode}
          />

          {/* 4. Real-World Gmail Inbox Simulation (Before / After) */}
          <InboxComparison
            currentDomain={currentDomain || undefined}
            isLightMode={isLightMode}
          />

          {/* 5. Cloudflare DNS Zone Mockup Demo Tab */}
          <DeliverabilitySimulator isLightMode={isLightMode} />

          {/* 6. Live Protocol Enforcement Feed (Moving Vertical Cards Stream) */}
          <LiveProtocolFeed isLightMode={isLightMode} />

          {/* 6. Three Structured Deliverables Cards */}
          <ThreeCards
            onSelectTier={() => handleNavigate('pricing')}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
            isLightMode={isLightMode}
          />

          {/* 7. Technical Architecture & Questions Answered FAQ */}
          <FaqSection isLightMode={isLightMode} />

          {/* 8. Direct Technical Contact Block (Integrated Background, sam@relaycapture.com) */}
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
          onOpenCheckout={() => {}}
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

      {/* Confidential Redacted Deliverable Sample Modal */}
      <SampleDeliverableModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        isLightMode={isLightMode}
      />
    </div>
  );
}
