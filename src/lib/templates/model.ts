// Typed data model shared by every business document template (sales invoices, purchase orders and
// commercial invoices). Everything the user types is kept as a string exactly as entered; numbers are
// parsed (into exact integer minor units) only by calc.ts. Nothing here touches the DOM.
import type { TemplateId } from './ids';
import { isCurrencyCode, type CurrencyCode } from './currencies';

export const DOCUMENT_VERSION = 1;

export type TaxMode = 'india-gst' | 'single' | 'none' | 'export-zero-rated' | 'export-igst';
export type Layout = 'classic' | 'modern' | 'compact';
export type FontChoice = 'sans' | 'serif';
export type PaperSize = 'A4' | 'A5' | 'Letter' | 'Legal' | 'Custom';
export type Orientation = 'portrait' | 'landscape';
export type MarginPreset = 'narrow' | 'normal';
export type TransportMode = '' | 'road' | 'rail' | 'air' | 'ship';
export type YesNo = '' | 'yes' | 'no';

export const TAX_MODES: TaxMode[] = ['india-gst', 'single', 'none', 'export-zero-rated', 'export-igst'];
export const LAYOUTS: Layout[] = ['classic', 'modern', 'compact'];
export const PAPER_SIZES: PaperSize[] = ['A4', 'A5', 'Letter', 'Legal', 'Custom'];

export const INCOTERMS_2020 = ['EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP'] as const;
export const INCOTERM_NAMES: Record<(typeof INCOTERMS_2020)[number], string> = {
  EXW: 'Ex Works', FCA: 'Free Carrier', FAS: 'Free Alongside Ship', FOB: 'Free On Board', CFR: 'Cost and Freight',
  CIF: 'Cost, Insurance and Freight', CPT: 'Carriage Paid To', CIP: 'Carriage and Insurance Paid To',
  DAP: 'Delivered at Place', DPU: 'Delivered at Place Unloaded', DDP: 'Delivered Duty Paid',
};

export const UNITS = ['NOS', 'PCS', 'BOX', 'KGS', 'MTR', 'LTR', 'SQM', 'SQF', 'SET', 'BAG', 'TON', 'DOZ', 'PAC', 'ROL', 'HRS', 'DAY', 'CTN', 'PLT'];

export interface PartyData {
  name: string;
  address: string;
  email: string;
  phone: string;
  /** GSTIN, VAT number, EIN, IEC… The label comes from the template preset. */
  taxId: string;
  /** Indian GST state code (two digits). */
  stateCode: string;
  country: string;
  contact: string;
}

export interface LineItem {
  id: string;
  description: string;
  /** Secondary text printed under the description (specs, drawing no., service details). */
  details: string;
  /** Primary code column: HSN/SAC, SAC, HS code or SKU depending on the template. */
  code: string;
  /** Second code column (wholesale: HSN when code is the SKU). */
  code2: string;
  qty: string;
  unit: string;
  unitPrice: string;
  discountPct: string;
  taxRatePct: string;
  mrp: string;
  grade: string;
  deliveryDate: string;
  origin: string;
}

export interface ScheduleRow {
  id: string;
  date: string;
  qty: string;
  note: string;
}

export interface DocumentMeta {
  title: string;
  number: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string;
  poNumber: string;
  reference: string;
  currency: CurrencyCode;
  paymentTerms: string;
  deliveryTerms: string;
  incoterm: string;
  incotermPlace: string;
  placeOfSupply: string; // GST state code, or '96' style codes for export not needed
  reverseCharge: YesNo;
  servicePeriodFrom: string;
  servicePeriodTo: string;
  deliveryDate: string;
  shippingMethod: string;
  partialShipment: '' | 'allowed' | 'not-allowed';
  ewayBillNo: string;
}

export interface TransportData {
  mode: TransportMode;
  vehicleNo: string;
  transporter: string;
  lrNo: string;
  lrDate: string;
  distanceKm: string;
}

export interface ShippingData {
  iec: string;
  lutArn: string;
  portLoading: string;
  portDischarge: string;
  countryOrigin: string;
  finalDestination: string;
  vessel: string;
  blNo: string;
  grossWeight: string;
  netWeight: string;
  packages: string;
  marks: string;
  reasonForExport: string;
  /** INR per 1 unit of the invoice currency, up to 4 decimals. */
  exchangeRate: string;
}

export interface Charges {
  freight: string;
  insurance: string;
  other: string;
  otherLabel: string;
  /** Tax rate (%) applied to the charges; blank = charges not taxed. */
  taxRatePct: string;
}

export interface TaxSettings {
  mode: TaxMode;
  /** Label for single-tax mode, e.g. "VAT" or "Sales tax". */
  label: string;
  /** single mode: one rate for the whole document instead of per line. */
  perLine: boolean;
  docRatePct: string;
  roundOff: boolean;
}

export interface BankDetails {
  accountName: string;
  bankName: string;
  accountNo: string;
  ifsc: string;
  swift: string;
  iban: string;
  branch: string;
  upi: string;
}

export interface DocumentText {
  notes: string;
  terms: string;
  paymentInstructions: string;
  declaration: string;
  qualityTerms: string;
  tolerance: string;
  signatureName: string;
  signatureTitle: string;
  approvedBy: string;
}

export interface Branding {
  layout: Layout;
  accent: string; // #RRGGBB
  font: FontChoice;
  /** Logo width in CSS px at 100% (≈ 0.75 pt in the PDF). */
  logoWidth: number;
}

export type SectionKey =
  | 'logo' | 'shipTo' | 'notify' | 'transport' | 'shipping' | 'schedule' | 'bank' | 'paymentInstructions'
  | 'notes' | 'terms' | 'quality' | 'declaration' | 'signature' | 'approval' | 'amountInWords' | 'taxSummary';

export interface PaperSettings {
  size: PaperSize;
  orientation: Orientation;
  customWmm: string;
  customHmm: string;
  margin: MarginPreset;
}

export interface DocumentData {
  v: number;
  templateId: TemplateId;
  /** Your business: seller (invoices), buyer (purchase orders), exporter/shipper (commercial invoices). */
  seller: PartyData;
  /** The other side: customer (invoices), supplier (purchase orders), consignee (commercial invoices). */
  buyer: PartyData;
  notify: PartyData;
  shipTo: PartyData;
  shipToSame: boolean;
  meta: DocumentMeta;
  transport: TransportData;
  shipping: ShippingData;
  items: LineItem[];
  schedule: ScheduleRow[];
  charges: Charges;
  tax: TaxSettings;
  bank: BankDetails;
  text: DocumentText;
  /** Data URL of the logo. Kept only in this browser's localStorage. */
  logo: string;
  branding: Branding;
  sections: Partial<Record<SectionKey, boolean>>;
  paper: PaperSettings;
}

let seq = 0;
export function uid(prefix = 'l'): string {
  seq += 1;
  return `${prefix}${Date.now().toString(36)}${seq.toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
}

export const emptyPartyData = (): PartyData => ({ name: '', address: '', email: '', phone: '', taxId: '', stateCode: '', country: '', contact: '' });

export const emptyLine = (p: Partial<LineItem> = {}): LineItem => ({
  id: uid(), description: '', details: '', code: '', code2: '', qty: '1', unit: 'NOS', unitPrice: '', discountPct: '',
  taxRatePct: '', mrp: '', grade: '', deliveryDate: '', origin: '', ...p,
});

export const emptyScheduleRow = (p: Partial<ScheduleRow> = {}): ScheduleRow => ({ id: uid('s'), date: '', qty: '', note: '', ...p });

export function emptyDocument(templateId: TemplateId): DocumentData {
  return {
    v: DOCUMENT_VERSION,
    templateId,
    seller: emptyPartyData(),
    buyer: emptyPartyData(),
    notify: emptyPartyData(),
    shipTo: emptyPartyData(),
    shipToSame: true,
    meta: {
      title: '', number: '', issueDate: '', dueDate: '', poNumber: '', reference: '', currency: 'INR', paymentTerms: '',
      deliveryTerms: '', incoterm: '', incotermPlace: '', placeOfSupply: '', reverseCharge: 'no', servicePeriodFrom: '',
      servicePeriodTo: '', deliveryDate: '', shippingMethod: '', partialShipment: '', ewayBillNo: '',
    },
    transport: { mode: '', vehicleNo: '', transporter: '', lrNo: '', lrDate: '', distanceKm: '' },
    shipping: {
      iec: '', lutArn: '', portLoading: '', portDischarge: '', countryOrigin: '', finalDestination: '', vessel: '', blNo: '',
      grossWeight: '', netWeight: '', packages: '', marks: '', reasonForExport: '', exchangeRate: '',
    },
    items: [emptyLine()],
    schedule: [],
    charges: { freight: '', insurance: '', other: '', otherLabel: 'Other charges', taxRatePct: '' },
    tax: { mode: 'none', label: 'Tax', perLine: true, docRatePct: '', roundOff: false },
    bank: { accountName: '', bankName: '', accountNo: '', ifsc: '', swift: '', iban: '', branch: '', upi: '' },
    text: {
      notes: '', terms: '', paymentInstructions: '', declaration: '', qualityTerms: '', tolerance: '', signatureName: '',
      signatureTitle: 'Authorised signatory', approvedBy: '',
    },
    logo: '',
    branding: { layout: 'classic', accent: '#174F39', font: 'sans', logoWidth: 120 },
    sections: {},
    paper: { size: 'A4', orientation: 'portrait', customWmm: '210', customHmm: '297', margin: 'normal' },
  };
}

/* ---------------- defensive normalisation of stored / imported data ---------------- */

const str = (v: unknown, fallback = ''): string => (typeof v === 'string' ? v : typeof v === 'number' && Number.isFinite(v) ? String(v) : fallback);
const obj = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

function stringsInto<T extends object>(base: T, raw: unknown): T {
  const r = obj(raw);
  const out = { ...base } as Record<string, unknown>;
  for (const k of Object.keys(base)) {
    const b = (base as Record<string, unknown>)[k];
    if (typeof b === 'string') out[k] = str(r[k], b);
    else if (typeof b === 'boolean') out[k] = typeof r[k] === 'boolean' ? r[k] : b;
    else if (typeof b === 'number') out[k] = typeof r[k] === 'number' && Number.isFinite(r[k]) ? r[k] : b;
  }
  return out as T;
}

const oneOf = <T extends string>(v: unknown, list: readonly T[], fallback: T): T =>
  typeof v === 'string' && (list as readonly string[]).includes(v) ? (v as T) : fallback;

const SAFE_LOGO = /^data:image\/(png|jpeg|jpg|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
export const isSafeLogo = (v: string): boolean => SAFE_LOGO.test(v);
export const isHexColour = (v: string): boolean => /^#[0-9a-fA-F]{6}$/.test(v);

/**
 * Merge stored data over a base document, keeping only known keys with the right types.
 * Returns null when `raw` is not an object at all.
 */
export function normaliseDocument(raw: unknown, base: DocumentData): DocumentData | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  const items = Array.isArray(r.items)
    ? r.items.filter((x) => x && typeof x === 'object').slice(0, 1000).map((x) => ({ ...stringsInto(emptyLine(), x), id: uid() }))
    : base.items;
  const schedule = Array.isArray(r.schedule)
    ? r.schedule.filter((x) => x && typeof x === 'object').slice(0, 200).map((x) => ({ ...stringsInto(emptyScheduleRow(), x), id: uid('s') }))
    : base.schedule;
  const meta = stringsInto(base.meta, r.meta);
  const m = obj(r.meta);
  meta.currency = isCurrencyCode(m.currency) ? m.currency : base.meta.currency;
  meta.reverseCharge = oneOf(m.reverseCharge, ['', 'yes', 'no'] as const, base.meta.reverseCharge);
  meta.partialShipment = oneOf(m.partialShipment, ['', 'allowed', 'not-allowed'] as const, base.meta.partialShipment);
  const transport = stringsInto(base.transport, r.transport);
  transport.mode = oneOf(obj(r.transport).mode, ['', 'road', 'rail', 'air', 'ship'] as const, base.transport.mode);
  const tax = stringsInto(base.tax, r.tax);
  tax.mode = oneOf(obj(r.tax).mode, TAX_MODES, base.tax.mode);
  const branding = stringsInto(base.branding, r.branding);
  const rb = obj(r.branding);
  branding.layout = oneOf(rb.layout, LAYOUTS, base.branding.layout);
  branding.font = oneOf(rb.font, ['sans', 'serif'] as const, base.branding.font);
  if (!isHexColour(branding.accent)) branding.accent = base.branding.accent;
  branding.logoWidth = Math.min(260, Math.max(40, Math.round(branding.logoWidth)));
  const paper = stringsInto(base.paper, r.paper);
  const rp = obj(r.paper);
  paper.size = oneOf(rp.size, PAPER_SIZES, base.paper.size);
  paper.orientation = oneOf(rp.orientation, ['portrait', 'landscape'] as const, base.paper.orientation);
  paper.margin = oneOf(rp.margin, ['narrow', 'normal'] as const, base.paper.margin);
  const sections: DocumentData['sections'] = { ...base.sections };
  for (const [k, v] of Object.entries(obj(r.sections))) if (typeof v === 'boolean') sections[k as SectionKey] = v;
  const logo = str(r.logo);
  return {
    ...base,
    seller: stringsInto(base.seller, r.seller),
    buyer: stringsInto(base.buyer, r.buyer),
    notify: stringsInto(base.notify, r.notify),
    shipTo: stringsInto(base.shipTo, r.shipTo),
    shipToSame: typeof r.shipToSame === 'boolean' ? r.shipToSame : base.shipToSame,
    meta,
    transport,
    shipping: stringsInto(base.shipping, r.shipping),
    items: items.length ? items : [emptyLine()],
    schedule,
    charges: stringsInto(base.charges, r.charges),
    tax,
    bank: stringsInto(base.bank, r.bank),
    text: stringsInto(base.text, r.text),
    logo: isSafeLogo(logo) ? logo : '',
    branding,
    sections,
    paper,
  };
}

/* ---------------- dates ---------------- */

export function todayIso(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(iso: string, days: number): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return '';
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days));
  return d.toISOString().slice(0, 10);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/** India: "15-10-2026"; international: "15 Oct 2026" (unambiguous for any reader). */
export function formatDocDate(iso: string, style: 'india' | 'intl' = 'india'): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  return style === 'india' ? `${m[3]}-${m[2]}-${m[1]}` : `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}`;
}
