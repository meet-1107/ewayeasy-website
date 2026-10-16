import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import JsonLd from '@/components/JsonLd';
import { getAllGuides, getAllPosts, formatDate, type Post } from '@/lib/content';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { TOOLS, toolHref, type Tool } from '@/lib/tools';

export const metadata = pageMeta({
  title: 'E-Way Bill, GST Invoice and GST Return Guides',
  description:
    'Practical, source-checked guides on e-way bill generation, sales invoices and GST, and GSTIN and return preparation for Indian businesses. By Bhavesh Akabari.',
  path: '/guides',
});

// Topic clusters: e-way bill generation is the core subject; the other two support the same workflow.
const HSN_SLUG = 'hsn-codes-practical-guide';
const inB = (p: Post) => p.category === 'invoicing' || p.category === 'business-guides' || p.slug === HSN_SLUG;
const inC = (p: Post) => p.category === 'gst-compliance' && p.slug !== HSN_SLUG;

export default function GuidesHub() {
  const guides = getAllGuides();
  const posts = getAllPosts();
  const hub = guides.find((g) => g.slug === 'eway-bill-guide');
  const clusters: {
    id: string; eyebrow: string; title: string; intro: string;
    guides: { href: string; title: string; meta: string }[];
    tools: Tool[];
  }[] = [
    {
      id: 'eway-bill',
      eyebrow: 'Core topic',
      title: 'E-way bill generation',
      intro: 'How to generate an e-way bill, the documents and data you need, validity and distance, Part A and Part B, cancellation, corrections, errors and bulk preparation.',
      guides: [
        ...guides.map((g) => ({ href: `/${g.slug}`, title: g.title, meta: `Guide · verified ${formatDate(g.verifiedAt ?? g.updatedAt)}` })),
        ...posts.filter((p) => p.category === 'eway-bill').map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: `Article · ${formatDate(p.publishedAt)}` })),
      ],
      tools: TOOLS.filter((t) => t.category === 'eway-bill'),
    },
    {
      id: 'invoices',
      eyebrow: 'Supporting workflow',
      title: 'Sales invoices and GST',
      intro: 'Creating GST invoices, numbering and HSN details, GST calculation, preparing invoice data and keeping the invoice consistent with the e-way bill.',
      guides: posts.filter(inB).map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: `Article · ${formatDate(p.publishedAt)}` })),
      tools: TOOLS.filter((t) => t.category === 'invoicing' || t.category === 'gst'),
    },
    {
      id: 'returns',
      eyebrow: 'Related area',
      title: 'GSTIN and return preparation',
      intro: 'GSTIN structure and checks, CGST, SGST and IGST, and preparing data for GSTR-1, GSTR-3B and GSTR-2B reconciliation.',
      guides: posts.filter(inC).map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: `Article · ${formatDate(p.publishedAt)}` })),
      tools: TOOLS.filter((t) => t.category === 'returns' || t.slug === 'gstin-validator'),
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'E-Way Easy guides',
          url: absoluteUrl('/guides'),
          hasPart: clusters.flatMap((c) => c.guides.slice(0, 20).map((g) => ({ '@type': 'Article', name: g.title, url: absoluteUrl(g.href) }))),
        }}
      />
      <PageHeader
        eyebrow="Guides"
        title="Guides for the invoice-to-e-way-bill workflow"
        description="Plain-English, source-checked guides for manufacturers, wholesalers, traders and accountants, grouped by topic."
        crumbs={[{ name: 'Guides', href: '/guides' }]}
      >
        <nav aria-label="Topics" className="flex flex-wrap gap-2">
          {clusters.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">{c.title}</a>
          ))}
        </nav>
      </PageHeader>

      <div className="container space-y-20 py-14">
        {hub && (
          <Link href="/eway-bill-guide" className="card flex flex-col gap-2 p-6 transition hover:border-brand-500 md:flex-row md:items-center md:justify-between md:p-8">
            <span>
              <span className="eyebrow">Start here</span>
              <span className="mt-1 block font-display text-2xl font-bold text-ink">{hub.title}</span>
              <span className="mt-1 block text-ink-soft">{hub.excerpt}</span>
            </span>
            <span className="btn-primary shrink-0">Read the guide →</span>
          </Link>
        )}

        {clusters.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-h`} className="scroll-mt-24">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 id={`${c.id}-h`} className="h2 mt-2">{c.title}</h2>
            <p className="mt-3 max-w-3xl text-ink-soft">{c.intro}</p>
            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
              <ul className="grid gap-3 sm:grid-cols-2">
                {c.guides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="block h-full rounded-2xl border border-brand-900/10 bg-white p-4 transition hover:border-brand-500">
                      <span className="block font-semibold leading-snug text-ink">{g.title}</span>
                      <span className="mt-1 block text-xs text-ink-faint">{g.meta}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <aside className="rounded-2xl bg-brand-50 p-5 lg:self-start">
                <p className="font-display font-bold text-ink">Free tools for this topic</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {c.tools.map((t) => (
                    <li key={t.slug}><Link href={toolHref(t.slug)} className="font-medium text-brand-700 hover:underline">{t.name}</Link></li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>
        ))}

        <DownloadCTA placement="guides-hub" />
      </div>
    </>
  );
}
