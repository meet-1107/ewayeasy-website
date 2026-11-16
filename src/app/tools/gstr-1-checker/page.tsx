import Link from 'next/link';
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
  {
    q: 'How many rows can I check at once?',
    a: 'Up to 5,000 rows in one go. If your register is larger, split it into parts, for example by branch or by fortnight, and check each part with the same tax period.',
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
        A GSTR-1 checker tests your sales register for the data errors that force corrections after filing. Most trace
        back to a mistyped GSTIN, an invoice number used twice, tax under the wrong head or an invoice from another month.
        This tool checks every row for those, then totals the clean data the way GSTR-1 asks for it.
      </p>
      <ul>
        <li><strong>Recipient GSTIN:</strong> 15-character format, state code and check character (format only, not live registration status).</li>
        <li><strong>Invoice number:</strong> up to 16 characters using letters, digits, hyphen and slash; repeated numbers in the period.</li>
        <li><strong>Date:</strong> valid date inside the tax period you select.</li>
        <li><strong>Tax head:</strong> IGST for inter-state supplies, CGST + SGST for intra-state supplies, based on place of supply versus your state.</li>
        <li><strong>Tax amount:</strong> tax ≈ taxable value × rate, within ₹1, and CGST equal to SGST.</li>
        <li><strong>HSN and UQC:</strong> present, 4/6/8-digit HSN, and a unit wherever a quantity is given.</li>
      </ul>
      <p>
        The register must have at least Invoice No, Invoice Date, Place of Supply, Invoice Value, Taxable Value and Rate.
        Common heading variants such as “Bill No” or “POS” are recognised, so you rarely need to rename columns.
      </p>

      <h2>How to read your result</h2>
      <p>
        You get a status for every row, then three summaries: section-wise (B2B, B2CL, B2CS), rate-wise and HSN-wise.
        Errors mean the row is wrong or will be rejected; warnings mean it needs a second look. Clear the errors before
        you trust any total, because a wrong row also distorts every summary it feeds.
      </p>
      <ul>
        <li><strong>If you see “Duplicate invoice number … different date or recipient”</strong>, one of the entries is wrong. Fix it in your books, not just in the sheet.</li>
        <li><strong>If you see “Possible duplicate entry”</strong>, the same invoice, rate and HSN appear twice. Delete one if it was entered twice.</li>
        <li><strong>If the date is outside the tax period</strong>, either the date is wrong or the invoice belongs to another month’s return.</li>
        <li><strong>If the tax does not match taxable × rate</strong>, check the rate first, then rounding on line items.</li>
        <li><strong>If a B2C sale lands in B2CL</strong>, it is inter-state and above the threshold. It needs invoice-level reporting, so check the place of supply is right.</li>
      </ul>
      <p>
        Use “Download results CSV” to get every row with its section and issues. Compare the section totals with your
        accounting software before you upload or type anything on the portal.
      </p>

      <h2>Worked examples</h2>
      <p>
        These examples show how the checker sorts a mixed register and what a common rounding problem looks like. Both are
        illustrative: the businesses, GSTINs and invoices are made up. The B2CL threshold in them is the tool’s default,
        which you should confirm on the GST portal.
      </p>
      <h3>Example (illustrative): sorting a mixed register</h3>
      <p>
        A Rajkot tile trader registered in Gujarat (state code 24) loads September’s register. An invoice to a registered
        buyer in Maharashtra goes to B2B with IGST. A ₹1,77,000 invoice to an unregistered buyer in Rajasthan is inter-state
        and above the threshold entered, so it is shown as B2CL.
      </p>
      <p>
        A ₹10,500 walk-in sale within Gujarat is B2CS. One row shows CGST ₹180 and SGST ₹175, which the checker flags
        because the two halves should be equal.
      </p>
      <h3>Example (illustrative): line-level rounding</h3>
      <p>
        A Surat saree wholesaler, GSTIN 24ABCDE1234F1Z5, exports a register where each invoice line is rounded to the
        rupee before tax is added up. On a multi-line invoice, the 5% tax comes out ₹3 higher than taxable × rate.
      </p>
      <p>
        The checker flags it because the gap is above ₹1. The fix is in the billing software: calculate tax on the line
        values and round once, so books, invoice and GSTR-1 agree.
      </p>

      <h2>Common mistakes</h2>
      <p>
        The most frequent GSTR-1 errors come from how sales are recorded, not from the return itself. Wrong place of
        supply, typed GSTINs and invoice series that restart cause most corrections. Each mistake below is easy to spot
        here and much harder to fix after filing, when amendments are the only route.
      </p>
      <ul>
        <li>Deciding IGST or CGST + SGST from the buyer’s address instead of the place of supply. For goods, the place of supply usually follows where the movement of goods ends.</li>
        <li>Typing a buyer’s GSTIN by hand on each invoice instead of saving it once in a customer master.</li>
        <li>Restarting the invoice series mid-year or using the same number in two branches under one GSTIN.</li>
        <li>Leaving HSN blank on small sales, which leaves gaps in the HSN summary.</li>
        <li>Entering quantity without a unit, so the HSN summary cannot add it up.</li>
      </ul>

      <h2>Limitations</h2>
      <p>
        The checker covers regular B2B and B2C tax invoices for one tax period. It does not cover credit and debit notes,
        amendments, exports, SEZ supplies, nil-rated or exempt supplies, advances or documents issued. It does not create
        the portal JSON or check live GSTIN status, so treat it as a pre-filing review.
      </p>
      <p>
        Confirm rates, thresholds and table-wise reporting rules on the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a> and{' '}
        <a href="https://tutorial.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST tutorials</a>.
      </p>

      <h2>When to use a related tool</h2>
      <p>
        GSTR-1 is one half of the monthly picture. Once your sales are clean, check that the tax you report matches the tax
        you pay in GSTR-3B. For single GSTINs or codes that keep failing, a dedicated checker gives you more detail than
        the row message here.
      </p>
      <ul>
        <li>Compare outward tax across returns with the <Link href="/tools/gstr-1-vs-gstr-3b-reconciliation">GSTR-1 vs GSTR-3B reconciliation tool</Link>.</li>
        <li>Check a single buyer’s GSTIN with the <Link href="/tools/gstin-validator">GSTIN validator</Link>.</li>
        <li>Find the right code for an item with the <Link href="/tools/hsn-code-lookup">HSN code lookup</Link>.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Select your state and the right tax period.</li>
        <li>Confirm the B2CL threshold on the GST portal.</li>
        <li>Clear every error, then review each warning.</li>
        <li>Match section totals with your books.</li>
        <li>Fix errors in your billing software, not only in the sheet.</li>
      </ul>
    </ToolPageLayout>
  );
}
