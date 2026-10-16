import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import EligibilityChecker from '@/components/tools/EligibilityChecker';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Way Bill Eligibility Checker — Is an E-Way Bill Required?',
  description:
    'Answer a few questions to see whether an e-way bill is likely required: value threshold, inter-state job work, handicrafts, exempt goods and the Part B 50 km rule.',
  path: '/tools/eway-bill-eligibility-checker',
});

const faq: Faq[] = [
  {
    q: 'Is the ₹50,000 limit with or without GST?',
    a: 'With GST. Consignment value includes the taxable value and the tax charged, but excludes the value of exempt supplies billed on the same document.',
  },
  {
    q: 'When is an e-way bill required even below ₹50,000?',
    a: 'For inter-state movement of goods by a principal to a job worker, and for inter-state transport of specified handicraft goods by a person exempt from registration, an e-way bill is required irrespective of value.',
  },
  {
    q: 'Do all states use ₹50,000 for movement within the state?',
    a: 'No. Some states have notified a different (higher) threshold for intra-state movement. Check your state’s latest notification instead of assuming.',
  },
  {
    q: 'Is a stock transfer to my own branch covered?',
    a: 'Yes, it can be. Rule 138 covers movement for reasons other than supply too, so the value threshold applies to branch transfers, exhibitions and job work.',
  },
  {
    q: 'Can I rely on this result?',
    a: 'Treat it as a first check. Exemptions have conditions and the rules change. Verify on the official portal, CBIC GST or with your tax adviser.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="eway-bill-eligibility-checker"
      title="E-Way Bill Eligibility Checker"
      description="A quick, preliminary check of whether an e-way bill is likely required for your movement of goods — with the reasons and the exceptions to review."
      tool={<EligibilityChecker />}
      faq={faq}
      related={['distance-calculator', 'gst-calculator', 'sales-invoice-generator']}
      disclaimer={
        <p>
          This checker gives a preliminary indication based on the general position under Section 68 of the CGST Act and
          Rule 138 of the CGST Rules, 2017. It does not determine the legally correct treatment for your transaction and does
          not cover every exemption or state notification. Verify on the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a> and{' '}
          <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>. E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How the checker decides</h2>
      <ol>
        <li><strong>Exemptions first.</strong> Goods carried by non-motorised conveyance, or goods you confirm are in the Annexure to Rule 138(14), are shown as likely not required.</li>
        <li><strong>Required irrespective of value.</strong> Inter-state movement to a job worker, and inter-state transport of specified handicrafts by a person exempt from registration.</li>
        <li><strong>Value test.</strong> Otherwise, the consignment value is compared with ₹50,000. Above it, an e-way bill is likely required.</li>
        <li><strong>Unsure about exemption?</strong> If the result would otherwise be “required” and you are not sure the goods are exempt, it shows “Review needed”.</li>
      </ol>
      <h3>Example (illustrative)</h3>
      <p>
        A Ludhiana hosiery unit sends fabric worth ₹30,000 to a job worker in Himachal Pradesh. The value is below
        ₹50,000, but because this is inter-state movement to a job worker, an e-way bill is likely required. The same
        fabric sent to a job worker within Punjab would follow the value test (and any state threshold).
      </p>
      <h3>Part B and the 50 km rule</h3>
      <p>
        If goods move within the same state up to 50 km from the consignor&apos;s place to the transporter&apos;s place for further
        transport (or from the transporter to the consignee), Part B (vehicle details) is not required — Part A still is.
        More in <Link href="/eway-bill-distance-rules">e-way bill distance rules</Link> and{' '}
        <Link href="/eway-bill-rules">Rule 138 explained</Link>.
      </p>
    </ToolPageLayout>
  );
}
