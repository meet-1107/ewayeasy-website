import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstInterestCalculator from '@/components/tools/GstInterestCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST Interest Calculator (Section 50) — 18% and 24%',
  description:
    'Work out interest on late GST payment under Section 50 of the CGST Act: days late, 18% or 24% per annum, per tax head, rounded to the paisa and to the rupee.',
  path: '/tools/gst-interest-calculator',
});

const faq: Faq[] = [
  {
    q: 'Is GST interest charged on the gross tax or the net cash payment?',
    a: 'Under the proviso to Section 50(1), as generally applied, interest on tax paid late with a delayed return is charged on the part of the tax paid in cash (through the electronic cash ledger), not on the portion set off from input tax credit. The exception is where the return is filed after the start of proceedings, such as an audit or demand. Confirm how it applies to your case.',
  },
  {
    q: 'When does the 24% rate apply?',
    a: 'Section 50(3) provides for interest where input tax credit is wrongly availed and utilised. The rate is generally stated as 24% per annum, and interest runs from the date of utilisation until it is reversed or paid. Credit that was availed but never utilised generally does not attract this interest.',
  },
  {
    q: 'How are days counted?',
    a: 'This tool counts the days from the day after the due date up to and including the payment date, which equals payment date minus due date. If you paid on or before the due date, the delay is zero.',
  },
  {
    q: 'Should I round interest to the rupee?',
    a: 'Tax and interest are generally paid in whole rupees on the GST portal, so the rounded figure is what you usually pay. The tool shows both the exact figure and the rounded figure for each head.',
  },
  {
    q: 'Does the portal calculate interest for me?',
    a: 'The GST portal may show system-computed interest in GSTR-3B. Use this calculator to understand and cross-check that figure, and verify the final amount on the portal.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-interest-calculator"
      title="GST Interest Calculator"
      description="Interest on late GST payment under Section 50, for each tax head, at 18% or 24% per annum."
      tool={<GstInterestCalculator />}
      faq={faq}
      related={['gst-late-fee-calculator', 'gstr-1-vs-gstr-3b-reconciliation', 'gst-calculator']}
    >
      <h2>Interest under Section 50 of the CGST Act</h2>
      <p>
        If GST is paid after the due date, Section 50 of the CGST Act charges simple interest for the period of delay. The
        rate is set by notification and is generally stated as 18% per annum for late payment of tax under Section 50(1),
        and 24% per annum under Section 50(3) for input tax credit wrongly availed and utilised. Interest is calculated
        separately for each head: IGST, CGST, SGST/UTGST and cess.
      </p>
      <p>
        For late returns, the proviso to Section 50(1) generally limits interest to the tax paid in cash. So if your
        GSTR-3B liability was ₹1,50,000 and ₹1,10,000 was set off from ITC, interest is usually worked out on the ₹40,000
        paid through the cash ledger. Enter that net cash figure in the tool.
      </p>
      <h3>Formula</h3>
      <ul>
        <li><strong>Days late</strong> = Payment date − Due date (0 if paid on or before the due date)</li>
        <li><strong>Interest</strong> = Tax × Rate × Days late ÷ 365</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Surat textile trader’s GSTR-3B for June 2026 was due on 20 July 2026, and the CGST of ₹42,500 (cash portion) was
        paid on 14 August 2026. That is 25 days late. Interest = ₹42,500 × 18% × 25 ÷ 365 = ₹523.97, about ₹524. The same
        is worked out separately for SGST. Load the sample data to see it with three heads.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Charging interest on the full liability when part of it was set off from ITC.</li>
        <li>Using 24% for ordinary late payment. That rate is for ITC wrongly availed and utilised.</li>
        <li>Adding up all heads and calculating interest once, when the heads had different payment dates.</li>
        <li>Counting the due date itself as a day of delay.</li>
      </ul>
      <p>
        Interest rates and the way they apply are set by notification. Check the current position on{' '}
        <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> and the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>. E-Way Easy is not a
        government portal.
      </p>
    </ToolPageLayout>
  );
}
