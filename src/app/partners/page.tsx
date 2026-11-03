import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import PartnerForm from '@/components/PartnerForm';
import { Milestone, Stamp, TruckArtBand, RouteLine } from '@/components/HighwayKit';
import { SectionIntro, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { pageMeta, faqLd } from '@/lib/seo';
import { SUPPORT_EMAIL } from '@/lib/site';
import { PRICING } from '@/lib/pricing';

export const metadata = pageMeta({
  title: 'E-Way Bill App Partner Program for CAs, Agents & Dealers',
  description:
    'Become an E-Way Easy partner. CAs, GST practitioners, transport agents, software resellers and trade bodies can bring businesses to the app. Applying is free.',
  path: '/partners',
});

const CREDITS = PRICING.creditsPerEwayBill ?? 5;
const RUPEES_PER_ACTION = CREDITS * PRICING.rupeesPerCredit;

const WHO: { title: string; text: string }[] = [
  {
    title: 'CAs and tax consultants',
    text: 'You already guide clients on GST. Point the ones who dispatch goods to a simple way of making invoices and e-way bills themselves.',
  },
  {
    title: 'GST practitioners',
    text: 'Clients ask you what to use for e-way bills. Give them an answer that runs on the phone they already carry.',
  },
  {
    title: 'Transport agents and brokers',
    text: 'You see consignments held up for a missing or expired e-way bill. Help the traders and truck owners you work with get it right before loading.',
  },
  {
    title: 'Billing-software resellers',
    text: 'Add an Android e-way bill app to what you recommend to small traders and manufacturers in your area.',
  },
  {
    title: 'IT dealers and computer shops',
    text: 'Local businesses come to you for setup and support. E-Way Easy is one more useful thing you can help them start with.',
  },
  {
    title: 'Trade associations',
    text: 'Share a practical e-way bill option with your members, along with our free GST tools and plain-language guides.',
  },
];

const OFFER: { title: string; text: string }[] = [
  {
    title: `₹${RUPEES_PER_ACTION} per successful action`,
    text: `Each e-way bill action costs ${CREDITS} credits (1 credit = ₹${PRICING.rupeesPerCredit}): generate, update Part B, extend, cancel or consolidate.`,
  },
  {
    title: 'No yearly subscription',
    text: 'Your clients buy credits only when they need them, through Razorpay (UPI, cards, net banking).',
  },
  {
    title: 'Refunded if the portal rejects it',
    text: 'Credits are taken only when the action succeeds. If the portal rejects it, they go back to the wallet automatically.',
  },
  {
    title: 'Android app, mobile-first',
    text: 'Create the GST invoice, review the e-way bill details and tap Generate, all on the phone.',
  },
  {
    title: 'Import an invoice PDF',
    text: 'The app reads buyer, GSTIN, items, HSN codes and totals from the PDF. Your client reviews and corrects the details, then generates.',
  },
  {
    title: 'Manage bills after generation',
    text: 'Update Part B and the vehicle number, extend validity, cancel, make a consolidated e-way bill, and share the PDF on WhatsApp or email.',
  },
];

const STEPS: { n: string; title: string; label: string; text: string }[] = [
  {
    n: '1',
    title: 'Apply',
    label: 'Fill the short form below',
    text: 'Tell us who you are, your city and roughly how many businesses you work with. It takes a couple of minutes.',
  },
  {
    n: '2',
    title: 'Talk to us',
    label: 'We get in touch',
    text: 'We read every application and reply to talk through how you work, what your clients need and the partner terms.',
  },
  {
    n: '3',
    title: 'Onboard',
    label: 'Bring your clients on board',
    text: 'Your clients install the app, add their GSTIN and connect their own e-way bill portal API login once, guided in the app.',
  },
];

const FAQ: Faq[] = [
  {
    q: 'Is there a fee to become an E-Way Easy partner?',
    a: 'Applying is free. Fill the form on this page and we will share the partner terms directly with you.',
  },
  {
    q: 'Do partners earn a commission?',
    a: 'Partner terms, including any commission, are shared directly when you apply. We do not publish them on the website, and we do not promise any particular income.',
  },
  {
    q: 'Who can apply to be a partner?',
    a: 'CAs, tax consultants, GST practitioners, transport agents and brokers, billing-software resellers, IT dealers and trade associations who work with GST-registered businesses that move goods. If you do not fit these neatly, apply anyway and tell us how you work.',
  },
  {
    q: 'Can I manage my clients’ e-way bills from one partner account?',
    a: 'No. The app currently works per business, on that business’s own Android phone, with their own e-way bill portal API login. There is no multi-client dashboard or partner login in the app today.',
  },
  {
    q: 'What does the app cost my clients?',
    a: `Each e-way bill action costs ${CREDITS} credits, which is ₹${RUPEES_PER_ACTION}, and is charged only when the action succeeds. There is no yearly subscription; credits are bought as needed in the app wallet.`,
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />

      <PageHeader
        eyebrow="Partner program"
        title="Become an E-Way Easy partner"
        description="Work with businesses that move goods? Bring them a simple Android app for invoices and e-way bills, and partner with a small team from Gujarat."
        crumbs={[{ name: 'Partners', href: '/partners' }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <a href="#apply" className="btn-amber">Apply to partner</a>
          <a href="#how" className="btn-ghost-dark">How it works</a>
          <Stamp tone="green" className="bg-white/95">Partners welcome</Stamp>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="who">
        <div className="container">
          <SectionIntro id="who" eyebrow="Who can join" title="For people businesses already trust">
            <p>
              If traders, manufacturers, wholesalers or transporters come to you for GST help, software or advice, you are
              the kind of partner we are looking for.
            </p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHO.map((w) => (
              <li key={w.title} className="card p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{w.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            Only want the free GST checkers for your own client work? See{' '}
            <Link href="/solutions/accountants" className={linkClass}>tools for accountants</Link>.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="offer">
        <div className="container">
          <SectionIntro id="offer" eyebrow="What you can offer" title="What your clients get with E-Way Easy">
            <p>Everything here is what the app does today. We would rather you promise less and your clients find more.</p>
          </SectionIntro>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFER.map((o) => (
              <li key={o.title} className="rounded-3xl border border-brand-900/10 bg-brand-50/40 p-6">
                <h3 className="font-display text-lg font-semibold text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{o.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-soft">
            Full details on <Link href="/pricing" className={linkClass}>pricing</Link> and{' '}
            <Link href="/features" className={linkClass}>features</Link>.
          </p>
        </div>
      </section>

      <section id="how" className="section scroll-mt-20" aria-labelledby="how-title">
        <div className="container">
          <SectionIntro id="how-title" eyebrow="How it works" title="Three stops on the road" />
          <RouteLine className="mx-auto mt-8 hidden h-10 w-full max-w-3xl md:block" />
          <ol className="mt-6 grid gap-10 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="flex flex-col items-center text-center">
                <Milestone top="Step" value={s.n} label={s.label} />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="terms">
        <div className="container">
          <div className="card mx-auto max-w-3xl p-8 md:p-10">
            <p className="eyebrow">What partners get</p>
            <h2 id="terms" className="h2 mt-2">Straight talk about partner terms</h2>
            <p className="mt-4 text-ink-soft">
              Partner terms, including any commission, are shared directly when you apply. We keep them off the website
              because they depend on how you work and who you work with, and we would rather explain them properly in a
              conversation than in a headline.
            </p>
            <p className="mt-4 text-ink-soft">
              What we can say now: you will deal with real people, we will be honest about what the app does and does not
              do, and we will listen to what your clients need.
            </p>
            <div className="mt-6">
              <ComplianceNote title="How the app works today">
                <p>
                  E-Way Easy works <strong>per business, on a phone</strong>. Each client uses it on their own Android device
                  with their own e-way bill portal API login. There is no partner dashboard or multi-client login in the app
                  at present. E-Way Easy is independent and not affiliated with GSTN, NIC or any government body.
                </p>
              </ComplianceNote>
            </div>
          </div>
        </div>
      </section>

      <TruckArtBand />

      <section id="apply" className="section scroll-mt-20" aria-labelledby="apply-title">
        <div className="container max-w-3xl">
          <p className="eyebrow">Apply</p>
          <h2 id="apply-title" className="h2 mt-2">Apply to become a partner</h2>
          <p className="mt-4 text-ink-soft">
            A few details are enough to start the conversation. We will reply by email to talk it through.
          </p>
          <div className="mt-8">
            <PartnerForm supportEmail={SUPPORT_EMAIL} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            Have a support question instead? Use the <Link href="/contact" className={linkClass}>contact page</Link>.
          </p>
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="partners"
          title="Try the app before you recommend it"
          text="Install E-Way Easy on your Android phone and see the invoice, review and generate flow for yourself."
        />
      </div>
    </>
  );
}
