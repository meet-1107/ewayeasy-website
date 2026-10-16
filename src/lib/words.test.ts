import { describe, expect, it } from 'vitest';
import { amountToWords, numberToInternationalWords } from './words';
import { amountInWords, parseAmount } from './money';

describe('international number words', () => {
  it('handles small numbers', () => {
    expect(numberToInternationalWords(0)).toBe('Zero');
    expect(numberToInternationalWords(1)).toBe('One');
    expect(numberToInternationalWords(15)).toBe('Fifteen');
    expect(numberToInternationalWords(100)).toBe('One Hundred');
    expect(numberToInternationalWords(1000)).toBe('One Thousand');
  });
  it('uses thousand / million / billion', () => {
    expect(numberToInternationalWords(100000)).toBe('One Hundred Thousand');
    expect(numberToInternationalWords(100000000)).toBe('One Hundred Million');
    expect(numberToInternationalWords(1234567)).toBe('One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven');
    expect(numberToInternationalWords(2000000005)).toBe('Two Billion Five');
  });
  it('rejects negative or fractional input', () => {
    expect(() => numberToInternationalWords(-1)).toThrow();
    expect(() => numberToInternationalWords(1.5)).toThrow();
  });
});

describe('amountToWords', () => {
  it('writes Indian-system amounts', () => {
    expect(amountToWords(0)).toBe('Rupees Zero Only');
    expect(amountToWords(100)).toBe('Rupees One Only');
    expect(amountToWords(1500)).toBe('Rupees Fifteen Only');
    expect(amountToWords(10000)).toBe('Rupees One Hundred Only');
    expect(amountToWords(100000)).toBe('Rupees One Thousand Only');
    expect(amountToWords(parseAmount('1,00,000')!)).toBe('Rupees One Lakh Only');
    expect(amountToWords(parseAmount('10,00,00,000')!)).toBe('Rupees Ten Crore Only');
  });
  it('matches money.ts amountInWords for the default variant', () => {
    for (const v of ['0', '1', '15.5', '1,23,456.78', '10,00,00,000']) {
      const p = parseAmount(v)!;
      expect(amountToWords(p)).toBe(amountInWords(p));
    }
  });
  it('writes paise', () => {
    expect(amountToWords(parseAmount('1.05')!)).toBe('Rupees One and Five Paise Only');
    expect(amountToWords(parseAmount('0.50')!)).toBe('Rupees Zero and Fifty Paise Only');
    expect(amountToWords(parseAmount('1,23,456.78')!)).toBe(
      'Rupees One Lakh Twenty Three Thousand Four Hundred Fifty Six and Seventy Eight Paise Only',
    );
  });
  it('supports INR prefix, upper case and international system', () => {
    expect(amountToWords(parseAmount('1,00,000')!, { prefix: 'INR' })).toBe('INR One Lakh Only');
    expect(amountToWords(parseAmount('15')!, { letterCase: 'upper' })).toBe('RUPEES FIFTEEN ONLY');
    expect(amountToWords(parseAmount('10,00,00,000')!, { system: 'international' })).toBe('Rupees One Hundred Million Only');
    expect(amountToWords(parseAmount('1,00,000.25')!, { system: 'international', prefix: 'INR', letterCase: 'upper' })).toBe(
      'INR ONE HUNDRED THOUSAND AND TWENTY FIVE PAISE ONLY',
    );
  });
});
