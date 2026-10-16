import { describe, expect, it } from 'vitest';
import {
  DEFAULT_CAPS, calculateInterest, calculateLateFee, daysLate, daysLateISO, parseISODate, splitHalf,
} from './gstPenalty';

describe('dates and day count', () => {
  it('parses valid ISO dates and rejects invalid ones', () => {
    expect(parseISODate('2026-10-16')).not.toBeNull();
    expect(parseISODate('2026-02-30')).toBeNull();
    expect(parseISODate('16/10/2026')).toBeNull();
    expect(parseISODate('')).toBeNull();
  });
  it('counts days after the due date', () => {
    expect(daysLateISO('2026-04-20', '2026-05-05')).toBe(15);
    expect(daysLateISO('2026-04-20', '2026-04-21')).toBe(1);
  });
  it('is zero when paid on or before the due date', () => {
    expect(daysLateISO('2026-04-20', '2026-04-20')).toBe(0);
    expect(daysLateISO('2026-04-20', '2026-04-01')).toBe(0);
    expect(daysLate(100, 90)).toBe(0);
  });
  it('handles leap years and year ends', () => {
    expect(daysLateISO('2028-02-28', '2028-03-01')).toBe(2);
    expect(daysLateISO('2026-12-20', '2027-01-20')).toBe(31);
  });
  it('returns null for invalid input', () => {
    expect(daysLateISO('2026-13-01', '2026-12-01')).toBeNull();
  });
});

describe('calculateInterest (Section 50)', () => {
  it('18% p.a. on ₹1,00,000 for 30 days', () => {
    const r = calculateInterest(1_00_000_00, 1800, 30);
    expect(r.interestPaise).toBe(1_479_45); // ₹1,479.45
    expect(r.interestRupeePaise).toBe(1_479_00); // ₹1,479
  });
  it('24% p.a. on ₹50,000 for 10 days', () => {
    const r = calculateInterest(50_000_00, 2400, 10);
    expect(r.interestPaise).toBe(328_77);
    expect(r.interestRupeePaise).toBe(329_00);
  });
  it('rounds half up to the paisa', () => {
    // 1825 paise × 18% × 5 / 365 = 4.5 paise
    expect(calculateInterest(1825, 1800, 5).interestPaise).toBe(5);
  });
  it('zero days means zero interest', () => {
    expect(calculateInterest(10_00_000_00, 1800, 0).interestPaise).toBe(0);
  });
  it('stays exact for very large amounts', () => {
    // ₹1,000 crore × 18% × 365 days = ₹180 crore exactly
    const r = calculateInterest(1000_00_00_000_00, 1800, 365);
    expect(r.interestPaise).toBe(180_00_00_000_00);
  });
});

describe('calculateLateFee', () => {
  it('₹50 per day for a normal return, split CGST/SGST', () => {
    const r = calculateLateFee({ days: 10, nilReturn: false, slab: 'upto-1.5cr' });
    expect(r.perDay).toBe(50_00);
    expect(r.uncapped).toBe(500_00);
    expect(r.capped).toBe(500_00);
    expect(r.capApplied).toBe(false);
    expect(r.cgst).toBe(250_00);
    expect(r.sgst).toBe(250_00);
  });
  it('caps at ₹2,000 for AATO up to ₹1.5 crore', () => {
    const r = calculateLateFee({ days: 60, nilReturn: false, slab: 'upto-1.5cr' });
    expect(r.uncapped).toBe(3_000_00);
    expect(r.capped).toBe(2_000_00);
    expect(r.capApplied).toBe(true);
  });
  it('caps at ₹5,000 for AATO ₹1.5–5 crore', () => {
    expect(calculateLateFee({ days: 120, nilReturn: false, slab: '1.5-5cr' }).capped).toBe(5_000_00);
    expect(calculateLateFee({ days: 99, nilReturn: false, slab: '1.5-5cr' }).capped).toBe(4_950_00);
  });
  it('caps at ₹10,000 above ₹5 crore', () => {
    expect(calculateLateFee({ days: 100, nilReturn: false, slab: 'above-5cr' }).capped).toBe(5_000_00);
    expect(calculateLateFee({ days: 365, nilReturn: false, slab: 'above-5cr' }).capped).toBe(10_000_00);
  });
  it('nil return: ₹20 per day capped at ₹500 regardless of slab', () => {
    const r = calculateLateFee({ days: 30, nilReturn: true, slab: 'above-5cr' });
    expect(r.perDay).toBe(20_00);
    expect(r.uncapped).toBe(600_00);
    expect(r.capped).toBe(500_00);
    expect(r.cgst).toBe(250_00);
  });
  it('no fee when filed on time', () => {
    expect(calculateLateFee({ days: 0, nilReturn: false, slab: 'upto-1.5cr' }).capped).toBe(0);
  });
  it('uses edited caps', () => {
    const r = calculateLateFee({ days: 60, nilReturn: false, slab: 'upto-1.5cr', caps: { ...DEFAULT_CAPS, 'upto-1.5cr': 1_000_00 } });
    expect(r.capped).toBe(1_000_00);
  });
  it('splitHalf gives the odd paisa to SGST', () => {
    expect(splitHalf(101)).toEqual({ cgst: 50, sgst: 51 });
  });
});
