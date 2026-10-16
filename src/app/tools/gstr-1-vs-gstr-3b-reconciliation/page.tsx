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
        GSTR-1 reports outward supplies invoice by invoice; GSTR-3B is the summary return through which tax is actually paid.
        Over a year, the tax on taxable outward supplies in both should broadly match. The tool shows the difference as
        GSTR-3B minus GSTR-1 for each head, so a negative number means less was reported (and paid) in GSTR-3B.
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
      <h3>Example (illustrative)</h3>
      <p>
        A Morbi ceramics unit enters its first quarter. In May, GSTR-1 shows IGST ₹45,000 but GSTR-3B shows ₹43,200; the row
        turns red with a −₹1,800 difference. The accountant finds an invoice added to GSTR-1 late, and pays the difference
        with interest. In June, GSTR-3B is higher because a June invoice was paid in 3B but reported in July’s GSTR-1.
      </p>
      <h3>Common mistake</h3>
      <p>
        Comparing the total of GSTR-3B Table 3.1 with GSTR-1 including exports and exempt supplies. Compare like with like:
        Table 3.1(a) against taxable domestic outward supplies in GSTR-1, after credit/debit notes and amendments.
      </p>
      <h3>About DRC-01B</h3>
      <p>
        The GST portal issues an intimation in Form DRC-01B where the liability declared in GSTR-1 is higher than the tax paid
        in GSTR-3B beyond a limit. You respond by paying the difference or explaining it. The limit and procedure can change,
        so check the latest position on the <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>.
      </p>
    </ToolPageLayout>
  );
}
