// Field-by-field comparison of invoice details and e-way bill (Part A/B) details. Pure functions.
import { headerKey, parseDelimited, parseIndianDate } from './csv';
import { parseAmount, parseQty } from './money';

export const COMPARE_FIELDS = [
  'docNo', 'docDate', 'supplierGstin', 'recipientGstin', 'fromPin', 'toPin', 'hsn', 'qty', 'taxable', 'total', 'vehicleNo',
] as const;
export type CompareField = (typeof COMPARE_FIELDS)[number];
export type DocValues = Partial<Record<CompareField, string>>;

export const COMPARE_LABEL: Record<CompareField, string> = {
  docNo: 'Document number', docDate: 'Document date', supplierGstin: 'Supplier GSTIN', recipientGstin: 'Recipient GSTIN',
  fromPin: 'From PIN', toPin: 'To PIN (place of delivery)', hsn: 'HSN code', qty: 'Quantity', taxable: 'Taxable value',
  total: 'Total invoice value', vehicleNo: 'Vehicle number',
};

const ALIASES: Record<CompareField, string[]> = {
  docNo: ['doc no', 'document no', 'document number', 'invoice no', 'invoice number', 'bill no'],
  docDate: ['doc date', 'document date', 'invoice date', 'date'],
  supplierGstin: ['supplier gstin', 'from gstin', 'gstin of supplier', 'seller gstin', 'consignor gstin'],
  recipientGstin: ['recipient gstin', 'to gstin', 'gstin of recipient', 'buyer gstin', 'consignee gstin'],
  fromPin: ['from pin', 'from pincode', 'dispatch pin'],
  toPin: ['to pin', 'to pincode', 'delivery pin', 'place of delivery'],
  hsn: ['hsn', 'hsn code', 'hsn/sac'],
  qty: ['qty', 'quantity'],
  taxable: ['taxable value', 'taxable amount', 'taxable'],
  total: ['total value', 'total invoice value', 'invoice value', 'total'],
  vehicleNo: ['vehicle no', 'vehicle number', 'vehicle'],
};

/** What a mismatch in each field can mean, in plain language. */
export const CONSEQUENCE: Record<CompareField, string> = {
  docNo: 'The e-way bill does not point to this invoice. During verification the goods may be treated as moving without a valid e-way bill and detained. Cancel the e-way bill within 24 hours of generation and generate a new one.',
  docDate: 'A wrong document date is a Part A error. The e-way bill cannot be edited — cancel within 24 hours and regenerate with the invoice date.',
  supplierGstin: 'The e-way bill is in another supplier\'s name. Goods may be detained during verification. Cancel within 24 hours and regenerate.',
  recipientGstin: 'Mismatch in recipient GSTIN — goods may be detained during verification, and the recipient will not see the e-way bill against their GSTIN. Cancel within 24 hours and regenerate.',
  fromPin: 'Dispatch PIN differs, which also changes the calculated distance and validity. Cancel within 24 hours and regenerate if the goods are not moving from this PIN.',
  toPin: 'Place of delivery differs from the invoice. Officers may question the movement. Cancel within 24 hours and regenerate with the right delivery PIN.',
  hsn: 'HSN on the e-way bill should match the invoice. A different code can raise questions about the goods being carried. If wrong, cancel within 24 hours and regenerate.',
  qty: 'Quantity carried does not match the document. Excess or short goods found on verification can lead to detention and penalty proceedings.',
  taxable: 'Value on the e-way bill differs from the invoice. Under-stated value is a common reason for goods to be stopped. Cancel within 24 hours and regenerate with the invoice values.',
  total: 'Total value differs from the invoice. Check rounding, cess and other charges; if the e-way bill value is wrong, cancel within 24 hours and regenerate.',
  vehicleNo: 'Vehicle on the e-way bill is not the one carrying the goods. Part B can be updated any number of times during validity — update the vehicle number before the goods move further.',
};

export type CompareStatus = 'match' | 'format' | 'mismatch' | 'missing' | 'empty';

export interface FieldResult {
  field: CompareField;
  label: string;
  invoice: string;
  ewb: string;
  status: CompareStatus;
  note: string;
}

export interface CompareOptions {
  /** Treat "INV-001" and "INV-1" as the same document number. */
  ignoreLeadingZeros?: boolean;
}

const squash = (s: string) => s.toUpperCase().replace(/\s+/g, '');

export function normaliseDocNo(s: string, ignoreLeadingZeros = false): string {
  const n = squash(s);
  return ignoreLeadingZeros ? n.replace(/\d+/g, (d) => String(Number(d))) : n;
}

export function normaliseVehicleNo(s: string): string {
  return s.toUpperCase().replace(/[\s.\-/]/g, '');
}

function cmpField(field: CompareField, a: string, b: string, opts: CompareOptions): { status: CompareStatus; note: string } {
  const x = a.trim();
  const y = b.trim();
  if (!x && !y) return { status: 'empty', note: 'Not entered on either side.' };
  if (!x || !y) {
    if (field === 'vehicleNo' && !y) return { status: 'missing', note: 'No vehicle on the e-way bill: Part B is not filled, so the goods cannot move on it yet (except the 50 km within-state movement to or from a transporter).' };
    return { status: 'missing', note: `Entered only on the ${x ? 'invoice' : 'e-way bill'} side.` };
  }
  const exact = x === y;
  let same: boolean;
  let note = '';
  switch (field) {
    case 'docNo': {
      same = normaliseDocNo(x, opts.ignoreLeadingZeros) === normaliseDocNo(y, opts.ignoreLeadingZeros);
      if (same && squash(x) !== squash(y)) {
        return { status: 'format', note: 'Same number apart from leading zeros. Make sure this is the same document — the portal treats them as different numbers.' };
      }
      break;
    }
    case 'docDate': {
      const dx = parseIndianDate(x);
      const dy = parseIndianDate(y);
      if (!dx || !dy) return { status: 'mismatch', note: `Could not read ${!dx ? 'the invoice' : 'the e-way bill'} date. Use DD/MM/YYYY.` };
      same = dx === dy;
      break;
    }
    case 'supplierGstin':
    case 'recipientGstin': {
      const urp = (s: string) => (squash(s) === 'URP' ? 'URP' : squash(s));
      same = urp(x) === urp(y);
      break;
    }
    case 'fromPin':
    case 'toPin':
      same = x.replace(/\D/g, '') === y.replace(/\D/g, '');
      break;
    case 'hsn': {
      const hx = x.replace(/\D/g, '');
      const hy = y.replace(/\D/g, '');
      same = hx === hy;
      if (!same && hx.length !== hy.length && (hx.startsWith(hy) || hy.startsWith(hx))) {
        return { status: 'format', note: 'Same code at a different number of digits. Usually acceptable if your HSN reporting requirement allows it; prefer the same code on both.' };
      }
      break;
    }
    case 'qty': {
      const qx = parseQty(x);
      const qy = parseQty(y);
      if (qx === null || qy === null) return { status: 'mismatch', note: 'Quantity is not a valid number on one side.' };
      same = qx === qy;
      break;
    }
    case 'taxable':
    case 'total': {
      const px = parseAmount(x);
      const py = parseAmount(y);
      if (px === null || py === null) return { status: 'mismatch', note: 'Amount is not a valid number on one side.' };
      const diff = Math.abs(px - py);
      if (diff === 0) { same = true; break; }
      if (field === 'total' && diff <= 100) return { status: 'format', note: `Differs by ₹${(diff / 100).toFixed(2)} — likely rounding. Fine if the invoice was rounded off.` };
      return { status: 'mismatch', note: `Differs by ₹${(diff / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}. ${CONSEQUENCE[field]}` };
    }
    case 'vehicleNo':
      same = normaliseVehicleNo(x) === normaliseVehicleNo(y);
      break;
    default:
      same = squash(x) === squash(y);
  }
  if (!same) return { status: 'mismatch', note: CONSEQUENCE[field] };
  if (!exact) note = 'Same after ignoring spaces, case or format.';
  return { status: 'match', note };
}

export interface CompareReport {
  fields: FieldResult[];
  counts: Record<CompareStatus, number>;
  /** True when every entered field matches (format-only differences allowed). */
  ok: boolean;
}

export function compareDocs(invoice: DocValues, ewb: DocValues, opts: CompareOptions = {}): CompareReport {
  const fields = COMPARE_FIELDS.map((f) => {
    const a = invoice[f] ?? '';
    const b = ewb[f] ?? '';
    const r = cmpField(f, a, b, opts);
    return { field: f, label: COMPARE_LABEL[f], invoice: a, ewb: b, ...r };
  });
  const counts: Record<CompareStatus, number> = { match: 0, format: 0, mismatch: 0, missing: 0, empty: 0 };
  fields.forEach((x) => { counts[x.status] += 1; });
  return { fields, counts, ok: counts.mismatch === 0 && counts.missing === 0 && counts.match + counts.format > 0 };
}

/**
 * Parses two pasted lines: invoice first, e-way bill second. An optional header line maps columns
 * by name; otherwise values are read in COMPARE_FIELDS order.
 */
export function parsePastedPair(text: string): { invoice: DocValues; ewb: DocValues } | { error: string } {
  const grid = parseDelimited(text);
  if (!grid.length) return { error: 'Paste two lines: the invoice first, then the e-way bill.' };
  let order: (CompareField | null)[] = [...COMPARE_FIELDS];
  let data = grid;
  const head = grid[0].map((h) => {
    const k = headerKey(h);
    const hit = COMPARE_FIELDS.find((f) => headerKey(f) === k || ALIASES[f].some((n) => headerKey(n) === k));
    return hit ?? null;
  });
  if (head.filter(Boolean).length >= 2) { order = head; data = grid.slice(1); }
  if (data.length < 2) return { error: 'Found only one data line. Paste the invoice line and the e-way bill line.' };
  const toValues = (cells: string[]): DocValues => {
    const v: DocValues = {};
    order.forEach((f, i) => { if (f) v[f] = cells[i] ?? ''; });
    return v;
  };
  return { invoice: toValues(data[0]), ewb: toValues(data[1]) };
}
