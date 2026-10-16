# E-Way Easy: marketing and education website

Next.js 15 (App Router) + TypeScript + Tailwind CSS. The whole site is **statically generated** (`output: 'export'`), so it can be hosted on any static host (Vercel, Netlify, Cloudflare Pages, S3/CloudFront, or plain Nginx) with no server, database or API keys.

## Quick start

```bash
npm install
# production values live in .env.production; copy .env.example to .env.local for local overrides
npm run dev                  # http://localhost:3000
npm test                     # calculator, invoice, eligibility and validity tests
npm run build                # static site in ./out
npm run check:links          # verifies every internal link in ./out
npm start                    # serves ./out locally
```

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical domain, used for canonical URLs, sitemap, Open Graph and schema. No trailing slash. |
| `NEXT_PUBLIC_PLAY_STORE_URL` | Yes | Verified Google Play listing. While it is empty, every badge shows "Play Store link coming soon" and no guessed link is published. UTM data is added automatically as Play's `referrer` parameter (`utm_medium=<placement>`). |
| `NEXT_PUBLIC_SUPPORT_EMAIL` | Recommended | Shown on Contact and author pages; enables the mailto contact form. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID. Analytics loads **only after the visitor accepts** the consent banner. Download buttons send a `download_click` event with a `placement` parameter. This is a click, not an install. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console meta verification token. |

All are `NEXT_PUBLIC_` because the site is static. Nothing secret belongs in this project.

## Project structure

```
content/
  EDITORIAL_BRIEF.md    rules + verified facts every writer must follow
  blog/*.md             30 articles (frontmatter: title, slug, excerpt, category, tags, dates, SEO, sources, faq, related)
  guides/*.md           12 learning-centre pages, served at the site root (/eway-bill-rules, â€¦)
src/app/                routes (home, features, download, tools/*, blog, authors, updates, legal pages)
src/components/         Header, Footer, PlayBadge, DownloadCTA, ArticleLayout, BlogCard, AppGraphics, tools/*
src/lib/money.ts        paise-integer GST / invoice maths (no floating-point errors)
src/lib/eligibility.ts  e-way bill eligibility rule engine
src/lib/validity.ts     validity / expiry calculator
src/lib/updates.ts      compliance updates (each with source, effective date, last-verified date)
src/lib/site.ts         brand, author, navigation, categories, env config
public/_headers         security headers for Netlify / Cloudflare Pages
vercel.json             same security headers for Vercel
```

## Managing content

**New article:** add `content/blog/<slug>.md` using the frontmatter format in `content/EDITORIAL_BRIEF.md`, then rebuild. The article page, category pages, pagination, search index, sitemap, BlogPosting schema, table of contents (from `##`/`###` headings), reading time and related articles are all generated automatically. The author is always Bhavesh Akabari (`src/lib/site.ts â†’ AUTHOR`).

**Cover images (thumbnail style):** every article and guide has a 1280Ã—720 cover in `public/images/covers/<slug>.jpg`. Each one has a headline, a ribbon, the E-Way Easy badge and app or photo artwork, and it doubles as the Open Graph share image. To add or change one:

1. Add or edit its entry in `src/lib/covers.ts` (`l1`, `l2`, `tag`, `variant`: `person` | `truck` | `phone` | `phones`).
2. `KEEP_COVERS=1 npm run build` (on Windows PowerShell: `$env:KEEP_COVERS='1'; npm run build`), then `npm start`.
3. In a second terminal: `npm run covers -- http://localhost:4321 <slug>` (omit the slug to recapture all of them).
4. Run a normal `npm run build`. The post-build step removes the internal `/cover/*` pages from `out/`.

The person and truck photos are cropped from the E-Way Easy promo creative (`public/images/covers/src/`). To use more people photos, add them to that folder and reference them in `src/app/cover/[slug]/page.tsx`.

**Pricing:** `src/lib/pricing.ts` holds the wallet packs, action costs and notes shown on `/pricing`, the homepage, the download page and the help centre. Keep it in sync with the app wallet. The refund policy (`/refund-policy`) says purchased credits are not refundable, except that a payment that went through without credits being added gets the credits added or the payment refunded.

**Sitemaps:** `/sitemap.xml` is a sitemap index pointing to `/sitemap-pages.xml`, `/sitemap-tools.xml`, `/sitemap-guides.xml` and `/sitemap-blog.xml` (`src/lib/sitemaps.ts`). Pages are discovered from the route folders in `src/app`, tools from `src/lib/tools.ts`, and guides and blog posts from `content/`, so nothing unpublished is listed. Submit `/sitemap.xml` in Search Console.

**Analytics events** (sent only when `NEXT_PUBLIC_GA_ID` is set and the visitor accepts): `download_click` with `placement` on every Play Store button (a click, not an install), and `tool_use` with `tool` the first time someone interacts with a tool. No values typed into tools are ever sent. App-side metrics such as sign-ups, first successful bill, repeat use and paid conversion have to be tracked inside the app.

**Compliance updates:** edit `src/lib/updates.ts`. Set `status: 'pending-verification'` for anything not yet checked against an official source; it then shows a warning badge instead of being presented as current law. Bump `verifiedAt` after each review.

**Author bio:** edit `AUTHOR` in `src/lib/site.ts`. Add only verified information. To add a photo, put it in `public/images/` and replace the "BA" initials on the author page and in `ArticleLayout`.

To move to a headless CMS later (Sanity, Contentful, Decap), replace `getAllPosts` and `getAllGuides` in `src/lib/content.ts`. Every page reads content only through those functions.

## Deployment

1. Set the environment variables in your host's dashboard.
2. Build command `npm run build`, output directory `out`.
3. **Vercel:** zero config (`vercel.json` adds headers and clean URLs). **Netlify / Cloudflare Pages:** `public/_headers` is copied into `out`. **Nginx:** serve `out/`, add `try_files $uri $uri.html $uri/ =404;` and copy the headers from `public/_headers`.
4. Enable HTTPS and redirect `http` â†’ `https` and the bare domain â†’ `www` (or the other way round) at the host.
5. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Production checklist

- [ ] `npm test` passes
- [ ] `npm run build` succeeds and `npm run check:links` reports no broken links
- [ ] Every item in the placeholder checklist below is filled in
- [ ] Lighthouse on mobile for `/`, a blog post and `/tools/invoice-generator`
- [ ] Rich Results Test on a blog post (BlogPosting, Breadcrumb, FAQ) and on `/features` (SoftwareApplication)
- [ ] Search Console verified, sitemap submitted
- [ ] Privacy Policy and Terms reviewed by a legal adviser
- [ ] Compliance content re-verified on ewaybillgst.gov.in, gst.gov.in and cbic-gst.gov.in, with `verifiedAt` dates updated

## Placeholder checklist: real information needed before launch

| # | Item | Where | Current state |
|---|---|---|---|
| 1 | Production domain | `.env.production` | ✅ `https://ewayeasy.com` |
| 2 | Google Play listing URL | `.env.production` | ✅ `com.ewayeasy.app` listing, with UTM referrer per placement |
| 3 | Official Google Play badge artwork | `src/components/PlayBadge.tsx` | Inline look-alike SVG. Replace it with the official badge from play.google.com/intl/en_us/badges and follow Google's badge guidelines |
| 4 | Final app logo | `src/components/Logo.tsx`, `public/favicon.svg`, `scripts/og.svg` â†’ `public/images/og-default.png` | Designed placeholder mark in brand colours |
| 5 | Support email | `.env.production` | ✅ bvbtrade9@gmail.com |
| 6 | Author bio, photo and credentials for Bhavesh Akabari | `AUTHOR` in `src/lib/site.ts` | Neutral bio with no invented qualifications. Add verified details only |
| 7 | Company / legal entity name and address for legal pages | `src/app/privacy-policy`, `terms-and-conditions` | Template text; jurisdiction to be confirmed |
| 8 | App screenshots | `public/images/app-*.jpg` | Taken from real phone screenshots (show status bar and one real company's GSTIN). Swap for clean marketing screenshots |
| 9 | Feature claims to confirm in the app | `/features`, homepage | Only features visible in the supplied screenshots and promo are claimed. Confirm bank-details selection and printing inside the app before marking them "In the app" |
| 10 | Pricing / credit costs | `src/lib/pricing.ts` | ✅ 1 credit = ₹1, 5 credits per action, packs 50–1,000 (from the app wallet). Update this file if wallet prices change |
| 11 | GA4 ID and consent text | `NEXT_PUBLIC_GA_ID`, `src/components/Consent.tsx` | Analytics off |
| 12 | Compliance facts to re-check | `src/lib/updates.ts`, guides, articles | See list below |

### Compliance facts to re-verify before publishing

The content was written from the facts in `content/EDITORIAL_BRIEF.md`. Writers also cited the following, which should be checked against the official text:

- Rule references beyond Rule 138: Rules 46, 55, 88A, 138(9), 138(10), 138(12); CGST Act Sections 15, 31, 49, 77, 122, 129; IGST Act Sections 10 and 19.
- Validity is counted from the time Part B is first entered (the guides use this reading of Rule 138(10)).
- Number of copies of a delivery challan and tax invoice (delivery-challan article).
- Statement that the portal generally won't accept a second e-way bill for the same document number while the first is active.
- The 2025 changes in `src/lib/updates.ts`: GST rate rationalisation (effective 22 Sep 2025), 180-day document age limit, 360-day extension cap, MFA rollout, 30-day e-invoice reporting for AATO â‰¥ â‚¹10 crore, E-Way Bill 2.0 portal.
- Any state-specific intra-state threshold. The site intentionally lists none and tells readers to check their state's notification.
