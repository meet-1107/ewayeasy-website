'use client';
import { useEffect, useId, useMemo, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { formatINR, parseAmount, parseRate } from '@/lib/money';
import { RATE_PRESETS } from '../RatePicker';
import { safeStorage } from '../ui';
import InvoicePreview from './InvoicePreview';
import {
  UNITS, addDays, computeInvoice, emptyInvoice, emptyItem, formatDate, normaliseInvoice, sampleInvoice, todayIso, uid,
  type InvoiceData, type Item, type Party, type Transport,
} from './model';
import { GST_STATES } from './states';

export type Variant = 'gst' | 'sales';

const KEYS = {
  gstDraft: 'ee-tools-invoice-draft',
  salesDrafts: 'ee-tools-sales-drafts',
  series: 'ee-tools-sales-series',
  products: 'ee-tools-products',
};

interface Series { prefix: string; next: number }
interface Product { id: string; name: string; hsn: string; unit: string; rate: string; gst: string }
interface Draft { id: string; savedAt: string; data: InvoiceData }

function financialYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number);
  const start = m >= 4 ? y : y - 1;
  return `${String(start % 100).padStart(2, '0')}-${String((start + 1) % 100).padStart(2, '0')}`;
}
const seriesNumber = (s: Series) => `${s.prefix}${String(s.next).padStart(4, '0')}`;

/* ---------------- small form helpers ---------------- */

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  const id = useId();
  return (
    <section className="card space-y-4 p-5 md:p-6" aria-labelledby={id}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={id} className="font-display text-lg font-bold text-ink">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Input({
  id, label, value, onChange, error, hint, className = '', ...rest
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string | null; hint?: string; className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>) {
  const desc = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={desc}
        {...rest}
      />
      {error ? <p id={`${id}-err`} className="mt-1 text-xs font-medium text-red-600">{error}</p>
        : hint ? <p id={`${id}-hint`} className="mt-1 text-xs text-ink-faint">{hint}</p> : null}
    </div>
  );
}

export function TextArea({ id, label, value, onChange, rows = 2, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <textarea id={id} className="input" rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function StateSelect({ id, label, value, onChange, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; hint?: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)} aria-describedby={hint ? `${id}-hint` : undefined}>
        <option value="">Select state / UT</option>
        {GST_STATES.map((s) => <option key={s.code} value={s.code}>{s.code} — {s.name}</option>)}
      </select>
      {hint && <p id={`${id}-hint`} className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}

export function PartyFields({
  id, value, onChange, gstinError, gstinHint, stateLabel = 'State',
}: { id: string; value: Party; onChange: (p: Party) => void; gstinError?: string; gstinHint?: string; stateLabel?: string }) {
  const set = (k: keyof Party) => (v: string) => {
    const next = { ...value, [k]: k === 'gstin' ? v.toUpperCase() : v };
    // Fill the state from a valid-looking GSTIN when the state is still empty.
    if (k === 'gstin' && !value.stateCode && /^\d{2}/.test(v) && GST_STATES.some((s) => s.code === v.slice(0, 2))) {
      next.stateCode = v.slice(0, 2);
    }
    onChange(next);
  };
  return (
    <>
      <Input id={`${id}-name`} label="Name" value={value.name} onChange={set('name')} autoComplete="organization" />
      <TextArea id={`${id}-address`} label="Address" value={value.address} onChange={set('address')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id={`${id}-gstin`} label="GSTIN" value={value.gstin} onChange={set('gstin')} error={gstinError} hint={gstinHint} maxLength={15} autoCapitalize="characters" spellCheck={false} placeholder="e.g. 24ABCDE1234F1Z5" />
        <StateSelect id={`${id}-state`} label={stateLabel} value={value.stateCode} onChange={set('stateCode')} />
      </div>
    </>
  );
}

/* ---------------- main editor ---------------- */

export default function InvoiceEditor({ variant }: { variant: Variant }) {
  const isSales = variant === 'sales';
  const [data, setData] = useState<InvoiceData>(emptyInvoice);
  const [status, setStatus] = useState('');
  const [series, setSeries] = useState<Series>({ prefix: 'EE/26-27/', next: 1 });
  const [products, setProducts] = useState<Product[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [hasSavedDraft, setHasSavedDraft] = useState(false);
  const loaded = useRef(false);

  const calc = useMemo(() => computeInvoice(data), [data]);

  // Load browser-only state after mount (keeps static HTML and first client render identical).
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    const today = todayIso();
    if (isSales) {
      const s = safeStorage.get<Series | null>(KEYS.series, null);
      const ser: Series = s && typeof s.prefix === 'string' && Number.isInteger(s.next) && s.next > 0
        ? s : { prefix: `EE/${financialYear(today)}/`, next: 1 };
      setSeries(ser);
      const p = safeStorage.get<Product[]>(KEYS.products, []);
      setProducts(Array.isArray(p) ? p.filter((x) => x && typeof x.name === 'string') : []);
      const d = safeStorage.get<Draft[]>(KEYS.salesDrafts, []);
      setDrafts(Array.isArray(d) ? d.filter((x) => x && x.id && x.data) : []);
      setData((cur) => ({ ...cur, invoiceDate: cur.invoiceDate || today, dueDate: cur.dueDate || addDays(today, 30), invoiceNo: cur.invoiceNo || seriesNumber(ser) }));
    } else {
      const saved = normaliseInvoice(safeStorage.get<unknown>(KEYS.gstDraft, null));
      setHasSavedDraft(!!saved);
      setData((cur) => ({ ...cur, invoiceDate: cur.invoiceDate || today }));
    }
  }, [isSales]);

  /* ---------- updaters ---------- */
  const patch = (p: Partial<InvoiceData>) => setData((d) => ({ ...d, ...p }));
  const setItem = (id: string, p: Partial<Item>) => setData((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...p } : it)) }));
  const addItem = (it?: Partial<Item>) => setData((d) => {
    // Replace a single untouched blank line rather than leaving it behind.
    const blank = d.items.length === 1 && !d.items[0].description && !d.items[0].rate;
    const item = { ...emptyItem(), ...it, id: uid() };
    return { ...d, items: blank && it ? [item] : [...d.items, item] };
  });
  const removeItem = (id: string) => setData((d) => ({ ...d, items: d.items.length > 1 ? d.items.filter((x) => x.id !== id) : [emptyItem()] }));
  const setBuyer = (b: Party) => setData((d) => {
    // Keep place of supply following the buyer state unless the user changed it separately.
    const follow = !d.placeOfSupply || d.placeOfSupply === d.buyer.stateCode;
    return { ...d, buyer: b, placeOfSupply: follow ? b.stateCode : d.placeOfSupply };
  });
  const setTransport = (p: Partial<Transport>) => setData((d) => ({ ...d, transport: { ...d.transport, ...p } }));

  /* ---------- actions ---------- */
  function announce(msg: string) {
    setStatus('');
    requestAnimationFrame(() => setStatus(msg));
  }

  function loadSample() {
    const s = sampleInvoice(todayIso());
    if (isSales) {
      s.invoiceNo = seriesNumber(series);
      s.shipSame = false;
      s.shipTo = { name: 'Demo Traders — Godown (illustrative)', address: 'Gat No. 88, Chakan MIDC, Pune, Maharashtra 410501', gstin: '27PQRSX5678K1Z2', stateCode: '27' };
      s.transport = { mode: 'road', vehicleNo: 'GJ03AB1234', transporter: 'Sample Roadways (illustrative)', distanceKm: '720' };
    }
    setData(s);
    setDraftId(null);
    announce('Sample data loaded.');
  }

  function bumpSeries(invoiceNo: string) {
    if (!invoiceNo.startsWith(series.prefix)) return series;
    const n = Number(invoiceNo.slice(series.prefix.length));
    if (!Number.isInteger(n) || n < series.next) return series;
    const s = { ...series, next: n + 1 };
    setSeries(s);
    safeStorage.set(KEYS.series, s);
    return s;
  }

  function saveDraft() {
    if (isSales) {
      const id = draftId ?? uid('d');
      const entry: Draft = { id, savedAt: new Date().toISOString(), data };
      const list = [entry, ...drafts.filter((d) => d.id !== id)].slice(0, 50);
      if (!safeStorage.set(KEYS.salesDrafts, list)) return announce('Could not save: browser storage is unavailable or full.');
      setDrafts(list);
      setDraftId(id);
      bumpSeries(data.invoiceNo);
      announce('Draft saved in this browser.');
    } else {
      if (!safeStorage.set(KEYS.gstDraft, data)) return announce('Could not save: browser storage is unavailable or full.');
      setHasSavedDraft(true);
      announce('Draft saved in this browser.');
    }
  }

  function loadGstDraft() {
    const saved = normaliseInvoice(safeStorage.get<unknown>(KEYS.gstDraft, null));
    if (saved) { setData(saved); announce('Saved draft loaded.'); } else announce('No saved draft found.');
  }

  function clearGstDraft() {
    safeStorage.remove(KEYS.gstDraft);
    setHasSavedDraft(false);
    announce('Saved draft deleted from this browser.');
  }

  function newInvoice() {
    const today = todayIso();
    const fresh = emptyInvoice();
    fresh.invoiceDate = today;
    if (isSales) {
      fresh.dueDate = addDays(today, 30);
      fresh.invoiceNo = seriesNumber(series);
      // Keep the seller details — they rarely change between invoices.
      fresh.seller = data.seller;
    }
    setData(fresh);
    setDraftId(null);
    announce('Started a new invoice.');
  }

  function duplicate() {
    const s = bumpSeries(data.invoiceNo);
    const today = todayIso();
    setData((d) => ({
      ...d,
      items: d.items.map((it) => ({ ...it, id: uid() })),
      invoiceNo: seriesNumber(s),
      invoiceDate: today,
      dueDate: addDays(today, 30),
    }));
    setDraftId(null);
    announce('Invoice duplicated with the next number. Save it as a new draft if you want to keep it.');
  }

  function printInvoice() {
    const prev = document.title;
    const name = (data.invoiceNo || 'invoice').replace(/[^\w-]+/g, '-');
    document.title = `Invoice-${name}`;
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
    setTimeout(restore, 1000);
  }

  /* ---------- product catalogue ---------- */
  const [prod, setProd] = useState<Omit<Product, 'id'>>({ name: '', hsn: '', unit: 'NOS', rate: '', gst: '18' });
  const [prodErr, setProdErr] = useState<Partial<Record<'name' | 'rate', string>>>({});
  function addProduct() {
    const errs: typeof prodErr = {};
    if (!prod.name.trim()) errs.name = 'Enter a product name.';
    const r = parseAmount(prod.rate);
    if (r === null || r < 0) errs.rate = 'Enter a valid rate.';
    setProdErr(errs);
    if (Object.keys(errs).length || parseRate(prod.gst) === null) return;
    const list = [...products, { ...prod, id: uid('p'), name: prod.name.trim() }];
    setProducts(list);
    const ok = safeStorage.set(KEYS.products, list);
    setProd({ name: '', hsn: '', unit: prod.unit, rate: '', gst: prod.gst });
    announce(ok ? 'Product saved to your catalogue.' : 'Product added for this session (browser storage unavailable).');
  }
  function deleteProduct(id: string) {
    const list = products.filter((p) => p.id !== id);
    setProducts(list);
    safeStorage.set(KEYS.products, list);
  }
  function pickProduct(id: string) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    addItem({ description: p.name, hsn: p.hsn, unit: p.unit, rate: p.rate, gst: p.gst, qty: '1', discount: '' });
    announce(`${p.name} added to the invoice.`);
  }

  function deleteDraft(id: string) {
    const list = drafts.filter((d) => d.id !== id);
    setDrafts(list);
    safeStorage.set(KEYS.salesDrafts, list);
    if (draftId === id) setDraftId(null);
  }
  function openDraft(d: Draft) {
    const n = normaliseInvoice(d.data);
    if (!n) return;
    setData(n);
    setDraftId(d.id);
    announce(`Draft ${n.invoiceNo || ''} opened.`);
  }

  const supplyBadge = calc.supply === 'intra'
    ? 'Intra-state supply — CGST + SGST/UTGST'
    : 'Inter-state supply — IGST';

  /* ---------- render ---------- */
  return (
    <div className="space-y-6">
      {isSales && (
        <div className="no-print rounded-3xl border-2 border-amber-500 bg-amber-300/20 p-5 md:p-6" role="note">
          <p className="font-display text-lg font-bold text-ink">Creating a sales invoice does not create an e-way bill.</p>
          <p className="mt-1 text-[15px] text-ink-soft">
            Generate the e-way bill on the official portal (
            <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">ewaybillgst.gov.in</a>
            ) or in the E-Way Easy app.
          </p>
        </div>
      )}

      <div className="no-print card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">Data stays in your browser; nothing is uploaded.</strong> Drafts{isSales ? ', products and your number series' : ''} are saved only in this browser&apos;s local storage.
        </p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
          <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          {isSales && <button type="button" className="btn-ghost" onClick={duplicate}>Duplicate invoice</button>}
          <button type="button" className="btn-ghost" onClick={newInvoice}>New</button>
          <button type="button" className="btn-primary" onClick={printInvoice}>Print / Save as PDF</button>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
      {status && <p className="no-print -mt-3 text-sm font-medium text-brand-700" aria-hidden>{status}</p>}

      {!isSales && hasSavedDraft && (
        <div className="no-print flex flex-wrap items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 text-sm">
          <span className="text-ink">A saved draft is available in this browser.</span>
          <button type="button" className="font-semibold text-brand-700 underline" onClick={loadGstDraft}>Load draft</button>
          <button type="button" className="font-semibold text-ink-soft underline" onClick={clearGstDraft}>Delete draft</button>
        </div>
      )}

      {isSales && drafts.length > 0 && (
        <details className="no-print card p-4 md:p-5">
          <summary className="cursor-pointer font-semibold text-ink">Saved drafts ({drafts.length})</summary>
          <ul className="mt-3 divide-y divide-brand-900/10">
            {drafts.map((d) => {
              const t = computeInvoice(normaliseInvoice(d.data) ?? emptyInvoice()).totals.total;
              return (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                  <span>
                    <span className="font-semibold text-ink">{d.data.invoiceNo || 'No number'}</span>
                    <span className="text-ink-soft"> · {d.data.buyer?.name || 'No buyer'} · {formatINR(t)} · {formatDate(d.data.invoiceDate)}</span>
                    {draftId === d.id && <span className="chip ml-2">Open</span>}
                  </span>
                  <span className="flex gap-3">
                    <button type="button" className="font-semibold text-brand-700 underline" onClick={() => openDraft(d)}>Open</button>
                    <button type="button" className="font-semibold text-ink-soft underline" onClick={() => deleteDraft(d.id)} aria-label={`Delete draft ${d.data.invoiceNo}`}>Delete</button>
                  </span>
                </li>
              );
            })}
          </ul>
        </details>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="no-print space-y-5" onSubmit={(e) => e.preventDefault()} noValidate aria-label="Invoice details">
          <Section title="Invoice details">
            {isSales && (
              <div className="grid gap-4 rounded-2xl bg-cream p-4 sm:grid-cols-[1fr_120px_auto] sm:items-end">
                <Input id="inv-prefix" label="Number series prefix" value={series.prefix} onChange={(v) => { const s = { ...series, prefix: v }; setSeries(s); safeStorage.set(KEYS.series, s); }} hint="e.g. EE/26-27/" />
                <Input id="inv-next" label="Next number" inputMode="numeric" value={String(series.next)} onChange={(v) => { const n = Number(v.replace(/\D/g, '')) || 1; const s = { ...series, next: n }; setSeries(s); safeStorage.set(KEYS.series, s); }} />
                <button type="button" className="btn-ghost" onClick={() => patch({ invoiceNo: seriesNumber(series) })}>Use {seriesNumber(series)}</button>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-3">
              <Input id="inv-no" label="Invoice number" value={data.invoiceNo} onChange={(v) => patch({ invoiceNo: v })} maxLength={16} hint="Up to 16 characters." />
              <Input id="inv-date" type="date" label="Invoice date" value={data.invoiceDate} onChange={(v) => patch({ invoiceDate: v })} />
              {isSales && <Input id="inv-due" type="date" label="Due date" value={data.dueDate} onChange={(v) => patch({ dueDate: v })} />}
            </div>
          </Section>

          <Section title="Seller (you)">
            <PartyFields id="seller" value={data.seller} onChange={(p) => patch({ seller: p })} gstinError={calc.fieldErrors.sellerGstin} />
          </Section>

          <Section title={isSales ? 'Billing address (buyer)' : 'Buyer'}>
            <PartyFields id="buyer" value={data.buyer} onChange={setBuyer} gstinError={calc.fieldErrors.buyerGstin} gstinHint="Leave empty if the buyer is unregistered." />
            <StateSelect
              id="pos"
              label="Place of supply"
              value={data.placeOfSupply}
              onChange={(v) => patch({ placeOfSupply: v })}
              hint="Usually the buyer's state for goods delivered there. Check the place of supply rules for your case."
            />
            <p className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700" aria-live="polite">{supplyBadge}</p>
          </Section>

          {isSales && (
            <Section title="Shipping address">
              <label className="flex items-center gap-3 text-sm font-semibold text-ink">
                <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={data.shipSame} onChange={(e) => patch({ shipSame: e.target.checked })} />
                Same as billing address
              </label>
              {!data.shipSame && (
                <PartyFields id="ship" value={data.shipTo} onChange={(p) => patch({ shipTo: p })} gstinError={calc.fieldErrors.shipGstin} gstinHint="Optional." />
              )}
            </Section>
          )}

          {isSales && (
            <Section title="Product catalogue" aside={<span className="text-xs text-ink-faint">Saved in this browser</span>}>
              {products.length > 0 ? (
                <ul className="divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10">
                  {products.map((p) => (
                    <li key={p.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-sm">
                      <span><span className="font-semibold text-ink">{p.name}</span><span className="text-ink-soft"> · HSN {p.hsn || '—'} · ₹{p.rate}/{p.unit} · {p.gst}%</span></span>
                      <span className="flex gap-3">
                        <button type="button" className="font-semibold text-brand-700 underline" onClick={() => pickProduct(p.id)}>Add to invoice</button>
                        <button type="button" className="text-ink-soft underline" onClick={() => deleteProduct(p.id)} aria-label={`Remove ${p.name} from catalogue`}>Remove</button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-ink-soft">No products yet. Add the items you sell often, then pick them into the invoice.</p>
              )}
              <div className="grid gap-3 rounded-2xl bg-cream p-4 sm:grid-cols-2 lg:grid-cols-5">
                <Input id="prod-name" className="sm:col-span-2" label="Product name" value={prod.name} onChange={(v) => setProd({ ...prod, name: v })} error={prodErr.name} />
                <Input id="prod-hsn" label="HSN/SAC" value={prod.hsn} onChange={(v) => setProd({ ...prod, hsn: v.replace(/\D/g, '').slice(0, 8) })} inputMode="numeric" />
                <Input id="prod-rate" label="Rate (₹)" value={prod.rate} onChange={(v) => setProd({ ...prod, rate: v })} error={prodErr.rate} inputMode="decimal" />
                <div>
                  <label htmlFor="prod-gst" className="label">GST %</label>
                  <select id="prod-gst" className="input" value={prod.gst} onChange={(e) => setProd({ ...prod, gst: e.target.value })}>
                    {RATE_PRESETS.map((r) => <option key={r} value={r}>{r}%</option>)}
                  </select>
                </div>
                <Input id="prod-unit" label="Unit" value={prod.unit} onChange={(v) => setProd({ ...prod, unit: v.toUpperCase() })} list="inv-units" />
                <div className="flex items-end sm:col-span-2 lg:col-span-4">
                  <button type="button" className="btn-ghost" onClick={addProduct}>Save product</button>
                </div>
              </div>
            </Section>
          )}

          <Section title="Line items" aside={<button type="button" className="btn-ghost !py-2" onClick={() => addItem()}>+ Add line</button>}>
            <datalist id="inv-units">{UNITS.map((u) => <option key={u} value={u} />)}</datalist>
            {data.items.map((it, i) => {
              const e = calc.itemErrors[it.id] ?? {};
              const p = `item-${it.id}`;
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
                    <Input id={`${p}-unit`} className="sm:col-span-2" label="Unit" value={it.unit} onChange={(v) => setItem(it.id, { unit: v.toUpperCase() })} list="inv-units" />
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
            {isSales && products.length > 0 && (
              <div>
                <label htmlFor="pick-product" className="label">Add from catalogue</label>
                <select id="pick-product" className="input" value="" onChange={(e) => pickProduct(e.target.value)}>
                  <option value="">Choose a product…</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.name} — ₹{p.rate}/{p.unit}</option>)}
                </select>
              </div>
            )}
            <p className="text-xs text-ink-faint">
              After the GST rate rationalisation effective 22 Sep 2025, the main slabs are 5% and 18% with 40% for specified
              goods; 12% and 28% are listed for reference. Check each item&apos;s rate.
            </p>
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={data.roundOff} onChange={(e) => patch({ roundOff: e.target.checked })} />
              Round off total to the nearest rupee
            </label>
          </Section>

          {isSales && (
            <Section title="Transport details">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="tr-mode" className="label">Mode</label>
                  <select id="tr-mode" className="input" value={data.transport.mode} onChange={(e) => setTransport({ mode: e.target.value as Transport['mode'] })}>
                    <option value="">Not specified</option>
                    <option value="road">Road</option>
                    <option value="rail">Rail</option>
                    <option value="air">Air</option>
                    <option value="ship">Ship</option>
                  </select>
                </div>
                <Input id="tr-vehicle" label="Vehicle number" value={data.transport.vehicleNo} onChange={(v) => setTransport({ vehicleNo: v.toUpperCase().replace(/\s+/g, '') })} placeholder="e.g. GJ03AB1234" autoCapitalize="characters" />
                <Input id="tr-name" label="Transporter" value={data.transport.transporter} onChange={(v) => setTransport({ transporter: v })} />
                <Input
                  id="tr-dist"
                  label="Approx. distance (km)"
                  value={data.transport.distanceKm}
                  onChange={(v) => setTransport({ distanceKm: v.replace(/\D/g, '').slice(0, 4) })}
                  inputMode="numeric"
                  hint="Entered by you. The e-way bill portal calculates PIN-to-PIN distance."
                />
              </div>
            </Section>
          )}

          <Section title="Payment and notes">
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={data.showBank} onChange={(e) => patch({ showBank: e.target.checked })} />
              Show bank details on the invoice
            </label>
            {data.showBank && (
              <div className="grid gap-4 sm:grid-cols-2">
                <Input id="bank-acname" label="Account name" value={data.bank.accountName} onChange={(v) => patch({ bank: { ...data.bank, accountName: v } })} />
                <Input id="bank-name" label="Bank name" value={data.bank.bankName} onChange={(v) => patch({ bank: { ...data.bank, bankName: v } })} />
                <Input id="bank-acno" label="Account number" value={data.bank.accountNo} onChange={(v) => patch({ bank: { ...data.bank, accountNo: v } })} inputMode="numeric" autoComplete="off" />
                <Input id="bank-ifsc" label="IFSC" value={data.bank.ifsc} onChange={(v) => patch({ bank: { ...data.bank, ifsc: v.toUpperCase() } })} maxLength={11} autoComplete="off" />
                <Input id="bank-branch" label="Branch" value={data.bank.branch} onChange={(v) => patch({ bank: { ...data.bank, branch: v } })} />
              </div>
            )}
            <TextArea id="terms" label="Payment terms" value={data.paymentTerms} onChange={(v) => patch({ paymentTerms: v })} placeholder="e.g. Payment due within 30 days." />
            <TextArea id="notes" label="Notes" value={data.notes} onChange={(v) => patch({ notes: v })} />
            <TextArea id="declaration" label="Declaration" value={data.declaration} onChange={(v) => patch({ declaration: v })} rows={3} />
          </Section>
        </form>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          {calc.warnings.length > 0 && (
            <div className="no-print rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm" aria-live="polite">
              <p className="font-semibold text-ink">Before you print</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink-soft">
                {calc.warnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
            </div>
          )}
          <p className="no-print text-sm font-semibold text-ink">
            Live preview · Total <span className="tabular-nums text-brand-700" aria-live="polite">{formatINR(calc.totals.total)}</span>
          </p>
          <InvoicePreview data={data} calc={calc} title="Tax Invoice" showTransport={isSales} />
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" className="btn-primary" onClick={printInvoice}>Print / Save as PDF</button>
            <button type="button" className="btn-ghost" onClick={saveDraft}>Save draft</button>
          </div>
          <p className="no-print text-xs leading-5 text-ink-faint">
            In the print dialog, choose “Save as PDF” as the destination. This invoice is created in your browser; it is
            not an e-invoice (IRN) and not an e-way bill.
          </p>
        </div>
      </div>
    </div>
  );
}
