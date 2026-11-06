'use client';
import type { ReactNode } from 'react';
import { playStoreHref } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

/** Button or text link that opens the Google Play listing directly. Falls back to /download if no Play URL is set. */
export default function PlayLink({ placement, className = '', children }: { placement: string; className?: string; children: ReactNode }) {
  const href = playStoreHref(placement) ?? '/download';
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      onClick={() => trackEvent('download_click', { placement })}
    >
      {children}
    </a>
  );
}
