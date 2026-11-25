'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { estimateDistance, lookupPin, validatePin, type PinData } from '@/lib/pinDistance';
import { validityDays, SAME_PIN_MAX_KM, MAX_DISTANCE_KM } from '@/lib/validity';
import { TextField } from './ui';

/** PIN-to-PIN distance estimate. Loads the PIN location file (≈600 KB) only when the tool is used. */
export default function PinDistanceFinder({ onUse }: { onUse: (km: number) => void }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [data, setData] = useState<PinData | null>(null);
  const [loadError, setLoadError] = useState(false);
  const started = useRef(false);

  function load() {
    if (started.current) return;
    started.current = true;
    fetch('/data/pincodes.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(setData)
      .catch(() => setLoadError(true));
  }

  // Start loading once the user shows interest (typing), or right away if the page opens with values.
  useEffect(() => {
    if (from || to) load();
  }, [from, to]);

  const f = from.trim() ? validatePin(from) : null;
  const t = to.trim() ? validatePin(to) : null;
  const a = data && f && 'pin' in f ? lookupPin(data, f.pin) : null;
  const b = data && t && 'pin' in t ? lookupPin(data, t.pin) : null;
  const notFound = (v: typeof f, place: typeof a) => (data && v && 'pin' in v && !place ? 'PIN code not found in the India Post directory.' : null);
  const est = useMemo(() => (a && b ? estimateDistance(a, b) : null), [a, b]);
  const days = est && !est.samePin ? { low: validityDays(Math.min(est.low, MAX_DISTANCE_KM), 'normal'), high: validityDays(Math.min(est.high, MAX_DISTANCE_KM), 'normal') } : null;

  return (
    <section className="card p-5 md:p-7" aria-labelledby="pin-finder">
      <h2 id="pin-finder" className="font-display text-xl font-bold text-ink">PIN to PIN distance</h2>
      <p className="mt-1 text-sm leading-6 text-ink-soft">
        Enter the dispatch and delivery PIN codes to see both places and an estimated road distance. The figure the e-way
        bill portal calculates is the one that counts; use this to plan and to cross-check.
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <TextField
          id="pin-from"
          label="From PIN code (dispatch)"
          inputMode="numeric"
          maxLength={7}
          value={from}
          onFocus={load}
          onChange={(e) => setFrom(e.target.value)}
          error={(f && 'error' in f ? f.error : null) ?? notFound(f, a)}
          hint={a ? `${a.district}, ${a.state}` : 'For example 360001'}
        />
        <TextField
          id="pin-to"
          label="To PIN code (delivery)"
          inputMode="numeric"
          maxLength={7}
          value={to}
          onFocus={load}
          onChange={(e) => setTo(e.target.value)}
          error={(t && 'error' in t ? t.error : null) ?? notFound(t, b)}
          hint={b ? `${b.district}, ${b.state}` : 'For example 380001'}
        />
      </div>

      <div aria-live="polite" className="mt-5">
        {loadError && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-800">Could not load the PIN code list. Check your connection and try again.</p>}
        {!loadError && (from || to) && !data && <p className="text-sm text-ink-soft">Loading the PIN code list…</p>}
        {est && est.samePin && (
          <p className="rounded-2xl bg-cream p-4 text-[15px]">
            Same PIN code: you can enter the actual distance, up to {SAME_PIN_MAX_KM} km, in the e-way bill.
          </p>
        )}
        {est && !est.samePin && a && b && (
          <div className="rounded-2xl bg-cream p-4 md:p-5">
            <p className="text-sm text-ink-soft">{a.district}, {a.state} → {b.district}, {b.state}</p>
            <p className="mt-2 font-display text-3xl font-bold text-brand-700">
              ≈ {est.typical.toLocaleString('en-IN')} km <span className="text-base font-semibold text-ink-soft">by road (estimate)</span>
            </p>
            <dl className="mt-3 grid gap-1 text-[15px] sm:grid-cols-2">
              <div><dt className="inline text-ink-soft">Likely road range: </dt><dd className="inline font-semibold tabular-nums">{est.low.toLocaleString('en-IN')}–{est.high.toLocaleString('en-IN')} km</dd></div>
              <div><dt className="inline text-ink-soft">Straight line: </dt><dd className="inline font-semibold tabular-nums">{est.straight.toLocaleString('en-IN')} km</dd></div>
              {days && (
                <div className="sm:col-span-2"><dt className="inline text-ink-soft">Validity for normal cargo: </dt>
                  <dd className="inline font-semibold">{days.low === days.high ? `${days.low} day${days.low > 1 ? 's' : ''}` : `${days.low}–${days.high} days`}</dd></div>
              )}
            </dl>
            {est.high > MAX_DISTANCE_KM && <p className="mt-2 text-sm text-ink-soft">The portal accepts at most {MAX_DISTANCE_KM.toLocaleString('en-IN')} km.</p>}
            <button type="button" className="btn-primary mt-4" onClick={() => onUse(Math.min(est.typical, MAX_DISTANCE_KM))}>
              Use {Math.min(est.typical, MAX_DISTANCE_KM).toLocaleString('en-IN')} km below
            </button>
            <p className="mt-3 text-xs leading-5 text-ink-faint">
              Estimate from India Post PIN code locations (data.gov.in, Government Open Data License – India) with a typical
              road factor. Not the portal&apos;s official figure.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
