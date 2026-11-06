// Builds the free Excel invoice formats in public/downloads/ (run: node scripts/make-excel-formats.mjs).
// The files are committed; re-run only when the layout changes. Sample values are illustrative.
import ExcelJS from 'exceljs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'downloads');
fs.mkdirSync(OUT, { recursive: true });

const GREEN = 'FF174F39';
const LIGHT = 'FFEAF4EE';
const INPUT = 'FFFFFBEB';
const MONEY = '#,##0.00';
const thin = { style: 'thin', color: { argb: 'FFB9C7BF' } };
const box = { top: thin, left: thin, bottom: thin, right: thin };

function setup(ws, lastCol) {
  ws.pageSetup = { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1, fitToHeight: 0, margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.5, header: 0.2, footer: 0.2 } };
  ws.properties.defaultRowHeight = 18;
  ws.views = [{ showGridLines: false }];
  ws.pageSetup.printArea = `A1:${lastCol}60`;
}
function title(ws, range, text) {
  ws.mergeCells(range);
  const c = ws.getCell(range.split(':')[0]);
  c.value = text;
  c.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
  c.alignment = { horizontal: 'center', vertical: 'middle' };
  ws.getRow(c.row).height = 30;
}
function label(ws, addr, text) {
  const c = ws.getCell(addr);
  c.value = text;
  c.font = { bold: true, size: 10, color: { argb: 'FF2F3B35' } };
}
function input(ws, range, value, opts = {}) {
  if (range.includes(':')) ws.mergeCells(range);
  const c = ws.getCell(range.split(':')[0]);
  c.value = value;
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: INPUT } };
  c.border = box;
  c.alignment = { vertical: 'middle', wrapText: true, ...(opts.align ? { horizontal: opts.align } : {}) };
  if (opts.numFmt) c.numFmt = opts.numFmt;
  return c;
}
function head(ws, row, headers) {
  headers.forEach((h, i) => {
    const c = ws.getRow(row).getCell(i + 1);
    c.value = h;
    c.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GREEN } };
    c.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    c.border = box;
  });
  ws.getRow(row).height = 32;
}
function guideSheet(wb, lines) {
  const ws = wb.addWorksheet('How to use');
  ws.getColumn(1).width = 110;
  ws.views = [{ showGridLines: false }];
  lines.forEach((l, i) => {
    const c = ws.getCell(`A${i + 1}`);
    c.value = l;
    c.alignment = { wrapText: true, vertical: 'top' };
    if (i === 0) c.font = { bold: true, size: 14, color: { argb: GREEN } };
  });
}

// ------------------------------------------------------------------ GST tax invoice
async function gstInvoice() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'E-Way Easy (ewayeasy.in)';
  wb.title = 'GST Tax Invoice Format';
  wb.calcProperties.fullCalcOnLoad = true;
  const ws = wb.addWorksheet('GST Invoice');
  const widths = [5, 30, 10, 8, 7, 11, 10, 13, 7, 11, 11, 11, 14];
  widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  setup(ws, 'M');

  title(ws, 'A1:M1', 'TAX INVOICE');
  ws.mergeCells('A2:M2');
  ws.getCell('A2').value = 'Original for recipient';
  ws.getCell('A2').alignment = { horizontal: 'right' };
  ws.getCell('A2').font = { italic: true, size: 9 };

  // Seller and invoice details
  label(ws, 'A3', 'Seller');
  input(ws, 'A4:F4', 'Sample Pipes Pvt Ltd (Rajkot)');
  input(ws, 'A5:F5', 'Plot 12, GIDC Estate, Rajkot, Gujarat 360004');
  label(ws, 'A6', 'GSTIN'); input(ws, 'B6:C6', '24ABCDE1234F1Z5');
  label(ws, 'D6', 'State code'); input(ws, 'F6', '24', { align: 'center' });

  label(ws, 'H3', 'Invoice details');
  label(ws, 'H4', 'Invoice no.'); input(ws, 'J4:M4', 'RPM/26-27/0001');
  label(ws, 'H5', 'Invoice date'); input(ws, 'J5:M5', new Date(Date.UTC(2026, 10, 6)), { numFmt: 'dd-mm-yyyy', align: 'left' });
  label(ws, 'H6', 'Place of supply (state code)'); input(ws, 'L6:M6', '27', { align: 'center' });
  label(ws, 'H7', 'Reverse charge'); input(ws, 'J7:M7', 'No');

  // Buyer / ship to
  label(ws, 'A8', 'Bill to (buyer)');
  input(ws, 'A9:F9', 'Sample Traders (Pune)');
  input(ws, 'A10:F10', '14, Market Yard Road, Pune, Maharashtra 411001');
  label(ws, 'A11', 'GSTIN'); input(ws, 'B11:C11', '27ABCDE1234F1Z0');
  label(ws, 'D11', 'State code'); input(ws, 'F11', '27', { align: 'center' });
  label(ws, 'H8', 'Ship to (if different)');
  input(ws, 'H9:M10', 'Same as bill to');

  // Supply type (formula)
  label(ws, 'A12', 'Supply type');
  ws.mergeCells('B12:F12');
  ws.getCell('B12').value = { formula: 'IF(TRIM(F6)="","",IF(TRIM(F6)=TRIM(L6),"Intra-state: CGST + SGST","Inter-state: IGST"))' };
  ws.getCell('B12').font = { bold: true, color: { argb: GREEN } };

  // Items
  const H = 14;
  head(ws, H, ['Sr', 'Description of goods / services', 'HSN/SAC', 'Qty', 'Unit', 'Rate (₹)', 'Discount (₹)', 'Taxable value (₹)', 'GST %', 'CGST (₹)', 'SGST (₹)', 'IGST (₹)', 'Line total (₹)']);
  const first = H + 1, last = H + 10;
  const sample = [
    ['PVC pipe 110 mm, 6 m length', '3917', 100, 'PCS', 1250, 0, 18],
    ['PVC elbow 110 mm', '3917', 200, 'PCS', 85, 500, 18],
  ];
  for (let r = first; r <= last; r++) {
    const row = ws.getRow(r);
    const s = sample[r - first];
    row.getCell(1).value = { formula: `IF(B${r}="","",ROW()-${H})` };
    const cells = s ?? ['', '', null, '', null, null, null];
    [2, 3, 4, 5, 6, 7, 9].forEach((col, i) => {
      const c = row.getCell(col);
      c.value = cells[i] === '' ? null : cells[i];
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: INPUT } };
    });
    row.getCell(8).value = { formula: `IF(D${r}="","",ROUND(D${r}*F${r}-IF(G${r}="",0,G${r}),2))` };
    row.getCell(10).value = { formula: `IF(H${r}="","",IF(TRIM($F$6)=TRIM($L$6),ROUND(H${r}*I${r}/200,2),0))` };
    row.getCell(11).value = { formula: `IF(H${r}="","",IF(TRIM($F$6)=TRIM($L$6),ROUND(H${r}*I${r}/200,2),0))` };
    row.getCell(12).value = { formula: `IF(H${r}="","",IF(TRIM($F$6)=TRIM($L$6),0,ROUND(H${r}*I${r}/100,2)))` };
    row.getCell(13).value = { formula: `IF(H${r}="","",H${r}+J${r}+K${r}+L${r})` };
    for (let col = 1; col <= 13; col++) {
      const c = row.getCell(col);
      c.border = box;
      if ([6, 7, 8, 10, 11, 12, 13].includes(col)) c.numFmt = MONEY;
      if ([1, 3, 4, 5, 9].includes(col)) c.alignment = { horizontal: 'center' };
    }
  }

  // Totals
  const T = last + 1;
  ws.mergeCells(`A${T}:G${T}`);
  ws.getCell(`A${T}`).value = 'Total';
  ws.getCell(`A${T}`).alignment = { horizontal: 'right' };
  for (const col of ['H', 'J', 'K', 'L', 'M']) {
    const c = ws.getCell(`${col}${T}`);
    c.value = { formula: `SUM(${col}${first}:${col}${last})` };
    c.numFmt = MONEY;
  }
  ws.getRow(T).eachCell((c) => { c.font = { bold: true }; c.border = box; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } }; });

  const rows = [
    ['Taxable value', `H${T}`],
    ['CGST', `J${T}`],
    ['SGST', `K${T}`],
    ['IGST', `L${T}`],
    ['Round off', `ROUND(M${T},0)-M${T}`],
    ['Invoice total (₹)', `ROUND(M${T},0)`],
  ];
  rows.forEach(([name, f], i) => {
    const r = T + 2 + i;
    ws.mergeCells(`J${r}:L${r}`);
    ws.getCell(`J${r}`).value = name;
    ws.getCell(`J${r}`).alignment = { horizontal: 'right' };
    const c = ws.getCell(`M${r}`);
    c.value = { formula: f };
    c.numFmt = MONEY;
    c.border = box;
    if (i === rows.length - 1) {
      ws.getCell(`J${r}`).font = { bold: true };
      c.font = { bold: true, size: 12 };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
    }
  });

  const W = T + 2;
  label(ws, `A${W}`, 'Amount in words');
  input(ws, `A${W + 1}:H${W + 2}`, 'Rupees One Lakh Sixty-Six Thousand Nine Hundred Seventy Only');
  label(ws, `A${W + 3}`, 'Bank details');
  input(ws, `A${W + 4}:H${W + 5}`, 'Bank: Sample Bank · A/c no: 000000000000 · IFSC: SAMP0000000 · UPI: sample@upi');
  label(ws, `A${W + 6}`, 'Terms');
  input(ws, `A${W + 7}:H${W + 8}`, 'Goods once sold will not be taken back. Interest at 18% p.a. on payments delayed beyond 30 days. Subject to Rajkot jurisdiction.');

  const S = W + 10;
  ws.mergeCells(`J${S}:M${S}`);
  ws.getCell(`J${S}`).value = { formula: 'CONCATENATE("For ",A4)' };
  ws.getCell(`J${S}`).alignment = { horizontal: 'center' };
  ws.mergeCells(`J${S + 3}:M${S + 3}`);
  ws.getCell(`J${S + 3}`).value = 'Authorised signatory';
  ws.getCell(`J${S + 3}`).alignment = { horizontal: 'center' };
  ws.getCell(`J${S + 3}`).border = { top: thin };
  ws.mergeCells(`A${S + 5}:M${S + 5}`);
  ws.getCell(`A${S + 5}`).value = 'Free GST invoice format by E-Way Easy · ewayeasy.in/invoice-format-excel · Sample values are illustrative; replace them with your own.';
  ws.getCell(`A${S + 5}`).font = { italic: true, size: 8, color: { argb: 'FF6B7A72' } };

  guideSheet(wb, [
    'How to use this GST invoice format',
    '1. Replace the sample seller details with yours: business name, address, GSTIN and your 2-digit state code (cell F6).',
    '2. Enter the invoice number (unique for the financial year, up to 16 characters, letters, numbers, - and / only) and the date.',
    '3. Enter the place of supply as a 2-digit state code (cell L6). If it matches your state code, CGST + SGST are charged; if not, IGST is charged. Cell B12 shows which.',
    '4. Fill the buyer (bill to) details and GSTIN. Use "Ship to" if goods go to a different address.',
    '5. Fill one row per item: description, HSN/SAC, quantity, unit, rate, any discount and the GST rate. Taxable value, tax, line total and invoice total calculate automatically.',
    '6. Type the amount in words (Excel has no built-in function for Indian rupees in words), add bank details and terms, then save as PDF or print on A4.',
    'Light yellow cells are for your input. White cells contain formulas: do not type over them.',
    'Need buyer details filled from GSTIN and an e-way bill from the same invoice? Use the E-Way Easy Android app. Prefer not to use Excel? Make the invoice online free at ewayeasy.in/invoice-generator.',
    'This format is a starting point. Check current GST rules (CGST Rules, Rule 46) and whether e-invoicing applies to your business.',
  ]);
  await wb.xlsx.writeFile(path.join(OUT, 'gst-invoice-format.xlsx'));
}

// ------------------------------------------------------------------ Bill without GST
async function simpleBill() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'E-Way Easy (ewayeasy.in)';
  wb.title = 'Bill Format without GST';
  wb.calcProperties.fullCalcOnLoad = true;
  const ws = wb.addWorksheet('Bill');
  [6, 40, 10, 9, 13, 15].forEach((w, i) => { ws.getColumn(i + 1).width = w; });
  setup(ws, 'F');

  title(ws, 'A1:F1', 'BILL');
  label(ws, 'A3', 'From');
  input(ws, 'A4:C4', 'Sample Kirana Store');
  input(ws, 'A5:C5', 'Shop 3, Station Road, Jamnagar 361001');
  input(ws, 'A6:C6', 'Phone: 90000 00000');
  label(ws, 'D3', 'Bill no.'); input(ws, 'E3:F3', 'B-0001');
  label(ws, 'D4', 'Date'); input(ws, 'E4:F4', new Date(Date.UTC(2026, 10, 6)), { numFmt: 'dd-mm-yyyy', align: 'left' });
  label(ws, 'A8', 'Bill to');
  input(ws, 'A9:C9', 'Customer name');
  input(ws, 'A10:C10', 'Address or phone (optional)');

  const H = 12;
  head(ws, H, ['Sr', 'Item / description', 'Qty', 'Unit', 'Rate (₹)', 'Amount (₹)']);
  const first = H + 1, last = H + 12;
  const sample = [['Basmati rice 5 kg bag', 4, 'BAG', 640], ['Sunflower oil 1 L', 6, 'LTR', 165]];
  for (let r = first; r <= last; r++) {
    const row = ws.getRow(r);
    const s = sample[r - first];
    row.getCell(1).value = { formula: `IF(B${r}="","",ROW()-${H})` };
    [2, 3, 4, 5].forEach((col, i) => {
      const c = row.getCell(col);
      c.value = s ? s[i] : null;
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: INPUT } };
    });
    row.getCell(6).value = { formula: `IF(C${r}="","",ROUND(C${r}*E${r},2))` };
    for (let col = 1; col <= 6; col++) {
      const c = row.getCell(col);
      c.border = box;
      if (col >= 5) c.numFmt = MONEY;
      if ([1, 3, 4].includes(col)) c.alignment = { horizontal: 'center' };
    }
  }
  const T = last + 1;
  const tot = [
    ['Subtotal', `SUM(F${first}:F${last})`, false],
    ['Discount', null, true],
    ['Other charges', null, true],
    ['Total (₹)', `ROUND(F${T}-IF(F${T + 1}="",0,F${T + 1})+IF(F${T + 2}="",0,F${T + 2}),0)`, false],
  ];
  tot.forEach(([name, f, isInput], i) => {
    const r = T + i;
    ws.mergeCells(`D${r}:E${r}`);
    ws.getCell(`D${r}`).value = name;
    ws.getCell(`D${r}`).alignment = { horizontal: 'right' };
    const c = ws.getCell(`F${r}`);
    if (f) c.value = { formula: f };
    if (isInput) c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: INPUT } };
    c.numFmt = MONEY;
    c.border = box;
    if (i === tot.length - 1) {
      ws.getCell(`D${r}`).font = { bold: true };
      c.font = { bold: true, size: 12 };
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: LIGHT } };
    }
  });
  const W = T + 5;
  label(ws, `A${W}`, 'Amount in words');
  input(ws, `A${W + 1}:F${W + 1}`, 'Rupees Three Thousand Five Hundred Fifty Only');
  label(ws, `A${W + 2}`, 'Payment');
  input(ws, `A${W + 3}:F${W + 3}`, 'Cash / UPI: sample@upi');
  label(ws, `A${W + 4}`, 'Declaration (optional)');
  input(ws, `A${W + 5}:F${W + 6}`, 'Seller not registered under GST. No GST charged.');
  ws.mergeCells(`D${W + 9}:F${W + 9}`);
  ws.getCell(`D${W + 9}`).value = 'Signature';
  ws.getCell(`D${W + 9}`).alignment = { horizontal: 'center' };
  ws.getCell(`D${W + 9}`).border = { top: thin };
  ws.mergeCells(`A${W + 11}:F${W + 11}`);
  ws.getCell(`A${W + 11}`).value = 'Free bill format by E-Way Easy · ewayeasy.in/invoice-format-excel · Sample values are illustrative.';
  ws.getCell(`A${W + 11}`).font = { italic: true, size: 8, color: { argb: 'FF6B7A72' } };

  guideSheet(wb, [
    'How to use this bill format (without GST)',
    '1. For sellers who are not registered under GST. A registered seller must not issue a plain bill for a taxable supply: use the GST invoice format instead.',
    '2. Replace the sample shop details, bill number and date. Keep bill numbers in one running series.',
    '3. Fill one row per item: description, quantity, unit and rate. Amounts, subtotal and total calculate automatically.',
    '4. Enter any discount or other charges in the yellow cells next to the totals. The total is rounded to the nearest rupee.',
    '5. Composition taxpayers and sellers of exempt goods issue a bill of supply. Composition taxpayers must change the declaration to: "composition taxable person, not eligible to collect tax on supplies".',
    'Light yellow cells are for your input. White cells contain formulas: do not type over them.',
    'Prefer a ready PDF without Excel? Make a bill online free at ewayeasy.in/invoice-generator (choose Without GST).',
  ]);
  await wb.xlsx.writeFile(path.join(OUT, 'bill-format-without-gst.xlsx'));
}

await gstInvoice();
await simpleBill();
console.log('Wrote', fs.readdirSync(OUT).join(', '));
