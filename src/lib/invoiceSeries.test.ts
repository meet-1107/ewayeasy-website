import { describe, expect, it } from 'vitest';
import { checkSeries, financialYearStart, fyToken, generateSeries, validateInvoiceNo } from './invoiceSeries';

describe('financial year', () => {
  it('runs April to March', () => {
    expect(financialYearStart('2026-04-01')).toBe(2026);
    expect(financialYearStart('2026-03-31')).toBe(2025);
    expect(financialYearStart('2027-01-15')).toBe(2026);
    expect(financialYearStart(new Date(2026, 9, 16))).toBe(2026);
  });
  it('formats short and long tokens', () => {
    expect(fyToken(2026, 'short')).toBe('26-27');
    expect(fyToken(2026, 'long')).toBe('2026-27');
    expect(fyToken(2099, 'short')).toBe('99-00');
    expect(fyToken(2026, 'none')).toBe('');
  });
});

describe('generateSeries', () => {
  const base = { prefix: 'INV', fy: 'short' as const, fyStartYear: 2026, separator: '/' as const, start: 1, padding: 4, count: 3 };
  it('builds a padded series with FY token', () => {
    expect(generateSeries(base)).toEqual({ numbers: ['INV/26-27/0001', 'INV/26-27/0002', 'INV/26-27/0003'], errors: [] });
  });
  it('works without prefix or FY and with hyphen', () => {
    expect(generateSeries({ ...base, prefix: '', fy: 'none', separator: '-', start: 98, padding: 0 }).numbers).toEqual(['98', '99', '100']);
  });
  it('rejects patterns longer than 16 characters', () => {
    const r = generateSeries({ ...base, prefix: 'SALES', fy: 'long', padding: 5 });
    expect(r.numbers).toEqual([]);
    expect(r.errors[0]).toMatch(/at most 16/);
  });
  it('rejects bad prefix characters and count limits', () => {
    expect(generateSeries({ ...base, prefix: 'IN V' }).errors[0]).toMatch(/prefix/);
    expect(generateSeries({ ...base, count: 501 }).errors[0]).toMatch(/500/);
    expect(generateSeries({ ...base, count: 0 }).errors.length).toBe(1);
  });
});

describe('validateInvoiceNo', () => {
  it('accepts letters, digits, - and /', () => {
    expect(validateInvoiceNo('INV/26-27/0001')).toEqual([]);
  });
  it('flags length and characters', () => {
    expect(validateInvoiceNo('ABCDEFGHIJ1234567').map((i) => i.code)).toEqual(['length']);
    expect(validateInvoiceNo('INV_01 A').map((i) => i.code)).toEqual(['chars']);
    expect(validateInvoiceNo('INV_01 A')[0].message).toMatch(/"_", space/);
  });
});

describe('checkSeries', () => {
  it('finds duplicates, gaps and out-of-order numbers', () => {
    const r = checkSeries(['INV/1', 'INV/2', 'inv/2', 'INV/5', 'INV/4', '', 'CN/1', 'CN/3']);
    expect(r.rows.length).toBe(7);
    expect(r.duplicates).toEqual([{ value: 'INV/2', lines: [2, 3] }]);
    expect(r.gaps).toEqual([
      { series: 'INV/', from: 3, to: 3 },
      { series: 'CN/', from: 2, to: 2 },
    ]);
    expect(r.outOfOrder).toEqual([5]);
  });
  it('flags invalid rows and rows without a running number', () => {
    const r = checkSeries(['INV#1', 'ABCDEFGHIJKLMNOPQ1', 'CASH']);
    expect(r.rows[0].issues.join(' ')).toMatch(/Not allowed/);
    expect(r.rows[1].issues.join(' ')).toMatch(/limit is 16/);
    expect(r.rows[2].issues.join(' ')).toMatch(/No running number/);
    expect(r.invalidCount).toBe(3);
  });
  it('reports a clean list as clean', () => {
    const r = checkSeries(['A/0001', 'A/0002', 'A/0003']);
    expect(r.invalidCount).toBe(0);
    expect(r.gaps).toEqual([]);
  });
});
