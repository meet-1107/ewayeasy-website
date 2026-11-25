import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import ValidityCalculator from '@/components/tools/ValidityCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'PIN to PIN Distance Calculator for E-Way Bill',
  description:
    'Enter two PIN codes to see both places, an estimated road distance and e-way bill validity days. Plus the 10% distance allowance and exact expiry time.',
  path: '/tools/distance-calculator',
});

const faq: Faq[] = [
  {
    q: 'How do I find the PIN to PIN distance for an e-way bill?',
    a: 'Enter the dispatch and delivery PIN codes in the tool above for an estimate. The e-way bill portal calculates the official PIN-to-PIN distance when you generate the bill, and that figure is the one that counts.',
  },
  {
    q: 'Why is the portal distance different from this estimate?',
    a: 'The portal uses its own road distance between the two PIN codes. This tool estimates road distance from the straight line between PIN code locations, so it shows a likely range rather than one exact figure.',
  },
  {
    q: 'How much more than the portal distance can I enter?',
    a: 'Up to 10% more than the auto-calculated PIN-to-PIN distance, subject to the 4,000 km maximum. Entering more is rejected by the portal (error 702).',
  },
  {
    q: 'What distance do I enter when both PIN codes are the same?',
    a: 'Enter the actual distance travelled, up to 100 km, when the source and destination PIN code are the same.',
  },
  {
    q: 'How many days is an e-way bill valid for 300 km?',
    a: '2 days for normal cargo, because validity is 1 day for every 200 km or part thereof, and 300 km falls in the 201–400 km band.',
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
      title="PIN to PIN Distance & E-Way Bill Validity Calculator"
      description="Enter two PIN codes for an estimated road distance, then see validity days, the exact expiry and the extension window."
      tool={<ValidityCalculator />}
      faq={faq}
      related={['eway-bill-eligibility-checker', 'sales-invoice-generator', 'gst-calculator']}
      disclaimer={
        <p>
          PIN code locations come from the All India Pincode Directory published on data.gov.in by the Department of Posts,
          used under the Government Open Data License – India. Distances are estimates; the PIN-to-PIN distance and validity
          shown on the official e-way bill portal are final. Check the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a> and{' '}
          <a className="underline" href="https://docs.ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">user documentation</a>. E-Way Easy is not affiliated with GSTN, NIC or India Post.
        </p>
      }
    >
      <h2>How the PIN to PIN distance estimate works</h2>
      <p>
        The PIN to PIN distance is the road distance between the dispatch PIN code and the delivery PIN code. The e-way bill
        portal fills it automatically, and you may enter up to 10% more. This tool finds both PIN codes in the India Post
        directory, measures the straight line between them and turns it into a likely road distance.
      </p>
      <ul>
        <li>Each PIN code is placed at the middle of its post offices, so a large rural PIN can be a few kilometres off.</li>
        <li>Road distance in India is usually 1.1 to 1.35 times the straight line. The tool shows that range and a typical value (×1.2).</li>
        <li>Hills, rivers and ghats make roads longer than average, so expect the top of the range there.</li>
      </ul>

      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe maker (PIN 360001) ships to a dealer in Ahmedabad (PIN 380001). The straight line is about 200 km, so
        the tool shows roughly 220–270 km by road, with about 240 km typical. That is 2 days of validity for normal cargo
        if the portal figure is above 200 km, or 1 day if it is 200 km or less. When the portal shows its figure, the most
        you can enter is that figure plus 10%.
      </p>

      <h2>Distance you can enter: the 10% rule</h2>
      <p>
        You can enter the actual distance up to 10% more than the portal&apos;s PIN-to-PIN distance, and never more than
        4,000 km. Entering more is rejected with error 702. If the goods go to a different place than the billing address,
        use the ship-to PIN, because distance and validity follow the place of delivery.
      </p>
      <ul>
        <li><strong>If</strong> the portal shows 300 km, <strong>then</strong> you can enter up to 330 km.</li>
        <li><strong>If</strong> both PIN codes are the same, <strong>then</strong> enter the actual distance, up to 100 km.</li>
        <li><strong>If</strong> a detour is genuinely longer than 10% extra, <strong>then</strong> you still cannot exceed the limit; check the PIN codes first.</li>
      </ul>

      <h2>How validity is calculated</h2>
      <p>
        Validity is 1 day for every 200 km or part of it for normal cargo, and 1 day for every 20 km for over-dimensional
        cargo. Days = distance ÷ km per day, rounded up. The first day ends at midnight of the day after Part B is entered.
      </p>
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
        A Morbi tile trader enters Part B on 13 October 2026 at 4:30 pm for 620 km of normal cargo. 620 ÷ 200 = 3.1,
        rounded up to 4 days. The e-way bill is valid till 17 October 2026, 11:59:59 pm, and can be extended from about
        3:59 pm on 17 October to about 7:59 am on 18 October.
      </p>

      <h2>Quick checklist</h2>
      <ol>
        <li>Use the ship-to PIN code, not the billing address, when they differ.</li>
        <li>Check both PIN codes here: a wrong PIN shows the wrong district at once.</li>
        <li>Note the portal&apos;s PIN-to-PIN figure and stay within +10%.</li>
        <li>Work out the validity before the truck leaves, and plan the extension window for long routes.</li>
      </ol>
      <p>
        More on the rules in <Link href="/eway-bill-distance-rules">e-way bill distance rules</Link> and{' '}
        <Link href="/eway-bill-validity">e-way bill validity</Link>. The E-Way Easy app fills the distance from the PIN
        codes for you, and you can edit it.
      </p>
    </ToolPageLayout>
  );
}
