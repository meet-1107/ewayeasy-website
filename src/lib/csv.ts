// Small CSV / TSV parser for data pasted from Excel or uploaded as .csv. Runs entirely in the browser.

export interface Table {
  headers: string[];
  rows: Record<string, string>[];
}

/** Detects tab (Excel paste), semicolon or comma delimiters and handles quoted fields. */
export function parseDelimited(text: string): string[][] {
  const src = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const firstLine = src.split('\n', 1)[0] ?? '';
  const delim = firstLine.includes('\t') ? '\t' : (firstLine.split(';').length > firstLine.split(',').length ? ';' : ',');
  const out: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field === '') quoted = true;
    else if (ch === delim) { row.push(field.trim()); field = ''; }
    else if (ch === '\n') { row.push(field.trim()); out.push(row); row = []; field = ''; }
    else field += ch;
  }
  if (field !== '' || row.length) { row.push(field.trim()); out.push(row); }
  return out.filter((r) => r.some((c) => c !== ''));
}

/** Normalises a header for matching: lower-case, no spaces/punctuation ("Invoice No." → "invoiceno"). */
export function headerKey(h: string) {
  return h.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Parses text into rows keyed by canonical field names. `aliases` maps a canonical field to the
 * header spellings people commonly use (compared with headerKey).
 */
export function parseTable(text: string, aliases: Record<string, string[]>): Table & { missing: string[]; unknown: string[] } {
  const grid = parseDelimited(text);
  if (!grid.length) return { headers: [], rows: [], missing: Object.keys(aliases), unknown: [] };
  const raw = grid[0];
  const map: (string | null)[] = raw.map((h) => {
    const k = headerKey(h);
    const hit = Object.entries(aliases).find(([field, names]) => headerKey(field) === k || names.some((n) => headerKey(n) === k));
    return hit ? hit[0] : null;
  });
  const rows = grid.slice(1).map((cells) => {
    const r: Record<string, string> = {};
    map.forEach((f, i) => { if (f) r[f] = cells[i] ?? ''; });
    return r;
  });
  const found = new Set(map.filter(Boolean) as string[]);
  return {
    headers: raw,
    rows,
    missing: Object.keys(aliases).filter((f) => !found.has(f)),
    unknown: raw.filter((_, i) => !map[i]),
  };
}

/** Parses dates written as DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY or YYYY-MM-DD. Returns ISO or null. */
export function parseIndianDate(s: string): string | null {
  const t = s.trim();
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  let y: number, mo: number, d: number;
  if (m) { y = +m[1]; mo = +m[2]; d = +m[3]; }
  else {
    m = t.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
    if (!m) return null;
    d = +m[1]; mo = +m[2]; y = +m[3] < 100 ? 2000 + +m[3] : +m[3];
  }
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return dt.toISOString().slice(0, 10);
}

/** Builds a CSV string (for "Download results"). */
export function toCsv(headers: string[], rows: (string | number)[][]): string {
  const esc = (v: string | number) => {
    const s = String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers, ...rows].map((r) => r.map(esc).join(',')).join('\n');
}
