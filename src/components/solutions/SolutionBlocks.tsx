import Link from 'next/link';
import type { ReactNode } from 'react';
import { getTool, toolHref } from '@/lib/tools';

export type Faq = { q: string; a: string };

/** Section heading block used across the solutions pages. */
export function SectionIntro({
  id, eyebrow, title, children,
}: { id: string; eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="h2 mt-2">{title}</h2>
      {children && <div className="mt-4 space-y-3 text-ink-soft">{children}</div>}
    </div>
  );
}

/** Cards describing day-to-day problems. */
export function ProblemGrid({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2">
      {items.map((p) => (
        <article key={p.title} className="card p-6">
          <h3 className="font-display text-lg font-semibold leading-snug text-ink">{p.title}</h3>
          <p className="mt-2 text-sm leading-6 text-ink-soft">{p.text}</p>
        </article>
      ))}
    </div>
  );
}

/** Problem → app feature mapping rows. */
export function WorkflowMap({ rows }: { rows: { need: string; app: ReactNode }[] }) {
  return (
    <ol className="mt-8 space-y-4">
      {rows.map((r, i) => (
        <li key={r.need} className="card flex gap-4 p-5">
          <span
            aria-hidden
            className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-semibold text-ink">{r.need}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{r.app}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Cards linking to free tools, using names and descriptions from the tools directory. */
export function ToolCards({ items }: { items: { slug: string; why: string }[] }) {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ slug, why }) => {
        const t = getTool(slug);
        return (
          <article key={slug} className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
            <span className="chip w-fit">Free tool</span>
            <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-ink">{t.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{why}</p>
            <Link
              href={toolHref(slug)}
              className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              Open the {t.name}
              <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

/** Simple list of reading links (guides / blog posts). */
export function ReadingList({ items }: { items: { href: string; label: string; text: string }[] }) {
  return (
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      {items.map((r) => (
        <li key={r.href}>
          <Link
            href={r.href}
            className="card group block h-full p-5 transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <span className="font-semibold text-brand-700 group-hover:text-brand-800">{r.label} →</span>
            <span className="mt-1 block text-sm leading-6 text-ink-soft">{r.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** FAQ list rendered with native details/summary. Pair with faqLd JSON-LD on the page. */
export function FaqList({ id, faq }: { id: string; faq: Faq[] }) {
  return (
    <section className="section bg-white" aria-labelledby={id}>
      <div className="container max-w-3xl">
        <p className="eyebrow">FAQ</p>
        <h2 id={id} className="h2 mt-2">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {faq.map((f) => (
            <details key={f.q} className="card group p-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
                <h3 className="text-base">{f.q}</h3>
                <span aria-hidden className="text-brand-600 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export const linkClass = 'font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700';
