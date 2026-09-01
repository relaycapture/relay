'use client';

import { useRouter } from 'next/navigation';
import { PricingPage } from '../../src/components/pricing-page';

export default function PricingRoute() {
  const router = useRouter();

  return (
    <PricingPage
      onBackToHome={() => router.push('/')}
      onNavigateToTerms={() => router.push('/terms')}
      onNavigateToPrivacy={() => router.push('/privacy')}
      onNavigateToRefunds={() => router.push('/refund')}
    />
  );
}
