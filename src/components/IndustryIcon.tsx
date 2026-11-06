import type { ReactElement } from 'react';
import type { IndustryIcon as Name } from '@/lib/industry-types';

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const PATHS: Record<Name, ReactElement> = {
  fmcg: (
    <g {...S}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M9.5 13h5" />
    </g>
  ),
  textile: (
    <g {...S}>
      <path d="M8 4h8l3 4-3 2v10H8V10L5 8l3-4Z" />
      <path d="M10 4a2 2 0 0 0 4 0" />
    </g>
  ),
  pharma: (
    <g {...S}>
      <rect x="4" y="9" width="16" height="7" rx="3.5" transform="rotate(-35 12 12.5)" />
      <path d="m10.2 9.4 3.9 5.6" />
    </g>
  ),
  auto: (
    <g {...S}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </g>
  ),
  machinery: (
    <g {...S}>
      <path d="M3 20h18M5 20V11l5-3v4l5-3v4l4-2v9" />
      <path d="M8 16h2M13 16h2" />
    </g>
  ),
  ecommerce: (
    <g {...S}>
      <path d="M4 8l8-4 8 4v8l-8 4-8-4V8Z" />
      <path d="m4 8 8 4 8-4M12 12v8" />
    </g>
  ),
};

export default function IndustryIcon({ name, className = 'h-6 w-6' }: { name: Name; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {PATHS[name]}
    </svg>
  );
}
