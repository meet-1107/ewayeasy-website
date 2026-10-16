import Link from 'next/link';
import BlogCard from './BlogCard';
import BlogExplorer from './BlogExplorer';
import PageHeader from './PageHeader';
import type { Crumb } from './Breadcrumbs';
import { getAllPosts, toSummary } from '@/lib/content';

export const PAGE_SIZE = 9;

export default function BlogListing({
  title, description, crumbs, category, page, basePath,
}: { title: string; description: string; crumbs: Crumb[]; category?: string; page: number; basePath: string }) {
  const all = getAllPosts();
  const pool = category ? all.filter((p) => p.category === category) : all;
  const pages = Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
  const items = pool.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(toSummary);
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`);

  return (
    <>
      <PageHeader eyebrow="E-Way Easy blog" title={title} description={description} crumbs={crumbs} />
      <div className="container py-12">
        <BlogExplorer all={all.map(toSummary)} activeCategory={category}>
          {items.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-ink-soft">No articles in this category yet.</p>
          )}
          {pages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              {page > 1 && <Link href={href(page - 1)} className="btn-ghost py-2" rel="prev">← Newer</Link>}
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={href(n)}
                  aria-current={n === page ? 'page' : undefined}
                  className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${n === page ? 'bg-brand-700 text-white' : 'bg-white text-ink-soft hover:text-brand-700'}`}
                >
                  {n}
                </Link>
              ))}
              {page < pages && <Link href={href(page + 1)} className="btn-ghost py-2" rel="next">Older →</Link>}
            </nav>
          )}
        </BlogExplorer>
      </div>
    </>
  );
}

export function pageCount(category?: string) {
  const all = getAllPosts();
  const pool = category ? all.filter((p) => p.category === category) : all;
  return Math.max(1, Math.ceil(pool.length / PAGE_SIZE));
}
