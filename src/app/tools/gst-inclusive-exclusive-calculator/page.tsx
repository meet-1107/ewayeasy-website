import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InclusiveExclusiveCalculator from '@/components/tools/InclusiveExclusiveCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST Inclusive to Exclusive Calculator (and Back)',
  description:
    'Convert a GST-inclusive price to the taxable value and a taxable value to the inclusive price, side by side, with CGST/SGST or IGST breakdown.',
  path: '/tools/gst-inclusive-exclusive-calculator',
});

const faq: Faq[] = [
  {
    q: 'Why is removing 18% from ₹118 not ₹96.76?',
    a: 'Because GST is charged on the taxable value, not on the inclusive price. ₹118 includes 18% of ₹100, so the taxable value is ₹118 × 100 ÷ 118 = ₹100. Subtracting 18% of ₹118 gives the wrong answer.',
  },
  {
    q: 'What does “GST inclusive” mean?',
    a: 'The price already contains the GST. A GST-exclusive price is the taxable value, and GST is added on top when the invoice is raised.',
  },
  {
    q: 'Can rounding make the numbers differ by a paisa?',
    a: 'Yes. When you back out GST from an inclusive price, the taxable value may not be a whole number of paise. This calculator keeps your inclusive amount unchanged and absorbs any one-paisa difference into the taxable value.',
  },
  {
    q: 'Does the calculator know my product’s rate?',
    a: 'No. Select the rate yourself after confirming it for your HSN or SAC code on CBIC.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-inclusive-exclusive-calculator"
      title="GST Inclusive / Exclusive Calculator"
      description="Two conversions side by side: take GST out of an inclusive price, or add GST to a taxable value."
      tool={<InclusiveExclusiveCalculator />}
      faq={faq}
      related={['gst-calculator', 'quantity-and-tax-calculator', 'invoice-generator']}
    >
      <h2>Inclusive and exclusive prices</h2>
      <p>
        Retail prices and quotes are often given including GST, while invoices show the taxable value and the tax
        separately. This tool lets you move between the two using the same rate and type of supply for both panels.
      </p>
      <h3>Formulas</h3>
      <ul>
        <li><strong>Inclusive → exclusive:</strong> Taxable value = Inclusive price × 100 ÷ (100 + Rate)</li>
        <li><strong>Exclusive → inclusive:</strong> Inclusive price = Taxable value × (100 + Rate) ÷ 100</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile trader quotes ₹5,250 per box including GST at 5%. Taxable value = ₹5,250 × 100 ÷ 105 = ₹5,000, and
        GST = ₹250 (CGST ₹125 + SGST ₹125 within the state, or IGST ₹250 for an inter-state buyer). Going the other way,
        ₹5,000 plus 5% GST is ₹5,250.
      </p>
      <h3>Common mistake</h3>
      <p>
        Taking the rate percentage of the inclusive price (for example, 5% of ₹5,250 = ₹262.50) overstates the tax. Always
        divide by (100 + rate).
      </p>
    </ToolPageLayout>
  );
}
