// GSTIN structure and check-digit validation (format only — not live registration status).
// Format: 2-digit state code + 10-char PAN + entity number (1-9, A-Z) + 'Z' (default) + check character.
import { GST_STATES } from '@/components/tools/invoice/states';

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const GSTIN_PATTERN = /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z][A-Z][0-9A-Z]$/;

/** Check character for the first 14 characters (GSTN mod-36 algorithm). */
export function gstinCheckChar(first14: string): string {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const v = CHARS.indexOf(first14[i]);
    const p = v * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(p / 36) + (p % 36);
  }
  return CHARS[(36 - (sum % 36)) % 36];
}

const PAN_ENTITY: Record<string, string> = {
  P: 'Individual', C: 'Company', H: 'Hindu Undivided Family (HUF)', F: 'Firm / LLP', A: 'Association of Persons (AOP)',
  T: 'Trust', B: 'Body of Individuals (BOI)', L: 'Local authority', J: 'Artificial juridical person', G: 'Government',
};

export interface GstinCheck {
  input: string;
  gstin: string;
  valid: boolean;
  errors: string[];
  stateCode?: string;
  stateName?: string;
  pan?: string;
  panHolderType?: string;
  entityNumber?: string;
  expectedCheck?: string;
}

export function checkGstin(raw: string): GstinCheck {
  const gstin = raw.replace(/\s+/g, '').toUpperCase();
  const errors: string[] = [];
  const res: GstinCheck = { input: raw, gstin, valid: false, errors };
  if (!gstin) { errors.push('Enter a GSTIN.'); return res; }
  if (gstin.length !== 15) { errors.push(`A GSTIN has 15 characters; this has ${gstin.length}.`); return res; }
  if (!/^[0-9A-Z]+$/.test(gstin)) { errors.push('Only letters A–Z and digits 0–9 are allowed.'); return res; }

  const sc = gstin.slice(0, 2);
  const state = GST_STATES.find((s) => s.code === sc);
  res.stateCode = sc;
  if (!state) errors.push(`"${sc}" is not a valid GST state code.`);
  else res.stateName = state.name;

  const pan = gstin.slice(2, 12);
  res.pan = pan;
  if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan)) errors.push('Characters 3–12 must be a PAN (5 letters, 4 digits, 1 letter).');
  else res.panHolderType = PAN_ENTITY[pan[3]] ?? 'Other';

  res.entityNumber = gstin[12];
  if (!/[1-9A-Z]/.test(gstin[12])) errors.push('Character 13 (entity number) must be 1–9 or A–Z.');
  if (gstin[13] !== 'Z') errors.push('Character 14 is normally "Z" for regular registrations.');

  if (GSTIN_PATTERN.test(gstin)) {
    res.expectedCheck = gstinCheckChar(gstin.slice(0, 14));
    if (res.expectedCheck !== gstin[14]) errors.push(`Check character should be "${res.expectedCheck}", not "${gstin[14]}". There is likely a typo.`);
  }
  res.valid = errors.length === 0;
  return res;
}
