import { describe, expect, it } from 'vitest';
import {
  computeValidity, formatLocalDateTime, maxPermissibleDistance, parseLocalDateTime, validateDistance, validityDays,
} from './validity';

describe('validityDays', () => {
  it('normal cargo: 1 day per 200 km or part', () => {
    expect(validityDays(1, 'normal')).toBe(1);
    expect(validityDays(200, 'normal')).toBe(1);
    expect(validityDays(201, 'normal')).toBe(2);
    expect(validityDays(300, 'normal')).toBe(2);
    expect(validityDays(620, 'normal')).toBe(4);
    expect(validityDays(4000, 'normal')).toBe(20);
  });
  it('ODC: 1 day per 20 km or part', () => {
    expect(validityDays(20, 'odc')).toBe(1);
    expect(validityDays(21, 'odc')).toBe(2);
    expect(validityDays(95, 'odc')).toBe(5);
    expect(validityDays(200, 'odc')).toBe(10);
  });
  it('rejects zero distance', () => {
    expect(() => validityDays(0, 'normal')).toThrow();
  });
});

describe('validateDistance', () => {
  it('accepts 1 to 4000 whole km', () => {
    expect(validateDistance('1')).toEqual({ km: 1 });
    expect(validateDistance('4,000')).toEqual({ km: 4000 });
  });
  it('rejects out-of-range and non-integer values', () => {
    expect(validateDistance('0')).toHaveProperty('error');
    expect(validateDistance('4001')).toHaveProperty('error');
    expect(validateDistance('12.5')).toHaveProperty('error');
    expect(validateDistance('')).toHaveProperty('error');
  });
});

describe('computeValidity', () => {
  it('1 day generated in the morning expires at 23:59:59 the next day', () => {
    const r = computeValidity(parseLocalDateTime('2026-10-14T10:15')!, 180, 'normal');
    expect(r.days).toBe(1);
    expect(formatLocalDateTime(r.expiresAt)).toBe('15 Oct 2026, 11:59:59 PM');
  });
  it('late-night generation still expires at midnight of the next day', () => {
    const r = computeValidity(parseLocalDateTime('2026-10-14T23:40')!, 180, 'normal');
    expect(r.expiresAt).toMatchObject({ year: 2026, month: 10, day: 15, hour: 23, minute: 59, second: 59 });
  });
  it('620 km normal cargo: 4 days', () => {
    const r = computeValidity(parseLocalDateTime('2026-10-13T16:30')!, 620, 'normal');
    expect(r.expiresAt).toMatchObject({ day: 17, month: 10 });
  });
  it('ODC 95 km: 5 days', () => {
    const r = computeValidity(parseLocalDateTime('2026-10-14T09:00')!, 95, 'odc');
    expect(r.days).toBe(5);
    expect(r.expiresAt).toMatchObject({ day: 19, month: 10 });
  });
  it('crosses month and year boundaries', () => {
    const r = computeValidity(parseLocalDateTime('2026-12-30T12:00')!, 450, 'normal');
    expect(r.expiresAt).toMatchObject({ year: 2027, month: 1, day: 2 });
  });
  it('extension window is 8 hours either side of expiry', () => {
    const r = computeValidity(parseLocalDateTime('2026-10-14T10:00')!, 350, 'normal');
    expect(r.expiresAt).toMatchObject({ day: 16, hour: 23, minute: 59, second: 59 });
    expect(r.extensionFrom).toMatchObject({ day: 16, hour: 15, minute: 59, second: 59 });
    expect(r.extensionTo).toMatchObject({ day: 17, hour: 7, minute: 59, second: 59 });
  });
});

describe('parseLocalDateTime', () => {
  it('rejects invalid dates', () => {
    expect(parseLocalDateTime('2026-02-30T10:00')).toBeNull();
    expect(parseLocalDateTime('nonsense')).toBeNull();
  });
});

describe('maxPermissibleDistance', () => {
  it('allows up to 10% more than PIN-to-PIN distance', () => {
    expect(maxPermissibleDistance(100)).toBe(110);
    expect(maxPermissibleDistance(255)).toBe(280);
  });
  it('is capped at 4000 km', () => {
    expect(maxPermissibleDistance(3900)).toBe(4000);
  });
});
