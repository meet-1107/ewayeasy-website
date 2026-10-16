'use client';
import { useEffect, useState } from 'react';
import {
  DISTANCE_ALLOWANCE_PCT, MAX_DISTANCE_KM, SAME_PIN_MAX_KM, computeValidity, formatLocalDateTime, maxPermissibleDistance,
  parseLocalDateTime, toDateTimeLocalValue, validateDistance, type Cargo,
} from '@/lib/validity';
import { CopyButton, ResultRow, Segmented, TextField } from './ui';

export default function ValidityCalculator() {
  const [distance, setDistance] = useState('350');
  const [cargo, setCargo] = useState<Cargo>('normal');
  const [generated, setGenerated] = useState('');
  const [pinKm, setPinKm] = useState('');

  // Set "now" after mount so the static HTML and the client render match.
  useEffect(() => {
    setGenerated((g) => g || toDateTimeLocalValue(new Date()));
  }, []);

  const dist = validateDistance(distance);
  const genParsed = generated ? parseLocalDateTime(generated) : null;
  const genError = !generated ? 'Enter the date and time Part B was entered.' : !genParsed ? 'Enter a valid date and time.' : null;

  const result = 'error' in dist || !genParsed ? null : computeValidity(genParsed, dist.km, cargo);

  const pin = pinKm.trim() ? validateDistance(pinKm) : null;
  const pinMax = pin && 'km' in pin ? maxPermissibleDistance(pin.km) : null;

  const copy = result
    ? `E-way bill validity: ${result.km} km, ${cargo === 'odc' ? 'over-dimensional cargo' : 'normal cargo'} = ${result.days} day${result.days > 1 ? 's' : ''}. Generated ${formatLocalDateTime(result.generatedAt, false)}; valid till ${formatLocalDateTime(result.expiresAt)}. Extension window: ${formatLocalDateTime(result.extensionFrom)} to ${formatLocalDateTime(result.extensionTo)}.`
    : '';

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]">
        <form className="card space-y-6 p-5 md:p-7" onSubmit={(e) => e.preventDefault()} noValidate>
          <TextField
            id="v-distance"
            label="Distance"
            suffix="km"
            inputMode="numeric"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            error={'error' in dist ? dist.error : null}
            hint={`1 to ${MAX_DISTANCE_KM.toLocaleString('en-IN')} km, as entered in the e-way bill.`}
          />
          <Segmented
            name="v-cargo"
            legend="Type of cargo"
            value={cargo}
            onChange={setCargo}
            options={[
              { value: 'normal', label: 'Normal cargo (200 km/day)' },
              { value: 'odc', label: 'Over-dimensional cargo (20 km/day)' },
            ]}
          />
          <TextField
            id="v-generated"
            type="datetime-local"
            label="Generation date and time (Part B entered)"
            value={generated}
            onChange={(e) => setGenerated(e.target.value)}
            error={genError}
            hint="Validity counts from when the e-way bill becomes valid for movement — when Part B is first entered."
          />
        </form>

        <section className="card p-5 md:p-7" aria-labelledby="v-result">
          <h2 id="v-result" className="font-display text-xl font-bold text-ink">Validity</h2>
          <div aria-live="polite" aria-atomic="true">
            {result ? (
              <>
                <p className="mt-3 font-display text-4xl font-bold text-brand-700">
                  {result.days} day{result.days > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-ink-soft">
                  ceil({result.km} ÷ {cargo === 'odc' ? 20 : 200}) = {result.days}
                </p>
                <dl className="mt-4 text-[15px]">
                  <ResultRow label="Generated" value={formatLocalDateTime(result.generatedAt, false)} />
                  <ResultRow label="Valid till" value={formatLocalDateTime(result.expiresAt)} strong />
                </dl>
                <div className="mt-4 rounded-2xl bg-amber-300/20 p-4 text-sm leading-6 text-ink">
                  <p className="font-semibold">Extension window (8 hours before or after expiry)</p>
                  <p className="mt-1 tabular-nums">{formatLocalDateTime(result.extensionFrom)} → {formatLocalDateTime(result.extensionTo)}</p>
                  <p className="mt-1 text-ink-soft">Extension is allowed only for genuine reasons such as an accident, natural calamity or trans-shipment delay.</p>
                </div>
              </>
            ) : (
              <p className="mt-3 text-sm text-ink-soft">Fix the highlighted fields to see the validity.</p>
            )}
          </div>
          {result && <div className="mt-4"><CopyButton text={copy} /></div>}
        </section>
      </div>

      <section className="card p-5 md:p-7" aria-labelledby="v-pin">
        <h2 id="v-pin" className="font-display text-xl font-bold text-ink">10% distance allowance helper</h2>
        <p className="mt-1 text-sm leading-6 text-ink-soft">
          The e-way bill portal auto-calculates the PIN-to-PIN distance. You can enter the actual distance up to{' '}
          {DISTANCE_ALLOWANCE_PCT}% more than that figure. Enter the portal&apos;s PIN-to-PIN distance to see the maximum you can enter.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,260px)_1fr] sm:items-start">
          <TextField
            id="v-pinkm"
            label="PIN-to-PIN distance from the portal"
            suffix="km"
            inputMode="numeric"
            value={pinKm}
            onChange={(e) => setPinKm(e.target.value)}
            error={pin && 'error' in pin ? pin.error : null}
          />
          <div aria-live="polite" className="rounded-2xl bg-cream p-4 text-[15px] sm:mt-7">
            {pinMax !== null ? (
              <p>Maximum distance you can enter: <strong className="tabular-nums">{pinMax.toLocaleString('en-IN')} km</strong>
                {pinMax === MAX_DISTANCE_KM && ' (capped at the 4,000 km system maximum)'}</p>
            ) : (
              <p className="text-ink-soft">Enter a distance to see the allowance.</p>
            )}
          </div>
        </div>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-6 text-ink-soft">
          <li>This website does not calculate road distance between PIN codes — there is no map service behind it. Enter the distance yourself, or check the portal&apos;s auto-calculated figure.</li>
          <li>Where the source and destination PIN code are the same, a distance of up to {SAME_PIN_MAX_KM} km can be entered.</li>
          <li>The E-Way Easy app calculates distance automatically from the PIN codes, and you can edit it.</li>
        </ul>
      </section>
    </div>
  );
}
