'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import type { HelpArticle } from './articles';

function matches(article: HelpArticle, terms: string[]) {
  const haystack = [article.q, article.category, article.keywords ?? '', ...article.a].join(' ').toLowerCase();
  return terms.every((t) => haystack.includes(t));
}

export default function HelpSearch({ articles }: { articles: HelpArticle[] }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);
  const inputId = useId();
  const statusId = useId();

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return terms.length ? articles.filter((a) => matches(a, terms)) : articles;
  }, [articles, query]);

  const categories = Array.from(new Set(results.map((r) => r.category)));

  return (
    <div>
      <label htmlFor={inputId} className="label">
        Search help articles
      </label>
      <input
        id={inputId}
        type="search"
        className="input"
        placeholder="For example: GSTIN, distance, credits, cancel"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-describedby={statusId}
        autoComplete="off"
      />
      <p id={statusId} className="mt-2 text-sm text-ink-faint" role="status" aria-live="polite">
        {query
          ? `${results.length} article${results.length === 1 ? '' : 's'} found`
          : `${articles.length} articles`}
      </p>

      {results.length === 0 && (
        <p className="mt-6 rounded-2xl border border-brand-900/10 bg-white p-5 text-ink-soft">
          No articles match &ldquo;{query}&rdquo;. Try a shorter word, or see &ldquo;Still stuck?&rdquo; below to
          contact us.
        </p>
      )}

      <div className="mt-6 space-y-8">
        {categories.map((cat) => (
          <div key={cat}>
            <h3 className="font-display text-lg font-semibold text-ink">{cat}</h3>
            <ul className="mt-3 space-y-3">
              {results
                .filter((r) => r.category === cat)
                .map((r) => {
                  const isOpen = open === r.id;
                  const panelId = `help-panel-${r.id}`;
                  const buttonId = `help-button-${r.id}`;
                  return (
                    <li key={r.id} id={r.id} className="scroll-mt-24 rounded-2xl border border-brand-900/10 bg-white">
                      <h4>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : r.id)}
                          className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-ink hover:text-brand-700"
                        >
                          <span>{r.q}</span>
                          <span
                            aria-hidden
                            className={`shrink-0 text-xl leading-none text-brand-600 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                          >
                            +
                          </span>
                        </button>
                      </h4>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!isOpen}
                        className="space-y-3 px-5 pb-5 text-[15px] leading-7 text-ink-soft"
                      >
                        {r.a.map((p) => (
                          <p key={p}>{p}</p>
                        ))}
                        {r.links && r.links.length > 0 && (
                          <ul className="space-y-1">
                            {r.links.map((l) => (
                              <li key={l.href}>
                                <Link href={l.href} className="font-medium text-brand-700 underline underline-offset-2">
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
