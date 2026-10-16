import { describe, expect, it } from 'vitest';
import { EINVOICE_THRESHOLD_PAISE, checkEinvoice, exceedsThreshold, type EinvoiceInput } from './einvoice';

const CRORE = 1_00_00_000_00; // ₹1 crore in paise
const base: EinvoiceInput = { aatoPaise: 6 * CRORE, entity: 'regular', supplies: { b2b: true, exports: false, b2c: false } };

describe('threshold', () => {
  it('₹5 crore exactly does not exceed the threshold', () => {
    expect(EINVOICE_THRESHOLD_PAISE).toBe(5 * CRORE);
    expect(exceedsThreshold(5 * CRORE)).toBe(false);
    expect(exceedsThreshold(5 * CRORE + 1)).toBe(true);
    const r = checkEinvoice({ ...base, aatoPaise: 5 * CRORE });
    expect(r.status).toBe('likely-not-applicable');
    expect(r.reasons.join(' ')).toMatch(/exactly ₹5 crore/);
  });
  it('one paisa over ₹5 crore with B2B supplies is likely applicable', () => {
    expect(checkEinvoice({ ...base, aatoPaise: 5 * CRORE + 1 }).status).toBe('likely-applicable');
  });
  it('below threshold is likely not applicable', () => {
    expect(checkEinvoice({ ...base, aatoPaise: 2 * CRORE }).status).toBe('likely-not-applicable');
  });
  it('exports alone are covered', () => {
    expect(checkEinvoice({ ...base, supplies: { b2b: false, exports: true, b2c: false } }).status).toBe('likely-applicable');
  });
});

describe('exempt entities', () => {
  it.each(['sez-unit', 'insurer', 'bank', 'nbfc', 'financial-institution', 'gta', 'passenger-transport', 'multiplex', 'government', 'local-authority'] as const)(
    '%s is likely not applicable even with high turnover',
    (entity) => {
      const r = checkEinvoice({ ...base, aatoPaise: 100 * CRORE, entity });
      expect(r.status).toBe('likely-not-applicable');
    },
  );
  it('SEZ unit reason distinguishes SEZ developers', () => {
    const r = checkEinvoice({ ...base, entity: 'sez-unit' });
    expect(r.reasons.join(' ')).toMatch(/not SEZ developers/);
  });
});

describe('supply types', () => {
  it('B2C only is likely not applicable even above the threshold', () => {
    const r = checkEinvoice({ ...base, aatoPaise: 50 * CRORE, supplies: { b2b: false, exports: false, b2c: true } });
    expect(r.status).toBe('likely-not-applicable');
    expect(r.reasons.join(' ')).toMatch(/B2C/);
  });
  it('B2C above ₹500 crore mentions the dynamic QR code', () => {
    const r = checkEinvoice({ ...base, aatoPaise: 600 * CRORE, supplies: { b2b: false, exports: false, b2c: true } });
    expect(r.notes.join(' ')).toMatch(/dynamic QR/);
  });
  it('no supply type selected needs review', () => {
    expect(checkEinvoice({ ...base, supplies: { b2b: false, exports: false, b2c: false } }).status).toBe('review');
  });
});

describe('notes', () => {
  it('30-day reporting note from ₹10 crore', () => {
    expect(checkEinvoice({ ...base, aatoPaise: 10 * CRORE }).notes.join(' ')).toMatch(/30 days/);
    expect(checkEinvoice({ ...base, aatoPaise: 9 * CRORE }).notes.join(' ')).not.toMatch(/30 days/);
  });
  it('mentions e-way bill Part A from IRN when applicable', () => {
    expect(checkEinvoice(base).notes.join(' ')).toMatch(/Part A/);
  });
});
