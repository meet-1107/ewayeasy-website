---
title: "How to Generate Bulk E-Way Bills"
slug: "how-to-generate-bulk-eway-bills"
excerpt: "How bulk e-way bill generation works on the official portal: the JSON-based bulk tool, API integration for large taxpayers, data preparation and common upload errors."
category: "eway-bill"
tags: ["e-way bill", "bulk generation", "JSON", "API"]
publishedAt: "2026-09-01"
updatedAt: "2026-10-09"
verifiedAt: "2026-10-10"
seoTitle: "How to Generate Bulk E-Way Bills: JSON Tool and API"
metaDescription: "Generate e-way bills in bulk on the official portal using the bulk generation tool and JSON upload, or via API. Data prep tips and common errors."
imageAlt: "Spreadsheet of many invoices converting into a JSON file and uploading to a portal that returns multiple e-way bill numbers"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
faq:
  - q: "Does the E-Way Easy app generate bulk e-way bills?"
    a: "No. E-Way Easy is built around a one-invoice-at-a-time flow on Android. Bulk generation is a facility of the official e-way bill portal (JSON upload) and of authorised API integrations."
  - q: "Is the bulk generation tool free?"
    a: "The bulk generation tool is provided on the official e-way bill portal for taxpayers to download. Check the portal for the current version."
  - q: "What happens if some rows in the bulk file have errors?"
    a: "The portal processes the file and reports errors for the records that fail validation. Correct those records and upload them again."
related: ["prepare-invoice-data-for-bulk-processing", "how-to-generate-eway-bill-step-by-step", "eway-bills-for-wholesalers-and-distributors"]
---
If you dispatch ten trucks a day, generating e-way bills one by one is manageable. If you dispatch a hundred consignments a day — a distributor, an FMCG wholesaler, a large manufacturer — typing each one into a web form is slow and error-prone. That is why the official e-way bill system offers bulk routes.

This guide explains those routes, how to prepare data for them, and where they fit compared to single-bill tools.

> Note: Bulk generation is a capability of the **official e-way bill portal** and of **authorised API integrations**. The E-Way Easy app does not offer bulk e-way bill generation; it is designed for creating invoices and e-way bills one at a time from your phone.

## The three ways e-way bills get generated at volume

| Route | Who it suits | How it works |
|---|---|---|
| Bulk upload (JSON) on the portal | Businesses with tens to hundreds of bills a day, without system integration | Prepare data in the official bulk tool, convert to JSON, upload on the portal |
| API integration | Large taxpayers with ERP systems | ERP or GSP software calls the e-way bill API directly |
| Via e-invoice (IRN) | E-invoice-applicable taxpayers | E-way bill generated using IRN, with Part A auto-populated from e-invoice data |

## Route 1: Bulk generation on the official portal

### How it works

1. **Download the bulk generation tool** from the official e-way bill portal. This is an Excel-based utility provided by the portal.
2. **Enter or paste your data** — one row (or set of rows) per e-way bill, with the same details you'd fill in the single form: transaction type and sub-type, document type, number and date, supplier and recipient GSTINs, addresses and PINs, item details with HSN, values and tax, transporter ID, vehicle number, distance.
3. **Validate and convert to JSON** using the tool. The tool checks the format and creates a JSON file.
4. **Log in to the portal**, open the bulk generation option, and **upload the JSON file**.
5. **Review the results.** The portal generates e-way bills for valid records and shows errors for any that fail validation.
6. **Download or print** the generated e-way bills and share EBNs with transporters.

The same bulk approach is offered for some other portal functions (such as updating Part B or generating consolidated e-way bills). Check the [user documentation](https://docs.ewaybillgst.gov.in/) for which bulk operations are currently available and for the current version of the tool.

### Example (illustrative): a morning dispatch batch

A Nagpur FMCG distributor has 48 invoices to dispatch by 10 am across 6 routes.

- **Single entry:** if each bill takes around 4 minutes to key in and check, that's about 3 hours 12 minutes of data entry.
- **Bulk route:** export the 48 invoices from the billing software into the bulk tool format, validate and convert (say 20 minutes including fixing format issues), upload, and review results (10 minutes). About **30 minutes**.

Suppose 3 records fail — two because the buyer's GSTIN was mistyped in the billing software, one because the vehicle number format was wrong. Those 3 are corrected and uploaded again. The other 45 are generated on the first upload.

(Timings are illustrative and depend on your data quality and connection.)

## Route 2: API integration

Larger businesses connect their ERP or billing system to the e-way bill system through **API access**, usually via a GST Suvidha Provider (GSP) or other authorised integration. The ERP sends e-way bill data when the invoice is finalised and receives the EBN back automatically.

This removes manual uploads entirely but requires:

- API access registration on the e-way bill portal,
- a compatible ERP or GSP solution,
- IT effort to map fields and handle errors.

It suits high-volume businesses with established systems. Smaller businesses usually find the portal's bulk tool more practical.

## Route 3: Through e-invoicing

If your business is required to issue e-invoices, you can generate the e-way bill using the **IRN** of the e-invoice. Part A details come from the e-invoice, so you mostly add transport details. When e-invoices are generated in bulk through your ERP, e-way bills can often follow in the same process. Remember that, as reported in a GSTN advisory, taxpayers with AATO of ₹10 crore and above must report e-invoices to the IRP within 30 days of the invoice date from 1 April 2025.

## Preparing data for bulk generation

Bulk upload is only as good as the data going in. Before your first upload:

- **Standardise GSTINs** in your customer master and verify them. One wrong character fails the record.
- **Fix HSN codes** at item master level, at the digit length required for your turnover.
- **Use actual PIN codes** for dispatch and delivery locations, not billing addresses.
- **Keep date formats consistent** with what the tool expects.
- **Check vehicle number formats** — no spaces or special characters unless the tool accepts them.
- **Watch base document age** — from 1 January 2025, the portal won't generate against documents older than 180 days (as reported in a GSTN advisory).

Our guide on [preparing invoice data for bulk processing](/blog/prepare-invoice-data-for-bulk-processing) goes into these in detail.

## Common bulk upload errors

| Error type | Typical cause | Fix |
|---|---|---|
| Invalid GSTIN | Typo, cancelled registration | Verify on GST portal; correct master |
| Duplicate document | Same invoice number already has an e-way bill | Check for earlier generation; don't re-upload |
| Distance out of range | Distance above allowed limit for the PIN pair | Use realistic distance within 10% of PIN-to-PIN |
| Invalid HSN | Wrong code or wrong length | Check against HSN master |
| Document date issue | Future date or document too old | Correct date; check the 180-day rule |
| JSON format error | Tool version outdated or edited manually | Download latest tool; regenerate JSON |

## Common mistakes

- **Editing the JSON file by hand.** Use the tool to regenerate instead.
- **Re-uploading the whole file after partial errors**, creating duplicates for already-generated records.
- **Using an old version of the bulk tool** after the portal has updated its format.
- **Not reconciling** — always match the list of EBNs generated back to your invoice list.
- **Skipping Part B in bulk** and forgetting to update vehicles before dispatch.

## When bulk is not the answer

Bulk tools make sense for volume. If you raise a handful of invoices a day — a small manufacturer, a trader, a workshop — the overhead of preparing upload files may not be worth it. A phone-based single-invoice flow can be quicker in that case. E-Way Easy is one option for that use: invoice and e-way bill details are prepared together, buyer details fill from GSTIN and distance from PIN codes. It does not do bulk generation; for bulk, use the official portal or an authorised API integration.

## Official sources

The bulk generation tool, its current version and instructions are available on the [E-Way Bill System](https://ewaybillgst.gov.in/) and in the [user documentation](https://docs.ewaybillgst.gov.in/). The [E-Way Bill 2.0 portal](https://ewaybill2.gst.gov.in/) provides synchronised access. For API access, refer to the developer and API sections linked from the official portal.
