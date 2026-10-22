# E-Way Easy — Editorial Brief (read before writing any content)

Site: E-Way Easy marketing + education website (India-wide). Author of all content: **Bhavesh Akabari**.
Today's date: 15 October 2026. Language: natural, professional Indian English, readable by small business owners.

## Hard rules
- Never invent credentials, experience or anecdotes for Bhavesh Akabari (no "I helped a client", no CA/GST practitioner claims, no years of experience).
- Never invent notification numbers, circular numbers, dates or thresholds. If unsure, say "check the latest notification on the official portal" instead of stating a number.
- Clearly label worked scenarios as **Example (illustrative)**. Use made-up businesses like "a Rajkot pipe manufacturer" — never real company names or real GSTINs. Use obviously sample GSTINs like `24ABCDE1234F1Z5`.
- E-Way Easy is NOT a government portal and is not affiliated with GSTN/NIC. Don't imply endorsement.
- Never claim an e-way bill is "officially generated" by a tool unless through the official system / authorised integration.
- No keyword stuffing, no filler intros like "In today's fast-paced world". Get to the point.
- Vary article length (900–1800 words) and structure (some step lists, some tables, some Q&A, some checklists). Not every article needs the same headings.
- Every article: explain the problem, the practical answer, common mistakes, exceptions/limitations, and end with a short note pointing to official sources. Where natural, mention E-Way Easy app or the site's free tools (links below) — once or twice, not salesy.

## Verified E-Way Easy app capabilities (only these may be claimed)
From the actual app screens and the official promo creative:
- Android app, mobile-first. Dashboard shows business name + GSTIN, total sales for the financial year, invoice and e-way bill counts, recent activity.
- Create invoice flow in 3 steps: **1 Invoice → 2 Review EWB → 3 Generated**.
- Seller (you) details saved; Buyer section: enter buyer GSTIN and name, address, state and PIN fill automatically (leave empty if unregistered).
- Saved Buyers list and Products list; product selection with search; HSN code fills from the product (manual edit possible).
- Distance calculated automatically from PIN codes (manual edit possible).
- Invoice number pre-series / auto numbering in your own series.
- Sales invoice is created as part of the e-way bill workflow (invoice preview before saving).
- Import PDF option on the dashboard.
- Wallet with credits: 1 credit = ₹1; packs of 50 / 100 / 250 / 500 / 1,000 credits or any other amount. Each e-way bill action costs 5 credits: generate new EWB, update Part-B (vehicle), consolidated EWB, cancel EWB, extend validity. Credits are taken only when the action succeeds; if the portal rejects it they are refunded to the wallet automatically.
- Refund policy: purchased credits are not refundable; if a payment is made but credits are not added, the credits are added or the payment is refunded.
- Help/support inside the app.
NOT verified — do not claim: bulk e-way bill generation inside the app, API/GSP status, e-invoice (IRN) generation, multi-user, offline mode, iOS app, any pricing, any user numbers or ratings.

## Rules you may state (generally accepted position; still tell readers to verify current law)
- Legal basis: Section 68 of the CGST Act and Rule 138 of the CGST Rules, 2017 (plus Rules 138A–138E).
- E-way bill (EWB) is generally required for movement of goods where consignment value exceeds ₹50,000 (consignment value = taxable value + GST, excluding value of exempt supplies in the same invoice per the rule's definition). Some states have notified different (higher) thresholds for intra-state movement — tell readers to check their state's notification; don't list specific state numbers.
- Required irrespective of value for: inter-state movement of goods by a principal to a job worker, and inter-state transport of specified handicraft goods by a person exempt from registration.
- Annexure to Rule 138(14) lists goods/situations where EWB is not required (e.g. non-motorised conveyance, certain exempt goods, goods moving from port/airport/air cargo complex/land customs station to ICD/CFS for customs clearance, etc.). Refer generally; don't over-enumerate.
- Who generates: the registered supplier/consignor, or the recipient, or the transporter (if neither did, transporter must generate before movement where value > threshold). Unregistered transporters can enrol on the portal to get a Transporter ID (TRANSIN).
- Form GST EWB-01: **Part A** (GSTIN of supplier & recipient, place of dispatch and delivery PIN, document type, number & date, value of goods, HSN code, reason for transportation; Transporter ID and approximate distance are also entered with Part A on the portal) and **Part B** (mode of transport, vehicle number, transport document number & date such as LR/RR/airway bill/bill of lading). EWB is valid for movement only after Part B is filled (except the distance exemption below), and validity is counted from when Part B is first entered.
- Part B not required where goods move within the same State/UT up to 50 km from consignor's place to transporter's place for further transport (or from transporter to consignee) — Part A still required.
- Validity (Rule 138(10)): 1 day for every 200 km or part thereof for normal cargo; for over-dimensional cargo (ODC), 1 day per 20 km. A "day" ends at midnight of the following day after generation (period counted from the time of generation, the first day ends at midnight of the next day).
- Extension: can be extended by the transporter/generator within 8 hours before or after expiry, when goods can't reach in time due to exceptional circumstances (e.g. accident, natural calamity, law & order, trans-shipment delay).
- Cancellation: within 24 hours of generation, if goods not transported or not as per details; cannot be cancelled if verified in transit.
- Recipient may accept/reject within 72 hours (or by delivery, whichever is earlier); deemed accepted otherwise.
- Corrections: EWB cannot be edited. If Part A details are wrong, cancel within 24 hours and generate a new one. Part B (vehicle) can be updated any number of times within validity (e.g. vehicle change, trans-shipment). Transporter can be updated.
- Distance: portal auto-calculates PIN-to-PIN distance; user can enter actual distance up to 10% more than the auto-calculated distance. Max distance 4,000 km. Same PIN-code movement: up to 100 km can be entered.
- Consolidated EWB (EWB-02) for multiple consignments in one vehicle.
- Bulk generation on the official portal: the portal provides a bulk generation facility via a JSON file prepared with the official "Bulk Generation Tools" (Excel-based utility) and uploaded on the portal. Large taxpayers can use API via GSP/ERP integration. Explain generally; no fabricated field limits.
- E-invoicing: for e-invoice-applicable taxpayers, EWB can be generated using IRN (Part A auto-populated from e-invoice data).
- Penalty: transporting without a valid EWB can attract detention/seizure and penalty under Section 129 (and general penalty under Section 122). Describe in general terms; don't quote exact amounts beyond "penalty can be substantial; see Section 129".
- Documents to carry: invoice/bill of supply/delivery challan + EWB (physical or electronic/number, or RFID mapped). 
- Delivery challan used for job work, supply on approval, line sales, SKD/CKD in lots, transfer of goods without sale etc.

## Recent updates (state as reported by GSTN advisories; ask readers to verify on official portal)
- From 1 January 2025: e-way bill cannot be generated for base documents (invoice/challan) dated more than 180 days before the generation date.
- From 1 January 2025: an e-way bill can be extended only up to a total of 360 days from its original generation date.
- Multi-Factor Authentication (MFA/2FA) on the e-way bill portal phased in: taxpayers with AATO above ₹20 crore from 1 January 2025, then extended in phases to all taxpayers from 1 April 2025.
- E-Way Bill 2.0 portal (ewaybill2.gst.gov.in) launched by GSTN/NIC in 2024 as an additional portal with synchronised data for continuity.
- E-invoice reporting time limit: taxpayers with AATO ≥ ₹10 crore must report e-invoices to IRP within 30 days of invoice date, from 1 April 2025.

## Official sources (use these root URLs; do not invent deep links)
- E-Way Bill portal: https://ewaybillgst.gov.in/
- E-Way Bill 2.0 portal: https://ewaybill2.gst.gov.in/
- E-Way Bill user documentation: https://docs.ewaybillgst.gov.in/
- GST portal: https://www.gst.gov.in/
- GST tutorials: https://tutorial.gst.gov.in/
- CBIC: https://www.cbic.gov.in/
- CBIC GST: https://cbic-gst.gov.in/

## Internal links you can use
Guides: /eway-bill-guide, /eway-bill-generation, /documents-required-for-eway-bill, /eway-bill-rules, /eway-bill-validity, /eway-bill-distance-rules, /eway-bill-cancellation, /eway-bill-correction, /bulk-eway-bill-generation, /eway-bill-common-errors, /eway-bill-vs-sales-invoice, /eway-bill-faq
Tools: /tools/gst-calculator, /tools/gst-inclusive-exclusive-calculator, /tools/eway-bill-eligibility-checker, /tools/distance-calculator, /sales-invoice-templates/gst-tax-invoice, /sales-invoice-templates, /tools/hsn-code-lookup, /tools/quantity-and-tax-calculator
App: /download, /features
Blog posts: /blog/<slug>

## File format — blog articles: `content/blog/<slug>.md`
```
---
title: "What Is an E-Way Bill? A Complete Guide for Indian Businesses"
slug: "what-is-an-eway-bill"
excerpt: "One or two sentences, max ~160 chars."
category: "eway-bill"          # one of: eway-bill | gst-compliance | invoicing | business-guides | product-updates
tags: ["e-way bill", "basics"]
publishedAt: "2026-05-04"      # between 2026-04-01 and 2026-10-14, spread out
updatedAt: "2026-09-20"        # >= publishedAt, <= 2026-10-14
verifiedAt: "2026-10-10"       # for compliance articles; omit for non-compliance pieces
seoTitle: "What Is an E-Way Bill? Rules, Parts & Process (2026 Guide)"   # <= 60 chars ideally
metaDescription: "<= 155 chars"
imageAlt: "Describe the cover graphic in words"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
faq:                            # optional, 2–5 items, only where natural
  - q: "Question?"
    a: "Answer."
related: ["other-slug", "another-slug"]   # 2–3 slugs from the article list
---
Markdown body. Start directly with an intro paragraph (no H1 — the title is rendered by the page).
Use ## for main sections and ### for sub-sections (these build the table of contents).
Tables in GFM pipe format are fine. Use > blockquotes for "Note:" callouts.
```

## File format — guide pages: `content/guides/<slug>.md`
Same frontmatter but with `description` instead of `excerpt`, no `category`/`tags`, and add `updateHistory:` list of `{date, note}` (1–3 items). Slug must equal the route (e.g. `documents-required-for-eway-bill`).
