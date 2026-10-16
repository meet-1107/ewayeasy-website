import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import ChallanEditor from '@/components/tools/challan/ChallanEditor';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Delivery Challan Generator — Job Work, Transfers & Approval',
  description:
    'Free delivery challan generator for job work, branch transfer, supply on approval, exhibitions and other non-sale movements. Copy labels, transport details, drafts and PDF.',
  path: '/tools/delivery-challan-generator',
});

const faq: Faq[] = [
  {
    q: 'When is a delivery challan used instead of a tax invoice?',
    a: 'Rule 55 of the CGST Rules allows goods to move on a delivery challan in cases such as job work, supply of liquid gas where the quantity is not known at removal, goods sent on approval, transport for reasons other than supply, and supply in SKD/CKD form in batches or lots. A tax invoice is issued later where a supply actually takes place.',
  },
  {
    q: 'Do I still need an e-way bill if goods move on a delivery challan?',
    a: 'Often yes. The challan is the base document, and an e-way bill may still be needed depending on the value and the type of movement. Inter-state movement of goods by a principal to a job worker needs an e-way bill whatever the value.',
  },
  {
    q: 'Why three copies?',
    a: 'A delivery challan is commonly prepared in triplicate: the original for the consignee, the duplicate for the transporter and the triplicate for the consignor. Choose one label or print all three in one go.',
  },
  {
    q: 'Should the challan show tax?',
    a: 'A challan shows the value of the goods. Tax amounts are optional and shown only where applicable — turn on “Show tax amounts” if you want them printed.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="delivery-challan-generator"
      title="Delivery Challan Generator"
      description="Create a numbered delivery challan for job work, transfers, approval and other non-sale movements — then print or save as PDF."
      tool={<ChallanEditor />}
      faq={faq}
      related={['eway-bill-eligibility-checker', 'sales-invoice-generator', 'distance-calculator']}
      disclaimer={
        <p>
          This tool creates a challan layout only. It does not decide whether a challan or tax invoice is the right document,
          or whether an e-way bill is required, and it does not generate e-way bills. Check Rule 55 and the current rules on{' '}
          <a className="underline" href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> and the{' '}
          <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a>.
          E-Way Easy is not affiliated with GSTN or NIC.
        </p>
      }
    >
      <h2>Delivery challan under Rule 55</h2>
      <p>
        Not every movement of goods is a sale. When goods go to a job worker, are sent on approval, travel to an exhibition, or
        move in batches as SKD/CKD, there is often no tax invoice at the time of removal. Rule 55 of the CGST Rules lets you
        move such goods on a delivery challan that carries the details of the consignor and consignee, HSN, quantity,
        value, tax where applicable, and place of supply.
      </p>
      <h3>What the challan includes</h3>
      <ul>
        <li>Challan number from your own series (up to 16 characters) and date.</li>
        <li>Reason for transport: job work, supply on approval, sale on approval, branch/stock transfer, exhibition or fair, line sales, SKD/CKD, repairs or others.</li>
        <li>Consignor and consignee with GSTIN and state, and the place of supply.</li>
        <li>Items with HSN, quantity, unit and value, with optional tax amounts.</li>
        <li>Transport mode, vehicle number, transporter and approximate distance.</li>
        <li>Copy label: original for consignee, duplicate for transporter, triplicate for consignor.</li>
      </ul>
      <h3>Example (illustrative)</h3>
      <p>
        A Rajkot pipe manufacturer sends PVC resin and moulds worth ₹2,40,000 to a job worker in Aurangabad. The challan
        shows “Job work” as the reason. Because this is an inter-state movement to a job worker, an e-way bill is needed
        whatever the value — the challan number and date go into Part A as the document details.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Assuming a challan means no e-way bill is needed.</li>
        <li>Using a challan for an inter-state branch transfer that is actually a supply between distinct persons and needs a tax invoice.</li>
        <li>Not keeping the challan series separate and consecutive.</li>
      </ul>
      <p>
        Check whether an e-way bill is needed with the <Link href="/tools/eway-bill-eligibility-checker">eligibility checker</Link>{' '}
        and see <Link href="/documents-required-for-eway-bill">documents required for an e-way bill</Link>.
      </p>
    </ToolPageLayout>
  );
}
