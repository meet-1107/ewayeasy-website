import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import PlayBadge from '@/components/PlayBadge';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import { SectionIntro, ReadingList, FaqList, linkClass, type Faq } from '@/components/solutions/SolutionBlocks';
import { StepList, CheckList } from '@/components/feature-pages/FeatureBlocks';
import { pageMeta, faqLd } from '@/lib/seo';

const PATH = '/eway-bill-api-setup';

export const metadata = pageMeta({
  title: 'E-Way Bill API Login Setup: Connect E-Way Easy Safely',
  description:
    'How to connect your e-way bill API login to E-Way Easy: what the API login is, how bills are filed via an authorised GSP, and how your credentials are stored.',
  path: PATH,
});

const FAQ: Faq[] = [
  {
    q: 'What is an e-way bill API login?',
    a: 'It is a separate username and password, created by a registered taxpayer on the official e-way bill portal, for filing e-way bills through a GST Suvidha Provider (GSP) instead of the portal’s own screens. It is different from your normal portal login.',
  },
  {
    q: 'Is my normal e-way bill portal or GST portal password needed?',
    a: 'No. E-Way Easy uses only the API login you create for this purpose. We never ask for your GST portal password, and nobody from E-Way Easy will ask for it, or for an OTP, over phone, chat or email.',
  },
  {
    q: 'Are e-way bills from E-Way Easy valid?',
    a: 'E-way bills are filed on the official NIC e-way bill system through an authorised GSP, using your own API credentials. The e-way bill number you get is issued by that system, the same as any other e-way bill. You remain responsible for the details you file.',
  },
  {
    q: 'How are my API credentials stored?',
    a: 'Your e-way bill system API login is stored encrypted and is used only to file the e-way bill actions you ask for in the app. You can export your data at any time.',
  },
  {
    q: 'Something went wrong during setup. Where can I get help?',
    a: 'Follow the guided setup in the app step by step, and use Help inside the app if a step fails. Our help page covers common problems, and the official portal’s user documentation explains API registration from its side.',
  },
];

export default function EwayBillApiSetupPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Setup & security"
        title="E-way bill API login setup: how E-Way Easy connects"
        description="To file e-way bills from your phone, E-Way Easy uses an e-way bill API login that you create on the official portal. Here is what that means, how it is set up and how your credentials are handled."
        crumbs={[
          { name: 'Features', href: '/features' },
          { name: 'E-way bill API setup', href: PATH },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <PlayBadge placement="api-setup-hero" />
          <a href="#setup" className="btn-ghost-dark">See the 4 setup steps</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="what">
        <div className="container grid items-start gap-12 lg:grid-cols-2">
          <SectionIntro id="what" eyebrow="The basics" title="What is an e-way bill API login?">
            <p>
              The official e-way bill system can be used in two ways: through its website screens, or through an API, where
              approved software files e-way bills on your behalf. Software reaches the API through a GST Suvidha Provider
              (GSP) authorised for the e-way bill system.
            </p>
            <p>
              For API filing, a registered taxpayer creates a separate API username and password on the official e-way bill
              portal. This is not your normal portal login and not your GST portal password. It is meant only for filing
              through a GSP, and you can manage it on the portal yourself.
            </p>
            <p>
              The exact screens on the portal can change, so follow the guided setup in the E-Way Easy app together with the{' '}
              <a href="https://docs.ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                official e-way bill user documentation
              </a>
              .
            </p>
          </SectionIntro>
          <div className="card p-6 md:p-8">
            <h3 className="font-display text-lg font-semibold text-ink">How an e-way bill is filed from the app</h3>
            <ol className="mt-5 space-y-4">
              {[
                ['You', 'review the details and tap Generate (or update, extend, cancel, consolidate).'],
                ['E-Way Easy', 'sends that one request, with your own API login, through an authorised GSP.'],
                ['Official NIC e-way bill system', 'checks it and issues the e-way bill number, or rejects it with a reason.'],
                ['The app', 'shows the result. Credits are taken only if the action succeeded.'],
              ].map(([who, what], i) => (
                <li key={who} className="flex gap-3 text-sm leading-6 text-ink-soft">
                  <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span>
                    <strong className="text-ink">{who}</strong> {what}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="setup" className="section scroll-mt-20 bg-white" aria-labelledby="setup-heading">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="setup-heading" eyebrow="Setup" title="Four steps from install to your first e-way bill">
              <p>The API connection is a one-time step. After that, filing is part of the normal app flow.</p>
            </SectionIntro>
            <StepList
              steps={[
                {
                  title: 'Sign up and add your GSTIN',
                  text: 'Sign in with email or Google and add your business GSTIN and details.',
                },
                {
                  title: 'Connect your e-way bill API login',
                  text: 'Create the API login on the official portal if you do not have one, then enter it in the app. The guided setup takes you through it.',
                },
                {
                  title: 'Create or import an invoice',
                  text: (
                    <>
                      Make the sales invoice in the app, or{' '}
                      <Link href="/invoice-pdf-to-eway-bill" className={linkClass}>import an invoice PDF</Link> and review
                      the details it reads.
                    </>
                  ),
                },
                {
                  title: 'Tap Generate',
                  text: 'The e-way bill is filed on the official system and the e-way bill number is shown in the app.',
                },
              ]}
            />
            <p className="mt-6 text-sm text-ink-soft">
              What happens on the invoice and review screens is covered in{' '}
              <Link href="/how-it-works" className={linkClass}>how E-Way Easy works</Link>.
            </p>
          </div>
          <div className="mx-auto">
            <Phone
              screen="dashboard"
              width={240}
              alt="E-Way Easy dashboard after setup, showing the business name and GSTIN, wallet credits, Create invoice and Import PDF (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="security">
        <div className="container">
          <SectionIntro id="security" eyebrow="Your data" title="How your credentials and data are handled">
            <p>
              Read the full <Link href="/privacy-policy" className={linkClass}>privacy policy</Link> for details. In short:
            </p>
          </SectionIntro>
          <CheckList
            items={[
              {
                label: 'API login stored encrypted',
                text: 'Your e-way bill system API login is stored encrypted, not in plain text.',
              },
              {
                label: 'Used only when you ask',
                text: 'It is used only for the e-way bill actions you request in the app: generate, update Part B, extend, cancel or consolidate.',
              },
              {
                label: 'Sign in with email or Google',
                text: 'Your E-Way Easy account uses your email or Google sign-in, separate from any government login.',
              },
              {
                label: 'Export your data any time',
                text: 'Your data is yours. You can export it from the app whenever you want.',
              },
              {
                label: 'Payments through Razorpay',
                text: (
                  <>
                    Credits are bought through Razorpay by UPI, card or net banking, with payment details entered on
                    Razorpay’s own screens. See <Link href="/pricing" className={linkClass}>pricing</Link>.
                  </>
                ),
              },
              {
                label: 'Your own credentials, your own filings',
                text: 'Every e-way bill is filed under your GSTIN with your API login, so it appears on the official portal like any other.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="never">
        <div className="container max-w-3xl">
          <h2 id="never" className="h2">What we will never ask for</h2>
          <ul className="mt-6 space-y-3 text-ink-soft">
            {[
              'Your GST portal password, over phone, WhatsApp, chat or email.',
              'OTPs sent to your registered mobile or email.',
              'Your normal e-way bill portal password. The app needs only the API login you create for GSP filing, entered by you inside the app.',
              'Card numbers, UPI PINs or bank passwords. Payments go through Razorpay’s own screens.',
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span aria-hidden className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-red-600 text-[11px] font-bold text-white">✕</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">
            If anyone claiming to be from E-Way Easy asks for these, do not share them, and tell us through the{' '}
            <Link href="/contact" className={linkClass}>contact page</Link>.
          </p>
        </div>
      </section>

      <section className="container py-12" aria-labelledby="independence">
        <div className="mx-auto max-w-3xl">
          <h2 id="independence" className="sr-only">Independence disclaimer</h2>
          <ComplianceNote title="E-Way Easy is independent">
            <p>
              E-Way Easy is a private app. It is not a government portal and is not affiliated with, endorsed by or
              operated by the Government of India, GSTN or NIC. E-way bills are filed on the official NIC e-way bill
              system through an authorised GSP using your own API credentials.
            </p>
            <p>
              You can always use the{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                official e-way bill portal
              </a>{' '}
              directly. You are responsible for the accuracy of what you file. Also read our{' '}
              <Link href="/disclaimer" className={linkClass}>disclaimer</Link>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <section className="section pt-0" aria-labelledby="read-next">
        <div className="container">
          <SectionIntro id="read-next" eyebrow="Read next" title="After setup" />
          <ReadingList
            items={[
              {
                href: '/eway-bill-management-app',
                label: 'Manage e-way bills in the app',
                text: 'Update Part B, extend, cancel, consolidate and share the PDF.',
              },
              {
                href: '/help',
                label: 'Help and troubleshooting',
                text: 'Answers to common setup and filing problems.',
              },
              {
                href: '/eway-bill-common-errors',
                label: 'Common e-way bill errors',
                text: 'Why the portal rejects an e-way bill, and how to fix the data.',
              },
              {
                href: '/pricing',
                label: 'Pricing and credits',
                text: 'Pay-as-you-go credits, 5 per action, charged only on success.',
              },
            ]}
          />
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="api-setup-footer"
          title="Set up once, file from your phone"
          text="Add your GSTIN, connect your e-way bill API login with the guided setup, and generate your first e-way bill."
        />
      </div>
    </>
  );
}
