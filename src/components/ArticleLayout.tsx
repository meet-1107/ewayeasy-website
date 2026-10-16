import Link from 'next/link';
import type { ReactNode } from 'react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import DownloadCTA from './DownloadCTA';
import JsonLd from './JsonLd';
import { BlogCover } from './AppGraphics';
import type { Doc } from '@/lib/content';
import { formatDate } from '@/lib/content';
import { AUTHOR } from '@/lib/site';
import { faqLd } from '@/lib/seo';

export default function ArticleLayout({
  doc, crumbs, category, eyebrow, placement, updateHistory, after,
}: {
  doc: Doc;
  crumbs: Crumb[];
  category: string;
  eyebrow: ReactNode;
  placement: string;
  updateHistory?: { date: string; note: string }[];
  after?: ReactNode;
}) {
  return (
    <article>
      {doc.faq.length > 0 && <JsonLd data={faqLd(doc.faq)} />}
      <header className="bg-white">
        <div className="container grid items-center gap-10 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-6">{eyebrow}</div>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink md:text-[44px]">{doc.title}</h1>
            {doc.excerpt && <p className="mt-4 text-lg leading-8 text-ink-soft">{doc.excerpt}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-ink-soft">
              <Link href={`/authors/${AUTHOR.slug}`} className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-display font-bold text-white" aria-hidden>BA</span>
                <span>
                  <span className="block font-semibold text-ink hover:underline">{AUTHOR.name}</span>
                  <span className="text-xs text-ink-faint">{AUTHOR.role}</span>
                </span>
              </Link>
              <span>Published <time dateTime={doc.publishedAt}>{formatDate(doc.publishedAt)}</time></span>
              {doc.updatedAt && doc.updatedAt !== doc.publishedAt && (
                <span>Updated <time dateTime={doc.updatedAt}>{formatDate(doc.updatedAt)}</time></span>
              )}
              <span>{doc.readingMinutes} min read</span>
            </div>
            {doc.verifiedAt && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                Last verified against official sources: {formatDate(doc.verifiedAt)}
              </p>
            )}
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lift">
            {doc.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={doc.image} alt={doc.imageAlt ?? doc.title} width={1280} height={720} fetchPriority="high" className="aspect-video h-auto w-full object-cover" />
            ) : (
              <BlogCover category={category} title={doc.imageAlt ?? doc.title} className="h-full w-full" />
            )}
          </div>
        </div>
      </header>

      <div className="container grid gap-12 py-12 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0 max-w-3xl">
          {doc.toc.length > 2 && (
            <details className="mb-8 rounded-2xl border border-brand-900/10 bg-white p-4 lg:hidden">
              <summary className="cursor-pointer font-semibold">Table of contents</summary>
              <Toc doc={doc} />
            </details>
          )}
          <div className="prose-content" dangerouslySetInnerHTML={{ __html: doc.html }} />

          {doc.faq.length > 0 && (
            <section className="mt-14" aria-labelledby="faq">
              <h2 id="faq" className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <div className="mt-5 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
                {doc.faq.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                      {f.q}
                      <span className="text-brand-500 transition group-open:rotate-45" aria-hidden>+</span>
                    </summary>
                    <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {doc.sources.length > 0 && (
            <section className="mt-12 rounded-2xl border border-brand-900/10 bg-white p-6" aria-labelledby="sources">
              <h2 id="sources" className="font-display text-lg font-bold">Sources and references</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {doc.sources.map((s) => (
                  <li key={s.url + s.title}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline underline-offset-2">{s.title}</a>
                    <span className="ml-2 text-ink-faint">{s.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs leading-5 text-ink-faint">
                This article is general information, not tax or legal advice. GST and e-way bill requirements depend on the transaction,
                applicable notifications and state-specific provisions. Check the official portals before you rely on it.
              </p>
            </section>
          )}

          {updateHistory && updateHistory.length > 0 && (
            <section className="mt-8 rounded-2xl border border-brand-900/10 bg-white p-6" aria-labelledby="history">
              <h2 id="history" className="font-display text-lg font-bold">Editorial update history</h2>
              <ol className="mt-3 space-y-2 text-sm">
                {updateHistory.map((h) => (
                  <li key={h.date + h.note} className="flex gap-3">
                    <time dateTime={h.date} className="shrink-0 font-semibold text-ink">{formatDate(h.date)}</time>
                    <span className="text-ink-soft">{h.note}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <div className="mt-12 flex items-start gap-4 rounded-2xl bg-brand-50 p-6">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-lg font-bold text-white" aria-hidden>BA</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Written by</p>
              <Link href={`/authors/${AUTHOR.slug}`} className="font-display text-lg font-bold text-ink hover:underline">{AUTHOR.name}</Link>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{AUTHOR.bio}</p>
            </div>
          </div>

          <div className="mt-12"><DownloadCTA placement={placement} /></div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {doc.toc.length > 0 && (
              <nav aria-label="Table of contents" className="rounded-2xl border border-brand-900/10 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">On this page</p>
                <Toc doc={doc} />
              </nav>
            )}
            <div className="rounded-2xl bg-brand-900 p-5 text-white">
              <p className="font-display font-bold">E-Way Easy app</p>
              <p className="mt-1 text-sm text-brand-100/80">Sales invoice to e-way bill in one mobile flow.</p>
              <Link href="/download" className="btn-amber mt-4 w-full py-2.5">Download app</Link>
            </div>
          </div>
        </aside>
      </div>
      {after}
    </article>
  );
}

function Toc({ doc }: { doc: Doc }) {
  return (
    <ol className="mt-3 space-y-1.5 text-sm">
      {doc.toc.map((t) => (
        <li key={t.id} className={t.depth === 3 ? 'pl-3' : ''}>
          <a href={`#${t.id}`} className={`block leading-5 hover:text-brand-700 ${t.depth === 3 ? 'text-ink-faint' : 'text-ink-soft'}`}>{t.text}</a>
        </li>
      ))}
    </ol>
  );
}
