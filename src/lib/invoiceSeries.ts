// Invoice number series helpers. Rule 46(b) of the CGST Rules, as commonly understood: a consecutive
// serial number of at most 16 characters, using letters, digits, hyphen "-" and slash "/", unique
// for a financial year (April–March). Everything runs in the browser.

export const MAX_INVOICE_NO_LENGTH = 16;
export const MAX_SERIES_COUNT = 500;
const ALLOWED = /^[A-Za-z0-9/-]*$/;

export type FyStyle = 'none' | 'short' | 'long';
export type Separator = '/' | '-' | '';

/** Starting calendar year of the Indian financial year that contains the date (April–March). */
export function financialYearStart(date: Date | string): number {
  let y: number, m: number;
  if (typeof date === 'string') {
    const match = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) throw new RangeError('Expected an ISO date (YYYY-MM-DD)');
    y = +match[1]; m = +match[2] - 1;
  } else {
    y = date.getFullYear(); m = date.getMonth();
  }
  return m >= 3 ? y : y - 1;
}

/** "26-27" (short) or "2026-27" (long) for the financial year starting in `startYear`. */
export function fyToken(startYear: number, style: FyStyle): string {
  if (style === 'none') return '';
  const next = String((startYear + 1) % 100).padStart(2, '0');
  return style === 'short' ? `${String(startYear % 100).padStart(2, '0')}-${next}` : `${startYear}-${next}`;
}

export interface InvoiceNoIssue {
  code: 'empty' | 'length' | 'chars';
  message: string;
}

/** Checks one invoice number against the length and character rules. */
export function validateInvoiceNo(value: string): InvoiceNoIssue[] {
  const issues: InvoiceNoIssue[] = [];
  if (!value) {
    issues.push({ code: 'empty', message: 'Invoice number is empty.' });
    return issues;
  }
  if (value.length > MAX_INVOICE_NO_LENGTH) {
    issues.push({ code: 'length', message: `${value.length} characters; the limit is ${MAX_INVOICE_NO_LENGTH}.` });
  }
  if (!ALLOWED.test(value)) {
    const bad = [...new Set(value.replace(/[A-Za-z0-9/-]/g, '').split(''))]
      .map((c) => (c === ' ' ? 'space' : `"${c}"`)).join(', ');
    issues.push({ code: 'chars', message: `Not allowed: ${bad}. Use only letters, digits, "-" and "/".` });
  }
  return issues;
}

export interface SeriesOptions {
  prefix: string;
  fy: FyStyle;
  fyStartYear: number;
  separator: Separator;
  start: number;
  padding: number; // minimum digits for the running number (0 = no padding)
  count: number;
}

export function formatInvoiceNo(o: Pick<SeriesOptions, 'prefix' | 'fy' | 'fyStartYear' | 'separator' | 'padding'>, n: number): string {
  const num = String(n).padStart(Math.max(0, o.padding), '0');
  return [o.prefix.trim(), fyToken(o.fyStartYear, o.fy), num].filter(Boolean).join(o.separator);
}

export interface SeriesResult {
  numbers: string[];
  errors: string[];
}

export function generateSeries(o: SeriesOptions): SeriesResult {
  const errors: string[] = [];
  const prefix = o.prefix.trim();
  if (prefix && !ALLOWED.test(prefix)) errors.push('The prefix may contain only letters, digits, "-" and "/".');
  if (!Number.isInteger(o.start) || o.start < 0) errors.push('Start number must be a whole number (0 or more).');
  if (!Number.isInteger(o.padding) || o.padding < 0 || o.padding > 10) errors.push('Zero padding must be between 0 and 10 digits.');
  if (!Number.isInteger(o.count) || o.count < 1 || o.count > MAX_SERIES_COUNT) errors.push(`How many must be between 1 and ${MAX_SERIES_COUNT}.`);
  if (errors.length) return { numbers: [], errors };

  const numbers: string[] = [];
  for (let i = 0; i < o.count; i++) numbers.push(formatInvoiceNo({ ...o, prefix }, o.start + i));
  const longest = numbers.reduce((a, b) => (b.length > a.length ? b : a), '');
  if (longest.length > MAX_INVOICE_NO_LENGTH) {
    errors.push(
      `"${longest}" has ${longest.length} characters. Invoice numbers can have at most ${MAX_INVOICE_NO_LENGTH}; shorten the prefix, use the short FY format or reduce padding.`,
    );
    return { numbers: [], errors };
  }
  return { numbers, errors };
}

// ---- Checker for an existing list ----

export interface CheckedRow {
  line: number; // 1-based position in the pasted list
  value: string;
  series: string | null; // text before the trailing running number
  number: number | null; // trailing running number
  issues: string[];
}

export interface SeriesGap {
  series: string;
  from: number;
  to: number;
}

export interface SeriesCheck {
  rows: CheckedRow[];
  duplicates: { value: string; lines: number[] }[];
  gaps: SeriesGap[];
  outOfOrder: number[]; // line numbers
  invalidCount: number;
  tooMany: boolean;
}

export function splitRunningNumber(value: string): { series: string; number: number; digits: number } | null {
  const m = value.match(/^(.*?)(\d+)$/);
  if (!m) return null;
  const n = Number(m[2]);
  if (!Number.isSafeInteger(n)) return null;
  return { series: m[1], number: n, digits: m[2].length };
}

/**
 * Checks a pasted list: invalid characters, > 16 characters, duplicates (case-insensitive),
 * gaps in each series' running number and numbers that go backwards in list order.
 */
export function checkSeries(lines: string[], max = 5000): SeriesCheck {
  const cleaned = lines.map((l) => l.trim()).filter((l) => l !== '');
  const tooMany = cleaned.length > max;
  const list = cleaned.slice(0, max);
  const rows: CheckedRow[] = list.map((value, i) => {
    const split = splitRunningNumber(value);
    return {
      line: i + 1,
      value,
      series: split ? split.series.toUpperCase() : null,
      number: split ? split.number : null,
      issues: validateInvoiceNo(value).map((x) => x.message),
    };
  });

  // Duplicates
  const seen = new Map<string, number[]>();
  rows.forEach((r) => {
    const k = r.value.toUpperCase();
    seen.set(k, [...(seen.get(k) ?? []), r.line]);
  });
  const duplicates = [...seen.values()]
    .filter((ls) => ls.length > 1)
    .map((ls) => ({ value: rows[ls[0] - 1].value, lines: ls }));
  duplicates.forEach((d) => d.lines.forEach((ln, idx) => {
    rows[ln - 1].issues.push(idx === 0 ? `Repeated on line ${d.lines.slice(1).join(', ')}.` : `Duplicate of line ${d.lines[0]}.`);
  }));

  // Per-series ordering and gaps
  const bySeries = new Map<string, CheckedRow[]>();
  rows.forEach((r) => {
    if (r.series === null) {
      r.issues.push('No running number at the end, so it cannot be checked for gaps.');
      return;
    }
    bySeries.set(r.series, [...(bySeries.get(r.series) ?? []), r]);
  });
  const outOfOrder: number[] = [];
  const gaps: SeriesGap[] = [];
  for (const [series, rs] of bySeries) {
    let prev: CheckedRow | null = null;
    for (const r of rs) {
      if (prev && r.number! < prev.number!) {
        outOfOrder.push(r.line);
        r.issues.push(`Out of order: comes after ${prev.value} (line ${prev.line}).`);
      }
      if (!prev || r.number! > prev.number!) prev = r;
    }
    const nums = [...new Set(rs.map((r) => r.number!))].sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
      if (nums[i] - nums[i - 1] > 1) gaps.push({ series, from: nums[i - 1] + 1, to: nums[i] - 1 });
    }
  }
  outOfOrder.sort((a, b) => a - b);

  return {
    rows,
    duplicates,
    gaps,
    outOfOrder,
    invalidCount: rows.filter((r) => r.issues.length > 0).length,
    tooMany,
  };
}
