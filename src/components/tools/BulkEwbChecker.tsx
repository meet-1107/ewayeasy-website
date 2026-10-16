'use client';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import {
  FIELD_LABEL, annotatedCsv, checkBulkText, rowsToCsv, sampleRows, type BulkReport, type RowStatus,
} from '@/lib/ewbBulk';
import { Segmented } from './ui';
import { todayIso } from './invoice/model';

type Filter = 'all' | RowStatus;

const STATUS_CHIP: Record<RowStatus, string> = {
  error: 'bg-red-100 text-red-700',
  warning: 'bg-amber-300/40 text-ink',
  ok: 'bg-brand-50 text-brand-700',
};
const STATUS_LABEL: Record<RowStatus, string> = { error: 'Error', warning: 'Warning', ok: 'OK' };

function download(name: string, text: string) {
  const blob = new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function BulkEwbChecker() {
  const [text, setText] = useState('');
  const [genDate, setGenDate] = useState('');
  const [report, setReport] = useState<BulkReport | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [status, setStatus] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setGenDate((d) => d || todayIso()); }, []);

  function announce(msg: string) {
    setStatus('');
    requestAnimationFrame(() => setStatus(msg));
  }

  function run(src = text, date = genDate) {
    if (!src.trim()) { setReport(null); announce('Paste your data or upload a CSV file first.'); return; }
    const r = checkBulkText(src, { generationDate: date || todayIso() });
    setReport(r);
    setFilter('all');
    announce(r.counts.total ? `Checked ${r.counts.total} rows: ${r.counts.error} with errors, ${r.counts.warning} with warnings, ${r.counts.ok} OK.` : 'No data rows found below the header line.');
    requestAnimationFrame(() => resultsRef.current?.focus());
  }

  function loadSample() {
    const d = genDate || todayIso();
    const csv = rowsToCsv(sampleRows(d));
    setText(csv);
    run(csv, d);
  }

  function onFile(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 5_000_000) { announce('That file is larger than 5 MB. Split it and check in parts.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const t = String(reader.result ?? '');
      setText(t);
      run(t);
    };
    reader.onerror = () => announce('Could not read the file. Save it as CSV (comma-separated) and try again.');
    reader.readAsText(f);
    e.target.value = '';
  }

  const rows = useMemo(() => (report ? report.rows.filter((r) => filter === 'all' || r.status === filter) : []), [report, filter]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border-2 border-amber-500 bg-amber-300/20 p-5 md:p-6" role="note">
        <p className="font-display text-lg font-bold text-ink">This checks your data. It does not generate e-way bills.</p>
        <p className="mt-1 text-[15px] text-ink-soft">
          Use it to clean up a sheet before you prepare the JSON with the official bulk generation tool on the{' '}
          <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-700 underline">e-way bill portal</a>{' '}
          or send it through your authorised GSP/ERP. It does not create the portal JSON. The E-Way Easy app works one invoice at a
          time: create the invoice, review and generate its e-way bill on your phone.
        </p>
      </div>

      <div className="card space-y-5 p-5 md:p-7">
        <div className="grid gap-4 sm:grid-cols-[220px_1fr] sm:items-end">
          <div>
            <label htmlFor="bulk-gen" className="label">Planned generation date</label>
            <input id="bulk-gen" type="date" className="input" value={genDate} onChange={(e) => setGenDate(e.target.value)} aria-describedby="bulk-gen-hint" />
          </div>
          <p id="bulk-gen-hint" className="text-xs text-ink-faint">Used for the 180-day document age check and future dates. Defaults to today.</p>
        </div>

        <div>
          <label htmlFor="bulk-text" className="label">Paste rows from Excel (include the header row)</label>
          <textarea
            id="bulk-text"
            className="input min-h-[180px] font-mono text-xs"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={'Supply type\tSub type\tDocument type\tDocument no\tDocument date\tFrom GSTIN\t…'}
            spellCheck={false}
            aria-describedby="bulk-text-hint"
          />
          <p id="bulk-text-hint" className="mt-1 text-xs text-ink-faint">
            One row per document. Columns are matched by name, in any order — download the template to see the expected headings.
            Data stays in your browser; nothing is uploaded.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary" onClick={() => run()}>Check data</button>
          <button type="button" className="btn-ghost" onClick={() => fileRef.current?.click()}>Upload .csv</button>
          <input ref={fileRef} type="file" accept=".csv,.txt,text/csv,text/plain" className="sr-only" onChange={onFile} aria-label="Upload CSV file" tabIndex={-1} />
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
          <button type="button" className="btn-ghost" onClick={() => download('eway-bill-bulk-check-template.csv', rowsToCsv(sampleRows(genDate || todayIso()).slice(0, 1)))}>Download template CSV</button>
          {(text || report) && <button type="button" className="btn-ghost" onClick={() => { setText(''); setReport(null); announce('Cleared.'); }}>Clear</button>}
        </div>
        <p className="text-xs text-ink-faint">Excel files: open in Excel and choose File → Save As → CSV, or copy the cells and paste them above.</p>
        <p className="sr-only" role="status" aria-live="polite">{status}</p>
        {status && <p className="text-sm font-medium text-brand-700" aria-hidden>{status}</p>}
      </div>

      {report && (
        <div ref={resultsRef} tabIndex={-1} className="space-y-6 outline-none" aria-label="Check results">
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {([
              ['Rows checked', report.counts.total, 'text-ink'],
              ['With errors', report.counts.error, 'text-red-600'],
              ['Warnings only', report.counts.warning, 'text-amber-700'],
              ['OK', report.counts.ok, 'text-brand-700'],
            ] as const).map(([l, n, c]) => (
              <div key={l} className="card p-4">
                <dt className="text-sm text-ink-soft">{l}</dt>
                <dd className={`font-display text-3xl font-bold tabular-nums ${c}`}>{n}</dd>
              </div>
            ))}
          </dl>

          {(report.missingColumns.length > 0 || report.unknownColumns.length > 0) && (
            <div className="rounded-2xl border border-amber-400/60 bg-amber-300/15 p-4 text-sm">
              {report.missingColumns.length > 0 && (
                <p><strong>Columns not found:</strong> {report.missingColumns.map((f) => FIELD_LABEL[f]).join(', ')}. Rows will show these as empty.</p>
              )}
              {report.unknownColumns.length > 0 && (
                <p className="mt-1 text-ink-soft"><strong>Ignored columns:</strong> {report.unknownColumns.join(', ')}</p>
              )}
            </div>
          )}

          {report.groups.length > 0 && (
            <section className="card p-5 md:p-6" aria-labelledby="fix-list">
              <h2 id="fix-list" className="font-display text-lg font-bold text-ink">Fix list</h2>
              <p className="mt-1 text-sm text-ink-soft">Issues grouped by type, with the spreadsheet line numbers (the header is line 1).</p>
              <ul className="mt-3 divide-y divide-brand-900/10">
                {report.groups.map((g) => (
                  <li key={g.code} className="flex flex-wrap items-baseline justify-between gap-2 py-2.5 text-sm">
                    <span>
                      <span className={`mr-2 rounded-full px-2 py-0.5 text-xs font-bold ${STATUS_CHIP[g.level]}`}>{g.level === 'error' ? 'Error' : 'Warning'}</span>
                      <span className="font-semibold text-ink">{g.label}</span>
                    </span>
                    <span className="text-ink-soft">{g.lines.length} row{g.lines.length > 1 ? 's' : ''}: line {g.lines.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="card p-5 md:p-6" aria-labelledby="row-results">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="row-results" className="font-display text-lg font-bold text-ink">Row-by-row results</h2>
              <button type="button" className="btn-ghost" onClick={() => download('eway-bill-bulk-check-results.csv', annotatedCsv(report))}>Download annotated CSV</button>
            </div>
            <Segmented
              name="bulk-filter"
              legend="Show"
              className="mt-4"
              value={filter}
              onChange={setFilter}
              options={[
                { value: 'all', label: `All (${report.counts.total})` },
                { value: 'error', label: `Errors (${report.counts.error})` },
                { value: 'warning', label: `Warnings (${report.counts.warning})` },
                { value: 'ok', label: `OK (${report.counts.ok})` },
              ]}
            />
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-brand-50 text-xs uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th scope="col" className="px-3 py-2">Line</th>
                    <th scope="col" className="px-3 py-2">Document</th>
                    <th scope="col" className="px-3 py-2">To GSTIN</th>
                    <th scope="col" className="px-3 py-2 text-right">Total value</th>
                    <th scope="col" className="px-3 py-2">Status</th>
                    <th scope="col" className="px-3 py-2">Messages</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 && (
                    <tr><td colSpan={6} className="px-3 py-6 text-center text-ink-faint">No rows in this view.</td></tr>
                  )}
                  {rows.map((r) => (
                    <tr key={r.index} className="border-t border-brand-900/10 align-top">
                      <td className="px-3 py-2 tabular-nums">{r.line}</td>
                      <td className="px-3 py-2">
                        <span className="font-semibold text-ink">{r.row.docNo || '—'}</span>
                        <span className="block text-xs text-ink-soft">{[r.row.docType, r.row.docDate].filter(Boolean).join(' · ')}</span>
                      </td>
                      <td className="px-3 py-2 font-mono text-xs">{r.row.toGstin || '—'}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{r.row.total || '—'}</td>
                      <td className="px-3 py-2"><span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${STATUS_CHIP[r.status]}`}>{STATUS_LABEL[r.status]}</span></td>
                      <td className="px-3 py-2">
                        {r.issues.length === 0 ? <span className="text-ink-faint">No issues found.</span> : (
                          <ul className="space-y-1">
                            {r.issues.map((i, k) => (
                              <li key={k} className={i.level === 'error' ? 'text-red-700' : 'text-ink-soft'}>
                                <span className="font-semibold">{i.level === 'error' ? 'Error' : 'Warning'} · {FIELD_LABEL[i.field as keyof typeof FIELD_LABEL] ?? i.field}:</span> {i.message}
                              </li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
