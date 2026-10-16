---
title: "E-Way Bill Rules in India: A Practical Guide"
slug: "eway-bill-rules-india-practical-guide"
excerpt: "The e-way bill rules that matter day to day — threshold, responsibility, Part B, validity, extension, cancellation, rejection and penalties — explained with examples."
category: "eway-bill"
tags: ["e-way bill", "rules", "Rule 138", "compliance"]
publishedAt: "2026-05-27"
updatedAt: "2026-10-06"
verifiedAt: "2026-10-10"
seoTitle: "E-Way Bill Rules in India: Practical Guide (2026)"
metaDescription: "Practical guide to e-way bill rules under Section 68 and Rule 138: threshold, who generates, Part B, validity, extension, cancellation and penalties."
imageAlt: "Rulebook open on a desk next to a truck model, with tabs marked threshold, validity, cancellation and penalty"
sources:
  - title: "CBIC GST (CGST Act and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC"
    url: "https://www.cbic.gov.in/"
related: ["what-is-an-eway-bill", "eway-bill-validity-explained", "eway-bill-interstate-movement-requirements"]
---
The e-way bill rules are short on paper but have many moving parts in practice. This guide organises them the way a dispatch desk actually meets them: before the goods move, while they are moving, and after they arrive. Each rule is followed by what it means for you in practice.

The law sits in **Section 68 of the CGST Act** and **Rules 138 to 138E of the CGST Rules, 2017**. States have parallel provisions under their SGST Acts. Rules are amended by notification, so treat this as a working summary and verify the current text on official sources.

## Part 1: Before the goods move

### Rule: e-way bill is needed above ₹50,000 consignment value

An e-way bill is generally required when the consignment value exceeds ₹50,000. Consignment value means the value declared in the invoice, bill of supply or delivery challan, **including** GST, **excluding** the value of exempt supplies in the same invoice.

**In practice:** Calculate on the invoice total with tax. Some states have notified a higher threshold for intra-state movement — check your state's notification for local movements.

### Rule: some movements need it regardless of value

- Inter-state movement of goods by a principal to a job worker.
- Inter-state transport of specified handicraft goods by a person exempt from registration.

**In practice:** Don't run the ₹50,000 test for inter-state job work dispatches. Generate the e-way bill anyway.

### Rule: some movements don't need it at all

The Annexure to Rule 138(14) lists cases where an e-way bill is not required, such as goods carried by non-motorised conveyance, certain exempt goods, and goods moving from a port, airport, air cargo complex or land customs station to an ICD or CFS for customs clearance.

**In practice:** Read the Annexure for your specific goods before assuming an exemption. "Exempt from GST" is not the same as "exempt from e-way bill" for every item.

### Rule: the registered person causing movement generates it

The supplier, the recipient, or the transporter can generate it. If neither the supplier nor the recipient has generated one and the value exceeds the threshold, the transporter must generate it before the movement. Unregistered transporters enrol on the portal to get a TRANSIN.

**In practice:** Agree in writing (in your purchase order or transport contract) who will generate the e-way bill. Confusion here is a common cause of goods leaving without one.

### Rule: Part B makes it valid for movement

Part A has the consignment details; Part B has the vehicle or transport document details. The e-way bill is valid for movement only once Part B is filled — except where goods move within the same state up to 50 km between the consignor and transporter (or transporter and consignee), where Part B is not needed.

### Rule: base document age limit

As reported in a GSTN advisory, from 1 January 2025 an e-way bill cannot be generated for a document dated more than 180 days before the generation date.

## Part 2: While the goods are moving

### Rule: validity depends on distance

Under Rule 138(10):

| Cargo | Validity |
|---|---|
| Normal | 1 day per 200 km or part thereof |
| Over-dimensional | 1 day per 20 km or part thereof |

The first day ends at midnight of the day following generation.

### Example (illustrative): validity for a 520 km trip

A Coimbatore pump manufacturer generates an e-way bill at 11:00 am on 3 August for a 520 km trip.

- 520 ÷ 200 = 2.6, rounded up ("or part thereof") = **3 days**
- Day 1 ends at midnight of 4 August
- Day 2 ends at midnight of 5 August
- Day 3 ends at midnight of 6 August

So the bill is valid until **11:59 pm on 6 August**. For a closer look at the counting method, see [E-Way Bill Validity Explained](/blog/eway-bill-validity-explained).

### Rule: Part B can be updated, Part A cannot

Vehicle details can be updated any number of times within validity — for breakdown, trans-shipment or a change of transporter. Part A details cannot be edited.

**In practice:** Keep transporters briefed that a vehicle change must be updated on the portal *before* goods move in the new vehicle. See [How to Update Vehicle Details](/blog/how-to-update-vehicle-details-in-eway-bill).

### Rule: extension in exceptional circumstances

If goods cannot reach within validity due to exceptional circumstances (accident, natural calamity, law and order problems, trans-shipment delay), the generator or transporter in charge can extend validity within **8 hours before or after expiry**. As reported in a GSTN advisory, from 1 January 2025, total extension is capped at 360 days from the original generation date.

### Rule: documents to carry

The invoice / bill of supply / challan plus the e-way bill (physical, electronic, the number, or RFID-mapped).

### Rule: consolidated e-way bill

Where multiple consignments travel in one vehicle, a transporter can generate a **consolidated e-way bill (Form GST EWB-02)** listing the individual e-way bills.

## Part 3: After generation and on arrival

### Rule: cancellation within 24 hours

An e-way bill can be cancelled within 24 hours of generation if goods were not transported or not transported as per the details. It cannot be cancelled if it has been verified in transit. See [How to Cancel an E-Way Bill](/blog/how-to-cancel-an-eway-bill).

### Rule: recipient's acceptance or rejection

The recipient can accept or reject the e-way bill within 72 hours of the details being made available, or before delivery, whichever is earlier. If they do nothing, it is deemed accepted.

**In practice:** Recipients should check e-way bills generated against their GSTIN. An e-way bill raised by mistake (or misuse) against your GSTIN should be rejected promptly.

### Rule: penalties

Moving goods without a valid e-way bill where one is required can lead to detention or seizure of goods and conveyance and a penalty under **Section 129**, with a general penalty under **Section 122** also possible. The amounts can be substantial.

## Quick reference

| Situation | Rule |
|---|---|
| Value above ₹50,000 | E-way bill needed (check state intra-state threshold) |
| Inter-state job work | Needed regardless of value |
| Part A wrong | Cancel within 24 hours, generate new |
| Vehicle changed | Update Part B before moving |
| Running late | Extend within 8 hours before/after expiry |
| Wrong bill against your GSTIN | Recipient rejects within 72 hours |

## Common mistakes

- **Testing the threshold on taxable value only.** Include GST.
- **Splitting an invoice to stay under ₹50,000.** The rules look at the movement and documents; artificial splitting invites scrutiny and penalty.
- **Assuming intra-state means no e-way bill.** Only true if your state's notified threshold or an exemption applies.
- **Missing the extension window.** The 8-hour window around expiry is strict.
- **Not rejecting wrong bills.** Silence counts as acceptance after 72 hours.

## Limitations

This guide does not cover every special case — imports, exports, exhibitions, SKD/CKD and e-commerce have their own nuances. See [E-Way Bill Returns and Special Transactions](/blog/eway-bill-returns-and-special-transactions) and [Interstate Movement Requirements](/blog/eway-bill-interstate-movement-requirements) for more. For routine sales, the [E-Way Easy app](/features) keeps invoice and e-way bill details in one flow, which helps with the "before the goods move" part; the compliance decisions remain yours.

## Official sources

Read the current text of Section 68 and Rules 138–138E on [CBIC GST](https://cbic-gst.gov.in/) and [CBIC](https://www.cbic.gov.in/). Portal advisories and procedures are on the [E-Way Bill System](https://ewaybillgst.gov.in/) and its [user documentation](https://docs.ewaybillgst.gov.in/).
