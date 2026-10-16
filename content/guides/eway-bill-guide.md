---
title: "E-Way Bill Guide: Everything Indian Businesses Need to Know"
slug: "eway-bill-guide"
description: "A practical overview of the e-way bill system in India: what it is, when it is required, who generates it, how Part A and Part B work, validity, and links to every detailed guide."
updatedAt: "2026-10-12"
verifiedAt: "2026-10-12"
seoTitle: "E-Way Bill Guide for Indian Businesses (2026)"
metaDescription: "What an e-way bill is, when it is required, who generates it, Part A vs Part B, validity, cancellation and documents. A practical hub for Indian businesses."
imageAlt: "Illustration of a goods truck with an invoice and an e-way bill document linked by a route line across India"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill 2.0 portal"
    url: "https://ewaybill2.gst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (Acts and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "What is an e-way bill in simple words?"
    a: "It is an electronic document generated on the official e-way bill system before goods are moved, recording who is sending what, to whom, of what value and in which vehicle. It is created in Form GST EWB-01 under Rule 138 of the CGST Rules, 2017."
  - q: "Is an e-way bill required for every movement of goods?"
    a: "No. It is generally required when the consignment value exceeds Rs 50,000, with some exceptions and some situations where it is required irrespective of value. Some states have notified a different threshold for intra-state movement, so check your state's notification."
  - q: "Who should generate the e-way bill: seller, buyer or transporter?"
    a: "The registered supplier (consignor) or the recipient can generate it. If neither has generated it and the value is above the threshold, the transporter must generate it before the goods move."
  - q: "Can I generate an e-way bill from my phone?"
    a: "Yes. The official system supports generation through the web portal, SMS and an official mobile app, and authorised integrations exist as well. Third-party apps can help you prepare the invoice and e-way bill data, but the e-way bill itself is generated only by the official system."
  - q: "How long is an e-way bill valid?"
    a: "For normal cargo, 1 day for every 200 km or part of it. For over-dimensional cargo, 1 day for every 20 km or part of it. The first day ends at midnight of the day after generation."
related: ["eway-bill-generation", "eway-bill-rules", "documents-required-for-eway-bill", "eway-bill-faq"]
updateHistory:
  - date: "2026-10-12"
    note: "Rechecked thresholds, validity and the January 2025 changes (180-day document limit, 360-day extension cap) against the official portal."
  - date: "2026-09-04"
    note: "Added links to the new distance, correction and bulk generation guides."
---
An e-way bill (EWB) is the electronic record that has to exist before most taxable goods worth more than ₹50,000 are moved by road, rail, air or ship in India. It tells the tax system what is moving, from where, to where, for whom, of what value, and in which vehicle. If you sell, buy or transport goods under GST, you will deal with it almost every week.

This page is the starting point of the E-Way Easy Learning Centre. It covers the essentials in one place, then links to detailed guides on each topic.

> **Note:** E-Way Easy is an independent app and website. It is not a government portal and is not affiliated with GSTN or NIC. Always confirm the current law on the official e-way bill portal.

## What an e-way bill is

The e-way bill system was introduced under **Section 68 of the CGST Act** and **Rule 138 of the CGST Rules, 2017** (read with Rules 138A to 138E). The e-way bill is generated in **Form GST EWB-01** on the official e-way bill system run by NIC for GSTN.

Each e-way bill gets a unique 12-digit EWB number. The person in charge of the vehicle must carry the invoice (or bill of supply or delivery challan) along with the e-way bill — either a printout, the EWB number, or an RFID device mapped to it.

The form has two parts:

| Part | What it contains | Who usually fills it |
|---|---|---|
| **Part A** | GSTIN of supplier and recipient, place of delivery (PIN), document number and date, value of goods, HSN code, reason for transportation, transport document number | Supplier, recipient or transporter |
| **Part B** | Vehicle number (road) or transport document details (rail, air, ship) | Whoever arranges transport, often the transporter |

An e-way bill becomes valid for movement only after Part B is filled, except in the short-distance case explained below.

## When an e-way bill is required

The general position is:

- **Consignment value above ₹50,000.** Consignment value means the taxable value plus GST shown on the invoice, excluding the value of exempt supplies billed on the same invoice.
- **Irrespective of value** for (a) inter-state movement of goods by a principal to a job worker, and (b) inter-state transport of specified handicraft goods by a person who is exempt from registration.
- **Not required** for goods and situations listed in the Annexure to Rule 138(14) — for example, goods carried by non-motorised conveyance, certain exempt goods, and goods moving from a port, airport, air cargo complex or land customs station to an ICD or CFS for customs clearance.

Some states have notified a higher threshold for movement within the state. Check your state's notification on the official portal before relying on any number other than ₹50,000.

The movement does not have to be a sale. Stock transfers, job work, supply on approval, sales returns and goods sent for exhibition can also need an e-way bill.

For the free eligibility check, try the [e-way bill eligibility checker](/tools/eway-bill-eligibility-checker).

## Who generates it

| Situation | Who generates |
|---|---|
| Registered supplier sending goods | Supplier (consignor) |
| Registered recipient arranging the movement, or supplier is unregistered | Recipient |
| Neither has generated it and value exceeds threshold | Transporter, before movement |
| Unregistered transporter | Can enrol on the portal to get a Transporter ID (TRANSIN) |

In practice, most small manufacturers and traders generate the e-way bill themselves after making the sales invoice, then share it with the transporter, who updates Part B if the vehicle changes.

## How generation works, in short

1. Prepare the tax invoice, bill of supply or delivery challan.
2. Log in to the official e-way bill portal (or use SMS, the official app, or an authorised API integration).
3. Fill Part A from the invoice: GSTINs, document details, HSN, value, tax, PIN codes, distance.
4. Fill Part B: vehicle number, or transport document number for rail/air/ship.
5. Submit and note the EWB number. Print or share it with the driver.

The step-by-step process is in [How to Generate an E-Way Bill](/eway-bill-generation).

## Validity at a glance

| Type of cargo | Validity |
|---|---|
| Normal cargo | 1 day per 200 km or part thereof |
| Over-dimensional cargo (ODC) | 1 day per 20 km or part thereof |

The first day ends at midnight of the day following generation. Validity can be extended within 8 hours before or after expiry if the goods cannot reach on time because of exceptional circumstances. Details and worked examples are in the [validity guide](/eway-bill-validity).

## Key rules people get wrong

- **The 50 km Part B exemption.** Within the same state, if goods move up to 50 km from the consignor's place to the transporter's place for onward transport (or from the transporter to the consignee), Part B is not needed. Part A still is.
- **Editing.** An e-way bill cannot be edited. Wrong Part A details mean cancelling within 24 hours and generating a new one. Part B can be updated as often as needed while the bill is valid.
- **Cancellation.** Allowed within 24 hours of generation, and not after the bill has been verified in transit.
- **Recipient's role.** The recipient can accept or reject the e-way bill within 72 hours or before delivery, whichever is earlier. If they do nothing, it is treated as accepted.
- **Old invoices.** As reported by GSTN advisories, from 1 January 2025 an e-way bill cannot be generated for a base document dated more than 180 days before the generation date.
- **Extension cap.** Also from 1 January 2025, an e-way bill can be extended only up to a total of 360 days from its original generation date.
- **Login security.** Multi-factor authentication on the e-way bill portal was rolled out in phases during 2025 and now covers all taxpayers. Keep the registered mobile number with someone who is available when bills are generated.

## Penalty in plain terms

Moving goods without a valid e-way bill, or with one that does not match the goods, can lead to detention or seizure of goods and vehicle and a penalty under **Section 129** of the CGST Act, along with the general penalty provisions of Section 122. The amounts can be substantial compared with the effort of generating the bill correctly.

## Every guide in the Learning Centre

| Guide | What it covers |
|---|---|
| [How to Generate an E-Way Bill](/eway-bill-generation) | The full portal flow, other generation modes, and how the E-Way Easy app workflow fits in |
| [Documents and Data Required](/documents-required-for-eway-bill) | Every document and data field you need, split into Part A and Part B, with a checklist |
| [E-Way Bill Rules (Rule 138)](/eway-bill-rules) | The legal basis, thresholds, exemptions, and responsibilities, rule by rule |
| [E-Way Bill Validity](/eway-bill-validity) | How validity is calculated, extended and when it expires, with timestamped examples |
| [Distance Rules](/eway-bill-distance-rules) | PIN-to-PIN distance, the 10% margin, the 4,000 km limit and the 50 km Part B exemption |
| [How to Cancel an E-Way Bill](/eway-bill-cancellation) | The 24-hour rule, when cancellation is blocked, and what to do instead |
| [E-Way Bill Correction](/eway-bill-correction) | What can be updated, what cannot, and the cancel-and-regenerate route |
| [Bulk E-Way Bill Generation](/bulk-eway-bill-generation) | The official bulk tool, data preparation, validation errors and safe retries |
| [Common Errors and Fixes](/eway-bill-common-errors) | Everyday problems explained in plain words with practical fixes |
| [E-Way Bill vs Sales Invoice](/eway-bill-vs-sales-invoice) | How the two documents differ and how they work together |
| [E-Way Bill FAQ](/eway-bill-faq) | 30 common questions answered briefly |

## Where E-Way Easy fits

The E-Way Easy Android app is built around a single invoice-based workflow: **Invoice → Review EWB → Generated**. You enter the buyer GSTIN (address, state and PIN fill automatically), pick products from your saved list (HSN fills from the product), and the distance is calculated from PIN codes, with manual edits allowed. The sales invoice is created as part of the same flow. Like every tool, it does not replace the official system's rules — the checks in this guide still apply.

If you only need a quick number, the site's free tools include a [GST calculator](/tools/gst-calculator), a [distance calculator](/tools/distance-calculator) and an [HSN code lookup](/tools/hsn-code-lookup).

## Common mistakes to avoid

- Treating ₹50,000 as the invoice's taxable value only, when consignment value includes GST.
- Forgetting that non-sale movements (stock transfer, job work) can need an e-way bill.
- Generating the bill with Part A only and letting the truck leave beyond 50 km.
- Not updating Part B when goods shift to another vehicle mid-route.
- Waiting more than 24 hours to cancel a wrong bill.

## Official sources

Rules and procedures change through notifications and portal advisories. Before acting on any point here, check the [official e-way bill portal](https://ewaybillgst.gov.in/), its [user documentation](https://docs.ewaybillgst.gov.in/), and the CGST Act and Rules on [CBIC GST](https://cbic-gst.gov.in/). For complex cases, speak to a qualified tax professional.
