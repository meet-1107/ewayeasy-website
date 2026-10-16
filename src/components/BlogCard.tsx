import Link from 'next/link';
import { BlogCover } from './AppGraphics';
import { AUTHOR, categoryName } from '@/lib/site';

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  publishedLabel: string;
  readingMinutes: number;
  image?: string;
};

export default function BlogCard({ post }: { post: PostSummary }) {
  return (
    <article className="card group flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="block aspect-video overflow-hidden">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt="" loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <BlogCover category={post.category} title={post.title} className="h-full w-full transition duration-500 group-hover:scale-105" />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/blog/category/${post.category}`} className="chip self-start">{categoryName(post.category)}</Link>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">{post.title}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{post.excerpt}</p>
        <p className="mt-auto pt-4 text-xs text-ink-faint">
          By <Link href={`/authors/${AUTHOR.slug}`} className="font-medium text-ink-soft hover:underline">{AUTHOR.name}</Link>
          {' · '}<time dateTime={post.publishedAt}>{post.publishedLabel}</time>{' · '}{post.readingMinutes} min read
        </p>
      </div>
    </article>
  );
}
