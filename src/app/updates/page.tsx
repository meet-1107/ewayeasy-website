import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import UpdateCard, { formatUpdateDate } from '@/components/UpdateCard';
import DownloadCTA from '@/components/DownloadCTA';
import { pageMeta } from '@/lib/seo';
import { UPDATES } from '@/lib/updates';
import { OFFICIAL_SOURCES } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Latest GST and E-Way Bill Updates',
  description:
    'Recent GST and e-way bill rule changes explained simply: what changed, from when, who is affected and a practical example, with links to official sources.',
  path: '/updates',
});

export default function UpdatesPage() {
  const verified = UPDATES.map((u) => u.verifiedAt).sort();
  const latestVerified = verified[verified.length - 1];

  return (
    <>
      <PageHeader
        eyebrow="Compliance updates"
        title="Latest GST and e-way bill updates"
        description="Rule changes that affect how you invoice and move goods — what changed, from when, and what it means in practice."
        crumbs={[{ name: 'Updates', href: '/updates' }]}
      />

      <div className="container py-10 md:py-14">
        <div className="mx-auto max-w-4xl">
          <aside
            aria-labelledby="editorial-note"
            className="flex gap-3 rounded-2xl border border-brand-500/25 bg-brand-50 p-4 text-sm leading-6 text-ink-soft md:p-5"
          >
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-700 text-white" aria-hidden>
              <svg viewBox="0 0 16 16" className="h-4 w-4"><path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </span>
            <div>
              <p id="editorial-note" className="font-semibold text-ink">Editorial note</p>
              <p className="mt-1">
                Each update is checked against official GST and e-way bill sources before it is published. Dates show the
                original announcement, the date the change took effect, and when we last verified it. This page is a
                plain-language summary, not legal advice — always confirm the current position on the official portal or
                with your tax adviser before acting.
              </p>
              {latestVerified && (
                <p className="mt-2 text-xs text-ink-faint">
                  {UPDATES.length} updates listed. Most recent verification: <time dateTime={latestVerified}>{formatUpdateDate(latestVerified)}</time>.
                </p>
              )}
            </div>
          </aside>

          <nav aria-label="Updates on this page" className="mt-8">
            <p className="eyebrow">On this page</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {UPDATES.map((u) => (
                <li key={u.id}>
                  <a href={`#${u.id}`} className="chip hover:bg-brand-100">
                    {u.important && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />}
                    {u.headline.length > 48 ? `${u.headline.slice(0, 46).trimEnd()}…` : u.headline}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-6 md:space-y-8">
            {UPDATES.map((u) => (
              <UpdateCard key={u.id} update={u} />
            ))}
          </div>

          <section aria-labelledby="official-sources" className="card mt-12 p-6 md:p-8">
            <h2 id="official-sources" className="font-display text-xl font-bold text-ink">Check the official sources</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Notifications, advisories and portal changes are published on the official websites below. E-Way Easy is not
              a government portal and is not affiliated with GSTN or NIC.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {OFFICIAL_SOURCES.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 rounded-xl border border-brand-900/10 px-4 py-3 text-sm font-medium text-ink transition hover:border-brand-500 hover:text-brand-700"
                  >
                    {s.title}
                    <span aria-hidden>↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink-soft">
              New to e-way bills? Start with the <Link href="/eway-bill-rules" className="font-medium text-brand-700 underline underline-offset-2">e-way bill rules</Link>{' '}
              or the <Link href="/eway-bill-guide" className="font-medium text-brand-700 underline underline-offset-2">complete guide</Link>.
            </p>
          </section>

          <div className="mt-12">
            <DownloadCTA placement="updates" />
          </div>
        </div>
      </div>
    </>
  );
}
