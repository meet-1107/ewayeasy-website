import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import HelpSearch from '@/components/help/HelpSearch';
import { GETTING_STARTED_FAQ, HELP_ARTICLES } from '@/components/help/articles';
import { faqLd, pageMeta } from '@/lib/seo';
import { SITE, SUPPORT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Help Centre',
  description:
    'E-Way Easy help: get started in three steps and fix common problems such as GSTIN details not filling, wrong distance, HSN errors, low wallet credits or a stuck generation.',
  path: '/help',
});

const STEPS = [
  {
    title: 'Install the app',
    text: `Download ${SITE.name} from Google Play on your Android phone and open it.`,
  },
  {
    title: 'Add your business',
    text: 'Enter your business name, GSTIN and address. These seller details are saved, so you do not type them again on every invoice.',
  },
  {
    title: 'Step 1: Invoice',
    text: 'Enter the buyer GSTIN (name, address, state and PIN fill in automatically; leave it empty for an unregistered buyer), pick products from your saved list and check the invoice number.',
  },
  {
    title: 'Step 2: Review EWB',
    text: 'Check the e-way bill details, including HSN codes and the distance calculated from PIN codes. Edit anything that is not right, and preview the sales invoice.',
  },
  {
    title: 'Step 3: Generated',
    text: 'Confirm to complete the workflow. Your invoice and e-way bill counts on the dashboard update, and the activity appears in your recent list.',
  },
];

const TOOLS = [
  { label: 'GSTIN validator', href: '/tools/gstin-validator', text: 'Check a GSTIN format before you enter it.' },
  { label: 'Distance calculator', href: '/tools/distance-calculator', text: 'Estimate PIN-to-PIN distance.' },
  {
    label: 'Invoice vs e-way bill checker',
    href: '/tools/invoice-vs-eway-bill-checker',
    text: 'Spot mismatches between your invoice and e-way bill.',
  },
];

const supportHref = SUPPORT_EMAIL
  ? `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`${SITE.name} help request`)}`
  : null;

export default function HelpPage() {
  const faq = [...GETTING_STARTED_FAQ, ...HELP_ARTICLES.map((h) => ({ q: h.q, a: h.a.join(' ') }))];

  return (
    <>
      <JsonLd data={faqLd(faq)} />
      <PageHeader
        eyebrow="Help"
        title="Help centre"
        description={`Get started with ${SITE.name} and find plain-language fixes for the problems people run into most.`}
        crumbs={[{ name: 'Help', href: '/help' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl space-y-14">
          <section aria-labelledby="getting-started">
            <h2 id="getting-started" className="h2">
              Getting started
            </h2>
            <p className="mt-3 text-ink-soft">
              From install to your first invoice. The app guides you through three steps:{' '}
              <strong className="text-ink">Invoice → Review EWB → Generated</strong>.
            </p>
            <ol className="mt-6 space-y-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="card flex gap-4 p-5">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 font-semibold text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-soft">
              Tip: save your regular buyers and products once. Next time you can pick them from the list, and the HSN
              code fills in from the product. See all <Link href="/features" className="text-brand-700 underline">features</Link>.
            </p>
          </section>

          <section aria-labelledby="common-problems">
            <h2 id="common-problems" className="h2">
              Common problems and fixes
            </h2>
            <p className="mb-6 mt-3 text-ink-soft">Search or open a question to see the fix.</p>
            <HelpSearch articles={HELP_ARTICLES} />
          </section>

          <section aria-labelledby="help-tools">
            <h2 id="help-tools" className="h2">
              Free tools that help
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {TOOLS.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="card block h-full p-5 transition hover:border-brand-700">
                    <h3 className="font-display font-semibold text-ink">{t.label}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{t.text}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-soft">
              More in the <Link href="/tools" className="text-brand-700 underline">free tools</Link> section.
            </p>
          </section>

          <ComplianceNote title="Keep your login details safe">
            <p>
              Never share your GST portal or e-way bill portal password, or any OTP, with anyone, including us. {SITE.name}{' '}
              support will never ask for them.
            </p>
          </ComplianceNote>

          <section aria-labelledby="still-stuck" className="card p-6 md:p-8">
            <h2 id="still-stuck" className="font-display text-2xl font-bold text-ink">
              Still stuck?
            </h2>
            <p className="mt-3 text-ink-soft">
              You can also open <strong className="text-ink">Help</strong> inside the app. When you write to us, please
              include your business name, the invoice number (if any) and a screenshot of the screen or error.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {supportHref ? (
                <a href={supportHref} className="btn-primary">
                  Email {SUPPORT_EMAIL}
                </a>
              ) : (
                <p className="text-sm text-ink-soft">Support email will be published at launch.</p>
              )}
              <Link href="/contact" className="btn-ghost">
                Contact page
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-faint">
              Questions about payments or credits? See <Link href="/pricing" className="underline">pricing</Link> and our{' '}
              <Link href="/refund-policy" className="underline">refund policy</Link>.
            </p>
          </section>

          <p className="text-sm text-ink-soft">
            {SITE.name} is not a government portal and is not affiliated with GSTN or NIC. For official services, use the{' '}
            <a
              href="https://ewaybillgst.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 underline"
            >
              official e-way bill portal
            </a>
            .
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <DownloadCTA placement="help" />
        </div>
      </div>
    </>
  );
}
