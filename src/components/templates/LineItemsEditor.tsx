'use client';
/** @jsxRuntime automatic */
import type { DocumentTotals } from '@/lib/templates/calc';
import { currencyInfo, formatMoney } from '@/lib/templates/currencies';
import { emptyLine, UNITS, type LineItem } from '@/lib/templates/model';
import type { TemplatePreset } from '@/lib/templates/presets';
import { Field } from './fields';

const GST_RATES = ['0', '0.25', '3', '5', '12', '18', '28', '40'];

export default function LineItemsEditor({
  items, preset, totals, currency, showTaxRate, onChange, onSaveProduct, announce,
}: {
  items: LineItem[];
  preset: TemplatePreset;
  totals: DocumentTotals;
  currency: string;
  showTaxRate: boolean;
  onChange: (items: LineItem[]) => void;
  onSaveProduct: (line: LineItem) => void;
  announce: (msg: string) => void;
}) {
  const L = preset.labels;
  const f = new Set(preset.lineFields);
  const sym = currencyInfo(currency).symbol.trim();
  const amountById = new Map(totals.lines.map((l) => [l.id, l.total]));

  const set = (id: string, p: Partial<LineItem>) => onChange(items.map((it) => (it.id === id ? { ...it, ...p } : it)));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    announce(`Line ${i + 1} moved ${dir < 0 ? 'up' : 'down'} to position ${j + 1}.`);
  };
  const duplicate = (i: number) => {
    const next = [...items];
    next.splice(i + 1, 0, { ...items[i], id: emptyLine().id });
    onChange(next);
    announce(`Line ${i + 1} duplicated as line ${i + 2}.`);
  };
  const remove = (i: number) => {
    onChange(items.length > 1 ? items.filter((_, k) => k !== i) : [emptyLine({ unit: preset.units })]);
    announce(`Line ${i + 1} removed.`);
  };

  return (
    <div className="space-y-3">
      <datalist id="tpl-units">{UNITS.map((u) => <option key={u} value={u} />)}</datalist>
      <datalist id="tpl-gst-rates">{GST_RATES.map((r) => <option key={r} value={r} />)}</datalist>
      {items.map((it, i) => {
        const e = totals.lineErrors[it.id] ?? {};
        const p = `line-${it.id}`;
        const amount = amountById.get(it.id);
        const btn = 'inline-flex h-9 min-w-9 items-center justify-center rounded-full border border-brand-900/15 bg-white px-2.5 text-sm font-semibold text-ink-soft hover:border-brand-700 hover:text-brand-700 disabled:opacity-40';
        return (
          <div key={it.id} className="rounded-2xl border border-brand-900/10 bg-white p-3.5" role="group" aria-label={`Line ${i + 1}`}>
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-bold text-ink">
                Line {i + 1}
                {amount !== undefined && <span className="ml-2 font-semibold tabular-nums text-brand-700">{formatMoney(amount, currency)}</span>}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className={btn} onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move line ${i + 1} up`}>↑</button>
                <button type="button" className={btn} onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label={`Move line ${i + 1} down`}>↓</button>
                <button type="button" className={btn} onClick={() => duplicate(i)} aria-label={`Duplicate line ${i + 1}`}>Duplicate</button>
                <button type="button" className={btn} onClick={() => onSaveProduct(it)} disabled={!it.description.trim()} aria-label={`Save line ${i + 1} to your product list`}>Save item</button>
                <button type="button" className={`${btn} !text-red-600`} onClick={() => remove(i)} aria-label={`Remove line ${i + 1}`}>Remove</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-6">
              {f.has('code') && preset.columns.findIndex((c) => c.key === 'code') < preset.columns.findIndex((c) => c.key === 'description') && (
                <Field id={`${p}-code`} className="col-span-2 sm:col-span-2" label={L.code} value={it.code} onChange={(v) => set(it.id, { code: v })} maxLength={40} />
              )}
              <Field id={`${p}-desc`} className="col-span-2 sm:col-span-4" label={L.description} value={it.description} onChange={(v) => set(it.id, { description: v })} error={e.description} maxLength={300} />
              {f.has('code') && preset.columns.findIndex((c) => c.key === 'code') > preset.columns.findIndex((c) => c.key === 'description') && (
                <Field id={`${p}-code`} className="col-span-2 sm:col-span-2" label={L.code} value={it.code} onChange={(v) => set(it.id, { code: v })} maxLength={40} />
              )}
              {f.has('details') && (
                <Field id={`${p}-details`} className="col-span-2 sm:col-span-6" label={L.details} value={it.details} onChange={(v) => set(it.id, { details: v })} maxLength={300} />
              )}
              {f.has('code2') && <Field id={`${p}-code2`} className="sm:col-span-2" label={L.code2} value={it.code2} onChange={(v) => set(it.id, { code2: v })} maxLength={20} />}
              {f.has('grade') && <Field id={`${p}-grade`} className="sm:col-span-2" label="Grade / material" value={it.grade} onChange={(v) => set(it.id, { grade: v })} maxLength={40} />}
              {f.has('deliveryDate') && <Field id={`${p}-dd`} type="date" className="sm:col-span-2" label="Delivery date" value={it.deliveryDate} onChange={(v) => set(it.id, { deliveryDate: v })} />}
              {f.has('origin') && <Field id={`${p}-origin`} className="sm:col-span-2" label="Country of origin" value={it.origin} onChange={(v) => set(it.id, { origin: v })} maxLength={40} />}
              {f.has('mrp') && <Field id={`${p}-mrp`} className="sm:col-span-2" label={`MRP (${sym})`} value={it.mrp} onChange={(v) => set(it.id, { mrp: v })} error={e.mrp} inputMode="decimal" />}
              <Field id={`${p}-qty`} className="sm:col-span-2" label={L.qty} value={it.qty} onChange={(v) => set(it.id, { qty: v })} error={e.qty} inputMode="decimal" />
              {f.has('unit') && <Field id={`${p}-unit`} className="sm:col-span-2" label="Unit" value={it.unit} onChange={(v) => set(it.id, { unit: v.toUpperCase().slice(0, 8) })} list="tpl-units" />}
              <Field id={`${p}-price`} className="sm:col-span-2" label={`${L.unitPrice} (${sym})`} value={it.unitPrice} onChange={(v) => set(it.id, { unitPrice: v })} error={e.unitPrice} inputMode="decimal" />
              {f.has('discountPct') && <Field id={`${p}-disc`} className="sm:col-span-2" label={preset.id === 'wholesale-invoice' ? 'Scheme discount %' : 'Discount %'} value={it.discountPct} onChange={(v) => set(it.id, { discountPct: v })} error={e.discountPct} inputMode="decimal" />}
              {showTaxRate && <Field id={`${p}-tax`} className="sm:col-span-2" label={`${totals.taxLabel || 'Tax'} rate %`} value={it.taxRatePct} onChange={(v) => set(it.id, { taxRatePct: v })} error={e.taxRatePct} inputMode="decimal" list="tpl-gst-rates" />}
            </div>
          </div>
        );
      })}
      <button type="button" className="btn-ghost w-full" onClick={() => { onChange([...items, emptyLine({ unit: items[items.length - 1]?.unit || preset.units, taxRatePct: items[items.length - 1]?.taxRatePct ?? '' })]); announce(`Line ${items.length + 1} added.`); }}>
        + Add line
      </button>
    </div>
  );
}
