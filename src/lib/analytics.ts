'use client';
// Thin analytics wrapper. Sends events only if gtag was loaded (which happens after consent).
// A Play Store button click is reported as `download_click` — never as an install.
declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', name, params);
}
