// Invoice data model, validation and totals. All money maths goes through src/lib/money.ts.
import {
  calculateInvoice, parseAmount, parseQty, parseRate, type InvoiceTotals, type LineInput, type SupplyType,
} from '@/lib/money';

export const GSTIN_REGEX = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;

export const UNITS = ['NOS', 'PCS', 'BOX', 'KGS', 'MTR', 'LTR', 'SQM', 'SQF', 'SET', 'BAG', 'TON', 'DOZ', 'PAC', 'ROL'];

export interface Party {
  name: string;
  address: string;
  gstin: string;
  stateCode: string;
}

export interface Item {
  id: string;
  description: string;
  hsn: string;
  qty: string;
  unit: string;
  rate: string;
  discount: string;
  gst: string;
}

export interface Bank {
  accountName: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  branch: string;
}

export interface Transport {
  mode: '' | 'road' | 'rail' | 'air' | 'ship';
  vehicleNo: string;
  transporter: string;
  distanceKm: string;
}

export interface InvoiceData {
  seller: Party;
  buyer: Party;
  shipTo: Party;
  shipSame: boolean;
  invoiceNo: string;
  invoiceDate: string; // YYYY-MM-DD
  dueDate: string;
  placeOfSupply: string; // state code
  items: Item[];
  roundOff: boolean;
  showBank: boolean;
  bank: Bank;
  paymentTerms: string;
  notes: string;
  declaration: string;
  transport: Transport;
}

let seq = 0;
export function uid(prefix = 'i'): string {
  seq += 1;
  return `${prefix}${Date.now().toString(36)}${seq}`;
}

export const emptyParty = (): Party => ({ name: '', address: '', gstin: '', stateCode: '' });
export const emptyItem = (id = uid()): Item => ({ id, description: '', hsn: '', qty: '1', unit: 'NOS', rate: '', discount: '', gst: '18' });

export const DEFAULT_DECLARATION =
  'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.';

export function emptyInvoice(): InvoiceData {
  return {
    seller: emptyParty(),
    buyer: emptyParty(),
    shipTo: emptyParty(),
    shipSame: true,
    invoiceNo: '',
    invoiceDate: '',
    dueDate: '',
    placeOfSupply: '',
    items: [emptyItem('i0')],
    roundOff: true,
    showBank: false,
    bank: { accountName: '', bankName: '', accountNo: '', ifsc: '', branch: '' },
    paymentTerms: '',
    notes: '',
    declaration: DEFAULT_DECLARATION,
    transport: { mode: '', vehicleNo: '', transporter: '', distanceKm: '' },
  };
}

/** Illustrative sample using obviously fake businesses and sample GSTINs. */
export function sampleInvoice(today: string): InvoiceData {
  return {
    ...emptyInvoice(),
    seller: {
      name: 'Sample Pipes Pvt Ltd (illustrative)',
      address: 'Plot 12, GIDC Industrial Area, Rajkot, Gujarat 360003',
      gstin: '24ABCDE1234F1Z5',
      stateCode: '24',
    },
    buyer: {
      name: 'Demo Traders (illustrative)',
      address: '45 Market Yard, Pune, Maharashtra 411037',
      gstin: '27PQRSX5678K1Z2',
      stateCode: '27',
    },
    invoiceNo: 'INV-0001',
    invoiceDate: today,
    dueDate: addDays(today, 30),
    placeOfSupply: '27',
    items: [
      { id: uid(), description: 'uPVC pipe 110 mm, 6 m length', hsn: '3917', qty: '120', unit: 'PCS', rate: '640', discount: '5', gst: '18' },
      { id: uid(), description: 'uPVC elbow 110 mm', hsn: '3917', qty: '200', unit: 'PCS', rate: '85.50', discount: '', gst: '18' },
      { id: uid(), description: 'Solvent cement 500 ml', hsn: '3506', qty: '24', unit: 'NOS', rate: '310', discount: '', gst: '18' },
    ],
    roundOff: true,
    showBank: true,
    bank: { accountName: 'Sample Pipes Pvt Ltd', bankName: 'Sample Bank', accountNo: '000000000000', ifsc: 'SAMP0000000', branch: 'Rajkot' },
    paymentTerms: 'Payment due within 30 days of invoice date.',
    notes: 'Goods once sold will be taken back only as per agreed terms.',
  };
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(iso: string, days: number): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return '';
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days));
  return d.toISOString().slice(0, 10);
}

/** "2026-10-15" → "15-10-2026" */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

export function gstinError(gstin: string, required = false): string | null {
  const g = gstin.trim().toUpperCase();
  if (!g) return required ? 'Enter the GSTIN.' : null;
  if (g.length !== 15) return 'GSTIN must be 15 characters.';
  if (!GSTIN_REGEX.test(g)) return 'This does not look like a valid GSTIN format.';
  return null;
}

export type ItemErrors = Partial<Record<'description' | 'qty' | 'rate' | 'discount' | 'gst', string>>;

export interface InvoiceCalc {
  supply: SupplyType;
  totals: InvoiceTotals;
  /** Index into data.items for each line in totals.lines (only valid lines are calculated). */
  lineIndex: number[];
  itemErrors: Record<string, ItemErrors>;
  fieldErrors: Partial<Record<'sellerGstin' | 'buyerGstin' | 'shipGstin', string>>;
  warnings: string[];
  lineInputs: LineInput[];
}

export function computeInvoice(data: InvoiceData): InvoiceCalc {
  const supply: SupplyType =
    data.seller.stateCode && data.placeOfSupply && data.seller.stateCode !== data.placeOfSupply ? 'inter' : 'intra';
  const itemErrors: Record<string, ItemErrors> = {};
  const lineInputs: LineInput[] = [];
  const lineIndex: number[] = [];

  data.items.forEach((it, i) => {
    const e: ItemErrors = {};
    const blank = !it.description.trim() && !it.rate.trim();
    const qty = parseQty(it.qty);
    const rate = it.rate.trim() ? parseAmount(it.rate) : null;
    const disc = it.discount.trim() ? parseRate(it.discount) : 0;
    const gst = parseRate(it.gst);
    if (!blank) {
      if (!it.description.trim()) e.description = 'Enter a description.';
      if (qty === null || qty === 0) e.qty = 'Invalid quantity.';
      if (rate === null || rate < 0) e.rate = 'Invalid rate.';
    }
    if (disc === null) e.discount = '0–100%.';
    if (gst === null) e.gst = 'Invalid rate.';
    if (Object.keys(e).length) itemErrors[it.id] = e;
    if (!blank && !Object.keys(e).length && qty !== null && rate !== null && disc !== null && gst !== null) {
      lineInputs.push({ qtyMilli: qty, rate, discountBp: disc, gstBp: gst });
      lineIndex.push(i);
    }
  });

  const totals = calculateInvoice(lineInputs, supply, { roundToRupee: data.roundOff });

  const fieldErrors: InvoiceCalc['fieldErrors'] = {};
  const se = gstinError(data.seller.gstin);
  if (se) fieldErrors.sellerGstin = se;
  const be = gstinError(data.buyer.gstin);
  if (be) fieldErrors.buyerGstin = be;
  if (!data.shipSame) {
    const sh = gstinError(data.shipTo.gstin);
    if (sh) fieldErrors.shipGstin = sh;
  }

  const warnings: string[] = [];
  if (!data.seller.name.trim()) warnings.push('Seller name is missing.');
  if (!data.seller.stateCode) warnings.push('Select the seller state.');
  if (!data.invoiceNo.trim()) warnings.push('Invoice number is missing.');
  if (!data.invoiceDate) warnings.push('Invoice date is missing.');
  if (!data.buyer.name.trim()) warnings.push('Buyer name is missing.');
  if (!data.placeOfSupply) warnings.push('Select the place of supply.');
  if (!lineInputs.length) warnings.push('Add at least one complete line item.');
  const sg = data.seller.gstin.trim().toUpperCase();
  if (sg && !se && data.seller.stateCode && sg.slice(0, 2) !== data.seller.stateCode) {
    warnings.push('The first two digits of the seller GSTIN do not match the seller state code.');
  }
  const bg = data.buyer.gstin.trim().toUpperCase();
  if (bg && !be && data.buyer.stateCode && bg.slice(0, 2) !== data.buyer.stateCode) {
    warnings.push('The first two digits of the buyer GSTIN do not match the buyer state code.');
  }

  return { supply, totals, lineIndex, itemErrors, fieldErrors, warnings, lineInputs };
}

/** Defensive parse of stored data (older/corrupt drafts). */
export function normaliseInvoice(raw: unknown): InvoiceData | null {
  if (!raw || typeof raw !== 'object') return null;
  const base = emptyInvoice();
  const r = raw as Partial<InvoiceData>;
  const party = (p: unknown): Party => ({ ...emptyParty(), ...(p && typeof p === 'object' ? (p as Partial<Party>) : {}) });
  const items = Array.isArray(r.items)
    ? r.items.filter((x) => x && typeof x === 'object').map((x) => ({ ...emptyItem(), ...(x as Partial<Item>), id: uid() }))
    : base.items;
  return {
    ...base,
    ...r,
    seller: party(r.seller),
    buyer: party(r.buyer),
    shipTo: party(r.shipTo),
    bank: { ...base.bank, ...(r.bank ?? {}) },
    transport: { ...base.transport, ...(r.transport ?? {}) },
    items: items.length ? items : base.items,
  };
}
