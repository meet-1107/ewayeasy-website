// localStorage keys and helpers for the template editor. Everything stays in this browser.
import { safeStorage } from '@/components/tools/ui';
import { fyToken, financialYearStart } from '@/lib/invoiceSeries';
import type { TemplateId } from '@/lib/templates/ids';
import { fromLegacyInvoice, quotationToTaxInvoice } from '@/lib/templates/legacy';
import { normaliseDocument, todayIso, uid, type DocumentData } from '@/lib/templates/model';
import { getPreset } from '@/lib/templates/presets';

export const KEYS = {
  draft: (id: TemplateId) => `ee-tpl-${id}`,
  drafts: (id: TemplateId) => `ee-tpl-drafts-${id}`,
  series: (id: TemplateId) => `ee-tpl-series-${id}`,
  products: 'ee-tpl-products',
  /** Your logo, shared by all templates (kept out of drafts to save space). */
  logo: 'ee-tpl-logo',
  legacy: {
    gstDraft: 'ee-tools-invoice-draft',
    salesDrafts: 'ee-tools-sales-drafts',
    salesSeries: 'ee-tools-sales-series',
    products: 'ee-tools-products',
  },
} as const;

export interface Series { prefix: string; next: number }
export interface Product { id: string; name: string; code: string; code2: string; unit: string; price: string; taxRatePct: string }
export interface DraftEntry { id: string; savedAt: string; data: DocumentData }

export const seriesNumber = (s: Series) => `${s.prefix}${String(s.next).padStart(4, '0')}`;

export function defaultSeries(id: TemplateId, today = todayIso()): Series {
  return { prefix: `${getPreset(id).seriesPrefix}/${fyToken(financialYearStart(today), 'short')}/`, next: 1 };
}

const isSeries = (v: unknown): v is Series =>
  !!v && typeof (v as Series).prefix === 'string' && Number.isInteger((v as Series).next) && (v as Series).next > 0;

/** Strip the logo before storing a document (it lives under KEYS.logo). */
export const withoutLogo = (d: DocumentData): DocumentData => ({ ...d, logo: '' });

export function loadDraft(id: TemplateId): DocumentData | null {
  return normaliseDocument(safeStorage.get<unknown>(KEYS.draft(id), null), getPreset(id).empty(todayIso()));
}

export function saveDraft(d: DocumentData): boolean {
  return safeStorage.set(KEYS.draft(d.templateId), withoutLogo(d));
}

export function loadDrafts(id: TemplateId): DraftEntry[] {
  const raw = safeStorage.get<unknown>(KEYS.drafts(id), []);
  if (!Array.isArray(raw)) return [];
  const base = getPreset(id).empty(todayIso());
  return raw.flatMap((e) => {
    if (!e || typeof e !== 'object') return [];
    const x = e as Partial<DraftEntry>;
    const data = normaliseDocument(x.data, base);
    return data && typeof x.id === 'string' ? [{ id: x.id, savedAt: typeof x.savedAt === 'string' ? x.savedAt : '', data }] : [];
  });
}

export function saveDrafts(id: TemplateId, list: DraftEntry[]): boolean {
  return safeStorage.set(KEYS.drafts(id), list.slice(0, 50).map((e) => ({ ...e, data: withoutLogo(e.data) })));
}

export function loadSeries(id: TemplateId): Series {
  const s = safeStorage.get<unknown>(KEYS.series(id), null);
  if (isSeries(s)) return s;
  if (id === 'wholesale-invoice' || id === 'gst-tax-invoice') {
    const legacy = safeStorage.get<unknown>(KEYS.legacy.salesSeries, null);
    if (isSeries(legacy)) return legacy;
  }
  return defaultSeries(id);
}

export function loadProducts(): Product[] {
  const raw = safeStorage.get<unknown>(KEYS.products, null);
  if (Array.isArray(raw)) {
    return raw.filter((p): p is Product => !!p && typeof p === 'object' && typeof (p as Product).name === 'string').map((p) => ({
      id: String(p.id || uid('p')), name: p.name, code: String(p.code ?? ''), code2: String(p.code2 ?? ''), unit: String(p.unit ?? 'NOS'),
      price: String(p.price ?? ''), taxRatePct: String(p.taxRatePct ?? ''),
    }));
  }
  // First use: bring over the catalogue saved by the old Sales Invoice Generator.
  const legacy = safeStorage.get<unknown>(KEYS.legacy.products, []);
  if (!Array.isArray(legacy)) return [];
  const list = legacy.filter((p) => p && typeof p === 'object' && typeof (p as { name?: unknown }).name === 'string').map((p) => {
    const x = p as Record<string, unknown>;
    return { id: uid('p'), name: String(x.name), code: String(x.hsn ?? ''), code2: '', unit: String(x.unit ?? 'NOS'), price: String(x.rate ?? ''), taxRatePct: String(x.gst ?? '') };
  });
  if (list.length) safeStorage.set(KEYS.products, list);
  return list;
}

/**
 * Initial document for a template: the autosaved draft, else (gst-tax-invoice) the old Invoice Generator
 * draft, else null. Also migrates the old Sales Invoice Generator drafts list into wholesale-invoice drafts.
 */
export function loadInitial(id: TemplateId): { doc: DocumentData | null; imported: boolean } {
  const today = todayIso();
  const own = loadDraft(id);
  if (id === 'wholesale-invoice' && safeStorage.get<unknown>(KEYS.drafts(id), null) === null) {
    const legacy = safeStorage.get<unknown>(KEYS.legacy.salesDrafts, []);
    if (Array.isArray(legacy) && legacy.length) {
      const list: DraftEntry[] = legacy.flatMap((e) => {
        const x = (e ?? {}) as { id?: unknown; savedAt?: unknown; data?: unknown };
        const data = fromLegacyInvoice(x.data, id, today);
        return data ? [{ id: typeof x.id === 'string' ? x.id : uid('d'), savedAt: typeof x.savedAt === 'string' ? x.savedAt : '', data }] : [];
      });
      if (list.length) saveDrafts(id, list);
    }
  }
  if (own) return { doc: own, imported: false };
  if (id === 'gst-tax-invoice') {
    const legacy = fromLegacyInvoice(safeStorage.get<unknown>(KEYS.legacy.gstDraft, null), id, today);
    if (legacy) return { doc: legacy, imported: true };
  }
  return { doc: null, imported: false };
}

/**
 * Used by the Quotation Generator's "Convert to invoice": writes the quotation into the GST tax invoice
 * template's draft. Any existing working draft is first kept in that template's saved drafts list.
 */
export function writeQuotationAsTaxInvoice(quotation: unknown): boolean {
  const id: TemplateId = 'gst-tax-invoice';
  const series = loadSeries(id);
  const doc = quotationToTaxInvoice(quotation, todayIso(), seriesNumber(series));
  if (!doc) return false;
  const current = loadDraft(id);
  if (current && (current.buyer.name.trim() || current.items.some((i) => i.description.trim()))) {
    saveDrafts(id, [{ id: uid('d'), savedAt: new Date().toISOString(), data: current }, ...loadDrafts(id)]);
  }
  return saveDraft(doc);
}
