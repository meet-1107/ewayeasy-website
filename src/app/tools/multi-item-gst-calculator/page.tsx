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
  {
    q: 'My prices already include GST. Can I use this calculator?',
    a: 'Not directly, because it treats every rate as before GST. First take each price back to its pre-GST value with the inclusive/exclusive GST calculator, then enter those values here.',
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
        A multi-item GST calculator works out tax for a whole bill where items carry different rates. Most real bills mix
        items: tiles at one rate, packing material at another, freight on top. This tool gives line-wise tax and the
        rate-wise summary a GST invoice shows at the bottom, plus one grand total.
      </p>
      <p>
        If you only need a single line worked out in detail, the{' '}
        <Link href="/tools/quantity-and-tax-calculator">Quantity and Tax Calculator</Link> is quicker.
      </p>
      <h3>How each line is calculated</h3>
      <ul>
        <li><strong>Gross value</strong> = Quantity × Rate per unit</li>
        <li><strong>Taxable value</strong> = Gross value − (Gross value × Discount %)</li>
        <li><strong>GST</strong> = Taxable value × GST rate (CGST and SGST at half the rate each within the state, or IGST at the full rate for inter-state)</li>
        <li><strong>Grand total</strong> = Sum of (Taxable value + GST) for all lines, including freight, ± round-off</li>
      </ul>
      <p>Every amount is worked out in whole paise, so totals don’t drift because of floating-point errors.</p>

      <h2>How to read your result</h2>
      <p>
        The result has three parts: a line-wise table with each item’s taxable value and tax, a rate-wise summary and the
        bill totals. The rate-wise summary groups lines by GST rate, which is what you print at the foot
        of an invoice. The totals show taxable value, tax, round-off and the amount in words.
      </p>
      <ul>
        <li><strong>If the type of supply is “Within state”</strong>, you see CGST and SGST. Switch to inter-state and the same tax shows as IGST.</li>
        <li><strong>If a discount is shown under a line</strong>, the taxable value is already reduced. Do not deduct it again at the bottom.</li>
        <li><strong>If the round-off line shows +₹0.50 or −₹0.40</strong>, that is only the gap to the nearest rupee. Tax does not change.</li>
        <li><strong>If your billing software total differs by a few paise</strong>, it may round tax on the bill total instead of per line. Check which method it uses.</li>
      </ul>
      <p>
        Use the copy button to paste the full working into an email or a quote, or print it for your file.
      </p>

      <h2>Worked examples</h2>
      <p>
        The two examples below show an intra-state bill with a discount and freight, and an inter-state bill at two rates
        with round-off. Both are illustrative. The businesses are made up, and the GST rates are chosen to show the maths,
        not to state the correct rate for any product.
      </p>
      <h3>Example (illustrative): within Gujarat</h3>
      <p>
        A Morbi tile dealer sells within Gujarat: 40 boxes at ₹850 with 5% discount (taxable ₹32,300) and 25 bags of
        adhesive at ₹420 (taxable ₹10,500), both at 18%, plus ₹1,500 freight at 18%. The 18% bucket has a taxable value of
        ₹44,300, with CGST ₹3,987 and SGST ₹3,987.
      </p>
      <p>
        The grand total is ₹52,274. Load the sample data to see a version with a 5% and a 0% item too.
      </p>
      <h3>Example (illustrative): Punjab to Rajasthan, two rates</h3>
      <p>
        A Ludhiana trader bills a Jaipur buyer, so the supply is inter-state. Line 1 is 100 units at ₹449.50 at 5%:
        taxable ₹44,950, IGST ₹2,247.50. Line 2 is 20 units at ₹2,600 with 10% discount at 18%: taxable ₹46,800, IGST
        ₹8,424.
      </p>
      <p>
        Freight of ₹1,250 at 18% adds IGST ₹225. The 5% bucket is ₹44,950 taxable; the 18% bucket is ₹48,050. The total
        before round-off is ₹1,03,896.50, so the bill rounds to ₹1,03,897 with +₹0.50 round-off.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Multi-rate bills go wrong when people take shortcuts that work for single-rate bills. One rate on the total, a
        discount taken after tax, or freight left outside the taxable value all give a figure that does not match the
        invoice your buyer’s accountant checks. These are the ones to watch.
      </p>
      <ul>
        <li>Applying one GST rate to the bill total when the items carry different rates.</li>
        <li>Calculating discount after GST. A discount shown on the invoice reduces the taxable value first.</li>
        <li>Leaving freight out of the taxable value when it is charged on the same invoice for the supply.</li>
        <li>Choosing the wrong rate for an item. After the September 2025 rate changes, check your HSN rate on CBIC.</li>
        <li>Entering GST-inclusive prices in the rate column, which charges tax twice.</li>
        <li>Picking “Within state” for a buyer in another state because the billing address looks local.</li>
      </ul>

      <h2>Limits of this calculator</h2>
      <p>
        This calculator does the arithmetic for the rates and values you enter. It does not know the correct GST rate for
        your goods, does not decide whether a supply is intra-state or inter-state and does not save your bill. It also
        does not handle cess, reverse charge or GST-inclusive prices.
      </p>
      <ul>
        <li>Rates per unit must exclude GST. Convert inclusive prices first with the <Link href="/tools/gst-inclusive-exclusive-calculator">inclusive/exclusive GST calculator</Link>.</li>
        <li>Discounts are percentages per line, not flat amounts on the bill.</li>
        <li>Freight takes one GST rate that you choose; the tool does not decide it for you.</li>
        <li>Look up item codes and rates with the <Link href="/tools/hsn-code-lookup">HSN code lookup</Link>, then confirm on CBIC.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Enter prices before GST and the correct rate per line.</li>
        <li>Choose “Within state” or “Inter-state” from the place of supply.</li>
        <li>Add freight with the rate you have confirmed.</li>
        <li>Check the rate-wise summary against your invoice.</li>
        <li>Copy the amount in words from the final rounded total.</li>
      </ul>
      <p>
        Verify rates and valuation rules on <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>.
        E-Way Easy is not a government portal. When the numbers are right, turn them into a printable bill with the free{' '}
        <Link href="/invoice-generator">invoice generator</Link>.
      </p>
    </ToolPageLayout>
  );
}
