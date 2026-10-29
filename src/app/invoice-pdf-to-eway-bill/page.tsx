import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import PlayBadge from '@/components/PlayBadge';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import { SectionIntro, ProblemGrid, ReadingList, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { StepList, CheckList, softwareAppLd } from '@/components/feature-pages/FeatureBlocks';
import PdfExtractGraphic from '@/components/feature-pages/PdfExtractGraphic';
import { pageMeta, faqLd } from '@/lib/seo';
import { PRICING } from '@/lib/pricing';

const PATH = '/invoice-pdf-to-eway-bill';
const DESCRIPTION =
  'Upload a GST invoice PDF in the E-Way Easy Android app. It reads buyer, GSTIN, items, HSN codes and totals; you review them, then generate the e-way bill.';

export const metadata = pageMeta({
  title: 'Invoice PDF to E-Way Bill: Import, Review and Generate',
  description: DESCRIPTION,
  path: PATH,
});

const CREDITS = PRICING.creditsPerEwayBill ?? 5;

const FAQ: Faq[] = [
  {
    q: 'Can I generate an e-way bill directly from an invoice PDF?',
    a: 'Yes, in the E-Way Easy Android app. Use Import PDF, choose your GST invoice PDF, and the app reads the buyer, GSTIN, items, HSN codes and totals. You review and correct the details, add anything missing, then tap Generate. The e-way bill is filed on the official e-way bill system and the number is shown in the app.',
  },
  {
    q: 'Do I still need to check the details after importing the PDF?',
    a: 'Always. The imported data is a starting point, not a final answer. Check the buyer GSTIN, HSN codes, invoice value, PIN codes, Bill To / Ship To and Dispatch From before you generate. You are responsible for what is filed, and an e-way bill cannot be edited after generation.',
  },
  {
    q: 'Will it work with invoices made in Tally or other billing software?',
    a: 'That is the main use: you already have the invoice as a PDF from your billing software and do not want to type it again. Clear, computer-generated PDFs usually read best. Scanned copies, handwritten bills or unusual layouts may need more corrections during review.',
  },
  {
    q: 'What does it cost to generate an e-way bill from a PDF?',
    a: `Generating an e-way bill costs ${CREDITS} credits (1 credit = ₹1) from your wallet. Credits are taken only when the e-way bill is generated successfully; if the portal rejects it, the credits go back to your wallet automatically.`,
  },
  {
    q: 'Does the app read anything other than the PDF I choose?',
    a: 'No. It reads only the invoice PDF you select for import. It does not scan your phone, email or other files.',
  },
];

export default function InvoicePdfToEwayBillPage() {
  return (
    <>
      <JsonLd data={[softwareAppLd(PATH, DESCRIPTION), faqLd(FAQ)]} />
      <PageHeader
        eyebrow="App feature · Import PDF"
        title="Turn an invoice PDF into an e-way bill"
        description="Already made the GST invoice in Tally or another billing tool? Import the PDF in the E-Way Easy app, review the details it reads, and generate the e-way bill without typing the invoice again."
        crumbs={[
          { name: 'Features', href: '/features' },
          { name: 'Invoice PDF to e-way bill', href: PATH },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PlayBadge placement="pdf-to-ewb-hero" />
          <a href="#what-to-check" className="btn-ghost-dark">What to check before generating</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="what-happens">
        <div className="container">
          <SectionIntro id="what-happens" eyebrow="What happens" title="From PDF to e-way bill number in four steps">
            <p>
              Import PDF sits on the app dashboard. The app reads your invoice, puts the details on the e-way bill review
              screen and waits for you. Nothing is filed until you tap Generate.
            </p>
          </SectionIntro>
          <StepList
            steps={[
              {
                title: 'Upload the invoice PDF',
                text: 'Tap Import PDF on the dashboard and choose the GST invoice PDF you already have on your phone.',
              },
              {
                title: 'The app reads the invoice',
                text: 'It picks up the buyer, buyer GSTIN, items, HSN codes and invoice totals from the PDF.',
              },
              {
                title: 'You review and correct',
                text: 'Check every field, fix anything read wrongly and fill in anything the PDF did not contain, such as vehicle details.',
              },
              {
                title: 'Tap Generate',
                text: 'The e-way bill is filed on the official e-way bill system and the e-way bill number is shown in the app.',
              },
            ]}
          />
          <div className="mt-14">
            <PdfExtractGraphic />
          </div>
        </div>
      </section>

      <section id="what-to-check" className="section scroll-mt-20 bg-white" aria-labelledby="check">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="check" eyebrow="During review" title="What to check before you tap Generate">
              <p>
                An e-way bill cannot be edited once generated. If Part A is wrong, the usual fix is to{' '}
                <Link href="/eway-bill-cancellation" className={linkClass}>cancel it within 24 hours</Link> and generate a
                new one, so a minute of checking here saves real trouble later.
              </p>
            </SectionIntro>
            <CheckList
              items={[
                {
                  label: 'Buyer GSTIN',
                  text: 'One wrong character points the e-way bill at a different business. Match it with the buyer’s registration, not just the PDF.',
                },
                {
                  label: 'HSN codes',
                  text: (
                    <>
                      Confirm each item’s HSN code was read correctly. Not sure of a code? Use the{' '}
                      <Link href="/tools/hsn-code-lookup" className={linkClass}>free HSN code lookup</Link>.
                    </>
                  ),
                },
                {
                  label: 'Invoice value and tax',
                  text: 'Taxable value, GST and total should match the invoice exactly. Watch for rounding and discounts.',
                },
                {
                  label: 'PIN codes and distance',
                  text: (
                    <>
                      Distance is filled from the PIN codes, so a wrong PIN means a wrong distance and validity. See the{' '}
                      <Link href="/eway-bill-distance-rules" className={linkClass}>e-way bill distance rules</Link>.
                    </>
                  ),
                },
                {
                  label: 'Bill To / Ship To',
                  text: 'When goods go to a different place from the billing address, make sure the delivery address and PIN are the Ship To details.',
                },
                {
                  label: 'Dispatch From',
                  text: 'If goods leave from a godown or another unit rather than your registered address, set the Dispatch From location.',
                },
              ]}
            />
          </div>
          <div className="mx-auto">
            <Phone
              screen="review"
              width={250}
              alt="E-Way Easy review e-way bill screen with buyer, HSN, distance from PIN codes and vehicle details ready for checking (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="when">
        <div className="container">
          <SectionIntro id="when" eyebrow="When it helps" title="Made the invoice already? Don’t type it twice">
            <p>
              Import PDF is for businesses whose invoices come from a separate billing system. If you would rather make the
              invoice in the app itself, the regular{' '}
              <Link href="/how-it-works" className={linkClass}>Invoice → Review EWB → Generated flow</Link> does that.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'Invoices made in Tally or other billing software',
                text: 'Your accounts stay where they are. You only bring the finished invoice PDF into the app to raise the e-way bill.',
              },
              {
                title: 'Retyping is where mistakes start',
                text: 'Copying the GSTIN, HSN and value by hand from one screen to another is how mismatches between invoice and e-way bill happen.',
              },
              {
                title: 'Dispatch away from the desk',
                text: 'The invoice PDF reaches your phone on WhatsApp or email; you can raise the e-way bill from the godown or the gate.',
              },
              {
                title: 'Occasional e-way bills',
                text: `No subscription: you pay ${CREDITS} credits only for an e-way bill that is generated successfully.`,
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="after">
        <div className="container grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <div className="order-2 mx-auto lg:order-1">
            <Phone
              screen="generated"
              width={230}
              alt="E-Way Easy screen confirming the e-way bill was generated, with the e-way bill number and options to share the PDF (sample data)"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionIntro id="after" eyebrow="After generation" title="Your e-way bill, ready to share">
              <p>
                Once generated, the e-way bill number appears in the app. Download the e-way bill PDF and share it with the
                driver or buyer on WhatsApp or email, or print it.
              </p>
              <p>
                If the vehicle changes later, or you need to cancel or extend, those actions are in the app too. See the{' '}
                <Link href="/eway-bill-management-app" className={linkClass}>e-way bill management features</Link>.
              </p>
            </SectionIntro>
          </div>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="limits">
        <div className="mx-auto max-w-3xl">
          <h2 id="limits" className="font-display text-xl font-semibold text-ink">Honest limits of PDF import</h2>
          <div className="mt-4">
            <ComplianceNote title="Review is always required">
              <p>
                PDF import reads the invoice; it does not guarantee the reading is correct. You must review every field
                before generating.
              </p>
              <p>
                Scanned copies, photos of paper bills, handwritten invoices and unusual layouts may be read partly or
                need more corrections. The app reads only the PDF you choose. It does not create e-invoices (IRN) and does
                not generate e-way bills in bulk.
              </p>
              <p>
                E-Way Easy is independent and not affiliated with GSTN or NIC. For the rules themselves, refer to the{' '}
                <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  official e-way bill portal
                </a>.
              </p>
            </ComplianceNote>
          </div>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="read-next">
        <div className="container">
          <SectionIntro id="read-next" eyebrow="Read next" title="Related guides and tools" />
          <ReadingList
            items={[
              {
                href: '/eway-bill-vs-sales-invoice',
                label: 'E-way bill vs sales invoice',
                text: 'Which details must match between the two documents, and why.',
              },
              {
                href: '/tools/invoice-vs-eway-bill-checker',
                label: 'Invoice vs e-way bill checker',
                text: 'A free browser tool to compare invoice and e-way bill details for mismatches.',
              },
              {
                href: '/eway-bill-common-errors',
                label: 'Common e-way bill errors',
                text: 'GSTIN, HSN, value and PIN mistakes that get e-way bills rejected or questioned.',
              },
              {
                href: '/pricing',
                label: 'E-Way Easy pricing',
                text: 'Credit packs, what each action costs, and when credits are refunded.',
              },
            ]}
          />
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="pdf-to-ewb-footer"
          title="Bring your invoice PDF, leave the retyping"
          text="Import the invoice, review what the app reads, and generate the e-way bill from your Android phone."
        />
      </div>
    </>
  );
}
