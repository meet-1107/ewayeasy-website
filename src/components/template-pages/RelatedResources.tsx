import Link from 'next/link';
import ToolIcon from '@/components/tools/ToolIcon';
import { getTool, toolHref } from '@/lib/tools';
import type { GuideLink, RelatedToolSlug } from '@/lib/templates/catalog';

/** Sidebar-style list of related free tools and guides. */
export default function RelatedResources({
  tools,
  guides,
  toolsHeading = 'Free tools that help',
  guidesHeading = 'Related guides',
}: {
  tools: RelatedToolSlug[];
  guides: GuideLink[];
  toolsHeading?: string;
  guidesHeading?: string;
}) {
  return (
    <div className="space-y-8">
      {tools.length > 0 && (
        <section aria-labelledby="related-tools-h">
          <h2 id="related-tools-h" className="eyebrow">{toolsHeading}</h2>
          <ul className="mt-3 space-y-3">
            {tools.map((slug) => {
              const t = getTool(slug);
              return (
                <li key={slug}>
                  <Link href={toolHref(slug)} className="card flex gap-3 p-4 transition hover:border-brand-500">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <ToolIcon icon={t.icon} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="mt-0.5 block text-sm text-ink-soft">{t.description}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
      {guides.length > 0 && (
        <section aria-labelledby="related-guides-h" className="rounded-2xl bg-brand-50 p-5">
          <h2 id="related-guides-h" className="font-display font-bold text-ink">{guidesHeading}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {guides.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="font-medium text-brand-700 hover:underline">{g.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
