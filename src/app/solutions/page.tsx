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

const ROLE_RULES = [
  { when: "You make goods and load trucks most days, often to many buyers in different states.", href: "/solutions/manufacturers", label: "Manufacturers" },
  { when: "You sell the same products to repeat buyers in many small dispatches.", href: "/solutions/wholesalers-distributors", label: "Wholesalers & distributors" },
  { when: "You carry goods for others and handle vehicle changes, delays and shared loads.", href: "/solutions/transporters", label: "Transporters" },
  { when: "You prepare invoices, returns or dispatch data for clients and check it for errors.", href: "/solutions/accountants", label: "Accountants" },
];

const HUB_FAQ = [
  {
    q: "Is there a different plan or price for each business type?",
    a: "No. Everyone uses the same app and the same pay-as-you-go credits: ₹5 per e-way bill action, charged only when it succeeds, with no yearly subscription.",
  },
  {
    q: "Can a transporter use E-Way Easy without being the supplier?",
    a: "Yes. A transporter can update Part B, extend validity and create a consolidated e-way bill. If neither the supplier nor the recipient generated the e-way bill, the transporter must do it before the goods move.",
  },
  {
    q: "We dispatch hundreds of e-way bills a day. Is this for us?",
    a: "Probably not as your main tool. The app works one invoice at a time, so the portal’s bulk upload or an ERP integration is the better fit. The free bulk data checker still helps you clean the upload file.",
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

      <section className="section pt-0" aria-labelledby="which-fits">
        <div className="container max-w-4xl">
          <h2 id="which-fits" className="h2">Which solution fits your business?</h2>
          <p className="mt-4 leading-7 text-ink-soft">
            Pick by what you do with goods, not by your company size. If you sell and dispatch your own goods, start with
            manufacturers or wholesalers. If you move other people’s goods, start with transporters. If you prepare GST data
            for clients, start with accountants. Many businesses use two of these pages.
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-900/10">
                  <th scope="col" className="p-4 font-semibold">If your day looks like this…</th>
                  <th scope="col" className="p-4 font-semibold">Start with</th>
                </tr>
              </thead>
              <tbody className="align-top">
                {ROLE_RULES.map((r) => (
                  <tr key={r.href} className="border-b border-brand-900/5 last:border-0">
                    <td className="p-4 text-ink-soft">{r.when}</td>
                    <td className="p-4"><Link href={r.href} className="font-semibold text-brand-700 underline">{r.label}</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="h2 mt-14">What every business gets, and what the app does not do</h2>
          <p className="mt-4 leading-7 text-ink-soft">
            Every business gets the same app: make a GST invoice, review the e-way bill details and generate it on the
            official e-way bill system, then manage it. Creating invoices is free; each e-way bill action costs ₹5 and is
            charged only when it succeeds. The pages differ in the problems they solve, not in hidden features.
          </p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-ink-soft">
            <li className="rounded-2xl bg-white p-4"><strong className="text-ink">One invoice at a time.</strong> Bulk generation is not an app feature. For hundreds of e-way bills a day from an ERP, the portal’s <Link href="/bulk-eway-bill-generation" className="text-brand-700 underline">bulk upload</Link> or an API integration fits better.</li>
            <li className="rounded-2xl bg-white p-4"><strong className="text-ink">No e-invoice (IRN).</strong> IRN generation is not part of the app. If e-invoicing applies to you, generate the IRN through your usual route; check with the <Link href="/tools/einvoice-applicability-checker" className="text-brand-700 underline">e-invoice applicability checker</Link>.</li>
            <li className="rounded-2xl bg-white p-4"><strong className="text-ink">Android only.</strong> The app is on Google Play for Android phones; an iOS version and team accounts are not listed features.</li>
          </ul>

          <h2 className="h2 mt-14">Common questions</h2>
          <div className="mt-6 grid gap-3">
            {HUB_FAQ.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white p-5">
                <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
                <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="container pb-16 md:pb-24">
        <DownloadCTA placement="solutions-hub" />
      </div>
    </>
  );
}
