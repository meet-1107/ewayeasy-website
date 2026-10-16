'use client';
import { useMemo, useState } from 'react';
import { calculateGst, formatINR, formatRate, parseAmount, type GstResult, type SupplyType, type TaxMode } from '@/lib/money';
import RatePicker, { DEFAULT_RATE, RateNote, resolveRate, type RateState } from './RatePicker';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

function useSide(mode: TaxMode, amount: string, rateBp: number | null, supply: SupplyType) {
  return useMemo((): { error: string | null; result: GstResult | null } => {
    if (!amount.trim()) return { error: 'Enter an amount.', result: null };
    const amt = parseAmount(amount);
    if (amt === null) return { error: 'Enter a valid amount, up to 2 decimals.', result: null };
    if (amt <= 0) return { error: 'Amount must be more than zero.', result: null };
    if (rateBp === null) return { error: null, result: null };
    return { error: null, result: calculateGst(amt, rateBp, mode, supply) };
  }, [mode, amount, rateBp, supply]);
}

function Breakdown({ r }: { r: GstResult }) {
  const half = formatRate(r.rateBp / 2);
  return (
    <dl className="mt-3 text-[15px]">
      <ResultRow label="Taxable value (excl. GST)" value={formatINR(r.taxable)} />
      {r.supply === 'intra' ? (
        <>
          <ResultRow label={`CGST @ ${half}`} value={formatINR(r.cgst)} muted />
          <ResultRow label={`SGST / UTGST @ ${half}`} value={formatINR(r.sgst)} muted />
        </>
      ) : (
        <ResultRow label={`IGST @ ${formatRate(r.rateBp)}`} value={formatINR(r.igst)} muted />
      )}
      <ResultRow label="Total GST" value={formatINR(r.gst)} />
      <ResultRow label="Amount incl. GST" value={formatINR(r.total)} strong />
    </dl>
  );
}

export default function InclusiveExclusiveCalculator() {
  const [rate, setRate] = useState<RateState>(DEFAULT_RATE);
  const [supply, setSupply] = useState<SupplyType>('intra');
  const [incl, setIncl] = useState('11800');
  const [excl, setExcl] = useState('10000');
  const r = resolveRate(rate);
  const a = useSide('inclusive', incl, r.bp, supply);
  const b = useSide('exclusive', excl, r.bp, supply);

  const summary = (x: GstResult, title: string) =>
    `${title} @ ${formatRate(x.rateBp)}: taxable ${formatINR(x.taxable)}, GST ${formatINR(x.gst)}, total ${formatINR(x.total)}`;

  return (
    <div className="space-y-6">
      <div className="card space-y-5 p-5 md:p-7">
        <RatePicker id="ie" value={rate} onChange={setRate} error={r.error} />
        <RateNote />
        <Segmented
          name="ie-supply"
          legend="Type of supply"
          value={supply}
          onChange={setSupply}
          options={[
            { value: 'intra', label: 'Within state (CGST + SGST)' },
            { value: 'inter', label: 'Inter-state (IGST)' },
          ]}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="card p-5 md:p-7" aria-labelledby="ie-a">
          <p className="eyebrow">Inclusive → exclusive</p>
          <h2 id="ie-a" className="mt-1 font-display text-xl font-bold text-ink">Remove GST from a price</h2>
          <TextField
            id="ie-incl"
            className="mt-4"
            label="Price including GST"
            prefix="₹"
            inputMode="decimal"
            value={incl}
            onChange={(e) => setIncl(e.target.value)}
            error={a.error}
          />
          <div aria-live="polite" aria-atomic="true">
            {a.result && <Breakdown r={a.result} />}
            {a.result && (
              <p className="mt-3 text-sm text-ink-soft">
                {formatINR(a.result.total)} × 100 ÷ (100 + {a.result.rateBp / 100}) = {formatINR(a.result.taxable)}
              </p>
            )}
          </div>
          {a.result && <div className="mt-4"><CopyButton text={summary(a.result, 'GST removed')} /></div>}
        </section>

        <section className="card p-5 md:p-7" aria-labelledby="ie-b">
          <p className="eyebrow">Exclusive → inclusive</p>
          <h2 id="ie-b" className="mt-1 font-display text-xl font-bold text-ink">Add GST to a price</h2>
          <TextField
            id="ie-excl"
            className="mt-4"
            label="Price before GST"
            prefix="₹"
            inputMode="decimal"
            value={excl}
            onChange={(e) => setExcl(e.target.value)}
            error={b.error}
          />
          <div aria-live="polite" aria-atomic="true">
            {b.result && <Breakdown r={b.result} />}
            {b.result && (
              <p className="mt-3 text-sm text-ink-soft">
                {formatINR(b.result.taxable)} + {formatINR(b.result.taxable)} × {formatRate(b.result.rateBp)} = {formatINR(b.result.total)}
              </p>
            )}
          </div>
          {b.result && <div className="mt-4"><CopyButton text={summary(b.result, 'GST added')} /></div>}
        </section>
      </div>
    </div>
  );
}
