---
title: "How to Prepare Invoice Data for Bulk Processing"
slug: "prepare-invoice-data-for-bulk-processing"
excerpt: "Set up a clean invoice spreadsheet, run simple validation checks and remove duplicates before you upload data for bulk e-way bills or returns."
category: "business-guides"
tags: ["bulk processing", "spreadsheet", "data validation", "e-way bill"]
publishedAt: "2026-10-16"
updatedAt: "2026-11-16"
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
    a: "Not as it is. The portal's bulk facility accepts a JSON file prepared with the official Bulk Generation Tools. Your spreadsheet is the source you copy or map into that tool."
  - q: "Why does one bad row matter if the rest are fine?"
    a: "Rows with errors are rejected and must be fixed and uploaded again. Catching them before upload saves a second round and avoids delays at dispatch."
  - q: "Why do my dates or HSN codes change when I open the file again?"
    a: "Spreadsheets reformat cells they think are numbers or dates. Format code columns as text and use one date format, then check a few rows after every save."
related: ["avoid-errors-in-invoice-and-transport-details", "hsn-codes-practical-guide"]
---
> **Quick answer:** Keep one row per invoice or challan in a master sheet, with items in a linked sheet. Validate GSTINs, PINs and HSN codes, and remove duplicates before anything is uploaded. Then enter the clean data into the official Bulk Generation Tools to create the JSON file, because the portal does not accept your own Excel sheet as it is.

Bulk processing means uploading many invoices at once instead of entering them one by one. It saves real time when dispatch volumes are high, but it multiplies whatever is in your data.

One wrong PIN typed by hand is one problem. The same PIN pasted into forty rows is forty problems. This guide covers the step before upload: getting invoice data into a structured, checked, duplicate-free sheet.

## How bulk e-way bill generation works, in brief

Bulk e-way bill generation is the official portal's facility for creating many e-way bills from one uploaded file. You prepare consignment data in the official Excel-based Bulk Generation Tools, convert it to a JSON file, and upload that file. The portal generates bills for valid rows and reports errors for the rest.

1. Download the current **Bulk Generation Tools** from the portal.
2. Fill or paste your consignment data in the tool's prescribed format.
3. Let the tool convert the data into a **JSON file**.
4. Upload the JSON file on the portal and note which rows passed.

Large taxpayers may use API access through a GSP or ERP integration instead. The exact columns, codes and limits are set by the official tool and documentation, so always use the current version. Our guide on [how to generate bulk e-way bills](/bulk-eway-bill-generation) covers the portal side.

## Step 1: Use one row per document, one sheet per purpose

A clean bulk file starts with a master sheet where each row is one invoice or delivery challan. Item details go in a second sheet, linked by document number. Mixing header data and item data in one row is the most common cause of copy errors and totals that do not match.

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
| Distance (km) | 690 | Up to 10% above the portal's PIN-to-PIN distance |
| Vehicle number | GJ03AB1234 | No spaces or hyphens, in one style |
| Transporter ID | (if any) | For Part B by transporter |

### Suggested item columns

Document number (link), product name, HSN code, quantity, unit, taxable value, tax rate.

## Step 2: Run validation checks before upload

Validation means testing every row against simple format and logic rules before the portal does it for you. Format checks catch typing errors in GSTINs, PINs, HSN codes and dates. Logic checks catch rows where the tax heads, totals or threshold do not make sense, and most need only a formula or a filter.

### Format checks

- **GSTIN length is 15 characters.** `=LEN(A2)=15`
- **GSTIN is in capitals.** `=EXACT(A2,UPPER(A2))` catches lowercase letters pasted from emails.
- **GSTIN state code matches the state column.** The first two digits are the state code.
- **PIN code is 6 digits** and plausible for the state.
- **HSN code has the right number of digits** for your turnover, and contains only numbers.
- **Dates are real dates, not text.** Sort by date; text dates sort oddly.
- **Vehicle numbers follow one format**, with spaces and hyphens removed consistently.

### Logic checks

- **Tax heads:** if dispatch and delivery states match, IGST should be 0; if they differ, CGST and SGST should be 0. See [CGST, SGST and IGST explained](/blog/cgst-sgst-igst-explained).
- **Totals add up:** taxable value + tax = total value, within rounding.
- **Item totals equal header totals** for each document.
- **Threshold:** flag rows at or below the threshold so you do not generate unnecessary e-way bills, unless the case needs one at any value (such as inter-state job work).
- **Document age:** as reported by GSTN, from 1 January 2025 e-way bills cannot be generated for documents dated more than 180 days before generation. Flag old dates.
- **Distance:** must not exceed the 4,000 km maximum, and should be close to the PIN-to-PIN route.

## Step 3: Watch the spreadsheet traps

Spreadsheets silently change data they think they understand. They drop leading zeros, flip dates between day-month and month-day, and turn long numbers into scientific notation. None of this shows as an error, so you only find out when the portal rejects a row or, worse, accepts a wrong value.

| Trap | What happens | Fix |
|---|---|---|
| Leading zeros | HSN `0402` becomes `402`; document `0007` becomes `7` | Format code columns as text before pasting |
| Date locale | `04-09-2026` read as 9 April on a different system setting | Use one format and check a few dates after opening |
| CSV re-save | Re-saving as CSV strips text formatting | Keep the master in .xlsx; export a copy only for the tool |
| Hidden spaces | `24ABCDE1234F1Z5 ` fails a match | Use `=TRIM()` on pasted columns |
| Live formulas | Values change after checks pass | Paste as values in the upload copy |

HSN codes from chapters 01 to 09 are the usual victims of the leading-zero trap. Our [HSN codes practical guide](/blog/hsn-codes-practical-guide) explains why the digits matter.

## Step 4: Remove duplicates

Duplicates are the costliest bulk error, because a duplicated row can create a second e-way bill for the same goods. That second bill then has to be cancelled within 24 hours. Search for exact duplicates, near duplicates and rows that were already processed in an earlier upload.

1. **Exact duplicates:** run remove-duplicates on document number + supplier GSTIN, but review before deleting.
2. **Near duplicates:** sort by recipient GSTIN, then value and date. Same buyer, value and date with different document numbers deserves a second look.
3. **Already processed:** keep an "E-way bill number" column and filter out rows that already have one before each upload.

## Step 5: Freeze, convert, upload, reconcile

The last step turns checked data into e-way bills and brings the results back to your sheet. Freeze a dated copy once checks pass, copy it into the official tool, generate the JSON and upload it. Then paste each generated e-way bill number against its source row.

1. **Freeze the data.** Save a dated copy and do not edit the source after this point.
2. **Copy into the official tool** and generate the JSON.
3. **Upload** on the portal.
4. **Reconcile results:** match each e-way bill number to its document. Fix rejected rows at the source and re-run the checks before uploading them again.

## Example (illustrative)

Here is how pre-upload checks change a day's bulk file. A Morbi ceramic tiles trader prepares 62 invoices for one day's dispatches. Before uploading, the team runs the format, logic and duplicate checks above, and finds problems in a handful of rows plus several invoices that never needed an e-way bill.

| Check | Rows flagged | Cause |
|---|---|---|
| GSTIN length | 2 | One extra character typed |
| State code vs state | 1 | Buyer's other-state branch GSTIN used |
| Tax heads | 3 | IGST applied to intra-state invoices |
| Totals | 1 | Freight added to total but not to taxable value |
| Duplicates | 2 | Same invoice pasted twice |
| Below threshold | 9 | Small invoices; no e-way bill needed |

After fixing 7 rows, removing 2 duplicates and excluding 9 small invoices, 51 rows go into the bulk tool. The e-way bill numbers are pasted back against each invoice.

## Common mistakes

Most bulk upload failures trace back to inconsistent data, not to the portal. Rows mix formats, formulas stay live, or text pasted from an email carries hidden spaces. The list below covers the habits that cause rejections and make later cancellations and audits harder.

- **Mixing formats**, such as text dates in some rows and real dates in others.
- **Pasting from emails or PDFs** without cleaning stray spaces and line breaks.
- **Using the billing PIN** instead of the delivery PIN.
- **Not keeping the generated e-way bill numbers** next to the source rows.
- **Using an old version of the bulk tool.** Formats change; download the current one.

## Where E-Way Easy fits

The E-Way Easy Android app creates invoices and e-way bills one consignment at a time on a phone, with saved buyers and products, HSN from the product and PIN-based distance. It does not offer bulk generation. For high-volume uploads, use the official portal's bulk facility or an authorised API integration.

## Quick action checklist

1. Split your current sheet into a header sheet and an item sheet.
2. Format GSTIN, HSN, PIN and document number columns as text.
3. Add the format and logic check formulas as helper columns.
4. Run the duplicate checks and add an "E-way bill number" column.
5. Download the current Bulk Generation Tools before your next upload.

Want a second pair of eyes before you upload? Paste your sheet into the free [bulk e-way bill data checker](/tools/bulk-eway-bill-data-checker) to flag GSTIN, date, duplicate and tax-split issues in your browser.

## Official sources

Download the current bulk tool and read the format notes on the [E-Way Bill System](https://ewaybillgst.gov.in/) and its [user documentation](https://docs.ewaybillgst.gov.in/). For GSTIN checks and return-related formats, see the [GST portal](https://www.gst.gov.in/).
