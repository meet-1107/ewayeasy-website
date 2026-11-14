import { getAllGuides, getAllPosts } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';
import { AUTHOR, SITE, categoryName } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// RFC 822 date at 09:00 IST, matching the time used in Article markup.
const rfc822 = (d: string) => new Date(`${d}T09:00:00+05:30`).toUTCString();

/** RSS 2.0 feed of articles and guides, newest change first. Bing accepts RSS as a sitemap. */
export function GET() {
  const items = [
    ...getAllPosts().map((p) => ({
      title: p.title, path: `/blog/${p.slug}`, desc: p.metaDescription ?? p.excerpt,
      date: p.updatedAt ?? p.publishedAt, category: categoryName(p.category), image: p.image,
    })),
    ...getAllGuides().map((g) => ({
      title: g.title, path: `/${g.slug}`, desc: g.metaDescription ?? g.excerpt,
      date: g.updatedAt ?? g.publishedAt, category: 'Guide', image: g.image,
    })),
  ].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

  const body = items
    .map((i) => [
      '    <item>',
      `      <title>${esc(i.title)}</title>`,
      `      <link>${absoluteUrl(i.path)}</link>`,
      `      <guid isPermaLink="true">${absoluteUrl(i.path)}</guid>`,
      i.date ? `      <pubDate>${rfc822(i.date)}</pubDate>` : '',
      `      <dc:creator>${esc(AUTHOR.name)}</dc:creator>`,
      `      <category>${esc(i.category)}</category>`,
      `      <description>${esc(i.desc ?? '')}</description>`,
      i.image ? `      <enclosure url="${absoluteUrl(i.image)}" type="image/jpeg" length="0" />` : '',
      '    </item>',
    ].filter(Boolean).join('\n'))
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(SITE.name)}: e-way bill and GST invoice guides</title>
    <link>${absoluteUrl('/')}</link>
    <atom:link href="${absoluteUrl('/feed.xml')}" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.description)}</description>
    <language>en-IN</language>
    ${items[0]?.date ? `<lastBuildDate>${rfc822(items[0].date)}</lastBuildDate>` : ''}
${body}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
