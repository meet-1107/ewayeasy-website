import type { Industry } from './industry-types';

// Industry pages (/industries/[slug]). Facts follow content/EDITORIAL_BRIEF.md.
// Examples are illustrative only: no real companies, GSTINs or statistics.

export const INDUSTRIES: Industry[] = [
  // 1. FMCG & Foods
  {
    slug: 'fmcg',
    name: 'FMCG, packaged foods and beverages',
    shortName: 'FMCG & Foods',
    seoTitle: 'E-Way Bill for FMCG Distributors: Rules & App',
    metaDescription:
      'E-way bill rules for FMCG, packaged food and beverage dispatch: per-invoice ₹50,000 limit, many invoices on one truck, van line sales and consolidated EWB.',
    h1: 'E-way bills for FMCG, packaged foods and beverages',
    intro:
      'FMCG dispatch means a loaded truck every morning, a dozen invoices for different distributors and stockists, and van sales that leave without a fixed buyer. Here is how the e-way bill rules apply to that daily rhythm.',
    quickAnswer:
      'For FMCG and packaged food dispatches, an e-way bill is generally needed for each invoice whose consignment value (taxable value plus GST, excluding exempt items on the same invoice) exceeds ₹50,000. The test is per invoice, not the total of the truck or the day. When several such invoices travel in one vehicle, a consolidated e-way bill (EWB-02) can group them. Van or line sales usually move on a delivery challan of the Line Sales type, with an e-way bill if the value exceeds the limit.',
    icon: 'fmcg',
    profile: [
      {
        title: 'Daily multi-drop trucks',
        text: 'One vehicle usually carries invoices for several distributors, stockists and wholesalers on the same route, each with its own value and destination PIN.',
      },
      {
        title: 'Mixed taxable and exempt lines',
        text: 'A single invoice can carry branded packaged items alongside exempt items. Only the taxable value plus GST counts towards the ₹50,000 consignment value.',
      },
      {
        title: 'Van and line sales',
        text: 'Route vans leave the depot with stock for retailers who are billed on the spot, so the buyer is not known when the goods leave.',
      },
      {
        title: 'Tight dispatch windows',
        text: 'Trucks are loaded early and drivers change at short notice, so vehicle numbers often change after the e-way bill is ready.',
      },
    ],
    movements: [
      {
        scenario: 'Sale to a distributor, invoice value above ₹50,000',
        document: 'Tax invoice',
        ewayBill: 'Required for that invoice (check your state’s intra-state limit for movements within the state)',
      },
      {
        scenario: 'Several small invoices, each below ₹50,000, on one truck',
        document: 'Tax invoice for each buyer',
        ewayBill: 'Generally not required for an invoice below the limit, even if the truck’s total is higher',
      },
      {
        scenario: 'Several invoices above ₹50,000 on one vehicle',
        document: 'Tax invoice for each buyer',
        ewayBill: 'One e-way bill per invoice; a consolidated e-way bill (EWB-02) can group them for the vehicle',
      },
      {
        scenario: 'Van or line sales to retailers on a route',
        document: 'Delivery challan (Line Sales); invoices issued on delivery',
        ewayBill: 'Required if the value of goods on the challan exceeds the limit',
      },
      {
        scenario: 'Stock moved to your own depot in another state',
        document: 'Tax invoice (generally treated as a supply between distinct persons; check with your adviser)',
        ewayBill: 'Required if the value exceeds ₹50,000',
      },
      {
        scenario: 'Expired or damaged stock returned by a distributor',
        document: 'As agreed (credit note route or the distributor’s own document); portal sub-type Sales Return',
        ewayBill: 'Required if the value of the returned goods exceeds the limit',
      },
    ],
    painPoints: [
      {
        label: 'Adding up the truck',
        text: 'Some dispatch desks generate e-way bills because the truck total crosses ₹50,000. The limit is judged per invoice; the truck total alone does not trigger it.',
      },
      {
        label: 'Counting exempt items',
        text: 'Exempt lines on the same invoice are excluded from consignment value. Including them can push an invoice over the limit when it is actually below.',
      },
      {
        label: 'Vehicle changed at the last minute',
        text: 'When the driver or truck changes after generation, Part B must be updated before the vehicle moves, or the e-way bill does not match the vehicle.',
      },
      {
        label: 'Van sales without paperwork',
        text: 'Route vans sometimes leave with only a loading sheet. They need a delivery challan, and an e-way bill when the value exceeds the limit.',
      },
    ],
    appFit: [
      {
        need: 'Invoice and e-way bill for each distributor',
        how: 'Create the GST invoice and generate its e-way bill in one flow (Invoice, Review EWB, Generated). Saved buyers and products with HSN and rates keep repeat orders quick.',
      },
      {
        need: 'Several invoices on one truck',
        how: 'Generate a consolidated e-way bill for multiple consignments in the same vehicle from the app.',
      },
      {
        need: 'Truck or driver changed',
        how: 'Update Part B with the new vehicle number from your phone, using saved vehicles and transporters.',
      },
      {
        need: 'Invoices already made in Tally',
        how: 'Import the invoice PDF; the app reads buyer, GSTIN, items, HSN and totals, and you review everything before generating.',
      },
      {
        need: 'Sending papers to the driver',
        how: 'Download the e-way bill PDF and share it on WhatsApp, by email or print it at the dock.',
      },
    ],
    volumeNote:
      'E-Way Easy has no bulk generation or upload: each e-way bill is made one invoice at a time. If your depot generates a large number of e-way bills every day, the official portal’s bulk upload (JSON prepared with the official bulk tool) or an API/GSP integration with your ERP is the better route; see our guide at /bulk-eway-bill-generation and check your file with /tools/bulk-eway-bill-data-checker. The app suits per-dispatch work: owners, smaller distributors, branch depots and urgent dispatches when you are away from the desk.',
    checklist: [
      'Check each invoice’s value separately: taxable value plus GST, without exempt items.',
      'Confirm your state’s intra-state limit for local deliveries.',
      'Match buyer GSTIN and delivery PIN with the distributor’s current address.',
      'Use a delivery challan (Line Sales) for van stock without a fixed buyer.',
      'Group invoices on the same vehicle with a consolidated e-way bill where useful.',
      'Update Part B before the truck leaves if the vehicle has changed.',
      'Give the driver the invoices or challan with the e-way bill numbers.',
    ],
    faq: [
      {
        q: 'Does an FMCG truck need an e-way bill if its total load is above ₹50,000?',
        a: 'Not by itself. The limit applies to the consignment value of each invoice, so invoices below ₹50,000 generally do not need an e-way bill even when the truck’s total is higher.',
      },
      {
        q: 'Are exempt food items counted in the ₹50,000 value?',
        a: 'No. Consignment value is the taxable value plus GST, and the value of exempt supplies on the same invoice is excluded.',
      },
      {
        q: 'What document do route vans carry for line sales?',
        a: 'A delivery challan of the Line Sales type, with invoices issued to retailers on delivery. An e-way bill is needed if the value of goods on the challan exceeds the limit.',
      },
      {
        q: 'Can one e-way bill cover all invoices on a delivery truck?',
        a: 'Each invoice above the limit needs its own e-way bill. A consolidated e-way bill (EWB-02) then groups those e-way bills for the vehicle so the transporter carries one reference.',
      },
      {
        q: 'Do intra-state FMCG deliveries follow the same ₹50,000 limit?',
        a: 'Some states have notified a different limit for movement within the state. Check your state’s notification before deciding that a local delivery needs no e-way bill.',
      },
      {
        q: 'Can E-Way Easy generate e-way bills for all of today’s invoices in one go?',
        a: 'No. The app generates e-way bills one invoice at a time; for large daily volumes use the official portal’s bulk upload or an API/GSP integration.',
      },
    ],
    related: [
      {
        href: '/consolidated-eway-bill',
        label: 'Consolidated e-way bill',
        text: 'How to group several e-way bills for one delivery vehicle.',
      },
      {
        href: '/blog/eway-bills-for-wholesalers-and-distributors',
        label: 'E-way bills for wholesalers and distributors',
        text: 'Practical rules for multi-buyer, multi-drop dispatch.',
      },
      {
        href: '/blog/eway-bill-limit-50000-threshold-exceptions',
        label: 'The ₹50,000 limit and its exceptions',
        text: 'What counts in consignment value and when the limit does not apply.',
      },
      {
        href: '/solutions/wholesalers-distributors',
        label: 'E-Way Easy for distributors',
        text: 'How the app fits a distributor’s daily dispatch desk.',
      },
    ],
    tools: [
      {
        slug: 'eway-bill-eligibility-checker',
        why: 'Check whether a single distributor invoice crosses the e-way bill limit after leaving out exempt items.',
      },
      {
        slug: 'multi-item-gst-calculator',
        why: 'Work out tax on invoices that mix items at different GST rates, as packaged food invoices often do.',
      },
      {
        slug: 'delivery-challan-generator',
        why: 'Prepare a delivery challan for van or line sales stock that leaves without a fixed buyer.',
      },
    ],
  },

  // 2. Textile & Apparel
  {
    slug: 'textile-apparel',
    name: 'Textile, fabric and apparel',
    shortName: 'Textile & Apparel',
    seoTitle: 'E-Way Bill for Textile Job Work & Garment Dispatch',
    metaDescription:
      'E-way bill rules for textile and garment units: inter-state job work for dyeing, printing and stitching, returns from processors, and fabric sales to traders.',
    h1: 'E-way bills for textile and apparel businesses',
    intro:
      'Fabric rarely goes straight from loom to buyer. It moves to dyers, printers, embroiderers and stitching units and back again, often across state lines. Each of those trips has its own e-way bill position.',
    quickAnswer:
      'When a textile principal sends fabric or garments to a job worker in another state for dyeing, printing, stitching or embroidery, an e-way bill is required irrespective of value. Job work within the same state needs an e-way bill only if the value exceeds the limit (check your state’s intra-state limit). Job work goods move on a delivery challan, not a tax invoice. Sales of fabric and garments to traders follow the normal ₹50,000 per-consignment rule.',
    icon: 'textile',
    profile: [
      {
        title: 'Process chain across units',
        text: 'Grey fabric moves to a processor for dyeing or printing, then to an embroidery or stitching unit, then back to the principal or straight to a buyer.',
      },
      {
        title: 'Job workers in other states',
        text: 'Many textile clusters depend on processors and job workers in neighbouring states, which brings in the inter-state job work rule.',
      },
      {
        title: 'Agents and stockists',
        text: 'Garments and fabric often reach the market through commission agents, stockists and wholesale traders in textile markets.',
      },
      {
        title: 'Many small lots',
        text: 'Sample lots, small reorders and returns from processors mean frequent dispatches, some below the value limit and some above.',
      },
    ],
    movements: [
      {
        scenario: 'Fabric sent to a job worker (dyeing, printing) in another state',
        document: 'Delivery challan (Job Work)',
        ewayBill: 'Required irrespective of value',
      },
      {
        scenario: 'Fabric sent to a job worker in the same state',
        document: 'Delivery challan (Job Work)',
        ewayBill: 'Required if the value exceeds the limit (check your state’s intra-state limit)',
      },
      {
        scenario: 'Processed goods returned from the job worker to the principal',
        document: 'Delivery challan',
        ewayBill: 'Generally required if the value exceeds the limit; check the inter-state position with your adviser',
      },
      {
        scenario: 'Finished goods sent directly from the job worker to the buyer',
        document: 'Principal’s tax invoice (as permitted under the job work rules)',
        ewayBill: 'Required if the consignment value exceeds ₹50,000',
      },
      {
        scenario: 'Fabric or garments sold to a trader or wholesaler',
        document: 'Tax invoice',
        ewayBill: 'Required if the consignment value exceeds ₹50,000',
      },
      {
        scenario: 'Specified handicraft textiles moved inter-state by a person exempt from registration',
        document: 'Delivery challan or the document the rules allow',
        ewayBill: 'Required irrespective of value',
      },
    ],
    painPoints: [
      {
        label: 'Skipping small job work lots',
        text: 'A ₹20,000 lot of fabric going to a dyer across the state border still needs an e-way bill. The value limit does not apply to inter-state job work by a principal.',
      },
      {
        label: 'Using an invoice for job work',
        text: 'Goods sent for processing are not sold, so they move on a delivery challan. A tax invoice for a job work trip creates GST confusion later.',
      },
      {
        label: 'Losing track of returns',
        text: 'Challans for goods coming back from processors are often missing, which makes it hard to match what went out with what came back.',
      },
      {
        label: 'Wrong HSN on fabric',
        text: 'Fabric, yarn and garments sit under different HSN codes and rates. A wrong HSN on the e-way bill does not match the document carried.',
      },
    ],
    appFit: [
      {
        need: 'Sales to traders and wholesalers',
        how: 'Create the GST invoice and its e-way bill in one flow, with saved buyers and products carrying HSN and rates.',
      },
      {
        need: 'Buyer details in textile markets',
        how: 'Enter the buyer’s GSTIN and the name, address, state and PIN fill automatically; use Bill To / Ship To when goods go to a godown.',
      },
      {
        need: 'Dispatch from a processor’s premises',
        how: 'Set Dispatch From when finished goods leave from a job worker’s unit rather than your own.',
      },
      {
        need: 'Job work challans',
        how: 'The app does not create delivery challans. Use the free delivery challan generator on this website at /tools/delivery-challan-generator for job work trips.',
      },
      {
        need: 'Tempo changed on the way',
        how: 'Update Part B with the new vehicle number from your phone within the e-way bill’s validity.',
      },
    ],
    volumeNote:
      'E-Way Easy creates e-way bills one invoice at a time and has no bulk generation, delivery challan creation or ERP integration. Textile units with heavy daily job work and sales volume should look at the official portal’s bulk upload or an API/GSP route; see /bulk-eway-bill-generation and check your data with /tools/bulk-eway-bill-data-checker. The app suits per-dispatch invoicing: owners, small mills and garment units, and urgent sales dispatches when you are away from the office.',
    checklist: [
      'Decide first: is this a sale (tax invoice) or a job work trip (delivery challan)?',
      'For inter-state job work, generate an e-way bill even if the lot is small.',
      'For same-state job work, check the value against your state’s limit.',
      'Record the job worker’s GSTIN and address correctly on the challan.',
      'Check HSN for fabric, yarn or garments before dispatch.',
      'Keep return challans from processors matched with the original challan.',
    ],
    faq: [
      {
        q: 'Is an e-way bill needed for textile job work below ₹50,000?',
        a: 'If a principal sends goods to a job worker in another state, yes, the e-way bill is required irrespective of value. Within the same state, it is needed only if the value exceeds the limit.',
      },
      {
        q: 'Who can generate the e-way bill for job work goods?',
        a: 'Generally the principal generates it. A registered job worker can also generate it, for example when sending goods back; check the details in Rule 138.',
      },
      {
        q: 'Which document goes with fabric sent for dyeing or printing?',
        a: 'A delivery challan with the Job Work sub-type. A tax invoice is not used because the goods are not being sold.',
      },
      {
        q: 'Do garment sales to a wholesaler need an e-way bill?',
        a: 'Yes, if the consignment value, meaning taxable value plus GST, exceeds ₹50,000. Some states have a different limit for intra-state movement, so check your state’s notification.',
      },
      {
        q: 'Does E-Way Easy make job work delivery challans?',
        a: 'No. The app creates GST invoices and e-way bills. For job work challans, use the free delivery challan generator on this website.',
      },
    ],
    related: [
      {
        href: '/blog/eway-bill-rules-for-job-work',
        label: 'E-way bill rules for job work',
        text: 'The inter-state job work rule, challans and returns explained.',
      },
      {
        href: '/blog/delivery-challan-vs-tax-invoice',
        label: 'Delivery challan vs tax invoice',
        text: 'When goods move on a challan and when they need an invoice.',
      },
      {
        href: '/blog/eway-bill-interstate-movement-requirements',
        label: 'Inter-state movement requirements',
        text: 'What changes when goods cross a state border.',
      },
      {
        href: '/solutions/manufacturers',
        label: 'E-Way Easy for manufacturers',
        text: 'How the app fits a manufacturing unit’s dispatch work.',
      },
    ],
    tools: [
      {
        slug: 'delivery-challan-generator',
        why: 'Prepare job work challans for fabric going to dyers, printers and stitching units.',
      },
      {
        slug: 'hsn-code-lookup',
        why: 'Find the right HSN for yarn, fabric and garments before filling the e-way bill.',
      },
      {
        slug: 'eway-bill-eligibility-checker',
        why: 'Check whether a same-state job work lot or a garment sale needs an e-way bill.',
      },
    ],
  },

  // 3. Pharma & Healthcare
  {
    slug: 'pharma',
    name: 'Pharmaceuticals and healthcare products',
    shortName: 'Pharma & Healthcare',
    seoTitle: 'E-Way Bill for Pharma Distributors & C&F Agents',
    metaDescription:
      'E-way bill rules for pharma: dispatch to C&F agents, stockists and distributors, depot stock transfers, sample movements and validity on long depot routes.',
    h1: 'E-way bills for pharma and healthcare distribution',
    intro:
      'Medicines move from plant to depot, depot to C&F agent, C&F agent to stockist, and stockist to chemist. Some of those legs are sales, some are transfers, and the e-way bill position changes with each.',
    quickAnswer:
      'A pharma sale to a stockist or distributor needs an e-way bill when the consignment value (taxable value plus GST) exceeds ₹50,000. Stock sent to your own depot or C&F location in another state is generally treated as a supply between distinct persons and moves on a tax invoice; check with your adviser. Transfers within the same state under the same GSTIN move on a delivery challan, with an e-way bill if the value exceeds the limit. Sample movements also need an e-way bill when their value crosses the limit.',
    icon: 'pharma',
    profile: [
      {
        title: 'Plant to depot to C&F',
        text: 'Goods often travel long distances from the manufacturing plant to state-level depots or carrying and forwarding (C&F) agents before any sale to a stockist.',
      },
      {
        title: 'High value in small cartons',
        text: 'A few cartons of medicines can exceed ₹50,000, so even small courier or tempo loads often need an e-way bill.',
      },
      {
        title: 'Batch-level paperwork',
        text: 'Pharma invoices carry batch numbers and expiry dates, and the e-way bill must match the invoice value and HSN exactly.',
      },
      {
        title: 'Samples and returns',
        text: 'Physician samples move to field staff, and near-expiry or damaged stock comes back from stockists, both outside normal sales.',
      },
    ],
    movements: [
      {
        scenario: 'Sale to a stockist or distributor',
        document: 'Tax invoice',
        ewayBill: 'Required if the consignment value exceeds ₹50,000 (check your state’s intra-state limit)',
      },
      {
        scenario: 'Stock transfer to your own depot or C&F location in another state',
        document: 'Tax invoice (generally treated as a supply between distinct persons; check with your adviser)',
        ewayBill: 'Required if the value exceeds ₹50,000',
      },
      {
        scenario: 'Branch or depot transfer within the same state, same GSTIN',
        document: 'Delivery challan',
        ewayBill: 'Required if the value exceeds the limit',
      },
      {
        scenario: 'Samples sent to field staff or a sample store',
        document: 'Delivery challan (no sale involved)',
        ewayBill: 'Required if the value exceeds the limit',
      },
      {
        scenario: 'Expired or damaged stock returned by a stockist',
        document: 'As agreed between the parties; portal sub-type Sales Return',
        ewayBill: 'Required if the value of returned goods exceeds the limit',
      },
    ],
    painPoints: [
      {
        label: 'Treating depot transfers as internal',
        text: 'Sending stock to your own depot in another state is generally a supply between distinct persons. Moving it on a challan without the right tax treatment causes trouble at checks and in returns.',
      },
      {
        label: 'Validity on long routes',
        text: 'Plant-to-depot routes can run over 1,000 km. Validity is 1 day per 200 km, so delays need an extension within the allowed window around expiry.',
      },
      {
        label: 'Samples moved without papers',
        text: 'Sample cartons are often sent with only an internal note. They need a proper document, and an e-way bill when the value exceeds the limit.',
      },
      {
        label: 'Value mismatches',
        text: 'Trade discounts and schemes change the invoice value. The e-way bill value must match the final invoice, not the price list.',
      },
    ],
    appFit: [
      {
        need: 'Invoice and e-way bill for stockist orders',
        how: 'Create the GST invoice and generate the e-way bill in one flow, with saved stockists and products carrying HSN and rates.',
      },
      {
        need: 'Invoices made in your billing software',
        how: 'Import the invoice PDF; the app reads buyer, GSTIN, items, HSN and totals, and you review it before generating the e-way bill.',
      },
      {
        need: 'Long-distance depot dispatches',
        how: 'Road distance is calculated from PIN codes (you can edit it), and validity can be extended from the app when a delay qualifies.',
      },
      {
        need: 'Sending the e-way bill to the transporter or C&F agent',
        how: 'Download the e-way bill PDF and share it on WhatsApp or email, or print it.',
      },
    ],
    volumeNote:
      'E-Way Easy has no bulk e-way bill generation, ERP or API integration, or e-invoice (IRN) generation. Pharma companies and large C&F agents that produce many e-way bills a day should use the official portal’s bulk upload or an API/GSP integration with their ERP; see /bulk-eway-bill-generation and check upload data with /tools/bulk-eway-bill-data-checker. The app suits per-dispatch work: smaller distributors, branch depots, owners, and urgent dispatches away from the billing desk.',
    checklist: [
      'Confirm whether the movement is a sale, an inter-state stock transfer, a same-state transfer or a sample movement.',
      'Use the final invoice value after discounts and schemes for the e-way bill.',
      'Check HSN and GST rate for each product line.',
      'For long routes, note the validity end date and the extension window.',
      'Send samples and returns with a proper document, not an internal note.',
      'Check whether your business is e-invoice-applicable before issuing the invoice.',
    ],
    faq: [
      {
        q: 'Does a pharma stock transfer to a C&F agent in another state need an e-way bill?',
        a: 'Yes, if the value exceeds ₹50,000. Stock sent to your own location in another state is generally treated as a supply between distinct persons on a tax invoice, so check the tax treatment with your adviser.',
      },
      {
        q: 'Is an e-way bill needed for physician samples?',
        a: 'An e-way bill is needed for movement of goods, not only sales, so samples need one when their value exceeds the limit. They usually move on a delivery challan.',
      },
      {
        q: 'How long is an e-way bill valid for a long pharma route?',
        a: 'For normal cargo, 1 day for every 200 km or part of it. If goods are delayed for reasons such as an accident or trans-shipment, the validity can be extended within 8 hours before or after expiry.',
      },
      {
        q: 'Can a stockist generate the e-way bill for goods returned to the distributor?',
        a: 'The person causing the movement, usually the registered sender, generates it if the value exceeds the limit. The portal has a Sales Return sub-type for such movements.',
      },
      {
        q: 'Does E-Way Easy generate e-invoices for pharma companies?',
        a: 'No. The app does not generate e-invoices (IRN). If your business is e-invoice-applicable, issue the e-invoice through your usual route and check with your adviser how to generate the e-way bill.',
      },
    ],
    related: [
      {
        href: '/eway-bill-validity',
        label: 'E-way bill validity',
        text: 'How validity is counted and when it can be extended.',
      },
      {
        href: '/blog/eway-bill-returns-and-special-transactions',
        label: 'Returns and special transactions',
        text: 'E-way bills for returns, samples and other non-sale movements.',
      },
      {
        href: '/blog/eway-bills-for-wholesalers-and-distributors',
        label: 'E-way bills for distributors',
        text: 'Practical rules for distributors and stockists.',
      },
      {
        href: '/invoice-pdf-to-eway-bill',
        label: 'Invoice PDF to e-way bill',
        text: 'Turn an invoice made in your billing software into an e-way bill.',
      },
    ],
    tools: [
      {
        slug: 'einvoice-applicability-checker',
        why: 'Check whether your pharma business must issue e-invoices before you plan e-way bills.',
      },
      {
        slug: 'distance-calculator',
        why: 'Estimate the road distance and e-way bill validity for plant-to-depot routes.',
      },
      {
        slug: 'invoice-vs-eway-bill-checker',
        why: 'Compare the invoice and e-way bill details so batch-level invoices and the e-way bill agree.',
      },
    ],
  },

  // 4. Auto Components
  {
    slug: 'automotive-components',
    name: 'Automotive components and auto parts',
    shortName: 'Auto Components',
    seoTitle: 'E-Way Bill for Auto Component Suppliers to OEMs',
    metaDescription:
      'E-way bill guide for auto component suppliers: just-in-time dispatch to OEM plants, milk-run pickups, job work for plating or machining, and returnable bins.',
    h1: 'E-way bills for auto component suppliers',
    intro:
      'Auto parts suppliers ship to OEM plants on tight schedules, often several times a day. A wrong or missing e-way bill can hold a truck at the plant gate and stop a line.',
    quickAnswer:
      'Auto component dispatches to OEM plants need an e-way bill for each invoice whose consignment value exceeds ₹50,000. In a milk-run, where one vehicle collects from several suppliers, each supplier generates the e-way bill for its own invoice, and a consolidated e-way bill can group them for the vehicle. Parts sent to a job worker in another state for plating, heat treatment or machining need an e-way bill irrespective of value.',
    icon: 'auto',
    profile: [
      {
        title: 'Just-in-time schedules',
        text: 'OEM plants call off parts against delivery schedules, so dispatches are frequent and time-bound, and gate entry often checks the invoice and e-way bill together.',
      },
      {
        title: 'Milk-run pickups',
        text: 'One vehicle arranged by the OEM or a logistics provider collects parts from several suppliers on a route and delivers to the plant.',
      },
      {
        title: 'Job work on parts',
        text: 'Castings and machined parts go out for plating, heat treatment, painting or machining and come back before final dispatch.',
      },
      {
        title: 'Returnable packaging',
        text: 'Parts travel in returnable bins, trolleys and pallets that come back empty from the customer.',
      },
    ],
    movements: [
      {
        scenario: 'JIT dispatch of parts to an OEM plant',
        document: 'Tax invoice',
        ewayBill: 'Required if the consignment value exceeds ₹50,000',
      },
      {
        scenario: 'Milk-run vehicle collecting from several suppliers',
        document: 'Each supplier’s own tax invoice',
        ewayBill: 'Each supplier generates for its own invoice above the limit; consolidated e-way bill possible for the vehicle',
      },
      {
        scenario: 'Parts sent to a job worker in another state (plating, heat treatment, machining)',
        document: 'Delivery challan (Job Work)',
        ewayBill: 'Required irrespective of value',
      },
      {
        scenario: 'Parts sent to a job worker in the same state',
        document: 'Delivery challan (Job Work)',
        ewayBill: 'Required if the value exceeds the limit (check your state’s intra-state limit)',
      },
      {
        scenario: 'Rejected parts returned by the OEM',
        document: 'As agreed (often the customer’s return document); portal sub-type Sales Return',
        ewayBill: 'Required if the value of returned goods exceeds the limit',
      },
      {
        scenario: 'Empty returnable bins and trolleys coming back',
        document: 'Usually a delivery challan',
        ewayBill: 'Depends on the facts; check the position with your adviser',
      },
    ],
    painPoints: [
      {
        label: 'Truck waiting at the plant gate',
        text: 'A mismatch between the invoice and the e-way bill, such as a wrong vehicle number or value, can hold the vehicle at gate entry.',
      },
      {
        label: 'Milk-run vehicle details',
        text: 'The milk-run vehicle number is often known only at pickup. Part B must carry the correct vehicle before the parts move.',
      },
      {
        label: 'Small job work lots across the border',
        text: 'A small lot sent to a plater in the next state still needs an e-way bill. The value limit does not apply to inter-state job work by a principal.',
      },
      {
        label: 'Errors found after generation',
        text: 'An e-way bill cannot be edited. A wrong Part A detail means cancelling within 24 hours and generating a new one.',
      },
    ],
    appFit: [
      {
        need: 'Invoice and e-way bill for each OEM dispatch',
        how: 'Create the GST invoice and generate the e-way bill in one flow, with saved OEM buyers and part numbers with HSN and rates.',
      },
      {
        need: 'OEM plant different from billing address',
        how: 'Use Bill To / Ship To so the e-way bill shows the correct delivery plant and PIN.',
      },
      {
        need: 'Milk-run vehicle known only at pickup',
        how: 'Update Part B with the milk-run vehicle number from your phone at the dock.',
      },
      {
        need: 'Correcting a wrong e-way bill quickly',
        how: 'Cancel the e-way bill from the app within the allowed time and generate a fresh one.',
      },
      {
        need: 'Job work challans',
        how: 'The app does not create delivery challans. Use the free delivery challan generator on this website for plating and machining trips.',
      },
    ],
    volumeNote:
      'E-Way Easy has no bulk generation, ERP or API integration, or e-invoice (IRN) generation. Tier-1 suppliers with many dispatches a day usually generate e-way bills from their ERP through an API/GSP route or the official portal’s bulk upload; see /bulk-eway-bill-generation and validate files with /tools/bulk-eway-bill-data-checker. The app suits per-dispatch work: smaller tier-2 and tier-3 suppliers, owners, and urgent dispatches or vehicle changes when you are away from the desk.',
    checklist: [
      'Match invoice number, value and HSN with the OEM’s schedule before generating.',
      'Use the OEM plant address as Ship To when it differs from the billing address.',
      'Confirm the vehicle number for milk-run pickups and update Part B.',
      'For inter-state job work, generate an e-way bill whatever the value.',
      'Check whether your business is e-invoice-applicable.',
      'Keep track of returnable bins and challans for parts sent out.',
    ],
    faq: [
      {
        q: 'Who generates the e-way bill in a milk-run?',
        a: 'Each supplier generally generates the e-way bill for its own invoice when the value exceeds the limit. The transporter can then generate a consolidated e-way bill for the vehicle.',
      },
      {
        q: 'Do parts sent for plating in another state need an e-way bill below ₹50,000?',
        a: 'Yes. Inter-state movement of goods by a principal to a job worker needs an e-way bill irrespective of value.',
      },
      {
        q: 'What happens if the vehicle changes on the way to the OEM plant?',
        a: 'Update Part B with the new vehicle number before the goods move in the new vehicle. Part B can be updated within the e-way bill’s validity.',
      },
      {
        q: 'Do empty returnable bins need an e-way bill?',
        a: 'The position depends on the facts, so check with your adviser. They usually move with a delivery challan.',
      },
      {
        q: 'Can E-Way Easy connect to our ERP for OEM dispatches?',
        a: 'No. The app has no ERP or API integration. For high daily volumes, an API/GSP route or the official portal’s bulk upload is the usual option.',
      },
    ],
    related: [
      {
        href: '/blog/eway-bill-rules-for-job-work',
        label: 'E-way bill rules for job work',
        text: 'Plating, heat treatment and machining trips explained.',
      },
      {
        href: '/blog/how-to-update-vehicle-details-in-eway-bill',
        label: 'Updating vehicle details',
        text: 'How and when to update Part B for a new vehicle.',
      },
      {
        href: '/eway-bill-cancellation',
        label: 'E-way bill cancellation',
        text: 'Cancelling within 24 hours when details are wrong.',
      },
      {
        href: '/solutions/manufacturers',
        label: 'E-Way Easy for manufacturers',
        text: 'How the app fits a manufacturing dispatch desk.',
      },
    ],
    tools: [
      {
        slug: 'invoice-vs-eway-bill-checker',
        why: 'Catch mismatches between the invoice and e-way bill before the truck reaches the OEM gate.',
      },
      {
        slug: 'delivery-challan-generator',
        why: 'Prepare challans for parts sent out for plating, heat treatment or machining.',
      },
      {
        slug: 'einvoice-applicability-checker',
        why: 'Check whether your turnover brings your OEM invoices under e-invoicing.',
      },
    ],
  },

  // 5. Machinery & Engineering
  {
    slug: 'machinery-engineering',
    name: 'Machinery, capital goods and engineering',
    shortName: 'Machinery & Engineering',
    seoTitle: 'E-Way Bill for Machinery, ODC & SKD/CKD Shipments',
    metaDescription:
      'E-way bill rules for machinery makers: high-value invoices, over-dimensional cargo validity, machines shipped in parts or lots (SKD/CKD), and goods for repair.',
    h1: 'E-way bills for machinery and engineering goods',
    intro:
      'Machinery dispatch is fewer invoices but bigger ones: single machines worth lakhs, loads that need special trailers, and plants that leave the factory in several lots. Each needs care with the e-way bill.',
    quickAnswer:
      'A machine sold on a single invoice needs an e-way bill whenever the consignment value exceeds ₹50,000, as most machine invoices do. Over-dimensional cargo (ODC) gets 1 day of validity for every 20 km, against 1 day per 200 km for normal cargo. When a machine is shipped in SKD/CKD form or in lots, the full invoice is generally issued before the first lot, and each lot moves with a delivery challan referring to that invoice and its own e-way bill; check Rule 55 for the details.',
    icon: 'machinery',
    profile: [
      {
        title: 'High-value single invoices',
        text: 'One invoice can cover a complete machine or production line, so a mistake in value, HSN or buyer GSTIN carries more risk.',
      },
      {
        title: 'Over-dimensional loads',
        text: 'Large machines travel on low-bed trailers and move slowly, often with route restrictions, so validity runs out faster than people expect.',
      },
      {
        title: 'Shipped in lots',
        text: 'Plants and large machines often leave the factory in several trucks over days or weeks, as SKD/CKD kits or in lots.',
      },
      {
        title: 'Repairs and exhibitions',
        text: 'Machines and parts go to and from customer sites for repair, and demo machines travel to exhibitions and trade fairs.',
      },
    ],
    movements: [
      {
        scenario: 'Complete machine sold and shipped in one vehicle',
        document: 'Tax invoice',
        ewayBill: 'Required if the consignment value exceeds ₹50,000',
      },
      {
        scenario: 'Over-dimensional machine on a special trailer',
        document: 'Tax invoice',
        ewayBill: 'Required; validity is 1 day per 20 km for ODC',
      },
      {
        scenario: 'Machine shipped in SKD/CKD form or in lots',
        document: 'Full tax invoice before the first lot; delivery challan for each lot referring to the invoice (Rule 55(5))',
        ewayBill: 'An e-way bill for each lot; check Rule 55 for the details',
      },
      {
        scenario: 'Machine or part sent to a workshop for repair',
        document: 'Delivery challan',
        ewayBill: 'Generally required if the value exceeds the limit; check the position with your adviser',
      },
      {
        scenario: 'Demo machine sent to an exhibition or trade fair',
        document: 'Delivery challan (Exhibition or Fairs)',
        ewayBill: 'Required if the value exceeds the limit',
      },
    ],
    painPoints: [
      {
        label: 'Normal validity on ODC loads',
        text: 'Treating a low-bed trailer load as normal cargo can be a problem, because ODC validity is counted at 1 day per 20 km, not 200 km.',
      },
      {
        label: 'One e-way bill for all lots',
        text: 'Each lot of an SKD/CKD shipment moves separately, so each lot needs its own challan and e-way bill, not one e-way bill for the whole invoice.',
      },
      {
        label: 'Delays on long routes',
        text: 'Heavy loads get held up by permits, breakdowns or trans-shipment. Extension is allowed only within 8 hours before or after expiry, for genuine reasons.',
      },
      {
        label: 'Old invoices',
        text: 'When a machine is billed and held for months, the e-way bill cannot be generated if the invoice is more than 180 days old.',
      },
    ],
    appFit: [
      {
        need: 'High-value machine invoice and e-way bill',
        how: 'Create the GST invoice and generate the e-way bill in one flow; buyer GSTIN fills name, address, state and PIN so details match.',
      },
      {
        need: 'Delivery to a project site',
        how: 'Use Bill To / Ship To for site deliveries and Dispatch From when goods leave from a different unit.',
      },
      {
        need: 'Delayed heavy load',
        how: 'Extend validity from the app when a qualifying delay happens, within the allowed window.',
      },
      {
        need: 'Trailer changed on the way',
        how: 'Update Part B with the new vehicle number for trans-shipment or a replacement trailer.',
      },
      {
        need: 'Lot-wise challans',
        how: 'The app does not create delivery challans. Prepare lot challans with the free delivery challan generator on this website.',
      },
    ],
    volumeNote:
      'E-Way Easy has no bulk generation, ERP or API integration. Most machinery makers have few but high-value dispatches, which suits the app’s one-invoice-at-a-time flow for owners, dispatch desks and site teams handling urgent dispatches. If your unit produces a large number of e-way bills, use the official portal’s bulk upload or an API/GSP route; see /bulk-eway-bill-generation and check your file with /tools/bulk-eway-bill-data-checker.',
    checklist: [
      'Check whether the load is over-dimensional cargo and plan validity at 1 day per 20 km.',
      'For SKD/CKD or lot shipments, issue the full invoice before the first lot and a challan for each lot.',
      'Generate a separate e-way bill for each lot.',
      'Confirm the delivery site PIN and distance for project deliveries.',
      'Check the invoice date is within 180 days before generating.',
      'Keep transporter and trailer details ready for Part B updates.',
    ],
    faq: [
      {
        q: 'What is the e-way bill validity for over-dimensional cargo?',
        a: 'For over-dimensional cargo, validity is 1 day for every 20 km or part of it. Normal cargo gets 1 day for every 200 km.',
      },
      {
        q: 'How do e-way bills work when a machine is shipped in lots?',
        a: 'Generally, the full invoice is issued before the first lot and each lot moves with a delivery challan referring to that invoice and its own e-way bill. Check Rule 55 for the exact conditions.',
      },
      {
        q: 'Does a machine sent for repair need an e-way bill?',
        a: 'It usually moves on a delivery challan, and an e-way bill is generally needed if the value exceeds the limit. Check the position for your case with your adviser.',
      },
      {
        q: 'Can I generate an e-way bill for a machine invoiced many months ago?',
        a: 'From 1 January 2025, an e-way bill cannot be generated for a document dated more than 180 days earlier. Verify the current position on the official portal.',
      },
      {
        q: 'Can the e-way bill be extended if the trailer is held up on the way?',
        a: 'Yes, within 8 hours before or after expiry, when goods cannot reach in time for reasons such as an accident or trans-shipment delay. The app supports extending validity.',
      },
    ],
    related: [
      {
        href: '/eway-bill-validity',
        label: 'E-way bill validity',
        text: 'Normal cargo and ODC validity, and how extension works.',
      },
      {
        href: '/eway-bill-distance-rules',
        label: 'Distance rules',
        text: 'How PIN-to-PIN distance is set and how much you can change it.',
      },
      {
        href: '/blog/eway-bill-returns-and-special-transactions',
        label: 'Special transactions',
        text: 'E-way bills for lots, repairs, exhibitions and other non-sale movements.',
      },
      {
        href: '/blog/delivery-challan-vs-tax-invoice',
        label: 'Delivery challan vs tax invoice',
        text: 'Which document moves with a machine and when.',
      },
    ],
    tools: [
      {
        slug: 'distance-calculator',
        why: 'Estimate distance and validity for slow, long-haul machinery and ODC loads.',
      },
      {
        slug: 'delivery-challan-generator',
        why: 'Prepare a challan for each SKD/CKD lot, repair trip or exhibition movement.',
      },
      {
        slug: 'amount-in-words-converter',
        why: 'Write high-value machine invoice totals in words correctly.',
      },
    ],
  },

  // 6. E-commerce & D2C
  {
    slug: 'ecommerce-d2c',
    name: 'E-commerce sellers and D2C brands',
    shortName: 'E-commerce & D2C',
    seoTitle: 'E-Way Bill for E-commerce Sellers & D2C Brands',
    metaDescription:
      'E-way bill rules for online sellers and D2C brands: courier parcels, B2B orders above ₹50,000, customer returns, and stock moved to warehouses in other states.',
    h1: 'E-way bills for e-commerce sellers and D2C brands',
    intro:
      'Most online orders are small parcels well below the e-way bill limit. The e-way bill questions come with bulk B2B orders, returns, and stock sent to warehouses and fulfilment centres.',
    quickAnswer:
      'An e-commerce or D2C parcel needs an e-way bill only when its consignment value exceeds ₹50,000 (or your state’s intra-state limit for local deliveries); most small consumer parcels fall below it. Where goods are supplied through an e-commerce operator or a courier agency, Part A may be furnished by that operator or courier on the seller’s authorisation. Stock sent to your own warehouse in another state is generally treated as a supply between distinct persons; check with your adviser.',
    icon: 'ecommerce',
    profile: [
      {
        title: 'Many small parcels',
        text: 'Consumer orders ship daily through courier and logistics partners, mostly as individual parcels of low value.',
      },
      {
        title: 'Occasional bulk B2B orders',
        text: 'Corporate gifting, reseller and retailer orders can be large single invoices that cross the e-way bill limit.',
      },
      {
        title: 'Returns',
        text: 'Customer returns and return-to-origin (RTO) parcels flow back to the seller or the warehouse.',
      },
      {
        title: 'Warehouses in several states',
        text: 'Brands place stock in their own or third-party warehouses and fulfilment centres in other states to deliver faster.',
      },
    ],
    movements: [
      {
        scenario: 'Single consumer parcel below ₹50,000',
        document: 'Tax invoice',
        ewayBill: 'Generally not required (check your state’s intra-state limit for local deliveries)',
      },
      {
        scenario: 'B2B or bulk order above ₹50,000',
        document: 'Tax invoice',
        ewayBill: 'Required; Part A may be furnished by the courier or e-commerce operator on your authorisation',
      },
      {
        scenario: 'Stock sent to your own warehouse in another state',
        document: 'Tax invoice (generally treated as a supply between distinct persons; check with your adviser)',
        ewayBill: 'Required if the value exceeds ₹50,000',
      },
      {
        scenario: 'Stock moved between warehouses in the same state, same GSTIN',
        document: 'Delivery challan',
        ewayBill: 'Required if the value exceeds the limit',
      },
      {
        scenario: 'Customer return or RTO parcel',
        document: 'As per your return process; portal sub-type Sales Return',
        ewayBill: 'Required only if the value of the returned goods exceeds the limit',
      },
    ],
    painPoints: [
      {
        label: 'Assuming the courier handles it',
        text: 'The courier or operator may furnish Part A on your authorisation, but the responsibility for a correct e-way bill on high-value orders still needs to be agreed and checked.',
      },
      {
        label: 'Forgetting warehouse transfers',
        text: 'Stock moved to a fulfilment centre in another state is not just an internal move. It generally needs a tax invoice and an e-way bill above the limit.',
      },
      {
        label: 'Bulk orders split across boxes',
        text: 'A large B2B invoice shipped in several boxes is still one consignment value. Splitting boxes does not split the invoice for the limit.',
      },
      {
        label: 'Returns without papers',
        text: 'High-value returns coming back from customers or resellers need a document and, above the limit, an e-way bill.',
      },
    ],
    appFit: [
      {
        need: 'Invoice and e-way bill for large B2B orders',
        how: 'Create the GST invoice and generate its e-way bill in one flow, with buyer GSTIN filling name, address, state and PIN.',
      },
      {
        need: 'Invoices from your store or billing software',
        how: 'Import the invoice PDF; the app reads buyer, GSTIN, items, HSN and totals, and you review it before generating.',
      },
      {
        need: 'Shipping to a reseller’s warehouse',
        how: 'Use Bill To / Ship To and Dispatch From when goods leave from a warehouse and go to a different delivery address.',
      },
      {
        need: 'Sharing papers with the courier',
        how: 'Download the e-way bill PDF and share it on WhatsApp or email with the logistics partner.',
      },
    ],
    volumeNote:
      'E-Way Easy has no bulk generation, marketplace or ERP integration, or API access. If your warehouse ships many orders above the limit every day, use the official portal’s bulk upload or an API/GSP route, or agree with your courier or operator on Part A; see /bulk-eway-bill-generation and check upload data with /tools/bulk-eway-bill-data-checker. The app suits per-dispatch work: bulk B2B orders, warehouse transfers and urgent shipments handled by owners or small teams.',
    checklist: [
      'Check whether the order’s consignment value exceeds ₹50,000 or your state’s intra-state limit.',
      'For courier shipments, agree who furnishes Part A and confirm it is done before pickup.',
      'Treat stock moved to another state’s warehouse as a supply and check the tax treatment.',
      'Use a delivery challan for same-GSTIN warehouse transfers within the state.',
      'Keep returns documented and generate an e-way bill for high-value returns.',
    ],
    faq: [
      {
        q: 'Do e-commerce parcels below ₹50,000 need an e-way bill?',
        a: 'Generally no, because the limit applies to each consignment’s value. Some states have a different limit for intra-state movement, so check your state’s notification.',
      },
      {
        q: 'Can my courier generate the e-way bill for my parcel?',
        a: 'Where goods are supplied through a courier agency or e-commerce operator, Part A may be furnished by that courier or operator on your authorisation. Agree this with your logistics partner in advance.',
      },
      {
        q: 'Does stock sent to a fulfilment centre in another state need an e-way bill?',
        a: 'Yes, if the value exceeds ₹50,000. Stock moved to your own registration in another state is generally treated as a supply on a tax invoice; check with your adviser.',
      },
      {
        q: 'Do customer returns need an e-way bill?',
        a: 'Only if the value of the returned goods exceeds the limit. The portal has a Sales Return sub-type for such movements.',
      },
      {
        q: 'Can E-Way Easy connect to my marketplace or online store?',
        a: 'No. The app has no marketplace, ERP or API integration and no bulk upload. You can import an invoice PDF and generate e-way bills one invoice at a time.',
      },
    ],
    related: [
      {
        href: '/blog/eway-bill-limit-50000-threshold-exceptions',
        label: 'The ₹50,000 limit explained',
        text: 'How consignment value is worked out for each parcel or order.',
      },
      {
        href: '/blog/eway-bill-returns-and-special-transactions',
        label: 'Returns and special transactions',
        text: 'E-way bills for returns and stock transfers.',
      },
      {
        href: '/bulk-eway-bill-generation',
        label: 'Bulk e-way bill generation',
        text: 'Using the official portal’s bulk upload for high volumes.',
      },
      {
        href: '/invoice-pdf-to-eway-bill',
        label: 'Invoice PDF to e-way bill',
        text: 'Generate an e-way bill from an invoice made elsewhere.',
      },
    ],
    tools: [
      {
        slug: 'eway-bill-eligibility-checker',
        why: 'Check whether a bulk or B2B order crosses the e-way bill limit.',
      },
      {
        slug: 'gst-inclusive-exclusive-calculator',
        why: 'Split GST out of inclusive online selling prices to get the taxable value.',
      },
      {
        slug: 'bulk-eway-bill-data-checker',
        why: 'Check a bulk upload file before submitting it on the official portal.',
      },
    ],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
