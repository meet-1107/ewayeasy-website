'use client';
import { useMemo, useState } from 'react';
import {
  COMPARE_FIELDS, COMPARE_LABEL, compareDocs, parsePastedPair, type CompareField, type CompareStatus, type DocValues,
} from '@/lib/ewbCompare';
import { CopyButton, Segmented } from './ui';

const STATUS_STYLE: Record<CompareStatus, { label: string; cls: string }> = {
  match: { label: 'Match', cls: 'bg-brand-50 text-brand-700' },
  format: { label: 'Check', cls: 'bg-amber-300/40 text-ink' },
  mismatch: { label: 'Mismatch', cls: 'bg-red-100 text-red-700' },
  missing: { label: 'Missing', cls: 'bg-amber-300/40 text-ink' },
  empty: { label: 'Not entered', cls: 'bg-cream text-ink-faint' },
};

const PLACEHOLDER: Partial<Record<CompareField, string>> = {
  docNo: 'EE/26-27/0012', docDate: 'DD/MM/YYYY', supplierGstin: '24ABCDE1234F1Z5', recipientGstin: '27PQRSX5678K1Z2 or URP',
  fromPin: '360003', toPin: '411037', hsn: '3917', qty: '120', taxable: '72960', total: '86093', vehicleNo: 'GJ03AB1234',
};

const SAMPLE_INV: DocValues = {
  docNo: 'EE/26-27/0012', docDate: '15/10/2026', supplierGstin: '24ABCDE1234F1Z5', recipientGstin: '27PQRSX5678K1Z2',
  fromPin: '360003', toPin: '411037', hsn: '3917', qty: '120', taxable: '72960', total: '86093', vehicleNo: 'GJ03AB1234',
};
const SAMPLE_EWB: DocValues = {
  ...SAMPLE_INV, docNo: 'EE/26-27/12', recipientGstin: '27PQRSX5678K1Z3', toPin: '411037', total: '86092.80', vehicleNo: 'GJ 03 AB 1243',
};

const empty = (): DocValues => Object.fromEntries(COMPARE_FIELDS.map((f) => [f, ''])) as DocValues;

export default function InvoiceEwbComparer() {
  const [mode, setMode] = useState<'form' | 'paste'>('form');
  const [inv, setInv] = useState<DocValues>(empty);
  const [ewb, setEwb] = useState<DocValues>(empty);
  const [zeros, setZeros] = useState(false);
  const [paste, setPaste] = useState('');
  const [pasteError, setPasteError] = useState('');

  const report = useMemo(() => compareDocs(inv, ewb, { ignoreLeadingZeros: zeros }), [inv, ewb, zeros]);
  const entered = report.counts.match + report.counts.format + report.counts.mismatch + report.counts.missing > 0;

  function applyPaste() {
    const r = parsePastedPair(paste);
    if ('error' in r) { setPasteError(r.error); return; }
    setPasteError('');
    setInv({ ...empty(), ...r.invoice });
    setEwb({ ...empty(), ...r.ewb });
    setMode('form');
  }

  const summary = report.fields
    .filter((f) => f.status !== 'empty')
    .map((f) => `${f.label}: ${STATUS_STYLE[f.status].label}${f.status === 'match' ? '' : ` (invoice "${f.invoice}" / e-way bill "${f.ewb}")`}`)
    .join('\n');

  return (
    <div className="space-y-6">
      <div className="card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <Segmented
          name="cmp-mode"
          legend="How do you want to enter the details?"
          value={mode}
          onChange={setMode}
          options={[{ value: 'form', label: 'Side-by-side form' }, { value: 'paste', label: 'Paste two lines' }]}
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-ghost" onClick={() => { setInv(SAMPLE_INV); setEwb(SAMPLE_EWB); setMode('form'); }}>Load sample</button>
          <button type="button" className="btn-ghost" onClick={() => { setEwb({ ...inv }); }}>Copy invoice → e-way bill</button>
          <button type="button" className="btn-ghost" onClick={() => { setInv(empty()); setEwb(empty()); }}>Clear</button>
        </div>
      </div>

      {mode === 'paste' ? (
        <div className="card space-y-4 p-5 md:p-7">
          <div>
            <label htmlFor="cmp-paste" className="label">Paste the invoice line, then the e-way bill line</label>
            <textarea
              id="cmp-paste"
              className={`input min-h-[140px] font-mono text-xs ${pasteError ? 'input-error' : ''}`}
              value={paste}
              onChange={(e) => setPaste(e.target.value)}
              spellCheck={false}
              aria-describedby="cmp-paste-hint"
              aria-invalid={pasteError ? true : undefined}
            />
            <p id="cmp-paste-hint" className="mt-1 text-xs text-ink-faint">
              Tab- or comma-separated. Optional header line; without one, use this order: {COMPARE_FIELDS.map((f) => COMPARE_LABEL[f]).join(', ')}.
            </p>
            {pasteError && <p className="mt-1 text-xs font-medium text-red-600">{pasteError}</p>}
          </div>
          <button type="button" className="btn-primary" onClick={applyPaste}>Compare</button>
        </div>
      ) : (
        <form className="card overflow-hidden" onSubmit={(e) => e.preventDefault()} noValidate aria-label="Invoice and e-way bill details">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 border-b border-brand-900/10 bg-brand-50 px-4 py-3 text-sm font-bold text-ink md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_120px] md:px-6">
            <span className="hidden md:block">Field</span>
            <span>Invoice</span>
            <span>E-way bill</span>
            <span className="hidden md:block">Result</span>
          </div>
          <div className="divide-y divide-brand-900/10">
            {report.fields.map((f) => {
              const s = STATUS_STYLE[f.status];
              return (
                <div key={f.field} className="px-4 py-3 md:px-6">
                  <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)_120px] md:items-center">
                    <p className="col-span-2 flex items-center justify-between text-sm font-semibold text-ink md:col-span-1">
                      {f.label}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold md:hidden ${s.cls}`}>{s.label}</span>
                    </p>
                    <div>
                      <label htmlFor={`inv-${f.field}`} className="sr-only">{f.label} on invoice</label>
                      <input id={`inv-${f.field}`} className="input" value={inv[f.field] ?? ''} placeholder={PLACEHOLDER[f.field]} onChange={(e) => setInv({ ...inv, [f.field]: e.target.value })} spellCheck={false} />
                    </div>
                    <div>
                      <label htmlFor={`ewb-${f.field}`} className="sr-only">{f.label} on e-way bill</label>
                      <input
                        id={`ewb-${f.field}`}
                        className={`input ${f.status === 'mismatch' ? 'input-error' : ''}`}
                        value={ewb[f.field] ?? ''}
                        placeholder={PLACEHOLDER[f.field]}
                        onChange={(e) => setEwb({ ...ewb, [f.field]: e.target.value })}
                        aria-describedby={f.note ? `note-${f.field}` : undefined}
                        spellCheck={false}
                      />
                    </div>
                    <span className={`hidden w-fit rounded-full px-2.5 py-0.5 text-xs font-bold md:inline-block ${s.cls}`}>{s.label}</span>
                  </div>
                  {f.note && f.status !== 'empty' && (
                    <p id={`note-${f.field}`} className={`mt-2 text-sm md:ml-[192px] ${f.status === 'mismatch' ? 'text-red-700' : 'text-ink-soft'}`}>{f.note}</p>
                  )}
                </div>
              );
            })}
          </div>
          <div className="border-t border-brand-900/10 px-4 py-3 md:px-6">
            <label className="flex items-center gap-3 text-sm font-semibold text-ink">
              <input type="checkbox" className="h-5 w-5 accent-brand-700" checked={zeros} onChange={(e) => setZeros(e.target.checked)} />
              Treat leading zeros in document numbers as the same (INV-007 = INV-7)
            </label>
          </div>
        </form>
      )}

      {entered && (
        <section className={`rounded-3xl border-2 p-5 md:p-6 ${report.counts.mismatch ? 'border-red-400 bg-red-50' : report.ok ? 'border-brand-500 bg-brand-50' : 'border-amber-500 bg-amber-300/20'}`} aria-live="polite" aria-labelledby="cmp-result">
          <h2 id="cmp-result" className="font-display text-lg font-bold text-ink">
            {report.counts.mismatch
              ? `${report.counts.mismatch} mismatch${report.counts.mismatch > 1 ? 'es' : ''} found`
              : report.ok ? 'All entered fields match' : 'Some fields need a look'}
          </h2>
          <p className="mt-1 text-[15px] text-ink-soft">
            {report.counts.match} match · {report.counts.format} to check · {report.counts.mismatch} mismatch · {report.counts.missing} missing on one side.
            {report.counts.mismatch > 0 && ' Part A details cannot be edited after generation: cancel the e-way bill within 24 hours and generate a new one. A wrong vehicle number is fixed by updating Part B.'}
          </p>
          <div className="mt-3"><CopyButton text={summary} label="Copy summary" /></div>
        </section>
      )}
    </div>
  );
}
