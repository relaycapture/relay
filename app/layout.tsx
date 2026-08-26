import type { Metadata, Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://relaycapture.com'),
  title: 'Relay Capture — Email Authentication Intelligence & Deliverability Architecture',
  description:
    'Diagnostic scanning of outbound email infrastructure (SPF, DKIM, DMARC, blacklist status, mail server config). Eliminate outbound pipeline decay and recover lost revenue.',
  keywords: [
    'email authentication',
    'DMARC alignment',
    'DKIM rotation',
    'SPF hardfail',
    'email deliverability',
    'B2B pipeline infrastructure',
    'RevOps',
    'sales operations',
  ],
  authors: [{ name: 'Relay Capture' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://relaycapture.com',
  },
  openGraph: {
    type: 'website',
    url: 'https://relaycapture.com',
    siteName: 'Relay Capture',
    title: 'Relay Capture — Email Authentication Intelligence & Deliverability Architecture',
    description:
      'Diagnostic scanning of outbound email infrastructure (SPF, DKIM, DMARC, blacklist status, mail server config). See what the internet sees and eliminate pipeline decay.',
    images: [
      {
        url: 'https://relaycapture.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Relay Capture Platform Interface & Deliverability Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Relay Capture — Email Authentication Intelligence & Deliverability Architecture',
    description:
      'Diagnostic scanning of outbound email infrastructure (SPF, DKIM, DMARC, blacklist status, mail server config). Stop outbound pipeline decay.',
    images: ['https://relaycapture.com/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0C',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://relaycapture.com/#organization',
      name: 'Relay Capture',
      url: 'https://relaycapture.com',
      email: 'sam@relaycapture.com',
      description:
        'Asynchronous B2B pipeline infrastructure and automated deliverability architecture designed for high-ticket B2B sales teams and SaaS companies.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://relaycapture.com/#website',
      url: 'https://relaycapture.com',
      name: 'Relay Capture',
      publisher: {
        '@id': 'https://relaycapture.com/#organization',
      },
      description:
        'Diagnostic scanning of outbound email infrastructure (SPF, DKIM, DMARC, blacklist status, mail server config).',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://relaycapture.com/#software',
      name: 'Relay Capture',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '3000',
        highPrice: '15000',
      },
      description:
        'Automated DMARC/DKIM/SPF cryptographic alignment, real-time quarantine monitoring, data enrichment routing, and sub-15-second inbound pipeline interception.',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark overflow-x-hidden max-w-[100vw]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0A0A0C] text-[#F4F4F2] selection:bg-[#22D3EE]/30 selection:text-[#22D3EE] overflow-x-hidden max-w-[100vw] w-full antialiased">
        {/* SVG glass refraction filter for custom cursor */}
        <svg
          width="0"
          height="0"
          style={{ position: 'absolute', pointerEvents: 'none' }}
          aria-hidden="true"
        >
          <filter id="glass-refract">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.012"
              numOctaves={1}
              seed={4}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={16}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
