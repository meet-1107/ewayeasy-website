'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { NAV } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="site-header sticky top-0 z-50 border-b border-brand-900/10 bg-cream/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="E-Way Easy home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-3 py-2 text-sm font-medium transition hover:bg-brand-50 hover:text-brand-700 ${
                active(n.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-soft'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/download" className="btn-amber whitespace-nowrap px-3.5 py-2.5 sm:px-4">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Zm-8 15a1 1 0 0 1 1 1v1h14v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/></svg>
            <span>Download<span className="hidden sm:inline"> App</span></span>
          </Link>
          <button
            className="rounded-full p-2.5 text-ink hover:bg-brand-50 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              {open
                ? <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                : <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-brand-900/10 bg-cream lg:hidden">
          <ul className="container grid gap-1 py-3">
            {[{ label: 'Home', href: '/' }, ...NAV].map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={`block rounded-xl px-3 py-3 font-medium ${active(n.href) && n.href !== '/' ? 'bg-brand-50 text-brand-700' : 'text-ink'}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
