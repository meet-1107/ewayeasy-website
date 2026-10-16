import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import AmountInWordsConverter from '@/components/tools/AmountInWordsConverter';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Amount in Words Converter (Rupees, Lakh, Crore)',
  description:
    'Convert any rupee amount to words in the Indian system (lakh, crore) for invoices and cheques, with paise, “Rupees” or “INR”, title or upper case, and million/billion words.',
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
    a: 'It marks the end of the amount so that nothing can be added after it, which is why it is standard on cheques and invoices.',
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
        The amount is split into rupees and paise without any floating-point rounding. The rupee part is then grouped
        from the right using the Indian system and each group is written in words.
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

      <h3>Example (illustrative)</h3>
      <p>
        A Surat textile wholesaler raises an invoice for ₹12,34,567.80. Split into 12 lakh, 34 thousand and 567, it reads:
        “Rupees Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven and Eighty Paise Only”. In the international
        system the same amount is “One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven and Eighty
        Paise”.
      </p>

      <h3>Common mistakes</h3>
      <ul>
        <li>Writing the words for the taxable value instead of the invoice total after GST and round-off.</li>
        <li>Mixing systems, such as “Twelve Lakh Thirty Four Thousand” in one place and “1.23 million” in another on the same document.</li>
        <li>Forgetting the paise part, so the words do not match the figure.</li>
      </ul>
      <p>
        The free <Link href="/tools/invoice-generator">GST Invoice Generator</Link> adds the amount in words to the invoice
        total for you.
      </p>
    </ToolPageLayout>
  );
}
