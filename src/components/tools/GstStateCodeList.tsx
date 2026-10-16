'use client';
import { useMemo, useState } from 'react';
import { GST_STATES } from './invoice/states';
import { CopyButton, TextField } from './ui';

// Union territories by GST state code (all other codes in GST_STATES are states, except 97).
const UT_CODES = new Set(['01', '04', '07', '26', '31', '34', '35', '38']);

function kind(code: string): string {
  if (code === '97') return 'Other Territory';
  return UT_CODES.has(code) ? 'Union territory' : 'State';
}

export default function GstStateCodeList() {
  const [query, setQuery] = useState('');
  const [decode, setDecode] = useState('');
  const [from, setFrom] = useState('24');
  const [to, setTo] = useState('27');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GST_STATES;
    const digits = q.replace(/\D/g, '');
    return GST_STATES.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      kind(s.code).toLowerCase().includes(q) ||
      (digits && /^\d+$/.test(q) && (s.code === digits.slice(0, 2).padStart(2, '0') || s.code.startsWith(digits))),
    );
  }, [query]);

  const decoded = useMemo(() => {
    const d = decode.replace(/\s+/g, '');
    if (!d) return null;
    const code = d.slice(0, 2);
    if (!/^\d{2}$/.test(code)) return { error: 'The first two characters of a GSTIN must be digits.' };
    const s = GST_STATES.find((x) => x.code === code);
    if (!s) return { error: `“${code}” is not in the GST state code list.` };
    return { state: s };
  }, [decode]);

  const supply = from === to ? 'intra' : 'inter';
  const fromName = GST_STATES.find((s) => s.code === from)?.name ?? '';
  const toName = GST_STATES.find((s) => s.code === to)?.name ?? '';
  const copyText = ['Code,State / UT,Type', ...GST_STATES.map((s) => `${s.code},${s.name},${kind(s.code)}`)].join('\n');

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-3 p-5 md:p-7">
          <h2 className="font-display text-lg font-bold text-ink">Decode a GSTIN’s state</h2>
          <TextField
            id="state-decode"
            label="GSTIN or its first two digits"
            value={decode}
            onChange={(e) => setDecode(e.target.value)}
            placeholder="e.g. 24 or 24ABCDE1234F1Z5"
            autoComplete="off"
            spellCheck={false}
            maxLength={20}
          />
          <div aria-live="polite" aria-atomic="true" className="min-h-[2.5rem]">
            {decoded && 'state' in decoded && decoded.state && (
              <p className="rounded-xl bg-brand-50 px-3.5 py-3 text-ink">
                <span className="font-display text-xl font-bold text-brand-700">{decoded.state.code}</span>{' '}
                = <strong>{decoded.state.name}</strong> <span className="text-sm text-ink-soft">({kind(decoded.state.code)})</span>
              </p>
            )}
            {decoded && 'error' in decoded && <p className="text-sm font-medium text-red-600">{decoded.error}</p>}
          </div>
        </div>

        <div className="card space-y-3 p-5 md:p-7">
          <h2 className="font-display text-lg font-bold text-ink">Intra-state or inter-state?</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="pos-from" className="label">Supplier’s state</label>
              <select id="pos-from" className="input" value={from} onChange={(e) => setFrom(e.target.value)}>
                {GST_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="pos-to" className="label">Place of supply</label>
              <select id="pos-to" className="input" value={to} onChange={(e) => setTo(e.target.value)}>
                {GST_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
              </select>
            </div>
          </div>
          <p aria-live="polite" className="rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
            {supply === 'intra' ? (
              <><strong className="text-ink">Intra-state supply</strong> within {fromName}: charge CGST + SGST (or UTGST in a union territory without a legislature).</>
            ) : (
              <><strong className="text-ink">Inter-state supply</strong> from {fromName} to {toName}: charge IGST.</>
            )}
            {' '}This is the general rule; special cases such as supplies to SEZ units or exports are treated as inter-state.
          </p>
        </div>
      </div>

      <div className="card p-4 md:p-5">
        <label htmlFor="state-search" className="label">Search the list by name or code</label>
        <input
          id="state-search"
          type="search"
          className="input"
          placeholder="e.g. Gujarat, 27 or union territory"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-soft" role="status" aria-live="polite">
          {rows.length === GST_STATES.length ? `Showing all ${rows.length} codes` : `${rows.length} match${rows.length === 1 ? '' : 'es'}`}
        </p>
        <div className="flex gap-2">
          <CopyButton text={copyText} label="Copy full list" />
          {query && <button type="button" className="btn-ghost" onClick={() => setQuery('')}>Clear search</button>}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="card p-5 text-sm text-ink-soft">No state or code matches “{query}”.</div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-brand-900/10 bg-white">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">GST state codes</caption>
            <thead className="bg-brand-50 text-sm text-ink">
              <tr>
                <th scope="col" className="w-20 px-4 py-3">Code</th>
                <th scope="col" className="px-4 py-3">State / UT</th>
                <th scope="col" className="px-4 py-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.code} className="border-t border-brand-900/10">
                  <td className="px-4 py-3 font-display text-lg font-bold tabular-nums text-brand-700">{s.code}</td>
                  <td className="px-4 py-3 text-ink">{s.name}</td>
                  <td className="px-4 py-3 text-sm text-ink-soft">{kind(s.code)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
