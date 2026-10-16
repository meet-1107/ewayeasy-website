import type { ReactNode } from 'react';

export default function ComplianceNote({ title = 'Please note', children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="rounded-2xl border border-amber-400/50 bg-amber-300/15 p-4 text-sm text-ink-soft">
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1 space-y-1">{children}</div>
    </aside>
  );
}
