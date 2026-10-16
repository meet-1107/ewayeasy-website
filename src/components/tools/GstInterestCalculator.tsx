'use client';
import { useMemo, useRef, useState } from 'react';
import { formatINR, parseAmount } from '@/lib/money';
import {
  INTEREST_RATE_BP, INTEREST_RATE_LABEL, LAST_VERIFIED, OFFICIAL_LINKS, calculateInterest, daysLateISO, formatISODate,
  type InterestRate, type InterestResult,
} from '@/lib/gstPenalty';
import { CopyButton, TextField } from './ui';

interface Row {
  id: number;
  head: string;
  tax: string;
  due: string;
  paid: string;
  rate: InterestRate;
}

const HEADS = ['IGST', 'CGST', 'SGST / UTGST', 'Cess', 'Other'];

const firstRow: Row = { id: 1, head: 'IGST', tax: '', due: '', paid: '', rate: '18' };

const SAMPLE: Omit<Row, 'id'>[] = [
  { head: 'CGST', tax: '42,500', due: '2026-07-20', paid: '2026-08-14', rate: '18' },
  { head: 'SGST / UTGST', tax: '42,500', due: '2026-07-20', paid: '2026-08-14', rate: '18' },
  { head: 'IGST', tax: '18,000', due: '2026-07-20', paid: '2026-09-05', rate: '18' },
];

type RowErrors = Partial<Record<'tax' | 'due' | 'paid', string>>;

export default function GstInterestCalculator() {
  const nextId = useRef(2);
  const [rows, setRows] = useState<Row[]>([firstRow]);

  function update(id: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => {
      const last = rs[rs.length - 1];
      const used = new Set(rs.map((r) => r.head));
      const head = HEADS.find((h) => !used.has(h)) ?? 'Other';
      return [...rs, { id: nextId.current++, head, tax: '', due: last?.due ?? '', paid: last?.paid ?? '', rate: last?.rate ?? '18' }];
    });
  }
  function removeRow(id: number) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  }
  function loadSample() {
    setRows(SAMPLE.map((s) => ({ ...s, id: nextId.current++ })));
  }
  function reset() {
    setRows([{ ...firstRow, id: nextId.current++ }]);
  }

  const calc = useMemo(() => {
    const errors: Record<number, RowErrors> = {};
    const results: { row: Row; tax: number; r: InterestResult }[] = [];
    let touched = false;
    for (const row of rows) {
      const e: RowErrors = {};
      if (row.tax.trim() || row.due || row.paid) touched = true;
      const tax = parseAmount(row.tax);
      if (!row.tax.trim()) e.tax = 'Enter the tax amount.';
      else if (tax === null || tax < 0) e.tax = 'Enter a valid amount, up to 2 decimals.';
      if (!row.due) e.due = 'Enter the due date.';
      if (!row.paid) e.paid = 'Enter the payment date.';
      const days = row.due && row.paid ? daysLateISO(row.due, row.paid) : null;
      if (row.due && row.paid && days === null) e.paid = 'Enter valid dates.';
      if (Object.keys(e).length) { errors[row.id] = e; continue; }
      results.push({ row, tax: tax!, r: calculateInterest(tax!, INTEREST_RATE_BP[row.rate], days!) });
    }
    const ok = Object.keys(errors).length === 0 && results.length > 0;
    const totalPaise = results.reduce((a, x) => a + x.r.interestPaise, 0);
    const totalRupee = results.reduce((a, x) => a + x.r.interestRupeePaise, 0);
    const totalTax = results.reduce((a, x) => a + x.tax, 0);
    return { errors, results, ok, touched, totalPaise, totalRupee, totalTax };
  }, [rows]);

  const formulaFor = (x: { tax: number; r: InterestResult }) =>
    `${formatINR(x.tax)} × ${x.r.rateBp / 100}% × ${x.r.days} ÷ 365 = ${formatINR(x.r.interestPaise)}`;

  const copyText = !calc.ok
    ? ''
    : [
        'GST interest calculation (Section 50, simple interest)',
        ...calc.results.map((x) =>
          `${x.row.head}: tax ${formatINR(x.tax)}, due ${formatISODate(x.row.due)}, paid ${formatISODate(x.row.paid)}, ${x.r.days} day(s) @ ${x.r.rateBp / 100}% p.a. → ${formulaFor(x)} (rounded ${formatINR(x.r.interestRupeePaise)})`),
        `Total interest: ${formatINR(calc.totalPaise)} (rounded to rupee per head: ${formatINR(calc.totalRupee)})`,
      ].join('\n');

  const showErrors = calc.touched;

  return (
    <div className="space-y-6">
      <form className="card no-print space-y-5 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-soft">Add one row per tax head (or per payment). New rows copy the previous dates.</p>
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
        </div>
        <ol className="space-y-3">
          {rows.map((row, i) => {
            const e = showErrors ? calc.errors[row.id] ?? {} : {};
            const p = `gi-${row.id}`;
            return (
              <li key={row.id} className="rounded-2xl border border-brand-900/10 bg-cream/40 p-3.5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-ink">Row {i + 1}</span>
                  <button
                    type="button"
                    className="text-sm font-semibold text-red-700 underline disabled:cursor-not-allowed disabled:text-ink-faint disabled:no-underline"
                    onClick={() => removeRow(row.id)}
                    disabled={rows.length === 1}
                    aria-label={`Remove row ${i + 1}`}
                  >
                    Remove
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label htmlFor={`${p}-head`} className="label">Tax head</label>
                    <select id={`${p}-head`} className="input" value={row.head} onChange={(ev) => update(row.id, { head: ev.target.value })}>
                      {HEADS.map((h) => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                  <TextField id={`${p}-tax`} label="Tax paid late" prefix="₹" inputMode="decimal" value={row.tax} onChange={(ev) => update(row.id, { tax: ev.target.value })} error={e.tax} placeholder="e.g. 25,000" />
                  <TextField id={`${p}-due`} label="Due date" type="date" value={row.due} onChange={(ev) => update(row.id, { due: ev.target.value })} error={e.due} />
                  <TextField id={`${p}-paid`} label="Payment date" type="date" value={row.paid} onChange={(ev) => update(row.id, { paid: ev.target.value })} error={e.paid} />
                  <div>
                    <label htmlFor={`${p}-rate`} className="label">Interest rate</label>
                    <select id={`${p}-rate`} className="input" value={row.rate} onChange={(ev) => update(row.id, { rate: ev.target.value as InterestRate })}>
                      {(Object.keys(INTEREST_RATE_LABEL) as InterestRate[]).map((k) => <option key={k} value={k}>{INTEREST_RATE_LABEL[k]}</option>)}
                    </select>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <button type="button" className="btn-ghost" onClick={addRow}>+ Add row</button>
        <p className="rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs leading-5 text-ink-soft">
          For late payment, enter the tax actually paid in cash (the net liability after ITC), as generally provided by the
          proviso to Section 50(1) for returns filed late. Use 24% only for input tax credit wrongly availed <em>and</em>{' '}
          utilised. Rates and conditions can change; verify on{' '}
          <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">CBIC GST</a>.
        </p>
      </form>

      <section className="card print-area p-5 md:p-7" aria-labelledby="gi-result-heading">
        <p className="hidden text-sm text-ink-soft print:block">E-Way Easy — GST interest calculation</p>
        <h2 id="gi-result-heading" className="font-display text-xl font-bold text-ink">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {calc.ok ? (
            <>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <caption className="sr-only">Interest by tax head</caption>
                  <thead className="border-b border-brand-900/10 text-ink-soft">
                    <tr>
                      <th scope="col" className="py-2 pr-3 font-semibold">Head</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Tax</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Days late</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Rate</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Interest (to the paisa)</th>
                      <th scope="col" className="py-2 text-right font-semibold">Rounded to ₹</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {calc.results.map((x) => (
                      <tr key={x.row.id} className="border-b border-brand-900/5">
                        <th scope="row" className="py-2 pr-3 font-medium text-ink">
                          {x.row.head}
                          <span className="block text-xs font-normal text-ink-faint">{formatISODate(x.row.due)} → {formatISODate(x.row.paid)}</span>
                        </th>
                        <td className="py-2 pr-3 text-right">{formatINR(x.tax)}</td>
                        <td className="py-2 pr-3 text-right">{x.r.days}</td>
                        <td className="py-2 pr-3 text-right">{x.r.rateBp / 100}%</td>
                        <td className="py-2 pr-3 text-right">{formatINR(x.r.interestPaise)}</td>
                        <td className="py-2 text-right font-semibold text-ink">{formatINR(x.r.interestRupeePaise)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="tabular-nums">
                    <tr className="text-base font-bold text-ink">
                      <th scope="row" className="py-3 pr-3">Total</th>
                      <td className="py-3 pr-3 text-right">{formatINR(calc.totalTax)}</td>
                      <td className="py-3 pr-3" />
                      <td className="py-3 pr-3" />
                      <td className="py-3 pr-3 text-right">{formatINR(calc.totalPaise)}</td>
                      <td className="py-3 text-right">{formatINR(calc.totalRupee)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
                <p className="font-semibold text-ink">Formula: Interest = Tax × Rate × Days late ÷ 365</p>
                <ul className="mt-1 space-y-0.5">
                  {calc.results.map((x) => <li key={x.row.id}>{x.row.head}: {formulaFor(x)}</li>)}
                </ul>
                <p className="mt-1">Days late = payment date − due date (0 if paid on or before the due date).</p>
              </div>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">
              {showErrors ? 'Fix the highlighted fields to see the result.' : 'Enter the tax amount and dates, or load the sample data.'}
            </p>
          )}
        </div>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <CopyButton text={copyText} className="btn-primary" />
          <button type="button" className="btn-ghost" onClick={() => window.print()} disabled={!calc.ok}>Print summary</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
        <div className="no-print mt-5 border-t border-brand-900/10 pt-4 text-sm">
          <h3 className="font-semibold text-ink">Official sources</h3>
          <ul className="mt-2 space-y-1">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{l.title}</a></li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-faint">Last reviewed: {LAST_VERIFIED}. The GST portal may show system-computed interest in GSTR-3B; use this tool as a cross-check.</p>
        </div>
      </section>
    </div>
  );
}
