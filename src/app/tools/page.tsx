import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import JsonLd from '@/components/JsonLd';
import ToolsDirectory from '@/components/tools/ToolsDirectory';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { TOOLS, toolHref } from '@/lib/tools';

export const metadata = pageMeta({
  title: 'Free GST & E-Way Bill Tools — Calculators, Invoice Generator',
  description:
    'Free GST calculator, inclusive/exclusive converter, e-way bill eligibility checker, validity calculator, HSN chapter lookup and GST invoice generator. Runs in your browser.',
  path: '/tools',
});

const itemList = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    url: absoluteUrl(toolHref(t.slug)),
  })),
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={itemList} />
      <PageHeader
        eyebrow="Free tools"
        title="Free GST and e-way bill tools"
        description="Quick calculators and an invoice creator for everyday GST and e-way bill work. Everything runs in your browser — nothing you type is uploaded."
        crumbs={[{ name: 'Free Tools', href: '/tools' }]}
      />
      <div className="container py-10 md:py-14">
        <ToolsDirectory />

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-ink">What these tools do — and don&apos;t</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-7 text-ink-soft">
              <li>They do the arithmetic: GST amounts, validity days, totals and invoice layouts.</li>
              <li>They do not decide the correct GST rate, HSN code or whether an exemption applies to you.</li>
              <li>They do not generate e-way bills. E-way bills are generated on the official portal or through an authorised integration.</li>
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold text-ink">Learn the rules behind the numbers</h2>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li><Link className="font-semibold text-brand-700 hover:underline" href="/eway-bill-rules">E-way bill rules (Rule 138)</Link></li>
              <li><Link className="font-semibold text-brand-700 hover:underline" href="/eway-bill-validity">E-way bill validity</Link></li>
              <li><Link className="font-semibold text-brand-700 hover:underline" href="/eway-bill-distance-rules">Distance rules</Link></li>
              <li><Link className="font-semibold text-brand-700 hover:underline" href="/eway-bill-vs-sales-invoice">E-way bill vs sales invoice</Link></li>
            </ul>
          </div>
        </section>

        <div className="mt-14">
          <DownloadCTA placement="tools-directory" />
        </div>
      </div>
    </>
  );
}
