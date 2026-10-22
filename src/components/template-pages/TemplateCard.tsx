import Link from 'next/link';
import TemplateThumbnail from '@/components/templates/TemplateThumbnail';
import { templateHref, type TemplateId } from '@/lib/templates/ids';
import { templateContent } from '@/lib/templates/catalog';

/** Card for one template: preview, name, who it is for, tags and a link to the editor page. */
export default function TemplateCard({
  id,
  headingLevel = 'h3',
  compact = false,
}: {
  id: TemplateId;
  headingLevel?: 'h2' | 'h3';
  compact?: boolean;
}) {
  const t = templateContent(id);
  const href = templateHref(id);
  const Heading = headingLevel;
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="block border-b border-brand-900/10 bg-brand-50/60 p-4 transition hover:bg-brand-50"
      >
        <div role="img" aria-label={`Preview of the ${t.name} template`} className="mx-auto max-w-[260px]">
          <TemplateThumbnail templateId={id} className="w-full shadow-card" />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Heading className="font-display text-lg font-bold text-ink">
          <Link href={href} className="hover:text-brand-700">{t.name}</Link>
        </Heading>
        <p className="mt-1 flex-1 text-sm leading-6 text-ink-soft">{t.audience}</p>
        {!compact && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {t.tags.map((tag) => (
              <li key={tag} className="chip">{tag}</li>
            ))}
          </ul>
        )}
        <Link href={href} className="btn-primary mt-4 w-full sm:w-fit" aria-label={`Customise the ${t.name} template`}>
          Customise this template
        </Link>
      </div>
    </article>
  );
}
