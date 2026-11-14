import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

// Everything is crawlable, including Bingbot and AI crawlers; we rely on canonical URLs and the sitemaps,
// not robots.txt, to keep the index clean. (The old non-standard Host: line is gone.)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/cover/'] }],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/feed.xml`],
  };
}
