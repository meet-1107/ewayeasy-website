---
title: "Documents and Data Required for E-Way Bill Generation"
slug: "documents-required-for-eway-bill"
description: "Documents and data you need to generate an e-way bill, split into Part A and Part B, plus what the driver must carry and a printable checklist."
updatedAt: "2026-10-22"
verifiedAt: "2026-10-13"
seoTitle: "Documents Required for E-Way Bill: Full Checklist"
metaDescription: "Documents and data needed for an e-way bill: invoice or challan, GSTINs, HSN, PINs, Transporter ID, vehicle number, plus what the driver must carry."
imageAlt: "Checklist clipboard beside a tax invoice, a lorry receipt and a vehicle number plate"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Do I need to upload any document to generate an e-way bill?"
    a: "No. You do not upload the invoice. You enter details from it. But the invoice, bill of supply or delivery challan must physically or electronically travel with the goods."
  - q: "Is the vehicle number required in Part A?"
    a: "No. The vehicle number belongs to Part B. Part A covers the invoice, parties, goods, value and route details."
  - q: "What if the buyer is not registered under GST?"
    a: "Enter URP (unregistered person) in place of the recipient GSTIN and fill the name, address, state and PIN."
  - q: "Can I generate an e-way bill with a delivery challan instead of an invoice?"
    a: "Yes, where the movement is not a sale or the invoice is not yet issued, such as job work, supply on approval, line sales, SKD/CKD lots or stock transfer without sale."
  - q: "Is the transport document number compulsory?"
    a: "For road, it is optional if the vehicle number is entered. For rail, air and ship, the transport document number and date are needed in Part B."
  - q: "Does the driver need a printed copy of the e-way bill?"
    a: "Not necessarily. The rules allow the e-way bill to be carried in physical or electronic form, or just its number, or mapped to an RFID device on the vehicle. The invoice, bill of supply or challan must still accompany the goods."
related: ["eway-bill-generation", "eway-bill-common-errors", "eway-bill-vs-sales-invoice"]
updateHistory:
  - date: "2026-10-22"
    note: "Merged our separate article on documents required for e-way bill generation into this guide"
  - date: "2026-10-10"
    note: "Added the 180-day base document limit and a printable checklist table."
  - date: "2026-09-10"
    note: "First published."
---
Most e-way bill errors start before you open the portal: a missing PIN code, a wrong HSN, the buyer's old GSTIN, or no vehicle number when the truck is already at the gate. "Documents required" really means two things: what you need **to generate** the e-way bill, and what the person in charge of the vehicle must **carry** during the movement — the gap between what you typed and what is printed on the paper in the truck is exactly what an officer checks on the road.

This guide lists what you need, separated into what goes into **Part A** (the initial e-way bill) and what goes into **Part B** (transport details), then what must travel with the goods, followed by a checklist you can print and keep at the dispatch desk.

## A. Documents and supporting information

You do not upload these documents to the portal. You enter data from them, and they travel with the goods.

| Document | When it is used |
|---|---|
| **Tax invoice** | Normal taxable sale by a registered supplier |
| **Bill of supply** | Supply by a composition dealer or of exempt goods |
| **Delivery challan** | Movement that is not a sale or where the invoice is not issued yet: job work, supply on approval, line sales, SKD/CKD in lots, stock transfer without sale, goods for exhibition |
| **Bill of entry** | Imported goods moving from port or customs station |
| **Transporter details** | Transporter's name and Transporter ID (GSTIN or TRANSIN) |
| **Vehicle number** | Registration number of the vehicle carrying goods by road |
| **Transport document** | Goods receipt / lorry receipt (GR/LR) for road, railway receipt (RR) for rail, airway bill for air, bill of lading for ship |
| **E-invoice (IRN)** | For e-invoice-applicable taxpayers, the IRN can be used to fill Part A |

> **Note:** As reported by GSTN advisories, from 1 January 2025 the base document (invoice or challan) cannot be more than 180 days old on the date you generate the e-way bill.

If you are unsure whether a movement needs an invoice or a challan, read [Delivery Challan vs Tax Invoice](/blog/delivery-challan-vs-tax-invoice).

## B. Data commonly needed

### Data for Part A (the initial e-way bill)

Part A is filled from your invoice or challan. Without complete Part A data, the e-way bill cannot be generated.

| Field | Where to get it | Watch out for |
|---|---|---|
| Supply type | Outward (you send) or inward (you receive) | Inward for purchases from unregistered sellers |
| Sub-type | Reason: supply, job work, export, sales return, own use, etc. | Stock transfer is not "Supply" |
| Document type | Invoice, bill of supply, challan, bill of entry, others | Must match the paper document |
| Document number | Printed on the document | Same characters, no extra spaces |
| Document date | Printed on the document | Not in the future, not over 180 days old |
| Supplier GSTIN | Your GST registration | Active registration |
| Supplier name and address | Your records | — |
| Dispatch-from address and PIN | Actual place goods leave from | May differ from the principal place |
| Recipient GSTIN | Buyer's GST certificate or invoice | URP if unregistered; check it is active |
| Recipient name and address | Buyer's records | — |
| Ship-to address and PIN | Actual delivery place | Matters for bill to–ship to cases |
| HSN code | Product master or HSN list | Required digits as per your turnover |
| Product name and description | Invoice line items | Clear enough to identify the goods |
| Quantity and unit | Invoice | Use a standard unit (NOS, KGS, MTR, etc.) |
| Taxable value | Invoice line items | Before tax |
| Tax rates and amounts | CGST + SGST, or IGST, plus cess | Intra-state vs inter-state must be right |
| Consignment value | Taxable value + taxes (excluding exempt supplies on the same invoice) | Must match invoice total logic |
| From PIN and To PIN | Addresses above | Drives distance and state checks |
| Approximate distance | Portal's PIN-to-PIN suggestion | Up to 10% more allowed |
| Transporter ID (optional in Part A) | Transporter's GSTIN or TRANSIN | Needed if the transporter will fill Part B |

### Data for Part B (transport details)

Part B makes the e-way bill valid for movement. It can be filled at the time of generation or later by you or the assigned transporter, and updated any number of times while the bill is valid.

| Field | Road | Rail | Air | Ship |
|---|---|---|---|---|
| Mode of transport | Road | Rail | Air | Ship |
| Vehicle number | Required | — | — | — |
| Vehicle type | Regular or over-dimensional cargo | — | — | — |
| Transport document number | Optional (LR/GR) | RR number | Airway bill number | Bill of lading number |
| Transport document date | Optional | Required | Required | Required |

Part B is not required when goods move within the same state up to 50 km between the consignor's place and the transporter's place (or from the transporter's place to the consignee). Part A is still required. See [Distance Rules](/eway-bill-distance-rules).


## C. Documents to carry with the goods

Under Rule 138A, the person in charge of the conveyance should carry:

1. **The invoice, bill of supply or delivery challan**, as the case may be, and
2. **A copy of the e-way bill** in physical or electronic form, **or** the e-way bill number, **or** the e-way bill mapped to an RFID device embedded on the conveyance.

Where a consolidated e-way bill (Form GST EWB-02) is generated for multiple consignments in one vehicle, its details should also be available. In practice, transporters also carry the LR or consignment note; it is not a GST document, but its number helps match records.

## D. Situations that need a different base document or entry

- **Unregistered buyer:** enter URP in place of the recipient GSTIN, with the buyer's name, address, state and PIN. Value and tax still come from your invoice.
- **Job work dispatch:** a delivery challan showing the goods sent, the job worker's details and the purpose. For inter-state movement from a principal to a job worker, an e-way bill is required irrespective of value. See [E-Way Bill Rules for Job Work](/blog/eway-bill-rules-for-job-work).
- **Branch or stock transfer within the same GSTIN:** a delivery challan; whether an e-way bill is needed depends on the consignment value. Between states, each branch has its own GSTIN and a tax invoice is generally issued.
- **Goods bought from an unregistered supplier:** the registered recipient can generate the e-way bill as the inward party, using the supplier's bill or a self-prepared document as applicable.

## Printable checklist

Print this and tick each line before you open the portal or app.

| # | Item | Part | Ready? |
|---|---|---|---|
| 1 | Invoice / bill of supply / delivery challan issued and dated within 180 days | A | ☐ |
| 2 | Supply type and sub-type decided | A | ☐ |
| 3 | Document type, number and date noted exactly | A | ☐ |
| 4 | Supplier GSTIN and dispatch-from PIN | A | ☐ |
| 5 | Recipient GSTIN (or URP), name, ship-to address, PIN | A | ☐ |
| 6 | HSN code for every item | A | ☐ |
| 7 | Description, quantity and unit for every item | A | ☐ |
| 8 | Taxable value, tax rates and tax amounts | A | ☐ |
| 9 | Consignment value checked (above threshold?) | A | ☐ |
| 10 | Approximate distance checked against PIN-to-PIN | A | ☐ |
| 11 | Transporter name and Transporter ID | A/B | ☐ |
| 12 | Mode of transport | B | ☐ |
| 13 | Vehicle number (road) | B | ☐ |
| 14 | Transport document number and date (rail/air/ship, or LR) | B | ☐ |
| 15 | Mobile with OTP access for login | — | ☐ |
| 16 | Invoice/challan copy plus EWB number (or printout) handed to driver | — | ☐ |

## Example (illustrative)

A Morbi tile trader (GSTIN `24ABCDE1234F1Z5`) sends 400 boxes of floor tiles to a retailer in Indore (GSTIN `23FGHIJ6789K1Z3`). The trader books a transporter who will assign the truck the next morning.

**Part A, entered by the trader on the day of invoicing:**

| Field | Value |
|---|---|
| Supply type / sub-type | Outward / Supply |
| Document | Tax invoice MT/26-27/0881, 13-10-2026 |
| From | Morbi, PIN 363xxx |
| To | Indore, PIN 452xxx |
| HSN | Ceramic tile code from product master |
| Quantity | 400 BOX |
| Taxable value | ₹2,40,000 |
| IGST 18% | ₹43,200 |
| Consignment value | ₹2,83,200 |
| Distance | Portal suggestion, about 620 km |
| Transporter ID | `24KLMNO2345P1Z8` |

**Part B, entered by the transporter the next morning:** Road, regular vehicle, GJ36XY4321, LR number 5521 dated 14-10-2026.

Validity runs from the time Part B is first entered. For 620 km, it is 4 days (601–800 km band).

**Carried by the driver:** a copy of tax invoice MT/26-27/0881 plus the e-way bill number (or a printed or electronic copy of the e-way bill).

## Common mistakes

- Using the head office PIN as dispatch-from when goods leave from a godown.
- Copying an old buyer GSTIN from a past invoice without checking it is still active.
- Leaving HSN blank or using a generic code that does not match the invoice.
- Entering only the taxable value and forgetting GST when checking the ₹50,000 threshold.
- Assigning a Transporter ID but forgetting to tell the transporter to fill Part B.
- Typing the invoice number differently from the printed document — prefixes and financial-year format must match exactly.
- Choosing the wrong document type: a challan movement generated as a tax invoice, or the other way round, creates confusion at checking and in your books.
- Sending the driver with only the e-way bill. The invoice or challan must also accompany the goods.

## Limitations

The lists above cover standard movements. Imports, exports, SKD/CKD supplies, exhibitions and supplies through e-commerce operators have their own document conventions. When a situation is unusual, check the official user documentation or consult your tax adviser.

## Where E-Way Easy can help

In the E-Way Easy app, saved buyers and products cut down re-typing: the buyer's address, state and PIN fill from the GSTIN, the HSN fills from the product, and distance is calculated from PIN codes, with manual edits allowed. Invoice numbers follow your own series, and the invoice and e-way bill details are reviewed together before saving — a good moment to catch mismatches. You still need to check that the details match the goods actually being moved. The free [HSN code lookup](/tools/hsn-code-lookup) and [distance calculator](/tools/distance-calculator) help with individual fields; check a buyer's GSTIN with our [GSTIN verification checklist](/blog/gstin-verification-what-to-check), and see [how to avoid errors in invoice and transport details](/blog/avoid-errors-in-invoice-and-transport-details).

## Official sources

Field names and validation rules are defined by the official system. Check the [e-way bill portal](https://ewaybillgst.gov.in/) and its [user documentation](https://docs.ewaybillgst.gov.in/), and read Rules 138 and 138A on [CBIC GST](https://cbic-gst.gov.in/) for the legal requirement.
