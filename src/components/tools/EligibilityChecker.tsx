'use client';
import { useState, type FormEvent } from 'react';
import { parseAmount } from '@/lib/money';
import {
  LAST_VERIFIED, MODE_LABEL, MOVEMENT_LABEL, OFFICIAL_LINKS, checkEligibility,
  type EligibilityResult, type ExemptAnswer, type MovementType, type Scope, type TransportMode,
} from '@/lib/eligibility';
import { Segmented, TextField } from './ui';

const STATUS_STYLE: Record<EligibilityResult['status'], string> = {
  'likely-required': 'border-amber-500 bg-amber-300/20',
  'likely-not-required': 'border-brand-500 bg-brand-50',
  'review-needed': 'border-red-400 bg-red-50',
};

export default function EligibilityChecker() {
  const [movement, setMovement] = useState<MovementType>('supply');
  const [scope, setScope] = useState<Scope>('inter');
  const [value, setValue] = useState('');
  const [exemptGoods, setExempt] = useState<ExemptAnswer>('no');
  const [mode, setMode] = useState<TransportMode>('road');
  const [handicraft, setHandicraft] = useState(false);
  const [distance, setDistance] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const valuePaise = value.trim() ? parseAmount(value) : null;
  const valueError = value.trim() && (valuePaise === null || valuePaise < 0) ? 'Enter a valid amount, up to 2 decimals.' : null;
  const distanceError = distance.trim() && !/^\d+$/.test(distance.trim()) ? 'Enter a whole number of km.' : null;
  const valueRequired = !(scope === 'inter' && (movement === 'job-work' || handicraft)) && mode !== 'non-motorised' && exemptGoods !== 'yes';
  const missingValue = submitted && valueRequired && !value.trim() ? 'Enter the consignment value (including GST).' : null;

  function run(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    if (valueError || distanceError || (valueRequired && !value.trim())) {
      setResult(null);
      return;
    }
    setResult(
      checkEligibility({
        movement,
        scope,
        valuePaise,
        exemptGoods,
        mode,
        handicraftUnregistered: handicraft,
        distanceKm: distance.trim() ? Number(distance) : null,
      }),
    );
  }

  function reset() {
    setMovement('supply'); setScope('inter'); setValue(''); setExempt('no'); setMode('road');
    setHandicraft(false); setDistance(''); setSubmitted(false); setResult(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
      <form className="card space-y-6 p-5 md:p-7" onSubmit={run} noValidate>
        <div>
          <label htmlFor="el-movement" className="label">Reason for movement</label>
          <select id="el-movement" className="input" value={movement} onChange={(e) => setMovement(e.target.value as MovementType)}>
            {(Object.keys(MOVEMENT_LABEL) as MovementType[]).map((m) => <option key={m} value={m}>{MOVEMENT_LABEL[m]}</option>)}
          </select>
        </div>
        <Segmented
          name="el-scope"
          legend="Where are the goods moving?"
          value={scope}
          onChange={setScope}
          options={[{ value: 'inter', label: 'To another state (inter-state)' }, { value: 'intra', label: 'Within the same state' }]}
        />
        <TextField
          id="el-value"
          label="Consignment value (including GST)"
          prefix="₹"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={valueError ?? missingValue}
          hint="Taxable value + GST, excluding exempt supplies on the same invoice."
          placeholder="e.g. 75,000"
        />
        <Segmented
          name="el-exempt"
          legend="Are the goods in the exempt list (Annexure to Rule 138(14))?"
          value={exemptGoods}
          onChange={setExempt}
          options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }, { value: 'not-sure', label: 'Not sure' }]}
        />
        <div>
          <label htmlFor="el-mode" className="label">Mode of transport</label>
          <select id="el-mode" className="input" value={mode} onChange={(e) => setMode(e.target.value as TransportMode)}>
            {(Object.keys(MODE_LABEL) as TransportMode[]).map((m) => <option key={m} value={m}>{MODE_LABEL[m]}</option>)}
          </select>
        </div>
        <div className="flex items-start gap-3">
          <input id="el-handicraft" type="checkbox" className="mt-1 h-5 w-5 accent-brand-700" checked={handicraft} onChange={(e) => setHandicraft(e.target.checked)} />
          <label htmlFor="el-handicraft" className="text-sm text-ink">
            <span className="font-semibold">Handicraft goods moved by a person exempt from registration</span>
            <span className="block text-ink-soft">Specified handicraft goods, transported by a person who is not required to register.</span>
          </label>
        </div>
        <TextField
          id="el-distance"
          label="Approximate distance (optional)"
          suffix="km"
          inputMode="numeric"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          error={distanceError}
          hint="Used only for the Part B 50 km note."
        />
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="btn-primary">Check</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </form>

      <section className="space-y-4" aria-labelledby="el-result-heading">
        <h2 id="el-result-heading" className="sr-only">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {result ? (
            <div className={`rounded-3xl border-2 p-5 md:p-6 ${STATUS_STYLE[result.status]}`}>
              <p className="eyebrow">Preliminary result</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">{result.label}</p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-6 text-ink">
                {result.reasons.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          ) : (
            <div className="card p-5 text-sm text-ink-soft md:p-6">
              Answer the questions and select <strong>Check</strong> to see a preliminary result.
            </div>
          )}
        </div>

        {result && (
          <>
            {result.notes.length > 0 && (
              <div className="card p-5">
                <h3 className="font-semibold text-ink">Notes for your case</h3>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-ink-soft">
                  {result.notes.map((n) => <li key={n}>{n}</li>)}
                </ul>
              </div>
            )}
            <div className="card p-5">
              <h3 className="font-semibold text-ink">General rule</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{result.generalRule}</p>
              <h3 className="mt-4 font-semibold text-ink">Exceptions to review</h3>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-ink-soft">
                {result.exceptions.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </>
        )}

        <div className="card p-5 text-sm">
          <h3 className="font-semibold text-ink">Official sources</h3>
          <ul className="mt-2 space-y-1">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{l.title}</a></li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-faint">Last verified: {LAST_VERIFIED}</p>
          <p className="mt-2 text-xs leading-5 text-ink-faint">
            This is a preliminary indication based on general rules, not a legal determination. Exemptions have conditions,
            and some states notify different intra-state thresholds. Verify against the current rules and your state&apos;s
            notification before moving goods.
          </p>
        </div>
      </section>
    </div>
  );
}
