// Validation and spam rules for the website contact form. Kept free of React so it can be unit-tested.
import { checkGstin } from './gstin';

export type ContactFields = { name: string; email: string; gstin: string; business: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export const EMPTY_CONTACT: ContactFields = { name: '', email: '', gstin: '', business: '', message: '' };

/** Local part: letters, digits and . _ % + - (no leading, trailing or double dots). Domain: real labels and a 2–24 letter TLD. */
const EMAIL_RE = /^(?!\.)(?!.*\.\.)[A-Za-z0-9._%+-]{1,64}(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

/** Throwaway inbox providers that bots and spammers use. */
const DISPOSABLE = new Set([
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', '10minutemail.com', 'tempmail.com',
  'temp-mail.org', 'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc', 'throwawaymail.com',
  'fakeinbox.com', 'mintemail.com', 'emailondeck.com', 'tempail.com', 'moakt.com', 'mohmal.com', 'spamgourmet.com',
]);

const NAME_RE = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;
const URL_RE = /(https?:\/\/|www\.)\S+/gi;

export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};

  const name = f.name.trim();
  if (!NAME_RE.test(name)) e.name = 'Please enter your name using letters only (2 to 80 characters).';

  const email = f.email.trim();
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  if (!EMAIL_RE.test(email)) e.email = 'Please enter a valid email address, for example name@business.com.';
  else if (DISPOSABLE.has(domain)) e.email = 'Please use your regular business or personal email, not a temporary inbox.';

  const gstin = f.gstin.replace(/\s+/g, '').toUpperCase();
  const business = f.business.trim();
  if (!gstin && !business) {
    e.business = 'Please enter your business name or GSTIN.';
  }
  if (gstin) {
    const g = checkGstin(gstin);
    if (!g.valid) e.gstin = g.errors[0] ?? 'Please enter a valid 15-character GSTIN.';
  }
  if (business && (business.length < 2 || business.length > 120 || !/\p{L}/u.test(business))) {
    e.business = 'Please enter a real business name (2 to 120 characters).';
  }

  const m = f.message.trim();
  const links = m.match(URL_RE)?.length ?? 0;
  if (m.length < 20) e.message = 'Please write at least 20 characters so we can help.';
  else if (m.length > 2000) e.message = 'Please keep your message under 2,000 characters.';
  else if (/<[a-z/][^>]*>/i.test(m)) e.message = 'Please remove HTML or code from your message.';
  else if (links > 2) e.message = 'Please include no more than 2 links.';
  else if (/(.)\1{9,}/.test(m)) e.message = 'Your message has a long run of repeated characters. Please write it normally.';

  return e;
}

/** Seconds a person must spend on the form before it can send. Bots submit instantly. */
export const MIN_FILL_SECONDS = 4;
/** At most this many messages per browser in the rolling window. */
export const RATE_LIMIT = { max: 3, windowMs: 10 * 60 * 1000 };
