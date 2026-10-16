import { describe, expect, it } from 'vitest';
import { checkEligibility, type EligibilityInput } from './eligibility';

const base: EligibilityInput = {
  movement: 'supply',
  scope: 'inter',
  valuePaise: 60_000_00,
  exemptGoods: 'no',
  mode: 'road',
  handicraftUnregistered: false,
  distanceKm: null,
};

describe('checkEligibility', () => {
  it('requires an EWB above ₹50,000 for an inter-state supply', () => {
    expect(checkEligibility(base).status).toBe('likely-required');
  });

  it('does not require at exactly ₹50,000 (must exceed)', () => {
    expect(checkEligibility({ ...base, valuePaise: 50_000_00 }).status).toBe('likely-not-required');
  });

  it('requires one paisa above the threshold', () => {
    expect(checkEligibility({ ...base, valuePaise: 50_000_01 }).status).toBe('likely-required');
  });

  it('inter-state job work is required regardless of value', () => {
    const r = checkEligibility({ ...base, movement: 'job-work', valuePaise: 1_000_00 });
    expect(r.status).toBe('likely-required');
    expect(r.reasons.join(' ')).toMatch(/irrespective/);
  });

  it('inter-state job work with no value entered is still required', () => {
    expect(checkEligibility({ ...base, movement: 'job-work', valuePaise: null }).status).toBe('likely-required');
  });

  it('intra-state job work follows the value test', () => {
    expect(checkEligibility({ ...base, scope: 'intra', movement: 'job-work', valuePaise: 10_000_00 }).status).toBe('likely-not-required');
  });

  it('inter-state handicraft by an unregistered person is required regardless of value', () => {
    expect(checkEligibility({ ...base, handicraftUnregistered: true, valuePaise: 5_000_00 }).status).toBe('likely-required');
  });

  it('intra-state handicraft falls back to the value test with a note', () => {
    const r = checkEligibility({ ...base, scope: 'intra', handicraftUnregistered: true, valuePaise: 5_000_00 });
    expect(r.status).toBe('likely-not-required');
    expect(r.notes.join(' ')).toMatch(/handicraft/);
  });

  it('non-motorised conveyance is not required', () => {
    expect(checkEligibility({ ...base, mode: 'non-motorised', valuePaise: 9_00_000_00 }).status).toBe('likely-not-required');
  });

  it('exempt goods are not required', () => {
    expect(checkEligibility({ ...base, exemptGoods: 'yes' }).status).toBe('likely-not-required');
  });

  it('not-sure exempt status above threshold needs review', () => {
    expect(checkEligibility({ ...base, exemptGoods: 'not-sure' }).status).toBe('review-needed');
  });

  it('not-sure exempt status for inter-state job work needs review', () => {
    expect(checkEligibility({ ...base, movement: 'job-work', exemptGoods: 'not-sure' }).status).toBe('review-needed');
  });

  it('not-sure exempt status below threshold is still likely not required', () => {
    expect(checkEligibility({ ...base, exemptGoods: 'not-sure', valuePaise: 20_000_00 }).status).toBe('likely-not-required');
  });

  it('missing value needs review', () => {
    expect(checkEligibility({ ...base, valuePaise: null }).status).toBe('review-needed');
  });

  it('intra-state results mention state thresholds without hardcoding numbers', () => {
    const r = checkEligibility({ ...base, scope: 'intra' });
    expect(r.status).toBe('likely-required');
    expect(r.notes.join(' ')).toMatch(/state/i);
  });

  it('adds the Part B 50 km note only for short intra-state road movement', () => {
    expect(checkEligibility({ ...base, scope: 'intra', distanceKm: 30 }).notes.join(' ')).toMatch(/50 km/);
    expect(checkEligibility({ ...base, scope: 'intra', distanceKm: 80 }).notes.join(' ')).not.toMatch(/50 km/);
    expect(checkEligibility({ ...base, scope: 'inter', distanceKm: 30 }).notes.join(' ')).not.toMatch(/50 km/);
  });

  it('every result carries the general rule, exceptions and a label', () => {
    const r = checkEligibility(base);
    expect(r.generalRule).toMatch(/Rule 138/);
    expect(r.exceptions.length).toBeGreaterThan(0);
    expect(r.label).toBe('Likely required');
  });
});
