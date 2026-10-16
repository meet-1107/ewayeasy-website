import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceEwbComparer from '@/components/tools/InvoiceEwbComparer';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Invoice vs E-Way Bill Checker — Spot Mismatches Before Dispatch',
  description:
    'Compare invoice and e-way bill details side by side: document number, date, GSTINs, PINs, HSN, quantity, values and vehicle number, with what each mismatch means.',
  path: '/tools/invoice-vs-eway-bill-checker',
});

const faq: Faq[] = [
  {
    q: 'What should I do if a Part A detail on the e-way bill is wrong?',
    a: 'An e-way bill cannot be edited. If Part A details such as the GSTIN, document number, value or delivery PIN are wrong, cancel it within 24 hours of generation (if it has not been verified in transit) and generate a new one with the correct details.',
  },
  {
    q: 'What if only the vehicle number is wrong?',
    a: 'Vehicle details are in Part B, which can be updated any number of times during the validity of the e-way bill. Update the vehicle number before the goods move further.',
  },
  {
    q: 'Does a small difference in the total value matter?',
    a: 'A difference of up to ₹1 is usually rounding. Larger differences in taxable value or total value should be corrected, because the e-way bill value should match the invoice.',
  },
  {
    q: 'Is HSN at 4 digits on one and 8 digits on the other a mismatch?',
    a: 'The tool marks it as "Check" rather than a mismatch when one code is the start of the other. The number of HSN digits you must report depends on your turnover and the current notification, so check the requirement and keep both documents consistent.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="invoice-vs-eway-bill-checker"
      title="Invoice vs E-Way Bill Checker"
      description="Enter the invoice and the e-way bill details side by side to catch mismatches before the goods leave."
      tool={<InvoiceEwbComparer />}
      faq={faq}
      related={['bulk-eway-bill-data-checker', 'gstin-validator', 'sales-invoice-generator']}
      disclaimer={
        <p>
          This tool compares the values you enter. It does not fetch data from the e-way bill portal and does not decide
          whether a difference will lead to detention or penalty. Check the current rules on the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a> and{' '}
          <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a>. E-Way Easy is not
          affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>Why invoice and e-way bill details must match</h2>
      <p>
        During verification in transit, the officer checks the goods and the documents carried with them — the invoice, bill
        of supply or delivery challan, and the e-way bill. If the e-way bill shows a different recipient, document number,
        value or vehicle, the goods may be treated as moving without a valid e-way bill. Detention and penalty under Section
        129 are possible, so it is worth checking before dispatch.
      </p>
      <h3>How the comparison works</h3>
      <ul>
        <li>Text is compared ignoring case and extra spaces; vehicle numbers also ignore hyphens.</li>
        <li>Dates can be typed as DD/MM/YYYY or YYYY-MM-DD.</li>
        <li>Optionally treat leading zeros in document numbers as the same (INV-007 and INV-7), shown as “Check”.</li>
        <li>Quantities and amounts are compared as numbers; the total allows ₹1 for rounding.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile trader&apos;s invoice is to a Pune buyer with GSTIN ending in Z2, but the e-way bill was typed with Z3.
        The tool marks recipient GSTIN as a mismatch. Because this is Part A, the trader cancels the e-way bill within 24 hours
        and generates a new one. A typo in the vehicle number, on the other hand, is fixed by updating Part B.
      </p>
      <h3>Avoiding mismatches</h3>
      <p>
        Mismatches usually come from typing the same details twice. In the E-Way Easy app, the invoice and the e-way bill are
        created from the same data in one flow (Invoice → Review EWB → Generated), so the two stay consistent. See also{' '}
        <Link href="/eway-bill-correction">correcting an e-way bill</Link> and <Link href="/eway-bill-cancellation">cancellation rules</Link>.
      </p>
    </ToolPageLayout>
  );
}
