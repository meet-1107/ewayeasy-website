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
  title: 'E-Way Bill App for Wholesalers & Distributors',
  description:
    'Many small dispatches to the same buyers? Save buyers and products once in E-Way Easy and make each invoice and e-way bill review quickly on your Android phone.',
  path: '/solutions/wholesalers-distributors',
});

const FAQ: Faq[] = [
  {
    q: 'Can I save my regular buyers in the app?',
    a: 'Yes. E-Way Easy keeps a saved buyers list. You can also enter a new buyer’s GSTIN and the name, address, state and PIN fill in automatically. For an unregistered buyer, leave the GSTIN empty and type the details.',
  },
  {
    q: 'How do I add products with different GST rates to one invoice?',
    a: 'Pick products from your saved products list using search while creating the invoice. If you want to check the tax maths for a mixed-rate order separately, the free multi-item GST calculator on this website shows a rate-wise summary.',
  },
  {
    q: 'Does every small dispatch need an e-way bill?',
    a: 'Not always. An e-way bill is generally needed where the consignment value exceeds ₹50,000, and some states have notified different limits for movement within the state. Check the e-way bill rules and your state’s notification before deciding.',
  },
  {
    q: 'Can my staff and I use the same account from different phones?',
    a: 'Multi-user or team accounts are not an app feature today. The app is set up for one business on a phone.',
  },
  {
    q: 'Will the invoice numbers stay in my own series?',
    a: 'Yes. You set an invoice pre-series and the app numbers invoices in your own series automatically. To plan a series or check an old list for gaps, use the free invoice number generator.',
  },
];

export default function WholesalersPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Solutions · Wholesalers & distributors"
        title="E-way bills for wholesalers and distributors"
        description="Lots of small orders, mostly to the same shops and dealers. E-Way Easy remembers your buyers and products so each dispatch takes fewer taps."
        crumbs={[
          { name: 'Solutions', href: '/solutions' },
          { name: 'Wholesalers & distributors', href: '/solutions/wholesalers-distributors' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-amber">Get the Android app</Link>
          <a href="#free-tools" className="btn-ghost-dark">Free tools for traders</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="problem">
        <div className="container">
          <SectionIntro id="problem" eyebrow="The daily problem" title="Same buyers, same products, typed again and again">
            <p>
              A distributor’s day is many dispatches rather than a few big ones. The details barely change from one order to
              the next, yet they often get typed from scratch each time.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'Repeat buyers, repeat typing',
                text: 'The same dealer’s GSTIN, address and PIN are entered for every order, and one wrong digit means a wrong document.',
              },
              {
                title: 'Mixed products on each order',
                text: 'Orders combine items with different HSN codes and GST rates, which makes the invoice slow to prepare by hand.',
              },
              {
                title: 'Invoice numbers going out of order',
                text: 'With many invoices a day, gaps and duplicate numbers are easy to create and tedious to fix later.',
              },
              {
                title: 'Not every order needs an e-way bill',
                text: 'Smaller orders may fall below the threshold, so you need to know when an e-way bill is actually required.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="workflow">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="workflow" eyebrow="How the app helps" title="Save once, pick every time">
              <p>What the E-Way Easy Android app does for a high-frequency, repeat-buyer business:</p>
            </SectionIntro>
            <WorkflowMap
              rows={[
                {
                  need: 'Saved buyers',
                  app: 'Pick regular buyers from your saved list. New buyer? Enter the GSTIN and the name, address, state and PIN fill automatically.',
                },
                {
                  need: 'Saved products with search',
                  app: 'Search your saved products while building the invoice. The HSN code fills from the product and stays editable.',
                },
                {
                  need: 'Your own invoice series',
                  app: 'Set an invoice pre-series once and invoices are numbered in your series automatically.',
                },
                {
                  need: 'Invoice and e-way bill in one flow',
                  app: 'Invoice → Review EWB → Generated. Preview the sales invoice before saving, then check the e-way bill details, including distance calculated from PIN codes, on one review screen.',
                },
                {
                  need: 'Keep an eye on the numbers',
                  app: 'The dashboard shows total sales for the financial year, invoice and e-way bill counts and recent activity. Usage runs on wallet credits.',
                },
              ]}
            />
            <p className="mt-6 text-sm text-ink-soft">
              New to the app? <Link href="/how-it-works" className={linkClass}>See how E-Way Easy works</Link> or
              read the <Link href="/features" className={linkClass}>full feature list</Link>.
            </p>
          </div>
          <div className="mx-auto">
            <Phone
              screen="invoice"
              width={250}
              alt="E-Way Easy new invoice screen with buyer GSTIN entered and name, address, state and PIN filled automatically (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section id="free-tools" className="section scroll-mt-20" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free on this website" title="Free tools for wholesalers and distributors" />
          <ToolCards
            items={[
              {
                slug: 'multi-item-gst-calculator',
                why: 'Work out tax for an order with several products at different GST rates, with a rate-wise summary and grand total.',
              },
              {
                slug: 'gstin-validator',
                why: 'Check a new buyer’s GSTIN format and check digit, one at a time or as a list, before you bill them.',
              },
              {
                slug: 'invoice-number-generator',
                why: 'Plan an invoice number series by financial year and check an existing list for duplicates and gaps.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Guides for traders" />
          <ReadingList
            items={[
              {
                href: '/blog/eway-bills-for-wholesalers-and-distributors',
                label: 'E-way bills for wholesalers and distributors',
                text: 'A practical look at e-way bills for frequent, smaller dispatches.',
              },
              {
                href: '/eway-bill-rules',
                label: 'E-way bill rules explained',
                text: 'Threshold, who generates, validity and the cases where an e-way bill is not needed.',
              },
              {
                href: '/eway-bill-vs-sales-invoice',
                label: 'E-way bill vs sales invoice',
                text: 'Why you need both, and how the details in each must match.',
              },
              {
                href: '/eway-bill-common-errors',
                label: 'Common e-way bill errors',
                text: 'The mistakes that cause rejections and how to avoid them.',
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
              E-Way Easy is not a government portal and is not affiliated with GSTN or NIC. Bulk e-way bill generation and
              multi-user accounts are not app features today.
            </p>
            <p>
              Thresholds and rules can change. Verify the current position on the{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>official e-way bill portal</a>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="solutions-wholesalers"
          title="Stop retyping the same buyer details"
          text="Save your buyers and products once in E-Way Easy, then pick them for every invoice and e-way bill review."
        />
      </div>
    </>
  );
}
