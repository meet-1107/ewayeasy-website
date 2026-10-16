import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import type { ScreenName } from '@/components/AppScreens';
import { absoluteUrl, faqLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How E-Way Easy Works: Sales Invoice to E-Way Bill',
  description:
    'See how E-Way Easy turns a sales invoice into an e-way bill in three steps on your phone: invoice, review e-way bill details, generated.',
  path: '/how-it-works',
});

const STEPS: { n: number; screen: ScreenName; title: string; points: string[]; alt: string }[] = [
  {
    n: 1,
    screen: 'invoice',
    title: 'Create the sales invoice',
    points: [
      'Your seller details are saved once and reused.',
      'Enter the buyer’s GSTIN and the name, address, state and PIN fill in automatically. Leave it empty for an unregistered buyer.',
      'Pick products from your saved list. The HSN code comes with the product and can be edited.',
      'The invoice number follows your own pre-series.',
    ],
    alt: 'Step 1: new invoice screen with buyer details filled from GSTIN and a product with HSN code',
  },
  {
    n: 2,
    screen: 'review',
    title: 'Review the e-way bill details',
    points: [
      'Check the from and to PIN codes. Approximate distance is calculated from them, and you can edit it if the route differs.',
      'Confirm goods, HSN, quantity, taxable value and tax.',
      'Add the transport details, such as mode and vehicle number.',
    ],
    alt: 'Step 2: review e-way bill screen with Rajkot to Delhi distance, goods and transport details',
  },
  {
    n: 3,
    screen: 'generated',
    title: 'Generate and use the result',
    points: [
      'Generate through the app’s supported workflow. The e-way bill number is issued by the official e-way bill system.',
      'Use the available preview and print options. The sales invoice is saved with the same details.',
      'Your dashboard keeps count of invoices and e-way bills for the financial year.',
    ],
    alt: 'Step 3: generated screen with validity, vehicle, print and share options',
  },
];

const FAQ = [
  { q: 'Is E-Way Easy a government app?', a: 'No. E-Way Easy is a private app. E-way bills are issued by the official e-way bill system; the app helps you prepare the invoice and e-way bill details and complete the supported workflow on your phone.' },
  { q: 'Do I need to make the sales invoice separately?', a: 'No. The sales invoice is the first step of the same flow, so the invoice and the e-way bill are built from the same details.' },
  { q: 'What do I need before I start?', a: 'An Android phone, your business GSTIN, your buyers’ GSTINs (or address details for unregistered buyers), your product list with HSN codes, transport details, and credits in the app wallet.' },
  { q: 'Can I generate many e-way bills at once in the app?', a: 'The app works one invoice at a time. For large batches, see our bulk e-way bill guide and the free Bulk E-Way Bill Data Checker, which help you prepare data for the official bulk process.' },
  { q: 'What if something is wrong after generation?', a: 'E-way bill details cannot be edited after generation. If Part A details are wrong, you can cancel the e-way bill from the app within 24 hours and generate it again. If the vehicle changes, update Part-B from the app. The app can also create consolidated e-way bills and extend validity. Each of these actions costs 5 credits.' },
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
        description="E-Way Easy follows one flow on your phone: Invoice → Review EWB → Generated. Here is what happens at each step."
        crumbs={[{ name: 'How it works', href: '/how-it-works' }]}
      />

      <div className="container py-14">
        <ol className="space-y-20">
          {STEPS.map((s, i) => (
            <li key={s.n} id={`step-${s.n}`} className="grid scroll-mt-24 items-center gap-10 md:grid-cols-2">
              <div className={i % 2 ? 'md:order-2' : ''}>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-700 font-display font-bold text-white">{s.n}</span>
                <h2 className="h2 mt-4">{s.title}</h2>
                <ul className="mt-5 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-ink-soft">
                      <svg viewBox="0 0 20 20" className="mt-1 h-5 w-5 shrink-0 text-brand-500" aria-hidden><path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <Phone screen={s.screen} width={250} alt={s.alt} />
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-24 grid gap-8 md:grid-cols-2" aria-labelledby="prep">
          <div>
            <h2 id="prep" className="h2">Prepare before your first e-way bill</h2>
            <p className="mt-3 text-ink-soft">
              Most problems come from wrong data rather than the app. Check these once and keep them in your saved lists:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-soft">
              <li>Buyer GSTINs: check the format with the <Link className="text-brand-700 underline" href="/tools/gstin-validator">GSTIN validator</Link>.</li>
              <li>HSN codes for your products: start with the <Link className="text-brand-700 underline" href="/tools/hsn-code-lookup">HSN chapter lookup</Link>.</li>
              <li>Whether the movement needs an e-way bill at all: use the <Link className="text-brand-700 underline" href="/tools/eway-bill-eligibility-checker">eligibility checker</Link>.</li>
              <li>The documents and data you need: see the <Link className="text-brand-700 underline" href="/documents-required-for-eway-bill">documents checklist</Link>.</li>
            </ul>
          </div>
          <ComplianceNote title="What E-Way Easy is, and what it is not">
            <p>E-Way Easy is a private app, not a government portal, and is not affiliated with GSTN or NIC.</p>
            <p>E-way bill numbers come from the official e-way bill system. The exact steps can differ by app version.</p>
            <p>Each e-way bill action costs 5 credits (₹5), taken only when it succeeds. See <Link className="underline" href="/pricing">pricing</Link> and the <Link className="underline" href="/help">help centre</Link>.</p>
          </ComplianceNote>
        </section>

        <section className="mt-20" aria-labelledby="faq">
          <h2 id="faq" className="h2">Questions</h2>
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
