// Metadata variants for pages with high impressions and average position 1–20 (Search Console, 28 days to 23 Nov 2026).
// Run: node scripts/metadata-variants.mjs  → writes docs/metadata-register.md and checks lengths.
// Rendered title = title + " | E-Way Easy" when the title lacks the brand and the total stays within 65 characters
// (same rule as pageMeta in src/lib/seo.ts).
import fs from 'node:fs';

const SUFFIX = ' | E-Way Easy';
const rendered = (t) => (!t.includes('E-Way Easy') && t.length + SUFFIX.length <= 65 ? t + SUFFIX : t);

const V = ['Search relevance', 'Customer benefit', 'High-CTR creative', 'Commercial intent', 'Balanced SEO + brand'];

export const PAGES = [
  {
    url: '/', type: 'Homepage (SaaS app)', gsc: '501 impr · pos 8.4 · CTR 1.8%',
    primary: 'easy e-way bill app', secondary: ['e-way bill app', 'generate e-way bill on mobile', 'easy way bill'],
    intent: 'Navigational + commercial. Many "easy way bill / login" searchers want the official portal; the rest want an easier app.',
    weak: 'Title is long (62) and leads with the brand instead of the words people type ("easy e way bill"). Nothing tells portal-seekers this is an app, so they bounce or skip.',
    v: [
      ['Easy E-Way Bill App: Generate GST E-Way Bills on Mobile', 'Generate GST e-way bills on your phone with E-Way Easy: free invoice, PDF import, Part B update, extend and cancel. Pay ₹5 only when a bill succeeds.', 84],
      ['E-Way Bill on Your Phone in 3 Steps, ₹5 per Bill', 'Make the GST invoice, review Part A and B, tap Generate. E-Way Easy files on the official system via an authorised GSP. Free invoices, no subscription.', 80],
      ['Easy E-Way Bill: The App, Not Another Portal Login', 'Skip the desktop portal routine. E-Way Easy turns your GST invoice into an e-way bill from Android, ₹5 each. For the government login, use ewaybillgst.gov.in.', 82],
      ['E-Way Bill App for Traders: Pay ₹5 Only on Success', 'Generate, update Part B, extend, cancel and consolidate e-way bills from Android. Credits from ₹50, no yearly plan, refunded if the portal rejects.', 78],
      ['Easy E-Way Bill App for Android', 'Generate GST e-way bills from your phone: free invoice, PDF import, Part B, extend, cancel. ₹5 only on success. Not the govt portal: that is ewaybillgst.gov.in.', 88],
    ],
    pick: 4,
    why: 'Puts the exact phrase people type ("easy e-way bill") first, keeps the brand via the suffix, and the description is honest with portal-seekers, so the clicks we get are people who want the app.',
  },
  {
    url: '/eway-bill-correction', type: 'Guide', gsc: '972 impr · pos 4.5 · CTR 0.8%',
    primary: 'e-way bill edit / correction', secondary: ['how to edit e way bill part a', 'can eway bill be edited', 'eway bill edit option', 'change place of delivery'],
    intent: 'Informational, urgent: a mistake was made and the truck may be waiting.',
    weak: 'Title is accurate but passive ("what you can and cannot change"). Searchers type "edit" and "edit option"; the title says "correction" only.',
    v: [
      ['E-Way Bill Edit Option: How to Correct Part A and B', 'There is no edit button for Part A: cancel within 24 hours and generate again. Vehicle, transporter and validity can be updated. Fix for each mistake inside.', 83],
      ['Wrong Details in Your E-Way Bill? Fix It in 24 Hours', 'Wrong GSTIN, date, value or delivery PIN? Cancel within 24 hours and regenerate. Wrong vehicle? Update Part B any time during validity. Step-by-step fixes.', 85],
      ['Can You Edit an E-Way Bill? No, but Here Is the Fix', 'Part A is locked once generated, so the fix is cancel-and-regenerate within 24 hours. Part B, transporter and validity can change. See the decision table.', 87],
      ['Edit E-Way Bill Details: Cancel, Regenerate or Update', 'Pick the right route for each mistake: update Part B, change transporter, extend, or cancel and regenerate. Do all of it from your phone in the E-Way Easy app.', 76],
      ['How to Edit an E-Way Bill: Part A and Part B Fixes', 'Part A cannot be edited: cancel within 24 hours and generate again. Vehicle, transporter and validity can be updated. A fix for every common mistake.', 89],
    ],
    pick: 4,
    why: 'Matches the dominant queries ("how to edit e way bill part a", "edit option") word for word, and the description answers the question in the first sentence, which is what an urgent searcher scans for.',
  },
  {
    url: '/eway-bill-common-errors', type: 'Guide', gsc: '676 impr · pos 6.5 · CTR 0.4%',
    primary: 'e-way bill errors', secondary: ['e way bill error 702', 'invalid gstin e way bill', 'distance error e way bill', 'error code 604'],
    intent: 'Troubleshooting: the user is staring at an error message.',
    weak: 'Generic title. Error searchers type codes and exact messages; the title shows none. Description lists problems but no codes.',
    v: [
      ['E-Way Bill Errors and Fixes: 702, 604, Invalid GSTIN', 'Fix common e-way bill errors fast: distance error 702, duplicate 604, invalid GSTIN, tax mismatch, Part B missing. Each code checked against the official list.', 88],
      ['E-Way Bill Rejected? Find Your Error and the Fix', 'Look up the message you see: invalid GSTIN, distance more than allowed (702), bill already generated (604), totals mismatch. A plain fix under each one.', 84],
      ['That E-Way Bill Error Means This: Codes 702, 604 & More', 'Error codes in plain words, checked on the official API list: what 702, 604 and invalid-GSTIN errors mean, why they happen and the exact fix for each.', 83],
      ['Stop E-Way Bill Errors Before They Happen', 'Most rejections come from a wrong GSTIN, duplicate document or distance over 10%. See the fixes, and how GSTIN autofill and PIN distance avoid them.', 72],
      ['E-Way Bill Error Codes: 702, 604, GSTIN and Fixes', 'Plain fixes for e-way bill errors: distance code 702, duplicate code 604, invalid GSTIN, tax mismatch and Part B missing, checked on the official code list.', 87],
    ],
    pick: 4,
    why: 'Error searchers scan for their code. Showing 702 and 604 (both covered and verified on the page) signals "your exact error is here"; "checked on the official code list" adds credibility vendor docs lack.',
  },
  {
    url: '/blog/eway-bill-part-a-and-part-b-explained', type: 'Blog', gsc: '612 impr · pos 5.9 · CTR 0.7%',
    primary: 'part b of e way bill', secondary: ['part a and part b of e way bill', 'part a eway bill', 'part a validity', 'document type in e way bill'],
    intent: 'Informational: what goes in each part and why Part B matters.',
    weak: '"(EWB-01)" adds noise; most searchers type "part b of e way bill". Description is fine but does not answer the core question.',
    v: [
      ['Part A and Part B of E-Way Bill Explained', 'Part A holds invoice, GSTIN, HSN and PIN details; Part B holds the vehicle or transport document. Who fills each part and when Part B is required.', 85],
      ['What Goes in Part B of an E-Way Bill (and Part A)', 'Part B is the vehicle or LR number, and without it the bill is not valid for movement. Every field, the 50 km relief and how to update a vehicle.', 84],
      ['Part B Missing? Why Your E-Way Bill Is Not Valid Yet', 'An e-way bill is valid for movement only once Part B is filled, and validity starts from then. What each part contains, who fills it and the 50 km exception.', 80],
      ['Part A and Part B: Fill Them Right the First Time', 'The fields that cause most rejections sit in Part A, and Part B decides validity. A field-by-field guide, plus how to update Part B from your phone.', 74],
      ['Part A and Part B of E-Way Bill: Fields and Rules', 'Part A carries invoice, GSTIN, HSN and PIN details; Part B the vehicle or transport document. Who fills each, when Part B is needed, and the 50 km relief.', 89],
    ],
    pick: 4,
    why: 'Keeps both "part a" and "part b" in the title (both queried), drops the code clutter, and the description gives the one-line answer that the snippet can carry.',
  },
  {
    url: '/', skip: true,
  },
  {
    url: '/bulk-eway-bill-generation', type: 'Guide', gsc: '459 impr · pos 9.7 · CTR 0.4%',
    primary: 'bulk e way bill generation tool', secondary: ['bulk e way bill generation tool download', 'bulk e way bill excel format', 'new version bulk tool', 'excel to json converter'],
    intent: 'Task: find and use the official Excel tool (many want the download).',
    weak: 'Title says "complete guide (2026)": generic, and misses "tool", the word in almost every query.',
    v: [
      ['Bulk E-Way Bill Generation Tool: Excel Format to JSON', 'Where to download the official bulk generation tool, how to fill the Excel format, convert it to JSON and upload it, plus fixes for rejected rows.', 88],
      ['Generate Bulk E-Way Bills: Excel Tool, Step by Step', 'Fill one Excel sheet, convert to JSON with the official tool, upload once. Steps, the data checks that prevent rejections, and how to retry safely.', 82],
      ['Bulk E-Way Bill Tool: Get the Latest Version Right', 'Old templates cause failed uploads. Get the latest official bulk generation tool from the portal, fill the Excel format correctly and convert it to JSON.', 80],
      ['Bulk E-Way Bill Upload: Excel Format and Free Checker', 'Prepare the bulk upload Excel, convert it with the official tool and check your rows first with our free bulk data checker: GSTIN, HSN, PIN and duplicates.', 81],
      ['Bulk E-Way Bill Generation Tool: Excel to JSON Guide', 'Download the official bulk generation tool, fill the Excel format, convert to JSON and upload on the portal. Data checks and rejected-row fixes.', 90],
    ],
    pick: 4,
    why: '"Tool", "Excel" and "JSON" cover the download, format and converter queries. It points to the official tool (no false "download here" promise) and keeps a clear benefit.',
  },
  {
    url: '/blog/eway-bill-limit-50000-threshold-exceptions', type: 'Blog', gsc: '372 impr · pos 5.4 · CTR 0.3%',
    primary: 'e way bill limit', secondary: ['e way bill value limit including gst', '50000 e way bill rule', 'e way bill exemption'],
    intent: 'Informational: "do I need an e-way bill for this consignment?"',
    weak: 'Title is 67 characters and truncates. The most common doubt (is GST included?) is not answered in the snippet.',
    v: [
      ['E-Way Bill Limit ₹50,000: Calculation and Exceptions', 'The ₹50,000 test uses consignment value including GST. How to calculate it, state limits for intra-state moves, and cases needing an e-way bill at any value.', 84],
      ['Is GST Included in the ₹50,000 E-Way Bill Limit?', 'Yes: consignment value is taxable value plus GST, minus exempt items on the same invoice. Worked examples, state limits and when value does not matter.', 82],
      ['₹49,000 Invoice, E-Way Bill Needed? Check the Limit', 'Below ₹50,000 on taxable value can still cross it once GST is added. Calculate consignment value correctly, plus state limits and value-free cases.', 80],
      ['E-Way Bill Limit Check: Free Eligibility Calculator', 'Not sure if a consignment needs an e-way bill? Learn the ₹50,000 rule with GST included, state limits and exceptions, then test yours with the free checker.', 78],
      ['E-Way Bill Limit ₹50,000: GST Included? Exceptions', 'Yes, the ₹50,000 test uses value including GST. How to calculate consignment value, state limits for intra-state moves and cases needing a bill at any value.', 88],
    ],
    pick: 4,
    why: 'Fixes truncation, and turns the biggest doubt behind "value limit including gst" into the hook, answered in the first word of the description.',
  },
  {
    url: '/blog/what-to-do-when-eway-bill-expires', type: 'Blog', gsc: '369 impr · pos 7.5 · CTR 0.8%',
    primary: 'e way bill expired what to do', secondary: ['e way bill validity expired after 24 hours', 'extend e way bill after expiry', 'e way bill expired'],
    intent: 'Urgent problem: the bill has expired or is about to, goods in transit.',
    weak: 'Title is 63 with brand. It hints at the answer but the 8-hour window, the key fact, is buried.',
    v: [
      ['E-Way Bill Expired? What to Do and How to Extend', 'You can extend from 8 hours before to 8 hours after expiry. Steps on the portal, who can extend, the 360-day cap, and what to do once the window has passed.', 84],
      ['E-Way Bill Expired: You May Still Have 8 Hours', 'Extension is allowed up to 8 hours after expiry. How to extend, the reason and distance to enter, who can do it, and your options if the window has closed.', 88],
      ['E-Way Bill Expired in Transit? Act Within 8 Hours', 'Do not move goods on an expired bill. Extend within 8 hours of expiry on the portal or in the app; past that, here is what you can still do and what to avoid.', 85],
      ['Extend an Expiring E-Way Bill From Your Phone', 'Get alerted by the clock, not the checkpoint: extend validity within the 8-hour window from the E-Way Easy app, ₹5 on success. Rules and steps inside.', 70],
      ['E-Way Bill Expired? Extend It Within 8 Hours', 'Validity can be extended from 8 hours before to 8 hours after expiry. Steps, who can extend, the 360-day cap and what to do once the window has passed.', 87],
    ],
    pick: 1,
    why: '"You may still have 8 hours" answers the panic in "expired after 24 hours" and gives a precise, true reason to click, without urgency tricks.',
  },
  {
    url: '/eway-bill-cancellation', type: 'Guide', gsc: '340 impr · pos 9.5 · CTR 0%',
    primary: 'how to cancel e way bill', secondary: ['cancel e way bill after 24 hours', 'e way bill cancellation time limit', 'cancel e way bill after 10 days'],
    intent: 'Task: cancel a bill, often after the time limit.',
    weak: 'Zero clicks at position 9.5. The title covers the rule but not the "after 24 hours" situation that many searchers are in.',
    v: [
      ['How to Cancel an E-Way Bill: 24-Hour Rule and After', 'Cancel within 24 hours of generation if goods have not moved and it is not verified. After that, only the recipient can reject it. Steps and options inside.', 85],
      ['Cancel an E-Way Bill in 4 Steps (Within 24 Hours)', 'Steps to cancel on the portal, who can cancel, when it is blocked, and what the invoice needs after you cancel. Missed 24 hours? See the recipient route.', 80],
      ['Missed the 24 Hours? How E-Way Bill Cancellation Works', 'Cancellation closes 24 hours after generation. Before that, cancel in a few steps; after it, the recipient can reject within 72 hours. Both routes explained.', 84],
      ['Cancel E-Way Bills From Your Phone, ₹5 on Success', 'Cancel within 24 hours in the E-Way Easy app, or follow the portal steps. Who can cancel, when it is blocked and what to do with the invoice after.', 70],
      ['Cancel E-Way Bill: Within 24 Hours and After It', 'Cancel within 24 hours of generation if goods have not moved. After that, only the recipient can reject it within 72 hours. Steps, limits and next moves.', 86],
    ],
    pick: 0,
    why: 'Keeps the high-volume "how to cancel" phrasing and adds "and after", the case most zero-click searchers are in; the description gives both routes at a glance.',
  },
  {
    url: '/blog/eway-bill-returns-and-special-transactions', type: 'Blog', gsc: '270 impr · pos 4.3 · CTR 1.1%',
    primary: 'skd ckd e way bill', secondary: ['sales return e way bill', 'return eway bill process', 'line sale in eway bill', 'e way bill for exhibition'],
    intent: 'Informational: how to document an unusual movement.',
    weak: 'SKD/CKD drives the most queries but is not in the title; "bill-to-ship-to" takes the space instead.',
    v: [
      ['E-Way Bill for Sales Returns, SKD/CKD and Line Sales', 'How to move goods back on a sales return, ship SKD/CKD lots on one invoice, run line sales, send goods on approval or to exhibitions, with mistakes to avoid.', 86],
      ['SKD/CKD, Returns, Exhibitions: E-Way Bill Rules', 'Every movement needs its own e-way bill once over the limit. See the right document and reason for returns, lots, approval, line sales and exhibitions.', 80],
      ['Sending a Machine in Lots? E-Way Bill for SKD/CKD', 'The invoice is issued once, each lot moves on a challan with an invoice copy, the original goes with the last lot. Plus returns, line sales and exhibitions.', 82],
      ['Special E-Way Bill Cases Without the Guesswork', 'Returns, SKD/CKD lots, line sales, approval and exhibition goods: the document, reason and who generates for each, in one summary table.', 74],
      ['E-Way Bill for Returns, SKD/CKD Lots and Line Sales', 'Which document and reason to use for sales returns, SKD/CKD lots, line sales, supply on approval and exhibitions, with a summary table and common mistakes.', 87],
    ],
    pick: 4,
    why: 'Brings SKD/CKD and returns into the title, the two query clusters this page actually wins, and promises the summary table the page has.',
  },
  {
    url: '/documents-required-for-eway-bill', type: 'Guide', gsc: '239 impr · pos 4.6 · CTR 1.7%',
    primary: 'documents required for e way bill', secondary: ['what documents are needed to generate an e-way bill', 'documents driver must carry'],
    intent: 'Checklist before generating or dispatching.',
    weak: 'Already performs reasonably. Description can add the "driver carries" angle more clearly.',
    v: [
      ['Documents Required for E-Way Bill: Full Checklist', 'Everything you need to generate an e-way bill: invoice or challan, GSTINs, HSN, PINs, Transporter ID, vehicle number, plus what the driver must carry.', 86],
      ['What You Need Before Generating an E-Way Bill', 'One checklist for the invoice, GSTINs, HSN codes, PIN codes, transporter ID and vehicle number, and the papers the driver must have in the truck.', 80],
      ['E-Way Bill Documents: What the Driver Must Carry', 'The invoice, bill of supply or challan plus the e-way bill as print, number or RFID. And the data you need before you generate. Checklist inside.', 80],
      ['E-Way Bill Checklist: Data, Documents, Driver Copy', 'Have the invoice, GSTINs, HSN, PINs and vehicle ready and the e-way bill takes minutes. Full checklist, plus what the driver must carry on the road.', 78],
      ['Documents Required for E-Way Bill: Full Checklist', 'Invoice or challan, GSTINs, HSN, PIN codes, Transporter ID and vehicle number, plus what the driver must carry: the full e-way bill checklist in one place.', 88],
    ],
    pick: 4,
    keepTitle: true,
    why: 'Title already matches the main query, so it stays (preserve what works). Only the description is tightened.',
  },
  {
    url: '/eway-bill-rules', type: 'Guide', gsc: '204 impr · pos 10.7 · CTR 2.0%',
    primary: 'rule 138 of the cgst rules 2017', secondary: ['rule 138', 'e way bill rules', 'rule 138(12)', 'gst rule 138 in hindi'],
    intent: 'Legal reference: what Rule 138 says, in plain words.',
    weak: 'Most clicks come from "rule 138 of the cgst rules 2017", which the title only half matches.',
    v: [
      ['Rule 138 of CGST Rules 2017: E-Way Bill Rules Explained', 'Rule 138 in plain words: the ₹50,000 consignment value, who generates, Part A and B, validity, cancellation, Annexure exemptions and penalties, with sources.', 88],
      ['E-Way Bill Rules (Rule 138) in Plain English', 'What Rule 138 actually requires: when you need an e-way bill, who generates it, how long it is valid and what happens if you skip it. Official sources linked.', 82],
      ['Rule 138 Decoded: Every E-Way Bill Rule on One Page', 'Threshold, consignment value, who generates, Part A/B, 50 km relief, validity, cancellation, exemptions and penalties: Rule 138 simplified with sources.', 80],
      ['Rule 138 E-Way Bill Rules for Traders and Transporters', 'The parts of Rule 138 that affect daily dispatch: value test, generation, Part B, validity and cancellation, explained for businesses, with official links.', 78],
      ['Rule 138 of CGST Rules 2017: E-Way Bill Rules', 'Rule 138 in plain words: the ₹50,000 consignment value, who generates, Part A and B, validity, cancellation, Annexure exemptions and penalties, with sources.', 88],
    ],
    pick: 4,
    why: 'Exact match for the top query, short enough to keep the brand suffix; description unchanged in substance because it already lists what people look for.',
  },
  {
    url: '/blog/how-to-update-vehicle-details-in-eway-bill', type: 'Blog', gsc: '191 impr · pos 7.5 · CTR 0.5%',
    primary: 'update vehicle number in e way bill', secondary: ['change vehicle in e way bill', 'update part b', 'transhipment e way bill'],
    intent: 'Task: change the vehicle now.',
    weak: 'Title is good; description is generic ("step-by-step guide").',
    v: [
      ['How to Update Vehicle Number in E-Way Bill (Part B)', 'Change the vehicle in Part B in a few steps, as often as needed while the bill is valid. Who can update it, transhipment, and mistakes that cause penalties.', 86],
      ['Truck Changed? Update the Vehicle in Your E-Way Bill', 'Breakdown or transhipment: update Part B before the goods move on. Portal steps, who can do it, how many times, and what the driver should carry.', 82],
      ['Change Vehicle Number in E-Way Bill: No New Bill Needed', 'A vehicle change needs a Part B update, not a fresh e-way bill. Steps, who can update, transhipment cases and the mistakes that lead to fines.', 84],
      ['Update Part B From Your Phone in Under a Minute', 'Update the vehicle number and transporter from the E-Way Easy app, ₹5 on success, or follow the portal steps. Rules for transhipment and breakdowns.', 70],
      ['How to Update Vehicle Number in E-Way Bill (Part B)', 'Changed trucks? Update Part B instead of a new e-way bill, as often as needed during validity. Portal steps, who can update it and transhipment cases.', 88],
    ],
    pick: 4,
    keepTitle: true,
    why: 'Title already matches; the new description leads with the reassuring fact (no new bill needed).',
  },
  {
    url: '/blog/who-is-responsible-for-generating-eway-bill', type: 'Blog', gsc: '169 impr · pos 4.5 · CTR 1.8%',
    primary: 'who generates e way bill', secondary: ['who is responsible for e way bill', 'who can reject the consignment', 'transporter e way bill'],
    intent: 'Informational: whose job is it, and who is at risk.',
    weak: 'Performs reasonably; description can add the reject / 72-hour angle searched.',
    v: [
      ['Who Generates an E-Way Bill? Supplier, Buyer or Transporter', 'The supplier, the recipient or the transporter: who must generate the e-way bill, when the transporter must step in, unregistered parties and who can reject it.', 86],
      ['Whose Job Is the E-Way Bill? Supplier, Buyer, Transporter', 'Clear roles for supplier, buyer and transporter, what happens when nobody generates it, Transporter ID for unregistered carriers, and the 72-hour reject window.', 82],
      ['Nobody Generated the E-Way Bill? Here Is Who Pays', 'If neither party generates it, the transporter must before moving goods. Roles, liability, unregistered suppliers and how the recipient can reject a bill.', 80],
      ['E-Way Bill Roles for Suppliers and Transporters', 'Agree who generates, who updates Part B and who cancels before the truck leaves. Roles, scenarios and the recipient’s 72-hour accept or reject window.', 76],
      ['Who Generates an E-Way Bill? Supplier, Buyer or Transporter', 'Supplier, recipient or transporter: who must generate the e-way bill, when the transporter steps in, unregistered parties, and who can reject it in 72 hours.', 88],
    ],
    pick: 4,
    keepTitle: true,
    why: 'Title already ranks top 5 with decent CTR: kept. Description adds the "who can reject" query this page now answers.',
  },
  {
    url: '/eway-bill-validity', type: 'Guide', gsc: '165 impr · pos 17.2 · CTR 0%',
    primary: 'e way bill validity', secondary: ['e way bill validity calculation', 'validity per km', 'odc validity'],
    intent: 'Calculation: how long is my bill valid.',
    weak: 'Position 17 is mainly a ranking problem, not a metadata one. The title can still state the rule.',
    v: [
      ['E-Way Bill Validity: 1 Day per 200 km, With Examples', 'Validity is 1 day per 200 km (20 km for ODC), and a day ends at midnight. Timestamped examples, the 8-hour extension window and the 360-day cap.', 84],
      ['How Long Is an E-Way Bill Valid? Distance Table', 'Find your validity from the distance: 1 day per 200 km, ODC 1 day per 20 km. When the clock starts and ends, worked examples and how to extend.', 82],
      ['E-Way Bill Validity: Why 1 Day Can Be 36 Hours', 'The first day ends at midnight of the next day, so timing matters. The 200 km rule, ODC rule, worked timestamps and the extension window.', 78],
      ['E-Way Bill Validity Calculator and Rules', 'Work out validity by distance, then check it with the free distance and validity calculator. ODC rules, midnight cut-off, extension window and cap.', 72],
      ['E-Way Bill Validity: 1 Day per 200 km, With Examples', 'Validity is 1 day per 200 km (1 day per 20 km for ODC), ending at midnight. Timestamped examples, the 8-hour extension window and the 360-day cap.', 87],
    ],
    pick: 4,
    why: 'States the rule in the title (instant answer), which suits a page that needs relevance more than clicks. Ranking work (links, content) matters more here than metadata.',
  },
  {
    url: '/blog/how-eway-easy-simplifies-eway-bill-workflow', type: 'Blog (product)', gsc: '127 impr · pos 13.8 · CTR 0%',
    primary: 'e-way easy app review / how it works', secondary: ['eway bill app', 'e way bill generate app'],
    intent: 'Commercial investigation: what is this app, is it worth it.',
    weak: 'Competes with the homepage for "easy e way bill" brand-like queries. Needs a distinct "walkthrough" intent.',
    v: [
      ['E-Way Easy App Walkthrough: Setup to First E-Way Bill', 'See the E-Way Easy Android app step by step: one-time setup, invoice to e-way bill in 3 steps, PDF import, Part B, cancel, extend and ₹5 credits.', 84],
      ['What Using E-Way Easy Looks Like, Screen by Screen', 'From sign-up and portal API login to your first e-way bill: what you enter, what fills itself, what it costs, and what the app does not do yet.', 80],
      ['Is E-Way Easy Worth It? A Plain Walkthrough', 'An honest look at the app: setup, the 3-step flow, PDF import, managing bills, ₹5 per action with no subscription, and its limits, such as no bulk upload.', 78],
      ['Try E-Way Easy: E-Way Bills in 3 Steps on Android', 'Invoice, review, generate: how the app files on the official system via an authorised GSP, with free invoices and ₹5 per e-way bill action.', 74],
      ['E-Way Easy App Walkthrough: Setup to First E-Way Bill', 'The E-Way Easy Android app step by step: one-time setup, invoice to e-way bill in 3 steps, PDF import, Part B, cancel, extend, and ₹5 credits with no plan.', 87],
    ],
    pick: 4,
    why: 'Gives the post a distinct walkthrough intent so it stops competing with the homepage, and it is honest about what the reader will see.',
  },
  {
    url: '/eway-bill-vs-sales-invoice', type: 'Guide', gsc: '124 impr · pos 7.3 · CTR 0.8%',
    primary: 'e way bill vs tax invoice', secondary: ['difference between e way bill and invoice', 'bill of supply vs tax invoice in e way bill'],
    intent: 'Informational comparison.',
    weak: 'Fine, but "key differences" is generic; the useful answer (you usually need both) is missing.',
    v: [
      ['E-Way Bill vs Tax Invoice: Key Differences Explained', 'A tax invoice records the sale; an e-way bill records the movement. Purpose, law, who issues, threshold, validity and contents compared, with examples.', 84],
      ['E-Way Bill or Invoice: Do You Need Both?', 'Usually yes: the invoice for the sale, the e-way bill for the trip over ₹50,000. See when each is needed, who issues it and how the two must match.', 82],
      ['Invoice Done, E-Way Bill Too? How the Two Differ', 'One proves the sale, the other lets goods move. Side-by-side comparison of law, issuer, threshold, validity and cancellation, plus common mix-ups.', 78],
      ['E-Way Bill vs Sales Invoice: Make Both in One Flow', 'Understand how they differ, then create the invoice and e-way bill together in the E-Way Easy app. Comparison table and common mistakes inside.', 70],
      ['E-Way Bill vs Tax Invoice: Differences, When You Need Both', 'A tax invoice records the sale, an e-way bill the movement. When each is needed, who issues it, validity and cancellation compared, and how they must match.', 87],
    ],
    pick: 4,
    why: '"When you need both" answers the real question behind the comparison and stays accurate to the page.',
  },
  {
    url: '/blog/delivery-challan-vs-tax-invoice', type: 'Blog', gsc: '116 impr · pos 5.4 · CTR 0%',
    primary: 'delivery challan vs tax invoice', secondary: ['delivery challan and tax invoice difference', 'is delivery challan and invoice same'],
    intent: 'Informational: which document to issue.',
    weak: 'Zero clicks at position 5.4. The searcher asks "are they the same?" and the title does not answer.',
    v: [
      ['Delivery Challan vs Tax Invoice: Difference and Uses', 'A tax invoice records a sale; a delivery challan moves goods without one. Which to issue for job work, approval, stock transfer and line sales.', 84],
      ['Is a Delivery Challan the Same as an Invoice? No', 'A challan moves goods without a sale; an invoice records the sale and tax. When to issue each for job work, approval, transfers, and what each must show.', 84],
      ['Challan or Invoice? Pick the Right One Every Time', 'A four-question chooser for job work, approval, branch transfer and line sales, plus what each document must contain and how it links to the e-way bill.', 80],
      ['Delivery Challan Format and When to Use It', 'Know when a challan replaces an invoice, then make one with the free delivery challan generator. Contents, examples and e-way bill rules.', 72],
      ['Delivery Challan vs Tax Invoice: Difference, When to Use', 'Not the same: a tax invoice records a sale, a delivery challan moves goods without one. Which to issue for job work, approval, stock transfer and line sales.', 88],
    ],
    pick: 4,
    why: 'Answers "is it the same?" in the first words of the description and keeps the exact comparison phrase in the title.',
  },
  {
    url: '/blog/invoice-with-gst-vs-without-gst', type: 'Blog', gsc: '111 impr · pos 5.1 · CTR 0%',
    primary: 'invoice without gst', secondary: ['bill of supply vs tax invoice', 'can i make invoice without gst'],
    intent: 'Decision: should I charge GST on this bill.',
    weak: 'Zero clicks. Title is a question pair; the decision answer is missing.',
    v: [
      ['Invoice Without GST: When a Bill of Supply Is Allowed', 'You can bill without GST only in certain cases: composition dealers, exempt supplies or unregistered sellers. When to use a bill of supply vs a tax invoice.', 86],
      ['Can You Make an Invoice Without GST? Who Can, Who Cannot', 'Registered and selling taxable goods? You must charge GST. Composition, exempt or unregistered? See which document to issue and what it must show.', 82],
      ['Charging GST or Not? Tax Invoice vs Bill of Supply', 'A quick decision guide: who must charge GST, when a bill of supply applies, zero-rated exports under LUT, and the invoice mistakes that cost ITC.', 80],
      ['Make GST and Non-GST Invoices Free, the Right Way', 'Learn when to charge GST, then create a tax invoice or bill of supply free with the invoice generator. Rules, examples and mistakes to avoid.', 72],
      ['Invoice Without GST: When a Bill of Supply Is Allowed', 'Registered and selling taxable goods? You must charge GST. Composition, exempt or unregistered? Learn when a bill of supply replaces a tax invoice.', 88],
    ],
    pick: 4,
    why: 'Targets "without gst" directly and the description gives the decision rule; distinct from the receipt article (terminology).',
  },
  {
    url: '/blog/invoice-vs-bill-vs-receipt', type: 'Blog', gsc: '109 impr · pos 8.6 · CTR 0%',
    primary: 'tax invoice vs bill vs receipt', secondary: ['tax receipt vs tax invoice', 'difference between tax invoice and bill'],
    intent: 'Terminology: what each document is.',
    weak: 'Zero clicks. "Tax receipt vs tax invoice" is the top query; "tax" is missing from the title.',
    v: [
      ['Tax Invoice vs Bill vs Receipt: Differences in India', 'What a tax invoice, a bill, a receipt and a receipt voucher each prove under GST, when you issue each, and which one lets the buyer claim input tax credit.', 84],
      ['Tax Invoice or Receipt? What Each Proves Under GST', 'An invoice asks for payment, a receipt confirms it. See which counts for input tax credit, when to issue a receipt voucher, and the proforma stage.', 82],
      ['Bill, Invoice, Receipt: Same Thing? Not Under GST', 'Everyday words, different legal jobs. Follow one sale from quotation to receipt and see exactly which document does what, and which allows ITC.', 80],
      ['Invoice vs Receipt: Make the Right One for Free', 'Know the difference, then create the right document free with our templates: tax invoice, bill of supply or receipt-style records.', 68],
      ['Tax Invoice vs Bill vs Receipt: What Each Proves', 'An invoice asks for payment, a receipt confirms it. Learn what each document proves under GST, when a receipt voucher is needed, and which allows ITC.', 88],
    ],
    pick: 4,
    why: 'Adds "tax" to match "tax receipt vs tax invoice" and frames the article as the terminology piece, separate from the GST decision article.',
  },
  {
    url: '/blog/eway-bill-intrastate-movement-considerations', type: 'Blog', gsc: '104 impr · pos 5.3 · CTR 0%',
    primary: 'intra state e way bill', secondary: ['intra state e way bill limit', '50 km part b', 'e way bill within state'],
    intent: 'Informational: rules for movement inside one state.',
    weak: 'Zero clicks. "What to check in your state" is vague.',
    v: [
      ['Intra-State E-Way Bill: Limits, 50 km Rule, Validity', 'Moving goods within your state? Why state limits can differ from ₹50,000, the 50 km Part B relief, one-day validity timing and same-GSTIN transfers.', 86],
      ['E-Way Bill Within the Same State: What Changes', 'Some states set their own intra-state limit, Part B can be skipped up to 50 km to a transporter, and local transfers have traps. All explained.', 80],
      ['Local Delivery, Still an E-Way Bill? Intra-State Rules', 'Short trips inside a state can still need one. State limits, the 50 km Part B relief, the one-day validity timing trap and same-GSTIN transfers.', 78],
      ['Intra-State Dispatch Without E-Way Bill Mistakes', 'Check your state limit, use the 50 km relief correctly and time short trips right. Then generate and update bills from your phone.', 70],
      ['Intra-State E-Way Bill: State Limits, 50 km Rule', 'Moving goods within a state? Why state limits can differ from ₹50,000, the 50 km Part B relief, one-day validity timing and same-GSTIN transfers explained.', 88],
    ],
    pick: 4,
    why: 'Names the two concrete things people search (state limit, 50 km) instead of the vague "what to check".',
  },
  {
    url: '/commercial-invoice-templates', type: 'Template hub', gsc: '101 impr · pos 12.6 · CTR 1.0%',
    primary: 'commercial invoice format', secondary: ['commercial invoice template', 'commercial invoice', 'export invoice format'],
    intent: 'Transactional: get a format to fill now.',
    weak: 'Good title; "commercial invoice format" (searched) could lead.',
    v: [
      ['Commercial Invoice Format: Free Template, Edit and PDF', 'Free commercial invoice template for export and courier shipments. Edit every field, add your logo, choose currency, see live totals, then print or save a PDF.', 86],
      ['Commercial Invoice Template: Fill Online, Download PDF', 'Fill a commercial invoice in your browser: exporter, consignee, Incoterms, HS codes, currency and totals. Print on A4 or Letter, or save a PDF. Free.', 82],
      ['Shipping Abroad? Commercial Invoice Format, Ready to Use', 'Export and courier commercial invoice formats with the fields customs check, live totals and any currency. Edit, add your logo and download a PDF free.', 80],
      ['Free Commercial Invoice Maker for Exporters', 'Create a commercial invoice in minutes with your logo, currency and HS codes, then download a PDF. Export and courier formats, no sign-up.', 74],
      ['Commercial Invoice Format & Template: Free, Editable', 'Free commercial invoice format for export and courier shipments. Edit every field, add your logo, choose currency, see live totals, then print or save PDF.', 88],
    ],
    pick: 4,
    why: 'Leads with "format" (the searched word) and keeps the proven benefits; small change because CTR is already reasonable for position 12.',
  },
].filter((p) => !p.skip);

// ----- report -----
const issues = [];
let md = `# Metadata register (approved ${'2026-11-25'})\n\nSource: Search Console, last 28 days to 23 Nov 2026, pages with ≥100 impressions and average position ≤ 20.\nScores are subjective strategic ratings (prompt section 12), not predicted CTR.\nRendered title = what the site outputs (adds " | E-Way Easy" when it fits within 65 characters).\n\n`;
md += `| # | Page | GSC | Primary keyword | Final title (rendered) | Chars | Final description | Chars |\n|---|---|---|---|---|---:|---|---:|\n`;
PAGES.forEach((p, i) => {
  const [t, d] = p.v[p.pick];
  const rt = rendered(t);
  md += `| ${i + 1} | ${p.url} | ${p.gsc} | ${p.primary} | ${p.keepTitle ? '(kept) ' : ''}${rt} | ${rt.length} | ${d} | ${d.length} |\n`;
});
md += `\n---\n`;
PAGES.forEach((p, i) => {
  md += `\n## ${i + 1}. ${p.url}\n\n- **Page type:** ${p.type}\n- **Search Console:** ${p.gsc}\n- **Primary keyword:** ${p.primary}\n- **Secondary:** ${p.secondary.join(', ')}\n- **Intent:** ${p.intent}\n- **Weakness found:** ${p.weak}\n\n| Variant | Meta title (rendered) | Chars | Meta description | Chars | Score |\n|---|---|---:|---|---:|---:|\n`;
  p.v.forEach(([t, d, s], j) => {
    const rt = rendered(t);
    if (rt.length > 66) issues.push(`${p.url} V${j + 1} title ${rt.length}`);
    if (d.length < 130 || d.length > 160) issues.push(`${p.url} V${j + 1} desc ${d.length}`);
    md += `| ${j + 1}. ${V[j]}${j === p.pick ? ' ✅' : ''} | ${rt} | ${rt.length} | ${d} | ${d.length} | ${s} |\n`;
  });
  md += `\n**Recommended:** variant ${p.pick + 1}${p.keepTitle ? ' (title kept, description updated)' : ''}. ${p.why}\n`;
});
md += `\n## Keyword overlap check\n\n- Homepage owns "easy e-way bill app"; the product walkthrough post now targets "walkthrough / how it works" so the two stop competing.\n- Correction (edit, Part A fixes) vs cancellation (cancel, 24-hour rule) vs expiry (extend, 8 hours): three distinct actions.\n- Part A/B explainer (what each part is) vs vehicle update post (change vehicle in Part B): explainer vs task.\n- Invoice without GST (decision) vs tax invoice vs bill vs receipt (terminology) vs e-way bill vs tax invoice (movement vs sale): distinct.\n- Intra-state post (state limits, 50 km) does not reuse the ₹50,000 limit post's primary phrase.\n\n## Performance testing\n\n- Deploy, then note the date. In Search Console > Performance, filter each page and compare the 28 days after the change with the 28 days before, same device and country (India).\n- Judge CTR only at a similar average position; if position moved a lot, compare queries ranking in the same band.\n- Expect noise: most pages have 100–1,000 impressions a month, so wait at least 4 weeks before judging, and change one page at a time if you want a cleaner read.\n- Track downstream value too: Play Store clicks (UTM placement) and contact-form leads from these pages.\n`;
fs.writeFileSync(new URL('../docs/metadata-register.md', import.meta.url), md);
console.log(issues.length ? 'LENGTH ISSUES:\n' + issues.join('\n') : 'All lengths OK');
console.log(PAGES.length + ' pages');
