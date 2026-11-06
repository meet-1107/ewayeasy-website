'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { INDUSTRY_NAV, NAV } from '@/lib/site';
import PlayLink from './PlayLink';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const close = () => { if (menuRef.current) menuRef.current.open = false; };
  useEffect(close, [pathname]);
  const active = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="site-header sticky top-0 z-50 border-b border-brand-900/10 bg-cream/90 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="E-Way Easy home"><Logo /></Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const cls = `rounded-full px-3 py-2 text-sm font-medium transition hover:bg-brand-50 hover:text-brand-700 ${
              active(n.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-soft'
            }`;
            if (n.href !== '/industries') return <Link key={n.href} href={n.href} className={cls}>{n.label}</Link>;
            // Industries: hover or keyboard focus opens the dropdown; the label itself goes to the hub.
            return (
              <div key={n.href} className="group/ind relative">
                <Link href={n.href} className={`${cls} inline-flex items-center gap-1`} aria-haspopup="true">
                  {n.label}
                  <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 transition group-hover/ind:rotate-180" aria-hidden><path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" /></svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2 opacity-0 transition group-focus-within/ind:visible group-focus-within/ind:opacity-100 group-hover/ind:visible group-hover/ind:opacity-100">
                  <ul className="rounded-2xl border border-brand-900/10 bg-white p-2 shadow-lift">
                    {INDUSTRY_NAV.map((x) => (
                      <li key={x.href}>
                        <Link href={x.href} className={`block rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-brand-50 hover:text-brand-700 ${pathname === x.href ? 'bg-brand-50 text-brand-700' : 'text-ink'}`}>
                          {x.label}
                        </Link>
                      </li>
                    ))}
                    <li className="mt-1 border-t border-brand-900/10 pt-1">
                      <Link href="/industries" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">All industries →</Link>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <PlayLink placement="header" className="btn-amber whitespace-nowrap px-3.5 py-2.5 sm:px-4">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="currentColor" d="M12 3a1 1 0 0 1 1 1v9.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.4l3.3 3.3V4a1 1 0 0 1 1-1Zm-8 15a1 1 0 0 1 1 1v1h14v-1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Z"/></svg>
            <span>Download<span className="hidden sm:inline"> App</span></span>
          </PlayLink>
          {/* Native <details> so the menu opens even before the page JavaScript has loaded (slow mobile data). */}
          <details ref={menuRef} className="group lg:hidden" onToggle={(e) => setOpen(e.currentTarget.open)}>
            <summary
              className="list-none cursor-pointer rounded-full p-2.5 text-ink hover:bg-brand-50 [&::-webkit-details-marker]:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                <path className="group-open:hidden" d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path className="hidden group-open:block" d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <nav id="mobile-nav" aria-label="Mobile" className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-y border-brand-900/10 bg-cream shadow-card">
              <ul className="container grid gap-1 py-3">
                {[{ label: 'Home', href: '/' }, ...NAV].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} onClick={close} className={`block rounded-xl px-3 py-3 font-medium ${active(n.href) && n.href !== '/' ? 'bg-brand-50 text-brand-700' : 'text-ink'}`}>
                      {n.label}
                    </Link>
                    {n.href === '/industries' && (
                      <ul className="mb-1 ml-3 grid grid-cols-2 gap-1 border-l-2 border-amber-400 pl-3">
                        {INDUSTRY_NAV.map((x) => (
                          <li key={x.href}>
                            <Link href={x.href} onClick={close} className={`block rounded-lg px-2 py-2 text-sm ${pathname === x.href ? 'bg-brand-50 font-semibold text-brand-700' : 'text-ink-soft'}`}>
                              {x.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
