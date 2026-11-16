import type { Metadata } from 'next';
import { PLAY_STORE_URL, SITE, SITE_URL } from './site';
import { PRICING, pricesArePublished } from './pricing';

export function absoluteUrl(path = '/') {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

export const ORG_ID = `${SITE_URL}/#org`;

/** Site name markup: Google reads it from the home page only, so it is emitted there (src/app/page.tsx). */
export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE.name,
    alternateName: ['EWay Easy', 'ewayeasy.in'],
    url: SITE_URL,
    inLanguage: 'en-IN',
    publisher: { '@id': ORG_ID },
  };
}

/** Must match the title template in src/app/layout.tsx. */
export const TITLE_SUFFIX = ' | E-Way Easy';

/** Publisher logo for Article markup: a raster image, as Google asks. */
export const LOGO_LD = { '@type': 'ImageObject', url: absoluteUrl('/icon-512.png'), width: 512, height: 512 };

/** Real pixel size of the images we use for previews (covers are 1280×720, the default card is 1200×630). */
export function imageSize(src: string) {
  return src.includes('/images/covers/') ? { width: 1280, height: 720 } : { width: 1200, height: 630 };
}

/** Content dates are stored as YYYY-MM-DD; search engines prefer ISO 8601 with a time zone (IST). */
export function isoDate(d?: string) {
  if (!d) return undefined;
  return d.includes('T') ? d : `${d}T09:00:00+05:30`;
}

export function imageLd(src?: string, alt?: string) {
  const path = src ?? '/images/og-default.png';
  return { '@type': 'ImageObject', url: absoluteUrl(path), ...imageSize(path), ...(alt ? { caption: alt } : {}) };
}

/** Article / BlogPosting markup shared by guides and blog posts. Must match what the page shows. */
export function articleLd(o: {
  type: 'Article' | 'BlogPosting';
  path: string;
  headline: string;
  description: string;
  published?: string;
  modified?: string;
  image?: string;
  imageAlt?: string;
  section?: string;
  keywords?: string[];
  wordCount?: number;
  author: { name: string; url: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': o.type,
    headline: o.headline,
    description: o.description,
    datePublished: isoDate(o.published),
    dateModified: isoDate(o.modified ?? o.published),
    author: { '@type': 'Person', name: o.author.name, url: o.author.url },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, logo: LOGO_LD },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(o.path) },
    image: [imageLd(o.image, o.imageAlt)],
    ...(o.section ? { articleSection: o.section } : {}),
    ...(o.keywords?.length ? { keywords: o.keywords.join(', ') } : {}),
    ...(o.wordCount ? { wordCount: o.wordCount } : {}),
    inLanguage: 'en-IN',
    isAccessibleForFree: true,
  };
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
  // Title links: brand once, and short. Skip the " | E-Way Easy" suffix when the title already names the
  // brand or the suffix would push it past ~65 characters (Google shows the site name separately).
  const withSuffix = !opts.title.includes(SITE.name) && opts.title.length + TITLE_SUFFIX.length <= 65;
  return {
    title: withSuffix ? opts.title : { absolute: opts.title },
    description: opts.description,
    // Page-level alternates replace the layout's, so the feed link is repeated here.
    alternates: { canonical: url, types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'E-Way Easy guides and articles' }] } },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      type: opts.type ?? 'website',
      images: [{ url: image, ...imageSize(image) }],
      ...(opts.type === 'article'
        ? { publishedTime: isoDate(opts.publishedTime), modifiedTime: isoDate(opts.modifiedTime ?? opts.publishedTime), authors: opts.authors }
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
    // Promo banner with sample data (the older screenshots showed a real business and GSTIN).
    image: absoluteUrl('/images/app-banner.webp'),
    screenshot: [absoluteUrl('/images/app-banner.webp')],
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
