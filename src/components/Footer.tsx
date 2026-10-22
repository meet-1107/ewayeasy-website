import Link from 'next/link';
import Logo from './Logo';
import PlayBadge from './PlayBadge';
import { AUTHOR } from '@/lib/site';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Download app', href: '/download' },
      { label: 'Help centre', href: '/help' },
      { label: 'Latest updates', href: '/updates' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Manufacturers', href: '/solutions/manufacturers' },
      { label: 'Wholesalers & distributors', href: '/solutions/wholesalers-distributors' },
      { label: 'Accountants', href: '/solutions/accountants' },
    ],
  },
  {
    title: 'Free tools',
    links: [
      { label: 'GST calculator', href: '/tools/gst-calculator' },
      { label: 'Sales invoice templates', href: '/sales-invoice-templates' },
      { label: 'Purchase order templates', href: '/purchase-order-templates' },
      { label: 'Commercial invoice templates', href: '/commercial-invoice-templates' },
      { label: 'E-way bill eligibility', href: '/tools/eway-bill-eligibility-checker' },
      { label: 'Validity calculator', href: '/tools/distance-calculator' },
      { label: 'Bulk e-way bill checker', href: '/tools/bulk-eway-bill-data-checker' },
      { label: 'GSTIN validator', href: '/tools/gstin-validator' },
      { label: 'All free tools', href: '/tools' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'All guides', href: '/guides' },
      { label: 'E-way bill guide', href: '/eway-bill-guide' },
      { label: 'How to generate', href: '/eway-bill-generation' },
      { label: 'Documents required', href: '/documents-required-for-eway-bill' },
      { label: 'Rules (Rule 138)', href: '/eway-bill-rules' },
      { label: 'Bulk e-way bills', href: '/bulk-eway-bill-generation' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: `Author: ${AUTHOR.name}`, href: `/authors/${AUTHOR.slug}` },
      { label: 'Contact & support', href: '/contact' },
      { label: 'Refund policy', href: '/refund-policy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer mt-24 bg-brand-950 text-brand-100/80">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-6">
            E-Way Easy is an Android app that makes the e-way bill workflow simpler for Indian businesses: invoice, review, generate.
          </p>
          <div className="mt-5"><PlayBadge placement="footer" /></div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="font-display font-semibold text-white">{col.title}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {col.links.map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-amber-400">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 text-xs leading-6 text-brand-100/60">
          <p>
            <strong className="text-brand-100/80">Disclaimer:</strong> E-Way Easy is a private software product and is not a government portal.
            It is not affiliated with or endorsed by GSTN, NIC or any government body. Content on this website is general education,
            not tax or legal advice. Always confirm requirements on the official{' '}
            <a className="underline" href="https://ewaybillgst.gov.in/" target="_blank" rel="noopener noreferrer">e-way bill portal</a>.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p>Â© {new Date().getFullYear()} E-Way Easy. All rights reserved.</p>
            <ul className="flex flex-wrap gap-4">
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-white">Terms</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-white">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
