import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import DataTable from '@/components/DataTable';
import JsonLd from '@/components/JsonLd';
import { SectionIntro, ReadingList, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { pageMeta, faqLd } from '@/lib/seo';
import { PRICING } from '@/lib/pricing';

// This page compares categories only: the third column is "billing or accounting software" in
// general, and no company or product is named. We hold no verified, dated data on any competitor's
// price, rating or features, so any named comparison must wait until that data exists, with its
// sources and the date it was checked shown on the page. Keep that column to "varies by product".

const PATH = '/compare';
const DESCRIPTION =
  'Compare the E-Way Easy Android app, the official e-way bill portal and full billing software on cost, device, bulk filing, invoice PDF import and setup.';

export const metadata = pageMeta({
  title: 'E-Way Bill App vs Portal vs Billing Software',
  description: DESCRIPTION,
  path: PATH,
});

const CREDITS = PRICING.creditsPerEwayBill ?? 5;
const RUPEES = CREDITS * PRICING.rupeesPerCredit;
const VARIES = 'Varies by product';

const COMPARISON = [
  {
    label: 'Best for',
    cells: [
      'GST-registered traders, manufacturers, wholesalers, distributors and transporters who want to handle e-way bills from a phone and pay per action',
      'Anyone who wants to work directly on the government system, including high-volume filers using the bulk tool',
      'Businesses that want billing, accounts and reports in one system',
    ],
  },
  { label: 'Device', cells: ['Android phone', 'Web browser', VARIES] },
  {
    label: 'Creating the sales invoice',
    cells: [
      'Yes, as step one of the e-way bill flow',
      'No, you enter details from an invoice you already have',
      'Yes, usually the main purpose',
    ],
  },
  {
    label: 'E-way bill generation',
    cells: [
      'Yes, filed on the official NIC system through an authorised GSP, using your own API login',
      'Yes, directly on the official system',
      VARIES,
    ],
  },
  {
    label: 'Invoice PDF import',
    cells: [
      'Yes, the app reads the PDF and you review the details before generating',
      'Not a portal feature; you enter the details or use the bulk tool',
      VARIES,
    ],
  },
  {
    label: 'Bulk generation',
    cells: ['Not available', 'Yes, through the official bulk generation tool', VARIES],
  },
  {
    label: 'Part B, extend and cancel',
    cells: [`Yes, in the app, at ₹${RUPEES} per successful action`, 'Yes, on the portal', VARIES],
  },
  {
    label: 'Cost',
    cells: [
      `₹${RUPEES} per successful action (${CREDITS} credits), no yearly subscription`,
      'No charge for using the official portal',
      'Varies, usually a plan or licence; check the vendor',
    ],
  },
  {
    label: 'Setup needed',
    cells: [
      'Sign up, add your GSTIN and connect your e-way bill API login once, guided in the app',
      'Register on the portal with your GSTIN and sign in with your portal login',
      VARIES,
    ],
  },
];

const FAQ: Faq[] = [
  {
    q: 'Does the official e-way bill portal charge for use?',
    a: `There is no charge for using the official portal at ewaybillgst.gov.in. E-Way Easy is a separate private app, and it charges ${CREDITS} credits (₹${RUPEES}) for each e-way bill action that succeeds.`,
  },
  {
    q: 'Does E-Way Easy replace the official e-way bill portal?',
    a: 'No. E-Way Easy files on the official NIC e-way bill system through an authorised GST Suvidha Provider (GSP), using your own e-way bill API login, and the e-way bill number comes from that system. It is independent and not affiliated with the Government of India, GSTN or NIC.',
  },
  {
    q: 'Can E-Way Easy generate e-way bills in bulk?',
    a: 'No. Bulk e-way bill generation is not an app feature, and you generate each e-way bill separately. For high volumes, the official portal offers bulk generation through its own bulk tool.',
  },
  {
    q: 'Do I need billing software if I use E-Way Easy?',
    a: 'Not to create the invoice for a dispatch, because the app makes the GST invoice as part of the e-way bill flow. E-Way Easy is not accounting software, though. If you need full accounts, keep your billing software and import its invoice PDFs into the app, reviewing the details before you generate.',
  },
];

export default function ComparePage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Compare"
        title="E-Way Easy app, official portal or billing software: which fits?"
        description="Three ways to handle e-way bills, what each one does, what it costs and when it is the wrong choice."
        crumbs={[{ name: 'Compare', href: PATH }]}
      />

      <section className="section" aria-labelledby="quick-answer">
        <div className="container">
          <div className="max-w-3xl">
            <h2 id="quick-answer" className="h2">Quick answer</h2>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              Use the official portal if you want to work directly on the government system, or if you need its bulk tool
              for high volumes. Use E-Way Easy if you want to create or import an invoice and generate e-way bills from an
              Android phone, at ₹{RUPEES} per successful action with no yearly subscription. Use full billing or accounting
              software if you need invoicing and accounts in one system; how it handles e-way bills varies by product, so
              check with the vendor.
            </p>
          </div>

          <h2 id="comparison" className="h2 mb-8 mt-12">Side-by-side comparison</h2>
          <DataTable
            caption="E-Way Easy app compared with the official e-way bill portal and full billing or accounting software"
            columns={['What to compare', 'E-Way Easy app', 'Official e-way bill portal (ewaybillgst.gov.in)', 'Full billing or accounting software']}
            rows={COMPARISON}
            width="wide"
          />
          <p className="mt-4 max-w-3xl text-sm text-ink-faint">
            The last column describes a category, not any one product. Portal features and rules can change, so confirm them on
            the{' '}
            <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              official e-way bill portal
            </a>.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="when-fits">
        <div className="container">
          <SectionIntro id="when-fits" eyebrow="Honest advice" title="When each one fits" />
          <div className="prose-content mt-8 max-w-3xl">
            <h3>E-Way Easy fits when</h3>
            <ul>
              <li>You raise e-way bills from a phone, at the factory, godown or on the road.</li>
              <li>You want the invoice and e-way bill in one flow, or already have the invoice as a PDF and don&rsquo;t want to retype it.</li>
              <li>Your volume is manageable one e-way bill at a time, and you prefer paying per action to a yearly plan.</li>
            </ul>

            <h3>The official portal fits when</h3>
            <ul>
              <li>You are comfortable entering details yourself and only occasionally need an e-way bill.</li>
              <li>You file high volumes and can prepare data for the <Link href="/bulk-eway-bill-generation">official bulk generation tool</Link>.</li>
              <li>You want to work on the government system directly, with nothing in between.</li>
            </ul>

            <h3>Billing or accounting software fits when</h3>
            <ul>
              <li>You need full accounts, reports and inventory in one place.</li>
              <li>Several staff work on the same books. Check how e-way bills are handled and what the plan costs before you buy.</li>
            </ul>

            <h3>E-Way Easy is not the right choice when</h3>
            <ul>
              <li>You are a high-volume filer who needs bulk generation.</li>
              <li>Your team needs multi-user accounts with separate logins.</li>
              <li>You need full accounting, not just invoices and e-way bills.</li>
              <li>You need e-invoice (IRN) generation, or an app for iPhone.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="read-next">
        <div className="container">
          <SectionIntro id="read-next" eyebrow="Read next" title="Related pages" />
          <ReadingList
            items={[
              {
                href: '/pricing',
                label: 'E-Way Easy pricing',
                text: 'Credit packs, what each action costs, and when credits are refunded.',
              },
              {
                href: '/invoice-pdf-to-eway-bill',
                label: 'Invoice PDF to e-way bill',
                text: 'How PDF import works, and what to check before you generate.',
              },
              {
                href: '/bulk-eway-bill-generation',
                label: 'Bulk e-way bill generation',
                text: 'How bulk generation works on the official portal.',
              },
              {
                href: '/eway-bill-api-setup',
                label: 'E-way bill API login setup',
                text: 'The one-time setup that connects the app to your API login.',
              },
            ]}
          />
          <div className="mx-auto mt-12 max-w-3xl">
            <ComplianceNote title="Not a government service">
              <p>
                E-Way Easy is independent and not affiliated with the Government of India, GSTN or NIC. The e-way bill number is
                issued by the official e-way bill system, and you remain responsible for the accuracy of what you file.
              </p>
            </ComplianceNote>
          </div>
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="compare"
          title="Generate e-way bills from your phone"
          text={`Create or import the invoice, review the details and generate. ${CREDITS} credits per action, charged only when it succeeds.`}
        />
      </div>
    </>
  );
}
