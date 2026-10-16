// Amount-in-words helpers built on the Indian-system functions in money.ts, plus the
// international (thousand / million / billion / trillion) system. Amounts are paise integers.
import { numberToIndianWords, type Paise } from './money';

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve',
  'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
const SCALES = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion'];

function twoDigits(n: number): string {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ' ' + ONES[n % 10] : ''}`;
}
function threeDigits(n: number): string {
  const h = Math.floor(n / 100), r = n % 100;
  return [h ? `${ONES[h]} Hundred` : '', r ? twoDigits(r) : ''].filter(Boolean).join(' ');
}

/** Whole number in the international system: 1,00,000 → "One Hundred Thousand". */
export function numberToInternationalWords(n: number): string {
  if (!Number.isSafeInteger(n) || n < 0) throw new RangeError('Expected a non-negative safe integer');
  if (n === 0) return 'Zero';
  const parts: string[] = [];
  let scale = 0;
  while (n > 0) {
    const chunk = n % 1000;
    if (chunk) parts.unshift(`${threeDigits(chunk)}${SCALES[scale] ? ' ' + SCALES[scale] : ''}`);
    n = Math.floor(n / 1000);
    scale++;
  }
  return parts.join(' ');
}

export type WordsPrefix = 'Rupees' | 'INR';
export type WordsCase = 'title' | 'upper';
export type WordsSystem = 'indian' | 'international';

export interface WordsOptions {
  prefix?: WordsPrefix;
  letterCase?: WordsCase;
  system?: WordsSystem;
}

/**
 * Full amount in words, e.g. "Rupees One Lakh Twenty Thousand and Fifty Paise Only".
 * Negative amounts are written using their absolute value.
 */
export function amountToWords(paise: Paise, opts: WordsOptions = {}): string {
  const { prefix = 'Rupees', letterCase = 'title', system = 'indian' } = opts;
  const abs = Math.abs(paise);
  const rupees = Math.floor(abs / 100);
  const p = abs % 100;
  const toWords = system === 'indian' ? numberToIndianWords : numberToInternationalWords;
  const text = `${prefix} ${toWords(rupees)}${p ? ` and ${twoDigits(p)} Paise` : ''} Only`;
  return letterCase === 'upper' ? text.toUpperCase() : text;
}
