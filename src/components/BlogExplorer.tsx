'use client';
import Link from 'next/link';
import { useMemo, useState, type ReactNode } from 'react';
import BlogCard, { type PostSummary } from './BlogCard';
import { CATEGORIES } from '@/lib/site';

/**
 * Search box + category chips. With an empty query the server-rendered, paginated list
 * (`children`) is shown so every page stays crawlable; typing searches all articles.
 */
export default function BlogExplorer({
  all, activeCategory, children,
}: { all: (PostSummary & { tags: string[] })[]; activeCategory?: string; children: ReactNode }) {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return all.filter((p) => {
      const hay = `${p.title} ${p.excerpt} ${p.tags.join(' ')} ${p.category}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q, all]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Blog categories" className="flex flex-wrap gap-2">
          <Link href="/blog" className={`rounded-full px-4 py-2 text-sm font-semibold ${!activeCategory ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft hover:text-brand-700'}`}>All</Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${activeCategory === c.slug ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft hover:text-brand-700'}`}
            >
              {c.name}
            </Link>
          ))}
        </nav>
        <label className="relative block md:w-80">
          <span className="sr-only">Search articles</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-faint" aria-hidden>
            <path d="M11 4a7 7 0 1 0 4.2 12.6l3.6 3.6 1.4-1.4-3.6-3.6A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" fill="currentColor" />
          </svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles, e.g. validity" className="input rounded-full pl-11" />
        </label>
      </div>
      <div className="mt-10" aria-live="polite">
        {q.trim() ? (
          results.length ? (
            <>
              <p className="mb-6 text-sm text-ink-faint">{results.length} article{results.length === 1 ? '' : 's'} found for “{q}”</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
            </>
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-ink-soft">No articles match “{q}”. Try “validity”, “HSN” or “bulk”.</p>
          )
        ) : (
          children
        )}
      </div>
    </>
  );
}
