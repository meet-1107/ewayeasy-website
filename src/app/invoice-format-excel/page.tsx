import Link from 'next/link';
import ComplianceNote from '@/components/ComplianceNote';
import DataTable from '@/components/DataTable';
import DownloadCTA from '@/components/DownloadCTA';
import JsonLd from '@/components/JsonLd';
import PageHeader from '@/components/PageHeader';
import { StepList } from '@/components/feature-pages/FeatureBlocks';
import { FaqList, ReadingList, SectionIntro, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
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
    q: 'How do I save the Excel invoice as a PDF?',
    a: 'In Excel choose File, Save As (or Export), and pick PDF. In Google Sheets choose File, Download, PDF. The sheet is set to fit one A4 page width.',
  },
  {
    q: 'Excel or online generator: which is better?',
    a: 'Excel suits you if you keep records in spreadsheets. The online generator is quicker on a phone, needs nothing installed, writes the amount in words and saves products and an invoice number series in your browser.',
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
            The sheet calculates taxable value, CGST and SGST or IGST, round-off and the total. Then save it as a PDF.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="downloads">
        <div className="container">
          <SectionIntro id="downloads" eyebrow="Downloads" title="Choose your Excel invoice format" />
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
          <SectionIntro id="how" eyebrow="How to use" title="Fill the Excel invoice in 4 steps" />
          <StepList
            steps={[
              { title: 'Add your details once', text: 'Replace the sample business name, address, GSTIN and state code. Save the file as your own blank template.' },
              { title: 'Enter the invoice number and buyer', text: 'Use the next number in your series, the date, buyer details and the place of supply state code.' },
              { title: 'Fill the items', text: 'Description, HSN, quantity, unit, rate, discount and GST %. Everything in white cells calculates itself.' },
              { title: 'Type the amount in words and save as PDF', text: 'Add bank details and terms, then File → Save As → PDF, or print on A4.' },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="formulas">
        <div className="container">
          <SectionIntro id="formulas" eyebrow="No hidden magic" title="The formulas inside the GST format">
            <p>
              Every calculation is a plain Excel formula you can read and change. Want the reasoning behind them? See{' '}
              <Link href="/blog/how-to-calculate-gst-on-sales-invoice" className={linkClass}>how to calculate GST on an invoice</Link>{' '}
              and <Link href="/blog/cgst-sgst-igst-explained" className={linkClass}>CGST vs SGST vs IGST</Link>.
            </p>
          </SectionIntro>
          <div className="mt-8 max-w-4xl">
            <DataTable caption="Formulas used in the GST invoice Excel format" columns={['Field', 'Rule', 'Excel formula (row 15)']} rows={FORMULA_ROWS} />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="online">
        <div className="container grid items-center gap-10 lg:grid-cols-2">
          <SectionIntro id="online" eyebrow="No Excel on your phone?" title="Make the same invoice online in a minute">
            <p>
              The <Link href="/invoice-generator" className={linkClass}>free invoice generator</Link> works in any browser,
              writes the amount in words, keeps an invoice number series and saved products, and downloads a PDF. Choose
              With GST or Without GST.
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
          <SectionIntro id="learn" eyebrow="Get it right" title="Before you send the invoice" />
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
