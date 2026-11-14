import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Consent from '@/components/Consent';
import StickyCTA from '@/components/StickyCTA';
import JsonLd from '@/components/JsonLd';
import { FOUNDER, GSC_VERIFICATION, PLAY_STORE_URL, SITE, SITE_URL, SUPPORT_EMAIL } from '@/lib/site';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['600', '700', '800'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'E-Way Easy: E-Way Bill App for Indian Businesses', template: '%s | E-Way Easy' },
  description: SITE.description,
  applicationName: SITE.name,
  // Allow full snippets and large image previews (needed for Google Discover and rich previews in Bing/Copilot).
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: { types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'E-Way Easy guides and articles' }] } },
  icons: { icon: [{ url: '/favicon.ico?v=2', sizes: '48x48' }, { url: '/favicon.svg?v=2', type: 'image/svg+xml' }], apple: '/apple-touch-icon.png?v=2' },
  verification: GSC_VERIFICATION ? { google: GSC_VERIFICATION } : undefined,
};

export const viewport: Viewport = { themeColor: '#174F39', width: 'device-width', initialScale: 1 };

const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE.name,
      alternateName: ['EWay Easy', 'E Way Easy'],
      url: SITE_URL,
      description: SITE.description,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon-512.png`, width: 512, height: 512 },
      founder: { '@type': 'Person', name: FOUNDER.name, url: `${SITE_URL}/about` },
      address: { '@type': 'PostalAddress', addressLocality: 'Nani Bhagedi', addressRegion: 'Gujarat', addressCountry: 'IN' },
      areaServed: { '@type': 'Country', name: 'India' },
      ...(SUPPORT_EMAIL ? { email: SUPPORT_EMAIL, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: SUPPORT_EMAIL } } : {}),
      ...(PLAY_STORE_URL ? { sameAs: [PLAY_STORE_URL] } : {}),
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
