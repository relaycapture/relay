import { SectionWatermarkProps } from '../components/section-watermark';

/**
 * Centralized Watermark Configuration
 * 
 * Standardized across every section with exact offsets (-30px desktop, -10px mobile)
 * while preserving each section's original technical thematic text.
 */
const BASE_WATERMARK_CONFIG: Omit<SectionWatermarkProps, 'text' | 'mobileText'> = {
  top: '-30px',
  left: '-30px',
  size: 'text-[28rem]',
  mobileTop: '-10px',
  mobileLeft: '-10px',
  mobileSize: 'text-[9rem]',
  opacity: 'opacity-[0.02]',
  mobileOpacity: 'opacity-[0.025]',
  bottomFade: true,
};

export const WATERMARKS: Record<string, SectionWatermarkProps> = {
  hero: { text: 'RELAY', mobileText: 'RELAY', ...BASE_WATERMARK_CONFIG },
  domainChecker: { text: 'AUDIT', mobileText: 'AUDIT', ...BASE_WATERMARK_CONFIG },
  cryptographicBaseline: { text: 'RFC', mobileText: 'RFC', ...BASE_WATERMARK_CONFIG },
  howItWorks: { text: '03', mobileText: '03', ...BASE_WATERMARK_CONFIG },
  postInvoiceTimeline: { text: '48H', mobileText: '48H', ...BASE_WATERMARK_CONFIG },
  architectureComparison: { text: 'MTA', mobileText: 'MTA', ...BASE_WATERMARK_CONFIG },
  preOrderChecklist: { text: 'PRE', mobileText: 'PRE', ...BASE_WATERMARK_CONFIG },
  fleetPricing: { text: 'CAPEX', mobileText: 'CAPEX', ...BASE_WATERMARK_CONFIG },
  faq: { text: 'FAQ', mobileText: 'FAQ', ...BASE_WATERMARK_CONFIG },
  footer: { text: 'RELAY', mobileText: 'RELAY', ...BASE_WATERMARK_CONFIG },
};
