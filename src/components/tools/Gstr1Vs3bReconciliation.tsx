'use client';
import { useEffect, useMemo, useState } from 'react';
import { parseTable, toCsv } from '@/lib/csv';
import { formatINR } from '@/lib/money';
import {
  fyMonths, HEAD_LABEL, MONTHLY_ALIASES, parseCellAmount, parseMonthlyRows, reconcile1vs3b, TAX_HEADS,
  type MonthFigures, type MonthRecon, type TaxFigures, type TaxHead,
} from '@/lib/returns';
import { downloadCsv, PrivacyNote } from './ReturnsDataInput';
import { safeStorage, TextField } from './ui';

type Side = 'g1' | 'g3b';
type Grid = Record<Side, Record<TaxHead, string>>[];
const emptyRow = () => ({
  g1: { taxable: '', igst: '', cgst: '', sgst: '', cess: '' },
  g3b: { taxable: '', igst: '', cgst: '', sgst: '', cess: '' },
});
const emptyGrid = (): Grid => Array.from({ length: 12 }, emptyRow);
const FY_START_YEARS = Array.from({ length: 11 }, (_, i) => 2017 + i);
const STORE_KEY = (fy: number) => `eway-easy:gstr1-3b:${fy}`;

const PASTE_HEADERS = ['Month', 'GSTR-1 Taxable', 'GSTR-1 IGST', 'GSTR-1 CGST', 'GSTR-1 SGST', 'GSTR-1 Cess', 'GSTR-3B Taxable', 'GSTR-3B IGST', 'GSTR-3B CGST', 'GSTR-3B SGST', 'GSTR-3B Cess'];
const SAMPLE = [
  PASTE_HEADERS.join('\t'),
  'Apr\t500000\t36000\t9000\t9000\t0\t500000\t36000\t9000\t9000\t0',
  'May\t620000\t45000\t10800\t10800\t0\t600000\t43200\t10800\t10800\t0',
  'Jun\t480000\t30000\t13200\t13200\t0\t500000\t30000\t15000\t15000\t0',
  'Jul\t550000\t39600\t9900\t9900\t0\t550000\t39600\t9900\t9900\t0',
].join('\n');

function toFigures(r: Record<TaxHead, string>): { f: TaxFigures; bad: Set<TaxHead> } {
  const bad = new Set<TaxHead>();
  const f = {} as TaxFigures;
  for (const h of TAX_HEADS) {
    const v = parseCellAmount(r[h]);
    if (v === null) bad.add(h);
    f[h] = v ?? 0;
  }
  return { f, bad };
}

const fmtDiff = (p: number) => (p > 0 ? '+' : p < 0 ? '−' : '') + formatINR(Math.abs(p));

export default function Gstr1Vs3bReconciliation() {
  const [fy, setFy] = useState(2026);
  const [grid, setGrid] = useState<Grid>(emptyGrid);
  const [loaded, setLoaded] = useState(false);
  const [tol, setTol] = useState('1');
  const [paste, setPaste] = useState('');
  const [pasteMsg, setPasteMsg] = useState<string | null>(null);

  useEffect(() => {
    const stored = safeStorage.get<Grid | null>(STORE_KEY(fy), null);
    const ok = Array.isArray(stored) && stored.length === 12 && stored.every((r) => r && r.g1 && r.g3b);
    setGrid(ok ? stored : emptyGrid());
    setLoaded(true);
  }, [fy]);
  useEffect(() => { if (loaded) safeStorage.set(STORE_KEY(fy), grid); }, [grid, fy, loaded]);

  const months = fyMonths(fy);
  const tolPaise = parseCellAmount(tol);
  const tolError = tolPaise === null || tolPaise < 0 ? 'Enter a valid amount.' : null;

  const calc = useMemo(() => {
    const bad: Set<string> = new Set();
    const figs: MonthFigures[] = grid.map((row, i) => {
      const a = toFigures(row.g1), b = toFigures(row.g3b);
      a.bad.forEach((h) => bad.add(`${i}|g1|${h}`));
      b.bad.forEach((h) => bad.add(`${i}|g3b|${h}`));
      return { g1: a.f, g3b: b.f };
    });
    return { ...reconcile1vs3b(figs, tolPaise ?? 100), bad };
  }, [grid, tolPaise]);

  function setCell(i: number, side: Side, h: TaxHead, v: string) {
    setGrid((g) => g.map((r, k) => (k === i ? { ...r, [side]: { ...r[side], [h]: v } } : r)));
  }

  function applyPaste(text = paste) {
    const t = parseTable(text, MONTHLY_ALIASES);
    if (!t.rows.length) { setPasteMsg('Nothing to import. Include the header row.'); return; }
    const { data, errors } = parseMonthlyRows(t.rows);
    const present = new Set(Object.keys(MONTHLY_ALIASES).filter((k) => !t.missing.includes(k)));
    setGrid((g) => g.map((r, i) => {
      const d = data.get(i);
      if (!d) return r;
      const next = { g1: { ...r.g1 }, g3b: { ...r.g3b } };
      for (const h of TAX_HEADS) {
        const cap = h[0].toUpperCase() + h.slice(1);
        if (present.has(`g1${cap}`)) next.g1[h] = String(d.g1[h] / 100);
        if (present.has(`g3b${cap}`)) next.g3b[h] = String(d.g3b[h] / 100);
      }
      return next;
    }));
    setPasteMsg(`Imported ${data.size} month(s).${errors.length ? ' ' + errors.slice(0, 3).join(' ') : ''}`);
  }

  function download() {
    const headers = ['Month', ...TAX_HEADS.map((h) => `GSTR-1 ${HEAD_LABEL[h]}`), ...TAX_HEADS.map((h) => `GSTR-3B ${HEAD_LABEL[h]}`),
      ...TAX_HEADS.map((h) => `Diff ${HEAD_LABEL[h]} (3B - GSTR-1)`), 'Total tax diff', 'Status'];
    const line = (label: string, m: MonthRecon) => [
      label, ...TAX_HEADS.map((h) => m.g1[h] / 100), ...TAX_HEADS.map((h) => m.g3b[h] / 100), ...TAX_HEADS.map((h) => m.diff[h] / 100),
      m.taxDiff / 100, statusText(m.status),
    ];
    downloadCsv(`gstr1-vs-3b-FY${fy}-${String((fy + 1) % 100).padStart(2, '0')}.csv`,
      toCsv(headers, [...calc.months.map((m, i) => line(months[i].label, m)), line('Total', calc.annual)]));
  }

  const inputCls = (bad: boolean) => `w-24 rounded-lg border px-2 py-1.5 text-right text-sm tabular-nums ${bad ? 'border-red-500' : 'border-brand-900/15'} focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/25`;

  return (
    <div className="space-y-6">
      <section className="card space-y-5 p-5 md:p-7" aria-labelledby="r13-input-heading">
        <h2 id="r13-input-heading" className="font-display text-xl font-bold text-ink">Enter GSTR-1 and GSTR-3B figures</h2>
        <PrivacyNote />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="r13-fy" className="label">Financial year</label>
            <select id="r13-fy" className="input" value={fy} onChange={(e) => { setLoaded(false); setFy(Number(e.target.value)); }}>
              {FY_START_YEARS.map((y) => <option key={y} value={y}>FY {y}-{String((y + 1) % 100).padStart(2, '0')}</option>)}
            </select>
          </div>
          <TextField id="r13-tol" label="Tolerance per month" prefix="₹" inputMode="decimal" value={tol} onChange={(e) => setTol(e.target.value)} error={tolError} hint="Differences up to this amount are treated as matched." />
        </div>

        <details className="rounded-2xl border border-brand-900/10 p-4">
          <summary className="cursor-pointer font-semibold text-ink">Paste both from Excel</summary>
          <div className="mt-3 space-y-3">
            <p className="text-sm text-ink-soft">
              Copy a block with a header row. Column names: {PASTE_HEADERS.join(', ')}. Without a Month column, rows are read in order from April.
            </p>
            <label htmlFor="r13-paste" className="sr-only">Pasted monthly data</label>
            <textarea id="r13-paste" className="input min-h-[120px] font-mono text-xs" value={paste} onChange={(e) => setPaste(e.target.value)} spellCheck={false} />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-primary" onClick={() => applyPaste()} disabled={!paste.trim()}>Fill table</button>
              <button type="button" className="btn-ghost" onClick={() => { setPaste(SAMPLE); applyPaste(SAMPLE); }}>Load sample data</button>
              <button type="button" className="btn-ghost" onClick={() => downloadCsv('gstr1-vs-3b-template.csv', toCsv(PASTE_HEADERS, months.map((m) => [m.label, ...Array(10).fill('')])))}>Download template CSV</button>
              <button type="button" className="btn-ghost" onClick={() => setGrid(emptyGrid())}>Clear table</button>
            </div>
            {pasteMsg && <p className="text-sm text-ink-soft" aria-live="polite">{pasteMsg}</p>}
          </div>
        </details>

        <div className="overflow-x-auto">
          <table className="min-w-[1180px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="py-1 pr-2" rowSpan={2}>Month</th>
                <th className="border-b border-brand-900/10 py-1 text-center" colSpan={5}>GSTR-1 (outward supplies)</th>
                <th className="border-b border-brand-900/10 py-1 text-center" colSpan={5}>GSTR-3B Table 3.1(a)</th>
              </tr>
              <tr>
                {(['g1', 'g3b'] as Side[]).flatMap((s) => TAX_HEADS.map((h) => <th key={s + h} className="px-1 py-1 text-right">{HEAD_LABEL[h]}</th>))}
              </tr>
            </thead>
            <tbody>
              {months.map((m, i) => (
                <tr key={m.key}>
                  <th scope="row" className="py-1 pr-2 font-semibold text-ink">{m.label}</th>
                  {(['g1', 'g3b'] as Side[]).flatMap((s) => TAX_HEADS.map((h) => (
                    <td key={s + h} className="px-1 py-1">
                      <input
                        aria-label={`${m.label} ${s === 'g1' ? 'GSTR-1' : 'GSTR-3B'} ${HEAD_LABEL[h]}`}
                        className={inputCls(calc.bad.has(`${i}|${s}|${h}`))}
                        inputMode="decimal"
                        value={grid[i]?.[s]?.[h] ?? ''}
                        onChange={(e) => setCell(i, s, h, e.target.value)}
                      />
                    </td>
                  )))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint">Amounts in ₹. Figures are saved only in this browser (local storage) for the selected year.</p>
      </section>

      <section className="card space-y-4 p-5 md:p-7" aria-labelledby="r13-res-heading">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="r13-res-heading" className="font-display text-xl font-bold text-ink">Differences (GSTR-3B minus GSTR-1)</h2>
          <button type="button" className="btn-primary" onClick={download}>Download results CSV</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3" aria-live="polite">
          <Stat label="Months where 3B is lower" value={calc.months.filter((m) => m.status === 'short').length} tone="text-red-700" />
          <Stat label="Months where 3B is higher" value={calc.months.filter((m) => m.status === 'excess').length} tone="text-amber-700" />
          <Stat label="Annual tax difference" value={fmtDiff(calc.annual.taxDiff)} tone={calc.annual.status === 'short' ? 'text-red-700' : calc.annual.status === 'excess' ? 'text-amber-700' : 'text-emerald-700'} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
              <tr>
                <th className="py-2 pr-3">Month</th>
                {TAX_HEADS.map((h) => <th key={h} className="py-2 pr-3 text-right">{HEAD_LABEL[h]}</th>)}
                <th className="py-2 pr-3 text-right">Total tax</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-900/5 tabular-nums">
              {calc.months.map((m, i) => <DiffRow key={months[i].key} label={months[i].label} m={m} />)}
              <DiffRow label="Annual" m={calc.annual} strong />
            </tbody>
          </table>
        </div>
        <p className="text-xs text-ink-faint">
          Red: GSTR-3B is lower than GSTR-1 (possible short payment of tax). Amber: GSTR-3B is higher than GSTR-1. Check the reasons below before acting.
        </p>
      </section>
    </div>
  );
}

function statusText(s: MonthRecon['status']) {
  return s === 'short' ? '3B lower than GSTR-1' : s === 'excess' ? '3B higher than GSTR-1' : 'Matched';
}

function Stat({ label, value, tone }: { label: string; value: string | number; tone: string }) {
  return (
    <div className="rounded-2xl bg-cream p-4">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className={`mt-1 text-xl font-bold tabular-nums ${tone}`}>{value}</p>
    </div>
  );
}

function DiffRow({ label, m, strong = false }: { label: string; m: MonthRecon; strong?: boolean }) {
  const cell = (d: number, s: MonthRecon['status']) => (
    <span className={s === 'short' ? 'font-semibold text-red-700' : s === 'excess' ? 'font-semibold text-amber-700' : 'text-ink-soft'}>{fmtDiff(d)}</span>
  );
  const rowBg = m.status === 'short' ? 'bg-red-50' : m.status === 'excess' ? 'bg-amber-50' : '';
  return (
    <tr className={`${rowBg} ${strong ? 'border-t-2 border-brand-900/15 font-bold' : ''}`}>
      <th scope="row" className="py-2 pl-2 pr-3 text-left font-semibold text-ink">{label}</th>
      {TAX_HEADS.map((h) => <td key={h} className="py-2 pr-3 text-right">{cell(m.diff[h], m.headStatus[h])}</td>)}
      <td className="py-2 pr-3 text-right">{cell(m.taxDiff, m.status)}</td>
      <td className="py-2 pr-2">{statusText(m.status)}</td>
    </tr>
  );
}
