/** App icon: white "E" with an amber forward chevron on a green tile (matches the Play Store icon). */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <defs>
        <linearGradient id="ee-logo-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2B7D57" />
          <stop offset="1" stopColor="#14503A" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" fill="url(#ee-logo-bg)" />
      <rect x=".5" y=".5" width="47" height="47" rx="10.5" fill="none" stroke="#fff" strokeOpacity=".12" />
      <g fill="#F7F5EF">
        <rect x="13.5" y="13" width="6" height="22" rx="2.4" />
        <rect x="13.5" y="13" width="19.5" height="5.4" rx="2.7" />
        <rect x="13.5" y="29.6" width="19.5" height="5.4" rx="2.7" />
        <rect x="13.5" y="21.3" width="11" height="5.4" rx="2.7" />
      </g>
      <path d="M28 20.2 32.4 24 28 27.8" fill="none" stroke="#F2B33D" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`whitespace-nowrap font-display text-lg font-bold tracking-tight sm:text-xl ${light ? 'text-white' : 'text-brand-800'}`}>
        E<span className="text-amber-500">-</span>Way Easy
      </span>
    </span>
  );
}
