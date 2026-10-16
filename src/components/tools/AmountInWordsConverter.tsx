'use client';
import { useMemo, useState } from 'react';
import { formatINR, parseAmount } from '@/lib/money';
import { amountToWords, type WordsCase, type WordsPrefix } from '@/lib/words';
import { CopyButton, Segmented, TextField } from './ui';

const initial = { amount: '1,25,450.50', prefix: 'Rupees' as WordsPrefix, letterCase: 'title' as WordsCase };
// Keep the rupee part within what the Indian and international word lists handle comfortably.
const MAX_PAISE = 99999999999999; // ₹9,99,99,99,99,999.99

export default function AmountInWordsConverter() {
  const [amount, setAmount] = useState(initial.amount);
  const [prefix, setPrefix] = useState<WordsPrefix>(initial.prefix);
  const [letterCase, setLetterCase] = useState<WordsCase>(initial.letterCase);

  const calc = useMemo(() => {
    if (!amount.trim()) return { error: 'Enter an amount.', paise: null };
    const p = parseAmount(amount);
    if (p === null) return { error: 'Enter a valid amount with up to 2 decimals, e.g. 1,25,450.50.', paise: null };
    if (p < 0) return { error: 'Enter a positive amount.', paise: null };
    if (p > MAX_PAISE) return { error: 'Amount is too large for this converter.', paise: null };
    return { error: null, paise: p };
  }, [amount]);

  const indian = calc.paise !== null ? amountToWords(calc.paise, { prefix, letterCase, system: 'indian' }) : '';
  const intl = calc.paise !== null ? amountToWords(calc.paise, { prefix, letterCase, system: 'international' }) : '';

  function reset() {
    setAmount(initial.amount);
    setPrefix(initial.prefix);
    setLetterCase(initial.letterCase);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
      <form className="card space-y-6 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
        <TextField
          id="words-amount"
          label="Amount"
          prefix="₹"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={calc.error}
          placeholder="e.g. 1,25,450.50"
          hint="Commas are optional. Up to 2 decimal places (paise)."
        />
        <Segmented
          name="words-prefix"
          legend="Start with"
          value={prefix}
          onChange={setPrefix}
          options={[
            { value: 'Rupees', label: 'Rupees … Only' },
            { value: 'INR', label: 'INR … Only' },
          ]}
        />
        <Segmented
          name="words-case"
          legend="Letter case"
          value={letterCase}
          onChange={setLetterCase}
          options={[
            { value: 'title', label: 'Title Case' },
            { value: 'upper', label: 'UPPER CASE' },
          ]}
        />
      </form>

      <section className="card p-5 md:p-7" aria-labelledby="words-result-heading">
        <h2 id="words-result-heading" className="font-display text-xl font-bold text-ink">In words</h2>
        <div aria-live="polite" aria-atomic="true">
          {calc.paise !== null ? (
            <>
              <p className="mt-1 text-sm text-ink-soft tabular-nums">{formatINR(calc.paise)}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">Indian system (lakh, crore)</p>
              <p className="mt-1 rounded-xl bg-brand-50 px-3.5 py-3 text-lg font-semibold leading-7 text-ink">{indian}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">International system (million, billion)</p>
              <p className="mt-1 rounded-xl bg-cream px-3.5 py-3 text-[15px] leading-6 text-ink-soft">{intl}</p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">Fix the amount to see it in words.</p>
          )}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <CopyButton text={indian} label="Copy Indian words" className="btn-primary" />
          <CopyButton text={intl} label="Copy international words" />
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}
