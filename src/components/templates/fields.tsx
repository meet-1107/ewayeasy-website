'use client';
/** @jsxRuntime automatic */
// Small accessible form controls for the template editor (labels, hints and errors wired via aria-describedby).
import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { GST_STATES } from '@/components/tools/invoice/states';

export function Card({ title, children, aside, id }: { title: string; children: ReactNode; aside?: ReactNode; id?: string }) {
  const hid = useId();
  return (
    <section id={id} className="card space-y-4 p-4 md:p-5" aria-labelledby={hid}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id={hid} className="font-display text-lg font-bold text-ink">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function describe(id: string, error?: string | null, hint?: ReactNode) {
  return error ? `${id}-err` : hint ? `${id}-hint` : undefined;
}

function Help({ id, error, hint }: { id: string; error?: string | null; hint?: ReactNode }) {
  if (error) return <p id={`${id}-err`} className="mt-1 text-xs font-medium text-red-600">{error}</p>;
  if (hint) return <p id={`${id}-hint`} className="mt-1 text-xs text-ink-faint">{hint}</p>;
  return null;
}

export function Field({
  id, label, value, onChange, error, hint, className = '', ...rest
}: {
  id: string; label: ReactNode; value: string; onChange: (v: string) => void; error?: string | null; hint?: ReactNode; className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'value' | 'onChange'>) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        className={`input ${error ? 'input-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describe(id, error, hint)}
        {...rest}
      />
      <Help id={id} error={error} hint={hint} />
    </div>
  );
}

export function Area({
  id, label, value, onChange, rows = 3, hint, className = '', placeholder, maxLength = 4000,
}: { id: string; label: ReactNode; value: string; onChange: (v: string) => void; rows?: number; hint?: ReactNode; className?: string; placeholder?: string; maxLength?: number }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="label">{label}</label>
      <textarea id={id} className="input" rows={rows} value={value} placeholder={placeholder} maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)} aria-describedby={describe(id, null, hint)} />
      <Help id={id} hint={hint} />
    </div>
  );
}

export function Select({
  id, label, value, onChange, options, hint, error, className = '', ...rest
}: {
  id: string; label: ReactNode; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
  hint?: ReactNode; error?: string | null; className?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id' | 'value' | 'onChange'>) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={id} className="label">{label}</label>
      <select id={id} className={`input ${error ? 'input-error' : ''}`} value={value} onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined} aria-describedby={describe(id, error, hint)} {...rest}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Help id={id} error={error} hint={hint} />
    </div>
  );
}

export const STATE_OPTIONS = [{ value: '', label: 'Select state / UT' }, ...GST_STATES.map((s) => ({ value: s.code, label: `${s.code} — ${s.name}` }))];

export function Check({ id, label, checked, onChange, className = '' }: { id: string; label: ReactNode; checked: boolean; onChange: (v: boolean) => void; className?: string }) {
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-center gap-2.5 text-sm font-semibold text-ink ${className}`}>
      <input id={id} type="checkbox" className="h-5 w-5 shrink-0 accent-brand-700" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

export function Choice<T extends string>({
  name, legend, value, options, onChange, className = '',
}: { name: string; legend: ReactNode; value: T; options: { value: T; label: ReactNode }[]; onChange: (v: T) => void; className?: string }) {
  return (
    <fieldset className={className}>
      <legend className="label">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
            <span className="inline-flex min-h-[38px] items-center rounded-full border border-brand-900/15 bg-white px-3.5 py-1.5 text-sm font-semibold text-ink-soft transition hover:border-brand-600 peer-checked:border-brand-700 peer-checked:bg-brand-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2">
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
