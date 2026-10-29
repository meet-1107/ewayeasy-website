import Image from 'next/image';

/**
 * "Who we build for" photo cards (Swipe-style). These are licensed stock photos (Unsplash License)
 * of the kinds of people E-Way Easy serves — captions describe the work, never a quote or a claim
 * that the person uses the app. Real customer reviews live in ReviewsSection.
 */
const PEOPLE = [
  {
    src: '/images/people/trader-phone.jpg',
    alt: 'A shopkeeper sitting outside his blue shopfront, checking orders on his phone',
    role: 'Traders',
    line: 'Running the shop and the orders from one phone.',
  },
  {
    src: '/images/people/factory-desk.jpg',
    alt: 'A smiling woman at a computer on the dispatch desk of a factory',
    role: 'Dispatch desks',
    line: 'Preparing the invoice before the truck leaves the gate.',
  },
  {
    src: '/images/people/warehouse-packing.jpg',
    alt: 'A woman packing finished goods at a factory table',
    role: 'Manufacturers',
    line: 'Every packed order needs the right paperwork.',
  },
  {
    src: '/images/people/truck-loading.jpg',
    alt: 'Two men sitting on a goods vehicle loaded with sacks, ready to leave',
    role: 'Transporters',
    line: 'Moving goods across India, one consignment at a time.',
  },
];

export default function PeopleStrip() {
  return (
    <section className="section bg-white" aria-labelledby="people-h">
      <div className="container">
        <p className="eyebrow">Who we build for</p>
        <h2 id="people-h" className="h2 mt-2 max-w-2xl">Made for the people who keep India&rsquo;s goods moving</h2>
        <p className="mt-3 max-w-2xl text-ink-soft">
          Shop owners, factory teams and transporters do the real work. E-Way Easy just takes the paperwork off their hands.
        </p>
        <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-3 md:mx-0 md:overflow-visible md:px-0">
          <ul className="flex snap-x snap-mandatory gap-4 md:grid md:grid-cols-4">
            {PEOPLE.map((p, i) => (
              <li
                key={p.src}
                className="group relative aspect-[4/5] w-[72vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-3xl bg-brand-900 shadow-lift md:w-auto md:max-w-none"
                style={{ transform: `rotate(${[-1.5, 1, -1, 1.5][i]}deg)` }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 768px) 72vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="inline-block rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-extrabold text-brand-950">{p.role}</p>
                  <p className="mt-2 font-display text-lg font-bold leading-snug">{p.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Photos: atelierbyvineeth, EqualStock and Amar Preet Singh on Unsplash. Illustrative photos, not E-Way Easy customers.
        </p>
      </div>
    </section>
  );
}
