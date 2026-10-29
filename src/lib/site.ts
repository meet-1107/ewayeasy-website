// Central site configuration. Values that must be verified before launch come from
// environment variables and fall back to clearly-labelled placeholders — never guessed values.

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.example.com').replace(/\/$/, '');
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '';
export const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION || '';

export const SITE = {
  name: 'E-Way Easy',
  tagline: 'Invoice Bana. E-Way Easy Se Bhejo.',
  description:
    'E-Way Easy is an Android app that simplifies the e-way bill workflow for Indian businesses — create the sales invoice, review e-way bill details and generate, all from your phone. Free GST calculators, invoice creator and e-way bill guides.',
  locale: 'en_IN',
};

export const AUTHOR = {
  name: 'Bhavesh Akabari',
  slug: 'bhavesh-akabari',
  role: 'Author, E-Way Easy',
  // Only verified information belongs here. Extend once a confirmed bio is supplied.
  bio: 'Bhavesh Akabari writes the E-Way Easy guides on e-way bills, GST invoicing and day-to-day compliance workflows for Indian manufacturers, wholesalers and traders. Every compliance article is checked against official GST and e-way bill sources and carries a "last verified" date.',
  topics: ['E-way bill process and rules', 'GST invoicing', 'Sales invoice workflows', 'Bulk e-way bill preparation', 'Compliance updates'],
};

/** Adds UTM parameters to the Play Store URL so clicks can be attributed by placement. */
// Founder facts as supplied by the business (October 2026). Keep to these; don't add details that weren't given.
export const FOUNDER = {
  name: 'Meet Akabari',
  role: 'Founder, E-Way Easy',
  village: 'Nani Bhagedi',
  near: 'Kalavad',
  state: 'Gujarat',
  photo: '/images/team/meet-akabari.jpg',
  previousWork: 'FactoHR',
  previousWorkYears: 1,
  buildMonths: 5,
};

export function playStoreHref(placement: string): string | null {
  if (!PLAY_STORE_URL) return null;
  try {
    const url = new URL(PLAY_STORE_URL);
    // Google Play passes the `referrer` param through to the Install Referrer API.
    url.searchParams.set(
      'referrer',
      `utm_source=website&utm_medium=${encodeURIComponent(placement)}&utm_campaign=eway_easy_site`,
    );
    return url.toString();
  } catch {
    return null;
  }
}

// Compact primary navigation; secondary pages live in the footer.
export const NAV = [
  { label: 'Features', href: '/features' },
  { label: 'Free Tools', href: '/tools' },
  { label: 'Guides', href: '/guides' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export const CATEGORIES = [
  { slug: 'eway-bill', name: 'E-Way Bill', description: 'Generation, validity, distance, Part A/B, cancellation and special cases.' },
  { slug: 'gst-compliance', name: 'GST Compliance', description: 'CGST, SGST and IGST, HSN codes and GSTIN checks explained simply, with worked examples for Indian businesses.' },
  { slug: 'invoicing', name: 'Invoicing', description: 'Tax invoices, delivery challans and GST calculations on sales invoices.' },
  { slug: 'business-guides', name: 'Business Guides', description: 'Practical invoicing and dispatch workflows for Indian manufacturers, wholesalers and distributors, from data prep to tools.' },
  { slug: 'product-updates', name: 'Product Updates', description: 'What is new in the E-Way Easy app: features, workflow improvements and how to get the most from invoice-to-e-way-bill.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export const OFFICIAL_SOURCES = [
  { title: 'E-Way Bill System (official portal)', url: 'https://ewaybillgst.gov.in/' },
  { title: 'E-Way Bill 2.0 portal', url: 'https://ewaybill2.gst.gov.in/' },
  { title: 'GST portal', url: 'https://www.gst.gov.in/' },
  { title: 'CBIC', url: 'https://www.cbic.gov.in/' },
];
