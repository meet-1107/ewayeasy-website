// Currencies supported by the document templates. Amounts are always integers in the currency's
// minor unit (paise, cents, …); JPY has no minor unit. Formatting is done with Intl number grouping
// (en-IN for INR so 1,00,000 groups as lakhs/crores) plus an explicit symbol prefix, so the HTML
// preview and the PDF print exactly the same characters in every browser and in Node.

export const CURRENCY_CODES = ['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD', 'AUD', 'CAD', 'JPY', 'CNY', 'SAR'] as const;
export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export interface CurrencyInfo {
  code: CurrencyCode;
  /** Printed before the amount. Codes are used where the native symbol needs a non-Latin font. */
  symbol: string;
  decimals: 0 | 2;
  locale: string;
  name: string;
  /** Major unit name used in amount in words, e.g. "US Dollars". */
  major: string;
  /** Minor unit name used in amount in words, e.g. "Cents". */
  minor: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', decimals: 2, locale: 'en-IN', name: 'Indian Rupee', major: 'Rupees', minor: 'Paise' },
  USD: { code: 'USD', symbol: '$', decimals: 2, locale: 'en-US', name: 'US Dollar', major: 'US Dollars', minor: 'Cents' },
  EUR: { code: 'EUR', symbol: '€', decimals: 2, locale: 'en-IE', name: 'Euro', major: 'Euros', minor: 'Cents' },
  GBP: { code: 'GBP', symbol: '£', decimals: 2, locale: 'en-GB', name: 'Pound Sterling', major: 'Pounds Sterling', minor: 'Pence' },
  AED: { code: 'AED', symbol: 'AED ', decimals: 2, locale: 'en-AE', name: 'UAE Dirham', major: 'UAE Dirhams', minor: 'Fils' },
  SGD: { code: 'SGD', symbol: 'S$', decimals: 2, locale: 'en-SG', name: 'Singapore Dollar', major: 'Singapore Dollars', minor: 'Cents' },
  AUD: { code: 'AUD', symbol: 'A$', decimals: 2, locale: 'en-AU', name: 'Australian Dollar', major: 'Australian Dollars', minor: 'Cents' },
  CAD: { code: 'CAD', symbol: 'C$', decimals: 2, locale: 'en-CA', name: 'Canadian Dollar', major: 'Canadian Dollars', minor: 'Cents' },
  JPY: { code: 'JPY', symbol: '¥', decimals: 0, locale: 'en-US', name: 'Japanese Yen', major: 'Japanese Yen', minor: '' },
  CNY: { code: 'CNY', symbol: 'CN¥', decimals: 2, locale: 'en-US', name: 'Chinese Yuan', major: 'Chinese Yuan', minor: 'Fen' },
  SAR: { code: 'SAR', symbol: 'SAR ', decimals: 2, locale: 'en-US', name: 'Saudi Riyal', major: 'Saudi Riyals', minor: 'Halalas' },
};

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === 'string' && (CURRENCY_CODES as readonly string[]).includes(v);
}

export function currencyInfo(code: string): CurrencyInfo {
  return isCurrencyCode(code) ? CURRENCIES[code] : CURRENCIES.INR;
}

/** Size of one major unit in minor units (100 for INR/USD, 1 for JPY). */
export function minorPerMajor(code: string): number {
  return currencyInfo(code).decimals === 0 ? 1 : 100;
}

const numberFormats = new Map<string, Intl.NumberFormat>();
function numberFormat(locale: string, decimals: number): Intl.NumberFormat {
  const key = `${locale}|${decimals}`;
  let f = numberFormats.get(key);
  if (!f) {
    f = new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: true });
    numberFormats.set(key, f);
  }
  return f;
}

/** Number only, grouped for the currency's locale: 123456789 (INR minor) → "12,34,567.89". */
export function formatNumberMinor(minor: number, code: string): string {
  const c = currencyInfo(code);
  return numberFormat(c.locale, c.decimals).format(Math.abs(minor) / minorPerMajor(code));
}

/** "₹12,34,567.89", "$1,234.50", "¥120,000", negative as "−₹10.00". */
export function formatMoney(minor: number, code: string): string {
  const c = currencyInfo(code);
  return `${minor < 0 ? '−' : ''}${c.symbol}${formatNumberMinor(minor, code)}`;
}

/** Plain decimal string for an input box: 123450 → "1234.50" (JPY: "1234"). */
export function minorToInput(minor: number, code: string): string {
  const d = currencyInfo(code).decimals;
  if (d === 0) return String(minor);
  const neg = minor < 0 ? '-' : '';
  const a = Math.abs(minor);
  return `${neg}${Math.floor(a / 100)}.${String(a % 100).padStart(2, '0')}`;
}
