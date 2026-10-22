---
title: "How Distance Affects E-Way Bill Validity"
slug: "how-distance-affects-eway-bill-validity"
excerpt: "Distance decides how many days your e-way bill lasts. Learn how the portal calculates PIN-to-PIN distance, the 10% allowance, same-PIN rules and how to avoid short validity."
category: "eway-bill"
tags: ["e-way bill", "distance", "validity", "PIN code"]
publishedAt: "2026-08-10"
updatedAt: "2026-10-08"
verifiedAt: "2026-10-10"
seoTitle: "How Distance Affects E-Way Bill Validity (PIN Rules)"
metaDescription: "How distance sets e-way bill validity: PIN-to-PIN auto distance, 10% extra allowance, 4,000 km cap, same-PIN 100 km rule and worked examples."
imageAlt: "Map with two PIN code markers joined by a route line, with a distance label and a validity counter in days"
sources:
  - title: "E-Way Bill System (official portal)"
    url: "https://ewaybillgst.gov.in/"
  - title: "E-Way Bill user documentation"
    url: "https://docs.ewaybillgst.gov.in/"
  - title: "CBIC GST (CGST Rules, Rule 138)"
    url: "https://cbic-gst.gov.in/"
faq:
  - q: "Can I enter any distance I want?"
    a: "No. The portal calculates the PIN-to-PIN distance and allows you to enter up to 10% more than that figure. Higher entries are not accepted."
  - q: "What if dispatch and delivery are in the same PIN code?"
    a: "For movement within the same PIN code, you can enter a distance of up to 100 km."
  - q: "Can I change the distance after generation?"
    a: "Distance is part of the generated bill and cannot be edited. If it is materially wrong, cancel within 24 hours and generate again."
related: ["what-to-do-when-eway-bill-expires"]
---
Two numbers decide how long your e-way bill stays valid: the time you generate it and the distance you enter. Time of generation is covered in [E-Way Bill Validity Explained](/eway-bill-validity). This article is about distance — how the portal works it out, how much you can adjust it, and why a careless PIN code can leave your truck with one day less than it needs.

## Why distance matters

Under Rule 138(10), validity for normal cargo is **1 day for every 200 km or part thereof** (for over-dimensional cargo, 1 day per 20 km). So validity changes in steps:

| Distance (normal cargo) | Days of validity |
|---|---|
| 1 – 200 km | 1 |
| 201 – 400 km | 2 |
| 401 – 600 km | 3 |
| 601 – 800 km | 4 |
| 801 – 1,000 km | 5 |

Crossing a 200 km boundary adds a full day. Falling just below one takes a day away.

## How the portal calculates distance

The e-way bill system calculates the distance between the **dispatch-from PIN code** and the **ship-to PIN code**, and shows it as a suggestion when you generate.

The rules the portal applies, as described in its documentation:

- You may enter an actual distance up to **10% more** than the auto-calculated PIN-to-PIN distance (to allow for real road routes, diversions and so on).
- The maximum distance that can be entered is **4,000 km**.
- Where the dispatch and delivery PIN codes are the **same**, you can enter a distance of up to **100 km**.

Check the current limits in the [user documentation](https://docs.ewaybillgst.gov.in/), as validations can be revised.

## Example (illustrative): the 10% allowance and a day boundary

A Morbi ceramic tile unit ships tiles to a dealer. The portal calculates PIN-to-PIN distance as **380 km**.

- Maximum distance allowed = 380 + 10% = **418 km**
- At 380 km → 380 ÷ 200 = 1.9 → **2 days**
- At 418 km → 418 ÷ 200 = 2.09 → **3 days**

If the transporter's actual road route is 410 km (a highway diversion through a toll route, say), entering 410 km is both truthful and within the 10% allowance, and it gives 3 days instead of 2.

Entering more than the real route distance just to gain a day is not appropriate — the allowance exists for genuine route differences, and you should be able to justify the figure.

## Example (illustrative): wrong PIN, short validity

A Ludhiana bicycle parts supplier ships to a buyer whose registered office is in one city but whose warehouse, where goods are actually delivered, is in an industrial area further away.

- Distance using the buyer's office PIN: **390 km** → 2 days
- Distance using the actual warehouse PIN: **425 km** → 3 days

Using the office PIN gives the truck 2 days for a trip that legitimately needs 3.

The ship-to PIN must be where goods are actually delivered. Using the billing address PIN is one of the most common causes of short validity — and it also misstates the place of delivery in Part A.

(Distances in these examples are illustrative.)

## Where distance goes wrong

### Dispatch from a different location

Your GSTIN may be registered at your office, but goods leave from a factory or godown. Use the PIN of the actual dispatch location. If that location is an additional place of business, make sure it is registered on your GST registration.

### Bill-to and ship-to are different

In bill-to/ship-to transactions, the distance must be to the ship-to PIN.

### Transporter's godown legs

For movements where goods go first to a transporter's godown and then onward, the e-way bill should reflect the full movement from consignor to consignee. Within the same state, the first leg up to 50 km to the transporter's place doesn't need Part B — but the e-way bill itself, with Part A, still applies.

### Rail, air and ship

For multimodal movements, the distance is the overall movement distance. Road legs before and after still count. Check the documentation for how the portal treats each mode.

## What if distance turns out to be wrong?

- **Before goods move, within 24 hours:** cancel and generate a fresh e-way bill with the correct distance. Distance cannot be edited on a generated bill.
- **In transit, running late:** if exceptional circumstances apply (accident, calamity, law and order, trans-shipment), extend validity within 8 hours before or after expiry. The portal will ask for current location and remaining distance.
- **Already expired, outside the window:** see [What to Do When an E-Way Bill Expires](/blog/what-to-do-when-eway-bill-expires).

## Common mistakes

1. **Using registered office PIN** instead of the actual dispatch location.
2. **Using billing address PIN** instead of the delivery location.
3. **Accepting the suggestion blindly** when the actual route is genuinely longer — losing a day you were entitled to.
4. **Padding distance beyond the real route** — the 10% is an allowance for real routes, not a buffer.
5. **Forgetting the day boundaries.** Know where 200, 400, 600 km fall for your common routes.
6. **Not rechecking after a delivery address change.** If the buyer changes the delivery site, the e-way bill must reflect it.

## Make distance part of invoicing

The cleanest fix is to settle the PIN codes and distance when the invoice is raised. In the E-Way Easy app, the buyer's PIN fills from their GSTIN, and distance is calculated automatically from PIN codes — you can edit it manually if the actual route is longer. You can also check a route with the free [distance calculator](/tools/distance-calculator) before dispatch.

## Official sources

The validity rule is in Rule 138(10) of the CGST Rules on [CBIC GST](https://cbic-gst.gov.in/). Distance validations (10% allowance, maximum distance, same-PIN rule) are described in the [E-Way Bill user documentation](https://docs.ewaybillgst.gov.in/) and on the [E-Way Bill System](https://ewaybillgst.gov.in/).
