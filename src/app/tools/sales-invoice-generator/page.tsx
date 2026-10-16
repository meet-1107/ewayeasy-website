import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceEditor from '@/components/tools/invoice/InvoiceEditor';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Sales Invoice Generator — Number Series, Products & Transport',
  description:
    'Free sales invoice generator with your own invoice number series, saved product list, separate billing and shipping address, transport details, drafts and PDF printing.',
  path: '/tools/sales-invoice-generator',
});

const faq: Faq[] = [
  {
    q: 'Does creating a sales invoice create an e-way bill?',
    a: 'No. The sales invoice is a separate document. Generate the e-way bill on the official e-way bill portal or in the E-Way Easy app, using the invoice details.',
  },
  {
    q: 'How does the invoice number series work?',
    a: 'Set a prefix such as EE/26-27/ and the next number. The tool suggests EE/26-27/0001, then moves to the next number when you save a draft or duplicate an invoice. Invoice numbers should be consecutive and unique within a financial year, up to 16 characters.',
  },
  {
    q: 'Where are my products and drafts stored?',
    a: 'Only in this browser’s local storage. They are not uploaded and will not appear on another device. Clearing browser data removes them.',
  },
  {
    q: 'Why add transport details to an invoice?',
    a: 'Mode, vehicle number, transporter and approximate distance are handy for dispatch and for preparing the e-way bill. The distance here is entered by you; the e-way bill portal calculates PIN-to-PIN distance.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="sales-invoice-generator"
      title="Sales Invoice Generator"
      description="Create numbered sales invoices with a saved product list, billing and shipping addresses and transport details — then print or save as PDF."
      tool={<InvoiceEditor variant="sales" />}
      faq={faq}
      related={['invoice-generator', 'eway-bill-eligibility-checker', 'distance-calculator']}
      disclaimer={
        <p>
          This tool creates an invoice layout and performs calculations only. It does not determine the legally correct tax
          treatment or whether an e-way bill is required, and it does not generate e-way bills or e-invoices. Check the
          current rules on <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> and the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a>.
          E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How the sales invoice generator works</h2>
      <ul>
        <li><strong>Number series:</strong> set a prefix and running number (for example <code>EE/26-27/0001</code>); the next number is suggested automatically.</li>
        <li><strong>Product catalogue:</strong> save products with HSN, unit, rate and GST rate, then add them to any invoice in one click.</li>
        <li><strong>Billing and shipping:</strong> bill one address and ship to another, such as a buyer&apos;s godown.</li>
        <li><strong>Transport details:</strong> mode, vehicle number, transporter and approximate distance print on the invoice.</li>
        <li><strong>Drafts and duplicates:</strong> save several drafts in your browser and duplicate an invoice for a repeat order.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer bills a Pune trader but ships to the trader&apos;s Chakan godown by road, 720 km. The invoice
        shows IGST because the seller (Gujarat) and the place of supply (Maharashtra) differ. The consignment value is above
        ₹50,000, so an e-way bill is likely needed — check with the{' '}
        <Link href="/tools/eway-bill-eligibility-checker">eligibility checker</Link> and work out validity with the{' '}
        <Link href="/tools/distance-calculator">validity calculator</Link> (720 km = 4 days for normal cargo).
      </p>
      <h3>From invoice to e-way bill</h3>
      <p>
        The invoice gives you the details for Part A of the e-way bill: GSTINs, place of delivery, document number and date,
        value and HSN codes. Part B needs the vehicle or transport document. In the E-Way Easy app, the invoice and e-way bill
        flow is <em>Invoice → Review EWB → Generated</em>. See <Link href="/eway-bill-vs-sales-invoice">e-way bill vs sales invoice</Link>.
      </p>
    </ToolPageLayout>
  );
}
