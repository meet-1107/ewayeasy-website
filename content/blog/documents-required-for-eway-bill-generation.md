---
title: "Documents Required for E-Way Bill Generation"
slug: "documents-required-for-eway-bill-generation"
excerpt: "A checklist of the documents and details you need to generate an e-way bill, and what the driver must carry, for sales, transfers, job work and unregistered buyers."
category: "eway-bill"
tags: ["e-way bill", "documents", "checklist", "delivery challan"]
publishedAt: "2026-05-08"
updatedAt: "2026-09-02"
verifiedAt: "2026-10-10"
seoTitle: "Documents Required for E-Way Bill Generation: Checklist"
metaDescription: "Checklist of documents for e-way bill generation: invoice, bill of supply or challan, GSTINs, HSN, transporter ID, vehicle number, and what to carry."
imageAlt: "Checklist clipboard with tax invoice, delivery challan, transporter ID and vehicle number ticked off next to a loaded truck"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules)"
    url: "https://cbic-gst.gov.in/"
faq:
  - q: "Does the driver need a printed copy of the e-way bill?"
    a: "Not necessarily. The rules allow the e-way bill to be carried in physical or electronic form, or just its number, or mapped to an RFID device on the vehicle. The invoice, bill of supply or challan must still accompany the goods."
  - q: "Can I generate an e-way bill without a vehicle number?"
    a: "Yes, you can generate Part A without it. But the e-way bill is valid for movement only after Part B (vehicle or transport document details) is filled, except for the 50 km intra-state transporter case."
related: ["how-to-generate-eway-bill-step-by-step", "delivery-challan-vs-tax-invoice", "eway-bill-rules-for-job-work"]
---
The e-way bill portal does not ask you to upload documents. What it needs is accurate data taken from documents — and the mismatch between what you type and what is printed on the paper travelling with the truck is exactly what an officer checks on the road. So "documents required" really means two things:

1. the documents and details you need **to generate** the e-way bill, and
2. the documents the person in charge of the vehicle must **carry** during the movement.

This article covers both, with a checklist for each common situation.

## The base document: invoice, bill of supply or challan

Every e-way bill is linked to one base document. Which one depends on why the goods are moving.

| Situation | Usual base document |
|---|---|
| Taxable sale | Tax invoice |
| Sale by composition dealer or of exempt goods | Bill of supply |
| Job work dispatch | Delivery challan |
| Branch / stock transfer within the same GSTIN | Delivery challan |
| Supply on approval, line sales, SKD/CKD in lots | Delivery challan |
| Sales return by an unregistered buyer | Delivery challan or as applicable |
| Import movement from port | Bill of entry |

If you are unsure whether a movement needs an invoice or a challan, read [Delivery Challan vs Tax Invoice](/blog/delivery-challan-vs-tax-invoice).

> Note: As reported in GSTN advisories, from 1 January 2025 an e-way bill cannot be generated against a base document dated more than 180 days before the generation date.

## Checklist: details needed to generate the e-way bill

### Part A details

- [ ] Your GSTIN (supplier / consignor)
- [ ] Recipient's GSTIN, or "URP" if the recipient is unregistered
- [ ] Recipient's name and address
- [ ] Dispatch-from address and PIN (actual place of dispatch)
- [ ] Ship-to address and PIN (actual place of delivery)
- [ ] Document type, number and date
- [ ] Item-wise product name, HSN code, quantity and unit
- [ ] Taxable value and tax rates (CGST + SGST, or IGST)
- [ ] Reason for transportation (supply, job work, own use, etc.)
- [ ] Transport document number (LR / RR / airway bill / bill of lading), where applicable

### Part B details

- [ ] Mode of transport (road, rail, air, ship)
- [ ] Vehicle number for road movement
- [ ] Transport document number and date for rail, air or ship
- [ ] Transporter ID (GSTIN or TRANSIN) if a transporter will update Part B
- [ ] Approximate distance (the portal suggests a PIN-to-PIN figure; you can enter up to 10% more)

Use the [HSN code lookup](/tools/hsn-code-lookup) if you are unsure of a code, and our guide on [GSTIN verification](/blog/gstin-verification-what-to-check) before you rely on a buyer's GSTIN.

## Checklist: documents to carry with the goods

Under Rule 138A, the person in charge of the conveyance should carry:

1. **The invoice, bill of supply or delivery challan**, as the case may be, and
2. **A copy of the e-way bill** in physical or electronic form, **or** the e-way bill number, **or** the e-way bill mapped to an RFID device embedded on the conveyance.

Where a consolidated e-way bill (Form GST EWB-02) is generated for multiple consignments in one vehicle, the consolidated bill details should also be available.

In practice, transporters also carry the LR / consignment note. It is not a GST document, but its number often appears in Part A and helps match records.

## Situation-wise checklists

### Example (illustrative): sale to a registered buyer

A Rajkot pipe manufacturer ships pipes worth ₹62,000 + 18% GST (₹11,160) = ₹73,160 to a Pune dealer.

Needed to generate: tax invoice no. RPM/26-27/0412, buyer GSTIN `27ABCDE1234F1Z5`, HSN codes, Pune PIN, vehicle number from the transporter.
Carried by the driver: tax invoice copy + EBN (or printed e-way bill).

### Sale to an unregistered buyer

Enter "URP" in place of the recipient GSTIN, along with the buyer's name, address and PIN. The value and tax still come from your invoice.

### Job work dispatch

You need a **delivery challan** showing the goods sent, the job worker's details and the purpose. For inter-state movement to a job worker, an e-way bill is required regardless of value. See [E-Way Bill Rules for Job Work](/blog/eway-bill-rules-for-job-work).

### Branch transfer

A **delivery challan** for movement between your own premises. If both premises are under the same GSTIN (same state), the movement still may need an e-way bill depending on value. Between states, each branch has its own GSTIN and a tax invoice is generally issued.

### Goods bought from an unregistered supplier

The registered recipient can generate the e-way bill as the "inward" party, using the supplier's bill or a self-prepared document as applicable.

## Common mistakes

- **Invoice number typed differently.** The number on the e-way bill must match the printed invoice exactly, including prefixes and financial-year format.
- **Using registered office address for dispatch.** The dispatch PIN must be the warehouse or factory the truck actually leaves from.
- **Wrong document type.** A challan movement generated as a tax invoice, or the other way round, creates confusion at checking and in your books.
- **HSN missing or at the wrong level.** Check the digit-level requirement that applies to your turnover.
- **Driver carrying only the e-way bill.** The invoice or challan must also accompany the goods.
- **Old base documents.** Challans older than 180 days are blocked for e-way bill generation as per the advisory.

## Reducing data entry errors

Most of the mistakes above come from retyping. In the E-Way Easy app, your seller details are saved, the buyer's name, address, state and PIN fill from their GSTIN, HSN fills from your saved product, and invoice numbers follow your own series automatically. The invoice and e-way bill details are reviewed together before saving, which is a good moment to catch mismatches. More on this in [How to Avoid Errors in Invoice and Transport Details](/blog/avoid-errors-in-invoice-and-transport-details).

## Limitations

The list above covers standard movements. Imports, exports, SKD/CKD supplies, exhibitions and supplies by e-commerce operators have their own document conventions. When a situation is unusual, check the [E-Way Bill user documentation](https://docs.ewaybillgst.gov.in/) or consult your tax adviser.

## Official sources

Document requirements are set out in Rules 138 and 138A of the CGST Rules, available on [CBIC GST](https://cbic-gst.gov.in/). Portal field details are in the [E-Way Bill user documentation](https://docs.ewaybillgst.gov.in/), and the generation facility is on the [E-Way Bill System](https://ewaybillgst.gov.in/).
