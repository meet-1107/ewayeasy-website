import Link from 'next/link';
import JsonLd from './JsonLd';
import { faqLd } from '@/lib/seo';
import { getAllPosts } from '@/lib/content';
import type { CategoryGuide as Guide } from '@/lib/category-guides';

/** Short answer shown above the post grid on a category hub. */
export function CategoryAnswer({ guide }: { guide: Guide }) {
  return (
    <div className="mb-10 rounded-2xl border-l-4 border-brand-600 bg-white p-6">
      <p className="leading-7 text-ink">{guide.answer}</p>
    </div>
  );
}

/** Reading path, decision rules, mistakes and FAQ below the post grid. */
export default function CategoryGuide({ guide, name }: { guide: Guide; name: string }) {
  const titles = new Map(getAllPosts().map((p) => [p.slug, p.title]));
  return (
    <div className="mt-16 grid gap-12">
      <JsonLd data={faqLd(guide.faq)} />
      <section aria-labelledby="start-here">
        <h2 id="start-here" className="h2">Start here: {name} in reading order</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-soft">
          New to the topic? Read these in order. Each one builds on the one before, so you get the rules first and the special cases after.
        </p>
        <ol className="mt-6 grid gap-3">
          {guide.startHere.map((s, i) => (
            <li key={s.slug} className="flex gap-4 rounded-2xl bg-white p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
              <span>
                <Link href={`/blog/${s.slug}`} className="font-display font-semibold text-brand-800 hover:underline">{titles.get(s.slug) ?? s.slug}</Link>
                <span className="mt-1 block text-sm leading-6 text-ink-soft">{s.why}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="quick-rules">
        <h2 id="quick-rules" className="h2">Quick rules</h2>
        <p className="mt-3 max-w-3xl leading-7 text-ink-soft">
          The decisions that come up most often, as plain if-then rules. They are a starting point: the linked articles explain the exceptions.
        </p>
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-brand-900/10">
                <th scope="col" className="p-4 font-semibold">If…</th>
                <th scope="col" className="p-4 font-semibold">Then…</th>
              </tr>
            </thead>
            <tbody>
              {guide.rules.map((r) => (
                <tr key={r.when} className="border-b border-brand-900/5 last:border-0 align-top">
                  <td className="p-4 text-ink">{r.when}</td>
                  <td className="p-4 text-ink-soft">{r.then}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="common-mistakes">
        <h2 id="common-mistakes" className="h2">Common mistakes</h2>
        <ul className="mt-6 grid gap-3">
          {guide.mistakes.map((m) => (
            <li key={m} className="rounded-2xl bg-white p-5 leading-7 text-ink-soft">{m}</li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-soft">
          Free tools for this topic:{' '}
          {guide.tools.map((t, i) => (
            <span key={t.href}>
              {i > 0 && ' · '}
              <Link href={t.href} className="font-medium text-brand-700 underline">{t.label}</Link>
            </span>
          ))}
        </p>
      </section>

      <section aria-labelledby="category-faq">
        <h2 id="category-faq" className="h2">Questions about {name} articles</h2>
        <div className="mt-6 grid gap-3">
          {guide.faq.map((f) => (
            <details key={f.q} className="rounded-2xl bg-white p-5">
              <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
              <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
