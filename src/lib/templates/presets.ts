// Per-template configuration: titles, labels, which fields/columns/sections appear, default tax mode,
// currency and paper, default terms, an empty starting state and clearly fictional sample data.
// All businesses, people, GSTINs, IECs and numbers in the samples are invented for illustration.
import { gstinCheckChar } from '@/lib/gstin';
import { TEMPLATE_IDS, TEMPLATE_KIND, type DocumentKind, type TemplateId } from './ids';
import {
  addDays, emptyDocument, emptyLine, emptyScheduleRow, type DocumentData, type LineItem, type SectionKey,
  type ShippingData, type TaxMode, type TransportData,
} from './model';
import type { CurrencyCode } from './currencies';

export type MetaField =
  | 'dueDate' | 'poNumber' | 'reference' | 'paymentTerms' | 'deliveryTerms' | 'incoterm' | 'placeOfSupply'
  | 'reverseCharge' | 'servicePeriod' | 'deliveryDate' | 'shippingMethod' | 'partialShipment' | 'ewayBillNo';

export type ColumnKey =
  | 'sno' | 'description' | 'code' | 'code2' | 'grade' | 'origin' | 'deliveryDate' | 'mrp' | 'qty' | 'unitPrice'
  | 'discount' | 'taxable' | 'taxRate' | 'taxAmount' | 'amount';

export interface ColumnDef {
  key: ColumnKey;
  label: string;
  /** Relative width (flex grow in the PDF, % share in HTML). */
  width: number;
  align: 'left' | 'right';
}

export type LineField = 'details' | 'code' | 'code2' | 'mrp' | 'grade' | 'deliveryDate' | 'origin' | 'discountPct' | 'unit';

export interface PresetLabels {
  seller: string;
  buyer: string;
  shipTo: string;
  notify: string;
  number: string;
  issueDate: string;
  dueDate: string;
  poNumber: string;
  reference: string;
  sellerTaxId: string;
  buyerTaxId: string;
  description: string;
  details: string;
  code: string;
  code2: string;
  qty: string;
  unitPrice: string;
  deliveryDate: string;
  signature: string;
  paymentTerms: string;
  deliveryTerms: string;
  terms: string;
  declaration: string;
}

export interface TemplatePreset {
  id: TemplateId;
  kind: DocumentKind;
  name: string;
  title: string;
  /** Indian template: GST state codes, place of supply, dd-mm-yyyy dates. */
  india: boolean;
  dateStyle: 'india' | 'intl';
  labels: PresetLabels;
  metaFields: MetaField[];
  shippingFields: (keyof ShippingData)[];
  shippingLabels: Partial<Record<keyof ShippingData, string>>;
  transportFields: (keyof TransportData)[];
  columns: ColumnDef[];
  lineFields: LineField[];
  taxModes: TaxMode[];
  /** Sections the user can switch on/off in Design. */
  toggles: SectionKey[];
  seriesPrefix: string;
  units: string;
  defaultCurrency: CurrencyCode;
  /** Empty state with the template's defaults (settings, terms) but no business data. */
  empty: (today: string) => DocumentData;
  /** Complete, clearly fictional example document. */
  sample: (today: string) => DocumentData;
}

/* ---------------- shared bits ---------------- */

const gstin = (first14: string) => `${first14}${gstinCheckChar(first14)}`;
/** Sample GSTINs with a valid check character. Fictional PANs. */
export const SAMPLE_GSTINS = {
  ganesh: gstin('24AAQFS4821K1Z'),
  kaveri: gstin('27AAHFK7314M1Z'),
  brightline: gstin('29AAMFB2096Q1Z'),
  coastal: gstin('32AADCC5519R1Z'),
  laxmi: gstin('23AAPFL6630D1Z'),
  patel: gstin('23ABBPP4417G1Z'),
  deccan: gstin('36AAECD8812N1Z'),
  precision: gstin('27AAGCP3305H1Z'),
  kolhapur: gstin('27AAJFK9021B1Z'),
  nilgiri: gstin('33AAWFN1188C1Z'),
} as const;

const BASE_LABELS: PresetLabels = {
  seller: 'From', buyer: 'Bill to', shipTo: 'Ship to', notify: 'Notify party', number: 'Invoice no.', issueDate: 'Invoice date',
  dueDate: 'Due date', poNumber: 'PO no.', reference: 'Reference', sellerTaxId: 'GSTIN', buyerTaxId: 'GSTIN',
  description: 'Description', details: 'Details', code: 'HSN/SAC', code2: 'HSN', qty: 'Qty', unitPrice: 'Rate',
  deliveryDate: 'Delivery', signature: 'Authorised signatory', paymentTerms: 'Payment terms', deliveryTerms: 'Delivery terms',
  terms: 'Terms & conditions', declaration: 'Declaration',
};

const col = (key: ColumnKey, label: string, width: number, align: 'left' | 'right' = 'right'): ColumnDef => ({ key, label, width, align });

const GST_DECLARATION =
  'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.';
const PO_TERMS = [
  '1. Please quote our PO number on every invoice, delivery challan and package.',
  '2. Goods are subject to inspection and acceptance on receipt; rejected material will be returned at the supplier\'s cost.',
  '3. Deliver only the quantities ordered unless we agree otherwise in writing.',
  '4. Send the original tax invoice with the goods.',
].join('\n');

function withLines(d: DocumentData, lines: Partial<LineItem>[]): DocumentData {
  d.items = lines.map((l) => emptyLine(l));
  return d;
}

interface Def extends Omit<TemplatePreset, 'empty' | 'sample' | 'labels' | 'shippingLabels' | 'transportFields' | 'kind' | 'units'> {
  labels?: Partial<PresetLabels>;
  shippingLabels?: Partial<Record<keyof ShippingData, string>>;
  transportFields?: (keyof TransportData)[];
  units?: string;
  setup: (d: DocumentData, today: string) => void;
  fill: (d: DocumentData, today: string) => void;
}

function define(def: Def): TemplatePreset {
  const { setup, fill, labels, ...rest } = def;
  const empty = (today: string) => {
    const d = emptyDocument(def.id);
    d.meta.issueDate = today;
    d.meta.currency = def.defaultCurrency;
    d.sections = Object.fromEntries(def.toggles.map((k) => [k, true]));
    setup(d, today);
    return d;
  };
  return {
    kind: TEMPLATE_KIND[def.id],
    units: 'NOS',
    shippingLabels: {},
    transportFields: [],
    ...rest,
    labels: { ...BASE_LABELS, ...labels },
    empty,
    sample: (today: string) => {
      const d = empty(today);
      fill(d, today);
      return d;
    },
  };
}

/* ---------------- the nine templates ---------------- */

const gstTaxInvoice = define({
  id: 'gst-tax-invoice',
  name: 'GST tax invoice',
  title: 'TAX INVOICE',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'INR',
  labels: { seller: 'Supplier', buyer: 'Bill to (recipient)', code: 'HSN/SAC' },
  metaFields: ['dueDate', 'poNumber', 'placeOfSupply', 'reverseCharge', 'ewayBillNo', 'paymentTerms'],
  shippingFields: [],
  transportFields: ['mode', 'vehicleNo', 'transporter', 'lrNo', 'lrDate', 'distanceKm'],
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Description of goods / services', 30, 'left'), col('code', 'HSN/SAC', 9, 'left'),
    col('qty', 'Qty', 9), col('unitPrice', 'Rate', 10), col('discount', 'Disc.', 8), col('taxable', 'Taxable value', 12),
    col('taxRate', 'GST %', 6), col('taxAmount', 'GST', 10), col('amount', 'Amount', 12),
  ],
  lineFields: ['details', 'code', 'unit', 'discountPct'],
  taxModes: ['india-gst', 'export-igst', 'export-zero-rated'],
  toggles: ['logo', 'shipTo', 'transport', 'bank', 'paymentInstructions', 'notes', 'terms', 'declaration', 'signature', 'amountInWords', 'taxSummary'],
  seriesPrefix: 'INV',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'india-gst', roundOff: true, label: 'GST' };
    d.meta.dueDate = addDays(today, 30);
    d.text.declaration = GST_DECLARATION;
    d.text.terms = 'Interest may be charged on payments received after the due date.\nSubject to the jurisdiction stated in the contract.';
    d.sections.transport = false;
    d.sections.paymentInstructions = false;
  },
  fill: (d, today) => {
    d.seller = { name: 'Shree Ganesh Polymers', address: 'Plot 14, Aji GIDC, Rajkot, Gujarat 360003', email: 'accounts@ganeshpolymers.example', phone: '+91 98250 00000', taxId: SAMPLE_GSTINS.ganesh, stateCode: '24', country: 'India', contact: '' };
    d.buyer = { name: 'Kaveri Agro Traders', address: '45 Market Yard, Gultekdi, Pune, Maharashtra 411037', email: 'purchase@kaveriagro.example', phone: '+91 98220 00000', taxId: SAMPLE_GSTINS.kaveri, stateCode: '27', country: 'India', contact: '' };
    d.meta = { ...d.meta, number: 'SGP/26-27/0147', poNumber: 'KAT-PO-2291', placeOfSupply: '27', ewayBillNo: '1812 0000 4417', paymentTerms: '30 days from invoice date' };
    withLines(d, [
      { description: 'uPVC pipe 110 mm, 6 m length', details: 'ISI marked, 6 kg/cm²', code: '3917', qty: '120', unit: 'PCS', unitPrice: '640', discountPct: '5', taxRatePct: '18' },
      { description: 'uPVC elbow 110 mm', code: '3917', qty: '200', unit: 'PCS', unitPrice: '85.50', taxRatePct: '18' },
      { description: 'Drip irrigation lateral 16 mm', code: '8424', qty: '25', unit: 'ROL', unitPrice: '1450', taxRatePct: '5' },
    ]);
    d.charges = { ...d.charges, freight: '1500', taxRatePct: '18' };
    d.transport = { mode: 'road', vehicleNo: 'GJ03AB1234', transporter: 'Saurashtra Roadlines (sample)', lrNo: 'LR-55821', lrDate: today, distanceKm: '720' };
    d.sections.transport = true;
    d.bank = { ...d.bank, accountName: 'Shree Ganesh Polymers', bankName: 'Sample Co-operative Bank', accountNo: '001234500000', ifsc: 'SAMP0001234', branch: 'Aji GIDC, Rajkot' };
    d.text.notes = 'Goods once dispatched are at the buyer\'s risk.';
    d.text.signatureName = 'M. R. Bhatt, Partner';
  },
});

const simpleSalesInvoice = define({
  id: 'simple-sales-invoice',
  name: 'Simple sales invoice',
  title: 'INVOICE',
  india: false,
  dateStyle: 'intl',
  defaultCurrency: 'INR',
  labels: { seller: 'From', buyer: 'Bill to', sellerTaxId: 'Tax ID', buyerTaxId: 'Tax ID', code: 'Item code', unitPrice: 'Price' },
  metaFields: ['dueDate', 'reference', 'paymentTerms'],
  shippingFields: [],
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Item', 40, 'left'), col('qty', 'Qty', 10), col('unitPrice', 'Price', 13),
    col('discount', 'Disc.', 9), col('taxRate', 'Tax %', 7), col('taxAmount', 'Tax', 10), col('amount', 'Amount', 14),
  ],
  lineFields: ['details', 'unit', 'discountPct'],
  taxModes: ['none', 'single'],
  toggles: ['logo', 'shipTo', 'bank', 'paymentInstructions', 'notes', 'terms', 'signature', 'amountInWords'],
  seriesPrefix: 'INV',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'none', label: 'Tax', perLine: false };
    d.meta.dueDate = addDays(today, 15);
    d.sections.shipTo = false;
    d.sections.bank = false;
    d.sections.signature = false;
    d.text.paymentInstructions = '';
    d.items = [emptyLine({ unit: 'PCS' })];
  },
  fill: (d) => {
    d.seller = { name: 'Nilgiri Handloom Studio', address: '7 Church Hill Road, Ooty, Tamil Nadu 643001', email: 'hello@nilgirihandloom.example', phone: '+91 94430 00000', taxId: '', stateCode: '33', country: 'India', contact: '' };
    d.buyer = { name: 'Café Monsoon', address: '12 Beach Road, Puducherry 605001', email: 'orders@cafemonsoon.example', phone: '', taxId: '', stateCode: '34', country: 'India', contact: 'Ms. Anita Rao' };
    d.meta = { ...d.meta, number: 'NHS-0042', reference: 'Order by email', paymentTerms: 'Due in 15 days' };
    withLines(d, [
      { description: 'Handwoven cushion cover, 16 × 16 in', details: 'Indigo stripe', qty: '24', unit: 'PCS', unitPrice: '450' },
      { description: 'Table runner, 72 in', qty: '10', unit: 'PCS', unitPrice: '780', discountPct: '10' },
      { description: 'Gift packing', qty: '1', unit: 'NOS', unitPrice: '250' },
    ]);
    d.text.paymentInstructions = 'UPI: nilgirihandloom@upi (sample) or bank transfer. Please mention the invoice number.';
    d.sections.paymentInstructions = true;
    d.text.notes = 'Thank you for your order!';
  },
});

const serviceInvoice = define({
  id: 'service-invoice',
  name: 'Service invoice',
  title: 'TAX INVOICE',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'INR',
  labels: { seller: 'Service provider', buyer: 'Client', code: 'SAC', qty: 'Hours', unitPrice: 'Rate / hr', description: 'Service' },
  metaFields: ['dueDate', 'poNumber', 'servicePeriod', 'placeOfSupply', 'reverseCharge', 'paymentTerms'],
  shippingFields: [],
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Service description', 36, 'left'), col('code', 'SAC', 9, 'left'),
    col('qty', 'Hours / qty', 9), col('unitPrice', 'Rate', 11), col('discount', 'Disc.', 8), col('taxRate', 'GST %', 6),
    col('taxAmount', 'GST', 10), col('amount', 'Amount', 13),
  ],
  lineFields: ['details', 'code', 'unit', 'discountPct'],
  taxModes: ['india-gst', 'single', 'none', 'export-zero-rated'],
  toggles: ['logo', 'bank', 'paymentInstructions', 'notes', 'terms', 'declaration', 'signature', 'amountInWords', 'taxSummary'],
  seriesPrefix: 'SRV',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'india-gst', label: 'GST', roundOff: true };
    d.meta.dueDate = addDays(today, 15);
    d.items = [emptyLine({ unit: 'HRS', taxRatePct: '18' })];
    d.text.terms = 'Payment due within 15 days. Work outside the agreed scope is billed separately.';
    d.sections.declaration = false;
  },
  fill: (d, today) => {
    d.seller = { name: 'Brightline Digital Services LLP', address: '3rd Floor, 80 Feet Road, Indiranagar, Bengaluru, Karnataka 560038', email: 'billing@brightline.example', phone: '+91 80 0000 0000', taxId: SAMPLE_GSTINS.brightline, stateCode: '29', country: 'India', contact: '' };
    d.buyer = { name: 'Coastal Ayurveda Resorts Pvt Ltd', address: 'NH 66, Kovalam, Thiruvananthapuram, Kerala 695527', email: 'accounts@coastalayurveda.example', phone: '', taxId: SAMPLE_GSTINS.coastal, stateCode: '32', country: 'India', contact: 'Mr. Joseph Mathew' };
    d.meta = { ...d.meta, number: 'BDS/26-27/018', poNumber: 'CAR/WO/114', placeOfSupply: '32', servicePeriodFrom: addDays(today, -30), servicePeriodTo: addDays(today, -1), paymentTerms: '15 days' };
    withLines(d, [
      { description: 'Website redesign — UX and visual design', details: 'Booking flow, 6 page templates', code: '998314', qty: '42', unit: 'HRS', unitPrice: '1800', taxRatePct: '18' },
      { description: 'Front-end development', code: '998314', qty: '64', unit: 'HRS', unitPrice: '1500', taxRatePct: '18' },
      { description: 'Monthly hosting & maintenance retainer', code: '998315', qty: '1', unit: 'NOS', unitPrice: '12000', discountPct: '10', taxRatePct: '18' },
    ]);
    d.bank = { ...d.bank, accountName: 'Brightline Digital Services LLP', bankName: 'Sample Bank', accountNo: '50200000000000', ifsc: 'SAMP0000529', branch: 'Indiranagar', upi: 'brightline@upi' };
    d.text.notes = 'Hours as per the shared timesheet for the period.';
  },
});

const wholesaleInvoice = define({
  id: 'wholesale-invoice',
  name: 'Wholesale invoice',
  title: 'TAX INVOICE',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'INR',
  labels: { seller: 'Seller', buyer: 'Bill to', code: 'SKU', code2: 'HSN', unitPrice: 'Rate' },
  metaFields: ['dueDate', 'poNumber', 'placeOfSupply', 'reverseCharge', 'ewayBillNo', 'paymentTerms'],
  shippingFields: [],
  transportFields: ['mode', 'vehicleNo', 'transporter', 'lrNo', 'lrDate', 'distanceKm'],
  columns: [
    col('sno', '#', 3, 'left'), col('code', 'SKU', 8, 'left'), col('description', 'Item', 24, 'left'), col('code2', 'HSN', 7, 'left'),
    col('mrp', 'MRP', 8), col('qty', 'Qty', 9), col('unitPrice', 'Rate', 9), col('discount', 'Scheme disc.', 9),
    col('taxable', 'Taxable', 10), col('taxRate', 'GST %', 5), col('taxAmount', 'GST', 9), col('amount', 'Amount', 11),
  ],
  lineFields: ['code', 'code2', 'mrp', 'unit', 'discountPct'],
  taxModes: ['india-gst'],
  toggles: ['logo', 'shipTo', 'transport', 'bank', 'notes', 'terms', 'declaration', 'signature', 'amountInWords', 'taxSummary'],
  seriesPrefix: 'WS',
  units: 'BOX',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'india-gst', label: 'GST', roundOff: true };
    d.meta.dueDate = addDays(today, 21);
    d.text.declaration = GST_DECLARATION;
    d.text.terms = 'Goods once sold will be taken back or exchanged only as per the agreed scheme terms.';
    d.items = [emptyLine({ unit: 'BOX', taxRatePct: '18' })];
  },
  fill: (d, today) => {
    d.seller = { name: 'Laxmi Distributors', address: '22 Siyaganj Main Road, Indore, Madhya Pradesh 452007', email: 'sales@laxmidistributors.example', phone: '+91 731 000 0000', taxId: SAMPLE_GSTINS.laxmi, stateCode: '23', country: 'India', contact: '' };
    d.buyer = { name: 'Patel General Stores', address: '5 New Market, T.T. Nagar, Bhopal, Madhya Pradesh 462003', email: '', phone: '+91 98260 00000', taxId: SAMPLE_GSTINS.patel, stateCode: '23', country: 'India', contact: '' };
    d.shipToSame = false;
    d.shipTo = { ...d.shipTo, name: 'Patel General Stores — Godown', address: 'Plot 9, Govindpura Industrial Area, Bhopal, Madhya Pradesh 462023', stateCode: '23', taxId: SAMPLE_GSTINS.patel };
    d.meta = { ...d.meta, number: 'LD/26-27/0981', placeOfSupply: '23', ewayBillNo: '2310 0000 7765', paymentTerms: '21 days credit' };
    withLines(d, [
      { code: 'SOAP-NEEM-100', description: 'Neem bath soap 100 g (box of 48)', code2: '3401', mrp: '1920', qty: '30', unit: 'BOX', unitPrice: '1490', discountPct: '4', taxRatePct: '5' },
      { code: 'TP-HERB-150', description: 'Herbal toothpaste 150 g (box of 36)', code2: '3306', mrp: '3240', qty: '15', unit: 'BOX', unitPrice: '2575', discountPct: '2.5', taxRatePct: '5' },
      { code: 'DET-LQ-1L', description: 'Liquid detergent 1 L (carton of 12)', code2: '3402', mrp: '2388', qty: '20', unit: 'CTN', unitPrice: '1780', taxRatePct: '18' },
      { code: 'AGB-100', description: 'Agarbatti 100 sticks (box of 24)', code2: '3307', mrp: '1200', qty: '12', unit: 'BOX', unitPrice: '860', taxRatePct: '5' },
    ]);
    d.transport = { mode: 'road', vehicleNo: 'MP09GH4521', transporter: 'Malwa Goods Carriers (sample)', lrNo: 'MGC-30418', lrDate: today, distanceKm: '195' };
    d.bank = { ...d.bank, accountName: 'Laxmi Distributors', bankName: 'Sample Bank', accountNo: '000000000000', ifsc: 'SAMP0000231', branch: 'Siyaganj' };
    d.text.notes = 'Scheme discount applied as per the October trade scheme.';
  },
});

const gstPurchaseOrder = define({
  id: 'gst-purchase-order',
  name: 'GST purchase order',
  title: 'PURCHASE ORDER',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'INR',
  labels: {
    seller: 'Buyer', buyer: 'Supplier', shipTo: 'Deliver to', number: 'PO no.', issueDate: 'PO date', dueDate: 'Delivery by',
    reference: 'Quotation ref.', code: 'HSN', signature: 'Approved by',
  },
  metaFields: ['reference', 'deliveryDate', 'placeOfSupply', 'paymentTerms', 'deliveryTerms'],
  shippingFields: [],
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Item description', 32, 'left'), col('code', 'HSN', 8, 'left'),
    col('qty', 'Qty', 9), col('unitPrice', 'Rate', 10), col('discount', 'Disc.', 7), col('taxable', 'Taxable value', 12),
    col('taxRate', 'GST %', 6), col('taxAmount', 'GST', 10), col('amount', 'Amount', 12),
  ],
  lineFields: ['details', 'code', 'unit', 'discountPct'],
  taxModes: ['india-gst', 'none'],
  toggles: ['logo', 'shipTo', 'notes', 'terms', 'signature', 'approval', 'amountInWords', 'taxSummary'],
  seriesPrefix: 'PO',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'india-gst', label: 'GST', roundOff: true };
    d.meta.deliveryDate = addDays(today, 14);
    d.text.terms = PO_TERMS;
    d.text.signatureTitle = 'Authorised signatory';
    d.items = [emptyLine({ taxRatePct: '18' })];
  },
  fill: (d, today) => {
    d.seller = { name: 'Shree Ganesh Polymers', address: 'Plot 14, Aji GIDC, Rajkot, Gujarat 360003', email: 'purchase@ganeshpolymers.example', phone: '+91 98250 00000', taxId: SAMPLE_GSTINS.ganesh, stateCode: '24', country: 'India', contact: 'Rakesh Patel (Purchase)' };
    d.buyer = { name: 'Deccan Resins Pvt Ltd', address: 'Survey No. 112, IDA Pashamylaram, Sangareddy, Telangana 502307', email: 'sales@deccanresins.example', phone: '+91 40 0000 0000', taxId: SAMPLE_GSTINS.deccan, stateCode: '36', country: 'India', contact: 'Ms. K. Lavanya' };
    d.shipToSame = false;
    d.shipTo = { ...d.shipTo, name: 'Shree Ganesh Polymers — Unit 2', address: 'Plot 31, Metoda GIDC, Rajkot, Gujarat 360021', stateCode: '24', taxId: SAMPLE_GSTINS.ganesh };
    d.meta = { ...d.meta, number: 'SGP/PO/26-27/0063', reference: 'DR/Q/8841', deliveryDate: addDays(today, 10), placeOfSupply: '24', paymentTerms: '45 days from receipt of goods and invoice', deliveryTerms: 'Door delivery, freight included' };
    withLines(d, [
      { description: 'PVC suspension resin K-67', details: '25 kg HDPE bags', code: '3904', qty: '8000', unit: 'KGS', unitPrice: '78.40', taxRatePct: '18' },
      { description: 'Calcium-zinc stabiliser', code: '3812', qty: '400', unit: 'KGS', unitPrice: '212', taxRatePct: '18' },
      { description: 'Titanium dioxide, rutile grade', code: '3206', qty: '250', unit: 'KGS', unitPrice: '268', discountPct: '2', taxRatePct: '18' },
    ]);
    d.text.notes = 'Material test certificate required with each lot.';
    d.text.signatureName = 'Rakesh Patel';
    d.text.approvedBy = 'H. M. Shah, Director';
  },
});

const manufacturingPurchaseOrder = define({
  id: 'manufacturing-purchase-order',
  name: 'Manufacturing purchase order',
  title: 'PURCHASE ORDER',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'INR',
  labels: {
    seller: 'Buyer', buyer: 'Supplier / vendor', shipTo: 'Deliver to', number: 'PO no.', issueDate: 'PO date', reference: 'Drawing / RFQ ref.',
    code: 'Part no.', code2: 'HSN', details: 'Specification / drawing no.', signature: 'Approved by', deliveryDate: 'Delivery date',
  },
  metaFields: ['reference', 'deliveryDate', 'placeOfSupply', 'paymentTerms', 'deliveryTerms'],
  shippingFields: [],
  columns: [
    col('sno', '#', 3, 'left'), col('code', 'Part no.', 11, 'left'), col('description', 'Item / specification', 22, 'left'),
    col('grade', 'Grade', 7, 'left'), col('code2', 'HSN', 6, 'left'), col('deliveryDate', 'Delivery', 9, 'left'),
    col('qty', 'Qty', 8), col('unitPrice', 'Rate', 9), col('taxRate', 'GST %', 5), col('taxAmount', 'GST', 10), col('amount', 'Amount', 12),
  ],
  lineFields: ['details', 'code', 'code2', 'grade', 'deliveryDate', 'unit', 'discountPct'],
  taxModes: ['india-gst', 'none'],
  toggles: ['logo', 'shipTo', 'schedule', 'quality', 'notes', 'terms', 'signature', 'approval', 'amountInWords', 'taxSummary'],
  seriesPrefix: 'MPO',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'india-gst', label: 'GST', roundOff: true };
    d.meta.deliveryDate = addDays(today, 30);
    d.text.terms = PO_TERMS;
    d.text.qualityTerms = 'Material to be supplied with mill test certificate and inspection report. First-article inspection at our works before bulk supply. Lots failing inspection will be rejected.';
    d.text.tolerance = 'Dimensional tolerances as per drawing. Quantity tolerance ±2% per delivery.';
    d.items = [emptyLine({ taxRatePct: '18' })];
  },
  fill: (d, today) => {
    d.seller = { name: 'Precision Auto Components Pvt Ltd', address: 'Gat No. 210, Chakan MIDC Phase II, Pune, Maharashtra 410501', email: 'purchase@precisionauto.example', phone: '+91 20 0000 0000', taxId: SAMPLE_GSTINS.precision, stateCode: '27', country: 'India', contact: 'S. Kulkarni (SCM)' };
    d.buyer = { name: 'Kolhapur Castings & Forgings', address: 'Plot C-18, Shiroli MIDC, Kolhapur, Maharashtra 416122', email: 'marketing@kolhapurcastings.example', phone: '+91 231 000 0000', taxId: SAMPLE_GSTINS.kolhapur, stateCode: '27', country: 'India', contact: 'Mr. V. Patil' };
    d.meta = { ...d.meta, number: 'PAC/MPO/26-27/0217', reference: 'RFQ-0918 Rev B', deliveryDate: addDays(today, 45), placeOfSupply: '27', paymentTerms: '60 days from acceptance of material', deliveryTerms: 'FOR our Chakan plant, in returnable bins' };
    withLines(d, [
      { code: 'PAC-HB-2207', description: 'Hub bearing housing, machined', details: 'Drg. PAC-D-2207 Rev C; bore Ø62 H7', grade: 'SG 500/7', code2: '8708', deliveryDate: addDays(today, 30), qty: '1200', unit: 'NOS', unitPrice: '386', taxRatePct: '18' },
      { code: 'PAC-SH-1140', description: 'Drive shaft forging, rough', details: 'Drg. PAC-D-1140 Rev A; hardness 220–260 BHN', grade: 'EN8D', code2: '7326', deliveryDate: addDays(today, 40), qty: '800', unit: 'NOS', unitPrice: '512.75', taxRatePct: '18' },
    ]);
    d.schedule = [
      emptyScheduleRow({ date: addDays(today, 30), qty: '600 + 400', note: 'Lot 1: PAC-HB-2207 600 nos; PAC-SH-1140 400 nos' }),
      emptyScheduleRow({ date: addDays(today, 45), qty: '600 + 400', note: 'Lot 2: balance quantities' }),
    ];
    d.text.signatureName = 'S. Kulkarni';
    d.text.approvedBy = 'A. Deshpande, Plant Head';
  },
});

const internationalPurchaseOrder = define({
  id: 'international-purchase-order',
  name: 'International purchase order',
  title: 'PURCHASE ORDER',
  india: false,
  dateStyle: 'intl',
  defaultCurrency: 'USD',
  labels: {
    seller: 'Buyer', buyer: 'Seller / supplier', shipTo: 'Ship to', number: 'PO no.', issueDate: 'PO date', reference: 'Proforma / quote ref.',
    sellerTaxId: 'Tax ID / IEC', buyerTaxId: 'VAT / tax ID', code: 'HS code', signature: 'Authorised by',
  },
  metaFields: ['reference', 'deliveryDate', 'incoterm', 'shippingMethod', 'partialShipment', 'paymentTerms', 'deliveryTerms'],
  shippingFields: ['portLoading', 'portDischarge', 'finalDestination', 'countryOrigin'],
  shippingLabels: { countryOrigin: 'Country of origin' },
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Description', 38, 'left'), col('code', 'HS code', 10, 'left'),
    col('qty', 'Qty', 10), col('unitPrice', 'Unit price', 13), col('discount', 'Disc.', 9), col('amount', 'Amount', 15),
  ],
  lineFields: ['details', 'code', 'unit', 'discountPct'],
  taxModes: ['none', 'single'],
  toggles: ['logo', 'shipTo', 'shipping', 'notes', 'terms', 'signature', 'amountInWords'],
  seriesPrefix: 'IPO',
  setup: (d, today) => {
    d.tax = { ...d.tax, mode: 'none', label: 'VAT', perLine: false };
    d.meta.deliveryDate = addDays(today, 60);
    d.meta.incoterm = 'FOB';
    d.meta.partialShipment = 'not-allowed';
    d.text.terms = [
      '1. Quote this PO number on the commercial invoice, packing list and all shipping documents.',
      '2. Delivery under the Incoterm stated (Incoterms® 2020).',
      '3. Goods must match the agreed specifications; non-conforming goods may be rejected.',
      '4. Send scanned shipping documents by email on dispatch.',
    ].join('\n');
  },
  fill: (d, today) => {
    d.seller = { name: 'Shree Ganesh Polymers', address: 'Plot 14, Aji GIDC, Rajkot, Gujarat 360003, India', email: 'imports@ganeshpolymers.example', phone: '+91 98250 00000', taxId: 'IEC 0000000000 (sample)', stateCode: '24', country: 'India', contact: 'Rakesh Patel' };
    d.buyer = { name: 'Hanseatic Extrusion Tools GmbH', address: 'Hafenstraße 18, 20457 Hamburg, Germany', email: 'export@hanseatic-tools.example', phone: '+49 40 0000 000', taxId: 'DE000000000', stateCode: '', country: 'Germany', contact: 'Mr. Jonas Weber' };
    d.shipToSame = false;
    d.shipTo = { ...d.shipTo, name: 'Shree Ganesh Polymers — Unit 2', address: 'Plot 31, Metoda GIDC, Rajkot, Gujarat 360021, India', country: 'India' };
    d.meta = { ...d.meta, currency: 'EUR', number: 'SGP/IPO/26-27/009', reference: 'PI HET-2026-0412', deliveryDate: addDays(today, 75), incoterm: 'FOB', incotermPlace: 'Hamburg', shippingMethod: 'Sea freight, 1 × 20\' container', paymentTerms: '30% advance by wire transfer, 70% against copy of bill of lading', deliveryTerms: 'Seaworthy export packing on fumigated pallets' };
    d.shipping = { ...d.shipping, portLoading: 'Hamburg, Germany', portDischarge: 'Mundra, India', finalDestination: 'Rajkot, India', countryOrigin: 'Germany' };
    withLines(d, [
      { description: 'Extrusion die head, 110 mm pipe', details: 'Spiral mandrel type, with heater bands', code: '8477.90', qty: '1', unit: 'SET', unitPrice: '18400' },
      { description: 'Calibration sleeve set, 63–110 mm', code: '8477.90', qty: '4', unit: 'SET', unitPrice: '1250' },
      { description: 'Spare heater band, 230 V', code: '8516.80', qty: '12', unit: 'PCS', unitPrice: '86.50', discountPct: '5' },
    ]);
    d.text.signatureName = 'Rakesh Patel';
  },
});

const exportCommercialInvoice = define({
  id: 'export-commercial-invoice',
  name: 'Export commercial invoice',
  title: 'COMMERCIAL INVOICE',
  india: true,
  dateStyle: 'india',
  defaultCurrency: 'USD',
  labels: {
    seller: 'Exporter', buyer: 'Consignee', notify: 'Notify party / buyer (if other than consignee)', number: 'Invoice no.', issueDate: 'Invoice date',
    poNumber: 'Buyer\'s order no.', reference: 'Shipping bill no.', sellerTaxId: 'GSTIN', buyerTaxId: 'Tax ID', code: 'HS code', unitPrice: 'Unit price',
    declaration: 'Declaration',
  },
  metaFields: ['poNumber', 'reference', 'incoterm', 'paymentTerms'],
  shippingFields: ['iec', 'lutArn', 'portLoading', 'portDischarge', 'countryOrigin', 'finalDestination', 'vessel', 'blNo', 'packages', 'grossWeight', 'netWeight', 'marks', 'exchangeRate'],
  shippingLabels: { vessel: 'Vessel / flight no.', blNo: 'B/L / AWB no.', portLoading: 'Port of loading (code)', portDischarge: 'Port of discharge' },
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Description of goods', 34, 'left'), col('code', 'HS code', 11, 'left'),
    col('qty', 'Qty', 11), col('unitPrice', 'Unit price', 12), col('taxRate', 'IGST %', 7), col('taxAmount', 'IGST', 10), col('amount', 'Amount', 15),
  ],
  lineFields: ['details', 'code', 'unit'],
  taxModes: ['export-zero-rated', 'export-igst'],
  toggles: ['logo', 'notify', 'shipping', 'bank', 'notes', 'declaration', 'signature', 'amountInWords'],
  seriesPrefix: 'EXP',
  setup: (d) => {
    d.tax = { ...d.tax, mode: 'export-zero-rated', label: 'IGST' };
    d.meta.incoterm = 'FOB';
    d.shipping.countryOrigin = 'India';
    d.sections.notify = false;
    d.text.declaration = 'We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.';
  },
  fill: (d) => {
    d.seller = { name: 'Shree Ganesh Polymers', address: 'Plot 14, Aji GIDC, Rajkot, Gujarat 360003, India', email: 'exports@ganeshpolymers.example', phone: '+91 98250 00000', taxId: SAMPLE_GSTINS.ganesh, stateCode: '24', country: 'India', contact: '' };
    d.buyer = { name: 'Gulf Irrigation Supplies LLC', address: 'Warehouse 7, Al Quoz Industrial Area 3, Dubai, United Arab Emirates', email: 'procurement@gulfirrigation.example', phone: '+971 4 000 0000', taxId: 'TRN 100000000000003', stateCode: '', country: 'United Arab Emirates', contact: '' };
    d.meta = { ...d.meta, number: 'SGP/EXP/26-27/021', poNumber: 'GIS-PO-7781', reference: '', incoterm: 'FOB', incotermPlace: 'Mundra', paymentTerms: '100% against documents (D/P) through bank' };
    d.shipping = {
      ...d.shipping, iec: '0000000000', lutArn: 'AD240000000000X', portLoading: 'Mundra (INMUN1)', portDischarge: 'Jebel Ali (AEJEA)', countryOrigin: 'India',
      finalDestination: 'Dubai, UAE', vessel: 'To be advised', blNo: '', packages: '42 bundles + 18 cartons', grossWeight: '6,480 kg', netWeight: '6,120 kg',
      marks: 'GIS / DUBAI / 1–60', exchangeRate: '83.50',
    };
    withLines(d, [
      { description: 'uPVC pipe 110 mm × 6 m, 6 kg/cm²', code: '39172390', qty: '840', unit: 'PCS', unitPrice: '7.85' },
      { description: 'uPVC pipe 63 mm × 6 m, 6 kg/cm²', code: '39172390', qty: '1200', unit: 'PCS', unitPrice: '3.10' },
      { description: 'Drip irrigation lateral 16 mm, 400 m roll', code: '84248200', qty: '180', unit: 'ROL', unitPrice: '17.40' },
    ]);
    d.bank = { ...d.bank, accountName: 'Shree Ganesh Polymers', bankName: 'Sample Bank — Trade Finance Branch', accountNo: '001234500000', ifsc: 'SAMP0001234', swift: 'SAMPINBBXXX' };
    d.text.signatureName = 'M. R. Bhatt, Partner';
  },
});

const courierCommercialInvoice = define({
  id: 'courier-commercial-invoice',
  name: 'Courier commercial invoice',
  title: 'COMMERCIAL INVOICE',
  india: false,
  dateStyle: 'intl',
  defaultCurrency: 'USD',
  labels: {
    seller: 'Shipper / sender', buyer: 'Consignee / receiver', notify: 'Importer (if different)', number: 'Invoice no.', issueDate: 'Date',
    reference: 'Order / reference', sellerTaxId: 'Tax ID / GSTIN', buyerTaxId: 'Tax ID / EORI', code: 'HS code', unitPrice: 'Unit value',
    declaration: 'Customs declaration', signature: 'Signature of shipper',
  },
  metaFields: ['reference', 'incoterm'],
  shippingFields: ['vessel', 'blNo', 'reasonForExport', 'countryOrigin', 'finalDestination', 'packages', 'grossWeight', 'netWeight'],
  shippingLabels: { vessel: 'Courier / service', blNo: 'AWB / tracking no.', countryOrigin: 'Country of origin', finalDestination: 'Destination country', packages: 'No. of packages', grossWeight: 'Total gross weight', netWeight: 'Total net weight' },
  columns: [
    col('sno', '#', 4, 'left'), col('description', 'Full description of contents', 36, 'left'), col('code', 'HS code', 11, 'left'),
    col('origin', 'Origin', 9, 'left'), col('qty', 'Qty', 9), col('unitPrice', 'Unit value', 13), col('amount', 'Total value', 14),
  ],
  lineFields: ['details', 'code', 'origin', 'unit'],
  taxModes: ['none', 'export-zero-rated', 'export-igst'],
  toggles: ['logo', 'notify', 'shipping', 'notes', 'declaration', 'signature', 'amountInWords'],
  seriesPrefix: 'CI',
  setup: (d) => {
    d.tax = { ...d.tax, mode: 'none' };
    d.meta.incoterm = 'DAP';
    d.shipping.reasonForExport = 'Sale';
    d.sections.notify = false;
    d.items = [emptyLine({ unit: 'PCS', origin: 'India' })];
    d.text.declaration = 'I/We declare that the information on this invoice is true and correct, and that the contents of this shipment are as stated above.';
  },
  fill: (d) => {
    d.seller = { name: 'Nilgiri Handloom Studio', address: '7 Church Hill Road, Ooty, Tamil Nadu 643001, India', email: 'hello@nilgirihandloom.example', phone: '+91 94430 00000', taxId: SAMPLE_GSTINS.nilgiri, stateCode: '33', country: 'India', contact: 'Priya Raman' };
    d.buyer = { name: 'Clarke & Finch Interiors Ltd', address: 'Unit 4, 21 Shoreditch High Street, London E1 6PJ, United Kingdom', email: 'studio@clarkefinch.example', phone: '+44 20 0000 0000', taxId: 'GB000000000000', stateCode: '', country: 'United Kingdom', contact: 'Emma Clarke' };
    d.meta = { ...d.meta, number: 'NHS-CI-0007', reference: 'Sample request 14 Oct', incoterm: 'DAP', incotermPlace: 'London' };
    d.shipping = { ...d.shipping, vessel: 'Express courier (sample)', blNo: '0000 0000 0000', reasonForExport: 'Sample — no commercial value beyond declared', countryOrigin: 'India', finalDestination: 'United Kingdom', packages: '1 carton', grossWeight: '3.4 kg', netWeight: '2.9 kg' };
    withLines(d, [
      { description: 'Handwoven cotton cushion cover, 40 × 40 cm', details: '100% cotton, indigo dyed', code: '6304.92', origin: 'India', qty: '6', unit: 'PCS', unitPrice: '6.50' },
      { description: 'Cotton table runner, 180 cm', details: '100% cotton', code: '6302.51', origin: 'India', qty: '3', unit: 'PCS', unitPrice: '11.00' },
      { description: 'Fabric swatch card', code: '4911.10', origin: 'India', qty: '2', unit: 'PCS', unitPrice: '1.00' },
    ]);
    d.text.signatureName = 'Priya Raman, Proprietor';
  },
});

export const PRESETS: Record<TemplateId, TemplatePreset> = {
  'gst-tax-invoice': gstTaxInvoice,
  'simple-sales-invoice': simpleSalesInvoice,
  'service-invoice': serviceInvoice,
  'wholesale-invoice': wholesaleInvoice,
  'gst-purchase-order': gstPurchaseOrder,
  'manufacturing-purchase-order': manufacturingPurchaseOrder,
  'international-purchase-order': internationalPurchaseOrder,
  'export-commercial-invoice': exportCommercialInvoice,
  'courier-commercial-invoice': courierCommercialInvoice,
};

export function getPreset(id: TemplateId): TemplatePreset {
  return PRESETS[id];
}

/** Fixed date used for deterministic thumbnails / static rendering. */
export const SAMPLE_DATE = '2026-04-15';

export const TAX_MODE_LABEL: Record<TaxMode, string> = {
  'india-gst': 'GST (CGST + SGST / IGST)',
  single: 'Single tax (VAT / sales tax)',
  none: 'No tax',
  'export-zero-rated': 'Export under LUT / bond (no IGST)',
  'export-igst': 'Export with IGST paid',
};

export const REASONS_FOR_EXPORT = ['Sale', 'Sample', 'Gift', 'Repair and return', 'Return of goods', 'Personal effects'];

// Every template id must have a preset (compile-time and runtime guard).
for (const id of TEMPLATE_IDS) if (!PRESETS[id]) throw new Error(`Missing preset for ${id}`);
