import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Consent from '@/components/Consent';
import StickyCTA from '@/components/StickyCTA';
import JsonLd from '@/components/JsonLd';
import { FOUNDER, GSC_VERIFICATION, SITE, SITE_URL } from '@/lib/site';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700', '800'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'E-Way Easy: E-Way Bill App for Indian Businesses', template: '%s | E-Way Easy' },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: '#174F39', width: 'device-width', initialScale: 1 };

const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': `${SITE_URL}/#org`, name: SITE.name, url: SITE_URL, logo: `${SITE_URL}/favicon.svg`,
      founder: { '@type': 'Person', name: FOUNDER.name, url: `${SITE_URL}/about` },
    },
    {
      '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: SITE.name, url: SITE_URL, inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans">
        <JsonLd data={orgLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
        <Consent />
      </body>
    </html>
  );
}
