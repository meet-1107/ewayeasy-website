import type { ReactNode } from 'react';
import { AppScreen, SCREEN_H, SCREEN_W, type ScreenName } from './AppScreens';

/**
 * Smartphone frame rendering a code-drawn app screen at an exact pixel width.
 * The screen is designed at 270px and scaled, so text stays crisp and proportions never drift.
 */
export function Phone({
  screen, alt, width = 260, className = '',
}: { screen: ScreenName; alt: string; width?: number; className?: string }) {
  const bezel = Math.round(width * 0.03);
  const inner = width - bezel * 2;
  const scale = inner / SCREEN_W;
  const innerH = Math.round(SCREEN_H * scale);
  return (
    <div
      className={`relative shrink-0 bg-brand-950 shadow-lift ring-1 ring-black/20 ${className}`}
      style={{ width, height: innerH + bezel * 2, padding: bezel, borderRadius: width * 0.15 }}
    >
      <div role="img" aria-label={alt} className="relative overflow-hidden bg-cream" style={{ width: inner, height: innerH, borderRadius: width * 0.125 }}>
        <div aria-hidden style={{ width: SCREEN_W, height: SCREEN_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <AppScreen name={screen} />
        </div>
        <span aria-hidden className="absolute left-1/2 top-[1.6%] h-[1.9%] w-[4.5%] -translate-x-1/2 rounded-full bg-brand-950" />
      </div>
    </div>
  );
}

export function FloatCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`absolute rounded-2xl border border-brand-900/10 bg-white/95 p-3 text-ink shadow-lift backdrop-blur ${className}`}>
      {children}
    </div>
  );
}

const Tick = () => (
  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white" aria-hidden>
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
  </span>
);

function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white px-3.5 py-2.5 text-ink shadow-lift ${className}`}>
      <Tick />
      <p className="text-[13px] font-semibold leading-tight">{children}</p>
    </div>
  );
}

/**
 * Hero composition. The front phone sits in normal flow; the back phone and the two callouts
 * live in the empty space beside it, so nothing covers the screens. Sample data only.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px] sm:py-14">
      <div aria-hidden className="absolute inset-x-10 top-20 bottom-10 rounded-[3rem] bg-gradient-to-br from-amber-400/35 via-brand-400/25 to-transparent blur-3xl" />
      <div className="relative flex justify-center sm:justify-end sm:pr-4">
        <Phone
          screen="invoice"
          width={220}
          alt="E-Way Easy new invoice screen: buyer GSTIN entered and name, address, state and PIN filled automatically"
          className="absolute left-0 top-[44px] hidden -rotate-6 opacity-95 sm:block"
        />
        <Phone
          screen="review"
          width={262}
          alt="E-Way Easy review e-way bill screen: Rajkot to Delhi, distance 1,142 km calculated automatically, HSN from product, vehicle number"
          className="relative z-10"
        />
      </div>
      <Pill className="absolute left-0 top-0 z-20 hidden sm:flex">Buyer details filled from GSTIN</Pill>
      <Pill className="absolute bottom-6 left-2 z-20 hidden sm:flex">HSN & distance auto-filled</Pill>
    </div>
  );
}

/** Three-screen walkthrough: Invoice → Review EWB → Generated. Scrolls sideways on phones. */
export function AppShowcase() {
  const steps: { screen: ScreenName; n: string; title: string; text: string; alt: string }[] = [
    { screen: 'invoice', n: '1', title: 'Invoice', text: 'Seller saved, buyer from GSTIN, products with HSN.', alt: 'Step 1, invoice screen with buyer auto-filled from GSTIN' },
    { screen: 'review', n: '2', title: 'Review EWB', text: 'PIN-to-PIN distance, goods, values and vehicle in one view.', alt: 'Step 2, review e-way bill screen with distance and goods details' },
    { screen: 'generated', n: '3', title: 'Generated', text: 'See the result, then print or share. Sales invoice saved too.', alt: 'Step 3, generated screen with validity, print and share options' },
  ];
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 md:mx-0 md:overflow-visible md:px-0">
      <ol className="flex snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8">
        {steps.map((s) => (
          <li key={s.n} className="flex w-[250px] shrink-0 snap-center flex-col items-center text-center md:w-auto">
            <Phone screen={s.screen} width={240} alt={s.alt} />
            <p className="mt-6 flex items-center gap-2 font-display text-lg font-bold">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-700 text-sm text-white">{s.n}</span>
              {s.title}
            </p>
            <p className="mt-1.5 max-w-[240px] text-sm leading-6 text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Invoice → Review → Generated flow graphic, used on the homepage and features page. */
export function WorkflowGraphic() {
  const steps = [
    {
      n: 1, title: 'Sales invoice', tone: 'bg-white',
      body: (
        <>
          <Row k="Invoice no." v="EE/26-27/0042" />
          <Row k="Buyer" v="ABC Traders" />
          <Row k="Taxable value" v="₹1,18,500" />
        </>
      ),
    },
    {
      n: 2, title: 'Review e-way bill', tone: 'bg-white',
      body: (
        <>
          <Row k="HSN" v="391723" />
          <Row k="From → To" v="360004 → 110001" />
          <Row k="Distance" v="1,142 km" />
        </>
      ),
    },
    {
      n: 3, title: 'Generated', tone: 'bg-brand-800 text-white',
      body: (
        <>
          <p className="text-[11px] opacity-70">E-way bill number</p>
          <p className="font-mono text-lg font-semibold tracking-wider">XXXX XXXX XXXX</p>
          <p className="mt-1 text-[11px] opacity-70">Sample shown. Real numbers come from the official system.</p>
        </>
      ),
    },
  ];
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
      {steps.map((s, i) => (
        <div key={s.n} className="contents">
          <div className={`rounded-3xl border border-brand-900/10 p-5 shadow-card ${s.tone}`}>
            <div className="flex items-center gap-2">
              <span className={`grid h-7 w-7 place-items-center rounded-full text-sm font-bold ${s.n === 3 ? 'bg-amber-500 text-brand-950' : 'bg-brand-700 text-white'}`}>{s.n}</span>
              <p className="font-display font-semibold">{s.title}</p>
            </div>
            <div className="mt-4 space-y-2">{s.body}</div>
          </div>
          {i < 2 && (
            <div className="hidden items-center justify-center text-brand-400 md:flex" aria-hidden>
              <svg viewBox="0 0 40 24" className="h-6 w-10"><path d="M2 12h32m-8-8 8 8-8 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-brand-50/70 px-3 py-2 text-sm">
      <span className="text-ink-faint">{k}</span>
      <span className="font-semibold text-ink">{v}</span>
    </div>
  );
}

/** Stylised India-wide dispatch illustration: factory → highway → warehouse. */
export function RouteIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 260" className={className} role="img" aria-label="Illustration of goods moving by truck from a factory to a warehouse">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#123F2E" /><stop offset="1" stopColor="#1E6346" /></linearGradient>
        <linearGradient id="sun" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#F6C873" /><stop offset="1" stopColor="#E5A243" /></linearGradient>
      </defs>
      <rect width="600" height="260" rx="28" fill="url(#sky)" />
      <circle cx="470" cy="92" r="42" fill="url(#sun)" opacity=".9" />
      <path d="M0 190 Q150 150 300 175 T600 160 V260 H0Z" fill="#0C2D21" />
      {/* factory */}
      <g fill="#2C7A57">
        <rect x="40" y="120" width="110" height="70" rx="4" />
        <path d="M40 120 l25-22v22l25-22v22l25-22v22h35v-40h-15v18" />
        <rect x="128" y="70" width="12" height="50" />
      </g>
      <g fill="#F6C873" opacity=".85">
        <rect x="52" y="138" width="14" height="12" rx="2" /><rect x="74" y="138" width="14" height="12" rx="2" /><rect x="96" y="138" width="14" height="12" rx="2" />
      </g>
      {/* warehouse */}
      <g>
        <path d="M455 190v-58l55-28 55 28v58z" fill="#2C7A57" />
        <rect x="485" y="150" width="50" height="40" fill="#123F2E" />
        <path d="M485 160h50M485 170h50M485 180h50" stroke="#2C7A57" strokeWidth="2" />
      </g>
      {/* road */}
      <path d="M150 205 C260 190 340 225 460 200" stroke="#E5A243" strokeWidth="3" strokeDasharray="10 10" fill="none" />
      {/* truck */}
      <g transform="translate(250 168)">
        <rect x="0" y="0" width="84" height="38" rx="5" fill="#F6F5F0" />
        <rect x="6" y="8" width="72" height="22" rx="3" fill="#D6EADF" />
        <text x="42" y="24" textAnchor="middle" fontSize="11" fontWeight="700" fill="#174F39" fontFamily="Arial, sans-serif">E-WAY EASY</text>
        <path d="M84 12h20l14 14v12H84z" fill="#E5A243" />
        <rect x="92" y="16" width="12" height="9" rx="2" fill="#123F2E" />
        <circle cx="22" cy="40" r="8" fill="#071C15" /><circle cx="22" cy="40" r="3" fill="#7DB99A" />
        <circle cx="100" cy="40" r="8" fill="#071C15" /><circle cx="100" cy="40" r="3" fill="#7DB99A" />
      </g>
      {/* document badge */}
      <g transform="translate(300 60)">
        <rect width="120" height="64" rx="12" fill="#fff" />
        <circle cx="22" cy="32" r="12" fill="#2C7A57" />
        <path d="m16 32 4 4 8-9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <text x="42" y="28" fontSize="10" fill="#4A5A52" fontFamily="Arial, sans-serif">Valid up to</text>
        <text x="42" y="44" fontSize="13" fontWeight="700" fill="#16211C" fontFamily="Arial, sans-serif">6 days</text>
      </g>
    </svg>
  );
}

/** Generated cover art for blog cards and article headers (no stock imagery needed). */
export function BlogCover({ category, title, className = '' }: { category: string; title: string; className?: string }) {
  const palettes: Record<string, [string, string, string]> = {
    'eway-bill': ['#123F2E', '#2C7A57', '#E5A243'],
    'gst-compliance': ['#0C2D21', '#1E6346', '#F6C873'],
    invoicing: ['#174F39', '#4C9874', '#F0B550'],
    'business-guides': ['#071C15', '#174F39', '#E5A243'],
    'product-updates': ['#C9852A', '#E5A243', '#123F2E'],
  };
  const [a, b, c] = palettes[category] ?? palettes['eway-bill'];
  const id = `g-${category}`;
  const icon: Record<string, ReactNode> = {
    'eway-bill': <path d="M0 0h52v32H0zM52 10h20l12 12v10H52z" fill="#fff" opacity=".9" />,
    'gst-compliance': <path d="M0 0h60v76H0z M10 14h40 M10 28h40 M10 42h24" stroke="#fff" strokeWidth="5" fill="none" />,
    invoicing: <path d="M0 0h56v76l-9-6-9 6-10-6-10 6-9-6-9 6z" fill="#fff" opacity=".9" />,
    'business-guides': <path d="M0 76V30h18v46M24 76V10h18v66M48 76V44h18v32" fill="#fff" opacity=".9" />,
    'product-updates': <path d="M0 0h44a6 6 0 0 1 6 6v70a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6z" fill="#fff" opacity=".9" />,
  };
  return (
    <svg viewBox="0 0 640 336" className={className} role="img" aria-label={`Cover graphic: ${title}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
      </defs>
      <rect width="640" height="336" fill={`url(#${id})`} />
      <circle cx="560" cy="60" r="140" fill={c} opacity=".18" />
      <circle cx="80" cy="320" r="120" fill="#fff" opacity=".06" />
      <g opacity=".08" stroke="#fff">
        {Array.from({ length: 14 }).map((_, i) => <path key={i} d={`M${i * 48} 0v336`} />)}
        {Array.from({ length: 8 }).map((_, i) => <path key={`h${i}`} d={`M0 ${i * 48}h640`} />)}
      </g>
      <g transform="translate(470 120)">{icon[category] ?? icon['eway-bill']}</g>
      <rect x="40" y="250" width="70" height="6" rx="3" fill={c} />
    </svg>
  );
}
