'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  label = 'Advertisement',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && !isPushed.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch {
      // AdSense handles repeat pushes or blocker exceptions gracefully
    }
  }, []);

  return (
    <div
      className={`relative w-full my-6 text-center overflow-hidden rounded-2xl bg-slate-900/40 border border-slate-800/80 p-3 ${className}`}
    >
      <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-2">
        {label}
      </div>

      <div className="min-h-[100px] flex items-center justify-center">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
}
