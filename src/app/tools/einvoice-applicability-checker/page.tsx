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
        Under GST e-invoicing, a business reports each B2B invoice, credit note and debit note to the Invoice Registration
        Portal (IRP) and gets back an Invoice Reference Number (IRN) and a signed QR code. Without the IRN, where e-invoicing
        applies, the document is generally not treated as a valid tax invoice. Applicability depends on three things:
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
      <h3>Example (illustrative)</h3>
      <p>
        A Ludhiana fastener manufacturer had turnover of ₹4.6 crore in 2022-23 and ₹5.4 crore in 2024-25, selling to
        dealers who hold GSTINs. Because turnover exceeded ₹5 crore in a financial year, e-invoicing is likely to apply
        from the following year for its B2B invoices. Its occasional sales to walk-in customers remain ordinary B2C
        invoices.
      </p>
      <h3>Common mistakes</h3>
      <ul>
        <li>Looking only at the current year. The test uses the highest turnover in any financial year from 2017-18.</li>
        <li>Counting one GSTIN only. Aggregate turnover covers all GSTINs under the same PAN across India.</li>
        <li>Assuming an SEZ developer is exempt. The exemption is for SEZ units.</li>
        <li>Reporting late. Taxpayers at ₹10 crore and above generally have 30 days from the invoice date.</li>
      </ul>
      <p>
        Check the current rules on the <a href="https://einvoice1.gst.gov.in/" target="_blank" rel="noopener noreferrer">e-invoice portal</a>{' '}
        and the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>. E-Way Easy is
        not a government portal and does not generate IRNs.
      </p>
    </ToolPageLayout>
  );
}
