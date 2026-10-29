import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import DownloadCTA from '@/components/DownloadCTA';
import ComplianceNote from '@/components/ComplianceNote';
import JsonLd from '@/components/JsonLd';
import PlayBadge from '@/components/PlayBadge';
import VillageNight from '@/components/VillageNight';
import { absoluteUrl, pageMeta } from '@/lib/seo';
import { AUTHOR, FOUNDER, OFFICIAL_SOURCES, SITE, SITE_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Our Story: E-Way Easy and Founder Meet Akabari',
  description:
    'How Meet Akabari from Nani Bhagedi, near Kalavad, built E-Way Easy on one laptop after office hours, so Indian businesses can make invoices and e-way bills in one tap.',
  path: '/about',
});

const JOURNEY: { when: string; title: string; text: string }[] = [
  {
    when: 'The beginning',
    title: `${FOUNDER.village}, near ${FOUNDER.near}`,
    text: `${FOUNDER.name} comes from ${FOUNDER.village}, a small village near ${FOUNDER.near} in ${FOUNDER.state}, where people stay closely connected to each other. That connection with people is at the heart of E-Way Easy.`,
  },
  {
    when: 'One laptop',
    title: 'Everything started on a single laptop',
    text: 'There was no office and no team: just one laptop and a habit of learning by building.',
  },
  {
    when: `${FOUNDER.previousWorkYears} year`,
    title: `Working at ${FOUNDER.previousWork}`,
    text: `Meet worked at ${FOUNDER.previousWork} for a year. During that year the core idea took shape: a business should be able to make its sales invoice and its e-way bill in a single tap, without typing the same details twice.`,
  },
  {
    when: `${FOUNDER.buildMonths} months`,
    title: 'After office, until 2 AM',
    text: `Every evening, after coming home from the office, he started work on E-Way Easy and kept going until about 2 AM. He did this for ${FOUNDER.buildMonths} months, driven by dedication and a simple mindset: grow yourself, support your family, and build something useful for people across India.`,
  },
  {
    when: 'Today',
    title: 'E-Way Easy on Google Play',
    text: 'The result is an Android app where you create or import the sales invoice, review the e-way bill details and tap Generate, with Part B updates, extensions, cancellation and sharing in the same place.',
  },
];

const WHO = [
  { title: 'Traders', text: 'Quick invoices and e-way bills for every order, from the phone in your pocket.' },
  { title: 'Manufacturers', text: 'Dispatch days with the truck waiting: fewer re-typed details, fewer mistakes.' },
  { title: 'Wholesalers', text: 'Repeat buyers and products saved once, used every day.' },
  { title: 'Transporters', text: 'Part B and vehicle updates, consolidated e-way bills and PDFs to share with drivers.' },
];

const BELIEFS = [
  {
    title: 'Small mistakes shouldn’t cost a business',
    text: 'A wrong GSTIN, a missing vehicle number or an expired e-way bill can mean goods held on the road and a penalty. The app checks details before filing to help you avoid those mistakes, though the final responsibility stays with the business.',
  },
  {
    title: 'Simple enough for anyone',
    text: 'If it needs a training session, it’s too complicated. One flow: invoice, review, generate.',
  },
  {
    title: 'Pay only when it works',
    text: '₹5 per e-way bill action, taken only when the action succeeds. No yearly subscription.',
  },
  {
    title: 'Honest about what we do',
    text: 'We only describe what the app actually does, and we’re clear that E-Way Easy is independent, not a government service.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: absoluteUrl('/about'),
          mainEntity: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE_URL,
            founder: {
              '@type': 'Person',
              name: FOUNDER.name,
              jobTitle: 'Founder',
              image: absoluteUrl(FOUNDER.photo),
              homeLocation: { '@type': 'Place', name: `${FOUNDER.village}, ${FOUNDER.near}, ${FOUNDER.state}, India` },
            },
          },
        }}
      />

      {/* Hero: founder first */}
      <header className="relative overflow-hidden bg-brand-900 text-white">
        <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />
        <div className="container relative grid items-center gap-10 py-10 md:grid-cols-[1.2fr_1fr] md:py-16">
          <div>
            <Breadcrumbs crumbs={[{ name: 'Our story', href: '/about' }]} light />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Our story</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
              From a small village in Gujarat to every dispatch desk in India
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-brand-100/90">
              E-Way Easy was built by <strong className="text-white">{FOUNDER.name}</strong> from {FOUNDER.village}, near {FOUNDER.near}.
              It started on one laptop, after office hours, so that businesses could make their sales invoice and e-way bill in a single tap.
            </p>
            <div className="mt-6"><PlayBadge placement="about-hero" /></div>
          </div>
          <figure className="mx-auto w-full max-w-[300px] md:max-w-[340px]">
            <div className="overflow-hidden rounded-[2rem] border-4 border-white/10 shadow-lift">
              <Image
                src={FOUNDER.photo}
                alt={`${FOUNDER.name}, founder of E-Way Easy`}
                width={720}
                height={960}
                priority
                sizes="(max-width: 768px) 300px, 340px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-brand-100/80">
              <strong className="text-white">{FOUNDER.name}</strong> · Founder, from {FOUNDER.village}
            </figcaption>
          </figure>
        </div>
      </header>

      <div className="container py-12 md:py-16">
        {/* Journey */}
        <section aria-labelledby="journey" className="mx-auto max-w-3xl">
          <p className="eyebrow">The journey</p>
          <h2 id="journey" className="h2 mt-2">How E-Way Easy was built</h2>
          <ol className="relative mt-8 space-y-8 border-l-2 border-brand-200 pl-6">
            {JOURNEY.map((j, i) => (
              <li key={j.title} className="relative">
                <span className="absolute -left-[35px] top-0.5 grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">{i + 1}</span>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">{j.when}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">{j.title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{j.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Night-work illustration + why */}
        <section className="mx-auto mt-16 grid max-w-5xl items-center gap-10 md:grid-cols-2" aria-labelledby="why">
          <VillageNight className="w-full rounded-[1.75rem] shadow-lift" />
          <div>
            <p className="eyebrow">Why it matters</p>
            <h2 id="why" className="h2 mt-2">Built for the people who keep goods moving</h2>
            <p className="mt-4 leading-7 text-ink-soft">
              Traders, manufacturers, wholesalers and transporters lose time, and sometimes money, to paperwork that
              shouldn&rsquo;t be hard. A goods vehicle stopped because of a wrong detail on an e-way bill can mean a delay and
              a penalty. E-Way Easy exists to make doing it right the easy way.
            </p>
            <p className="mt-3 leading-7 text-ink-soft">
              The goal is bigger than one app: growth for ourselves, for our families, and for the businesses across India
              that trust us with their everyday work.
            </p>
          </div>
        </section>

        {/* Who */}
        <section className="mx-auto mt-16 max-w-5xl" aria-labelledby="who-for">
          <p className="eyebrow">Who it is for</p>
          <h2 id="who-for" className="h2 mt-2">Made for India&rsquo;s businesses that move goods</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHO.map((a) => (
              <div key={a.title} className="card p-5">
                <h3 className="font-display text-lg font-semibold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Beliefs */}
        <section className="mx-auto mt-16 max-w-5xl" aria-labelledby="beliefs">
          <p className="eyebrow">What we believe</p>
          <h2 id="beliefs" className="h2 mt-2">A few simple promises</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {BELIEFS.map((b) => (
              <div key={b.title} className="rounded-3xl bg-white p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 leading-7 text-ink-soft">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-ink-soft">
            See exactly what the app does on the <Link href="/features" className="font-semibold text-brand-700 underline">features page</Link>,
            and how it works step by step on <Link href="/how-it-works" className="font-semibold text-brand-700 underline">how it works</Link>.
          </p>
        </section>

        {/* Talk to us */}
        <section className="mx-auto mt-16 max-w-3xl rounded-[1.75rem] bg-brand-50 p-6 md:p-8" aria-labelledby="talk">
          <h2 id="talk" className="font-display text-2xl font-bold text-ink">Talk to the people who built it</h2>
          <p className="mt-3 leading-7 text-ink-soft">
            E-Way Easy is still young and we read every message. If something is confusing, missing or wrong, tell us on the{' '}
            <Link href="/contact" className="font-semibold text-brand-700 underline">contact page</Link>. Your feedback
            shapes what we build next.
          </p>
        </section>

        {/* Editorial approach (kept) */}
        <div className="mx-auto mt-16 max-w-3xl prose-content">
          <h2>How we write our guides</h2>
          <p>
            The guides, blog posts and free tools on this website are written by{' '}
            <Link href={`/authors/${AUTHOR.slug}`}>{AUTHOR.name}</Link>. Compliance articles are checked against official
            GST and e-way bill sources and show a &ldquo;last verified&rdquo; date. Where a rule depends on your state,
            transaction or a specific notification, we say so and point you to the official source rather than guessing.
          </p>
          <p>The official sources we refer to most often:</p>
          <ul>
            {OFFICIAL_SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <ComplianceNote title="Independent, not a government portal">
            <p>
              {SITE.name} is an independent app. It is not affiliated with, endorsed by or part of the Government of India,
              GSTN or NIC. E-way bills are filed on the official NIC e-way bill system through an authorised GST Suvidha
              Provider, using your own portal API credentials. See our <Link href="/disclaimer" className="underline">disclaimer</Link>.
            </p>
          </ComplianceNote>
        </div>

        <div className="mx-auto mt-12 max-w-5xl">
          <DownloadCTA placement="about" title="Try what Meet built" text="Make your next sales invoice and e-way bill in one flow, from your phone. ₹5 per action, only when it succeeds." />
        </div>
      </div>
    </>
  );
}
