---
title: "How to Prepare Invoice Data for Bulk Processing"
slug: "prepare-invoice-data-for-bulk-processing"
excerpt: "Set up a clean invoice spreadsheet, run simple validation checks and remove duplicates before you upload data for bulk e-way bills or returns."
category: "business-guides"
tags: ["bulk processing", "spreadsheet", "data validation", "e-way bill"]
publishedAt: "2026-07-29"
updatedAt: "2026-09-18"
seoTitle: "Prepare Invoice Data for Bulk Processing: Checklist"
metaDescription: "How to structure invoice data in a spreadsheet, validate GSTINs, PINs and HSN codes, remove duplicates and prepare files for bulk e-way bill upload."
imageAlt: "Spreadsheet of invoice rows with highlighted validation errors next to a JSON file icon"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Can I upload my own Excel sheet directly to the e-way bill portal?"
    a: "Not as-is. The portal's bulk facility accepts a JSON file prepared using the official Bulk Generation Tools. Your spreadsheet is the source you copy or map into that tool."
  - q: "Why does one bad row matter if the rest are fine?"
    a: "Rows with errors are rejected and need to be fixed and re-uploaded. Catching them before upload saves a second round and avoids delays at dispatch."
related: ["how-to-generate-bulk-eway-bills", "common-eway-bill-errors-and-solutions", "avoid-errors-in-invoice-and-transport-details"]
---
Bulk processing — uploading many invoices at once instead of entering them one by one — saves real time for businesses with high dispatch volumes. But bulk processing has a catch: it multiplies whatever is in your data. One wrong PIN code typed by hand is one problem. The same wrong PIN pasted into forty rows is forty problems.

This guide is about the step before the upload: getting invoice data into a structured, checked, duplicate-free sheet. It applies whether you are preparing a file for bulk e-way bill generation on the official portal, sharing data with your accountant for GST returns, or importing into accounting software.

## How bulk e-way bill generation works, in brief

The official e-way bill portal offers a bulk generation facility. In general terms:

1. You download the official **Bulk Generation Tools** (an Excel-based utility) from the portal.
2. You fill or paste your consignment data into the tool in its prescribed format.
3. The tool converts the data into a **JSON file**.
4. You upload the JSON file on the portal, which generates e-way bills for valid rows and reports errors for the rest.

Large taxpayers may instead use API access through a GSP or ERP integration. The exact columns, codes and limits are defined by the official tool and documentation, so always use the current version from the portal. Our guide on [how to generate bulk e-way bills](/blog/how-to-generate-bulk-eway-bills) walks through the portal side.

Everything below is about making the data you feed into that tool correct.

## Step 1: Use one row per document, one sheet per purpose

Keep a master sheet where **each row is one invoice or delivery challan**. If an invoice has several items, keep item details in a second sheet linked by the document number. Mixing header and item data in one row leads to copy errors.

### Suggested header columns

| Column | Example | Notes |
|---|---|---|
| Document type | Tax Invoice | Invoice, bill of supply, delivery challan |
| Document number | RPM/26-27/0412 | Unique within your series and financial year |
| Document date | 14-09-2026 | One consistent date format |
| Supply type | Outward | Outward / inward |
| Reason / sub-type | Supply | Supply, job work, sales return, etc. |
| Supplier GSTIN | 24ABCDE1234F1Z5 | Usually your own |
| Dispatch PIN | 360002 | Where goods physically leave from |
| Recipient GSTIN | 27ABCDE1234F1Z5 or URP | URP for unregistered |
| Recipient name | Sample Traders | As per registration |
| Delivery PIN | 411001 | Actual ship-to PIN |
| Delivery state | Maharashtra | Must match PIN |
| Taxable value | 1,20,000 | Numbers only |
| CGST / SGST / IGST | 0 / 0 / 21,600 | Intra-state or inter-state, not both |
| Total value | 1,41,600 | Taxable + tax (+ other charges, if any) |
| Transport mode | Road | Road, rail, air, ship |
| Distance (km) | 690 | Blank if you want portal calculation, if allowed |
| Vehicle number | GJ03AB1234 | No spaces or hyphens, in one style |
| Transporter ID | (if any) | For Part B by transporter |

### Suggested item columns

Document number (link), product name, HSN code, quantity, unit, taxable value, tax rate.

## Step 2: Run validation checks before upload

You can do most of these with simple spreadsheet formulas or filters.

### Format checks

- **GSTIN length is 15 characters.** `=LEN(A2)=15`
- **GSTIN state code matches the state column.** The first two digits are the state code.
- **PIN code is 6 digits** and the first digit is plausible for the state.
- **HSN code has the right number of digits** for your turnover requirement, and contains only numbers.
- **Dates are real dates, not text.** Sort by date; text dates will sort oddly.
- **Vehicle numbers follow one format** (e.g. remove spaces and hyphens consistently).

### Logic checks

- **Tax heads:** if dispatch and delivery states are the same, IGST should be 0; if they differ, CGST and SGST should be 0. See [CGST, SGST and IGST explained](/blog/cgst-sgst-igst-explained).
- **Totals add up:** taxable value + tax = total value, within rounding.
- **Item totals equal header totals** for each document.
- **Threshold:** flag rows where total value is at or below the threshold, so you do not generate unnecessary e-way bills (unless your case needs one at any value, such as interstate job work).
- **Document age:** as reported by GSTN, from 1 January 2025 e-way bills cannot be generated for documents dated more than 180 days before generation. Flag old dates.
- **Distance sanity:** distance should not exceed the 4,000 km maximum, and should be roughly in line with the PIN-to-PIN route.

> Note: Use the [HSN code lookup](/tools/hsn-code-lookup) and [GST calculator](/tools/gst-calculator) to spot-check a sample of rows. For GSTINs, verify new buyers on the GST portal once and then reuse saved details.

## Step 3: Remove duplicates

Duplicates are the most expensive bulk error, because a duplicated row can create a second e-way bill for the same goods, which then has to be cancelled within 24 hours.

How to find them:

1. **Exact duplicates:** use your spreadsheet's remove-duplicates feature on the document number + supplier GSTIN columns, but review before deleting.
2. **Near duplicates:** sort by recipient GSTIN, then by value and date. Two rows with the same buyer, same value and same date but different document numbers deserve a second look.
3. **Already processed:** keep a column for "E-way bill number". Before each upload, filter out rows that already have one.

## Step 4: Freeze, convert, upload, reconcile

1. **Freeze the data.** Once checks pass, save a dated copy. Don't edit the source after this point.
2. **Copy into the official tool** and generate the JSON.
3. **Upload** on the portal.
4. **Reconcile results:** bring the generated e-way bill numbers back into your sheet against each document. Fix rejected rows at the source and re-run checks before uploading them again.

## Example (illustrative)

A Morbi ceramic tiles trader prepares 62 invoices for a day's dispatches. Before upload, the checks find:

| Check | Rows flagged | Cause |
|---|---|---|
| GSTIN length | 2 | One extra character typed |
| State code vs state | 1 | Buyer moved from GSTIN of one state to another branch |
| Tax heads | 3 | IGST applied to intra-state invoices |
| Totals | 1 | Freight added to total but not to taxable value |
| Duplicates | 2 | Same invoice pasted twice |
| Below threshold | 9 | Small invoices; no e-way bill needed |

After fixing 7 rows, removing 2 duplicates and excluding 9 small invoices, 51 rows go into the bulk tool. All generate on the first upload, and the e-way bill numbers are pasted back against each invoice.

## Common mistakes

- **Mixing formats** (dates as text in some rows, real dates in others).
- **Leaving formulas live** in the upload sheet, so values change after checks.
- **Pasting from emails or PDFs** without cleaning stray spaces and line breaks.
- **Using the billing PIN** instead of the delivery PIN.
- **Not keeping the generated e-way bill numbers** next to the source rows, making cancellations and audits harder.
- **Using an old version of the bulk tool.** Formats change; download the current one.

## Where E-Way Easy fits

The E-Way Easy Android app is designed for creating invoices and e-way bill workflows one consignment at a time on a phone, with saved buyers and products, HSN from the product and PIN-based distance. It does not offer bulk generation. For high-volume bulk uploads, use the official portal's bulk facility or an authorised API integration. Clean masters, wherever you keep them, are what make either approach work.

## Official sources

Download the current bulk tool and read the format notes on the [E-Way Bill System](https://ewaybillgst.gov.in/) and its [user documentation](https://docs.ewaybillgst.gov.in/). For GSTIN checks and return-related formats, see the [GST portal](https://www.gst.gov.in/).
