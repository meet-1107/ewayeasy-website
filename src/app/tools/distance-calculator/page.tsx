import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import ValidityCalculator from '@/components/tools/ValidityCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Way Bill Validity & Distance Calculator (200 km/day Rule)',
  description:
    'Calculate e-way bill validity days and the exact expiry time from distance and generation time, for normal and over-dimensional cargo, with the 8-hour extension window.',
  path: '/tools/distance-calculator',
});

const faq: Faq[] = [
  {
    q: 'How many days is an e-way bill valid for 300 km?',
    a: '2 days for normal cargo, because validity is 1 day for every 200 km or part thereof, and 300 km falls in the 201–400 km band.',
  },
  {
    q: 'When does the first day end?',
    a: 'At midnight of the day following generation. An e-way bill generated at 10:15 am on 14 October with 1 day validity is valid till 11:59 pm on 15 October.',
  },
  {
    q: 'Does this tool calculate distance between PIN codes?',
    a: 'No. The website has no map service, so you enter the distance. The e-way bill portal auto-calculates PIN-to-PIN distance, and the E-Way Easy app also calculates distance from PIN codes.',
  },
  {
    q: 'How much more than the portal distance can I enter?',
    a: 'Up to 10% more than the auto-calculated PIN-to-PIN distance, subject to the 4,000 km maximum.',
  },
  {
    q: 'When can I extend the validity?',
    a: 'Within 8 hours before or 8 hours after expiry, when goods cannot reach in time due to exceptional circumstances. As reported by GSTN, from 1 January 2025 total extension is capped at 360 days from the original generation date.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="distance-calculator"
      title="E-Way Bill Validity & Distance Calculator"
      description="Enter the distance, cargo type and generation time to see validity days, the exact expiry and the extension window."
      tool={<ValidityCalculator />}
      faq={faq}
      related={['eway-bill-eligibility-checker', 'sales-invoice-generator', 'gst-calculator']}
      disclaimer={
        <p>
          This tool performs calculations only, based on Rule 138(10) of the CGST Rules as generally understood. The validity
          shown on the official e-way bill portal is final. It does not determine the legally correct treatment for your
          movement. Check the <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a> and{' '}
          <a className="underline" href="https://docs.ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">user documentation</a>. E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How validity is calculated</h2>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Cargo</th><th>Validity</th></tr></thead>
          <tbody>
            <tr><td>Normal cargo</td><td>1 day for every 200 km or part thereof</td></tr>
            <tr><td>Over-dimensional cargo (ODC)</td><td>1 day for every 20 km or part thereof</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Days = distance ÷ km per day, rounded up. The first day ends at midnight of the day following generation, and
        each further day ends at the next midnight. So expiry = 11:59:59 pm on (generation date + days).
      </p>
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile trader enters Part B on 13 October 2026 at 4:30 pm for 620 km of normal cargo. 620 ÷ 200 = 3.1,
        rounded up to 4 days. The e-way bill is valid till 17 October 2026, 11:59:59 pm, and can be extended from about
        3:59 pm on 17 October to about 7:59 am on 18 October.
      </p>
      <h3>Distance: what you enter vs what the portal calculates</h3>
      <p>
        The portal auto-calculates PIN-to-PIN distance and allows up to 10% more. The maximum is 4,000 km. This website
        cannot look up road distances, so enter the figure yourself. Read more in{' '}
        <Link href="/eway-bill-distance-rules">distance rules</Link> and <Link href="/eway-bill-validity">e-way bill validity</Link>.
      </p>
    </ToolPageLayout>
  );
}
