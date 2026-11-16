import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceNumberGenerator from '@/components/tools/InvoiceNumberGenerator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Invoice Number Series Generator and Checker (GST Rule 46)',
  description:
    'Generate a GST invoice number series with prefix, financial year and padding within 16 characters, then check a list for duplicates, gaps and errors.',
  path: '/tools/invoice-number-generator',
});

const faq: Faq[] = [
  {
    q: 'What are the rules for a GST invoice number?',
    a: 'Under Rule 46 of the CGST Rules, as commonly understood, a tax invoice must carry a consecutive serial number of up to 16 characters, in one or more series, using letters, digits, hyphen (-) and slash (/), and unique for a financial year. Check the current rule text on CBIC for your case.',
  },
  {
    q: 'Can I run more than one series?',
    a: 'Yes. Many businesses use separate series for each branch, counter or document type (for example INV for tax invoices and CN for credit notes). Each series must still be consecutive and every number must be unique within the financial year.',
  },
  {
    q: 'Should the number restart every April?',
    a: 'Restarting from 1 each financial year is common practice and keeps numbers short. Including the year, such as 26-27, in the number makes it clear which year an invoice belongs to and avoids repeating a number from an earlier year.',
  },
  {
    q: 'Is a gap in the series always a problem?',
    a: 'Not always. A number may be skipped when an invoice is cancelled. Keep the cancelled invoice or a note of why the number was not used, because missing numbers are a common question in audits and when reporting documents issued in GSTR-1.',
  },
  {
    q: 'Are spaces or underscores allowed?',
    a: 'No. Only letters, digits, hyphen and slash are allowed. Spaces, underscores, dots and # are not in the allowed set, so remove them before using a number on an invoice or in a GST upload.',
  },
  {
    q: 'How many zeros should I pad the running number with?',
    a: 'Pad enough to cover your busiest year, so numbers sort correctly in Excel. Four digits (0001) covers up to 9,999 invoices in a series; if you could pass that, use five and keep the prefix short so you stay within 16 characters.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="invoice-number-generator"
      title="Invoice Number Series Generator"
      description="Build an invoice number series by financial year that stays within 16 characters, or paste an existing list to find duplicates, gaps and invalid numbers."
      tool={<InvoiceNumberGenerator />}
      faq={faq}
      related={['sales-invoice-generator', 'invoice-generator', 'gstr-1-checker']}
    >
      <h2>How the series is built</h2>
      <p>
        An invoice number series is a running sequence of unique numbers you give your invoices, such as MRB/26-27/0001.
        This tool builds each one as <strong>Prefix + Separator + Financial year + Separator + Running number</strong> and
        skips any part you leave out. The year comes from your date: 1 April to 31 March is one financial year.
      </p>
      <p>
        So 16 October 2026 falls in 2026-27, shown as “26-27” in the short style or “2026-27” in the long style. You can
        generate up to 500 numbers at a time.
      </p>
      <h3>Checks applied</h3>
      <ul>
        <li><strong>Length:</strong> at most 16 characters, including separators.</li>
        <li><strong>Characters:</strong> letters A–Z, digits 0–9, hyphen “-” and slash “/” only.</li>
        <li><strong>Uniqueness:</strong> no number repeats within the list (case is ignored, so INV/1 and inv/1 are treated as the same).</li>
        <li><strong>Gaps and order:</strong> for each series (the part before the running number), the checker lists missing numbers and numbers that go backwards.</li>
      </ul>

      <h2>How to read the checker result</h2>
      <p>
        Paste one invoice number per line, for example straight from a column in your sales register. The checker marks
        each line as fine or lists its issues, then shows gaps and out-of-order numbers for each series. Read duplicates
        first, because they are the hardest to explain later, then work through gaps.
      </p>
      <ul>
        <li><strong>If a number shows “Duplicate of line …”</strong>, two invoices share a number. Find both and correct the later one in your books.</li>
        <li><strong>If the checker lists a gap</strong>, find out why. A cancelled invoice is a fine reason, as long as you keep a record of it.</li>
        <li><strong>If a number is “Out of order”</strong>, an invoice was numbered after a later one. Check the dates, as it may be a typo or a back-dated invoice.</li>
        <li><strong>If it says “No running number at the end”</strong>, the number ends in letters. The checker cannot test it for gaps, so check it by hand.</li>
        <li><strong>If you see “Not allowed”</strong>, the number has a space, underscore or other character outside the allowed set.</li>
      </ul>
      <p>
        Because each prefix and year counts as its own series, INV/26-27/… and CN/26-27/… are checked separately. Mixing
        them in one paste is fine.
      </p>

      <h2>Worked examples</h2>
      <p>
        The two examples below show the 16-character limit in action and a typical checker result on a real-looking list.
        Both are illustrative, with made-up businesses and numbers. Count every character, including slashes and hyphens,
        because the 16-character limit includes all separators.
      </p>
      <h3>Example (illustrative): fitting the length limit</h3>
      <p>
        A Morbi tile trader wants invoice numbers like <code>MRB/26-27/0001</code>. That is 3 + 1 + 5 + 1 + 4 = 14
        characters, within the limit. Choosing the long year format (<code>MRB/2026-27/0001</code>, 16 characters) also
        fits, but adding a fifth padding digit would make it 17 and the tool will show an error.
      </p>
      <h3>Example (illustrative): two counters, one GSTIN</h3>
      <p>
        A Rajkot hardware shop, GSTIN 24ABCDE1234F1Z5, bills from two counters using <code>A/26-27/</code> and{' '}
        <code>B/26-27/</code>. It pastes 300 numbers from its register.
      </p>
      <p>
        The checker finds B/26-27/0142 twice and gaps at A/26-27/0088 and 0090. It also flags <code>A/26-27 /0090</code>{' '}
        for its space, which is why 0090 looked missing.
      </p>
      <p>
        The 0088 gap is a cancelled invoice. The duplicate is a real error the shop fixes before filing GSTR-1.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Invoice numbering goes wrong when the series is designed in a hurry and then patched mid-year. A prefix that is too
        long, a restart in October or a new branch reusing old numbers all cause duplicates. Plan the format once, before 1
        April, and it will run all year without changes.
      </p>
      <ul>
        <li>Using long prefixes like <code>SALESINV/2026-27/</code> that leave no room for the running number.</li>
        <li>Restarting the series in the middle of a financial year, which creates duplicate numbers.</li>
        <li>Typing spaces or underscores, which are not allowed characters.</li>
        <li>Numbering credit notes in the same series as invoices without a clear prefix, which makes gaps hard to explain.</li>
        <li>Letting Excel strip leading zeros, so 0001 becomes 1 and sorting breaks.</li>
        <li>Two branches under one GSTIN using the same series without separate prefixes.</li>
      </ul>

      <h2>What this tool does not check</h2>
      <p>
        This tool checks format, uniqueness and order inside the list you give it. It cannot see numbers you used outside
        that list, such as in another branch’s software or last year’s register. It also does not check invoice dates,
        so a number in the right order with a wrong date will still pass.
      </p>
      <ul>
        <li>It checks up to 5,000 lines at a time.</li>
        <li>It treats each prefix and year as a separate series; it does not know which series belong together.</li>
        <li>It does not decide whether a gap is acceptable. That needs your records.</li>
      </ul>
      <p>
        To check dates, GSTINs and tax on the same invoices, run your sales register through the{' '}
        <Link href="/tools/gstr-1-checker">GSTR-1 checker</Link>. For the other fields an invoice must carry, see the{' '}
        <Link href="/gst-invoice-rules">GST invoice rules guide</Link>.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Pick a short prefix for each branch or document type.</li>
        <li>Add the financial year and pad the running number.</li>
        <li>Confirm the longest number stays within 16 characters.</li>
        <li>Restart only on 1 April, never mid-year.</li>
        <li>Check the full list for duplicates and gaps before filing.</li>
      </ul>
      <p>
        The E-Way Easy app numbers your invoices automatically in your own pre-set series, so you do not have to track
        the next number by hand. You can also build invoices on the web with the free{' '}
        <Link href="/invoice-generator">invoice generator</Link>.
      </p>
    </ToolPageLayout>
  );
}
