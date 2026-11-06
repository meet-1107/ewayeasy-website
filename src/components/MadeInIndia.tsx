import Image from 'next/image';
import Link from 'next/link';
import { Stamp } from './HighwayKit';

/**
 * "Made in India, for India" band with real photos (Unsplash License). Uses only the tricolour colours,
 * never the State Emblem, the national flag or government buildings, which are protected from commercial use.
 */
const PHOTOS = {
  gate: { src: '/images/india/india-gate-tricolour.jpg', alt: 'India Gate in New Delhi lit up in saffron, white and green at night' },
  truck: { src: '/images/india/truck-malshej-ghat.jpg', alt: 'A goods truck with its headlights on, climbing the misty Malshej Ghat road in Maharashtra' },
  market: { src: '/images/india/textile-market.jpg', alt: 'Shoppers at a busy Indian textile market stall full of colourful fabrics' },
};

const POINTS = [
  'Designed and built in Nani Bhagedi, Gujarat',
  'Indian GST and e-way bill rules, Indian PIN codes',
  'Rupee pricing, UPI, cards and net banking',
  'E-way bills filed on the official NIC system',
];

function Tricolour({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-1.5 w-full overflow-hidden rounded-full ${className}`}>
      <span className="flex-1 bg-[#FF9933]" />
      <span className="flex-1 bg-white" />
      <span className="flex-1 bg-[#138808]" />
    </div>
  );
}

export default function MadeInIndia() {
  return (
    <section className="section relative overflow-hidden bg-cream" aria-labelledby="india-h">
      <div aria-hidden className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FF9933]/15 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#138808]/15 blur-3xl" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Stamp tone="green">Made in India</Stamp>
          <h2 id="india-h" className="h2 mt-5 max-w-xl">
            Made in India, for the businesses that <span className="text-brand-700">move India</span>
          </h2>
          <Tricolour className="mt-5 max-w-[180px]" />
          <p className="mt-5 max-w-xl leading-8 text-ink-soft">
            E-Way Easy was built from a small village in Gujarat by{' '}
            <Link href="/about" className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2">Meet Akabari</Link>,
            for the shop owners, factories, wholesalers and transporters who send goods across the country every day.
            Indian rules, Indian payments, priced in rupees.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-2.5 rounded-2xl border border-brand-900/10 bg-white px-4 py-3 text-[15px] font-medium leading-6 text-ink shadow-card">
                <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FF9933] ring-2 ring-[#138808]/40" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="grid grid-cols-[1fr_1fr] gap-3 sm:gap-4">
            <figure className="relative row-span-2 aspect-[3/5] overflow-hidden rounded-[1.75rem] bg-brand-950 shadow-lift sm:-rotate-1">
              <Image src={PHOTOS.gate.src} alt={PHOTOS.gate.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="inline-block rounded-full bg-[#FF9933] px-2.5 py-1 text-[11px] font-bold text-brand-950">Proudly Indian</span>
                <span className="mt-2 block font-display text-lg font-bold leading-snug sm:text-xl">Built here. Built for here.</span>
              </figcaption>
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-brand-950 shadow-lift sm:rotate-1">
              <Image src={PHOTOS.truck.src} alt={PHOTOS.truck.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="absolute bottom-0 p-3 text-xs font-bold text-white sm:text-sm">On every highway and ghat road</figcaption>
            </figure>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-brand-950 shadow-lift sm:-rotate-1">
              <Image src={PHOTOS.market.src} alt={PHOTOS.market.alt} fill sizes="(max-width: 1024px) 50vw, 28vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <figcaption className="absolute bottom-0 p-3 text-xs font-bold text-white sm:text-sm">In every market and mandi</figcaption>
            </figure>
          </div>
          <p className="mt-4 text-xs text-ink-faint">
            Photos: Mustafa Fatemi, Zoshua Colah and Harshit Katiyar on Unsplash. Illustrative photos.
          </p>
        </div>
      </div>
    </section>
  );
}
