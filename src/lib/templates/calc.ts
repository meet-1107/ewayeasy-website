// Exact document calculations. All money is integer minor units (paise, cents; whole yen for JPY),
// quantities are thousandths and rates are basis points (18% → 1800), following src/lib/money.ts.
// Products and percentages go through BigInt so very large documents stay exact.
import { amountInWords, parseQty, parseRate } from '@/lib/money';
import { numberToInternationalWords } from '@/lib/words';
import { checkGstin } from '@/lib/gstin';
import { currencyInfo, minorPerMajor } from './currencies';
import type { DocumentData, LineItem, PartyData, TaxMode } from './model';
import { TEMPLATE_KIND } from './ids';

export type Minor = number;
export type Supply = 'intra' | 'inter';

/** round(a × b / c) with half away from zero, exact for any safe-integer inputs. */
export function mulDivRound(a: number, b: number, c: number): number {
  const A = BigInt(Math.trunc(a)), B = BigInt(Math.trunc(b)), C = BigInt(Math.trunc(c));
  if (C === 0n) throw new RangeError('Division by zero');
  const num = A * B;
  const neg = (num < 0n) !== (C < 0n);
  const n = num < 0n ? -num : num;
  const d = C < 0n ? -C : C;
  let q = n / d;
  if ((n % d) * 2n >= d) q += 1n;
  const out = Number(neg ? -q : q);
  if (!Number.isSafeInteger(out)) throw new RangeError('Amount too large');
  return out;
}

/** Percentage of an amount in basis points: pctOf(10000, 1800) = 1800. Supports half basis points via `den`. */
export const pctOf = (amount: Minor, bp: number, den = 10000): Minor => mulDivRound(amount, bp, den);

/**
 * Parse a money string into minor units for a currency with `decimals` decimals.
 * Accepts grouping commas/spaces and a leading currency symbol. Returns null if invalid.
 */
export function parseMinor(input: string | number, decimals: number): Minor | null {
  const s = String(input).replace(/[,\s₹$€£¥]/g, '').replace(/^(AED|SAR|S|A|C|CN)(?=[\d.-])/i, '').trim();
  if (!s) return null;
  const re = decimals === 0 ? /^-?\d+$/ : new RegExp(`^-?\\d+(\\.\\d{0,${decimals}})?$`);
  if (!re.test(s)) return null;
  const neg = s.startsWith('-');
  const [whole, frac = ''] = s.replace('-', '').split('.');
  const scale = 10 ** decimals;
  const v = Number(whole) * scale + (decimals ? Number((frac + '0'.repeat(decimals)).slice(0, decimals)) : 0);
  if (!Number.isSafeInteger(v)) return null;
  return neg ? -v : v;
}

/** Exchange rate like "83.4567" → 834567 (ten-thousandths). */
export function parseRate4(input: string): number | null {
  const s = input.replace(/,/g, '').trim();
  if (!/^\d+(\.\d{0,4})?$/.test(s)) return null;
  const [w, f = ''] = s.split('.');
  const v = Number(w) * 10000 + Number((f + '0000').slice(0, 4));
  return Number.isSafeInteger(v) && v > 0 ? v : null;
}

export type LineErrorKey = 'description' | 'qty' | 'unitPrice' | 'discountPct' | 'taxRatePct' | 'mrp';
export type LineErrors = Partial<Record<LineErrorKey, string>>;

export interface CalcLine {
  id: string;
  /** Index into data.items. */
  index: number;
  qtyMilli: number;
  price: Minor;
  mrp: Minor | null;
  gross: Minor;
  discountBp: number;
  discount: Minor;
  taxable: Minor;
  rateBp: number;
  cgst: Minor;
  sgst: Minor;
  igst: Minor;
  tax: Minor;
  total: Minor;
}

export interface TaxRow {
  rateBp: number;
  taxable: Minor;
  cgst: Minor;
  sgst: Minor;
  igst: Minor;
  tax: Minor;
}

export interface DocumentTotals {
  currency: string;
  decimals: number;
  mode: TaxMode;
  /** india-gst / export-igst only. */
  supply: Supply | null;
  taxLabel: string;
  lines: CalcLine[];
  lineErrors: Record<string, LineErrors>;
  chargeErrors: Partial<Record<'freight' | 'insurance' | 'other' | 'taxRatePct' | 'docRatePct' | 'exchangeRate', string>>;
  gross: Minor;
  discount: Minor;
  /** Sum of line taxable values (after discount, before tax and charges). */
  subtotal: Minor;
  freight: Minor;
  insurance: Minor;
  other: Minor;
  charges: Minor;
  chargesRateBp: number;
  cgst: Minor;
  sgst: Minor;
  igst: Minor;
  tax: Minor;
  roundOff: Minor;
  total: Minor;
  breakdown: TaxRow[];
  words: string;
  /** INR value of the total at the entered exchange rate (paise), when currency ≠ INR and a rate is given. */
  totalInr: Minor | null;
}

export function isGstMode(mode: TaxMode): boolean {
  return mode === 'india-gst' || mode === 'export-igst' || mode === 'export-zero-rated';
}
export function hasTax(mode: TaxMode): boolean {
  return mode === 'india-gst' || mode === 'export-igst' || mode === 'single';
}

/** The party that charges GST: you (invoices) or the supplier (purchase orders). */
export function supplierOf(data: Pick<DocumentData, 'templateId' | 'seller' | 'buyer'>): PartyData {
  return TEMPLATE_KIND[data.templateId] === 'purchase-order' ? data.buyer : data.seller;
}

export function supplyFor(data: Pick<DocumentData, 'templateId' | 'seller' | 'buyer' | 'meta' | 'tax'>): Supply | null {
  const mode = data.tax.mode;
  if (mode === 'export-igst' || mode === 'export-zero-rated') return 'inter';
  if (mode !== 'india-gst') return null;
  const s = supplierOf(data).stateCode, p = data.meta.placeOfSupply;
  return s && p && s !== p ? 'inter' : 'intra';
}

function splitTax(taxable: Minor, rateBp: number, mode: TaxMode, supply: Supply | null) {
  let cgst = 0, sgst = 0, igst = 0, tax = 0;
  if (mode === 'india-gst' && supply === 'intra') {
    // CGST and SGST each at half the rate on the taxable value, as printed on invoices.
    cgst = sgst = pctOf(taxable, rateBp, 20000);
    tax = cgst + sgst;
  } else if (mode === 'india-gst' || mode === 'export-igst') {
    igst = tax = pctOf(taxable, rateBp);
  } else if (mode === 'single') {
    tax = pctOf(taxable, rateBp);
  }
  return { cgst, sgst, igst, tax };
}

const isBlankLine = (it: LineItem) => !it.description.trim() && !it.unitPrice.trim() && !it.code.trim();

/** Words for an amount: Indian system for INR ("Rupees … Paise Only"), international for other currencies. */
export function amountWords(minor: Minor, code: string): string {
  const c = currencyInfo(code);
  if (c.code === 'INR') return amountInWords(minor);
  const abs = Math.abs(minor);
  const per = minorPerMajor(code);
  const major = Math.floor(abs / per);
  const rest = abs % per;
  const minorText = rest && c.minor ? ` and ${numberToInternationalWords(rest)} ${c.minor}` : '';
  return `${c.major} ${numberToInternationalWords(major)}${minorText} Only`;
}

export function computeDocument(data: DocumentData): DocumentTotals {
  const code = data.meta.currency;
  const decimals = currencyInfo(code).decimals;
  const mode = data.tax.mode;
  const supply = supplyFor(data);
  const lineErrors: Record<string, LineErrors> = {};
  const chargeErrors: DocumentTotals['chargeErrors'] = {};

  let docRate: number | null = 0;
  if (mode === 'single' && !data.tax.perLine) {
    docRate = data.tax.docRatePct.trim() ? parseRate(data.tax.docRatePct) : 0;
    if (docRate === null) { chargeErrors.docRatePct = 'Enter a rate between 0 and 100.'; docRate = 0; }
  }

  const lines: CalcLine[] = [];
  data.items.forEach((it, index) => {
    const e: LineErrors = {};
    const blank = isBlankLine(it);
    const qty = parseQty(it.qty);
    const price = it.unitPrice.trim() ? parseMinor(it.unitPrice, decimals) : null;
    const disc = it.discountPct.trim() ? parseRate(it.discountPct) : 0;
    let rate: number | null = 0;
    if (mode === 'india-gst' || mode === 'export-igst' || (mode === 'single' && data.tax.perLine)) {
      rate = it.taxRatePct.trim() ? parseRate(it.taxRatePct) : 0;
    } else if (mode === 'single') rate = docRate;
    const mrp = it.mrp.trim() ? parseMinor(it.mrp, decimals) : null;
    if (!blank) {
      if (!it.description.trim()) e.description = 'Enter a description.';
      if (qty === null || qty === 0) e.qty = 'Enter a quantity (up to 3 decimals).';
      if (price === null || price < 0) e.unitPrice = decimals ? `Enter a price (up to ${decimals} decimals).` : 'Enter a whole-number price.';
    }
    if (disc === null) e.discountPct = 'Discount must be 0–100%.';
    if (rate === null) e.taxRatePct = 'Tax rate must be 0–100%.';
    if (it.mrp.trim() && (mrp === null || mrp < 0)) e.mrp = 'Enter a valid MRP.';
    if (Object.keys(e).length) lineErrors[it.id] = e;
    if (blank || Object.keys(e).length || qty === null || price === null || disc === null || rate === null) return;
    const gross = mulDivRound(qty, price, 1000);
    const discount = Math.min(gross, pctOf(gross, disc));
    const taxable = gross - discount;
    const t = splitTax(taxable, rate, mode, supply);
    lines.push({
      id: it.id, index, qtyMilli: qty, price, mrp, gross, discountBp: disc, discount, taxable, rateBp: rate,
      ...t, total: taxable + t.tax,
    });
  });

  const charge = (k: 'freight' | 'insurance' | 'other'): Minor => {
    const raw = data.charges[k].trim();
    if (!raw) return 0;
    const v = parseMinor(raw, decimals);
    if (v === null || v < 0) { chargeErrors[k] = 'Enter a valid amount.'; return 0; }
    return v;
  };
  const freight = charge('freight'), insurance = charge('insurance'), other = charge('other');
  const charges = freight + insurance + other;
  let chargesRateBp = 0;
  if (hasTax(mode) && data.charges.taxRatePct.trim()) {
    const r = parseRate(data.charges.taxRatePct);
    if (r === null) chargeErrors.taxRatePct = 'Tax rate must be 0–100%.';
    else chargesRateBp = r;
  }
  const chargeTax = splitTax(charges, chargesRateBp, mode, supply);

  const byRate = new Map<number, TaxRow>();
  const addRow = (rateBp: number, taxable: Minor, t: { cgst: Minor; sgst: Minor; igst: Minor; tax: Minor }) => {
    const r = byRate.get(rateBp) ?? { rateBp, taxable: 0, cgst: 0, sgst: 0, igst: 0, tax: 0 };
    r.taxable += taxable; r.cgst += t.cgst; r.sgst += t.sgst; r.igst += t.igst; r.tax += t.tax;
    byRate.set(rateBp, r);
  };
  lines.forEach((l) => addRow(l.rateBp, l.taxable, l));
  if (charges && hasTax(mode) && data.charges.taxRatePct.trim()) addRow(chargesRateBp, charges, chargeTax);

  const sum = (k: 'gross' | 'discount' | 'taxable' | 'cgst' | 'sgst' | 'igst' | 'tax') => lines.reduce((a, l) => a + l[k], 0);
  const subtotal = sum('taxable');
  const cgst = sum('cgst') + chargeTax.cgst;
  const sgst = sum('sgst') + chargeTax.sgst;
  const igst = sum('igst') + chargeTax.igst;
  const tax = sum('tax') + chargeTax.tax;
  const pre = subtotal + charges + tax;
  const unit = minorPerMajor(code);
  const total = data.tax.roundOff && unit > 1 ? mulDivRound(pre, 1, unit) * unit : pre;

  let totalInr: Minor | null = null;
  if (code !== 'INR' && data.shipping.exchangeRate.trim()) {
    const r4 = parseRate4(data.shipping.exchangeRate);
    if (r4 === null) chargeErrors.exchangeRate = 'Enter the rate as a number, e.g. 83.25.';
    else totalInr = mulDivRound(total * (100 / unit), r4, 10000);
  }

  return {
    currency: code,
    decimals,
    mode,
    supply,
    taxLabel: mode === 'single' ? data.tax.label.trim() || 'Tax' : isGstMode(mode) ? 'GST' : '',
    lines,
    lineErrors,
    chargeErrors,
    gross: sum('gross'),
    discount: sum('discount'),
    subtotal,
    freight,
    insurance,
    other,
    charges,
    chargesRateBp,
    cgst,
    sgst,
    igst,
    tax,
    roundOff: total - pre,
    total,
    breakdown: [...byRate.values()].sort((a, b) => a.rateBp - b.rateBp),
    words: amountWords(total, code),
    totalInr,
  };
}

/* ---------------- validation ---------------- */

export type FieldErrorKey =
  | 'number' | 'issueDate' | 'dueDate' | 'sellerName' | 'buyerName' | 'sellerTaxId' | 'buyerTaxId' | 'shipToTaxId'
  | 'placeOfSupply' | 'sellerState' | 'iec' | 'email';

export interface Validation {
  fieldErrors: Partial<Record<FieldErrorKey, string>>;
  warnings: string[];
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function gstinProblem(v: string): string | null {
  if (!v.trim()) return null;
  const c = checkGstin(v);
  return c.valid ? null : c.errors[0] ?? 'Check this GSTIN.';
}

export function validateDocument(
  data: DocumentData,
  totals: DocumentTotals,
  opts: { numberLabel: string; sellerLabel: string; buyerLabel: string; indiaGst: boolean; requireIec?: boolean },
): Validation {
  const fe: Validation['fieldErrors'] = {};
  const warnings: string[] = [];
  if (!data.meta.number.trim()) fe.number = `Enter the ${opts.numberLabel.toLowerCase()}.`;
  if (!data.meta.issueDate) fe.issueDate = 'Enter the date.';
  else if (!ISO_DATE.test(data.meta.issueDate)) fe.issueDate = 'Use a valid date.';
  if (data.meta.dueDate && data.meta.issueDate && data.meta.dueDate < data.meta.issueDate) fe.dueDate = 'This is before the document date.';
  if (!data.seller.name.trim()) fe.sellerName = `Enter the ${opts.sellerLabel.toLowerCase()} name.`;
  if (!data.buyer.name.trim()) fe.buyerName = `Enter the ${opts.buyerLabel.toLowerCase()} name.`;
  for (const [k, p] of [['email', data.seller.email], ['email', data.buyer.email]] as const) {
    if (p.trim() && !EMAIL.test(p.trim())) fe[k] = 'Check the email address.';
  }
  const gstChecks = opts.indiaGst || data.tax.mode === 'export-igst' || data.tax.mode === 'export-zero-rated';
  if (gstChecks) {
    const s = gstinProblem(data.seller.taxId);
    if (s) fe.sellerTaxId = s;
    else if (!data.seller.taxId.trim() && opts.indiaGst) warnings.push(`Your GSTIN is missing.`);
    if (opts.indiaGst) {
      const b = gstinProblem(data.buyer.taxId);
      if (b) fe.buyerTaxId = b;
      if (!data.shipToSame) {
        const sh = gstinProblem(data.shipTo.taxId);
        if (sh) fe.shipToTaxId = sh;
      }
    }
  }
  if (data.tax.mode === 'india-gst') {
    if (!supplierOf(data).stateCode) {
      if (TEMPLATE_KIND[data.templateId] === 'purchase-order') {
        warnings.push(`Select the ${opts.buyerLabel.toLowerCase()} state so CGST + SGST or IGST can be worked out.`);
      } else fe.sellerState = 'Select your state.';
    }
    if (!data.meta.placeOfSupply) fe.placeOfSupply = 'Select the place of supply.';
    const sg = data.seller.taxId.trim().toUpperCase();
    if (sg && !fe.sellerTaxId && data.seller.stateCode && sg.slice(0, 2) !== data.seller.stateCode) {
      warnings.push('The first two digits of your GSTIN do not match your state code.');
    }
    const bg = data.buyer.taxId.trim().toUpperCase();
    if (bg && !fe.buyerTaxId && data.buyer.stateCode && bg.slice(0, 2) !== data.buyer.stateCode) {
      warnings.push(`The first two digits of the ${opts.buyerLabel.toLowerCase()} GSTIN do not match their state code.`);
    }
  }
  if (opts.requireIec && data.shipping.iec.trim() && !/^[A-Z0-9]{10}$/i.test(data.shipping.iec.trim())) {
    fe.iec = 'An IEC has 10 characters.';
  }
  if (!totals.lines.length) warnings.push('Add at least one complete line item.');
  if (Object.keys(totals.lineErrors).length) warnings.push('Some line items have errors and are left out of the totals.');
  if (Object.keys(totals.chargeErrors).length) warnings.push('Check the charges and tax settings.');
  return { fieldErrors: fe, warnings };
}
