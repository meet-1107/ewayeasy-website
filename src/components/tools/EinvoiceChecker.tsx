'use client';
import { useState, type FormEvent } from 'react';
import { formatINR, parseAmount } from '@/lib/money';
import {
  ENTITY_LABEL, LAST_VERIFIED, OFFICIAL_LINKS, checkEinvoice, type EinvoiceResult, type EntityType,
} from '@/lib/einvoice';
import { CopyButton, TextField } from './ui';

const STATUS_STYLE: Record<EinvoiceResult['status'], string> = {
  'likely-applicable': 'border-amber-500 bg-amber-300/20',
  'likely-not-applicable': 'border-brand-500 bg-brand-50',
  review: 'border-red-400 bg-red-50',
};

const CRORE_PAISE = 1_00_00_000_00;

function croreText(paise: number): string {
  const whole = Math.floor(paise / CRORE_PAISE);
  const frac = Math.round(((paise % CRORE_PAISE) / CRORE_PAISE) * 100);
  return frac === 100 ? `₹${whole + 1} crore` : `₹${whole}${frac ? '.' + String(frac).padStart(2, '0') : ''} crore (approx.)`;
}

type SupplyKey = 'b2b' | 'exports' | 'b2c';
const SUPPLY_OPTIONS: { key: SupplyKey; label: string; hint: string }[] = [
  { key: 'b2b', label: 'B2B supplies', hint: 'To GSTIN holders, including supplies to SEZ units/developers and deemed exports.' },
  { key: 'exports', label: 'Exports', hint: 'Export of goods or services, with or without payment of IGST.' },
  { key: 'b2c', label: 'B2C supplies', hint: 'To unregistered customers and consumers.' },
];

export default function EinvoiceChecker() {
  const [aato, setAato] = useState('');
  const [entity, setEntity] = useState<EntityType>('regular');
  const [supplies, setSupplies] = useState({ b2b: true, exports: false, b2c: false });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<EinvoiceResult | null>(null);

  const aatoPaise = aato.trim() ? parseAmount(aato) : null;
  const aatoError = !aato.trim()
    ? submitted ? 'Enter your highest annual aggregate turnover.' : null
    : aatoPaise === null || aatoPaise < 0 ? 'Enter a valid amount in rupees, up to 2 decimals.' : null;

  function run(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (aatoError || aatoPaise === null) { setResult(null); return; }
    setResult(checkEinvoice({ aatoPaise, entity, supplies }));
  }

  function reset() {
    setAato(''); setEntity('regular'); setSupplies({ b2b: true, exports: false, b2c: false }); setSubmitted(false); setResult(null);
  }

  const copyText = !result
    ? ''
    : [
        `E-invoice applicability (preliminary): ${result.label}`,
        aatoPaise !== null ? `Highest AATO: ${formatINR(aatoPaise)}` : '',
        `Entity: ${ENTITY_LABEL[entity]}`,
        `Supplies: ${SUPPLY_OPTIONS.filter((o) => supplies[o.key]).map((o) => o.label).join(', ') || 'none selected'}`,
        ...result.reasons.map((r) => `- ${r}`),
        ...result.notes.map((n) => `Note: ${n}`),
        'Verify on https://einvoice1.gst.gov.in/ and https://www.gst.gov.in/',
      ].filter(Boolean).join('\n');

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
      <form className="card no-print space-y-6 p-5 md:p-7" onSubmit={run} noValidate>
        <TextField
          id="ei-aato"
          label="Highest aggregate annual turnover in any financial year from 2017-18"
          prefix="₹"
          inputMode="decimal"
          value={aato}
          onChange={(e) => setAato(e.target.value)}
          error={aatoError}
          hint={aatoPaise !== null && aatoPaise > 0 ? `≈ ${croreText(aatoPaise)}. All GSTINs under the same PAN, all-India.` : 'Aggregate turnover for all GSTINs under your PAN, all-India.'}
          placeholder="e.g. 6,50,00,000"
        />
        <div>
          <label htmlFor="ei-entity" className="label">Type of entity</label>
          <select id="ei-entity" className="input" value={entity} onChange={(e) => setEntity(e.target.value as EntityType)}>
            {(Object.keys(ENTITY_LABEL) as EntityType[]).map((k) => <option key={k} value={k}>{ENTITY_LABEL[k]}</option>)}
          </select>
        </div>
        <fieldset>
          <legend className="label">Which supplies do you make?</legend>
          <div className="space-y-3">
            {SUPPLY_OPTIONS.map((o) => (
              <div key={o.key} className="flex items-start gap-3">
                <input
                  id={`ei-${o.key}`}
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-brand-700"
                  checked={supplies[o.key]}
                  onChange={(e) => setSupplies((s) => ({ ...s, [o.key]: e.target.checked }))}
                />
                <label htmlFor={`ei-${o.key}`} className="text-sm text-ink">
                  <span className="font-semibold">{o.label}</span>
                  <span className="block text-ink-soft">{o.hint}</span>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="btn-primary">Check</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </form>

      <section className="space-y-4" aria-labelledby="ei-result-heading">
        <h2 id="ei-result-heading" className="sr-only">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {result ? (
            <div className={`print-area rounded-3xl border-2 p-5 md:p-6 ${STATUS_STYLE[result.status]}`}>
              <p className="eyebrow">Preliminary result</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">{result.label}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-6 text-ink">
                {result.reasons.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ) : (
            <div className="card p-5 text-sm text-ink-soft md:p-6">
              Enter your turnover, entity type and supplies, then select <strong>Check</strong>.
            </div>
          )}
        </div>

        {result && result.notes.length > 0 && (
          <div className="card p-5">
            <h3 className="font-semibold text-ink">Notes for your case</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-ink-soft">
              {result.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </div>
        )}
        {result && (
          <div className="no-print flex flex-wrap gap-2">
            <CopyButton text={copyText} className="btn-primary" />
            <button type="button" className="btn-ghost" onClick={() => window.print()}>Print</button>
          </div>
        )}

        <div className="card p-5 text-sm">
          <h3 className="font-semibold text-ink">Official sources</h3>
          <ul className="mt-2 space-y-1">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{l.title}</a></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-faint">Last reviewed: {LAST_VERIFIED}</p>
          <p className="mt-2 text-xs leading-5 text-ink-faint">
            This is a preliminary indication based on the generally stated rules, not a legal determination. Thresholds,
            exemptions and dates are set by notification and can change. Verify on the official portals or with your tax adviser.
          </p>
        </div>
      </section>
    </div>
  );
}
