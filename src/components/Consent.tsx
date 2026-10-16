'use client';
import { useEffect, useState } from 'react';
import { GA_ID } from '@/lib/site';

const KEY = 'ee-consent';

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

/** Analytics loads only after an explicit "Accept". Without a GA ID nothing is shown at all. */
export default function Consent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!GA_ID) return;
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (v === 'yes') loadGa();
    else if (v !== 'no') setShow(true);
  }, []);
  if (!show) return null;
  const choose = (yes: boolean) => {
    try { localStorage.setItem(KEY, yes ? 'yes' : 'no'); } catch {}
    if (yes) loadGa();
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Analytics consent" className="no-print fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-brand-900/10 bg-white p-4 shadow-lift">
      <p className="text-sm text-ink-soft">
        We use analytics to learn which guides and tools are useful. Invoice data you type into our tools is never sent.
      </p>
      <div className="mt-3 flex gap-2">
        <button className="btn-primary py-2" onClick={() => choose(true)}>Accept analytics</button>
        <button className="btn-ghost py-2" onClick={() => choose(false)}>Decline</button>
      </div>
    </div>
  );
}
