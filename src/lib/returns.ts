// Pure logic for the GST return preparation / reconciliation tools (GSTR-1 checker,
// GSTR-1 vs GSTR-3B, purchase register vs GSTR-2B). All amounts are integers in paise.
// Runs entirely in the browser; nothing here talks to the GST portal.
import { checkGstin } from './gstin';
import { parseIndianDate } from './csv';
import { parseAmount, parseQty, parseRate, pct, roundHalfUp, type Paise } from './money';
import { GST_STATES } from '@/components/tools/invoice/states';

export const MAX_ROWS = 5000;

/** Parses an amount cell: blank → 0, "1,234.50" → paise, longer decimals rounded. null if not a number. */
export function parseCellAmount(s: string | undefined): Paise | null {
  const t = (s ?? '').trim();
  if (!t || t === '-') return 0;
  const exact = parseAmount(t);
  if (exact !== null) return exact;
  const cleaned = t.replace(/[,\s₹]/g, '');
  if (!/^-?\d*\.?\d+$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? roundHalfUp(n * 100) : null;
}

/** Reads a state code from "24", "24-Gujarat", "Gujarat (24)" etc. */
export function parseStateCode(s: string | undefined): string | null {
  const t = (s ?? '').trim();
  if (!t) return null;
  const m = t.match(/\b(\d{1,2})\b/);
  let code: string | null = m ? m[1].padStart(2, '0') : null;
  if (!code) {
    const byName = GST_STATES.find((st) => st.name.toLowerCase() === t.toLowerCase());
    code = byName?.code ?? null;
  }
  return code && GST_STATES.some((st) => st.code === code) ? code : null;
}

export interface Issue {
  level: 'error' | 'warning';
  msg: string;
}
export type RowStatus = 'error' | 'warning' | 'ok';

export function statusOf(issues: Issue[]): RowStatus {
  if (issues.some((i) => i.level === 'error')) return 'error';
  return issues.length ? 'warning' : 'ok';
}

export interface TaxFigures {
  taxable: Paise;
  igst: Paise;
  cgst: Paise;
  sgst: Paise;
  cess: Paise;
}
export const ZERO: TaxFigures = { taxable: 0, igst: 0, cgst: 0, sgst: 0, cess: 0 };
export const TAX_HEADS = ['taxable', 'igst', 'cgst', 'sgst', 'cess'] as const;
export type TaxHead = (typeof TAX_HEADS)[number];
export const HEAD_LABEL: Record<TaxHead, string> = { taxable: 'Taxable', igst: 'IGST', cgst: 'CGST', sgst: 'SGST', cess: 'Cess' };

export function addFigures(a: TaxFigures, b: TaxFigures): TaxFigures {
  return { taxable: a.taxable + b.taxable, igst: a.igst + b.igst, cgst: a.cgst + b.cgst, sgst: a.sgst + b.sgst, cess: a.cess + b.cess };
}
export function subFigures(a: TaxFigures, b: TaxFigures): TaxFigures {
  return { taxable: a.taxable - b.taxable, igst: a.igst - b.igst, cgst: a.cgst - b.cgst, sgst: a.sgst - b.sgst, cess: a.cess - b.cess };
}
export function totalTax(f: TaxFigures): Paise {
  return f.igst + f.cgst + f.sgst + f.cess;
}

// ───────────────────────────── GSTR-1 checker ─────────────────────────────

export const SALES_ALIASES: Record<string, string[]> = {
  invoiceNo: ['invoice no', 'invoice number', 'inv no', 'bill no', 'document number', 'doc no', 'voucher no'],
  invoiceDate: ['invoice date', 'inv date', 'date', 'bill date', 'document date'],
  gstin: ['recipient gstin', 'gstin', 'gstin/uin of recipient', 'gstin of recipient', 'buyer gstin', 'customer gstin', 'party gstin'],
  name: ['recipient name', 'receiver name', 'buyer name', 'customer name', 'party name', 'name'],
  pos: ['place of supply', 'pos', 'pos state code', 'place of supply state code', 'state code'],
  invoiceValue: ['invoice value', 'total value', 'invoice amount', 'bill amount', 'gross amount'],
  taxable: ['taxable value', 'taxable amount', 'taxable', 'assessable value'],
  rate: ['rate', 'gst rate', 'tax rate', 'rate %', 'gst %'],
  igst: ['igst', 'igst amount', 'integrated tax'],
  cgst: ['cgst', 'cgst amount', 'central tax'],
  sgst: ['sgst', 'sgst amount', 'sgst/utgst', 'state tax', 'state/ut tax', 'utgst'],
  cess: ['cess', 'cess amount'],
  hsn: ['hsn', 'hsn code', 'hsn/sac', 'sac'],
  qty: ['qty', 'quantity', 'total quantity'],
  uqc: ['uqc', 'unit', 'units', 'uom'],
};
export const SALES_REQUIRED = ['invoiceNo', 'invoiceDate', 'pos', 'invoiceValue', 'taxable', 'rate'];
export const SALES_LABELS: Record<string, string> = {
  invoiceNo: 'Invoice No', invoiceDate: 'Invoice Date', gstin: 'Recipient GSTIN', name: 'Recipient Name', pos: 'Place of Supply',
  invoiceValue: 'Invoice Value', taxable: 'Taxable Value', rate: 'Rate', igst: 'IGST', cgst: 'CGST', sgst: 'SGST', cess: 'Cess',
  hsn: 'HSN', qty: 'Qty', uqc: 'UQC',
};

export type Gstr1Section = 'B2B' | 'B2CL' | 'B2CS';

export interface Gstr1Options {
  supplierState: string; // 2-digit state code of the supplier
  period: string; // "YYYY-MM"
  b2clThreshold: Paise; // B2CL when invoice value is above this
  tolerance?: Paise; // tax maths tolerance, default ₹1
}

export interface Gstr1Row extends TaxFigures {
  line: number; // 1-based data row number (header excluded)
  invoiceNo: string;
  dateRaw: string;
  date: string | null;
  gstin: string;
  name: string;
  pos: string | null;
  posRaw: string;
  invoiceValue: Paise;
  rateBp: number | null;
  hsn: string;
  qtyMilli: number;
  uqc: string;
  interState: boolean;
  section: Gstr1Section;
  issues: Issue[];
  status: RowStatus;
}

export interface Gstr1SectionTotal extends TaxFigures {
  section: Gstr1Section;
  invoices: number;
  rows: number;
}
export interface Gstr1RateTotal extends TaxFigures {
  rateBp: number;
  rows: number;
}
export interface Gstr1HsnTotal extends TaxFigures {
  hsn: string;
  uqc: string;
  rateBp: number;
  qtyMilli: number;
  tax: Paise;
}

export interface Gstr1Result {
  rows: Gstr1Row[];
  sections: Gstr1SectionTotal[];
  rates: Gstr1RateTotal[];
  hsn: Gstr1HsnTotal[];
  counts: Record<RowStatus, number>;
}

/** Invoice number: up to 16 characters, letters, digits, hyphen "-" and slash "/". */
export function invoiceNoIssues(no: string): Issue[] {
  const out: Issue[] = [];
  if (!no) { out.push({ level: 'error', msg: 'Invoice number is missing.' }); return out; }
  if (no.length > 16) out.push({ level: 'error', msg: `Invoice number has ${no.length} characters; the limit is 16.` });
  if (!/^[A-Za-z0-9/-]+$/.test(no)) out.push({ level: 'error', msg: 'Invoice number may contain only letters, digits, "-" and "/".' });
  return out;
}

export function classifySupply(hasGstin: boolean, interState: boolean, invoiceValue: Paise, threshold: Paise): Gstr1Section {
  if (hasGstin) return 'B2B';
  if (interState && invoiceValue > threshold) return 'B2CL';
  return 'B2CS';
}

export function checkGstr1(input: Record<string, string>[], opts: Gstr1Options): Gstr1Result {
  const tol = opts.tolerance ?? 100;
  const rows: Gstr1Row[] = input.slice(0, MAX_ROWS).map((r, idx) => {
    const issues: Issue[] = [];
    const invoiceNo = (r.invoiceNo ?? '').trim();
    issues.push(...invoiceNoIssues(invoiceNo));

    const dateRaw = (r.invoiceDate ?? '').trim();
    const date = dateRaw ? parseIndianDate(dateRaw) : null;
    if (!dateRaw) issues.push({ level: 'error', msg: 'Invoice date is missing.' });
    else if (!date) issues.push({ level: 'error', msg: `"${dateRaw}" is not a valid date (use DD/MM/YYYY).` });
    else if (opts.period && date.slice(0, 7) !== opts.period) {
      issues.push({ level: 'warning', msg: `Date ${dateRaw} is outside the selected tax period.` });
    }

    const gstin = (r.gstin ?? '').replace(/\s+/g, '').toUpperCase();
    if (gstin) {
      const g = checkGstin(gstin);
      if (!g.valid) issues.push({ level: 'error', msg: `Recipient GSTIN: ${g.errors[0]}` });
    }

    const posRaw = (r.pos ?? '').trim();
    let pos = parseStateCode(posRaw);
    if (!pos && !posRaw && gstin) pos = parseStateCode(gstin.slice(0, 2));
    if (!pos) issues.push({ level: 'error', msg: posRaw ? `Place of supply "${posRaw}" is not a valid state code.` : 'Place of supply is missing.' });
    const interState = pos ? pos !== opts.supplierState : false;

    const num = (k: string, label: string) => {
      const v = parseCellAmount(r[k]);
      if (v === null) { issues.push({ level: 'error', msg: `${label} "${r[k]}" is not a number.` }); return 0; }
      return v;
    };
    const invoiceValue = num('invoiceValue', 'Invoice value');
    const taxable = num('taxable', 'Taxable value');
    const igst = num('igst', 'IGST');
    const cgst = num('cgst', 'CGST');
    const sgst = num('sgst', 'SGST');
    const cess = num('cess', 'Cess');

    const rateRaw = (r.rate ?? '').trim();
    const rateBp = rateRaw ? parseRate(rateRaw) : null;
    if (rateBp === null) issues.push({ level: 'error', msg: rateRaw ? `Rate "${rateRaw}" is not valid.` : 'Rate is missing.' });

    if (cgst !== sgst) issues.push({ level: 'error', msg: 'CGST and SGST should be equal.' });
    if (pos) {
      if (interState && (cgst || sgst)) issues.push({ level: 'error', msg: 'Inter-state supply (place of supply differs from your state) should carry IGST, not CGST/SGST.' });
      if (!interState && igst) issues.push({ level: 'error', msg: 'Intra-state supply (place of supply is your state) should carry CGST + SGST, not IGST.' });
    }
    if (rateBp !== null) {
      const expected = pct(taxable, rateBp);
      const actual = igst + cgst + sgst;
      if (Math.abs(expected - actual) > tol) {
        issues.push({ level: 'error', msg: `Tax ${(actual / 100).toFixed(2)} does not match taxable × rate = ${(expected / 100).toFixed(2)}.` });
      }
    }
    if (taxable <= 0) issues.push({ level: 'warning', msg: 'Taxable value is zero or negative.' });
    if (invoiceValue + tol < taxable + igst + cgst + sgst + cess && invoiceValue > 0) {
      issues.push({ level: 'warning', msg: 'Invoice value is less than taxable value plus tax on this row.' });
    }

    const hsn = (r.hsn ?? '').trim();
    if (!hsn) issues.push({ level: 'warning', msg: 'HSN/SAC is missing (needed for the HSN summary).' });
    else if (!/^\d{4}$|^\d{6}$|^\d{8}$/.test(hsn)) issues.push({ level: 'warning', msg: `HSN "${hsn}" should be 4, 6 or 8 digits.` });

    const qtyRaw = (r.qty ?? '').replace(/,/g, '').trim();
    const qtyMilli = qtyRaw ? parseQty(qtyRaw) ?? 0 : 0;
    if (qtyRaw && parseQty(qtyRaw) === null) issues.push({ level: 'warning', msg: `Quantity "${r.qty}" is not a number.` });
    const uqc = (r.uqc ?? '').trim().toUpperCase();
    if (qtyMilli && !uqc) issues.push({ level: 'warning', msg: 'UQC (unit) is missing.' });

    const section = classifySupply(!!gstin, interState, invoiceValue, opts.b2clThreshold);
    return {
      line: idx + 1, invoiceNo, dateRaw, date, gstin, name: (r.name ?? '').trim(), pos, posRaw, invoiceValue,
      taxable, igst, cgst, sgst, cess, rateBp, hsn, qtyMilli, uqc, interState, section, issues, status: 'ok' as RowStatus,
    };
  });

  // Duplicate invoice numbers. Several rows for one invoice are normal (one per rate/HSN), so only
  // flag rows whose date or recipient differs, or exact repeats of the same invoice + rate + HSN.
  const groups = new Map<string, Gstr1Row[]>();
  for (const row of rows) {
    if (!row.invoiceNo) continue;
    const k = row.invoiceNo.toUpperCase();
    const g = groups.get(k);
    if (g) g.push(row); else groups.set(k, [row]);
  }
  for (const g of groups.values()) {
    if (g.length < 2) continue;
    const first = g[0];
    const conflicting = g.some((x) => x.dateRaw !== first.dateRaw || x.gstin !== first.gstin);
    if (conflicting) {
      const lines = g.map((x) => x.line).join(', ');
      g.forEach((x) => x.issues.push({ level: 'error', msg: `Duplicate invoice number: used on rows ${lines} with a different date or recipient.` }));
      continue;
    }
    const seen = new Map<string, number>();
    for (const x of g) {
      const k = `${x.rateBp}|${x.hsn}`;
      const prev = seen.get(k);
      if (prev !== undefined) x.issues.push({ level: 'warning', msg: `Possible duplicate entry: same invoice, rate and HSN as row ${prev}.` });
      else seen.set(k, x.line);
    }
  }

  const counts: Record<RowStatus, number> = { error: 0, warning: 0, ok: 0 };
  for (const row of rows) { row.status = statusOf(row.issues); counts[row.status]++; }

  const secMap = new Map<Gstr1Section, Gstr1SectionTotal & { inv: Set<string> }>();
  (['B2B', 'B2CL', 'B2CS'] as Gstr1Section[]).forEach((s) => secMap.set(s, { section: s, invoices: 0, rows: 0, ...ZERO, inv: new Set() }));
  const rateMap = new Map<number, Gstr1RateTotal>();
  const hsnMap = new Map<string, Gstr1HsnTotal>();
  for (const row of rows) {
    const s = secMap.get(row.section)!;
    Object.assign(s, addFigures(s, row));
    s.rows++;
    s.inv.add(row.invoiceNo.toUpperCase() || `#${row.line}`);
    const bp = row.rateBp ?? -1;
    const rt = rateMap.get(bp) ?? { rateBp: bp, rows: 0, ...ZERO };
    Object.assign(rt, addFigures(rt, row));
    rt.rows++;
    rateMap.set(bp, rt);
    const hk = `${row.hsn}|${row.uqc}|${bp}`;
    const h = hsnMap.get(hk) ?? { hsn: row.hsn, uqc: row.uqc, rateBp: bp, qtyMilli: 0, tax: 0, ...ZERO };
    Object.assign(h, addFigures(h, row));
    h.qtyMilli += row.qtyMilli;
    h.tax = totalTax(h);
    hsnMap.set(hk, h);
  }
  const sections = [...secMap.values()].map(({ inv, ...s }) => ({ ...s, invoices: inv.size }));
  return {
    rows,
    sections,
    rates: [...rateMap.values()].sort((a, b) => a.rateBp - b.rateBp),
    hsn: [...hsnMap.values()].sort((a, b) => a.hsn.localeCompare(b.hsn) || a.rateBp - b.rateBp),
    counts,
  };
}

// ───────────────────────── GSTR-1 vs GSTR-3B ─────────────────────────

export interface FyMonth {
  key: string; // YYYY-MM
  label: string; // "Apr 2026"
  month: number; // 1–12
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Twelve months of the financial year starting April of `startYear`. */
export function fyMonths(startYear: number): FyMonth[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = ((i + 3) % 12) + 1;
    const year = month >= 4 ? startYear : startYear + 1;
    return { key: `${year}-${String(month).padStart(2, '0')}`, label: `${MONTHS[month - 1]} ${year}`, month };
  });
}

/** Reads a month from "Apr", "April", "Apr-26", "04/2026", "2026-04". */
export function parseMonth(s: string): number | null {
  const t = s.trim().toLowerCase();
  if (!t) return null;
  const name = MONTHS.findIndex((m) => t.startsWith(m.toLowerCase()));
  if (name >= 0) return name + 1;
  let m = t.match(/^(\d{4})[-/](\d{1,2})$/);
  if (m) { const n = +m[2]; return n >= 1 && n <= 12 ? n : null; }
  m = t.match(/^(\d{1,2})[-/](\d{2,4})$/);
  if (m) { const n = +m[1]; return n >= 1 && n <= 12 ? n : null; }
  return null;
}

export interface MonthFigures {
  g1: TaxFigures;
  g3b: TaxFigures;
}
export type ReconStatus = 'short' | 'excess' | 'match';
export interface MonthRecon extends MonthFigures {
  diff: TaxFigures; // GSTR-3B minus GSTR-1
  taxDiff: Paise; // total tax difference (3B − GSTR-1)
  status: ReconStatus; // based on total tax
  headStatus: Record<TaxHead, ReconStatus>;
}

function cmp(d: Paise, tol: Paise): ReconStatus {
  if (d < -tol) return 'short';
  if (d > tol) return 'excess';
  return 'match';
}

export function reconcileMonth(m: MonthFigures, tol: Paise = 100): MonthRecon {
  const diff = subFigures(m.g3b, m.g1);
  const taxDiff = totalTax(diff);
  const headStatus = Object.fromEntries(TAX_HEADS.map((h) => [h, cmp(diff[h], tol)])) as Record<TaxHead, ReconStatus>;
  return { ...m, diff, taxDiff, status: cmp(taxDiff, tol), headStatus };
}

export function reconcile1vs3b(months: MonthFigures[], tol: Paise = 100): { months: MonthRecon[]; annual: MonthRecon } {
  const res = months.map((m) => reconcileMonth(m, tol));
  const sum = months.reduce<MonthFigures>((a, m) => ({ g1: addFigures(a.g1, m.g1), g3b: addFigures(a.g3b, m.g3b) }), { g1: ZERO, g3b: ZERO });
  return { months: res, annual: reconcileMonth(sum, tol) };
}

export const MONTHLY_ALIASES: Record<string, string[]> = {
  month: ['month', 'period', 'tax period', 'return period'],
  g1Taxable: ['gstr-1 taxable', 'gstr1 taxable', 'r1 taxable', 'g1 taxable'],
  g1Igst: ['gstr-1 igst', 'gstr1 igst', 'r1 igst', 'g1 igst'],
  g1Cgst: ['gstr-1 cgst', 'gstr1 cgst', 'r1 cgst', 'g1 cgst'],
  g1Sgst: ['gstr-1 sgst', 'gstr1 sgst', 'r1 sgst', 'g1 sgst'],
  g1Cess: ['gstr-1 cess', 'gstr1 cess', 'r1 cess', 'g1 cess'],
  g3bTaxable: ['gstr-3b taxable', 'gstr3b taxable', '3b taxable'],
  g3bIgst: ['gstr-3b igst', 'gstr3b igst', '3b igst'],
  g3bCgst: ['gstr-3b cgst', 'gstr3b cgst', '3b cgst'],
  g3bSgst: ['gstr-3b sgst', 'gstr3b sgst', '3b sgst'],
  g3bCess: ['gstr-3b cess', 'gstr3b cess', '3b cess'],
};

/**
 * Turns pasted monthly rows into figures keyed by FY index (0 = April). Uses a Month column when
 * present, otherwise takes rows in order from April.
 */
export function parseMonthlyRows(rows: Record<string, string>[]): { data: Map<number, MonthFigures>; errors: string[] } {
  const data = new Map<number, MonthFigures>();
  const errors: string[] = [];
  rows.slice(0, 24).forEach((r, i) => {
    let idx = i;
    if (r.month !== undefined) {
      const m = parseMonth(r.month);
      if (m === null) { errors.push(`Row ${i + 1}: month "${r.month}" not recognised.`); return; }
      idx = (m + 8) % 12; // April → 0
    }
    if (idx > 11) return;
    const read = (k: string) => {
      const v = parseCellAmount(r[k]);
      if (v === null) { errors.push(`Row ${i + 1}: "${r[k]}" is not a number.`); return 0; }
      return v;
    };
    data.set(idx, {
      g1: { taxable: read('g1Taxable'), igst: read('g1Igst'), cgst: read('g1Cgst'), sgst: read('g1Sgst'), cess: read('g1Cess') },
      g3b: { taxable: read('g3bTaxable'), igst: read('g3bIgst'), cgst: read('g3bCgst'), sgst: read('g3bSgst'), cess: read('g3bCess') },
    });
  });
  return { data, errors };
}

// ───────────────────── Purchase register vs GSTR-2B ─────────────────────

export const PURCHASE_ALIASES: Record<string, string[]> = {
  gstin: ['supplier gstin', 'gstin of supplier', 'gstin', 'party gstin', 'vendor gstin', 'gstin/uin of supplier'],
  name: ['supplier name', 'trade/legal name', 'trade name', 'legal name', 'party name', 'vendor name', 'name'],
  invoiceNo: ['invoice no', 'invoice number', 'bill no', 'supplier invoice no', 'document number', 'doc no', 'inv no'],
  invoiceDate: ['invoice date', 'bill date', 'date', 'document date', 'inv date'],
  taxable: ['taxable value', 'taxable value (₹)', 'taxable', 'taxable amount'],
  igst: ['igst', 'integrated tax', 'integrated tax(₹)', 'igst amount'],
  cgst: ['cgst', 'central tax', 'central tax(₹)', 'cgst amount'],
  sgst: ['sgst', 'state/ut tax', 'state/ut tax(₹)', 'state tax', 'sgst amount', 'sgst/utgst'],
};
export const PURCHASE_REQUIRED = ['gstin', 'invoiceNo', 'taxable'];
export const PURCHASE_LABELS: Record<string, string> = {
  gstin: 'Supplier GSTIN', name: 'Supplier Name', invoiceNo: 'Invoice No', invoiceDate: 'Invoice Date',
  taxable: 'Taxable Value', igst: 'IGST', cgst: 'CGST', sgst: 'SGST',
};

export interface NormaliseOptions {
  stripLeadingZeros: boolean;
  ignoreSeparators: boolean;
}

/** Normalises an invoice number for matching: upper-case, no spaces, optional separator / leading-zero removal. */
export function normaliseInvoiceNo(no: string, o: NormaliseOptions): string {
  let s = no.toUpperCase().replace(/\s+/g, '');
  if (o.ignoreSeparators) s = s.replace(/[/\-\\._]/g, '');
  if (o.stripLeadingZeros) s = s.replace(/(^|\D)0+(?=\d)/g, '$1');
  return s;
}

export interface PurchaseInvoice {
  gstin: string;
  name: string;
  invoiceNo: string;
  date: string; // as entered
  values: { taxable: Paise; igst: Paise; cgst: Paise; sgst: Paise };
  lines: number[];
}

export type MatchStatus = 'matched' | 'mismatch' | 'books-only' | '2b-only' | 'possible';
export const MATCH_LABEL: Record<MatchStatus, string> = {
  matched: 'Matched',
  mismatch: 'Value mismatch',
  'books-only': 'In books, not in 2B',
  '2b-only': 'In 2B, not in books',
  possible: 'Possible match',
};

type Vals = PurchaseInvoice['values'];
const VAL_HEADS = ['taxable', 'igst', 'cgst', 'sgst'] as const;

export interface MatchRow {
  status: MatchStatus;
  gstin: string;
  name: string;
  books: PurchaseInvoice | null;
  twob: PurchaseInvoice | null;
  diff: Vals | null; // 2B minus books
  notes: string[];
}

export interface SupplierSummary {
  gstin: string;
  name: string;
  counts: Record<MatchStatus, number>;
  booksTax: Paise;
  twobTax: Paise;
  diffTax: Paise; // 2B − books
}

export interface InputProblem {
  source: 'books' | '2b';
  line: number;
  msg: string;
}

export interface Recon2bResult {
  rows: MatchRow[];
  suppliers: SupplierSummary[];
  problems: InputProblem[];
  counts: Record<MatchStatus, number>;
}

export interface Recon2bOptions extends NormaliseOptions {
  tolerance: Paise;
}

function valTax(v: Vals) { return v.igst + v.cgst + v.sgst; }
function valDiff(a: Vals, b: Vals): Vals {
  return { taxable: a.taxable - b.taxable, igst: a.igst - b.igst, cgst: a.cgst - b.cgst, sgst: a.sgst - b.sgst };
}
function within(d: Vals, tol: Paise) { return VAL_HEADS.every((h) => Math.abs(d[h]) <= tol); }

/** Groups rows into invoices by GSTIN + normalised number (multi-rate invoices are summed). */
export function groupInvoices(rows: Record<string, string>[], source: 'books' | '2b', o: NormaliseOptions, problems: InputProblem[]) {
  const map = new Map<string, PurchaseInvoice>();
  rows.slice(0, MAX_ROWS).forEach((r, i) => {
    const line = i + 1;
    const gstin = (r.gstin ?? '').replace(/\s+/g, '').toUpperCase();
    const invoiceNo = (r.invoiceNo ?? '').trim();
    if (!gstin || !invoiceNo) { problems.push({ source, line, msg: 'Missing supplier GSTIN or invoice number; row skipped.' }); return; }
    const g = checkGstin(gstin);
    if (!g.valid) problems.push({ source, line, msg: `GSTIN ${gstin}: ${g.errors[0]}` });
    const vals = {} as Vals;
    for (const h of VAL_HEADS) {
      const v = parseCellAmount(r[h]);
      if (v === null) problems.push({ source, line, msg: `${h.toUpperCase()} "${r[h]}" is not a number; treated as 0.` });
      vals[h] = v ?? 0;
    }
    const key = `${gstin}|${normaliseInvoiceNo(invoiceNo, o)}`;
    const ex = map.get(key);
    if (ex) {
      for (const h of VAL_HEADS) ex.values[h] += vals[h];
      ex.lines.push(line);
    } else {
      map.set(key, { gstin, name: (r.name ?? '').trim(), invoiceNo, date: (r.invoiceDate ?? '').trim(), values: vals, lines: [line] });
    }
  });
  return map;
}

function sameDate(a: string, b: string) {
  if (!a || !b) return true;
  const pa = parseIndianDate(a), pb = parseIndianDate(b);
  return pa && pb ? pa === pb : a === b;
}

export function reconcile2b(booksRows: Record<string, string>[], twobRows: Record<string, string>[], o: Recon2bOptions): Recon2bResult {
  const problems: InputProblem[] = [];
  const books = groupInvoices(booksRows, 'books', o, problems);
  const twob = groupInvoices(twobRows, '2b', o, problems);
  const rows: MatchRow[] = [];
  const booksLeft: PurchaseInvoice[] = [];
  const twobUsed = new Set<string>();

  for (const [key, b] of books) {
    const t = twob.get(key);
    if (!t) { booksLeft.push(b); continue; }
    twobUsed.add(key);
    const diff = valDiff(t.values, b.values);
    const notes: string[] = [];
    if (!sameDate(b.date, t.date)) notes.push(`Date differs: books ${b.date}, 2B ${t.date}.`);
    if (b.invoiceNo !== t.invoiceNo) notes.push(`Matched after normalising: "${b.invoiceNo}" / "${t.invoiceNo}".`);
    rows.push({ status: within(diff, o.tolerance) ? 'matched' : 'mismatch', gstin: b.gstin, name: b.name || t.name, books: b, twob: t, diff, notes });
  }
  const twobLeft = [...twob.entries()].filter(([k]) => !twobUsed.has(k)).map(([, v]) => v);

  // Possible matches: same GSTIN, every value within tolerance, different invoice number.
  const twobTaken = new Set<PurchaseInvoice>();
  for (const b of booksLeft) {
    const candidates = twobLeft.filter((t) => !twobTaken.has(t) && t.gstin === b.gstin && within(valDiff(t.values, b.values), o.tolerance));
    const t = candidates.find((c) => sameDate(b.date, c.date)) ?? candidates[0];
    if (t) {
      twobTaken.add(t);
      rows.push({
        status: 'possible', gstin: b.gstin, name: b.name || t.name, books: b, twob: t, diff: valDiff(t.values, b.values),
        notes: [`Same supplier and amount, but invoice number differs: books "${b.invoiceNo}", 2B "${t.invoiceNo}".`],
      });
    } else {
      rows.push({ status: 'books-only', gstin: b.gstin, name: b.name, books: b, twob: null, diff: null, notes: [] });
    }
  }
  for (const t of twobLeft) {
    if (!twobTaken.has(t)) rows.push({ status: '2b-only', gstin: t.gstin, name: t.name, books: null, twob: t, diff: null, notes: [] });
  }

  const empty = (): Record<MatchStatus, number> => ({ matched: 0, mismatch: 0, 'books-only': 0, '2b-only': 0, possible: 0 });
  const counts = empty();
  const sup = new Map<string, SupplierSummary>();
  for (const r of rows) {
    counts[r.status]++;
    const s = sup.get(r.gstin) ?? { gstin: r.gstin, name: r.name, counts: empty(), booksTax: 0, twobTax: 0, diffTax: 0 };
    if (!s.name && r.name) s.name = r.name;
    s.counts[r.status]++;
    if (r.books) s.booksTax += valTax(r.books.values);
    if (r.twob) s.twobTax += valTax(r.twob.values);
    s.diffTax = s.twobTax - s.booksTax;
    sup.set(r.gstin, s);
  }
  const order: Record<MatchStatus, number> = { mismatch: 0, possible: 1, 'books-only': 2, '2b-only': 3, matched: 4 };
  rows.sort((a, b) => order[a.status] - order[b.status] || a.gstin.localeCompare(b.gstin));
  return { rows, suppliers: [...sup.values()].sort((a, b) => Math.abs(b.diffTax) - Math.abs(a.diffTax)), problems, counts };
}
