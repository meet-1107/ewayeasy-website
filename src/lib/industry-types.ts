// Shape of an industry page (/industries/[slug]). Content lives in src/lib/industries.ts.

export type IndustryIcon = 'fmcg' | 'machinery' | 'auto' | 'textile' | 'pharma' | 'ecommerce';

export interface Industry {
  /** URL slug under /industries/. */
  slug: string;
  /** Full name, e.g. "FMCG and packaged foods". */
  name: string;
  /** Short label for menus, max ~22 characters. */
  shortName: string;
  /** <title>, 60 characters or fewer, unique. */
  seoTitle: string;
  /** 140–160 characters, unique. */
  metaDescription: string;
  h1: string;
  /** Hero paragraph, 1–2 sentences. */
  intro: string;
  /** 2–4 self-contained sentences that AI search engines can quote. */
  quickAnswer: string;
  icon: IndustryIcon;
  /** "What dispatch looks like" cards, 3–4. */
  profile: { title: string; text: string }[];
  /** Common goods movements in this sector and the e-way bill position, 4–6 rows. */
  movements: { scenario: string; document: string; ewayBill: string }[];
  /** Typical mistakes or pain points, 4. */
  painPoints: { label: string; text: string }[];
  /** How E-Way Easy helps, only verified app features, 4–5 rows. */
  appFit: { need: string; how: string }[];
  /** Honest note on high volumes / bulk: the app has no bulk generation; point to the official portal route. */
  volumeNote: string;
  /** Pre-dispatch checklist, 5–7 items. */
  checklist: string[];
  faq: { q: string; a: string }[];
  /** Internal reading links, 4. */
  related: { href: string; label: string; text: string }[];
  /** Free tools with a sector-specific reason, 3. Slugs must exist under /tools/. */
  tools: { slug: string; why: string }[];
}
