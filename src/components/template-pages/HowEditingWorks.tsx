/** "How editing, PDF download and printing work" — shared explainer with a category-specific note. */
export default function HowEditingWorks({ documentName, note }: { documentName: string; note: string }) {
  const steps = [
    { title: 'Pick a layout', text: `Open the ${documentName} template that fits your use and the editor loads straight away.` },
    { title: 'Fill in the fields', text: 'Click any field to type your own details, add your logo and choose the currency. Totals update as you type.' },
    { title: 'Choose the paper size', text: 'Switch between A4, A5, Letter and Legal to match your printer or what the recipient expects.' },
    { title: 'Download or print', text: 'Save a PDF to email or share, or print directly from the browser.' },
  ];
  return (
    <section aria-labelledby="how-editing-h">
      <p className="eyebrow">How it works</p>
      <h2 id="how-editing-h" className="h2 mt-2">How editing, PDF download and printing work</h2>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="card p-5">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-display font-bold text-white">
              {i + 1}
            </span>
            <h3 className="mt-3 font-display text-lg font-bold text-ink">{s.title}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-soft">{s.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-brand-50 p-5 text-[15px] leading-7 text-ink-soft">
          <p className="font-semibold text-ink">Everything stays in your browser</p>
          <p className="mt-1">
            The template is edited and turned into a PDF on your own device. Nothing you type, and no logo you add, is
            uploaded to a server. There is no sign-up.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-50 p-5 text-[15px] leading-7 text-ink-soft">
          <p className="font-semibold text-ink">Before you send it</p>
          <p className="mt-1">{note}</p>
        </div>
      </div>
    </section>
  );
}
