import { notFound } from 'next/navigation';
import BlogListing from '@/components/BlogListing';
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
  return pageMeta({ title: `${cat.name} Articles`, description: cat.description, path: `/blog/category/${cat.slug}` });
}
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = CATEGORIES.find((x) => x.slug === category);
  if (!cat) notFound();
  return (
    <BlogListing
      title={`${cat.name} articles`}
      description={cat.description}
      crumbs={[{ name: 'Blog', href: '/blog' }, { name: cat.name, href: `/blog/category/${cat.slug}` }]}
      category={cat.slug}
      page={1}
      basePath={`/blog/category/${cat.slug}`}
    />
  );
}
