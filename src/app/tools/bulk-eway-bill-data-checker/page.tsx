import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import BulkEwbChecker from '@/components/tools/BulkEwbChecker';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Bulk E-Way Bill Data Checker — Find Errors Before Upload',
  description:
    'Check your bulk e-way bill sheet before upload: GSTINs, 180-day document age, duplicates, HSN, PIN, tax split, distance and vehicle numbers. Free.',
  path: '/tools/bulk-eway-bill-data-checker',
});

const faq: Faq[] = [
  {
    q: 'Does this tool generate e-way bills or the JSON file?',
    a: 'No. It only checks the rows in your sheet. To generate e-way bills in bulk, prepare the JSON with the official bulk generation tool from the e-way bill portal and upload it there, or send the data through your authorised GSP or ERP integration.',
  },
  {
    q: 'Can the E-Way Easy app generate e-way bills in bulk?',
    a: 'No. The E-Way Easy app works one invoice at a time: you create the invoice, review the e-way bill details and generate it from your phone. Use this checker when you prepare a bulk file for the portal.',
  },
  {
    q: 'Why is a document older than 180 days flagged as an error?',
    a: 'From 1 January 2025, as reported in GSTN advisories, an e-way bill cannot be generated for a base document dated more than 180 days before the generation date. Set the planned generation date above to check against the day you will actually upload.',
  },
  {
    q: 'What is the difference between an error and a warning?',
    a: 'Errors are things that will very likely be rejected or are clearly wrong, such as an invalid GSTIN, a bad PIN or a duplicate document. Warnings need a human look: an unusual vehicle number, missing Part B, or a value under ₹50,000 where an e-way bill may not be needed.',
  },
  {
    q: 'Is my data uploaded anywhere?',
    a: 'No. The file is read and checked in your browser. Nothing is sent to E-Way Easy or any server.',
  },
  {
    q: 'Can I upload an .xlsx file directly?',
    a: 'Not yet. Save the sheet as CSV from Excel (File → Save As → CSV), or select the cells including the header row and paste them into the box. Columns are matched by heading, so their order does not matter.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="bulk-eway-bill-data-checker"
      title="Bulk E-Way Bill Data Checker"
      description="Paste from Excel or upload a CSV and find the rows that will cause trouble — before you prepare the bulk upload file."
      tool={<BulkEwbChecker />}
      faq={faq}
      related={['invoice-vs-eway-bill-checker', 'gstin-validator', 'distance-calculator']}
      disclaimer={
        <p>
          This tool checks the format and consistency of data you enter. It does not generate e-way bills, does not create the
          portal JSON file, and does not confirm GSTIN registration status or whether an e-way bill is legally required. Check
          the current rules and use the official tools on the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a>{' '}
          and its <a className="underline" href="https://docs.ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">user documentation</a>.
          E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>What this checker looks at</h2>
      <p>
        A bulk e-way bill data checker reads your dispatch sheet row by row and flags data the portal is likely to reject.
        Bulk generation on the portal works through a JSON file made with the official Excel-based bulk generation tool, or
        through a GSP or ERP API. Fixing rows here first saves you a failed upload.
      </p>
      <ul>
        <li><strong>GSTINs:</strong> format and check digit for From and To GSTIN; URP is accepted for an unregistered recipient.</li>
        <li><strong>State codes and PINs:</strong> state code against the first two digits of the GSTIN; PIN must be 6 digits and not start with 0.</li>
        <li><strong>Document:</strong> valid date, not in the future and not older than 180 days from the generation date; no duplicate of the same document type, number and supplier GSTIN.</li>
        <li><strong>Goods and values:</strong> HSN of 4–8 digits, quantity and taxable value above zero, IGST for inter-state and CGST + SGST for intra-state, CGST equal to SGST, and total value within ₹1 of taxable value plus tax.</li>
        <li><strong>Transport:</strong> distance from 1 to 4,000 km, vehicle number or transporter ID for road movement (Part B), vehicle number pattern, and a 15-character transporter ID.</li>
      </ul>
      <p>
        It also flags document numbers longer than 16 characters or with characters other than letters, digits, “/” and
        “-”. If a required column such as Document date or Distance is missing, you see that before any row is checked.
      </p>

      <h2>How to read your result</h2>
      <p>
        Every row gets one status: OK, warning or error. The fix list groups the same problem across rows, so you can
        correct one cause once instead of hunting line by line, using line numbers that match your spreadsheet (header =
        line 1). Fix every error first, then decide on each warning.
      </p>
      <ul>
        <li><strong>If a row shows an error</strong>, fix it in your source sheet. Do not prepare the JSON until the error count is zero.</li>
        <li><strong>If you see “Duplicate document”</strong> on several lines, they are probably items of one invoice. Combine them into one row per document.</li>
        <li><strong>If a document is close to the 180-day limit</strong> (a warning appears in the last 10 days), generate that e-way bill first.</li>
        <li><strong>If you see “Value ₹50,000 or less”</strong>, check whether you need an e-way bill at all with the{' '}
          <Link href="/tools/eway-bill-eligibility-checker">e-way bill eligibility checker</Link>. Some movements, such as inter-state job work, need one at any value.</li>
        <li><strong>If “Total more than taxable value + tax” appears</strong>, it is fine when cess or other charges are included. Otherwise recheck the tax columns.</li>
        <li><strong>If “Transporter must add vehicle later” appears</strong>, tell the transporter. The e-way bill is not valid for movement until Part B is filled.</li>
      </ul>
      <p>
        Use “Download annotated CSV” to get your rows back with Status, Errors and Warnings columns. Filter it in Excel and
        hand the right rows to the right person.
      </p>

      <h2>Worked examples</h2>
      <p>
        Most bulk files fail on a handful of repeat problems, not on hundreds of different ones. The two examples below
        show a typical manufacturer file and a distributor file with mixed inter-state and intra-state rows. Both are
        illustrative; the businesses and GSTINs are made up.
      </p>
      <h3>Example (illustrative): month-end dispatch</h3>
      <p>
        A Rajkot pipe manufacturer prepares 120 invoices for the month-end dispatch. The checker shows that one invoice was
        dated 200 days earlier (cannot be used), two rows repeat the same invoice number, and a Gujarat-to-Gujarat row carries
        IGST. Fixing these in the sheet before preparing the JSON avoids rejected rows on the portal.
      </p>
      <h3>Example (illustrative): state code drift</h3>
      <p>
        A Vadodara distributor with GSTIN 24ABCDE1234F1Z5 exports a sheet where Excel turned the Delhi state code “07” into
        “7”. The checker pads it back to 07, so that row passes. Another row shows a From state code of 27 against the
        Gujarat GSTIN, which raises a mismatch warning.
      </p>
      <p>
        That row came from a copy-paste of a Maharashtra buyer’s address into the supplier columns. One correction fixes both
        the state code and the tax split error on the same line.
      </p>

      <h2>Common mistakes</h2>
      <p>
        The most common bulk file mistakes come from how the sheet was built, not from bad invoices. Item-level exports,
        Excel auto-formatting and blank transport columns cause most of the flags. Check your export settings once and the
        same errors stop coming back every month.
      </p>
      <ul>
        <li>One row per item instead of one row per invoice, which shows up as duplicate documents.</li>
        <li>Excel dropping the leading zero from state codes such as 07 or turning PINs and HSN codes into numbers.</li>
        <li>Leaving the vehicle number blank and forgetting to update Part B later — the e-way bill cannot be used for movement without it, except within the state up to 50 km to or from the transporter.</li>
        <li>Long ERP invoice numbers, such as a branch prefix plus a year, that go past 16 characters.</li>
        <li>Rail, air or ship rows with a vehicle number instead of the transport document number and date.</li>
        <li>Entering a distance above 100 km for movement within the same PIN code.</li>
      </ul>

      <h2>What this checker does not do</h2>
      <p>
        This tool checks format and internal consistency only. It cannot see the GST or e-way bill portal, so it cannot
        confirm that a GSTIN is active, that a transporter ID is enrolled or that your distance matches the portal’s PIN to
        PIN figure. A clean result means fewer surprises, not a guaranteed upload.
      </p>
      <ul>
        <li>It does not check HSN codes against the official list, only their length.</li>
        <li>It does not check whether the tax rate is correct for the goods.</li>
        <li>It does not read .xlsx files; save as CSV or paste the cells.</li>
        <li>It does not check the 10% distance margin, because it does not know the portal’s calculated distance. Use the{' '}
          <Link href="/tools/distance-calculator">distance and validity calculator</Link> for single routes.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Export one row per document, with the header row.</li>
        <li>Format PIN, HSN and state code columns as text before you paste.</li>
        <li>Set the planned generation date to the day you will upload.</li>
        <li>Clear every error, then review each warning.</li>
        <li>Download the annotated CSV and keep it with the upload file.</li>
      </ul>
      <p>
        For one-off invoices, the E-Way Easy app takes you from invoice to e-way bill on your phone. Learn more in the{' '}
        <Link href="/bulk-eway-bill-generation">bulk e-way bill generation guide</Link> and{' '}
        <Link href="/eway-bill-common-errors">common e-way bill errors</Link>.
      </p>
    </ToolPageLayout>
  );
}
