import { describe, expect, it } from 'vitest';
import { gstinCheckChar } from './gstin';
import {
  annotatedCsv, checkBulkText, checkRow, checkRows, daysBetween, rowsToCsv, sampleRows, vehicleFormat, type BulkRow,
} from './ewbBulk';

const g = (first14: string) => first14 + gstinCheckChar(first14);
const GJ = g('24ABCDE1234F1Z');
const MH = g('27PQRSX5678K1Z');
const GJ2 = g('24LMNOP4321Q1Z');
const GEN = '2026-10-16';

const good: BulkRow = {
  supplyType: 'Outward', subType: 'Supply', docType: 'Tax Invoice', docNo: 'EE/26-27/0001', docDate: '15/10/2026',
  fromGstin: GJ, fromPin: '360003', fromState: '24', toGstin: MH, toPin: '411037', toState: '27',
  hsn: '3917', product: 'Pipe', qty: '10', unit: 'PCS', taxable: '100000', igstRate: '18', total: '118000',
  mode: 'Road', distance: '720', vehicleNo: 'GJ03AB1234', vehicleType: 'Regular',
};
const codes = (r: BulkRow) => checkRow(r, { generationDate: GEN }).map((i) => i.code);

describe('checkRow', () => {
  it('passes a clean inter-state row', () => {
    expect(checkRow(good, { generationDate: GEN })).toEqual([]);
  });
  it('flags bad GSTIN check digit and allows URP recipient', () => {
    expect(codes({ ...good, toGstin: MH.slice(0, 14) + (MH[14] === 'A' ? 'B' : 'A') })).toContain('toGstin-invalid');
    expect(codes({ ...good, toGstin: 'URP' })).not.toContain('toGstin-invalid');
    expect(codes({ ...good, fromGstin: 'URP' })).toContain('fromGstin-urp');
    expect(codes({ ...good, fromGstin: 'URP', supplyType: 'Inward' })).not.toContain('fromGstin-urp');
  });
  it('warns when state code does not match GSTIN', () => {
    expect(codes({ ...good, fromState: '27', toState: '27', igstRate: '', cgstRate: '9', sgstRate: '9' })).toContain('fromState-mismatch');
  });
  it('validates PIN', () => {
    expect(codes({ ...good, toPin: '041103' })).toContain('toPin-invalid');
    expect(codes({ ...good, toPin: '41103' })).toContain('toPin-invalid');
  });
  it('enforces document date rules including the 180-day limit', () => {
    expect(codes({ ...good, docDate: '17/10/2026' })).toContain('date-future');
    expect(codes({ ...good, docDate: '31/02/2026' })).toContain('date-invalid');
    expect(daysBetween('2026-04-19', GEN)).toBe(180);
    expect(codes({ ...good, docDate: '19/04/2026' })).not.toContain('date-old');
    expect(codes({ ...good, docDate: '18/04/2026' })).toContain('date-old');
  });
  it('checks HSN, qty and taxable', () => {
    expect(codes({ ...good, hsn: '39' })).toContain('hsn-invalid');
    expect(codes({ ...good, hsn: '39A7' })).toContain('hsn-invalid');
    expect(codes({ ...good, hsn: '39171' })).toContain('hsn-odd');
    expect(codes({ ...good, qty: '0' })).toContain('qty-invalid');
    expect(codes({ ...good, taxable: '0', total: '0' })).toContain('taxable-invalid');
  });
  it('checks IGST vs CGST/SGST by state', () => {
    expect(codes({ ...good, igstRate: '', cgstRate: '9', sgstRate: '9' })).toContain('tax-cgst-interstate');
    const intra = { ...good, toGstin: GJ2, toState: '24', toPin: '380015' };
    expect(codes(intra)).toContain('tax-igst-intrastate');
    expect(codes({ ...intra, igstRate: '', cgstRate: '9', sgstRate: '9' })).toEqual([]);
    expect(codes({ ...intra, igstRate: '', cgstAmt: '9000', sgstAmt: '8000', total: '117000' })).toContain('tax-cgst-sgst');
  });
  it('checks total within ±₹1', () => {
    expect(codes({ ...good, total: '118000.90' })).toEqual([]);
    expect(codes({ ...good, total: '117998' })).toContain('total-low');
    expect(codes({ ...good, total: '118500' })).toContain('total-high');
  });
  it('warns at or below ₹50,000', () => {
    expect(codes({ ...good, taxable: '42372.88', total: '50000' })).toContain('below-threshold');
    expect(codes({ ...good, taxable: '42373', total: '50000.14' })).not.toContain('below-threshold');
  });
  it('checks distance 1–4000 and same PIN', () => {
    expect(codes({ ...good, distance: '0' })).toContain('distance-range');
    expect(codes({ ...good, distance: '4001' })).toContain('distance-range');
    expect(codes({ ...good, distance: '4000' })).not.toContain('distance-range');
    expect(codes({ ...good, toPin: '360003', distance: '150' })).toContain('distance-same-pin');
  });
  it('handles Part B, vehicle and transporter checks', () => {
    expect(codes({ ...good, vehicleNo: '' })).toContain('partb-missing');
    expect(codes({ ...good, vehicleNo: '', transporterId: GJ2 })).toContain('partb-later');
    const short = { ...good, toGstin: GJ2, toState: '24', toPin: '380015', igstRate: '', cgstRate: '9', sgstRate: '9', distance: '40', vehicleNo: '', transporterId: GJ2 };
    expect(codes(short)).toEqual([]);
    expect(codes({ ...good, transporterId: 'ABC' })).toContain('transporter-invalid');
    expect(codes({ ...good, vehicleNo: 'GJ 3 AB 12' })).toContain('vehicle-format');
    expect(codes({ ...good, mode: 'Truck' })).toContain('mode-invalid');
  });
  it('recognises vehicle number formats', () => {
    expect(vehicleFormat('GJ01AB1234')).toBe('regular');
    expect(vehicleFormat('gj-01-ab-1234')).toBe('regular');
    expect(vehicleFormat('DL1CA1234')).toBe('regular');
    expect(vehicleFormat('22BH1234AB')).toBe('bharat');
    expect(vehicleFormat('TR0326AB1234')).toBe('temporary');
    expect(vehicleFormat('XYZ')).toBeNull();
  });
});

describe('checkRows / checkBulkText', () => {
  it('flags duplicates of doc type + number + supplier', () => {
    const res = checkRows([good, { ...good }, { ...good, docType: 'Delivery Challan' }], { generationDate: GEN });
    expect(res[0].issues[0].code).toBe('duplicate');
    expect(res[1].status).toBe('error');
    expect(res[2].issues.map((i) => i.code)).not.toContain('duplicate');
  });
  it('round-trips the template CSV and reports missing columns', () => {
    const rep = checkBulkText(rowsToCsv([good]), { generationDate: GEN });
    expect(rep.counts).toMatchObject({ total: 1, ok: 1, error: 0 });
    expect(rep.missingColumns).toEqual([]);
    const partial = checkBulkText('Doc No\tDoc Date\nA1\t01/10/2026', { generationDate: GEN });
    expect(partial.missingColumns).toContain('fromGstin');
  });
  it('sample data has a mix of OK, warning and error rows and an annotated CSV', () => {
    const rep = checkBulkText(rowsToCsv(sampleRows(GEN)), { generationDate: GEN });
    expect(rep.counts.total).toBe(6);
    expect(rep.counts.ok).toBeGreaterThan(0);
    expect(rep.counts.error).toBeGreaterThan(0);
    expect(rep.groups.find((x) => x.code === 'duplicate')?.lines.length).toBe(2);
    const csv = annotatedCsv(rep);
    expect(csv.split('\n')[0]).toMatch(/Status,Errors,Warnings$/);
    expect(csv).toMatch(/ERROR/);
  });
});
