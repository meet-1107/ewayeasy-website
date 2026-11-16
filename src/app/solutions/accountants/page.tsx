import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import DataTable from '@/components/DataTable';
import { CheckList } from '@/components/feature-pages/FeatureBlocks';
import {
  SectionIntro, ProblemGrid, ToolCards, ReadingList, FaqList, linkClass, type Faq,
} from '@/components/solutions/SolutionBlocks';
import { pageMeta, faqLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Free GST Tools for Accountants & GST Practitioners',
  description:
    'Free browser tools for accountants preparing client GST data: GSTR-1 checker, GSTR-1 vs 3B and GSTR-2B reconciliation, GSTIN validator and e-way bill data checker.',
  path: '/solutions/accountants',
});

const FAQ: Faq[] = [
  {
    q: 'Are the GST tools on this website free for accountants?',
    a: 'Yes. The checkers and reconciliation tools on this website are free to use in your browser. They help you spot problems in data; they do not file returns or connect to the GST portal.',
  },
  {
    q: 'Can I manage all my clients from one E-Way Easy account?',
    a: 'No. The app currently works per business on a phone. There is no multi-client dashboard or practitioner login today. If that would help your practice, tell us through the contact page.',
  },
  {
    q: 'Which of my clients would benefit from the app?',
    a: 'Clients who dispatch goods regularly and make their own sales invoices, such as small manufacturers, wholesalers and distributors. The app lets them make the invoice and review e-way bill details in one flow on their Android phone.',
  },
  {
    q: 'Does the app generate e-invoices (IRN)?',
    a: 'No. E-invoice generation is not an app feature. For clients who may be covered by e-invoicing, the free e-invoice applicability checker gives a preliminary view; confirm against the latest notification.',
  },
  {
    q: 'When should a client use the portal’s bulk upload instead of the app?',
    a: 'When they file many e-way bills in one sitting from a register or ERP. The app works one invoice at a time, so the portal’s bulk generation, with a JSON file prepared in the official tool, fits better. Check the rows first with the free Bulk E-Way Bill Data Checker.',
  },
  {
    q: 'How do I check a client’s e-way bills against their invoices?',
    a: 'Enter both side by side in the free invoice vs e-way bill checker to spot mismatches in GSTIN, value, HSN or PIN. Most gaps trace back to retyping, so fix the client’s source data. If Part A is wrong and less than 24 hours have passed, the e-way bill can be cancelled and generated again.',
  },
];

const ROUTES = [
  {
    label: 'Covered by e-invoicing',
    cells: ['Generate the e-way bill from the IRN on the official system or the client’s e-invoice route', 'E-Way Easy does not create IRNs, so it is not the route for these invoices'],
  },
  {
    label: 'Owner dispatches a few times a day or week',
    cells: ['E-Way Easy on the client’s own Android phone', 'One invoice at a time; invoice and e-way bill from the same details'],
  },
  {
    label: 'Month-end batch from a register or Excel',
    cells: ['Bulk generation on the portal, using a JSON file from the official tool', 'Run the rows through the Bulk E-Way Bill Data Checker first'],
  },
  {
    label: 'High volume from an ERP',
    cells: ['API filing through a GSP or ERP integration', 'Needs IT setup; outside what this website or app offers'],
  },
  {
    label: 'Small, local movements',
    cells: ['Check whether an e-way bill is needed at all', 'Threshold and state rules apply; use the eligibility checker'],
  },
];

export default function AccountantsPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Solutions · Accountants & GST practitioners"
        title="Free GST tools for accountants who prepare client data"
        description="Check sales registers, reconcile returns and clean e-way bill data in your browser. And for clients who dispatch goods, a simple app they can use on their own phone."
        crumbs={[
          { name: 'Solutions', href: '/solutions' },
          { name: 'Accountants', href: '/solutions/accountants' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#free-tools" className="btn-amber">See the free tools</a>
          <Link href="/contact" className="btn-ghost-dark">Ask about a professional plan</Link>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="problem">
        <div className="container">
          <SectionIntro id="problem" eyebrow="The month-end problem" title="Client data rarely arrives clean">
            <p>
              Your month-end problem is rarely the filing itself. It is client data that arrives late, in different
              formats, and with errors you must catch first. Sales registers need checking, purchase data must match
              GSTR-2B, and e-way bill rows for bulk upload often carry missing PINs or old invoice dates.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'Sales registers with errors',
                text: 'Invalid GSTINs, duplicate invoice numbers and tax maths that does not add up have to be caught before GSTR-1.',
              },
              {
                title: 'Returns that do not tie up',
                text: 'Gaps between GSTR-1 and GSTR-3B, or between the purchase register and GSTR-2B, need month-wise and supplier-wise checks.',
              },
              {
                title: 'E-way bill data from clients',
                text: 'Rows prepared for bulk upload on the portal often fail on GSTIN, document age, HSN, PIN or distance.',
              },
              {
                title: 'Clients who make invoices on the go',
                text: 'Some clients dispatch daily and need a simpler way to make the invoice and e-way bill details themselves.',
              },
            ]}
          />
        </div>
      </section>

      <section id="free-tools" className="section scroll-mt-20 bg-white" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free on this website" title="Free tools for GST work">
            <p>
              The free tools on this website check data; they do not file anything or connect to the GST portal. Paste a
              client’s register, read the flags, and fix the source data before you file. All of them run in your browser,
              for any client, as often as you need.
            </p>
          </SectionIntro>

          <h3 className="mt-10 font-display text-xl font-semibold text-ink">Returns and reconciliation</h3>
          <ToolCards
            items={[
              {
                slug: 'gstr-1-checker',
                why: 'Paste a client’s sales register to check GSTINs, duplicates and tax maths, and see B2B, B2CL, B2CS and HSN-wise totals.',
              },
              {
                slug: 'gstr-1-vs-gstr-3b-reconciliation',
                why: 'Compare month-wise taxable value and tax reported in GSTR-1 and GSTR-3B to find the gaps.',
              },
              {
                slug: 'gstr-2b-reconciliation',
                why: 'Match the purchase register with GSTR-2B by supplier GSTIN and invoice number: matched, mismatched and missing.',
              },
            ]}
          />

          <h3 className="mt-14 font-display text-xl font-semibold text-ink">E-way bill and GSTIN checks</h3>
          <ToolCards
            items={[
              {
                slug: 'bulk-eway-bill-data-checker',
                why: 'Check invoice rows before a bulk e-way bill upload on the portal: GSTIN, document age, duplicates, HSN, PIN, distance, vehicle and values.',
              },
              {
                slug: 'gstin-validator',
                why: 'Validate GSTIN format and check digit for one number or a whole list, and decode state code and PAN.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="routes">
        <div className="container">
          <SectionIntro id="routes" eyebrow="Decision guide" title="Which e-way bill route fits each client?">
            <p>
              Match the route to how the client sells, not to one tool for everyone. E-invoicing clients generate from the
              IRN, batch filers use the portal’s bulk upload, ERP-heavy clients use API filing, and owners who dispatch on
              the go can use a phone app. Many practices end up with a mix.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-4xl">
            <DataTable
              caption="Which e-way bill route fits each kind of client"
              columns={['If the client…', 'Then the usual route is', 'Keep in mind']}
              rows={ROUTES}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">
            For the official bulk process, see{' '}
            <Link href="/bulk-eway-bill-generation" className={linkClass}>bulk e-way bill generation on the portal</Link>.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="mistakes">
        <div className="container">
          <SectionIntro id="mistakes" eyebrow="What you will see" title="E-way bill mistakes accountants catch in client data">
            <p>
              Client e-way bill errors follow a pattern: old documents, stretched distances, values that do not match the
              sales register, and the wrong fix after the fact. Catching them in the data is cheaper than explaining a
              rejection or a detained truck. Check these first when a client hands over rows.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'Invoices older than 180 days in the batch',
                text: 'Month-end batches pick up stale documents. An e-way bill cannot be generated for an invoice dated more than 180 days before the generation date.',
              },
              {
                title: 'Distance stretched past the limit',
                text: 'The portal accepts an actual distance only up to 10% more than its PIN-to-PIN figure. Rows typed from memory often exceed it.',
              },
              {
                title: 'E-way bill values that differ from GSTR-1',
                text: 'If the e-way bill value does not match the invoice in the sales register, expect questions. Compare both before the return is filed.',
              },
              {
                title: 'The wrong fix after generation',
                text: 'Clients cancel when only the vehicle changed, or try to cancel after 24 hours. A vehicle change needs a Part B update instead.',
              },
            ]}
          />
          <p className="mt-6 max-w-3xl text-sm text-ink-soft">
            Need a reference to send the client? Share{' '}
            <Link href="/eway-bill-common-errors" className={linkClass}>common e-way bill errors</Link> and the{' '}
            <Link href="/tools/invoice-vs-eway-bill-checker" className={linkClass}>invoice vs e-way bill checker</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="example">
        <div className="container">
          <SectionIntro id="example" eyebrow="Example (illustrative)" title="One practice, three clients, three routes">
            <p>
              Example (illustrative): a Coimbatore practitioner looks after three clients who move goods. Each sells in a
              different way, so each gets a different e-way bill route. The practitioner’s job stays the same for all
              three: clean data in, matching returns out.
            </p>
          </SectionIntro>
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-6 text-ink-soft">
            <li>
              <strong className="text-ink">A pump manufacturer covered by e-invoicing.</strong> Its e-way bills come from the
              IRN on the official system, so the practitioner checks e-invoice data, not the app.
            </li>
            <li>
              <strong className="text-ink">A hardware distributor whose owner dispatches from the shop.</strong> He uses E-Way
              Easy on his own phone, with his own API login. Saved buyers and products cut retyping, and the practitioner
              reviews his sales register at month end with the GSTR-1 checker.
            </li>
            <li>
              <strong className="text-ink">A seasonal agri-inputs trader with a month-end batch.</strong> The rows go through
              the Bulk E-Way Bill Data Checker first, then into the official bulk tool for upload on the portal.
            </li>
          </ol>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">The practice and clients are made up for illustration.</p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="clients">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="clients" eyebrow="For your clients" title="Recommend E-Way Easy to clients who dispatch goods">
              <p>
                E-Way Easy suits clients who make their own sales invoices and move goods regularly, but do not file in
                batches. The Android app gives them one flow: Invoice → Review EWB → Generated. For you, that means the
                invoice and e-way bill are built from the same details, so fewer mismatches reach your desk.
              </p>
            </SectionIntro>
            <ul className="mt-6 space-y-3 text-ink-soft">
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <span>Buyer GSTIN fills in the name, address, state and PIN, which cuts down typing errors in the data you later review.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <span>HSN codes come from saved products, and invoices follow the client’s own number series.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <span>Distance is calculated from PIN codes and can be edited; the e-way bill details are reviewed on one screen before generation.</span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <span>The dashboard shows the client’s total sales for the financial year and invoice and e-way bill counts.</span>
              </li>
            </ul>

            <div className="mt-8">
              <ComplianceNote title="How the app works today">
                <p>
                  E-Way Easy currently works <strong>per business, on a phone</strong>. Each client uses it on their own Android
                  device. There is no multi-client dashboard, practitioner login, team accounts, API or bulk generation in the
                  app at present.
                </p>
              </ComplianceNote>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Share <Link href="/how-it-works" className={linkClass}>how E-Way Easy works</Link> or
              the <Link href="/features" className={linkClass}>app feature list</Link> with your clients.
            </p>
          </div>
          <div className="mx-auto">
            <Phone
              screen="dashboard"
              width={240}
              alt="E-Way Easy dashboard for a single business showing GSTIN, total sales for the financial year and invoice and e-way bill counts (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="month-end">
        <div className="container">
          <SectionIntro id="month-end" eyebrow="Checklist" title="Month-end checklist for dispatching clients">
            <p>
              A short monthly routine catches most e-way bill problems before they reach a return. Run it for every client
              who moves goods, whatever route they use. It takes the free tools above, the client’s sales register and their
              list of e-way bills for the month.
            </p>
          </SectionIntro>
          <CheckList
            items={[
              { label: 'Sales register clean', text: 'Run it through the GSTR-1 checker for GSTIN, duplicate and tax-maths errors.' },
              { label: 'E-way bills match invoices', text: 'Spot-check value, GSTIN and HSN against the invoices, especially high-value ones.' },
              { label: 'No stale documents', text: 'Flag any pending row with an invoice date more than 180 days old.' },
              { label: 'Cancellations explained', text: 'Ask why each e-way bill was cancelled, and whether a fresh one was generated.' },
              { label: 'Returns tie up', text: 'Compare GSTR-1 with GSTR-3B, and the purchase register with GSTR-2B.' },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="pro-plan">
        <div className="container">
          <div className="card mx-auto max-w-3xl p-8 md:p-10">
            <p className="eyebrow">Tell us what you need</p>
            <h2 id="pro-plan" className="h2 mt-2">Interested in a professional or multi-client plan?</h2>
            <p className="mt-4 text-ink-soft">
              We do not offer one today. If a version for practitioners who handle several clients would be useful to you,
              tell us how you work, how many clients dispatch goods and what you would need. We read every message, but
              this is not a commitment to build or launch such a plan.
            </p>
            <Link href="/contact" className="btn-primary mt-6">Tell us about your practice</Link>
            <p className="mt-6 text-sm text-ink-soft">
              Want to introduce E-Way Easy to the businesses you work with? See the{' '}
              <Link href="/partners" className={linkClass}>partner program</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Reference guides to share">
            <p>
              Clients ask the same e-way bill questions every month. These guides answer them in plain language, with
              links to official sources, so you can send a link instead of writing the answer again. Rules change by
              notification, so confirm the current position on the official portal.
            </p>
          </SectionIntro>
          <ReadingList
            items={[
              {
                href: '/eway-bill-rules',
                label: 'E-way bill rules explained',
                text: 'Threshold, who generates, validity and exceptions, with links to official sources.',
              },
              {
                href: '/bulk-eway-bill-generation',
                label: 'Bulk e-way bill generation on the portal',
                text: 'How the official bulk facility works for high-volume clients.',
              },
              {
                href: '/eway-bill-correction',
                label: 'Correcting an e-way bill',
                text: 'What can be updated, and when cancelling and regenerating is the only option.',
              },
              {
                href: '/eway-bill-faq',
                label: 'E-way bill FAQ',
                text: 'Quick answers to the questions clients ask most.',
              },
            ]}
          />
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="solutions-accountants"
          title="A simple app for your dispatching clients"
          text="Clients can make the sales invoice and review e-way bill details on their own Android phone with E-Way Easy."
        />
      </div>
    </>
  );
}
