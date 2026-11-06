import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import IndustryIcon from '@/components/IndustryIcon';
import JsonLd from '@/components/JsonLd';
import { ReadingList, SectionIntro } from '@/components/solutions/SolutionBlocks';
import { INDUSTRIES } from '@/lib/industries';
import { EWAY_BILL_PHOTO, INDUSTRY_PHOTOS } from '@/lib/industry-photos';
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

      <section className="container pt-10" aria-label="Goods on the move">
        <figure className="relative overflow-hidden rounded-[1.75rem] bg-brand-900 shadow-lift">
          <Image src={EWAY_BILL_PHOTO.src} alt={EWAY_BILL_PHOTO.alt} width={1200} height={800} priority className="h-56 w-full object-cover sm:h-72 md:h-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <figcaption className="absolute inset-y-0 left-0 flex max-w-md flex-col justify-end p-6 text-white md:p-8">
            <span className="font-display text-2xl font-bold leading-tight md:text-3xl">Every truck needs the right invoice and e-way bill.</span>
            <span className="mt-2 text-xs text-white/75">Photo: {EWAY_BILL_PHOTO.credit} on Unsplash.</span>
          </figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="list">
        <div className="container">
          <SectionIntro id="list" eyebrow="Choose your sector" title="Industry guides" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRIES.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-brand-900/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift"
                >
                  {INDUSTRY_PHOTOS[i.slug] && (
                    <span className="relative -mx-6 -mt-6 mb-4 block aspect-[3/2] overflow-hidden rounded-t-[1.5rem]">
                      <Image src={INDUSTRY_PHOTOS[i.slug].src} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </span>
                  )}
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
          <p className="mt-4 text-xs text-ink-faint">
            Photos: {[...new Set(Object.values(INDUSTRY_PHOTOS).map((p) => p.credit))].join(', ')} on Unsplash. Illustrative, not E-Way Easy customers.
          </p>
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
