'use client';
import type { ReactNode } from 'react';
import { amountInWords, formatINR, formatRate } from '@/lib/money';
import { formatDate, type InvoiceCalc, type InvoiceData, type Party } from './model';
import { stateLabel } from './states';

const MODE_LABEL: Record<string, string> = { road: 'Road', rail: 'Rail', air: 'Air', ship: 'Ship' };

function PartyBlock({ title, p }: { title: string; p: Party }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{title}</p>
      <p className="mt-1 font-semibold text-ink">{p.name || '—'}</p>
      {p.address && <p className="whitespace-pre-line text-ink-soft">{p.address}</p>}
      {p.stateCode && <p className="text-ink-soft">State: {stateLabel(p.stateCode)}</p>}
      <p className="text-ink-soft">GSTIN: {p.gstin ? p.gstin.toUpperCase() : 'Unregistered'}</p>
    </div>
  );
}

const fmtQty = (milli: number) => (milli / 1000).toLocaleString('en-IN', { maximumFractionDigits: 3 });

/** Optional label overrides so other documents (e.g. quotations) can reuse this layout. */
export interface PreviewLabels {
  number?: string;
  date?: string;
  due?: string;
  billTo?: string;
  paymentTerms?: string;
}

export default function InvoicePreview({
  data, calc, title = 'Tax Invoice', showTransport = false, labels = {}, extra, ariaLabel = 'Invoice preview',
}: {
  data: InvoiceData; calc: InvoiceCalc; title?: string; showTransport?: boolean;
  labels?: PreviewLabels; extra?: ReactNode; ariaLabel?: string;
}) {
  const L = { number: 'Invoice no.', date: 'Date', due: 'Due date', billTo: 'Bill to', paymentTerms: 'Payment terms', ...labels };
  const { totals, supply } = calc;
  const intra = supply === 'intra';
  const ship = data.shipSame ? null : data.shipTo;
  const t = data.transport;
  const hasTransport = showTransport && (t.mode || t.vehicleNo || t.transporter || t.distanceKm);
  const hasBank = data.showBank && Object.values(data.bank).some((v) => v.trim());

  return (
    <article className="print-area card overflow-hidden bg-white text-[12.5px] leading-5 text-ink" aria-label={ariaLabel}>
      <div className="border-b-4 border-brand-700 p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-xl font-bold text-brand-800">{data.seller.name || 'Your business name'}</p>
            {data.seller.address && <p className="mt-1 max-w-sm whitespace-pre-line text-ink-soft">{data.seller.address}</p>}
            <p className="text-ink-soft">GSTIN: <span className="font-semibold text-ink">{data.seller.gstin.toUpperCase() || '—'}</span></p>
            {data.seller.stateCode && <p className="text-ink-soft">State: {stateLabel(data.seller.stateCode)}</p>}
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold uppercase tracking-wide text-ink">{title}</p>
            <dl className="mt-1 grid grid-cols-[auto_auto] justify-end gap-x-3 text-ink-soft">
              <dt>{L.number}</dt><dd className="font-semibold text-ink">{data.invoiceNo || '—'}</dd>
              <dt>{L.date}</dt><dd className="font-semibold text-ink">{formatDate(data.invoiceDate) || '—'}</dd>
              {data.dueDate && (<><dt>{L.due}</dt><dd className="font-semibold text-ink">{formatDate(data.dueDate)}</dd></>)}
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b border-brand-900/10 p-5 sm:grid-cols-2 md:px-6">
        <PartyBlock title={L.billTo} p={data.buyer} />
        {ship ? <PartyBlock title="Ship to" p={ship} /> : (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Place of supply</p>
            <p className="mt-1 font-semibold">{stateLabel(data.placeOfSupply) || '—'}</p>
            <p className="text-ink-soft">{intra ? 'Intra-state supply: CGST + SGST/UTGST' : 'Inter-state supply: IGST'}</p>
          </div>
        )}
        {ship && (
          <div className="sm:col-span-2">
            <span className="text-ink-faint">Place of supply: </span>
            <span className="font-semibold">{stateLabel(data.placeOfSupply) || '—'}</span>
            <span className="text-ink-soft"> · {intra ? 'Intra-state: CGST + SGST/UTGST' : 'Inter-state: IGST'}</span>
          </div>
        )}
      </div>

      {hasTransport && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-b border-brand-900/10 px-5 py-3 text-ink-soft md:px-6">
          {t.mode && <span>Mode: <span className="font-semibold text-ink">{MODE_LABEL[t.mode]}</span></span>}
          {t.vehicleNo && <span>Vehicle no.: <span className="font-semibold text-ink">{t.vehicleNo.toUpperCase()}</span></span>}
          {t.transporter && <span>Transporter: <span className="font-semibold text-ink">{t.transporter}</span></span>}
          {t.distanceKm && <span>Approx. distance: <span className="font-semibold text-ink">{t.distanceKm} km</span></span>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead className="bg-brand-50 text-[11px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">HSN/SAC</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Rate</th>
              <th className="px-3 py-2 text-right">Disc.</th>
              <th className="px-3 py-2 text-right">Taxable</th>
              <th className="px-3 py-2 text-right">GST</th>
              <th className="px-3 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {totals.lines.length === 0 && (
              <tr><td colSpan={9} className="px-3 py-6 text-center text-ink-faint">Add line items to see them here.</td></tr>
            )}
            {totals.lines.map((l, i) => {
              const item = data.items[calc.lineIndex[i]];
              const input = calc.lineInputs[i];
              return (
                <tr key={item.id} className="border-t border-brand-900/10 align-top">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">{item.description}</td>
                  <td className="px-3 py-2">{item.hsn}</td>
                  <td className="px-3 py-2 text-right">{fmtQty(input.qtyMilli)} {item.unit}</td>
                  <td className="px-3 py-2 text-right">{formatINR(input.rate)}</td>
                  <td className="px-3 py-2 text-right">{l.discount ? formatINR(l.discount) : '—'}</td>
                  <td className="px-3 py-2 text-right">{formatINR(l.taxable)}</td>
                  <td className="px-3 py-2 text-right">{formatRate(input.gstBp)}</td>
                  <td className="px-3 py-2 text-right font-semibold">{formatINR(l.total)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-5 border-t border-brand-900/10 p-5 md:grid-cols-[1fr_260px] md:px-6">
        <div className="space-y-4">
          {totals.taxByRate.length > 0 && (
            <div className="overflow-x-auto">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Tax summary</p>
              <table className="mt-1 w-full min-w-[360px] border-collapse text-left tabular-nums">
                <thead className="text-[11px] text-ink-soft">
                  <tr className="border-b border-brand-900/10">
                    <th className="py-1 pr-2">Rate</th>
                    <th className="py-1 pr-2 text-right">Taxable</th>
                    {intra ? (<><th className="py-1 pr-2 text-right">CGST</th><th className="py-1 pr-2 text-right">SGST/UTGST</th></>) : <th className="py-1 pr-2 text-right">IGST</th>}
                  </tr>
                </thead>
                <tbody>
                  {totals.taxByRate.map((r) => (
                    <tr key={r.rateBp} className="border-b border-brand-900/5">
                      <td className="py-1 pr-2">{formatRate(r.rateBp)}</td>
                      <td className="py-1 pr-2 text-right">{formatINR(r.taxable)}</td>
                      {intra ? (<><td className="py-1 pr-2 text-right">{formatINR(r.cgst)}</td><td className="py-1 pr-2 text-right">{formatINR(r.sgst)}</td></>) : <td className="py-1 pr-2 text-right">{formatINR(r.igst)}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Amount in words</p>
            <p className="mt-1 font-semibold">{amountInWords(totals.total)}</p>
          </div>
        </div>
        <dl className="space-y-1 tabular-nums">
          <div className="flex justify-between"><dt className="text-ink-soft">Gross</dt><dd>{formatINR(totals.gross)}</dd></div>
          {totals.discount > 0 && <div className="flex justify-between"><dt className="text-ink-soft">Discount</dt><dd>− {formatINR(totals.discount)}</dd></div>}
          <div className="flex justify-between"><dt className="text-ink-soft">Taxable value</dt><dd>{formatINR(totals.taxable)}</dd></div>
          {intra ? (
            <>
              <div className="flex justify-between"><dt className="text-ink-soft">CGST</dt><dd>{formatINR(totals.cgst)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">SGST/UTGST</dt><dd>{formatINR(totals.sgst)}</dd></div>
            </>
          ) : (
            <div className="flex justify-between"><dt className="text-ink-soft">IGST</dt><dd>{formatINR(totals.igst)}</dd></div>
          )}
          {data.roundOff && <div className="flex justify-between"><dt className="text-ink-soft">Round off</dt><dd>{totals.roundOff >= 0 ? '+' : '−'} {formatINR(Math.abs(totals.roundOff))}</dd></div>}
          <div className="flex justify-between border-t-2 border-brand-700 pt-2 text-base font-bold"><dt>Total</dt><dd>{formatINR(totals.total)}</dd></div>
        </dl>
      </div>

      {(hasBank || data.paymentTerms || data.notes) && (
        <div className="grid gap-4 border-t border-brand-900/10 p-5 sm:grid-cols-2 md:px-6">
          {hasBank && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Bank details</p>
              {data.bank.accountName && <p>A/c name: {data.bank.accountName}</p>}
              {data.bank.bankName && <p>Bank: {data.bank.bankName}</p>}
              {data.bank.accountNo && <p>A/c no.: {data.bank.accountNo}</p>}
              {data.bank.ifsc && <p>IFSC: {data.bank.ifsc.toUpperCase()}</p>}
              {data.bank.branch && <p>Branch: {data.bank.branch}</p>}
            </div>
          )}
          <div className="space-y-2">
            {data.paymentTerms && (<div><p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{L.paymentTerms}</p><p className="whitespace-pre-line">{data.paymentTerms}</p></div>)}
            {data.notes && (<div><p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Notes</p><p className="whitespace-pre-line">{data.notes}</p></div>)}
          </div>
        </div>
      )}

      {extra}

      <div className="grid gap-4 border-t border-brand-900/10 p-5 sm:grid-cols-[1fr_auto] md:px-6">
        <div>
          {data.declaration && (<><p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Declaration</p><p className="whitespace-pre-line text-ink-soft">{data.declaration}</p></>)}
        </div>
        <div className="text-right">
          <p className="font-semibold">For {data.seller.name || 'your business'}</p>
          <p className="mt-10 border-t border-brand-900/20 pt-1 text-ink-soft">Authorised signatory</p>
        </div>
      </div>
    </article>
  );
}
