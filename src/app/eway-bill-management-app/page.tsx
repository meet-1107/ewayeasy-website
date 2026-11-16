import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import PlayBadge from '@/components/PlayBadge';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone, FloatCard } from '@/components/AppGraphics';
import { SectionIntro, ProblemGrid, ReadingList, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { ActionCard, StepList, CheckList, ICON_STROKE as S } from '@/components/feature-pages/FeatureBlocks';
import DataTable from '@/components/DataTable';
import { pageMeta, faqLd, softwareAppLd } from '@/lib/seo';
import { PRICING } from '@/lib/pricing';

const PATH = '/eway-bill-management-app';
const DESCRIPTION =
  'Update Part B and vehicle number, extend validity, cancel, make a consolidated e-way bill and share the PDF on WhatsApp from your phone. 5 credits per action.';

export const metadata = pageMeta({
  title: 'E-Way Bill Management App: Part B, Extend, Cancel, Share',
  description: DESCRIPTION,
  path: PATH,
});

const CREDITS = PRICING.creditsPerEwayBill ?? 5;

const FAQ: Faq[] = [
  {
    q: 'Can I update the vehicle number in an e-way bill from my phone?',
    a: `Yes. In E-Way Easy you open the e-way bill, update Part B with the new vehicle number (and transporter if needed) and submit. It costs ${CREDITS} credits, taken only if the update succeeds. Part B can be updated within the e-way bill’s validity; our guide on updating vehicle details explains when and why.`,
  },
  {
    q: 'Do I need to log in to the e-way bill portal for these actions?',
    a: 'No. Once your e-way bill system API login is connected during the one-time setup in the app, updates, extensions, cancellations and consolidated e-way bills are filed through it on the official system. You do not need a computer for them.',
  },
  {
    q: 'How do I make a consolidated e-way bill in the app?',
    a: `When several consignments travel in one vehicle, choose the e-way bills travelling together and enter the vehicle details to create one consolidated e-way bill. It costs ${CREDITS} credits on success. Each consignment still needs its own valid e-way bill.`,
  },
  {
    q: 'What happens to my credits if the portal rejects an action?',
    a: 'Credits are taken only when an action succeeds. If the portal rejects a Part B update, extension, cancellation or consolidated e-way bill, the credits are refunded to your wallet automatically.',
  },
  {
    q: 'Can I cancel an e-way bill after 24 hours?',
    a: 'No. The portal allows cancellation only within 24 hours of generation, and not at all once the e-way bill has been verified in transit. After that window, read our guide on correcting a wrong e-way bill for the options that remain.',
  },
  {
    q: 'How many times can I extend an e-way bill?',
    a: 'Each extension must be requested within 8 hours before or after the current expiry, for a genuine reason such as an accident or trans-shipment delay. From 1 January 2025, the total life of an e-way bill is capped at 360 days from its original generation date. Check the official portal for the current rule.',
  },
];

const WHICH_ACTION = [
  {
    label: 'Truck broke down, or goods moved to another vehicle',
    cells: ['Update Part B with the new vehicle', 'Any number of times while the e-way bill is valid, before goods move in the new vehicle'],
  },
  {
    label: 'Accident, natural calamity, law-and-order problem or trans-shipment delay',
    cells: ['Extend validity', 'Only within 8 hours before or after expiry; total life capped at 360 days from generation'],
  },
  {
    label: 'Goods never left, or Part A has a wrong GSTIN, value or HSN',
    cells: ['Cancel, then generate a fresh e-way bill', 'Within 24 hours of generation, and only if not verified in transit'],
  },
  {
    label: 'Several consignments travelling in one vehicle',
    cells: ['Make a consolidated e-way bill', 'Each consignment needs its own valid e-way bill first'],
  },
  {
    label: 'Driver or buyer needs a copy',
    cells: ['Download and share the PDF', 'Any time; no credits used'],
  },
];

const ACTIONS = [
  {
    title: 'Update Part B: vehicle and transporter',
    text: 'Vehicle changed, broke down or goods were trans-shipped? Enter the new vehicle number and update the transporter on the same e-way bill.',
    credits: CREDITS,
    guide: { href: '/blog/how-to-update-vehicle-details-in-eway-bill', label: 'When and how vehicle details can be updated' },
    icon: (
      <g {...S}>
        <path d="M2 7h11v9H2zM13 10h4.5L21 13.5V16h-8" />
        <circle cx="6" cy="18" r="1.8" />
        <circle cx="17" cy="18" r="1.8" />
      </g>
    ),
  },
  {
    title: 'Extend validity',
    text: 'If goods cannot reach in time for a genuine reason, request an extension from the app within the window the rules allow.',
    credits: CREDITS,
    guide: { href: '/eway-bill-validity', label: 'Validity and extension rules' },
    icon: (
      <g {...S}>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2.5 2.5M9 2h6" />
      </g>
    ),
  },
  {
    title: 'Cancel an e-way bill',
    text: 'Goods did not move, or Part A had a mistake? Cancel from the app and, if needed, generate a fresh e-way bill.',
    credits: CREDITS,
    guide: { href: '/eway-bill-cancellation', label: 'Cancellation time limit and conditions' },
    icon: (
      <g {...S}>
        <circle cx="12" cy="12" r="9" />
        <path d="m9 9 6 6M15 9l-6 6" />
      </g>
    ),
  },
  {
    title: 'Consolidated e-way bill',
    text: 'Several consignments going in one vehicle? Combine their e-way bills into one consolidated e-way bill for the trip.',
    credits: CREDITS,
    guide: { href: '/consolidated-eway-bill', label: 'How consolidated e-way bills work' },
    icon: (
      <g {...S}>
        <rect x="3" y="4" width="8" height="7" rx="1.5" />
        <rect x="13" y="4" width="8" height="7" rx="1.5" />
        <rect x="6" y="15" width="12" height="6" rx="1.5" />
        <path d="M7 11v2h10v-2M12 13v2" />
      </g>
    ),
  },
  {
    title: 'Download and share the PDF',
    text: 'Download the e-way bill PDF and send it to the driver or buyer on WhatsApp or email, or print it for the vehicle.',
    credits: null,
    icon: (
      <g {...S}>
        <path d="M12 3v12m-4-4 4 4 4-4" />
        <path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
      </g>
    ),
  },
];

const COUNTERS = [
  { label: 'E-way bills generated', value: '128' },
  { label: 'Part-B updates', value: '17' },
  { label: 'Consolidated', value: '9' },
  { label: 'Cancelled', value: '3' },
];

export default function EwayBillManagementAppPage() {
  return (
    <>
      <JsonLd data={[softwareAppLd(DESCRIPTION), faqLd(FAQ)]} />
      <PageHeader
        eyebrow="App feature · Manage e-way bills"
        title="An e-way bill management app for what happens after generation"
        description="Vehicles change, trips get delayed and loads get combined. E-Way Easy lets you update Part B, extend, cancel, consolidate and share e-way bills from your Android phone."
        crumbs={[
          { name: 'Features', href: '/features' },
          { name: 'E-way bill management', href: PATH },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PlayBadge placement="ewb-management-hero" />
          <a href="#actions" className="btn-ghost-dark">See all actions</a>
        </div>
      </PageHeader>

      <section id="actions" className="section scroll-mt-20" aria-labelledby="actions-heading">
        <div className="container">
          <SectionIntro id="actions-heading" eyebrow="In the app" title="Everything you can do with an e-way bill after it is generated">
            <p>
              Once generated, an e-way bill cannot be edited. What you can do is update Part B, extend validity, cancel it,
              or group it into a consolidated e-way bill. E-Way Easy files each action on the official e-way bill system
              for {CREDITS} credits (1 credit = ₹1), charged only when the portal accepts it.
            </p>
            <p>
              The time limits come from the e-way bill rules, not from the app. If an action falls outside them, the portal
              rejects it and your credits go back to your wallet.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIONS.map((a) => (
              <ActionCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="which-action">
        <div className="container">
          <SectionIntro id="which-action" eyebrow="Decision guide" title="Which action does your problem need?">
            <p>
              Pick the action by what went wrong, not by what feels fastest. A vehicle problem needs a Part B update, a
              delay needs an extension, and wrong Part A details need a cancellation and a fresh e-way bill. Several loads
              in one truck need a consolidated e-way bill, and each action has its own time window.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-4xl">
            <DataTable
              caption="Which e-way bill action to use for each situation"
              columns={['Situation', 'Action in the app', 'Time limit or condition']}
              rows={WHICH_ACTION}
            />
          </div>
          <ul className="mt-8 max-w-3xl space-y-3 text-ink-soft">
            <li>
              <strong className="text-ink">If only the vehicle is wrong, then never cancel.</strong> Update Part B and keep the
              same e-way bill number.
            </li>
            <li>
              <strong className="text-ink">If more than 24 hours have passed, then cancellation is closed.</strong> Read{' '}
              <Link href="/eway-bill-correction" className={linkClass}>correcting a wrong e-way bill</Link> before you do
              anything else.
            </li>
            <li>
              <strong className="text-ink">If the e-way bill expired more than 8 hours ago, then extension is closed.</strong>{' '}
              See <Link href="/blog/what-to-do-when-eway-bill-expires" className={linkClass}>what to do when an e-way bill
              expires</Link>.
            </li>
          </ul>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="where">
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="where" eyebrow="On the road" title="When the vehicle changes mid-way">
              <p>
                A Part B update puts a new vehicle number on a live e-way bill without changing the e-way bill number. Use
                it when a truck breaks down, goods move to another vehicle, or the load is trans-shipped. The update must
                happen before the goods move in the new vehicle, and only while the e-way bill is still valid.
              </p>
              <p>
                You do it from your phone, wherever you are, instead of finding a computer and logging in to the portal.
                Then share the updated e-way bill PDF with the new driver, so the paper in the cabin matches the truck.
              </p>
            </SectionIntro>
          </div>
          <div className="relative mx-auto">
            <Phone
              screen="generated"
              width={240}
              alt="E-Way Easy screen showing a generated e-way bill number with Print and Share PDF buttons (sample data)"
            />
            <FloatCard className="-left-10 bottom-16 hidden sm:block">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Part B updated</p>
              <p className="text-sm font-bold">GJ03 AB 1234 → GJ03 CD 5678</p>
            </FloatCard>
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="example">
        <div className="container">
          <SectionIntro id="example" eyebrow="Example (illustrative)" title="One delayed trip, three actions">
            <p>
              Example (illustrative): a Surat saree trader sends goods worth ₹2,40,000 to a retailer in Indore, about 450
              km away. At 1 day per 200 km or part of it, the e-way bill is valid for 3 days. Here is how the trip plays
              out when two things go wrong on the road.
            </p>
          </SectionIntro>
          <StepList
            steps={[
              {
                title: 'Morning: generate the e-way bill',
                text: `The trader generates the e-way bill with the first truck’s number in Part B. Cost: ${CREDITS} credits.`,
              },
              {
                title: 'Day 1, night: the truck breaks down',
                text: `The goods move to a second truck at a highway dhaba. Before it leaves, the trader updates Part B with the new vehicle number and sends the PDF to the new driver. Cost: ${CREDITS} credits.`,
              },
              {
                title: 'Day 3: a road blockade holds the truck',
                text: `The goods cannot reach before expiry. Within the 8-hour window around expiry, he requests an extension with the reason and the remaining distance. Cost: ${CREDITS} credits.`,
              },
              {
                title: 'Total for the trip',
                text: `${CREDITS * 3} credits (₹${CREDITS * 3}) for generation, one Part B update and one extension. A request the portal rejects would cost nothing.`,
              },
            ]}
          />
          <p className="mt-6 max-w-3xl text-sm text-ink-soft">
            Distances, values and timings are made up for illustration. Work out your own validity with the{' '}
            <Link href="/tools/distance-calculator" className={linkClass}>validity calculator</Link>.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="mistakes">
        <div className="container">
          <SectionIntro id="mistakes" eyebrow="Avoid these" title="Mistakes that cost you a valid e-way bill">
            <p>
              Most trouble after generation comes from using the wrong action or acting too late. The portal enforces its
              time windows strictly, and no app can reopen them. These are common mistakes dispatch desks and transporters
              make, with what to do instead.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'Cancelling when only the vehicle changed',
                text: 'You throw away a valid e-way bill and pay for a fresh one. A vehicle change needs a Part B update, not a cancellation.',
              },
              {
                title: 'Waiting for the e-way bill to expire',
                text: 'The extension window opens 8 hours before expiry and closes 8 hours after. Note the expiry time when a long trip starts, not when the driver calls.',
              },
              {
                title: 'Treating a consolidated e-way bill as a replacement',
                text: 'It groups e-way bills travelling in one vehicle. Every consignment inside it still needs its own valid e-way bill.',
              },
              {
                title: 'Extending without a genuine reason',
                text: 'Extensions are meant for exceptional delays such as accidents or trans-shipment. Keep a note of the reason in case an officer asks.',
              },
              {
                title: 'Trying to fix Part A some other way',
                text: 'GSTIN, value, HSN and invoice details cannot be edited after generation. Cancel within 24 hours and generate again.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="wallet">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionIntro id="wallet" eyebrow="Wallet" title="Every action, counted in your wallet">
            <p>
              The wallet keeps a running count of e-way bills generated, Part-B updates, consolidated e-way bills and
              cancellations. You can see where every credit went without keeping a separate register. Each action costs{' '}
              {CREDITS} credits, and a rejected action costs nothing because the credits return automatically.
            </p>
            <p>
              There is no yearly subscription. Buy credits when you need them and pay through Razorpay by UPI, card or net
              banking. Full details are on the <Link href="/pricing" className={linkClass}>pricing page</Link>.
            </p>
          </SectionIntro>
          <figure>
            <div
              role="img"
              aria-label="Illustration of wallet counters: e-way bills generated, Part-B updates, consolidated e-way bills and cancelled e-way bills (sample figures)"
              className="grid grid-cols-2 gap-4"
            >
              {COUNTERS.map((c) => (
                <div key={c.label} aria-hidden className="card p-5">
                  <p className="font-display text-3xl font-bold text-brand-700">{c.value}</p>
                  <p className="mt-1 text-sm text-ink-soft">{c.label}</p>
                </div>
              ))}
            </div>
            <figcaption className="mt-3 text-xs text-ink-faint">Sample figures for illustration.</figcaption>
          </figure>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="limits">
        <div className="mx-auto max-w-3xl">
          <h2 id="limits" className="font-display text-xl font-semibold text-ink">What the app does not do</h2>
          <p className="mt-3 text-ink-soft">
            E-Way Easy handles one e-way bill at a time on an Android phone. It is built for the everyday fixes a small
            dispatch desk needs, not for changing hundreds of e-way bills in one go. If that is your volume, the official
            portal or an ERP integration through a GSP is the better route.
          </p>
          <div className="mt-4">
            <ComplianceNote title="Honest limits">
              <p>
                E-Way Easy does not generate e-way bills in bulk, does not create e-invoices (IRN), has no multi-user team
                accounts and is available on Android only. The app follows the portal’s rules: an action outside the time
                limits, such as a late cancellation, will be rejected by the portal and your credits refunded.
              </p>
              <p>
                Accepting or rejecting e-way bills raised by your suppliers is not an app feature, so use the portal for
                that.
              </p>
              <p>
                E-Way Easy is independent and not affiliated with GSTN or NIC. Check current rules on the{' '}
                <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  official e-way bill portal
                </a>.
              </p>
            </ComplianceNote>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="checklist">
        <div className="container">
          <SectionIntro id="checklist" eyebrow="Checklist" title="Five checks before you tap Submit">
            <p>
              Every action on a live e-way bill is filed on the official system when you submit. A wrong vehicle number
              means another Part B update, and a wrong cancellation cannot be undone. Run through these five checks before
              you tap, especially when the driver is calling and you feel rushed.
            </p>
          </SectionIntro>
          <CheckList
            items={[
              { label: 'The right e-way bill', text: 'Match the e-way bill number and invoice number with the consignment the driver is talking about.' },
              { label: 'The time window', text: 'Cancel within 24 hours. Extend within 8 hours either side of expiry. Update Part B only while the bill is valid.' },
              { label: 'The vehicle number', text: 'Type it exactly as on the registration plate, with no extra spaces or a missing digit.' },
              { label: 'The reason', text: 'For an extension or cancellation, choose the reason that actually applies and keep a note of it.' },
              { label: 'The driver’s copy', text: 'Download the current PDF and share it on WhatsApp once the action succeeds.' },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="read-next">
        <div className="container">
          <SectionIntro id="read-next" eyebrow="Read next" title="More on generating and managing e-way bills">
            <p>
              These guides explain the rules behind each action in more detail. Read the validity guide before your next
              long trip, and the correction guide before you cancel anything. Rules can change by notification, so confirm
              the current position on the official portal.
            </p>
          </SectionIntro>
          <ReadingList
            items={[
              {
                href: '/invoice-pdf-to-eway-bill',
                label: 'Generate an e-way bill from an invoice PDF',
                text: 'Import a GST invoice PDF, review what the app reads and generate.',
              },
              {
                href: '/solutions/transporters',
                label: 'E-way bills for transporters',
                text: 'Part B updates en route, consolidated e-way bills and sharing PDFs with drivers.',
              },
              {
                href: '/eway-bill-correction',
                label: 'Correcting a wrong e-way bill',
                text: 'What can be changed after generation and what needs a fresh e-way bill.',
              },
              {
                href: '/features',
                label: 'All E-Way Easy features',
                text: 'Invoice creation, GSTIN auto-fill, HSN from products and more.',
              },
            ]}
          />
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="ewb-management-footer"
          title="Manage e-way bills from wherever you are"
          text="Update Part B, extend, cancel, consolidate and share e-way bills from your Android phone. Pay only for actions that succeed."
        />
      </div>
    </>
  );
}
