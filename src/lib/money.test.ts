import { describe, expect, it } from 'vitest';
import {
  amountInWords, calculateGst, calculateInvoice, calculateLine, formatINR, parseAmount, parseQty, parseRate,
} from './money';

describe('parsing', () => {
  it('parses Indian formatted amounts to paise', () => {
    expect(parseAmount('1,23,456.78')).toBe(12345678);
    expect(parseAmount('₹ 100')).toBe(10000);
    expect(parseAmount('0.1')).toBe(10);
    expect(parseAmount('12.345')).toBeNull();
    expect(parseAmount('abc')).toBeNull();
    expect(parseAmount('')).toBeNull();
  });
  it('parses rates to basis points', () => {
    expect(parseRate('18')).toBe(1800);
    expect(parseRate('0.25')).toBe(25);
    expect(parseRate('101')).toBeNull();
    expect(parseRate('-5')).toBeNull();
  });
  it('parses quantities with 3 decimals', () => {
    expect(parseQty('2.5')).toBe(2500);
    expect(parseQty('1.2345')).toBeNull();
  });
});

describe('calculateGst', () => {
  it('adds GST on an exclusive amount (intra-state)', () => {
    const r = calculateGst(100000, 1800, 'exclusive', 'intra'); // ₹1,000 @18%
    expect(r.taxable).toBe(100000);
    expect(r.cgst).toBe(9000);
    expect(r.sgst).toBe(9000);
    expect(r.igst).toBe(0);
    expect(r.total).toBe(118000);
  });
  it('adds IGST on an exclusive amount (inter-state)', () => {
    const r = calculateGst(100000, 1800, 'exclusive', 'inter');
    expect(r.igst).toBe(18000);
    expect(r.total).toBe(118000);
  });
  it('backs GST out of an inclusive amount without drifting the total', () => {
    const r = calculateGst(118000, 1800, 'inclusive', 'inter');
    expect(r.taxable).toBe(100000);
    expect(r.igst).toBe(18000);
    expect(r.total).toBe(118000);
  });
  it('keeps taxable + tax equal to an awkward inclusive amount', () => {
    const r = calculateGst(99999, 1200, 'inclusive', 'intra'); // ₹999.99 @12%
    expect(r.taxable + r.cgst + r.sgst).toBe(99999);
    expect(r.cgst).toBe(r.sgst);
  });
  it('handles fractional rates exactly', () => {
    const r = calculateGst(1000000, 25, 'exclusive', 'inter'); // ₹10,000 @0.25%
    expect(r.igst).toBe(2500);
  });
  it('avoids classic float errors (0.1 + 0.2 style)', () => {
    const r = calculateGst(parseAmount('0.10')! + parseAmount('0.20')!, 1800, 'exclusive', 'inter');
    expect(r.taxable).toBe(30);
    expect(r.igst).toBe(5); // 5.4 paise → 5
  });
});

describe('invoice totals', () => {
  it('computes a line with percentage discount', () => {
    const l = calculateLine({ qtyMilli: 100000, rate: 12500, discountBp: 500, gstBp: 1800 }, 'intra'); // 100 × ₹125, 5% off
    expect(l.gross).toBe(1250000);
    expect(l.discount).toBe(62500);
    expect(l.taxable).toBe(1187500);
    expect(l.cgst).toBe(106875);
    expect(l.total).toBe(1187500 + 213750);
  });
  it('sums multi-rate invoice, groups tax by rate and rounds off', () => {
    const t = calculateInvoice(
      [
        { qtyMilli: 3000, rate: 33333, gstBp: 1800 },
        { qtyMilli: 2500, rate: 4000, gstBp: 500 },
      ],
      'inter',
      { roundToRupee: true, otherCharges: 5000 },
    );
    expect(t.taxable).toBe(99999 + 10000);
    expect(t.igst).toBe(18000 + 500);
    expect(t.taxByRate.map((x) => x.rateBp)).toEqual([500, 1800]);
    expect(t.total % 100).toBe(0);
    expect(t.total - t.roundOff).toBe(99999 + 10000 + 18500 + 5000);
  });
  it('never lets discount exceed the line value', () => {
    const l = calculateLine({ qtyMilli: 1000, rate: 1000, discountFlat: 5000, gstBp: 1800 }, 'inter');
    expect(l.taxable).toBe(0);
  });
});

describe('formatting', () => {
  it('formats rupees in the Indian system', () => {
    expect(formatINR(12345678)).toBe('₹1,23,456.78');
  });
  it('writes amounts in words with lakh and crore', () => {
    expect(amountInWords(12345678)).toBe('Rupees One Lakh Twenty Three Thousand Four Hundred Fifty Six and Seventy Eight Paise Only');
    expect(amountInWords(1000000000)).toBe('Rupees One Crore Only');
  });
});
