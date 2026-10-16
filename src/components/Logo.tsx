export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <rect width="48" height="48" rx="12" fill="#174F39" />
      <path d="M15 10h13l7 7v15a2 2 0 0 1-2 2H15a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2Z" fill="#fff" />
      <path d="M28 10v6a1 1 0 0 0 1 1h6" fill="#D6EADF" />
      <path d="M17 18h8M17 22h12M17 26h7" stroke="#174F39" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 38c4-1 4-6 9-6s6-4 9-4" stroke="#E5A243" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="28" r="2.6" fill="#E5A243" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`whitespace-nowrap font-display text-lg font-bold tracking-tight sm:text-xl ${light ? 'text-white' : 'text-brand-800'}`}>
        E-Way <span className="text-amber-500">Easy</span>
      </span>
    </span>
  );
}
