import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { getAllGuides, getAllPosts, toSummary } from '@/lib/content';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { AUTHOR, SUPPORT_EMAIL } from '@/lib/site';

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
                Editorial contact:{' '}
                {SUPPORT_EMAIL ? <a className="font-medium text-brand-700 underline" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> : <Link className="font-medium text-brand-700 underline" href="/contact">contact page</Link>}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="container py-12">
        <section>
          <h2 className="h2">E-way bill guides</h2>
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
          <h2 className="h2">Published articles ({posts.length})</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <BlogCard key={p.slug} post={toSummary(p)} />)}
          </div>
        </section>
      </div>
    </>
  );
}
