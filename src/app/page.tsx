import Link from 'next/link';
import Image from 'next/image';
import PlayBadge from '@/components/PlayBadge';
import BlogCard from '@/components/BlogCard';
import UpdateCard from '@/components/UpdateCard';
import JsonLd from '@/components/JsonLd';
import { AppShowcase, RouteIllustration } from '@/components/AppGraphics';
import DispatchAnimation from '@/components/DispatchAnimation';
import ReviewsSection from '@/components/ReviewsSection';
import PeopleStrip from '@/components/PeopleStrip';
import MadeInIndia from '@/components/MadeInIndia';
import RotatingWords from '@/components/RotatingWords';
import Reveal from '@/components/Reveal';
import { HelpersSection, HeroMilestones, PartnerStrip, SizesSection, WalletSection } from '@/components/HomeSections';
import { Stamp, TruckArtBand } from '@/components/HighwayKit';
import { getAllPosts, toSummary } from '@/lib/content';
import { UPDATES } from '@/lib/updates';
import { pageMeta, softwareAppLd, websiteLd } from '@/lib/seo';
import { FOUNDER } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Easy E-Way Bill App for Android | E-Way Easy',
  description:
    'Generate GST e-way bills from your phone: free invoice, PDF import, Part B, extend, cancel. ₹5 only on success. Not the govt portal: that is ewaybillgst.gov.in.',
  path: '/',
});



// Homepage feature cards: each links to the page that explains it (internal links between app features and guides).
const APP_FEATURES = [
  { tag: 'Generate', title: 'Generate an e-way bill from a GST invoice', text: 'Make the invoice in the app, review Part A and Part B, and tap Generate. The number comes back from the official e-way bill system.', href: '/eway-bill-generation', cta: 'How to generate an e-way bill' },
  { tag: 'Import PDF', title: 'Invoice PDF to e-way bill', text: 'Made the invoice in Tally or other software? Import the PDF; the app reads buyer, GSTIN, items and HSN, and you review before generating.', href: '/invoice-pdf-to-eway-bill', cta: 'See PDF import' },
  { tag: 'Part B update', title: 'Update Part B and the vehicle number', text: 'Vehicle changed on the way? Update Part B from your phone before the goods move in the new vehicle.', href: '/blog/how-to-update-vehicle-details-in-eway-bill', cta: 'Part B update guide' },
  { tag: 'Manage', title: 'Extend, cancel or consolidate', text: 'Extend validity near expiry, cancel within 24 hours, or make one consolidated e-way bill for several consignments in a vehicle.', href: '/eway-bill-management-app', cta: 'E-way bill management' },
  { tag: 'Free', title: 'Free GST invoice generator', text: 'Make a GST or non-GST invoice online, print it on A4 or a thermal printer, or share the PDF on WhatsApp. No sign-up.', href: '/invoice-generator', cta: 'Open the invoice generator' },
  { tag: 'Compare', title: 'NIC portal vs E-Way Easy', text: 'When the official portal is the better choice (for example bulk e-way bills), and when a phone app saves time.', href: '/compare', cta: 'See the comparison' },
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
  { title: 'Free Invoice Generator', text: 'Make a GST or non-GST invoice online. Taxes and totals auto-calculate; download PDF.', href: '/invoice-generator' },
  { title: 'Sales Invoice Templates', text: 'GST, simple, service and wholesale invoices. Edit, download PDF, print.', href: '/sales-invoice-templates' },
  { title: 'Purchase Order & Commercial Invoice', text: 'Editable PO and export invoice templates in A4, Letter and more.', href: '/purchase-order-templates' },
  { title: 'E-Way Bill Eligibility Checker', text: 'Find out whether your movement may need an e-way bill.', href: '/tools/eway-bill-eligibility-checker' },
  { title: 'Validity Calculator', text: 'Validity days and expiry time from distance.', href: '/tools/distance-calculator' },
  { title: 'GSTIN Validator', text: 'Check format and check digit, decode state and PAN.', href: '/tools/gstin-validator' },
  { title: 'Bulk E-Way Bill Data Checker', text: 'Find errors in invoice rows before bulk upload.', href: '/tools/bulk-eway-bill-data-checker' },
  { title: 'GSTR-2B Reconciliation', text: 'Match your purchase register with GSTR-2B.', href: '/tools/gstr-2b-reconciliation' },
  { title: 'Delivery Challan Generator', text: 'Job work and stock transfer challans, print-ready.', href: '/tools/delivery-challan-generator' },
];


export default function Home() {
  const posts = getAllPosts().slice(0, 6).map(toSummary);
  const updates = UPDATES.slice(0, 3);

  return (
    <>
      <JsonLd data={[websiteLd(), softwareAppLd()]} />

      {/* A. Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid" />
        <div aria-hidden className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div aria-hidden className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Stamp tone="green" className="bg-white/95">Made in India, for India</Stamp>
              <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-300/30">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden><path fill="currentColor" d="M10 2 4 4.5v4.8c0 3.9 2.6 7.3 6 8.7 3.4-1.4 6-4.8 6-8.7V4.5L10 2Zm-1 11.4-3-3 1.4-1.4L9 10.6l3.6-3.6L14 8.4l-5 5Z" /></svg>
                Safe &amp; secure · encrypted API login
              </p>
            </div>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] md:text-6xl">
              E-Way Bill Generator App: <span className="text-amber-400">generate GST e-way bills on your phone</span>
            </h1>
            <RotatingWords
              className="mt-4 font-display text-xl font-bold leading-[1.25em] text-white md:text-2xl"
              before="Make your"
              words={['sales invoice', 'e-way bill', 'Part B update', 'PDF share']}
              after="in one tap ⚡"
            />
            <p className="mt-5 max-w-xl text-lg leading-8 text-brand-100/90">
              Free GST invoice, invoice PDF import, Part B update, extend and cancel, for every Indian business from a small
              shop to a large factory. Pay only ₹5 when the e-way bill is generated.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PlayBadge placement="home-hero" size="lg" />
              <Link href="/tools" className="btn-ghost-dark">Explore free tools →</Link>
            </div>
            {/* Many visitors search "easy way bill login" looking for the government portal: point them there honestly. */}
            <p className="mt-4 text-sm text-brand-100/80">
              Looking for the official e-way bill login? That is the government portal,{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener" className="font-semibold text-white underline">ewaybillgst.gov.in</a>.
              E-Way Easy is an independent app that files there for you.
            </p>
            <HeroMilestones />
          </div>
          <div className="mx-auto w-full max-w-[560px]">
            <div className="relative">
              <DispatchAnimation className="mx-auto w-full max-w-[560px] overflow-hidden rounded-[2rem] shadow-lift" />
              <span className="ee-float absolute -left-2 top-6 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-ink shadow-lift sm:-left-6 sm:text-sm">✅ GSTIN details auto-filled</span>
              <span className="ee-float ee-float-2 absolute -right-2 top-1/3 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-ink shadow-lift sm:-right-6 sm:text-sm">📲 Share on WhatsApp</span>
              <span className="ee-float ee-float-3 absolute -bottom-3 left-6 rounded-2xl bg-amber-400 px-3 py-2 text-xs font-extrabold text-brand-950 shadow-lift sm:text-sm">₹5 per e-way bill</span>
            </div>
            {/* Count from the app's own records (registered businesses), confirmed by the founder on 14 Nov 2026. */}
            <div className="ee-fill mt-10 flex items-center gap-4 rounded-2xl bg-white/10 px-4 py-3.5 ring-1 ring-white/20 backdrop-blur sm:px-5" style={{ animationDelay: '0.6s' }}>
              <span aria-hidden className="flex shrink-0 -space-x-2.5">
                {[
                  { bg: 'bg-amber-400', d: 'M4 10v10h16V10M3 10l2-5h14l2 5M3 10h18M9 20v-5h6v5' },
                  { bg: 'bg-emerald-300', d: 'M3 20V10l5 3v-3l5 3V7l8 4v9H3ZM7 17h2M12 17h2M17 17h2' },
                  { bg: 'bg-sky-300', d: 'M2 7h11v9H2zM13 10h4.5L21 13.5V16h-8M7.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM18.5 18.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' },
                ].map((c) => (
                  <span key={c.bg} className={`grid h-10 w-10 place-items-center rounded-full ${c.bg} text-brand-950 ring-2 ring-brand-900`}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={c.d} /></svg>
                  </span>
                ))}
              </span>
              <p className="leading-snug">
                <span className="block font-display text-lg font-extrabold text-white sm:text-xl">
                  Trusted by <span className="text-amber-400">100+ businesses</span>
                </span>
                <span className="block text-sm text-brand-100/85">creating GST invoices and e-way bills with E-Way Easy</span>
              </p>
            </div>
          </div>
        </div>
        <TruckArtBand className="absolute inset-x-0 bottom-0" />
      </section>

      <Reveal>
        <MadeInIndia />
      </Reveal>

      <Reveal>
        <PeopleStrip />
      </Reveal>

      <Reveal>
        <SizesSection />
      </Reveal>

      {/* B. Problem → solution graphics */}
      <Reveal>
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
      </Reveal>

      {/* C. How it works */}
      <Reveal>
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How E-Way Easy works</p>
            <h2 className="h2 mt-3">How to generate an e-way bill from your invoice</h2>
            <p className="mt-4 text-ink-soft">The app follows three clear steps: Invoice, Review EWB, Generated.</p>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-4">
            {[
              ['Enter or import the invoice', 'Add the buyer by GSTIN and pick products from your list, or import an invoice PDF.'],
              ['Review the details', 'Check GSTINs, HSN, quantities, values, PIN codes, distance and transport details.'],
              ['Generate', 'Tap Generate. The e-way bill number comes back from the official e-way bill system.'],
              ['Share and manage', 'Share the PDF on WhatsApp or email, or print it. Update Part B, extend or cancel later.'],
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
      </Reveal>

      {/* C2. Everything in the app, linked to the matching guide */}
      <Reveal>
      <section className="section" aria-labelledby="in-app-h">
        <div className="container">
          <p className="eyebrow">E-way bill app features</p>
          <h2 id="in-app-h" className="h2 mt-2 max-w-3xl">Generate, update and manage GST e-way bills in one app</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APP_FEATURES.map((x) => (
              <li key={x.title}>
                <Link href={x.href} className="group flex h-full flex-col rounded-[1.5rem] border border-brand-900/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <span className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-600">{x.tag}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink">{x.title}</h3>
                  <p className="mt-2 flex-1 text-[15px] leading-7 text-ink-soft">{x.text}</p>
                  <span className="mt-4 text-sm font-semibold text-brand-700">{x.cta} <span aria-hidden className="inline-block transition group-hover:translate-x-0.5">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      </Reveal>

      {/* D. Helpers */}
      <Reveal>
        <HelpersSection />
      </Reveal>

      <Reveal>
        <WalletSection />
      </Reveal>

      {/* G2. Founder */}
      <Reveal>
      <section className="section pb-0" aria-labelledby="founder-h">
        <div className="container">
          <div className="grid items-center gap-8 overflow-hidden rounded-4xl bg-white p-6 shadow-card md:grid-cols-[220px_1fr] md:p-10">
            <div className="mx-auto w-40 overflow-hidden rounded-3xl md:w-full">
              <Image src={FOUNDER.photo} alt={`${FOUNDER.name}, founder of E-Way Easy`} width={720} height={960} sizes="(max-width: 768px) 160px, 220px" className="h-auto w-full" />
            </div>
            <div className="text-center md:text-left">
              <p className="eyebrow">Built by one person, for businesses across India</p>
              <h2 id="founder-h" className="h2 mt-2">From {FOUNDER.village} to your phone</h2>
              <p className="mt-4 leading-7 text-ink-soft">
                {FOUNDER.name} grew up in {FOUNDER.village}, a small village near {FOUNDER.near}. After a year at {FOUNDER.previousWork},
                he spent {FOUNDER.buildMonths} months building E-Way Easy on one laptop, working after office hours until 2 AM, so that
                traders, manufacturers, wholesalers and transporters can make their invoice and e-way bill in one tap and avoid costly mistakes.
              </p>
              <Link href="/about" className="btn-ghost mt-6">Read Meet&rsquo;s story →</Link>
            </div>
          </div>
        </div>
      </section>
      </Reveal>


      {/* E. Tools */}
      <Reveal>
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
      </Reveal>

      {/* F. Updates */}
      <Reveal>
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
      </Reveal>

      {/* G. Educational resources */}
      <Reveal>
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
      </Reveal>

      <Reveal>
        <ReviewsSection />
      </Reveal>

      <Reveal>
        <PartnerStrip />
      </Reveal>

      {/* H. Final CTA */}
      <Reveal>
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
      </Reveal>
    </>
  );
}
