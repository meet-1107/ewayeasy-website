import type { Metadata } from 'next';
import { PLAY_STORE_URL, SITE, SITE_URL } from './site';
import { PRICING, pricesArePublished } from './pricing';

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image ?? '/images/og-default.png';
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: opts.type ?? 'website',
      images: [{ url: image, width: 1200, height: 630 }],
      ...(opts.type === 'article'
        ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime, authors: opts.authors }
        : {}),
    },
    twitter: { card: 'summary_large_image', title: opts.title, description: opts.description, images: [image] },
  };
}

export function breadcrumbLd(crumbs: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', href: '/' }, ...crumbs].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}

const SOFTWARE_APP_DESCRIPTION =
  'E-way bill generator app for Android: generate, update, extend, cancel and consolidate e-way bills from a GST invoice or invoice PDF.';

// Only features verified in content/EDITORIAL_BRIEF.md belong here.
const SOFTWARE_APP_FEATURES = [
  'Generate an e-way bill from a GST invoice',
  'Import an invoice PDF and review the extracted details before generating',
  'Fill buyer details from the GSTIN',
  'Fill HSN codes from saved products',
  'Calculate road distance from PIN codes',
  'Bill To / Ship To and Dispatch From details',
  'Update Part B and vehicle number',
  'Extend e-way bill validity',
  'Cancel an e-way bill',
  'Create a consolidated e-way bill',
  'Download the e-way bill PDF and share it on WhatsApp or email',
  'Saved buyers, products, transporters and vehicles',
];

/**
 * The one SoftwareApplication JSON-LD block for the site; use it at most once per page.
 * No aggregateRating (there are no verified ratings) and no downloadUrl (the listing isn't public yet).
 */
export function softwareAppLd(description = SOFTWARE_APP_DESCRIPTION) {
  const credits = PRICING.creditsPerEwayBill ?? 5;
  const rupees = credits * PRICING.rupeesPerCredit;
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    operatingSystem: 'Android',
    applicationCategory: 'BusinessApplication',
    url: absoluteUrl('/download'),
    ...(PLAY_STORE_URL ? { installUrl: PLAY_STORE_URL, downloadUrl: PLAY_STORE_URL } : {}),
    description,
    image: absoluteUrl('/images/app-dashboard.jpg'),
    screenshot: [absoluteUrl('/images/app-dashboard.jpg'), absoluteUrl('/images/app-new-invoice.jpg')],
    featureList: SOFTWARE_APP_FEATURES,
    ...(pricesArePublished()
      ? {
          offers: {
            '@type': 'Offer',
            price: String(rupees),
            priceCurrency: PRICING.currency,
            description: `${credits} credits (₹${rupees}) per successful e-way bill action; 1 credit = ₹${PRICING.rupeesPerCredit}; no yearly subscription`,
            url: absoluteUrl('/pricing'),
          },
        }
      : {}),
  };
}

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
