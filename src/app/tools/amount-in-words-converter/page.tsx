import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import AmountInWordsConverter from '@/components/tools/AmountInWordsConverter';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Amount in Words Converter (Rupees, Lakh, Crore)',
  description:
    'Convert any rupee amount to words in lakh and crore for invoices and cheques, with paise, “Rupees” or “INR”, and the million/billion version too.',
  path: '/tools/amount-in-words-converter',
});

const faq: Faq[] = [
  {
    q: 'How are paise written in words?',
    a: 'The rupee part and the paise part are written separately and joined with “and”, for example ₹1,250.75 becomes “Rupees One Thousand Two Hundred Fifty and Seventy Five Paise Only”. If there are no paise, the paise part is left out.',
  },
  {
    q: 'Should I use “Rupees” or “INR”?',
    a: 'Both are commonly used. “Rupees … Only” is the usual style on Indian invoices and cheques; “INR … Only” is often preferred on export documents and for overseas buyers. Pick one and use it consistently.',
  },
  {
    q: 'What is the difference between the Indian and international systems?',
    a: 'The Indian system groups digits as thousand, lakh (1,00,000) and crore (1,00,00,000). The international system uses thousand, million (10,00,000) and billion (100,00,00,000). So ₹10,00,00,000 is “Ten Crore” or “One Hundred Million”.',
  },
  {
    q: 'Why write “Only” at the end?',
    a: 'It marks the end of the amount so that nothing can be added after it. That is why it is standard on cheques and invoices, and why this tool always adds it.',
  },
  {
    q: 'Is “One Hundred Twenty” or “One Hundred and Twenty” correct?',
    a: 'Both are readable and both are used in India. This tool writes “One Hundred Twenty” and keeps “and” only before the paise, so the rupee and paise parts stay clearly separate. Whatever style you use, keep it the same across your documents.',
  },
  {
    q: 'How do I write ₹100 crore or more in words?',
    a: 'The tool keeps counting in crore, so ₹1,00,00,00,000 becomes “One Hundred Crore” and ₹1,000 crore becomes “One Thousand Crore”. It does not use older words like “arab”, which most buyers and banks no longer expect.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="amount-in-words-converter"
      title="Amount in Words Converter"
      description="Type an amount and get it in words in the Indian system (lakh, crore), with paise, ready to paste into an invoice or cheque."
      tool={<AmountInWordsConverter />}
      faq={faq}
      related={['invoice-generator', 'gst-calculator', 'quotation-generator']}
      disclaimer={
        <p>
          This tool converts numbers to words only. Check the final amount against your invoice or cheque before
          using it. E-Way Easy is not a government portal and is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>How the conversion works</h2>
      <p>
        An amount in words is the written form of a figure, such as “Rupees Five Thousand Only” for ₹5,000. This tool
        splits your amount into rupees and paise without floating-point rounding. It then groups the rupee part from the
        right in the Indian system and writes each group in words, ending with “Only”.
      </p>
      <h3>Indian grouping</h3>
      <ul>
        <li><strong>Crore</strong> = 1,00,00,000 (ten million)</li>
        <li><strong>Lakh</strong> = 1,00,000 (one hundred thousand)</li>
        <li><strong>Thousand</strong> = 1,000</li>
        <li><strong>Hundreds, tens and ones</strong> for the last three digits</li>
      </ul>
      <p>
        Words = (crore part) Crore + (lakh part) Lakh + (thousand part) Thousand + (last three digits) + “and (paise)
        Paise”, followed by “Only”. Parts that are zero are skipped.
      </p>

      <h2>How to read your result</h2>
      <p>
        You get two lines, and the top one is the Indian system (lakh, crore), which most Indian invoices and cheques use.
        The second line is the international system (million, billion) for overseas buyers. Copy the line that matches
        the rest of your document, and paste it next to the invoice total.
      </p>
      <ul>
        <li><strong>If the buyer is in India</strong>, copy the Indian line with “Rupees … Only”.</li>
        <li><strong>If it is an export invoice or a foreign buyer</strong>, switch to “INR … Only” and consider the international line.</li>
        <li><strong>If you are writing a cheque</strong>, check whether the cheque already prints “Rupees”. If it does, leave that word out when you copy.</li>
        <li><strong>If you see “Enter a valid amount”</strong>, you typed letters or more than two decimals. Remove them and try again.</li>
      </ul>
      <p>
        UPPER CASE is handy for cheques and printed forms where neat capitals are easier to read. Title Case suits most
        invoices. The words are identical either way.
      </p>

      <h2>Worked examples</h2>
      <p>
        The safest way to check any amount in words is to read it back as a number. Split the figure into crore, lakh,
        thousand and the last three digits, then match each part to the words. The two examples below show a normal
        invoice total and one with empty groups in the middle.
      </p>
      <h3>Example (illustrative): an invoice total with paise</h3>
      <p>
        A Surat textile wholesaler raises an invoice for ₹12,34,567.80. Split into 12 lakh, 34 thousand and 567, it reads:
        “Rupees Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven and Eighty Paise Only”. In the international
        system the same amount is “One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven and Eighty
        Paise”.
      </p>
      <h3>Example (illustrative): an amount with empty groups</h3>
      <p>
        A Pune machine builder bills ₹1,05,00,000.05 for a press. The thousand and hundred groups are zero, so they drop
        out. The words read “Rupees One Crore Five Lakh and Five Paise Only”.
      </p>
      <p>
        In the international system it becomes “Ten Million Five Hundred Thousand and Five Paise”. Notice how “five
        paise” is easy to misread as fifty. Read it back slowly before you send it.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Most amount-in-words errors are not spelling errors. They come from converting the wrong figure, such as the
        value before GST or before round-off. A buyer or bank that sees words and figures that do not match will often
        send the document back, so check which total you are converting first.
      </p>
      <ul>
        <li>Writing the words for the taxable value instead of the invoice total after GST and round-off.</li>
        <li>Rounding the figure to ₹12,34,568 but leaving “and Eighty Paise” in the words.</li>
        <li>Mixing systems, such as “Twelve Lakh Thirty Four Thousand” in one place and “1.23 million” in another on the same document.</li>
        <li>Forgetting the paise part, so the words do not match the figure.</li>
        <li>Writing “Rupees Rupees” on a cheque that already prints the word.</li>
        <li>Copying the words once into an invoice template and not updating them when the total changes.</li>
      </ul>

      <h2>Limits of this tool</h2>
      <p>
        This converter turns a number into words and nothing more. It does not see your invoice, so it cannot tell you
        whether the figure you typed is the right total. It also has a few deliberate limits on size, sign and currency
        that you should know before you rely on it.
      </p>
      <ul>
        <li><strong>Size:</strong> amounts up to ₹9,99,99,99,99,999.99 are supported. Larger figures show an error.</li>
        <li><strong>Negative amounts:</strong> not accepted. For a credit note, enter the positive amount and let the document title say it is a credit note.</li>
        <li><strong>Currency:</strong> the words always use rupees and paise. It does not write dollars and cents for a foreign-currency invoice.</li>
        <li><strong>Decimals:</strong> only two decimal places (paise). It will not round a third decimal for you.</li>
      </ul>

      <h2>When to use a related tool</h2>
      <p>
        Get the total right before you turn it into words. If you still need to work out GST on one or more items, do
        that first, then paste the final figure here. If you want the words added automatically, use an invoice template
        that already does it.
      </p>
      <p>
        For one item, the <Link href="/tools/gst-calculator">GST calculator</Link> gives you the tax and total. For an
        invoice with several lines and rates, use the{' '}
        <Link href="/tools/multi-item-gst-calculator">multi-item GST calculator</Link>. The free{' '}
        <Link href="/sales-invoice-templates/gst-tax-invoice">GST tax invoice template</Link> adds the amount in words to
        the invoice total for you.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Convert the final payable total, after GST and round-off.</li>
        <li>Pick “Rupees” or “INR” and stay with it on every document.</li>
        <li>Use one system (lakh/crore or million) on the whole document.</li>
        <li>Read the words back as a number before you print or send.</li>
        <li>Update the words every time the total changes.</li>
      </ul>
    </ToolPageLayout>
  );
}
