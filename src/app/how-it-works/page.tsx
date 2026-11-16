import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import DataTable from '@/components/DataTable';
import { Phone } from '@/components/AppGraphics';
import type { ScreenName } from '@/components/AppScreens';
import { absoluteUrl, faqLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How E-Way Easy Works: Sales Invoice to E-Way Bill',
  description:
    'See how E-Way Easy turns a sales invoice into an e-way bill in three steps on your phone: invoice, review e-way bill details, generated.',
  path: '/how-it-works',
});

const STEPS: {
  n: number;
  screen: ScreenName;
  title: string;
  answer: string;
  points: string[];
  check: string;
  wrong: string;
  alt: string;
}[] = [
  {
    n: 1,
    screen: 'invoice',
    title: 'Create or import the sales invoice',
    answer:
      'Step 1 builds the sales invoice that the e-way bill is made from. You either type it in the app or import an invoice PDF from your billing software. Every detail you enter here flows into Part A of the e-way bill, so this is where most errors start or stop.',
    points: [
      'Create the invoice in the app, or import an invoice PDF from your billing software and review what the app read from it.',
      'Your seller details are saved once and reused.',
      'Enter the buyer’s GSTIN and the name, address, state and PIN fill in automatically. Leave it empty for an unregistered buyer.',
      'Pick products from your saved list. The HSN code comes with the product and can be edited.',
      'The invoice number follows your own pre-series.',
    ],
    check:
      'The buyer name that fills from the GSTIN is the business you are billing. The HSN on each line is right for that item. The invoice date is today’s, or at least within the last 180 days.',
    wrong:
      'One wrong GSTIN character fills a different business. An HSN saved wrongly on a product repeats on every invoice. Base documents dated more than 180 days before generation cannot be used for an e-way bill.',
    alt: 'Step 1: new invoice screen with buyer details filled from GSTIN and a product with HSN code',
  },
  {
    n: 2,
    screen: 'review',
    title: 'Review the e-way bill details',
    answer:
      'Step 2 shows the e-way bill as it will be filed: Part A from your invoice and Part B for transport. Nothing goes to the portal yet. This is your last chance to fix PIN codes, distance, value and vehicle details, because an e-way bill cannot be edited after generation.',
    points: [
      'Check the from and to PIN codes. Approximate distance is calculated from them, and you can edit it if the route differs.',
      'Confirm goods, HSN, quantity, taxable value and tax.',
      'Add the transport details, such as mode and vehicle number.',
      'Use Bill To / Ship To and Dispatch From when goods go to, or leave from, a different place than the addresses on the invoice.',
    ],
    check:
      'The delivery PIN is where the goods actually go, not just the billing address. The distance matches your real route. The vehicle number is typed exactly as on the plate.',
    wrong:
      'A wrong PIN gives a wrong distance and a wrong validity. The portal accepts an actual distance only up to 10% more than its own PIN-to-PIN figure. Without Part B, the e-way bill is not valid for movement, except in the short-distance case the rules allow.',
    alt: 'Step 2: review e-way bill screen with Rajkot to Delhi distance, goods and transport details',
  },
  {
    n: 3,
    screen: 'generated',
    title: 'Generate and use the result',
    answer:
      'Step 3 files the e-way bill. When you tap Generate, the app checks the details, files them on the official NIC e-way bill system through an authorised GSP using your API login, and shows the e-way bill number. Credits are taken only if the portal accepts it.',
    points: [
      'Tap Generate. Details are checked before filing, the bill is filed on the official NIC e-way bill system through an authorised GSP, and the e-way bill number comes back to the app.',
      'Download the e-way bill PDF and share it on WhatsApp or email, or print it. The sales invoice is saved with the same details.',
      'Your dashboard keeps count of invoices and e-way bills for the financial year.',
    ],
    check:
      'The e-way bill number and validity shown in the app. Then send the PDF to the driver before the vehicle leaves the gate.',
    wrong:
      'The portal can reject the request, for example over a GSTIN or document problem. Your 5 credits go back to the wallet automatically; read the error, fix the data and try again.',
    alt: 'Step 3: generated screen with validity, vehicle, print and share options',
  },
];

const ROUTES = [
  { label: 'Invoice already made in Tally or other software', cells: ['Use Import PDF in step 1, then review every field the app read'] },
  { label: 'Buyer is not registered under GST', cells: ['Leave the GSTIN empty and type the name, address, state and PIN'] },
  { label: 'Goods go to a site or godown, not the billing address', cells: ['Set Ship To in step 2, so the delivery PIN and distance are right'] },
  { label: 'Goods leave from your godown, not your registered address', cells: ['Set Dispatch From in step 2'] },
  { label: 'Consignment value is ₹50,000 or less', cells: ['You may not need an e-way bill; check your state’s rule. You can still save and share the invoice free'] },
  { label: 'Dozens of invoices to file in one sitting', cells: ['Use the official portal’s bulk facility; the app works one invoice at a time'] },
];

const FAQ = [
  { q: 'Is E-Way Easy a government app?', a: 'No. E-Way Easy is an independent private app, not affiliated with the Government of India, GSTN or NIC. E-way bills are filed on the official NIC e-way bill system through an authorised GST Suvidha Provider (GSP), using your own e-way bill API login.' },
  { q: 'What is the one-time setup?', a: 'Sign up with email or Google, add your business GSTIN, and connect your e-way bill system API login once. The app guides you through it, and the login is stored encrypted. After that, you only create or import invoices and generate.' },
  { q: 'Do I need to make the sales invoice separately?', a: 'No. The sales invoice is the first step of the same flow, so the invoice and the e-way bill are built from the same details. You can also save, download and share an invoice on its own, free, without generating an e-way bill.' },
  { q: 'What do I need before I start?', a: 'An Android phone, your business GSTIN and your e-way bill system API login. Keep your buyers’ GSTINs, your product list with HSN codes, transport details and some wallet credits ready too.' },
  { q: 'Can I generate many e-way bills at once in the app?', a: 'No. The app works one invoice at a time. For large batches, see our bulk e-way bill guide and the free Bulk E-Way Bill Data Checker, which help you prepare data for the official bulk process.' },
  { q: 'What if something is wrong after generation?', a: 'E-way bill details cannot be edited, so wrong Part A details mean cancelling within 24 hours and generating again. A vehicle change needs only a Part B update. Each of these actions costs 5 credits, charged only on success.' },
];

export default function HowItWorks() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to create an e-way bill from a sales invoice with E-Way Easy',
          step: STEPS.map((s) => ({ '@type': 'HowToStep', position: s.n, name: s.title, text: s.points.join(' '), url: absoluteUrl(`/how-it-works#step-${s.n}`) })),
        }}
      />
      <PageHeader
        eyebrow="How it works"
        title="From sales invoice to e-way bill in three steps"
        description="E-Way Easy follows one flow on your phone: Invoice → Review EWB → Generated. Here is what happens at each step, what can go wrong, and what you must check."
        crumbs={[{ name: 'How it works', href: '/how-it-works' }]}
      />

      <div className="container py-14">
        <section aria-labelledby="setup" className="card mb-16 p-6 md:p-8">
          <p className="eyebrow">Before step 1 · one-time setup</p>
          <h2 id="setup" className="mt-2 font-display text-2xl font-bold text-ink">Set up once, then just generate</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Setup links the app to your GSTIN and to the official e-way bill system. You do it once: sign up, add your
            business GSTIN, and connect your e-way bill API login. After that, every e-way bill is filed under your own
            GSTIN with your own credentials, the same as one made on the portal.
          </p>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            <li className="flex gap-3 text-ink-soft">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700" aria-hidden>A</span>
              <span><strong className="text-ink">Sign up and add your GSTIN.</strong> Sign in with email or Google and add your business details.</span>
            </li>
            <li className="flex gap-3 text-ink-soft">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700" aria-hidden>B</span>
              <span>
                <strong className="text-ink">Connect your e-way bill API login.</strong> The app guides you through it once and stores the
                login encrypted. See <Link className="text-brand-700 underline" href="/eway-bill-api-setup">API login setup</Link>.
              </span>
            </li>
            <li className="flex gap-3 text-ink-soft">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700" aria-hidden>C</span>
              <span><strong className="text-ink">Save your regulars and add credits.</strong> Add frequent buyers and products, set your invoice pre-series, and top up the wallet.</span>
            </li>
          </ol>
          <div className="mt-6 rounded-2xl bg-brand-50 p-4 text-sm leading-6 text-ink-soft">
            <p>
              <strong className="text-ink">What can go wrong in setup:</strong> the API login is a separate username and
              password that you create on the official portal for GSP filing. It is not your normal portal login or your GST
              portal password, and mixing them up is the most common reason the connection fails.
            </p>
          </div>
        </section>

        <ol className="space-y-20">
          {STEPS.map((s, i) => (
            <li key={s.n} id={`step-${s.n}`} className="grid scroll-mt-24 items-center gap-10 md:grid-cols-2">
              <div className={i % 2 ? 'md:order-2' : ''}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-display font-bold text-white">{s.n}</span>
                <h2 className="h2 mt-4">{s.title}</h2>
                <p className="mt-3 text-ink-soft">{s.answer}</p>
                <ul className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-ink-soft">
                      <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-brand-500" aria-hidden><path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-3 rounded-2xl border border-brand-900/10 bg-white p-4 text-sm leading-6 text-ink-soft">
                  <p><strong className="text-ink">You check:</strong> {s.check}</p>
                  <p><strong className="text-ink">What can go wrong:</strong> {s.wrong}</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Phone screen={s.screen} width={250} alt={s.alt} />
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-24" aria-labelledby="routes">
          <h2 id="routes" className="h2">Which path through the flow fits this dispatch?</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            The three steps stay the same, but a few choices change with each dispatch. If the invoice already exists,
            import it; if the buyer or delivery place is different, set the right fields in step 2. If the value is below
            the threshold or the batch is large, the app may not be your best route.
          </p>
          <div className="mt-8 max-w-4xl">
            <DataTable
              caption="Which path through the E-Way Easy flow fits each kind of dispatch"
              columns={['If this is true…', 'Then do this']}
              rows={ROUTES}
              width="fit"
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">
            Not sure whether a movement needs an e-way bill at all? Run it through the{' '}
            <Link className="text-brand-700 underline" href="/tools/eway-bill-eligibility-checker">eligibility checker</Link>, or read the{' '}
            <Link className="text-brand-700 underline" href="/bulk-eway-bill-generation">bulk e-way bill guide</Link> for high volumes.
          </p>
        </section>

        <section className="mt-20 card p-6 md:p-8" aria-labelledby="example">
          <p className="eyebrow">Example (illustrative)</p>
          <h2 id="example" className="h2 mt-2">A first dispatch, start to finish</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            Example (illustrative): a Morbi wall-tile dealer installs the app on a Monday. Setup takes one sitting: GSTIN,
            API login, five regular buyers and twelve tile products. The first real dispatch is a ₹3,10,000 order to a
            Jaipur showroom that wants the goods at its godown, not its shop.
          </p>
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-6 text-ink-soft">
            <li>
              <strong className="text-ink">Step 1.</strong> He picks the showroom from saved buyers and adds two tile products. The
              HSN fills from each product, and the invoice takes the next number in his series.
            </li>
            <li>
              <strong className="text-ink">Step 2.</strong> He sets Ship To as the Jaipur godown, so the distance is worked out from the
              godown PIN. His transporter’s route is a little longer, so he raises the distance, staying within 10% of the
              calculated figure, and types the truck number.
            </li>
            <li>
              <strong className="text-ink">Step 3.</strong> He taps Generate, gets the e-way bill number, and shares the PDF with the
              driver on WhatsApp. Cost: 5 credits (₹5).
            </li>
          </ol>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">
            Names, values and places are made up. The review screen, not the dealer’s memory, caught the Ship To change.
          </p>
        </section>

        <section className="mt-24 grid gap-8 md:grid-cols-2" aria-labelledby="prep">
          <div>
            <h2 id="prep" className="h2">Checklist before your first e-way bill</h2>
            <p className="mt-3 text-ink-soft">
              Most problems come from wrong master data rather than the app. Fix it once and every invoice after that
              inherits clean details. Spend ten minutes on these five checks before your first live dispatch, and keep the
              results in your saved buyers and products.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">
              <li>Buyer GSTINs: check the format with the <Link className="text-brand-700 underline" href="/tools/gstin-validator">GSTIN validator</Link>.</li>
              <li>HSN codes for your products: start with the <Link className="text-brand-700 underline" href="/tools/hsn-code-lookup">HSN chapter lookup</Link>.</li>
              <li>Whether the movement needs an e-way bill at all: use the <Link className="text-brand-700 underline" href="/tools/eway-bill-eligibility-checker">eligibility checker</Link>.</li>
              <li>The documents and data you need: see the <Link className="text-brand-700 underline" href="/documents-required-for-eway-bill">documents checklist</Link>.</li>
              <li>Your API login works: finish the guided connection and keep the username and password somewhere safe.</li>
            </ul>
          </div>
          <ComplianceNote title="What E-Way Easy is, and what it is not">
            <p>E-Way Easy is a private app, not a government portal, and is not affiliated with GSTN or NIC.</p>
            <p>E-way bills are filed on the official NIC e-way bill system through an authorised GSP. The exact steps can differ by app version.</p>
            <p>The app works one invoice at a time on Android. It does not generate e-way bills in bulk or create e-invoices (IRN).</p>
            <p>Each e-way bill action costs 5 credits (₹5), taken only when it succeeds. See <Link className="underline" href="/pricing">pricing</Link> and the <Link className="underline" href="/help">help centre</Link>.</p>
          </ComplianceNote>
        </section>

        <section className="mt-20" aria-labelledby="faq">
          <h2 id="faq" className="h2">Questions</h2>
          <p className="mt-3 max-w-3xl text-ink-soft">
            These are the questions people ask before they try the flow for the first time. They cover what E-Way Easy is,
            what the one-time setup involves, what to keep ready, and what happens when something is wrong after an e-way
            bill has already been generated.
          </p>
          <div className="mt-6 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
            {FAQ.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                  {f.q}<span className="text-brand-500 transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-20"><DownloadCTA placement="how-it-works" /></div>
      </div>
    </>
  );
}
