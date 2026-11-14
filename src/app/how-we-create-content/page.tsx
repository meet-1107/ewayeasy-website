import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import JsonLd from '@/components/JsonLd';
import { SectionIntro, linkClass } from '@/components/solutions/SolutionBlocks';
import { absoluteUrl, ORG_ID, pageMeta } from '@/lib/seo';
import { AUTHOR, FOUNDER, OFFICIAL_SOURCES, SUPPORT_EMAIL } from '@/lib/site';

const PATH = '/how-we-create-content';
const DESCRIPTION =
  'Who writes the E-Way Easy guides, how they are researched, drafted with AI assistance and checked against official GST sources, how dates work and how to report a mistake.';

export const metadata = pageMeta({ title: 'How We Create Our Guides and Tools', description: DESCRIPTION, path: PATH });

const STEPS = [
  {
    title: 'Start from a real task',
    text: 'Each guide answers something a business has to get right when it bills or moves goods: when an e-way bill is needed, what a tax invoice must show, how to fix a wrong vehicle number. One page, one topic.',
  },
  {
    title: 'Research from primary sources',
    text: 'Rules come from the CGST Act and Rules, CBIC notifications and circulars, the GST portal and the official e-way bill and e-invoice portals. Those sources are listed at the end of every article, so you can check them yourself.',
  },
  {
    title: 'Draft with AI assistance',
    text: 'We use AI writing tools to help research and draft articles and to turn our notes into plain English. AI is a drafting aid, not the source of truth: it does not decide what a rule says.',
  },
  {
    title: 'Edit and check the facts',
    text: 'A person edits every draft. Thresholds, time limits, rule numbers, examples and any statement about the app are checked against the official sources and against what the app actually does before the page goes live.',
  },
  {
    title: 'Keep it current',
    text: 'When a rule changes or a reader reports a mistake, we update the page, note the change in its update history and change the dates shown on it.',
  },
];

export default function HowWeCreateContentPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'How we create our guides and tools',
          description: DESCRIPTION,
          url: absoluteUrl(PATH),
          inLanguage: 'en-IN',
          publisher: { '@id': ORG_ID },
        }}
      />
      <PageHeader
        eyebrow="Editorial policy"
        title="How we create our guides and tools"
        description="Who writes what you read here, how it is made and checked, and why we publish it. Plainly, so you can decide how much to trust it."
        crumbs={[{ name: 'About', href: '/about' }, { name: 'How we create content', href: PATH }]}
      />

      <div className="container py-12 md:py-16">
        <div className="prose-content mx-auto max-w-3xl">
          <h2 id="why">Why we publish</h2>
          <p>
            E-Way Easy makes an Android app that turns a GST sales invoice into an e-way bill. Our customers and the
            businesses around them ask the same questions every day, so we answer them here, in plain English, whether or
            not you use our app. The guides and free tools are meant to be useful to someone who arrives directly, not to
            chase search traffic.
          </p>
          <p>
            <strong>We have a commercial interest.</strong> Where the app genuinely helps with the task on a page, we say so
            and link to it. We also say what it does not do, such as bulk e-way bill generation or e-invoice (IRN)
            generation, and we point to the official portal when it is the better route.
          </p>

          <h2 id="who">Who writes and checks the content</h2>
          <ul>
            <li>
              <strong><Link href={`/authors/${AUTHOR.slug}`}>{AUTHOR.name}</Link></strong> writes and edits the guides and
              articles. His name is on every article, with a link to his author page.
            </li>
            <li>
              <strong><Link href="/about">{FOUNDER.name}</Link></strong>, the founder, built the app and confirms every
              statement about what it does, what it costs and what it does not do.
            </li>
          </ul>
          <p>
            We do not use made-up writers, invented credentials or AI-generated portraits. Photos of people on this site are
            licensed stock photos, labelled as illustrative; they are not our customers. We will only publish customer
            reviews from real users who agree to be named.
          </p>

          <h2 id="how">How an article is made</h2>
          <ol>
            {STEPS.map((s) => (
              <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>
            ))}
          </ol>

          <h2 id="dates">What the dates mean</h2>
          <ul>
            <li><strong>Published</strong>: the day the article first appeared on this website. We never backdate.</li>
            <li><strong>Updated</strong>: changes only when the content itself changes in a meaningful way, not to look fresh.</li>
            <li><strong>Last verified</strong>: the last day we re-checked the article’s facts against official sources.</li>
          </ul>

          <h2 id="examples">Examples and numbers</h2>
          <p>
            Worked examples use made-up businesses and sample GSTINs, and are marked <em>Example (illustrative)</em>. Tax
            rates in examples are for illustration; always check the rate for your HSN code. We do not publish user counts,
            ratings or performance figures we cannot verify.
          </p>

          <h2 id="tools">How the free tools work</h2>
          <p>
            The calculators, checkers and invoice templates run in your browser. They do the arithmetic and apply the rule
            explained on each page; they do not decide your tax rate or whether an exemption applies, and nothing you type
            into them is uploaded.
          </p>

          <h2 id="corrections">Found a mistake?</h2>
          <p>
            Tell us and we will check it against the official source and fix it.{' '}
            {SUPPORT_EMAIL ? (
              <>Email <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Correction')}`}>{SUPPORT_EMAIL}</a> or use the </>
            ) : (
              <>Use the </>
            )}
            <Link href="/contact">contact form</Link>, with the page address and what looks wrong.
          </p>

          <h2 id="not-advice">Independence and limits</h2>
          <p>
            E-Way Easy is a private company. It is not a government portal and is not affiliated with GSTN, NIC or CBIC.
            Our content is general information, not tax or legal advice; for decisions about your business, check the
            official source or ask your tax adviser.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <SectionIntro id="sources" eyebrow="Sources we rely on" title="Official sources" />
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {OFFICIAL_SOURCES.map((s) => (
              <li key={s.url} className="rounded-xl border border-brand-900/10 bg-white px-4 py-3 text-sm">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>{s.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
