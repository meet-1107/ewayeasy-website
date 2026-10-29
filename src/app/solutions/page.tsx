import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import { Phone } from '@/components/AppGraphics';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Way Bill Solutions for Manufacturers, Traders & Accountants',
  description:
    'How E-Way Easy and its free GST tools fit your business: manufacturers, wholesalers and distributors, transporters, and accountants who prepare GST data for clients.',
  path: '/solutions',
});

const SOLUTIONS = [
  {
    href: '/solutions/manufacturers',
    eyebrow: 'Manufacturers',
    title: 'E-way bills for dispatch-heavy factories',
    text: 'Make the sales invoice and review e-way bill details in one flow while the truck is being loaded.',
    link: 'E-way bill workflow for manufacturers',
  },
  {
    href: '/solutions/wholesalers-distributors',
    eyebrow: 'Wholesalers & distributors',
    title: 'Many small dispatches to repeat buyers',
    text: 'Pick saved buyers and products instead of retyping GSTINs, addresses and HSN codes for every order.',
    link: 'E-way bill workflow for wholesalers',
  },
  {
    href: '/solutions/transporters',
    eyebrow: 'Transporters',
    title: 'Part B, vehicle changes and consolidated loads',
    text: 'Update vehicle and transporter details, extend validity and create a consolidated e-way bill for several consignments in one truck.',
    link: 'E-way bill workflow for transporters',
  },
  {
    href: '/solutions/accountants',
    eyebrow: 'Accountants & GST practitioners',
    title: 'Free checks for the data you prepare',
    text: 'Use the free GSTR-1, reconciliation and e-way bill data checkers, and point dispatching clients to the app.',
    link: 'Free GST tools for accountants',
  },
];

export default function SolutionsHubPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business solutions"
        title="E-Way Easy for the way your business moves goods"
        description="Pick the page closest to your work. Each one explains the daily problem, how the app and free tools help, and what they do not do."
        crumbs={[{ name: 'Solutions', href: '/solutions' }]}
      />

      <section className="section" aria-labelledby="solutions-list">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 id="solutions-list" className="h2">Choose your business type</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {SOLUTIONS.map((s) => (
                <article key={s.href} className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{s.text}</p>
                  <Link
                    href={s.href}
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-800"
                  >
                    {s.link}
                    <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-3xl border border-brand-900/10 bg-white p-6">
              <h2 className="font-display text-xl font-semibold text-ink">Not sure which fits?</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Start with the three-step flow: Invoice → Review EWB → Generated.
              </p>
              <Link href="/how-it-works" className="btn-primary mt-4">See how it works</Link>
            </div>
          </div>
          <div className="mx-auto hidden lg:block">
            <Phone
              screen="dashboard"
              width={240}
              alt="E-Way Easy dashboard with business GSTIN, total sales for the financial year and invoice and e-way bill counts"
            />
          </div>
        </div>
      </section>

      <div className="container pb-16 md:pb-24">
        <DownloadCTA placement="solutions-hub" />
      </div>
    </>
  );
}
