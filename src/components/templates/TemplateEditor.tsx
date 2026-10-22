'use client';
/** @jsxRuntime automatic */
// One editor for every business document template: form on the left, live preview on the right,
// browser print and real PDF download. Everything stays in this browser (localStorage); nothing is uploaded.
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { safeStorage } from '@/components/tools/ui';
import { computeDocument, hasTax, supplierOf, validateDocument } from '@/lib/templates/calc';
import { CURRENCIES, CURRENCY_CODES, formatMoney, type CurrencyCode } from '@/lib/templates/currencies';
import { TEMPLATE_KIND, type TemplateId } from '@/lib/templates/ids';
import {
  addDays, emptyLine, emptyScheduleRow, INCOTERM_NAMES, INCOTERMS_2020, isSafeLogo, todayIso, uid,
  type DocumentData, type LineItem, type PartyData, type SectionKey, type TaxMode,
} from '@/lib/templates/model';
import { getPreset, REASONS_FOR_EXPORT, TAX_MODE_LABEL } from '@/lib/templates/presets';
import { fileBaseName, sectionOn } from '@/lib/templates/render';
import { Area, Card, Check, Choice, Field, Select, STATE_OPTIONS } from './fields';
import LineItemsEditor from './LineItemsEditor';
import { PrintPortal, ScaledPreview } from './PreviewPane';
import {
  KEYS, loadDrafts, loadInitial, loadProducts, loadSeries, saveDraft, saveDrafts, seriesNumber,
  type DraftEntry, type Product, type Series,
} from './storage';

const SECTION_LABEL: Record<SectionKey, string> = {
  logo: 'Logo', shipTo: 'Ship-to / delivery address', notify: 'Notify party / importer', transport: 'Transport details',
  shipping: 'Shipment details', schedule: 'Delivery schedule', bank: 'Bank details', paymentInstructions: 'Payment instructions',
  notes: 'Notes', terms: 'Terms & conditions', quality: 'Inspection & tolerance', declaration: 'Declaration',
  signature: 'Signature block', approval: 'Prepared by / approved by', amountInWords: 'Amount in words', taxSummary: 'Tax summary table',
};
const SHIPPING_LABEL: Record<string, string> = {
  iec: 'IEC (Importer-Exporter Code)', lutArn: 'LUT / bond ARN', portLoading: 'Port of loading', portDischarge: 'Port of discharge',
  countryOrigin: 'Country of origin of goods', finalDestination: 'Final destination', vessel: 'Vessel / flight no.', blNo: 'B/L / AWB no.',
  grossWeight: 'Gross weight', netWeight: 'Net weight', packages: 'No. & kind of packages', marks: 'Marks & numbers',
  reasonForExport: 'Reason for export', exchangeRate: 'Exchange rate (₹ per 1 unit of invoice currency)',
};
const ACCENTS = ['#174F39', '#1F3A5F', '#7A2E2E', '#5B3A87', '#B45309', '#0F766E', '#111827'];
const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
const MAX_LOGO_BYTES = 1024 * 1024;
const REQUIRED_KEYS = ['number', 'issueDate', 'sellerName', 'buyerName', 'sellerState', 'placeOfSupply'] as const;
/** True when the field has some value (so its error is a format problem, shown immediately). */
function hasValueFor(k: (typeof REQUIRED_KEYS)[number], d: DocumentData): boolean {
  switch (k) {
    case 'number': return !!d.meta.number.trim();
    case 'issueDate': return !!d.meta.issueDate;
    case 'sellerName': return !!d.seller.name.trim();
    case 'buyerName': return !!d.buyer.name.trim();
    case 'sellerState': return !!d.seller.stateCode;
    case 'placeOfSupply': return !!d.meta.placeOfSupply;
  }
}

export default function TemplateEditor({ templateId }: { templateId: TemplateId }) {
  const preset = getPreset(templateId);
  const L = preset.labels;
  const kind = TEMPLATE_KIND[templateId];
  const isPo = kind === 'purchase-order';

  // Static first render (same on server and client); browser data is loaded after mount.
  const [data, setData] = useState<DocumentData>(() => preset.empty('2026-01-01'));
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState('');
  const [series, setSeries] = useState<Series>({ prefix: '', next: 1 });
  const [drafts, setDrafts] = useState<DraftEntry[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [logoError, setLogoError] = useState('');
  const [printing, setPrinting] = useState(false);
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState('');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [savedAt, setSavedAt] = useState<string>('');
  // Inline "required" errors appear only after the user tries to save, print or download.
  const [showRequired, setShowRequired] = useState(false);
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = useCallback((msg: string) => {
    setStatus('');
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus(msg), 30);
  }, []);

  /* ---------- load from this browser ---------- */
  useEffect(() => {
    const today = todayIso();
    const s = loadSeries(templateId);
    setSeries(s);
    setProducts(loadProducts());
    const { doc, imported } = loadInitial(templateId);
    setDrafts(loadDrafts(templateId));
    const logo = safeStorage.get<string>(KEYS.logo, '');
    const base = doc ?? (() => {
      const e = preset.empty(today);
      e.meta.number = seriesNumber(s);
      return e;
    })();
    setData({ ...base, logo: typeof logo === 'string' && isSafeLogo(logo) ? logo : '' });
    setReady(true);
    if (imported) announce('Your draft from the old invoice generator was imported. Check it before printing.');
  }, [templateId, preset, announce]);

  /* ---------- autosave (debounced) ---------- */
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      if (saveDraft(data)) setSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 800);
    return () => clearTimeout(t);
  }, [data, ready]);

  /* ---------- derived ---------- */
  const totals = useMemo(() => computeDocument(data), [data]);
  const validation = useMemo(() => validateDocument(data, totals, {
    numberLabel: L.number, sellerLabel: L.seller, buyerLabel: L.buyer, indiaGst: data.tax.mode === 'india-gst',
    requireIec: preset.shippingFields.includes('iec'),
  }), [data, totals, L, preset]);
  const fe = useMemo(() => {
    if (showRequired) return validation.fieldErrors;
    const out = { ...validation.fieldErrors };
    for (const k of REQUIRED_KEYS) if (out[k] && !hasValueFor(k, data)) delete out[k];
    return out;
  }, [validation, showRequired, data]);
  const on = (k: SectionKey) => sectionOn(data, preset, k);
  const currency = data.meta.currency;
  const gst = data.tax.mode === 'india-gst';
  const showTaxRate = data.tax.mode === 'india-gst' || data.tax.mode === 'export-igst' || (data.tax.mode === 'single' && data.tax.perLine);

  /* ---------- updaters ---------- */
  const patch = (p: Partial<DocumentData>) => setData((d) => ({ ...d, ...p }));
  const patchIn = <K extends 'meta' | 'transport' | 'shipping' | 'charges' | 'tax' | 'bank' | 'text' | 'branding' | 'paper'>(k: K, p: Partial<DocumentData[K]>) =>
    setData((d) => ({ ...d, [k]: { ...d[k], ...p } }));
  const setSection = (k: SectionKey, v: boolean) => setData((d) => ({ ...d, sections: { ...d.sections, [k]: v } }));
  const setParty = (role: 'seller' | 'buyer' | 'shipTo' | 'notify', p: PartyData) => setData((d) => {
    const next = { ...d, [role]: p };
    // Place of supply follows the delivery state unless the user picked something else.
    const follow = (prev: string, cur: string) => !d.meta.placeOfSupply || d.meta.placeOfSupply === prev ? cur : d.meta.placeOfSupply;
    if (!isPo && role === 'buyer') next.meta = { ...d.meta, placeOfSupply: follow(d.buyer.stateCode, p.stateCode) };
    if (isPo && role === 'seller') next.meta = { ...d.meta, placeOfSupply: follow(d.seller.stateCode, p.stateCode) };
    return next;
  });

  /* ---------- actions ---------- */
  function persistSeries(s: Series) {
    setSeries(s);
    safeStorage.set(KEYS.series(templateId), s);
  }
  function bumpSeries(no: string): Series {
    if (!series.prefix || !no.startsWith(series.prefix)) return series;
    const n = Number(no.slice(series.prefix.length));
    if (!Number.isInteger(n) || n < series.next) return series;
    const s = { ...series, next: n + 1 };
    persistSeries(s);
    return s;
  }

  function loadSample() {
    const s = preset.sample(todayIso());
    setData({ ...s, logo: data.logo, branding: data.branding, paper: { ...s.paper, size: data.paper.size, orientation: data.paper.orientation } });
    setDraftId(null);
    announce('Sample data loaded. All names and numbers in it are fictional.');
  }
  function resetToTemplate() {
    if (!window.confirm('Clear this document and start again from the blank template? Your saved drafts list is not affected.')) return;
    const e = preset.empty(todayIso());
    e.meta.number = seriesNumber(series);
    setData({ ...e, logo: data.logo });
    setDraftId(null);
    announce('Document reset to the blank template.');
  }
  function saveToList() {
    setShowRequired(true);
    const id = draftId ?? uid('d');
    const list = [{ id, savedAt: new Date().toISOString(), data }, ...drafts.filter((d) => d.id !== id)].slice(0, 50);
    if (!saveDrafts(templateId, list)) return announce('Could not save: browser storage is unavailable or full.');
    saveDraft(data);
    setDrafts(list);
    setDraftId(id);
    bumpSeries(data.meta.number);
    announce('Draft saved in this browser.');
  }
  function newDocument() {
    const s = bumpSeries(data.meta.number);
    const e = preset.empty(todayIso());
    setData({ ...e, seller: data.seller, bank: data.bank, logo: data.logo, branding: data.branding, paper: data.paper, text: { ...e.text, signatureName: data.text.signatureName, signatureTitle: data.text.signatureTitle, terms: data.text.terms || e.text.terms }, meta: { ...e.meta, number: seriesNumber(s), currency: data.meta.currency } });
    setDraftId(null);
    announce('New document started. Your business details, bank details and design were kept.');
  }
  function duplicateDocument() {
    const s = bumpSeries(data.meta.number);
    const today = todayIso();
    setData((d) => ({
      ...d,
      items: d.items.map((it) => ({ ...it, id: uid() })),
      meta: { ...d.meta, number: seriesNumber(s), issueDate: today, dueDate: d.meta.dueDate ? addDays(today, 30) : '' },
    }));
    setDraftId(null);
    announce(`Duplicated with number ${seriesNumber(s)} and today's date. Save it to keep it.`);
  }
  function openDraft(e: DraftEntry) {
    setData({ ...e.data, logo: data.logo });
    setDraftId(e.id);
    announce(`Draft ${e.data.meta.number || ''} opened.`);
  }
  function deleteDraft(id: string) {
    const list = drafts.filter((d) => d.id !== id);
    setDrafts(list);
    saveDrafts(templateId, list);
    if (draftId === id) setDraftId(null);
    announce('Draft deleted from this browser.');
  }

  /* ----- product list ----- */
  function saveProduct(line: LineItem) {
    const p: Product = { id: uid('p'), name: line.description.trim(), code: line.code, code2: line.code2, unit: line.unit, price: line.unitPrice, taxRatePct: line.taxRatePct };
    const list = [p, ...products.filter((x) => x.name.toLowerCase() !== p.name.toLowerCase())].slice(0, 500);
    setProducts(list);
    const ok = safeStorage.set(KEYS.products, list);
    announce(ok ? `${p.name} saved to your item list.` : 'Item kept for this session only (browser storage unavailable).');
  }
  function addFromProduct(id: string) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    setData((d) => {
      const line = emptyLine({ description: p.name, code: p.code, code2: p.code2, unit: p.unit, unitPrice: p.price, taxRatePct: p.taxRatePct });
      const blank = d.items.length === 1 && !d.items[0].description.trim() && !d.items[0].unitPrice.trim();
      return { ...d, items: blank ? [line] : [...d.items, line] };
    });
    announce(`${p.name} added.`);
  }
  function removeProduct(id: string) {
    const list = products.filter((p) => p.id !== id);
    setProducts(list);
    safeStorage.set(KEYS.products, list);
  }

  /* ----- logo ----- */
  function onLogo(file: File | undefined) {
    setLogoError('');
    if (!file) return;
    if (!LOGO_TYPES.includes(file.type)) return setLogoError('Use a PNG, JPG, SVG or WebP image.');
    if (file.size > MAX_LOGO_BYTES) return setLogoError('The logo must be 1 MB or smaller.');
    const reader = new FileReader();
    reader.onload = () => {
      const url = typeof reader.result === 'string' ? reader.result : '';
      if (!isSafeLogo(url)) return setLogoError('This image could not be read.');
      setData((d) => ({ ...d, logo: url, sections: { ...d.sections, logo: true } }));
      if (!safeStorage.set(KEYS.logo, url)) setLogoError('Logo added, but it could not be saved in this browser (storage full).');
      else announce('Logo added. It is stored only in this browser.');
    };
    reader.onerror = () => setLogoError('This image could not be read.');
    reader.readAsDataURL(file);
  }
  function removeLogo() {
    setData((d) => ({ ...d, logo: '' }));
    safeStorage.remove(KEYS.logo);
    announce('Logo removed.');
  }

  /* ----- print & PDF ----- */
  const printingRef = useRef(false);
  useEffect(() => {
    const before = () => { if (!printingRef.current) { printingRef.current = true; flushSync(() => setPrinting(true)); } };
    const after = () => { printingRef.current = false; setPrinting(false); };
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => { window.removeEventListener('beforeprint', before); window.removeEventListener('afterprint', after); };
  }, []);
  function print() {
    setShowRequired(true);
    const prev = document.title;
    document.title = fileBaseName(data);
    printingRef.current = true;
    flushSync(() => setPrinting(true));
    const restore = () => { document.title = prev; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
    setTimeout(restore, 1500);
  }
  async function downloadPdf() {
    setShowRequired(true);
    setPdfBusy(true);
    setPdfError('');
    try {
      const { downloadPdf: run } = await import('./pdf/generate');
      const name = await run(data);
      announce(`${name} downloaded.`);
    } catch (err) {
      console.error(err);
      setPdfError('The PDF could not be created. Try again, or use Print and choose “Save as PDF”.');
    } finally {
      setPdfBusy(false);
    }
  }

  /* ---------- small render helpers ---------- */
  const sectionToggle = (k: SectionKey) => preset.toggles.includes(k)
    ? <Check id={`sec-${k}-head`} label="Show" checked={on(k)} onChange={(v) => setSection(k, v)} className="!text-xs" />
    : null;

  const partyFields = (role: 'seller' | 'buyer' | 'shipTo' | 'notify', taxLabel: string) => {
    const p = data[role];
    const set = (k: keyof PartyData) => (v: string) => {
      const next = { ...p, [k]: k === 'taxId' ? v.toUpperCase() : v };
      if (k === 'taxId' && preset.india && !p.stateCode && /^\d{2}/.test(v) && STATE_OPTIONS.some((s) => s.value === v.slice(0, 2))) next.stateCode = v.slice(0, 2);
      setParty(role, next);
    };
    const taxErr = role === 'seller' ? fe.sellerTaxId : role === 'buyer' ? fe.buyerTaxId : role === 'shipTo' ? fe.shipToTaxId : undefined;
    const showState = preset.india && (role === 'seller' || gst || role === 'shipTo');
    const showCountry = !preset.india || kind === 'commercial-invoice' || role === 'notify';
    const id = `p-${role}`;
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`${id}-name`} className="sm:col-span-2" label="Name" value={p.name} onChange={set('name')} maxLength={120}
          error={role === 'seller' ? fe.sellerName : role === 'buyer' ? fe.buyerName : undefined} autoComplete={role === 'seller' ? 'organization' : 'off'} />
        <Area id={`${id}-address`} className="sm:col-span-2" label="Address" value={p.address} onChange={set('address')} rows={2} maxLength={400} />
        {showState && (
          <Select id={`${id}-state`} label="State (GST state code)" value={p.stateCode} onChange={set('stateCode')} options={STATE_OPTIONS}
            error={role === 'seller' && !isPo ? fe.sellerState : undefined} />
        )}
        {showCountry && <Field id={`${id}-country`} label="Country" value={p.country} onChange={set('country')} maxLength={60} />}
        <Field id={`${id}-tax`} label={taxLabel} value={p.taxId} onChange={set('taxId')} error={taxErr} maxLength={30} spellCheck={false}
          hint={preset.india && taxLabel === 'GSTIN' && role !== 'seller' ? 'Leave empty if unregistered.' : undefined} />
        <Field id={`${id}-contact`} label="Contact person" value={p.contact} onChange={set('contact')} maxLength={80} />
        <Field id={`${id}-phone`} type="tel" label="Phone" value={p.phone} onChange={set('phone')} maxLength={40} />
        <Field id={`${id}-email`} type="email" label="Email" value={p.email} onChange={set('email')} maxLength={120} />
      </div>
    );
  };

  const meta = data.meta;
  const mf = new Set(preset.metaFields);
  const taxModeOptions = preset.taxModes.map((m) => ({ value: m, label: TAX_MODE_LABEL[m] }));
  const supplyText = totals.supply === 'inter' ? 'Inter-state supply: IGST' : 'Intra-state supply: CGST + SGST/UTGST';

  const toolbar = (
    <div className="flex flex-wrap gap-2">
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={loadSample}>Load sample</button>
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={resetToTemplate}>Reset to template</button>
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={saveToList}>Save draft</button>
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={newDocument}>New</button>
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={duplicateDocument}>Duplicate</button>
      <button type="button" className="btn-ghost !px-4 !py-2.5" onClick={print}>Print</button>
      <button type="button" className="btn-primary !px-4 !py-2.5" onClick={downloadPdf} disabled={pdfBusy} aria-busy={pdfBusy}>
        {pdfBusy ? 'Creating PDF…' : 'Download PDF'}
      </button>
    </div>
  );

  return (
    <div className="space-y-5" data-template={templateId}>
      {printing && <PrintPortal data={data} />}

      <div className="no-print card flex flex-col gap-3 p-4 md:p-5">
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">Everything stays in your browser; nothing is uploaded.</strong>{' '}
          Drafts, your logo, item list and number series are saved only in this browser&apos;s storage
          {savedAt && <span className="text-ink-faint"> · autosaved {savedAt}</span>}.
        </p>
        {toolbar}
        {pdfError && <p className="text-sm font-medium text-red-600" role="alert">{pdfError}</p>}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{status}</p>
      {status && <p className="no-print -mt-2 text-sm font-medium text-brand-700" aria-hidden>{status}</p>}

      {drafts.length > 0 && (
        <details className="no-print card p-4 md:p-5">
          <summary className="cursor-pointer font-semibold text-ink">Saved drafts ({drafts.length})</summary>
          <ul className="mt-3 divide-y divide-brand-900/10">
            {drafts.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                <span>
                  <span className="font-semibold text-ink">{d.data.meta.number || 'No number'}</span>
                  <span className="text-ink-soft"> · {d.data.buyer.name || '—'} · {formatMoney(computeDocument(d.data).total, d.data.meta.currency)} · {d.data.meta.issueDate}</span>
                  {draftId === d.id && <span className="chip ml-2">Open</span>}
                </span>
                <span className="flex gap-3">
                  <button type="button" className="font-semibold text-brand-700 underline" onClick={() => openDraft(d)}>Open</button>
                  <button type="button" className="font-semibold text-ink-soft underline" onClick={() => deleteDraft(d.id)} aria-label={`Delete draft ${d.data.meta.number}`}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="no-print flex gap-2 lg:hidden" role="group" aria-label="Show form or preview">
        <button type="button" className={mobileView === 'form' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={mobileView === 'form'} onClick={() => setMobileView('form')}>Edit</button>
        <button type="button" className={mobileView === 'preview' ? 'btn-primary flex-1' : 'btn-ghost flex-1'} aria-pressed={mobileView === 'preview'} onClick={() => setMobileView('preview')}>Preview</button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <form className={`no-print min-w-0 space-y-4 ${mobileView === 'preview' ? 'hidden lg:block' : ''}`} onSubmit={(e) => e.preventDefault()} noValidate aria-label={`${preset.name} details`}>

          <Card title={isPo ? 'Your business (buyer)' : kind === 'commercial-invoice' ? `Your business (${L.seller.toLowerCase()})` : 'Your business'}>
            {partyFields('seller', L.sellerTaxId)}
            <div className="rounded-2xl bg-cream p-3.5">
              <p className="label">Logo <span className="font-normal text-ink-faint">(optional, PNG/JPG/SVG/WebP, max 1 MB)</span></p>
              <div className="flex flex-wrap items-center gap-3">
                {data.logo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={data.logo} alt="Your logo" className="h-12 w-auto max-w-[160px] rounded border border-brand-900/10 bg-white object-contain p-1" />
                )}
                <label className="btn-ghost cursor-pointer !px-4 !py-2">
                  <span>{data.logo ? 'Replace logo' : 'Upload logo'}</span>
                  <input type="file" accept={LOGO_TYPES.join(',')} className="sr-only" onChange={(e) => { onLogo(e.target.files?.[0]); e.target.value = ''; }} aria-describedby="logo-help" />
                </label>
                {data.logo && <button type="button" className="text-sm font-semibold text-red-600 underline" onClick={removeLogo}>Remove logo</button>}
              </div>
              <p id="logo-help" className={`mt-1 text-xs ${logoError ? 'font-medium text-red-600' : 'text-ink-faint'}`} role={logoError ? 'alert' : undefined}>
                {logoError || 'Read on your device and kept in this browser only.'}
              </p>
              {data.logo && (
                <div className="mt-2">
                  <label htmlFor="logo-size" className="label">Logo size</label>
                  <input id="logo-size" type="range" min={40} max={260} step={10} value={data.branding.logoWidth} className="w-full accent-brand-700"
                    onChange={(e) => patchIn('branding', { logoWidth: Number(e.target.value) })} aria-valuetext={`${data.branding.logoWidth} pixels wide`} />
                </div>
              )}
            </div>
          </Card>

          <Card title={L.buyer.replace(/^Bill to.*$/, 'Customer (bill to)')}>
            {partyFields('buyer', L.buyerTaxId)}
          </Card>

          {preset.toggles.includes('shipTo') && (
            <Card title={L.shipTo} aside={sectionToggle('shipTo')}>
              {on('shipTo') && (
                <>
                  <Check id="ship-same" label={isPo ? 'Same as our address above' : 'Same as the billing address'} checked={data.shipToSame} onChange={(v) => patch({ shipToSame: v })} />
                  {!data.shipToSame && partyFields('shipTo', L.buyerTaxId)}
                </>
              )}
            </Card>
          )}

          {preset.toggles.includes('notify') && (
            <Card title={L.notify} aside={sectionToggle('notify')}>
              {on('notify') ? partyFields('notify', 'Tax ID') : <p className="text-sm text-ink-faint">Switch on if the buyer or importer is different from the consignee.</p>}
            </Card>
          )}

          <Card title="Document details">
            <div className="grid gap-3 rounded-2xl bg-cream p-3.5 sm:grid-cols-[1fr_110px_auto] sm:items-end">
              <Field id="series-prefix" label="Number series prefix" value={series.prefix} onChange={(v) => persistSeries({ ...series, prefix: v.slice(0, 12) })} hint="Includes the financial year, e.g. INV/26-27/" />
              <Field id="series-next" label="Next no." inputMode="numeric" value={String(series.next)} onChange={(v) => persistSeries({ ...series, next: Math.max(1, Number(v.replace(/\D/g, '').slice(0, 6)) || 1) })} />
              <button type="button" className="btn-ghost !py-2.5" onClick={() => patchIn('meta', { number: seriesNumber(series) })}>Use {seriesNumber(series)}</button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="m-number" label={L.number} value={meta.number} onChange={(v) => patchIn('meta', { number: v })} error={fe.number} maxLength={preset.india ? 16 : 40}
                hint={preset.india && kind === 'sales-invoice' ? 'Up to 16 characters: letters, digits, - and /.' : undefined} />
              <Field id="m-date" type="date" label={L.issueDate} value={meta.issueDate} onChange={(v) => patchIn('meta', { issueDate: v })} error={fe.issueDate} />
              {mf.has('dueDate') && <Field id="m-due" type="date" label={L.dueDate} value={meta.dueDate} onChange={(v) => patchIn('meta', { dueDate: v })} error={fe.dueDate} />}
              {mf.has('deliveryDate') && <Field id="m-delivery" type="date" label="Delivery date" value={meta.deliveryDate} onChange={(v) => patchIn('meta', { deliveryDate: v })} />}
              {mf.has('poNumber') && <Field id="m-po" label={L.poNumber} value={meta.poNumber} onChange={(v) => patchIn('meta', { poNumber: v })} maxLength={40} />}
              {mf.has('reference') && <Field id="m-ref" label={L.reference} value={meta.reference} onChange={(v) => patchIn('meta', { reference: v })} maxLength={60} />}
              {mf.has('servicePeriod') && (
                <>
                  <Field id="m-sp-from" type="date" label="Service period from" value={meta.servicePeriodFrom} onChange={(v) => patchIn('meta', { servicePeriodFrom: v })} />
                  <Field id="m-sp-to" type="date" label="Service period to" value={meta.servicePeriodTo} onChange={(v) => patchIn('meta', { servicePeriodTo: v })} />
                </>
              )}
              {mf.has('ewayBillNo') && <Field id="m-ewb" label="E-way bill no. (if generated)" value={meta.ewayBillNo} onChange={(v) => patchIn('meta', { ewayBillNo: v })} maxLength={20} inputMode="numeric" />}
              {mf.has('reverseCharge') && gst && (
                <Select id="m-rc" label="Tax payable on reverse charge" value={meta.reverseCharge || 'no'} onChange={(v) => patchIn('meta', { reverseCharge: v as 'yes' | 'no' })}
                  options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]} />
              )}
              {mf.has('incoterm') && (
                <>
                  <Select id="m-inco" label="Incoterm (Incoterms® 2020)" value={meta.incoterm} onChange={(v) => patchIn('meta', { incoterm: v })}
                    options={[{ value: '', label: 'Not stated' }, ...INCOTERMS_2020.map((t) => ({ value: t, label: `${t} — ${INCOTERM_NAMES[t]}` }))]} />
                  <Field id="m-inco-place" label="Named place / port" value={meta.incotermPlace} onChange={(v) => patchIn('meta', { incotermPlace: v })} maxLength={60} />
                </>
              )}
              {mf.has('shippingMethod') && <Field id="m-ship" label="Shipping method" value={meta.shippingMethod} onChange={(v) => patchIn('meta', { shippingMethod: v })} maxLength={80} placeholder="e.g. Sea freight, 1 × 20' container" />}
              {mf.has('partialShipment') && (
                <Select id="m-partial" label="Partial shipment" value={meta.partialShipment} onChange={(v) => patchIn('meta', { partialShipment: v as DocumentData['meta']['partialShipment'] })}
                  options={[{ value: '', label: 'Not stated' }, { value: 'allowed', label: 'Allowed' }, { value: 'not-allowed', label: 'Not allowed' }]} />
              )}
              {mf.has('paymentTerms') && <Field id="m-pay" className="sm:col-span-2" label={L.paymentTerms} value={meta.paymentTerms} onChange={(v) => patchIn('meta', { paymentTerms: v })} maxLength={200} />}
              {mf.has('deliveryTerms') && <Field id="m-del-terms" className="sm:col-span-2" label={L.deliveryTerms} value={meta.deliveryTerms} onChange={(v) => patchIn('meta', { deliveryTerms: v })} maxLength={200} />}
              <Field id="m-title" className="sm:col-span-2" label="Document title" value={meta.title} onChange={(v) => patchIn('meta', { title: v })} placeholder={preset.title} maxLength={40} hint={`Leave empty to use “${preset.title}”.`} />
            </div>
          </Card>

          {preset.toggles.includes('shipping') || preset.shippingFields.length > 0 ? (
            <Card title="Shipment details" aside={preset.toggles.includes('shipping') && kind !== 'commercial-invoice' ? sectionToggle('shipping') : undefined}>
              {(on('shipping') || kind === 'commercial-invoice') && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <datalist id="tpl-reasons">{REASONS_FOR_EXPORT.map((r) => <option key={r} value={r} />)}</datalist>
                  {preset.shippingFields.map((k) => (k === 'marks'
                    ? <Area key={k} id={`s-${k}`} className="sm:col-span-2" label={preset.shippingLabels[k] ?? SHIPPING_LABEL[k]} value={data.shipping[k]} onChange={(v) => patchIn('shipping', { [k]: v })} rows={2} maxLength={300} />
                    : (k !== 'lutArn' || data.tax.mode === 'export-zero-rated') && (
                      <Field key={k} id={`s-${k}`} label={preset.shippingLabels[k] ?? SHIPPING_LABEL[k]} value={data.shipping[k]}
                        onChange={(v) => patchIn('shipping', { [k]: k === 'iec' ? v.toUpperCase() : v })} maxLength={k === 'exchangeRate' ? 12 : 80}
                        list={k === 'reasonForExport' ? 'tpl-reasons' : undefined} inputMode={k === 'exchangeRate' ? 'decimal' : undefined}
                        error={k === 'iec' ? fe.iec : k === 'exchangeRate' ? totals.chargeErrors.exchangeRate : undefined}
                        hint={k === 'exchangeRate' && currency === 'INR' ? 'Used only when the invoice currency is not INR.' : undefined} />
                    )))}
                </div>
              )}
            </Card>
          ) : null}

          {preset.toggles.includes('transport') && (
            <Card title="Transport details" aside={sectionToggle('transport')}>
              {on('transport') ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Select id="t-mode" label="Mode" value={data.transport.mode} onChange={(v) => patchIn('transport', { mode: v as DocumentData['transport']['mode'] })}
                    options={[{ value: '', label: 'Not specified' }, { value: 'road', label: 'Road' }, { value: 'rail', label: 'Rail' }, { value: 'air', label: 'Air' }, { value: 'ship', label: 'Ship' }]} />
                  <Field id="t-vehicle" label="Vehicle no." value={data.transport.vehicleNo} onChange={(v) => patchIn('transport', { vehicleNo: v.toUpperCase().replace(/\s+/g, '') })} maxLength={15} placeholder="e.g. GJ03AB1234" />
                  <Field id="t-name" label="Transporter" value={data.transport.transporter} onChange={(v) => patchIn('transport', { transporter: v })} maxLength={80} />
                  <Field id="t-lr" label="LR / RR no." value={data.transport.lrNo} onChange={(v) => patchIn('transport', { lrNo: v })} maxLength={30} />
                  <Field id="t-lrdate" type="date" label="LR date" value={data.transport.lrDate} onChange={(v) => patchIn('transport', { lrDate: v })} />
                  <Field id="t-dist" label="Approx. distance (km)" value={data.transport.distanceKm} onChange={(v) => patchIn('transport', { distanceKm: v.replace(/\D/g, '').slice(0, 4) })} inputMode="numeric" />
                </div>
              ) : <p className="text-sm text-ink-faint">Switch on to print vehicle, transporter and LR details.</p>}
              <p className="text-xs text-ink-faint">An invoice is not an e-way bill. Generate e-way bills on the official portal (ewaybillgst.gov.in) or in the E-Way Easy app.</p>
            </Card>
          )}

          <Card title="Line items" aside={<span className="text-xs text-ink-faint">{data.items.length} line{data.items.length === 1 ? '' : 's'}</span>}>
            {products.length > 0 && (
              <Select id="pick-product" label="Add from your saved items" value="" onChange={addFromProduct}
                options={[{ value: '', label: `Choose from ${products.length} saved item${products.length === 1 ? '' : 's'}…` }, ...products.map((p) => ({ value: p.id, label: `${p.name}${p.price ? ` — ${p.price}` : ''}${p.unit ? `/${p.unit}` : ''}` }))]} />
            )}
            <LineItemsEditor items={data.items} preset={preset} totals={totals} currency={currency} showTaxRate={showTaxRate}
              onChange={(items) => patch({ items })} onSaveProduct={saveProduct} announce={announce} />
            {products.length > 0 && (
              <details className="rounded-2xl border border-brand-900/10 p-3 text-sm">
                <summary className="cursor-pointer font-semibold text-ink">Manage saved items ({products.length})</summary>
                <ul className="mt-2 divide-y divide-brand-900/10">
                  {products.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-2 py-1.5">
                      <span className="min-w-0 truncate">{p.name}{p.code ? ` · ${p.code}` : ''}</span>
                      <button type="button" className="shrink-0 text-ink-soft underline" onClick={() => removeProduct(p.id)} aria-label={`Remove ${p.name} from saved items`}>Remove</button>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </Card>

          {preset.toggles.includes('schedule') && (
            <Card title="Delivery schedule" aside={sectionToggle('schedule')}>
              {on('schedule') && (
                <div className="space-y-3">
                  {data.schedule.map((r, i) => (
                    <div key={r.id} className="grid gap-3 rounded-2xl border border-brand-900/10 p-3 sm:grid-cols-[150px_120px_1fr_auto] sm:items-end" role="group" aria-label={`Schedule row ${i + 1}`}>
                      <Field id={`sch-${r.id}-d`} type="date" label="Date" value={r.date} onChange={(v) => patch({ schedule: data.schedule.map((x) => (x.id === r.id ? { ...x, date: v } : x)) })} />
                      <Field id={`sch-${r.id}-q`} label="Quantity" value={r.qty} onChange={(v) => patch({ schedule: data.schedule.map((x) => (x.id === r.id ? { ...x, qty: v } : x)) })} maxLength={40} />
                      <Field id={`sch-${r.id}-n`} label="Remarks" value={r.note} onChange={(v) => patch({ schedule: data.schedule.map((x) => (x.id === r.id ? { ...x, note: v } : x)) })} maxLength={160} />
                      <button type="button" className="btn-ghost !py-2.5 !text-red-600" onClick={() => patch({ schedule: data.schedule.filter((x) => x.id !== r.id) })} aria-label={`Remove schedule row ${i + 1}`}>Remove</button>
                    </div>
                  ))}
                  <button type="button" className="btn-ghost w-full" onClick={() => patch({ schedule: [...data.schedule, emptyScheduleRow()] })}>+ Add delivery</button>
                </div>
              )}
            </Card>
          )}

          <Card title="Charges & tax">
            <div className="grid gap-3 sm:grid-cols-2">
              <Select id="tax-mode" label="Tax" value={data.tax.mode} onChange={(v) => {
                const mode = v as TaxMode;
                patchIn('tax', { mode, label: mode === 'single' && data.tax.label === 'GST' ? 'VAT' : data.tax.label });
                if (mode === 'india-gst' && currency !== 'INR') patchIn('meta', { currency: 'INR' });
              }} options={taxModeOptions} disabled={taxModeOptions.length < 2} />
              {data.tax.mode !== 'india-gst' && (
                <Select id="currency" label="Currency" value={currency} onChange={(v) => patchIn('meta', { currency: v as CurrencyCode })}
                  options={CURRENCY_CODES.map((c) => ({ value: c, label: `${c} — ${CURRENCIES[c].name}` }))} />
              )}
              {gst && (
                <div className="sm:col-span-2">
                  <Select id="pos" label="Place of supply" value={meta.placeOfSupply} onChange={(v) => patchIn('meta', { placeOfSupply: v })} options={STATE_OPTIONS} error={fe.placeOfSupply}
                    hint={isPo ? `Usually the state where goods are delivered to you. Compared with the ${L.buyer.toLowerCase()} state.` : 'Usually the customer’s state for goods delivered there. Check the place of supply rules for your case.'} />
                  <p className="mt-2 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700" aria-live="polite">
                    {supplierOf(data).stateCode && meta.placeOfSupply ? supplyText : 'Select both states to see CGST + SGST or IGST'}
                  </p>
                </div>
              )}
              {data.tax.mode === 'single' && (
                <>
                  <Field id="tax-label" label="Tax name" value={data.tax.label} onChange={(v) => patchIn('tax', { label: v.slice(0, 20) })} placeholder="VAT / Sales tax" />
                  <Choice name="tax-per-line" legend="Rate" value={data.tax.perLine ? 'line' : 'doc'} onChange={(v) => patchIn('tax', { perLine: v === 'line' })}
                    options={[{ value: 'doc', label: 'One rate' }, { value: 'line', label: 'Per line' }]} />
                  {!data.tax.perLine && <Field id="tax-rate" label={`${data.tax.label || 'Tax'} rate %`} value={data.tax.docRatePct} onChange={(v) => patchIn('tax', { docRatePct: v })} inputMode="decimal" error={totals.chargeErrors.docRatePct} />}
                </>
              )}
              {data.tax.mode === 'export-zero-rated' && (
                <p className="text-sm text-ink-soft sm:col-span-2">No IGST is charged; the document notes that the supply is under bond or LUT. Enter the LUT ARN in Shipment details{preset.shippingFields.includes('lutArn') ? '' : ' or Notes'}.</p>
              )}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Field id="ch-freight" label="Freight" value={data.charges.freight} onChange={(v) => patchIn('charges', { freight: v })} inputMode="decimal" error={totals.chargeErrors.freight} />
              <Field id="ch-ins" label="Insurance" value={data.charges.insurance} onChange={(v) => patchIn('charges', { insurance: v })} inputMode="decimal" error={totals.chargeErrors.insurance} />
              <Field id="ch-other" label={data.charges.otherLabel || 'Other charges'} value={data.charges.other} onChange={(v) => patchIn('charges', { other: v })} inputMode="decimal" error={totals.chargeErrors.other} />
              <Field id="ch-other-label" label="Name for other charges" value={data.charges.otherLabel} onChange={(v) => patchIn('charges', { otherLabel: v.slice(0, 40) })} />
              {hasTax(data.tax.mode) && (
                <Field id="ch-tax" label="Tax rate on charges %" value={data.charges.taxRatePct} onChange={(v) => patchIn('charges', { taxRatePct: v })} inputMode="decimal" error={totals.chargeErrors.taxRatePct} hint="Leave empty if charges are not taxed." />
              )}
            </div>
            {totals.decimals > 0 && <Check id="round-off" label="Round off the total to a whole unit" checked={data.tax.roundOff} onChange={(v) => patchIn('tax', { roundOff: v })} />}
            {gst && <p className="text-xs text-ink-faint">Check each item&apos;s GST rate and HSN/SAC yourself; rates change by notification.</p>}
          </Card>

          {(preset.toggles.includes('bank') || preset.toggles.includes('paymentInstructions')) && (
            <Card title="Payment & bank details" aside={preset.toggles.includes('bank') ? sectionToggle('bank') : undefined}>
              {preset.toggles.includes('bank') && on('bank') && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id="b-name" label="Account name" value={data.bank.accountName} onChange={(v) => patchIn('bank', { accountName: v })} maxLength={80} />
                  <Field id="b-bank" label="Bank" value={data.bank.bankName} onChange={(v) => patchIn('bank', { bankName: v })} maxLength={80} />
                  <Field id="b-acno" label="Account no." value={data.bank.accountNo} onChange={(v) => patchIn('bank', { accountNo: v })} maxLength={34} autoComplete="off" />
                  <Field id="b-ifsc" label="IFSC" value={data.bank.ifsc} onChange={(v) => patchIn('bank', { ifsc: v.toUpperCase() })} maxLength={11} autoComplete="off" />
                  <Field id="b-swift" label="SWIFT / BIC" value={data.bank.swift} onChange={(v) => patchIn('bank', { swift: v.toUpperCase() })} maxLength={11} autoComplete="off" />
                  <Field id="b-iban" label="IBAN" value={data.bank.iban} onChange={(v) => patchIn('bank', { iban: v.toUpperCase() })} maxLength={34} autoComplete="off" />
                  <Field id="b-branch" label="Branch" value={data.bank.branch} onChange={(v) => patchIn('bank', { branch: v })} maxLength={80} />
                  <Field id="b-upi" label="UPI ID" value={data.bank.upi} onChange={(v) => patchIn('bank', { upi: v })} maxLength={60} autoComplete="off" />
                </div>
              )}
              {preset.toggles.includes('paymentInstructions') && (
                <>
                  <Check id="sec-pay" label="Show payment instructions" checked={on('paymentInstructions')} onChange={(v) => setSection('paymentInstructions', v)} />
                  {on('paymentInstructions') && <Area id="t-pay" label="Payment instructions" value={data.text.paymentInstructions} onChange={(v) => patchIn('text', { paymentInstructions: v })} />}
                </>
              )}
            </Card>
          )}

          <Card title="Notes, terms & signature">
            {preset.toggles.includes('notes') && <Area id="t-notes" label="Notes" value={data.text.notes} onChange={(v) => patchIn('text', { notes: v })} />}
            {preset.toggles.includes('terms') && <Area id="t-terms" label={L.terms} value={data.text.terms} onChange={(v) => patchIn('text', { terms: v })} rows={4} />}
            {preset.toggles.includes('quality') && (
              <>
                <Area id="t-quality" label="Inspection & quality requirements" value={data.text.qualityTerms} onChange={(v) => patchIn('text', { qualityTerms: v })} rows={3} />
                <Area id="t-tol" label="Tolerance" value={data.text.tolerance} onChange={(v) => patchIn('text', { tolerance: v })} rows={2} />
              </>
            )}
            {preset.toggles.includes('declaration') && <Area id="t-decl" label={L.declaration} value={data.text.declaration} onChange={(v) => patchIn('text', { declaration: v })} rows={3} />}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="t-sign" label={preset.toggles.includes('approval') ? 'Prepared / signed by' : 'Signatory name'} value={data.text.signatureName} onChange={(v) => patchIn('text', { signatureName: v })} maxLength={80} />
              <Field id="t-sign-title" label="Signature caption" value={data.text.signatureTitle} onChange={(v) => patchIn('text', { signatureTitle: v })} maxLength={60} />
              {preset.toggles.includes('approval') && <Field id="t-approved" className="sm:col-span-2" label="Approved by" value={data.text.approvedBy} onChange={(v) => patchIn('text', { approvedBy: v })} maxLength={80} />}
            </div>
          </Card>

          <Card title="Design">
            <Choice name="layout" legend="Layout" value={data.branding.layout} onChange={(v) => patchIn('branding', { layout: v })}
              options={[{ value: 'classic', label: 'Classic' }, { value: 'modern', label: 'Modern' }, { value: 'compact', label: 'Compact' }]} />
            <fieldset>
              <legend className="label">Accent colour</legend>
              <div className="flex flex-wrap items-center gap-2">
                {ACCENTS.map((c) => (
                  <button key={c} type="button" onClick={() => patchIn('branding', { accent: c })} aria-label={`Accent colour ${c}`} aria-pressed={data.branding.accent.toLowerCase() === c.toLowerCase()}
                    className={`h-9 w-9 rounded-full border-2 ${data.branding.accent.toLowerCase() === c.toLowerCase() ? 'border-amber-500 ring-2 ring-amber-500/40' : 'border-white shadow'}`} style={{ background: c }} />
                ))}
                <label className="ml-1 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                  Custom
                  <input type="color" value={data.branding.accent} onChange={(e) => patchIn('branding', { accent: e.target.value })} className="h-9 w-12 cursor-pointer rounded border border-brand-900/15 bg-white" />
                </label>
              </div>
            </fieldset>
            <Choice name="font" legend="Font" value={data.branding.font} onChange={(v) => patchIn('branding', { font: v })}
              options={[{ value: 'sans', label: 'Sans serif' }, { value: 'serif', label: 'Serif' }]} />
            <fieldset>
              <legend className="label">Sections on the document</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {preset.toggles.map((k) => <Check key={k} id={`sec-${k}`} label={SECTION_LABEL[k]} checked={on(k)} onChange={(v) => setSection(k, v)} />)}
              </div>
            </fieldset>
          </Card>

          <Card title="Paper">
            <div className="grid gap-3 sm:grid-cols-2">
              <Select id="paper-size" label="Paper size" value={data.paper.size} onChange={(v) => patchIn('paper', { size: v as DocumentData['paper']['size'] })}
                options={[{ value: 'A4', label: 'A4 (210 × 297 mm)' }, { value: 'A5', label: 'A5 (148 × 210 mm)' }, { value: 'Letter', label: 'US Letter (8.5 × 11 in)' }, { value: 'Legal', label: 'US Legal (8.5 × 14 in)' }, { value: 'Custom', label: 'Custom size (mm)' }]} />
              <Choice name="orientation" legend="Orientation" value={data.paper.orientation} onChange={(v) => patchIn('paper', { orientation: v })}
                options={[{ value: 'portrait', label: 'Portrait' }, { value: 'landscape', label: 'Landscape' }]} />
              {data.paper.size === 'Custom' && (
                <>
                  <Field id="paper-w" label="Width (mm)" value={data.paper.customWmm} onChange={(v) => patchIn('paper', { customWmm: v.replace(/[^\d.]/g, '').slice(0, 6) })} inputMode="decimal" hint="70–1200 mm" />
                  <Field id="paper-h" label="Height (mm)" value={data.paper.customHmm} onChange={(v) => patchIn('paper', { customHmm: v.replace(/[^\d.]/g, '').slice(0, 6) })} inputMode="decimal" hint="70–1200 mm" />
                </>
              )}
              <Choice name="margin" legend="Margins" value={data.paper.margin} onChange={(v) => patchIn('paper', { margin: v })}
                options={[{ value: 'normal', label: 'Normal' }, { value: 'narrow', label: 'Narrow' }]} />
            </div>
          </Card>
        </form>

        <div className={`min-w-0 space-y-3 lg:sticky lg:top-24 lg:self-start ${mobileView === 'form' ? 'hidden lg:block' : ''}`}>
          {(validation.warnings.length > 0 || Object.keys(fe).length > 0) && (
            <div className="no-print rounded-2xl border border-amber-400/60 bg-amber-300/15 p-3.5 text-sm">
              <p className="font-semibold text-ink">Check before you print</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-5 text-ink-soft">
                {[...new Set(Object.values(validation.fieldErrors))].map((w) => <li key={`e-${w}`}>{w}</li>)}
                {validation.warnings.map((w) => <li key={w}>{w}</li>)}
              </ul>
            </div>
          )}
          <p className="no-print flex flex-wrap items-baseline justify-between gap-2 text-sm font-semibold text-ink">
            <span>Live preview · {data.paper.size === 'Custom' ? 'custom size' : data.paper.size} {data.paper.orientation}</span>
            <span>Total <span className="tabular-nums text-brand-700" aria-live="polite">{formatMoney(totals.total, currency)}</span></span>
          </p>
          <div className="no-print max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain rounded-xl lg:max-h-[calc(100vh-9rem)]">
            <ScaledPreview data={data} />
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <button type="button" className="btn-ghost" onClick={print}>Print</button>
            <button type="button" className="btn-primary" onClick={downloadPdf} disabled={pdfBusy}>{pdfBusy ? 'Creating PDF…' : 'Download PDF'}</button>
          </div>
          <Notice>
            The PDF shows exact page breaks; long tables continue on the next page with the column headings repeated.
            This template is a starting point: check that your document has everything your business, customer and
            applicable tax rules require.{kind === 'sales-invoice' && preset.india ? ' It is not an e-invoice (IRN) or an e-way bill.' : ''}
          </Notice>
        </div>
      </div>
    </div>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return <p className="no-print text-xs leading-5 text-ink-faint">{children}</p>;
}
