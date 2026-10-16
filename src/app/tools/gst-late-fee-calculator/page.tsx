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
        When GSTR-3B or GSTR-1 is filed after its due date, a late fee is charged for each day of delay under Section 47 of
        the CGST Act and the matching provision of the state law. The government has reduced the per-day amount and fixed
        maximum caps by notification. This tool uses the figures commonly cited for periods from June 2021 as editable
        defaults, so you can update them if the law changes.
      </p>
      <h3>Formula</h3>
      <ul>
        <li><strong>Days late</strong> = Filing date − Due date (0 if filed on or before the due date)</li>
        <li><strong>Fee without cap</strong> = Days late × ₹50 (or ₹20 for a nil return)</li>
        <li><strong>Late fee payable</strong> = the lower of the fee without cap and the applicable maximum</li>
        <li><strong>CGST / SGST</strong> = half each</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Jaipur handicraft seller with turnover of about ₹1 crore files GSTR-3B 25 days late with tax liability. The fee
        is 25 × ₹50 = ₹1,250, below the ₹2,000 cap, so ₹625 CGST and ₹625 SGST. Had the return been 60 days late, the fee
        would be 60 × ₹50 = ₹3,000, capped at ₹2,000. A nil return 30 days late would be 30 × ₹20 = ₹600, capped at ₹500.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Using the current year’s turnover for the slab. The caps are generally based on aggregate turnover in the preceding financial year.</li>
        <li>Treating a return with any liability or supply as nil. A nil return has nothing to report for the period.</li>
        <li>Expecting the late fee in the IGST head. It is generally charged under CGST and SGST.</li>
        <li>Ignoring interest. If tax was also paid late, interest is charged separately.</li>
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
