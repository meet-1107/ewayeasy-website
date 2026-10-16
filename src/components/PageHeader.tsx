import type { ReactNode } from 'react';
import Breadcrumbs, { type Crumb } from './Breadcrumbs';

export default function PageHeader({
  eyebrow, title, description, crumbs, children,
}: { eyebrow?: string; title: string; description?: string; crumbs: Crumb[]; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-brand-900 text-white">
      <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-60" />
      <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" />
      <div className="container relative py-12 md:py-16">
        <Breadcrumbs crumbs={crumbs} light />
        {eyebrow && <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-brand-100/90">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
