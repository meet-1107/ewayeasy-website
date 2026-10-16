'use client';
import { useMemo, useState } from 'react';
import { parseTable, toCsv } from '@/lib/csv';
import { gstinCheckChar } from '@/lib/gstin';
import { formatINR } from '@/lib/money';
import {
  MATCH_LABEL, parseCellAmount, PURCHASE_ALIASES, PURCHASE_LABELS, PURCHASE_REQUIRED, reconcile2b,
  type MatchRow, type MatchStatus,
} from '@/lib/returns';
import ReturnsDataInput, { downloadCsv, PrivacyNote } from './ReturnsDataInput';
import { Segmented, TextField } from './ui';

const s1 = '27AAPFU0939F1Z';
const s2 = '24ABCDE1234F1Z';
const s3 = '24AAACB1234C1Z';
const SUP1 = s1 + gstinCheckChar(s1);
const SUP2 = s2 + gstinCheckChar(s2);
const SUP3 = s3 + gstinCheckChar(s3);

const HEAD = 'Supplier GSTIN\tSupplier Name\tInvoice No\tInvoice Date\tTaxable Value\tIGST\tCGST\tSGST';
const SAMPLE_BOOKS = [
  HEAD,
  `${SUP1}\tSample Glazes Pvt Ltd\tSG/0045\t03/09/2026\t100000\t18000\t0\t0`,
  `${SUP1}\tSample Glazes Pvt Ltd\tSG/0051\t17/09/2026\t40000\t7200\t0\t0`,
  `${SUP2}\tDemo Packaging\tDP-112\t05/09/2026\t25000\t0\t2250\t2250`,
  `${SUP2}\tDemo Packaging\tDP-118\t20/09/2026\t12000\t0\t1080\t1080`,
  `${SUP3}\tExample Transport Co\t778\t11/09/2026\t8000\t0\t200\t200`,
].join('\n');
const SAMPLE_2B = [
  'GSTIN of supplier\tTrade/Legal name\tInvoice number\tInvoice Date\tTaxable Value (₹)\tIntegrated Tax(₹)\tCentral Tax(₹)\tState/UT Tax(₹)',
  `${SUP1}\tSAMPLE GLAZES PVT LTD\tSG/45\t03/09/2026\t100000\t18000\t0\t0`,
  `${SUP1}\tSAMPLE GLAZES PVT LTD\tSG/51\t17/09/2026\t40000\t6800\t0\t0`,
  `${SUP2}\tDEMO PACKAGING\tDP/1120\t05/09/2026\t25000\t0\t2250\t2250`,
  `${SUP3}\tEXAMPLE TRANSPORT CO\t0778\t11/09/2026\t8000\t0\t200\t200`,
  `${SUP3}\tEXAMPLE TRANSPORT CO\t0791\t26/09/2026\t5000\t0\t125\t125`,
].join('\n');

type View = 'all' | MatchStatus;
const STATUS_TONE: Record<MatchStatus, string> = {
  matched: 'text-emerald-700', mismatch: 'text-red-700', possible: 'text-amber-700', 'books-only': 'text-red-700', '2b-only': 'text-brand-700',
};

const fmtDiff = (p: number) => (p > 0 ? '+' : p < 0 ? '−' : '') + formatINR(Math.abs(p));

export default function Gstr2bReconciliation() {
  const [books, setBooks] = useState('');
  const [twob, setTwob] = useState('');
  const [tol, setTol] = useState('1');
  const [stripZeros, setStripZeros] = useState(true);
  const [ignoreSep, setIgnoreSep] = useState(true);
  const [view, setView] = useState<View>('all');

  const tolPaise = parseCellAmount(tol);
  const tolError = tolPaise === null || tolPaise < 0 ? 'Enter a valid amount.' : null;

  const result = useMemo(() => {
    if (!books.trim() || !twob.trim() || tolPaise === null || tolPaise < 0) return null;
    const a = parseTable(books, PURCHASE_ALIASES);
    const b = parseTable(twob, PURCHASE_ALIASES);
    if ([...a.missing, ...b.missing].some((m) => PURCHASE_REQUIRED.includes(m))) return null;
    return reconcile2b(a.rows, b.rows, { tolerance: tolPaise, stripLeadingZeros: stripZeros, ignoreSeparators: ignoreSep });
  }, [books, twob, tolPaise, stripZeros, ignoreSep]);

  const shown = result ? result.rows.filter((r) => view === 'all' || r.status === view) : [];

  function download() {
    if (!result) return;
    const v = (x: number | undefined) => (x === undefined ? '' : x / 100);
    downloadCsv('gstr2b-reconciliation.csv', toCsv(
      ['Status', 'Supplier GSTIN', 'Supplier', 'Books invoice', 'Books date', '2B invoice', '2B date', 'Books taxable', 'Books tax', '2B taxable', '2B tax',
        'Diff taxable', 'Diff IGST', 'Diff CGST', 'Diff SGST', 'Notes'],
      result.rows.map((r) => [
        MATCH_LABEL[r.status], r.gstin, r.name, r.books?.invoiceNo ?? '', r.books?.date ?? '', r.twob?.invoiceNo ?? '', r.twob?.date ?? '',
        v(r.books?.values.taxable), r.books ? v(tax(r.books.values)) : '', v(r.twob?.values.taxable), r.twob ? v(tax(r.twob.values)) : '',
        v(r.diff?.taxable), v(r.diff?.igst), v(r.diff?.cgst), v(r.diff?.sgst), r.notes.join(' '),
      ]),
    ));
  }

  return (
    <div className="space-y-6">
      <section className="card space-y-5 p-5 md:p-7" aria-labelledby="r2b-input-heading">
        <h2 id="r2b-input-heading" className="font-display text-xl font-bold text-ink">Purchase register and GSTR-2B</h2>
        <PrivacyNote />
        <div className="grid gap-6 lg:grid-cols-2">
          <ReturnsDataInput
            id="r2b-books"
            label="1. Purchase register (your books)"
            value={books}
            onChange={setBooks}
            aliases={PURCHASE_ALIASES}
            labels={PURCHASE_LABELS}
            required={PURCHASE_REQUIRED}
            sample={SAMPLE_BOOKS}
            templateName="purchase-register-template.csv"
          />
          <ReturnsDataInput
            id="r2b-2b"
            label="2. GSTR-2B (B2B sheet from the portal Excel)"
            value={twob}
            onChange={setTwob}
            aliases={PURCHASE_ALIASES}
            labels={PURCHASE_LABELS}
            required={PURCHASE_REQUIRED}
            sample={SAMPLE_2B}
            templateName="gstr2b-b2b-template.csv"
            hint="Copy from the single header row (GSTIN of supplier, Invoice number, Taxable Value, Integrated Tax…) downwards."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField id="r2b-tol" label="Value tolerance" prefix="₹" inputMode="decimal" value={tol} onChange={(e) => setTol(e.target.value)} error={tolError} hint="Applied to taxable value and each tax head." />
          <fieldset className="sm:col-span-2">
            <legend className="label">Invoice number matching</legend>
            <p className="mb-2 text-xs text-ink-faint">Always case-insensitive and ignores spaces.</p>
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={stripZeros} onChange={(e) => setStripZeros(e.target.checked)} className="h-4 w-4" />
              Ignore leading zeros (SG/0045 = SG/45)
            </label>
            <label className="mt-1 flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={ignoreSep} onChange={(e) => setIgnoreSep(e.target.checked)} className="h-4 w-4" />
              Ignore &quot;/&quot; and &quot;-&quot; (DP-112 = DP/112 = DP112)
            </label>
          </fieldset>
        </div>
      </section>

      {result && (
        <>
          <section className="card space-y-4 p-5 md:p-7" aria-labelledby="r2b-res-heading">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="r2b-res-heading" className="font-display text-xl font-bold text-ink">Invoice matching</h2>
              <button type="button" className="btn-primary" onClick={download}>Download results CSV</button>
            </div>
            <Segmented
              name="r2b-view"
              legend="Show"
              value={view}
              onChange={setView}
              options={[
                { value: 'all', label: `All (${result.rows.length})` },
                ...(['matched', 'mismatch', 'books-only', '2b-only', 'possible'] as MatchStatus[]).map((s) => ({ value: s as View, label: `${MATCH_LABEL[s]} (${result.counts[s]})` })),
              ]}
            />
            {result.problems.length > 0 && (
              <details className="rounded-xl bg-amber-50 p-3 text-sm text-amber-900">
                <summary className="cursor-pointer font-semibold">{result.problems.length} input row warning(s)</summary>
                <ul className="mt-2 list-disc space-y-0.5 pl-5">
                  {result.problems.slice(0, 200).map((p, i) => <li key={i}>{p.source === 'books' ? 'Books' : '2B'} row {p.line}: {p.msg}</li>)}
                </ul>
              </details>
            )}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
                  <tr>
                    <th className="py-2 pr-3">Status</th><th className="py-2 pr-3">Supplier</th>
                    <th className="py-2 pr-3">Books invoice</th><th className="py-2 pr-3">2B invoice</th>
                    <th className="py-2 pr-3 text-right">Books tax</th><th className="py-2 pr-3 text-right">2B tax</th>
                    <th className="py-2">Difference (2B − books)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-900/5">
                  {shown.slice(0, 1000).map((r, i) => <MatchView key={i} r={r} />)}
                </tbody>
              </table>
              {shown.length > 1000 && <p className="mt-2 text-xs text-ink-faint">Showing the first 1,000 rows. Download the CSV for all rows.</p>}
              {!shown.length && <p className="mt-3 text-sm text-ink-soft">No invoices in this view.</p>}
            </div>
          </section>

          <section className="card space-y-4 p-5 md:p-7" aria-labelledby="r2b-sup-heading">
            <h2 id="r2b-sup-heading" className="font-display text-xl font-bold text-ink">Supplier-wise summary</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="border-b border-brand-900/10 text-xs uppercase tracking-wide text-ink-faint">
                  <tr>
                    <th className="py-2 pr-3">Supplier</th>
                    <th className="py-2 pr-3 text-right">Matched</th><th className="py-2 pr-3 text-right">Mismatch</th>
                    <th className="py-2 pr-3 text-right">Books only</th><th className="py-2 pr-3 text-right">2B only</th><th className="py-2 pr-3 text-right">Possible</th>
                    <th className="py-2 pr-3 text-right">Books tax</th><th className="py-2 pr-3 text-right">2B tax</th><th className="py-2 text-right">Difference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-900/5 tabular-nums">
                  {result.suppliers.map((s) => (
                    <tr key={s.gstin}>
                      <td className="py-2 pr-3"><span className="font-medium text-ink">{s.name || '—'}</span><br /><span className="font-mono text-xs">{s.gstin}</span></td>
                      <td className="py-2 pr-3 text-right">{s.counts.matched}</td><td className="py-2 pr-3 text-right">{s.counts.mismatch}</td>
                      <td className="py-2 pr-3 text-right">{s.counts['books-only']}</td><td className="py-2 pr-3 text-right">{s.counts['2b-only']}</td>
                      <td className="py-2 pr-3 text-right">{s.counts.possible}</td>
                      <td className="py-2 pr-3 text-right">{formatINR(s.booksTax)}</td><td className="py-2 pr-3 text-right">{formatINR(s.twobTax)}</td>
                      <td className={`py-2 text-right font-semibold ${s.diffTax < 0 ? 'text-red-700' : s.diffTax > 0 ? 'text-amber-700' : 'text-ink-soft'}`}>{fmtDiff(s.diffTax)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
              A match does not guarantee that input tax credit is eligible. ITC also depends on the conditions in Section 16 (such as
              possession of the invoice, receipt of goods or services, tax actually paid by the supplier and the time limit) and on the
              blocked credits in Section 17(5). Credit/debit notes, amendments and import entries are not covered here.
            </p>
          </section>
        </>
      )}
    </div>
  );
}

function tax(v: { igst: number; cgst: number; sgst: number }) {
  return v.igst + v.cgst + v.sgst;
}

function MatchView({ r }: { r: MatchRow }) {
  const diffs = r.diff ? (['taxable', 'igst', 'cgst', 'sgst'] as const).filter((h) => r.diff![h] !== 0) : [];
  return (
    <tr className="align-top">
      <td className={`py-2 pr-3 font-semibold ${STATUS_TONE[r.status]}`}>{MATCH_LABEL[r.status]}</td>
      <td className="py-2 pr-3"><span className="text-ink">{r.name || '—'}</span><br /><span className="font-mono text-xs">{r.gstin}</span></td>
      <td className="py-2 pr-3">{r.books ? <>{r.books.invoiceNo}<br /><span className="text-xs text-ink-faint">{r.books.date}</span></> : '—'}</td>
      <td className="py-2 pr-3">{r.twob ? <>{r.twob.invoiceNo}<br /><span className="text-xs text-ink-faint">{r.twob.date}</span></> : '—'}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{r.books ? formatINR(tax(r.books.values)) : '—'}</td>
      <td className="py-2 pr-3 text-right tabular-nums">{r.twob ? formatINR(tax(r.twob.values)) : '—'}</td>
      <td className="py-2 text-xs text-ink-soft">
        {diffs.length ? diffs.map((h) => <span key={h} className="mr-2 inline-block tabular-nums">{h === 'taxable' ? 'Taxable' : h.toUpperCase()} {fmtDiff(r.diff![h])}</span>) : r.diff ? 'None' : ''}
        {r.notes.map((n, i) => <span key={i} className="block">{n}</span>)}
      </td>
    </tr>
  );
}
