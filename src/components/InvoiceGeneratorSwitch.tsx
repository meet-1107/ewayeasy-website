'use client';
import { useEffect, useState } from 'react';
import TemplateEditor from '@/components/templates/TemplateEditor';

type Mode = 'gst' | 'no-gst';

const MODES: { id: Mode; label: string; sub: string }[] = [
  { id: 'gst', label: 'With GST', sub: 'Tax invoice · CGST/SGST or IGST' },
  { id: 'no-gst', label: 'Without GST', sub: 'Simple bill · no tax columns' },
];

/** With GST / Without GST switch for the free invoice generator. `#without-gst` in the URL opens the non-GST bill. */
export default function InvoiceGeneratorSwitch() {
  const [mode, setMode] = useState<Mode>('gst');

  useEffect(() => {
    if (window.location.hash === '#without-gst') setMode('no-gst');
  }, []);

  function choose(m: Mode) {
    setMode(m);
    try { history.replaceState(null, '', m === 'no-gst' ? '#without-gst' : '#with-gst'); } catch {}
  }

  return (
    <div>
      <div role="tablist" aria-label="Invoice type" className="no-print grid grid-cols-2 gap-2 rounded-2xl border border-brand-900/10 bg-white p-1.5 shadow-card sm:inline-grid sm:min-w-[460px]">
        {MODES.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={mode === m.id}
            aria-controls="invoice-editor"
            onClick={() => choose(m.id)}
            className={`rounded-xl px-3 py-2.5 text-left transition ${mode === m.id ? 'bg-brand-700 text-white shadow' : 'text-ink hover:bg-brand-50'}`}
          >
            <span className="block font-display text-sm font-bold sm:text-base">{m.label}</span>
            <span className={`block text-[11px] leading-4 sm:text-xs ${mode === m.id ? 'text-brand-100' : 'text-ink-faint'}`}>{m.sub}</span>
          </button>
        ))}
      </div>
      <div id="invoice-editor" role="tabpanel" className="mt-5">
        {mode === 'gst' ? <TemplateEditor key="gst" templateId="gst-tax-invoice" /> : <TemplateEditor key="no-gst" templateId="simple-sales-invoice" />}
      </div>
    </div>
  );
}
