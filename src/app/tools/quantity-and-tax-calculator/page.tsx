import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import QuantityTaxCalculator from '@/components/tools/QuantityTaxCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Quantity and Tax Calculator — Qty × Rate, Discount, GST',
  description:
    'Calculate quantity × rate, discount and GST for an invoice line, work out the taxable value with packing and freight, and see how a discount changes the tax.',
  path: '/tools/quantity-and-tax-calculator',
});

const faq: Faq[] = [
  {
    q: 'Is freight charged on the invoice part of the taxable value?',
    a: 'Generally yes. Incidental expenses such as packing and freight charged by the supplier to the buyer are included in the value of supply under Section 15 of the CGST Act. Check the conditions for your case.',
  },
  {
    q: 'Does a discount reduce GST?',
    a: 'A discount recorded in the invoice at or before the time of supply generally reduces the taxable value, and therefore the GST. Post-supply discounts have extra conditions. The calculator only shows the arithmetic.',
  },
  {
    q: 'How many decimals can I use for quantity?',
    a: 'Up to three decimals, which suits units like kilograms, metres or litres. Amounts accept up to two decimals.',
  },
  {
    q: 'How is the line total rounded?',
    a: 'Each step is rounded to the nearest paisa: gross, discount, then each tax component. Invoice-level rounding to the rupee is available in the invoice generator.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="quantity-and-tax-calculator"
      title="Quantity and Tax Calculator"
      description="Three quick calculators for invoice lines: quantity × rate with discount and GST, taxable value with charges, and a discount-and-tax comparison."
      tool={<QuantityTaxCalculator />}
      faq={faq}
      related={['gst-calculator', 'invoice-generator', 'sales-invoice-generator']}
    >
      <h2>How it works</h2>
      <p>
        Each invoice line follows the same order: quantity × rate gives the gross amount, the discount is deducted to get
        the taxable value, and GST is applied on the taxable value. Within a state the tax is split equally into CGST and
        SGST/UTGST; for inter-state supplies it is IGST.
      </p>
      <h3>Formulas</h3>
      <ul>
        <li>Gross = Quantity × Rate per unit</li>
        <li>Discount = Gross × Discount % ÷ 100</li>
        <li>Taxable value = Gross − Discount (+ packing, freight and other charges billed)</li>
        <li>GST = Taxable value × GST rate ÷ 100; Line total = Taxable value + GST</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Surat textile wholesaler bills 25 metres at ₹480 per metre with 5% discount, GST at 5%, to a buyer in the same state.
      </p>
      <div className="table-wrap">
        <table>
          <tbody>
            <tr><td>Gross (25 × ₹480)</td><td>₹12,000.00</td></tr>
            <tr><td>Discount @ 5%</td><td>− ₹600.00</td></tr>
            <tr><td>Taxable value</td><td>₹11,400.00</td></tr>
            <tr><td>CGST @ 2.5% + SGST @ 2.5%</td><td>₹285.00 + ₹285.00</td></tr>
            <tr><td>Line total</td><td>₹11,970.00</td></tr>
          </tbody>
        </table>
      </div>
    </ToolPageLayout>
  );
}
