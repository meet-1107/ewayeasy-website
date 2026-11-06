---
title: "GST Invoice Rules: Format, Mandatory Fields and Time Limits"
slug: "gst-invoice-rules"
description: "GST invoice rules in plain language: the mandatory fields of a tax invoice under Rule 46, invoice numbering, HSN digits, time limits, copies, bill of supply, invoice-cum-bill of supply, the ₹200 exception, e-invoicing and common mistakes."
updatedAt: "2026-11-06"
verifiedAt: "2026-11-06"
seoTitle: "GST Invoice Rules: Format, Mandatory Fields & Time Limits"
metaDescription: "What a GST tax invoice must show under Rule 46, how to number it, when to issue it, how many copies, and when to use a bill of supply instead. With a checklist."
imageAlt: "A GST tax invoice with its mandatory fields labelled: supplier GSTIN, invoice number and date, buyer details, HSN, tax columns, place of supply and signature"
sources:
  - title: "CBIC GST (CGST Act and CGST Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
  - title: "E-invoice portal"
    url: "https://einvoice1.gst.gov.in/"
  - title: "CBIC"
    url: "https://www.cbic.gov.in/"
faq:
  - q: "Which rule lists the mandatory fields of a GST invoice?"
    a: "Rule 46 of the CGST Rules, 2017 lists the particulars of a tax invoice. Section 31 of the CGST Act sets the obligation to issue one for a taxable supply."
  - q: "How many characters can a GST invoice number have?"
    a: "Up to 16 characters, using letters, numerals, hyphen (-) and slash (/). It must be consecutive and unique for the financial year, and you can run one or more series."
  - q: "When must a GST invoice be issued?"
    a: "For goods, on or before removal or delivery of the goods. For services, within 30 days of the supply, or 45 days for banks, insurers and NBFCs."
  - q: "How many digits of HSN must be shown on an invoice?"
    a: "Businesses with aggregate turnover up to ₹5 crore in the previous year must show at least 4 digits on B2B invoices (optional on B2C). Above ₹5 crore, 6 digits are required on all invoices."
  - q: "When is a bill of supply issued instead of a tax invoice?"
    a: "When a registered person supplies exempt goods or services, or is a composition taxpayer. No tax is charged on a bill of supply."
  - q: "Is a signature mandatory on a GST invoice?"
    a: "Rule 46 requires the signature or digital signature of the supplier or an authorised representative. A digital signature is accepted, and e-invoices carry the IRP's own digital signature."
  - q: "Do I need to issue an invoice for very small sales?"
    a: "For a supply below ₹200 to an unregistered buyer who does not ask for an invoice, you may skip the individual invoice, but you must issue one consolidated invoice for such supplies at the close of each day."
  - q: "Does a free invoice template make my invoice compliant?"
    a: "No template guarantees compliance. It gives you the fields; you are responsible for the details, tax rates and any e-invoicing requirement that applies to your business."
related: ["eway-bill-vs-sales-invoice", "documents-required-for-eway-bill", "eway-bill-rules"]
updateHistory:
  - date: "2026-11-06"
    note: "First published."
---
> **Quick answer:** A GST tax invoice must be issued under Section 31 of the CGST Act and must show the particulars listed in Rule 46 of the CGST Rules: supplier and buyer details with GSTINs, a unique serial number of up to 16 characters, date, HSN, description, quantity, taxable value, tax rate and amount, place of supply, reverse charge status and a signature. Goods are invoiced on or before removal or delivery, services within 30 days. Composition dealers and suppliers of exempt goods issue a bill of supply instead.

An invoice is the document your output tax and your buyer's input tax credit rest on. If a field is missing or wrong, the buyer may not get credit, your GSTR-1 will not match, and the e-way bill built from the invoice will carry the same error. This guide sets out the rules: what must be on the invoice, when to issue it, how to number it, how many copies, and which document to use when you do not charge GST.

It is a plain-language summary of the CGST Act and Rules, not the legal text. Rules change by notification, so read the current version on [CBIC GST](https://cbic-gst.gov.in/) before relying on any point. For the tax arithmetic itself, see [how to calculate GST on a sales invoice](/blog/how-to-calculate-gst-on-sales-invoice); for which tax applies, see [CGST, SGST and IGST explained](/blog/cgst-sgst-igst-explained).

## The legal basis in one table

| Provision | What it covers |
|---|---|
| Section 31, CGST Act | Obligation to issue a tax invoice, timing, bill of supply, revised invoices, small-value relaxation |
| Rule 46 | Particulars of a tax invoice |
| Rule 46A | Invoice-cum-bill of supply |
| Rule 47 | Time limit for issuing invoices for services |
| Rule 48 | Manner of issuing (copies, e-invoicing) |
| Rule 49 | Bill of supply |
| Rule 53 | Revised tax invoice, credit and debit notes |
| Section 34, CGST Act | Credit notes and debit notes |

## Mandatory fields of a tax invoice (Rule 46)

Every tax invoice for a taxable supply must carry the following. Some apply only in certain cases, as noted.

| # | Particular | Notes |
|---|---|---|
| 1 | Supplier's name, address and GSTIN | As per registration |
| 2 | Invoice serial number | Consecutive, up to 16 characters, unique for the financial year (see numbering below) |
| 3 | Date of issue | |
| 4 | Recipient's name, address and GSTIN | GSTIN or UIN where the recipient is registered |
| 5 | Unregistered recipient, taxable value ₹50,000 or more | Name and address of the recipient, address of delivery, with state name and state code |
| 6 | HSN code (goods) or SAC (services) | Digits depend on turnover (see below) |
| 7 | Description of goods or services | |
| 8 | Quantity and unit | For goods (e.g. Nos, KGS, MTR) |
| 9 | Total value of supply | |
| 10 | Taxable value | After discount or abatement, if any |
| 11 | Rate of tax | CGST, SGST/UTGST, IGST and cess, as applicable |
| 12 | Amount of tax | Separately for each tax |
| 13 | Place of supply | With state name, for inter-state supplies |
| 14 | Address of delivery | Where it differs from the place of supply |
| 15 | Whether tax is payable on reverse charge | A clear yes/no line is the usual practice |
| 16 | Signature or digital signature | Of the supplier or authorised representative |

For an unregistered buyer below ₹50,000, the rule also provides for recording the name, address and delivery details if the buyer asks for them. Exports and certain notified categories have extra or different particulars; check the current rule if they apply to you.

The fields that most often cause trouble are the buyer's GSTIN (one wrong character and the credit goes nowhere) and the place of supply (which decides CGST + SGST or IGST). Check a GSTIN's format with the [GSTIN validator](/tools/gstin-validator) before you issue the invoice.

### HSN digits by turnover

| Aggregate turnover in the previous financial year | B2B invoices | B2C invoices |
|---|---|---|
| Up to ₹5 crore | 4 digits mandatory | Optional |
| Above ₹5 crore | 6 digits mandatory | 6 digits mandatory |

These requirements come from Notification 78/2020-Central Tax. Showing more digits than required is fine; fewer is not. If you are unsure which code fits, the [HSN codes practical guide](/blog/hsn-codes-practical-guide) explains how to pick one.

## Invoice numbering rules

Rule 46 requires a **consecutive serial number, not exceeding 16 characters**, in one or more series, using:

- letters (A–Z, a–z),
- numerals (0–9),
- the special characters hyphen (-) and slash (/) only.

The number must be **unique for a financial year**. In practice:

- You may run separate series, for example one per branch, per counter or for export invoices, as long as each number is unique for the year.
- Restarting the count from 1 on 1 April is common; including the year in the prefix (such as `26-27`) keeps numbers unique across years.
- Spaces, underscores, dots and `#` are not among the characters the rule allows, and portals that read the invoice number (such as the e-invoice and e-way bill systems) may reject them.
- Do not skip, reuse or manually "fix" numbers after issue. A cancelled invoice keeps its number; note it as cancelled rather than reissuing the same number.

Count the characters of your longest possible number before you settle on a prefix. `RPM/26-27/00412` is 15 characters; adding a branch code could push it over 16. The [invoice number generator](/tools/invoice-number-generator) helps you build a series that stays within the limit.

## When to issue the invoice (Section 31 and Rule 47)

| Supply | Time limit |
|---|---|
| Goods (where supply involves movement) | On or before removal of goods for supply |
| Goods (other cases) | On or before delivery of goods or making them available to the recipient |
| Services | Within 30 days of the date of supply |
| Services by banks, insurance companies, NBFCs and financial institutions | Within 45 days of the date of supply |

For goods, this means the invoice exists before the truck leaves. That matters for the e-way bill too, which is generated using the invoice number and date. Special timing rules apply to continuous supply of goods or services and to goods sent on approval; check Section 31 for those cases.

## How many copies (Rule 48)

| Supply | Copies | Marking |
|---|---|---|
| Goods | Triplicate | ORIGINAL FOR RECIPIENT, DUPLICATE FOR TRANSPORTER, TRIPLICATE FOR SUPPLIER |
| Services | Duplicate | ORIGINAL FOR RECIPIENT, DUPLICATE FOR SUPPLIER |

Where e-invoicing applies to you, the invoice is issued under Rule 48(4): its details are uploaded to the Invoice Registration Portal (IRP), which returns an IRN and a signed QR code. An invoice issued without following this process, when it should have been an e-invoice, is not treated as a valid invoice.

## E-invoicing threshold

E-invoicing is mandatory for businesses whose aggregate turnover in **any financial year from 2017-18 onwards** exceeds **₹5 crore** (the limit applicable from 1 August 2023). It covers B2B invoices, exports and certain other documents, and some categories of taxpayers are exempt. Use the [e-invoice applicability checker](/tools/einvoice-applicability-checker) for a first check, then confirm on the [e-invoice portal](https://einvoice1.gst.gov.in/).

As reported by GSTN, from 1 April 2025 taxpayers with AATO of ₹10 crore and above must report e-invoices to the IRP within 30 days of the invoice date; later reports are rejected.

A self-prepared PDF, including one from a template or an [invoice generator](/invoice-generator), is not an e-invoice. It becomes one only after it is reported to the IRP and gets an IRN.

## Signature

Rule 46 requires the **signature or digital signature** of the supplier or an authorised representative. A digital signature under the Information Technology Act is accepted. For e-invoices, the IRP digitally signs the invoice data and the QR code, which serves the purpose; check the current CBIC clarification if you rely on this.

## Small-value supplies: the ₹200 exception

Under Section 31(3)(b) and the proviso to Rule 46, a registered person need not issue a separate tax invoice where:

- the value of the supply is below ₹200,
- the recipient is unregistered, and
- the recipient does not ask for an invoice.

In that case you must issue a **consolidated tax invoice** for all such supplies at the close of each day. This suits retail counters; it does not remove the obligation altogether.

## When you do not charge GST: bill of supply

A **bill of supply** (Section 31(3)(c) and Rule 49) is issued instead of a tax invoice when:

- you supply **exempt** goods or services, or
- you are a **composition taxpayer**.

No tax is charged on it. It carries fewer particulars: supplier name, address and GSTIN; serial number (same 16-character rule); date; recipient name, address and GSTIN if registered; HSN; description; value; and signature. A composition taxpayer must also print **"composition taxable person, not eligible to collect tax on supplies"** at the top of the bill of supply.

## Taxable and exempt together: invoice-cum-bill of supply

If a registered person supplies both taxable and exempt goods or services to an **unregistered** person, Rule 46A allows a single **invoice-cum-bill of supply** for all of them, instead of two separate documents. Tax is shown only on the taxable lines.

### Tax invoice vs bill of supply vs invoice-cum-bill of supply

| Point | Tax invoice | Bill of supply | Invoice-cum-bill of supply |
|---|---|---|---|
| Rule | Rule 46 | Rule 49 | Rule 46A |
| Used for | Taxable supplies | Exempt supplies; all supplies by composition taxpayers | Taxable + exempt supplies together, to an unregistered person |
| GST charged | Yes | No | Only on the taxable items |
| Tax rate and amount columns | Required | Not shown | For taxable items |
| Buyer can claim input tax credit | Yes, if registered and conditions are met | No | Not applicable (buyer is unregistered) |
| Special wording | Reverse charge yes/no | Composition taxpayers: "composition taxable person, not eligible to collect tax on supplies" | — |
| Numbering | Up to 16 characters, unique per financial year | Same | Same |

If you are not GST-registered at all, you do not issue either document under GST; a plain bill or invoice without tax is used. The differences are covered in [invoice with GST vs without GST](/blog/invoice-with-gst-vs-without-gst), and the everyday terms in [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt).

## Corrections: revised invoices, credit and debit notes

**Revised invoice.** When registration is granted from an earlier effective date, Section 31(3)(a) read with Rule 53 lets you issue revised tax invoices for supplies made between the effective date and the date the registration certificate was issued. Check the current rule for the time limit.

**Credit and debit notes.** After an invoice is issued, you do not edit or replace it. If the taxable value or tax was charged too high, or goods are returned, you issue a **credit note**; if it was too low, a **debit note** (Section 34). Each note refers to the original invoice and must be reported in your return within the time Section 34 allows. Read the current section on [CBIC GST](https://cbic-gst.gov.in/) for the details.

Issuing an invoice without an actual supply, or failing to issue a correct invoice, attracts penalties under Section 122 of the CGST Act.

## Example (illustrative)

A Rajkot pipe manufacturer sells PVC pipes to a builder in Ahmedabad. Both are in Gujarat, so the supply is intra-state.

**Header**

| Field | Entry |
|---|---|
| Supplier | Rajkot pipe manufacturer, GIDC Shapar, Rajkot, Gujarat, GSTIN `24ABCDE1234F1Z5` |
| Invoice number | RPM/26-27/00412 (15 characters) |
| Invoice date | 06-11-2026 |
| Buyer | Ahmedabad builder, Ahmedabad, Gujarat, sample GSTIN `24PQRSX5678K1Z4` |
| Place of supply | Gujarat (24) |
| Ship to | Site address in Ahmedabad (differs from billing address) |
| Reverse charge | No |
| Copy | ORIGINAL FOR RECIPIENT |

**Line**

| Description | HSN | Qty | Unit | Rate | Taxable value | CGST 9% | SGST 9% | Total |
|---|---|---|---|---|---|---|---|---|
| PVC pipe 110 mm, 6 m | 3917 | 400 | NOS | ₹300 | ₹1,20,000 | ₹10,800 | ₹10,800 | ₹1,41,600 |

The footer carries the amount in words, bank details and the authorised signatory's signature. The rate here is for illustration only; check the current rate for your exact HSN. If the same pipes went to a buyer in Indore, the place of supply would be Madhya Pradesh and the tax would be IGST at 18% instead.

## Pre-issue checklist

- Your legal name, address and GSTIN are correct and current.
- The invoice number is the next one in the series, 16 characters or fewer, using only letters, numbers, `-` and `/`.
- The date is the actual date of issue, within the time limit for goods or services.
- The buyer's GSTIN is verified, and the name matches their registration.
- For an unregistered buyer at ₹50,000 or more, the delivery address with state name and code is shown.
- Every line has an HSN or SAC with the required number of digits.
- Quantity and unit are given for goods.
- Taxable value is after discount.
- The right tax applies: CGST + SGST/UTGST for intra-state, IGST for inter-state, plus cess if any.
- Place of supply is stated, and the ship-to address if different.
- The reverse charge line says yes or no.
- The document type is right: tax invoice, bill of supply or invoice-cum-bill of supply.
- If e-invoicing applies, the invoice is reported to the IRP and the IRN and QR code are on it.
- The invoice is signed (physically or digitally).
- The correct number of copies is printed and marked.

## Common mistakes

- **Invoice numbers longer than 16 characters**, or with spaces and other characters that are not allowed.
- **Reusing a number** across branches or across years without a distinguishing prefix.
- **Charging IGST on an intra-state sale** (or the other way round) because the place of supply was not checked. Correcting this takes a credit note and a fresh invoice, not an edit.
- **Wrong or unverified buyer GSTIN**, so the buyer's credit does not appear.
- **Too few HSN digits** for your turnover, or a generic code that does not match the goods.
- **Charging GST on a bill of supply**, or a composition dealer issuing a tax invoice.
- **Leaving out the reverse charge line** because tax is not payable on reverse charge. The rule asks you to state it either way.
- **Issuing the invoice after the goods leave**, then backdating it.
- **Treating a template PDF as an e-invoice** when your turnover requires e-invoicing.
- **Editing an issued invoice** instead of issuing a credit or debit note.
- **Confusing the invoice with other documents.** A delivery challan moves goods without a sale (see [delivery challan vs tax invoice](/blog/delivery-challan-vs-tax-invoice)), and an e-way bill records movement, not the sale (see [e-way bill vs sales invoice](/eway-bill-vs-sales-invoice)).

## Where E-Way Easy fits

If you just need to prepare an invoice, the free [online invoice generator](/invoice-generator) on this site works without sign-up, with or without GST, and downloads a PDF. Ready layouts are in the [sales invoice templates](/sales-invoice-templates), including a [GST tax invoice format](/sales-invoice-templates/gst-tax-invoice) and a [simple sales invoice](/sales-invoice-templates/simple-sales-invoice) for businesses that do not charge GST. If you prefer working in a spreadsheet, see the [Excel invoice formats](/invoice-format-excel). None of these generate an IRN.

For goods that move, the E-Way Easy Android app creates the sales invoice as part of the e-way bill workflow. Enter the buyer's GSTIN and their name, address, state and PIN fill in automatically; the road distance between PIN codes is filled for you; invoice numbers follow your own series; and the same invoice becomes the e-way bill after you review it. E-Way Easy is independent and not affiliated with the Government of India, GSTN or NIC.

## Official sources

Invoice rules are in Sections 31 and 34 of the CGST Act and Rules 46 to 49 and 53 of the CGST Rules, 2017, with parallel provisions in each state's SGST Act. Read the current text on [CBIC GST](https://cbic-gst.gov.in/), check notifications on [CBIC](https://www.cbic.gov.in/) and the [GST portal](https://www.gst.gov.in/), and confirm e-invoicing requirements on the [e-invoice portal](https://einvoice1.gst.gov.in/).
