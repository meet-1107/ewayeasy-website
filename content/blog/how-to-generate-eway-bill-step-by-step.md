---
title: "How to Generate an E-Way Bill Step by Step"
slug: "how-to-generate-eway-bill-step-by-step"
excerpt: "A practical walkthrough of generating an e-way bill on the official portal: what to keep ready, each field in Part A and Part B, and how to check the result."
category: "eway-bill"
tags: ["e-way bill", "how-to", "EWB-01", "portal"]
publishedAt: "2026-04-20"
updatedAt: "2026-09-25"
verifiedAt: "2026-10-10"
seoTitle: "How to Generate an E-Way Bill: Step-by-Step Guide (2026)"
metaDescription: "Step-by-step guide to generating an e-way bill on the official portal: details to keep ready, Part A and Part B fields, checks and common mistakes."
imageAlt: "Numbered steps showing login, entering invoice details, adding vehicle number and receiving a 12-digit e-way bill number"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
related: ["documents-required-for-eway-bill-generation", "eway-bill-part-a-and-part-b-explained", "common-eway-bill-errors-and-solutions"]
---
Generating an e-way bill is not difficult, but it is unforgiving. Part A cannot be edited after generation, so a wrong GSTIN or invoice number means cancelling and starting again. The way to get it right the first time is to prepare the details before you log in and then move through the form in order.

This guide follows the standard single e-way bill flow on the official e-way bill system. Screen labels can change slightly between portal updates, so use this as a map and the official user documentation as the final reference.

## Before you start: what to keep ready

Have these in front of you before opening the portal:

- **Login credentials** for the e-way bill portal (your GSTIN-linked username). Multi-factor authentication now applies to all taxpayers, so keep the registered mobile handy.
- **The base document**: tax invoice, bill of supply or delivery challan, with its number and date.
- **Recipient details**: GSTIN (or "URP" if unregistered), name, address, place of delivery and PIN code.
- **Item details**: product name, HSN code, quantity, unit, taxable value and tax rate.
- **Transport details**: transporter name and ID (GSTIN or TRANSIN) if a transporter is moving the goods, and the vehicle number if known.
- **Approximate distance** between the dispatch and delivery PIN codes.

> Note: As reported in GSTN advisories, from 1 January 2025 the portal does not allow generation for a base document dated more than 180 days before the generation date. Old challans or invoices may need attention.

## Step-by-step on the official portal

### Step 1: Log in and open the generation form

Log in at the [E-Way Bill System](https://ewaybillgst.gov.in/) (or the [E-Way Bill 2.0 portal](https://ewaybill2.gst.gov.in/), which shares synchronised data). From the main menu, open the option to generate a new e-way bill.

### Step 2: Choose the transaction type and sub-type

- **Transaction type:** Outward if you are sending goods, Inward if you are receiving them and generating as the recipient.
- **Sub-type:** the reason for movement, such as supply, export, import, job work, SKD/CKD, line sales, recipient not known, exhibition, own use, sales return and others.

The sub-type controls which document types the portal accepts next, so choose it carefully. A branch stock transfer, for instance, is not a "supply" in the ordinary sense and usually moves on a delivery challan.

### Step 3: Enter document type, number and date

Select the document type (tax invoice, bill of supply, delivery challan, bill of entry or others, depending on the sub-type) and enter the number and date exactly as printed on the document. A missing prefix or wrong year in the invoice number is one of the most common causes of mismatch later.

### Step 4: Fill "Bill From" and "Bill To"

Your own details usually auto-fill from your GSTIN. For the recipient, enter the GSTIN; the portal fetches the registered name. Then enter:

- **Dispatch From** address and PIN (where goods actually leave, which may differ from your principal place of business), and
- **Ship To** address and PIN (where goods are actually delivered).

The "Bill To" and "Ship To" can be different, for example in a bill-to/ship-to arrangement. Make sure the PIN codes are those of the actual dispatch and delivery locations, because they drive distance and validity.

### Step 5: Enter item details

For each line: product name, description, HSN code, quantity, unit, taxable value and the applicable tax rates (CGST and SGST for intra-state, IGST for inter-state). The portal totals these to arrive at the value of the consignment.

### Example (illustrative)

A Surat textile trader sends goods to a buyer in Indore (inter-state, so IGST applies).

| Line | HSN | Qty | Taxable value | IGST rate | IGST |
|---|---|---|---|---|---|
| Cotton fabric | 5208 | 600 m | ₹54,000 | 5% | ₹2,700 |
| Packing charges | — | — | ₹1,000 | 5% | ₹50 |
| **Total** | | | **₹55,000** | | **₹2,750** |

Consignment value = ₹55,000 + ₹2,750 = **₹57,750**, above ₹50,000, so an e-way bill is needed. (Rates and HSN are illustrative; confirm the correct rate for your goods.)

### Step 6: Enter transporter details and distance (Part B)

- Choose the **mode** (road, rail, air or ship).
- Enter the **approximate distance**. The portal calculates PIN-to-PIN distance and allows you to enter up to 10% more than that figure if the actual route is longer.
- If a transporter will handle Part B, enter their **Transporter ID**. If you are filling the vehicle yourself, enter the **vehicle number** and, for non-road modes, the transport document number and date.

If you do not have the vehicle number yet, you can generate with Part A only and fill Part B later (or let the transporter do it). The bill will not be valid for movement until Part B is filled, except for the 50 km intra-state transporter case.

### Step 7: Submit and check the result

On submission, the portal validates the data and, if everything passes, shows the e-way bill with its **12-digit EBN** and validity date. Print it or save the PDF, and share the EBN with the transporter.

Check these on the generated bill before the vehicle leaves:

- GSTINs of both parties
- document number and date
- total value
- PIN codes and distance
- vehicle number
- the "valid upto" date and time

## Alternative routes to generation

- **Through e-invoice (IRN):** If you are covered by e-invoicing, you can generate the e-way bill using the IRN; Part A details are auto-populated from the e-invoice data. You then add transport details.
- **Bulk upload:** The portal supports bulk generation through a JSON file prepared with the official bulk generation tool. See [How to Generate Bulk E-Way Bills](/blog/how-to-generate-bulk-eway-bills).
- **API / ERP integration:** Larger businesses connect their systems via authorised API access (often through a GSP).

Check the user documentation for any other generation modes currently offered by the portal.

## Doing it from your phone

Much of the friction in the steps above is retyping data you already have: buyer address, HSN codes, invoice numbers. The E-Way Easy Android app is built around a three-step flow — **Invoice → Review EWB → Generated** — where the buyer's name, address, state and PIN fill from the GSTIN, HSN comes from your saved product list, and distance is calculated from PIN codes (editable if needed). The sales invoice is created as part of the same flow. E-Way Easy is an independent app, not a government portal; whichever tool you use, a valid e-way bill is the one carrying an EBN on the official system, and you can always check an EBN on the portal.

## Common mistakes

1. **Wrong sub-type.** Generating a branch transfer as a sale, or a job work dispatch as a supply, creates a mismatch with your challan.
2. **Using the office PIN instead of the godown PIN.** The dispatch PIN must be where goods actually leave.
3. **Typing the invoice number differently from the invoice.** "INV/25-26/104" and "INV-104" are not the same document.
4. **Leaving Part B for "later" and forgetting.** The truck leaves with an invalid bill.
5. **Entering inflated distance.** The portal allows only up to 10% over its calculated figure; beyond that it will reject or you will need to justify the route.
6. **Not checking validity.** Long routes may need more days than the driver expects.

If something has already gone wrong, see [Common E-Way Bill Errors and Solutions](/blog/common-eway-bill-errors-and-solutions) and [How to Cancel an E-Way Bill](/blog/how-to-cancel-an-eway-bill).

## Limitations to keep in mind

- Part A cannot be edited. Cancellation is possible only within 24 hours and only if the bill has not been verified in transit.
- The recipient can reject an e-way bill within 72 hours (or before delivery, if earlier).
- The portal enforces validations (GSTIN status, document date, distance range). If a validation fails, fix the underlying data rather than looking for a workaround.

## Official sources

For the current screens and validations, refer to the [E-Way Bill user documentation](https://docs.ewaybillgst.gov.in/) and the [E-Way Bill System](https://ewaybillgst.gov.in/). For the legal provisions, see Rule 138 of the CGST Rules on [CBIC GST](https://cbic-gst.gov.in/).
