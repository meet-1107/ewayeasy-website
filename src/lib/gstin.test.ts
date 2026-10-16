import { describe, expect, it } from 'vitest';
import { checkGstin, gstinCheckChar } from './gstin';
import { parseDelimited, parseIndianDate, parseTable } from './csv';

describe('GSTIN check digit', () => {
  it('accepts the sample GSTIN used in GST documentation', () => {
    expect(gstinCheckChar('27AAPFU0939F1Z')).toBe('V');
    expect(checkGstin('27AAPFU0939F1ZV').valid).toBe(true);
  });
  it('computes the mod-36 check character', () => {
    // Build a GSTIN from a sample PAN and confirm round-trip validity.
    const first14 = '27AAPFU0939F1Z';
    const g = first14 + gstinCheckChar(first14);
    expect(checkGstin(g).valid).toBe(true);
  });
  it('flags a single-character typo', () => {
    const first14 = '24ABCDE1234F1Z';
    const good = first14 + gstinCheckChar(first14);
    const bad = good.slice(0, 14) + (good[14] === 'A' ? 'B' : 'A');
    const r = checkGstin(bad);
    expect(r.valid).toBe(false);
    expect(r.errors.join(' ')).toMatch(/Check character/);
  });
  it('decodes state, PAN and holder type', () => {
    const first14 = '24AAPFU0939F1Z'; // 4th PAN letter F = firm
    const r = checkGstin((first14 + gstinCheckChar(first14)).toLowerCase());
    expect(r.stateName).toMatch(/Gujarat/);
    expect(r.pan).toBe('AAPFU0939F');
    expect(r.panHolderType).toBe('Firm / LLP');
  });
  it('rejects wrong length and bad state code', () => {
    expect(checkGstin('24ABC').valid).toBe(false);
    expect(checkGstin('99ABCDE1234F1Z5').errors.join(' ')).toMatch(/state code/);
  });
});

describe('CSV helpers', () => {
  it('parses Excel tab paste and quoted commas', () => {
    expect(parseDelimited('a\tb\n1\t2')).toEqual([['a', 'b'], ['1', '2']]);
    expect(parseDelimited('name,addr\n"ABC, Ltd","x ""y"""')).toEqual([['name', 'addr'], ['ABC, Ltd', 'x "y"']]);
  });
  it('maps header aliases', () => {
    const t = parseTable('Invoice No.,GSTIN of Recipient\nA1,24X', { docNo: ['invoice no', 'document number'], gstin: ['gstin of recipient'] });
    expect(t.rows[0]).toEqual({ docNo: 'A1', gstin: '24X' });
    expect(t.missing).toEqual([]);
  });
  it('parses Indian dates and rejects impossible ones', () => {
    expect(parseIndianDate('05/10/2026')).toBe('2026-10-05');
    expect(parseIndianDate('2026-10-05')).toBe('2026-10-05');
    expect(parseIndianDate('31/02/2026')).toBeNull();
  });
});
