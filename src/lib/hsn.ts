// HSN chapter reference (2-digit level) based on the Harmonized System nomenclature as used in
// the Indian Customs Tariff / GST. Chapter-level only — no rates. Users must confirm the full
// 4/6/8-digit code and the applicable rate on CBIC.

export interface HsnSection {
  section: string;
  title: string;
}

export interface HsnChapter {
  code: string; // "01".."99"
  title: string;
  section: string; // Roman numeral of the HS section, or "SAC" for services
  keywords?: string[];
}

export const CBIC_GST_URL = 'https://cbic-gst.gov.in/';

export const HSN_SECTIONS: HsnSection[] = [
  { section: 'I', title: 'Live animals; animal products' },
  { section: 'II', title: 'Vegetable products' },
  { section: 'III', title: 'Animal, vegetable or microbial fats and oils' },
  { section: 'IV', title: 'Prepared foodstuffs; beverages, spirits and vinegar; tobacco' },
  { section: 'V', title: 'Mineral products' },
  { section: 'VI', title: 'Products of the chemical or allied industries' },
  { section: 'VII', title: 'Plastics and rubber and articles thereof' },
  { section: 'VIII', title: 'Raw hides and skins, leather, furskins; saddlery, travel goods, handbags' },
  { section: 'IX', title: 'Wood, cork, straw and plaiting materials and articles thereof' },
  { section: 'X', title: 'Pulp of wood; paper and paperboard and articles thereof' },
  { section: 'XI', title: 'Textiles and textile articles' },
  { section: 'XII', title: 'Footwear, headgear, umbrellas; prepared feathers; artificial flowers' },
  { section: 'XIII', title: 'Articles of stone, plaster, cement, asbestos, mica; ceramic products; glass' },
  { section: 'XIV', title: 'Pearls, precious stones, precious metals, imitation jewellery; coin' },
  { section: 'XV', title: 'Base metals and articles of base metal' },
  { section: 'XVI', title: 'Machinery and mechanical appliances; electrical equipment' },
  { section: 'XVII', title: 'Vehicles, aircraft, vessels and associated transport equipment' },
  { section: 'XVIII', title: 'Optical, photographic, measuring, medical instruments; clocks; musical instruments' },
  { section: 'XIX', title: 'Arms and ammunition' },
  { section: 'XX', title: 'Miscellaneous manufactured articles' },
  { section: 'XXI', title: "Works of art, collectors' pieces and antiques" },
  { section: 'XXII', title: 'Project imports and special classification (Indian tariff)' },
  { section: 'SAC', title: 'Services (Services Accounting Code)' },
];

export const HSN_CHAPTERS: HsnChapter[] = [
  { code: '01', section: 'I', title: 'Live animals', keywords: ['cattle', 'poultry', 'horses'] },
  { code: '02', section: 'I', title: 'Meat and edible meat offal', keywords: ['chicken', 'mutton'] },
  { code: '03', section: 'I', title: 'Fish and crustaceans, molluscs and other aquatic invertebrates', keywords: ['seafood', 'prawns'] },
  { code: '04', section: 'I', title: "Dairy produce; birds' eggs; natural honey; edible products of animal origin not elsewhere specified", keywords: ['milk', 'curd', 'paneer', 'butter', 'ghee', 'cheese', 'eggs', 'honey'] },
  { code: '05', section: 'I', title: 'Products of animal origin, not elsewhere specified or included', keywords: ['hair', 'bones'] },
  { code: '06', section: 'II', title: 'Live trees and other plants; bulbs, roots; cut flowers and ornamental foliage', keywords: ['plants', 'flowers', 'nursery'] },
  { code: '07', section: 'II', title: 'Edible vegetables and certain roots and tubers', keywords: ['potato', 'onion', 'pulses'] },
  { code: '08', section: 'II', title: 'Edible fruit and nuts; peel of citrus fruit or melons', keywords: ['fruits', 'cashew', 'almonds', 'dry fruits'] },
  { code: '09', section: 'II', title: 'Coffee, tea, maté and spices', keywords: ['tea', 'coffee', 'pepper', 'turmeric', 'chilli'] },
  { code: '10', section: 'II', title: 'Cereals', keywords: ['rice', 'wheat', 'maize'] },
  { code: '11', section: 'II', title: 'Products of the milling industry; malt; starches; inulin; wheat gluten', keywords: ['flour', 'atta', 'maida', 'besan'] },
  { code: '12', section: 'II', title: 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; industrial or medicinal plants; straw and fodder', keywords: ['groundnut', 'soya', 'seeds'] },
  { code: '13', section: 'II', title: 'Lac; gums, resins and other vegetable saps and extracts', keywords: ['gum'] },
  { code: '14', section: 'II', title: 'Vegetable plaiting materials; vegetable products not elsewhere specified or included', keywords: ['bamboo'] },
  { code: '15', section: 'III', title: 'Animal, vegetable or microbial fats and oils and their cleavage products; prepared edible fats; animal or vegetable waxes', keywords: ['edible oil', 'vanaspati', 'wax'] },
  { code: '16', section: 'IV', title: 'Preparations of meat, fish, crustaceans, molluscs or other aquatic invertebrates, or of insects', keywords: ['sausages'] },
  { code: '17', section: 'IV', title: 'Sugars and sugar confectionery', keywords: ['sugar', 'jaggery', 'candy'] },
  { code: '18', section: 'IV', title: 'Cocoa and cocoa preparations', keywords: ['chocolate'] },
  { code: '19', section: 'IV', title: 'Preparations of cereals, flour, starch or milk; pastrycooks\' products', keywords: ['biscuits', 'bread', 'pasta', 'cakes'] },
  { code: '20', section: 'IV', title: 'Preparations of vegetables, fruit, nuts or other parts of plants', keywords: ['jam', 'pickles', 'juice'] },
  { code: '21', section: 'IV', title: 'Miscellaneous edible preparations', keywords: ['sauces', 'namkeen', 'ice cream', 'food supplements'] },
  { code: '22', section: 'IV', title: 'Beverages, spirits and vinegar', keywords: ['water', 'soft drinks', 'alcohol'] },
  { code: '23', section: 'IV', title: 'Residues and waste from the food industries; prepared animal fodder', keywords: ['cattle feed', 'oil cake'] },
  { code: '24', section: 'IV', title: 'Tobacco and manufactured tobacco substitutes; products intended for inhalation without combustion', keywords: ['cigarettes', 'bidi'] },
  { code: '25', section: 'V', title: 'Salt; sulphur; earths and stone; plastering materials, lime and cement', keywords: ['cement', 'sand', 'marble', 'granite blocks', 'gypsum'] },
  { code: '26', section: 'V', title: 'Ores, slag and ash', keywords: ['iron ore', 'fly ash'] },
  { code: '27', section: 'V', title: 'Mineral fuels, mineral oils and products of their distillation; bituminous substances; mineral waxes', keywords: ['coal', 'petrol', 'diesel', 'lpg', 'bitumen'] },
  { code: '28', section: 'VI', title: 'Inorganic chemicals; compounds of precious metals, rare-earth metals, radioactive elements or isotopes', keywords: ['acids', 'chemicals'] },
  { code: '29', section: 'VI', title: 'Organic chemicals', keywords: ['solvents', 'alcohols'] },
  { code: '30', section: 'VI', title: 'Pharmaceutical products', keywords: ['medicines', 'drugs', 'tablets'] },
  { code: '31', section: 'VI', title: 'Fertilisers', keywords: ['urea', 'dap'] },
  { code: '32', section: 'VI', title: 'Tanning or dyeing extracts; dyes, pigments; paints and varnishes; putty and other mastics; inks', keywords: ['paint', 'colours', 'ink'] },
  { code: '33', section: 'VI', title: 'Essential oils and resinoids; perfumery, cosmetic or toilet preparations', keywords: ['cosmetics', 'shampoo', 'perfume'] },
  { code: '34', section: 'VI', title: 'Soap, organic surface-active agents, washing and lubricating preparations, waxes, polishes, candles', keywords: ['soap', 'detergent', 'candles'] },
  { code: '35', section: 'VI', title: 'Albuminoidal substances; modified starches; glues; enzymes', keywords: ['adhesive', 'glue'] },
  { code: '36', section: 'VI', title: 'Explosives; pyrotechnic products; matches; pyrophoric alloys; certain combustible preparations', keywords: ['fireworks', 'matches'] },
  { code: '37', section: 'VI', title: 'Photographic or cinematographic goods', keywords: ['film'] },
  { code: '38', section: 'VI', title: 'Miscellaneous chemical products', keywords: ['insecticides', 'pesticides'] },
  { code: '39', section: 'VII', title: 'Plastics and articles thereof', keywords: ['pvc', 'pipes', 'polymers', 'plastic'] },
  { code: '40', section: 'VII', title: 'Rubber and articles thereof', keywords: ['tyres', 'tubes'] },
  { code: '41', section: 'VIII', title: 'Raw hides and skins (other than furskins) and leather' },
  { code: '42', section: 'VIII', title: 'Articles of leather; saddlery and harness; travel goods, handbags and similar containers', keywords: ['bags', 'wallets', 'belts'] },
  { code: '43', section: 'VIII', title: 'Furskins and artificial fur; manufactures thereof' },
  { code: '44', section: 'IX', title: 'Wood and articles of wood; wood charcoal', keywords: ['timber', 'plywood'] },
  { code: '45', section: 'IX', title: 'Cork and articles of cork' },
  { code: '46', section: 'IX', title: 'Manufactures of straw, of esparto or of other plaiting materials; basketware and wickerwork', keywords: ['baskets'] },
  { code: '47', section: 'X', title: 'Pulp of wood or of other fibrous cellulosic material; recovered paper or paperboard', keywords: ['waste paper'] },
  { code: '48', section: 'X', title: 'Paper and paperboard; articles of paper pulp, of paper or of paperboard', keywords: ['cartons', 'boxes', 'tissue'] },
  { code: '49', section: 'X', title: 'Printed books, newspapers, pictures and other products of the printing industry; manuscripts, typescripts and plans', keywords: ['books', 'printing'] },
  { code: '50', section: 'XI', title: 'Silk' },
  { code: '51', section: 'XI', title: 'Wool, fine or coarse animal hair; horsehair yarn and woven fabric' },
  { code: '52', section: 'XI', title: 'Cotton', keywords: ['cotton yarn', 'fabric'] },
  { code: '53', section: 'XI', title: 'Other vegetable textile fibres; paper yarn and woven fabrics of paper yarn', keywords: ['jute'] },
  { code: '54', section: 'XI', title: 'Man-made filaments; strip and the like of man-made textile materials', keywords: ['polyester', 'nylon'] },
  { code: '55', section: 'XI', title: 'Man-made staple fibres', keywords: ['viscose'] },
  { code: '56', section: 'XI', title: 'Wadding, felt and nonwovens; special yarns; twine, cordage, ropes and cables', keywords: ['rope'] },
  { code: '57', section: 'XI', title: 'Carpets and other textile floor coverings', keywords: ['rugs'] },
  { code: '58', section: 'XI', title: 'Special woven fabrics; tufted textile fabrics; lace; tapestries; trimmings; embroidery' },
  { code: '59', section: 'XI', title: 'Impregnated, coated, covered or laminated textile fabrics; textile articles of a kind suitable for industrial use' },
  { code: '60', section: 'XI', title: 'Knitted or crocheted fabrics' },
  { code: '61', section: 'XI', title: 'Articles of apparel and clothing accessories, knitted or crocheted', keywords: ['t-shirts', 'garments', 'hosiery'] },
  { code: '62', section: 'XI', title: 'Articles of apparel and clothing accessories, not knitted or crocheted', keywords: ['shirts', 'trousers', 'garments', 'sarees'] },
  { code: '63', section: 'XI', title: 'Other made up textile articles; sets; worn clothing and worn textile articles; rags', keywords: ['bed linen', 'curtains', 'sacks'] },
  { code: '64', section: 'XII', title: 'Footwear, gaiters and the like; parts of such articles', keywords: ['shoes', 'chappals'] },
  { code: '65', section: 'XII', title: 'Headgear and parts thereof', keywords: ['helmets', 'caps'] },
  { code: '66', section: 'XII', title: 'Umbrellas, sun umbrellas, walking-sticks, seat-sticks, whips, riding-crops and parts thereof' },
  { code: '67', section: 'XII', title: 'Prepared feathers and down; artificial flowers; articles of human hair' },
  { code: '68', section: 'XIII', title: 'Articles of stone, plaster, cement, asbestos, mica or similar materials', keywords: ['granite slabs', 'marble slabs', 'cement products'] },
  { code: '69', section: 'XIII', title: 'Ceramic products', keywords: ['tiles', 'sanitaryware', 'vitrified', 'bricks'] },
  { code: '70', section: 'XIII', title: 'Glass and glassware', keywords: ['bottles', 'mirrors'] },
  { code: '71', section: 'XIV', title: 'Natural or cultured pearls, precious or semi-precious stones, precious metals, metals clad with precious metal; imitation jewellery; coin', keywords: ['gold', 'silver', 'diamonds', 'jewellery'] },
  { code: '72', section: 'XV', title: 'Iron and steel', keywords: ['tmt bars', 'sheets', 'ingots'] },
  { code: '73', section: 'XV', title: 'Articles of iron or steel', keywords: ['pipes', 'fasteners', 'utensils', 'structures'] },
  { code: '74', section: 'XV', title: 'Copper and articles thereof', keywords: ['brass'] },
  { code: '75', section: 'XV', title: 'Nickel and articles thereof' },
  { code: '76', section: 'XV', title: 'Aluminium and articles thereof' },
  { code: '77', section: 'XV', title: '(Reserved for possible future use in the Harmonized System)' },
  { code: '78', section: 'XV', title: 'Lead and articles thereof' },
  { code: '79', section: 'XV', title: 'Zinc and articles thereof' },
  { code: '80', section: 'XV', title: 'Tin and articles thereof' },
  { code: '81', section: 'XV', title: 'Other base metals; cermets; articles thereof' },
  { code: '82', section: 'XV', title: 'Tools, implements, cutlery, spoons and forks, of base metal; parts thereof of base metal', keywords: ['hand tools', 'knives'] },
  { code: '83', section: 'XV', title: 'Miscellaneous articles of base metal', keywords: ['locks', 'hinges'] },
  { code: '84', section: 'XVI', title: 'Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof', keywords: ['machines', 'pumps', 'computers', 'engines'] },
  { code: '85', section: 'XVI', title: 'Electrical machinery and equipment and parts thereof; sound and television recorders and reproducers, and parts', keywords: ['mobile phones', 'cables', 'motors', 'electronics', 'led'] },
  { code: '86', section: 'XVII', title: 'Railway or tramway locomotives, rolling-stock and parts thereof; track fixtures and fittings; traffic signalling equipment' },
  { code: '87', section: 'XVII', title: 'Vehicles other than railway or tramway rolling-stock, and parts and accessories thereof', keywords: ['cars', 'motorcycles', 'tractors', 'auto parts', 'bicycles'] },
  { code: '88', section: 'XVII', title: 'Aircraft, spacecraft, and parts thereof', keywords: ['drones'] },
  { code: '89', section: 'XVII', title: 'Ships, boats and floating structures' },
  { code: '90', section: 'XVIII', title: 'Optical, photographic, cinematographic, measuring, checking, precision, medical or surgical instruments and apparatus; parts and accessories', keywords: ['spectacles', 'medical devices'] },
  { code: '91', section: 'XVIII', title: 'Clocks and watches and parts thereof' },
  { code: '92', section: 'XVIII', title: 'Musical instruments; parts and accessories of such articles' },
  { code: '93', section: 'XIX', title: 'Arms and ammunition; parts and accessories thereof' },
  { code: '94', section: 'XX', title: 'Furniture; bedding, mattresses, cushions; luminaires and lighting fittings not elsewhere specified; prefabricated buildings', keywords: ['furniture', 'lamps', 'mattress'] },
  { code: '95', section: 'XX', title: 'Toys, games and sports requisites; parts and accessories thereof', keywords: ['toys', 'sports goods'] },
  { code: '96', section: 'XX', title: 'Miscellaneous manufactured articles', keywords: ['pens', 'brushes', 'buttons'] },
  { code: '97', section: 'XXI', title: "Works of art, collectors' pieces and antiques", keywords: ['paintings'] },
  { code: '98', section: 'XXII', title: 'Project imports, laboratory chemicals, passengers\' baggage, personal importations by air or post; ship stores (Indian Customs Tariff)' },
  { code: '99', section: 'SAC', title: 'Services — Services Accounting Code (SAC) headings starting with 99', keywords: ['services', 'sac', 'transport services', 'consultancy', 'job work services', 'gta'] },
];

/** Search by chapter number (e.g. "69", "6907", "9") or keyword (e.g. "tiles"). */
export function searchHsnChapters(query: string, chapters: HsnChapter[] = HSN_CHAPTERS): HsnChapter[] {
  const q = query.trim().toLowerCase();
  if (!q) return chapters;
  const digits = q.replace(/\s/g, '');
  if (/^\d+$/.test(digits)) {
    // A longer code like 69072100 belongs to chapter 69; a single digit matches chapters starting with it.
    const prefix = digits.length >= 2 ? digits.slice(0, 2) : digits;
    return chapters.filter((c) => c.code.startsWith(prefix));
  }
  const words = q.split(/\s+/);
  return chapters.filter((c) => {
    const hay = `${c.title} ${(c.keywords ?? []).join(' ')}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

export function sectionTitle(section: string): string {
  return HSN_SECTIONS.find((s) => s.section === section)?.title ?? '';
}
