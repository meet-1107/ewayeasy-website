import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstinValidator from '@/components/tools/GstinValidator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GSTIN Validator: Check GST Number Format and Check Digit',
  description:
    'Check a GSTIN’s structure and check digit, and decode its state code, PAN, holder type and entity number. Bulk check up to 500 GSTINs and download a CSV.',
  path: '/tools/gstin-validator',
});

const faq: Faq[] = [
  {
    q: 'Does a “valid” result mean the GSTIN is active?',
    a: 'No. This tool only checks that the GSTIN is built correctly and that its last character matches the calculated check character. A cancelled or suspended GSTIN, or one that was never issued but happens to have a correct check character, can still pass. Use Search Taxpayer on the GST portal (gst.gov.in) to see the live status and legal name.',
  },
  {
    q: 'How does the check digit catch typos?',
    a: 'The 15th character is calculated from the first 14 using a mod-36 formula in which every character’s value is weighted by its position. If you mistype one character, the weighted total changes and the expected check character no longer matches. It also catches most cases where two neighbouring characters are swapped, because they carry different weights.',
  },
  {
    q: 'What does the 4th letter of the PAN tell me?',
    a: 'It shows the type of PAN holder: P for an individual, C for a company, H for a Hindu Undivided Family, F for a firm or LLP, A for an association of persons, T for a trust, B for a body of individuals, L for a local authority, J for an artificial juridical person and G for government.',
  },
  {
    q: 'Why does the 13th character change for the same business?',
    a: 'The 13th character is the entity number: how many registrations the same PAN holds in that state. The first registration is usually 1, the second 2, and so on (then letters after 9). So two branches of one business in the same state have different GSTINs.',
  },
  {
    q: 'Is the GSTIN I enter sent to any server?',
    a: 'No. All checks, including bulk checks and the CSV download, run in your browser.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gstin-validator"
      title="GSTIN Validator"
      description="Check a GSTIN’s format and check digit and decode each part. Paste one, or up to 500 for a bulk check with CSV download."
      tool={<GstinValidator />}
      faq={faq}
      related={['gst-state-code-list', 'gstr-1-checker', 'invoice-generator']}
      disclaimer={
        <p>
          This tool checks GSTIN structure and the check character only. It does not confirm registration, status or the
          holder’s identity. Verify on the{' '}
          <a className="underline" href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>{' '}
          using Search Taxpayer. E-Way Easy is not a government portal and is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How a GSTIN is built</h2>
      <p>
        A GSTIN (GST Identification Number) has 15 characters. Each part means something, which is why a format check
        can catch many errors before you put a wrong number on an invoice or e-way bill.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Characters</th><th>Part</th><th>What it contains</th></tr>
          </thead>
          <tbody>
            <tr><td>1–2</td><td>State code</td><td>The GST state code where the person is registered (for example 24 for Gujarat)</td></tr>
            <tr><td>3–12</td><td>PAN</td><td>The holder’s PAN: 5 letters, 4 digits, 1 letter. The 4th letter shows the holder type</td></tr>
            <tr><td>13</td><td>Entity number</td><td>1–9, then A–Z: the count of registrations under the same PAN in that state</td></tr>
            <tr><td>14</td><td>Default letter</td><td>“Z” for regular registrations</td></tr>
            <tr><td>15</td><td>Check character</td><td>Calculated from the first 14 characters</td></tr>
          </tbody>
        </table>
      </div>

      <h3>Check character formula</h3>
      <p>
        Each of the first 14 characters is given a value (0–9 for digits, 10–35 for A–Z). Values in odd positions are
        multiplied by 1 and in even positions by 2. Each product is split into quotient and remainder when divided by
        36, and both are added to a running total. The check character is the one whose value equals
        (36 − total mod 36) mod 36.
      </p>

      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer is given a buyer’s GSTIN over the phone and types{' '}
        <code>24ABCDE1234F1Z</code> followed by the last character. The tool reads 24 as Gujarat, ABCDE1234F as the PAN
        (its 4th letter, D, is not one of the standard holder-type letters, so it shows “Other”), 1 as the first registration
        and Z as the default letter. If the last character does not match the calculated check character, the tool
        tells you which character it expected, a strong sign that one character was misheard.
      </p>

      <h3>Common mistakes</h3>
      <ul>
        <li>Confusing the letter O with zero, or I with one, especially in the PAN part.</li>
        <li>Treating a “valid format” result as proof that the buyer is registered. Always check live status on the GST portal for new parties.</li>
        <li>Using a GSTIN from another state for the same business. The state code must match the registration that is actually supplying or receiving the goods.</li>
      </ul>

      <h2>Bulk check</h2>
      <p>
        Switch to Bulk to paste up to 500 GSTINs, one per line or as a column copied from Excel or a CSV file with a
        “GSTIN” header. Each row shows status, state, PAN and the reason for any error, and repeated GSTINs are flagged.
        Download the result as CSV to fix your customer master before filing returns.
      </p>
      <p>
        In the E-Way Easy app, entering a buyer’s GSTIN fills in the buyer name, address, state and PIN automatically,
        which avoids most typing errors in the first place.
      </p>
    </ToolPageLayout>
  );
}
