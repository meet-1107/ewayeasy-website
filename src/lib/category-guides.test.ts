import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { describe, expect, it, vi } from 'vitest';

// content.ts is server-only; read the post frontmatter directly instead.
vi.mock('./content', () => {
  const dir = path.join(process.cwd(), 'content', 'blog');
  const posts = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    return { slug: data.slug as string, category: data.category as string, title: data.title as string };
  });
  return { getAllPosts: () => posts };
});

const { CATEGORY_GUIDES, categoryIndexable } = await import('./category-guides');
const { getAllPosts } = await import('./content');
const { CATEGORIES } = await import('./site');

const words = (s: string) => s.trim().split(/\s+/).length;

describe('category guides', () => {
  const posts = getAllPosts();
  for (const [slug, g] of Object.entries(CATEGORY_GUIDES)) {
    it(`${slug}: links only to posts in that category, with a 40–60 word answer`, () => {
      expect(CATEGORIES.some((c) => c.slug === slug)).toBe(true);
      for (const s of g.startHere) {
        const post = posts.find((p) => p.slug === s.slug);
        expect(post, s.slug).toBeDefined();
        expect(post!.category).toBe(slug);
      }
      expect(words(g.answer)).toBeGreaterThanOrEqual(40);
      expect(words(g.answer)).toBeLessThanOrEqual(60);
      expect(g.faq.length).toBeGreaterThanOrEqual(2);
    });
  }

  it('keeps near-empty hubs out of the index', () => {
    expect(categoryIndexable('product-updates')).toBe(false);
    expect(categoryIndexable('eway-bill')).toBe(true);
  });
});
