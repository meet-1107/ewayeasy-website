import { describe, expect, it } from 'vitest';
import { EMPTY_CONTACT, validateContact } from './contact';
import { gstinCheckChar } from './gstin';

const GSTIN = '24ABCDE1234F1Z' + gstinCheckChar('24ABCDE1234F1Z');
const ok = { ...EMPTY_CONTACT, name: 'Meet Akabari', email: 'meet@business.in', business: 'Shree Traders', message: 'Please call me about the wallet credits.' };

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(ok)).toEqual({});
  });

  it('accepts GSTIN instead of business name', () => {
    expect(validateContact({ ...ok, business: '', gstin: GSTIN })).toEqual({});
  });

  it('needs a business name or GSTIN', () => {
    expect(validateContact({ ...ok, business: '', gstin: '' }).business).toBeTruthy();
  });

  it('rejects a GSTIN with a wrong check character', () => {
    const bad = GSTIN.slice(0, 14) + (GSTIN[14] === 'A' ? 'B' : 'A');
    expect(validateContact({ ...ok, gstin: bad }).gstin).toMatch(/Check character/);
  });

  it.each(['meet', 'meet@', 'meet@site', 'me..et@site.com', '.meet@site.com', 'meet@-site.com', 'meet @site.com'])(
    'rejects bad email %s',
    (email) => { expect(validateContact({ ...ok, email }).email).toBeTruthy(); },
  );

  it('rejects disposable inboxes', () => {
    expect(validateContact({ ...ok, email: 'x@mailinator.com' }).email).toMatch(/temporary/);
  });

  it('rejects names with digits or symbols', () => {
    expect(validateContact({ ...ok, name: 'B0t$' }).name).toBeTruthy();
  });

  it('rejects short, HTML, link-heavy and repeated-character messages', () => {
    expect(validateContact({ ...ok, message: 'hi' }).message).toBeTruthy();
    expect(validateContact({ ...ok, message: 'Hello there <a href="x">click</a> please' }).message).toMatch(/HTML/);
    expect(validateContact({ ...ok, message: 'see https://a.com https://b.com https://c.com now' }).message).toMatch(/links/);
    expect(validateContact({ ...ok, message: 'Hellooooooooooooo team, call me' }).message).toMatch(/repeated/);
  });
});
