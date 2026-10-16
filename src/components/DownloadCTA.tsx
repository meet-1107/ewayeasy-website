import PlayBadge from './PlayBadge';
import { Phone } from './AppGraphics';

export default function DownloadCTA({
  placement,
  title = 'Make your e-way bill workflow simpler',
  text = 'Create the sales invoice, review e-way bill details and generate, all from your phone with E-Way Easy.',
}: { placement: string; title?: string; text?: string }) {
  return (
    <section className="no-print relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-800 to-brand-950 p-8 text-white shadow-lift md:p-10">
      <div aria-hidden className="absolute inset-0 bg-hero-grid opacity-50" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Android app</p>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-xl text-brand-100/90">{text}</p>
          <div className="mt-6"><PlayBadge placement={placement} /></div>
        </div>
        <div className="-mb-24 hidden md:block">
          <Phone screen="dashboard" width={170} alt="E-Way Easy app dashboard" className="rotate-6" />
        </div>
      </div>
    </section>
  );
}
