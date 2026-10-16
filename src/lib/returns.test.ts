import { describe, expect, it } from 'vitest';
import { gstinCheckChar } from './gstin';
import {
  checkGstr1, classifySupply, fyMonths, normaliseInvoiceNo, parseMonth, parseMonthlyRows, reconcile1vs3b, reconcile2b, ZERO,
} from './returns';

const g = (first14: string) => first14 + gstinCheckChar(first14);
const BUYER = g('24ABCDE1234F1Z'); // Gujarat
const SUPPLIER_A = g('27AAPFU0939F1Z');
const SUPPLIER_B = g('24AAACB1234C1Z');

const opts = { supplierState: '24', period: '2026-09', b2clThreshold: 100000_00 };

function sale(over: Record<string, string> = {}): Record<string, string> {
  return {
    invoiceNo: 'INV/001', invoiceDate: '05/09/2026', gstin: '', name: 'Buyer', pos: '24', invoiceValue: '1180',
    taxable: '1000', rate: '18', igst: '0', cgst: '90', sgst: '90', cess: '0', hsn: '6907', qty: '10', uqc: 'BOX', ...over,
  };
}

describe('GSTR-1 classification', () => {
  it('classifies B2B, B2CL and B2CS', () => {
    expect(classifySupply(true, true, 500000_00, 100000_00)).toBe('B2B');
    expect(classifySupply(false, true, 150000_00, 100000_00)).toBe('B2CL');
    expect(classifySupply(false, true, 100000_00, 100000_00)).toBe('B2CS'); // not above threshold
    expect(classifySupply(false, false, 900000_00, 100000_00)).toBe('B2CS'); // intra-state
  });
  it('classifies rows and totals sections', () => {
    const r = checkGstr1([
      sale({ invoiceNo: 'A1', gstin: BUYER }),
      sale({ invoiceNo: 'A2', pos: '27', invoiceValue: '236000', taxable: '200000', igst: '36000', cgst: '0', sgst: '0' }),
      sale({ invoiceNo: 'A3', pos: '27', invoiceValue: '1180', taxable: '1000', igst: '180', cgst: '0', sgst: '0' }),
      sale({ invoiceNo: 'A4' }),
    ], opts);
    expect(r.rows.map((x) => x.section)).toEqual(['B2B', 'B2CL', 'B2CS', 'B2CS']);
    expect(r.rows.every((x) => x.status === 'ok')).toBe(true);
    const b2cs = r.sections.find((s) => s.section === 'B2CS')!;
    expect(b2cs.invoices).toBe(2);
    expect(b2cs.igst).toBe(180_00);
    expect(b2cs.cgst).toBe(90_00);
    expect(r.hsn[0].qtyMilli).toBe(40_000);
  });
  it('respects a custom B2CL threshold', () => {
    const r = checkGstr1([sale({ pos: '27', invoiceValue: '236000', taxable: '200000', igst: '36000', cgst: '0', sgst: '0' })], { ...opts, b2clThreshold: 250000_00 });
    expect(r.rows[0].section).toBe('B2CS');
  });
});

describe('GSTR-1 row checks', () => {
  it('flags duplicate invoice numbers with a different date', () => {
    const r = checkGstr1([sale({ invoiceNo: 'X1' }), sale({ invoiceNo: 'x1', invoiceDate: '06/09/2026' })], opts);
    expect(r.rows.every((x) => x.issues.some((i) => i.level === 'error' && /Duplicate/.test(i.msg)))).toBe(true);
  });
  it('allows multi-rate lines of one invoice but warns on exact repeats', () => {
    const r = checkGstr1([
      sale({ invoiceNo: 'M1' }),
      sale({ invoiceNo: 'M1', rate: '5', cgst: '25', sgst: '25' }),
      sale({ invoiceNo: 'M1' }),
    ], opts);
    expect(r.rows[0].status).toBe('ok');
    expect(r.rows[1].status).toBe('ok');
    expect(r.rows[2].issues[0].msg).toMatch(/Possible duplicate/);
  });
  it('flags CGST not equal to SGST', () => {
    const r = checkGstr1([sale({ cgst: '90', sgst: '89.50' })], opts);
    expect(r.rows[0].issues.some((i) => /CGST and SGST should be equal/.test(i.msg))).toBe(true);
    expect(r.rows[0].status).toBe('error');
  });
  it('flags wrong tax head, tax maths, invoice number and period', () => {
    const r = checkGstr1([
      sale({ pos: '27' }), // inter-state but CGST/SGST
      sale({ invoiceNo: 'B2', cgst: '80', sgst: '80' }), // 160 vs 180 expected
      sale({ invoiceNo: 'TOO-LONG-INVOICE-NO-1' }),
      sale({ invoiceNo: 'B#4' }),
      sale({ invoiceNo: 'B5', invoiceDate: '01/10/2026' }),
      sale({ invoiceNo: 'B6', gstin: '24ABCDE1234F1ZZ' }),
    ], opts);
    expect(r.rows[0].issues.map((i) => i.msg).join()).toMatch(/should carry IGST/);
    expect(r.rows[1].issues.map((i) => i.msg).join()).toMatch(/does not match/);
    expect(r.rows[2].issues.map((i) => i.msg).join()).toMatch(/limit is 16/);
    expect(r.rows[3].issues.map((i) => i.msg).join()).toMatch(/only letters/);
    expect(r.rows[4].status).toBe('warning');
    expect(r.rows[5].issues.map((i) => i.msg).join()).toMatch(/GSTIN/);
  });
  it('accepts tax within ₹1 tolerance', () => {
    const r = checkGstr1([sale({ cgst: '89.60', sgst: '89.60' })], opts);
    expect(r.rows[0].status).toBe('ok');
  });
});

describe('GSTR-1 vs GSTR-3B', () => {
  it('builds April–March months', () => {
    const m = fyMonths(2026);
    expect(m[0].key).toBe('2026-04');
    expect(m[11].key).toBe('2027-03');
    expect(parseMonth('April')).toBe(4);
    expect(parseMonth('2027-03')).toBe(3);
  });
  it('detects 3B shortfall and excess', () => {
    const g1 = { ...ZERO, taxable: 100000_00, cgst: 9000_00, sgst: 9000_00 };
    const months = [
      { g1, g3b: { ...g1, cgst: 8500_00, sgst: 8500_00 } },
      { g1, g3b: { ...g1, taxable: 110000_00, cgst: 9900_00, sgst: 9900_00 } },
      { g1, g3b: { ...g1, cgst: 9000_50, sgst: 9000_00 } },
    ];
    const r = reconcile1vs3b(months);
    expect(r.months[0].status).toBe('short');
    expect(r.months[0].taxDiff).toBe(-1000_00);
    expect(r.months[1].status).toBe('excess');
    expect(r.months[2].status).toBe('match');
    expect(r.annual.taxDiff).toBe(-1000_00 + 1800_00 + 50);
  });
  it('reads pasted monthly rows by month name', () => {
    const { data, errors } = parseMonthlyRows([{ month: 'Jun', g1Taxable: '1,000', g3bTaxable: '900' }]);
    expect(errors).toEqual([]);
    expect(data.get(2)!.g1.taxable).toBe(1000_00);
  });
});

describe('Purchase register vs GSTR-2B', () => {
  const norm = { stripLeadingZeros: true, ignoreSeparators: true };
  it('normalises invoice numbers', () => {
    expect(normaliseInvoiceNo(' inv/0012 ', norm)).toBe('INV12');
    expect(normaliseInvoiceNo('INV-0012', { stripLeadingZeros: false, ignoreSeparators: false })).toBe('INV-0012');
    expect(normaliseInvoiceNo('00045', { stripLeadingZeros: true, ignoreSeparators: false })).toBe('45');
  });
  const row = (gstin: string, no: string, taxable: string, igst: string, date = '10/09/2026') => ({ gstin, invoiceNo: no, invoiceDate: date, taxable, igst, cgst: '0', sgst: '0' });
  it('buckets matched, mismatch, possible and missing', () => {
    const books = [
      row(SUPPLIER_A, 'inv/0012', '1000', '180'),
      row(SUPPLIER_A, 'INV-20', '5000', '900'),
      row(SUPPLIER_B, 'B-1', '2000', '360'),
      row(SUPPLIER_B, 'B-9', '7000', '1260'),
    ];
    const twob = [
      row(SUPPLIER_A, 'INV12', '1000.50', '180'),
      row(SUPPLIER_A, 'INV20', '5000', '850'),
      row(SUPPLIER_B, 'B-100', '2000', '360'),
      row(SUPPLIER_A, 'INV99', '300', '54'),
    ];
    const r = reconcile2b(books, twob, { ...norm, tolerance: 100 });
    const by = (no: string) => r.rows.find((x) => x.books?.invoiceNo === no || x.twob?.invoiceNo === no)!;
    expect(by('inv/0012').status).toBe('matched');
    expect(by('INV-20').status).toBe('mismatch');
    expect(by('INV-20').diff!.igst).toBe(-50_00);
    expect(by('B-1').status).toBe('possible');
    expect(by('B-9').status).toBe('books-only');
    expect(by('INV99').status).toBe('2b-only');
    expect(r.counts).toEqual({ matched: 1, mismatch: 1, possible: 1, 'books-only': 1, '2b-only': 1 });
    const supA = r.suppliers.find((s) => s.gstin === SUPPLIER_A)!;
    expect(supA.diffTax).toBe(-50_00 + 54_00);
  });
  it('does not match when normalisation is off', () => {
    const r = reconcile2b([row(SUPPLIER_A, 'INV-012', '1000', '180')], [row(SUPPLIER_A, 'INV12', '1000', '180')], {
      stripLeadingZeros: false, ignoreSeparators: false, tolerance: 100,
    });
    expect(r.rows[0].status).toBe('possible');
  });
  it('sums multi-rate lines of the same invoice', () => {
    const r = reconcile2b(
      [row(SUPPLIER_A, 'X1', '1500', '230')],
      [row(SUPPLIER_A, 'X1', '1000', '180'), row(SUPPLIER_A, 'x1', '500', '50')],
      { ...norm, tolerance: 100 },
    );
    expect(r.rows).toHaveLength(1);
    expect(r.rows[0].status).toBe('matched');
  });
});
