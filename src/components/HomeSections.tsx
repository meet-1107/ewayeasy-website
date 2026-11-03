import Link from 'next/link';
import { Milestone, RouteLine, Stamp, TruckArtBand } from './HighwayKit';
import { PRICING } from '@/lib/pricing';

const PER = PRICING.creditsPerEwayBill ?? 5;

/** Key numbers as highway km stones (used in the hero). */
export function HeroMilestones() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
      <Milestone top="Tap" value="1" label="Invoice to e-way bill in one flow" />
      <Milestone top="Per bill" value={`₹${PER * PRICING.rupeesPerCredit}`} label="Charged only when it succeeds" cap="#5ED3A6" />
      <Milestone top="Yearly" value="₹0" label="No yearly subscription" cap="#FF9F6B" />
      <Milestone top="Time" value="Secs" label="From invoice to e-way bill number" cap="#8FB8FF" />
    </div>
  );
}

const SIZES = [
  {
    tag: 'Small',
    title: 'Shops & traders',
    text: 'A few dispatches a week? Top up ₹50 and pay ₹5 only when you actually generate. Nothing to pay in a quiet month.',
    stone: '#F6B73C',
  },
  {
    tag: 'Medium',
    title: 'Factories & distributors',
    text: 'Daily dispatch. Saved buyers, products, transporters and vehicles cut typing; Part B, extend and cancel live on the same phone.',
    stone: '#5ED3A6',
  },
  {
    tag: 'Large',
    title: 'High-volume businesses',
    text: 'Same ₹5 per action at any volume, no licence to negotiate. Need bulk or team features? Tell us; we read every message.',
    stone: '#8FB8FF',
  },
];

/** "Built for India: small, medium and large" section. */
export function SizesSection() {
  return (
    <section className="section bg-cream" aria-labelledby="sizes-h">
      <div className="container">
        <Stamp>Built for India</Stamp>
        <h2 id="sizes-h" className="h2 mt-4 max-w-3xl">From one-person shops to large factories, one app and one simple price</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">Small, medium or enterprise: every business moving goods in India needs e-way bills. E-Way Easy works the same for all of them. You pay as you use.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {SIZES.map((s, i) => (
            <article key={s.tag} className="relative overflow-hidden rounded-[1.75rem] border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#16211C] transition hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 40 50" className="h-11 w-9" aria-hidden>
                  <path d="M3 50V20C3 9 10 3 20 3s17 6 17 17v30z" fill="#fff" stroke="#16211C" strokeWidth="2.5" />
                  <path d="M3 21C3 9 10 3 20 3s17 6 17 18z" fill={s.stone} stroke="#16211C" strokeWidth="2.5" />
                  <text x="20" y="39" textAnchor="middle" fontSize="12" fontWeight="800" fill="#16211C" fontFamily="Arial, sans-serif">{i + 1}</text>
                </svg>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-faint">{s.tag}</p>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-ink">{s.title}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Prepaid wallet: top up, pay ₹5 per success, refund on rejection. Animated ledger. */
export function WalletSection() {
  const rows = [
    { t: 'Added credits via UPI', v: '+250', tone: 'text-brand-700' },
    { t: 'E-way bill generated ✓', v: `−${PER}`, tone: 'text-ink' },
    { t: 'Part B updated ✓', v: `−${PER}`, tone: 'text-ink' },
    { t: 'Portal rejected, credits returned', v: `±0`, tone: 'text-amber-600' },
    { t: 'E-way bill generated ✓', v: `−${PER}`, tone: 'text-ink' },
  ];
  return (
    <section className="section bg-brand-950 text-white" aria-labelledby="wallet-h">
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Pay as you use</p>
          <h2 id="wallet-h" className="mt-3 font-display text-3xl font-bold md:text-4xl">Works like a prepaid wallet. Top up, then pay only for what works.</h2>
          <ul className="mt-6 space-y-3 text-brand-100/90">
            <li>• 1 credit = ₹1. Top up from 50 credits (₹50), or any amount you like.</li>
            <li>• Each e-way bill action costs {PER} credits: generate, Part B, consolidate, cancel or extend.</li>
            <li>• If the government portal rejects an action, the credits come straight back.</li>
            <li>• Pay by UPI, card or net banking (Razorpay). No yearly subscription.</li>
          </ul>
          <Link href="/pricing" className="btn-amber mt-8">See pricing →</Link>
        </div>
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-[1.75rem] border-2 border-white/15 bg-white p-5 text-ink shadow-lift">
            <div className="rounded-2xl bg-brand-800 p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Available credits</p>
              <p className="mt-1 font-display text-4xl font-extrabold"><span className="ee-count">235</span></p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
                {['UPI', 'Card', 'Net banking'].map((m) => <span key={m} className="rounded-full bg-white/15 px-2.5 py-1">{m}</span>)}
              </div>
            </div>
            <ol className="mt-4 space-y-2" aria-label="Example wallet activity (illustrative)">
              {rows.map((r, i) => (
                <li key={i} className="ee-ledger flex items-center justify-between rounded-xl bg-cream px-3 py-2.5 text-sm" style={{ animationDelay: `${i * 0.35}s` }}>
                  <span>{r.t}</span>
                  <span className={`font-display font-extrabold ${r.tone}`}>{r.v}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-center text-xs text-ink-faint">Illustrative wallet activity</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const HELPERS = [
  { name: 'PDF reader', does: 'Reads buyer, GSTIN, items, HSN codes and totals from your invoice PDF. You review, then generate.', href: '/invoice-pdf-to-eway-bill' },
  { name: 'GSTIN filler', does: 'Type the buyer’s GSTIN; name, address, state and PIN fill themselves.' },
  { name: 'HSN keeper', does: 'Remembers each product’s HSN code, so it comes with the product every time.' },
  { name: 'Distance finder', does: 'Works out road distance between PIN codes for Part A. Edit it if the route differs.' },
  { name: 'Checker', does: 'Checks details before filing, so fewer bills bounce back from the portal.' },
  { name: 'Refund guard', does: 'If the portal rejects an action, your credits go back to the wallet automatically.' },
];

/** The app's automatic helpers ("agents") — only things the app verifiably does. */
export function HelpersSection() {
  return (
    <section className="section" aria-labelledby="helpers-h">
      <div className="container">
        <div className="max-w-3xl">
          <Stamp tone="blue">Your helpers</Stamp>
          <h2 id="helpers-h" className="h2 mt-4">Six helpers inside the app do the slow, error-prone work for you</h2>
          <p className="mt-3 text-ink-soft">The big problem with e-way bills is not the form. It’s the typing, checking and re-doing. These helpers handle it so the truck leaves on time.</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELPERS.map((h, i) => (
            <li key={h.name} className="group relative rounded-[1.5rem] border border-brand-900/10 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-700 font-display text-lg font-extrabold text-white">{i + 1}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                  <span className="ee-pulse h-2 w-2 rounded-full bg-brand-500" /> working
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{h.name}</h3>
              <p className="mt-2 leading-7 text-ink-soft">{h.does}</p>
              {h.href && <Link href={h.href} className="mt-3 inline-block text-sm font-semibold text-brand-700 underline">How it works →</Link>}
            </li>
          ))}
        </ul>
        <RouteLine className="mt-10 h-8 w-full" />
      </div>
    </section>
  );
}

/** Invitation for CAs, consultants, transport agents and resellers. */
export function PartnerStrip() {
  return (
    <section className="section pb-0" aria-labelledby="partners-h">
      <div className="container">
        <div className="overflow-hidden rounded-[1.75rem] border-2 border-ink bg-amber-300 shadow-[6px_6px_0_#16211C]">
          <TruckArtBand />
          <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <h2 id="partners-h" className="font-display text-2xl font-extrabold text-ink md:text-3xl">CA, consultant or transport agent? Partner with us.</h2>
              <p className="mt-2 max-w-2xl leading-7 text-ink">Help the businesses you already serve move goods with fewer mistakes. Partner terms are shared when you apply.</p>
            </div>
            <Link href="/partners" className="btn-primary">Become a partner →</Link>
          </div>
          <TruckArtBand />
        </div>
      </div>
    </section>
  );
}
