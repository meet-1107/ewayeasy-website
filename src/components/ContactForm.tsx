'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { WEB3FORMS_KEY } from '@/lib/site';
import {
  EMPTY_CONTACT, MIN_FILL_SECONDS, RATE_LIMIT, validateContact,
  type ContactErrors as Errors, type ContactFields as Fields,
} from '@/lib/contact';

const RATE_KEY = 'ee-contact-sends';

function recentSends(): number[] {
  try {
    const list = JSON.parse(localStorage.getItem(RATE_KEY) || '[]') as number[];
    return list.filter((t) => Date.now() - t < RATE_LIMIT.windowMs);
  } catch { return []; }
}
function recordSend() {
  try { localStorage.setItem(RATE_KEY, JSON.stringify([...recentSends(), Date.now()])); } catch {}
}

export default function ContactForm({ supportEmail }: { supportEmail: string }) {
  const [fields, setFields] = useState<Fields>(EMPTY_CONTACT);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed' | 'blocked'>('idle');
  const [notice, setNotice] = useState('');
  const [honey, setHoney] = useState(false);
  const startedAt = useRef(0);
  const disabled = !supportEmail;
  const sendsDirectly = !!WEB3FORMS_KEY;

  useEffect(() => { startedAt.current = Date.now(); }, []);

  function update(key: keyof Fields, value: string) {
    setFields((f) => ({ ...f, [key]: key === 'gstin' ? value.toUpperCase() : value }));
    if (errors[key] || (key === 'gstin' && errors.business)) setErrors((e) => ({ ...e, [key]: undefined, ...(key === 'gstin' ? { business: undefined } : {}) }));
    if (status === 'blocked' || status === 'failed') setStatus('idle');
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (disabled || status === 'sending') return;
    const e = validateContact(fields);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = (['name', 'email', 'gstin', 'business', 'message'] as const).find((k) => e[k]);
      if (first) document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    const subject = `Website enquiry from ${fields.name.trim()}`;
    const business = fields.business.trim() || '-';
    const gstin = fields.gstin.replace(/\s+/g, '').toUpperCase() || '-';

    if (sendsDirectly) {
      // Bot checks: hidden honeypot, too-fast submit, and a per-browser rate limit.
      if (honey) { setStatus('sent'); return; }
      if (Date.now() - startedAt.current < MIN_FILL_SECONDS * 1000) {
        setStatus('blocked'); setNotice('That was very fast. Please check your details and press Send again.');
        return;
      }
      if (recentSends().length >= RATE_LIMIT.max) {
        setStatus('blocked'); setNotice('You have sent several messages in the last few minutes. Please wait 10 minutes and try again.');
        return;
      }
      setStatus('sending');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: 'E-Way Easy website',
            name: fields.name.trim(),
            email: fields.email.trim(),
            business,
            gstin,
            message: fields.message.trim(),
            replyto: fields.email.trim(),
            botcheck: false,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
        if (!res.ok || String(data.success) !== 'true') throw new Error('send failed');
        recordSend();
        setStatus('sent');
        setFields(EMPTY_CONTACT);
      } catch {
        setStatus('failed');
      }
      return;
    }

    const body = [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      `Business: ${business}`,
      `GSTIN: ${gstin}`,
      '',
      fields.message.trim(),
    ].join('\n');
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const cls = (k: keyof Fields) => `input${errors[k] ? ' input-error' : ''}`;
  const errId = (k: keyof Fields) => (errors[k] ? `cf-${k}-err` : undefined);
  const err = (k: keyof Fields) => errors[k] && <p id={`cf-${k}-err`} className="mt-1 text-sm text-red-600">{errors[k]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="card p-6 md:p-8" aria-describedby="contact-form-note" data-clarity-mask="True">
      {disabled && (
        <p role="status" className="mb-6 rounded-xl border border-amber-400/50 bg-amber-300/15 p-3 text-sm text-ink">
          This form is disabled for now: it opens an email to our support address, which will be published at launch.
          Until then, please use Help inside the E-Way Easy app.
        </p>
      )}

      <fieldset disabled={disabled || status === 'sending'} className="grid gap-5 sm:grid-cols-2">
        {/* Honeypot: hidden from people, bots tick it. */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" checked={honey} onChange={(e) => setHoney(e.target.checked)} />
        <div>
          <label htmlFor="cf-name" className="label">Name</label>
          <input id="cf-name" className={cls('name')} autoComplete="name" maxLength={80} value={fields.name}
            onChange={(e) => update('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errId('name')} />
          {err('name')}
        </div>
        <div>
          <label htmlFor="cf-email" className="label">Email</label>
          <input id="cf-email" type="email" inputMode="email" className={cls('email')} autoComplete="email" maxLength={254} value={fields.email}
            onChange={(e) => update('email', e.target.value.trim())} aria-invalid={!!errors.email} aria-describedby={errId('email')} />
          {err('email')}
        </div>
        <div>
          <label htmlFor="cf-business" className="label">Business name</label>
          <input id="cf-business" className={cls('business')} autoComplete="organization" maxLength={120} value={fields.business}
            onChange={(e) => update('business', e.target.value)} aria-invalid={!!errors.business} aria-describedby={errId('business') ?? 'cf-biz-hint'} />
          {err('business')}
        </div>
        <div>
          <label htmlFor="cf-gstin" className="label">GSTIN</label>
          <input id="cf-gstin" className={`${cls('gstin')} font-mono uppercase tracking-wide`} autoComplete="off" spellCheck={false} maxLength={15}
            placeholder="24ABCDE1234F1Z5" value={fields.gstin}
            onChange={(e) => update('gstin', e.target.value.replace(/[^0-9a-z]/gi, ''))} aria-invalid={!!errors.gstin} aria-describedby={errId('gstin') ?? 'cf-biz-hint'} />
          {err('gstin')}
        </div>
        <p id="cf-biz-hint" className="-mt-3 text-xs text-ink-faint sm:col-span-2">Enter your business name, your GSTIN, or both.</p>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="label">Message</label>
          <textarea id="cf-message" rows={6} className={cls('message')} maxLength={2000} value={fields.message}
            onChange={(e) => update('message', e.target.value)} aria-invalid={!!errors.message} aria-describedby={errId('message')} />
          <div className="mt-1 flex justify-between gap-3">
            <span>{err('message')}</span>
            <span className="shrink-0 text-xs text-ink-faint">{fields.message.trim().length}/2000</span>
          </div>
        </div>
      </fieldset>

      <p id="contact-form-note" className="mt-5 text-sm text-ink-soft">
        {sendsDirectly
          ? <>Your message is emailed straight to our team at {supportEmail}. We reply to the email address you give.</>
          : <>Submitting opens your own email app with this message filled in. Nothing is sent to any server from this page.</>}{' '}
        Please do not include your GST or e-way bill portal password, OTPs or any other login details.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={disabled || status === 'sending'}>
          {sendsDirectly ? (status === 'sending' ? 'Sending…' : 'Send message') : 'Open email to send'}
        </button>
        {status === 'sent' && (
          <p role="status" className="text-sm font-semibold text-brand-700">Thank you! Your message has been sent. We will reply by email.</p>
        )}
        {status === 'blocked' && <p role="alert" className="text-sm text-amber-700">{notice}</p>}
        {status === 'failed' && (
          <p role="alert" className="text-sm text-red-600">
            Sorry, the message could not be sent. Please email us at{' '}
            <a href={`mailto:${supportEmail}`} className="font-semibold underline">{supportEmail}</a>.
          </p>
        )}
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
