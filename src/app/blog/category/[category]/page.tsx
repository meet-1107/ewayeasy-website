import { notFound } from 'next/navigation';
import BlogListing from '@/components/BlogListing';
import CategoryGuide, { CategoryAnswer } from '@/components/CategoryGuide';
import { CATEGORY_GUIDES, categoryIndexable } from '@/lib/category-guides';
import { pageMeta } from '@/lib/seo';
import { CATEGORIES } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find((x) => x.slug === category);
  if (!cat) return {};
  return pageMeta({
    title: `${cat.name} Articles`,
    description: cat.description,
    path: `/blog/category/${cat.slug}`,
    noindex: !categoryIndexable(cat.slug),
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find((x) => x.slug === category);
  if (!cat) notFound();
  const guide = CATEGORY_GUIDES[cat.slug];
  return (
    <BlogListing
      title={`${cat.name} articles`}
      description={cat.description}
      crumbs={[{ name: 'Blog', href: '/blog' }, { name: cat.name, href: `/blog/category/${cat.slug}` }]}
      category={cat.slug}
      page={1}
      basePath={`/blog/category/${cat.slug}`}
      intro={guide ? <CategoryAnswer guide={guide} /> : undefined}
      after={guide ? <CategoryGuide guide={guide} name={cat.name} /> : undefined}
    />
  );
}
