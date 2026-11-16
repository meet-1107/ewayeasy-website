import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import ChallanEditor from '@/components/tools/challan/ChallanEditor';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Delivery Challan Generator — Job Work, Transfers & Approval',
  description:
    'Free delivery challan generator for job work, branch transfer, supply on approval and exhibitions. Numbered series, three copies, drafts and PDF.',
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
  {
    q: 'Where are my saved challans stored?',
    a: 'Drafts and your number series are saved only in the browser you used, on that device. Clearing browser data or switching phones removes them, so print or save each final challan as a PDF and keep it with your records.',
  },
  {
    q: 'What value should I put on a challan for goods sent to a job worker?',
    a: 'Enter a fair value for the goods, such as their cost or the value you would use in your books. The value matters because it drives the e-way bill decision and appears in Part A. Ask your adviser if you are unsure which value to use.',
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
        A delivery challan is a document that moves goods when there is no sale at the time of removal. Rule 55 of the CGST
        Rules allows it for job work, goods sent on approval, exhibitions, SKD/CKD in lots and similar non-sale movements.
        It carries consignor and consignee details, HSN, quantity, value, tax where applicable and place of supply.
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

      <h2>Challan or tax invoice: decision rules</h2>
      <p>
        Use a delivery challan when goods leave your premises but no sale happens yet, or the buyer is not final. Use a tax
        invoice when a supply happens at removal, including many transfers between your own GSTINs. When in doubt, ask
        whether ownership or a taxable supply passes today; if yes, you usually need an invoice.
      </p>
      <ul>
        <li><strong>If goods go to a job worker and come back processed</strong>, use a challan with reason “Job work”.</li>
        <li><strong>If the buyer may return the goods</strong> (supply or sale on approval), use a challan now and an invoice once the buyer accepts.</li>
        <li><strong>If goods move to your branch in another state with a different GSTIN</strong>, this is usually a supply. The tool warns you and points you to a tax invoice.</li>
        <li><strong>If goods go to an exhibition or a fair</strong> and may come back, a challan fits.</li>
        <li><strong>If you are sending machinery out for repair</strong>, choose “Sent for repairs” and note that it will be returned.</li>
      </ul>
      <p>
        For the full comparison, read <Link href="/blog/delivery-challan-vs-tax-invoice">delivery challan vs tax invoice</Link>.
      </p>

      <h2>How to read the e-way bill hint</h2>
      <p>
        Under the form, the tool shows a coloured e-way bill hint based on the reason, the two states and the challan
        value. It is a first signal, not a ruling. Red means an e-way bill is needed at any value, amber means one is likely,
        and the neutral hint means you should check the rules for your case.
      </p>
      <ul>
        <li><strong>“Needs an e-way bill whatever the value”</strong> shows for inter-state job work. Generate the e-way bill with the challan as the document.</li>
        <li><strong>“Likely needed”</strong> shows when the value is above ₹50,000. Most movements at this value need one, even on a challan.</li>
        <li><strong>“May not be needed”</strong> shows at ₹50,000 or less. Check your state’s intra-state limit and the special cases before you skip it.</li>
      </ul>
      <p>
        The hint uses the consignor state and the place of supply. If you leave a state blank, the tool treats the movement
        as intra-state, so fill both before you trust the hint.
      </p>

      <h2>Worked examples</h2>
      <p>
        The reason for transport decides almost everything on a challan: the wording, the e-way bill need and what happens
        next. These two examples show an inter-state job work movement and a local supply on approval. Both businesses and
        GSTINs are made up.
      </p>
      <h3>Example (illustrative): job work across states</h3>
      <p>
        A Rajkot pipe manufacturer sends PVC resin and moulds worth ₹2,40,000 to a job worker in Aurangabad. The challan
        shows “Job work” as the reason. Because this is an inter-state movement to a job worker, an e-way bill is needed
        whatever the value — the challan number and date go into Part A as the document details.
      </p>
      <h3>Example (illustrative): goods on approval</h3>
      <p>
        An Ahmedabad lighting dealer with GSTIN 24ABCDE1234F1Z5 sends six sample chandeliers worth ₹38,000 to a hotel
        in the same city. The reason is “Supply on approval”. The hint says an e-way bill may not be needed at this value,
        subject to Gujarat’s intra-state rules.
      </p>
      <p>
        The hotel keeps four and returns two. The dealer then raises a tax invoice for the four it kept, not for all six.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Most challan problems come from treating the challan as a lighter invoice. It is a movement document with its own
        rules. The mistakes below show up during transit checks and at audit time, and every one is easy to fix if you
        catch it at the dispatch desk.
      </p>
      <ul>
        <li>Assuming a challan means no e-way bill is needed.</li>
        <li>Using a challan for an inter-state branch transfer that is actually a supply between distinct persons and needs a tax invoice.</li>
        <li>Not keeping the challan series separate and consecutive.</li>
        <li>Leaving the value blank or at zero. The value still matters for the e-way bill.</li>
        <li>Choosing “Others” and not describing the reason, which leaves the purpose unclear.</li>
        <li>Never raising the tax invoice after goods on approval are accepted.</li>
      </ul>

      <h2>Limits of this generator</h2>
      <p>
        This tool lays out a challan and checks a few basics, such as GSTIN format and missing fields. It does not file
        anything, does not track job work goods that have not come back and does not decide your tax position. Treat it as a
        clean, printable document, not as compliance software.
      </p>
      <ul>
        <li>It does not generate e-way bills. Use the portal or the E-Way Easy app for that.</li>
        <li>It does not track the time limits for job work goods to return. Track those in your books.</li>
        <li>It does not check whether a GSTIN is active, only whether its format is valid.</li>
        <li>Drafts live in one browser only, up to 50 at a time.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Pick the right reason for transport and describe “Others”.</li>
        <li>Fill both states so the tax split and e-way bill hint are right.</li>
        <li>Use the next number in a separate challan series.</li>
        <li>Print three copies: consignee, transporter, consignor.</li>
        <li>Check the e-way bill need before the vehicle leaves.</li>
      </ul>
      <p>
        Check whether an e-way bill is needed with the <Link href="/tools/eway-bill-eligibility-checker">eligibility checker</Link>{' '}
        and see <Link href="/documents-required-for-eway-bill">documents required for an e-way bill</Link>. For job work
        specifics, read <Link href="/blog/eway-bill-rules-for-job-work">e-way bill rules for job work</Link>.
      </p>
    </ToolPageLayout>
  );
}
