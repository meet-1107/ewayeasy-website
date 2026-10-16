// Crisp, code-drawn recreations of the E-Way Easy app screens (sample data only).
// Designed at 270×585 px; the Phone frame scales them, so they stay sharp at any size.
import type { ReactNode } from 'react';

export type ScreenName = 'dashboard' | 'invoice' | 'review' | 'generated';
export const SCREEN_W = 270;
export const SCREEN_H = 585;

const G = '#174F39';

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`flex items-center justify-between px-5 pt-3 text-[10px] font-semibold ${dark ? 'text-white' : 'text-ink'}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1" aria-hidden>
        <svg viewBox="0 0 16 10" className="h-2.5 w-3.5"><path d="M1 9h2V6H1zm4 0h2V4H5zm4 0h2V2H9zm4 0h2V0h-2z" fill="currentColor" /></svg>
        <span className="rounded-[3px] border border-current px-[3px] text-[8px] leading-[10px]">82</span>
      </span>
    </div>
  );
}

function Steps({ active }: { active: 1 | 2 | 3 }) {
  const labels = ['Invoice', 'Review EWB', 'Generated'];
  return (
    <div className="mx-4 mt-3 flex items-start justify-between">
      {labels.map((l, i) => {
        const n = i + 1;
        const done = n < active;
        const on = n === active;
        return (
          <div key={l} className="relative flex flex-1 flex-col items-center">
            {i > 0 && <span className={`absolute right-1/2 top-[11px] h-[2px] w-[calc(100%-26px)] -translate-x-[13px] ${n <= active ? 'bg-brand-600' : 'bg-brand-900/10'}`} />}
            <span className={`relative grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold ${on ? 'bg-brand-700 text-white ring-4 ring-brand-100' : done ? 'bg-brand-600 text-white' : 'bg-brand-900/5 text-ink-faint'}`}>
              {done ? '✓' : n}
            </span>
            <span className={`mt-1 text-[9px] ${on ? 'font-semibold text-brand-700' : 'text-ink-faint'}`}>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

function TopBar({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex items-start gap-2 border-b border-brand-900/10 px-4 pb-2.5 pt-2">
      <span className="mt-0.5 text-[14px] text-ink" aria-hidden>←</span>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-bold leading-tight text-ink">{title}</p>
        <p className="truncate text-[9px] text-ink-faint">{sub}</p>
      </div>
      <span className="text-[14px] leading-none text-ink" aria-hidden>⋮</span>
    </div>
  );
}

function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-3 rounded-2xl border border-brand-900/10 bg-white p-3 ${className}`}>{children}</div>;
}

function Field({ label, value, ok = false, mono = false }: { label: string; value: string; ok?: boolean; mono?: boolean }) {
  return (
    <div className="mt-2">
      <p className="text-[9px] font-semibold text-ink">{label}</p>
      <div className="mt-0.5 flex items-center justify-between rounded-lg border border-brand-900/15 px-2 py-1.5">
        <span className={`truncate text-[10px] text-ink ${mono ? 'font-mono tracking-tight' : ''}`}>{value}</span>
        {ok && <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-brand-500 text-[8px] text-white">✓</span>}
      </div>
    </div>
  );
}

function BottomBar({ total, cta, amber = false }: { total: string; cta: string; amber?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-brand-900/10 bg-white px-4 pb-5 pt-3">
      <div>
        <p className="text-[8px] font-semibold uppercase tracking-wider text-ink-faint">Total</p>
        <p className="text-[15px] font-extrabold text-ink">{total}</p>
      </div>
      <span className={`rounded-xl px-3 py-2 text-[10px] font-bold ${amber ? 'bg-amber-500 text-brand-950' : 'bg-brand-700 text-white'}`}>{cta}</span>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <StatusBar />
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-lg" style={{ background: G }}>
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5"><path d="M7 3h7l5 5v13H7z" fill="#fff" /><path d="M9 19c2-.5 2-3 4.5-3s3-2 4.5-2" stroke="#E5A243" strokeWidth="2" fill="none" /></svg>
          </span>
          <span className="text-[13px] font-extrabold" style={{ color: G }}>E-Way Easy</span>
        </span>
        <span className="rounded-full border border-brand-900/10 px-2 py-0.5 text-[9px] font-semibold" style={{ color: G }}>Help</span>
      </div>
      <div className="px-4 pt-3">
        <p className="text-[13px] font-bold text-ink">Sharma Pipes & Fittings</p>
        <p className="font-mono text-[9px] tracking-wide text-ink-faint">24ABCDE1234F1Z5</p>
        <p className="mt-1 flex items-center gap-1 text-[9px] text-ink-faint"><span className="h-1.5 w-1.5 rounded-full bg-brand-500" />Synced just now</p>
      </div>
      <div className="mx-3 mt-3 flex items-center justify-between rounded-2xl p-3 text-white" style={{ background: G }}>
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-wider opacity-80">Wallet</p>
          <p className="text-[15px] font-extrabold">48 <span className="text-[10px] font-semibold text-amber-300">credits</span></p>
        </div>
        <span className="rounded-lg bg-amber-500 px-2 py-1 text-[9px] font-bold text-brand-950">+ Add credits</span>
      </div>
      <div className="relative mx-3 mt-2.5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-800 to-brand-950 p-3 text-white">
        <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full border-[10px] border-white/5" />
        <p className="text-[8px] font-semibold uppercase tracking-wider opacity-80">Total sales · FY 2026-27</p>
        <p className="mt-1 text-[22px] font-extrabold">₹18,42,500</p>
        <p className="text-[9px] opacity-70">1 Apr 2026 – 13 Oct 2026 · 36 invoices</p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="flex-1 rounded-lg bg-amber-500 py-1.5 text-center text-[9px] font-bold text-brand-950">+ Create invoice</span>
          <span className="flex-1 rounded-lg border border-white/25 py-1.5 text-center text-[9px] font-semibold">Import PDF</span>
        </div>
      </div>
      <div className="mx-3 mt-2.5 grid grid-cols-2 gap-2">
        {[['36', 'Total invoices'], ['31', 'Total e-way bills']].map(([n, l]) => (
          <div key={l} className="rounded-2xl border border-brand-900/10 bg-white p-2.5">
            <p className="text-[18px] font-extrabold text-ink">{n}</p>
            <p className="text-[9px] text-ink-faint">{l}</p>
          </div>
        ))}
      </div>
      <p className="px-4 pt-3 text-[11px] font-bold text-ink">Recent activity</p>
      <Card className="mt-1.5 flex items-center justify-between py-2">
        <span>
          <span className="block text-[10px] font-semibold text-ink">EE/26-27/0036 · ABC Traders</span>
          <span className="text-[9px] text-ink-faint">E-way bill generated</span>
        </span>
        <span className="text-[10px] font-bold text-ink">₹1,47,500</span>
      </Card>
      <div className="absolute inset-x-0 bottom-0 grid grid-cols-5 border-t border-brand-900/10 bg-white px-1 pb-4 pt-2 text-center text-[8px] text-ink-faint">
        {['Dashboard', 'Invoices', 'E-way bills', 'Buyers', 'Products'].map((t, i) => (
          <span key={t} className={i === 0 ? 'font-bold text-brand-700' : ''}>
            <span className={`mx-auto mb-0.5 block h-3.5 w-3.5 rounded ${i === 0 ? 'bg-brand-700' : 'bg-brand-900/15'}`} />
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

function Invoice() {
  return (
    <>
      <StatusBar />
      <TopBar title="New invoice" sub="EE/26-27/0037 · not saved yet" />
      <Steps active={1} />
      <Card className="mt-3 flex items-center gap-2 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-[11px]">🏭</span>
        <span className="min-w-0">
          <span className="block text-[11px] font-bold text-ink">Seller (you)</span>
          <span className="block truncate text-[9px] text-ink-faint">Sharma Pipes & Fittings · 24ABCDE…</span>
        </span>
      </Card>
      <Card className="mt-2">
        <p className="text-[11px] font-bold text-ink">Buyer</p>
        <Field label="GSTIN" value="07AAACA1234B1Z9" ok mono />
        <p className="mt-1 text-[8px] text-brand-600">✓ Name, address, state and PIN filled automatically</p>
        <Field label="Business name" value="ABC Traders" />
        <Field label="Address" value="12, Chandni Chowk, New Delhi" />
        <div className="grid grid-cols-2 gap-2">
          <Field label="State" value="Delhi" />
          <Field label="PIN code" value="110001" />
        </div>
      </Card>
      <Card className="mt-2 py-2">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-ink">Products</p>
          <span className="rounded-md bg-brand-700 px-1.5 py-0.5 text-[8px] font-bold text-white">+ Add</span>
        </div>
        <p className="mt-1 text-[10px] font-semibold text-ink">PVC Pipe 110mm <span className="font-normal text-ink-faint">· HSN 391723</span></p>
        <p className="text-[9px] text-ink-faint">100 pcs × ₹1,250 · GST 18%</p>
      </Card>
      <BottomBar total="₹1,47,500" cta="Preview invoice" />
    </>
  );
}

function Review() {
  return (
    <>
      <StatusBar />
      <TopBar title="Review e-way bill" sub="EE/26-27/0037 · ABC Traders" />
      <Steps active={2} />
      <Card className="mt-3">
        <div className="flex items-center justify-between text-[10px]">
          <span><span className="block text-[8px] text-ink-faint">From</span><b className="text-ink">360004</b> <span className="text-ink-faint">Rajkot</span></span>
          <span className="text-brand-500">→</span>
          <span className="text-right"><span className="block text-[8px] text-ink-faint">To</span><b className="text-ink">110001</b> <span className="text-ink-faint">Delhi</span></span>
        </div>
        <div className="mt-2.5 flex items-center justify-between rounded-xl bg-brand-50 px-2.5 py-2">
          <span>
            <span className="block text-[8px] font-semibold uppercase tracking-wider text-brand-600">Distance · auto</span>
            <span className="text-[17px] font-extrabold text-brand-800">1,142 km</span>
          </span>
          <span className="text-[9px] font-semibold text-brand-700 underline">Edit</span>
        </div>
      </Card>
      <Card className="mt-2">
        <p className="text-[11px] font-bold text-ink">Goods</p>
        {[['HSN', '391723 (from product)'], ['Description', 'PVC Pipe 110mm'], ['Quantity', '100 PCS'], ['Taxable value', '₹1,25,000'], ['IGST 18%', '₹22,500']].map(([k, v]) => (
          <div key={k} className="mt-1.5 flex justify-between text-[10px]"><span className="text-ink-faint">{k}</span><span className="font-semibold text-ink">{v}</span></div>
        ))}
      </Card>
      <Card className="mt-2">
        <p className="text-[11px] font-bold text-ink">Transport</p>
        {[['Mode', 'Road'], ['Vehicle no.', 'GJ03AB1234'], ['Supply type', 'Outward · Supply']].map(([k, v]) => (
          <div key={k} className="mt-1.5 flex justify-between text-[10px]"><span className="text-ink-faint">{k}</span><span className="font-semibold text-ink">{v}</span></div>
        ))}
      </Card>
      <BottomBar total="₹1,47,500" cta="Generate e-way bill" amber />
    </>
  );
}

function Generated() {
  return (
    <>
      <StatusBar />
      <TopBar title="E-way bill" sub="EE/26-27/0037 · ABC Traders" />
      <Steps active={3} />
      <div className="mx-3 mt-4 rounded-3xl p-4 text-center text-white" style={{ background: G }}>
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-500 text-[20px] font-bold text-brand-950">✓</span>
        <p className="mt-2 text-[14px] font-extrabold">E-way bill generated</p>
        <p className="mt-2 text-[8px] uppercase tracking-wider opacity-70">EWB number</p>
        <p className="font-mono text-[16px] font-bold tracking-widest">XXXX XXXX XXXX</p>
        <p className="mt-1 text-[8px] opacity-60">Sample screen · number issued by the official system</p>
      </div>
      <Card className="mt-2.5">
        {[['Valid for', '6 days (1,142 km)'], ['Vehicle', 'GJ03AB1234'], ['Invoice value', '₹1,47,500']].map(([k, v]) => (
          <div key={k} className="mt-1 flex justify-between text-[10px] first:mt-0"><span className="text-ink-faint">{k}</span><span className="font-semibold text-ink">{v}</span></div>
        ))}
      </Card>
      <div className="mx-3 mt-2.5 grid grid-cols-2 gap-2 text-[10px] font-bold">
        <span className="rounded-xl bg-brand-700 py-2 text-center text-white">Print</span>
        <span className="rounded-xl border border-brand-900/15 bg-white py-2 text-center text-ink">Share PDF</span>
      </div>
      <Card className="mt-2.5 flex items-center gap-2 py-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-300/40 text-[11px]">🧾</span>
        <span>
          <span className="block text-[10px] font-semibold text-ink">Sales invoice saved</span>
          <span className="text-[9px] text-ink-faint">EE/26-27/0037 · ready to print</span>
        </span>
      </Card>
    </>
  );
}

const SCREENS: Record<ScreenName, () => ReactNode> = { dashboard: Dashboard, invoice: Invoice, review: Review, generated: Generated };

export function AppScreen({ name }: { name: ScreenName }) {
  const S = SCREENS[name];
  return (
    <div className="relative bg-cream font-sans" style={{ width: SCREEN_W, height: SCREEN_H }}>
      <S />
    </div>
  );
}
