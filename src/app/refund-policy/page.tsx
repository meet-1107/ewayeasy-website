import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';
import { PRICING } from '@/lib/pricing';

export const metadata = pageMeta({
  title: 'Refund Policy: Wallet Credits',
  description:
    'Purchased E-Way Easy credits are not refundable. If you paid but credits were not added, we add them or refund you. Failed actions return credits automatically.',
  path: '/refund-policy',
});

const LAST_UPDATED = '16 October 2026';

function Contact() {
  return SUPPORT_EMAIL ? (
    <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Payment made but credits not added')}`}>{SUPPORT_EMAIL}</a>
  ) : (
    <Link href="/contact">our contact page</Link>
  );
}

export default function RefundPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Refund policy"
        description={`How payments for ${SITE.name} wallet credits are handled.`}
        crumbs={[{ name: 'Refund policy', href: '/refund-policy' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ComplianceNote title="In short">
            <p><strong>Credits you have bought are not refundable.</strong></p>
            <p>
              <strong>If you paid but the credits were not added</strong> to your wallet, we will either add the credits or
              refund that payment.
            </p>
            <p>
              <strong>If an e-way bill action fails</strong> because the government portal rejects it, no credits are
              taken; the credits are returned to your wallet automatically.
            </p>
          </ComplianceNote>
          <p className="mt-6 text-sm text-ink-faint">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content mt-4">
            <p>
              This policy covers wallet credits bought in the {SITE.name} Android app. Read it together with our{' '}
              <Link href="/terms-and-conditions">Terms and Conditions</Link> and the <Link href="/pricing">pricing page</Link>.
            </p>

            <h2>1. Wallet credits</h2>
            <ul>
              <li>Credits are bought from the Wallet screen in the app. 1 credit = ₹{PRICING.rupeesPerCredit}.</li>
              <li>
                Each e-way bill action costs {PRICING.creditsPerEwayBill} credits: generating a new e-way bill, updating
                Part-B (vehicle), creating a consolidated e-way bill, cancelling an e-way bill or extending validity.
              </li>
              <li>
                <strong>Once credits have been added to your wallet, the purchase is final and is not refundable</strong>,
                whether the credits have been used or not.
              </li>
            </ul>

            <h2>2. Payment made but credits not added</h2>
            <p>
              Occasionally a payment is deducted but the credits do not appear in the wallet, usually because of a network or
              payment-gateway delay.
            </p>
            <ul>
              <li>Don&rsquo;t pay again straight away. Close and reopen the wallet after a few minutes.</li>
              <li>If the credits still do not appear, contact us with the payment details listed in section 5.</li>
              <li>
                After we confirm the payment with the payment provider, <strong>we will either add the credits to your wallet
                or refund the amount</strong> to the original payment method.
              </li>
            </ul>
            <p>
              The same applies if you were charged more than once for one purchase and the credits for the extra charge were
              not added.
            </p>

            <h2>3. Failed e-way bill actions</h2>
            <p>
              Credits are taken only when an action succeeds. If the government e-way bill portal rejects a generation,
              Part-B update, consolidation, cancellation or extension, the credits are refunded to your wallet automatically.
              This is a credit to your wallet, not a cash refund.
            </p>
            <p>
              Before you try again, check your e-way bill list in the app or the official portal so that you don&rsquo;t
              create a duplicate. If credits were taken for an action that did not go through, contact us with the invoice
              number and a screenshot and we will check it.
            </p>
            <p>
              An action that succeeds is not refunded because of details entered incorrectly. To fix mistakes, see the{' '}
              <Link href="/eway-bill-cancellation">cancellation</Link> and <Link href="/eway-bill-correction">correction</Link>{' '}
              guides.
            </p>

            <h2>4. Purchases made through Google Play</h2>
            <p>
              If you paid through Google Play billing, the payment is processed by Google, and some requests may need to be
              made to Google directly under Google Play&rsquo;s policies. We will help where we can.
            </p>

            <h2>5. How to contact us about a payment</h2>
            <p>Email <Contact /> with:</p>
            <ul>
              <li>your business name and the GSTIN shown in the app;</li>
              <li>the date, amount and payment reference (or Google Play order number);</li>
              <li>a screenshot of the payment confirmation and the wallet screen;</li>
              <li>the invoice number, if your question is about an e-way bill action.</li>
            </ul>
            <p>Never send us your GST portal or e-way bill portal password, or any OTP. We will never ask for them.</p>

            <h2>6. Changes to this policy</h2>
            <p>
              We may update this policy. The &ldquo;Last updated&rdquo; date shows the latest version.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
