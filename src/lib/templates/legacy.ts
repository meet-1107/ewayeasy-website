// Best-effort import of data saved by the older tools (/tools/invoice-generator, /tools/sales-invoice-generator,
// /tools/quotation-generator) into the template engine's DocumentData. Pure functions, no storage access.
import type { TemplateId } from './ids';
import { addDays, emptyLine, normaliseDocument, type DocumentData, type TransportMode } from './model';
import { getPreset } from './presets';

const s = (v: unknown): string => (typeof v === 'string' ? v : typeof v === 'number' && Number.isFinite(v) ? String(v) : '');
const o = (v: unknown): Record<string, unknown> => (v && typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : {});

function party(raw: unknown) {
  const p = o(raw);
  return { name: s(p.name), address: s(p.address), taxId: s(p.gstin).toUpperCase(), stateCode: s(p.stateCode) };
}

/**
 * Map a legacy InvoiceData (or QuotationData, which extends it) to a DocumentData for `templateId`.
 * Returns null if `raw` is not a plausible legacy invoice.
 */
export function fromLegacyInvoice(raw: unknown, templateId: TemplateId, today: string): DocumentData | null {
  const r = o(raw);
  if (!('items' in r) && !('seller' in r) && !('invoiceNo' in r)) return null;
  const preset = getPreset(templateId);
  const d = preset.empty(today);
  const seller = party(r.seller), buyer = party(r.buyer), shipTo = party(r.shipTo);
  d.seller = { ...d.seller, ...seller };
  d.buyer = { ...d.buyer, ...buyer };
  d.shipTo = { ...d.shipTo, ...shipTo };
  d.shipToSame = r.shipSame !== false;
  if (!d.shipToSame) d.sections.shipTo = true;
  d.meta.number = s(r.invoiceNo);
  d.meta.issueDate = s(r.invoiceDate) || today;
  d.meta.dueDate = s(r.dueDate);
  d.meta.placeOfSupply = s(r.placeOfSupply) || buyer.stateCode;
  d.meta.paymentTerms = s(r.paymentTerms);
  d.tax.roundOff = r.roundOff !== false;
  const items = Array.isArray(r.items) ? r.items.map(o) : [];
  const lines = items
    .filter((it) => s(it.description).trim() || s(it.rate).trim())
    .map((it) => emptyLine({
      description: s(it.description), code: s(it.hsn), qty: s(it.qty) || '1', unit: s(it.unit) || 'NOS',
      unitPrice: s(it.rate), discountPct: s(it.discount), taxRatePct: s(it.gst) || '0',
    }));
  // Wholesale shows SKU in `code` and HSN in `code2`.
  if (templateId === 'wholesale-invoice') lines.forEach((l) => { l.code2 = l.code; l.code = ''; });
  d.items = lines.length ? lines : d.items;
  const bank = o(r.bank);
  d.bank = { ...d.bank, accountName: s(bank.accountName), bankName: s(bank.bankName), accountNo: s(bank.accountNo), ifsc: s(bank.ifsc), branch: s(bank.branch) };
  if (typeof r.showBank === 'boolean') d.sections.bank = r.showBank;
  const t = o(r.transport);
  const mode = s(t.mode);
  d.transport = {
    ...d.transport,
    mode: (['road', 'rail', 'air', 'ship'].includes(mode) ? mode : '') as TransportMode,
    vehicleNo: s(t.vehicleNo), transporter: s(t.transporter), distanceKm: s(t.distanceKm),
  };
  if (d.transport.mode || d.transport.vehicleNo || d.transport.transporter) d.sections.transport = true;
  const extra = [
    s(r.deliveryTerms) && `Delivery: ${s(r.deliveryTerms)}`,
    s(r.warranty) && `Warranty: ${s(r.warranty)}`,
    s(r.freight) && `Freight: ${s(r.freight)}`,
  ].filter(Boolean).join('\n');
  d.text.notes = [s(r.notes), extra].filter(Boolean).join('\n');
  const decl = s(r.declaration);
  if (decl && !/quotation/i.test(decl)) d.text.declaration = decl;
  return normaliseDocument(d, preset.empty(today));
}

/** Quotation → GST tax invoice draft (new number left to the invoice series; quotation referenced in notes). */
export function quotationToTaxInvoice(q: unknown, today: string, invoiceNo = ''): DocumentData | null {
  const d = fromLegacyInvoice(q, 'gst-tax-invoice', today);
  if (!d) return null;
  const r = o(q);
  const qNo = s(r.invoiceNo);
  d.meta.number = invoiceNo;
  d.meta.issueDate = today;
  d.meta.dueDate = addDays(today, 30);
  if (qNo) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s(r.invoiceDate));
    const ref = `Against quotation ${qNo}${m ? ` dated ${m[3]}-${m[2]}-${m[1]}` : ''}.`;
    d.text.notes = [ref, d.text.notes].filter(Boolean).join('\n');
  }
  return d;
}
