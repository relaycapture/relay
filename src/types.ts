export type PagePhase = 'boot' | 'idle' | 'covering' | 'revealing';

export type CurrentView = 'landing' | 'pricing' | 'terms' | 'privacy' | 'refunds';

export interface DnsCheckRecord {
  type: 'SPF' | 'DKIM' | 'DMARC' | 'MX' | 'BIMI';
  status: 'pass' | 'warn' | 'fail' | 'missing' | 'info';
  value: string;
  selector?: string;
  details: string;
  remediation?: string;
}

export interface ScanResult {
  domain: string;
  timestamp: string;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;
  records: {
    spf: DnsCheckRecord;
    dmarc: DnsCheckRecord;
    dkim: DnsCheckRecord;
  };
  summary: {
    spoofingExposure: 'Critical' | 'Elevated' | 'Moderate' | 'Protected';
    quarantineRiskPct: number;
    recommendedAction: string;
  };
}

export interface ProtocolEnforcementEvent {
  id: string;
  date: string;
  authority: string;
  title: string;
  description: string;
  impactLevel: 'Mandatory' | 'Critical' | 'Standard';
  rfcOrPolicy: string;
}

export interface ProductTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  omits?: string[];
  ctaLabel: string;
}
