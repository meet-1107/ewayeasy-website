---
title: "How to Make a GST Invoice on Your Phone (Free, Step by Step)"
slug: "how-to-make-gst-invoice-on-mobile"
excerpt: "Create a GST invoice on your Android phone with the E-Way Easy app: GSTIN auto-fill, saved products with HSN, automatic tax split and an optional e-way bill."
category: "invoicing"
tags: ["gst invoice on mobile", "invoice maker app", "android", "e-way easy app", "gst invoice"]
publishedAt: "2026-11-06"
updatedAt: "2026-11-06"
verifiedAt: "2026-11-06"
seoTitle: "How to Make a GST Invoice on Mobile (Free, Step by Step)"
metaDescription: "Make a GST invoice on your phone, step by step: add your GSTIN, auto-fill buyer details, pick products with HSN, preview and continue to the e-way bill."
imageAlt: "Android phone showing a GST invoice screen with buyer GSTIN, product lines with HSN codes and CGST and SGST totals"
sources:
  - title: "CBIC GST (Acts and Rules)"
    url: "https://cbic-gst.gov.in/"
  - title: "GST portal"
    url: "https://www.gst.gov.in/"
  - title: "CBIC"
    url: "https://www.cbic.gov.in/"
faq:
  - q: "Can I make a GST invoice on my phone for free?"
    a: "Yes. Creating invoices in the E-Way Easy Android app is free. Credits are used only for e-way bill actions, such as generating or cancelling an e-way bill."
  - q: "How much does an e-way bill cost in the app?"
    a: "Each e-way bill action uses 5 credits, and 1 credit equals ₹1. If the portal rejects the request, the credits are refunded to your wallet automatically."
  - q: "Do I have to type the buyer's address every time?"
    a: "No. Enter the buyer's GSTIN and their name, address, state and PIN fill automatically. Buyers you have billed before are saved for next time."
  - q: "Can I make an invoice for an unregistered buyer on mobile?"
    a: "Yes. Leave the buyer GSTIN empty and enter the buyer's name, address, state and PIN yourself. Check the state carefully, because it decides whether CGST + SGST or IGST applies."
  - q: "Is there an iPhone version of the app?"
    a: "The E-Way Easy app is available for Android. On any other device, you can use the free online invoice generator in your phone's browser."
  - q: "Can the app read an invoice I already made elsewhere?"
    a: "Yes. Import PDF reads the buyer, GSTIN, items, HSN codes and totals from an existing invoice PDF. You review and correct the extracted details before generating."
related: ["how-eway-easy-simplifies-eway-bill-workflow", "invoice-with-gst-vs-without-gst", "gstin-verification-what-to-check"]
---
> **Quick answer:** Install the E-Way Easy Android app, add your business GSTIN once, then create an invoice: enter the buyer's GSTIN to fill their name and address, pick saved products so HSN fills in, and the app works out CGST + SGST or IGST. Preview the invoice, and continue to the e-way bill only if the goods need one. Creating invoices is free; credits are used only for e-way bill actions.

Most small traders already run their business from a phone: orders come on WhatsApp, payments on UPI. The invoice is often the one step that still waits for a computer or a printed bill book. This guide shows how to make a GST invoice entirely on an Android phone, using the E-Way Easy app, and what to check before you send it.

If you only need a one-off bill and do not want to install anything, skip to the last section on the free online generator.

## Before you start

You need:

- An Android phone with the E-Way Easy app (see [download](/download))
- Your business GSTIN
- The buyer's GSTIN, if they are registered
- Your product names, HSN codes and GST rates

The app is built for GST-registered traders, manufacturers, wholesalers and distributors. If you are not registered, you should not be charging GST at all; read [invoice with GST vs without GST](/blog/invoice-with-gst-vs-without-gst) first.

## Step-by-step: making the invoice

The create-invoice flow has three stages: **1 Invoice → 2 Review EWB → 3 Generated**. The invoice itself is built in stage 1; stages 2 and 3 are where the e-way bill is reviewed and generated from it.

### Step 1: Add your business once

Sign up with email or Google and add your business GSTIN. Your seller details are saved and appear on every invoice, so you do not retype them. The dashboard then shows your business name and GSTIN, total sales for the financial year, invoice and e-way bill counts, and recent activity.

### Step 2: Start a new invoice and enter the buyer

Open create invoice. In the buyer section, type the buyer's GSTIN. Their **name, address, state and PIN fill automatically**. Check them against what the buyer has told you; a mismatch is a sign the GSTIN may be wrong.

If the buyer is not registered, leave the GSTIN empty and enter their details by hand. Buyers are saved to your buyers list, so a repeat customer is one tap next time.

### Step 3: Add products

Pick items from your saved products using search. The **HSN code fills from the product**, and you can edit it if needed. Enter quantity and rate for each line. If a product is new, add it once and it is saved for future invoices.

Keep your product list accurate. A wrong rate saved once becomes a wrong rate on every invoice that uses it.

### Step 4: Let the tax split work itself out

The app works out the tax from the buyer's state and your state:

- **Same state:** CGST + SGST, each at half the rate
- **Different states:** IGST at the full rate

For the arithmetic behind this, including discounts and mixed rates, see [how to calculate GST on a sales invoice](/blog/how-to-calculate-gst-on-sales-invoice) and [CGST vs SGST vs IGST explained](/blog/cgst-sgst-igst-explained).

### Step 5: Check the invoice number

Invoice numbers follow your own series, numbered automatically. Set your prefix to match your existing books so there are no gaps or duplicates in the financial year. If you are deciding on a format, try the [invoice number generator](/tools/invoice-number-generator).

### Step 6: Preview

Preview the invoice before saving. This is where you catch the errors that matter: buyer GSTIN, HSN, quantity, rate, tax type and total. Invoices can also carry your bank details for payment.

### Step 7 (if goods are moving): Continue to the e-way bill

If the consignment needs an e-way bill, continue to **Review EWB**. The **road distance between the two PIN codes fills automatically**, and you can edit it. Review the details, generate, and the e-way bill number is returned on the **Generated** screen. Bills are filed on the official e-way bill system through an authorised GSP, using your own portal API login, which you connect once in the app. See [e-way bill generation](/eway-bill-generation) for the rules behind each field.

## Example (illustrative): an inter-state invoice on a phone

A Rajkot pipe manufacturer (sample GSTIN `24ABCDE1234F1Z5`) sells to a dealer in Indore (sample GSTIN `23FGHIJ6789L1Z2`).

| Field | What happens in the app |
|---|---|
| Buyer GSTIN | Typed in; name, address, Madhya Pradesh and PIN fill automatically |
| Product | "PVC pipe 4 inch" picked from saved products; HSN fills from the product |
| Quantity × rate | 500 × ₹180 = ₹90,000 |
| Tax | Different states, so IGST at an illustrative 18% = ₹16,200 |
| Invoice total | ₹1,06,200 |
| Invoice number | Next number in the manufacturer's own series |
| E-way bill | Value is above the general ₹50,000 threshold, so the manufacturer continues to Review EWB; Rajkot-to-Indore road distance fills from PIN codes |

Cost for this invoice: nothing. Cost for the e-way bill: 5 credits (₹5). *Rates are for illustration only.*

## Already have the invoice as a PDF?

If your invoice was made in accounting software or by a colleague, use **Import PDF** on the dashboard. The app reads the buyer, GSTIN, items, HSN codes and totals from the PDF. Review and correct what it extracted before you generate; layouts vary and you are responsible for the final details.

## What it costs

| Action | Cost |
|---|---|
| Creating invoices | Free |
| Generate an e-way bill | 5 credits |
| Update Part-B (vehicle), cancel, extend validity, consolidated EWB | 5 credits each |
| Portal rejects the request | Credits refunded to wallet automatically |

1 credit = ₹1. Credits are pay-as-you-go with no yearly subscription; buy packs or any amount through Razorpay (UPI, cards, net banking). Full details are on the [pricing page](/pricing).

## Mistakes to avoid on mobile

- **Accepting auto-filled details without reading them.** GSTIN auto-fill saves typing, but check the name and state. If you are unsure, verify the number with the [GSTIN validator](/tools/gstin-validator).
- **Editing HSN or rate on one invoice and forgetting the product master.** Fix it in the saved product so the next invoice is right.
- **Typing a GSTIN for an unregistered buyer.** If the buyer has no GSTIN, leave the field empty rather than entering a guess.
- **Skipping the preview.** Small screens hide mistakes. Scroll the full preview before saving.
- **Changing the distance beyond what the rules allow.** The auto-filled distance can be edited, but the portal limits how far it can be increased. Check with the [distance calculator](/tools/distance-calculator).
- **Breaking your number series** by starting a new prefix halfway through the year.
- **Charging GST when you should not.** Composition dealers and unregistered sellers do not charge GST.

## Web generator vs E-Way Easy app

| Point | Free web generator | E-Way Easy app |
|---|---|---|
| Sign-up | Not needed | Email or Google sign-in |
| Output | Invoice PDF | Invoice, with optional e-way bill |
| With / without GST | Switch between both | GST invoices for registered businesses |
| Buyer details | Typed by hand | GSTIN auto-fills name, address, state, PIN |
| Saved buyers and products | No | Yes, with HSN from product |
| Road distance | Not applicable | Filled from PIN codes, editable |
| Invoice to e-way bill | No | Yes, in one flow |
| Best for | One-off bills, non-GST bills, any device | Regular GST sellers who move goods |

See all app [features](/features) for the full list.

## No app? Use the free online generator

If you are on an iPhone, a shared computer, or just need one bill today, open our [free invoice generator](/invoice-generator) in your phone's browser. Switch With GST or Without GST, fill in the seller, buyer and items, and download a PDF. No sign-up. If you prefer a fixed layout, the [GST tax invoice template](/sales-invoice-templates/gst-tax-invoice) also works on mobile.

## Official sources

Tax invoice particulars are set out in Section 31 of the CGST Act and Rule 46 of the CGST Rules, 2017; see [cbic-gst.gov.in](https://cbic-gst.gov.in/) and the [GST portal](https://www.gst.gov.in/). E-way bill rules are on [ewaybillgst.gov.in](https://ewaybillgst.gov.in/). E-Way Easy is independent and not affiliated with the Government of India, GSTN or NIC.
