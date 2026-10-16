// Delivery challan data model and totals. Money maths via src/lib/money.ts.
import { calculateInvoice, parseAmount, parseQty, parseRate, type InvoiceTotals, type LineInput, type SupplyType } from '@/lib/money';
import { emptyItem, emptyParty, gstinError, uid, type Item, type Party, type Transport } from '../invoice/model';

export const REASONS = [
  { value: 'job-work', label: 'Job work' },
  { value: 'supply-on-approval', label: 'Supply on approval' },
  { value: 'sale-on-approval', label: 'Sale on approval' },
  { value: 'branch-transfer', label: 'Branch / stock transfer' },
  { value: 'exhibition', label: 'Exhibition or fair' },
  { value: 'line-sales', label: 'Line sales' },
  { value: 'skd-ckd', label: 'SKD / CKD in batches or lots' },
  { value: 'repairs', label: 'Sent for repairs' },
  { value: 'others', label: 'Others' },
] as const;
export type Reason = (typeof REASONS)[number]['value'];

export const COPY_LABELS = {
  original: 'Original for consignee',
  duplicate: 'Duplicate for transporter',
  triplicate: 'Triplicate for consignor',
} as const;
export type CopyKey = keyof typeof COPY_LABELS;
export type CopyChoice = CopyKey | 'all';

export interface ChallanData {
  challanNo: string;
  challanDate: string;
  reason: Reason;
  reasonOther: string;
  consignor: Party;
  consignee: Party;
  placeOfSupply: string;
  items: Item[];
  showTax: boolean;
  transport: Transport;
  copy: CopyChoice;
  notes: string;
  declaration: string;
}

export const DEFAULT_CHALLAN_DECLARATION = 'This is a delivery challan for movement of goods and not a tax invoice.';

export function emptyChallan(): ChallanData {
  return {
    challanNo: '', challanDate: '', reason: 'job-work', reasonOther: '',
    consignor: emptyParty(), consignee: emptyParty(), placeOfSupply: '',
    items: [{ ...emptyItem('c0'), gst: '18' }], showTax: false,
    transport: { mode: 'road', vehicleNo: '', transporter: '', distanceKm: '' },
    copy: 'original', notes: '', declaration: DEFAULT_CHALLAN_DECLARATION,
  };
}

export function reasonLabel(d: Pick<ChallanData, 'reason' | 'reasonOther'>): string {
  if (d.reason === 'others') return d.reasonOther.trim() || 'Others';
  return REASONS.find((r) => r.value === d.reason)?.label ?? '';
}

export interface ChallanCalc {
  supply: SupplyType;
  totals: InvoiceTotals;
  lineIndex: number[];
  lineInputs: LineInput[];
  itemErrors: Record<string, Partial<Record<'description' | 'qty' | 'rate' | 'gst', string>>>;
  fieldErrors: Partial<Record<'consignorGstin' | 'consigneeGstin', string>>;
  warnings: string[];
  /** Plain-language e-way bill hint. */
  ewbHint: { level: 'required' | 'likely' | 'check'; text: string };
}

export function computeChallan(d: ChallanData): ChallanCalc {
  const from = d.consignor.stateCode;
  const to = d.placeOfSupply || d.consignee.stateCode;
  const supply: SupplyType = from && to && from !== to ? 'inter' : 'intra';
  const itemErrors: ChallanCalc['itemErrors'] = {};
  const lineInputs: LineInput[] = [];
  const lineIndex: number[] = [];
  d.items.forEach((it, i) => {
    const e: ChallanCalc['itemErrors'][string] = {};
    const blank = !it.description.trim() && !it.rate.trim();
    const qty = parseQty(it.qty);
    const rate = it.rate.trim() ? parseAmount(it.rate) : null;
    const gst = d.showTax ? parseRate(it.gst) : 0;
    if (!blank) {
      if (!it.description.trim()) e.description = 'Enter a description.';
      if (qty === null || qty === 0) e.qty = 'Invalid quantity.';
      if (rate === null || rate < 0) e.rate = 'Invalid value.';
    }
    if (gst === null) e.gst = 'Invalid rate.';
    if (Object.keys(e).length) itemErrors[it.id] = e;
    if (!blank && !Object.keys(e).length && qty !== null && rate !== null && gst !== null) {
      lineInputs.push({ qtyMilli: qty, rate, gstBp: gst });
      lineIndex.push(i);
    }
  });
  const totals = calculateInvoice(lineInputs, supply);

  const fieldErrors: ChallanCalc['fieldErrors'] = {};
  const a = gstinError(d.consignor.gstin);
  if (a) fieldErrors.consignorGstin = a;
  const b = gstinError(d.consignee.gstin);
  if (b) fieldErrors.consigneeGstin = b;

  const warnings: string[] = [];
  if (!d.consignor.name.trim()) warnings.push('Consignor name is missing.');
  if (!d.consignor.stateCode) warnings.push('Select the consignor state.');
  if (!d.challanNo.trim()) warnings.push('Challan number is missing.');
  if (!d.challanDate) warnings.push('Challan date is missing.');
  if (!d.consignee.name.trim()) warnings.push('Consignee name is missing.');
  if (!lineInputs.length) warnings.push('Add at least one complete line item.');
  if (d.reason === 'others' && !d.reasonOther.trim()) warnings.push('Describe the reason for transport.');
  if (d.reason === 'branch-transfer' && supply === 'inter') {
    warnings.push('Inter-state transfer to your own branch with a different GSTIN is generally treated as a supply and is usually made on a tax invoice. Check with your adviser.');
  }

  const total = totals.total;
  const inter = supply === 'inter' && !!from && !!to;
  let ewbHint: ChallanCalc['ewbHint'];
  if (d.reason === 'job-work' && inter) {
    ewbHint = { level: 'required', text: 'Inter-state movement to a job worker needs an e-way bill whatever the value.' };
  } else if (total > 50_000_00) {
    ewbHint = { level: 'likely', text: 'Value is above ₹50,000, so an e-way bill is likely needed for this movement, even though it moves on a delivery challan.' };
  } else {
    ewbHint = { level: 'check', text: 'Value is ₹50,000 or less. An e-way bill may not be needed, but some states set different limits for intra-state movement — check the rules.' };
  }

  return { supply, totals, lineIndex, lineInputs, itemErrors, fieldErrors, warnings, ewbHint };
}

export function sampleChallan(today: string): ChallanData {
  return {
    ...emptyChallan(),
    challanDate: today,
    reason: 'job-work',
    consignor: { name: 'Sample Pipes Pvt Ltd (illustrative)', address: 'Plot 12, GIDC Industrial Area, Rajkot, Gujarat 360003', gstin: '24ABCDE1234F1Z5', stateCode: '24' },
    consignee: { name: 'Demo Moulders (illustrative job worker)', address: 'Shed 7, Waluj MIDC, Aurangabad, Maharashtra 431136', gstin: '27PQRSX5678K1Z2', stateCode: '27' },
    placeOfSupply: '27',
    items: [
      { id: uid(), description: 'PVC resin for moulding', hsn: '3904', qty: '2000', unit: 'KGS', rate: '95', discount: '', gst: '18' },
      { id: uid(), description: 'Steel moulds (to be returned)', hsn: '8480', qty: '4', unit: 'NOS', rate: '12500', discount: '', gst: '18' },
    ],
    transport: { mode: 'road', vehicleNo: 'GJ03AB1234', transporter: 'Sample Roadways (illustrative)', distanceKm: '760' },
    notes: 'Goods sent for moulding. Finished goods and moulds to be returned after job work.',
  };
}

export function normaliseChallan(raw: unknown): ChallanData | null {
  if (!raw || typeof raw !== 'object') return null;
  const base = emptyChallan();
  const r = raw as Partial<ChallanData>;
  const party = (p: unknown): Party => ({ ...emptyParty(), ...(p && typeof p === 'object' ? (p as Partial<Party>) : {}) });
  const items = Array.isArray(r.items)
    ? r.items.filter((x) => x && typeof x === 'object').map((x) => ({ ...emptyItem(), ...(x as Partial<Item>), id: uid() }))
    : base.items;
  return {
    ...base,
    ...r,
    reason: REASONS.some((x) => x.value === r.reason) ? (r.reason as Reason) : base.reason,
    copy: r.copy && (r.copy === 'all' || r.copy in COPY_LABELS) ? r.copy : base.copy,
    consignor: party(r.consignor),
    consignee: party(r.consignee),
    transport: { ...base.transport, ...(r.transport ?? {}) },
    items: items.length ? items : base.items,
  };
}
