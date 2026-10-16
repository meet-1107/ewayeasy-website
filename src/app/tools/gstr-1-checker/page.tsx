import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import Gstr1Checker from '@/components/tools/Gstr1Checker';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GSTR-1 Checker: Validate Your Sales Register Before Filing',
  description:
    'Paste your sales register to check GSTINs, duplicate invoice numbers, tax maths and dates, and get B2B, B2CL, B2CS, rate-wise and HSN-wise totals.',
  path: '/tools/gstr-1-checker',
});

const faq: Faq[] = [
  {
    q: 'Does this tool file GSTR-1 or create the JSON file?',
    a: 'No. It is a preparation aid that checks your sales register and summarises it. File GSTR-1 on the GST portal, or prepare the upload file with the official offline tool or your accounting software.',
  },
  {
    q: 'How does it decide between B2B, B2CL and B2CS?',
    a: 'Rows with a recipient GSTIN are treated as B2B. Rows without a GSTIN are B2CL when the supply is inter-state and the invoice value is above the threshold you enter; all other unregistered sales are B2CS. The threshold field is editable because limits can change, so check the current limit on the GST portal.',
  },
  {
    q: 'Why is a row flagged when the invoice number repeats?',
    a: 'One invoice with several rates or HSN codes can appear on several rows, which is fine. The checker flags repeats only when the same number has a different date or recipient, or when the same invoice, rate and HSN appear twice (a likely double entry).',
  },
  {
    q: 'What does the tax maths check compare?',
    a: 'It compares IGST + CGST + SGST with taxable value × rate and flags differences above ₹1. It also checks that inter-state supplies (place of supply differs from your state) carry IGST, intra-state supplies carry CGST and SGST, and that CGST equals SGST.',
  },
  {
    q: 'Is my sales data sent anywhere?',
    a: 'No. The file is read and checked in your browser. Nothing is uploaded to E-Way Easy or any other server.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gstr-1-checker"
      title="GSTR-1 Preparation Checker"
      description="Check a month’s sales register for common GSTR-1 errors and get section-wise, rate-wise and HSN-wise totals before you file."
      tool={<Gstr1Checker />}
      faq={faq}
      related={['gstin-validator', 'gstr-1-vs-gstr-3b-reconciliation', 'hsn-code-lookup', 'gst-late-fee-calculator']}
    >
      <h2>What the checker looks at</h2>
      <p>
        Most GSTR-1 corrections trace back to a handful of data problems in the sales register: a mistyped GSTIN, an invoice
        number used twice, tax charged under the wrong head, or an invoice dated in a different month. This tool runs those
        checks on every row and then totals the clean data the way GSTR-1 asks for it.
      </p>
      <ul>
        <li><strong>Recipient GSTIN:</strong> 15-character format, state code and check character (format only, not live registration status).</li>
        <li><strong>Invoice number:</strong> up to 16 characters using letters, digits, hyphen and slash; repeated numbers in the period.</li>
        <li><strong>Date:</strong> valid date inside the tax period you select.</li>
        <li><strong>Tax head:</strong> IGST for inter-state supplies, CGST + SGST for intra-state supplies, based on place of supply versus your state.</li>
        <li><strong>Tax amount:</strong> tax ≈ taxable value × rate, within ₹1, and CGST equal to SGST.</li>
        <li><strong>HSN and UQC:</strong> present, 4/6/8-digit HSN, and a unit wherever a quantity is given.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot tile trader registered in Gujarat (state code 24) loads September’s register. An invoice to a registered
        buyer in Maharashtra goes to B2B with IGST. A ₹1,77,000 invoice to an unregistered buyer in Rajasthan is inter-state
        and above the threshold entered, so it is shown as B2CL. A ₹10,500 walk-in sale within Gujarat is B2CS. One row
        shows CGST ₹180 and SGST ₹175, which the checker flags because the two halves should be equal.
      </p>
      <h3>Common mistake</h3>
      <p>
        Deciding IGST or CGST + SGST from the buyer’s address instead of the place of supply. For goods, the place of supply
        usually follows where the movement of goods ends, so enter that state code in the register and check the tax head
        against it.
      </p>
      <h3>Limitations</h3>
      <p>
        The checker does not cover credit and debit notes, amendments, exports, SEZ supplies, nil-rated or exempt supplies,
        advances or documents issued. It does not create the portal JSON. Confirm rates, thresholds and table-wise reporting
        rules on the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a> and{' '}
        <a href="https://tutorial.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST tutorials</a>.
      </p>
    </ToolPageLayout>
  );
}
