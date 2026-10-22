---
title: "E-Way Bill vs Sales Invoice: Key Differences"
slug: "eway-bill-vs-sales-invoice"
description: "A clear comparison of the e-way bill and the sales (tax) invoice: purpose, legal basis, who issues them, when they are needed, contents, validity, cancellation, and how they work together."
updatedAt: "2026-09-15"
verifiedAt: "2026-10-10"
seoTitle: "E-Way Bill vs Sales Invoice: Key Differences"
metaDescription: "E-way bill vs sales invoice: purpose, law, who issues, threshold, validity, cancellation and contents compared in one table, with examples and common mix-ups."
imageAlt: "Side-by-side comparison of a tax invoice and an e-way bill with matching fields highlighted"
sources:
  - title: "CBIC GST (CGST Act and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Can an e-way bill replace an invoice?"
    a: "No. The invoice (or bill of supply or delivery challan) must travel with the goods along with the e-way bill. The e-way bill is based on the invoice, not a substitute for it."
  - q: "Do I need an invoice for every e-way bill?"
    a: "You need a base document: a tax invoice, bill of supply, delivery challan, bill of entry or other permitted document, depending on the movement."
  - q: "Is a sales invoice needed even when no e-way bill is required?"
    a: "Yes. A registered supplier must issue a tax invoice (or bill of supply) for a taxable supply regardless of value. The e-way bill depends on the value and type of movement."
  - q: "Is an e-invoice the same as an e-way bill?"
    a: "No. An e-invoice is a tax invoice reported to the Invoice Registration Portal to get an IRN. An e-way bill is a movement document. For e-invoice taxpayers, the e-way bill can be generated using the IRN."
related: ["documents-required-for-eway-bill", "eway-bill-generation", "eway-bill-guide"]
updateHistory:
  - date: "2026-09-15"
    note: "First published."
---
A sales invoice and an e-way bill often carry the same buyer, the same goods and the same value, so it is easy to treat them as one document. They are not. The invoice records a sale and the tax on it; the e-way bill records a movement of goods. You often need both, sometimes only one.

## Side-by-side comparison

| Point | Sales (tax) invoice | E-way bill |
|---|---|---|
| Purpose | Records a supply and the GST charged | Records movement of goods for tracking and verification |
| Legal basis | Section 31 of the CGST Act and the invoice rules | Section 68 of the CGST Act and Rule 138 of the CGST Rules |
| Issued by | Registered supplier | Supplier, recipient or transporter, on the official e-way bill system |
| Where created | Your billing or accounting software, or on paper | Only on the official e-way bill system (portal, SMS, official app, bulk upload, authorised API, or via IRN) |
| Needed for | Every taxable supply by a registered person | Movement of goods where consignment value exceeds ₹50,000, plus specific cases irrespective of value |
| Needed for services? | Yes | No — goods only |
| Needed for non-sale movement? | No (a delivery challan is used) | Often yes, against the delivery challan |
| Identifier | Your invoice number in your own series | 12-digit EWB number from the system |
| Key extra contents | Seller/buyer details, item-wise tax, place of supply, signature | Dispatch and delivery PINs, distance, transporter, vehicle number |
| Validity | No expiry | 1 day per 200 km (normal cargo) |
| Cancellation | Through accounting, credit note after reporting | Within 24 hours on the portal |
| Editing | Corrected through credit/debit notes | Part A cannot be edited; Part B can be updated |
| Carried with goods | Yes | Yes (printout, number, or RFID mapping) |
| Reported in returns | Yes, in GSTR-1 | Data compared with returns |

## How they work together

1. You issue the invoice (or challan).
2. You generate the e-way bill using the invoice details: document number, date, GSTINs, HSN, value and tax come straight from the invoice.
3. You add movement details: PIN codes, distance, transporter, vehicle.
4. The driver carries both.

Because the e-way bill is built on the invoice, an error in the invoice usually flows into the e-way bill. Fix the invoice first.

## When you need one but not the other

| Situation | Invoice | E-way bill |
|---|---|---|
| Sale of goods worth ₹30,000 including GST, same state | Yes | Generally no (check state threshold) |
| Sale of goods worth ₹1,50,000 by truck | Yes | Yes |
| Consulting service of ₹2,00,000 | Yes | No (services) |
| Stock transfer to own branch in same state, ₹80,000 | No (delivery challan, or invoice if distinct person rules apply) | Yes, against the challan |
| Inter-state job work, ₹20,000 | No (delivery challan) | Yes, irrespective of value |
| Goods by non-motorised cart | Yes | No (exempt situation) |

## Fields that must match

Because the e-way bill is built on the invoice, certain details must be identical in both. A mismatch is one of the first things noticed during verification.

| Field | On the invoice | On the e-way bill |
|---|---|---|
| Document number | Your invoice number | Same, character for character |
| Document date | Invoice date | Same date |
| Supplier GSTIN | Printed in seller details | Same |
| Recipient GSTIN | Printed in buyer details | Same (or URP if unregistered) |
| HSN | Per item | Same per item |
| Quantity and unit | Per item | Same |
| Taxable value | Per item and total | Same |
| Tax amounts | CGST/SGST or IGST, cess | Same |
| Ship-to address | If printed | Matches the delivery PIN |

Fields that appear only on the e-way bill — distance, transporter, vehicle number, transport document — have no equivalent on the invoice, though many businesses print the vehicle number on the invoice for convenience.

## Which document is used for what

| Use | Invoice | E-way bill |
|---|---|---|
| Buyer's input tax credit | Yes — the buyer needs the invoice | No |
| Reporting outward supplies in GSTR-1 | Yes | Not directly; data is compared |
| Showing at a checkpoint | Yes, carried with goods | Yes, carried with goods |
| Proof of movement and route | Limited | Yes |
| Proof of delivery | No (use signed LR or receipt) | No (but recipient acceptance helps) |
| Payment follow-up | Yes | No |

## Different rules for different documents

A sale is not always billed on a tax invoice, and the base document for the e-way bill changes with it:

- **Bill of supply** — composition dealers and suppliers of exempt goods issue this instead of a tax invoice. The e-way bill is generated against it when required.
- **Delivery challan** — used where there is no sale at the time of movement: job work, supply on approval, line sales, SKD/CKD lots, stock transfer without sale. The e-way bill is generated against the challan, and the tax invoice (if any) follows later.
- **Bill of entry** — for imported goods moving inland from a port or customs station.

## E-invoice is a third, separate thing

For taxpayers covered by e-invoicing, the tax invoice is reported to the Invoice Registration Portal and gets an IRN. The e-way bill can then be generated using that IRN, with Part A filled from the e-invoice data. The e-invoice does not replace the e-way bill, and the e-way bill does not replace the e-invoice. As reported by GSTN, from 1 April 2025 taxpayers with AATO of ₹10 crore and above must report e-invoices within 30 days of the invoice date.

## Example (illustrative)

A Rajkot pipe manufacturer (GSTIN `24ABCDE1234F1Z5`) sells pipes to an Ahmedabad builder:

- **Invoice** RPM/26-27/0412: taxable value ₹1,20,000, CGST ₹10,800, SGST ₹10,800, total ₹1,41,600, with buyer GSTIN, HSN and place of supply Gujarat.
- **E-way bill**: built from the same invoice, plus dispatch PIN, ship-to PIN, about 220 km, vehicle GJ03AB1234. Valid for 2 days.

If the buyer later returns some pipes, the manufacturer issues a credit note against the invoice, and the return movement may need its own e-way bill (sub-type sales return) if above the threshold.

## Common mix-ups

- Thinking the e-way bill number is the invoice number.
- Generating an e-way bill and forgetting to issue a proper invoice.
- Not carrying the invoice because "the e-way bill has everything".
- Cancelling an e-way bill and assuming the sale is reversed in accounts.
- Treating an e-invoice IRN as an e-way bill.

## Where E-Way Easy fits

In the E-Way Easy app, the sales invoice is created as part of the e-way bill workflow — Invoice → Review EWB → Generated — with an invoice preview before saving. That keeps the two documents consistent. If you only need an invoice, the free [sales invoice templates](/sales-invoice-templates) and the [GST tax invoice template](/sales-invoice-templates/gst-tax-invoice) are available on this site.

## Official sources

Read Section 31 and Section 68 of the CGST Act and the related rules on [CBIC GST](https://cbic-gst.gov.in/), and check e-way bill procedures on the [official portal](https://ewaybillgst.gov.in/).
