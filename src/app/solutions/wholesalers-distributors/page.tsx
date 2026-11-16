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
import { PRICING } from '@/lib/pricing';
import PlayLink from '@/components/PlayLink';
import DataTable from '@/components/DataTable';
import { CheckList } from '@/components/feature-pages/FeatureBlocks';

const CREDITS = PRICING.creditsPerEwayBill ?? 5;

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
    q: 'Do I need a separate e-way bill for each shop on one delivery route?',
    a: 'Generally yes, for each invoice whose consignment value crosses the threshold. You can then group those e-way bills into one consolidated e-way bill for the vehicle. Invoices below the threshold usually need no e-way bill, but check your state’s rule.',
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
          <PlayLink placement="solutions_wholesalers" className="btn-amber">Get the Android app</PlayLink>
          <a href="#free-tools" className="btn-ghost-dark">Free tools for traders</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="problem">
        <div className="container">
          <SectionIntro id="problem" eyebrow="The daily problem" title="Same buyers, same products, typed again and again">
            <p>
              A distributor’s day is many small dispatches rather than a few big ones. The buyer, address, products and HSN
              codes barely change from one order to the next, yet they often get typed from scratch each time. Every retype
              is a fresh chance to get a GSTIN digit or a PIN wrong.
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
              <p>
                For a repeat-buyer business, the fix is to enter each buyer and product once and pick them after that.
                E-Way Easy keeps saved buyers and saved products, numbers invoices in your own series, and runs the invoice
                and e-way bill as one flow on your Android phone. Here is what each part does:
              </p>
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

      <section className="section" aria-labelledby="need-ewb">
        <div className="container">
          <SectionIntro id="need-ewb" eyebrow="Decision rules" title="Which orders on today’s route need an e-way bill?">
            <p>
              Judge each invoice on its own consignment value: taxable value plus GST, leaving out exempt goods on the same
              invoice. If it is more than ₹50,000, an e-way bill is generally needed. Some states set a different limit for
              movement within the state, so check your state’s notification.
            </p>
          </SectionIntro>
          <ul className="mt-8 max-w-3xl space-y-3 text-ink-soft">
            <li>
              <strong className="text-ink">If an invoice is above the threshold, then</strong> it needs its own e-way bill,
              even when it shares a van with smaller orders.
            </li>
            <li>
              <strong className="text-ink">If several such invoices travel in one vehicle, then</strong> you can group their
              e-way bills into one{' '}
              <Link href="/consolidated-eway-bill" className={linkClass}>consolidated e-way bill</Link> for the trip.
            </li>
            <li>
              <strong className="text-ink">If an invoice is below the threshold, then</strong> the invoice usually travels
              alone. Making and sharing invoices in the app is free.
            </li>
            <li>
              <strong className="text-ink">If you are tempted to split one order into smaller invoices, then</strong>{' '}
              don’t. Splitting to stay under the limit is the kind of pattern that draws questions on the road and in audits.
            </li>
          </ul>
          <p className="mt-6 max-w-3xl text-sm text-ink-soft">
            Unsure about a movement? Try the{' '}
            <Link href="/tools/eway-bill-eligibility-checker" className={linkClass}>e-way bill eligibility checker</Link>.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="example">
        <div className="container">
          <SectionIntro id="example" eyebrow="Example (illustrative)" title="One route van, six drops, the credit maths">
            <p>
              Example (illustrative): a Ludhiana hosiery distributor loads one van for six shops across the district. Four
              invoices are above ₹50,000 and two are below. The example assumes the ₹50,000 limit applies; your state’s
              limit for movement within the state may differ.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-3xl">
            <DataTable
              caption="Credits used for one route van with six drops (illustrative)"
              columns={['Item', 'What happens', 'Credits']}
              rows={[
                { label: '4 invoices above the limit', cells: ['4 e-way bills, picked from saved buyers and products', `${CREDITS * 4}`] },
                { label: '2 invoices below the limit', cells: ['Invoices saved and shared; no e-way bill', '0'] },
                { label: 'One vehicle for the trip', cells: ['1 consolidated e-way bill for the 4 e-way bills', `${CREDITS}`] },
                { label: 'Total', cells: ['', `${CREDITS * 5} credits (₹${CREDITS * 5})`] },
              ]}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">
            The business and values are made up. Any later action, such as a vehicle change, costs {CREDITS} credits each
            time it succeeds; see the{' '}
            <Link href="/eway-bill-management-app" className={linkClass}>e-way bill management features</Link>.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="mistakes">
        <div className="container">
          <SectionIntro id="mistakes" eyebrow="Avoid these" title="Mistakes distributors make with repeat orders">
            <p>
              Saved data saves time only while it is right. Most repeat-order mistakes come from a saved detail that went
              stale, or from shortcuts taken in the evening rush. Check these four before they copy themselves onto a whole
              month of invoices and e-way bills.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'A saved buyer who moved godown',
                text: 'The saved address and PIN are old, so distance and validity are wrong. Update the saved buyer, or set Ship To for that delivery.',
              },
              {
                title: 'A wrong HSN on a saved product',
                text: 'One wrong code repeats on every invoice that uses the product. Check new products with the HSN lookup before saving them.',
              },
              {
                title: 'Shop returns moving without papers',
                text: 'Goods coming back from a shop still need a proper document, and an e-way bill where the value and rules require it.',
              },
              {
                title: 'Typing numbers outside the series',
                text: 'Hand-made invoices on a busy day break the series. Let the app number invoices, and use one series per financial year.',
              },
            ]}
          />
          <p className="mt-6 max-w-3xl text-sm text-ink-soft">
            Returns and other special movements are covered in{' '}
            <Link href="/blog/eway-bill-returns-and-special-transactions" className={linkClass}>e-way bills for returns and
            special transactions</Link>.
          </p>
        </div>
      </section>

      <section id="free-tools" className="section scroll-mt-20 bg-white" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free on this website" title="Free tools for wholesalers and distributors">
            <p>
              These free browser tools handle the jobs that sit around a dispatch: tax for mixed-rate orders, checking a new
              buyer’s GSTIN, and keeping invoice numbers in order. Use them before you save a new buyer or product, so clean
              data goes into the app from the start.
            </p>
          </SectionIntro>
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

      <section className="section" aria-labelledby="dispatch-check">
        <div className="container">
          <SectionIntro id="dispatch-check" eyebrow="Checklist" title="Five checks before the van leaves">
            <p>
              A route van carries many documents, and one wrong paper can hold up every drop after it. Run these five checks
              once the van is loaded and before it leaves the godown. They take a few minutes and work whether you use the app,
              the portal or both.
            </p>
          </SectionIntro>
          <CheckList
            items={[
              { label: 'Each invoice judged alone', text: 'Every invoice above the threshold has its own e-way bill.' },
              { label: 'Ship To for changed addresses', text: 'Any shop receiving at a new godown has the right delivery PIN.' },
              { label: 'One vehicle number everywhere', text: 'Part B on every e-way bill shows the van actually loaded.' },
              { label: 'Consolidated e-way bill made', text: 'If you group them, the driver carries the consolidated e-way bill number.' },
              { label: 'Driver has every PDF', text: 'Invoices and e-way bills shared on WhatsApp, or printed, before departure.' },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Guides for traders">
            <p>
              These guides go deeper on the rules behind daily dispatch: when an e-way bill is needed, how it must match the
              invoice, and the errors that get it rejected. Start with the wholesalers article if you are setting up a new
              dispatch routine, then keep the rules guide handy.
            </p>
          </SectionIntro>
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
          <h2 id="limits" className="font-display text-xl font-semibold text-ink">When the app is not the right fit</h2>
          <p className="mt-3 text-ink-soft">
            E-Way Easy makes one invoice and e-way bill at a time, for one business, on an Android phone. If your billing
            team raises a hundred invoices a day from an ERP, or several staff need their own logins, the portal’s bulk
            upload or an ERP integration through a GSP will serve you better.
          </p>
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
