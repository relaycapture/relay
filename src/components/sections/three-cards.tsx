'use client'

import { FleetPricing } from './fleet-pricing';

interface ThreeCardsProps {
  onSelectTier?: (tierId: string) => void;
  onOpenSampleModal?: () => void;
  isLightMode?: boolean;
  isLivePreview?: boolean;
}

export function ThreeCards({
  onOpenSampleModal,
  isLightMode,
  isLivePreview = false,
}: ThreeCardsProps) {
  return (
    <FleetPricing
      isLightMode={isLightMode}
      isLivePreview={isLivePreview}
      onOpenSampleModal={onOpenSampleModal}
    />
  );
}
