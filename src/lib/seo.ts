import type { Metadata } from 'next';
import { SITE, SITE_URL } from './site';

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

export function faqLd(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}
