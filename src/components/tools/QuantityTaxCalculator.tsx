'use client';
import { useMemo, useState } from 'react';
import { calculateGst, calculateLine, formatINR, formatRate, parseAmount, parseQty, parseRate, pct, type SupplyType } from '@/lib/money';
import RatePicker, { DEFAULT_RATE, RateNote, resolveRate, type RateState } from './RatePicker';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

function amountError(raw: string, required = true): string | null {
  if (!raw.trim()) return required ? 'Required.' : null;
  const v = parseAmount(raw);
  if (v === null || v < 0) return 'Enter a valid amount, up to 2 decimals.';
  return null;
}
const amt = (raw: string) => (raw.trim() ? parseAmount(raw) ?? 0 : 0);

function SupplyToggle({ name, value, onChange }: { name: string; value: SupplyType; onChange: (v: SupplyType) => void }) {
  return (
    <Segmented
      name={name}
      legend="Type of supply"
      value={value}
      onChange={onChange}
      options={[
        { value: 'intra', label: 'Within state' },
        { value: 'inter', label: 'Inter-state' },
      ]}
    />
  );
}

function TaxRows({ cgst, sgst, igst, rateBp, supply }: { cgst: number; sgst: number; igst: number; rateBp: number; supply: SupplyType }) {
  return supply === 'intra' ? (
    <>
      <ResultRow label={`CGST @ ${formatRate(rateBp / 2)}`} value={formatINR(cgst)} muted />
      <ResultRow label={`SGST / UTGST @ ${formatRate(rateBp / 2)}`} value={formatINR(sgst)} muted />
    </>
  ) : (
    <ResultRow label={`IGST @ ${formatRate(rateBp)}`} value={formatINR(igst)} muted />
  );
}

/* ---------- 1. Quantity × rate ---------- */
function LineCalculator() {
  const [qty, setQty] = useState('25');
  const [unitRate, setUnitRate] = useState('480');
  const [disc, setDisc] = useState('5');
  const [rate, setRate] = useState<RateState>(DEFAULT_RATE);
  const [supply, setSupply] = useState<SupplyType>('intra');

  const calc = useMemo(() => {
    const errors: Record<string, string | null> = {};
    const q = parseQty(qty);
    errors.qty = !qty.trim() ? 'Required.' : q === null ? 'Enter a quantity with up to 3 decimals.' : q === 0 ? 'Quantity must be more than zero.' : null;
    errors.rate = amountError(unitRate);
    const d = disc.trim() ? parseRate(disc) : 0;
    errors.disc = d === null ? 'Enter a discount between 0 and 100%.' : null;
    const r = resolveRate(rate);
    errors.gst = r.error;
    if (Object.values(errors).some(Boolean) || q === null || d === null || r.bp === null) return { errors, res: null };
    const res = calculateLine({ qtyMilli: q, rate: amt(unitRate), discountBp: d, gstBp: r.bp }, supply);
    return { errors, res: { ...res, rateBp: r.bp, discBp: d } };
  }, [qty, unitRate, disc, rate, supply]);

  const res = calc.res;
  const copy = res
    ? `Qty ${qty} × ${formatINR(amt(unitRate))} = ${formatINR(res.gross)}; discount ${formatRate(res.discBp)} = ${formatINR(res.discount)}; taxable ${formatINR(res.taxable)}; GST ${formatRate(res.rateBp)} = ${formatINR(res.tax)}; total ${formatINR(res.total)}`
    : '';

  return (
    <section id="quantity" className="card scroll-mt-24 p-5 md:p-7" aria-labelledby="q-head">
      <h2 id="q-head" className="font-display text-xl font-bold text-ink">Quantity × rate with discount and GST</h2>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField id="q-qty" label="Quantity" inputMode="decimal" value={qty} onChange={(e) => setQty(e.target.value)} error={calc.errors.qty} />
            <TextField id="q-rate" label="Rate per unit" prefix="₹" inputMode="decimal" value={unitRate} onChange={(e) => setUnitRate(e.target.value)} error={calc.errors.rate} hint="Excluding GST" />
            <TextField id="q-disc" label="Discount" suffix="%" inputMode="decimal" value={disc} onChange={(e) => setDisc(e.target.value)} error={calc.errors.disc} />
          </div>
          <RatePicker id="q" value={rate} onChange={setRate} error={calc.errors.gst} />
          <SupplyToggle name="q-supply" value={supply} onChange={setSupply} />
        </div>
        <div className="rounded-2xl bg-cream p-4 md:p-5" aria-live="polite" aria-atomic="true">
          {res ? (
            <dl className="text-[15px]">
              <ResultRow label="Gross (qty × rate)" value={formatINR(res.gross)} />
              <ResultRow label={`Discount @ ${formatRate(res.discBp)}`} value={`− ${formatINR(res.discount)}`} />
              <ResultRow label="Taxable value" value={formatINR(res.taxable)} />
              <TaxRows cgst={res.cgst} sgst={res.sgst} igst={res.igst} rateBp={res.rateBp} supply={supply} />
              <ResultRow label="Total GST" value={formatINR(res.tax)} />
              <ResultRow label="Line total" value={formatINR(res.total)} strong />
            </dl>
          ) : (
            <p className="text-sm text-ink-soft">Fix the highlighted fields to see the result.</p>
          )}
          {res && <div className="mt-4"><CopyButton text={copy} /></div>}
        </div>
      </div>
    </section>
  );
}

/* ---------- 2. Taxable value ---------- */
function TaxableValueCalculator() {
  const [goods, setGoods] = useState('100000');
  const [packing, setPacking] = useState('1500');
  const [freight, setFreight] = useState('2500');
  const [other, setOther] = useState('');
  const [discount, setDiscount] = useState('4000');
  const [rate, setRate] = useState<RateState>(DEFAULT_RATE);
  const [supply, setSupply] = useState<SupplyType>('inter');

  const errors = {
    goods: amountError(goods),
    packing: amountError(packing, false),
    freight: amountError(freight, false),
    other: amountError(other, false),
    discount: amountError(discount, false),
  };
  const r = resolveRate(rate);
  const additions = amt(packing) + amt(freight) + amt(other);
  const gross = amt(goods) + additions;
  const discountTooBig = amt(discount) > gross;
  const ok = !Object.values(errors).some(Boolean) && r.bp !== null && !discountTooBig;
  const taxable = gross - amt(discount);
  const g = ok && r.bp !== null ? calculateGst(taxable, r.bp, 'exclusive', supply) : null;

  return (
    <section id="taxable-value" className="card scroll-mt-24 p-5 md:p-7" aria-labelledby="tv-head">
      <h2 id="tv-head" className="font-display text-xl font-bold text-ink">Taxable value calculator</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Charges such as packing and freight billed by the supplier are generally part of the taxable value; a discount
        shown on the invoice at the time of supply is generally deducted (Section 15, CGST Act — check the conditions).
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextField id="tv-goods" label="Value of goods / services" prefix="₹" inputMode="decimal" value={goods} onChange={(e) => setGoods(e.target.value)} error={errors.goods} />
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField id="tv-pack" label="Packing" prefix="₹" inputMode="decimal" value={packing} onChange={(e) => setPacking(e.target.value)} error={errors.packing} />
            <TextField id="tv-freight" label="Freight" prefix="₹" inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} error={errors.freight} />
            <TextField id="tv-other" label="Other charges" prefix="₹" inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} error={errors.other} />
          </div>
          <TextField
            id="tv-disc"
            label="Discount on invoice"
            prefix="₹"
            inputMode="decimal"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            error={errors.discount ?? (discountTooBig ? 'Discount cannot exceed the total of value and charges.' : null)}
          />
          <RatePicker id="tv" value={rate} onChange={setRate} error={r.error} />
          <SupplyToggle name="tv-supply" value={supply} onChange={setSupply} />
        </div>
        <div className="rounded-2xl bg-cream p-4 md:p-5" aria-live="polite" aria-atomic="true">
          {g ? (
            <dl className="text-[15px]">
              <ResultRow label="Value of goods" value={formatINR(amt(goods))} />
              <ResultRow label="Add: packing, freight, other" value={`+ ${formatINR(additions)}`} />
              <ResultRow label="Less: discount" value={`− ${formatINR(amt(discount))}`} />
              <ResultRow label="Taxable value" value={formatINR(g.taxable)} />
              <TaxRows cgst={g.cgst} sgst={g.sgst} igst={g.igst} rateBp={g.rateBp} supply={supply} />
              <ResultRow label="Invoice value" value={formatINR(g.total)} strong />
            </dl>
          ) : (
            <p className="text-sm text-ink-soft">Fix the highlighted fields to see the result.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Discount and tax ---------- */
function DiscountTaxBreakdown() {
  const [price, setPrice] = useState('2000');
  const [disc, setDisc] = useState('10');
  const [rate, setRate] = useState<RateState>({ choice: '5', custom: '' });

  const pErr = amountError(price);
  const dBp = disc.trim() ? parseRate(disc) : 0;
  const dErr = dBp === null ? 'Enter a discount between 0 and 100%.' : null;
  const r = resolveRate(rate);
  const ok = !pErr && !dErr && r.bp !== null && dBp !== null;

  const rows = ok
    ? (() => {
        const list = amt(price);
        const d = pct(list, dBp!);
        const before = calculateGst(list, r.bp!, 'exclusive', 'inter');
        const after = calculateGst(list - d, r.bp!, 'exclusive', 'inter');
        return { list, d, before, after };
      })()
    : null;

  return (
    <section id="discount-tax" className="card scroll-mt-24 p-5 md:p-7" aria-labelledby="dt-head">
      <h2 id="dt-head" className="font-display text-xl font-bold text-ink">Discount and tax breakdown</h2>
      <p className="mt-1 text-sm text-ink-soft">See how a discount given on the invoice changes the taxable value, the GST and the amount the buyer pays.</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField id="dt-price" label="List price (before GST)" prefix="₹" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} error={pErr} />
            <TextField id="dt-disc" label="Discount" suffix="%" inputMode="decimal" value={disc} onChange={(e) => setDisc(e.target.value)} error={dErr} />
          </div>
          <RatePicker id="dt" value={rate} onChange={setRate} error={r.error} />
        </div>
        <div aria-live="polite" aria-atomic="true">
          {rows ? (
            <div className="overflow-x-auto rounded-2xl border border-brand-900/10 bg-white">
              <table className="w-full min-w-[320px] text-left text-sm">
                <thead className="bg-brand-50 text-ink">
                  <tr><th className="px-3 py-2.5">&nbsp;</th><th className="px-3 py-2.5 text-right">No discount</th><th className="px-3 py-2.5 text-right">With discount</th></tr>
                </thead>
                <tbody className="tabular-nums">
                  <tr className="border-t border-brand-900/10"><td className="px-3 py-2">List price</td><td className="px-3 py-2 text-right">{formatINR(rows.list)}</td><td className="px-3 py-2 text-right">{formatINR(rows.list)}</td></tr>
                  <tr className="border-t border-brand-900/10"><td className="px-3 py-2">Discount</td><td className="px-3 py-2 text-right">{formatINR(0)}</td><td className="px-3 py-2 text-right">− {formatINR(rows.d)}</td></tr>
                  <tr className="border-t border-brand-900/10"><td className="px-3 py-2">Taxable value</td><td className="px-3 py-2 text-right">{formatINR(rows.before.taxable)}</td><td className="px-3 py-2 text-right">{formatINR(rows.after.taxable)}</td></tr>
                  <tr className="border-t border-brand-900/10"><td className="px-3 py-2">GST @ {formatRate(r.bp!)}</td><td className="px-3 py-2 text-right">{formatINR(rows.before.gst)}</td><td className="px-3 py-2 text-right">{formatINR(rows.after.gst)}</td></tr>
                  <tr className="border-t border-brand-900/10 font-bold text-ink"><td className="px-3 py-2">Buyer pays</td><td className="px-3 py-2 text-right">{formatINR(rows.before.total)}</td><td className="px-3 py-2 text-right">{formatINR(rows.after.total)}</td></tr>
                </tbody>
              </table>
              <p className="border-t border-brand-900/10 px-3 py-2.5 text-sm text-ink-soft">
                Buyer saves {formatINR(rows.before.total - rows.after.total)} in total, of which {formatINR(rows.before.gst - rows.after.gst)} is lower GST.
              </p>
            </div>
          ) : (
            <p className="text-sm text-ink-soft">Fix the highlighted fields to see the breakdown.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default function QuantityTaxCalculator() {
  return (
    <div className="space-y-6">
      <nav aria-label="Calculators on this page" className="flex flex-wrap gap-2">
        <a href="#quantity" className="chip">Quantity × rate</a>
        <a href="#taxable-value" className="chip">Taxable value</a>
        <a href="#discount-tax" className="chip">Discount and tax</a>
      </nav>
      <RateNote />
      <LineCalculator />
      <TaxableValueCalculator />
      <DiscountTaxBreakdown />
    </div>
  );
}
