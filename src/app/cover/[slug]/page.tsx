// INTERNAL: renders 1280×720 cover art for screenshot capture (scripts/capture-covers.mjs).
// Removed from the production export by scripts/postbuild.mjs; never linked or indexed.
import { notFound } from 'next/navigation';
import { COVERS } from '@/lib/covers';
import { Phone } from '@/components/AppGraphics';
import { LogoMark } from '@/components/Logo';

export const dynamicParams = false;
export const metadata = { robots: { index: false, follow: false } };
export function generateStaticParams() {
  return Object.keys(COVERS).map((slug) => ({ slug }));
}

export default async function Cover({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = COVERS[slug];
  if (!c) notFound();
  const long = Math.max(c.l1.length, c.l2.length);
  // Fit the headline into the space the artwork leaves free (uppercase glyphs ≈ 0.66em wide).
  const free = { phones: 560, person: 620, phone: 760, truck: 700 }[c.variant];
  const size = Math.min(132, Math.floor(free / (0.66 * long)));

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden bg-brand-950" style={{ width: 1280, height: 720 }}>
      {/* background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 75% 40%, #2C7A57 0%, #123F2E 45%, #071C15 100%)' }} />
      <div className="absolute inset-0 bg-hero-grid opacity-70" />
      <div className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-amber-500/25 blur-3xl" />

      {c.variant === 'truck' && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/covers/src/truck.jpg" alt="" className="absolute right-0 top-0 h-full w-[820px] object-cover" style={{ filter: 'blur(3px) saturate(1.15)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #071C15 0%, #071C15 38%, rgba(7,28,21,.55) 62%, rgba(7,28,21,.05) 100%)' }} />
          <div className="absolute right-14 top-[150px]">
            <Phone screen="review" width={230} alt="" className="rotate-[5deg]" />
          </div>
        </>
      )}

      {c.variant === 'person' && (
        <>
          <div className="absolute right-0 top-0 h-full w-[470px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/covers/src/person-worried.png"
              alt=""
              className="h-full w-full object-cover object-top"
              style={{ transform: c.flip ? 'scaleX(-1)' : undefined }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #071C15 0%, rgba(7,28,21,.0) 35%), linear-gradient(0deg, rgba(7,28,21,.7) 0%, transparent 30%)' }} />
          </div>
          <div className="absolute right-[330px] top-[190px]">
            <Phone screen={c.screen ?? 'review'} width={225} alt="" className="-rotate-[5deg]" />
          </div>
          <div className="absolute right-[38px] top-[60px] grid h-24 w-24 place-items-center rounded-full bg-red-600 font-display text-6xl font-extrabold text-white shadow-lift">?</div>
        </>
      )}

      {c.variant === 'phone' && (
        <div className="absolute right-[90px] top-[70px]">
          <div className="absolute -inset-10 rounded-full bg-amber-400/25 blur-3xl" />
          <Phone screen={c.screen ?? 'review'} width={290} alt="" className="relative rotate-[6deg]" />
        </div>
      )}

      {c.variant === 'phones' && (
        <div className="absolute right-[36px] top-[80px] flex items-start gap-3">
          <Phone screen="invoice" width={170} alt="" className="mt-20 -rotate-[5deg]" />
          <Phone screen="review" width={195} alt="" className="relative z-10 mt-6" />
          <Phone screen="generated" width={170} alt="" className="mt-20 rotate-[5deg]" />
        </div>
      )}

      {/* brand badge */}
      <div className="absolute left-14 top-12 flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-lift">
        <LogoMark className="h-11 w-11" />
        <span className="font-display text-[30px] font-extrabold leading-none tracking-tight text-brand-800">
          E-Way <span className="text-amber-500">Easy</span>
        </span>
      </div>

      {/* headline */}
      <div className="absolute left-14 top-[170px]">
        <p
          className="font-display font-extrabold uppercase leading-[0.95] tracking-tight text-white"
          style={{ fontSize: size, textShadow: '0 6px 0 rgba(0,0,0,.35), 0 18px 40px rgba(0,0,0,.45)' }}
        >
          {c.l1}
        </p>
        <p
          className="mt-2 font-display font-extrabold uppercase leading-[0.95] tracking-tight text-amber-400"
          style={{ fontSize: size, textShadow: '0 6px 0 rgba(0,0,0,.35), 0 18px 40px rgba(0,0,0,.45)' }}
        >
          {c.l2}
        </p>
      </div>

      {/* ribbon */}
      <div
        className={`absolute bottom-14 left-10 px-9 py-3.5 font-display text-[34px] font-extrabold uppercase tracking-wide shadow-lift ${c.ribbon === 'amber' ? 'bg-amber-500 text-brand-950' : 'bg-red-600 text-white'}`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 96% 100%, 0 100%)' }}
      >
        {c.tag}
      </div>
    </div>
  );
}
