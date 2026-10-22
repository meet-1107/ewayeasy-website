'use client';
import { useMemo, useState, type ReactNode } from 'react';

export type GalleryItem = { id: string; tags: string[]; card: ReactNode };

/**
 * Grid of template cards with an optional tag filter. Cards are rendered on the server and passed in,
 * so thumbnails stay server-rendered and the filter only toggles visibility.
 */
export default function TemplateGallery({
  items,
  showFilter,
  label = 'Filter templates by use',
}: {
  items: GalleryItem[];
  showFilter: boolean;
  label?: string;
}) {
  const [tag, setTag] = useState<string>('all');
  const tags = useMemo(() => {
    const seen: string[] = [];
    for (const it of items) for (const t of it.tags) if (!seen.includes(t)) seen.push(t);
    return seen;
  }, [items]);
  const visible = tag === 'all' ? items : items.filter((it) => it.tags.includes(tag));
  const filterOn = showFilter && items.length >= 3;

  return (
    <div>
      {filterOn && (
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
            {['all', ...tags].map((t) => {
              const active = tag === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTag(t)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                    active ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                  }`}
                >
                  {t === 'all' ? 'All templates' : t}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-ink-soft" role="status" aria-live="polite">
            {visible.length} template{visible.length === 1 ? '' : 's'}
          </p>
        </>
      )}
      <ul className={`grid gap-5 sm:grid-cols-2 ${items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} ${filterOn ? 'mt-3' : ''}`}>
        {items.map((it) => (
          <li key={it.id} hidden={!visible.includes(it)}>
            {it.card}
          </li>
        ))}
      </ul>
    </div>
  );
}
