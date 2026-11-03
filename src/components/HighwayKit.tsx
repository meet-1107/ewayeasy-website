/**
 * E-Way Easy's own visual language, taken from India's roads and paperwork:
 *  - Milestone: the white km stone with the yellow cap found on Indian highways.
 *  - Stamp: the inked rubber stamp of office paperwork ("GENERATED ✓").
 *  - TruckArtBand: a painted strip inspired by Indian truck art.
 *  - RouteLine: a dotted road line that joins sections like a journey.
 * All SVG/CSS, server-safe; decorative parts are aria-hidden.
 */
import type { ReactNode } from 'react';

/** Highway km-stone used to show a key number. */
export function Milestone({ top, value, label, cap = '#F6B73C', className = '' }: {
  top: string; value: string; label: string; cap?: string; className?: string;
}) {
  return (
    <figure className={`flex flex-col items-center text-center ${className}`}>
      <div className="relative w-[118px]">
        <svg viewBox="0 0 118 150" className="h-auto w-full drop-shadow-[0_10px_14px_rgba(12,45,33,.25)]" aria-hidden>
          <path d="M8 150V60C8 26 30 6 59 6s51 20 51 54v90z" fill="#FFFFFF" stroke="#16211C" strokeWidth="3" />
          <path d="M8 62C8 26 30 6 59 6s51 20 51 56z" fill={cap} stroke="#16211C" strokeWidth="3" />
          <rect x="4" y="140" width="110" height="10" rx="2" fill="#16211C" opacity=".15" />
        </svg>
        <span className="absolute inset-x-0 top-[13%] text-center text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-950">{top}</span>
        <span className="absolute inset-x-0 top-[48%] text-center font-display text-[30px] font-extrabold leading-none text-ink">{value}</span>
      </div>
      <figcaption className="mt-3 max-w-[150px] text-sm font-semibold leading-5 text-ink-soft">{label}</figcaption>
    </figure>
  );
}

/** Rubber-stamp badge. */
export function Stamp({ children, tone = 'green', className = '' }: { children: ReactNode; tone?: 'green' | 'red' | 'blue'; className?: string }) {
  const color = tone === 'red' ? '#C2410C' : tone === 'blue' ? '#1D4ED8' : '#15803D';
  return (
    <span
      className={`ee-stamp inline-flex -rotate-6 items-center gap-1.5 rounded-lg border-[3px] border-double px-3 py-1 font-display text-sm font-extrabold uppercase tracking-[0.12em] ${className}`}
      style={{ color, borderColor: color }}
    >
      {children}
    </span>
  );
}

/** Painted truck-art strip used as a divider. */
export function TruckArtBand({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`h-3 w-full ${className}`} style={{
      background:
        'repeating-linear-gradient(90deg,#E5A243 0 28px,#C2185B 28px 40px,#2C7A57 40px 68px,#F6F5F0 68px 74px,#1D4ED8 74px 98px,#F6F5F0 98px 104px)',
    }} />
  );
}

/** Dotted road line with a moving dot, for joining sections. */
export function RouteLine({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className={className}>
      <path d="M0 20 C100 0 140 40 200 20 S320 0 400 20" fill="none" stroke="#2C7A57" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
      <circle r="6" fill="#E5A243">
        <animateMotion dur="6s" repeatCount="indefinite" path="M0 20 C100 0 140 40 200 20 S320 0 400 20" />
      </circle>
    </svg>
  );
}
