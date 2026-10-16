import { notFound } from 'next/navigation';
import BlogListing, { pageCount } from '@/components/BlogListing';
import { pageMeta } from '@/lib/seo';
import { CATEGORIES } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  const out: { category: string; page: string }[] = [];
  for (const c of CATEGORIES) for (let n = 2; n <= pageCount(c.slug); n++) out.push({ category: c.slug, page: String(n) });
  // Static export needs at least one param set; this placeholder route 404s.
  return out.length ? out : [{ category: 'eway-bill', page: '1' }];
}
export async function generateMetadata({ params }: { params: Promise<{ category: string; page: string }> }) {
  const { category, page } = await params;
  const cat = CATEGORIES.find((x) => x.slug === category);
  if (!cat) return {};
  return pageMeta({ title: `${cat.name} Articles: Page ${page}`, description: cat.description, path: `/blog/category/${cat.slug}/page/${page}` });
}
export default async function CategoryPaged({ params }: { params: Promise<{ category: string; page: string }> }) {
  const { category, page } = await params;
  const cat = CATEGORIES.find((x) => x.slug === category);
  const n = Number(page);
  if (!cat || !Number.isInteger(n) || n < 2 || n > pageCount(cat.slug)) notFound();
  return (
    <BlogListing
      title={`${cat.name} articles: page ${n}`}
      description={cat.description}
      crumbs={[{ name: 'Blog', href: '/blog' }, { name: cat.name, href: `/blog/category/${cat.slug}` }, { name: `Page ${n}`, href: `/blog/category/${cat.slug}/page/${n}` }]}
      category={cat.slug}
      page={n}
      basePath={`/blog/category/${cat.slug}`}
    />
  );
}
