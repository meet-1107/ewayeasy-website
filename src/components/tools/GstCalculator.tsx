'use client';
import { useMemo, useState } from 'react';
import { calculateGst, formatINR, formatRate, parseAmount, parseRate, pct, type SupplyType, type TaxMode } from '@/lib/money';
import RatePicker, { DEFAULT_RATE, RateNote, resolveRate, type RateState } from './RatePicker';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

type DiscountType = 'none' | 'percent' | 'flat';

const initial = {
  amount: '10000',
  mode: 'exclusive' as TaxMode,
  supply: 'intra' as SupplyType,
  rate: DEFAULT_RATE as RateState,
  discountType: 'none' as DiscountType,
  discount: '',
};

export default function GstCalculator() {
  const [amount, setAmount] = useState(initial.amount);
  const [mode, setMode] = useState<TaxMode>(initial.mode);
  const [supply, setSupply] = useState<SupplyType>(initial.supply);
  const [rate, setRate] = useState<RateState>(initial.rate);
  const [discountType, setDiscountType] = useState<DiscountType>(initial.discountType);
  const [discount, setDiscount] = useState(initial.discount);

  const calc = useMemo(() => {
    const errors: { amount?: string; rate?: string; discount?: string } = {};
    const amt = parseAmount(amount);
    if (!amount.trim()) errors.amount = 'Enter an amount.';
    else if (amt === null) errors.amount = 'Enter a valid amount, up to 2 decimals (e.g. 12,500.50).';
    else if (amt <= 0) errors.amount = 'Amount must be more than zero.';
    const r = resolveRate(rate);
    if (r.error) errors.rate = r.error;

    let disc = 0;
    if (amt !== null && amt > 0 && discountType !== 'none') {
      if (!discount.trim()) disc = 0;
      else if (discountType === 'percent') {
        const bp = parseRate(discount);
        if (bp === null) errors.discount = 'Enter a discount between 0 and 100%.';
        else disc = pct(amt, bp);
      } else {
        const d = parseAmount(discount);
        if (d === null || d < 0) errors.discount = 'Enter a valid discount amount.';
        else if (d > amt) errors.discount = 'Discount cannot be more than the amount.';
        else disc = d;
      }
    }
    if (Object.keys(errors).length || amt === null || r.bp === null) return { errors, result: null };
    const net = amt - disc;
    const g = calculateGst(net, r.bp, mode, supply);
    return { errors, result: { ...g, original: amt, discount: disc, net } };
  }, [amount, mode, supply, rate, discountType, discount]);

  const res = calc.result;
  const rateTxt = res ? formatRate(res.rateBp) : '';
  const halfRate = res ? formatRate(res.rateBp / 2) : '';

  const formula = !res
    ? ''
    : mode === 'exclusive'
      ? `GST = ${formatINR(res.taxable)} × ${rateTxt} = ${formatINR(res.gst)}. Total = ${formatINR(res.taxable)} + ${formatINR(res.gst)} = ${formatINR(res.total)}.`
      : `Taxable value = ${formatINR(res.net)} × 100 ÷ (100 + ${res.rateBp / 100}) = ${formatINR(res.taxable)}. GST = ${formatINR(res.net)} − ${formatINR(res.taxable)} = ${formatINR(res.gst)}.`;

  const copyText = !res
    ? ''
    : [
        `GST calculation (${mode === 'exclusive' ? 'GST added' : 'GST removed'}, ${supply === 'intra' ? 'intra-state' : 'inter-state'}, ${rateTxt})`,
        `Original amount: ${formatINR(res.original)}`,
        res.discount ? `Discount: −${formatINR(res.discount)}` : '',
        `Taxable value: ${formatINR(res.taxable)}`,
        supply === 'intra'
          ? `CGST @ ${halfRate}: ${formatINR(res.cgst)}\nSGST/UTGST @ ${halfRate}: ${formatINR(res.sgst)}`
          : `IGST @ ${rateTxt}: ${formatINR(res.igst)}`,
        `Total GST: ${formatINR(res.gst)}`,
        `Final amount: ${formatINR(res.total)}`,
        formula,
      ].filter(Boolean).join('\n');

  function reset() {
    setAmount(initial.amount);
    setMode(initial.mode);
    setSupply(initial.supply);
    setRate(initial.rate);
    setDiscountType(initial.discountType);
    setDiscount(initial.discount);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <form className="card no-print space-y-6 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
        <Segmented
          name="gst-mode"
          legend="What do you want to do?"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'exclusive', label: 'Add GST (price excludes GST)' },
            { value: 'inclusive', label: 'Remove GST (price includes GST)' },
          ]}
        />
        <TextField
          id="gst-amount"
          label={mode === 'exclusive' ? 'Amount before GST' : 'Amount including GST'}
          prefix="₹"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={calc.errors.amount}
          placeholder="e.g. 25,000"
        />
        <div className="space-y-3">
          <RatePicker id="gst" value={rate} onChange={setRate} error={calc.errors.rate} />
          <RateNote />
        </div>
        <Segmented
          name="gst-supply"
          legend="Type of supply"
          value={supply}
          onChange={setSupply}
          options={[
            { value: 'intra', label: 'Within state (CGST + SGST)' },
            { value: 'inter', label: 'Inter-state (IGST)' },
          ]}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="gst-discount-type" className="label">Discount (optional)</label>
            <select id="gst-discount-type" className="input" value={discountType} onChange={(e) => setDiscountType(e.target.value as DiscountType)}>
              <option value="none">No discount</option>
              <option value="percent">Percentage (%)</option>
              <option value="flat">Flat amount (₹)</option>
            </select>
          </div>
          {discountType !== 'none' && (
            <TextField
              id="gst-discount"
              label={discountType === 'percent' ? 'Discount %' : 'Discount amount'}
              prefix={discountType === 'flat' ? '₹' : undefined}
              suffix={discountType === 'percent' ? '%' : undefined}
              inputMode="decimal"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              error={calc.errors.discount}
              hint={mode === 'inclusive' ? 'Applied to the GST-inclusive price.' : 'Applied before GST.'}
            />
          )}
        </div>
      </form>

      <section className="card print-area p-5 md:p-7" aria-labelledby="gst-result-heading">
        <p className="hidden text-sm text-ink-soft print:block">E-Way Easy — GST calculation summary</p>
        <h2 id="gst-result-heading" className="font-display text-xl font-bold text-ink">Result</h2>
        <div aria-live="polite" aria-atomic="true">
          {res ? (
            <>
              <dl className="mt-3 text-[15px]">
                <ResultRow label="Original amount" value={formatINR(res.original)} />
                {res.discount > 0 && <ResultRow label="Discount" value={`− ${formatINR(res.discount)}`} />}
                <ResultRow label="Taxable value" value={formatINR(res.taxable)} />
                {supply === 'intra' ? (
                  <>
                    <ResultRow label={`CGST @ ${halfRate}`} value={formatINR(res.cgst)} muted />
                    <ResultRow label={`SGST / UTGST @ ${halfRate}`} value={formatINR(res.sgst)} muted />
                  </>
                ) : (
                  <ResultRow label={`IGST @ ${rateTxt}`} value={formatINR(res.igst)} muted />
                )}
                <ResultRow label={`Total GST @ ${rateTxt}`} value={formatINR(res.gst)} />
                <ResultRow label="Final amount" value={formatINR(res.total)} strong />
              </dl>
              <p className="mt-4 rounded-xl bg-cream px-3.5 py-3 text-sm leading-6 text-ink-soft">
                <span className="font-semibold text-ink">Formula: </span>{formula}
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">Fix the highlighted fields to see the result.</p>
          )}
        </div>
        <div className="no-print mt-5 flex flex-wrap gap-2">
          <CopyButton text={copyText} className="btn-primary" />
          <button type="button" className="btn-ghost" onClick={() => window.print()} disabled={!res}>Print summary</button>
          <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}
