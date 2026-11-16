import Link from 'next/link';
import ComplianceNote from '@/components/ComplianceNote';
import DataTable from '@/components/DataTable';
import DownloadCTA from '@/components/DownloadCTA';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { CheckList, StepList } from '@/components/feature-pages/FeatureBlocks';
import { FaqList, ProblemGrid, ReadingList, SectionIntro, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { absoluteUrl, faqLd, pageMeta } from '@/lib/seo';

const PATH = '/invoice-format-excel';
const DESCRIPTION =
  'Download a free GST invoice format and a non-GST bill format in Excel (.xlsx). CGST/SGST or IGST, totals and round-off calculate with built-in formulas.';

export const metadata = pageMeta({
  title: 'Invoice Format in Excel: Free GST & Non-GST Download (.xlsx)',
  description: DESCRIPTION,
  path: PATH,
});

const FILES = [
  {
    href: '/downloads/gst-invoice-format.xlsx',
    name: 'GST invoice format in Excel',
    tag: 'With GST',
    who: 'For GST-registered sellers issuing a tax invoice.',
    points: [
      'Seller and buyer GSTIN, state codes, place of supply, reverse charge',
      '10 item rows: HSN/SAC, qty, unit, rate, discount, GST %',
      'CGST + SGST or IGST chosen automatically from the state codes',
      'Totals, round-off, invoice total, bank details and signature block',
    ],
  },
  {
    href: '/downloads/bill-format-without-gst.xlsx',
    name: 'Bill format in Excel (without GST)',
    tag: 'Without GST',
    who: 'For sellers not registered under GST, or as a base for a bill of supply.',
    points: [
      'Shop details, bill number, date and customer',
      '12 item rows: qty, unit, rate, amount',
      'Subtotal, discount, other charges and rounded total',
      'Optional declaration line (for example for composition dealers)',
    ],
  },
];

const FORMULA_ROWS = [
  { label: 'Taxable value', cells: ['Qty × Rate − Discount', '=ROUND(D15*F15-IF(G15="",0,G15),2)'] },
  { label: 'Supply type', cells: ['Same state code → intra-state, else inter-state', '=IF(TRIM(F6)=TRIM(L6),"Intra-state…","Inter-state…")'] },
  { label: 'CGST and SGST', cells: ['Half the GST rate each, only within a state', '=IF(TRIM($F$6)=TRIM($L$6),ROUND(H15*I15/200,2),0)'] },
  { label: 'IGST', cells: ['Full GST rate, only across states', '=IF(TRIM($F$6)=TRIM($L$6),0,ROUND(H15*I15/100,2))'] },
  { label: 'Round off', cells: ['Difference to the nearest rupee', '=ROUND(M25,0)-M25'] },
];

const EXAMPLE_ROWS = [
  { label: 'Taxable value (500 × ₹41.75)', cells: ['₹20,875.00', '₹20,875.00'] },
  { label: 'Supply type (cell B12)', cells: ['Intra-state: CGST + SGST', 'Inter-state: IGST'] },
  { label: 'CGST at 9%', cells: ['₹1,878.75', '₹0.00'] },
  { label: 'SGST at 9%', cells: ['₹1,878.75', '₹0.00'] },
  { label: 'IGST at 18%', cells: ['₹0.00', '₹3,757.50'] },
  { label: 'Total before round-off', cells: ['₹24,632.50', '₹24,632.50'] },
  { label: 'Round off', cells: ['+₹0.50', '+₹0.50'] },
  { label: 'Invoice total', cells: ['₹24,633.00', '₹24,633.00'] },
];

const FAQ: Faq[] = [
  {
    q: 'Is the invoice format in Excel free?',
    a: 'Yes. Both files are free to download and use for your business, with no sign-up. They open in Microsoft Excel, Google Sheets, LibreOffice and WPS Office.',
  },
  {
    q: 'Does the Excel format calculate GST automatically?',
    a: 'Yes. Enter your state code and the place of supply. If they match, the sheet charges CGST and SGST at half the rate each; if they differ, it charges IGST at the full rate. Line totals, tax totals, round-off and the invoice total use formulas.',
  },
  {
    q: 'Can Excel write the amount in words in rupees?',
    a: 'Excel has no built-in function for Indian rupees in words, so the sheet leaves a cell for you to type it. The free online invoice generator writes the amount in words for you.',
  },
  {
    q: 'Which format should I use: with GST or without GST?',
    a: 'If you are registered under GST and the supply is taxable, use the GST invoice format. If you are not registered, use the bill format without GST. Composition dealers and exempt supplies need a bill of supply with the required declaration.',
  },
  {
    q: 'Is an Excel invoice valid under GST?',
    a: 'GST law does not require any particular software. An invoice made in Excel is fine if it carries the particulars in Rule 46 of the CGST Rules and is numbered correctly. Businesses covered by e-invoicing must also report B2B invoices to the Invoice Registration Portal.',
  },
  {
    q: 'Can I make an e-way bill from this Excel invoice?',
    a: 'Not from the sheet itself. An e-way bill is filed on the official e-way bill system, either on the portal, through its bulk tools, or through an app that files via an authorised GSP. Copy the invoice details exactly, because they must match.',
  },
];

const TRAPS = [
  {
    title: 'Changing the buyer’s state but not the place of supply',
    text: 'The tax type follows the place of supply code (cell L6), not the buyer block. Update L6 for every invoice and glance at cell B12, which says intra-state or inter-state.',
  },
  {
    title: 'Typing state codes two different ways',
    text: 'Type both codes the same way, for example 07 in both cells, not 07 in one and 7 in the other. Otherwise the sheet can treat a Delhi sale as inter-state.',
  },
  {
    title: 'Saving over last month’s invoice',
    text: 'Copying the last file and forgetting to change the number creates duplicates. Keep a blank master copy and use the next number in your series each time.',
  },
  {
    title: 'Typing over a formula cell',
    text: 'Once a white cell holds a typed number, it stops calculating. If totals do not change when you change a quantity, a formula has been overwritten.',
  },
  {
    title: 'Pasting numbers as text',
    text: 'Figures pasted from another file can arrive as text, and Excel then leaves them out of totals. Re-type them, or paste as values into the yellow cells.',
  },
  {
    title: 'Amount in words that no longer matches',
    text: 'The amount in words is typed by hand, so it does not update. Re-check it whenever you change a quantity, rate or discount.',
  },
];

function SheetPreview() {
  const head = ['Sr', 'Description', 'HSN', 'Qty', 'Rate', 'Taxable', 'GST %', 'IGST', 'Total'];
  const rows = [
    ['1', 'PVC pipe 110 mm', '3917', '100', '1,250.00', '1,25,000.00', '18', '22,500.00', '1,47,500.00'],
    ['2', 'PVC elbow 110 mm', '3917', '200', '85.00', '16,500.00', '18', '2,970.00', '19,470.00'],
  ];
  return (
    <figure className="overflow-hidden rounded-2xl border border-brand-900/15 bg-white shadow-card">
      <div className="flex items-center gap-2 bg-[#1D6F42] px-4 py-2 text-xs font-semibold text-white">
        <span className="grid h-5 w-5 place-items-center rounded bg-white/20 font-bold">X</span> gst-invoice-format.xlsx
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
          <thead>
            <tr>
              {head.map((h) => <th key={h} className="border border-brand-900/10 bg-brand-800 px-2 py-1.5 font-semibold text-white">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c, i) => (
                  <td key={i} className={`border border-brand-900/10 px-2 py-1.5 ${[1, 2, 3, 4, 6].includes(i) ? 'bg-amber-50' : ''} ${i >= 4 ? 'text-right tabular-nums' : ''}`}>{c}</td>
                ))}
              </tr>
            ))}
            <tr className="bg-brand-50 font-bold">
              <td colSpan={5} className="border border-brand-900/10 px-2 py-1.5 text-right">Total</td>
              <td className="border border-brand-900/10 px-2 py-1.5 text-right tabular-nums">1,41,500.00</td>
              <td className="border border-brand-900/10" />
              <td className="border border-brand-900/10 px-2 py-1.5 text-right tabular-nums">25,470.00</td>
              <td className="border border-brand-900/10 px-2 py-1.5 text-right tabular-nums">1,66,970.00</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="px-4 py-2 text-xs text-ink-faint">
        Preview with sample data (Gujarat seller, Maharashtra buyer, so IGST applies). Yellow cells are for your input.
      </figcaption>
    </figure>
  );
}

export default function InvoiceFormatExcelPage() {
  return (
    <>
      <JsonLd
        data={[
          ...FILES.map((f) => ({
            '@context': 'https://schema.org',
            '@type': 'DigitalDocument',
            name: f.name,
            url: absoluteUrl(f.href),
            encodingFormat: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            isAccessibleForFree: true,
            inLanguage: 'en-IN',
            publisher: { '@type': 'Organization', name: 'E-Way Easy' },
          })),
          faqLd(FAQ),
        ]}
      />
      <PageHeader
        eyebrow="Free download · .xlsx"
        title="Invoice Format in Excel: GST and non-GST"
        description="Two ready-to-use Excel invoice formats with the GST formulas already built in. Download, replace the sample details with yours, and save as PDF."
        crumbs={[{ name: 'Free tools', href: '/tools' }, { name: 'Invoice format in Excel', href: PATH }]}
      >
        <div className="flex flex-wrap gap-3">
          <a href={FILES[0].href} download className="btn-amber">Download GST format (.xlsx)</a>
          <a href={FILES[1].href} download className="btn-ghost-dark">Download non-GST bill (.xlsx)</a>
        </div>
      </PageHeader>

      <section className="container pt-10">
        <div className="mx-auto max-w-3xl rounded-2xl border-l-4 border-amber-500 bg-amber-300/15 px-5 py-4 text-ink">
          <p className="leading-7">
            <strong>Quick answer:</strong> Download the GST invoice format if you are registered under GST, or the bill
            format without GST if you are not. Fill the yellow cells: your details, the buyer, place of supply and items.
            The sheet calculates taxable value, CGST and SGST or IGST, round-off and the total, and you save it as a PDF.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="downloads">
        <div className="container">
          <SectionIntro id="downloads" eyebrow="Downloads" title="Choose your Excel invoice format">
            <p>
              An invoice format in Excel is a ready spreadsheet with the layout and the tax formulas already in place. Pick
              the GST format if you are registered and the supply is taxable. Pick the bill format without GST if you are
              not registered, or as a starting point for a bill of supply.
            </p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {FILES.map((f) => (
              <article key={f.href} className="flex flex-col rounded-[1.5rem] border-2 border-ink bg-white p-6 shadow-[6px_6px_0_#16211C]">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">{f.tag}</p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{f.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{f.who}</p>
                <ul className="mt-4 flex-1 space-y-2 text-[15px] leading-6 text-ink-soft">
                  {f.points.map((p) => <li key={p}>✓ {p}</li>)}
                </ul>
                <a href={f.href} download className="btn-primary mt-6 self-start">Download .xlsx</a>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <SheetPreview />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="how">
        <div className="container">
          <SectionIntro id="how" eyebrow="How to use" title="Fill the Excel invoice in 4 steps">
            <p>
              You fill only the yellow cells and the sheet does the maths. Set up your own details once and save that as a
              blank master copy. For each invoice, enter the next number, the buyer, the place of supply and the items,
              then type the amount in words and save the sheet as a PDF.
            </p>
          </SectionIntro>
          <StepList
            steps={[
              { title: 'Add your details once', text: 'Replace the sample business name, address, GSTIN and state code. Save the file as your own blank template.' },
              { title: 'Enter the invoice number and buyer', text: 'Use the next number in your series, the date, buyer details and the place of supply state code.' },
              { title: 'Fill the items', text: 'Description, HSN, quantity, unit, rate, discount and GST %. Everything in white cells calculates itself.' },
              { title: 'Type the amount in words and save as PDF', text: 'Add bank details and terms, then File → Save As → PDF, or print on A4. In Google Sheets, use File → Download → PDF.' },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="formulas">
        <div className="container">
          <SectionIntro id="formulas" eyebrow="No hidden magic" title="The formulas inside the GST format">
            <p>
              Every calculation in the GST format is a plain Excel formula you can read, check and change. The sheet
              compares your state code with the place of supply to choose CGST and SGST or IGST, then rounds the total to
              the nearest rupee. For the reasoning, see{' '}
              <Link href="/blog/how-to-calculate-gst-on-sales-invoice" className={linkClass}>how to calculate GST on an invoice</Link>{' '}
              and <Link href="/blog/cgst-sgst-igst-explained" className={linkClass}>CGST vs SGST vs IGST</Link>.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-4xl">
            <DataTable caption="Formulas used in the GST invoice Excel format" columns={['Field', 'Rule', 'Excel formula (row 15)']} rows={FORMULA_ROWS} />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="example">
        <div className="container">
          <SectionIntro id="example" eyebrow="Example (illustrative)" title="One order, two buyers, two tax results">
            <p>
              Example (illustrative): a Nashik corrugated box maker (state code 27) sells 500 boxes at ₹41.75 each, with
              GST at 18% used only as a sample rate. The taxable value is ₹20,875.00. What changes the tax is one cell: the
              place of supply.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-4xl">
            <DataTable
              caption="Worked example of the Excel invoice format for an intra-state and an inter-state buyer (illustrative)"
              columns={['Line', 'Pune buyer (place of supply 27)', 'Indore buyer (place of supply 23)']}
              rows={EXAMPLE_ROWS}
            />
          </div>
          <p className="mt-4 max-w-3xl text-sm text-ink-soft">
            The business and figures are made up, and 18% is not a statement of the rate for any product. Confirm your rate
            with the <Link href="/tools/hsn-code-lookup" className={linkClass}>HSN code lookup</Link> and your adviser.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="traps">
        <div className="container">
          <SectionIntro id="traps" eyebrow="Spreadsheet traps" title="Six Excel mistakes that break a GST invoice">
            <p>
              Excel calculates exactly what you give it, including your mistakes. Most wrong invoices from a spreadsheet
              come from a stale cell, an overwritten formula or a code typed two ways, not from bad maths. These six traps
              are worth checking before every invoice leaves your desk.
            </p>
          </SectionIntro>
          <ProblemGrid items={TRAPS} />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="fit">
        <div className="container">
          <SectionIntro id="fit" eyebrow="Honest limits" title="When Excel is enough, and when it is not">
            <p>
              Excel is enough when you make a few invoices at a desk and keep records in spreadsheets. It is not enough
              when the invoice must also become an e-way bill or an e-invoice, because a spreadsheet files nothing. Use these
              rules to decide when to add another tool.
            </p>
          </SectionIntro>
          <ul className="mt-8 max-w-3xl space-y-3 text-ink-soft">
            <li>
              <strong className="text-ink">If goods worth more than ₹50,000 will move, then</strong> you generally need an
              e-way bill too, and some states set a different limit within the state. Check with the{' '}
              <Link href="/tools/eway-bill-eligibility-checker" className={linkClass}>e-way bill eligibility checker</Link>.
            </li>
            <li>
              <strong className="text-ink">If e-invoicing applies to you, then</strong> B2B invoices must also be reported
              to the Invoice Registration Portal. An Excel file alone does not do that.
            </li>
            <li>
              <strong className="text-ink">If you need e-way bills for many invoices at once, then</strong> this invoice
              sheet is not the upload format. The portal has its own bulk tools; see{' '}
              <Link href="/blog/prepare-invoice-data-for-bulk-processing" className={linkClass}>preparing invoice data for
              bulk processing</Link>.
            </li>
            <li>
              <strong className="text-ink">If you bill from a phone, then</strong> the free online generator below is
              quicker than Excel, and it writes the amount in words for you.
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="send-check">
        <div className="container">
          <SectionIntro id="send-check" eyebrow="Checklist" title="Five checks before you send the PDF">
            <p>
              A sent invoice is hard to take back, and it becomes the record you report in your returns. Spend one minute on
              these five checks every time. They catch the traps above, and they work whether you use this sheet, another
              template or the online generator.
            </p>
          </SectionIntro>
          <CheckList
            items={[
              { label: 'Number', text: 'Next in your series for this financial year, with no gap or repeat.' },
              { label: 'Place of supply', text: 'Matches where the supply goes, and cell B12 shows the tax type you expect.' },
              { label: 'Formulas alive', text: 'Change one quantity and watch the totals move, then change it back.' },
              { label: 'Amount in words', text: 'Matches the rounded invoice total exactly.' },
              { label: 'File name', text: 'Save the PDF with the invoice number in the name, so you can find it at return time.' },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="online">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionIntro id="online" eyebrow="No Excel on your phone?" title="Make the same invoice online in a minute">
            <p>
              The <Link href="/invoice-generator" className={linkClass}>free invoice generator</Link> is the same invoice
              without Excel. It works in any browser, writes the amount in words, keeps an invoice number series and saved
              products, and downloads a PDF. Choose With GST or Without GST, and nothing needs to be installed.
            </p>
            <p>
              Billing every day and moving goods? In the E-Way Easy Android app the buyer’s details fill from their GSTIN,
              road distance comes from the PIN codes, and the invoice becomes the e-way bill.
            </p>
          </SectionIntro>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link href="/invoice-generator" className="btn-primary">Open the invoice generator</Link>
            <Link href="/invoice-generator#without-gst" className="btn-ghost">Make a bill without GST</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="learn">
        <div className="container">
          <SectionIntro id="learn" eyebrow="Get it right" title="Before you send the invoice">
            <p>
              A correct-looking sheet can still miss a required field or use the wrong document type. These guides explain
              what a tax invoice must show and when a bill of supply applies. The two tools check the buyer’s GSTIN and
              find HSN codes before you fill them in.
            </p>
          </SectionIntro>
          <ReadingList
            items={[
              { href: '/gst-invoice-rules', label: 'GST invoice rules', text: 'The fields every tax invoice must show, numbering, copies and time limits.' },
              { href: '/blog/invoice-with-gst-vs-without-gst', label: 'Invoice with or without GST', text: 'Tax invoice, bill of supply or a plain bill: which applies to you.' },
              { href: '/tools/gstin-validator', label: 'GSTIN validator', text: 'Check the buyer’s GSTIN format and check digit.' },
              { href: '/tools/hsn-code-lookup', label: 'HSN code lookup', text: 'Find the HSN code and description for each item.' },
            ]}
          />
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <section className="container pb-4">
        <div className="mx-auto max-w-3xl">
          <ComplianceNote title="Please note">
            <p>
              These formats are a starting point with illustrative sample values. You are responsible for the tax rates,
              details and any e-invoicing requirement that applies to you. Check current rules on the{' '}
              <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>GST portal</a>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <div className="container py-16 md:py-20">
        <DownloadCTA placement="invoice-format-excel" />
      </div>
    </>
  );
}
