import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import { getAllGuides, getAllPosts } from '@/lib/content';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { AUTHOR, CATEGORIES, SUPPORT_EMAIL } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: AUTHOR.slug }];
}

export const metadata = pageMeta({
  title: `${AUTHOR.name}: Author Profile`,
  description: `Articles and e-way bill guides written by ${AUTHOR.name} for E-Way Easy: e-way bill rules, GST invoicing and compliance workflows.`,
  path: `/authors/${AUTHOR.slug}`,
});

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  if ((await params).slug !== AUTHOR.slug) notFound();
  const posts = getAllPosts();
  const guides = getAllGuides();

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          mainEntity: {
            '@type': 'Person',
            name: AUTHOR.name,
            url: absoluteUrl(`/authors/${AUTHOR.slug}`),
            description: AUTHOR.bio,
            knowsAbout: AUTHOR.topics,
            worksFor: { '@type': 'Organization', name: 'E-Way Easy' },
          },
        }}
      />
      <header className="bg-white">
        <div className="container py-12 md:py-16">
          <Breadcrumbs crumbs={[{ name: 'Authors', href: `/authors/${AUTHOR.slug}` }, { name: AUTHOR.name, href: `/authors/${AUTHOR.slug}` }]} />
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
            {/* Replace with a supplied profile photo when available. */}
            <span className="grid h-32 w-32 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-brand-900 font-display text-4xl font-extrabold text-white shadow-lift" aria-hidden>BA</span>
            <div>
              <p className="eyebrow">Author</p>
              <h1 className="mt-2 font-display text-4xl font-extrabold">{AUTHOR.name}</h1>
              <p className="mt-1 text-ink-faint">{AUTHOR.role}</p>
              <p className="mt-4 max-w-2xl leading-7 text-ink-soft">{AUTHOR.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {AUTHOR.topics.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
              <p className="mt-5 text-sm text-ink-soft">
                <Link className="font-medium text-brand-700 underline" href="/how-we-create-content">How we research, write and check our guides</Link>
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Editorial contact:{' '}
                {SUPPORT_EMAIL ? <a className="font-medium text-brand-700 underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> : <Link className="font-medium text-brand-700 underline" href="/contact">contact page</Link>}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container py-12">
        <section className="max-w-3xl">
          <h2 className="h2">What Bhavesh writes about</h2>
          <p className="mt-4 leading-7 text-ink-soft">
            Bhavesh writes practical guides for the people who raise invoices and e-way bills every day: owners, accounts
            staff and dispatch desks at manufacturers, wholesalers and traders. Each piece answers one working question,
            such as whether this consignment needs an e-way bill, who should generate it, or which tax head goes on this invoice.
          </p>
          <p className="mt-4 leading-7 text-ink-soft">
            The articles explain rules in plain words, then show where real dispatches go wrong. They are general
            information, not tax or legal advice, and every compliance article links the official source it was checked against.
          </p>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2 className="h2">Sources his articles are checked against</h2>
          <p className="mt-4 leading-7 text-ink-soft">
            Facts are checked against official sources only, never other blogs. The source list at the end of each article
            shows which ones were used.
          </p>
          <ul className="mt-4 grid gap-2 leading-7 text-ink-soft">
            <li><strong className="text-ink">E-way bill portal and user documentation</strong>: e-way bill rules, portal steps and advisories.</li>
            <li><strong className="text-ink">CBIC GST</strong>: the CGST Act, the CGST Rules (including Rule 138) and notifications.</li>
            <li><strong className="text-ink">GST portal and tutorials</strong>: registration, GSTIN, returns and taxpayer advisories.</li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="h2">E-way bill guides</h2>
          <p className="mt-3 max-w-3xl leading-7 text-ink-soft">Reference pages on one rule each, re-checked when the rules change.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <Link key={g.slug} href={`/${g.slug}`} className="rounded-2xl border border-brand-900/10 bg-white p-5 hover:border-brand-500">
                <p className="font-display font-semibold">{g.title}</p>
                <p className="mt-1 text-xs text-ink-faint">Last verified {g.verifiedAt ?? g.updatedAt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="h2">Published articles ({posts.length}), by topic</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            {CATEGORIES.map((c) => {
              const inCat = posts.filter((p) => p.category === c.slug);
              if (!inCat.length) return null;
              return (
                <div key={c.slug}>
                  <h3 className="font-display text-lg font-semibold">
                    <Link href={`/blog/category/${c.slug}`} className="hover:text-brand-700">{c.name}</Link>
                  </h3>
                  <ul className="mt-3 grid gap-2">
                    {inCat.map((p) => (
                      <li key={p.slug} className="text-sm leading-6">
                        <Link href={`/blog/${p.slug}`} className="font-medium text-brand-800 hover:underline">{p.title}</Link>
                        <span className="text-ink-faint"> · {p.verifiedAt ? `verified ${p.verifiedAt}` : `updated ${p.updatedAt}`}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
