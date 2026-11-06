import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ComplianceNote from '@/components/ComplianceNote';
import DataTable from '@/components/DataTable';
import DownloadCTA from '@/components/DownloadCTA';
import IndustryIcon from '@/components/IndustryIcon';
import JsonLd from '@/components/JsonLd';
import PlayBadge from '@/components/PlayBadge';
import { Phone } from '@/components/AppGraphics';
import { CheckList } from '@/components/feature-pages/FeatureBlocks';
import {
  FaqList, ProblemGrid, ReadingList, SectionIntro, ToolCards, WorkflowMap, linkClass,
} from '@/components/solutions/SolutionBlocks';
import { INDUSTRIES, getIndustry } from '@/lib/industries';
import { INDUSTRY_PHOTOS } from '@/lib/industry-photos';
import { absoluteUrl, faqLd, pageMeta } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return pageMeta({ title: i.seoTitle, description: i.metaDescription, path: `/industries/${i.slug}` });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) notFound();
  const path = `/industries/${i.slug}`;
  const others = INDUSTRIES.filter((x) => x.slug !== i.slug);
  const photo = INDUSTRY_PHOTOS[i.slug];

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: i.h1,
            description: i.metaDescription,
            url: absoluteUrl(path),
            inLanguage: 'en-IN',
            about: { '@type': 'Thing', name: `E-way bills for ${i.name}` },
            isPartOf: { '@type': 'CollectionPage', name: 'E-way bills by industry', url: absoluteUrl('/industries') },
          },
          faqLd(i.faq),
        ]}
      />
      <PageHeader
        eyebrow={`Industry · ${i.name}`}
        title={i.h1}
        description={i.intro}
        crumbs={[{ name: 'Industries', href: '/industries' }, { name: i.shortName, href: path }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PlayBadge placement={`industry-${i.slug}`} />
          <a href="#movements" className="btn-ghost-dark">Which movements need an e-way bill?</a>
        </div>
      </PageHeader>

      <section className="container pt-10">
        <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-amber-500 bg-amber-300/15 px-5 py-4 text-ink">
          <p className="leading-7"><strong>Quick answer:</strong> {i.quickAnswer}</p>
        </div>
      </section>

      <section className="section pb-0" aria-labelledby="docs-h">
        <div className="container grid items-center gap-8 lg:grid-cols-2">
          {photo && (
            <figure>
              <div className="relative aspect-[3/2] overflow-hidden rounded-[1.75rem] bg-brand-900 shadow-lift">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
                <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-brand-950">{i.shortName}</span>
              </div>
              <figcaption className="mt-2 text-xs text-ink-faint">Photo: {photo.credit} on Unsplash. Illustrative, not an E-Way Easy customer.</figcaption>
            </figure>
          )}
          <div>
            <p className="eyebrow">Documents for every dispatch</p>
            <h2 id="docs-h" className="h2 mt-2">Sales invoice and e-way bill for {i.shortName}</h2>
            <ul className="mt-6 space-y-3">
              <li className="rounded-2xl border border-brand-900/10 bg-white p-4 shadow-card">
                <p className="font-display font-bold text-ink">Sales invoice with GST</p>
                <p className="mt-1 text-[15px] leading-6 text-ink-soft">
                  GST-registered and selling taxable goods? Issue a tax invoice with GSTIN, HSN and CGST + SGST or IGST.{' '}
                  <Link href="/invoice-generator" className={linkClass}>Make one free</Link>.
                </p>
              </li>
              <li className="rounded-2xl border border-brand-900/10 bg-white p-4 shadow-card">
                <p className="font-display font-bold text-ink">Invoice without GST</p>
                <p className="mt-1 text-[15px] leading-6 text-ink-soft">
                  Not registered, composition or exempt goods? A bill or bill of supply with no tax charged.{' '}
                  <Link href="/invoice-generator#without-gst" className={linkClass}>Make a bill without GST</Link>.
                </p>
              </li>
              <li className="rounded-2xl border border-brand-900/10 bg-white p-4 shadow-card">
                <p className="font-display font-bold text-ink">E-way bill</p>
                <p className="mt-1 text-[15px] leading-6 text-ink-soft">
                  Needed when the consignment value is over ₹50,000, and always for inter-state job work.{' '}
                  <a href="#movements" className={linkClass}>See which {i.shortName.toLowerCase()} movements need one</a>.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="profile">
        <div className="container">
          <SectionIntro id="profile" eyebrow="How goods move" title={`What dispatch looks like in ${i.name.toLowerCase()}`} />
          <ProblemGrid items={i.profile} />
        </div>
      </section>

      <section id="movements" className="section scroll-mt-20 bg-white" aria-labelledby="movements-h">
        <div className="container">
          <SectionIntro id="movements-h" eyebrow="E-way bill position" title="Common movements and the e-way bill rule">
            <p>
              The ₹50,000 limit is checked per consignment, including GST. Some movements need an e-way bill whatever the
              value. See the <Link href="/eway-bill-rules" className={linkClass}>e-way bill rules</Link> for the full picture.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-5xl">
            <DataTable
              caption={`Goods movements in ${i.name.toLowerCase()} and when an e-way bill is needed`}
              columns={['Movement', 'Document', 'E-way bill']}
              rows={i.movements.map((m) => ({ label: m.scenario, cells: [m.document, m.ewayBill] }))}
            />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="mistakes">
        <div className="container">
          <SectionIntro id="mistakes" eyebrow="Watch out" title="Where dispatch paperwork goes wrong" />
          <CheckList items={i.painPoints} />
        </div>
      </section>

      <section className="section bg-brand-950 text-white" aria-labelledby="fit">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">E-Way Easy app</p>
            <h2 id="fit" className="mt-3 font-display text-3xl font-bold md:text-4xl">How E-Way Easy helps your dispatch desk</h2>
            <div className="mt-8 rounded-2xl bg-white p-1 text-ink">
              <WorkflowMap rows={i.appFit.map((r) => ({ need: r.need, app: r.how }))} />
            </div>
          </div>
          <div className="mx-auto hidden lg:block">
            <Phone screen="review" width={240} alt="E-Way Easy review e-way bill screen with buyer, HSN, distance and vehicle details (sample data)" />
          </div>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="volume">
        <div className="mx-auto max-w-3xl">
          <h2 id="volume" className="font-display text-xl font-semibold text-ink">Shipping hundreds of consignments a day?</h2>
          <div className="mt-4">
            <ComplianceNote title="Bulk and high volume">
              <p>{i.volumeNote}</p>
              <p>
                Read the <Link href="/bulk-eway-bill-generation" className={linkClass}>bulk e-way bill guide</Link> and
                clean your file first with the{' '}
                <Link href="/tools/bulk-eway-bill-data-checker" className={linkClass}>bulk e-way bill data checker</Link>.
              </p>
            </ComplianceNote>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="checklist">
        <div className="container">
          <SectionIntro id="checklist" eyebrow="Before the truck leaves" title="Pre-dispatch checklist" />
          <ul className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
            {i.checklist.map((c) => (
              <li key={c} className="flex items-start gap-3 rounded-2xl border border-brand-900/10 bg-cream px-4 py-3 text-[15px] leading-6 text-ink">
                <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-700 text-[11px] font-bold text-white">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free tools" title={`Free tools for ${i.name.toLowerCase()} businesses`} />
          <ToolCards items={i.tools} />
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="read">
        <div className="container">
          <SectionIntro id="read" eyebrow="Read next" title="Related guides" />
          <ReadingList items={i.related} />
        </div>
      </section>

      <FaqList id="faq" faq={i.faq} />

      <section className="container pb-8" aria-labelledby="other-industries">
        <h2 id="other-industries" className="font-display text-xl font-bold text-ink">Other industries</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/industries/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-brand-900/15 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-brand-600 hover:text-brand-700">
                <IndustryIcon name={o.icon} className="h-4 w-4" /> {o.shortName}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-faint">
          General information, not tax advice. Check current rules on the official{' '}
          <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className="underline">e-way bill portal</a>.
          E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      </section>

      <div className="container py-16 md:py-20">
        <DownloadCTA placement={`industry-${i.slug}-footer`} />
      </div>
    </>
  );
}
