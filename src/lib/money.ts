// Money helpers. All amounts are integers in paise to avoid floating-point rounding errors.
// Rates are converted to basis points (18% -> 1800) so fractional rates like 0.25% stay exact.

export type Paise = number;

/** Round half away from zero (commercial rounding). */
export function roundHalfUp(n: number): number {
  return n < 0 ? -Math.round(-n) : Math.round(n);
}

/** Parse user input like "1,23,456.78" into paise. Returns null for invalid input. */
export function parseAmount(input: string | number): Paise | null {
  if (typeof input === 'number') return Number.isFinite(input) ? roundHalfUp(input * 100) : null;
  const s = input.replace(/[,\s₹]/g, '').trim();
  if (!s) return null;
  if (!/^-?\d+(\.\d{0,2})?$/.test(s)) return null;
  const neg = s.startsWith('-');
  const [whole, frac = ''] = s.replace('-', '').split('.');
  const paise = Number(whole) * 100 + Number((frac + '00').slice(0, 2));
  if (!Number.isSafeInteger(paise)) return null;
  return neg ? -paise : paise;
}

/** Parse a percentage like "18" or "0.25" into basis points. */
export function parseRate(input: string | number): number | null {
  const s = String(input).replace('%', '').trim();
  if (!/^\d+(\.\d{0,2})?$/.test(s)) return null;
  const bp = roundHalfUp(Number(s) * 100);
  return bp >= 0 && bp <= 10000 ? bp : null;
}

/** Parse a quantity with up to 3 decimals into thousandths. */
export function parseQty(input: string | number): number | null {
  const s = String(input).replace(/,/g, '').trim();
  if (!/^\d+(\.\d{0,3})?$/.test(s)) return null;
  const milli = roundHalfUp(Number(s) * 1000);
  return Number.isSafeInteger(milli) ? milli : null;
}

export function pct(amount: Paise, bp: number): Paise {
  return roundHalfUp((amount * bp) / 10000);
}

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
export function formatINR(paise: Paise): string {
  return inr.format(paise / 100);
}
export function formatRate(bp: number): string {
  return `${(bp / 100).toString()}%`;
}

export type TaxMode = 'exclusive' | 'inclusive';
export type SupplyType = 'intra' | 'inter'; // intra-state → CGST+SGST, inter-state → IGST

export interface GstResult {
  original: Paise;
  taxable: Paise;
  gst: Paise;
  cgst: Paise;
  sgst: Paise;
  igst: Paise;
  total: Paise;
  rateBp: number;
  mode: TaxMode;
  supply: SupplyType;
}

/**
 * Core GST calculation.
 * exclusive: amount is the taxable value; GST is added on top.
 * inclusive: amount already contains GST; taxable value is backed out.
 * For intra-state supplies CGST and SGST are each computed at half the rate on the
 * taxable value (the way they are printed on invoices), so CGST always equals SGST.
 */
export function calculateGst(amount: Paise, rateBp: number, mode: TaxMode, supply: SupplyType): GstResult {
  let taxable: Paise;
  if (mode === 'exclusive') {
    taxable = amount;
  } else {
    taxable = roundHalfUp((amount * 10000) / (10000 + rateBp));
  }
  let cgst = 0, sgst = 0, igst = 0;
  if (supply === 'intra') {
    cgst = sgst = pct(taxable, rateBp / 2);
  } else {
    igst = pct(taxable, rateBp);
  }
  let gst = cgst + sgst + igst;
  let total = taxable + gst;
  if (mode === 'inclusive') {
    // Keep the user's gross amount intact; absorb any paisa difference into taxable value.
    taxable = amount - gst;
    total = amount;
  }
  return { original: amount, taxable, gst, cgst, sgst, igst, total, rateBp, mode, supply };
}

export interface LineInput {
  qtyMilli: number; // quantity × 1000
  rate: Paise; // per unit, excluding GST
  discountBp?: number; // discount as % in basis points
  discountFlat?: Paise; // flat discount on the line
  gstBp: number;
}

export interface LineResult {
  gross: Paise;
  discount: Paise;
  taxable: Paise;
  cgst: Paise;
  sgst: Paise;
  igst: Paise;
  tax: Paise;
  total: Paise;
}

export function calculateLine(line: LineInput, supply: SupplyType): LineResult {
  const gross = roundHalfUp((line.qtyMilli * line.rate) / 1000);
  let discount = (line.discountBp ? pct(gross, line.discountBp) : 0) + (line.discountFlat ?? 0);
  if (discount > gross) discount = gross;
  const taxable = gross - discount;
  const g = calculateGst(taxable, line.gstBp, 'exclusive', supply);
  return { gross, discount, taxable, cgst: g.cgst, sgst: g.sgst, igst: g.igst, tax: g.gst, total: taxable + g.gst };
}

export interface InvoiceTotals {
  lines: LineResult[];
  gross: Paise;
  discount: Paise;
  taxable: Paise;
  cgst: Paise;
  sgst: Paise;
  igst: Paise;
  tax: Paise;
  otherCharges: Paise;
  roundOff: Paise;
  total: Paise;
  taxByRate: { rateBp: number; taxable: Paise; cgst: Paise; sgst: Paise; igst: Paise }[];
}

export function calculateInvoice(
  lines: LineInput[],
  supply: SupplyType,
  opts: { otherCharges?: Paise; roundToRupee?: boolean } = {},
): InvoiceTotals {
  const results = lines.map((l) => calculateLine(l, supply));
  const sum = (k: keyof LineResult) => results.reduce((a, r) => a + r[k], 0);
  const otherCharges = opts.otherCharges ?? 0;
  const pre = sum('total') + otherCharges;
  const rounded = opts.roundToRupee ? roundHalfUp(pre / 100) * 100 : pre;
  const byRate = new Map<number, { rateBp: number; taxable: number; cgst: number; sgst: number; igst: number }>();
  results.forEach((r, i) => {
    const bp = lines[i].gstBp;
    const e = byRate.get(bp) ?? { rateBp: bp, taxable: 0, cgst: 0, sgst: 0, igst: 0 };
    e.taxable += r.taxable; e.cgst += r.cgst; e.sgst += r.sgst; e.igst += r.igst;
    byRate.set(bp, e);
  });
  return {
    lines: results,
    gross: sum('gross'),
    discount: sum('discount'),
    taxable: sum('taxable'),
    cgst: sum('cgst'),
    sgst: sum('sgst'),
    igst: sum('igst'),
    tax: sum('tax'),
    otherCharges,
    roundOff: rounded - pre,
    total: rounded,
    taxByRate: [...byRate.values()].sort((a, b) => a.rateBp - b.rateBp),
  };
}

// ---- Amount in words (Indian numbering: lakh, crore) ----
const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ' ' + ONES[n % 10] : ''}`;
}
function threeDigits(n: number): string {
  const h = Math.floor(n / 100), r = n % 100;
  return [h ? `${ONES[h]} Hundred` : '', r ? twoDigits(r) : ''].filter(Boolean).join(' ');
}
export function numberToIndianWords(n: number): string {
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000); n %= 10000000;
  const lakh = Math.floor(n / 100000); n %= 100000;
  const thousand = Math.floor(n / 1000); n %= 1000;
  if (crore) parts.push(`${crore >= 100 ? numberToIndianWords(crore) : twoDigits(crore)} Crore`);
  if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
  if (n) parts.push(threeDigits(n));
  return parts.join(' ');
}
export function amountInWords(paise: Paise): string {
  const rupees = Math.floor(Math.abs(paise) / 100);
  const p = Math.abs(paise) % 100;
  return `Rupees ${numberToIndianWords(rupees)}${p ? ` and ${twoDigits(p)} Paise` : ''} Only`;
}
