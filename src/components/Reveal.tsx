'use client';
import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Fades and lifts its content in when it scrolls into view. Content is visible in the server HTML
 * (good for SEO and no-JS); the hidden state is only applied after mount, and only to elements that
 * start below the fold. Fail-safe: a scroll check backs up IntersectionObserver, and everything is
 * revealed after a short timeout so content can never stay hidden. Skipped for reduced motion.
 */
export default function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.style.opacity = '1';
      el.style.transform = 'none';
      cleanup();
    };
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) show();
    };
    const io = 'IntersectionObserver' in window
      ? new IntersectionObserver(([e]) => e.isIntersecting && show(), { rootMargin: '0px 0px -8% 0px' })
      : null;
    io?.observe(el);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Safety net: never leave content hidden (e.g. if observers are throttled).
    const timer = window.setTimeout(show, 1500);
    function cleanup() {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    }
    return cleanup;
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
