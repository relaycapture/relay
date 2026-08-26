'use client';

import { useRouter } from 'next/navigation';
import { PrivacyPage } from '../../src/components/privacy-page';

export default function PrivacyRoute() {
  const router = useRouter();

  return (
    <PrivacyPage
      onBackToHome={() => router.push('/')}
      onNavigateToTerms={() => router.push('/terms')}
      onNavigateToPrivacy={() => router.push('/privacy')}
      onNavigateToRefunds={() => router.push('/refund')}
    />
  );
}
