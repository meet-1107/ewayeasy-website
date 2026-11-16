import Link from 'next/link';
import ToolPageLayout, { type Faq } from '@/components/tools/ToolPageLayout';
import GstInterestCalculator from '@/components/tools/GstInterestCalculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'GST Interest Calculator (Section 50) — 18% and 24%',
  description:
    'Work out interest on late GST payment under Section 50: days late, 18% or 24% per annum, per tax head, rounded to the paisa and to the rupee.',
  path: '/tools/gst-interest-calculator',
});

const faq: Faq[] = [
  {
    q: 'Is GST interest charged on the gross tax or the net cash payment?',
    a: 'Under the proviso to Section 50(1), as generally applied, interest on tax paid late with a delayed return is charged on the part of the tax paid in cash (through the electronic cash ledger), not on the portion set off from input tax credit. The exception is where the return is filed after the start of proceedings, such as an audit or demand. Confirm how it applies to your case.',
  },
  {
    q: 'When does the 24% rate apply?',
    a: 'Section 50(3) provides for interest where input tax credit is wrongly availed and utilised. The rate is generally stated as 24% per annum, and interest runs from the date of utilisation until it is reversed or paid. Credit that was availed but never utilised generally does not attract this interest.',
  },
  {
    q: 'How are days counted?',
    a: 'This tool counts the days from the day after the due date up to and including the payment date, which equals payment date minus due date. If you paid on or before the due date, the delay is zero.',
  },
  {
    q: 'Should I round interest to the rupee?',
    a: 'Tax and interest are generally paid in whole rupees on the GST portal, so the rounded figure is what you usually pay. The tool shows both the exact figure and the rounded figure for each head.',
  },
  {
    q: 'Does the portal calculate interest for me?',
    a: 'The GST portal may show system-computed interest in GSTR-3B. Use this calculator to understand and cross-check that figure, and verify the final amount on the portal.',
  },
  {
    q: 'How do I calculate interest when I paid in instalments?',
    a: 'Add one row for each payment, with the amount paid and its own payment date. Each instalment then carries interest only for the days it was actually late, and the tool adds the rows together.',
  },
];

export default function Page() {
  return (
    <ToolPageLayout
      slug="gst-interest-calculator"
      title="GST Interest Calculator"
      description="Interest on late GST payment under Section 50, for each tax head, at 18% or 24% per annum."
      tool={<GstInterestCalculator />}
      faq={faq}
      related={['gst-late-fee-calculator', 'gstr-1-vs-gstr-3b-reconciliation', 'gst-calculator']}
    >
      <h2>Interest under Section 50 of the CGST Act</h2>
      <p>
        GST interest is simple interest charged under Section 50 of the CGST Act when tax is paid late. The rate, set by
        notification, is generally stated as 18% per annum for late tax and 24% for input tax credit wrongly availed and
        utilised. Each head (IGST, CGST, SGST/UTGST, cess) is worked out separately.
      </p>
      <p>
        For late returns, the proviso to Section 50(1) generally limits interest to the tax paid in cash. So if your
        GSTR-3B liability was ₹1,50,000 and ₹1,10,000 was set off from ITC, interest is usually worked out on the ₹40,000
        paid through the cash ledger. Enter that net cash figure in the tool.
      </p>
      <h3>Formula</h3>
      <ul>
        <li><strong>Days late</strong> = Payment date − Due date (0 if paid on or before the due date)</li>
        <li><strong>Interest</strong> = Tax × Rate × Days late ÷ 365</li>
      </ul>

      <h2>Which rate and which amount to enter</h2>
      <p>
        The two choices that change your answer most are the rate and the tax amount. The rate depends on why interest
        arises, and the amount depends on how the tax was paid. Get both right before you look at the days, because a
        wrong rate or the gross liability can overstate interest several times over.
      </p>
      <ul>
        <li><strong>If you filed GSTR-3B late and paid the cash part late</strong>, use 18% on the cash portion only.</li>
        <li><strong>If you claimed ITC you were not entitled to and used it to pay tax</strong>, use 24% from the date of use.</li>
        <li><strong>If you claimed wrong ITC but it is still unused in your ledger</strong>, interest generally does not arise. Reverse it and check with your adviser.</li>
        <li><strong>If the return was filed after proceedings began</strong>, the cash-only relief may not apply. Take advice on the base amount.</li>
        <li><strong>If you paid in parts</strong>, enter one row per payment with its own date.</li>
      </ul>

      <h2>How to read your result</h2>
      <p>
        Each row shows the days late, the formula with your numbers in it, the exact interest to the paisa and the figure
        rounded to the rupee. The total at the bottom adds every row. The rounded total is usually what you pay, because
        the GST portal works in whole rupees.
      </p>
      <p>
        Use “Copy” to paste the working into an email or your file, or print the summary for your records. If the portal
        shows a different figure in GSTR-3B, compare the days and the base amount first. Those two are where most
        differences come from.
      </p>

      <h2>Worked examples</h2>
      <p>
        These examples show a simple one-date payment and a payment made in two parts. The businesses are made up and the
        due dates are for illustration. Always use the due date that applied to your return, including any extension
        announced for that period.
      </p>
      <h3>Example (illustrative): one late payment</h3>
      <p>
        A Surat textile trader’s GSTR-3B for June 2026 was due on 20 July 2026, and the CGST of ₹42,500 (cash portion) was
        paid on 14 August 2026, which is 25 days late. Interest = ₹42,500 × 18% × 25 ÷ 365 = ₹523.97, about ₹524.
      </p>
      <p>
        The same is worked out separately for SGST. Load the sample data to see it with three heads.
      </p>
      <h3>Example (illustrative): paid in two parts</h3>
      <p>
        A Coimbatore pump dealer, GSTIN 33ABCDE1234F1Z5, owes ₹1,00,000 of IGST in cash, due on 20 August 2026. It pays
        ₹60,000 on 30 August (10 days late) and ₹40,000 on 19 September (30 days late).
      </p>
      <p>
        Row one: ₹60,000 × 18% × 10 ÷ 365 = ₹295.89. Row two: ₹40,000 × 18% × 30 ÷ 365 = ₹591.78. The total is
        ₹887.67, or ₹888 rounded per row, while charging the full ₹1,00,000 for 30 days would wrongly give about ₹1,479.
      </p>

      <h2>Common mistakes</h2>
      <p>
        Interest errors usually come from the base amount, not the arithmetic. People charge the gross liability, pick the
        wrong rate or lump all heads together, and the portal figure then will not match. Fix the inputs and the maths
        takes care of itself.
      </p>
      <ul>
        <li>Charging interest on the full liability when part of it was set off from ITC.</li>
        <li>Using 24% for ordinary late payment. That rate is for ITC wrongly availed and utilised.</li>
        <li>Adding up all heads and calculating interest once, when the heads had different payment dates.</li>
        <li>Counting the due date itself as a day of delay.</li>
        <li>Using the original due date when the deadline for that period was extended.</li>
      </ul>

      <h2>Limits of this calculator</h2>
      <p>
        This calculator does the Section 50 arithmetic on the figures you give it. It does not know your due dates, your
        ledger balances, whether an extension applied or which part of your tax was paid in cash. You supply those facts,
        and the tool gives you a clear, checkable working.
      </p>
      <ul>
        <li>It always divides by 365, including in leap years.</li>
        <li>It does not pick the due date for monthly, quarterly (QRMP) or annual returns.</li>
        <li>It does not calculate late fees. Use the <Link href="/tools/gst-late-fee-calculator">GST late fee calculator</Link> for those.</li>
        <li>It does not check whether interest was already paid on the portal.</li>
      </ul>
      <p>
        If the late payment came from a mismatch between what you reported and what you paid, find it with the{' '}
        <Link href="/tools/gstr-1-vs-gstr-3b-reconciliation">GSTR-1 vs GSTR-3B reconciliation tool</Link>.
      </p>

      <h3>Quick checklist</h3>
      <ul>
        <li>Find the due date that applied to the period.</li>
        <li>Work out the cash portion for each head.</li>
        <li>Choose 18% or 24% based on why interest arises.</li>
        <li>Add a row for each separate payment date.</li>
        <li>Match the rounded total with the portal before paying.</li>
      </ul>
      <p>
        Interest rates and the way they apply are set by notification. Check the current position on{' '}
        <a href="https://cbic-gst.gov.in/" target="_blank" rel="noopener noreferrer">CBIC GST</a> and the{' '}
        <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST portal</a>. E-Way Easy is not a
        government portal.
      </p>
    </ToolPageLayout>
  );
}
