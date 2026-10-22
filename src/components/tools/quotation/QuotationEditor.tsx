'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { formatINR } from '@/lib/money';
import { templateHref } from '@/lib/templates/ids';
import { writeQuotationAsTaxInvoice } from '@/components/templates/storage';
import { RATE_PRESETS } from '../RatePicker';
import { safeStorage } from '../ui';
import { Input, PartyFields, Section, StateSelect, TextArea } from '../invoice/InvoiceEditor';
import InvoicePreview from '../invoice/InvoicePreview';
import {
  DEFAULT_DECLARATION, UNITS, addDays, computeInvoice, emptyInvoice, emptyItem, formatDate, normaliseInvoice, sampleInvoice,
  todayIso, uid, type InvoiceData, type Item, type Party,
} from '../invoice/model';

// Storage keys. The sales invoice keys must match InvoiceEditor (variant "sales").
const KEYS = {
  drafts: 'ee-tools-quotation-drafts',
  series: 'ee-tools-quotation-series',
  salesDrafts: 'ee-tools-sales-drafts',
  salesSeries: 'ee-tools-sales-series',
};

export const QUOTATION_DECLARATION = 'This is a quotation, not a tax invoice. A tax invoice will be issued at the time of supply.';

export interface QuotationData extends InvoiceData {
  deliveryTerms: string;
  warranty: string;
  freight: string;
}

interface Series { prefix: string; next: number }
interface Draft { id: string; savedAt: string; data: QuotationData }

function financialYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  const start = m >= 4 ? y : y - 1;
  return `${String(start % 100).padStart(2, '0')}-${String((start + 1) % 100).padStart(2, '0')}`;
}
const seriesNumber = (s: Series) => `${s.prefix}${String(s.next).padStart(4, '0')}`;

export function emptyQuotation(): QuotationData {
  return { ...emptyInvoice(), declaration: QUOTATION_DECLARATION, deliveryTerms: '', warranty: '', freight: '' };
}

function normaliseQuotation(raw: unknown): QuotationData | null {
  const inv = normaliseInvoice(raw);
  if (!inv) return null;
  const r = raw as Partial<QuotationData>;
  const s = (v: unknown) => (typeof v === 'string' ? v : '');
  return { ...inv, deliveryTerms: s(r.deliveryTerms), warranty: s(r.warranty), freight: s(r.freight) };
}

/** Builds a sales-invoice draft (InvoiceEditor "sales" format) from a quotation. */
export function quotationToInvoice(q: QuotationData, today: string, invoiceNo: string): InvoiceData {
  const { deliveryTerms, warranty, freight, ...inv } = q;
  const ref = q.invoiceNo ? `Against quotation ${q.invoiceNo}${q.invoiceDate ? ` dated ${formatDate(q.invoiceDate)}` : ''}.` : '';
  const terms = [deliveryTerms && `Delivery: ${deliveryTerms}`, warranty && `Warranty: ${warranty}`, freight && `Freight: ${freight}`].filter(Boolean).join('\n');
  return {
    ...inv,
    items: q.items.map((it) => ({ ...it, id: uid() })),
    invoiceNo,
    invoiceDate: today,
    dueDate: addDays(today, 30),
    notes: [ref, q.notes, terms].filter(Boolean).join('\n'),
    declaration: DEFAULT_DECLARATION,
  };
}

const TERMS_LABEL: [keyof Pick<QuotationData, 'paymentTerms' | 'deliveryTerms' | 'warranty' | 'freight'>, string, string][] = [
  ['paymentTerms', 'Payment terms', 'e.g. 50% advance, balance before dispatch.'],
  ['deliveryTerms', 'Delivery', 'e.g. Within 10 days of purchase order.'],
  ['warranty', 'Warranty', 'e.g. 12 months against manufacturing defects.'],
  ['freight', 'Freight', 'e.g. Ex-works; freight extra at actuals.'],
];

export default function QuotationEditor() {
  const [data, setData] = useState<QuotationData>(emptyQuotation);
  const [status, setStatus] = useState('');
  const [series, setSeries] = useState<Series>({ prefix: 'QT/26-27/', next: 1 });
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [converted, setConverted] = useState(false);
  const loaded = useRef(false);

  const calc = useMemo(() => computeInvoice(data), [data]);
  const warnings = useMemo(() => calc.warnings.map((w) => w
    .replace('Invoice number', 'Quotation number').replace('Invoice date', 'Quotation date')
    .replace('Buyer name', 'Customer name').replace(/buyer/g, 'customer')
    .replace('Seller name', 'Your business name').replace(/the seller/g, 'your')), [calc.warnings]);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const today = todayIso();
    const s = safeStorage.get<Series | null>(KEYS.series, null);
    const ser: Series = s && typeof s.prefix === 'string' && Number.isInteger(s.next) && s.next > 0 ? s : { prefix: `QT/${financialYear(today)}/`, next: 1 };
    setSeries(ser);
    const d = safeStorage.get<Draft[]>(KEYS.drafts, []);
    setDrafts(Array.isArray(d) ? d.filter((x) => x && x.id && x.data) : []);
    setData((cur) => ({ ...cur, invoiceDate: cur.invoiceDate || today, dueDate: cur.dueDate || addDays(today, 15), invoiceNo: cur.invoiceNo || seriesNumber(ser) }));
  }, []);

  const patch = (p: Partial<QuotationData>) => { setConverted(false); setData((d) => ({ ...d, ...p })); };
  const setItem = (id: string, p: Partial<Item>) => patch({ items: data.items.map((it) => (it.id === id ? { ...it, ...p } : it)) });
  const addItem = () => patch({ items: [...data.items, emptyItem()] });
  const removeItem = (id: string) => patch({ items: data.items.length > 1 ? data.items.filter((x) => x.id !== id) : [emptyItem()] });
  const setBuyer = (b: Party) => setData((d) => {
    const follow = !d.placeOfSupply || d.placeOfSupply === d.buyer.stateCode;
    return { ...d, buyer: b, placeOfSupply: follow ? b.stateCode : d.placeOfSupply };
  });

  function announce(msg: string) {
    setStatus('');
    requestAnimationFrame(() => setStatus(msg));
  }

  function bumpSeries(no: string) {
    if (!no.startsWith(series.prefix)) return series;
    const n = Number(no.slice(series.prefix.length));
    if (!Number.isInteger(n) || n < series.next) return series;
    const s = { ...series, next: n + 1 };
    setSeries(s);
    safeStorage.set(KEYS.series, s);
    return s;
  }

  function loadSample() {
    const today = todayIso();
    const s = sampleInvoice(today);
    setData({
      ...s,
      invoiceNo: seriesNumber(series),
      dueDate: addDays(today, 15),
      showBank: false,
      paymentTerms: '50% advance with purchase order, balance before dispatch.',
      notes: 'Prices are for the quantities quoted. Rates may change for different quantities.',
      declaration: QUOTATION_DECLARATION,
      deliveryTerms: 'Dispatch within 7 working days of confirmed order.',
      warranty: 'As per manufacturer warranty.',
      freight: 'Freight extra at actuals; to be paid by customer.',
    });
    setDraftId(null);
    setConverted(false);
    announce('Sample quotation loaded.');
  }

  function saveDraft() {
    const id = draftId ?? uid('q');
    const list = [{ id, savedAt: new Date().toISOString(), data }, ...drafts.filter((d) => d.id !== id)].slice(0, 50);
    if (!safeStorage.set(KEYS.drafts, list)) return announce('Could not save: browser storage is unavailable or full.');
    setDrafts(list);
    setDraftId(id);
    bumpSeries(data.invoiceNo);
    announce('Quotation draft saved in this browser.');
  }

  function newQuotation() {
    const today = todayIso();
    const s = bumpSeries(data.invoiceNo);
    setData({ ...emptyQuotation(), seller: data.seller, invoiceDate: today, dueDate: addDays(today, 15), invoiceNo: seriesNumber(s), paymentTerms: data.paymentTerms, deliveryTerms: data.deliveryTerms, warranty: data.warranty, freight: data.freight });
    setDraftId(null);
    setConverted(false);
    announce('Started a new quotation. Your business details and terms were kept.');
  }

  function openDraft(d: Draft) {
    const n = normaliseQuotation(d.data);
    if (!n) return;
    setData(n);
    setDraftId(d.id);
    setConverted(false);
    announce(`Quotation ${n.invoiceNo || ''} opened.`);
  }

  function deleteDraft(id: string) {
    const list = drafts.filter((d) => d.id !== id);
    setDrafts(list);
    safeStorage.set(KEYS.drafts, list);
    if (draftId === id) setDraftId(null);
  }

  function convertToInvoice() {
    if (!calc.lineInputs.length) return announce('Add at least one complete line item before converting.');
    // Writes into the GST tax invoice template's draft (ee-tpl-gst-tax-invoice); any invoice already open
    // there is kept in that template's saved drafts list first.
    if (!writeQuotationAsTaxInvoice(data)) return announce('Could not save: browser storage is unavailable or full.');
    setConverted(true);
    announce('Converted. Open the GST tax invoice template to finish the invoice.');
  }

  function print() {
    const prev = document.title;
    document.title = `Quotation-${(data.invoiceNo || 'quotation').replace(/[^\w-]+/g, '-')}`;
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
    setTimeout(restore, 1000);
  }

  const hasTerms = !!(data.deliveryTerms || data.warranty || data.freight);
  const termsBlock = hasTerms ? (
    <div className="grid gap-3 border-t border-brand-900/10 p-5 sm:grid-cols-3 md:px-6">
      {TERMS_LABEL.slice(1).map(([k, label]) => data[k] ? (
        <div key={k}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">{label}</p>
          <p className="whitespace-pre-line">{data[k]}</p>
        </div>
      ) : null)}
    </div>
  ) : null;

  return (
    <div className="space-y-6">
      <div className="no-print rounded-3xl border-2 border-amber-500 bg-amber-300/20 p-5 md:p-6" role="note">
        <p className="font-display text-lg font-bold text-ink">A quotation is not a tax invoice.</p>
        <p className="mt-1 text-[15px] text-ink-soft">
          It is an offer of price and terms. No GST is charged on a quotation and it cannot be used to claim input tax credit
          or to generate an e-way bill. Issue a tax invoice when the goods are supplied.
        </p>
      </div>

      <div className="no-print card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <p className="text-sm text-ink-soft"><strong className="text-ink">Data stays in your browser; nothing is uploaded.</strong> Drafts and your quotation number series are saved only in this browser.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
          <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          <button type="button" className="btn-ghost" onClick={newQuotation}>New</button>
          <button type="button" className="btn-ghost" onClick={convertToInvoice}>Convert to invoice</button>
          <button type="button" className="btn-primary" onClick={print}>Print / Save as PDF</button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
      {status && <p className="no-print -mt-3 text-sm font-medium text-brand-700" aria-hidden>{status}</p>}
      {converted && (
        <p className="no-print -mt-3 text-sm">
          <Link href={templateHref('gst-tax-invoice')} className="font-semibold text-brand-700 underline">Open the GST tax invoice template →</Link>
        </p>
      )}

      {drafts.length > 0 && (
        <details className="no-print card p-4 md:p-5">
          <summary className="cursor-pointer font-semibold text-ink">Saved quotations ({drafts.length})</summary>
          <ul className="mt-3 divide-y divide-brand-900/10">
            {drafts.map((d) => {
              const t = computeInvoice(normaliseInvoice(d.data) ?? emptyInvoice()).totals.total;
              return (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                  <span>
                    <span className="font-semibold text-ink">{d.data.invoiceNo || 'No number'}</span>
                    <span className="text-ink-soft"> · {d.data.buyer?.name || 'No customer'} · {formatINR(t)} · {formatDate(d.data.invoiceDate)}</span>
                    {draftId === d.id && <span className="chip ml-2">Open</span>}
                  </span>
                  <span className="flex gap-3">
                    <button type="button" className="font-semibold text-brand-700 underline" onClick={() => openDraft(d)}>Open</button>
                    <button type="button" className="font-semibold text-ink-soft underline" onClick={() => deleteDraft(d.id)} aria-label={`Delete quotation ${d.data.invoiceNo}`}>Delete</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </details>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="no-print space-y-5" onSubmit={(e) => e.preventDefault()} noValidate aria-label="Quotation details">
          <Section title="Quotation details">
            <div className="grid gap-4 rounded-2xl bg-cream p-4 sm:grid-cols-[1fr_120px_auto] sm:items-end">
              <Input id="qt-prefix" label="Number series prefix" value={series.prefix} onChange={(v) => { const s = { ...series, prefix: v }; setSeries(s); safeStorage.set(KEYS.series, s); }} hint="e.g. QT/26-27/" />
              <Input id="qt-next" label="Next number" inputMode="numeric" value={String(series.next)} onChange={(v) => { const s = { ...series, next: Number(v.replace(/\D/g, '')) || 1 }; setSeries(s); safeStorage.set(KEYS.series, s); }} />
              <button type="button" className="btn-ghost" onClick={() => patch({ invoiceNo: seriesNumber(series) })}>Use {seriesNumber(series)}</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Input id="qt-no" label="Quotation number" value={data.invoiceNo} onChange={(v) => patch({ invoiceNo: v })} />
              <Input id="qt-date" type="date" label="Quotation date" value={data.invoiceDate} onChange={(v) => patch({ invoiceDate: v })} />
              <Input id="qt-valid" type="date" label="Valid until" value={data.dueDate} onChange={(v) => patch({ dueDate: v })} />
            </div>
          </Section>

          <Section title="Your business">
            <PartyFields id="qt-seller" value={data.seller} onChange={(p) => patch({ seller: p })} gstinError={calc.fieldErrors.sellerGstin} />
          </Section>

          <Section title="Customer">
            <PartyFields id="qt-buyer" value={data.buyer} onChange={(b) => { setConverted(false); setBuyer(b); }} gstinError={calc.fieldErrors.buyerGstin} gstinHint="Leave empty if the customer is unregistered." />
            <StateSelect id="qt-pos" label="Place of supply" value={data.placeOfSupply} onChange={(v) => patch({ placeOfSupply: v })} hint="Decides whether the quote shows CGST + SGST or IGST." />
            <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700" aria-live="polite">
              {calc.supply === 'intra' ? 'Intra-state — CGST + SGST/UTGST' : 'Inter-state — IGST'}
            </p>
          </Section>

          <Section title="Line items" aside={<button type="button" className="btn-ghost !py-2" onClick={addItem}>+ Add line</button>}>
            <datalist id="qt-units">{UNITS.map((u) => <option key={u} value={u} />)}</datalist>
            {data.items.map((it, i) => {
              const e = calc.itemErrors[it.id] ?? {};
              const p = `qt-item-${it.id}`;
              return (
                <div key={it.id} className="rounded-2xl border border-brand-900/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">Line {i + 1}</p>
                    <button type="button" className="text-sm font-semibold text-red-600 underline" onClick={() => removeItem(it.id)} aria-label={`Remove line ${i + 1}`}>Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-6">
                    <Input id={`${p}-desc`} className="sm:col-span-4" label="Description" value={it.description} onChange={(v) => setItem(it.id, { description: v })} error={e.description} />
                    <Input id={`${p}-hsn`} className="sm:col-span-2" label="HSN/SAC" value={it.hsn} onChange={(v) => setItem(it.id, { hsn: v.replace(/\D/g, '').slice(0, 8) })} inputMode="numeric" />
                    <Input id={`${p}-qty`} className="sm:col-span-2" label="Qty" value={it.qty} onChange={(v) => setItem(it.id, { qty: v })} error={e.qty} inputMode="decimal" />
                    <Input id={`${p}-unit`} className="sm:col-span-2" label="Unit" value={it.unit} onChange={(v) => setItem(it.id, { unit: v.toUpperCase() })} list="qt-units" />
                    <Input id={`${p}-rate`} className="sm:col-span-2" label="Rate (₹, excl. GST)" value={it.rate} onChange={(v) => setItem(it.id, { rate: v })} error={e.rate} inputMode="decimal" />
                    <Input id={`${p}-disc`} className="sm:col-span-3" label="Discount %" value={it.discount} onChange={(v) => setItem(it.id, { discount: v })} error={e.discount} inputMode="decimal" />
                    <div className="sm:col-span-3">
                      <label htmlFor={`${p}-gst`} className="label">GST rate</label>
                      <select id={`${p}-gst`} className="input" value={it.gst} onChange={(ev) => setItem(it.id, { gst: ev.target.value })}>
                        {RATE_PRESETS.map((r) => <option key={r} value={r}>{r}%</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={data.roundOff} onChange={(e) => patch({ roundOff: e.target.checked })} />
              Round off total to the nearest rupee
            </label>
          </Section>

          <Section title="Terms and notes">
            {TERMS_LABEL.map(([k, label, ph]) => (
              <TextArea key={k} id={`qt-${k}`} label={label} value={data[k]} onChange={(v) => patch({ [k]: v } as Partial<QuotationData>)} placeholder={ph} />
            ))}
            <TextArea id="qt-notes" label="Notes" value={data.notes} onChange={(v) => patch({ notes: v })} />
            <TextArea id="qt-decl" label="Statement on the quotation" value={data.declaration} onChange={(v) => patch({ declaration: v })} rows={2} />
          </Section>
        </form>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          {warnings.length > 0 && (
            <div className="no-print rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm" aria-live="polite">
              <p className="font-semibold text-ink">Before you print</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink-soft">{warnings.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          )}
          <p className="no-print text-sm font-semibold text-ink">
            Live preview · Quoted total <span className="tabular-nums text-brand-700" aria-live="polite">{formatINR(calc.totals.total)}</span>
          </p>
          <InvoicePreview
            data={data}
            calc={calc}
            title="Quotation"
            ariaLabel="Quotation preview"
            labels={{ number: 'Quotation no.', date: 'Date', due: 'Valid until', billTo: 'Quotation for' }}
            extra={termsBlock}
          />
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={print}>Print / Save as PDF</button>
            <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          </div>
          <p className="no-print text-xs leading-5 text-ink-faint">
            In the print dialog, choose “Save as PDF”. GST shown is an estimate based on the rates you selected; the tax
            invoice issued at supply is the document that counts.
          </p>
        </div>
      </div>
    </div>
  );
}
