'use client';
import { useMemo, useState } from 'react';
import { checkGstin, gstinCheckChar, type GstinCheck } from '@/lib/gstin';
import { headerKey, parseDelimited, toCsv } from '@/lib/csv';
import { CopyButton, Segmented, TextField } from './ui';

type Mode = 'single' | 'bulk';
const MAX_BULK = 500;
// Made-up sample built from a dummy PAN, with a correctly calculated check character.
const SAMPLE = '24ABCDE1234F1Z' + gstinCheckChar('24ABCDE1234F1Z');
const SAMPLE_2 = '27ABCDE1234F2Z' + gstinCheckChar('27ABCDE1234F2Z');

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

interface Part {
  label: string;
  chars: string;
  position: string;
  meaning: string;
  ok: boolean;
}

function partsOf(r: GstinCheck): Part[] | null {
  const g = r.gstin;
  if (g.length !== 15 || !/^[0-9A-Z]+$/.test(g)) return null;
  return [
    { label: 'State code', chars: g.slice(0, 2), position: '1–2', meaning: r.stateName ? r.stateName : 'Not a GST state code', ok: !!r.stateName },
    {
      label: 'PAN', chars: g.slice(2, 12), position: '3–12',
      meaning: r.panHolderType ? `PAN of the holder. 4th letter "${g[5]}": ${r.panHolderType}` : 'Not in PAN format (5 letters, 4 digits, 1 letter)',
      ok: !!r.panHolderType,
    },
    {
      label: 'Entity number', chars: g[12], position: '13',
      meaning: /[1-9A-Z]/.test(g[12]) ? 'Registration number under this PAN in this state (1 = first)' : 'Must be 1–9 or A–Z',
      ok: /[1-9A-Z]/.test(g[12]),
    },
    { label: 'Default', chars: g[13], position: '14', meaning: g[13] === 'Z' ? '"Z" by default' : 'Normally "Z"', ok: g[13] === 'Z' },
    {
      label: 'Check character', chars: g[14], position: '15',
      meaning: r.expectedCheck ? (r.expectedCheck === g[14] ? 'Matches the calculated check character' : `Calculated value is "${r.expectedCheck}"`) : 'Cannot be calculated until the other parts are valid',
      ok: !!r.expectedCheck && r.expectedCheck === g[14],
    },
  ];
}

/** Extracts GSTIN candidates from pasted lines or a CSV/Excel column. */
function extractGstins(text: string): string[] {
  const grid = parseDelimited(text);
  if (!grid.length) return [];
  const width = Math.max(...grid.map((r) => r.length));
  if (width <= 1) {
    const cells = grid.map((r) => r[0] ?? '').filter(Boolean);
    return cells.length && /gst/i.test(cells[0]) && cells[0].replace(/\s+/g, '').length !== 15 ? cells.slice(1) : cells;
  }
  // Prefer a column whose header mentions GSTIN; otherwise the column with most 15-character values.
  let col = grid[0].findIndex((h) => headerKey(h).includes('gstin') || headerKey(h).includes('gstno'));
  let rows = grid;
  if (col >= 0) rows = grid.slice(1);
  else {
    let best = -1;
    for (let c = 0; c < width; c++) {
      const score = grid.filter((r) => (r[c] ?? '').replace(/\s+/g, '').length === 15).length;
      if (score > best) { best = score; col = c; }
    }
  }
  return rows.map((r) => r[col] ?? '').filter(Boolean);
}

export default function GstinValidator() {
  const [mode, setMode] = useState<Mode>('single');
  const [single, setSingle] = useState('');
  const [bulk, setBulk] = useState('');

  const result = useMemo(() => (single.trim() ? checkGstin(single) : null), [single]);
  const parts = result ? partsOf(result) : null;

  const bulkRes = useMemo(() => {
    const all = extractGstins(bulk);
    const list = all.slice(0, MAX_BULK);
    const first = new Map<string, number>();
    const rows = list.map((v, i) => {
      const r = checkGstin(v);
      const dupOf = first.get(r.gstin);
      if (dupOf === undefined) first.set(r.gstin, i + 1);
      return { n: i + 1, r, dupOf };
    });
    return { rows, truncated: all.length > MAX_BULK, total: all.length };
  }, [bulk]);
  const validCount = bulkRes.rows.filter((x) => x.r.valid).length;

  const singleCopy = result
    ? [
        `GSTIN: ${result.gstin}`,
        `Format and check digit: ${result.valid ? 'Valid' : 'Invalid'}`,
        result.stateName ? `State: ${result.stateName} (${result.stateCode})` : '',
        result.pan ? `PAN: ${result.pan}${result.panHolderType ? ` (${result.panHolderType})` : ''}` : '',
        ...result.errors.map((e) => `Error: ${e}`),
        'Format check only; confirm live status with Search Taxpayer on gst.gov.in.',
      ].filter(Boolean).join('\n')
    : '';

  function bulkCsv() {
    return toCsv(
      ['#', 'GSTIN', 'Status', 'State code', 'State', 'PAN', 'PAN holder type', 'Errors'],
      bulkRes.rows.map(({ n, r, dupOf }) => [
        n, r.gstin, r.valid ? 'Valid format' : 'Invalid', r.stateCode ?? '', r.stateName ?? '', r.pan ?? '', r.panHolderType ?? '',
        [...r.errors, dupOf ? `Duplicate of row ${dupOf}` : ''].filter(Boolean).join(' '),
      ]),
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm leading-6 text-ink">
        <strong>Format and check digit only.</strong> This tool does not confirm that a GSTIN is active, registered
        or belongs to the business you are dealing with. For live status, legal name and registration date, use{' '}
        <strong>Search Taxpayer</strong> on the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">GST portal</a>.
        Checks run in your browser; nothing is sent anywhere.
      </div>

      <Segmented
        name="gstin-mode"
        legend="Check"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'single', label: 'One GSTIN' },
          { value: 'bulk', label: `Bulk (up to ${MAX_BULK})` },
        ]}
      />

      {mode === 'single' ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
          <form className="card space-y-4 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
            <TextField
              id="gstin-single"
              label="GSTIN"
              value={single}
              onChange={(e) => setSingle(e.target.value)}
              placeholder={`e.g. ${SAMPLE}`}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={20}
              className="[&_input]:font-mono [&_input]:uppercase [&_input]:tracking-wider"
              hint="15 characters. Spaces are ignored and lower case is converted to upper case."
            />
            <div className="flex flex-wrap gap-2">
              <CopyButton text={singleCopy} className="btn-primary" />
              <button type="button" className="btn-ghost" onClick={() => setSingle(SAMPLE)}>Try sample</button>
              <button type="button" className="btn-ghost" onClick={() => setSingle('')}>Reset</button>
            </div>
          </form>

          <section className="card p-5 md:p-7" aria-labelledby="gstin-result-heading">
            <h2 id="gstin-result-heading" className="font-display text-xl font-bold text-ink">Result</h2>
            <div aria-live="polite" aria-atomic="true">
              {!result ? (
                <p className="mt-3 text-sm text-ink-soft">Enter a GSTIN to check its structure.</p>
              ) : (
                <>
                  <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-bold ${result.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                    {result.valid ? 'Valid format and check digit' : 'Invalid GSTIN'}
                  </p>
                  {parts && (
                    <p className="mt-4 flex flex-wrap gap-1 font-mono text-lg font-bold tracking-wider" aria-hidden>
                      {parts.map((p) => (
                        <span key={p.position} className={`rounded-md px-1.5 py-0.5 ${p.ok ? 'bg-brand-50 text-brand-800' : 'bg-red-100 text-red-700 underline decoration-wavy'}`}>
                          {p.chars}
                        </span>
                      ))}
                    </p>
                  )}
                  {parts && (
                    <dl className="mt-4 divide-y divide-brand-900/10 text-sm">
                      {parts.map((p) => (
                        <div key={p.position} className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 py-2">
                          <dt className="text-ink-soft">
                            {p.label}
                            <span className="block text-xs text-ink-faint">char {p.position}</span>
                          </dt>
                          <dd className="text-ink">
                            <span className="font-mono font-semibold">{p.chars}</span>{' '}
                            <span className={p.ok ? 'text-ink-soft' : 'font-medium text-red-700'}>
                              {p.ok ? '✓ ' : '✗ '}{p.meaning}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {result.errors.length > 0 && (
                    <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-700">
                      {result.errors.map((e) => <li key={e}>{e}</li>)}
                    </ul>
                  )}
                  {result.valid && (
                    <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
                      The structure is correct. That does not prove the registration is active; check it with Search
                      Taxpayer on the GST portal before relying on it.
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="card space-y-3 p-5 md:p-7">
            <label htmlFor="gstin-bulk" className="label">Paste GSTINs</label>
            <textarea
              id="gstin-bulk"
              className="input min-h-[180px] font-mono text-sm"
              value={bulk}
              onChange={(e) => setBulk(e.target.value)}
              placeholder={'One per line, or paste a column from Excel / CSV with a "GSTIN" header\n' + SAMPLE + '\n' + SAMPLE_2}
              spellCheck={false}
              aria-describedby="gstin-bulk-hint"
            />
            <p id="gstin-bulk-hint" className="text-xs text-ink-faint">
              Up to {MAX_BULK} rows. If you paste several columns, the column headed “GSTIN” is used (or the column that looks most like GSTINs).
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" disabled={!bulkRes.rows.length} onClick={() => downloadCsv('gstin-check.csv', bulkCsv())}>
                Download CSV
              </button>
              <CopyButton text={bulkRes.rows.length ? bulkCsv() : ''} label="Copy as CSV" />
              <button type="button" className="btn-ghost" onClick={() => setBulk('')}>Reset</button>
            </div>
          </div>

          <p className="text-sm text-ink-soft" role="status" aria-live="polite">
            {bulkRes.rows.length
              ? `${bulkRes.rows.length} checked: ${validCount} valid format, ${bulkRes.rows.length - validCount} invalid.${bulkRes.truncated ? ` Only the first ${MAX_BULK} of ${bulkRes.total} rows were checked.` : ''}`
              : 'Paste GSTINs above to check them.'}
          </p>

          {bulkRes.rows.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-brand-900/10 bg-white">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">GSTIN check results</caption>
                <thead className="bg-brand-50 text-ink">
                  <tr>
                    <th scope="col" className="px-3 py-2.5">#</th>
                    <th scope="col" className="px-3 py-2.5">GSTIN</th>
                    <th scope="col" className="px-3 py-2.5">Status</th>
                    <th scope="col" className="px-3 py-2.5">State</th>
                    <th scope="col" className="px-3 py-2.5">PAN</th>
                    <th scope="col" className="px-3 py-2.5">Error</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkRes.rows.map(({ n, r, dupOf }) => (
                    <tr key={n} className="border-t border-brand-900/10 align-top">
                      <td className="px-3 py-2 tabular-nums text-ink-faint">{n}</td>
                      <td className="px-3 py-2 font-mono">{r.gstin || '(empty)'}</td>
                      <td className="px-3 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${r.valid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'}`}>
                          {r.valid ? 'Valid format' : 'Invalid'}
                        </span>
                      </td>
                      <td className="px-3 py-2">{r.stateName ? `${r.stateName} (${r.stateCode})` : r.stateCode ?? ''}</td>
                      <td className="px-3 py-2 font-mono">{r.pan ?? ''}</td>
                      <td className="px-3 py-2 text-red-700">
                        {[...r.errors, dupOf ? `Duplicate of row ${dupOf}.` : ''].filter(Boolean).join(' ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
