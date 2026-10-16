'use client';
import { useMemo, useState } from 'react';
import { CBIC_GST_URL, HSN_CHAPTERS, searchHsnChapters, sectionTitle } from '@/lib/hsn';

export default function HsnLookup() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchHsnChapters(query), [query]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm leading-6 text-ink">
        <strong>Chapter-level reference only.</strong> This list shows the 2-digit HSN chapters, not full codes or GST
        rates. Confirm the full 4, 6 or 8-digit HSN code and the applicable rate on{' '}
        <a href={CBIC_GST_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">CBIC GST</a>.
      </div>

      <div className="card p-4 md:p-5">
        <label htmlFor="hsn-search" className="label">Search by chapter number or keyword</label>
        <input
          id="hsn-search"
          type="search"
          className="input"
          placeholder="e.g. 69, 7308 or tiles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          aria-describedby="hsn-hint"
        />
        <p id="hsn-hint" className="mt-1 text-xs text-ink-faint">
          Typing a longer code (like 69072100) shows its chapter (69). Keyword search covers chapter titles and common product words.
        </p>
      </div>

      <p className="text-sm text-ink-soft" role="status" aria-live="polite">
        {results.length === HSN_CHAPTERS.length ? `Showing all ${results.length} chapters` : `${results.length} chapter${results.length === 1 ? '' : 's'} found`}
      </p>

      {results.length === 0 ? (
        <div className="card p-5 text-sm text-ink-soft">
          No chapter matches “{query}”. Try a broader word (for example “steel” instead of “TMT bar”), or search the
          tariff on CBIC.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-900/10 bg-white">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">HSN chapters</caption>
            <thead className="bg-brand-50 text-sm text-ink">
              <tr>
                <th scope="col" className="w-20 px-4 py-3">Chapter</th>
                <th scope="col" className="px-4 py-3">Description</th>
                <th scope="col" className="hidden px-4 py-3 md:table-cell">Section</th>
              </tr>
            </thead>
            <tbody>
              {results.map((c) => (
                <tr key={c.code} className="border-t border-brand-900/10 align-top">
                  <td className="px-4 py-3 font-display text-lg font-bold tabular-nums text-brand-700">{c.code}</td>
                  <td className="px-4 py-3 text-ink">
                    {c.title}
                    <span className="mt-1 block text-xs text-ink-faint md:hidden">Section {c.section}: {sectionTitle(c.section)}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-ink-soft md:table-cell">
                    <span className="font-semibold">{c.section}</span> — {sectionTitle(c.section)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
