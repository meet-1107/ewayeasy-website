'use client';
import { useEffect, useMemo, useState } from 'react';
import { parseDelimited, toCsv } from '@/lib/csv';
import {
  MAX_INVOICE_NO_LENGTH, MAX_SERIES_COUNT, checkSeries, financialYearStart, fyToken, generateSeries,
  type FyStyle, type Separator,
} from '@/lib/invoiceSeries';
import { CopyButton, Segmented, TextField } from './ui';

type Mode = 'generate' | 'check';

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const initial = { prefix: 'INV', fy: 'short' as FyStyle, separator: '/' as Separator, start: '1', padding: '4', count: '20' };

function wholeNumber(s: string): number | null {
  const t = s.trim();
  return /^\d+$/.test(t) ? Number(t) : null;
}

export default function InvoiceNumberGenerator() {
  const [mode, setMode] = useState<Mode>('generate');
  const [prefix, setPrefix] = useState(initial.prefix);
  const [fy, setFy] = useState<FyStyle>(initial.fy);
  const [date, setDate] = useState('');
  const [separator, setSeparator] = useState<Separator>(initial.separator);
  const [start, setStart] = useState(initial.start);
  const [padding, setPadding] = useState(initial.padding);
  const [count, setCount] = useState(initial.count);
  const [list, setList] = useState('');

  // Set today's date after mount so the static HTML does not depend on the build date.
  useEffect(() => { setDate(todayIso()); }, []);

  const fyStartYear = useMemo(() => {
    try { return date ? financialYearStart(date) : null; } catch { return null; }
  }, [date]);

  const gen = useMemo(() => {
    const fieldErrors: { prefix?: string; start?: string; padding?: string; count?: string; date?: string } = {};
    if (prefix.trim() && !/^[A-Za-z0-9/-]+$/.test(prefix.trim())) fieldErrors.prefix = 'Use only letters, digits, “-” and “/”.';
    const s = wholeNumber(start);
    if (s === null) fieldErrors.start = 'Enter a whole number, e.g. 1.';
    const p = wholeNumber(padding);
    if (p === null || p > 10) fieldErrors.padding = 'Enter 0 to 10.';
    const c = wholeNumber(count);
    if (c === null || c < 1 || c > MAX_SERIES_COUNT) fieldErrors.count = `Enter 1 to ${MAX_SERIES_COUNT}.`;
    if (fy !== 'none' && fyStartYear === null) fieldErrors.date = 'Pick a date to work out the financial year.';
    if (Object.keys(fieldErrors).length) return { fieldErrors, numbers: [] as string[], errors: [] as string[] };
    const r = generateSeries({ prefix, fy, fyStartYear: fyStartYear ?? 0, separator, start: s!, padding: p!, count: c! });
    return { fieldErrors, ...r };
  }, [prefix, fy, fyStartYear, separator, start, padding, count]);

  const checked = useMemo(() => {
    if (!list.trim()) return null;
    // One per line; for a table pasted from Excel (tab-separated), use the first column.
    const values = list.includes('\t') ? parseDelimited(list).map((r) => r[0] ?? '') : list.split(/\r?\n/);
    return checkSeries(values);
  }, [list]);

  function resetGen() {
    setPrefix(initial.prefix); setFy(initial.fy); setSeparator(initial.separator);
    setStart(initial.start); setPadding(initial.padding); setCount(initial.count); setDate(todayIso());
  }

  const genText = gen.numbers.join('\n');
  const checkCsv = checked
    ? toCsv(['Line', 'Invoice number', 'Characters', 'Issues'], checked.rows.map((r) => [r.line, r.value, r.value.length, r.issues.join(' ') || 'OK']))
    : '';

  return (
    <div className="space-y-5">
      <Segmented
        name="series-mode"
        legend="What do you want to do?"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'generate', label: 'Generate a series' },
          { value: 'check', label: 'Check an existing list' },
        ]}
      />

      {mode === 'generate' ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
          <form className="card space-y-5 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
            <TextField id="series-prefix" label="Prefix (optional)" value={prefix} onChange={(e) => setPrefix(e.target.value)}
              error={gen.fieldErrors.prefix} placeholder="e.g. INV, MRB or SL" autoComplete="off" spellCheck={false} maxLength={16} />
            <Segmented name="series-fy" legend="Financial year in the number" value={fy} onChange={setFy}
              options={[
                { value: 'short', label: fyStartYear !== null ? fyToken(fyStartYear, 'short') : '26-27' },
                { value: 'long', label: fyStartYear !== null ? fyToken(fyStartYear, 'long') : '2026-27' },
                { value: 'none', label: 'None' },
              ]} />
            {fy !== 'none' && (
              <TextField id="series-date" type="date" label="Any date in the financial year" value={date}
                onChange={(e) => setDate(e.target.value)} error={gen.fieldErrors.date}
                hint="The Indian financial year runs from 1 April to 31 March." />
            )}
            <Segmented name="series-sep" legend="Separator" value={separator} onChange={setSeparator}
              options={[
                { value: '/', label: 'Slash  /' },
                { value: '-', label: 'Hyphen  -' },
                { value: '', label: 'None' },
              ]} />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField id="series-start" label="Start number" inputMode="numeric" value={start} onChange={(e) => setStart(e.target.value)} error={gen.fieldErrors.start} />
              <TextField id="series-padding" label="Digits (zero padding)" inputMode="numeric" value={padding} onChange={(e) => setPadding(e.target.value)} error={gen.fieldErrors.padding} hint="4 → 0001" />
              <TextField id="series-count" label="How many" inputMode="numeric" value={count} onChange={(e) => setCount(e.target.value)} error={gen.fieldErrors.count} hint={`Max ${MAX_SERIES_COUNT}`} />
            </div>
          </form>

          <section className="card p-5 md:p-7" aria-labelledby="series-result-heading">
            <h2 id="series-result-heading" className="font-display text-xl font-bold text-ink">Your series</h2>
            <div aria-live="polite" aria-atomic="true">
              {gen.errors.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm font-medium text-red-600">{gen.errors.map((e) => <li key={e}>{e}</li>)}</ul>
              )}
              {gen.numbers.length > 0 ? (
                <>
                  <p className="mt-2 text-sm text-ink-soft">
                    {gen.numbers.length} numbers, {gen.numbers[0]} to {gen.numbers[gen.numbers.length - 1]}. Longest is{' '}
                    {Math.max(...gen.numbers.map((n) => n.length))} of {MAX_INVOICE_NO_LENGTH} characters allowed.
                  </p>
                  <ol className="mt-3 max-h-80 overflow-y-auto rounded-xl bg-cream px-3.5 py-3 font-mono text-sm leading-7 text-ink">
                    {gen.numbers.map((n) => <li key={n}>{n}</li>)}
                  </ol>
                </>
              ) : (
                !gen.errors.length && <p className="mt-3 text-sm text-ink-soft">Fix the highlighted fields to see the series.</p>
              )}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <CopyButton text={genText} label="Copy list" className="btn-primary" />
              <button type="button" className="btn-ghost" disabled={!gen.numbers.length}
                onClick={() => downloadCsv('invoice-number-series.csv', toCsv(['Invoice number'], gen.numbers.map((n) => [n])))}>
                Download CSV
              </button>
              <button type="button" className="btn-ghost" onClick={resetGen}>Reset</button>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="card space-y-3 p-5 md:p-7">
            <label htmlFor="series-list" className="label">Paste invoice numbers</label>
            <textarea id="series-list" className="input min-h-[180px] font-mono text-sm" value={list}
              onChange={(e) => setList(e.target.value)} spellCheck={false} aria-describedby="series-list-hint"
              placeholder={'One per line, in the order they were issued\nINV/26-27/0001\nINV/26-27/0002\nINV/26-27/0004'} />
            <p id="series-list-hint" className="text-xs text-ink-faint">
              Paste one financial year at a time. If you paste a table from Excel, the first column is used. Duplicates are compared ignoring upper/lower case.
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" disabled={!checked} onClick={() => downloadCsv('invoice-number-check.csv', checkCsv)}>Download CSV</button>
              <CopyButton text={checkCsv} label="Copy as CSV" />
              <button type="button" className="btn-ghost" onClick={() => setList('')}>Reset</button>
            </div>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {!checked ? (
              <p className="text-sm text-ink-soft">Paste a list above to check it.</p>
            ) : (
              <div className="space-y-4">
                <dl className="grid gap-3 sm:grid-cols-4">
                  {[
                    ['Numbers checked', checked.rows.length],
                    ['Duplicates', checked.duplicates.length],
                    ['Gaps', checked.gaps.length],
                    ['Out of order', checked.outOfOrder.length],
                  ].map(([k, v]) => (
                    <div key={k} className="card p-4">
                      <dt className="text-xs text-ink-soft">{k}</dt>
                      <dd className={`font-display text-2xl font-bold tabular-nums ${k !== 'Numbers checked' && Number(v) > 0 ? 'text-red-600' : 'text-ink'}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
                {checked.tooMany && <p className="text-sm text-red-600">Only the first 5,000 numbers were checked.</p>}
                {checked.invalidCount === 0 && checked.gaps.length === 0 ? (
                  <p className="rounded-xl bg-green-50 px-3.5 py-3 text-sm font-medium text-green-800">
                    No problems found: all numbers are unique, within 16 characters, use allowed characters and run without gaps.
                  </p>
                ) : null}
                {checked.gaps.length > 0 && (
                  <div className="card p-4 text-sm">
                    <h3 className="font-semibold text-ink">Missing numbers</h3>
                    <ul className="mt-2 space-y-1 text-ink-soft">
                      {checked.gaps.slice(0, 50).map((g) => (
                        <li key={`${g.series}${g.from}`}>
                          <span className="font-mono">{g.series || '(no prefix)'}</span>:{' '}
                          {g.from === g.to ? g.from : `${g.from} to ${g.to} (${g.to - g.from + 1} numbers)`}
                        </li>
                      ))}
                      {checked.gaps.length > 50 && <li>…and {checked.gaps.length - 50} more gaps (see CSV).</li>}
                    </ul>
                    <p className="mt-2 text-xs text-ink-faint">A gap is not always an error (for example a cancelled invoice), but keep a record of why each number was skipped.</p>
                  </div>
                )}
                {checked.invalidCount > 0 && (
                  <div className="overflow-x-auto rounded-2xl border border-brand-900/10 bg-white">
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <caption className="sr-only">Invoice numbers with issues</caption>
                      <thead className="bg-brand-50 text-ink">
                        <tr>
                          <th scope="col" className="px-3 py-2.5">Line</th>
                          <th scope="col" className="px-3 py-2.5">Invoice number</th>
                          <th scope="col" className="px-3 py-2.5">Issue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {checked.rows.filter((r) => r.issues.length).slice(0, 500).map((r) => (
                          <tr key={r.line} className="border-t border-brand-900/10 align-top">
                            <td className="px-3 py-2 tabular-nums text-ink-faint">{r.line}</td>
                            <td className="px-3 py-2 font-mono">{r.value}</td>
                            <td className="px-3 py-2 text-red-700">{r.issues.join(' ')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
