import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import MultiItemGstCalculator from '@/components/tools/MultiItemGstCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Multi-Item GST Calculator with Rate-Wise Summary',
  description:
    'Calculate GST for several items at different rates in one bill: line-wise tax, freight, rate-wise CGST/SGST or IGST summary, round-off and amount in words.',
  path: '/tools/multi-item-gst-calculator',
});

const faq: Faq[] = [
  {
    q: 'How is this different from the Quantity and Tax Calculator?',
    a: 'The Quantity and Tax Calculator works out one line item in detail. This tool handles a whole bill: many items, each at its own GST rate and discount, plus freight, with a rate-wise summary and a single grand total.',
  },
  {
    q: 'Why is tax calculated line by line and not on the bill total?',
    a: 'Each item can carry a different GST rate, so tax has to be worked out on each line’s taxable value. Rounding each line to the paisa and then adding them is how most billing software prints invoices. The rate-wise summary adds up those line figures.',
  },
  {
    q: 'What GST rate should I use for freight?',
    a: 'It depends on the facts. Freight charged by the supplier as part of the supply of goods is often treated as part of the value of that supply and taxed at the goods’ rate. Where it is a separate service, other rules apply. Choose the rate after checking your case with your adviser.',
  },
  {
    q: 'Is the round-off amount taxable?',
    a: 'No. Round-off only adjusts the grand total to the nearest rupee. It does not change the taxable value or the GST on any line.',
  },
  {
    q: 'Does this create a tax invoice?',
    a: 'No. It is a calculator. To print a GST invoice, use the free invoice generator on this site, or your billing software.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="multi-item-gst-calculator"
      title="Multi-Item GST Calculator"
      description="Add several products at different GST rates, with discounts and freight, and get line-wise tax, a rate-wise summary and the grand total."
      tool={<MultiItemGstCalculator />}
      faq={faq}
      related={['quantity-and-tax-calculator', 'gst-calculator', 'invoice-generator']}
    >
      <h2>One bill, many items, different rates</h2>
      <p>
        Most real bills mix items: tiles at one rate, packing material at another, freight on top. This calculator takes
        the whole bill at once. If you only need a single line worked out in detail, the{' '}
        <Link href="/tools/quantity-and-tax-calculator">Quantity and Tax Calculator</Link> is quicker. Use this one when you want
        the rate-wise summary that a GST invoice shows at the bottom.
      </p>
      <h3>How each line is calculated</h3>
      <ul>
        <li><strong>Gross value</strong> = Quantity × Rate per unit</li>
        <li><strong>Taxable value</strong> = Gross value − (Gross value × Discount %)</li>
        <li><strong>GST</strong> = Taxable value × GST rate (CGST and SGST at half the rate each within the state, or IGST at the full rate for inter-state)</li>
        <li><strong>Grand total</strong> = Sum of (Taxable value + GST) for all lines, including freight, ± round-off</li>
      </ul>
      <p>Every amount is worked out in whole paise, so totals don’t drift because of floating-point errors.</p>
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile dealer sells within Gujarat: 40 boxes at ₹850 with 5% discount (taxable ₹32,300) and 25 bags of
        adhesive at ₹420 (taxable ₹10,500), both at 18%, plus ₹1,500 freight at 18%. The 18% bucket has a taxable value of
        ₹44,300, with CGST ₹3,987 and SGST ₹3,987. The grand total is ₹52,274. Load the sample data to see a version with a
        5% and a 0% item too.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Applying one GST rate to the bill total when the items carry different rates.</li>
        <li>Calculating discount after GST. A discount shown on the invoice reduces the taxable value first.</li>
        <li>Leaving freight out of the taxable value when it is charged on the same invoice for the supply.</li>
        <li>Choosing the wrong rate for an item. After the September 2025 rate changes, check your HSN rate on CBIC.</li>
      </ul>
      <p>
        Verify rates and valuation rules on <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>.
        E-Way Easy is not a government portal.
      </p>
    </ToolPageLayout>
  );
}
