import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceEditor from '@/components/tools/invoice/InvoiceEditor';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Free GST Invoice Generator — Create & Print Tax Invoice (PDF)',
  description:
    'Create a GST tax invoice in your browser: automatic CGST/SGST or IGST from place of supply, tax summary by rate, amount in words, and print or save as PDF. Nothing is uploaded.',
  path: '/tools/invoice-generator',
});

const faq: Faq[] = [
  {
    q: 'Is my invoice data uploaded anywhere?',
    a: 'No. The invoice is built in your browser. If you choose “Save draft”, it is stored only in this browser’s local storage, which you can clear at any time.',
  },
  {
    q: 'How does the tool decide between CGST/SGST and IGST?',
    a: 'It compares the seller’s state with the place of supply. Same state means CGST + SGST/UTGST; different states mean IGST. You must still choose the correct place of supply under the GST rules.',
  },
  {
    q: 'How do I get a PDF?',
    a: 'Select “Print / Save as PDF” and choose “Save as PDF” as the destination in your browser’s print dialog. Only the invoice is printed.',
  },
  {
    q: 'Is this an e-invoice or an e-way bill?',
    a: 'Neither. It is a printable invoice document. E-invoices (IRN) are generated through the Invoice Registration Portal, and e-way bills on the official e-way bill portal or through an authorised integration.',
  },
  {
    q: 'Does the GSTIN check confirm the GSTIN is active?',
    a: 'No. It only checks the 15-character format. Verify the GSTIN on the GST portal’s “Search Taxpayer” facility.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="invoice-generator"
      title="GST Invoice Generator"
      description="Fill in seller, buyer and items to get a clean, printable GST tax invoice with automatic tax split, tax summary and amount in words."
      tool={<InvoiceEditor variant="gst" />}
      faq={faq}
      related={['sales-invoice-generator', 'gst-calculator', 'hsn-code-lookup']}
      disclaimer={
        <p>
          This tool creates an invoice layout and performs calculations only. It does not determine the legally correct tax
          treatment, rate, place of supply or invoice content required for your business, and the GSTIN check is a format
          check only. Check Rule 46 of the CGST Rules and current notifications on{' '}
          <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>.
          E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How to create a GST invoice</h2>
      <ol>
        <li>Enter your business name, address, GSTIN and state. The state fills itself from a GSTIN when empty.</li>
        <li>Enter the buyer and the place of supply. The tool shows whether the supply is intra-state or inter-state.</li>
        <li>Add line items with HSN/SAC, quantity, unit, rate, discount and GST rate.</li>
        <li>Check the live preview, then select <strong>Print / Save as PDF</strong>.</li>
      </ol>
      <h3>How the totals are calculated</h3>
      <p>
        For each line, taxable value = quantity × rate − discount. GST is calculated on the taxable value at the line&apos;s
        rate, split into CGST and SGST/UTGST (half each) for intra-state supplies or charged as IGST for inter-state
        supplies. The tax summary groups taxable value and tax by rate. If round-off is on, the total is rounded to the
        nearest rupee and the difference is shown as “Round off”.
      </p>
      <h3>Example (illustrative)</h3>
      <p>
        Select <strong>Load sample data</strong> to see a Rajkot pipe manufacturer (GSTIN 24ABCDE1234F1Z5, a sample) billing
        a Pune trader. Because Gujarat (24) and Maharashtra (27) differ, the invoice charges IGST.
      </p>
      <p>
        Need numbered invoices, a product list and transport details? Use the{' '}
        <Link href="/tools/sales-invoice-generator">sales invoice generator</Link>. Remember that an invoice is not an e-way bill —
        see <Link href="/eway-bill-vs-sales-invoice">e-way bill vs sales invoice</Link>.
      </p>
    </ToolPageLayout>
  );
}
