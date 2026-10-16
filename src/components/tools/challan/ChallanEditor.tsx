'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { amountInWords, formatINR, formatRate } from '@/lib/money';
import { RATE_PRESETS } from '../RatePicker';
import { safeStorage } from '../ui';
import { Input, PartyFields, Section, StateSelect, TextArea } from '../invoice/InvoiceEditor';
import { UNITS, emptyItem, formatDate, todayIso, uid, type Item, type Party, type Transport } from '../invoice/model';
import { stateLabel } from '../invoice/states';
import {
  COPY_LABELS, REASONS, computeChallan, emptyChallan, normaliseChallan, reasonLabel, sampleChallan,
  type ChallanCalc, type ChallanData, type CopyChoice, type CopyKey, type Reason,
} from './model';

const KEYS = { drafts: 'ee-tools-challan-drafts', series: 'ee-tools-challan-series' };
const MODE_LABEL: Record<string, string> = { road: 'Road', rail: 'Rail', air: 'Air', ship: 'Ship' };

interface Series { prefix: string; next: number }
interface Draft { id: string; savedAt: string; data: ChallanData }

function financialYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  const start = m >= 4 ? y : y - 1;
  return `${String(start % 100).padStart(2, '0')}-${String((start + 1) % 100).padStart(2, '0')}`;
}
const seriesNumber = (s: Series) => `${s.prefix}${String(s.next).padStart(4, '0')}`;
const fmtQty = (milli: number) => (milli / 1000).toLocaleString('en-IN', { maximumFractionDigits: 3 });

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

function ChallanPreview({ data, calc, copy, className = '' }: { data: ChallanData; calc: ChallanCalc; copy: CopyKey; className?: string }) {
  const { totals, supply } = calc;
  const intra = supply === 'intra';
  const t = data.transport;
  const tax = data.showTax && totals.tax > 0;
  return (
    <article className={`print-area card overflow-hidden bg-white text-[12.5px] leading-5 text-ink ${className}`} aria-label={`Delivery challan preview — ${COPY_LABELS[copy]}`}>
      <div className="border-b-4 border-brand-700 p-5 md:p-6">
        <p className="mb-2 text-right text-[11px] font-bold uppercase tracking-wider text-brand-700">{COPY_LABELS[copy]}</p>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-display text-xl font-bold text-brand-800">{data.consignor.name || 'Your business name'}</p>
            {data.consignor.address && <p className="mt-1 max-w-sm whitespace-pre-line text-ink-soft">{data.consignor.address}</p>}
            <p className="text-ink-soft">GSTIN: <span className="font-semibold text-ink">{data.consignor.gstin.toUpperCase() || '—'}</span></p>
            {data.consignor.stateCode && <p className="text-ink-soft">State: {stateLabel(data.consignor.stateCode)}</p>}
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold uppercase tracking-wide text-ink">Delivery Challan</p>
            <dl className="mt-1 grid grid-cols-[auto_auto] justify-end gap-x-3 text-ink-soft">
              <dt>Challan no.</dt><dd className="font-semibold text-ink">{data.challanNo || '—'}</dd>
              <dt>Date</dt><dd className="font-semibold text-ink">{formatDate(data.challanDate) || '—'}</dd>
              <dt>Reason</dt><dd className="font-semibold text-ink">{reasonLabel(data)}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-b border-brand-900/10 p-5 sm:grid-cols-2 md:px-6">
        <PartyBlock title="Consignee" p={data.consignee} />
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Place of supply</p>
          <p className="mt-1 font-semibold">{stateLabel(data.placeOfSupply || data.consignee.stateCode) || '—'}</p>
          <p className="text-ink-soft">{intra ? 'Movement within the state' : 'Inter-state movement'}</p>
        </div>
      </div>

      {(t.mode || t.vehicleNo || t.transporter || t.distanceKm) && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 border-b border-brand-900/10 px-5 py-3 text-ink-soft md:px-6">
          {t.mode && <span>Mode: <span className="font-semibold text-ink">{MODE_LABEL[t.mode]}</span></span>}
          {t.vehicleNo && <span>Vehicle no.: <span className="font-semibold text-ink">{t.vehicleNo.toUpperCase()}</span></span>}
          {t.transporter && <span>Transporter: <span className="font-semibold text-ink">{t.transporter}</span></span>}
          {t.distanceKm && <span>Approx. distance: <span className="font-semibold text-ink">{t.distanceKm} km</span></span>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="bg-brand-50 text-[11px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-3 py-2">#</th>
              <th className="px-3 py-2">Description</th>
              <th className="px-3 py-2">HSN</th>
              <th className="px-3 py-2 text-right">Qty</th>
              <th className="px-3 py-2 text-right">Rate</th>
              <th className="px-3 py-2 text-right">Taxable value</th>
              {tax && <th className="px-3 py-2 text-right">GST</th>}
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {totals.lines.length === 0 && (
              <tr><td colSpan={tax ? 7 : 6} className="px-3 py-6 text-center text-ink-faint">Add items to see them here.</td></tr>
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
                  <td className="px-3 py-2 text-right">{formatINR(l.taxable)}</td>
                  {tax && <td className="px-3 py-2 text-right">{formatRate(input.gstBp)}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-5 border-t border-brand-900/10 p-5 md:grid-cols-[1fr_240px] md:px-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Value in words</p>
          <p className="mt-1 font-semibold">{amountInWords(totals.total)}</p>
        </div>
        <dl className="space-y-1 tabular-nums">
          <div className="flex justify-between"><dt className="text-ink-soft">Taxable value</dt><dd>{formatINR(totals.taxable)}</dd></div>
          {tax && (intra ? (
            <>
              <div className="flex justify-between"><dt className="text-ink-soft">CGST</dt><dd>{formatINR(totals.cgst)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">SGST/UTGST</dt><dd>{formatINR(totals.sgst)}</dd></div>
            </>
          ) : (
            <div className="flex justify-between"><dt className="text-ink-soft">IGST</dt><dd>{formatINR(totals.igst)}</dd></div>
          ))}
          <div className="flex justify-between border-t-2 border-brand-700 pt-2 text-base font-bold"><dt>Total value</dt><dd>{formatINR(totals.total)}</dd></div>
        </dl>
      </div>

      {data.notes && (
        <div className="border-t border-brand-900/10 p-5 md:px-6">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-faint">Notes</p>
          <p className="whitespace-pre-line">{data.notes}</p>
        </div>
      )}

      <div className="grid gap-4 border-t border-brand-900/10 p-5 sm:grid-cols-3 md:px-6">
        <div className="sm:col-span-1">
          {data.declaration && <p className="whitespace-pre-line text-ink-soft">{data.declaration}</p>}
        </div>
        <div className="text-center">
          <p className="font-semibold">Received by</p>
          <p className="mt-10 border-t border-brand-900/20 pt-1 text-ink-soft">Consignee signature</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">For {data.consignor.name || 'your business'}</p>
          <p className="mt-10 border-t border-brand-900/20 pt-1 text-ink-soft">Authorised signatory</p>
        </div>
      </div>
    </article>
  );
}

const HINT_STYLE: Record<ChallanCalc['ewbHint']['level'], string> = {
  required: 'border-red-400 bg-red-50',
  likely: 'border-amber-500 bg-amber-300/20',
  check: 'border-brand-500 bg-brand-50',
};

export default function ChallanEditor() {
  const [data, setData] = useState<ChallanData>(emptyChallan);
  const [status, setStatus] = useState('');
  const [series, setSeries] = useState<Series>({ prefix: 'DC/26-27/', next: 1 });
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const loaded = useRef(false);
  const calc = useMemo(() => computeChallan(data), [data]);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const today = todayIso();
    const s = safeStorage.get<Series | null>(KEYS.series, null);
    const ser: Series = s && typeof s.prefix === 'string' && Number.isInteger(s.next) && s.next > 0 ? s : { prefix: `DC/${financialYear(today)}/`, next: 1 };
    setSeries(ser);
    const d = safeStorage.get<Draft[]>(KEYS.drafts, []);
    setDrafts(Array.isArray(d) ? d.filter((x) => x && x.id && x.data) : []);
    setData((cur) => ({ ...cur, challanDate: cur.challanDate || today, challanNo: cur.challanNo || seriesNumber(ser) }));
  }, []);

  const patch = (p: Partial<ChallanData>) => setData((d) => ({ ...d, ...p }));
  const setItem = (id: string, p: Partial<Item>) => setData((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...p } : it)) }));
  const addItem = () => setData((d) => ({ ...d, items: [...d.items, emptyItem()] }));
  const removeItem = (id: string) => setData((d) => ({ ...d, items: d.items.length > 1 ? d.items.filter((x) => x.id !== id) : [emptyItem()] }));
  const setTransport = (p: Partial<Transport>) => setData((d) => ({ ...d, transport: { ...d.transport, ...p } }));
  const setConsignee = (c: Party) => setData((d) => {
    const follow = !d.placeOfSupply || d.placeOfSupply === d.consignee.stateCode;
    return { ...d, consignee: c, placeOfSupply: follow ? c.stateCode : d.placeOfSupply };
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
    setData({ ...sampleChallan(todayIso()), challanNo: seriesNumber(series) });
    setDraftId(null);
    announce('Sample challan loaded.');
  }

  function saveDraft() {
    const id = draftId ?? uid('c');
    const list = [{ id, savedAt: new Date().toISOString(), data }, ...drafts.filter((d) => d.id !== id)].slice(0, 50);
    if (!safeStorage.set(KEYS.drafts, list)) return announce('Could not save: browser storage is unavailable or full.');
    setDrafts(list);
    setDraftId(id);
    bumpSeries(data.challanNo);
    announce('Challan draft saved in this browser.');
  }

  function newChallan() {
    const s = bumpSeries(data.challanNo);
    setData({ ...emptyChallan(), consignor: data.consignor, challanDate: todayIso(), challanNo: seriesNumber(s) });
    setDraftId(null);
    announce('Started a new challan. Your consignor details were kept.');
  }

  function openDraft(d: Draft) {
    const n = normaliseChallan(d.data);
    if (!n) return;
    setData(n);
    setDraftId(d.id);
    announce(`Challan ${n.challanNo || ''} opened.`);
  }

  function deleteDraft(id: string) {
    const list = drafts.filter((d) => d.id !== id);
    setDrafts(list);
    safeStorage.set(KEYS.drafts, list);
    if (draftId === id) setDraftId(null);
  }

  function print() {
    const prev = document.title;
    document.title = `Delivery-Challan-${(data.challanNo || 'challan').replace(/[^\w-]+/g, '-')}`;
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
    setTimeout(restore, 1000);
  }

  const copies: CopyKey[] = data.copy === 'all' ? ['original', 'duplicate', 'triplicate'] : [data.copy];

  return (
    <div className="space-y-6">
      <div className="no-print card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <p className="text-sm text-ink-soft"><strong className="text-ink">Data stays in your browser; nothing is uploaded.</strong> Drafts and your challan number series are saved only in this browser.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
          <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          <button type="button" className="btn-ghost" onClick={newChallan}>New</button>
          <button type="button" className="btn-primary" onClick={print}>Print / Save as PDF</button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
      {status && <p className="no-print -mt-3 text-sm font-medium text-brand-700" aria-hidden>{status}</p>}

      {drafts.length > 0 && (
        <details className="no-print card p-4 md:p-5">
          <summary className="cursor-pointer font-semibold text-ink">Saved challans ({drafts.length})</summary>
          <ul className="mt-3 divide-y divide-brand-900/10">
            {drafts.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                <span>
                  <span className="font-semibold text-ink">{d.data.challanNo || 'No number'}</span>
                  <span className="text-ink-soft"> · {d.data.consignee?.name || 'No consignee'} · {formatDate(d.data.challanDate)}</span>
                  {draftId === d.id && <span className="chip ml-2">Open</span>}
                </span>
                <span className="flex gap-3">
                  <button type="button" className="font-semibold text-brand-700 underline" onClick={() => openDraft(d)}>Open</button>
                  <button type="button" className="font-semibold text-ink-soft underline" onClick={() => deleteDraft(d.id)} aria-label={`Delete challan ${d.data.challanNo}`}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="no-print space-y-5" onSubmit={(e) => e.preventDefault()} noValidate aria-label="Delivery challan details">
          <Section title="Challan details">
            <div className="grid gap-4 rounded-2xl bg-cream p-4 sm:grid-cols-[1fr_120px_auto] sm:items-end">
              <Input id="dc-prefix" label="Number series prefix" value={series.prefix} onChange={(v) => { const s = { ...series, prefix: v }; setSeries(s); safeStorage.set(KEYS.series, s); }} hint="e.g. DC/26-27/" />
              <Input id="dc-next" label="Next number" inputMode="numeric" value={String(series.next)} onChange={(v) => { const s = { ...series, next: Number(v.replace(/\D/g, '')) || 1 }; setSeries(s); safeStorage.set(KEYS.series, s); }} />
              <button type="button" className="btn-ghost" onClick={() => patch({ challanNo: seriesNumber(series) })}>Use {seriesNumber(series)}</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="dc-no" label="Challan number" value={data.challanNo} onChange={(v) => patch({ challanNo: v })} maxLength={16} hint="Up to 16 characters, consecutive in the financial year." />
              <Input id="dc-date" type="date" label="Challan date" value={data.challanDate} onChange={(v) => patch({ challanDate: v })} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dc-reason" className="label">Reason for transport</label>
                <select id="dc-reason" className="input" value={data.reason} onChange={(e) => patch({ reason: e.target.value as Reason })}>
                  {REASONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>
              {data.reason === 'others' && (
                <Input id="dc-reason-other" label="Describe the reason" value={data.reasonOther} onChange={(v) => patch({ reasonOther: v })} />
              )}
            </div>
          </Section>

          <Section title="Consignor (sender)">
            <PartyFields id="dc-consignor" value={data.consignor} onChange={(p) => patch({ consignor: p })} gstinError={calc.fieldErrors.consignorGstin} />
          </Section>

          <Section title="Consignee (receiver)">
            <PartyFields id="dc-consignee" value={data.consignee} onChange={setConsignee} gstinError={calc.fieldErrors.consigneeGstin} gstinHint="Leave empty if the consignee is unregistered." />
            <StateSelect id="dc-pos" label="Place of supply" value={data.placeOfSupply} onChange={(v) => patch({ placeOfSupply: v })} hint="Usually the consignee's state." />
          </Section>

          <Section title="Items" aside={<button type="button" className="btn-ghost !py-2" onClick={addItem}>+ Add line</button>}>
            <datalist id="dc-units">{UNITS.map((u) => <option key={u} value={u} />)}</datalist>
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={data.showTax} onChange={(e) => patch({ showTax: e.target.checked })} />
              Show tax amounts (if applicable)
            </label>
            {data.items.map((it, i) => {
              const e = calc.itemErrors[it.id] ?? {};
              const p = `dc-item-${it.id}`;
              return (
                <div key={it.id} className="rounded-2xl border border-brand-900/10 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-bold text-ink">Line {i + 1}</p>
                    <button type="button" className="text-sm font-semibold text-red-600 underline" onClick={() => removeItem(it.id)} aria-label={`Remove line ${i + 1}`}>Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-6">
                    <Input id={`${p}-desc`} className="sm:col-span-4" label="Description" value={it.description} onChange={(v) => setItem(it.id, { description: v })} error={e.description} />
                    <Input id={`${p}-hsn`} className="sm:col-span-2" label="HSN" value={it.hsn} onChange={(v) => setItem(it.id, { hsn: v.replace(/\D/g, '').slice(0, 8) })} inputMode="numeric" />
                    <Input id={`${p}-qty`} className="sm:col-span-2" label="Qty" value={it.qty} onChange={(v) => setItem(it.id, { qty: v })} error={e.qty} inputMode="decimal" />
                    <Input id={`${p}-unit`} className="sm:col-span-2" label="Unit" value={it.unit} onChange={(v) => setItem(it.id, { unit: v.toUpperCase() })} list="dc-units" />
                    <Input id={`${p}-rate`} className="sm:col-span-2" label="Value per unit (₹)" value={it.rate} onChange={(v) => setItem(it.id, { rate: v })} error={e.rate} inputMode="decimal" />
                    {data.showTax && (
                      <div className="sm:col-span-2">
                        <label htmlFor={`${p}-gst`} className="label">GST rate</label>
                        <select id={`${p}-gst`} className="input" value={it.gst} onChange={(ev) => setItem(it.id, { gst: ev.target.value })}>
                          {RATE_PRESETS.map((r) => <option key={r} value={r}>{r}%</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-ink-faint">Value is the taxable value of the goods (for job work or transfers, use the value you would declare on the e-way bill).</p>
          </Section>

          <Section title="Transport details">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dc-mode" className="label">Mode</label>
                <select id="dc-mode" className="input" value={data.transport.mode} onChange={(e) => setTransport({ mode: e.target.value as Transport['mode'] })}>
                  <option value="">Not specified</option>
                  <option value="road">Road</option>
                  <option value="rail">Rail</option>
                  <option value="air">Air</option>
                  <option value="ship">Ship</option>
                </select>
              </div>
              <Input id="dc-vehicle" label="Vehicle number" value={data.transport.vehicleNo} onChange={(v) => setTransport({ vehicleNo: v.toUpperCase().replace(/\s+/g, '') })} placeholder="e.g. GJ03AB1234" autoCapitalize="characters" />
              <Input id="dc-transporter" label="Transporter" value={data.transport.transporter} onChange={(v) => setTransport({ transporter: v })} />
              <Input id="dc-dist" label="Approx. distance (km)" value={data.transport.distanceKm} onChange={(v) => setTransport({ distanceKm: v.replace(/\D/g, '').slice(0, 4) })} inputMode="numeric" />
            </div>
          </Section>

          <Section title="Notes and copies">
            <TextArea id="dc-notes" label="Notes" value={data.notes} onChange={(v) => patch({ notes: v })} placeholder="e.g. Goods to be returned after job work." />
            <TextArea id="dc-decl" label="Statement on the challan" value={data.declaration} onChange={(v) => patch({ declaration: v })} />
            <div>
              <label htmlFor="dc-copy" className="label">Copy label to print</label>
              <select id="dc-copy" className="input" value={data.copy} onChange={(e) => patch({ copy: e.target.value as CopyChoice })}>
                {(Object.keys(COPY_LABELS) as CopyKey[]).map((k) => <option key={k} value={k}>{COPY_LABELS[k]}</option>)}
                <option value="all">All three copies (3 pages)</option>
              </select>
            </div>
          </Section>
        </form>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className={`no-print rounded-2xl border-2 p-4 text-sm ${HINT_STYLE[calc.ewbHint.level]}`} aria-live="polite">
            <p className="font-semibold text-ink">E-way bill</p>
            <p className="mt-1 text-ink-soft">
              {calc.ewbHint.text} A delivery challan does not replace the e-way bill. Check with the{' '}
              <Link href="/tools/eway-bill-eligibility-checker" className="font-semibold text-brand-700 underline">eligibility checker</Link>.
            </p>
          </div>
          {calc.warnings.length > 0 && (
            <div className="no-print rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm">
              <p className="font-semibold text-ink">Before you print</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink-soft">{calc.warnings.map((w) => <li key={w}>{w}</li>)}</ul>
            </div>
          )}
          <p className="no-print text-sm font-semibold text-ink">
            Live preview · Total value <span className="tabular-nums text-brand-700">{formatINR(calc.totals.total)}</span>
          </p>
          {copies.map((c, i) => (
            <ChallanPreview key={c} data={data} calc={calc} copy={c} className={i < copies.length - 1 ? 'break-after-page' : ''} />
          ))}
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={print}>Print / Save as PDF</button>
            <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          </div>
          <p className="no-print text-xs leading-5 text-ink-faint">
            In the print dialog, choose “Save as PDF”. This challan is created in your browser; it is not an e-way bill.
          </p>
        </div>
      </div>
    </div>
  );
}
