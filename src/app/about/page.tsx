import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { AUTHOR, OFFICIAL_SOURCES, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About E-Way Easy',
  description:
    'E-Way Easy is an Android app that brings the sales invoice and e-way bill workflow onto your phone. Learn who it is for, what it does and how we write our guides.',
  path: '/about',
});

const FEATURES = [
  'A dashboard with your business name and GSTIN, total sales for the financial year, invoice and e-way bill counts, and recent activity.',
  'A three-step flow: 1 Invoice → 2 Review EWB → 3 Generated.',
  'Seller details saved once. Enter the buyer GSTIN and the name, address, state and PIN fill in automatically (leave it empty for unregistered buyers).',
  'Saved buyers and products, with product search. The HSN code fills in from the product, and you can still edit it.',
  'Distance calculated automatically from the PIN codes, with the option to edit it manually.',
  'Invoice numbering in your own series with a pre-series and auto numbering.',
  'An invoice preview before saving, an Import PDF option on the dashboard, a credit-based wallet and in-app help.',
];

const AUDIENCE = [
  { title: 'Manufacturers', text: 'Dispatching goods to buyers every day and tired of preparing the same details twice.' },
  { title: 'Wholesalers and traders', text: 'Handling repeat buyers and a steady product list where saved data saves the most time.' },
  { title: 'Distributors', text: 'Moving stock across towns and states, where distance and validity matter on every trip.' },
  { title: 'Accountants', text: 'Supporting clients who need cleaner invoice and e-way bill records with fewer re-dos.' },
];

const PROBLEMS = [
  'The sales invoice is made in one place and the e-way bill details are typed again somewhere else.',
  'Distance between PIN codes is worked out by hand.',
  'Invoice numbers are tracked manually, which leads to gaps or duplicates.',
  'HSN codes are entered fresh every time for products you sell regularly.',
  'A small mistake in Part A means cancelling and starting over.',
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="About E-Way Easy"
        description="An Android app that keeps the sales invoice and e-way bill workflow in one place, on your phone."
        crumbs={[{ name: 'About', href: '/about' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl prose-content">
          <h2>What E-Way Easy is</h2>
          <p>
            {SITE.name} is a mobile-first Android app for Indian businesses that move goods. Instead of preparing a
            sales invoice in one tool and then re-entering the same details for the e-way bill, you create the invoice,
            review the e-way bill details and move to generation in one flow.
          </p>
          <p>What the app does today:</p>
          <ul>
            {FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <p>
            You can see these screens on the <Link href="/features">features page</Link>. We only describe what the app
            actually does — if something is not listed here, please do not assume it is available.
          </p>

          <h2>The problem we are trying to solve</h2>
          <p>
            For many small and mid-sized businesses, the e-way bill itself is not the hard part. The repetition around it
            is:
          </p>
          <ul>
            {PROBLEMS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p>
            E-Way Easy is built to cut down that repetition by saving the details you use again and again, and by filling
            in what can be filled in automatically — while leaving every field editable so you stay in control.
          </p>
        </div>

        <section className="mx-auto mt-12 max-w-5xl" aria-labelledby="who-for">
          <p className="eyebrow">Who it is for</p>
          <h2 id="who-for" className="h2 mt-2">Built for businesses that dispatch goods</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCE.map((a) => (
              <div key={a.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-12 max-w-3xl prose-content">
          <h2>How we write our guides</h2>
          <p>
            The guides, blog posts and free tools on this website are written by{' '}
            <Link href={`/authors/${AUTHOR.slug}`}>{AUTHOR.name}</Link>. Compliance articles are checked against official
            GST and e-way bill sources and show a &ldquo;last verified&rdquo; date, so you know how recent the information
            is. Where a rule depends on your state, transaction or a specific notification, we say so and point you to the
            official source rather than guessing a number.
          </p>
          <p>The official sources we refer to most often:</p>
          <ul>
            {OFFICIAL_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
          <p>
            If you spot something that looks out of date, please tell us through the <Link href="/contact">contact page</Link>.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ComplianceNote title="Not a government portal">
            <p>
              {SITE.name} is an independent product. It is not a government portal and is not affiliated with, endorsed
              by or connected to GSTN, NIC or any government department. Official e-way bill services are available on
              the government&rsquo;s own portals. See our <Link href="/disclaimer" className="underline">disclaimer</Link>{' '}
              for details.
            </p>
          </ComplianceNote>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <DownloadCTA placement="about" />
        </div>
      </div>
    </>
  );
}
