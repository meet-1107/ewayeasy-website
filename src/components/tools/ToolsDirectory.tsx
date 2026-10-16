'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import ToolIcon from './ToolIcon';
import { TOOLS, TOOL_CATEGORIES, filterTools, toolHref, type ToolCategory } from '@/lib/tools';

export default function ToolsDirectory() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory | 'all'>('all');
  const results = useMemo(() => filterTools(TOOLS, query, category), [query, category]);
  const catName = (c: ToolCategory) => TOOL_CATEGORIES.find((x) => x.slug === c)?.name ?? c;

  return (
    <div>
      <div className="card p-4 md:p-5">
        <label htmlFor="tool-search" className="label">Search tools</label>
        <input
          id="tool-search"
          type="search"
          className="input"
          placeholder="Try “validity”, “invoice” or “inclusive”"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {[{ slug: 'all' as const, name: 'All tools' }, ...TOOL_CATEGORIES].map((c) => {
            const active = category === c.slug;
            return (
              <button
                key={c.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(c.slug)}
                className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                  active ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" role="status" aria-live="polite">
        {results.length === 0 ? 'No tools match your search.' : `${results.length} tool${results.length === 1 ? '' : 's'}`}
      </p>

      <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((t) => (
          <li key={t.slug}>
            <Link href={toolHref(t.slug)} className="card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-brand-500">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 group-hover:bg-brand-700 group-hover:text-white">
                <ToolIcon icon={t.icon} />
              </span>
              <span className="mt-4 chip w-fit">{catName(t.category)}</span>
              <span className="mt-2 font-display text-lg font-bold text-ink">{t.name}</span>
              <span className="mt-1 flex-1 text-sm leading-6 text-ink-soft">{t.description}</span>
              <span className="mt-4 text-sm font-semibold text-brand-700">Open tool →</span>
            </Link>
          </li>
        ))}
      </ul>

      {results.length === 0 && (
        <button type="button" className="btn-ghost mt-4" onClick={() => { setQuery(''); setCategory('all'); }}>
          Clear search
        </button>
      )}
    </div>
  );
}
