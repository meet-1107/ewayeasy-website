import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import IndustryIcon from '@/components/IndustryIcon';
import JsonLd from '@/components/JsonLd';
import { ReadingList, SectionIntro } from '@/components/solutions/SolutionBlocks';
import { INDUSTRIES } from '@/lib/industries';
import { absoluteUrl, pageMeta } from '@/lib/seo';

const DESCRIPTION =
  'E-way bill rules and dispatch workflows by industry: FMCG, textile job work, pharma, auto components, machinery and e-commerce, with what the app can and cannot do.';

export const metadata = pageMeta({
  title: 'E-Way Bills by Industry: FMCG, Textile, Pharma, Auto & More',
  description: DESCRIPTION,
  path: '/industries',
});

export default function IndustriesHub() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'E-way bills by industry',
          description: DESCRIPTION,
          url: absoluteUrl('/industries'),
          hasPart: INDUSTRIES.map((i) => ({ '@type': 'WebPage', name: i.h1, url: absoluteUrl(`/industries/${i.slug}`) })),
        }}
      />
      <PageHeader
        eyebrow="Industries"
        title="E-way bills for your industry"
        description="Every sector moves goods differently: job work in textiles, depot transfers in pharma, milk-runs in auto parts, lots in machinery. Pick yours to see the movements, the rules and a dispatch checklist."
        crumbs={[{ name: 'Industries', href: '/industries' }]}
      />

      <section className="section" aria-labelledby="list">
        <div className="container">
          <SectionIntro id="list" eyebrow="Choose your sector" title="Industry guides" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-brand-900/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-700 text-white">
                    <IndustryIcon name={i.icon} />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-bold text-ink">{i.name}</h2>
                  <p className="mt-2 flex-1 text-[15px] leading-7 text-ink-soft">{i.intro}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-700">
                    Read the guide <span aria-hidden className="inline-block transition group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="roles">
        <div className="container">
          <SectionIntro id="roles" eyebrow="By role" title="Looking for your role instead?" />
          <ReadingList
            items={[
              { href: '/solutions/manufacturers', label: 'Manufacturers', text: 'Factory dispatch desks: invoice, HSN, distance and the e-way bill from one phone.' },
              { href: '/solutions/wholesalers-distributors', label: 'Wholesalers & distributors', text: 'Many buyers, repeat products and daily dispatch.' },
              { href: '/solutions/transporters', label: 'Transporters', text: 'Part B, vehicle changes and consolidated e-way bills.' },
              { href: '/solutions/accountants', label: 'Accountants & CAs', text: 'Helping clients keep invoices and e-way bills consistent.' },
            ]}
          />
        </div>
      </section>

      <div className="container py-16 md:py-20">
        <DownloadCTA placement="industries-hub" />
      </div>
    </>
  );
}
