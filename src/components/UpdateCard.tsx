import Link from 'next/link';
import type { ComplianceUpdate } from '@/lib/updates';
import { AUTHOR } from '@/lib/site';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Formats the loose date strings used in UPDATES ("2025-01-01", "2024-11", "2024",
 * "2025-01-01 (phased, all taxpayers from 2025-04-01)") without guessing missing parts.
 */
export function formatUpdateDate(value: string): string {
  return value.replace(/(\d{4})-(\d{2})(?:-(\d{2}))?/g, (_m, y: string, mo: string, d?: string) => {
    const month = MONTHS[Number(mo) - 1];
    if (!month) return _m;
    return d ? `${Number(d)} ${month} ${y}` : `${month} ${y}`;
  });
}

/** Returns an ISO-like value for <time dateTime> only when the string is a clean date. */
function machineDate(value: string): string | undefined {
  const m = value.match(/^(\d{4}(?:-\d{2}){0,2})$/);
  return m ? m[1] : undefined;
}

function DateText({ value }: { value: string }) {
  const dt = machineDate(value);
  return dt ? <time dateTime={dt}>{formatUpdateDate(value)}</time> : <>{formatUpdateDate(value)}</>;
}

function Badges({ update }: { update: ComplianceUpdate }) {
  if (!update.important && update.status === 'verified') return null;
  return (
    <div className="flex flex-wrap gap-2">
      {update.important && (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-brand-950">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
            <path d="M8 1.5 15 14H1L8 1.5Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 6v3.5M8 11.6v.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          Important Rule Change
        </span>
      )}
      {update.status !== 'verified' && (
        <span className="inline-flex items-center gap-1 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
            <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 4.5V8l2.2 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          </svg>
          Pending verification
        </span>
      )}
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden>
      <path d="M9 2.5h4.5V7M13.5 2.5 7.5 8.5M6 3.5H3.5v9h9V10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function UpdateCard({ update, compact = false }: { update: ComplianceUpdate; compact?: boolean }) {
  const headingId = `${update.id}-title`;

  if (compact) {
    return (
      <article aria-labelledby={headingId} className="card flex h-full flex-col p-5 md:p-6">
        <Badges update={update} />
        <h3 id={headingId} className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
          {update.headline}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-soft">{update.summary}</p>
        <dl className="mt-4 space-y-1 text-sm">
          <div className="flex flex-wrap gap-x-1.5">
            <dt className="text-ink-faint">Effective:</dt>
            <dd className="font-semibold text-ink"><DateText value={update.effective} /></dd>
          </div>
          <div className="flex flex-wrap gap-x-1.5">
            <dt className="text-ink-faint">Source:</dt>
            <dd>
              <a href={update.source.url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700">
                {update.source.title}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
        <Link
          href={`/updates#${update.id}`}
          className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-brand-700 hover:text-brand-800"
        >
          Read more<span className="sr-only">: {update.headline}</span>
          <span aria-hidden>→</span>
        </Link>
      </article>
    );
  }

  return (
    <article id={update.id} aria-labelledby={headingId} className="card scroll-mt-24 overflow-hidden">
      <div className="p-5 md:p-8">
        <Badges update={update} />
        <h2 id={headingId} className="mt-3 font-display text-xl font-bold leading-snug text-ink md:text-2xl">
          {update.headline}
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-ink-soft md:text-base">{update.summary}</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-brand-50/70 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Announced</dt>
            <dd className="mt-1 font-semibold text-ink"><DateText value={update.announced} /></dd>
          </div>
          <div className="rounded-2xl bg-brand-50/70 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Effective</dt>
            <dd className="mt-1 font-semibold text-ink"><DateText value={update.effective} /></dd>
          </div>
          <div className="rounded-2xl bg-brand-50/70 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Who is affected</dt>
            <dd className="mt-1 text-sm font-medium leading-6 text-ink">{update.impacted}</dd>
          </div>
        </dl>

        <div className={`mt-6 grid gap-3 ${update.previous ? 'md:grid-cols-2' : ''}`}>
          {update.previous && (
            <div className="rounded-2xl border border-brand-900/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Previous rule</p>
              <p className="mt-1.5 text-[15px] leading-6 text-ink-soft">{update.previous}</p>
            </div>
          )}
          <div className="rounded-2xl border border-brand-500/30 bg-brand-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{update.previous ? 'New rule' : 'Current position'}</p>
            <p className="mt-1.5 text-[15px] font-medium leading-6 text-ink">{update.now}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-l-4 border-amber-500 bg-amber-300/15 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Practical example</p>
          <p className="mt-1 text-[15px] leading-6 text-ink">{update.example}</p>
        </div>

        <dl className="mt-6 space-y-2 text-sm">
          <div>
            <dt className="inline font-semibold text-ink">Reference: </dt>
            <dd className="inline text-ink-soft">{update.reference}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-ink">Official source: </dt>
            <dd className="inline">
              <a href={update.source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:decoration-brand-700">
                {update.source.title}
                <ExternalIcon />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-brand-900/10 bg-cream/60 px-5 py-3 text-xs text-ink-faint md:px-8">
        <p>
          By{' '}
          <Link href={`/authors/${AUTHOR.slug}`} className="font-semibold text-ink hover:text-brand-700 hover:underline">
            {AUTHOR.name}
          </Link>
        </p>
        <p>
          Last verified: <span className="font-semibold text-ink-soft"><DateText value={update.verifiedAt} /></span>
        </p>
      </footer>
    </article>
  );
}
