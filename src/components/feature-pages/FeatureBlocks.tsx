import Link from 'next/link';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { linkClass } from '@/components/solutions/SolutionBlocks';

/**
 * SoftwareApplication JSON-LD for feature pages. Deliberately has no rating or offer data:
 * neither is verified, and pricing is credit-based rather than a fixed app price.
 */
export function softwareAppLd(path: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    operatingSystem: 'ANDROID',
    applicationCategory: 'BusinessApplication',
    url: absoluteUrl(path),
    description,
    image: absoluteUrl('/images/app-dashboard.jpg'),
  };
}

/** Numbered step list used for short in-app flows. */
export function StepList({ steps }: { steps: { title: string; text: ReactNode }[] }) {
  return (
    <ol className="mt-8 grid gap-4 sm:grid-cols-2">
      {steps.map((s, i) => (
        <li key={s.title} className="card flex gap-4 p-5">
          <span
            aria-hidden
            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-semibold text-ink">{s.title}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Two-column check list: label in bold, explanation below. */
export function CheckList({ items }: { items: { label: string; text: ReactNode }[] }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((c) => (
        <li key={c.label} className="flex gap-3 rounded-2xl border border-brand-900/10 bg-white p-4">
          <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5">
              <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <h3 className="font-semibold text-ink">{c.label}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{c.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Card for one e-way bill management action, with credit cost and a link to the rules guide. */
export function ActionCard({
  title, text, credits, guide, icon,
}: {
  title: string;
  text: ReactNode;
  credits: number | null;
  guide?: { href: string; label: string };
  icon: ReactNode;
}) {
  return (
    <article className="card flex h-full flex-col p-6">
      <span aria-hidden className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-500/20">
        <svg viewBox="0 0 24 24" className="h-6 w-6">{icon}</svg>
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{text}</p>
      <p className="mt-3 w-fit rounded-full bg-amber-300/25 px-3 py-1 text-xs font-semibold text-amber-600 ring-1 ring-inset ring-amber-500/30">
        {credits !== null ? `${credits} credits, charged only on success` : 'No credits needed'}
      </p>
      {guide && (
        <Link href={guide.href} className={`mt-auto pt-4 text-sm ${linkClass}`}>
          {guide.label}
        </Link>
      )}
    </article>
  );
}

export const ICON_STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;
