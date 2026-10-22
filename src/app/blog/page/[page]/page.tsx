import { notFound } from 'next/navigation';
import BlogListing, { pageCount } from '@/components/BlogListing';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from({ length: pageCount() - 1 }, (_, i) => ({ page: String(i + 2) }));
}
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  return pageMeta({ title: `Blog: Page ${page}`, description: `Page ${page} of the E-Way Easy blog: practical, source-checked articles on e-way bills, GST invoicing and compliance for Indian businesses.`, path: `/blog/page/${page}` });
}
export default async function BlogPage({ params }: { params: Promise<{ page: string }> }) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2) notFound();
  return (
    <BlogListing
      title={`E-way bill, GST and invoicing blog: page ${n}`}
      description="Clear, source-checked articles for Indian businesses."
      crumbs={[{ name: 'Blog', href: '/blog' }, { name: `Page ${n}`, href: `/blog/page/${n}` }]}
      page={n}
      basePath="/blog"
    />
  );
}
