'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LogoMark } from './Logo';

/** Mobile-only download bar shown after scrolling; hidden on tool pages so it never covers forms. */
export default function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (dismissed || !visible || pathname.startsWith('/tools/') || pathname === '/download') return null;
  return (
    <div className="sticky-cta no-print fixed inset-x-0 bottom-0 z-40 border-t border-brand-900/10 bg-white/95 px-4 py-3 shadow-lift backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <LogoMark className="h-10 w-10 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">E-Way Easy for Android</p>
          <p className="truncate text-xs text-ink-faint">Invoice to e-way bill, from your phone</p>
        </div>
        <Link href="/download" className="btn-amber px-4 py-2">Get app</Link>
        <button aria-label="Dismiss" className="p-1 text-ink-faint" onClick={() => setDismissed(true)}>✕</button>
      </div>
    </div>
  );
}
