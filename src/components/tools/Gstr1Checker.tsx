'use client';
import { useEffect, useMemo, useState } from 'react';
import { parseTable, toCsv } from '@/lib/csv';
import { gstinCheckChar } from '@/lib/gstin';
import { formatINR, formatRate, parseAmount } from '@/lib/money';
import {
  checkGstr1, SALES_ALIASES, SALES_LABELS, SALES_REQUIRED, totalTax, type Gstr1Row,
} from '@/lib/returns';
import { GST_STATES } from './invoice/states';
import ReturnsDataInput, { downloadCsv, PrivacyNote, type Filter } from './ReturnsDataInput';
import { Segmented, TextField } from './ui';

const b1 = '24ABCDE1234F1Z';
const b2 = '27AAPFU0939F1Z';
const B2B_1 = b1 + gstinCheckChar(b1);
const B2B_2 = b2 + gstinCheckChar(b2);

const SAMPLE = [
  'Invoice No\tInvoice Date\tRecipient GSTIN\tRecipient Name\tPlace of Supply\tInvoice Value\tTaxable Value\tRate\tIGST\tCGST\tSGST\tCess\tHSN\tQty\tUQC',
  `RJ/001\t02/09/2026\t${B2B_1}\tSample Traders\t24\t59000\t50000\t18\t0\t4500\t4500\t0\t6907\t100\tBOX`,
  `RJ/002\t04/09/2026\t${B2B_2}\tDemo Tiles LLP\t27\t118000\t100000\t18\t18000\t0\t0\t0\t6907\t200\tBOX`,
  'RJ/003\t08/09/2026\t\tWalk-in customer\t24\t10500\t10000\t5\t0\t250\t250\t0\t3825\t50\tKGS',
  'RJ/004\t12/09/2026\t\tRetail buyer\t08\t177000\t150000\t18\t27000\t0\t0\t0\t6907\t300\tBOX',
  'RJ/005\t15/09/2026\t\tRetail buyer\t24\t2360\t2000\t18\t0\t180\t175\t0\t6907\t4\tBOX',
  'RJ/005\t18/09/2026\t\tOther buyer\t24\t1180\t1000\t18\t0\t90\t90\t0\t6907\t2\tBOX',
  'RJ/007\t03/10/2026\t\tCash sale\t24\t1180\t1000\t18\t0\t90\t90\t0\t69\t2\t',
].join('\n');

function currentPeriod() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function Gstr1Checker() {
  const [text, setText] = useState('');
  const [supplierState, setSupplierState] = useState('24');
  const [period, setPeriod] = useState('');
  // Set after mount so the statically exported HTML does not depend on the build date.
  useEffect(() => { setPeriod((p) => p || currentPeriod()); }, []);
  function onData(v: string) {
    setText(v);
    if (v === SAMPLE) setPeriod('2026-09');
  }
  const [threshold, setThreshold] = useState('1,00,000');
  const [filter, setFilter] = useState<Filter>('all');

  const thresholdPaise = parseAmount(threshold);
  const thresholdError = thresholdPaise === null || thresholdPaise < 0 ? 'Enter a valid amount.' : null;

  const result = useMemo(() => {
    if (!text.trim() || thresholdPaise === null) return null;
    const t = parseTable(text, SALES_ALIASES);
    const missing = t.missing.filter((m) => SALES_REQUIRED.includes(m));
    if (missing.length || !t.rows.length) return null;
    return checkGstr1(t.rows, { supplierState, period, b2clThreshold: thresholdPaise });
  }, [text, supplierState, period, thresholdPaise]);

  const shown = result ? result.rows.filter((r) => filter === 'all' || r.status === filter) : [];

  function download() {
    if (!result) return;
    const csv = toCsv(
      ['Row', 'Invoice No', 'Invoice Date', 'Recipient GSTIN', 'Place of Supply', 'Section', 'Invoice Value', 'Taxable', 'Rate', 'IGST', 'CGST', 'SGST', 'Cess', 'HSN', 'Status', 'Issues'],
      result.rows.map((r) => [
        r.line, r.invoiceNo, r.dateRaw, r.gstin, r.pos ?? r.posRaw, r.section, r.invoiceValue / 100, r.taxable / 100,
        r.rateBp === null ? '' : r.rateBp / 100, r.igst / 100, r.cgst / 100, r.sgst / 100, r.cess / 100, r.hsn, r.status,
        r.issues.map((i) => `${i.level}: ${i.msg}`).join(' | '),
      ]),
    );
    downloadCsv(`gstr1-check-${period}.csv`, csv);
  }

  return (
    <div className="space-y-6">
      <section className="card space-y-5 p-5 md:p-7" aria-labelledby="g1-input-heading">
        <h2 id="g1-input-heading" className="font-display text-xl font-bold text-ink">Your sales register</h2>
        <PrivacyNote />
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="g1-state" className="label">Your state (supplier)</label>
            <select id="g1-state" className="input" value={supplierState} onChange={(e) => setSupplierState(e.target.value)}>
              {GST_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} – {s.name}</option>)}
            </select>
          </div>
          <TextField id="g1-period" label="Tax period" type="month" value={period} onChange={(e) => setPeriod(e.target.value)} />
          <TextField
            id="g1-threshold"
            label="B2CL invoice value above"
            prefix="₹"
            inputMode="decimal"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            error={thresholdError}
            hint="Threshold as revised from ₹2.5 lakh; verify the current limit on the GST portal."
          />
        </div>
        <ReturnsDataInput
          id="g1-data"
          label="Sales register rows"
          value={text}
          onChange={onData}
          aliases={SALES_ALIASES}
          labels={SALES_LABELS}
          required={SALES_REQUIRED}
          sample={SAMPLE}
          templateName="gstr1-sales-register-template.csv"
          hint="One row per invoice line (one row per rate is fine). Leave Recipient GSTIN blank for unregistered buyers. Place of supply as a 2-digit state code."
        />
      </section>

      {result && (
        <>
          <section className="card space-y-4 p-5 md:p-7" aria-labelledby="g1-rows-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="g1-rows-heading" className="font-display text-xl font-bold text-ink">Row checks</h2>
              <button type="button" className="btn-primary" onClick={download}>Download results CSV</button>
            </div>
            <p className="text-sm text-ink-soft" aria-live="polite">
              {result.rows.length} rows: <span className="font-semibold text-red-700">{result.counts.error} with errors</span>,{' '}
              <span className="font-semibold text-amber-700">{result.counts.warning} with warnings</span>,{' '}
              <span className="font-semibold text-emerald-700">{result.counts.ok} OK</span>.
            </p>
            <Segmented
              name="g1-filter"
              legend="Show"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: `All (${result.rows.length})` },
                { value: 'error', label: `Errors (${result.counts.error})` },
                { value: 'warning', label: `Warnings (${result.counts.warning})` },
                { value: 'ok', label: `OK (${result.counts.ok})` },
              ]}
            />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
                  <tr>
                    <th className="py-2 pr-3">Row</th><th className="py-2 pr-3">Invoice</th><th className="py-2 pr-3">Date</th>
                    <th className="py-2 pr-3">GSTIN / POS</th><th className="py-2 pr-3">Section</th>
                    <th className="py-2 pr-3 text-right">Taxable</th><th className="py-2 pr-3 text-right">Tax</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-900/5">
                  {shown.slice(0, 1000).map((r) => <RowView key={r.line} r={r} />)}
                </tbody>
              </table>
              {shown.length > 1000 && <p className="mt-2 text-xs text-ink-faint">Showing the first 1,000 rows. Download the CSV for all rows.</p>}
              {!shown.length && <p className="mt-3 text-sm text-ink-soft">No rows in this filter.</p>}
            </div>
          </section>

          <section className="card space-y-6 p-5 md:p-7" aria-labelledby="g1-sum-heading">
            <h2 id="g1-sum-heading" className="font-display text-xl font-bold text-ink">Summary for preparation</h2>
            <SummaryTable
              caption="Section-wise totals"
              first="Section"
              rows={result.sections.map((s) => ({ key: s.section, label: s.section, count: s.invoices, f: s }))}
              countLabel="Invoices"
            />
            <SummaryTable
              caption="Rate-wise totals"
              first="Rate"
              rows={result.rates.map((s) => ({ key: String(s.rateBp), label: s.rateBp < 0 ? 'Invalid' : formatRate(s.rateBp), count: s.rows, f: s }))}
              countLabel="Rows"
            />
            <div>
              <h3 className="font-semibold text-ink">HSN-wise summary</h3>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
                    <tr>
                      <th className="py-2 pr-3">HSN</th><th className="py-2 pr-3">UQC</th><th className="py-2 pr-3">Rate</th>
                      <th className="py-2 pr-3 text-right">Qty</th><th className="py-2 pr-3 text-right">Taxable</th><th className="py-2 text-right">Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-900/5 tabular-nums">
                    {result.hsn.map((h) => (
                      <tr key={`${h.hsn}|${h.uqc}|${h.rateBp}`}>
                        <td className="py-2 pr-3">{h.hsn || '—'}</td><td className="py-2 pr-3">{h.uqc || '—'}</td>
                        <td className="py-2 pr-3">{h.rateBp < 0 ? '—' : formatRate(h.rateBp)}</td>
                        <td className="py-2 pr-3 text-right">{(h.qtyMilli / 1000).toLocaleString('en-IN')}</td>
                        <td className="py-2 pr-3 text-right">{formatINR(h.taxable)}</td>
                        <td className="py-2 text-right">{formatINR(h.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
              This is a preparation aid. It does not file GSTR-1 and does not create the JSON file for the GST portal.
              Credit/debit notes, amendments, exports, nil-rated/exempt supplies and advances are not covered.
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function RowView({ r }: { r: Gstr1Row }) {
  const tone = r.status === 'error' ? 'text-red-700' : r.status === 'warning' ? 'text-amber-700' : 'text-emerald-700';
  return (
    <tr className="align-top">
      <td className="py-2 pr-3 text-ink-faint">{r.line}</td>
      <td className="py-2 pr-3 font-medium text-ink">{r.invoiceNo || '—'}</td>
      <td className="py-2 pr-3">{r.dateRaw || '—'}</td>
      <td className="py-2 pr-3 font-mono text-xs">{r.gstin || 'Unregistered'}<br />POS {r.pos ?? (r.posRaw || '—')}</td>
      <td className="py-2 pr-3">{r.section}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{formatINR(r.taxable)}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{formatINR(totalTax(r))}</td>
      <td className="py-2">
        <span className={`font-semibold ${tone}`}>{r.status === 'ok' ? 'OK' : r.status === 'error' ? 'Error' : 'Warning'}</span>
        {r.issues.length > 0 && (
          <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-ink-soft">
            {r.issues.map((i, k) => <li key={k} className={i.level === 'error' ? 'text-red-700' : ''}>{i.msg}</li>)}
          </ul>
        )}
      </td>
    </tr>
  );
}

function SummaryTable({ caption, first, rows, countLabel }: {
  caption: string;
  first: string;
  countLabel: string;
  rows: { key: string; label: string; count: number; f: { taxable: number; igst: number; cgst: number; sgst: number; cess: number } }[];
}) {
  return (
    <div>
      <h3 className="font-semibold text-ink">{caption}</h3>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
            <tr>
              <th className="py-2 pr-3">{first}</th><th className="py-2 pr-3 text-right">{countLabel}</th>
              <th className="py-2 pr-3 text-right">Taxable</th><th className="py-2 pr-3 text-right">IGST</th>
              <th className="py-2 pr-3 text-right">CGST</th><th className="py-2 pr-3 text-right">SGST</th><th className="py-2 text-right">Cess</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-900/5 tabular-nums">
            {rows.map((r) => (
              <tr key={r.key}>
                <td className="py-2 pr-3 font-medium text-ink">{r.label}</td>
                <td className="py-2 pr-3 text-right">{r.count}</td>
                <td className="py-2 pr-3 text-right">{formatINR(r.f.taxable)}</td>
                <td className="py-2 pr-3 text-right">{formatINR(r.f.igst)}</td>
                <td className="py-2 pr-3 text-right">{formatINR(r.f.cgst)}</td>
                <td className="py-2 pr-3 text-right">{formatINR(r.f.sgst)}</td>
                <td className="py-2 text-right">{formatINR(r.f.cess)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
