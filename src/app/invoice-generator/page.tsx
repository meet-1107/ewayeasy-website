import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import ComplianceNote from '@/components/ComplianceNote';
import DataTable from '@/components/DataTable';
import DownloadCTA from '@/components/DownloadCTA';
import InvoiceGeneratorSwitch from '@/components/InvoiceGeneratorSwitch';
import JsonLd from '@/components/JsonLd';
import PlayBadge from '@/components/PlayBadge';
import { Phone } from '@/components/AppGraphics';
import { CheckList, StepList } from '@/components/feature-pages/FeatureBlocks';
import GstinAutofillGraphic from '@/components/feature-pages/GstinAutofillGraphic';
import { FaqList, ReadingList, SectionIntro, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { absoluteUrl, faqLd, pageMeta } from '@/lib/seo';
import { INVOICE_PHOTOS } from '@/lib/industry-photos';
import { PRICING } from '@/lib/pricing';

const PATH = '/invoice-generator';
const TITLE = 'Free Invoice Generator Online: GST & Non-GST Bill Maker';
const DESCRIPTION =
  'Make a GST or non-GST invoice online, free and without sign-up. Taxes, totals and amount in words calculate as you type; download a PDF or print.';

export const metadata = pageMeta({ title: TITLE, description: DESCRIPTION, path: PATH });

const CREDITS = PRICING.creditsPerEwayBill ?? 5;

const STEPS = [
  {
    title: 'Pick With GST or Without GST',
    text: 'With GST gives a tax invoice with GSTIN, HSN, place of supply and tax columns. Without GST gives a simple bill with no tax columns.',
  },
  {
    title: 'Fill in your details, the buyer and the items',
    text: 'Add your business name and GSTIN, the buyer, then each item with quantity, rate and GST rate. Totals, tax and amount in words update as you type.',
  },
  {
    title: 'Download the PDF or print',
    text: 'Choose A4, A5, Letter or Legal, add your logo if you like, then download a PDF to share on WhatsApp or email, or print it.',
  },
];

const FAQ: Faq[] = [
  {
    q: 'Is this invoice generator really free?',
    a: 'Yes. Making, downloading and printing invoices on this page is completely free, with no sign-up, no watermark and no limit on the number of invoices.',
  },
  {
    q: 'Can I make an invoice without GST?',
    a: 'Yes. Choose Without GST to get a simple bill with no tax columns. It suits sellers who are not registered under GST. Composition dealers and sellers of exempt goods issue a bill of supply, which also carries no GST.',
  },
  {
    q: 'Does it calculate CGST, SGST and IGST automatically?',
    a: 'Yes. In With GST mode, enter your state and the place of supply. If both are in the same state the tax is split into CGST and SGST; if they differ, IGST is charged. Totals and the amount in words update automatically.',
  },
  {
    q: 'Is my invoice data saved on your server?',
    a: 'No. The invoice is filled in and turned into a PDF inside your browser. Drafts, your invoice number series and saved products are kept only in this browser on your device.',
  },
  {
    q: 'Can the buyer’s name and address fill in automatically from their GSTIN?',
    a: 'Not on this web page, which works without sign-up and without any GST connection. In the E-Way Easy Android app, typing the buyer’s GSTIN fills their name, address, state and PIN code automatically.',
  },
  {
    q: 'Can I download the invoice in Excel?',
    a: 'This generator downloads a PDF. If you prefer to keep invoices in a spreadsheet, download the free GST or non-GST invoice format in Excel, which has the tax formulas built in.',
  },
  {
    q: 'Can I generate an e-way bill from the same invoice?',
    a: `Yes, in the E-Way Easy app. The invoice you create becomes the e-way bill: review the details, the road distance is filled from the PIN codes, and tap Generate. Each e-way bill action costs ${CREDITS} credits (1 credit = ₹1); making invoices does not use credits.`,
  },
  {
    q: 'Is an invoice made here valid under GST?',
    a: 'The GST layout includes the fields Rule 46 of the CGST Rules asks for, such as GSTIN, HSN, place of supply and tax amounts. Whether an invoice is correct depends on the details you enter, so check them, and check whether e-invoicing applies to your business.',
  },
];

const COMPARE_ROWS = [
  { label: 'Price', cells: ['Free', 'Free to make invoices; e-way bills use credits'] },
  { label: 'Sign-up', cells: ['Not needed', 'Business GSTIN, one time'] },
  { label: 'With and without GST', cells: ['Yes', 'GST invoices'] },
  { label: 'Buyer details from GSTIN', cells: ['Typed by you', 'Filled automatically'] },
  { label: 'Saved products and HSN', cells: ['In this browser', 'In the app'] },
  { label: 'Invoice number series', cells: ['Yes', 'Yes, your own series'] },
  { label: 'Road distance', cells: ['Not needed', 'Filled from PIN codes, editable'] },
  { label: 'E-way bill from the invoice', cells: ['No', `Yes, ${CREDITS} credits per action`] },
  { label: 'Works on', cells: ['Any browser', 'Android phone'] },
];

export default function InvoiceGeneratorPage() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'E-Way Easy Free Invoice Generator',
            url: absoluteUrl(PATH),
            description: DESCRIPTION,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Any (web browser)',
            browserRequirements: 'Requires JavaScript',
            inLanguage: 'en-IN',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            featureList: [
              'GST tax invoice and non-GST bill',
              'Automatic CGST/SGST or IGST',
              'Live totals and amount in words',
              'Invoice number series',
              'Saved products',
              'Logo, currency and paper size',
              'PDF download and print',
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to make an invoice online for free',
            step: STEPS.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.text })),
          },
          faqLd(FAQ),
        ]}
      />

      <header className="no-print relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />
        <div className="container relative py-6 md:py-9">
          <Breadcrumbs crumbs={[{ name: 'Free tools', href: '/tools' }, { name: 'Invoice generator', href: PATH }]} light />
          <h1 className="mt-3 max-w-4xl font-display text-[28px] font-bold leading-tight md:text-5xl">
            Free Invoice Generator: make a GST or non-GST bill online
          </h1>
          <p className="mt-3 max-w-3xl text-brand-100/90 md:text-lg">
            Create a professional invoice in a minute. Taxes, totals and the amount in words work themselves out, and
            you download a PDF. No sign-up, no watermark, nothing uploaded.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Generator features">
            {['100% free', 'No sign-up', 'With or without GST', 'CGST/SGST or IGST', 'PDF & print', 'Data stays on your device'].map((f) => (
              <li key={f} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">{f}</li>
            ))}
          </ul>
        </div>
      </header>

      <section aria-label="Invoice generator" className="container py-6 md:py-8">
        <InvoiceGeneratorSwitch />
      </section>

      <div className="no-print">
        <section className="container pb-4">
          <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-amber-500 bg-amber-300/15 px-5 py-4 text-ink">
            <p className="leading-7">
              <strong>Quick answer:</strong> To make an invoice online for free, choose With GST (tax invoice) or Without
              GST (simple bill), enter your details, the buyer and the items, and download the PDF. This generator works
              out CGST and SGST or IGST from the two states, totals and the amount in words. To have the buyer’s details
              filled from their GSTIN and turn the invoice into an e-way bill, use the E-Way Easy Android app.
            </p>
          </div>
        </section>

        <section className="section" aria-labelledby="how">
          <div className="container">
            <SectionIntro id="how" eyebrow="How it works" title="Make an invoice online in 3 steps">
              <p>Works on your phone or computer. Everything happens in your browser.</p>
            </SectionIntro>
            <StepList steps={STEPS} />
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="which">
          <div className="container">
            <SectionIntro id="which" eyebrow="With GST or without GST" title="Which invoice do you need?">
              <p>
                It depends on your GST registration, not on the buyer. Not sure? Read{' '}
                <Link href="/blog/invoice-with-gst-vs-without-gst" className={linkClass}>invoice with GST vs without GST</Link>.
              </p>
            </SectionIntro>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="overflow-hidden rounded-[1.5rem] border-2 border-brand-700 bg-cream p-6">
                <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9]">
                  <Image src={INVOICE_PHOTOS.withGst.src} alt={INVOICE_PHOTOS.withGst.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">With GST</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">GST tax invoice</h3>
                <p className="mt-2 leading-7 text-ink-soft">
                  For GST-registered sellers charging tax. Shows your GSTIN and the buyer’s, HSN codes, place of supply,
                  taxable value and CGST + SGST (same state) or IGST (different states).
                </p>
                <Link href="/sales-invoice-templates/gst-tax-invoice" className="mt-3 inline-block text-sm font-semibold text-brand-700 underline">
                  GST invoice format explained →
                </Link>
              </article>
              <article className="overflow-hidden rounded-[1.5rem] border-2 border-ink/20 bg-cream p-6">
                <div className="relative -mx-6 -mt-6 mb-5 aspect-[16/9]">
                  <Image src={INVOICE_PHOTOS.withoutGst.src} alt={INVOICE_PHOTOS.withoutGst.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-ink-faint">Without GST</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">Simple bill</h3>
                <p className="mt-2 leading-7 text-ink-soft">
                  For sellers who are not registered under GST and cannot charge it. A clean bill with your details, the
                  customer, items and total. Composition and exempt supplies use a bill of supply.
                </p>
                <Link href="/sales-invoice-templates/simple-sales-invoice" className="mt-3 inline-block text-sm font-semibold text-brand-700 underline">
                  Simple bill format →
                </Link>
              </article>
            </div>
            <p className="mt-3 text-xs text-ink-faint">Photos: {INVOICE_PHOTOS.withGst.credit} and {INVOICE_PHOTOS.withoutGst.credit} on Unsplash. Illustrative.</p>
          </div>
        </section>

        <section className="section" aria-labelledby="auto">
          <div className="container">
            <SectionIntro id="auto" eyebrow="Calculated for you" title="What the free invoice generator does automatically" />
            <CheckList
              items={[
                { label: 'GST split', text: 'Same state: CGST + SGST. Different states: IGST. Decided from your state and the place of supply.' },
                {
                  label: 'Line totals and tax',
                  text: (
                    <>
                      Quantity × rate, less discount, then tax at each item’s rate. Checking a figure? Use the{' '}
                      <Link href="/tools/gst-calculator" className={linkClass}>GST calculator</Link>.
                    </>
                  ),
                },
                { label: 'Amount in words', text: 'The invoice total is written in words in Indian format (lakh, crore).' },
                {
                  label: 'Invoice numbers',
                  text: (
                    <>
                      Set a prefix once and each new invoice takes the next number. Planning a series? Try the{' '}
                      <Link href="/tools/invoice-number-generator" className={linkClass}>invoice number generator</Link>.
                    </>
                  ),
                },
                { label: 'Saved products', text: 'Save an item with its HSN and rate, then add it to the next invoice in one tap.' },
                { label: 'Drafts', text: 'Your work is kept in this browser, so a refresh does not lose the invoice.' },
              ]}
            />
          </div>
        </section>

        <section className="section bg-brand-950 text-white" aria-labelledby="app">
          <div className="container grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">E-Way Easy app · Android</p>
              <h2 id="app" className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Type the buyer’s GSTIN. The rest fills itself.
              </h2>
              <p className="mt-4 leading-7 text-brand-100/90">
                In the app, you enter the buyer’s GSTIN and their name, address, state and PIN code are filled in. Saved
                products bring their HSN code and rate. When the goods move, the same invoice becomes the e-way bill and
                the road distance is worked out from the PIN codes.
              </p>
              <ul className="mt-6 space-y-3 text-brand-100/90">
                <li>• <strong className="text-white">Auto buyer entry</strong> from GSTIN, or pick a saved buyer.</li>
                <li>• <strong className="text-white">Auto distance</strong> between PIN codes, editable if your route differs.</li>
                <li>
                  • <strong className="text-white">Import PDF:</strong> made the invoice in other software? The app reads it;{' '}
                  <Link href="/invoice-pdf-to-eway-bill" className="underline">you review, then generate</Link>.
                </li>
                <li>• <strong className="text-white">Free invoices.</strong> Credits are used only for e-way bill actions ({CREDITS} each).</li>
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PlayBadge placement="invoice-generator-app" />
                <Link href="/blog/how-to-make-gst-invoice-on-mobile" className="btn-ghost-dark">How it works on mobile</Link>
              </div>
            </div>
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center">
              <GstinAutofillGraphic />
              <Phone
                screen="invoice"
                width={210}
                className="hidden sm:block"
                alt="E-Way Easy new invoice screen with buyer details filled from GSTIN, items and GST totals (sample data)"
              />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="compare">
          <div className="container">
            <SectionIntro id="compare" eyebrow="Web or app" title="Free online generator vs the E-Way Easy app">
              <p>Use the web generator for a quick invoice. Use the app when you bill regularly or move goods.</p>
            </SectionIntro>
            <div className="mt-8 max-w-4xl">
              <DataTable
                caption="Free online invoice generator compared with the E-Way Easy Android app"
                columns={['', 'Online generator (this page)', 'E-Way Easy app']}
                rows={COMPARE_ROWS}
              />
            </div>
            <div className="mt-10 overflow-hidden rounded-[1.75rem] border border-brand-900/10 shadow-card">
              <Image
                src="/images/app-banner.webp"
                alt="E-Way Easy app: GST invoices and e-way bills, made easy. Invoice, PDF import, NIC e-way bill and wallet on an Android phone"
                width={1024}
                height={500}
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        <section className="section bg-white" aria-labelledby="learn">
          <div className="container">
            <SectionIntro id="learn" eyebrow="Invoice formats and rules" title="Everything about making invoices in India" />
            <ReadingList
              items={[
                { href: '/invoice-format-excel', label: 'Invoice format in Excel', text: 'Free GST and non-GST invoice formats (.xlsx) with tax formulas built in.' },
                { href: '/gst-invoice-rules', label: 'GST invoice rules', text: 'Mandatory fields under Rule 46, numbering, copies, time limits and bill of supply.' },
                { href: '/blog/invoice-with-gst-vs-without-gst', label: 'Invoice with GST vs without GST', text: 'Tax invoice, bill of supply or a plain bill: which one you should issue.' },
                { href: '/blog/invoice-vs-bill-vs-receipt', label: 'Invoice vs bill vs receipt', text: 'What each document means in India and which one your buyer needs.' },
                { href: '/blog/how-to-make-gst-invoice-on-mobile', label: 'Make a GST invoice on your phone', text: 'Step by step in the app, with buyer auto-fill from GSTIN.' },
                { href: '/blog/how-to-calculate-gst-on-sales-invoice', label: 'How to calculate GST on an invoice', text: 'Discounts, mixed rates, CGST/SGST vs IGST and rounding, worked out.' },
                { href: '/sales-invoice-templates', label: 'All sales invoice templates', text: 'GST, simple, service and wholesale invoice layouts.' },
                { href: '/tools/gstin-validator', label: 'GSTIN validator', text: 'Check a buyer’s GSTIN format and check digit before you bill.' },
              ]}
            />
          </div>
        </section>

        <FaqList id="faq" faq={FAQ} />

        <section className="container pb-4">
          <div className="mx-auto max-w-3xl">
            <ComplianceNote title="Please note">
              <p>
                This generator helps you prepare an invoice; it does not file anything with the government or check that
                the details are correct. Businesses covered by e-invoicing must also report B2B invoices to the Invoice
                Registration Portal. See the{' '}
                <Link href="/gst-invoice-rules" className={linkClass}>GST invoice rules</Link>, and confirm current rules on the{' '}
                <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>GST portal</a>.
                E-Way Easy is not affiliated with GSTN, NIC or CBIC.
              </p>
            </ComplianceNote>
          </div>
        </section>

        <div className="container py-16 md:py-20">
          <DownloadCTA
            placement="invoice-generator-footer"
            title="Billing every day? Let the app fill it in"
            text="Buyer details from GSTIN, saved products, auto distance, and the e-way bill from the same invoice, on your Android phone."
          />
        </div>
      </div>
    </>
  );
}
