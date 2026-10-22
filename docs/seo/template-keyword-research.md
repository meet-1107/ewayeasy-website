# Template library: keyword and SERP research

Research date: 2026-10-22. The keyword-level map is in `template-keyword-map.csv`, with 60 rows covering 12 pages.

## 1. Method and limitations

**How the research was done**
- I ran 20 WebSearch queries in standard mode. They covered the seed terms plus India-specific variants such as "in excel India", "GST", "without GST", "IEC LUT" and "export invoice format India".
- For each query I recorded which domains and page types ranked, and what each page offered: an Excel/Word/PDF download, an online generator, a fillable PDF, or an explainer.
- I checked how the existing tool pages are titled in `src/app/tools/*/page.tsx` so the new titles follow the same style: keyword first, no brand suffix, an em-dash or colon qualifier.

**Limitations (read before acting on this)**
- **No volume data.** I had no Google Keyword Planner, Search Console, Ahrefs or Semrush. Every `est_monthly_volume` value is "not measured". The one search aimed at public volume figures found nothing usable: only an Amazon figure for the single word "invoice", which is irrelevant here.
- **No KD or CTR numbers.** `competition_assessment` is a qualitative low/medium/high based on who ranked in the sampled results.
- **The search tool is US-based.** It does not reproduce google.co.in. India SERPs were approximated with queries that include "India", "GST" or "₹" signals. These returned mostly Indian billing-software brands, which is probably close to the real google.co.in results, but it is not verified. Re-check in an Indian incognito session or Search Console.
- **Some results come from spam mirrors.** Hijacked or mirror pages showed up (e.g. `msoid.icmbio.gov.br`, `live.museum.manchester.ac.uk/library/...`, `certtest.bart.gov`). Google's live SERP may filter these. I treated them as a sign of a weak SERP ("quality gap"), not as real competitors.
- **Rows marked "not checked directly".** A few long-tail rows (`service invoice template`, `consultancy invoice format`, `wholesale bill format`, `B2B invoice format`) were not searched on their own. Their assessment is inferred from the closest query.
- **Unverified page details.** The `data_source` column names the exact query each assessment came from. I did not open competitor downloads or test their generators.

## 2. Cross-cutting SERP findings

1. **In India, "format" is the dominant wording.** Indian results use "format" in titles and URLs (myBillBook `/s/gst-invoice-format`, `/s/purchase-order-format`; Vyapar `/invoice-formats/...`). Global results use "template" (Xero, PandaDoc, Jotform, Invoice2go).
   - India-first pages (GST, simple, service, wholesale, PO category, manufacturing PO, export invoice) should lead with **"Format"**.
   - Global-first pages (commercial invoice, international PO, international CI) should lead with **"Template"**.
   - Each page should use the other word in its H2s and body text.
2. **Users expect Excel and Word downloads.** Nearly every Indian result offers "in Excel / Word / PDF" (Vyapar, myBillBook, Kladana, Petpooja, Fuzen, WPS). "...format in excel" and "...in word" are frequent modifiers. Our product gives a PDF and a browser print, with no .xlsx or .docx.
   - Do **not** claim Excel or Word output in titles, metas or schema.
   - Explain on-page why a browser editor beats an Excel file: totals and taxes calculate live, nothing to install, and nothing is uploaded.
   - Expect weaker rankings and CTR on "in excel" and "in word" queries. Track them separately (see section 6).
   - If an Excel export is ever added, those modifiers become winnable.
3. **Generator and template intent rank on the same pages.** "purchase order generator" and "sales invoice generator" return interactive tools (Vyapar, myBillBook, InvoiceOwl, Billdu, Asanify), and many of these are also "format" pages. An interactive template page can serve both intents. That is why the generator terms are secondaries on the category pages and do not get their own pages.
4. **Top Indian results add explainer content below the tool.** The pages ranking for compliance-heavy terms (GST, export, service) are a format/tool plus explanation: Rule 46 mandatory fields, HSN vs SAC, the IEC/LUT declaration wording. Each of those pages needs 600–1,200 words of practical field-by-field guidance under the editor.
5. **SERPs with quality gaps.** Spam mirrors appear in the results for "printable purchase order template PDF", "commercial invoice for customs", "simple invoice format" and "international purchase order template". "commercial invoice generator" returns mostly generic invoice generators. These are the most realistic early wins.

## 3. Page-by-page plan

Titles are 52–59 characters and metas 154–161 characters. Metas mention only real features: editable fields, logo upload, currency, live totals and taxes, PDF download, browser print, paper sizes, no sign-up, and nothing uploaded.

### 3.1 /sales-invoice-templates (category / hub)
- **Primary:** sales invoice format (India).
- **Secondary:**
  - sales invoice template; free / editable / printable sales invoice template; sales invoice generator
  - sales invoice format in excel / pdf
  - invoice generator, invoice format: these absorb the redirected `/tools/invoice-generator` and `/tools/sales-invoice-generator`.
- **Intent:** transactional. The user wants to choose a layout and fill it in.
- **Title:** Sales Invoice Format & Templates: Free, Editable, PDF
- **Meta:** Free sales invoice formats for GST, simple, service and wholesale bills. Edit every field, add your logo, see live totals and taxes, then print or save as PDF.
- **H1:** Sales Invoice Format & Templates
- **SERP notes:** Competition is high on both the India "format" results and the global "template" results.
  - Above the fold, the hub must show either a working default editor or one-click cards with previews of the four templates. Do not open with a long intro.
  - Keep a short "which invoice do I need?" chooser (GST vs simple vs service vs wholesale) that links down to each child page.
  - Keep GST-specific depth (Rule 46 fields) off the hub. Link to the GST child for it.
- **Redirects:** 301 both old generator URLs here, not to the GST child. Their generator intent matches the hub, and this keeps link equity on the head term.

### 3.2 /sales-invoice-templates/gst-tax-invoice
- **Primary:** GST invoice format.
- **Secondary:** tax invoice format, GST bill format, GST invoice format in excel / pdf, tax invoice format in word, GST invoice generator.
- **Intent:** transactional with a compliance check ("does this have every mandatory field?").
- **Title:** GST Invoice Format: Free Tax Invoice Template, Print or PDF
- **Meta:** Editable GST tax invoice format. Fill in GSTIN, items and rates, watch totals and taxes update live, add your logo, then download a PDF. No sign-up needed.
- **H1:** GST Tax Invoice Format
- **SERP notes:**
  - "tax invoice format" and "GST invoice format" are the same intent in India, and the same domains rank for both. Keep them on one page. Do not create a separate tax-invoice page.
  - The ranking pages list the Rule 46 mandatory fields, the CGST/SGST vs IGST split, and the copy labels ("Original for recipient", triplicate for goods). Mention these and link to the CBIC/GST portal.
  - **Before publishing,** confirm the template really has GSTIN, HSN/SAC and place-of-supply fields. The meta says "Fill in GSTIN", so change it if that field is missing.

### 3.3 /sales-invoice-templates/simple-sales-invoice
- **Primary:** simple invoice format.
- **Secondary:** bill format, simple bill format, invoice format without GST, bill format in excel, simple sales invoice template.
- **Intent:** transactional. These are small or unregistered sellers who want a plain bill.
- **Title:** Simple Invoice Format: Free Bill Template to Print or PDF
- **Meta:** A clean, simple invoice and bill format. Edit the fields, upload your logo, pick a currency, get live totals, then print on A4 or A5 or save a PDF. No sign-up.
- **H1:** Simple Invoice Format (Bill Format)
- **SERP notes:**
  - "bill format" is broad and mixed: shop bills, Excel lists such as WPS's "10 bill formats", and GST bills. This page is its best home because it is the generic "bill" page.
  - Cover the non-GST threshold briefly. Mention that a "Bill of Supply" is a separate legal document for composition and exempt supplies. Do not target "bill of supply" unless the template actually prints that heading.
  - The A5 paper option suits small shop bills and is worth stating.

### 3.4 /sales-invoice-templates/service-invoice
- **Primary:** service invoice format.
- **Secondary:** GST invoice format for services, service invoice template, consultancy invoice format.
- **Intent:** transactional. Freelancers, consultants, agencies and contractors.
- **Title:** Service Invoice Format: Free Editable Template with PDF
- **Meta:** Free service invoice format for consultants, agencies and contractors. Editable fields, logo upload, live totals and taxes, browser print or PDF download.
- **H1:** Service Invoice Format
- **SERP notes:**
  - Taxmann, SleekBill and Swipe rank by explaining that SAC codes replace HSN codes and that service invoices are issued in duplicate.
  - Use hours/rate or "description + amount" line items rather than a qty/HSN goods table, so the page is clearly different from the GST goods invoice.
  - This page is the natural home for export-of-services content. Mention the LUT wording for services, and link to the export invoice page only for goods.

### 3.5 /sales-invoice-templates/wholesale-invoice
- **Primary:** wholesale invoice format.
- **Secondary:** wholesale invoice template, wholesale bill format, B2B invoice format.
- **Intent:** transactional. Distributors and traders billing many line items to businesses.
- **Title:** Wholesale Invoice Format: Free B2B Bill Template (PDF)
- **Meta:** Wholesale invoice format for distributors and traders. Add many line items, see totals and taxes update live, add your logo and print on A4 or save a PDF.
- **H1:** Wholesale Invoice Format
- **SERP notes:**
  - Competition is medium. The ranking pages are global template sites (Vencru, Bookipi, Moon Invoice, SignNow), and no Indian brand dominates. That is an opening for an India-flavoured B2B page.
  - What the SERP rewards here: a PO reference field, payment terms, the buyer's tax ID, many lines, and a formal layout.
  - **Watch:** the "B2B invoice format" secondary could drift toward the GST page. Keep it framed around volume and multi-line trade billing.
  - Do **not** use "challan" wording, because that belongs to `/tools/delivery-challan-generator`.

### 3.6 /purchase-order-templates (category / hub)
- **Primary:** purchase order format (India).
- **Secondary:** purchase order template; free / editable / printable purchase order template; purchase order generator; purchase order format in excel / pdf.
- **Intent:** transactional.
- **Title:** Purchase Order Format & Templates: Free, Editable, PDF
- **Meta:** Free purchase order formats: standard, manufacturing and international. Edit fields, add your logo, get live totals and taxes, then print or download a PDF.
- **H1:** Purchase Order Format & Templates
- **SERP notes:**
  - Competition is high. myBillBook, Vyapar, TranZact and Fuzen offer Excel/Word/PDF plus generators.
  - The printable/PDF sub-SERP is weak because spam mirrors rank there.
  - Results also include "PO is not legally binding" and "PO vs invoice" explainers. Add a short FAQ, but do not build a separate page.

### 3.7 /purchase-order-templates/standard-purchase-order: merge candidate (see section 4)
- **Primary, if kept:** standard purchase order template.
- **Secondary:** purchase order format with GST, standard purchase order.
- **Title:** Standard Purchase Order Template: Free, Editable PDF
- **Meta:** Standard purchase order template you can fill in online. Editable fields, logo upload, live totals and taxes, A4/Letter print or PDF download. Nothing is uploaded.
- **H1:** Standard Purchase Order Template
- **Notes:** Real searches for a "standard" purchase order are either definitional (LogicERP and Hyperbots "types of PO" explainers) or the same as the head term. If the page is kept, position it as the India GST PO: buyer and supplier GSTIN, HSN, and the tax split. That gives it a reason to exist apart from the hub.

### 3.8 /purchase-order-templates/manufacturing-purchase-order
- **Primary:** purchase order for raw material.
- **Secondary:** raw material purchase order format, manufacturing purchase order template.
- **Intent:** transactional. A manufacturer buying inputs.
- **Title:** Raw Material Purchase Order Format for Manufacturers
- **Meta:** Purchase order format for raw materials and components. Editable item lines, live totals and taxes, logo upload, then print or save a PDF. Works in your browser.
- **H1:** Raw Material Purchase Order Format
- **SERP notes:**
  - Competition is low to medium. Results are thin: LogicERP, PlatoForms, Cleverence, Fuzen's manufacturing tab, Cognito Forms, and ERP help docs.
  - What ranks: material spec/grade, unit of measure, part number, delivery schedule, quality and certificate notes (MSDS/test certificate), and lot/batch.
  - This is the strongest early-win page in the PO set. It also fits the site's core audience of Indian manufacturers.

### 3.9 /purchase-order-templates/international-purchase-order
- **Primary:** international purchase order template.
- **Secondary:** import purchase order format.
- **Intent:** transactional. An Indian importer or a global buyer ordering from overseas suppliers.
- **Title:** International Purchase Order Template: Any Currency, PDF
- **Meta:** International purchase order template for overseas suppliers. Choose the currency, edit every field, get live totals, print on A4 or Letter, or download a PDF.
- **H1:** International Purchase Order Template
- **SERP notes:**
  - Competition is low to medium. The results are Lumiform, a Google Sheets blog, Microsoft and Infor ERP docs, and spam.
  - The SERP rewards these fields: currency, Incoterms, HS code, port of loading/discharge, and payment method (LC/TT).
  - Currency selection is the differentiator, so lead with it.

### 3.10 /commercial-invoice-templates (category / hub)
- **Primary:** commercial invoice template.
- **Secondary:** commercial invoice format, commercial invoice generator, printable commercial invoice pdf, free commercial invoice template.
- **Intent:** transactional, mostly global.
- **Title:** Commercial Invoice Template & Format: Free, Printable PDF
- **Meta:** Free commercial invoice template for shipping goods. Edit fields, add your logo, choose currency, see live totals, then print on A4 or Letter or download a PDF.
- **H1:** Commercial Invoice Template
- **SERP notes:**
  - "commercial invoice template" is high competition (PandaDoc, Jotform, Bill.com, Invoice2go, Xappex).
  - "commercial invoice generator" is medium. Its SERP is mostly generic invoice generators plus Shiprocket, so a real commercial-invoice editor can stand out.
  - Ranking pages explain the commercial invoice vs sales invoice difference and the customs fields (HS code, origin, Incoterms, weights).

### 3.11 /commercial-invoice-templates/export-commercial-invoice
- **Primary:** export invoice format (India).
- **Secondary:** export commercial invoice template, GST export invoice format, export invoice format in excel, commercial invoice for export India.
- **Intent:** transactional with compliance. An Indian exporter preparing a shipment.
- **Title:** Export Invoice Format (India): Commercial Invoice in PDF
- **Meta:** Export commercial invoice format for Indian exporters. Edit fields, pick a foreign currency, see live totals, add your logo and download a PDF. No sign-up.
- **H1:** Export Invoice Format for Indian Exporters
- **SERP notes:**
  - Competition is high. ClearTax, Razorpay, Skydo, Swipe, myBillBook, SleekBill and PayGlocal rank, and Petpooja offers an Excel pack with an export sheet.
  - The SERP expects these India-specific fields and explanations: IEC, LUT/Bond ARN, the declaration "Supply meant for export under Bond/LUT without payment of IGST", port code, shipping bill number, Incoterms, and value in INR plus the foreign currency.
  - Cite CBIC/DGFT sources for the field list.

### 3.12 /commercial-invoice-templates/international-commercial-invoice: merge candidate (see section 4)
- **Primary, if kept:** international commercial invoice.
- **Secondary:** commercial invoice for customs, commercial invoice for international shipping.
- **Title:** International Commercial Invoice Template for Customs
- **Meta:** International commercial invoice for customs and courier shipments. Editable fields, currency selection, live totals, A4 or Letter print and PDF download.
- **H1:** International Commercial Invoice for Customs
- **SERP notes:**
  - Competition is medium. Results include SignNow, Taskade, PlatoForms and TNT how-to pages, and the customs query has many spam mirrors.
  - To justify a separate page, make it the non-India, courier/customs-focused version: Letter paper, FedEx/DHL/UPS-style fields, and a declaration and signature block.

## 4. Cannibalisation risks and fixes

| Risk | Pages | Severity | Recommendation |
|---|---|---|---|
| Same intent | `/commercial-invoice-templates` vs `/international-commercial-invoice` | **High** | A commercial invoice is international by definition, and the global "commercial invoice template" SERP already has cross-border/customs intent. **Recommend merging** international-commercial-invoice into the category, so the hub's default editor is the international CI. If a separate URL is kept for navigation, canonicalise it to the hub, or make it clearly courier-specific as in 3.12. Do not give it "commercial invoice template" wording. |
| Same intent | `/purchase-order-templates` vs `/standard-purchase-order` | **High** | A "standard" PO is the default PO, so both pages would chase "purchase order format/template". **Recommend merging** standard-purchase-order into the hub, with the hub's default editor being the standard PO. If it is kept, reposition it as "purchase order format with GST" (3.7) and never use plain "purchase order format/template" in its title or H1. |
| Partial overlap | `/sales-invoice-templates` vs `/gst-tax-invoice` | Medium | In India, "sales invoice format" results are GST-heavy. The hub owns "sales invoice format/template/generator"; the GST child owns "GST / tax invoice / GST bill". Keep Rule 46 depth off the hub. Anchor text from the hub should read "GST tax invoice format". |
| Partial overlap | `/export-commercial-invoice` vs `/commercial-invoice-templates` | Medium | Split by market: the export page uses "export invoice format" and India terms (GST, IEC, LUT); the hub uses "commercial invoice template" and global wording. |
| Partial overlap | `/wholesale-invoice` vs `/gst-tax-invoice` | Low–Medium | Do not use "GST invoice" in the wholesale title or H1. Frame it around multi-line B2B trade billing. |
| Partial overlap | `/service-invoice` vs `/gst-tax-invoice` | Low | Use SAC and service-led wording only. |
| Existing page | `/tools/quotation-generator` | Medium | The template pages must not target quotation, estimate or **proforma invoice**. The proforma intent sits between quotation and commercial invoice. Assign it to the quotation tool, or leave it unassigned until a proforma template exists. |
| Existing page | `/tools/delivery-challan-generator` | Low | No "challan" terms on wholesale or PO pages. Cross-link only. |
| Existing page | `/tools/gst-calculator` | Low | The GST invoice page should not target "GST calculation" queries. Link to the calculator for rate math. |
| Existing page | `/eway-bill-vs-sales-invoice` | Low | Template pages should not target "difference between e-way bill and invoice" or "is an invoice an e-way bill". Use a one-line link from the GST and wholesale pages. |
| Redirects | old `/tools/invoice-generator`, `/tools/sales-invoice-generator` | — | 301 both to `/sales-invoice-templates`. Update internal links and the sitemap, and remove the old titles from `src/app/page.tsx` tool cards so two pages are not competing during the transition. |

Each page has exactly one primary keyword in the CSV. No keyword is assigned to two pages.

## 5. On-page checklist (all 12)
- The editor sits above the fold. A short intro and FAQ go below it.
- Use one H1 that matches the primary keyword wording. The H2s carry the alternate word ("format" vs "template") and the "in Excel/PDF" questions, answered honestly: PDF and print yes, Excel no.
- Explain the fields on compliance pages (GST, service, export) and cite official sources (CBIC, GST portal, DGFT).
- Add breadcrumb schema (hub to child). Optionally add `WebApplication` / `SoftwareApplication` schema for the editor. Do not add review or rating schema without real reviews.
- Cross-link sibling templates, and link once to the relevant existing tool or guide.

## 6. Measure later (Keyword Planner / Search Console)
1. Monthly volumes for India vs US/UK/global for every CSV keyword, especially:
   - "sales invoice format" vs "sales invoice template"
   - "GST invoice format" vs "tax invoice format" vs "GST bill format"
   - "purchase order format" vs "purchase order template"
   - "export invoice format" vs "commercial invoice format"
2. Whether "bill format" and "invoice format" are worth targeting at all, given how broad and mixed their intent is.
3. Search Console query-to-page mapping 4–8 weeks after launch:
   - Is the hub or a child ranking for each primary?
   - Are both PO pages, or both CI pages, getting impressions for the same queries? If so, merge (section 4).
4. CTR and position on "...in excel" / "...in word" queries compared with plain queries. This decides whether an Excel export is worth building.
5. Impressions for "proforma invoice", "quotation format", "delivery challan format" landing on template pages. These are cannibalisation signals against the existing tools.
6. Whether the redirected generator URLs keep their old queries after the 301s ("invoice generator", "sales invoice generator").
7. Long-tail candidates to validate before any new page is considered:
   - "bill of supply format", "proforma invoice format", "export invoice for services"
   - "purchase order format for construction"
   - "commercial invoice for DHL/FedEx"
8. A real google.co.in SERP check for every primary, because this research used a US-based search tool.
