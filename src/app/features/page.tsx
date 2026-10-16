import Link from 'next/link';
import type { ReactNode } from 'react';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone, WorkflowGraphic } from '@/components/AppGraphics';
import { pageMeta, absoluteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'E-Way Easy Features: Invoice to E-Way Bill on Android',
  description:
    'See what the E-Way Easy Android app does: a 3-step invoice to e-way bill flow, buyer GSTIN auto-fill, HSN from saved products, PIN-code distance and invoice numbering.',
  path: '/features',
});

type Where = 'app' | 'web';

interface Feature {
  title: string;
  where: Where;
  text: ReactNode;
  cta: { label: string; href: string };
  icon: ReactNode;
}

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const FEATURES: Feature[] = [
  {
    title: 'Sales Invoice Management',
    where: 'app',
    text: 'The sales invoice is created as step one of the e-way bill flow, so the same details carry forward instead of being typed twice. Saved seller details, buyers and products keep each invoice quick.',
    cta: { label: 'E-way bill vs sales invoice', href: '/eway-bill-vs-sales-invoice' },
    icon: (
      <g {...S}>
        <path d="M6 3h9l3 3v15l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 21V3Z" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </g>
    ),
  },
  {
    title: 'E-Way Bill Generation Workflow',
    where: 'app',
    text: 'A clear three-step flow: 1 Invoice → 2 Review EWB → 3 Generated. You check the e-way bill details on a review screen before moving to generation.',
    cta: { label: 'How e-way bill generation works', href: '/eway-bill-generation' },
    icon: (
      <g {...S}>
        <path d="M2 7h11v9H2zM13 10h4.5L21 13.5V16h-8" />
        <circle cx="6" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </g>
    ),
  },
  {
    title: 'GSTIN Verification & Buyer Auto-fill',
    where: 'app',
    text: 'Enter the buyer’s GSTIN and the name, address, state and PIN code fill in automatically. For an unregistered buyer, leave the GSTIN empty and enter details yourself.',
    cta: { label: 'Documents needed for an e-way bill', href: '/documents-required-for-eway-bill' },
    icon: (
      <g {...S}>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <circle cx="9" cy="11" r="2.2" />
        <path d="M5.8 16c.6-1.6 1.8-2.4 3.2-2.4s2.6.8 3.2 2.4M14.5 10h3.5M14.5 13.5h2.5" />
      </g>
    ),
  },
  {
    title: 'HSN Code Assistance',
    where: 'app',
    text: 'Save the HSN code with each product once. When you pick the product on an invoice, the HSN fills in automatically — and you can still edit it manually.',
    cta: { label: 'Try the free HSN code lookup', href: '/tools/hsn-code-lookup' },
    icon: (
      <g {...S}>
        <path d="M4 9h16M4 15h16M10 4 8 20M16 4l-2 16" />
      </g>
    ),
  },
  {
    title: 'Distance Calculation',
    where: 'app',
    text: 'Distance is calculated automatically from the dispatch and delivery PIN codes. If the actual route differs, edit it manually within the limits the e-way bill rules allow.',
    cta: { label: 'Read the distance rules', href: '/eway-bill-distance-rules' },
    icon: (
      <g {...S}>
        <circle cx="6" cy="6" r="2.5" />
        <path d="M6 8.5V12a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4" />
        <path d="M18 3.5c-1.9 0-3.3 1.4-3.3 3.2 0 2.3 3.3 5.3 3.3 5.3s3.3-3 3.3-5.3c0-1.8-1.4-3.2-3.3-3.2Z" />
      </g>
    ),
  },
  {
    title: 'Product and Rate Selection',
    where: 'app',
    text: 'Keep a saved product list and search it while creating the invoice. Pick a product instead of retyping its name, HSN and details every time.',
    cta: { label: 'Quantity and tax calculator', href: '/tools/quantity-and-tax-calculator' },
    icon: (
      <g {...S}>
        <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
        <path d="m4 7 8 4 8-4M12 11v10" />
      </g>
    ),
  },
  {
    title: 'Invoice Number Series',
    where: 'app',
    text: 'Set an invoice pre-series once and the app numbers invoices in your own series automatically, helping avoid gaps and duplicate numbers.',
    cta: { label: 'Create an invoice online', href: '/tools/invoice-generator' },
    icon: (
      <g {...S}>
        <rect x="3" y="4" width="18" height="16" rx="2.5" />
        <path d="M7 9h2v6M13 9h3l-3 6h3" />
      </g>
    ),
  },
  {
    title: 'Bank Details on Invoices',
    where: 'web',
    text: 'Want bank details printed on your invoice? Add them in our free invoice tools on this website. Bank details selection is not listed as an app feature at this time.',
    cta: { label: 'Open the free invoice generator', href: '/tools/invoice-generator' },
    icon: (
      <g {...S}>
        <path d="M3 9.5 12 4l9 5.5M4.5 10v8M9 10v8M15 10v8M19.5 10v8M3 20h18" />
      </g>
    ),
  },
  {
    title: 'Invoice Preview and Printing',
    where: 'app',
    text: 'Preview the sales invoice in the app before saving, so you can catch a wrong quantity, rate or buyer detail before the e-way bill step. Need an invoice to print from your computer? Try the free sales invoice generator on this website.',
    cta: { label: 'Free sales invoice generator', href: '/tools/sales-invoice-generator' },
    icon: (
      <g {...S}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    ),
  },
  {
    title: 'Bulk Workflow Guidance',
    where: 'web',
    text: 'Bulk e-way bill generation is not an app feature. If you dispatch many consignments a day, our guide explains how bulk generation works on the official portal.',
    cta: { label: 'Read the bulk e-way bill guide', href: '/bulk-eway-bill-generation' },
    icon: (
      <g {...S}>
        <rect x="7" y="3" width="13" height="13" rx="2" />
        <path d="M4 7v11a2 2 0 0 0 2 2h11" />
        <path d="M10.5 8h6M10.5 11.5h4" />
      </g>
    ),
  },
  {
    title: 'Business Productivity Dashboard',
    where: 'app',
    text: 'The dashboard shows your business name and GSTIN, total sales for the financial year, invoice and e-way bill counts, and recent activity — plus an Import PDF option.',
    cta: { label: 'See the app screens', href: '#screens' },
    icon: (
      <g {...S}>
        <path d="M4 20V11M10 20V5M16 20v-6M21 20H3" />
      </g>
    ),
  },
  {
    title: 'Mobile Accessibility',
    where: 'app',
    text: 'Built mobile-first for Android, so you can prepare the invoice and e-way bill details from your phone — at the factory, warehouse or on the road. Help is available inside the app.',
    cta: { label: 'Download for Android', href: '/download' },
    icon: (
      <g {...S}>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
        <path d="M10.5 18.5h3" />
      </g>
    ),
  },
];

const TAG: Record<Where, { label: string; className: string }> = {
  app: { label: 'In the app', className: 'bg-brand-50 text-brand-700 ring-brand-500/20' },
  web: { label: 'On this website', className: 'bg-amber-300/25 text-amber-600 ring-amber-500/30' },
};

function FeatureCard({ f, index }: { f: Feature; index: number }) {
  const id = `feature-${index}`;
  const tag = TAG[f.where];
  return (
    <article aria-labelledby={id} className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${
            f.where === 'app' ? 'bg-brand-700 text-white' : 'bg-amber-500 text-brand-950'
          }`}
          aria-hidden
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6">{f.icon}</svg>
        </span>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${tag.className}`}>{tag.label}</span>
      </div>
      <h3 id={id} className="mt-5 font-display text-lg font-semibold leading-snug text-ink">{f.title}</h3>
      <p className="mt-2 text-sm leading-6 text-ink-soft">{f.text}</p>
      <Link
        href={f.cta.href}
        className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-800"
      >
        {f.cta.label}
        <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}

const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  operatingSystem: 'ANDROID',
  applicationCategory: 'BusinessApplication',
  url: absoluteUrl('/download'),
  description: SITE.description,
  image: absoluteUrl('/images/app-dashboard.jpg'),
  screenshot: [absoluteUrl('/images/app-dashboard.jpg'), absoluteUrl('/images/app-new-invoice.jpg')],
};

export default function FeaturesPage() {
  const appCount = FEATURES.filter((f) => f.where === 'app').length;
  return (
    <>
      <JsonLd data={softwareLd} />
      <PageHeader
        eyebrow="Features"
        title="Everything E-Way Easy does — and what it doesn’t"
        description="From the sales invoice to a reviewed e-way bill in three steps, on your Android phone. Each feature below is tagged so you know whether it is in the app or on this website."
        crumbs={[{ name: 'Features', href: '/features' }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-amber">Get the Android app</Link>
          <a href="#all-features" className="btn-ghost-dark">See all features</a>
        </div>
      </PageHeader>

      {/* Workflow */}
      <section className="section" aria-labelledby="workflow">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 id="workflow" className="h2 mt-2">Invoice → Review EWB → Generated</h2>
            <p className="mt-4 text-ink-soft">
              The sales invoice is the starting point. Buyer, product, HSN and distance details flow into the e-way bill
              review screen, where you check everything before generation.
            </p>
          </div>
          <div className="mt-10">
            <WorkflowGraphic />
          </div>
          <p className="mt-4 text-xs text-ink-faint">Sample data shown for illustration.</p>
        </div>
      </section>

      {/* Feature grid */}
      <section id="all-features" className="section scroll-mt-20 bg-white" aria-labelledby="features-heading">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Features</p>
              <h2 id="features-heading" className="h2 mt-2">Built around the details you type every day</h2>
            </div>
            <ul className="flex flex-wrap gap-2 text-xs" aria-label="Legend">
              <li className="rounded-full bg-brand-50 px-3 py-1 font-semibold text-brand-700 ring-1 ring-inset ring-brand-500/20">
                In the app · {appCount}
              </li>
              <li className="rounded-full bg-amber-300/25 px-3 py-1 font-semibold text-amber-600 ring-1 ring-inset ring-amber-500/30">
                On this website · {FEATURES.length - appCount}
              </li>
            </ul>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Screens */}
      <section id="screens" className="section scroll-mt-20" aria-labelledby="screens-heading">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Real app screens</p>
            <h2 id="screens-heading" className="h2 mt-2">See it before you install</h2>
            <ul className="mt-6 space-y-4 text-ink-soft">
              <li className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white" aria-hidden>1</span>
                <span>
                  <strong className="text-ink">Dashboard</strong> — business name and GSTIN, financial-year sales, invoice and
                  e-way bill counts, wallet credits, recent activity and Import PDF.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white" aria-hidden>2</span>
                <span>
                  <strong className="text-ink">New invoice</strong> — saved seller details, buyer GSTIN with auto-fill, saved
                  buyers and products, and your invoice number series.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-ink-faint">
              Pay as you go: 1 credit = ₹1 and each e-way bill action (generate, Part-B update, consolidate, cancel, extend) costs 5 credits, charged only when it succeeds. See <a className="underline" href="/pricing">pricing</a>.
            </p>
          </div>
          <div className="relative mx-auto flex w-full max-w-md items-start justify-center gap-4 sm:gap-6">
            <div aria-hidden className="absolute inset-x-4 top-10 bottom-0 rounded-[3rem] bg-gradient-to-br from-amber-400/30 via-brand-400/25 to-transparent blur-2xl" />
            <Phone
              screen="dashboard"
              width={210}
              alt="E-Way Easy dashboard with business GSTIN, wallet credits, total sales for the financial year and a create invoice button"
              className="relative"
            />
            <Phone
              screen="invoice"
              width={210}
              alt="E-Way Easy new invoice screen with the 3-step progress bar, seller details and buyer GSTIN auto-fill"
              className="relative mt-12 hidden sm:block"
            />
          </div>
        </div>
      </section>

      {/* Honest limits */}
      <section className="container pb-16 md:pb-20" aria-labelledby="limits">
        <div className="mx-auto max-w-3xl">
          <h2 id="limits" className="sr-only">What the app does not do</h2>
          <ComplianceNote title="Honest limits">
            <p>
              E-way bills are generated through the official e-way bill system. E-Way Easy helps you prepare the invoice and
              e-way bill details on your phone — it does not replace the government portal, and it is not affiliated with
              GSTN or NIC.
            </p>
            <p>
              Bulk e-way bill generation, e-invoice (IRN) generation and an iPhone app are not app features. Features can
              differ between app versions, so check the latest version on Google Play.
            </p>
            <p>
              For the rules themselves, see the <Link href="/eway-bill-rules" className="font-medium text-brand-700 underline underline-offset-2">e-way bill rules</Link> and
              the <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline underline-offset-2">official e-way bill portal</a>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <div className="container pb-16 md:pb-24">
        <DownloadCTA
          placement="features"
          title="Try the 3-step flow on your phone"
          text="Save your buyers and products once, then go from sales invoice to reviewed e-way bill details in minutes."
        />
      </div>
    </>
  );
}
