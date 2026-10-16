import Link from 'next/link';
import JsonLd from './JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export type Crumb = { name: string; href: string };

export default function Breadcrumbs({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  const base = light ? 'text-brand-100/80' : 'text-ink-faint';
  return (
    <nav aria-label="Breadcrumb" className={`text-sm ${base}`}>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <span aria-hidden>›</span>
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className={light ? 'text-white' : 'text-ink-soft'}>{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
