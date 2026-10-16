import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import {
  SectionIntro, ProblemGrid, WorkflowMap, ToolCards, ReadingList, FaqList, linkClass, type Faq,
} from '@/components/solutions/SolutionBlocks';
import { pageMeta, faqLd } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Way Bill App for Manufacturers | Invoice + EWB on Phone',
  description:
    'For factories that dispatch daily: make the sales invoice, review e-way bill details with HSN and PIN-code distance, and keep the truck moving. Free tools included.',
  path: '/solutions/manufacturers',
});

const FAQ: Faq[] = [
  {
    q: 'Can E-Way Easy generate many e-way bills at once for our factory?',
    a: 'No. Bulk e-way bill generation is not an app feature. The app works one invoice at a time in a three-step flow. For large volumes, the official portal offers a bulk upload facility, and our free bulk e-way bill data checker helps you clean the data before you upload it there.',
  },
  {
    q: 'Do we still need to make a separate sales invoice?',
    a: 'Not in the app. The sales invoice is created as the first step of the same flow, with a preview before saving, and its details carry forward to the e-way bill review screen.',
  },
  {
    q: 'Where does the HSN code come from?',
    a: 'You save the HSN code with each product once. When you pick that product on an invoice, the HSN fills in automatically, and you can still edit it if a particular dispatch needs a change.',
  },
  {
    q: 'What if the calculated distance does not match our actual route?',
    a: 'The app calculates distance from the dispatch and delivery PIN codes, and you can edit it. Keep the entry within the limits allowed under the e-way bill rules; our distance rules guide explains them.',
  },
  {
    q: 'We send material to a job worker. Does the app handle delivery challans?',
    a: 'The app flow is built around the sales invoice. For job work movements, use the free delivery challan generator on this website and read our job work e-way bill guide to check whether an e-way bill is needed.',
  },
];

export default function ManufacturersPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Solutions · Manufacturers"
        title="E-way bills for manufacturers who dispatch every day"
        description="When the truck is loaded and waiting, you need the invoice and e-way bill details right the first time. E-Way Easy puts both in one flow on your Android phone."
        crumbs={[
          { name: 'Solutions', href: '/solutions' },
          { name: 'Manufacturers', href: '/solutions/manufacturers' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-amber">Get the Android app</Link>
          <a href="#free-tools" className="btn-ghost-dark">Free tools for factories</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="problem">
        <div className="container">
          <SectionIntro id="problem" eyebrow="The daily problem" title="Dispatch day at a factory">
            <p>
              Whether you make pipes, tiles, ceramics, packaging, chemicals or textiles, the dispatch desk faces the same
              pressure: goods are ready, the driver is waiting and the paperwork is the last thing holding the gate.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'The truck is waiting',
                text: 'Goods cannot leave without the invoice and a valid e-way bill where one is required. Every minute at the gate is a minute the vehicle is not on the road.',
              },
              {
                title: 'Invoice and e-way bill done separately',
                text: 'The invoice is made in one place and the same buyer, value and HSN details are typed again for the e-way bill. Typing twice is where mismatches creep in.',
              },
              {
                title: 'HSN lookups for every product',
                text: 'With a wide product range, someone has to look up or remember the HSN code for each item on every dispatch.',
              },
              {
                title: 'Working out the distance',
                text: 'The approximate distance has to be entered for e-way bill validity. Guessing it, or checking a map each time, slows things down.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="workflow">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="workflow" eyebrow="How the app helps" title="One flow: Invoice → Review EWB → Generated">
              <p>Here is how each dispatch-day problem maps to what the E-Way Easy Android app actually does.</p>
            </SectionIntro>
            <WorkflowMap
              rows={[
                {
                  need: 'Your factory details, entered once',
                  app: 'Seller details are saved, so every invoice starts with your business name, GSTIN and address already in place.',
                },
                {
                  need: 'Buyer details without retyping',
                  app: 'Enter the buyer’s GSTIN and the name, address, state and PIN fill in automatically. Regular buyers can be picked from your saved buyers list.',
                },
                {
                  need: 'HSN that comes with the product',
                  app: 'Pick from your saved products with search. The HSN code fills from the product, and you can edit it manually when needed.',
                },
                {
                  need: 'Distance from PIN codes',
                  app: 'Distance is calculated automatically from the PIN codes and can be edited if your actual route differs.',
                },
                {
                  need: 'Invoice and e-way bill together',
                  app: 'The sales invoice is created in the same flow, in your own invoice number series, with a preview before saving. Then you review the e-way bill details on one screen before moving to generation.',
                },
                {
                  need: 'A view of the year',
                  app: 'The dashboard shows total sales for the financial year, invoice and e-way bill counts, and recent activity. There is also an Import PDF option and help inside the app.',
                },
              ]}
            />
            <p className="mt-6 text-sm text-ink-soft">
              Want the full walkthrough? <Link href="/how-it-works" className={linkClass}>See how E-Way Easy works step by step</Link> or
              browse <Link href="/features" className={linkClass}>all app features</Link>.
            </p>
          </div>
          <div className="mx-auto">
            <Phone
              screen="review"
              width={250}
              alt="E-Way Easy review e-way bill screen showing distance calculated from PIN codes, HSN from the product and vehicle details (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section id="free-tools" className="section scroll-mt-20" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free on this website" title="Free tools for the dispatch desk">
            <p>These run in your browser and are free to use, with or without the app.</p>
          </SectionIntro>
          <ToolCards
            items={[
              {
                slug: 'bulk-eway-bill-data-checker',
                why: 'Uploading many e-way bills on the official portal? Check your dispatch data for common errors before you prepare the upload.',
              },
              {
                slug: 'invoice-vs-eway-bill-checker',
                why: 'Compare invoice details with e-way bill details to spot mismatches in GSTIN, value or HSN before goods move.',
              },
              {
                slug: 'delivery-challan-generator',
                why: 'Sending material to a job worker or moving goods without a sale? Make a delivery challan in your browser.',
              },
              {
                slug: 'distance-calculator',
                why: 'Enter the distance to see e-way bill validity days, expiry time, the extension window and the 10% distance allowance.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Guides for manufacturers" />
          <ReadingList
            items={[
              {
                href: '/eway-bill-generation',
                label: 'How to generate an e-way bill',
                text: 'Part A, Part B and the step-by-step process on the official system.',
              },
              {
                href: '/documents-required-for-eway-bill',
                label: 'Documents required for an e-way bill',
                text: 'What you need ready before the e-way bill, and what the driver should carry.',
              },
              {
                href: '/blog/eway-bill-rules-for-job-work',
                label: 'E-way bill rules for job work',
                text: 'When material sent to and from a job worker needs an e-way bill, and how the challan fits in.',
              },
              {
                href: '/bulk-eway-bill-generation',
                label: 'Bulk e-way bill generation on the portal',
                text: 'For high-volume days: how the portal’s bulk facility works.',
              },
            ]}
          />
        </div>
      </section>

      <section className="container py-12" aria-labelledby="limits">
        <div className="mx-auto max-w-3xl">
          <h2 id="limits" className="sr-only">What the app does not do</h2>
          <ComplianceNote title="Honest limits">
            <p>
              E-Way Easy is not a government portal and is not affiliated with GSTN or NIC. Bulk e-way bill generation,
              multi-user accounts, e-invoice (IRN) generation and an iPhone app are not app features today.
            </p>
            <p>
              Rules can change, so check the latest position on the{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>official e-way bill portal</a>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="solutions-manufacturers"
          title="Clear the dispatch desk faster"
          text="Save your products with HSN and your regular buyers once, then make the invoice and review e-way bill details from your phone."
        />
      </div>
    </>
  );
}
