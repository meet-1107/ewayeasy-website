// PIN-to-PIN distance estimate from India Post PIN code locations (data.gov.in "All India Pincode Directory",
// Government Open Data License - India). Each PIN is the median location of its post offices.
// The e-way bill portal's own PIN-to-PIN road distance is final; this is an estimate to plan and cross-check.

export interface PinData {
  v: number;
  source: string;
  states: string[];
  districts: string[];
  /** pin -> [lat×1e4, lon×1e4, districtIndex, stateIndex] */
  pins: Record<string, [number, number, number, number]>;
}

export interface PinPlace {
  pin: string;
  lat: number;
  lon: number;
  district: string;
  state: string;
}

/**
 * Road distance in India is usually 1.1–1.35× the straight line (checked on routes such as Rajkot–Ahmedabad ≈1.08,
 * Surat–Mumbai ≈1.12, Bengaluru–Chennai ≈1.18, Delhi–Mumbai ≈1.20, Kolkata–Bhubaneswar ≈1.31).
 */
export const ROAD_FACTOR = { low: 1.1, typical: 1.2, high: 1.35 } as const;

export function validatePin(raw: string): { pin: string } | { error: string } {
  const v = (raw || '').replace(/\s+/g, '');
  if (!v) return { error: 'Enter a 6-digit PIN code.' };
  if (!/^\d{6}$/.test(v)) return { error: 'A PIN code has exactly 6 digits.' };
  if (v[0] === '0') return { error: 'Indian PIN codes do not start with 0.' };
  return { pin: v };
}

export function lookupPin(data: PinData, pin: string): PinPlace | null {
  const row = data.pins[pin];
  if (!row) return null;
  return { pin, lat: row[0] / 1e4, lon: row[1] / 1e4, district: data.districts[row[2]] ?? '', state: data.states[row[3]] ?? '' };
}

/** Great-circle distance in km. */
export function straightLineKm(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const r = Math.PI / 180;
  const dLat = (b.lat - a.lat) * r;
  const dLon = (b.lon - a.lon) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export interface DistanceEstimate {
  straight: number;
  low: number;
  typical: number;
  high: number;
  samePin: boolean;
}

export function estimateDistance(a: PinPlace, b: PinPlace): DistanceEstimate {
  const s = straightLineKm(a, b);
  const round = (x: number) => Math.max(1, Math.round(x));
  return {
    straight: Math.round(s),
    low: round(s * ROAD_FACTOR.low),
    typical: round(s * ROAD_FACTOR.typical),
    high: round(s * ROAD_FACTOR.high),
    samePin: a.pin === b.pin,
  };
}
