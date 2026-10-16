import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleLayout from '@/components/ArticleLayout';
import BlogCard from '@/components/BlogCard';
import JsonLd from '@/components/JsonLd';
import { getAllPosts, getPost, relatedPosts, toSummary } from '@/lib/content';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { AUTHOR, SITE, categoryName } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({
    title: p.seoTitle ?? p.title,
    description: p.metaDescription ?? p.excerpt,
    path: `/blog/${p.slug}`,
    type: 'article',
    publishedTime: p.publishedAt,
    modifiedTime: p.updatedAt,
    image: p.image,
    authors: [AUTHOR.name],
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post).map(toSummary);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.metaDescription ?? post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { '@type': 'Person', name: AUTHOR.name, url: absoluteUrl(`/authors/${AUTHOR.slug}`) },
          publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: absoluteUrl('/favicon.svg') } },
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl(post.image ?? "/images/og-default.png"),
          articleSection: categoryName(post.category),
          keywords: post.tags.join(', '),
          wordCount: post.words,
          inLanguage: 'en-IN',
        }}
      />
      <ArticleLayout
        doc={post}
        category={post.category}
        placement={`blog-${post.slug}`}
        crumbs={[
          { name: 'Blog', href: '/blog' },
          { name: categoryName(post.category), href: `/blog/category/${post.category}` },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
        eyebrow={
          <div className="flex flex-wrap gap-2">
            <Link href={`/blog/category/${post.category}`} className="chip">{categoryName(post.category)}</Link>
            {post.tags.slice(0, 3).map((t) => <span key={t} className="chip bg-cream text-ink-soft">#{t}</span>)}
          </div>
        }
        after={
          related.length > 0 && (
            <section className="container pb-8">
              <h2 className="h2">Related articles</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => <BlogCard key={r.slug} post={r} />)}
              </div>
            </section>
          )
        }
      />
    </>
  );
}
