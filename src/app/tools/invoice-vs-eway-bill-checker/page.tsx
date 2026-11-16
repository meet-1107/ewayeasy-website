import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceEwbComparer from '@/components/tools/InvoiceEwbComparer';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Invoice vs E-Way Bill Checker: Spot Mismatches Early',
  description:
    'Compare invoice and e-way bill details side by side: document number, date, GSTINs, PINs, HSN, quantity, values and vehicle, and what each mismatch means.',
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
  {
    q: 'What if I find a Part A mistake after 24 hours?',
    a: 'After 24 hours the generator can no longer cancel it on the portal. The recipient may still reject it within 72 hours, or by delivery if that is earlier. Do not move goods on wrong details; check the current rules on the e-way bill portal and take advice.',
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
        The e-way bill must describe the same supply as the invoice that travels with the goods. During checks in transit,
        an officer compares the two. If the recipient, document number, value or vehicle differs, the goods may be treated as
        moving without a valid e-way bill, with detention and penalty possible under Section 129.
      </p>
      <h3>How the comparison works</h3>
      <ul>
        <li>Text is compared ignoring case and extra spaces; vehicle numbers also ignore hyphens.</li>
        <li>Dates can be typed as DD/MM/YYYY or YYYY-MM-DD.</li>
        <li>Optionally treat leading zeros in document numbers as the same (INV-007 and INV-7), shown as “Check”.</li>
        <li>Quantities and amounts are compared as numbers; the total allows ₹1 for rounding.</li>
      </ul>
      <p>
        You can type both sides in the form, or switch to “Paste two lines” and paste the invoice row and the e-way bill
        row from a spreadsheet. A header line is optional; without one, keep the columns in the order the tool shows.
      </p>

      <h2>How to read your result</h2>
      <p>
        Each field gets one of four results: match, check, mismatch or missing. A match needs no action, and a check is a
        format difference, such as leading zeros or a shorter HSN. A mismatch or a missing value needs action before the
        goods move, and the note next to it tells you what the difference can mean.
      </p>
      <p>
        Your next step depends on which part of the e-way bill holds the wrong detail. Use this rule:
      </p>
      <ul>
        <li><strong>If the vehicle number is wrong or missing</strong>, update Part B. You can do this any number of times while the e-way bill is valid.</li>
        <li><strong>If any other field is wrong</strong> (document number, date, GSTIN, PIN, HSN, value), it is Part A. Cancel within 24 hours and generate a new e-way bill.</li>
        <li><strong>If the invoice itself is wrong</strong>, fix the invoice first, then cancel and regenerate the e-way bill to match it.</li>
        <li><strong>If quantity differs</strong>, count the goods on the vehicle. Then correct whichever document is wrong before dispatch.</li>
        <li><strong>If the total differs by ₹1 or less</strong>, it is usually round-off. No action is needed if the invoice was rounded.</li>
      </ul>

      <h2>Worked examples</h2>
      <p>
        These two examples show the two main fixes: cancel and regenerate for a Part A error, and update Part B for a
        vehicle change. Both businesses are made up, and the GSTINs are sample values. Note how the same checker result
        leads to a different action depending on the field.
      </p>
      <h3>Example (illustrative): wrong recipient GSTIN</h3>
      <p>
        A Morbi tile trader&apos;s invoice is to a Pune buyer with GSTIN ending in Z2, but the e-way bill was typed with Z3.
        The tool marks recipient GSTIN as a mismatch. Because this is Part A, the trader cancels the e-way bill within 24 hours
        and generates a new one.
      </p>
      <p>
        A typo in the vehicle number, on the other hand, is fixed by updating Part B.
      </p>
      <h3>Example (illustrative): vehicle swapped at the gate</h3>
      <p>
        A Rajkot pump maker, GSTIN 24ABCDE1234F1Z5, generates an e-way bill with vehicle GJ03AB1234. At loading, the
        transporter sends a different truck.
      </p>
      <p>
        The checker shows every Part A field as a match and the vehicle number as a mismatch. The dispatch team updates
        Part B with the new truck number before it leaves. No cancellation is needed.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Most mismatches happen because someone types the same details twice: once into the billing software and once on
        the portal. Small slips such as a swapped digit or an old address then slip through. The checks below catch the
        ones that cause the most trouble at checkpoints.
      </p>
      <ul>
        <li>Using the order number or a proforma number on the e-way bill instead of the final invoice number.</li>
        <li>Picking the buyer’s billing PIN when goods are shipped to a different site.</li>
        <li>Entering taxable value where the e-way bill asks for total value, or the other way round.</li>
        <li>Generating the e-way bill before the invoice is final, then editing the invoice.</li>
        <li>Waiting more than 24 hours to check, after which a Part A error can no longer be cancelled.</li>
      </ul>

      <h2>What this checker does not do</h2>
      <p>
        This tool compares the values you type or paste. It does not fetch the e-way bill from the portal, does not verify
        GSTINs and does not check whether the e-way bill is still valid. It also compares one HSN and one quantity, so for
        multi-item invoices you check the main item or repeat the check per item.
      </p>
      <ul>
        <li>For GSTIN format and check digit, use the <Link href="/tools/gstin-validator">GSTIN validator</Link>.</li>
        <li>For a whole month of dispatches, use the <Link href="/tools/bulk-eway-bill-data-checker">bulk e-way bill data checker</Link>.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Check the invoice and e-way bill together before loading.</li>
        <li>Fix vehicle issues through Part B.</li>
        <li>Cancel and regenerate for any Part A mismatch, within 24 hours.</li>
        <li>Count the goods against the quantity on both documents.</li>
        <li>Keep the final invoice and e-way bill together with the driver.</li>
      </ul>

      <h3>Avoiding mismatches</h3>
      <p>
        Mismatches usually come from typing the same details twice. In the E-Way Easy app, the invoice and the e-way bill are
        created from the same data in one flow (Invoice → Review EWB → Generated), so the two stay consistent. See also{' '}
        <Link href="/eway-bill-correction">correcting an e-way bill</Link> and <Link href="/eway-bill-cancellation">cancellation rules</Link>.
      </p>
    </ToolPageLayout>
  );
}
