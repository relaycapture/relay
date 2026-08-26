'use client';

import { useRouter } from 'next/navigation';
import { TermsPage } from '../../src/components/terms-page';

export default function TermsRoute() {
  const router = useRouter();

  return (
    <TermsPage
      onBackToHome={() => router.push('/')}
      onNavigateToTerms={() => router.push('/terms')}
      onNavigateToPrivacy={() => router.push('/privacy')}
      onNavigateToRefunds={() => router.push('/refund')}
    />
  );
}
