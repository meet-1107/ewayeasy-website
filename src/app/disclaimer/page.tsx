import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { OFFICIAL_SOURCES, SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Disclaimer',
  description:
    'E-Way Easy is not a government portal. Our guides and tools are general information, not tax or legal advice. Always check official GST and e-way bill sources.',
  path: '/disclaimer',
});

const LAST_UPDATED = '15 October 2026';

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Disclaimer"
        description="Please read this before relying on our guides, tools or app descriptions."
        crumbs={[{ name: 'Disclaimer', href: '/disclaimer' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ComplianceNote title="In short">
            <p>
              {SITE.name} is not a government portal and is not affiliated with or endorsed by GSTN, NIC or any
              government body. Our content is general information, not professional tax or legal advice.
            </p>
          </ComplianceNote>
          <p className="mt-6 text-sm text-ink-faint">Last updated: {LAST_UPDATED}</p>

          <div className="prose-content mt-4">
            <h2>Not a government portal</h2>
            <p>
              {SITE.name} is an independent product. It is not the e-way bill portal or the GST portal, and it is not
              operated by, affiliated with or connected to the Goods and Services Tax Network (GSTN), the National
              Informatics Centre (NIC), the CBIC or any state or central government department.
            </p>

            <h2>No government endorsement</h2>
            <p>
              References to government portals, rules, forms and departments are made only to explain the law and point
              you to official sources. They do not mean that any government body endorses, approves or recommends{' '}
              {SITE.name}.
            </p>

            <h2>Government-system functionality</h2>
            <p>
              Any functionality in the {SITE.name} app that involves a government system, such as e-way bill generation,
              depends on the supported workflow and on authorised integrations. An e-way bill is valid only when it is
              generated on the official system, directly or through an authorised integration. Documents produced by the
              free tools on this website are drafts and calculations; they are not e-way bills and are not submitted to
              any government system.
            </p>

            <h2>Requirements vary</h2>
            <p>
              Whether an e-way bill is needed, and what it must contain, depends on the transaction, the goods, any
              applicable exemption, the relevant notifications and the state involved. Some states set different limits
              for movement within the state. Rules and portal processes also change over time. Our articles show a
              &ldquo;last verified&rdquo; date, but we cannot guarantee that every page reflects the latest position on the
              day you read it.
            </p>

            <h2>Not professional advice</h2>
            <p>
              Nothing on this website, in our tools or in the app is tax, legal, accounting or other professional advice.
              Worked examples are illustrative only and use made-up businesses. For decisions about your business, check
              the official guidance and consult a qualified professional such as a chartered accountant or tax adviser.
            </p>

            <h2>Check official sources</h2>
            <p>Always confirm the current requirements on official sources, including:</p>
            <ul>
              {OFFICIAL_SOURCES.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>

            <h2>Accuracy of tools</h2>
            <p>
              Calculators, distance estimates, HSN lookups and eligibility checks are provided as aids. Verify every
              figure before using it in an invoice, return or e-way bill. You remain responsible for your own compliance.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, {SITE.name} is not responsible for any loss, penalty, interest or detention
              of goods arising from reliance on this website, its tools or its content. See our{' '}
              <Link href="/terms-and-conditions">Terms and Conditions</Link> for full details.
            </p>

            <h2>Questions or corrections</h2>
            <p>
              If you find something inaccurate, please let us know
              {SUPPORT_EMAIL ? (
                <>
                  {' '}at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                </>
              ) : (
                <> through the <Link href="/contact">contact page</Link></>
              )}
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
