'use client';
import { parseRate } from '@/lib/money';

export const RATE_PRESETS = ['0', '0.25', '3', '5', '12', '18', '28', '40'] as const;

export interface RateState {
  choice: string; // one of RATE_PRESETS or 'custom'
  custom: string;
}

export const DEFAULT_RATE: RateState = { choice: '18', custom: '' };

/** Resolve the selected rate to basis points, or an error message. */
export function resolveRate(r: RateState): { bp: number; error: null } | { bp: null; error: string } {
  const raw = r.choice === 'custom' ? r.custom : r.choice;
  if (r.choice === 'custom' && !raw.trim()) return { bp: null, error: 'Enter a GST rate.' };
  const bp = parseRate(raw);
  if (bp === null) return { bp: null, error: 'Enter a rate between 0 and 100, with up to 2 decimals.' };
  return { bp, error: null };
}

export default function RatePicker({
  id, value, onChange, error, legend = 'GST rate',
}: { id: string; value: RateState; onChange: (v: RateState) => void; error?: string | null; legend?: string }) {
  return (
    <fieldset>
      <legend className="label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {[...RATE_PRESETS, 'custom'].map((r) => (
          <label key={r} className="cursor-pointer">
            <input
              type="radio"
              name={`${id}-rate`}
              value={r}
              checked={value.choice === r}
              onChange={() => onChange({ ...value, choice: r })}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-[40px] min-w-[52px] items-center justify-center rounded-xl border border-brand-900/15 bg-white px-3 py-2 text-sm font-semibold text-ink-soft transition hover:border-brand-600 peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2">
              {r === 'custom' ? 'Custom' : `${r}%`}
            </span>
          </label>
        ))}
      </div>
      {value.choice === 'custom' && (
        <div className="mt-3 max-w-[200px]">
          <label htmlFor={`${id}-custom`} className="label">Custom rate</label>
          <div className="relative">
            <input
              id={`${id}-custom`}
              inputMode="decimal"
              className={`input pr-9 ${error ? 'input-error' : ''}`}
              value={value.custom}
              onChange={(e) => onChange({ ...value, custom: e.target.value })}
              placeholder="e.g. 1.5"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-rate-error` : undefined}
            />
            <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint">%</span>
          </div>
        </div>
      )}
      {error && <p id={`${id}-rate-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </fieldset>
  );
}

export function RateNote() {
  return (
    <p className="rounded-xl bg-brand-50 px-3.5 py-2.5 text-xs leading-5 text-ink-soft">
      After the GST rate rationalisation effective 22 September 2025, the main slabs are 5% and 18%, with 40% for
      specified goods. 12% and 28% are kept here for reference and older documents. Always check the current rate for
      your item on{' '}
      <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">CBIC GST</a>.
    </p>
  );
}
