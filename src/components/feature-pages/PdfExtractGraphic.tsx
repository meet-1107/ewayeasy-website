/**
 * Illustrative "invoice PDF → fields read by the app → you review" graphic, drawn in HTML.
 * Sample data only (made-up business, obviously sample GSTIN). Not a screenshot of the app.
 */
const FIELDS: { label: string; value: string; flag?: string }[] = [
  { label: 'Buyer', value: 'Shree Ganesh Traders' },
  { label: 'Buyer GSTIN', value: '24ABCDE1234F1Z5' },
  { label: 'Items', value: 'PVC pipe 4" × 120 nos' },
  { label: 'HSN code', value: '3917', flag: 'Check' },
  { label: 'Taxable value', value: '₹1,20,000' },
  { label: 'GST + total', value: '₹21,600 · ₹1,41,600' },
];

export default function PdfExtractGraphic() {
  return (
    <figure className="mx-auto w-full max-w-4xl">
      <div
        role="img"
        aria-label="Illustration: a sample GST invoice PDF on the left, an arrow, and on the right the fields the app reads from it — buyer name, buyer GSTIN, items, HSN code, taxable value and totals — with the HSN code marked for checking during review."
        className="grid items-center gap-4 md:grid-cols-[1fr_auto_1.1fr]"
      >
        {/* Invoice PDF mock */}
        <div aria-hidden className="relative rounded-2xl border border-brand-900/10 bg-white p-5 shadow-lift">
          <span className="absolute -top-3 left-5 rounded-md bg-red-600 px-2 py-0.5 text-[11px] font-bold tracking-wide text-white">PDF</span>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-ink">Rajkot Pipe Works</p>
              <p className="text-[11px] text-ink-faint">Tax Invoice · INV/26-27/0142</p>
            </div>
            <p className="text-[11px] text-ink-faint">12-10-2026</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-ink-soft">
            <div>
              <p className="font-semibold text-ink">Bill To</p>
              <p>Shree Ganesh Traders</p>
              <p>GSTIN 24ABCDE1234F1Z5</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Ship To</p>
              <p>Godown, Morbi</p>
              <p>PIN 363641</p>
            </div>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-brand-900/10 text-[11px]">
            <div className="grid grid-cols-[1.6fr_0.7fr_0.6fr_0.9fr] bg-brand-50 px-2 py-1.5 font-semibold text-ink">
              <span>Item</span><span>HSN</span><span>Qty</span><span className="text-right">Amount</span>
            </div>
            <div className="grid grid-cols-[1.6fr_0.7fr_0.6fr_0.9fr] px-2 py-1.5 text-ink-soft">
              <span>PVC pipe 4&quot;</span><span>3917</span><span>120</span><span className="text-right">1,20,000</span>
            </div>
          </div>
          <div className="mt-3 space-y-1 text-right text-[11px] text-ink-soft">
            <p>IGST 18%: 21,600</p>
            <p className="font-bold text-ink">Total: ₹1,41,600</p>
          </div>
        </div>

        {/* Arrow */}
        <div aria-hidden className="flex items-center justify-center text-brand-600">
          <span className="rounded-full bg-brand-700 px-3 py-1 text-[11px] font-semibold text-white md:hidden">App reads ↓</span>
          <span className="hidden flex-col items-center gap-1 md:flex">
            <svg viewBox="0 0 48 24" className="h-6 w-12"><path d="M2 12h40m-8-8 8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[11px] font-semibold">App reads</span>
          </span>
        </div>

        {/* Extracted fields */}
        <div aria-hidden className="rounded-2xl bg-brand-900 p-5 text-white shadow-lift">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">Read from the PDF · you review</p>
          <dl className="mt-3 divide-y divide-white/10">
            {FIELDS.map((f) => (
              <div key={f.label} className="flex items-center justify-between gap-3 py-2 text-sm">
                <dt className="text-brand-100/80">{f.label}</dt>
                <dd className="flex items-center gap-2 text-right font-medium">
                  {f.value}
                  {f.flag && (
                    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-brand-950">{f.flag}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-xs text-brand-100/90">
            Correct anything that is wrong, then tap Generate.
          </p>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">
        Illustration with sample data (made-up business and sample GSTIN). Not an actual app screenshot.
      </figcaption>
    </figure>
  );
}
