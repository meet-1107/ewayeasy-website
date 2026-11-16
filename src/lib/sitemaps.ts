import 'server-only';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { getAllGuides, getAllPosts } from './content';
import { absoluteUrl } from './seo';
import { AUTHOR, CATEGORIES } from './site';
import { categoryIndexable } from './category-guides';
import { TOOLS, toolHref } from './tools';
import { CATEGORY_SLUGS, categoryHref, templateHref, templatesOf, type DocumentKind } from './templates/ids';
import { INDUSTRIES } from './industries';
import { INDUSTRY_PHOTOS } from './industry-photos';

export type Entry = { path: string; lastmod?: string; changefreq?: 'weekly' | 'monthly'; priority?: number; images?: string[] };

// lastmod = the day the page's source last changed (git commit date, or file time for uncommitted work).
// Accurate freshness signals help Bing and Google recrawl only what changed.
const dateCache = new Map<string, string | undefined>();
function changed(...files: string[]): string | undefined {
  const dates = files.map((rel) => {
    if (dateCache.has(rel)) return dateCache.get(rel);
    const abs = path.join(process.cwd(), rel);
    let d: string | undefined;
    if (fs.existsSync(abs)) {
      try {
        const dirty = execFileSync('git', ['status', '--porcelain', '--', rel], { encoding: 'utf8' }).trim();
        if (!dirty) d = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], { encoding: 'utf8' }).trim() || undefined;
      } catch { /* not a git checkout */ }
      d ??= fs.statSync(abs).mtime.toISOString().slice(0, 10);
    }
    dateCache.set(rel, d);
    return d;
  });
  return dates.filter(Boolean).sort().pop();
}
const pageFile = (p: string) => (p === '/' ? 'src/app/page.tsx' : `src/app${p}/page.tsx`);

// Routes that never belong in a sitemap (internal render pages, dynamic segments handled elsewhere).
const EXCLUDE_TOP = new Set(['cover', 'tools', 'blog', 'authors', ...Object.values(CATEGORY_SLUGS)]);

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
    [
      ...staticPages().map((p): Entry => ({
        path: p,
        lastmod: changed(pageFile(p)),
        changefreq: p === '/' || p === '/updates' ? 'weekly' : 'monthly',
        priority: PRIORITY[p] ?? (/(privacy|terms|refund|disclaimer)/.test(p) ? 0.3 : 0.6),
      })),
      ...INDUSTRIES.map((i) => ({
        path: `/industries/${i.slug}`,
        lastmod: changed('src/lib/industries.ts', 'src/app/industries/[slug]/page.tsx', 'src/lib/industry-photos.ts'),
        changefreq: 'monthly' as const,
        priority: 0.7,
        images: INDUSTRY_PHOTOS[i.slug] ? [INDUSTRY_PHOTOS[i.slug].src] : undefined,
      })),
    ],
  tools: () => [
    { path: '/tools', lastmod: changed('src/app/tools/page.tsx', 'src/lib/tools.ts'), changefreq: 'monthly', priority: 0.8 },
    // Tools merged into other sections (href set) are listed under their own sitemap, not here.
    ...TOOLS.filter((t) => !t.href).map((t) => ({ path: toolHref(t.slug), lastmod: changed(`src/app/tools/${t.slug}/page.tsx`), changefreq: 'monthly' as const, priority: 0.7 })),
  ],
  templates: () =>
    (Object.keys(CATEGORY_SLUGS) as DocumentKind[]).flatMap((kind) => [
      { path: categoryHref(kind), lastmod: changed('src/lib/templates/catalog.ts'), changefreq: 'monthly' as const, priority: 0.8 },
      ...templatesOf(kind).map((id) => ({ path: templateHref(id), lastmod: changed('src/lib/templates/catalog.ts', 'src/lib/templates/presets.ts'), changefreq: 'monthly' as const, priority: 0.7 })),
    ]),
  guides: () => getAllGuides().map((g) => ({ path: `/${g.slug}`, lastmod: g.updatedAt, changefreq: 'monthly', priority: 0.8, images: g.image ? [g.image] : undefined })),
  blog: () => {
    const posts = getAllPosts();
    const entries: Entry[] = [
      { path: '/blog', lastmod: posts[0]?.updatedAt, changefreq: 'weekly', priority: 0.6 },
      { path: `/authors/${AUTHOR.slug}`, lastmod: posts[0]?.updatedAt, priority: 0.5 },
      ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updatedAt, priority: 0.6, images: p.image ? [p.image] : undefined })),
    ];
    // Category hubs stay; paginated list pages (/page/2…) are left out to reduce crawl waste. They remain linked.
    for (const c of CATEGORIES) {
      if (!categoryIndexable(c.slug)) continue; // noindex hubs stay out of the sitemap
      const latest = posts.filter((p) => p.category === c.slug).map((p) => p.updatedAt).sort().pop();
      entries.push({ path: `/blog/category/${c.slug}`, lastmod: latest, priority: 0.4 });
    }
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
        ...(e.images ?? []).map((src) => `    <image:image><image:loc>${esc(absoluteUrl(src))}</image:loc></image:image>`),
        '  </url>',
      ].filter(Boolean).join('\n'),
    )
    .join('\n');
  return `${xmlHeader}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`;
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
