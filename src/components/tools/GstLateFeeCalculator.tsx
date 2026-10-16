'use client';
import { useMemo, useState } from 'react';
import { formatINR, parseAmount } from '@/lib/money';
import {
  DEFAULT_CAPS, LAST_VERIFIED, OFFICIAL_LINKS, RETURN_LABEL, SLAB_LABEL, calculateLateFee, daysLateISO, formatISODate,
  type AatoSlab, type LateFeeCaps, type ReturnType,
} from '@/lib/gstPenalty';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

type CapKey = keyof LateFeeCaps;
const CAP_ROWS: { key: CapKey; label: string }[] = [
  { key: 'nil', label: 'Nil return (any turnover)' },
  { key: 'upto-1.5cr', label: SLAB_LABEL['upto-1.5cr'] },
  { key: '1.5-5cr', label: SLAB_LABEL['1.5-5cr'] },
  { key: 'above-5cr', label: SLAB_LABEL['above-5cr'] },
];

const capsToText = (c: LateFeeCaps): Record<CapKey, string> => ({
  nil: String(c.nil / 100),
  'upto-1.5cr': String(c['upto-1.5cr'] / 100),
  '1.5-5cr': String(c['1.5-5cr'] / 100),
  'above-5cr': String(c['above-5cr'] / 100),
});

export default function GstLateFeeCalculator() {
  const [ret, setRet] = useState<ReturnType>('gstr3b');
  const [due, setDue] = useState('');
  const [filed, setFiled] = useState('');
  const [nil, setNil] = useState<'no' | 'yes'>('no');
  const [slab, setSlab] = useState<AatoSlab>('upto-1.5cr');
  const [capText, setCapText] = useState<Record<CapKey, string>>(capsToText(DEFAULT_CAPS));

  const calc = useMemo(() => {
    const errors: { due?: string; filed?: string; caps: Partial<Record<CapKey, string>> } = { caps: {} };
    if (!due) errors.due = 'Enter the due date.';
    if (!filed) errors.filed = 'Enter the filing date.';
    const days = due && filed ? daysLateISO(due, filed) : null;
    if (due && filed && days === null) errors.filed = 'Enter valid dates.';
    const caps = { ...DEFAULT_CAPS };
    for (const { key } of CAP_ROWS) {
      const v = parseAmount(capText[key]);
      if (v === null || v < 0) errors.caps[key] = 'Enter a valid amount.';
      else caps[key] = v;
    }
    const hasError = !!errors.due || !!errors.filed || Object.keys(errors.caps).length > 0;
    if (hasError || days === null) return { errors, res: null, touched: !!(due || filed) };
    return { errors, res: calculateLateFee({ days, nilReturn: nil === 'yes', slab, caps }), touched: true };
  }, [due, filed, nil, slab, capText]);

  const res = calc.res;
  const isDefaultCaps = CAP_ROWS.every(({ key }) => parseAmount(capText[key]) === DEFAULT_CAPS[key]);

  const copyText = !res
    ? ''
    : [
        `${RETURN_LABEL[ret]} late fee${nil === 'yes' ? ' (nil return)' : ` (${SLAB_LABEL[slab]})`}`,
        `Due date: ${formatISODate(due)}; filed: ${formatISODate(filed)}`,
        `Days late: ${res.days}`,
        `Per day: ${formatINR(res.perDay)} (CGST ${formatINR(res.perDay / 2)} + SGST ${formatINR(res.perDay / 2)})`,
        `Uncapped fee: ${formatINR(res.uncapped)}`,
        `Maximum (cap): ${formatINR(res.cap)}${isDefaultCaps ? ' (default caps as commonly cited)' : ' (edited caps)'}`,
        `Late fee payable: ${formatINR(res.capped)} — CGST ${formatINR(res.cgst)}, SGST ${formatINR(res.sgst)}`,
      ].join('\n');

  function reset() {
    setRet('gstr3b'); setDue(''); setFiled(''); setNil('no'); setSlab('upto-1.5cr'); setCapText(capsToText(DEFAULT_CAPS));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <form className="card no-print space-y-6 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
        <Segmented
          name="lf-return"
          legend="Return"
          value={ret}
          onChange={setRet}
          options={[{ value: 'gstr3b', label: 'GSTR-3B' }, { value: 'gstr1', label: 'GSTR-1' }]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="lf-due" label="Due date" type="date" value={due} onChange={(e) => setDue(e.target.value)} error={calc.touched ? calc.errors.due : undefined} />
          <TextField id="lf-filed" label="Date of filing" type="date" value={filed} onChange={(e) => setFiled(e.target.value)} error={calc.touched ? calc.errors.filed : undefined} />
        </div>
        <Segmented
          name="lf-nil"
          legend={ret === 'gstr3b' ? 'Is it a nil return (no tax liability)?' : 'Is it a nil return (no outward supplies)?'}
          value={nil}
          onChange={setNil}
          options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes, nil return' }]}
        />
        <div>
          <label htmlFor="lf-slab" className="label">Aggregate turnover in the preceding financial year (AATO)</label>
          <select id="lf-slab" className="input" value={slab} onChange={(e) => setSlab(e.target.value as AatoSlab)} disabled={nil === 'yes'} aria-describedby="lf-slab-hint">
            {(Object.keys(SLAB_LABEL) as AatoSlab[]).map((s) => <option key={s} value={s}>{SLAB_LABEL[s]}</option>)}
          </select>
          <p id="lf-slab-hint" className="mt-1 text-xs text-ink-faint">{nil === 'yes' ? 'The nil-return cap applies whatever the turnover.' : 'Decides the maximum late fee.'}</p>
        </div>

        <details className="rounded-2xl border border-brand-900/10 p-4" open={!isDefaultCaps}>
          <summary className="cursor-pointer font-semibold text-ink">Maximum late fee caps (editable)</summary>
          <p className="mt-2 text-xs leading-5 text-ink-soft">
            Default caps as commonly cited — verify the current notification on{' '}
            <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">cbic-gst.gov.in</a>.
            Amounts are the total of CGST + SGST, split equally.
          </p>
          <div className="mt-3 space-y-3">
            {CAP_ROWS.map(({ key, label }) => (
              <TextField
                key={key}
                id={`lf-cap-${key}`}
                label={label}
                prefix="₹"
                inputMode="decimal"
                value={capText[key]}
                onChange={(e) => setCapText((c) => ({ ...c, [key]: e.target.value }))}
                error={calc.errors.caps[key]}
              />
            ))}
          </div>
          {!isDefaultCaps && (
            <button type="button" className="btn-ghost mt-3" onClick={() => setCapText(capsToText(DEFAULT_CAPS))}>Restore default caps</button>
          )}
        </details>
      </form>

      <section className="card print-area p-5 md:p-7" aria-labelledby="lf-result-heading">
        <p className="hidden text-sm text-ink-soft print:block">E-Way Easy — GST late fee calculation</p>
        <h2 id="lf-result-heading" className="font-display text-xl font-bold text-ink">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {res ? (
            <>
              <p className="mt-1 text-sm text-ink-soft">{RETURN_LABEL[ret]}{nil === 'yes' ? ', nil return' : `, ${SLAB_LABEL[slab]}`}</p>
              <dl className="mt-3 text-[15px]">
                <ResultRow label="Days late" value={res.days} />
                <ResultRow label="Fee per day" value={formatINR(res.perDay)} />
                <ResultRow label="Fee without cap" value={formatINR(res.uncapped)} />
                <ResultRow label={`Maximum (cap)${isDefaultCaps ? '' : ' — edited'}`} value={formatINR(res.cap)} muted />
                <ResultRow label="CGST late fee" value={formatINR(res.cgst)} muted />
                <ResultRow label="SGST late fee" value={formatINR(res.sgst)} muted />
                <ResultRow label="Late fee payable" value={formatINR(res.capped)} strong />
              </dl>
              <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
                <span className="font-semibold text-ink">Formula: </span>
                {res.days === 0
                  ? 'Filed on or before the due date, so no late fee.'
                  : `${res.days} day(s) × ${formatINR(res.perDay)} = ${formatINR(res.uncapped)}; ${res.capApplied ? `capped at ${formatINR(res.cap)}` : `below the cap of ${formatINR(res.cap)}`}. Split equally: CGST ${formatINR(res.cgst)} + SGST ${formatINR(res.sgst)}.`}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">{calc.touched ? 'Fix the highlighted fields to see the result.' : 'Enter the due date and filing date.'}</p>
          )}
        </div>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <CopyButton text={copyText} className="btn-primary" />
          <button type="button" className="btn-ghost" onClick={() => window.print()} disabled={!res}>Print summary</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
        <div className="no-print mt-5 border-t border-brand-900/10 pt-4 text-sm">
          <h3 className="font-semibold text-ink">Official sources</h3>
          <ul className="mt-2 space-y-1">
            {OFFICIAL_LINKS.map((l) => (
              <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline">{l.title}</a></li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-ink-faint">Last reviewed: {LAST_VERIFIED}. Late fee waivers and amnesty schemes are notified from time to time; check before paying.</p>
        </div>
      </section>
    </div>
  );
}
