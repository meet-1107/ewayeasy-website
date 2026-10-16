import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { getAllGuides, getAllPosts } from './content';
import { absoluteUrl } from './seo';
import { AUTHOR, CATEGORIES } from './site';
import { TOOLS, toolHref } from './tools';
import { pageCount } from '@/components/BlogListing';

export type Entry = { path: string; lastmod?: string; changefreq?: 'weekly' | 'monthly'; priority?: number };

// Routes that never belong in a sitemap (internal render pages, dynamic segments handled elsewhere).
const EXCLUDE_TOP = new Set(['cover', 'tools', 'blog', 'authors']);

/** Static marketing pages discovered from src/app (every folder with a page.tsx and no dynamic segment). */
function staticPages(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const out: string[] = [];
  const walk = (dir: string, segs: string[]) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory() || e.name.startsWith('[') || e.name.startsWith('(') || e.name.startsWith('_') || e.name.includes('.')) continue;
      if (segs.length === 0 && EXCLUDE_TOP.has(e.name)) continue;
      const next = [...segs, e.name];
      if (fs.existsSync(path.join(dir, e.name, 'page.tsx'))) out.push('/' + next.join('/'));
      walk(path.join(dir, e.name), next);
    }
  };
  walk(appDir, []);
  return ['/', ...out.sort()];
}

const PRIORITY: Record<string, number> = { '/': 1, '/download': 0.9, '/features': 0.9, '/how-it-works': 0.8, '/pricing': 0.8, '/guides': 0.8 };

export const SITEMAPS: Record<string, () => Entry[]> = {
  pages: () =>
    staticPages().map((p) => ({
      path: p,
      changefreq: p === '/' || p === '/updates' ? 'weekly' : 'monthly',
      priority: PRIORITY[p] ?? (/(privacy|terms|refund|disclaimer)/.test(p) ? 0.3 : 0.6),
    })),
  tools: () => [
    { path: '/tools', changefreq: 'monthly', priority: 0.8 },
    ...TOOLS.map((t) => ({ path: toolHref(t.slug), changefreq: 'monthly' as const, priority: 0.7 })),
  ],
  guides: () => getAllGuides().map((g) => ({ path: `/${g.slug}`, lastmod: g.updatedAt, changefreq: 'monthly', priority: 0.8 })),
  blog: () => {
    const posts = getAllPosts();
    const entries: Entry[] = [
      { path: '/blog', lastmod: posts[0]?.updatedAt, changefreq: 'weekly', priority: 0.6 },
      { path: `/authors/${AUTHOR.slug}`, lastmod: posts[0]?.updatedAt, priority: 0.5 },
      ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updatedAt, priority: 0.6 })),
    ];
    for (const c of CATEGORIES) {
      entries.push({ path: `/blog/category/${c.slug}`, priority: 0.4 });
      for (let n = 2; n <= pageCount(c.slug); n++) entries.push({ path: `/blog/category/${c.slug}/page/${n}`, priority: 0.2 });
    }
    for (let n = 2; n <= pageCount(); n++) entries.push({ path: `/blog/page/${n}`, priority: 0.2 });
    return entries;
  },
};

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

export function urlsetXml(entries: Entry[]): string {
  const body = entries
    .map((e) =>
      [
        '  <url>',
        `    <loc>${esc(absoluteUrl(e.path))}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : '',
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : '',
        e.priority !== undefined ? `    <priority>${e.priority.toFixed(1)}</priority>` : '',
        '  </url>',
      ].filter(Boolean).join('\n'),
    )
    .join('\n');
  return `${xmlHeader}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

export function indexXml(): string {
  const latest = (e: Entry[]) => e.map((x) => x.lastmod).filter(Boolean).sort().pop();
  const items = Object.entries(SITEMAPS)
    .map(([name, fn]) => {
      const lm = latest(fn());
      return `  <sitemap>\n    <loc>${esc(absoluteUrl(`/sitemap-${name}.xml`))}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ''}\n  </sitemap>`;
    })
    .join('\n');
  return `${xmlHeader}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

export function xmlResponse(xml: string) {
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
