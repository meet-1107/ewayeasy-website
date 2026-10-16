'use client';

import { useState, type FormEvent } from 'react';

type Fields = { name: string; email: string; business: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: '', email: '', business: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.business.trim().length > 120) e.business = 'Please keep the business name under 120 characters.';
  const m = f.message.trim();
  if (m.length < 10) e.message = 'Please write at least 10 characters so we can help.';
  else if (m.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  return e;
}

export default function ContactForm({ supportEmail }: { supportEmail: string }) {
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
    if (Object.keys(e).length > 0) return;

    const subject = `Website enquiry from ${fields.name.trim()}`;
    const body = [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      `Business: ${fields.business.trim() || '-'}`,
      '',
      fields.message.trim(),
    ].join('\n');
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const cls = (k: keyof Fields) => `input${errors[k] ? ' input-error' : ''}`;
  const errId = (k: keyof Fields) => (errors[k] ? `cf-${k}-err` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-describedby="contact-form-note">
      {disabled && (
        <p role="status" className="mb-6 rounded-xl border border-amber-400/50 bg-amber-300/15 p-3 text-sm text-ink">
          This form is disabled for now: it opens an email to our support address, which will be published at launch.
          Until then, please use Help inside the E-Way Easy app.
        </p>
      )}

      <fieldset disabled={disabled} className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="label">Name</label>
          <input
            id="cf-name"
            className={cls('name')}
            autoComplete="name"
            value={fields.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errId('name')}
          />
          {errors.name && <p id="cf-name-err" className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="label">Email</label>
          <input
            id="cf-email"
            type="email"
            className={cls('email')}
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errId('email')}
          />
          {errors.email && <p id="cf-email-err" className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-business" className="label">
            Business name <span className="font-normal text-ink-faint">(optional)</span>
          </label>
          <input
            id="cf-business"
            className={cls('business')}
            autoComplete="organization"
            value={fields.business}
            onChange={(e) => update('business', e.target.value)}
            aria-invalid={!!errors.business}
            aria-describedby={errId('business')}
          />
          {errors.business && <p id="cf-business-err" className="mt-1 text-sm text-red-600">{errors.business}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label">Message</label>
          <textarea
            id="cf-message"
            rows={6}
            className={cls('message')}
            value={fields.message}
            onChange={(e) => update('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errId('message')}
          />
          {errors.message && <p id="cf-message-err" className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>
      </fieldset>

      <p id="contact-form-note" className="mt-5 text-sm text-ink-soft">
        Submitting opens your own email app with this message filled in. Nothing is sent to any server from this page.
        Please do not include your GST or e-way bill portal password, OTPs or any other login details.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={disabled}>
          Open email to send
        </button>
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
