import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import { Phone } from '@/components/AppGraphics';
import {
  SectionIntro, ProblemGrid, WorkflowMap, ToolCards, ReadingList, FaqList, linkClass, type Faq,
} from '@/components/solutions/SolutionBlocks';
import { pageMeta, faqLd } from '@/lib/seo';
import { PRICING } from '@/lib/pricing';

export const metadata = pageMeta({
  title: 'E-Way Bill App for Transporters: Part B & Consolidated EWB',
  description:
    'For transporters and logistics firms: update vehicle numbers in Part B en route, make consolidated e-way bills, extend validity and share PDFs with drivers.',
  path: '/solutions/transporters',
});

const CREDITS = PRICING.creditsPerEwayBill ?? 5;

const FAQ: Faq[] = [
  {
    q: 'Can a transporter use E-Way Easy?',
    a: 'Yes. Transporters are among the businesses the app is built for. You sign up, add your GSTIN and connect your own e-way bill system API login once. After that you can generate e-way bills where you are responsible for them, update Part B, extend, cancel and make consolidated e-way bills from your phone.',
  },
  {
    q: 'Can I update the vehicle number when goods are shifted to another truck?',
    a: `Yes. Update Part B with the new vehicle number in the app before the goods move on. Each Part B update costs ${CREDITS} credits, taken only if the update succeeds.`,
  },
  {
    q: 'Can I make one consolidated e-way bill for several consignments in my truck?',
    a: `Yes. When several consignments, each with its own valid e-way bill, travel in one vehicle, you can create a consolidated e-way bill for the trip in the app. It costs ${CREDITS} credits on success.`,
  },
  {
    q: 'Does the app support multiple users, such as dispatch staff and drivers?',
    a: 'No. Multi-user or team accounts are not available. Drivers do not need the app: share the e-way bill PDF with them on WhatsApp, or print it.',
  },
  {
    q: 'We are not registered under GST. Can we still work with e-way bills?',
    a: 'Unregistered transporters can enrol on the official e-way bill portal to get a Transporter ID. E-Way Easy setup starts with a business GSTIN, so check whether the app fits your case before buying credits; the official portal is always available.',
  },
];

export default function TransportersPage() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHeader
        eyebrow="Solutions · Transporters"
        title="E-way bills for transporters, managed from the road"
        description="Vehicles change, loads get combined and trips run late. E-Way Easy lets transporters and logistics firms handle Part B, consolidation and extensions from an Android phone."
        crumbs={[
          { name: 'Solutions', href: '/solutions' },
          { name: 'Transporters', href: '/solutions/transporters' },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/download" className="btn-amber">Get the Android app</Link>
          <a href="#how-the-app-helps" className="btn-ghost-dark">See how it helps on the road</a>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="problem">
        <div className="container">
          <SectionIntro id="problem" eyebrow="The daily problem" title="A transporter’s e-way bill day">
            <p>
              For a transport company, the e-way bill does not end when the consignor generates it. Your office and your
              drivers deal with everything that happens between loading and delivery.
            </p>
          </SectionIntro>
          <ProblemGrid
            items={[
              {
                title: 'The vehicle changes mid-way',
                text: 'A breakdown or trans-shipment means the goods continue in another truck, and Part B must show that vehicle before they move on.',
              },
              {
                title: 'Many consignments, one truck',
                text: 'Part loads from different consignors share a vehicle. Carrying a separate e-way bill for each, with the right vehicle on all of them, is easy to get wrong.',
              },
              {
                title: 'Trips that run late',
                text: 'Traffic, weather or a breakdown can push delivery past the e-way bill’s validity. The extension window is short, and missing it causes trouble at a check.',
              },
              {
                title: 'The driver needs the document',
                text: 'The e-way bill number or a copy has to travel with the goods. Calling the office for it at a checkpost wastes time.',
              },
            ]}
          />
        </div>
      </section>

      <section id="how-the-app-helps" className="section scroll-mt-20 bg-white" aria-labelledby="workflow">
        <div className="container grid items-start gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <SectionIntro id="workflow" eyebrow="How the app helps" title="Part B, consolidation and extensions on your phone">
              <p>
                Each action below is filed on the official e-way bill system using your own API login and costs {CREDITS}{' '}
                credits, charged only on success. The full list is on the{' '}
                <Link href="/eway-bill-management-app" className={linkClass}>e-way bill management app page</Link>.
              </p>
            </SectionIntro>
            <WorkflowMap
              rows={[
                {
                  need: 'Update Part B and the vehicle number en route',
                  app: (
                    <>
                      Enter the new vehicle number on the same e-way bill when goods change trucks. See{' '}
                      <Link href="/blog/how-to-update-vehicle-details-in-eway-bill" className={linkClass}>
                        how vehicle details are updated
                      </Link>{' '}
                      for when this is needed.
                    </>
                  ),
                },
                {
                  need: 'Update the transporter',
                  app: 'Change the transporter on an e-way bill when the consignment is handed over to another transporter.',
                },
                {
                  need: 'One consolidated e-way bill per trip',
                  app: (
                    <>
                      Combine the e-way bills of consignments travelling together in one vehicle into a consolidated
                      e-way bill. Read the{' '}
                      <Link href="/consolidated-eway-bill" className={linkClass}>consolidated e-way bill guide</Link> for
                      the rules.
                    </>
                  ),
                },
                {
                  need: 'Extend validity when a trip runs late',
                  app: (
                    <>
                      Request an extension from the app within the allowed window. The{' '}
                      <Link href="/eway-bill-validity" className={linkClass}>validity and extension guide</Link> explains
                      the timing.
                    </>
                  ),
                },
                {
                  need: 'Send the e-way bill to the driver',
                  app: 'Download the e-way bill PDF and share it on WhatsApp or email, or print it for the vehicle. Drivers do not need the app.',
                },
                {
                  need: 'Saved transporters and vehicles',
                  app: 'Transporters and vehicles you use often are saved, so you pick them instead of typing the transporter ID and vehicle number each time.',
                },
              ]}
            />
          </div>
          <div className="mx-auto">
            <Phone
              screen="generated"
              width={250}
              alt="E-Way Easy screen showing a generated e-way bill number with Print and Share PDF buttons for sending to the driver (sample data)"
            />
            <p className="mt-3 text-center text-xs text-ink-faint">Sample data shown for illustration.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="rules">
        <div className="container">
          <SectionIntro id="rules" eyebrow="Know the rules" title="Two rules every transporter should know">
            <p>These are summaries. The linked guides explain the detail and the exceptions.</p>
          </SectionIntro>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="card p-6">
              <h3 className="font-display text-lg font-semibold text-ink">Who generates the e-way bill</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Usually the registered consignor or the recipient generates it. If neither has, and the consignment needs
                one, the transporter must generate it before the goods move. Transporters without GST registration can
                enrol on the portal for a Transporter ID.
              </p>
              <Link href="/blog/who-is-responsible-for-generating-eway-bill" className={`mt-4 inline-block text-sm ${linkClass}`}>
                Who is responsible for generating an e-way bill
              </Link>
            </article>
            <article className="card p-6">
              <h3 className="font-display text-lg font-semibold text-ink">The 50 km Part B exemption</h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                Within the same state, Part B need not be filled when goods move up to 50 km between the consignor’s place
                and the transporter’s place for onward transport (or from the transporter to the consignee). Part A is still
                required, and Part B must be filled before the onward journey.
              </p>
              <Link href="/eway-bill-distance-rules" className={`mt-4 inline-block text-sm ${linkClass}`}>
                E-way bill distance rules and the 50 km exemption
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="tools">
        <div className="container">
          <SectionIntro id="tools" eyebrow="Free on this website" title="Free tools for the transport office">
            <p>These run in your browser and are free to use, with or without the app.</p>
          </SectionIntro>
          <ToolCards
            items={[
              {
                slug: 'distance-calculator',
                why: 'Enter the distance to see validity days, expiry time and the extension window for a trip.',
              },
              {
                slug: 'eway-bill-eligibility-checker',
                why: 'Check whether a consignment needs an e-way bill before you accept it for transport.',
              },
              {
                slug: 'invoice-vs-eway-bill-checker',
                why: 'Compare the invoice handed to the driver with the e-way bill details to spot mismatches.',
              },
            ]}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="guides">
        <div className="container">
          <SectionIntro id="guides" eyebrow="Read next" title="Guides for transporters" />
          <ReadingList
            items={[
              {
                href: '/blog/eway-bill-part-a-and-part-b-explained',
                label: 'Part A and Part B explained',
                text: 'What each part contains and who fills it.',
              },
              {
                href: '/blog/what-to-do-when-eway-bill-expires',
                label: 'What to do when an e-way bill expires',
                text: 'Options when goods are still in transit after validity ends.',
              },
              {
                href: '/eway-bill-cancellation',
                label: 'Cancelling an e-way bill',
                text: 'When a consignment does not move, and the time limit to cancel.',
              },
              {
                href: '/documents-required-for-eway-bill',
                label: 'Documents the driver should carry',
                text: 'The invoice or challan and the e-way bill: what needs to travel with the goods.',
              },
            ]}
          />
        </div>
      </section>

      <section className="container py-12" aria-labelledby="limits">
        <div className="mx-auto max-w-3xl">
          <h2 id="limits" className="sr-only">What the app does not do</h2>
          <ComplianceNote title="Honest limits">
            <p>
              E-Way Easy is not a government portal and is not affiliated with GSTN or NIC. Bulk e-way bill generation,
              multi-user accounts for staff or drivers, offline use and an iPhone app are not available today.
            </p>
            <p>
              Rules can change, so check the latest position on the{' '}
              <a href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer" className={linkClass}>official e-way bill portal</a>.
            </p>
          </ComplianceNote>
        </div>
      </section>

      <FaqList id="faq" faq={FAQ} />

      <div className="container py-16 md:py-24">
        <DownloadCTA
          placement="solutions-transporters"
          title="Keep the trucks moving"
          text="Update Part B, consolidate consignments, extend validity and send the e-way bill PDF to drivers from your Android phone."
        />
      </div>
    </>
  );
}
