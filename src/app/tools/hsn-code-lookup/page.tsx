import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import HsnLookup from '@/components/tools/HsnLookup';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'HSN Code Lookup — All HSN Chapters 01–99 (Chapter Reference)',
  description:
    'Search all HSN chapters 01 to 98 and SAC chapter 99 by number or keyword to find the right starting point for classifying goods and services under GST.',
  path: '/tools/hsn-code-lookup',
});

const faq: Faq[] = [
  {
    q: 'What is an HSN code?',
    a: 'HSN (Harmonized System of Nomenclature) is the international classification for goods. In India the first 2 digits are the chapter, 4 digits the heading, 6 digits the sub-heading and 8 digits the tariff item.',
  },
  {
    q: 'Does this tool show GST rates?',
    a: 'No. It is a chapter-level reference only. Rates depend on the full code and current notifications — check them on CBIC GST.',
  },
  {
    q: 'How many digits of HSN do I need on my invoice?',
    a: 'It depends on your aggregate turnover and the type of supply, as notified. Check the current HSN reporting requirement on the GST portal or CBIC.',
  },
  {
    q: 'What is chapter 99?',
    a: 'Services are classified under the Services Accounting Code (SAC), and SAC codes start with 99. For example, goods transport services fall under a heading in chapter 99.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="hsn-code-lookup"
      title="HSN Chapter Lookup"
      description="Search all 2-digit HSN chapters (and SAC chapter 99 for services) by number or keyword. A starting point for classification — not a rate finder."
      tool={<HsnLookup />}
      faq={faq}
      related={['gst-calculator', 'invoice-generator', 'sales-invoice-generator']}
      disclaimer={
        <p>
          This is a chapter-level reference to help you start classifying. It does not determine the correct HSN or SAC code
          or the GST rate for your goods or services. Confirm the full code and rate on{' '}
          <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> or with your tax adviser.
        </p>
      }
    >
      <h2>How to use the chapter list</h2>
      <ol>
        <li>Search for the material or product (for example “ceramic”, “steel” or “garments”).</li>
        <li>Note the matching chapter number. Some products could fall in more than one chapter — read the titles carefully.</li>
        <li>Open the tariff on CBIC and drill down from the chapter to the 4-digit heading, 6-digit sub-heading and 8-digit tariff item.</li>
        <li>Check the GST rate notification for that code. Rates changed in the rationalisation effective 22 September 2025.</li>
      </ol>
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi manufacturer of glazed floor tiles searches “tiles” and finds chapter 69 (Ceramic products). Granite slabs
        would instead fall under chapter 68 (Articles of stone). The full 8-digit code and rate still have to be confirmed on CBIC.
      </p>
      <p>
        For more on choosing and printing HSN codes, see the <Link href="/blog/hsn-codes-practical-guide">practical guide to HSN codes</Link>.
      </p>
    </ToolPageLayout>
  );
}
