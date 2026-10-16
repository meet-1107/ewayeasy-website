import { describe, expect, it } from 'vitest';
import { compareDocs, normaliseDocNo, parsePastedPair, type DocValues } from './ewbCompare';

const inv: DocValues = {
  docNo: 'EE/26-27/0012', docDate: '15/10/2026', supplierGstin: '24ABCDE1234F1Z5', recipientGstin: '27PQRSX5678K1Z2',
  fromPin: '360003', toPin: '411037', hsn: '3917', qty: '120', taxable: '72960', total: '86093', vehicleNo: 'GJ03AB1234',
};
const status = (r: ReturnType<typeof compareDocs>, f: keyof DocValues) => r.fields.find((x) => x.field === f)!.status;

describe('compareDocs', () => {
  it('matches identical values and ignores case/spacing', () => {
    const r = compareDocs(inv, { ...inv, docNo: 'ee/26-27/0012 ', recipientGstin: '27pqrsx5678k1z2', vehicleNo: 'GJ 03 AB 1234', docDate: '2026-10-15' });
    expect(r.counts.mismatch).toBe(0);
    expect(r.ok).toBe(true);
    expect(status(r, 'vehicleNo')).toBe('match');
    expect(status(r, 'docDate')).toBe('match');
  });
  it('reports a recipient GSTIN mismatch with consequence', () => {
    const r = compareDocs(inv, { ...inv, recipientGstin: '27PQRSX5678K1Z3' });
    const f = r.fields.find((x) => x.field === 'recipientGstin')!;
    expect(f.status).toBe('mismatch');
    expect(f.note).toMatch(/detained/);
    expect(f.note).toMatch(/24 hours/);
    expect(r.ok).toBe(false);
  });
  it('handles leading zeros only when asked', () => {
    expect(status(compareDocs(inv, { ...inv, docNo: 'EE/26-27/12' }), 'docNo')).toBe('mismatch');
    expect(status(compareDocs(inv, { ...inv, docNo: 'EE/26-27/12' }, { ignoreLeadingZeros: true }), 'docNo')).toBe('format');
    expect(normaliseDocNo('INV-007', true)).toBe('INV-7');
  });
  it('treats ₹1 rounding on total as format-only, but not on taxable', () => {
    expect(status(compareDocs(inv, { ...inv, total: '86092.80' }), 'total')).toBe('format');
    expect(status(compareDocs(inv, { ...inv, total: '86000' }), 'total')).toBe('mismatch');
    expect(status(compareDocs(inv, { ...inv, taxable: '72960.50' }), 'taxable')).toBe('mismatch');
  });
  it('flags HSN digit-length difference and missing vehicle', () => {
    expect(status(compareDocs(inv, { ...inv, hsn: '39172390' }), 'hsn')).toBe('format');
    expect(status(compareDocs(inv, { ...inv, hsn: '3918' }), 'hsn')).toBe('mismatch');
    const r = compareDocs(inv, { ...inv, vehicleNo: '' });
    expect(status(r, 'vehicleNo')).toBe('missing');
    expect(r.fields.find((x) => x.field === 'vehicleNo')!.note).toMatch(/Part B/);
  });
  it('compares quantities numerically', () => {
    expect(status(compareDocs(inv, { ...inv, qty: '120.000' }), 'qty')).toBe('match');
    expect(status(compareDocs(inv, { ...inv, qty: '110' }), 'qty')).toBe('mismatch');
  });
});

describe('parsePastedPair', () => {
  it('reads two positional lines', () => {
    const r = parsePastedPair('A1\t01/10/2026\nA1\t02/10/2026');
    expect('error' in r).toBe(false);
    if ('error' in r) return;
    expect(r.invoice.docNo).toBe('A1');
    expect(r.ewb.docDate).toBe('02/10/2026');
  });
  it('uses a header line when present', () => {
    const r = parsePastedPair('Vehicle No,Invoice No\nGJ01AB1234,X1\nGJ01AB1235,X1');
    if ('error' in r) throw new Error(r.error);
    expect(r.invoice.vehicleNo).toBe('GJ01AB1234');
    expect(r.ewb.docNo).toBe('X1');
  });
  it('errors with fewer than two lines', () => {
    expect('error' in parsePastedPair('A1,01/10/2026')).toBe(true);
  });
});
