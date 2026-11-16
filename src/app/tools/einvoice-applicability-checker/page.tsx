import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import EinvoiceChecker from '@/components/tools/EinvoiceChecker';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'E-Invoice Applicability Checker (₹5 Crore AATO)',
  description:
    'Check whether GST e-invoicing (IRN) is likely to apply to your business based on turnover, entity type and supplies, with the 30-day reporting rule.',
  path: '/tools/einvoice-applicability-checker',
});

const faq: Faq[] = [
  {
    q: 'What is the turnover limit for e-invoicing?',
    a: 'As generally stated, e-invoicing applies to taxpayers whose aggregate turnover exceeded ₹5 crore in any financial year from 2017-18 onwards. This threshold has applied since 1 August 2023. Exactly ₹5 crore does not exceed the limit.',
  },
  {
    q: 'Do I need an e-invoice for sales to consumers (B2C)?',
    a: 'No. E-invoicing covers B2B supplies and exports. B2C invoices do not get an IRN. Separately, taxpayers with AATO above ₹500 crore are generally required to print a dynamic QR code on B2C invoices.',
  },
  {
    q: 'Which businesses are exempt?',
    a: 'Generally: SEZ units (not SEZ developers), insurers, banking companies, financial institutions including NBFCs, goods transport agencies, passenger transport service providers, suppliers of admission to films in multiplex screens, and government departments and local authorities. The exemption depends on the entity type, not on turnover.',
  },
  {
    q: 'Is there a time limit to report an e-invoice?',
    a: 'From 1 April 2025, taxpayers with AATO of ₹10 crore or more are generally required to report invoices to the IRP within 30 days of the invoice date. Check the latest advisory on the e-invoice portal.',
  },
  {
    q: 'How does e-invoicing affect e-way bills?',
    a: 'Once an IRN is generated, the e-way bill can be generated from it, with Part A filled from the e-invoice data. You still add Part B (vehicle details) before the goods move.',
  },
  {
    q: 'If my turnover falls below ₹5 crore again, can I stop e-invoicing?',
    a: 'Generally no. The test looks at the highest turnover in any financial year from 2017-18, so one year above the limit is enough. A later fall in turnover does not undo it; check the current notification if you think your case is different.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="einvoice-applicability-checker"
      title="E-Invoice Applicability Checker"
      description="A quick, preliminary check of whether e-invoicing (IRN) is likely to apply to you, based on turnover, entity type and the supplies you make."
      tool={<EinvoiceChecker />}
      faq={faq}
      related={['invoice-generator', 'eway-bill-eligibility-checker', 'gstin-validator']}
    >
      <h2>Who needs to issue e-invoices</h2>
      <p>
        E-invoicing means reporting each B2B invoice, credit note and debit note to the Invoice Registration Portal (IRP)
        and getting back an Invoice Reference Number (IRN) and a signed QR code. Where it applies, an invoice without an IRN
        is generally not a valid tax invoice. Applicability depends on three things:
      </p>
      <ol>
        <li><strong>Turnover:</strong> aggregate turnover above ₹5 crore in any financial year from 2017-18 onwards (threshold applicable since 1 August 2023).</li>
        <li><strong>Entity type:</strong> some categories are exempt whatever their turnover.</li>
        <li><strong>Type of supply:</strong> B2B supplies and exports are covered; B2C supplies are not.</li>
      </ol>
      <h3>The test in one line</h3>
      <p>
        E-invoicing is likely applicable if: highest AATO from 2017-18 &gt; ₹5 crore <strong>and</strong> the entity is
        not exempt <strong>and</strong> you make B2B supplies or exports.
      </p>

      <h2>How to read your result</h2>
      <p>
        The checker gives one of three results: “likely applicable”, “likely not applicable” or “review needed”. Each comes
        with the reasons behind it and extra notes, such as the 30-day reporting rule. Read the reasons first, because they
        tell you which of the three tests decided your answer.
      </p>
      <ul>
        <li><strong>If it says likely applicable</strong>, set up e-invoicing through the IRP or your billing software before the date the notification gives for your case.</li>
        <li><strong>If it says likely not applicable because of turnover</strong>, watch your turnover each year. The test is “any year”, so one strong year changes the answer.</li>
        <li><strong>If it says likely not applicable because of your entity type</strong>, confirm that your business truly fits that category. A partial fit needs advice.</li>
        <li><strong>If it says B2C only</strong>, remember that one B2B sale or export, including a supply to an SEZ, brings those documents into e-invoicing.</li>
        <li><strong>If it says review needed</strong>, you have not selected any type of supply. Tick what you actually sell.</li>
      </ul>
      <p>
        If your highest turnover is between ₹4 crore and ₹5 crore, the tool adds a near-threshold note. That is your cue to
        add up every GSTIN under your PAN, not just the one you file for.
      </p>

      <h2>Worked examples</h2>
      <p>
        The examples below show the two most common outcomes: a growing manufacturer that crosses the limit and a group
        that misses the limit only because it counted one GSTIN. Both are illustrative, with made-up businesses and figures,
        and both still need checking against the current notification.
      </p>
      <h3>Example (illustrative): crossing the limit</h3>
      <p>
        A Ludhiana fastener manufacturer had turnover of ₹4.6 crore in 2022-23 and ₹5.4 crore in 2024-25, selling to
        dealers who hold GSTINs. Because turnover exceeded ₹5 crore in a financial year, e-invoicing is likely to apply
        from the following year for its B2B invoices. Its occasional sales to walk-in customers remain ordinary B2C
        invoices.
      </p>
      <h3>Example (illustrative): two GSTINs, one PAN</h3>
      <p>
        A Surat textile trader has GSTIN 24ABCDE1234F1Z5 in Gujarat with ₹3.2 crore of sales, and a Maharashtra GSTIN
        under the same PAN with ₹2.1 crore. Entered alone, the Gujarat figure gives “likely not applicable”.
      </p>
      <p>
        Entered as the all-India total of ₹5.3 crore, the result flips to “likely applicable”. Always enter the PAN-level
        figure, because that is what the test uses.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Most wrong answers on e-invoicing come from feeding the test the wrong turnover. The year, the GSTIN count and the
        entity category all matter. The other big mistake is timing: once e-invoicing applies, invoices reported late can
        be refused by the IRP, which delays the e-way bill and your buyer’s credit.
      </p>
      <ul>
        <li>Looking only at the current year. The test uses the highest turnover in any financial year from 2017-18.</li>
        <li>Counting one GSTIN only. Aggregate turnover covers all GSTINs under the same PAN across India.</li>
        <li>Assuming an SEZ developer is exempt. The exemption is for SEZ units.</li>
        <li>Reporting late. Taxpayers at ₹10 crore and above generally have 30 days from the invoice date.</li>
        <li>Treating credit notes and debit notes as outside e-invoicing. For covered supplies, they need an IRN too.</li>
      </ul>

      <h2>What this checker does not cover</h2>
      <p>
        This is a preliminary check built on the generally stated position. It does not read your returns, does not
        calculate turnover for you, does not cover every special case in the notifications and does not generate an IRN.
        Use it to decide what to verify, not as the final word.
      </p>
      <ul>
        <li>It does not work out your aggregate turnover. You enter the highest yearly figure yourself.</li>
        <li>It does not give your exact start date. Check the notification for the year you crossed the limit.</li>
        <li>It treats each exempt category as a full fit. Mixed businesses need advice.</li>
        <li>It does not check the dynamic QR code rules in detail, only flags them above ₹500 crore.</li>
      </ul>

      <h2>When to use a related tool</h2>
      <p>
        E-invoicing sits next to the e-way bill, not in place of it. Once you have an IRN, the e-way bill can use it, but
        you still need to know whether an e-way bill is required for the movement. Check that separately, along with the
        buyer details that go on every invoice.
      </p>
      <p>
        Use the <Link href="/tools/eway-bill-eligibility-checker">e-way bill eligibility checker</Link> for the movement,
        and the <Link href="/tools/gstin-validator">GSTIN validator</Link> to catch typos in buyer GSTINs before you report.
        For the invoice fields themselves, see the <Link href="/gst-invoice-rules">GST invoice rules guide</Link>.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Find your highest turnover in any year from 2017-18.</li>
        <li>Add up every GSTIN under the same PAN.</li>
        <li>Confirm your entity type against the exempt list.</li>
        <li>List your supply types: B2B, exports, B2C.</li>
        <li>If AATO is ₹10 crore or more, report within 30 days.</li>
      </ul>
      <p>
        Check the current rules on the <a href="https://einvoice1.gst.gov.in/" target="_blank" rel="noopener noreferrer">e-invoice portal</a>{' '}
        and the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>. E-Way Easy is
        not a government portal and does not generate IRNs.
      </p>
    </ToolPageLayout>
  );
}
