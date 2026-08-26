'use client'

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface DomainFaviconProps {
  domain: string;
  isLightMode?: boolean;
  className?: string;
  iconClassName?: string;
}

export function DomainFavicon({
  domain,
  isLightMode = false,
  className = 'w-6 h-6',
  iconClassName = 'w-4 h-4',
}: DomainFaviconProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Clean domain string: remove https://, trailing slashes, www.
  const cleanDomain = domain
    ? domain.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0].trim().toLowerCase()
    : '';

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [cleanDomain]);

  if (!cleanDomain || hasError) {
    return (
      <div
        className={`flex items-center justify-center rounded-md ${className} ${
          isLightMode ? 'text-neutral-400 bg-neutral-100' : 'text-neutral-500 bg-white/5'
        }`}
      >
        <Globe className={iconClassName} />
      </div>
    );
  }

  // Google Favicon API (high-resolution 128px)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${cleanDomain}&sz=128`;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-md ${className}`}>
      {!isLoaded && !hasError && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            isLightMode ? 'text-neutral-400 bg-neutral-100' : 'text-neutral-500 bg-white/5'
          }`}
        >
          <Globe className={iconClassName} />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={faviconUrl}
        alt={`${cleanDomain} logo`}
        className={`w-full h-full object-contain transition-opacity duration-200 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}

export default DomainFavicon;

