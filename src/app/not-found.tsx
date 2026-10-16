import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-brand-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">This page took a different route</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">The page you’re looking for doesn’t exist or has moved. Try one of these instead:</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">Home</Link>
        <Link href="/eway-bill-guide" className="btn-ghost">E-way bill guide</Link>
        <Link href="/tools" className="btn-ghost">Free tools</Link>
        <Link href="/blog" className="btn-ghost">Blog</Link>
      </div>
    </section>
  );
}
