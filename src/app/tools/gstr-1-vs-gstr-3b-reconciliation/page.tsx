import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import Gstr1Vs3bReconciliation from '@/components/tools/Gstr1Vs3bReconciliation';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GSTR-1 vs GSTR-3B Reconciliation (Month-wise, Free)',
  description:
    'Enter or paste a year of GSTR-1 and GSTR-3B Table 3.1(a) figures to see month-wise and annual differences in taxable value, IGST, CGST, SGST and cess.',
  path: '/tools/gstr-1-vs-gstr-3b-reconciliation',
});

const faq: Faq[] = [
  {
    q: 'Which GSTR-3B figures should I enter?',
    a: 'Enter Table 3.1(a), outward taxable supplies other than zero-rated, nil-rated and exempted. Compare it with the matching GSTR-1 taxable outward supplies (B2B, B2CL, B2CS) net of credit/debit notes and amendments for the same month.',
  },
  {
    q: 'What does a red month mean?',
    a: 'GSTR-3B shows less tax than GSTR-1 for that month. That can indicate tax not yet paid, but it can also come from timing or reporting differences. Check the reasons listed on this page before concluding anything.',
  },
  {
    q: 'What is DRC-01B?',
    a: 'It is an intimation on the GST portal for cases where the liability reported in GSTR-1 exceeds the liability paid through GSTR-3B beyond a specified limit. The taxpayer is asked to either pay the difference or explain it. Check the current limit and procedure on the GST portal.',
  },
  {
    q: 'Are my figures saved?',
    a: 'They are saved only in your own browser’s local storage for the financial year you select, so you can come back to them on the same device. Nothing is uploaded.',
  },
  {
    q: 'Why does a month show “Matched” when one tax head is red?',
    a: 'The month status is based on total tax, so a shortfall in one head can be offset by an excess in another. That usually means tax went under the wrong head, such as CGST + SGST instead of IGST. Treat it as a real difference and take advice on correcting it.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gstr-1-vs-gstr-3b-reconciliation"
      title="GSTR-1 vs GSTR-3B Reconciliation"
      description="Compare outward supplies and tax reported in GSTR-1 with GSTR-3B Table 3.1(a), month by month, for a financial year."
      tool={<Gstr1Vs3bReconciliation />}
      faq={faq}
      related={['gstr-1-checker', 'gstr-2b-reconciliation', 'gst-interest-calculator', 'gst-late-fee-calculator']}
    >
      <h2>Why GSTR-1 and GSTR-3B should agree</h2>
      <p>
        GSTR-1 reports your outward supplies invoice by invoice, while GSTR-3B is the summary return through which you
        actually pay tax. Over a year, tax on taxable outward supplies in both should broadly match. This tool shows the
        difference as GSTR-3B minus GSTR-1 for each head, so a negative number means less was paid.
      </p>
      <h3>Common reasons for differences</h3>
      <ul>
        <li><strong>Amendments:</strong> invoices amended in a later month’s GSTR-1 while GSTR-3B was corrected in a different month.</li>
        <li><strong>Credit and debit notes:</strong> netted in GSTR-3B but reported separately in GSTR-1, or reported in different months.</li>
        <li><strong>Advances:</strong> tax paid on advances in GSTR-3B and adjusted later.</li>
        <li><strong>Timing:</strong> an invoice missed in one month’s GSTR-1 and added the next month.</li>
        <li><strong>Nil-rated and exempt supplies:</strong> shown separately in GSTR-3B Table 3.1(c), not in 3.1(a).</li>
        <li><strong>Zero-rated supplies:</strong> exports and SEZ supplies go to Table 3.1(b), not 3.1(a).</li>
      </ul>

      <h2>How to read your result</h2>
      <p>
        Each month gets a status based on total tax: red when GSTR-3B is lower, amber when it is higher, and plain when the
        gap is within your tolerance. Each head cell is also coloured on its own. The summary shows how many months are
        lower or higher, plus the annual difference, which is the number that matters most.
      </p>
      <ul>
        <li><strong>If a month is red and the next month is amber by a similar amount</strong>, it is probably timing. Note it and move on, after checking interest on the late part.</li>
        <li><strong>If the year ends red</strong>, you may have tax unpaid. Find the invoices behind it and work out interest with the{' '}
          <Link href="/tools/gst-interest-calculator">GST interest calculator</Link>.</li>
        <li><strong>If the year ends amber</strong>, you may have paid more than you reported. Check for invoices missing from GSTR-1 or advances not yet adjusted.</li>
        <li><strong>If the month is “Matched” but a head is red</strong>, tax probably went under the wrong head. This needs fixing, even though the total agrees.</li>
        <li><strong>If only taxable value differs and tax matches</strong>, look for nil-rated, exempt or zero-rated supplies mixed into one return.</li>
      </ul>
      <p>
        The tolerance defaults to ₹1 per month, which absorbs rounding. Raising it hides real differences, so keep it low.
      </p>

      <h2>Worked examples</h2>
      <p>
        These examples show a timing difference that fixes itself and a wrong-head error that a total-only check would
        miss. The businesses, GSTINs and amounts are made up. In real cases, find the invoice behind every difference before
        you pay or explain anything.
      </p>
      <h3>Example (illustrative): a late invoice</h3>
      <p>
        A Morbi ceramics unit enters its first quarter. In May, GSTR-1 shows IGST ₹45,000 but GSTR-3B shows ₹43,200; the row
        turns red with a −₹1,800 difference. The accountant finds an invoice added to GSTR-1 late, and pays the difference
        with interest.
      </p>
      <p>
        In June, GSTR-3B is higher because a June invoice was paid in 3B but reported in July’s GSTR-1.
      </p>
      <h3>Example (illustrative): tax under the wrong head</h3>
      <p>
        A Jaipur furniture maker, GSTIN 08ABCDE1234F1Z5, sells to a Delhi buyer in August. GSTR-1 shows IGST ₹36,000, but GSTR-3B
        records ₹18,000 CGST and ₹18,000 SGST for the same sale.
      </p>
      <p>
        The total tax difference is zero, so August shows “Matched”. But the IGST cell is red at −₹36,000 and both CGST and
        SGST cells are amber. The total agreeing does not make the payment right.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Most reconciliation errors come from comparing the wrong tables. GSTR-3B has separate rows for taxable, zero-rated
        and nil or exempt supplies, and GSTR-1 spreads the same sales across several tables. Mixing them produces
        differences that do not exist and hides ones that do.
      </p>
      <ul>
        <li>Comparing the total of GSTR-3B Table 3.1 with GSTR-1 including exports and exempt supplies. Compare Table 3.1(a) with taxable domestic outward supplies in GSTR-1.</li>
        <li>Ignoring credit and debit notes in GSTR-1, so GSTR-1 looks higher than it really is.</li>
        <li>Entering amendments in the month they relate to instead of the month they were reported.</li>
        <li>Looking only at monthly status and missing the annual figure.</li>
        <li>Setting a large tolerance to make the table look clean.</li>
      </ul>

      <h3>About DRC-01B</h3>
      <p>
        The GST portal issues an intimation in Form DRC-01B where the liability declared in GSTR-1 is higher than the tax paid
        in GSTR-3B beyond a limit. You respond by paying the difference or explaining it. The limit and procedure can change,
        so check the latest position on the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>.
      </p>

      <h2>Limits of this tool</h2>
      <p>
        This tool compares the figures you enter. It does not log in to the GST portal, read your returns or know which
        invoices cause a difference, and it does not cover ITC, reverse charge or the annual return. Use it to spot which
        months and heads need a closer look.
      </p>
      <ul>
        <li>Paste up to 12 months with a Month column, or rows in order from April. Download the template for the headings.</li>
        <li>Figures stay in this browser only, saved per financial year.</li>
        <li>It does not reconcile purchases. For that, use the <Link href="/tools/gstr-2b-reconciliation">GSTR-2B reconciliation tool</Link>.</li>
        <li>It does not find invoice-level errors. Run your register through the <Link href="/tools/gstr-1-checker">GSTR-1 checker</Link> first.</li>
      </ul>

      <h3>Quick checklist</h3>
      <ul>
        <li>Take GSTR-3B figures from Table 3.1(a) only.</li>
        <li>Net GSTR-1 for credit notes, debit notes and amendments.</li>
        <li>Keep the tolerance at ₹1 unless you have a reason.</li>
        <li>Check each head, not just the month status.</li>
        <li>Explain or settle the annual difference before year-end.</li>
      </ul>
    </ToolPageLayout>
  );
}
