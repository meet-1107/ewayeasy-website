// Customer reviews shown on the homepage.
//
// RULES — only add a review here when ALL of these are true:
//  1. It is a real customer's own words (copy exactly; you may trim, never rewrite or invent).
//  2. The customer has agreed to be featured (name, business, city and photo) — keep that consent
//     message on file (WhatsApp/email screenshot).
//  3. `source` says where it came from, e.g. a Google Play review, WhatsApp message or email.
// Fake or "sample" reviews are not allowed: they mislead buyers and break India's consumer-protection
// rules on online reviews. Until this list has entries, the homepage shows an honest
// "be one of our first reviewers" card instead.
//
// Photos: put them in /public/images/reviews/<file>.jpg (portrait, at least 600×800).

export interface Review {
  name: string;
  business: string;
  city: string;
  quote: string;
  /** Optional: original-language quote (Gujarati, Hindi…) shown as the main text. */
  language?: 'en' | 'gu' | 'hi';
  photo?: string;
  source: 'Google Play' | 'WhatsApp' | 'Email' | 'In person';
  date: string; // YYYY-MM-DD
  consent: true;
}

export const REVIEWS: Review[] = [];
