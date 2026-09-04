'use client'

import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { TeleportOverlay } from './components/teleport-overlay';
import { CustomCursor } from './components/custom-cursor';
import { Navbar } from './components/navbar';
import { QuickNav, QuickNavSection } from './components/quick-nav';
import { HeroSection } from './components/sections/hero-section';
import { DomainCheckerSection } from './components/sections/domain-checker-section';
import { FinancialLeakage } from './components/sections/financial-leakage';
import { CryptographicBaseline } from './components/sections/cryptographic-baseline';
import { HowItWorks } from './components/sections/how-it-works';
import { PostInvoiceTimeline } from './components/sections/post-invoice-timeline';
import { ArchitectureComparison } from './components/sections/architecture-comparison';
import { PreOrderChecklist } from './components/sections/pre-order-checklist';
import { FleetPricing } from './components/sections/fleet-pricing';
import { SampleDeliverableModal } from './components/sections/sample-deliverable-modal';
import { FaqSection } from './components/sections/faq-section';
import { FooterContact } from './components/sections/footer-contact';
import { BottomScreenBlur, TopScreenBlur } from './components/bottom-screen-blur';
import { PricingPage } from './components/pricing-page';
import { TermsPage } from './components/terms-page';
import { PrivacyPage } from './components/privacy-page';
import { RefundsPage } from './components/refunds-page';
import { initPaddle } from './utils/paddle';
import { PagePhase, CurrentView, ScanResult } from './types';

const SECTIONS: QuickNavSection[] = [
  { id: 'hero-section', label: '01 // Overview' },
  { id: 'domain-checker-section', label: '02 // Domain Audit' },
  { id: 'cryptographic-baseline', label: '03 // Cryptographic Baseline' },
  { id: 'how-it-works', label: '04 // How It Works' },
  { id: 'invoice-settle-timeline', label: '05 // Post-Payment SLA' },
  { id: 'comparison-section', label: '06 // Architectural Benchmark' },
  { id: 'prerequisites-section', label: '07 // Pre-Order Checklist' },
  { id: 'fleet-pricing-section', label: '08 // Fleet Engineering Fee' },
  { id: 'faq-section', label: '09 // Architecture FAQ' },
  { id: 'contact-section', label: '10 // Engineering Contact' },
];

export default function App() {
  const [phase, setPhase] = useState<PagePhase>('boot');
  const [teleportDestination, setTeleportDestination] = useState<string>('');
  const [currentView, setCurrentView] = useState<CurrentView>('landing');
  const [activeSection, setActiveSection] = useState('hero-section');
  const isLightMode = false;
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);
  const [lastScannedTime, setLastScannedTime] = useState<Date | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isRevenueImpactOpen, setIsRevenueImpactOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
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

  // Pre-initialize Paddle v2 SDK
  useEffect(() => {
    initPaddle();
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lenis = new Lenis({
      duration: isTouch ? 0.9 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.0,
      autoResize: true,
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
  }, []);

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
      } else {
        setShowNavbar(true);
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
      triggerTeleportTransition('Fleet Engineering Fee', () => {
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
    } else if (target === 'checklist' || target === 'prerequisites') {
      triggerTeleportTransition('Have These Ready', () => {
        const isAlreadyOnLanding = currentView === 'landing';
        if (!isAlreadyOnLanding) {
          setCurrentView('landing');
        }
        document.body.style.overflow = '';
        lenisRef.current?.start();

        const scrollToTarget = () => {
          const el = document.getElementById('prerequisites-section');
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el, { immediate: true });
            } else {
              el.scrollIntoView({ behavior: 'instant' });
            }
            return true;
          }
          return false;
        };

        if (!scrollToTarget()) {
          requestAnimationFrame(() => {
            if (!scrollToTarget()) {
              setTimeout(scrollToTarget, 50);
            }
          });
        }
      });
    } else if (target === 'contact') {
      triggerTeleportTransition('Engineering Contact', () => {
        const isAlreadyOnLanding = currentView === 'landing';
        if (!isAlreadyOnLanding) {
          setCurrentView('landing');
        }
        document.body.style.overflow = '';
        lenisRef.current?.start();

        const scrollToTarget = () => {
          const el = document.getElementById('contact-section');
          if (el) {
            if (lenisRef.current) {
              lenisRef.current.scrollTo(el, { immediate: true });
            } else {
              el.scrollIntoView({ behavior: 'instant' });
            }
            return true;
          }
          return false;
        };

        if (!scrollToTarget()) {
          requestAnimationFrame(() => {
            if (!scrollToTarget()) {
              setTimeout(scrollToTarget, 50);
            }
          });
        }
      });
    } else if (target === 'home') {
      triggerTeleportTransition('Overview', () => {
        setCurrentView('landing');
        window.scrollTo({ top: 0, behavior: 'instant' });
        lenisRef.current?.scrollTo(0, { immediate: true });
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
    'cryptographic-baseline': 'Cryptographic Baseline',
    'how-it-works': 'How It Works',
    'invoice-settle-timeline': 'Post-Payment SLA',
    'comparison-section': 'Architectural Benchmark',
    'prerequisites-section': 'Have These Ready',
    'fleet-pricing-section': 'Fleet Engineering Fee',
    'faq-section': 'Architecture FAQ',
    'contact-section': 'Engineering Contact',
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
      const isAlreadyOnLanding = currentView === 'landing';
      if (!isAlreadyOnLanding) {
        setCurrentView('landing');
      }
      document.body.style.overflow = '';
      lenisRef.current?.start();

      const scrollToTarget = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { immediate: true });
          } else {
            el.scrollIntoView({ behavior: 'instant' });
          }
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        requestAnimationFrame(() => {
          if (!scrollToTarget()) {
            setTimeout(scrollToTarget, 50);
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#08080a] rc-page-grain-08080a text-[#F4F4F2] dark select-none">
      {/* Modern Black Cursor with White Outline & Tactile Click Confirmation */}
      <CustomCursor />

      {/* Teleport Grainy Fade Overlay with Destination Indicator */}
      <TeleportOverlay phase={phase} destination={teleportDestination} reducedMotion={reducedMotion} />

      {/* Top-Left Dynamic Collapsible Navbar (Hidden on pricing, terms, privacy, and refund pages) */}
      {currentView === 'landing' && (
        <Navbar
          currentView={currentView}
          onNavigate={handleNavigate}
          isLightMode={false}
          isHidden={!showNavbar || isQuickNavOpen}
          isQuickNavOpen={isQuickNavOpen}
          activeSection={activeSection}
        />
      )}

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

      {/* Top Screen Blur (Progressive optical dissipation feathering at top edge) */}
      <TopScreenBlur isLightMode={isLightMode} height="h-20 sm:h-24 md:h-28" />

      {/* Bottom Screen Blur (Clean, shorter, high-performance progressive optical feathering) */}
      <BottomScreenBlur isLightMode={isLightMode} height="h-20 sm:h-24 md:h-28" />

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
            onExploreClick={() => {
              const el = document.getElementById('fleet-pricing-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
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

          {/* 3. Live Cryptographic Baseline Section */}
          <CryptographicBaseline isLightMode={isLightMode} />

          {/* 4. How It Works Section */}
          <HowItWorks isLightMode={isLightMode} />

          {/* 5. What Happens The Second You Settle The Invoice Section */}
          <PostInvoiceTimeline isLightMode={isLightMode} />

          {/* 6. Comparison Section (Direct Dedicated vs Automated Reseller Pools) */}
          <ArchitectureComparison isLightMode={isLightMode} />

          {/* 7. Have These Ready Before Ordering Section */}
          <PreOrderChecklist isLightMode={isLightMode} />

          {/* 8. Fleet Engineering Fee Configurator Section */}
          <FleetPricing
            isLightMode={isLightMode}
            onOpenSampleModal={() => setIsSampleModalOpen(true)}
          />

          {/* 9. Technical Architecture & Questions Answered FAQ */}
          <FaqSection isLightMode={isLightMode} />

          {/* 10. Direct Technical Contact Block & Footer */}
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
