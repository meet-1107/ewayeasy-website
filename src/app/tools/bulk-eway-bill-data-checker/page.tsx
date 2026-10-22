import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import BulkEwbChecker from '@/components/tools/BulkEwbChecker';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Bulk E-Way Bill Data Checker — Find Errors Before Upload',
  description:
    'Check your bulk e-way bill sheet before upload: GSTINs, 180-day document age, duplicates, HSN, PIN, tax split, distance and vehicle numbers. Free, in-browser.',
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
        Bulk generation on the portal works through a JSON file prepared with the official Excel-based bulk generation tool,
        or through an API connection via a GSP or ERP. When a few rows in a large file are wrong, you lose time fixing and
        re-uploading. This checker runs common checks on each row first:
      </p>
      <ul>
        <li><strong>GSTINs:</strong> format and check digit for From and To GSTIN; URP is accepted for an unregistered recipient.</li>
        <li><strong>State codes and PINs:</strong> state code against the first two digits of the GSTIN; PIN must be 6 digits and not start with 0.</li>
        <li><strong>Document:</strong> valid date, not in the future and not older than 180 days from the generation date; no duplicate of the same document type, number and supplier GSTIN.</li>
        <li><strong>Goods and values:</strong> HSN of 4–8 digits, quantity and taxable value above zero, IGST for inter-state and CGST + SGST for intra-state, CGST equal to SGST, and total value within ₹1 of taxable value plus tax.</li>
        <li><strong>Transport:</strong> distance from 1 to 4,000 km, vehicle number or transporter ID for road movement (Part B), vehicle number pattern, and a 15-character transporter ID.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer prepares 120 invoices for the month-end dispatch. The checker shows that one invoice was
        dated 200 days earlier (cannot be used), two rows repeat the same invoice number, and a Gujarat-to-Gujarat row carries
        IGST. Fixing these in the sheet before preparing the JSON avoids rejected rows on the portal.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>One row per item instead of one row per invoice, which shows up as duplicate documents.</li>
        <li>Excel dropping the leading zero from state codes such as 07 or turning PINs and HSN codes into numbers.</li>
        <li>Leaving the vehicle number blank and forgetting to update Part B later — the e-way bill cannot be used for movement without it, except within the state up to 50 km to or from the transporter.</li>
      </ul>
      <p>
        For one-off invoices, the E-Way Easy app takes you from invoice to e-way bill on your phone. Learn more in the{' '}
        <Link href="/bulk-eway-bill-generation">bulk e-way bill generation guide</Link> and{' '}
        <Link href="/eway-bill-common-errors">common e-way bill errors</Link>.
      </p>
    </ToolPageLayout>
  );
}
