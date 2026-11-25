import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { estimateDistance, lookupPin, validatePin, type PinData } from './pinDistance';

const data = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'pincodes.json'), 'utf8')) as PinData;

describe('PIN data file', () => {
  it('covers almost all PIN codes and stays small', () => {
    expect(Object.keys(data.pins).length).toBeGreaterThan(19000);
    expect(fs.statSync(path.join(process.cwd(), 'public', 'data', 'pincodes.json')).size).toBeLessThan(800 * 1024);
  });
});

describe('PIN distance estimate', () => {
  it('validates PIN format', () => {
    expect(validatePin('360 001')).toEqual({ pin: '360001' });
    expect(validatePin('36000')).toHaveProperty('error');
    expect(validatePin('012345')).toHaveProperty('error');
  });

  it('finds places with district and state', () => {
    const r = lookupPin(data, '360001')!;
    expect(r.district).toBe('Rajkot');
    expect(r.state).toBe('Gujarat');
  });

  // Known road distances (approximate) should fall inside the estimated range.
  it.each([
    ['360001', '380001', 215], // Rajkot – Ahmedabad
    ['395003', '400001', 280], // Surat – Mumbai
    ['560001', '600001', 345], // Bengaluru – Chennai
    ['110001', '400001', 1400], // Delhi – Mumbai
    ['700001', '751001', 440], // Kolkata – Bhubaneswar
  ])('%s → %s road ≈ %i km is within the range', (a, b, road) => {
    const e = estimateDistance(lookupPin(data, a)!, lookupPin(data, b)!);
    expect(road).toBeGreaterThanOrEqual(e.low * 0.97);
    expect(road).toBeLessThanOrEqual(e.high * 1.03);
  });
});
