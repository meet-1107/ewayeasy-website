import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstStateCodeList from '@/components/tools/GstStateCodeList';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST State Code List: All States and UTs (2-Digit Codes)',
  description:
    'Searchable list of GST state codes for every Indian state and union territory, with a GSTIN state decoder and an intra-state vs inter-state check.',
  path: '/tools/gst-state-code-list',
});

const faq: Faq[] = [
  {
    q: 'Where is the state code used?',
    a: 'It forms the first two digits of every GSTIN, and it is used to show the place of supply and the supplier’s and recipient’s states on invoices, e-way bills and GST returns.',
  },
  {
    q: 'What is state code 97?',
    a: 'Code 97 is “Other Territory”. It covers areas that are part of India’s territory but are not a state or union territory in the usual list, such as certain offshore areas. Most businesses will not need it.',
  },
  {
    q: 'Why are some numbers missing from the list?',
    a: 'The codes follow the numbering used for states and union territories, and some numbers are no longer in use after states and union territories were reorganised or merged. Use only the codes shown in the current list.',
  },
  {
    q: 'Does the state code decide whether I charge IGST?',
    a: 'Not on its own. What matters is the supplier’s location and the place of supply. If they are in the same state or UT, the supply is generally intra-state (CGST + SGST/UTGST); if different, it is inter-state (IGST). The place of supply depends on the type of supply and is not always the buyer’s GSTIN state.',
  },
  {
    q: 'Does the decoder confirm that a GSTIN is real?',
    a: 'No. It reads only the first two digits and tells you which state they stand for. To check the format and check digit of the full 15 characters, use the GSTIN validator, and confirm active status on the GST portal.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-state-code-list"
      title="GST State Code List"
      description="Every Indian state and union territory with its 2-digit GST code. Search the list, decode the first two digits of a GSTIN, or check whether a supply is intra-state or inter-state."
      tool={<GstStateCodeList />}
      faq={faq}
      related={['gstin-validator', 'gst-calculator', 'invoice-generator']}
    >
      <h2>What the state code tells you</h2>
      <p>
        A GST state code is the two-digit number for a state or union territory, and it forms the first two digits of every
        GSTIN, showing where that registration is held. A business with branches in three states has three GSTINs with
        three different codes, and the same codes appear in the place of supply on invoices and e-way bills.
      </p>

      <h3>How place of supply decides the tax</h3>
      <ul>
        <li><strong>Supplier’s state = place of supply:</strong> intra-state supply. Charge CGST + SGST (or CGST + UTGST in a union territory without its own legislature), each at half the rate.</li>
        <li><strong>Supplier’s state ≠ place of supply:</strong> inter-state supply. Charge IGST at the full rate.</li>
      </ul>
      <p>
        For goods that move, the place of supply is generally where the movement ends for delivery to the recipient.
        There are separate rules for services, bill-to-ship-to transactions, imports, exports and SEZ supplies, so check
        the IGST Act provisions for your situation.
      </p>

      <h2>How to use the three parts of this tool</h2>
      <p>
        This page has three jobs: decode a GSTIN’s state, check whether a supply is intra-state or inter-state, and search
        or copy the full list. Each answers a different question at the billing desk. Use the decoder for a buyer’s GSTIN,
        the supply check for the tax type, and the list for forms and masters.
      </p>
      <ul>
        <li><strong>If you have a buyer’s GSTIN</strong>, paste it into the decoder. If the state it shows is not where the buyer says they are, ask before you bill.</li>
        <li><strong>If you need the tax type</strong>, pick your state and the place of supply. Same state means CGST + SGST; different means IGST.</li>
        <li><strong>If you are setting up software or a spreadsheet</strong>, use “Copy full list”. It copies code, name and type as comma-separated text you can paste into Excel.</li>
        <li><strong>If the decoder says the code is not in the list</strong>, the GSTIN has a typo or is not a normal state registration. Check it before you use it.</li>
      </ul>

      <h2>Worked examples</h2>
      <p>
        State codes look simple, but most tax-type errors on invoices start with a wrong place of supply. The examples below
        show a standard inter-state sale and a bill-to-ship-to case where the buyer’s GSTIN state is not the place of
        supply. Both businesses and GSTINs are illustrative.
      </p>
      <h3>Example (illustrative): Gujarat to Maharashtra</h3>
      <p>
        A Morbi tile trader (GSTIN starting 24, Gujarat) sells tiles to a builder in Pune whose GSTIN starts with 27
        (Maharashtra), and the goods are delivered to Pune. Supplier state 24 and place of supply 27 differ, so the
        invoice carries IGST. The same sale to a buyer in Ahmedabad (also 24) would carry CGST + SGST.
      </p>
      <h3>Example (illustrative): bill to one state, ship to another</h3>
      <p>
        An Ahmedabad pump maker, GSTIN 24ABCDE1234F1Z5, bills a Mumbai contractor (code 27). The contractor asks for the
        pumps to be shipped to its site in Vapi, Gujarat.
      </p>
      <p>
        The decoder shows the buyer is in Maharashtra, but that alone does not settle the tax. Bill-to-ship-to cases have
        their own place of supply rules under the IGST Act, so check them before you choose between IGST and CGST + SGST.
      </p>

      <h2>Common mistakes</h2>
      <p>
        The state code itself rarely changes, so mistakes come from how people use it. Typing a GSTIN by hand, treating the
        billing address as the place of supply, and forgetting special cases like SEZ supplies cause most wrong tax types.
        Check these before you raise the invoice, not after.
      </p>
      <ul>
        <li>Picking the place of supply from the buyer’s billing address when the goods are shipped to a different state.</li>
        <li>Charging CGST + SGST to an SEZ unit in the same state. Supplies to SEZ units are treated as inter-state.</li>
        <li>Mixing up similar-looking codes, such as 24 (Gujarat) and 27 (Maharashtra), when typing a GSTIN by hand.</li>
        <li>Saving state codes in Excel as numbers, so 07 (Delhi) turns into 7 and fails an upload.</li>
        <li>Using an old code from a past document instead of the current list.</li>
      </ul>

      <h2>What this tool does not do</h2>
      <p>
        This tool is a reference list with two simple checks. It does not validate a full GSTIN, does not confirm that a
        registration is active and does not work out the place of supply for services or special cases. It applies the
        general same-state or different-state rule and tells you so in the result.
      </p>
      <ul>
        <li>For the full 15-character check, use the <Link href="/tools/gstin-validator">GSTIN validator</Link>.</li>
        <li>For the CGST, SGST and IGST split on an amount, use the <Link href="/tools/gst-calculator">GST calculator</Link>.</li>
        <li>For a plain explanation of the three taxes, read <Link href="/blog/cgst-sgst-igst-explained">CGST, SGST or IGST explained</Link>.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Decode the buyer’s GSTIN and confirm the state.</li>
        <li>Decide the place of supply from where goods are delivered.</li>
        <li>Compare it with your own state to pick the tax type.</li>
        <li>Store codes as two-digit text in your software.</li>
        <li>Check special cases: SEZ, exports, bill-to-ship-to.</li>
      </ul>
      <p>
        Codes are taken from the list used across GST systems. Confirm on the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a> if you find a code
        that is not listed here.
      </p>
    </ToolPageLayout>
  );
}
