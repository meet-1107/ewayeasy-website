import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How the E-Way Easy website handles your information: free tools run in your browser, invoice drafts stay on your device, and analytics loads only with your consent.',
  path: '/privacy-policy',
});

const LAST_UPDATED = '15 October 2026';

function Contact() {
  return SUPPORT_EMAIL ? (
    <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
  ) : (
    <>our support email (to be published at launch; see the <Link href="/contact">contact page</Link>)</>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How ${SITE.name} handles information when you use this website.`}
        crumbs={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ComplianceNote title="Template">
            <p>Template — to be reviewed by the business&rsquo;s legal adviser before launch.</p>
          </ComplianceNote>
          <p className="mt-6 text-sm text-ink-faint">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content mt-4">
            <p>
              This policy explains what information the {SITE.name} website collects, why, and the choices you have. It
              covers this marketing and information website, including its free tools. The {SITE.name} Android app has
              its own privacy policy, available through its Google Play listing and inside the app.
            </p>

            <h2>1. The short version</h2>
            <ul>
              <li>You can read our guides and use our free tools without creating an account.</li>
              <li>The free tools (calculators, invoice creator and similar) run in your browser. What you type is not sent to our servers.</li>
              <li>Invoice drafts you save on this website are kept in your browser&rsquo;s local storage, on your device only.</li>
              <li>Analytics (Google Analytics), if we enable it, loads only after you give consent.</li>
              <li>We do not sell your personal data.</li>
            </ul>

            <h2>2. Information we collect</h2>
            <h3>Information you type into the free tools</h3>
            <p>
              Our tools work inside your browser. Business names, GSTINs, buyer details, product lines and amounts you
              enter are processed on your device and are not uploaded to us. If you use the invoice tools, a draft may be
              saved in your browser&rsquo;s <code>localStorage</code> so it is still there when you return. You can delete
              it at any time by clearing the draft in the tool or clearing your browser&rsquo;s site data. Anyone with
              access to your device and browser profile may be able to see these drafts, so avoid saving them on a shared
              computer.
            </p>
            <h3>Analytics (only with consent)</h3>
            <p>
              If analytics is configured for this website, we use Google Analytics to understand which pages are useful
              and how visitors find us. It loads only after you accept analytics in the consent banner. It may collect
              information such as pages visited, approximate location, device and browser type, and referral source,
              using cookies or similar identifiers. If you decline, the analytics script is not loaded. Google processes
              this data under its own terms and privacy policy.
            </p>
            <h3>Your consent choice</h3>
            <p>
              We store your consent choice in your browser so we do not ask on every visit. Clearing your browser&rsquo;s
              site data resets it.
            </p>
            <h3>When you contact us</h3>
            <p>
              The contact form on this website does not send data to any server. It opens your own email app with your
              message filled in. When you email us, we receive what you choose to send, usually your name, email address,
              business name and message, and we use it only to reply and provide support.
            </p>
            <h3>Links to the Play Store and other websites</h3>
            <p>
              Download buttons take you to Google Play and may carry campaign parameters showing which part of our
              website you clicked from. Links to official government portals and other websites are governed by those
              websites&rsquo; own policies.
            </p>

            <h2>3. How we use information</h2>
            <ul>
              <li>To run and improve the website and its free tools.</li>
              <li>To understand, in aggregate, which content is helpful (only if you consented to analytics).</li>
              <li>To answer your questions and provide support.</li>
              <li>To meet legal obligations and protect the website against misuse.</li>
            </ul>

            <h2>4. Sharing</h2>
            <p>
              We do not sell or rent personal data. We share information only with service providers that help us run the
              website (such as hosting and, with your consent, analytics), when required by law or a valid order of a
              competent authority, or to protect our rights and users.
            </p>

            <h2>5. Retention</h2>
            <p>
              Data in your browser (drafts and your consent choice) stays until you delete it. Emails you send us are kept
              only as long as needed to handle your request and for reasonable record-keeping. Analytics data is retained
              according to the retention settings of the analytics service.
            </p>

            <h2>6. Security</h2>
            <p>
              The website is served over HTTPS. Because the free tools run in your browser, the data you type into them
              stays on your device. Please never send us your GST portal or e-way bill portal password or OTPs. We will
              never ask for them.
            </p>

            <h2>7. Your rights</h2>
            <p>
              Under the Digital Personal Data Protection Act, 2023 and other applicable Indian law, you may have rights
              to access a summary of your personal data, ask for correction or erasure, withdraw consent, nominate another
              person to exercise your rights, and raise a grievance. You can withdraw analytics consent at any time by
              clearing your browser&rsquo;s site data for this website and choosing again. To exercise any other right,
              contact us at <Contact />. If you are not satisfied with our response, you may approach the Data Protection
              Board of India once it accepts complaints in line with the law.
            </p>

            <h2>8. Children</h2>
            <p>
              This website is meant for businesses and professionals. It is not directed at children, and we do not
              knowingly collect personal data from children.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this policy when the website or the law changes. The &ldquo;Last updated&rdquo; date at the
              top shows when it was last revised.
            </p>

            <h2>10. Contact and grievances</h2>
            <p>
              For privacy questions or grievances, contact us at <Contact />. See also our{' '}
              <Link href="/terms-and-conditions">Terms and Conditions</Link> and{' '}
              <Link href="/disclaimer">Disclaimer</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
