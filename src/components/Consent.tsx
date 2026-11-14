'use client';
import { useEffect } from 'react';
import { CLARITY_ID, GA_ID } from '@/lib/site';

function loadGa() {
  if (!GA_ID || document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  // gtag expects the raw `arguments` object to be pushed.
  // eslint-disable-next-line prefer-rest-params
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function loadClarity() {
  if (!CLARITY_ID || document.getElementById('clarity-script')) return;
  const w = window as unknown as { clarity?: { (...a: unknown[]): void; q?: unknown[] } };
  w.clarity = w.clarity || function clarity(...a: unknown[]) { (w.clarity!.q = w.clarity!.q || []).push(a); };
  const s = document.createElement('script');
  s.id = 'clarity-script';
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(s);
}

function loadAnalytics() {
  loadGa();
  loadClarity();
}

/**
 * Loads analytics (Microsoft Clarity, and Google Analytics if an ID is set) for every visitor, with no banner.
 * Inputs in the tools, templates and contact form carry data-clarity-mask, so typed text is never recorded.
 * Waits until the browser is idle so analytics never slows the first paint.
 */
export default function Consent() {
  useEffect(() => {
    if (!GA_ID && !CLARITY_ID) return;
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(loadAnalytics);
    else setTimeout(loadAnalytics, 1200);
  }, []);
  return null;
}
