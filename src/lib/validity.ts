// E-way bill validity maths (Rule 138(10)). Pure functions; all date-times are treated as
// wall-clock Indian time and handled via UTC arithmetic so the user's device timezone never
// shifts the result.

export type Cargo = 'normal' | 'odc';

export const MIN_DISTANCE_KM = 1;
export const MAX_DISTANCE_KM = 4000;
export const KM_PER_DAY: Record<Cargo, number> = { normal: 200, odc: 20 };
export const EXTENSION_WINDOW_HOURS = 8;
export const DISTANCE_ALLOWANCE_PCT = 10;
export const SAME_PIN_MAX_KM = 100;

export interface LocalDateTime {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export function validateDistance(input: string | number): { km: number } | { error: string } {
  const s = String(input).replace(/,/g, '').trim();
  if (!s) return { error: 'Enter the distance in km.' };
  if (!/^\d+$/.test(s)) return { error: 'Enter a whole number of kilometres.' };
  const km = Number(s);
  if (km < MIN_DISTANCE_KM) return { error: `Distance must be at least ${MIN_DISTANCE_KM} km.` };
  if (km > MAX_DISTANCE_KM) return { error: `The e-way bill system accepts a maximum of ${MAX_DISTANCE_KM.toLocaleString('en-IN')} km.` };
  return { km };
}

/** Validity in days: 1 day per 200 km (normal) or per 20 km (ODC), or part thereof. */
export function validityDays(km: number, cargo: Cargo): number {
  if (!Number.isFinite(km) || km < MIN_DISTANCE_KM) throw new RangeError('distance must be >= 1 km');
  return Math.ceil(km / KM_PER_DAY[cargo]);
}

/** Parse the value of an <input type="datetime-local"> ("YYYY-MM-DDTHH:mm[:ss]"). */
export function parseLocalDateTime(value: string): LocalDateTime | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim());
  if (!m) return null;
  const [year, month, day, hour, minute, second] = [m[1], m[2], m[3], m[4], m[5], m[6] ?? '0'].map(Number);
  const t = Date.UTC(year, month - 1, day, hour, minute, second);
  const back = fromMs(t);
  if (back.year !== year || back.month !== month || back.day !== day || hour > 23 || minute > 59 || second > 59) return null;
  return back;
}

function toMs(d: LocalDateTime): number {
  return Date.UTC(d.year, d.month - 1, d.day, d.hour, d.minute, d.second);
}
function fromMs(ms: number): LocalDateTime {
  const d = new Date(ms);
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour: d.getUTCHours(),
    minute: d.getUTCMinutes(),
    second: d.getUTCSeconds(),
  };
}

export interface ValidityResult {
  days: number;
  cargo: Cargo;
  km: number;
  generatedAt: LocalDateTime;
  expiresAt: LocalDateTime;
  extensionFrom: LocalDateTime;
  extensionTo: LocalDateTime;
}

/**
 * The first day ends at midnight of the day following generation, and each further day adds
 * 24 hours, so expiry = 23:59:59 on (generation date + days).
 */
export function computeValidity(generatedAt: LocalDateTime, km: number, cargo: Cargo): ValidityResult {
  const days = validityDays(km, cargo);
  const expiryMs = Date.UTC(generatedAt.year, generatedAt.month - 1, generatedAt.day + days, 23, 59, 59);
  const hour = 3600_000;
  return {
    days,
    cargo,
    km,
    generatedAt,
    expiresAt: fromMs(expiryMs),
    extensionFrom: fromMs(expiryMs - EXTENSION_WINDOW_HOURS * hour),
    extensionTo: fromMs(expiryMs + EXTENSION_WINDOW_HOURS * hour),
  };
}

/** Maximum distance that can be entered when the portal's PIN-to-PIN distance is `pinKm` (up to 10% more). */
export function maxPermissibleDistance(pinKm: number): number {
  if (!Number.isFinite(pinKm) || pinKm < 0) throw new RangeError('distance must be >= 0');
  return Math.min(MAX_DISTANCE_KM, Math.floor((pinKm * (100 + DISTANCE_ALLOWANCE_PCT)) / 100));
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n: number) => String(n).padStart(2, '0');

/** e.g. "15 Oct 2026, 11:59:59 PM" */
export function formatLocalDateTime(d: LocalDateTime, withSeconds = true): string {
  const h12 = d.hour % 12 === 0 ? 12 : d.hour % 12;
  const ampm = d.hour < 12 ? 'AM' : 'PM';
  const time = `${h12}:${pad(d.minute)}${withSeconds ? `:${pad(d.second)}` : ''} ${ampm}`;
  return `${d.day} ${MONTHS[d.month - 1]} ${d.year}, ${time}`;
}

/** Value suitable for <input type="datetime-local"> from a JS Date in the browser's local time. */
export function toDateTimeLocalValue(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
