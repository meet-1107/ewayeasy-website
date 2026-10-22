import { describe, expect, it } from 'vitest';
import { checkGstin } from '@/lib/gstin';
import { TEMPLATE_IDS } from './ids';
import { amountWords, computeDocument, mulDivRound, parseMinor, parseRate4, validateDocument } from './calc';
import { formatMoney } from './currencies';
import { emptyDocument, emptyLine, normaliseDocument, type DocumentData, type LineItem } from './model';
import { PRESETS, SAMPLE_DATE, SAMPLE_GSTINS } from './presets';
import { buildView, paperDims } from './render';

function doc(lines: Partial<LineItem>[], patch: (d: DocumentData) => void = () => {}): DocumentData {
  const d = emptyDocument('gst-tax-invoice');
  d.tax.mode = 'india-gst';
  d.seller.stateCode = '24';
  d.meta.placeOfSupply = '24';
  d.items = lines.map((l) => emptyLine({ description: 'Item', ...l }));
  patch(d);
  return d;
}

describe('primitives', () => {
  it('mulDivRound rounds half away from zero and stays exact for big values', () => {
    expect(mulDivRound(5, 1, 10)).toBe(1);
    expect(mulDivRound(4, 1, 10)).toBe(0);
    expect(mulDivRound(-5, 1, 10)).toBe(-1);
    expect(mulDivRound(999_999_999_999, 1800, 10000)).toBe(180_000_000_000);
  });
  it('parseMinor handles decimals per currency', () => {
    expect(parseMinor('1,23,456.78', 2)).toBe(12345678);
    expect(parseMinor('₹ 10.5', 2)).toBe(1050);
    expect(parseMinor('10.555', 2)).toBeNull();
    expect(parseMinor('1200', 0)).toBe(1200);
    expect(parseMinor('12.5', 0)).toBeNull();
    expect(parseMinor('abc', 2)).toBeNull();
  });
  it('parseRate4', () => {
    expect(parseRate4('83.5')).toBe(835000);
    expect(parseRate4('83.12345')).toBeNull();
    expect(parseRate4('0')).toBeNull();
  });
});

describe('india-gst', () => {
  it('intra-state splits CGST + SGST', () => {
    const t = computeDocument(doc([{ qty: '2', unitPrice: '500', taxRatePct: '18' }]));
    expect(t.supply).toBe('intra');
    expect(t.subtotal).toBe(100000);
    expect(t.cgst).toBe(9000);
    expect(t.sgst).toBe(9000);
    expect(t.igst).toBe(0);
    expect(t.total).toBe(118000);
  });
  it('inter-state uses IGST', () => {
    const t = computeDocument(doc([{ qty: '2', unitPrice: '500', taxRatePct: '18' }], (d) => { d.meta.placeOfSupply = '27'; }));
    expect(t.supply).toBe('inter');
    expect(t.igst).toBe(18000);
    expect(t.cgst + t.sgst).toBe(0);
  });
  it('purchase orders decide intra/inter from the supplier state', () => {
    const d = doc([{ qty: '1', unitPrice: '100', taxRatePct: '18' }], (x) => {
      x.templateId = 'gst-purchase-order';
      x.buyer.stateCode = '36'; // supplier in Telangana
      x.meta.placeOfSupply = '24';
    });
    expect(computeDocument(d).supply).toBe('inter');
  });
  it('mixed rates produce a rate-wise summary', () => {
    const t = computeDocument(doc([
      { qty: '1', unitPrice: '1000', taxRatePct: '5' },
      { qty: '1', unitPrice: '2000', taxRatePct: '18' },
      { qty: '3', unitPrice: '100', taxRatePct: '5' },
    ]));
    expect(t.breakdown.map((r) => [r.rateBp, r.taxable, r.tax])).toEqual([[500, 130000, 6500], [1800, 200000, 36000]]);
    expect(t.tax).toBe(42500);
    expect(t.total).toBe(372500);
  });
  it('per-line discounts reduce taxable value', () => {
    const t = computeDocument(doc([{ qty: '120', unitPrice: '640', discountPct: '5', taxRatePct: '18' }]));
    expect(t.gross).toBe(7680000);
    expect(t.discount).toBe(384000);
    expect(t.subtotal).toBe(7296000);
    expect(t.tax).toBe(1313280);
  });
  it('charges are taxed at the charge rate and round-off goes to the nearest rupee', () => {
    const t = computeDocument(doc([{ qty: '1', unitPrice: '99.99', taxRatePct: '18' }], (d) => {
      d.charges.freight = '10.10';
      d.charges.taxRatePct = '18';
      d.tax.roundOff = true;
    }));
    // 99.99 + 10.10 = 110.09; tax 18% → 9 + 9 on 99.99 (each 8.9991 → 9.00) and 0.909 → 0.91 each on 10.10
    expect(t.charges).toBe(1010);
    expect(t.cgst).toBe(900 + 91);
    expect(t.total % 100).toBe(0);
    expect(t.total - t.roundOff).toBe(11009 + 1982);
    expect(t.breakdown[0].taxable).toBe(11009);
  });
  it('odd paise in CGST/SGST round per half', () => {
    const t = computeDocument(doc([{ qty: '1', unitPrice: '0.25', taxRatePct: '18' }]));
    expect(t.cgst).toBe(2); // 25 × 9% = 2.25 → 2
    expect(t.sgst).toBe(2);
  });
  it('flags invalid lines and leaves them out', () => {
    const t = computeDocument(doc([{ qty: 'x', unitPrice: '10' }, { qty: '1', unitPrice: '10', taxRatePct: '101' }, { qty: '1', unitPrice: '10' }]));
    expect(t.lines.length).toBe(1);
    expect(Object.keys(t.lineErrors).length).toBe(2);
  });
});

describe('other tax modes', () => {
  it('single tax with one document rate', () => {
    const d = emptyDocument('simple-sales-invoice');
    d.meta.currency = 'USD';
    d.tax = { ...d.tax, mode: 'single', label: 'VAT', perLine: false, docRatePct: '20' };
    d.items = [emptyLine({ description: 'A', qty: '3', unitPrice: '19.99', taxRatePct: '5' })];
    const t = computeDocument(d);
    expect(t.subtotal).toBe(5997);
    expect(t.tax).toBe(1199); // 11.994 → 11.99
    expect(t.total).toBe(7196);
    expect(t.taxLabel).toBe('VAT');
    expect(formatMoney(t.total, 'USD')).toBe('$71.96');
  });
  it('no tax', () => {
    const d = emptyDocument('simple-sales-invoice');
    d.items = [emptyLine({ description: 'A', qty: '2', unitPrice: '50', taxRatePct: '18' })];
    const t = computeDocument(d);
    expect(t.tax).toBe(0);
    expect(t.total).toBe(10000);
  });
  it('export zero-rated (LUT) charges no IGST and shows the LUT note', () => {
    const d = PRESETS['export-commercial-invoice'].sample(SAMPLE_DATE);
    const t = computeDocument(d);
    expect(t.tax).toBe(0);
    expect(t.supply).toBe('inter');
    const v = buildView(d, t);
    expect(v.taxNote).toMatch(/without payment of IGST/);
    expect(v.totalsRows.some((r) => r.label.startsWith('Total in INR'))).toBe(true);
    // 840 × 7.85 + 1200 × 3.10 + 180 × 17.40 = 6594 + 3720 + 3132 = 13,446.00 USD → × 83.50
    expect(t.total).toBe(1344600);
    expect(t.totalInr).toBe(112274100);
  });
  it('export with IGST paid', () => {
    const d = PRESETS['export-commercial-invoice'].sample(SAMPLE_DATE);
    d.tax.mode = 'export-igst';
    d.items.forEach((i) => { i.taxRatePct = '18'; });
    const t = computeDocument(d);
    expect(t.igst).toBe(mulDivRound(1344600, 1800, 10000));
    expect(t.cgst).toBe(0);
  });
});

describe('currencies and words', () => {
  it('formats INR with lakh/crore grouping', () => {
    expect(formatMoney(123456789, 'INR')).toBe('₹12,34,567.89');
    expect(formatMoney(-1000, 'INR')).toBe('−₹10.00');
    expect(formatMoney(123456789, 'EUR')).toBe('€1,234,567.89');
    expect(formatMoney(120000, 'JPY')).toBe('¥120,000');
  });
  it('zero-decimal currency (JPY)', () => {
    const d = emptyDocument('international-purchase-order');
    d.meta.currency = 'JPY';
    d.tax.roundOff = true;
    d.items = [emptyLine({ description: 'A', qty: '3', unitPrice: '1999' }), emptyLine({ description: 'B', qty: '1', unitPrice: '10.5' })];
    const t = computeDocument(d);
    expect(t.lines.length).toBe(1);
    expect(t.total).toBe(5997);
    expect(t.roundOff).toBe(0);
    expect(t.words).toBe('Japanese Yen Five Thousand Nine Hundred Ninety Seven Only');
  });
  it('amount in words', () => {
    expect(amountWords(12345050, 'INR')).toBe('Rupees One Lakh Twenty Three Thousand Four Hundred Fifty and Fifty Paise Only');
    expect(amountWords(100005, 'USD')).toBe('US Dollars One Thousand and Five Cents Only');
    expect(amountWords(200000000, 'GBP')).toBe('Pounds Sterling Two Million Only');
  });
  it('large numbers stay exact', () => {
    const t = computeDocument(doc([{ qty: '1000000', unitPrice: '9999999.99', taxRatePct: '18' }]));
    expect(t.subtotal).toBe(999999999000000);
    expect(t.total).toBe(999999999000000 + 2 * 89999999910000);
    expect(t.words).toMatch(/^Rupees .* Crore .*Only$/);
  });
  it('handles 200 line items', () => {
    const lines = Array.from({ length: 200 }, (_, i) => ({ qty: String(i + 1), unitPrice: '10.01', taxRatePct: i % 2 ? '18' : '5' }));
    const t = computeDocument(doc(lines));
    expect(t.lines.length).toBe(200);
    const expected = lines.reduce((a, _, i) => a + (i + 1) * 1001, 0);
    expect(t.subtotal).toBe(expected);
    expect(t.total).toBe(t.subtotal + t.tax);
  });
});

describe('presets', () => {
  it('every template has a sample that calculates cleanly and validates', () => {
    for (const id of TEMPLATE_IDS) {
      const p = PRESETS[id];
      const d = p.sample(SAMPLE_DATE);
      expect(d.templateId).toBe(id);
      const t = computeDocument(d);
      expect(Object.keys(t.lineErrors)).toEqual([]);
      expect(t.lines.length).toBeGreaterThan(1);
      const v = validateDocument(d, t, { numberLabel: p.labels.number, sellerLabel: p.labels.seller, buyerLabel: p.labels.buyer, indiaGst: d.tax.mode === 'india-gst' });
      expect(v.fieldErrors).toEqual({});
      expect(p.taxModes).toContain(d.tax.mode);
      const view = buildView(d, t);
      expect(view.rows.length).toBe(t.lines.length);
      expect(view.title).toBe(p.title);
    }
  });
  it('sample GSTINs have valid check characters', () => {
    for (const g of Object.values(SAMPLE_GSTINS)) expect(checkGstin(g).valid).toBe(true);
  });
  it('validation catches a bad GSTIN and missing number', () => {
    const d = PRESETS['gst-tax-invoice'].sample(SAMPLE_DATE);
    d.buyer.taxId = '27AAHFK7314M1Z0';
    d.meta.number = '';
    const v = validateDocument(d, computeDocument(d), { numberLabel: 'Invoice no.', sellerLabel: 'Supplier', buyerLabel: 'Buyer', indiaGst: true });
    expect(v.fieldErrors.buyerTaxId).toMatch(/Check character/);
    expect(v.fieldErrors.number).toBeTruthy();
  });
  it('normaliseDocument survives junk and keeps known fields', () => {
    const base = PRESETS['gst-tax-invoice'].empty(SAMPLE_DATE);
    expect(normaliseDocument('x', base)).toBeNull();
    const n = normaliseDocument({ seller: { name: 'A', bogus: 1 }, items: [{ description: 'X', qty: 2 }], branding: { accent: 'red', layout: 'modern' }, logo: 'javascript:alert(1)' }, base)!;
    expect(n.seller.name).toBe('A');
    expect(n.items[0].qty).toBe('2');
    expect(n.branding.accent).toBe(base.branding.accent);
    expect(n.branding.layout).toBe('modern');
    expect(n.logo).toBe('');
  });
  it('paper sizes in points', () => {
    const p = (size: DocumentData['paper']['size'], orientation: 'portrait' | 'landscape' = 'portrait') =>
      paperDims({ size, orientation, customWmm: '100', customHmm: '150', margin: 'normal' });
    expect([p('A4').widthPt, p('A4').heightPt]).toEqual([595.28, 841.89]);
    expect([p('A5').widthPt, p('A5').heightPt]).toEqual([419.53, 595.28]);
    expect([p('Letter').widthPt, p('Letter').heightPt]).toEqual([612, 792]);
    expect([p('Legal').widthPt, p('Legal').heightPt]).toEqual([612, 1008]);
    expect(p('A4', 'landscape').cssSize).toBe('297mm 210mm');
    expect(p('Custom', 'landscape').pdfSize).toEqual([425.2, 283.46]);
  });
});
