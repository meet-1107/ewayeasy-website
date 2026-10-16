'use client';
import { playStoreHref } from '@/lib/site';
import { trackEvent } from '@/lib/analytics';

/**
 * "Get it on Google Play" badge. Before launch, replace the inline artwork with the official
 * badge from https://play.google.com/intl/en_us/badges/ (see README placeholder checklist).
 * With no verified Play Store URL configured it renders a non-clickable "coming soon" state
 * instead of a guessed link.
 */
export default function PlayBadge({ placement, className = '' }: { placement: string; className?: string }) {
  const href = playStoreHref(placement);
  const art = (
    <svg viewBox="0 0 180 54" className="h-[52px] w-auto" role="img" aria-label="Get it on Google Play">
      <rect x="0.5" y="0.5" width="179" height="53" rx="9" fill="#000" stroke="#A6A6A6" />
      <path d="M16 12.5 37 27 16 41.5c-.7-.3-1.1-1-1.1-1.9V14.4c0-.9.4-1.6 1.1-1.9Z" fill="#00D7FE" />
      <path d="m16 12.5 14.6 14.5L16 41.5" fill="none" />
      <path d="M30.6 27 16 12.5l18.3 10.4L30.6 27Z" fill="#00F076" />
      <path d="M30.6 27 16 41.5l18.3-10.4L30.6 27Z" fill="#FF3A44" />
      <path d="m34.3 22.9 5 2.8c1.3.8 1.3 1.9 0 2.6l-5 2.8-3.7-4.1 3.7-4.1Z" fill="#FFC400" />
      <text x="50" y="22" fill="#fff" fontSize="9" fontFamily="Arial, sans-serif" letterSpacing=".6">GET IT ON</text>
      <text x="49" y="40" fill="#fff" fontSize="18.5" fontFamily="Arial, sans-serif" fontWeight="500">Google Play</text>
    </svg>
  );
  if (!href) {
    return (
      <span className={`inline-flex flex-col items-start gap-1 ${className}`} title="Play Store link will be added at launch">
        <span className="opacity-60">{art}</span>
        <span className="text-[11px] font-medium opacity-70">Play Store link coming soon</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`inline-block transition hover:-translate-y-0.5 ${className}`}
      onClick={() => trackEvent('download_click', { placement })}
    >
      {art}
    </a>
  );
}
