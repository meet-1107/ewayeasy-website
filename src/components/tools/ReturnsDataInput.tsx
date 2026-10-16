'use client';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import { parseTable, toCsv } from '@/lib/csv';
import { MAX_ROWS } from '@/lib/returns';

/** Triggers a local download of a CSV string (nothing is uploaded). */
export function downloadCsv(filename: string, csv: string) {
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function PrivacyNote() {
  return (
    <p className="rounded-xl bg-brand-50 px-3.5 py-2.5 text-sm text-brand-800">
      Your data is processed in your browser and never uploaded.
    </p>
  );
}

/**
 * Paste-from-Excel / upload-CSV box for the returns tools. Shows which columns were detected and
 * which required ones are missing. Parsing for the actual check is done by the parent.
 */
export default function ReturnsDataInput({
  id, label, value, onChange, aliases, labels, required, sample, templateName, hint,
}: {
  id: string;
  label: ReactNode;
  value: string;
  onChange: (v: string) => void;
  aliases: Record<string, string[]>;
  labels: Record<string, string>;
  required: string[];
  sample: string;
  templateName: string;
  hint?: ReactNode;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileMsg, setFileMsg] = useState<string | null>(null);

  const info = useMemo(() => {
    if (!value.trim()) return null;
    const t = parseTable(value, aliases);
    const found = Object.keys(aliases).filter((k) => !t.missing.includes(k));
    return { rows: t.rows.length, found, missingRequired: t.missing.filter((m) => required.includes(m)), unknown: t.unknown };
  }, [value, aliases, required]);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > 10 * 1024 * 1024) { setFileMsg('File is larger than 10 MB. Split it and try again.'); return; }
    if (/\.xlsx?$/i.test(f.name)) { setFileMsg('Excel files cannot be read directly. Save as CSV, or copy the cells and paste them here.'); return; }
    const reader = new FileReader();
    reader.onload = () => { onChange(String(reader.result ?? '')); setFileMsg(`Loaded ${f.name}.`); };
    reader.onerror = () => setFileMsg('Could not read the file.');
    reader.readAsText(f);
  }

  const template = toCsv(Object.keys(aliases).map((k) => labels[k] ?? k), []);

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="label">{label}</label>
      <textarea
        id={id}
        className="input min-h-[160px] font-mono text-xs"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste from Excel (include the header row), or upload a .csv file"
        spellCheck={false}
        aria-describedby={`${id}-status`}
      />
      {hint && <p className="text-xs text-ink-faint">{hint}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-ghost" onClick={() => fileRef.current?.click()}>Upload .csv</button>
        <input ref={fileRef} type="file" accept=".csv,.txt,.tsv,text/csv" className="sr-only" tabIndex={-1} aria-hidden onChange={onFile} />
        <button type="button" className="btn-ghost" onClick={() => { onChange(sample); setFileMsg(null); }}>Load sample data</button>
        <button type="button" className="btn-ghost" onClick={() => downloadCsv(templateName, template)}>Download template CSV</button>
        {value && <button type="button" className="btn-ghost" onClick={() => { onChange(''); setFileMsg(null); }}>Clear</button>}
      </div>
      <div id={`${id}-status`} aria-live="polite" className="space-y-1 text-sm">
        {fileMsg && <p className="text-ink-soft">{fileMsg}</p>}
        {info && (
          <>
            <p className="text-ink-soft">
              <span className="font-semibold text-ink">{info.rows.toLocaleString('en-IN')} data rows.</span>{' '}
              Detected: {info.found.length ? info.found.map((k) => labels[k] ?? k).join(', ') : 'none'}.
            </p>
            {info.missingRequired.length > 0 && (
              <p className="font-medium text-red-600">Missing required columns: {info.missingRequired.map((k) => labels[k] ?? k).join(', ')}.</p>
            )}
            {info.unknown.length > 0 && <p className="text-xs text-ink-faint">Ignored columns: {info.unknown.join(', ')}</p>}
            {info.rows > MAX_ROWS && <p className="font-medium text-amber-700">Only the first {MAX_ROWS.toLocaleString('en-IN')} rows will be checked.</p>}
          </>
        )}
      </div>
    </div>
  );
}

export type Filter = 'all' | 'error' | 'warning' | 'ok';
