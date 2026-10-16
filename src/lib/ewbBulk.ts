// Pre-upload checks for bulk e-way bill data (one row per document). Pure functions, browser-only use.
// This checks the data you plan to feed into the official bulk generation utility or your GSP/ERP;
// it does not generate e-way bills or the portal JSON.
import { checkGstin, gstinCheckChar } from './gstin';
import { parseIndianDate, parseTable, toCsv } from './csv';
import { parseAmount, parseQty, parseRate, roundHalfUp } from './money';
import { MAX_DISTANCE_KM, SAME_PIN_MAX_KM } from './validity';
import { GST_STATES } from '@/components/tools/invoice/states';

export const DOC_AGE_LIMIT_DAYS = 180;
export const CONSIGNMENT_THRESHOLD_PAISE = 50_000_00;
export const TOTAL_TOLERANCE_PAISE = 100; // ±₹1 for rounding
export const PART_B_EXEMPT_KM = 50;

export type Level = 'error' | 'warning';
export type RowStatus = 'error' | 'warning' | 'ok';

export interface Issue {
  level: Level;
  /** Stable key used to group the fix list. */
  code: string;
  field: string;
  message: string;
}

export const FIELDS = [
  'supplyType', 'subType', 'docType', 'docNo', 'docDate',
  'fromGstin', 'fromPin', 'fromState', 'toGstin', 'toPin', 'toState',
  'hsn', 'product', 'qty', 'unit', 'taxable',
  'cgstRate', 'sgstRate', 'igstRate', 'cgstAmt', 'sgstAmt', 'igstAmt',
  'total', 'mode', 'distance', 'transporterId', 'vehicleNo', 'vehicleType',
] as const;
export type Field = (typeof FIELDS)[number];
export type BulkRow = Partial<Record<Field, string>>;

export const FIELD_LABEL: Record<Field, string> = {
  supplyType: 'Supply type', subType: 'Sub type', docType: 'Document type', docNo: 'Document no', docDate: 'Document date',
  fromGstin: 'From GSTIN', fromPin: 'From PIN', fromState: 'From state code', toGstin: 'To GSTIN', toPin: 'To PIN',
  toState: 'To state code', hsn: 'HSN', product: 'Product name', qty: 'Quantity', unit: 'Unit', taxable: 'Taxable value',
  cgstRate: 'CGST rate', sgstRate: 'SGST rate', igstRate: 'IGST rate', cgstAmt: 'CGST amount', sgstAmt: 'SGST amount',
  igstAmt: 'IGST amount', total: 'Total invoice value', mode: 'Transport mode', distance: 'Distance (km)',
  transporterId: 'Transporter ID', vehicleNo: 'Vehicle no', vehicleType: 'Vehicle type',
};

/** Header spellings accepted for each field (compared ignoring case, spaces and punctuation). */
export const ALIASES: Record<Field, string[]> = {
  supplyType: ['supply type', 'supplytype', 'type of supply', 'transaction type'],
  subType: ['sub type', 'subtype', 'sub supply type', 'sub-type'],
  docType: ['doc type', 'document type', 'type of document'],
  docNo: ['doc no', 'document no', 'document number', 'invoice no', 'invoice number', 'doc number', 'bill no'],
  docDate: ['doc date', 'document date', 'invoice date', 'bill date', 'date'],
  fromGstin: ['from gstin', 'gstin of supplier', 'supplier gstin', 'consignor gstin', 'from gstin/uin'],
  fromPin: ['from pin', 'from pincode', 'from pin code', 'dispatch pin', 'supplier pin'],
  fromState: ['from state', 'from state code', 'supplier state code', 'from statecode'],
  toGstin: ['to gstin', 'gstin of recipient', 'recipient gstin', 'consignee gstin', 'buyer gstin', 'to gstin/uin'],
  toPin: ['to pin', 'to pincode', 'to pin code', 'delivery pin', 'recipient pin'],
  toState: ['to state', 'to state code', 'recipient state code', 'to statecode'],
  hsn: ['hsn', 'hsn code', 'hsn/sac', 'hsn sac'],
  product: ['product', 'product name', 'item', 'item name', 'description'],
  qty: ['qty', 'quantity'],
  unit: ['unit', 'uqc', 'uom'],
  taxable: ['taxable value', 'taxable amount', 'assessable value', 'taxable'],
  cgstRate: ['cgst rate', 'cgst %', 'cgst rate %', 'cgst rate (%)'],
  sgstRate: ['sgst rate', 'sgst %', 'sgst/utgst rate', 'sgst rate %', 'sgst rate (%)'],
  igstRate: ['igst rate', 'igst %', 'igst rate %', 'igst rate (%)'],
  cgstAmt: ['cgst amount', 'cgst amt', 'cgst', 'cgst value'],
  sgstAmt: ['sgst amount', 'sgst amt', 'sgst', 'sgst/utgst amount', 'sgst value'],
  igstAmt: ['igst amount', 'igst amt', 'igst', 'igst value'],
  total: ['total invoice value', 'total value', 'invoice value', 'total', 'total amount'],
  mode: ['transport mode', 'mode', 'trans mode', 'mode of transport'],
  distance: ['distance', 'distance km', 'distance (km)', 'approx distance', 'approximate distance'],
  transporterId: ['transporter id', 'transporter gstin', 'transin', 'trans id'],
  vehicleNo: ['vehicle no', 'vehicle number', 'vehicle', 'vehicle reg no'],
  vehicleType: ['vehicle type', 'type of vehicle'],
};

const DOC_TYPES: Record<string, string> = {
  taxinvoice: 'Tax Invoice', invoice: 'Tax Invoice', inv: 'Tax Invoice',
  billofsupply: 'Bill of Supply', bil: 'Bill of Supply',
  deliverychallan: 'Delivery Challan', challan: 'Delivery Challan', chl: 'Delivery Challan',
  creditnote: 'Credit Note', cnt: 'Credit Note',
  billofentry: 'Bill of Entry', boe: 'Bill of Entry',
  others: 'Others', other: 'Others', oth: 'Others',
};

const SUB_TYPES = [
  'supply', 'import', 'export', 'jobwork', 'forownuse', 'jobworkreturns', 'salesreturn', 'others',
  'skdckdlots', 'skdckd', 'linesales', 'recipientnotknown', 'exhibitionorfairs', 'exhibitionorfair',
];

const MODES: Record<string, 'Road' | 'Rail' | 'Air' | 'Ship'> = {
  road: 'Road', '1': 'Road', rail: 'Rail', '2': 'Rail', air: 'Air', '3': 'Air', ship: 'Ship', '4': 'Ship',
};

const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const VALID_STATE = new Set(GST_STATES.map((s) => s.code));

export const VEHICLE_PATTERNS = {
  regular: /^[A-Z]{2}\d{1,2}[A-Z]{0,3}\d{4}$/,
  temporary: /^TR[A-Z0-9]{6,13}$/,
  bharat: /^\d{2}BH\d{4}[A-Z]{1,2}$/,
};

export function normaliseVehicle(v: string): string {
  return v.toUpperCase().replace(/[\s.\-/]/g, '');
}

/** 'regular' | 'temporary' | 'bharat' | null for unusual formats. */
export function vehicleFormat(v: string): keyof typeof VEHICLE_PATTERNS | null {
  const n = normaliseVehicle(v);
  for (const [k, re] of Object.entries(VEHICLE_PATTERNS)) if (re.test(n)) return k as keyof typeof VEHICLE_PATTERNS;
  return null;
}

/** Whole days from `fromIso` to `toIso` (both YYYY-MM-DD). */
export function daysBetween(fromIso: string, toIso: string): number {
  const a = Date.UTC(+fromIso.slice(0, 4), +fromIso.slice(5, 7) - 1, +fromIso.slice(8, 10));
  const b = Date.UTC(+toIso.slice(0, 4), +toIso.slice(5, 7) - 1, +toIso.slice(8, 10));
  return Math.round((b - a) / 86_400_000);
}

function normStateCode(s: string): string {
  const t = s.trim();
  if (/^\d{1,2}$/.test(t)) return t.padStart(2, '0');
  const byName = GST_STATES.find((x) => key(x.name) === key(t));
  return byName ? byName.code : t;
}

/** Tax amount in paise: explicit amount wins; otherwise rate × taxable. null = invalid input. */
function taxPaise(amt: string | undefined, rate: string | undefined, taxable: number | null): number | null {
  if (amt && amt.trim()) return parseAmount(amt);
  if (rate && rate.trim()) {
    const bp = parseRate(rate);
    if (bp === null) return null;
    return taxable === null ? 0 : roundHalfUp((taxable * bp) / 10000);
  }
  return 0;
}

export interface RowResult {
  index: number; // 0-based data row
  line: number; // spreadsheet line number (header = line 1)
  row: BulkRow;
  issues: Issue[];
  status: RowStatus;
}

export interface CheckOptions {
  /** Planned e-way bill generation date, YYYY-MM-DD. */
  generationDate: string;
}

export function checkRow(r: BulkRow, opts: CheckOptions): Issue[] {
  const issues: Issue[] = [];
  const err = (code: string, field: Field, message: string) => issues.push({ level: 'error', code, field, message });
  const warn = (code: string, field: Field, message: string) => issues.push({ level: 'warning', code, field, message });
  const v = (f: Field) => (r[f] ?? '').trim();

  // Supply / document
  const supply = key(v('supplyType'));
  const supplyType = supply === 'outward' || supply === 'o' ? 'Outward' : supply === 'inward' || supply === 'i' ? 'Inward' : null;
  if (!v('supplyType')) err('supply-missing', 'supplyType', 'Supply type is empty. Use Outward or Inward.');
  else if (!supplyType) err('supply-invalid', 'supplyType', `Supply type "${v('supplyType')}" is not Outward or Inward.`);

  if (!v('subType')) warn('subtype-missing', 'subType', 'Sub type is empty (for example Supply, Job Work, Export).');
  else if (!SUB_TYPES.includes(key(v('subType')))) warn('subtype-unknown', 'subType', `Sub type "${v('subType')}" is not one of the usual values; check it matches the list in the bulk tool.`);

  const docType = DOC_TYPES[key(v('docType'))];
  if (!v('docType')) err('doctype-missing', 'docType', 'Document type is empty.');
  else if (!docType) err('doctype-invalid', 'docType', `Document type "${v('docType')}" is not recognised (Tax Invoice, Bill of Supply, Delivery Challan, Credit Note, Bill of Entry, Others).`);
  else if (docType === 'Bill of Entry' && supplyType === 'Outward') warn('boe-outward', 'docType', 'A Bill of Entry is normally used with Inward supply (imports). Check the supply type.');

  const docNo = v('docNo');
  if (!docNo) err('docno-missing', 'docNo', 'Document number is empty.');
  else {
    if (docNo.length > 16) err('docno-long', 'docNo', `Document number has ${docNo.length} characters; keep it to 16 or fewer.`);
    if (!/^[A-Za-z0-9/-]+$/.test(docNo)) err('docno-chars', 'docNo', 'Document number should use only letters, digits, "/" and "-".');
  }

  // Date
  const rawDate = v('docDate');
  const date = rawDate ? parseIndianDate(rawDate) : null;
  if (!rawDate) err('date-missing', 'docDate', 'Document date is empty.');
  else if (!date) err('date-invalid', 'docDate', `"${rawDate}" is not a valid date. Use DD/MM/YYYY.`);
  else if (opts.generationDate) {
    const age = daysBetween(date, opts.generationDate);
    if (age < 0) err('date-future', 'docDate', 'Document date is after the generation date.');
    else if (age > DOC_AGE_LIMIT_DAYS) err('date-old', 'docDate', `Document is ${age} days old. Since 1 Jan 2025 an e-way bill cannot be generated for a document dated more than ${DOC_AGE_LIMIT_DAYS} days before the generation date.`);
    else if (age > DOC_AGE_LIMIT_DAYS - 10) warn('date-near-limit', 'docDate', `Document is ${age} days old — close to the ${DOC_AGE_LIMIT_DAYS}-day limit.`);
  }

  // Parties
  const partyCheck = (gf: 'fromGstin' | 'toGstin', sf: 'fromState' | 'toState', pf: 'fromPin' | 'toPin', side: 'From' | 'To') => {
    const g = v(gf).replace(/\s+/g, '').toUpperCase();
    const urpAllowed = side === 'To' || supplyType === 'Inward';
    let gstinState = '';
    if (!g) err(`${gf}-missing`, gf, `${side} GSTIN is empty${urpAllowed ? ' (use URP for an unregistered person)' : ''}.`);
    else if (g === 'URP') {
      if (!urpAllowed) err('fromGstin-urp', gf, 'From GSTIN cannot be URP for an outward supply; the supplier must be registered.');
    } else {
      const c = checkGstin(g);
      if (!c.valid) err(`${gf}-invalid`, gf, `${side} GSTIN ${g}: ${c.errors[0]}`);
      else gstinState = g.slice(0, 2);
    }
    const sc = v(sf) ? normStateCode(v(sf)) : '';
    if (!sc) {
      if (!gstinState) err(`${sf}-missing`, sf, `${side} state code is empty.`);
    } else if (!VALID_STATE.has(sc)) err(`${sf}-invalid`, sf, `${side} state code "${v(sf)}" is not a valid GST state code.`);
    else if (gstinState && sc !== gstinState) {
      warn(`${sf}-mismatch`, sf, `${side} state code ${sc} does not match the GSTIN state ${gstinState}. Correct it unless goods really move from/to another state's address.`);
    }
    const pin = v(pf);
    if (!pin) err(`${pf}-missing`, pf, `${side} PIN is empty.`);
    else if (!/^[1-9]\d{5}$/.test(pin)) err(`${pf}-invalid`, pf, `${side} PIN "${pin}" must be 6 digits and cannot start with 0.`);
    return sc && VALID_STATE.has(sc) ? sc : gstinState;
  };
  const fromSc = partyCheck('fromGstin', 'fromState', 'fromPin', 'From');
  const toSc = partyCheck('toGstin', 'toState', 'toPin', 'To');
  const intra = fromSc && toSc ? fromSc === toSc : null;

  // Item
  const hsn = v('hsn').replace(/\s+/g, '');
  if (!hsn) err('hsn-missing', 'hsn', 'HSN is empty.');
  else if (!/^\d{4,8}$/.test(hsn)) err('hsn-invalid', 'hsn', `HSN "${v('hsn')}" must be 4 to 8 digits.`);
  else if (hsn.length % 2 === 1) warn('hsn-odd', 'hsn', `HSN "${hsn}" has ${hsn.length} digits; HSN codes are normally 4, 6 or 8 digits.`);

  if (!v('product')) warn('product-missing', 'product', 'Product name is empty.');
  const qty = v('qty') ? parseQty(v('qty')) : null;
  if (!v('qty')) err('qty-missing', 'qty', 'Quantity is empty.');
  else if (qty === null || qty <= 0) err('qty-invalid', 'qty', `Quantity "${v('qty')}" must be a number greater than 0.`);
  if (!v('unit')) warn('unit-missing', 'unit', 'Unit is empty (for example NOS, KGS, BOX).');

  // Values
  const taxable = v('taxable') ? parseAmount(v('taxable')) : null;
  if (!v('taxable')) err('taxable-missing', 'taxable', 'Taxable value is empty.');
  else if (taxable === null || taxable <= 0) err('taxable-invalid', 'taxable', `Taxable value "${v('taxable')}" must be an amount greater than 0.`);

  const cgst = taxPaise(r.cgstAmt, r.cgstRate, taxable);
  const sgst = taxPaise(r.sgstAmt, r.sgstRate, taxable);
  const igst = taxPaise(r.igstAmt, r.igstRate, taxable);
  if (cgst === null) err('cgst-invalid', 'cgstAmt', 'CGST rate or amount is not a valid number.');
  if (sgst === null) err('sgst-invalid', 'sgstAmt', 'SGST rate or amount is not a valid number.');
  if (igst === null) err('igst-invalid', 'igstAmt', 'IGST rate or amount is not a valid number.');
  if (cgst !== null && sgst !== null && igst !== null) {
    if (intra === false && cgst + sgst > 0) err('tax-cgst-interstate', 'cgstAmt', 'From and To states differ (inter-state), but CGST/SGST is charged. Inter-state supplies normally carry IGST.');
    if (intra === true && igst > 0) err('tax-igst-intrastate', 'igstAmt', 'From and To states are the same (intra-state), but IGST is charged. Intra-state supplies normally carry CGST + SGST.');
    if (cgst !== sgst) err('tax-cgst-sgst', 'sgstAmt', 'CGST and SGST should be equal.');
    if (cgst + sgst + igst === 0 && docType === 'Tax Invoice') warn('tax-zero', 'igstAmt', 'No tax on a tax invoice. Fine for nil-rated or exempt goods; otherwise check the tax columns.');

    const expected = (taxable ?? 0) + cgst + sgst + igst;
    const total = v('total') ? parseAmount(v('total')) : null;
    if (!v('total')) err('total-missing', 'total', 'Total invoice value is empty.');
    else if (total === null) err('total-invalid', 'total', `Total value "${v('total')}" is not a valid amount.`);
    else if (taxable !== null && taxable > 0) {
      const diff = total - expected;
      if (diff < -TOTAL_TOLERANCE_PAISE) err('total-low', 'total', `Total ₹${(total / 100).toFixed(2)} is less than taxable value + tax (₹${(expected / 100).toFixed(2)}).`);
      else if (diff > TOTAL_TOLERANCE_PAISE) warn('total-high', 'total', `Total ₹${(total / 100).toFixed(2)} is more than taxable value + tax (₹${(expected / 100).toFixed(2)}). Fine if cess or other charges are included; otherwise check.`);
      if (total <= CONSIGNMENT_THRESHOLD_PAISE) warn('below-threshold', 'total', 'Value is ₹50,000 or less. An e-way bill may not be needed for this movement, but some cases need one regardless of value (for example inter-state job work) — check the rules.');
    }
  }

  // Transport
  const rawMode = v('mode');
  const mode = rawMode ? MODES[key(rawMode)] : undefined;
  if (rawMode && !mode) err('mode-invalid', 'mode', `Transport mode "${rawMode}" should be Road, Rail, Air or Ship.`);

  const dist = v('distance').replace(/,/g, '');
  if (!dist) err('distance-missing', 'distance', `Distance is empty. Enter the approximate distance (1–${MAX_DISTANCE_KM.toLocaleString('en-IN')} km).`);
  else if (!/^\d+$/.test(dist) || +dist < 1 || +dist > MAX_DISTANCE_KM) err('distance-range', 'distance', `Distance "${v('distance')}" must be a whole number from 1 to ${MAX_DISTANCE_KM.toLocaleString('en-IN')} km.`);
  else if (v('fromPin') && v('fromPin') === v('toPin') && +dist > SAME_PIN_MAX_KM) warn('distance-same-pin', 'distance', `From and To PIN are the same; the portal allows at most ${SAME_PIN_MAX_KM} km in that case.`);

  const vehicle = normaliseVehicle(v('vehicleNo'));
  const tid = v('transporterId').replace(/\s+/g, '').toUpperCase();
  if (tid) {
    if (!/^[0-9A-Z]{15}$/.test(tid)) err('transporter-invalid', 'transporterId', `Transporter ID "${v('transporterId')}" must be 15 letters/digits (GSTIN or TRANSIN).`);
    else if (!checkGstin(tid).valid) warn('transporter-check', 'transporterId', `Transporter ID ${tid} does not pass the GSTIN check-digit test. Confirm it with the transporter.`);
  }
  if (vehicle && !vehicleFormat(vehicle)) warn('vehicle-format', 'vehicleNo', `Vehicle number "${v('vehicleNo')}" has an unusual format (expected e.g. GJ01AB1234, a temporary TR… number or 22BH1234AB). Check for typos.`);
  if (vehicle && mode && mode !== 'Road') warn('vehicle-nonroad', 'vehicleNo', `Vehicle number given but the mode is ${mode}. Rail, air and ship need the transport document number and date instead.`);

  if (mode === 'Road' || !mode) {
    if (!vehicle && !tid) {
      warn('partb-missing', 'vehicleNo', 'No vehicle number or transporter ID. Without Part B the e-way bill cannot be used for movement (except the 50 km within-state movement to or from a transporter). Add the vehicle number or a transporter ID.');
    } else if (!vehicle && tid) {
      const short = /^\d+$/.test(dist) && +dist <= PART_B_EXEMPT_KM && intra === true;
      if (!short) warn('partb-later', 'vehicleNo', 'Only a transporter ID is given. The transporter must update Part B (vehicle) before the goods move.');
    }
    if (!rawMode && (vehicle || tid)) warn('mode-missing', 'mode', 'Transport mode is empty; Road is assumed when a vehicle number is given.');
  }

  const vt = key(v('vehicleType'));
  if (vt && !['regular', 'r', 'odc', 'o', 'overdimensionalcargo'].includes(vt)) warn('vehicletype-unknown', 'vehicleType', `Vehicle type "${v('vehicleType')}" should be Regular or ODC.`);

  return issues;
}

export interface BulkReport {
  rows: RowResult[];
  missingColumns: Field[];
  unknownColumns: string[];
  headers: string[];
  counts: { total: number; error: number; warning: number; ok: number; issues: number };
  /** Issues grouped by code, for the fix list. */
  groups: { code: string; level: Level; label: string; lines: number[] }[];
}

const REQUIRED: Field[] = ['supplyType', 'docType', 'docNo', 'docDate', 'fromGstin', 'fromPin', 'toGstin', 'toPin', 'hsn', 'qty', 'taxable', 'total', 'distance'];

/** Fix-list heading for an issue code (falls back to the first message). */
const GROUP_LABEL: Record<string, string> = {
  'duplicate': 'Duplicate document (same type, number and supplier GSTIN)',
  'date-old': 'Document older than 180 days',
  'date-future': 'Document date in the future',
  'fromGstin-invalid': 'Invalid From GSTIN', 'toGstin-invalid': 'Invalid To GSTIN',
  'fromState-mismatch': 'From state code differs from GSTIN', 'toState-mismatch': 'To state code differs from GSTIN',
  'fromPin-invalid': 'Invalid From PIN', 'toPin-invalid': 'Invalid To PIN',
  'hsn-invalid': 'HSN not 4–8 digits', 'hsn-missing': 'HSN missing',
  'tax-cgst-interstate': 'CGST/SGST on an inter-state movement', 'tax-igst-intrastate': 'IGST on an intra-state movement',
  'tax-cgst-sgst': 'CGST and SGST not equal', 'total-low': 'Total less than taxable value + tax', 'total-high': 'Total more than taxable value + tax',
  'below-threshold': 'Value ₹50,000 or less — check whether an e-way bill is needed',
  'distance-range': 'Distance outside 1–4,000 km', 'distance-missing': 'Distance missing',
  'partb-missing': 'Part B likely missing (no vehicle or transporter)', 'partb-later': 'Transporter must add vehicle later',
  'vehicle-format': 'Unusual vehicle number format', 'transporter-invalid': 'Transporter ID not 15 characters',
  'qty-invalid': 'Quantity not greater than 0', 'taxable-invalid': 'Taxable value not greater than 0',
};

export function checkRows(rows: BulkRow[], opts: CheckOptions): RowResult[] {
  const results: RowResult[] = rows.map((row, index) => ({ index, line: index + 2, row, issues: checkRow(row, opts), status: 'ok' }));
  // Duplicates: document type + number + supplier GSTIN.
  const seen = new Map<string, number[]>();
  rows.forEach((r, i) => {
    const dn = (r.docNo ?? '').trim().toUpperCase();
    if (!dn) return;
    const k = [DOC_TYPES[key(r.docType ?? '')] ?? key(r.docType ?? ''), dn, (r.fromGstin ?? '').replace(/\s+/g, '').toUpperCase()].join('|');
    seen.set(k, [...(seen.get(k) ?? []), i]);
  });
  for (const idx of seen.values()) {
    if (idx.length < 2) continue;
    for (const i of idx) {
      const others = idx.filter((j) => j !== i).map((j) => j + 2).join(', ');
      results[i].issues.unshift({ level: 'error', code: 'duplicate', field: 'docNo', message: `Same document type, number and From GSTIN as line ${others}. Only one e-way bill can be generated per document; if these are items of one invoice, combine them into one row.` });
    }
  }
  for (const r of results) {
    r.status = r.issues.some((x) => x.level === 'error') ? 'error' : r.issues.length ? 'warning' : 'ok';
  }
  return results;
}

export function checkBulkText(text: string, opts: CheckOptions): BulkReport {
  const t = parseTable(text, ALIASES as unknown as Record<string, string[]>);
  const rows = t.rows.filter((r) => Object.values(r).some((x) => x.trim())) as BulkRow[];
  const results = checkRows(rows, opts);
  return buildReport(results, t.headers, (t.missing as Field[]).filter((f) => REQUIRED.includes(f)), t.unknown);
}

export function buildReport(rows: RowResult[], headers: string[] = [], missingColumns: Field[] = [], unknownColumns: string[] = []): BulkReport {
  const g = new Map<string, { code: string; level: Level; label: string; lines: number[] }>();
  for (const r of rows) {
    for (const i of r.issues) {
      const e = g.get(i.code) ?? { code: i.code, level: i.level, label: GROUP_LABEL[i.code] ?? i.message, lines: [] };
      if (!e.lines.includes(r.line)) e.lines.push(r.line);
      g.set(i.code, e);
    }
  }
  const groups = [...g.values()].sort((a, b) => (a.level === b.level ? b.lines.length - a.lines.length : a.level === 'error' ? -1 : 1));
  return {
    rows,
    headers,
    missingColumns,
    unknownColumns,
    groups,
    counts: {
      total: rows.length,
      error: rows.filter((r) => r.status === 'error').length,
      warning: rows.filter((r) => r.status === 'warning').length,
      ok: rows.filter((r) => r.status === 'ok').length,
      issues: rows.reduce((a, r) => a + r.issues.length, 0),
    },
  };
}

/** Template header row in the order used by this checker. */
export const TEMPLATE_HEADERS = FIELDS.map((f) => FIELD_LABEL[f]);

export function annotatedCsv(report: BulkReport): string {
  const headers = [...FIELDS.map((f) => FIELD_LABEL[f]), 'Status', 'Errors', 'Warnings'];
  const rows = report.rows.map((r) => [
    ...FIELDS.map((f) => r.row[f] ?? ''),
    r.status.toUpperCase(),
    r.issues.filter((i) => i.level === 'error').map((i) => i.message).join(' | '),
    r.issues.filter((i) => i.level === 'warning').map((i) => i.message).join(' | '),
  ]);
  return toCsv(headers, rows);
}

/** "2026-10-16" minus n days → "DD/MM/YYYY". */
function ddmmyyyy(iso: string, minusDays: number): string {
  const d = new Date(Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10) - minusDays));
  return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`;
}

/** Sample rows with illustrative (made-up) GSTINs; some rows contain deliberate mistakes. */
export function sampleRows(generationDate: string): BulkRow[] {
  const g = (first14: string) => first14 + gstinCheckChar(first14);
  const gstins = { gj: g('24ABCDE1234F1Z'), mh: g('27PQRSX5678K1Z'), gj2: g('24LMNOP4321Q1Z'), tr: g('24TRANS0001T1Z') };
  const base: BulkRow = {
    supplyType: 'Outward', subType: 'Supply', docType: 'Tax Invoice', fromGstin: gstins.gj, fromPin: '360003', fromState: '24',
    toGstin: gstins.mh, toPin: '411037', toState: '27', hsn: '3917', product: 'uPVC pipe 110 mm', qty: '120', unit: 'PCS',
    taxable: '72960', cgstRate: '', sgstRate: '', igstRate: '18', cgstAmt: '', sgstAmt: '', igstAmt: '', total: '86092.80',
    mode: 'Road', distance: '720', transporterId: '', vehicleNo: 'GJ03AB1234', vehicleType: 'Regular',
  };
  return [
    { ...base, docNo: 'EE/26-27/0101', docDate: ddmmyyyy(generationDate, 1) },
    { ...base, docNo: 'EE/26-27/0102', docDate: ddmmyyyy(generationDate, 200), toGstin: gstins.mh.slice(0, 14) + (gstins.mh[14] === 'A' ? 'B' : 'A') },
    { ...base, docNo: 'EE/26-27/0103', docDate: ddmmyyyy(generationDate, 2), toGstin: gstins.gj2, toPin: '380015', toState: '24', distance: '220', igstRate: '18', vehicleNo: '', transporterId: '' },
    { ...base, docNo: 'EE/26-27/0102', docDate: ddmmyyyy(generationDate, 200), hsn: '39A7', qty: '0' },
    { ...base, docNo: 'EE/26-27/0104', docDate: ddmmyyyy(generationDate, 3), toGstin: 'URP', toPin: '0411037', taxable: '30000', igstRate: '', igstAmt: '5400', total: '35400', distance: '4500', vehicleNo: 'GJ 3 AB 12' },
    { ...base, docNo: 'EE/26-27/0105', docDate: ddmmyyyy(generationDate, 5), toGstin: gstins.gj2, toPin: '380015', toState: '24', igstRate: '', cgstRate: '9', sgstRate: '9', total: '86092.80', distance: '35', vehicleNo: '', transporterId: gstins.tr },
  ];
}

export function rowsToCsv(rows: BulkRow[]): string {
  return toCsv(TEMPLATE_HEADERS, rows.map((r) => FIELDS.map((f) => r[f] ?? '')));
}
