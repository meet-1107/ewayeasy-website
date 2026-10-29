import Image from 'next/image';
import Link from 'next/link';
import { REVIEWS } from '@/lib/reviews';
import { FOUNDER } from '@/lib/site';

/**
 * Swipe-style customer review cards (photo, name, business, city, quote) — rendered only from real,
 * consented reviews in src/lib/reviews.ts. With no reviews yet it shows an honest invitation instead.
 */
export default function ReviewsSection() {
  const has = REVIEWS.length > 0;
  return (
    <section className="section bg-[#FFFCF2]" aria-labelledby="reviews-h">
      <div className="container">
        <h2 id="reviews-h" className="h2 flex items-center gap-3">
          {has ? 'The love is mutual.' : 'Our first reviews start with you.'} <span aria-hidden>{has ? '😍' : '🤝'}</span>
        </h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          {has
            ? 'Real words from traders, manufacturers, wholesalers and transporters who use E-Way Easy.'
            : 'E-Way Easy is new, so we won’t show made-up reviews. Every review here will be a real customer’s own words, shared with their permission.'}
        </p>

        {has ? (
          <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-4">
            <ul className="flex snap-x snap-mandatory gap-4">
              {REVIEWS.map((r) => (
                <li key={`${r.name}-${r.date}`} className="relative aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl bg-brand-800 shadow-lift">
                  {r.photo && (
                    <Image src={r.photo} alt={`${r.name}, ${r.business}, ${r.city}`} fill sizes="320px" className="object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <figure className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <figcaption>
                      <p className="font-display font-bold">{r.name}</p>
                      <p className="text-xs opacity-80">{r.business}, {r.city}</p>
                    </figcaption>
                    <blockquote className="mt-3 font-display text-lg font-bold leading-snug" lang={r.language ?? 'en'}>
                      “{r.quote}”
                    </blockquote>
                    <p className="mt-2 text-[11px] opacity-60">via {r.source}</p>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border-2 border-dashed border-brand-300 bg-white p-6 md:col-span-2">
              <p className="font-display text-xl font-bold text-ink">Used E-Way Easy for a dispatch?</p>
              <p className="mt-2 leading-7 text-ink-soft">
                Tell us how it went: what was easy, what wasn&rsquo;t. With your permission, we&rsquo;ll feature your words, your
                photo and your business here, like the shop and factory owners we built this for.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Share your feedback</Link>
                <Link href="/download" className="btn-ghost">Rate us on Google Play</Link>
              </div>
            </div>
            <div className="rounded-3xl bg-brand-900 p-6 text-white">
              <div className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-amber-400">
                  <Image src={FOUNDER.photo} alt={FOUNDER.name} fill sizes="48px" className="object-cover object-top" />
                </span>
                <span>
                  <span className="block font-display font-bold">{FOUNDER.name}</span>
                  <span className="text-xs text-brand-100/80">Founder</span>
                </span>
              </div>
              <p className="mt-4 leading-7 text-brand-100/90">
                Early users get direct access to the person who built the app. Every message is read, and the most common
                problems get fixed first.
              </p>
              <Link href="/about" className="mt-4 inline-block text-sm font-semibold text-amber-300 underline">Read the story →</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
