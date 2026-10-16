import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import ComplianceNote from '@/components/ComplianceNote';
import { pageMeta } from '@/lib/seo';
import { SUPPORT_EMAIL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact E-Way Easy',
  description:
    'Get in touch with the E-Way Easy team for app support, corrections to our guides or general questions. Email us or use Help inside the app.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact us"
        description="Questions about the app, a correction to one of our guides, or feedback: we would like to hear from you."
        crumbs={[{ name: 'Contact', href: '/contact' }]}
      />

      <div className="container py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.6fr]">
          <aside className="space-y-5">
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink">Email support</h2>
              {SUPPORT_EMAIL ? (
                <p className="mt-2 text-ink-soft">
                  Write to{' '}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-brand-700 underline">
                    {SUPPORT_EMAIL}
                  </a>
                  . Please include your business name and a short description of the issue.
                </p>
              ) : (
                <p className="mt-2 text-ink-soft">Support email will be published at launch.</p>
              )}
            </div>

            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-ink">Help inside the app</h2>
              <p className="mt-2 text-ink-soft">
                Already using E-Way Easy? Open <strong className="text-ink">Help</strong> inside the app for support with
                invoices, e-way bill details or your wallet credits.
              </p>
            </div>

            <ComplianceNote title="Keep your login details private">
              <p>
                We will never ask for your GST portal or e-way bill portal password, or for OTPs. Please do not send them
                to us by email or through this form.
              </p>
            </ComplianceNote>

            <p className="text-sm text-ink-soft">
              E-Way Easy is not a government portal. For official e-way bill services, use the{' '}
              <a
                href="https://ewaybillgst.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 underline"
              >
                official e-way bill portal
              </a>
              . See how we handle your information in our{' '}
              <Link href="/privacy-policy" className="text-brand-700 underline">
                privacy policy
              </Link>
              .
            </p>
          </aside>

          <ContactForm supportEmail={SUPPORT_EMAIL} />
        </div>
      </div>
    </>
  );
}
