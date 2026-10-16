'use client';
import { useMemo, useRef, useState } from 'react';
import {
  amountInWords, calculateInvoice, formatINR, formatRate, parseAmount, parseQty, parseRate,
  type LineInput, type SupplyType,
} from '@/lib/money';
import RatePicker, { RATE_PRESETS, RateNote, resolveRate, type RateState } from './RatePicker';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

interface Row {
  id: number;
  description: string;
  qty: string;
  rate: string;
  discount: string;
  gst: RateState;
}

type RowErrors = Partial<Record<'qty' | 'rate' | 'discount' | 'gst', string>>;

const blankRow = (id: number): Row => ({ id, description: '', qty: '1', rate: '', discount: '', gst: { choice: '18', custom: '' } });

const SAMPLE: Omit<Row, 'id'>[] = [
  { description: 'Vitrified floor tiles 600×600 (box)', qty: '40', rate: '850', discount: '5', gst: { choice: '18', custom: '' } },
  { description: 'Tile adhesive 20 kg bag', qty: '25', rate: '420', discount: '', gst: { choice: '18', custom: '' } },
  { description: 'Packaged drinking water (case)', qty: '10', rate: '120', discount: '', gst: { choice: '5', custom: '' } },
  { description: 'Printed instruction booklet', qty: '50', rate: '12.50', discount: '10', gst: { choice: '0', custom: '' } },
];

export default function MultiItemGstCalculator() {
  const nextId = useRef(2);
  const [rows, setRows] = useState<Row[]>([blankRow(1)]);
  const [supply, setSupply] = useState<SupplyType>('intra');
  const [freight, setFreight] = useState('');
  const [freightRate, setFreightRate] = useState<RateState>({ choice: '18', custom: '' });
  const [roundOff, setRoundOff] = useState(true);

  function update(id: number, patch: Partial<Row>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }
  function addRow() {
    setRows((rs) => [...rs, blankRow(nextId.current++)]);
  }
  function removeRow(id: number) {
    setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  }
  function loadSample() {
    setRows(SAMPLE.map((s) => ({ ...s, id: nextId.current++ })));
    setFreight('1500');
    setFreightRate({ choice: '18', custom: '' });
  }
  function reset() {
    setRows([blankRow(nextId.current++)]);
    setSupply('intra');
    setFreight('');
    setFreightRate({ choice: '18', custom: '' });
    setRoundOff(true);
  }

  const calc = useMemo(() => {
    const rowErrors: Record<number, RowErrors> = {};
    const lines: LineInput[] = [];
    let ok = true;
    let anyFilled = false;
    rows.forEach((r) => {
      const e: RowErrors = {};
      const qty = parseQty(r.qty);
      if (!r.qty.trim()) e.qty = 'Enter quantity.';
      else if (qty === null) e.qty = 'Up to 3 decimals.';
      else if (qty <= 0) e.qty = 'Must be more than 0.';
      const rate = parseAmount(r.rate);
      if (!r.rate.trim()) e.rate = 'Enter rate.';
      else if (rate === null || rate < 0) e.rate = 'Enter a valid rate.';
      let discBp = 0;
      if (r.discount.trim()) {
        const d = parseRate(r.discount);
        if (d === null) e.discount = '0 to 100%.';
        else discBp = d;
      }
      const g = resolveRate(r.gst);
      if (g.error) e.gst = g.error;
      if (r.rate.trim()) anyFilled = true;
      if (Object.keys(e).length) { rowErrors[r.id] = e; ok = false; return; }
      lines.push({ qtyMilli: qty!, rate: rate!, discountBp: discBp, gstBp: g.bp! });
    });

    let freightErr: string | undefined;
    let freightRateErr: string | undefined;
    let freightLine: LineInput | null = null;
    if (freight.trim()) {
      const f = parseAmount(freight);
      if (f === null || f < 0) freightErr = 'Enter a valid amount, up to 2 decimals.';
      const fr = resolveRate(freightRate);
      if (fr.error) freightRateErr = fr.error;
      if (!freightErr && !freightRateErr && f! > 0) freightLine = { qtyMilli: 1000, rate: f!, gstBp: fr.bp! };
      if (freightErr || freightRateErr) ok = false;
    }

    if (!ok || !lines.length) return { rowErrors, freightErr, freightRateErr, anyFilled, inv: null, itemCount: lines.length };
    const all = freightLine ? [...lines, freightLine] : lines;
    const inv = calculateInvoice(all, supply, { roundToRupee: roundOff });
    return { rowErrors, freightErr, freightRateErr, anyFilled, inv, itemCount: lines.length, hasFreight: !!freightLine, allLines: all };
  }, [rows, supply, freight, freightRate, roundOff]);

  const inv = calc.inv;
  // Only show row errors once the user has started entering rates, so the blank first row isn't red.
  const showErrors = calc.anyFilled;
  const lineName = (i: number) =>
    i < calc.itemCount ? rows[i]?.description.trim() || `Item ${i + 1}` : 'Freight / other charges';

  const copyText = !inv
    ? ''
    : [
        `Multi-item GST calculation (${supply === 'intra' ? 'intra-state: CGST + SGST' : 'inter-state: IGST'})`,
        ...inv.lines.map((l, i) => `${lineName(i)}: taxable ${formatINR(l.taxable)}, GST @ ${formatRate(calc.allLines![i].gstBp)} ${formatINR(l.tax)}, total ${formatINR(l.total)}`),
        '',
        'Rate-wise summary:',
        ...inv.taxByRate.map((t) => supply === 'intra'
          ? `${formatRate(t.rateBp)}: taxable ${formatINR(t.taxable)}, CGST ${formatINR(t.cgst)}, SGST ${formatINR(t.sgst)}`
          : `${formatRate(t.rateBp)}: taxable ${formatINR(t.taxable)}, IGST ${formatINR(t.igst)}`),
        '',
        `Total taxable value: ${formatINR(inv.taxable)}`,
        supply === 'intra' ? `CGST: ${formatINR(inv.cgst)}\nSGST/UTGST: ${formatINR(inv.sgst)}` : `IGST: ${formatINR(inv.igst)}`,
        `Total GST: ${formatINR(inv.tax)}`,
        inv.roundOff ? `Round off: ${inv.roundOff > 0 ? '+' : '−'}${formatINR(Math.abs(inv.roundOff))}` : '',
        `Grand total: ${formatINR(inv.total)}`,
        amountInWords(inv.total),
      ].filter((s) => s !== '').join('\n');

  return (
    <div className="space-y-6">
      <form className="card no-print space-y-6 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <Segmented
            name="mi-supply"
            legend="Type of supply"
            value={supply}
            onChange={setSupply}
            options={[
              { value: 'intra', label: 'Within state (CGST + SGST)' },
              { value: 'inter', label: 'Inter-state (IGST)' },
            ]}
          />
          <button type="button" className="btn-ghost" onClick={loadSample}>Load sample data</button>
        </div>

        <fieldset>
          <legend className="label">Items (rates exclude GST)</legend>
          <ol className="space-y-3">
            {rows.map((r, i) => {
              const e = showErrors ? calc.rowErrors[r.id] ?? {} : {};
              const p = `mi-${r.id}`;
              return (
                <li key={r.id} className="rounded-2xl border border-brand-900/10 bg-cream/40 p-3.5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">Item {i + 1}</span>
                    <button
                      type="button"
                      className="text-sm font-semibold text-red-700 underline disabled:cursor-not-allowed disabled:text-ink-faint disabled:no-underline"
                      onClick={() => removeRow(r.id)}
                      disabled={rows.length === 1}
                      aria-label={`Remove item ${i + 1}`}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1.3fr)]">
                    <TextField id={`${p}-desc`} label="Description" value={r.description} onChange={(ev) => update(r.id, { description: ev.target.value })} placeholder="e.g. Ceramic tiles" className="sm:col-span-2 lg:col-span-1" />
                    <TextField id={`${p}-qty`} label="Qty" inputMode="decimal" value={r.qty} onChange={(ev) => update(r.id, { qty: ev.target.value })} error={e.qty} />
                    <TextField id={`${p}-rate`} label="Rate / unit" prefix="₹" inputMode="decimal" value={r.rate} onChange={(ev) => update(r.id, { rate: ev.target.value })} error={e.rate} placeholder="0.00" />
                    <TextField id={`${p}-disc`} label="Discount" suffix="%" inputMode="decimal" value={r.discount} onChange={(ev) => update(r.id, { discount: ev.target.value })} error={e.discount} placeholder="0" />
                    <div>
                      <label htmlFor={`${p}-gst`} className="label">GST rate</label>
                      <div className="flex gap-2">
                        <select
                          id={`${p}-gst`}
                          className={`input ${e.gst ? 'input-error' : ''}`}
                          value={r.gst.choice}
                          onChange={(ev) => update(r.id, { gst: { ...r.gst, choice: ev.target.value } })}
                          aria-describedby={e.gst ? `${p}-gst-error` : undefined}
                        >
                          {RATE_PRESETS.map((x) => <option key={x} value={x}>{x}%</option>)}
                          <option value="custom">Custom</option>
                        </select>
                        {r.gst.choice === 'custom' && (
                          <input
                            className={`input w-24 ${e.gst ? 'input-error' : ''}`}
                            inputMode="decimal"
                            aria-label={`Custom GST rate for item ${i + 1} (%)`}
                            value={r.gst.custom}
                            onChange={(ev) => update(r.id, { gst: { ...r.gst, custom: ev.target.value } })}
                            placeholder="%"
                            aria-invalid={e.gst ? true : undefined}
                          />
                        )}
                      </div>
                      {e.gst && <p id={`${p}-gst-error`} className="mt-1 text-xs font-medium text-red-600">{e.gst}</p>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <button type="button" className="btn-ghost mt-3" onClick={addRow}>+ Add item</button>
        </fieldset>

        <div className="grid gap-5 lg:grid-cols-2">
          <TextField
            id="mi-freight"
            label="Freight / other charges (optional, before GST)"
            prefix="₹"
            inputMode="decimal"
            value={freight}
            onChange={(e) => setFreight(e.target.value)}
            error={calc.freightErr}
            hint="Freight, packing or loading charged on the invoice. GST is added at the rate you choose."
            placeholder="e.g. 1,500"
          />
          {freight.trim() !== '' && (
            <RatePicker id="mi-freight" legend="GST rate on freight / other charges" value={freightRate} onChange={setFreightRate} error={calc.freightRateErr} />
          )}
        </div>

        <div className="flex items-start gap-3">
          <input id="mi-round" type="checkbox" className="mt-1 h-5 w-5 accent-brand-700" checked={roundOff} onChange={(e) => setRoundOff(e.target.checked)} />
          <label htmlFor="mi-round" className="text-sm text-ink">
            <span className="font-semibold">Round grand total to the nearest rupee</span>
            <span className="block text-ink-soft">The difference is shown as a separate round-off line.</span>
          </label>
        </div>
        <RateNote />
      </form>

      <section className="card print-area p-5 md:p-7" aria-labelledby="mi-result-heading">
        <p className="hidden text-sm text-ink-soft print:block">E-Way Easy — multi-item GST calculation</p>
        <h2 id="mi-result-heading" className="font-display text-xl font-bold text-ink">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {inv ? (
            <>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <caption className="sr-only">Line-wise taxable value, GST and total</caption>
                  <thead className="border-b border-brand-900/10 text-ink-soft">
                    <tr>
                      <th scope="col" className="py-2 pr-3 font-semibold">Item</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Taxable</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">GST rate</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">GST</th>
                      <th scope="col" className="py-2 text-right font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {inv.lines.map((l, i) => (
                      <tr key={i} className="border-b border-brand-900/5">
                        <th scope="row" className="py-2 pr-3 font-medium text-ink">
                          {lineName(i)}
                          {l.discount > 0 && <span className="block text-xs font-normal text-ink-faint">Discount {formatINR(l.discount)} on {formatINR(l.gross)}</span>}
                        </th>
                        <td className="py-2 pr-3 text-right">{formatINR(l.taxable)}</td>
                        <td className="py-2 pr-3 text-right">{formatRate(calc.allLines![i].gstBp)}</td>
                        <td className="py-2 pr-3 text-right">{formatINR(l.tax)}</td>
                        <td className="py-2 text-right font-semibold text-ink">{formatINR(l.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-6 font-semibold text-ink">Rate-wise summary</h3>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <caption className="sr-only">GST summary by rate</caption>
                  <thead className="border-b border-brand-900/10 text-ink-soft">
                    <tr>
                      <th scope="col" className="py-2 pr-3 font-semibold">GST rate</th>
                      <th scope="col" className="py-2 pr-3 text-right font-semibold">Taxable value</th>
                      {supply === 'intra' ? (
                        <>
                          <th scope="col" className="py-2 pr-3 text-right font-semibold">CGST</th>
                          <th scope="col" className="py-2 text-right font-semibold">SGST / UTGST</th>
                        </>
                      ) : (
                        <th scope="col" className="py-2 text-right font-semibold">IGST</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="tabular-nums">
                    {inv.taxByRate.map((t) => (
                      <tr key={t.rateBp} className="border-b border-brand-900/5">
                        <th scope="row" className="py-2 pr-3 font-medium text-ink">{formatRate(t.rateBp)}</th>
                        <td className="py-2 pr-3 text-right">{formatINR(t.taxable)}</td>
                        {supply === 'intra' ? (
                          <>
                            <td className="py-2 pr-3 text-right">{formatINR(t.cgst)}</td>
                            <td className="py-2 text-right">{formatINR(t.sgst)}</td>
                          </>
                        ) : (
                          <td className="py-2 text-right">{formatINR(t.igst)}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <dl className="mt-5 max-w-md text-[15px] sm:ml-auto">
                <ResultRow label="Total taxable value" value={formatINR(inv.taxable)} />
                {inv.discount > 0 && <ResultRow label="(Discount given)" value={formatINR(inv.discount)} muted />}
                {supply === 'intra' ? (
                  <>
                    <ResultRow label="CGST" value={formatINR(inv.cgst)} muted />
                    <ResultRow label="SGST / UTGST" value={formatINR(inv.sgst)} muted />
                  </>
                ) : (
                  <ResultRow label="IGST" value={formatINR(inv.igst)} muted />
                )}
                <ResultRow label="Total GST" value={formatINR(inv.tax)} />
                {inv.roundOff !== 0 && <ResultRow label="Round off" value={`${inv.roundOff > 0 ? '+ ' : '− '}${formatINR(Math.abs(inv.roundOff))}`} muted />}
                <ResultRow label="Grand total" value={formatINR(inv.total)} strong />
              </dl>
              <p className="mt-3 rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
                <span className="font-semibold text-ink">In words: </span>{amountInWords(inv.total)}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">
              {showErrors ? 'Fix the highlighted fields to see the result.' : 'Enter at least one item with a rate, or load the sample data.'}
            </p>
          )}
        </div>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <CopyButton text={copyText} className="btn-primary" />
          <button type="button" className="btn-ghost" onClick={() => window.print()} disabled={!inv}>Print summary</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}
