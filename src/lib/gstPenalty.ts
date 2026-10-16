// GST interest (Section 50, CGST Act) and late fee (GSTR-3B / GSTR-1) helpers.
// Pure functions, integer paise maths only. Encodes the generally stated position;
// users must verify the current notifications on the official portals.

import type { Paise } from './money';

export const LAST_VERIFIED = '16 Oct 2026';

// ---------- Dates ----------

/** Parse "YYYY-MM-DD" (the value of <input type="date">) to a UTC day number, or null. */
export function parseISODate(s: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const y = Number(m[1]), mo = Number(m[2]), d = Number(m[3]);
  if (mo < 1 || mo > 12 || d < 1 || y < 2000 || y > 2100) return null;
  const t = Date.UTC(y, mo - 1, d);
  const dt = new Date(t);
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return Math.round(t / 86_400_000);
}

/** Days of delay: later date − due date, or 0 when paid/filed on or before the due date. */
export function daysLate(dueDay: number, actualDay: number): number {
  return Math.max(0, actualDay - dueDay);
}

/** Convenience: days late between two ISO date strings, or null if either is invalid. */
export function daysLateISO(due: string, actual: string): number | null {
  const a = parseISODate(due), b = parseISODate(actual);
  if (a === null || b === null) return null;
  return daysLate(a, b);
}

export function formatISODate(s: string): string {
  const day = parseISODate(s);
  if (day === null) return s;
  return new Date(day * 86_400_000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

// ---------- Interest under Section 50 ----------

export type InterestRate = '18' | '24';

export const INTEREST_RATE_BP: Record<InterestRate, number> = { '18': 1800, '24': 2400 };

export const INTEREST_RATE_LABEL: Record<InterestRate, string> = {
  '18': '18% p.a. — tax paid late (Section 50(1))',
  '24': '24% p.a. — ITC wrongly availed and utilised (Section 50(3))',
};

/** Divide two non-negative bigints, rounding half up. */
function divRound(num: bigint, den: bigint): bigint {
  return (num * BigInt(2) + den) / (den * BigInt(2));
}

export interface InterestResult {
  days: number;
  rateBp: number;
  /** Interest rounded to the nearest paisa. */
  interestPaise: Paise;
  /** Interest rounded to the nearest rupee (still expressed in paise, a multiple of 100). */
  interestRupeePaise: Paise;
}

/**
 * Simple interest: tax × rate × days ÷ 365. BigInt is used so very large tax amounts
 * multiplied by rate and days never lose precision.
 */
export function calculateInterest(taxPaise: Paise, rateBp: number, days: number): InterestResult {
  if (taxPaise < 0 || days < 0 || rateBp < 0) throw new Error('Negative input');
  const num = BigInt(taxPaise) * BigInt(rateBp) * BigInt(days);
  const den = BigInt(10000 * 365);
  const interestPaise = Number(divRound(num, den));
  const interestRupeePaise = Number(divRound(num, den * BigInt(100))) * 100;
  return { days, rateBp, interestPaise, interestRupeePaise };
}

// ---------- Late fee (GSTR-3B / GSTR-1) ----------

export type ReturnType = 'gstr3b' | 'gstr1';
export type AatoSlab = 'upto-1.5cr' | '1.5-5cr' | 'above-5cr';

export const RETURN_LABEL: Record<ReturnType, string> = { gstr3b: 'GSTR-3B', gstr1: 'GSTR-1' };

export const SLAB_LABEL: Record<AatoSlab, string> = {
  'upto-1.5cr': 'AATO up to ₹1.5 crore',
  '1.5-5cr': 'AATO above ₹1.5 crore and up to ₹5 crore',
  'above-5cr': 'AATO above ₹5 crore',
};

/** Total late fee per day (CGST + SGST together), in paise. */
export const PER_DAY_NORMAL: Paise = 50_00; // ₹25 CGST + ₹25 SGST
export const PER_DAY_NIL: Paise = 20_00; // ₹10 CGST + ₹10 SGST

/** Maximum total late fee (CGST + SGST together), in paise. */
export interface LateFeeCaps {
  nil: Paise;
  'upto-1.5cr': Paise;
  '1.5-5cr': Paise;
  'above-5cr': Paise;
}

/** Default caps as commonly cited for periods from June 2021. Users must verify. */
export const DEFAULT_CAPS: LateFeeCaps = {
  nil: 500_00,
  'upto-1.5cr': 2_000_00,
  '1.5-5cr': 5_000_00,
  'above-5cr': 10_000_00,
};

export interface LateFeeInput {
  days: number;
  nilReturn: boolean;
  slab: AatoSlab;
  caps?: LateFeeCaps;
}

export interface LateFeeResult {
  days: number;
  perDay: Paise;
  uncapped: Paise;
  cap: Paise;
  capped: Paise;
  capApplied: boolean;
  cgst: Paise;
  sgst: Paise;
}

/** Split a total equally between CGST and SGST (any odd paisa goes to SGST). */
export function splitHalf(total: Paise): { cgst: Paise; sgst: Paise } {
  const cgst = Math.floor(total / 2);
  return { cgst, sgst: total - cgst };
}

export function calculateLateFee(input: LateFeeInput): LateFeeResult {
  const caps = input.caps ?? DEFAULT_CAPS;
  const days = Math.max(0, Math.floor(input.days));
  const perDay = input.nilReturn ? PER_DAY_NIL : PER_DAY_NORMAL;
  const uncapped = perDay * days;
  const cap = input.nilReturn ? caps.nil : caps[input.slab];
  const capped = Math.min(uncapped, cap);
  return { days, perDay, uncapped, cap, capped, capApplied: uncapped > cap, ...splitHalf(capped) };
}

export const OFFICIAL_LINKS = [
  { title: 'CBIC GST — CGST Act, Rules and notifications', url: 'https://cbic-gst.gov.in/' },
  { title: 'GST portal', url: 'https://www.gst.gov.in/' },
  { title: 'GST tutorials', url: 'https://tutorial.gst.gov.in/' },
];
