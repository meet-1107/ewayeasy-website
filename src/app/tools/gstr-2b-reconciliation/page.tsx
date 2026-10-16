import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import Gstr2bReconciliation from '@/components/tools/Gstr2bReconciliation';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GSTR-2B Reconciliation with Purchase Register (Free)',
  description:
    'Match your purchase register with GSTR-2B by supplier GSTIN and invoice number. See matched, value mismatches, missing invoices and possible matches.',
  path: '/tools/gstr-2b-reconciliation',
});

const faq: Faq[] = [
  {
    q: 'How are invoices matched?',
    a: 'By supplier GSTIN plus invoice number. Invoice numbers are compared without case and spaces, and you can choose to ignore leading zeros and the "/" and "-" separators. Rows with the same GSTIN and invoice number are added together, so multi-rate invoices match as one.',
  },
  {
    q: 'What is a “possible match”?',
    a: 'An invoice in your books and one in GSTR-2B from the same supplier with the same taxable value and tax (within your tolerance) but a different invoice number. Usually it is a typo in the invoice number on one side. Confirm it against the supplier’s invoice.',
  },
  {
    q: 'If an invoice is matched, can I claim the credit?',
    a: 'Not automatically. A match shows that the supplier reported the invoice. Eligibility also depends on the conditions in Section 16 of the CGST Act and on blocked credits under Section 17(5). Check with your tax adviser.',
  },
  {
    q: 'Can I upload the GSTR-2B Excel file directly?',
    a: 'Open the downloaded GSTR-2B Excel, go to the B2B sheet, and copy the rows from the header row down, then paste here. You can also save that sheet as CSV and upload it. The file never leaves your browser.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gstr-2b-reconciliation"
      title="Purchase Register vs GSTR-2B Reconciliation"
      description="Paste your purchase register and the GSTR-2B B2B sheet to see what matches, what differs and what is missing on either side."
      tool={<Gstr2bReconciliation />}
      faq={faq}
      related={['gstin-validator', 'gstr-1-vs-gstr-3b-reconciliation', 'gstr-1-checker', 'gst-interest-calculator']}
    >
      <h2>How to read the results</h2>
      <ul>
        <li><strong>Matched:</strong> same supplier GSTIN and invoice number, with taxable value and each tax head within the tolerance.</li>
        <li><strong>Value mismatch:</strong> the invoice is in both, but amounts differ. The difference is shown as GSTR-2B minus books.</li>
        <li><strong>In books, not in 2B:</strong> the supplier may not have reported it yet, may have reported it under another GSTIN or period, or the invoice number differs.</li>
        <li><strong>In 2B, not in books:</strong> an invoice the supplier reported that is not in your purchase register (missed entry, a later month, or not your purchase).</li>
        <li><strong>Possible match:</strong> same supplier and amount, different invoice number. Usually a typing difference.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer records invoice “SG/0045” from a glaze supplier; GSTR-2B shows it as “SG/45”. With “ignore
        leading zeros” on, it matches. Another invoice shows IGST ₹7,200 in the books but ₹6,800 in GSTR-2B, so it appears as
        a value mismatch of −₹400 to follow up with the supplier.
      </p>
      <h3>Common mistake</h3>
      <p>
        Treating every matched invoice as eligible credit. GSTR-2B shows what suppliers reported; it does not decide whether
        the credit is blocked, whether goods were received, or whether the time limit has passed.
      </p>
      <h3>Limitations</h3>
      <p>
        Only the B2B invoice sheet is compared. Credit/debit notes, amendments, ISD credits and imports are not covered. Use
        the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a> for the official
        GSTR-2B statement.
      </p>
    </ToolPageLayout>
  );
}
