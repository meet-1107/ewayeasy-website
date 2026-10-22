import JsonLd from '@/components/JsonLd';
import { faqLd } from '@/lib/seo';
import type { Faq } from '@/lib/templates/catalog';

/** Visible FAQ list plus matching FAQPage JSON-LD. */
export default function FaqSection({ faq, heading = 'Frequently asked questions' }: { faq: Faq[]; heading?: string }) {
  return (
    <section aria-labelledby="faq-heading">
      <JsonLd data={faqLd(faq)} />
      <h2 id="faq-heading" className="font-display text-2xl font-bold text-ink md:text-3xl">{heading}</h2>
      <div className="mt-4 divide-y divide-brand-900/10 rounded-2xl border border-brand-900/10 bg-white">
        {faq.map((f) => (
          <details key={f.q} className="group p-4 md:p-5">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink">
              {f.q}
              <span aria-hidden className="mt-0.5 text-brand-600 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-2 text-[15px] leading-7 text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
