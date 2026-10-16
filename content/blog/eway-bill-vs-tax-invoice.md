---
title: "E-Way Bill vs. Tax Invoice"
slug: "eway-bill-vs-tax-invoice"
excerpt: "A tax invoice records the sale; an e-way bill tracks the movement. Here is how the two documents differ, how they link, and why you usually need both."
category: "invoicing"
tags: ["e-way bill", "tax invoice", "invoicing", "basics"]
publishedAt: "2026-07-01"
updatedAt: "2026-09-30"
verifiedAt: "2026-10-10"
seoTitle: "E-Way Bill vs Tax Invoice: Key Differences Explained"
metaDescription: "Understand the difference between an e-way bill and a tax invoice under GST: purpose, legal basis, who issues them, contents and when you need both."
imageAlt: "Side-by-side comparison of a tax invoice and an e-way bill with arrows linking invoice number and value"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "CBIC GST (Acts and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
faq:
  - q: "Can an e-way bill replace a tax invoice?"
    a: "No. The e-way bill is generated on the basis of an invoice or other document. The invoice (or bill of supply or delivery challan) must still travel with the goods."
  - q: "Do I need an e-way bill for every tax invoice?"
    a: "No. An e-way bill is needed only when goods move and the consignment value exceeds the threshold (generally ₹50,000), or in specific cases where it is required irrespective of value. Services invoices never need one."
  - q: "Is the e-way bill number printed on the invoice?"
    a: "It is not mandatory, but many businesses note it on their copy for easy tracking."
related: ["delivery-challan-vs-tax-invoice", "what-is-an-eway-bill", "how-to-calculate-gst-on-sales-invoice"]
---
New business owners often ask whether the e-way bill is "another invoice". It is not. A tax invoice is the commercial and tax document for a sale. An e-way bill is a movement document that tells the tax system goods are on the road, where they are going and in which vehicle. The two are linked — the e-way bill is built from the invoice details — but they serve different purposes and follow different rules.

## The short answer

| | Tax invoice | E-way bill |
|---|---|---|
| Purpose | Records a taxable supply and the tax charged | Records the movement of goods |
| Legal basis | Section 31 of the CGST Act; Rule 46 of the CGST Rules | Section 68 of the CGST Act; Rule 138 of the CGST Rules |
| Needed for | Every taxable supply of goods or services by a registered person | Movement of goods above the threshold, plus specific cases |
| Services? | Yes | No — goods only |
| Where it is created | Your billing software or books | The official e-way bill system (directly or via authorised integration) |
| Number | Your own invoice series | 12-digit number allotted by the system |
| Validity | No expiry | Valid for a period based on distance |
| Can it be edited? | Corrections through credit/debit notes or as your accounting allows | Not editable; cancel within 24 hours, Part B updatable |
| Recipient action | Accounts for it, claims ITC | May accept or reject within 72 hours or till delivery |

## What a tax invoice does

A tax invoice is the primary document for a taxable supply. It establishes the value, the tax charged and the parties involved. It is the basis for the supplier's output tax and the recipient's input tax credit. Rule 46 lists the particulars it must contain — supplier and recipient details, GSTIN, invoice number and date, HSN or SAC, description, quantity, taxable value, rate and amount of tax, place of supply and more.

For goods, invoices are generally prepared in triplicate: original for the recipient, duplicate for the transporter and triplicate for the supplier.

## What an e-way bill does

The e-way bill (Form GST EWB-01) is a record of the movement. Part A carries the details drawn from the invoice — GSTINs, document number and date, value, HSN, place of delivery PIN and reason for transport. Part B carries the vehicle or transport document details. The e-way bill lets officers verify, on the road, that the goods in the vehicle match a declared supply.

It is generally required where the consignment value exceeds ₹50,000. Consignment value means the taxable value plus GST, excluding the value of exempt supplies on the same invoice. Some states have notified a different limit for movement within the state, so check your state's notification. It is also required irrespective of value for inter-state movement from a principal to a job worker, and for inter-state movement of specified handicraft goods by persons exempt from registration.

## How the two connect

Think of it as a chain:

1. **Sale agreed** → tax invoice raised.
2. **Goods to move** → e-way bill generated using that invoice's number, date, value and HSN.
3. **Goods in transit** → driver carries the invoice copy and the e-way bill (physical or its number, or RFID mapped).
4. **Goods delivered** → recipient records the invoice; the e-way bill's job is done.

If the invoice details and the e-way bill details do not match — different value, different quantity, different recipient — the officer may question the movement.

## Example (illustrative): one invoice, one e-way bill

A Morbi ceramic tiles maker sells tiles to a builder in Ahmedabad (both in Gujarat).

| Invoice MT/26-27/0213 | Amount |
|---|---|
| 600 boxes × ₹420 | ₹2,52,000 |
| CGST @ 9% (illustrative rate) | ₹22,680 |
| SGST @ 9% | ₹22,680 |
| **Invoice total** | **₹2,97,360** |

The consignment value is ₹2,97,360, well above the general threshold. The maker generates an e-way bill with:

- Document type: tax invoice, number MT/26-27/0213, same date
- Supplier GSTIN: `24ABCDE1234F1Z5` (sample); recipient GSTIN of the builder
- HSN as per the product
- Taxable value ₹2,52,000; CGST ₹22,680; SGST ₹22,680
- Distance as calculated from the PIN codes (say 190 km), so 1 day validity
- Vehicle number in Part B

Now suppose the same maker also sells a small lot worth ₹38,000 including tax to a local retailer in Morbi itself. A tax invoice is required. Whether an e-way bill is required depends on the intra-state threshold notified by Gujarat and the distance exceptions — check the current notification. Use our [e-way bill eligibility checker](/tools/eway-bill-eligibility-checker) for a quick first check.

## When you have an invoice but no e-way bill

- Supply of **services** only.
- Goods consignment at or below the applicable threshold (and not a job-work or specified handicraft case).
- Goods or situations listed in the **Annexure to Rule 138(14)**, such as movement by non-motorised conveyance or certain exempt goods.
- **Over-the-counter sales** where the customer carries the goods and the value is below the threshold.

## When you have an e-way bill but no tax invoice

The e-way bill can be generated against a bill of supply or a delivery challan as well. Typical cases:

- Stock transfer to your own branch in the same state (no supply, so delivery challan).
- Goods sent for job work.
- Goods sent on approval or for exhibition.
- Goods returned by the buyer, where the document depends on your arrangement.

See [delivery challan vs. tax invoice](/blog/delivery-challan-vs-tax-invoice) and [e-way bill rules for returns and special transactions](/blog/eway-bill-returns-and-special-transactions).

## Common mistakes

- **Thinking the e-way bill is proof of sale.** It is not. Input tax credit and output tax rest on the invoice.
- **Generating the e-way bill before finalising the invoice.** Any later change to the invoice leaves the e-way bill mismatched.
- **Splitting one sale into several invoices** to stay under the threshold. Officers look at the substance of the movement, and this can create bigger problems.
- **Sending the driver without the invoice copy.** The e-way bill alone is not enough; the base document must travel too.
- **Assuming e-invoicing removes the need for an e-way bill.** For e-invoice-applicable taxpayers, the e-way bill can be generated from the IRN with Part A auto-filled, but the e-way bill requirement itself still applies.

## Doing both in one flow

Because the e-way bill is built from invoice data, it makes sense to create both together. The E-Way Easy app's create-invoice flow does exactly that: you prepare the sales invoice, review the e-way bill details and then move to generation, with buyer details filled from GSTIN and HSN filled from saved products. Read more on our [e-way bill vs sales invoice guide](/eway-bill-vs-sales-invoice).

## Official sources

Invoice requirements are in Section 31 of the CGST Act and Rule 46 of the CGST Rules; e-way bill requirements are in Section 68 and Rule 138. Verify the current text on [cbic-gst.gov.in](https://cbic-gst.gov.in/) and the e-way bill process on [ewaybillgst.gov.in](https://ewaybillgst.gov.in/).
