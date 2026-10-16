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
        Every GSTIN starts with the code of the state or union territory where that registration is held. A business
        with branches in three states has three GSTINs, each starting with a different code. The same codes appear in
        the “place of supply” field on invoices and in e-way bills.
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

      <h3>Example (illustrative)</h3>
      <p>
        A Morbi tile trader (GSTIN starting 24, Gujarat) sells tiles to a builder in Pune whose GSTIN starts with 27
        (Maharashtra), and the goods are delivered to Pune. Supplier state 24 and place of supply 27 differ, so the
        invoice carries IGST. The same sale to a buyer in Ahmedabad (also 24) would carry CGST + SGST.
      </p>

      <h3>Common mistakes</h3>
      <ul>
        <li>Picking the place of supply from the buyer’s billing address when the goods are shipped to a different state.</li>
        <li>Charging CGST + SGST to an SEZ unit in the same state. Supplies to SEZ units are treated as inter-state.</li>
        <li>Mixing up similar-looking codes, such as 24 (Gujarat) and 27 (Maharashtra), when typing a GSTIN by hand.</li>
      </ul>
      <p>
        Codes are taken from the list used across GST systems. Confirm on the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a> if you find a code
        that is not listed here.
      </p>
    </ToolPageLayout>
  );
}
