import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import JsonLd from '@/components/JsonLd';
import { getAllGuides, getGuide } from '@/lib/content';
import { absoluteUrl, articleLd, pageMeta } from '@/lib/seo';

// Guides about GST invoices (not e-way bills) get their own breadcrumb and labels.
const INVOICE_GUIDES = new Set(['gst-invoice-rules']);
import { AUTHOR, SITE } from '@/lib/site';

// E-way bill learning centre pages live at the site root, e.g. /eway-bill-rules.
export const dynamicParams = false;
export function generateStaticParams() {
  return getAllGuides().map((g) => ({ guide: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ guide: string }> }) {
  const { guide } = await params;
  const g = getGuide(guide);
  if (!g) return {};
  return pageMeta({
    title: g.seoTitle ?? g.title,
    description: g.metaDescription ?? g.excerpt,
    path: `/${g.slug}`,
    type: 'article',
    publishedTime: g.publishedAt,
    modifiedTime: g.updatedAt,
    image: g.image,
    authors: [AUTHOR.name],
  });
}

export default async function GuidePage({ params }: { params: Promise<{ guide: string }> }) {
  const { guide } = await params;
  const g = getGuide(guide);
  if (!g) notFound();
  const all = getAllGuides();
  const related = g.related.map((s) => all.find((x) => x.slug === s)).filter(Boolean);
  const isInvoice = INVOICE_GUIDES.has(g.slug);
  const crumbs = g.slug === 'eway-bill-guide'
    ? [{ name: 'E-Way Bill Guide', href: '/eway-bill-guide' }]
    : isInvoice
      ? [{ name: 'Guides', href: '/guides' }, { name: g.title, href: `/${g.slug}` }]
      : [{ name: 'E-Way Bill Guide', href: '/eway-bill-guide' }, { name: g.title, href: `/${g.slug}` }];

  return (
    <>
      <JsonLd
        data={articleLd({
          type: 'Article',
          path: `/${g.slug}`,
          headline: g.title,
          description: g.metaDescription ?? g.excerpt,
          published: g.publishedAt,
          modified: g.updatedAt,
          image: g.image,
          imageAlt: g.imageAlt,
          section: isInvoice ? 'GST invoices' : 'E-way bills',
          author: { name: AUTHOR.name, url: absoluteUrl(`/authors/${AUTHOR.slug}`) },
        })}
      />
      <ArticleLayout
        doc={g}
        category={isInvoice ? 'invoicing' : 'eway-bill'}
        placement={`guide-${g.slug}`}
        crumbs={crumbs}
        updateHistory={g.updateHistory}
        eyebrow={<span className="chip">{isInvoice ? 'GST Invoice Guide' : 'E-Way Bill Learning Centre'}</span>}
        after={
          <section className="container pb-8">
            <h2 className="h2">{isInvoice ? 'More guides' : 'More e-way bill guides'}</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(related.length ? related : all.filter((x) => x.slug !== g.slug).slice(0, 6)).map((r) => (
                <Link key={r!.slug} href={`/${r!.slug}`} className="rounded-2xl border border-brand-900/10 bg-white p-5 transition hover:border-brand-500">
                  <p className="font-display font-semibold text-ink">{r!.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{r!.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        }
      />
    </>
  );
}
