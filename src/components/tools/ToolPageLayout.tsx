import Link from 'next/link';
import type { ReactNode } from 'react';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import ToolIcon from './ToolIcon';
import ToolUsageTracker from './ToolUsageTracker';
import { faqLd } from '@/lib/seo';
import { getTool, toolHref } from '@/lib/tools';

export type Faq = { q: string; a: string };

/**
 * Shared shell for every free tool page: header, interactive tool, explainer, FAQ, disclaimer,
 * related tools and download CTA. Everything except the tool itself is hidden when printing.
 */
export default function ToolPageLayout({
  slug,
  title,
  description,
  eyebrow = 'Free tool',
  tool,
  children,
  faq,
  related,
  disclaimer,
}: {
  slug: string;
  title: string;
  description: string;
  eyebrow?: string;
  tool: ReactNode;
  children: ReactNode; // explanatory content
  faq: Faq[];
  related: string[];
  disclaimer?: ReactNode;
}) {
  const t = getTool(slug);
  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <div className="no-print">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          crumbs={[{ name: 'Free Tools', href: '/tools' }, { name: t.name, href: toolHref(slug) }]}
        />
      </div>

      <div className="container py-8 md:py-12">
        <ToolUsageTracker slug={slug}>{tool}</ToolUsageTracker>
      </div>

      <div className="no-print">
        <div className="container grid grid-cols-1 gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-10">
            <article className="prose-content max-w-none">{children}</article>

            <section aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="font-display text-2xl font-bold text-ink">Frequently asked questions</h2>
              <div className="mt-4 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
                {faq.map((f) => (
                  <details key={f.q} className="group p-4 md:p-5">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
                      {f.q}
                      <span aria-hidden className="mt-0.5 text-brand-600 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-[15px] leading-7 text-ink-soft">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <ComplianceNote title="Disclaimer">
              {disclaimer ?? (
                <p>
                  This tool performs calculations only. It does not determine the legally correct tax treatment, rate or
                  classification for your transaction. Check the current law and notifications on the{' '}
                  <a className="underline" href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>{' '}
                  and <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>, or ask
                  your tax adviser. E-Way Easy is not affiliated with GSTN or NIC.
                </p>
              )}
            </ComplianceNote>
          </div>

          <aside aria-labelledby="related-heading" className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="related-heading" className="eyebrow">Related tools</h2>
            <ul className="mt-3 space-y-3">
              {related.map((s) => {
                const r = getTool(s);
                return (
                  <li key={s}>
                    <Link href={toolHref(s)} className="card flex gap-3 p-4 transition hover:border-brand-500">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <ToolIcon icon={r.icon} className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{r.name}</span>
                        <span className="mt-0.5 block text-sm text-ink-soft">{r.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/tools" className="text-sm font-semibold text-brand-700 hover:underline">All free tools →</Link>
              </li>
            </ul>
          </aside>
        </div>

        <div className="container pb-16">
          <DownloadCTA placement={`tools-${slug}`} />
        </div>
      </div>
    </>
  );
}
