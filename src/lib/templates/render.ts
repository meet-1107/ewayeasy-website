// Renderer-neutral view model. Both the HTML preview (DocumentPreview) and the PDF (pdf/PdfDocument)
// are thin layers over buildView(), so they always print the same labels, values and sections.
import { stateLabel } from '@/components/tools/invoice/states';
import { computeDocument, hasTax, type DocumentTotals } from './calc';
import { currencyInfo, formatMoney, formatNumberMinor } from './currencies';
import {
  formatDocDate, INCOTERM_NAMES, isHexColour, type DocumentData, type PaperSettings, type PartyData, type SectionKey,
} from './model';
import { getPreset, type ColumnDef, type ColumnKey, type TemplatePreset } from './presets';

export type Pair = [label: string, value: string];

export interface PartyView {
  title: string;
  name: string;
  lines: string[];
}

export interface TotalRow {
  label: string;
  value: string;
  strong?: boolean;
}

export interface TableView {
  headers: string[];
  /** Relative column widths (equal when omitted). */
  widths?: number[];
  align: ('left' | 'right')[];
  rows: string[][];
}

export interface LineRowView {
  id: string;
  cells: Partial<Record<ColumnKey, string>>;
  details: string;
}

export interface PaperDims {
  widthMm: number;
  heightMm: number;
  marginMm: number;
  /** CSS @page size value, e.g. "210mm 297mm". */
  cssSize: string;
  /** react-pdf page size: named size or [w, h] in points. */
  pdfSize: 'A4' | 'A5' | 'LETTER' | 'LEGAL' | [number, number];
  pdfOrientation: 'portrait' | 'landscape';
  widthPt: number;
  heightPt: number;
  marginPt: number;
}

export interface DocumentView {
  preset: TemplatePreset;
  data: DocumentData;
  totals: DocumentTotals;
  title: string;
  accent: string;
  font: 'sans' | 'serif';
  layout: DocumentData['branding']['layout'];
  logo: string | null;
  logoWidth: number;
  seller: PartyView;
  buyer: PartyView;
  shipTo: PartyView | null;
  notify: PartyView | null;
  metaRows: Pair[];
  infoRows: Pair[];
  shippingRows: Pair[];
  transportRows: Pair[];
  taxNote: string | null;
  columns: ColumnDef[];
  rows: LineRowView[];
  totalsRows: TotalRow[];
  breakdown: TableView | null;
  words: string | null;
  bankRows: Pair[];
  textBlocks: { title: string; body: string }[];
  schedule: TableView | null;
  declaration: { title: string; body: string } | null;
  signature: { forName: string; name: string; title: string } | null;
  approval: { prepared: string; approved: string } | null;
  paper: PaperDims;
  emptyMessage: string;
}

/* ---------------- paper ---------------- */

const NAMED: Record<Exclude<PaperSettings['size'], 'Custom'>, { w: number; h: number; pdf: 'A4' | 'A5' | 'LETTER' | 'LEGAL' }> = {
  A4: { w: 210, h: 297, pdf: 'A4' },
  A5: { w: 148, h: 210, pdf: 'A5' },
  Letter: { w: 215.9, h: 279.4, pdf: 'LETTER' },
  Legal: { w: 215.9, h: 355.6, pdf: 'LEGAL' },
};
const mmToPt = (mm: number) => Math.round((mm * 72 / 25.4) * 100) / 100;
const clampMm = (s: string, fallback: number) => {
  const n = Number(String(s).replace(',', '.'));
  return Number.isFinite(n) && n > 0 ? Math.min(1200, Math.max(70, n)) : fallback;
};

export function paperDims(p: PaperSettings): PaperDims {
  let w: number, h: number;
  let pdfSize: PaperDims['pdfSize'];
  let pdfOrientation: PaperDims['pdfOrientation'] = p.orientation;
  if (p.size === 'Custom') {
    w = clampMm(p.customWmm, 210);
    h = clampMm(p.customHmm, 297);
    if ((p.orientation === 'landscape') !== (w > h)) [w, h] = [h, w];
    pdfSize = [mmToPt(w), mmToPt(h)];
    pdfOrientation = 'portrait';
  } else {
    const n = NAMED[p.size];
    w = n.w; h = n.h;
    if (p.orientation === 'landscape') [w, h] = [h, w];
    pdfSize = n.pdf;
  }
  const small = Math.min(w, h) < 160;
  const marginMm = p.margin === 'narrow' ? (small ? 6 : 8) : (small ? 9 : 12);
  return {
    widthMm: w, heightMm: h, marginMm, cssSize: `${w}mm ${h}mm`, pdfSize, pdfOrientation,
    widthPt: mmToPt(w), heightPt: mmToPt(h), marginPt: mmToPt(marginMm),
  };
}

/* ---------------- helpers ---------------- */

/** Add zero-width break opportunities after - / _ so long codes (SKU-NEEM-100) wrap in narrow columns. */
export const breakable = (s: string): string => s.replace(/([-/_])(?=\S)/g, '$1\u200B');

const fmtQty = (milli: number) => (milli / 1000).toLocaleString('en-IN', { maximumFractionDigits: 3 });
export const fmtRate = (bp: number) => `${bp / 100}%`;
const nonEmpty = (pairs: Pair[]): Pair[] => pairs.filter(([, v]) => v.trim() !== '');

export function sectionOn(data: DocumentData, preset: TemplatePreset, key: SectionKey): boolean {
  return preset.toggles.includes(key) && data.sections[key] !== false;
}

function partyView(title: string, p: PartyData, taxLabel: string, opts: { india: boolean; showUnregistered?: boolean }): PartyView {
  const lines: string[] = [];
  if (p.contact.trim()) lines.push(`Attn: ${p.contact.trim()}`);
  for (const l of p.address.split(/\r?\n/)) if (l.trim()) lines.push(l.trim());
  if (p.country.trim() && !opts.india && !p.address.toLowerCase().includes(p.country.trim().toLowerCase())) lines.push(p.country.trim());
  if (opts.india && p.stateCode) {
    const s = stateLabel(p.stateCode);
    if (s) lines.push(`State: ${s}`);
  }
  if (p.taxId.trim()) lines.push(`${taxLabel}: ${p.taxId.trim().toUpperCase()}`);
  else if (opts.showUnregistered) lines.push(`${taxLabel}: Unregistered`);
  const contact = [p.phone.trim() && `Tel: ${p.phone.trim()}`, p.email.trim()].filter(Boolean).join(' · ');
  if (contact) lines.push(contact);
  return { title, name: p.name.trim(), lines };
}

/* ---------------- main builder ---------------- */

export function buildView(data: DocumentData, totals: DocumentTotals = computeDocument(data)): DocumentView {
  const preset = getPreset(data.templateId);
  const L = preset.labels;
  const on = (k: SectionKey) => sectionOn(data, preset, k);
  const date = (iso: string) => (iso ? formatDocDate(iso, preset.dateStyle) : '');
  const cur = currencyInfo(data.meta.currency);
  const money = (m: number) => formatNumberMinor(m, cur.code);
  const gstMode = data.tax.mode === 'india-gst';
  const indiaParties = preset.india;
  const isPo = preset.kind === 'purchase-order';

  const seller = partyView(L.seller, data.seller, L.sellerTaxId, { india: indiaParties });
  const buyer = partyView(L.buyer, data.buyer, L.buyerTaxId, { india: indiaParties, showUnregistered: gstMode && !isPo });
  const shipTo = on('shipTo') && !data.shipToSame && (data.shipTo.name.trim() || data.shipTo.address.trim())
    ? partyView(L.shipTo, data.shipTo, L.buyerTaxId, { india: indiaParties }) : null;
  const notify = on('notify') && (data.notify.name.trim() || data.notify.address.trim())
    ? partyView(L.notify, data.notify, 'Tax ID', { india: false }) : null;

  const m = data.meta;
  const f = new Set(preset.metaFields);
  const metaRows = nonEmpty([
    [L.number, m.number],
    [L.issueDate, date(m.issueDate)],
    [L.dueDate, f.has('dueDate') ? date(m.dueDate) : ''],
    [L.poNumber, f.has('poNumber') ? m.poNumber : ''],
    [L.reference, f.has('reference') ? m.reference : ''],
    [L.deliveryDate === 'Delivery' ? 'Delivery date' : L.deliveryDate, f.has('deliveryDate') ? date(m.deliveryDate) : ''],
    ['Service period', f.has('servicePeriod') && (m.servicePeriodFrom || m.servicePeriodTo)
      ? `${date(m.servicePeriodFrom) || '…'} to ${date(m.servicePeriodTo) || '…'}` : ''],
    ['E-way bill no.', f.has('ewayBillNo') ? m.ewayBillNo : ''],
    ['Reverse charge', f.has('reverseCharge') && gstMode ? (m.reverseCharge === 'yes' ? 'Yes' : 'No') : ''],
  ]);

  let pos = '';
  if (f.has('placeOfSupply') && gstMode && m.placeOfSupply) {
    pos = `${stateLabel(m.placeOfSupply)} — ${totals.supply === 'inter' ? 'inter-state (IGST)' : 'intra-state (CGST + SGST/UTGST)'}`;
  }
  const incoterm = f.has('incoterm') && m.incoterm
    ? `${m.incoterm}${m.incotermPlace.trim() ? ` ${m.incotermPlace.trim()}` : ''}${m.incoterm in INCOTERM_NAMES ? ` (Incoterms® 2020 — ${INCOTERM_NAMES[m.incoterm as keyof typeof INCOTERM_NAMES]})` : ''}`
    : '';
  const infoRows = nonEmpty([
    ['Place of supply', pos],
    ['Delivery terms (Incoterm)', incoterm],
    ['Shipping method', f.has('shippingMethod') ? m.shippingMethod : ''],
    ['Partial shipment', f.has('partialShipment') ? (m.partialShipment === 'allowed' ? 'Allowed' : m.partialShipment === 'not-allowed' ? 'Not allowed' : '') : ''],
    [L.paymentTerms, f.has('paymentTerms') ? m.paymentTerms : ''],
    [L.deliveryTerms, f.has('deliveryTerms') ? m.deliveryTerms : ''],
    ['Currency', cur.code !== 'INR' || !preset.india ? `${cur.code} — ${cur.name}` : ''],
  ]);

  const SHIP_LABELS: Record<string, string> = {
    iec: 'IEC', lutArn: 'LUT / bond ARN', portLoading: 'Port of loading', portDischarge: 'Port of discharge', countryOrigin: 'Country of origin of goods',
    finalDestination: 'Final destination', vessel: 'Vessel / flight no.', blNo: 'B/L / AWB no.', grossWeight: 'Gross weight', netWeight: 'Net weight',
    packages: 'No. & kind of packages', marks: 'Marks & numbers', reasonForExport: 'Reason for export', exchangeRate: 'Exchange rate',
  };
  const shippingRows = on('shipping') || preset.kind === 'commercial-invoice'
    ? nonEmpty(preset.shippingFields.map((k): Pair => {
      const label = preset.shippingLabels[k] ?? SHIP_LABELS[k];
      let v = data.shipping[k].trim();
      if (k === 'exchangeRate' && v) v = cur.code === 'INR' ? '' : `1 ${cur.code} = ₹${v}`;
      if (k === 'lutArn' && data.tax.mode !== 'export-zero-rated') v = '';
      return [label, v];
    }))
    : [];
  const MODE: Record<string, string> = { road: 'Road', rail: 'Rail', air: 'Air', ship: 'Ship' };
  const T = data.transport;
  const transportRows = on('transport') ? nonEmpty(preset.transportFields.map((k): Pair => {
    switch (k) {
      case 'mode': return ['Mode', MODE[T.mode] ?? ''];
      case 'vehicleNo': return ['Vehicle no.', T.vehicleNo.toUpperCase()];
      case 'transporter': return ['Transporter', T.transporter];
      case 'lrNo': return ['LR / RR no.', T.lrNo];
      case 'lrDate': return ['LR date', date(T.lrDate)];
      case 'distanceKm': return ['Approx. distance', T.distanceKm ? `${T.distanceKm} km` : ''];
      default: return ['', ''];
    }
  })) : [];

  let taxNote: string | null = null;
  if (data.tax.mode === 'export-zero-rated') {
    const arn = data.shipping.lutArn.trim();
    taxNote = `Supply meant for export under bond or letter of undertaking (LUT) without payment of IGST.${arn ? ` LUT ARN: ${arn}.` : ''}`;
  } else if (data.tax.mode === 'export-igst') taxNote = 'Supply meant for export on payment of IGST.';
  else if (gstMode && m.reverseCharge === 'yes' && f.has('reverseCharge')) taxNote = 'Tax on this supply is payable by the recipient under reverse charge.';

  /* ----- line table ----- */
  const lines = totals.lines;
  const taxed = hasTax(data.tax.mode);
  const any = (pred: (i: number) => boolean) => lines.some((_, i) => pred(i));
  const item = (i: number) => data.items[lines[i].index];
  const showCol = (c: ColumnDef): boolean => {
    switch (c.key) {
      case 'discount': return any((i) => lines[i].discountBp > 0);
      case 'mrp': return any((i) => lines[i].mrp !== null);
      case 'taxRate': case 'taxAmount': return taxed && !(data.tax.mode === 'single' && !data.tax.perLine);
      case 'taxable': return taxed;
      case 'code2': return any((i) => !!item(i).code2.trim());
      case 'grade': return any((i) => !!item(i).grade.trim());
      case 'origin': return any((i) => !!item(i).origin.trim());
      case 'deliveryDate': return any((i) => !!item(i).deliveryDate.trim());
      default: return true;
    }
  };
  const taxWord = gstMode ? 'GST' : data.tax.mode === 'export-igst' ? 'IGST' : totals.taxLabel || 'Tax';
  const columns = preset.columns.filter(showCol).map((c) => {
    let label = c.key === 'taxRate' ? `${taxWord} %` : c.key === 'taxAmount' ? taxWord : c.label;
    if (c.key === 'amount' || c.key === 'unitPrice') label = `${label} (${cur.symbol.trim()})`;
    return { ...c, label };
  });
  const rows: LineRowView[] = lines.map((l, i) => {
    const it = item(i);
    const cells: Partial<Record<ColumnKey, string>> = {
      sno: String(i + 1),
      description: it.description.trim(),
      code: breakable(it.code.trim()),
      code2: breakable(it.code2.trim()),
      grade: breakable(it.grade.trim()),
      origin: it.origin.trim(),
      deliveryDate: date(it.deliveryDate),
      mrp: l.mrp !== null ? money(l.mrp) : '',
      qty: `${fmtQty(l.qtyMilli)}${it.unit.trim() ? ` ${it.unit.trim()}` : ''}`,
      unitPrice: money(l.price),
      discount: l.discountBp ? fmtRate(l.discountBp) : '—',
      taxable: money(l.taxable),
      taxRate: fmtRate(l.rateBp),
      taxAmount: money(l.tax),
      amount: money(taxed ? l.total : l.taxable),
    };
    return { id: l.id, cells, details: it.details.trim() };
  });

  /* ----- totals ----- */
  const fm = (v: number) => formatMoney(v, cur.code);
  const totalsRows: TotalRow[] = [];
  if (totals.discount > 0) {
    totalsRows.push({ label: 'Gross amount', value: fm(totals.gross) });
    totalsRows.push({ label: 'Discount', value: `− ${fm(totals.discount)}` });
  }
  totalsRows.push({ label: taxed ? 'Taxable value' : preset.kind === 'commercial-invoice' ? `Total value of goods${m.incoterm ? ` (${m.incoterm === 'CIF' || m.incoterm === 'CFR' ? 'FOB' : m.incoterm})` : ''}` : 'Subtotal', value: fm(totals.subtotal) });
  if (totals.freight) totalsRows.push({ label: 'Freight', value: fm(totals.freight) });
  if (totals.insurance) totalsRows.push({ label: 'Insurance', value: fm(totals.insurance) });
  if (totals.other) totalsRows.push({ label: data.charges.otherLabel.trim() || 'Other charges', value: fm(totals.other) });
  if (gstMode && totals.supply === 'intra') {
    totalsRows.push({ label: 'CGST', value: fm(totals.cgst) }, { label: 'SGST / UTGST', value: fm(totals.sgst) });
  } else if (gstMode || data.tax.mode === 'export-igst') {
    totalsRows.push({ label: 'IGST', value: fm(totals.igst) });
  } else if (data.tax.mode === 'export-zero-rated') {
    totalsRows.push({ label: 'IGST (export under LUT)', value: fm(0) });
  } else if (data.tax.mode === 'single') {
    const rate = !data.tax.perLine && lines[0] ? ` @ ${fmtRate(lines[0].rateBp)}` : '';
    totalsRows.push({ label: `${totals.taxLabel}${rate}`, value: fm(totals.tax) });
  }
  if (data.tax.roundOff && totals.decimals > 0) {
    totalsRows.push({ label: 'Round off', value: `${totals.roundOff < 0 ? '− ' : '+ '}${fm(Math.abs(totals.roundOff))}` });
  }
  const totalLabel = preset.kind === 'commercial-invoice' && m.incoterm
    ? `Total ${m.incoterm} value (${cur.code})`
    : `${preset.kind === 'purchase-order' ? 'PO total' : 'Total'} (${cur.code})`;
  totalsRows.push({ label: totalLabel, value: fm(totals.total), strong: true });
  if (totals.totalInr !== null) {
    totalsRows.push({ label: `Total in INR @ ₹${data.shipping.exchangeRate.trim()}`, value: formatMoney(totals.totalInr, 'INR') });
  }

  let breakdown: TableView | null = null;
  if (on('taxSummary') && (gstMode || data.tax.mode === 'export-igst') && totals.breakdown.length) {
    const intra = gstMode && totals.supply === 'intra';
    breakdown = {
      headers: ['GST rate', 'Taxable value', ...(intra ? ['CGST', 'SGST / UTGST'] : ['IGST']), 'Total tax'],
      align: ['left', 'right', 'right', 'right', ...(intra ? (['right'] as const) : [])],
      rows: [
        ...totals.breakdown.map((r) => [fmtRate(r.rateBp), money(r.taxable), ...(intra ? [money(r.cgst), money(r.sgst)] : [money(r.igst)]), money(r.tax)]),
        ['Total', money(totals.breakdown.reduce((a, r) => a + r.taxable, 0)), ...(intra ? [money(totals.cgst), money(totals.sgst)] : [money(totals.igst)]), money(totals.tax)],
      ],
    };
  }

  const b = data.bank;
  const bankRows = on('bank') ? nonEmpty([
    ['Account name', b.accountName], ['Bank', b.bankName], ['Account no.', b.accountNo],
    ['IFSC', b.ifsc.toUpperCase()], ['SWIFT / BIC', b.swift.toUpperCase()], ['IBAN', b.iban.toUpperCase()],
    ['Branch', b.branch], ['UPI ID', b.upi],
  ]) : [];

  const t = data.text;
  const textBlocks: { title: string; body: string }[] = [];
  const pushText = (k: SectionKey, title: string, body: string) => { if (on(k) && body.trim()) textBlocks.push({ title, body: body.trim() }); };
  pushText('paymentInstructions', 'Payment instructions', t.paymentInstructions);
  pushText('quality', 'Inspection & quality', t.qualityTerms);
  pushText('quality', 'Tolerance', t.tolerance);
  pushText('notes', 'Notes', t.notes);
  pushText('terms', L.terms, t.terms);

  const sched = data.schedule.filter((r) => r.date || r.qty.trim() || r.note.trim());
  const schedule = on('schedule') && sched.length
    ? { headers: ['#', 'Delivery date', 'Quantity', 'Remarks'], widths: [5, 18, 20, 57], align: ['left', 'left', 'left', 'left'] as ('left' | 'right')[], rows: sched.map((r, i) => [String(i + 1), date(r.date), r.qty.trim(), r.note.trim()]) }
    : null;

  const declaration = on('declaration') && t.declaration.trim() ? { title: L.declaration, body: t.declaration.trim() } : null;
  const signature = on('signature')
    ? { forName: data.seller.name.trim() || 'Your business', name: t.signatureName.trim(), title: t.signatureTitle.trim() || L.signature }
    : null;
  const approval = on('approval') ? { prepared: t.signatureName.trim(), approved: t.approvedBy.trim() } : null;

  return {
    preset,
    data,
    totals,
    title: m.title.trim() || preset.title,
    accent: isHexColour(data.branding.accent) ? data.branding.accent : '#174F39',
    font: data.branding.font,
    layout: data.branding.layout,
    logo: on('logo') && data.logo ? data.logo : null,
    logoWidth: data.branding.logoWidth,
    seller, buyer, shipTo, notify,
    metaRows, infoRows, shippingRows, transportRows, taxNote,
    columns, rows, totalsRows, breakdown,
    words: on('amountInWords') ? totals.words : null,
    bankRows, textBlocks, schedule, declaration, signature, approval,
    paper: paperDims(data.paper),
    emptyMessage: 'Add line items to see them here.',
  };
}

/** Light tint of the accent colour for table headers etc. */
export function tint(hex: string, amount = 0.9): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), bl = mix(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1)}`;
}

/** Download / print file name: "<number or template>-<date>.pdf". */
export function fileBaseName(data: DocumentData): string {
  const base = (data.meta.number.trim() || data.templateId).replace(/[^\w.-]+/g, '-').replace(/^-+|-+$/g, '') || data.templateId;
  return `${base}-${data.meta.issueDate || 'undated'}`;
}
