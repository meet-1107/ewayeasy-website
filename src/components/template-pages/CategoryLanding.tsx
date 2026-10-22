import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import TemplateCard from './TemplateCard';
import TemplateGallery from './TemplateGallery';
import HowEditingWorks from './HowEditingWorks';
import GuidanceBlocks from './GuidanceBlocks';
import FaqSection from './FaqSection';
import RelatedResources from './RelatedResources';
import { absoluteUrl } from '@/lib/seo';
import { categoryHref, templateHref, templatesOf, type DocumentKind } from '@/lib/templates/ids';
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

/** Full category landing page: header, template cards, how-it-works, when-to-use guide, FAQ and links. */
export default function CategoryLanding({ kind }: { kind: DocumentKind }) {
  const c = categoryContent(kind);
  const ids = templatesOf(kind);
  const path = categoryHref(kind);
  const others = (Object.keys(CATEGORY_CONTENT) as DocumentKind[]).filter((k) => k !== kind);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: c.h1,
          description: c.metaDescription,
          url: absoluteUrl(path),
          inLanguage: 'en-IN',
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: ids.length,
            itemListElement: ids.map((id, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: templateContent(id).h1,
              url: absoluteUrl(templateHref(id)),
            })),
          },
        }}
      />
      <PageHeader eyebrow={c.eyebrow} title={c.h1} description={c.intro} crumbs={[{ name: c.name, href: path }]}>
        <div className="flex flex-wrap items-center gap-3">
          <a href="#templates" className="btn-amber">Choose a template</a>
          <ul className="flex flex-wrap gap-2 text-xs font-semibold text-brand-100" aria-label="Included with every template">
            {['Free, no sign-up', 'Logo and currency', 'PDF and print', 'A4 · A5 · Letter · Legal'].map((f) => (
              <li key={f} className="rounded-full border border-white/20 px-3 py-1">{f}</li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <div className="container space-y-16 py-10 md:space-y-20 md:py-14">
        <section id="templates" aria-labelledby="templates-h" className="scroll-mt-24">
          <h2 id="templates-h" className="h2">
            {ids.length} {c.documentName} {ids.length === 1 ? 'template' : 'templates'} to customise
          </h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Each one opens in an editor on its own page. Pick the closest fit; every field can be changed.
          </p>
          <div className="mt-6">
            <TemplateGallery
              showFilter={c.showFilter}
              label={`Filter ${c.documentName} templates by use`}
              items={ids.map((id) => ({ id, tags: templateContent(id).tags, card: <TemplateCard id={id} /> }))}
            />
          </div>
        </section>

        <HowEditingWorks documentName={c.documentName} note={c.editingNote} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-14">
            <section aria-labelledby="when-h">
              <p className="eyebrow">Guide</p>
              <h2 id="when-h" className="h2 mt-2">{c.whenToUse.heading}</h2>
              <div className="prose-content mt-4 max-w-none">
                <p>{c.whenToUse.intro}</p>
                <GuidanceBlocks blocks={c.whenToUse.blocks} level="h3" />
                <h3>Which document is which</h3>
                <div className="table-wrap">
                  <table>
                    <caption className="sr-only">Comparison of the {c.documentName} with related business documents</caption>
                    <thead>
                      <tr>
                        <th scope="col">Document</th>
                        <th scope="col">Issued by</th>
                        <th scope="col">What it is for</th>
                        <th scope="col">How it differs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.whenToUse.comparison.map((r) => (
                        <tr key={r.document}>
                          <th scope="row" className="!bg-white">{r.document}</th>
                          <td>{r.issuedBy}</td>
                          <td>{r.purpose}</td>
                          <td>{r.vs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <FaqSection faq={c.faq} />

            <ComplianceNote title="Please note">
              <p>
                These templates are layouts to help you prepare your own documents. They do not check that a document meets
                GST, customs or contract requirements, and the details you enter are your responsibility. Check current rules on
                the{' '}
                <a className="underline" href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>{' '}
                and{' '}
                <a className="underline" href="https://www.cbic.gov.in/" target="_blank" rel="noopener noreferrer">CBIC</a>, or with
                your tax adviser. E-Way Easy is not a government portal and is not affiliated with GSTN or NIC.
              </p>
            </ComplianceNote>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <RelatedResources tools={c.relatedTools} guides={c.relatedGuides} />
          </aside>
        </div>

        <section aria-labelledby="other-cats-h">
          <h2 id="other-cats-h" className="font-display text-2xl font-bold text-ink">Other template categories</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {others.map((k) => {
              const o = CATEGORY_CONTENT[k];
              return (
                <li key={k}>
                  <Link href={categoryHref(k)} className="card block h-full p-5 transition hover:border-brand-500">
                    <span className="block font-display text-lg font-bold text-ink">{o.name}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{o.blurb}</span>
                    <span className="mt-3 block text-sm font-semibold text-brand-700">View templates →</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <DownloadCTA placement={`templates-${kind}`} {...CTA_COPY[kind]} />
      </div>
    </>
  );
}
