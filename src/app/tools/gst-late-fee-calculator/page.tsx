import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstLateFeeCalculator from '@/components/tools/GstLateFeeCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST Late Fee Calculator for GSTR-3B and GSTR-1',
  description:
    'Calculate the late fee for filing GSTR-3B or GSTR-1 after the due date: days late, ₹50 or ₹20 per day, turnover-based maximum and CGST/SGST split.',
  path: '/tools/gst-late-fee-calculator',
});

const faq: Faq[] = [
  {
    q: 'What is the late fee per day for GSTR-3B and GSTR-1?',
    a: 'As commonly stated, ₹50 per day (₹25 CGST + ₹25 SGST) for a return with liability or supplies, and ₹20 per day (₹10 CGST + ₹10 SGST) for a nil return. The total is limited by a maximum that depends on whether the return is nil and on your turnover.',
  },
  {
    q: 'What are the maximum late fee caps?',
    a: 'The caps commonly cited for tax periods from June 2021 are ₹500 for nil returns, ₹2,000 for AATO up to ₹1.5 crore, ₹5,000 for AATO above ₹1.5 crore up to ₹5 crore, and ₹10,000 for AATO above ₹5 crore, each split equally between CGST and SGST. These are the tool’s defaults; you can edit them. Verify the current notification on cbic-gst.gov.in.',
  },
  {
    q: 'I only make inter-state supplies. Is the late fee charged as IGST?',
    a: 'Generally no. Late fee is levied under the CGST Act and the respective SGST/UTGST Act, so even a taxpayer with only IGST transactions usually pays it under the CGST and SGST heads. Check the current position on the portal.',
  },
  {
    q: 'Is interest charged on top of the late fee?',
    a: 'Late fee is for filing the return late. If tax was also paid late, interest under Section 50 is separate. Use the GST interest calculator for that.',
  },
  {
    q: 'Can late fee be waived?',
    a: 'The government has notified waivers and amnesty schemes for particular periods in the past. Check the latest notifications before paying; this tool does not apply any waiver.',
  },
  {
    q: 'Can I pay the late fee from my input tax credit?',
    a: 'Generally no. Late fee is usually paid in cash through the electronic cash ledger, not set off against ITC. Keep enough cash balance before you file a late return.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-late-fee-calculator"
      title="GST Late Fee Calculator"
      description="Late fee for filing GSTR-3B or GSTR-1 after the due date, with nil-return and turnover-based maximums and the CGST/SGST split."
      tool={<GstLateFeeCalculator />}
      faq={faq}
      related={['gst-interest-calculator', 'gstr-1-checker', 'gstr-1-vs-gstr-3b-reconciliation']}
    >
      <h2>How the GST late fee works</h2>
      <p>
        A GST late fee is a fixed charge for each day a return such as GSTR-3B or GSTR-1 is filed late, under Section 47
        of the CGST Act and the matching state law. Notifications have cut the per-day amount and set maximum caps. This
        tool uses the figures commonly cited for periods from June 2021 as editable defaults.
      </p>
      <h3>Formula</h3>
      <ul>
        <li><strong>Days late</strong> = Filing date − Due date (0 if filed on or before the due date)</li>
        <li><strong>Fee without cap</strong> = Days late × ₹50 (or ₹20 for a nil return)</li>
        <li><strong>Late fee payable</strong> = the lower of the fee without cap and the applicable maximum</li>
        <li><strong>CGST / SGST</strong> = half each</li>
      </ul>

      <h2>Pick the right inputs</h2>
      <p>
        Three inputs decide the fee: the number of days late, whether the return is nil and your turnover slab. The days
        set the running fee, while the nil status and slab set the cap. A wrong slab is the most common reason a figure
        here does not match the portal, so settle it first.
      </p>
      <ul>
        <li><strong>If the return has any tax liability or any outward supply</strong>, answer “No” to nil. Use ₹50 per day.</li>
        <li><strong>If there is nothing to report for the period</strong>, it is a nil return. Use ₹20 per day and the nil cap, whatever your turnover.</li>
        <li><strong>If you are choosing a slab</strong>, use aggregate turnover of the preceding financial year, not the current one.</li>
        <li><strong>If a notification has changed the caps</strong>, open “Maximum late fee caps (editable)” and enter the new figures.</li>
      </ul>

      <h2>How to read your result</h2>
      <p>
        The result shows days late, the fee per day, the fee without a cap, the cap and the amount you pay. It also splits
        that amount into CGST and SGST. If the fee without a cap is higher than the cap, you pay the cap, and filing later
        will not add more late fee for that return.
      </p>
      <p>
        That last point matters for planning, not as an excuse to wait. Interest on unpaid tax keeps running, and a long
        delay in filing GSTR-3B can bring other action under GST law. If your edited caps are in use, the result says so,
        and so does the copied summary.
      </p>

      <h2>Worked examples</h2>
      <p>
        The examples below show a small business that stays under its cap, a nil return that hits the nil cap, and a larger
        business that reaches the top cap. All businesses are made up and the figures use the tool’s default caps. Your own
        case may differ if a waiver or a newer notification applies.
      </p>
      <h3>Example (illustrative): small business, GSTR-3B</h3>
      <p>
        A Jaipur handicraft seller with turnover of about ₹1 crore files GSTR-3B 25 days late with tax liability. The fee
        is 25 × ₹50 = ₹1,250, below the ₹2,000 cap, so ₹625 CGST and ₹625 SGST.
      </p>
      <p>
        Had the return been 60 days late, the fee would be 60 × ₹50 = ₹3,000, capped at ₹2,000. A nil return 30 days
        late would be 30 × ₹20 = ₹600, capped at ₹500.
      </p>
      <h3>Example (illustrative): larger business, GSTR-1</h3>
      <p>
        A Vadodara chemicals distributor, GSTIN 24ABCDE1234F1Z5, had turnover above ₹5 crore in the preceding year. Its
        GSTR-1 goes in 15 days late. The fee is 15 × ₹50 = ₹750, well below the ₹10,000 cap, so ₹375 CGST and ₹375 SGST.
      </p>
      <p>
        If the same return were 250 days late, the running fee would be ₹12,500. The cap of ₹10,000 applies, split ₹5,000
        CGST and ₹5,000 SGST.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Late fee is simple maths, so mistakes come from labels, not sums. People pick the wrong slab, call a return nil when
        it is not, or expect the fee in the wrong head, and each one leads to a figure that will not match the portal. The
        list below covers the ones that cause the most confusion.
      </p>
      <ul>
        <li>Using the current year’s turnover for the slab. The caps are generally based on aggregate turnover in the preceding financial year.</li>
        <li>Treating a return with any liability or supply as nil. A nil return has nothing to report for the period.</li>
        <li>Expecting the late fee in the IGST head. It is generally charged under CGST and SGST.</li>
        <li>Ignoring interest. If tax was also paid late, interest is charged separately.</li>
        <li>Counting the due date as a day late. The count starts the next day.</li>
      </ul>

      <h2>Limits of this calculator</h2>
      <p>
        This tool covers the standard late fee for GSTR-3B and GSTR-1 only, using caps you can edit. It does not know your
        due date, does not apply waivers or amnesty schemes and does not cover other returns. Treat its figure as a
        cross-check of what the portal shows, not as a final demand.
      </p>
      <ul>
        <li>It does not cover GSTR-9, GSTR-4 or other returns, which have their own rules.</li>
        <li>It does not apply any waiver for a particular period. Check the notifications for that.</li>
        <li>It does not calculate interest on late tax. Use the <Link href="/tools/gst-interest-calculator">GST interest calculator</Link>.</li>
        <li>It does not pick the due date for monthly or quarterly filers.</li>
      </ul>
      <p>
        Filing late often goes with mismatched data. Before you file, run your sales through the{' '}
        <Link href="/tools/gstr-1-checker">GSTR-1 data checker</Link> so you do not have to fix errors in a later period.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Confirm the due date that applied, including extensions.</li>
        <li>Decide honestly whether the return is nil.</li>
        <li>Pick the slab from the preceding year’s turnover.</li>
        <li>Check the caps against the latest notification.</li>
        <li>Keep cash in the ledger for the late fee before filing.</li>
      </ul>
      <p>
        Late fee amounts and caps are set by notification. Verify the current position on{' '}
        <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> and the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>. E-Way Easy is not a
        government portal.
      </p>
    </ToolPageLayout>
  );
}
