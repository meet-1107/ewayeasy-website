import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import PlayBadge from '@/components/PlayBadge';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone, FloatCard } from '@/components/AppGraphics';
import { SectionIntro, ReadingList, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { ActionCard, ICON_STROKE as S, softwareAppLd } from '@/components/feature-pages/FeatureBlocks';
import { pageMeta, faqLd } from '@/lib/seo';
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
    q: 'Can I share the e-way bill PDF with the driver on WhatsApp?',
    a: 'Yes. Download the e-way bill PDF in the app and share it on WhatsApp or email, or print it. The wallet lists the actions that use credits: generate, Part-B update, consolidate, cancel and extend validity.',
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
      <JsonLd data={[softwareAppLd(PATH, DESCRIPTION), faqLd(FAQ)]} />
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
              Each action is filed on the official e-way bill system and costs {CREDITS} credits (1 credit = ₹1), charged
              only when it succeeds. The rules for each action, such as time limits, are in the linked guides.
            </p>
          </SectionIntro>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIONS.map((a) => (
              <ActionCard key={a.title} {...a} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="where">
        <div className="container grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="where" eyebrow="On the road" title="When the vehicle changes mid-way">
              <p>
                A truck breaks down outside the city and the goods move to another vehicle. The e-way bill stays the same,
                but Part B must show the new vehicle number before the goods move on. You do that from your phone, wherever
                you are, instead of finding a computer and logging in to the portal.
              </p>
              <p>
                For trips that cannot finish on time, the extension request is in the same place. Extensions are allowed
                only in a limited window around expiry, so read{' '}
                <Link href="/blog/what-to-do-when-eway-bill-expires" className={linkClass}>
                  what to do when an e-way bill expires
                </Link>{' '}
                before you need it.
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

      <section className="section" aria-labelledby="wallet">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionIntro id="wallet" eyebrow="Wallet" title="Every action, counted in your wallet">
            <p>
              The wallet keeps a running count of what you have done: e-way bills generated, Part-B updates, consolidated
              e-way bills and cancellations. You can see where your credits went without a separate register.
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
          <div className="mt-4">
            <ComplianceNote title="Honest limits">
              <p>
                E-Way Easy does not generate e-way bills in bulk, does not create e-invoices (IRN), has no multi-user team
                accounts and is available on Android only. The app follows the portal’s rules: an action outside the time
                limits, such as a late cancellation, will be rejected by the portal and your credits refunded.
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

      <section className="section pt-0" aria-labelledby="read-next">
        <div className="container">
          <SectionIntro id="read-next" eyebrow="Read next" title="More on generating and managing e-way bills" />
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
