'use client';

import { useState, type FormEvent } from 'react';

type Fields = {
  name: string;
  phone: string;
  email: string;
  city: string;
  partnerType: string;
  businesses: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

export const PARTNER_TYPES = [
  'Chartered accountant (CA)',
  'Tax consultant / GST practitioner',
  'Transport agent or broker',
  'Billing-software reseller',
  'IT dealer / computer shop',
  'Trade association',
  'Other',
] as const;

const BUSINESS_RANGES = ['1–10', '11–50', '51–200', 'More than 200', 'Not sure yet'] as const;

const EMPTY: Fields = { name: '', phone: '', email: '', city: '', partnerType: '', businesses: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Optional; allows +91, spaces and dashes, needs 10–13 digits in total.
const PHONE_RE = /^\+?[\d\s-]{10,16}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  const phone = f.phone.trim();
  if (phone) {
    const digits = phone.replace(/\D/g, '').length;
    if (!PHONE_RE.test(phone) || digits < 10 || digits > 13) e.phone = 'Please enter a valid phone number, or leave it empty.';
  }
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  const city = f.city.trim();
  if (city.length < 2) e.city = 'Please enter your city.';
  else if (city.length > 80) e.city = 'Please keep the city under 80 characters.';
  if (!f.partnerType) e.partnerType = 'Please choose what best describes you.';
  if (!f.businesses) e.businesses = 'Please choose a range.';
  if (f.message.trim().length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}

export default function PartnerForm({ supportEmail }: { supportEmail: string }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const disabled = !supportEmail;

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (disabled) return;
    const e = validate(fields);
    setErrors(e);
    const firstError = (Object.keys(e) as (keyof Fields)[])[0];
    if (firstError) {
      document.getElementById(`pf-${firstError}`)?.focus();
      return;
    }

    const subject = `Partner application – ${fields.name.trim()}`;
    const body = [
      `Name: ${fields.name.trim()}`,
      `Phone: ${fields.phone.trim() || '-'}`,
      `Email: ${fields.email.trim()}`,
      `City: ${fields.city.trim()}`,
      `I am a: ${fields.partnerType}`,
      `Businesses I work with: ${fields.businesses}`,
      '',
      fields.message.trim() || '(no message)',
    ].join('\n');
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const cls = (k: keyof Fields) => `input${errors[k] ? ' input-error' : ''}`;
  const errId = (k: keyof Fields) => (errors[k] ? `pf-${k}-err` : undefined);
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? <p id={`pf-${k}-err`} className="mt-1 text-sm text-red-600">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-describedby="partner-form-note">
      {disabled && (
        <p role="status" className="mb-6 rounded-xl border border-amber-400/50 bg-amber-300/15 p-3 text-sm text-ink">
          This form is switched off for now: it opens an email to our support address, which will be published at
          launch. Until then, please reach us through Help inside the E-Way Easy app.
        </p>
      )}

      <fieldset disabled={disabled} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Partner application</legend>
        <div>
          <label htmlFor="pf-name" className="label">Your name</label>
          <input id="pf-name" className={cls('name')} autoComplete="name" value={fields.name}
            onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errId('name')} />
          <Err k="name" />
        </div>
        <div>
          <label htmlFor="pf-phone" className="label">
            Phone <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input id="pf-phone" type="tel" inputMode="tel" className={cls('phone')} autoComplete="tel" value={fields.phone}
            onChange={(e) => update('phone', e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errId('phone')} />
          <Err k="phone" />
        </div>
        <div>
          <label htmlFor="pf-email" className="label">Email</label>
          <input id="pf-email" type="email" className={cls('email')} autoComplete="email" value={fields.email}
            onChange={(e) => update('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errId('email')} />
          <Err k="email" />
        </div>
        <div>
          <label htmlFor="pf-city" className="label">City</label>
          <input id="pf-city" className={cls('city')} autoComplete="address-level2" value={fields.city}
            onChange={(e) => update('city', e.target.value)} aria-invalid={!!errors.city} aria-describedby={errId('city')} />
          <Err k="city" />
        </div>
        <div>
          <label htmlFor="pf-partnerType" className="label">I am a</label>
          <select id="pf-partnerType" className={cls('partnerType')} value={fields.partnerType}
            onChange={(e) => update('partnerType', e.target.value)} aria-invalid={!!errors.partnerType} aria-describedby={errId('partnerType')}>
            <option value="">Choose one</option>
            {PARTNER_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <Err k="partnerType" />
        </div>
        <div>
          <label htmlFor="pf-businesses" className="label">Businesses you work with</label>
          <select id="pf-businesses" className={cls('businesses')} value={fields.businesses}
            onChange={(e) => update('businesses', e.target.value)} aria-invalid={!!errors.businesses} aria-describedby={errId('businesses')}>
            <option value="">Choose a range</option>
            {BUSINESS_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <Err k="businesses" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pf-message" className="label">
            Anything else we should know? <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <textarea id="pf-message" rows={5} className={cls('message')} value={fields.message}
            placeholder="For example: the kind of businesses you work with, and how they make e-way bills today."
            onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errId('message')} />
          <Err k="message" />
        </div>
      </fieldset>

      <p id="partner-form-note" className="mt-5 text-sm text-ink-soft">
        Submitting opens your own email app with this application filled in, ready for you to send. Nothing is sent to
        any server from this page. Please do not include GST or e-way bill portal passwords, OTPs or your clients’ login
        details.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={disabled}>Open email to apply</button>
        {opened && (
          <p role="status" className="text-sm text-brand-700">
            Your email app should open now. If it did not, write to{' '}
            <a href={`mailto:${supportEmail}`} className="font-semibold underline">{supportEmail}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
