import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import PlayBadge from '@/components/PlayBadge';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import { pageMeta, faqLd } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Download E-Way Easy for Android',
  description:
    'Get the E-Way Easy Android app: create the sales invoice, review e-way bill details and generate in three steps. What you need, first-bill walkthrough and FAQs.',
  path: '/download',
});

const S = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const NEEDS: { title: string; text: string; icon: ReactNode }[] = [
  {
    title: 'An Android phone',
    text: 'E-Way Easy is currently listed for Android on Google Play.',
    icon: <g {...S}><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></g>,
  },
  {
    title: 'Your business GSTIN',
    text: 'Your seller details are saved once and used on every invoice.',
    icon: <g {...S}><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6" /></g>,
  },
  {
    title: 'Your buyers’ GSTINs',
    text: 'Enter a buyer GSTIN and the name, address, state and PIN fill in. Leave it empty for unregistered buyers.',
    icon: <g {...S}><circle cx="9" cy="8" r="3" /><path d="M3.5 19c.8-3 3-4.5 5.5-4.5s4.7 1.5 5.5 4.5M16 6h5M16 10h4" /></g>,
  },
  {
    title: 'A product list with HSN codes',
    text: 'Add your regular products with their HSN codes so they fill in when you pick a product.',
    icon: <g {...S}><path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" /><path d="m4 7 8 4 8-4M12 11v10" /></g>,
  },
  {
    title: 'Credits in your wallet',
    text: 'Credits in the app wallet: 1 credit = ₹1, 5 credits per e-way bill action. Packs start at 50 credits for ₹50.',
    icon: <g {...S}><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M16 14.5h2" /></g>,
  },
];

const STEPS: { title: string; text: string }[] = [
  {
    title: 'Install and set up once',
    text: 'Install E-Way Easy from Google Play, sign in with email or Google, and add your GSTIN. Connect your e-way bill API login once with the in-app guide, and set your invoice pre-series.',
  },
  {
    title: 'Create or import the invoice',
    text: 'Tap create invoice and enter the buyer GSTIN (name, address, state and PIN fill in), then add products with their HSN codes. Or import an invoice PDF and review what the app read.',
  },
  {
    title: 'Review the e-way bill details',
    text: 'Preview the sales invoice, then check the e-way bill details on the review screen. Distance is calculated from the PIN codes; edit it if the actual route differs.',
  },
  {
    title: 'Generate',
    text: 'Tap Generate. The e-way bill number comes back from the official e-way bill system; download the PDF and share it with the driver on WhatsApp, or print it.',
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is E-Way Easy a government app?',
    a: 'No. E-Way Easy is an independent app and is not affiliated with the Government of India, GSTN or NIC. E-way bills are filed on the official NIC e-way bill system through an authorised GSP, and the official portal remains available to you at all times.',
  },
  {
    q: 'Is E-Way Easy available on iPhone?',
    a: 'E-Way Easy is currently listed for Android on Google Play. There is no iPhone app listing at this time.',
  },
  {
    q: 'Do I need my e-way bill portal credentials?',
    a: 'Yes, your e-way bill system API login. You connect it once inside the app, with guided steps, and it is stored encrypted and used only for the bills you ask for. E-way bills are filed on the official NIC e-way bill system through an authorised GST Suvidha Provider (GSP). Never share your portal password or OTP over phone, WhatsApp or email; no genuine support team will ask for them.',
  },
  {
    q: 'How much does it cost?',
    a: 'There is no yearly subscription. The app uses pay-as-you-go wallet credits: 1 credit = ₹1, and generating, updating Part-B, consolidating, cancelling or extending an e-way bill costs 5 credits (₹5) each. Credits are taken only when the action succeeds. Packs start at 50 credits for ₹50, paid through Razorpay; see the pricing page.',
  },
  {
    q: 'Can I create bulk e-way bills with the app?',
    a: 'No, bulk e-way bill generation is not an app feature. The app works one invoice at a time. For high volumes, see our guide on bulk generation through the official portal.',
  },
];

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />

      {/* Hero */}
      <header className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />
        <div aria-hidden className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="container relative grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Breadcrumbs crumbs={[{ name: 'Download', href: '/download' }]} light />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Android app</p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-5xl">
              Download {SITE.name}
            </h1>
            <p className="mt-2 font-display text-xl text-amber-300 md:text-2xl">{SITE.tagline}</p>
            <p className="mt-5 max-w-xl text-lg text-brand-100/90">
              Create the sales invoice, review the e-way bill details and generate — three steps, on your phone. Buyer
              details fill from the GSTIN, HSN fills from your products and distance comes from the PIN codes.
            </p>
            <div className="mt-8 rounded-2xl bg-white p-3 text-ink sm:inline-block">
              <PlayBadge placement="download-hero" />
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-100/90">
              {['3-step flow', 'Saved buyers & products', 'Auto distance from PIN'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" className="h-4 w-4 text-amber-400" aria-hidden>
                    <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto flex w-full max-w-sm items-start justify-center gap-4 pb-4 sm:max-w-md">
            <div aria-hidden className="absolute inset-x-6 top-10 bottom-0 rounded-[3rem] bg-gradient-to-br from-amber-400/40 via-brand-400/30 to-transparent blur-2xl" />
            <Phone
              screen="dashboard"
              width={210}
              alt="E-Way Easy dashboard showing business GSTIN, wallet, total sales for the financial year and invoice counts"
              className="relative"
            />
            <Phone
              screen="generated"
              width={210}
              alt="E-Way Easy generated screen with validity, vehicle, print and share options"
              className="relative mt-10 hidden sm:block"
            />
          </div>
        </div>
      </header>

      {/* What you need */}
      <section className="section" aria-labelledby="needs">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Before you start</p>
            <h2 id="needs" className="h2 mt-2">What you need to get started</h2>
            <p className="mt-4 text-ink-soft">Keep these ready and your first e-way bill takes a few minutes, not an afternoon.</p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {NEEDS.map((n) => (
              <li key={n.title} className="card p-5">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-brand-700" aria-hidden>
                  <svg viewBox="0 0 24 24" className="h-6 w-6">{n.icon}</svg>
                </span>
                <h3 className="mt-4 font-display font-semibold text-ink">{n.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-ink-soft">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* First e-way bill walkthrough */}
      <section className="section bg-white" aria-labelledby="first-bill">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Walkthrough</p>
            <h2 id="first-bill" className="h2 mt-2">Your first e-way bill in 4 steps</h2>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl border border-brand-900/10 bg-cream p-6">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full font-display text-lg font-bold ${
                    i === STEPS.length - 1 ? 'bg-amber-500 text-brand-950' : 'bg-brand-700 text-white'
                  }`}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-ink-soft">
            Not sure an e-way bill is needed for your consignment? Check with the{' '}
            <Link href="/tools/eway-bill-eligibility-checker" className="font-medium text-brand-700 underline underline-offset-2">
              e-way bill eligibility checker
            </Link>{' '}
            or read the <Link href="/eway-bill-guide" className="font-medium text-brand-700 underline underline-offset-2">complete guide</Link>.
          </p>
        </div>
      </section>

      {/* Promo poster */}
      <section className="section" aria-labelledby="promo">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <p className="eyebrow">Why E-Way Easy</p>
            <h2 id="promo" className="h2 mt-2">From typing everything twice to one simple flow</h2>
            <p className="mt-4 text-ink-soft">
              Many businesses make the sales invoice in one place and then re-enter the same buyer, product, HSN and
              distance details for the e-way bill. E-Way Easy keeps it in one flow: details you save once fill in again
              next time, and every field stays editable.
            </p>
            <p className="mt-4 text-ink-soft">
              <Link href="/features" className="font-semibold text-brand-700 hover:text-brand-800">See all features →</Link>
            </p>
          </div>
          <figure className="order-1 mx-auto w-full max-w-sm lg:order-2">
            <div className="overflow-hidden rounded-4xl border border-brand-900/10 bg-white shadow-lift">
              <Image
                src="/images/eway-easy-promo.webp"
                alt="E-Way Easy promotional poster in Hindi and English contrasting the problem of manual invoice and e-way bill entry with the app's simple invoice to e-way bill flow on a phone"
                width={1024}
                height={1536}
                sizes="(max-width: 1024px) 90vw, 384px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center text-xs text-ink-faint">E-Way Easy promotional poster (Hindi / English)</figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white" aria-labelledby="faq">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow">FAQ</p>
            <h2 id="faq" className="h2 mt-2">Questions before you download</h2>
            <div className="mt-8 divide-y divide-brand-900/10 rounded-3xl border border-brand-900/10 bg-cream">
              {FAQ.map((f, i) => (
                <details key={f.q} className="group p-5 md:p-6" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45"
                      aria-hidden
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                    </span>
                  </summary>
                  <p className="mt-3 leading-7 text-ink-soft">
                    {f.a}
                    {i === FAQ.length - 1 && (
                      <>
                        {' '}
                        <Link href="/bulk-eway-bill-generation" className="font-medium text-brand-700 underline underline-offset-2">
                          Read the bulk e-way bill guide
                        </Link>
                        .
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
            <div className="mt-8">
              <ComplianceNote title="Independent app">
                <p>
                  E-Way Easy is not a government portal and is not affiliated with GSTN or NIC. E-way bills are filed on
                  the official NIC e-way bill system through an authorised GSP. Features can differ between app versions.
                </p>
              </ComplianceNote>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container py-16 md:py-24" aria-labelledby="bottom-cta">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-center text-white shadow-lift md:p-12">
          <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-50" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Ready?</p>
            <h2 id="bottom-cta" className="mx-auto mt-2 max-w-xl font-display text-2xl font-bold md:text-4xl">
              Invoice bana. E-Way Easy se bhejo.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-100/90">
              Get E-Way Easy for Android and set up your business, buyers and products in one sitting.
            </p>
            <div className="mt-8 inline-block rounded-2xl bg-white p-3 text-ink">
              <PlayBadge placement="download-bottom" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
