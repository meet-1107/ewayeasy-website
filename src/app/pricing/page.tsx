import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { faqLd, pageMeta } from '@/lib/seo';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';
import { PRICING, formatPaise, pricesArePublished } from '@/lib/pricing';

export const metadata = pageMeta({
  title: 'Pricing: ₹5 per E-Way Bill, Pay-As-You-Go Credits',
  description:
    'E-Way Easy pricing: 1 credit = ₹1 and each e-way bill action costs 5 credits. Buy 50 to 1,000 credits in the app. Credits are taken only when the action succeeds.',
  path: '/pricing',
});

const perAction = PRICING.creditsPerEwayBill ?? 5;
const perActionRupees = perAction * PRICING.rupeesPerCredit;

const FAQ = [
  {
    q: 'How much does one e-way bill cost?',
    a: `Generating a new e-way bill costs ${perAction} credits, which is ₹${perActionRupees}, because 1 credit = ₹${PRICING.rupeesPerCredit}. Updating Part-B, a consolidated e-way bill, cancelling and extending validity also cost ${perAction} credits each.`,
  },
  {
    q: 'Am I charged if the e-way bill fails?',
    a: 'No. Credits are taken only when the action succeeds. If the government portal rejects it, the credits are refunded to your wallet automatically.',
  },
  {
    q: 'Do I have to buy a big pack?',
    a: 'No. You buy credits when you need them and use them per action. Packs start at 50 credits for ₹50, and you can also add any other amount from the wallet.',
  },
  {
    q: 'Can I get a refund for credits I bought?',
    a: 'Purchased credits are not refundable. If your payment went through but the credits were not added to your wallet, contact us and we will either add the credits or refund that payment. See the refund policy for details.',
  },
  {
    q: 'Can I pay from the website?',
    a: 'No. Credits are added only from inside the app, from the Wallet screen. This website does not take payments.',
  },
];

function SupportLink() {
  return SUPPORT_EMAIL ? (
    <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Wallet or payment issue')}`}>{SUPPORT_EMAIL}</a>
  ) : (
    <Link href="/contact">our contact page</Link>
  );
}

function ActionCosts() {
  return (
    <section aria-labelledby="costs-heading" className="card p-6 md:p-8">
      <p className="eyebrow">What each action costs</p>
      <h2 id="costs-heading" className="mt-2 font-display text-2xl font-bold text-ink">
        {perAction} credits (₹{perActionRupees}) per e-way bill action
      </h2>
      <ul className="mt-5 divide-y divide-brand-900/10">
        {PRICING.actionCosts.map((a) => (
          <li key={a.action} className="flex items-center justify-between gap-4 py-3.5">
            <span className="text-ink-soft">{a.action}</span>
            <span className="whitespace-nowrap font-display font-bold text-ink">
              {a.credits} credits <span className="font-sans text-sm font-normal text-ink-faint">· ₹{a.credits * PRICING.rupeesPerCredit}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex gap-2 rounded-2xl bg-brand-50 p-4 text-sm text-brand-800">
        <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0" aria-hidden><path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
        <span>{PRICING.notes[0]}</span>
      </p>
    </section>
  );
}

function Packs() {
  return (
    <section aria-labelledby="packs-heading">
      <p className="eyebrow">Buy credits in the app</p>
      <h2 id="packs-heading" className="mt-2 font-display text-2xl font-bold text-ink">Credit packs · 1 credit = ₹{PRICING.rupeesPerCredit}</h2>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRICING.creditPacks.map((p) => (
          <li key={p.name} className="card p-5 text-center">
            <p className="font-display text-3xl font-extrabold text-ink">{p.credits.toLocaleString('en-IN')}</p>
            <p className="text-sm text-ink-faint">credits</p>
            <p className="mt-2 font-display text-xl font-bold text-brand-700">{formatPaise(p.pricePaise)}</p>
            {p.note && <p className="mt-1 text-sm text-ink-soft">{p.note}</p>}
          </li>
        ))}
        {PRICING.customAmount && (
          <li className="card grid place-items-center p-5 text-center">
            <div>
              <p className="font-display text-xl font-bold text-ink">Other</p>
              <p className="mt-1 text-sm text-ink-soft">any number of credits</p>
            </div>
          </li>
        )}
      </ul>
      <p className="mt-4 text-sm text-ink-faint">
        Prices as shown in the app wallet. If the app ever shows a different price, the price in the app applies.
      </p>
    </section>
  );
}

export default function PricingPage() {
  const published = pricesArePublished();

  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Pricing"
        title={`₹${perActionRupees} per e-way bill. Pay only when it works.`}
        description={`${SITE.name} uses pay-as-you-go wallet credits: 1 credit = ₹${PRICING.rupeesPerCredit}, and each e-way bill action costs ${perAction} credits. Buy only what you need.`}
        crumbs={[{ name: 'Pricing', href: '/pricing' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-12">
          {published && (
            <>
              <ActionCosts />
              <Packs />
            </>
          )}

          <div className="prose-content">
            <h2>Example (illustrative)</h2>
            <p>
              A distributor dispatches about 60 consignments a month and changes the vehicle on 5 of them. That is 60 new
              e-way bills plus 5 Part-B updates = 65 actions × {perAction} credits = {65 * perAction} credits, or ₹
              {65 * perActionRupees}. A 250-credit pack plus a 100-credit pack (₹350) covers it, or add exactly 325 credits using
              &ldquo;Other amount&rdquo;. Credits for any action the portal rejects come back to the wallet.
            </p>

            <h2>How wallet credits work</h2>
            <ol>
              <li>
                <strong>Add credits from the app.</strong> Open the Wallet in {SITE.name}, pick a pack or enter any other
                amount, and tap <strong>Add credits</strong>.
              </li>
              <li>
                <strong>Credits are used per e-way bill action.</strong> Generating, updating Part-B, consolidating,
                cancelling and extending validity each use {perAction} credits.
              </li>
              <li>
                <strong>You pay only for actions that succeed.</strong> If the government portal rejects an action, its
                credits go back to your wallet automatically.
              </li>
              <li>
                <strong>Keep an eye on your balance.</strong> The wallet shows available credits, credits used and counts of
                e-way bills generated, Part-B updates, consolidated and cancelled. It warns you when the balance is low.
              </li>
            </ol>

            <h2>Free on this website</h2>
            <p>
              The <Link href="/tools">free tools</Link> on this website run in your browser and need no credits or sign-up:
              GST calculators, invoice and challan creators, GSTIN and bulk data checkers, and e-way bill validity tools.
              They help you prepare and check data; they do not generate e-way bills.
            </p>

            <h2>Before you buy</h2>
            <ul>
              <li>Add your business in the app and check the GSTIN shown on the dashboard.</li>
              <li>Make sure you have a stable internet connection when you generate.</li>
              <li>Check the amount on the payment screen before you pay.</li>
            </ul>

            <h2>Payment taken but credits not added?</h2>
            <p>
              Don&rsquo;t pay again straight away. Reopen the wallet after a few minutes. If the credits still aren&rsquo;t
              there, contact <SupportLink /> with the payment reference, amount, date and a screenshot. We will either add
              the credits to your wallet or refund that payment. Purchased credits themselves are not refundable; see the{' '}
              <Link href="/refund-policy">refund policy</Link>.
            </p>
          </div>

          <ComplianceNote title="Not a government service">
            <p>
              {SITE.name} is not a government portal and is not affiliated with GSTN or NIC. The e-way bill number is issued
              by the official e-way bill system. You remain responsible for the accuracy of your invoice and e-way bill
              details.
            </p>
          </ComplianceNote>

          <section aria-labelledby="pricing-faq">
            <h2 id="pricing-faq" className="h2">Frequently asked questions</h2>
            <div className="mt-5 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
              {FAQ.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}<span className="text-brand-500 transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <DownloadCTA
            placement="pricing"
            title={`Start from 50 credits for ₹50`}
            text={`Install E-Way Easy, add your business and top up your wallet. Each e-way bill action costs ${perAction} credits, charged only when it succeeds.`}
          />
        </div>
      </div>
    </>
  );
}
