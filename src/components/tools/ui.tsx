'use client';
import { useEffect, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';

/** Labelled text input with hint and error message wired up via aria-describedby. */
export function TextField({
  id, label, error, hint, prefix, suffix, className = '', ...rest
}: {
  id: string;
  label: ReactNode;
  error?: string | null;
  hint?: ReactNode;
  prefix?: string;
  suffix?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'prefix'>) {
  const describedBy = [error ? `${id}-error` : '', hint ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="label">{label}</label>
      <div className="relative">
        {prefix && <span aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint">{prefix}</span>}
        <input
          id={id}
          className={`input ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-10' : ''} ${error ? 'input-error' : ''}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...rest}
        />
        {suffix && <span aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint">{suffix}</span>}
      </div>
      {hint && !error && <p id={`${id}-hint`} className="mt-1 text-xs text-ink-faint">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

/** Radio group styled as a segmented control. */
export function Segmented<T extends string>({
  name, legend, value, options, onChange, className = '',
}: {
  name: string;
  legend: ReactNode;
  value: T;
  options: { value: T; label: ReactNode }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-[40px] items-center rounded-full border border-brand-900/15 bg-white px-4 py-2 text-sm font-semibold text-ink-soft transition hover:border-brand-600 peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ResultRow({ label, value, strong = false, muted = false }: { label: ReactNode; value: ReactNode; strong?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-4 py-2 ${strong ? 'border-t border-brand-900/10 pt-3 text-lg font-bold text-ink' : ''}`}>
      <dt className={muted ? 'text-ink-faint' : 'text-ink-soft'}>{label}</dt>
      <dd className={`tabular-nums ${strong ? '' : 'font-semibold text-ink'}`}>{value}</dd>
    </div>
  );
}

/** Copies text to the clipboard and announces success. */
export function CopyButton({ text, label = 'Copy result', className = 'btn-ghost' }: { text: string; label?: string; className?: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        if (!ok) throw new Error('copy failed');
      }
      setState('copied');
    } catch {
      setState('failed');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 2500);
  }
  return (
    <>
      <button type="button" onClick={copy} className={className} disabled={!text}>
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {state === 'copied' ? 'Result copied to clipboard' : state === 'failed' ? 'Could not copy. Select the text and copy manually.' : ''}
      </span>
    </>
  );
}

/** Safe localStorage wrapper: storage may be unavailable (private mode, blocked cookies). */
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown): boolean {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};
