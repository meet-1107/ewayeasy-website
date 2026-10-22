import Link from 'next/link';
import Image from 'next/image';
import PlayBadge from '@/components/PlayBadge';
import BlogCard from '@/components/BlogCard';
import UpdateCard from '@/components/UpdateCard';
import JsonLd from '@/components/JsonLd';
import { HeroVisual, AppShowcase, RouteIllustration } from '@/components/AppGraphics';
import { getAllPosts, toSummary } from '@/lib/content';
import { UPDATES } from '@/lib/updates';
import { pageMeta } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'E-Way Easy: Generate E-Way Bills Faster from Your Phone',
  description:
    'Create the sales invoice and e-way bill in one flow on your phone: buyer GSTIN auto-fill, HSN from products, PIN-based distance. ₹5 per e-way bill.',
  path: '/',
});

const HIGHLIGHTS = [
  'Simplified e-way bill workflow',
  'Invoice-based data entry',
  'Product and HSN details',
  'Distance calculation from PIN codes',
  'Invoice preview before saving',
  '₹5 per e-way bill, charged only on success',
];

const FEATURES = [
  { title: 'Sales invoice, created in the flow', text: 'The sales invoice is prepared as step one of the e-way bill workflow, so you don’t make it twice.', icon: 'doc' },
  { title: 'Buyer GSTIN auto-fill', text: 'Enter the buyer’s GSTIN and the name, address, state and PIN fill in automatically.', icon: 'id' },
  { title: 'HSN from your product list', text: 'Pick a saved product and its HSN code comes with it. You can still edit it manually.', icon: 'tag' },
  { title: 'Distance from PIN codes', text: 'Approximate distance is calculated from dispatch and delivery PIN codes. Edit it if the actual route differs.', icon: 'pin' },
  { title: 'Your own invoice series', text: 'Invoice numbers follow your pre-series automatically, e.g. EE/26-27/0042.', icon: 'hash' },
  { title: 'Saved buyers and products', text: 'Search and pick buyers and products instead of typing them again for every dispatch.', icon: 'box' },
  { title: 'Part-B, cancel, consolidate, extend', text: 'Change the vehicle, cancel within 24 hours, consolidate consignments or extend validity from the same app.', icon: 'doc' },
  { title: '₹5 per action, pay only on success', text: '1 credit = ₹1 and each e-way bill action is 5 credits. If the portal rejects it, the credits come back automatically.', icon: 'hash' },
];

const PROBLEMS = [
  'Making the sales invoice separately before the e-way bill',
  'Working out the distance yourself',
  'Typing invoice numbers by hand',
  'Looking up product HSN codes every time',
  'Starting again after one small mistake',
];

const GUIDES = [
  { title: 'How to Generate an E-Way Bill', href: '/eway-bill-generation' },
  { title: 'Documents Required for E-Way Bill', href: '/documents-required-for-eway-bill' },
  { title: 'E-Way Bill Rules in India', href: '/eway-bill-rules' },
  { title: 'Bulk E-Way Bill Generation', href: '/bulk-eway-bill-generation' },
  { title: 'Common E-Way Bill Errors', href: '/eway-bill-common-errors' },
  { title: 'Validity and Distance Rules', href: '/eway-bill-validity' },
  { title: 'Cancellation and Corrections', href: '/eway-bill-cancellation' },
  { title: 'Sales Invoice vs E-Way Bill', href: '/eway-bill-vs-sales-invoice' },
];

const TOOLS = [
  { title: 'GST Calculator', text: 'Add or remove GST, with CGST/SGST or IGST split.', href: '/tools/gst-calculator' },
  { title: 'Sales Invoice Templates', text: 'GST, simple, service and wholesale invoices. Edit, download PDF, print.', href: '/sales-invoice-templates' },
  { title: 'Purchase Order & Commercial Invoice', text: 'Editable PO and export invoice templates in A4, Letter and more.', href: '/purchase-order-templates' },
  { title: 'E-Way Bill Eligibility Checker', text: 'Find out whether your movement may need an e-way bill.', href: '/tools/eway-bill-eligibility-checker' },
  { title: 'Validity Calculator', text: 'Validity days and expiry time from distance.', href: '/tools/distance-calculator' },
  { title: 'GSTIN Validator', text: 'Check format and check digit, decode state and PAN.', href: '/tools/gstin-validator' },
  { title: 'Bulk E-Way Bill Data Checker', text: 'Find errors in invoice rows before bulk upload.', href: '/tools/bulk-eway-bill-data-checker' },
  { title: 'GSTR-2B Reconciliation', text: 'Match your purchase register with GSTR-2B.', href: '/tools/gstr-2b-reconciliation' },
  { title: 'Delivery Challan Generator', text: 'Job work and stock transfer challans, print-ready.', href: '/tools/delivery-challan-generator' },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4',
    id: 'M4 6h16v12H4zM8 10h3M8 14h5M15 10h2v4h-2z',
    tag: 'M3 12V4h8l9 9-8 8zM7.5 8.5h.01',
    pin: 'M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    hash: 'M5 9h14M5 15h14M10 4 8 20M16 4l-2 16',
    box: 'M3 7.5 12 3l9 4.5v9L12 21l-9-4.5zM3 7.5 12 12l9-4.5M12 12v9',
  };
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-700" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[name]} />
      </svg>
    </span>
  );
}

export default function Home() {
  const posts = getAllPosts().slice(0, 6).map(toSummary);
  const updates = UPDATES.slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'E-Way Easy',
          operatingSystem: 'ANDROID',
          applicationCategory: 'BusinessApplication',
          url: `${SITE_URL}/download`,
          description: 'Android app that simplifies the e-way bill workflow from sales invoice to e-way bill for Indian businesses.',
        }}
      />

      {/* A. Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid" />
        <div aria-hidden className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div aria-hidden className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" /> Made for Indian manufacturers, wholesalers and traders
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] md:text-6xl">
              Generate E-Way Bills <span className="text-amber-400">Faster</span> with E-Way Easy
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-brand-100/90">
              Enter the sales invoice once. Buyer details fill in from the GSTIN, HSN comes from your product list and distance is
              worked out from PIN codes. Review it and move on to the next dispatch, all from your mobile.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PlayBadge placement="home-hero" />
              <Link href="/tools" className="btn-ghost-dark">Explore free tools →</Link>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-3 text-sm text-brand-100/90 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-2.5">
                  <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-amber-400" aria-hidden><path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* B. Problem → solution graphics */}
      <section className="section">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">The everyday problem</p>
            <h2 className="h2 mt-3">Why is making an e-way bill such a chore?</h2>
            <p className="mt-4 text-ink-soft">
              The truck is waiting, and the e-way bill still means jumping between the invoice, a distance calculator and the HSN list.
              Every manual step is another chance for an error that sends you back to the start.
            </p>
            <ul className="mt-6 space-y-3">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl bg-white p-3.5 shadow-card">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-red-100 text-red-600" aria-hidden>✕</span>
                  <span className="text-ink">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-4xl shadow-lift">
              <Image
                src="/images/eway-easy-promo.webp"
                alt="E-Way Easy promotional graphic: a business owner struggling with paperwork, then the app creating the sales invoice, picking products with HSN codes and calculating distance automatically"
                width={1024}
                height={1536}
                className="h-auto w-full"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* C. How it works */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How E-Way Easy works</p>
            <h2 className="h2 mt-3">From sales invoice to e-way bill in one flow</h2>
            <p className="mt-4 text-ink-soft">The app follows three clear steps: Invoice, Review EWB, Generated.</p>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ['Enter the invoice', 'Seller details are saved. Add the buyer by GSTIN and pick products from your list.'],
              ['Review the details', 'Check GSTINs, HSN, quantities, values, PIN codes, distance and transport details.'],
              ['Generate', 'Generate the e-way bill through the app’s supported workflow.'],
              ['View and print', 'See the result and use the available preview and print options.'],
            ].map(([t, d], i) => (
              <li key={t} className="relative rounded-3xl border border-brand-900/10 bg-cream p-6">
                <span className="font-display text-5xl font-extrabold text-brand-100">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14"><AppShowcase /></div>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-ink-faint">
            Exact steps depend on your app version. An e-way bill is valid only once the official e-way bill system issues its number;
            E-Way Easy is not a government portal.
          </p>
        </div>
      </section>

      {/* D. Features */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Features</p>
              <h2 className="h2 mt-3">Less typing, fewer mistakes, faster dispatch</h2>
            </div>
            <Link href="/features" className="btn-ghost">See all features</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card p-6 transition hover:-translate-y-1 hover:shadow-lift">
                <Icon name={f.icon} />
                <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. Tools */}
      <section className="section bg-brand-950 text-white">
        <div className="container grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Free business tools</p>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Calculators and invoice makers, free in your browser</h2>
            <p className="mt-4 text-brand-100/80">No sign-up. Your invoice data stays in your browser and is never uploaded.</p>
            <RouteIllustration className="mt-8 w-full" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-amber-400/60 hover:bg-white/10">
                <h3 className="font-display text-lg font-semibold group-hover:text-amber-300">{t.title}</h3>
                <p className="mt-1.5 text-sm text-brand-100/75">{t.text}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-amber-400">Open tool →</span>
              </Link>
            ))}
            <Link href="/tools" className="btn-amber sm:col-span-2">Browse all free tools</Link>
          </div>
        </div>
      </section>

      {/* F. Updates */}
      <section className="section">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="eyebrow">Latest GST and e-way bill updates</p>
              <h2 className="h2 mt-3">Rule changes that affect your dispatches</h2>
              <p className="mt-3 text-ink-soft">Each update shows the original announcement date, the effective date and when we last checked it against official sources.</p>
            </div>
            <Link href="/updates" className="btn-ghost">All updates</Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {updates.map((u) => <UpdateCard key={u.id} update={u} compact />)}
          </div>
        </div>
      </section>

      {/* G. Educational resources */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">E-way bill learning centre</p>
            <h2 className="h2 mt-3">Plain-English guides to e-way bill rules</h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDES.map((g, i) => (
              <Link key={g.href} href={g.href} className="group flex items-center justify-between gap-3 rounded-2xl border border-brand-900/10 bg-cream p-5 transition hover:border-brand-500 hover:bg-brand-50">
                <span>
                  <span className="text-xs font-semibold text-brand-500">Guide {String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-1 block font-display font-semibold text-ink">{g.title}</span>
                </span>
                <span className="text-brand-500 transition group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-end justify-between gap-4">
            <h2 className="h2">Latest from the blog</h2>
            <Link href="/blog" className="btn-ghost">View all articles</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => <BlogCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* H. Final CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-14 text-center text-white shadow-lift md:px-16">
            <div aria-hidden className="absolute inset-0 bg-hero-grid" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold md:text-5xl">Make Your E-Way Bill Workflow Simpler</h2>
              <p className="mt-5 text-lg text-brand-100/90">
                One flow from sales invoice to e-way bill. Buyer details from the GSTIN, HSN from your products, distance from PIN codes and
                invoice numbers in your own series.
              </p>
              <div className="mt-8 flex justify-center"><PlayBadge placement="home-final" /></div>
              <p className="mt-4 font-display text-amber-300">Invoice Bana. E-Way Easy Se Bhejo.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
