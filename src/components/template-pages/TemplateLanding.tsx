import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import TemplateEditor from '@/components/templates/TemplateEditor';
import TemplateCard from './TemplateCard';
import GuidanceBlocks from './GuidanceBlocks';
import FaqSection from './FaqSection';
import RelatedResources from './RelatedResources';
import { absoluteUrl } from '@/lib/seo';
import { TEMPLATE_KIND, categoryHref, templateHref, templatesOf, type DocumentKind, type TemplateId } from '@/lib/templates/ids';
import { CATEGORY_CONTENT, categoryContent, templateContent } from '@/lib/templates/catalog';

const CTA_COPY: Record<DocumentKind, { title?: string; text?: string }> = {
  'sales-invoice': {},
  'purchase-order': {
    title: 'Selling goods within India too?',
    text: 'E-Way Easy helps you create the sales invoice, review the e-way bill details and generate it, all from your phone.',
  },
  'commercial-invoice': {
    title: 'Moving goods by road within India?',
    text: 'For domestic dispatches, E-Way Easy helps you create the sales invoice, review the e-way bill details and generate it from your phone.',
  },
};

/**
 * Template page: compact header, the editor immediately below it, then the explainer content.
 * Everything except the editor is hidden when printing.
 */
export default function TemplateLanding({ id }: { id: TemplateId }) {
  const t = templateContent(id);
  const kind = TEMPLATE_KIND[id];
  const c = categoryContent(kind);
  const path = templateHref(id);
  const siblings = templatesOf(kind).filter((x) => x !== id);
  const otherKinds = (Object.keys(CATEGORY_CONTENT) as DocumentKind[]).filter((k) => k !== kind);
  const isCustoms = kind === 'commercial-invoice';

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t.h1,
            description: t.metaDescription,
            url: absoluteUrl(path),
            inLanguage: 'en-IN',
            isPartOf: { '@type': 'CollectionPage', name: c.h1, url: absoluteUrl(categoryHref(kind)) },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: `How to fill in the ${t.name}`,
            step: t.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
          },
        ]}
      />

      <header className="no-print relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />
        <div className="container relative py-6 md:py-8">
          <Breadcrumbs crumbs={[{ name: c.name, href: categoryHref(kind) }, { name: t.name, href: path }]} light />
          <h1 className="mt-3 max-w-4xl font-display text-2xl font-bold leading-tight md:text-4xl">{t.h1}</h1>
          <p className="mt-2 max-w-3xl text-brand-100/90 md:text-lg">{t.intro}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Template features">
            {t.features.map((f) => (
              <li key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{f}</li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-label={`${t.name} editor`} className="container py-6 md:py-8">
        <TemplateEditor templateId={id} />
      </section>

      <div className="no-print">
        <div className="container grid grid-cols-1 gap-12 pb-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-12">
            <article className="prose-content max-w-none">
              <h2>What this template includes</h2>
              <dl className="mt-4 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
                {t.includes.map((f) => (
                  <div key={f.label} className="grid gap-1 p-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-4">
                    <dt className="font-semibold text-ink">{f.label}</dt>
                    <dd className="text-[15px] leading-7 text-ink-soft">{f.detail}</dd>
                  </div>
                ))}
              </dl>

              <h2>Example use case (illustrative)</h2>
              {t.example.body.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}

              <h2>How to fill in the {t.name}</h2>
              <ol>
                {t.steps.map((s) => (
                  <li key={s.name}>
                    <strong>{s.name}.</strong> {s.text}
                  </li>
                ))}
              </ol>

              <GuidanceBlocks blocks={t.guidance} />
            </article>

            <FaqSection faq={t.faq} />

            <ComplianceNote title="Please note">
              <p>
                This template is a layout to help you prepare the document; it does not check that the result meets{' '}
                {isCustoms ? 'customs, GST or foreign trade' : 'GST or contract'} requirements. The details you enter are your
                responsibility.{' '}
                {isCustoms
                  ? 'Always check the destination country’s customs requirements and confirm with your freight forwarder, courier or customs broker.'
                  : 'Check current rules on the GST portal or with your tax adviser.'}{' '}
                E-Way Easy is not a government portal and is not affiliated with GSTN, NIC or CBIC.
              </p>
            </ComplianceNote>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <RelatedResources tools={t.relatedTools} guides={t.relatedGuides} />
          </aside>
        </div>

        <div className="container space-y-12 pb-16">
          <section aria-labelledby="related-templates-h">
            <h2 id="related-templates-h" className="font-display text-2xl font-bold text-ink md:text-3xl">
              Other {c.documentName} templates
            </h2>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s}>
                  <TemplateCard id={s} compact />
                </li>
              ))}
              <li>
                <Link href={categoryHref(kind)} className="card flex h-full flex-col justify-center p-5 transition hover:border-brand-500">
                  <span className="font-display text-lg font-bold text-ink">All {c.name.toLowerCase()}</span>
                  <span className="mt-1 text-sm text-ink-soft">Compare every layout and when to use each one.</span>
                  <span className="mt-3 text-sm font-semibold text-brand-700">See all →</span>
                </Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="other-kinds-h">
            <h2 id="other-kinds-h" className="font-display text-xl font-bold text-ink">More business document templates</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {otherKinds.map((k) => {
                const o = CATEGORY_CONTENT[k];
                return (
                  <li key={k} className="card p-5">
                    <Link href={categoryHref(k)} className="font-display text-lg font-bold text-ink hover:text-brand-700">{o.name}</Link>
                    <ul className="mt-2 space-y-1 text-sm">
                      {templatesOf(k).map((x) => (
                        <li key={x}>
                          <Link href={templateHref(x)} className="font-medium text-brand-700 hover:underline">
                            {templateContent(x).h1}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </section>

          <DownloadCTA placement={`template-${id}`} {...CTA_COPY[kind]} />
        </div>
      </div>
    </>
  );
}
