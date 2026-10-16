import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstCalculator from '@/components/tools/GstCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST Calculator — Add or Remove GST, CGST/SGST & IGST',
  description:
    'Free GST calculator for India. Add GST to a price or remove GST from an inclusive amount at 5%, 18%, 40% or any rate, with discount and CGST/SGST or IGST split.',
  path: '/tools/gst-calculator',
});

const faq: Faq[] = [
  {
    q: 'How do I calculate GST on a price that excludes GST?',
    a: 'Multiply the taxable value by the GST rate and divide by 100. For ₹10,000 at 18%, GST is ₹1,800 and the total is ₹11,800.',
  },
  {
    q: 'How do I remove GST from an inclusive price?',
    a: 'Divide the inclusive amount by (100 + rate) and multiply by 100 to get the taxable value. The difference is the GST. For ₹11,800 at 18%, the taxable value is ₹10,000 and GST is ₹1,800.',
  },
  {
    q: 'When do I charge CGST + SGST and when IGST?',
    a: 'Generally, CGST and SGST (or UTGST) apply when the supplier location and the place of supply are in the same state or UT, and IGST applies when they are in different states. The place of supply rules decide this, so check them for your transaction.',
  },
  {
    q: 'Which GST rates should I use after September 2025?',
    a: 'After the GST rate rationalisation effective 22 September 2025, the main slabs are 5% and 18%, with 40% for specified goods. Rates of 0%, 0.25% and 3% continue for specific items. Always check the current rate for your HSN or SAC code on CBIC.',
  },
  {
    q: 'Is the discount applied before or after GST?',
    a: 'In this calculator, a discount shown on the invoice at the time of supply is deducted before GST is calculated in “Add GST” mode. In “Remove GST” mode it is deducted from the inclusive price first. Whether a particular discount reduces the taxable value depends on the conditions in Section 15 of the CGST Act.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-calculator"
      title="GST Calculator"
      description="Add GST to a price or remove it from an inclusive amount, with discount and CGST/SGST or IGST split. Amounts are calculated in paise, so there are no rounding surprises."
      tool={<GstCalculator />}
      faq={faq}
      related={['gst-inclusive-exclusive-calculator', 'quantity-and-tax-calculator', 'invoice-generator']}
    >
      <h2>How the GST calculator works</h2>
      <p>
        Choose whether your amount is <strong>before GST</strong> (exclusive) or <strong>already includes GST</strong>{' '}
        (inclusive), pick the rate and the type of supply. The calculator shows the taxable value, the tax and the final
        amount, and splits the tax into CGST and SGST/UTGST for supplies within a state, or shows IGST for inter-state supplies.
      </p>
      <h3>Formulas</h3>
      <ul>
        <li><strong>Add GST:</strong> GST = Taxable value × Rate ÷ 100; Total = Taxable value + GST</li>
        <li><strong>Remove GST:</strong> Taxable value = Inclusive amount × 100 ÷ (100 + Rate); GST = Inclusive amount − Taxable value</li>
        <li><strong>Intra-state split:</strong> CGST = SGST = Taxable value × (Rate ÷ 2) ÷ 100</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer sells pipes worth ₹10,000 (before tax) to a buyer in Gujarat at 18%.
      </p>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Item</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Taxable value</td><td>₹10,000.00</td></tr>
            <tr><td>CGST @ 9%</td><td>₹900.00</td></tr>
            <tr><td>SGST @ 9%</td><td>₹900.00</td></tr>
            <tr><td>Invoice total</td><td>₹11,800.00</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        If the same pipes go to a buyer in Maharashtra, the tax is IGST @ 18% = ₹1,800 and the total is unchanged.
        If you only know the inclusive price of ₹11,800, “Remove GST” gives back ₹10,000 + ₹1,800.
      </p>
      <h3>About the rate presets</h3>
      <p>
        After the GST rate rationalisation effective 22 September 2025, the main slabs are 5% and 18%, with 40% for
        specified goods. 12% and 28% remain in the list for reference and for checking older invoices. The calculator
        does not know your item&apos;s rate — confirm it against your HSN or SAC code using the{' '}
        <Link href="/tools/hsn-code-lookup">HSN chapter lookup</Link> and CBIC.
      </p>
    </ToolPageLayout>
  );
}
