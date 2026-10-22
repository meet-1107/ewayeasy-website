import Link from 'next/link';
import type { GuidanceBlock } from '@/lib/templates/catalog';

/** Renders catalog guidance blocks inside a .prose-content container. */
export default function GuidanceBlocks({ blocks, level = 'h2' }: { blocks: GuidanceBlock[]; level?: 'h2' | 'h3' }) {
  const H = level;
  return (
    <>
      {blocks.map((b) => (
        <section key={b.heading} className="[&>*+*]:mt-5">
          <H>{b.heading}</H>
          {b.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {b.bullets && (
            <ul>
              {b.bullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
          {b.links && b.links.length > 0 && (
            <p className="text-[15px]">
              Read more:{' '}
              {b.links.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && ' · '}
                  <Link href={l.href}>{l.title}</Link>
                </span>
              ))}
            </p>
          )}
        </section>
      ))}
    </>
  );
}
