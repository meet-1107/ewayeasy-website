import BlogListing from '@/components/BlogListing';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Way Bill, GST & Invoicing Blog',
  description: 'Practical articles on e-way bill rules, validity, bulk generation, GST calculation, HSN codes and sales invoices for Indian businesses. By Bhavesh Akabari.',
  path: '/blog',
});

export default function BlogIndex() {
  return (
    <BlogListing
      title="E-way bill, GST and invoicing blog"
      description="Clear, source-checked articles for manufacturers, wholesalers, traders and accountants across India."
      crumbs={[{ name: 'Blog', href: '/blog' }]}
      page={1}
      basePath="/blog"
    />
  );
}
