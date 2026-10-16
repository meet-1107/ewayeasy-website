import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
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
              Sales registers come in different formats, purchase data has to be matched against GSTR-2B, and a
              dispatching client may send rows for bulk e-way bill upload with missing PINs or old invoice dates.
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
            <p>All of these run in your browser. Use them for any client, as often as you need.</p>
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

      <section className="section" aria-labelledby="clients">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="clients" eyebrow="For your clients" title="Recommend E-Way Easy to clients who dispatch goods">
              <p>
                If a client makes sales invoices and moves goods regularly, the E-Way Easy Android app gives them one flow:
                Invoice → Review EWB → Generated.
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
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Reference guides to share" />
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
