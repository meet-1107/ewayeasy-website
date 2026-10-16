import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked, type Tokens } from 'marked';

const ROOT = path.join(process.cwd(), 'content');

export type Source = { title: string; url: string };
export type Faq = { q: string; a: string };
export type TocItem = { id: string; text: string; depth: number };

export interface Doc {
  slug: string;
  title: string;
  excerpt: string;
  seoTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  updatedAt: string;
  verifiedAt?: string;
  imageAlt?: string;
  sources: Source[];
  faq: Faq[];
  related: string[];
  html: string;
  toc: TocItem[];
  readingMinutes: number;
  words: number;
  /** Generated thumbnail cover (public/images/covers/<slug>.jpg) when present. */
  image?: string;
}
export interface Post extends Doc { category: string; tags: string[] }
export interface Guide extends Doc { updateHistory: { date: string; note: string }[] }

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// TOC text is rendered by React (which escapes it), so undo marked's HTML escaping first.
function decodeEntities(s: string) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function render(md: string) {
  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        let id = slugify(text) || 'section';
        const n = used.get(id) ?? 0;
        used.set(id, n + 1);
        if (n) id = `${id}-${n}`;
        if (depth === 2 || depth === 3) toc.push({ id, text: decodeEntities(inner.replace(/<[^>]+>/g, '')), depth });
        const level = Math.max(depth, 2); // the page owns the only H1
        return `<h${level} id="${id}">${inner}</h${level}>\n`;
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        const external = /^https?:\/\//.test(href);
        const t = title ? ` title="${title}"` : '';
        return external
          ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${inner}</a>`
          : `<a href="${href}"${t}>${inner}</a>`;
      },
      table(token: Tokens.Table) {
        const inline = (cell: Tokens.TableCell) => marked.parseInline(cell.text) as string;
        const head = token.header.map((c) => `<th>${inline(c)}</th>`).join('');
        const rows = token.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');
        return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const html = marked.parse(md) as string;
  const words = md.split(/\s+/).filter(Boolean).length;
  return { html, toc, words, readingMinutes: Math.max(1, Math.round(words / 220)) };
}

function coverFor(slug: string) {
  const rel = `/images/covers/${slug}.jpg`;
  return fs.existsSync(path.join(process.cwd(), 'public', rel)) ? rel : undefined;
}

function toDateString(v: unknown): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v ? String(v) : '';
}

function readDir<T>(dir: string, map: (data: Record<string, unknown>, body: string, slug: string) => T): T[] {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(full, f), 'utf8');
      const { data, content } = matter(raw);
      return map(data, content, f.replace(/\.md$/, ''));
    });
}

function base(data: Record<string, unknown>, body: string, file: string): Doc {
  const r = render(body);
  const publishedAt = toDateString(data.publishedAt) || toDateString(data.updatedAt);
  return {
    slug: String(data.slug ?? file),
    title: String(data.title ?? file),
    excerpt: String(data.excerpt ?? data.description ?? ''),
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    metaDescription: data.metaDescription ? String(data.metaDescription) : undefined,
    publishedAt,
    updatedAt: toDateString(data.updatedAt) || publishedAt,
    verifiedAt: toDateString(data.verifiedAt) || undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    sources: (data.sources as Source[]) ?? [],
    faq: (data.faq as Faq[]) ?? [],
    related: (data.related as string[]) ?? [],
    image: coverFor(String(data.slug ?? file)),
    ...r,
  };
}

let postsCache: Post[] | null = null;
export function getAllPosts(): Post[] {
  if (!postsCache) {
    postsCache = readDir('blog', (data, body, file) => ({
      ...base(data, body, file),
      category: String(data.category ?? 'eway-bill'),
      tags: ((data.tags as string[]) ?? []).map(String),
    })).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }
  return postsCache;
}
export function getPost(slug: string) {
  return getAllPosts().find((p) => p.slug === slug);
}

let guidesCache: Guide[] | null = null;
export function getAllGuides(): Guide[] {
  if (!guidesCache) {
    guidesCache = readDir('guides', (data, body, file) => ({
      ...base(data, body, file),
      updateHistory: ((data.updateHistory as { date: unknown; note: string }[]) ?? []).map((h) => ({
        date: toDateString(h.date),
        note: String(h.note),
      })),
    }));
  }
  return guidesCache;
}
export function getGuide(slug: string) {
  return getAllGuides().find((g) => g.slug === slug);
}

export function relatedPosts(post: Post, n = 3): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const picked = post.related.map((s) => all.find((p) => p.slug === s)).filter(Boolean) as Post[];
  for (const p of all) {
    if (picked.length >= n) break;
    if (!picked.includes(p) && p.category === post.category) picked.push(p);
  }
  return picked.slice(0, n);
}

/** Lightweight shape passed to client components (no HTML body). */
export function toSummary(p: Post) {
  return {
    slug: p.slug, title: p.title, excerpt: p.excerpt, category: p.category, tags: p.tags,
    publishedAt: p.publishedAt, publishedLabel: formatDate(p.publishedAt), readingMinutes: p.readingMinutes, image: p.image,
  };
}

export function formatDate(iso: string) {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}
