import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import InvoiceNumberGenerator from '@/components/tools/InvoiceNumberGenerator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Invoice Number Series Generator and Checker (GST Rule 46)',
  description:
    'Generate a GST invoice number series with prefix, financial year and zero padding within 16 characters, and check an existing list for duplicates, gaps and invalid characters.',
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
        Each number is put together as <strong>Prefix + Separator + Financial year + Separator + Running number</strong>.
        Any part you leave out is skipped. The financial year is worked out from the date you pick: dates from 1 April
        to 31 March belong to the same year, so 16 October 2026 falls in 2026-27.
      </p>
      <h3>Checks applied</h3>
      <ul>
        <li><strong>Length:</strong> at most 16 characters, including separators.</li>
        <li><strong>Characters:</strong> letters A–Z, digits 0–9, hyphen “-” and slash “/” only.</li>
        <li><strong>Uniqueness:</strong> no number repeats within the list (case is ignored, so INV/1 and inv/1 are treated as the same).</li>
        <li><strong>Gaps and order:</strong> for each series (the part before the running number), the checker lists missing numbers and numbers that go backwards.</li>
      </ul>

      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile trader wants invoice numbers like <code>MRB/26-27/0001</code>. That is 3 + 1 + 5 + 1 + 4 = 14
        characters, within the limit. Choosing the long year format (<code>MRB/2026-27/0001</code>, 16 characters) also
        fits, but adding a fifth padding digit would make it 17 and the tool will show an error.
      </p>

      <h3>Common mistakes</h3>
      <ul>
        <li>Using long prefixes like <code>SALESINV/2026-27/</code> that leave no room for the running number.</li>
        <li>Restarting the series in the middle of a financial year, which creates duplicate numbers.</li>
        <li>Typing spaces or underscores, which are not allowed characters.</li>
        <li>Numbering credit notes in the same series as invoices without a clear prefix, which makes gaps hard to explain.</li>
      </ul>
      <p>
        The E-Way Easy app numbers your invoices automatically in your own pre-set series, so you do not have to track
        the next number by hand.
      </p>
    </ToolPageLayout>
  );
}
