import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import QuotationEditor from '@/components/tools/quotation/QuotationEditor';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Quotation Generator with GST — Free, Print or Save as PDF',
  description:
    'Make a GST quotation with validity date, line items, discount, CGST/SGST or IGST and your terms. Print, save as PDF or turn it into a GST invoice draft.',
  path: '/tools/quotation-generator',
});

const faq: Faq[] = [
  {
    q: 'Is a quotation a tax invoice?',
    a: 'No. A quotation is an offer of price and terms before the sale. It does not create a GST liability, cannot be used to claim input tax credit and cannot be used to generate an e-way bill. Issue a tax invoice when the goods are supplied.',
  },
  {
    q: 'What is the difference between a quotation and a proforma invoice?',
    a: 'Both are pre-sale documents and neither is a tax invoice. A quotation offers prices for the buyer to accept; a proforma invoice is usually sent after the buyer agrees, for advance payment or approvals.',
  },
  {
    q: 'How does “Convert to invoice” work?',
    a: 'It saves the quotation’s seller, customer, place of supply and items as a new draft in the Sales Invoice Generator in this browser, with today’s date and your next sales invoice number if you have set a series. Open the Sales Invoice Generator and pick it from Saved drafts.',
  },
  {
    q: 'Where are quotations stored?',
    a: 'Only in this browser’s local storage. Nothing is uploaded, and clearing browser data removes the drafts.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="quotation-generator"
      title="Quotation Generator"
      description="Create a GST quotation with validity date, terms and line-item totals — then print, save as PDF or turn it into an invoice draft."
      tool={<QuotationEditor />}
      faq={faq}
      related={['sales-invoice-generator', 'multi-item-gst-calculator', 'gst-calculator']}
    >
      <h2>Making a quotation that matches your invoice</h2>
      <p>
        A clear quotation saves arguments later. It tells the customer the items, HSN codes, rates, discount and GST, how long
        the price holds, and the payment, delivery, warranty and freight terms. Using the same rates and GST split as your
        invoice means the final bill looks the way the customer expected.
      </p>
      <h3>What you can set</h3>
      <ul>
        <li>Quotation number from your own series, date and “valid until” date.</li>
        <li>Your business and customer details with GSTIN and state; CGST + SGST or IGST follows the place of supply.</li>
        <li>Line items with HSN, quantity, unit, rate, discount and GST rate, with totals and amount in words.</li>
        <li>Payment, delivery, warranty and freight terms, notes and a signature block.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer quotes a Pune trader for 120 uPVC pipes with a 5% discount, valid for 15 days, freight
        extra. The quote shows IGST because the states differ. When the trader confirms, “Convert to invoice” copies the items
        into a sales invoice draft so nothing has to be typed again.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Treating the quotation as the invoice and moving goods on it — goods move on a tax invoice, bill of supply or delivery challan.</li>
        <li>Leaving out the validity date, which leaves old prices open indefinitely.</li>
        <li>Quoting a GST rate without checking the current rate for the HSN after the September 2025 rate changes.</li>
      </ul>
    </ToolPageLayout>
  );
}
