'use client';

import { useRouter } from 'next/navigation';
import { RefundsPage } from '../../src/components/refunds-page';

export default function RefundRoute() {
  const router = useRouter();

  return (
    <RefundsPage
      onBackToHome={() => router.push('/')}
      onNavigateToTerms={() => router.push('/terms')}
      onNavigateToPrivacy={() => router.push('/privacy')}
      onNavigateToRefunds={() => router.push('/refund')}
    />
  );
}
