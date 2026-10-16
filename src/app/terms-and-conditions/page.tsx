import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Terms and Conditions',
  description:
    'The terms for using the E-Way Easy website, its guides and free tools, including limits of liability and the fact that it is not a government portal.',
  path: '/terms-and-conditions',
});

const LAST_UPDATED = '15 October 2026';

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms and Conditions"
        description={`The terms that apply when you use the ${SITE.name} website and its free tools.`}
        crumbs={[{ name: 'Terms and Conditions', href: '/terms-and-conditions' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ComplianceNote title="Template">
            <p>Template — to be reviewed by the business&rsquo;s legal adviser before launch.</p>
          </ComplianceNote>
          <p className="mt-6 text-sm text-ink-faint">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content mt-4">
            <p>
              By using this website you agree to these terms. If you do not agree, please do not use the website. These
              terms cover the {SITE.name} marketing and information website, its articles, guides and free tools. Use of
              the {SITE.name} Android app is governed by the terms shown in the app and on its Google Play listing.
            </p>

            <h2>1. What this website is</h2>
            <p>
              This website explains e-way bill and GST invoicing topics, offers free browser-based tools, and provides
              information about the {SITE.name} app. {SITE.name} is <strong>not a government portal</strong> and is not
              affiliated with or endorsed by GSTN, NIC or any government body. Official services are available only on
              government portals such as{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">ewaybillgst.gov.in</a> and{' '}
              <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">gst.gov.in</a>.
            </p>

            <h2>2. Information only, not professional advice</h2>
            <p>
              Our content is general information written in good faith and checked against official sources at the time
              shown on each page. GST and e-way bill rules change, and requirements depend on the transaction, exemptions,
              notifications and the state involved. Nothing on this website is tax, legal or professional advice. Check
              the current official position or consult a qualified professional before acting. See our{' '}
              <Link href="/disclaimer">Disclaimer</Link>.
            </p>

            <h2>3. Free tools</h2>
            <ul>
              <li>The tools are provided free, &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, for convenience.</li>
              <li>
                Results (tax amounts, distances, eligibility indications, invoice layouts and similar) are estimates or
                drafts. You are responsible for checking them before using them in any invoice, return or e-way bill.
              </li>
              <li>
                Documents produced by the website tools are not e-way bills and are not generated on, or submitted to, any
                government system.
              </li>
              <li>
                Drafts are stored only in your browser. We cannot recover them if your browser data is cleared.
              </li>
            </ul>

            <h2>4. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>use the website for anything unlawful, including creating false or misleading tax documents;</li>
              <li>try to disrupt, overload or gain unauthorised access to the website or its hosting;</li>
              <li>scrape or copy content in bulk, or republish it as your own;</li>
              <li>suggest that {SITE.name} is a government service or is endorsed by one.</li>
            </ul>

            <h2>5. Intellectual property</h2>
            <p>
              The text, design, graphics and code of this website belong to {SITE.name} or its licensors. You may read,
              print and share links to pages for personal or internal business use. Quoting short extracts with a link
              back is fine. Other reuse needs our written permission. Government names and portal names are used only to
              describe and refer to official services.
            </p>

            <h2>6. The app and wallet credits</h2>
            <p>
              Descriptions of the app on this website are for information. Features may change. Use of the app, including
              its wallet credits and how any government-system functionality works, is governed by the terms shown in the app
              and on its store listing. Prices and refunds are explained on our <a href="/pricing">pricing page</a> and in the{' '}
              <a href="/refund-policy">refund policy</a>: purchased credits are not refundable, except that if a payment is
              made but the credits are not added, we add the credits or refund that payment.
            </p>

            <h2>7. Third-party links</h2>
            <p>
              We link to official portals, Google Play and other websites for convenience. We do not control them and are
              not responsible for their content, availability or policies.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the extent permitted by law, {SITE.name} is not liable for any loss arising from your use of, or reliance
              on, this website or its tools, including penalties, interest, detention of goods, lost profits or lost data.
              You remain responsible for your own compliance with GST and e-way bill law. Nothing in these terms limits
              liability that cannot be limited under applicable Indian law.
            </p>

            <h2>9. Privacy</h2>
            <p>
              How we handle information is explained in our <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2>10. Changes</h2>
            <p>
              We may update these terms from time to time. The &ldquo;Last updated&rdquo; date above shows the latest
              version. Continuing to use the website after a change means you accept the updated terms.
            </p>

            <h2>11. Governing law</h2>
            <p>
              These terms are governed by the laws of India. Courts in India will have jurisdiction over any dispute,
              subject to the place of jurisdiction to be confirmed by the business before launch.
            </p>

            <h2>12. Contact</h2>
            <p>
              Questions about these terms:{' '}
              {SUPPORT_EMAIL ? (
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              ) : (
                <>support email to be published at launch (see the <Link href="/contact">contact page</Link>)</>
              )}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
