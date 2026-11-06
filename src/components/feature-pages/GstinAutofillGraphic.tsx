/**
 * Illustration of the app's buyer auto-fill: type the buyer GSTIN, name/address/state/PIN fill in, distance follows
 * from the PIN codes. Sample data only. Pure CSS animation (respects reduced motion via globals.css).
 */
const FILLED = [
  { label: 'Buyer name', value: 'Sample Traders Pvt Ltd' },
  { label: 'Address', value: '14, Market Yard Road' },
  { label: 'State', value: 'Maharashtra (27)' },
  { label: 'PIN code', value: '411001' },
];

export default function GstinAutofillGraphic() {
  return (
    <figure className="mx-auto w-full max-w-md">
      <div className="rounded-[1.75rem] border-2 border-ink bg-white p-5 shadow-[6px_6px_0_#16211C]">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-faint">Buyer (Bill to)</p>
        <div className="mt-3 rounded-xl border-2 border-brand-600 bg-brand-50/60 px-3 py-2.5">
          <p className="text-[11px] font-semibold text-brand-700">Buyer GSTIN</p>
          <p className="font-mono text-lg font-bold tracking-wider text-ink">
            <span className="ee-type inline-block overflow-hidden whitespace-nowrap align-bottom">27ABCDE1234F1Z0</span>
          </p>
        </div>
        <ul className="mt-3 space-y-2">
          {FILLED.map((f, i) => (
            <li key={f.label} className="ee-fill flex items-center justify-between gap-3 rounded-xl bg-cream px-3 py-2 text-sm" style={{ animationDelay: `${1.6 + i * 0.25}s` }}>
              <span className="text-ink-faint">{f.label}</span>
              <span className="text-right font-semibold text-ink">{f.value}</span>
            </li>
          ))}
        </ul>
        <div className="ee-fill mt-3 flex items-center justify-between rounded-xl bg-amber-300/40 px-3 py-2 text-sm" style={{ animationDelay: '2.8s' }}>
          <span className="font-semibold text-ink">Distance from PIN codes</span>
          <span className="font-display font-extrabold text-ink">Auto · editable</span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
          <span className="ee-pulse h-2 w-2 rounded-full bg-brand-500" /> Filled automatically from the GSTIN
        </p>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-faint">Illustration with sample data. In the E-Way Easy Android app.</figcaption>
    </figure>
  );
}
