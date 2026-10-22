/** @jsxRuntime automatic */
// (pragma above: lets vitest/esbuild compile this file outside Next.js, which uses the automatic runtime anyway)
// Real PDF version of DocumentPreview, built with @react-pdf/renderer from the same view model
// (src/lib/templates/render.ts). Only imported dynamically (on "Download PDF") so it never lands in the
// main bundle. Fonts must be registered first (see fonts.ts) — Noto Sans/Serif include the ₹ glyph.
import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import type { Style } from '@react-pdf/types';
import type { ReactNode } from 'react';
import type { DocumentData } from '@/lib/templates/model';
import { buildView, tint, type DocumentView, type Pair, type PartyView, type TableView } from '@/lib/templates/render';
import { PDF_FONT_FAMILY } from './fonts';

const INK = '#1d2622';
const SOFT = '#55625c';
const FAINT = '#8a958f';
const RULE = '#d9dfdc';

function Caption({ children, color = FAINT, size }: { children: ReactNode; color?: string; size: number }) {
  return <Text style={{ fontSize: size * 0.8, fontWeight: 700, letterSpacing: 0.5, color, marginBottom: 2, textTransform: 'uppercase' }} minPresenceAhead={24}>{children}</Text>;
}

function Party({ p, accent, boxed, size }: { p: PartyView; accent: string; boxed: boolean; size: number }) {
  const box: Style = boxed ? { borderWidth: 0.75, borderColor: RULE, borderStyle: 'solid', borderRadius: 3, padding: 6 } : {};
  return (
    <View style={{ flex: 1, ...box }}>
      <Caption color={accent} size={size}>{p.title}</Caption>
      <Text style={{ fontWeight: 700, fontSize: size * 1.08 }}>{p.name || '—'}</Text>
      {p.lines.map((l, i) => <Text key={i} style={{ color: SOFT }}>{l}</Text>)}
    </View>
  );
}

function PairGrid({ title, pairs, accent, cols, size }: { title?: string; pairs: Pair[]; accent: string; cols: number; size: number }) {
  if (!pairs.length) return null;
  return (
    <View style={{ marginTop: 7 }} wrap={false}>
      {title && <Caption color={accent} size={size}>{title}</Caption>}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {pairs.map(([k, v], i) => (
          <View key={i} style={{ width: `${100 / cols}%`, flexDirection: 'row', paddingRight: 8, marginBottom: 1.5 }}>
            <Text style={{ color: SOFT, maxWidth: '45%' }}>{k}: </Text>
            <Text style={{ fontWeight: 700, flex: 1 }}>{v}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SmallTable({ t, accent, title, size, boldLast }: { t: TableView; accent: string; title: string; size: number; boldLast?: boolean }) {
  const ws = t.widths ?? t.headers.map(() => 1);
  const sum = ws.reduce((a, b) => a + b, 0);
  const w = (i: number) => `${(ws[i] / sum) * 100}%`;
  return (
    <View style={{ marginTop: 7 }} wrap={false}>
      <Caption color={accent} size={size}>{title}</Caption>
      <View style={{ flexDirection: 'row', borderBottomWidth: 0.75, borderBottomColor: RULE }}>
        {t.headers.map((h, i) => <Text key={i} style={{ width: w(i), padding: 2, color: SOFT, fontWeight: 700, textAlign: t.align[i] ?? 'left' }}>{h}</Text>)}
      </View>
      {t.rows.map((r, ri) => (
        <View key={ri} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: RULE }}>
          {r.map((c, i) => <Text key={i} style={{ width: w(i), padding: 2, textAlign: t.align[i] ?? 'left', fontWeight: boldLast && ri === t.rows.length - 1 ? 700 : 400 }}>{c}</Text>)}
        </View>
      ))}
    </View>
  );
}

function Header({ v, size }: { v: DocumentView; size: number }) {
  const { accent, layout } = v;
  const modern = layout === 'modern';
  const light = modern ? '#ffffff' : undefined;
  const logo = v.logo ? <Image src={v.logo} style={{ width: v.logoWidth * 0.75, maxHeight: 60, objectFit: 'contain', marginBottom: 4 }} /> : null;
  const meta = (
    <View style={{ maxWidth: '48%', alignItems: 'flex-end' }}>
      <Text style={{ fontSize: size * (layout === 'compact' ? 1.45 : 1.75), fontWeight: 700, letterSpacing: 0.6, color: modern ? '#ffffff' : accent, textAlign: 'right' }}>{v.title}</Text>
      <View style={{ marginTop: 3 }}>
        {v.metaRows.map(([k, val], i) => (
          <View key={i} style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ color: modern ? '#e8efeb' : SOFT, marginRight: 5 }}>{k}</Text>
            <Text style={{ fontWeight: 700, color: light ?? INK, textAlign: 'right' }}>{val}</Text>
          </View>
        ))}
      </View>
    </View>
  );
  const seller = (
    <View style={{ flex: 1, paddingRight: 12 }}>
      {logo && (modern ? <View style={{ backgroundColor: '#ffffff', borderRadius: 3, padding: 3, alignSelf: 'flex-start', marginBottom: 4 }}>{logo}</View> : logo)}
      {!modern && <Caption size={size}>{v.seller.title}</Caption>}
      <Text style={{ fontSize: size * 1.45, fontWeight: 700, color: modern ? '#ffffff' : accent }}>{v.seller.name || 'Your business name'}</Text>
      {v.seller.lines.map((l, i) => <Text key={i} style={{ color: modern ? '#e8efeb' : SOFT }}>{l}</Text>)}
    </View>
  );
  if (modern) {
    return <View wrap={false} style={{ backgroundColor: accent, borderRadius: 4, padding: '10 12', flexDirection: 'row', justifyContent: 'space-between' }}>{seller}{meta}</View>;
  }
  return (
    <View wrap={false} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 7, borderBottomWidth: layout === 'compact' ? 1 : 2.5, borderBottomColor: accent }}>
      {seller}{meta}
    </View>
  );
}

function ItemsTable({ v }: { v: DocumentView }) {
  const { accent, layout } = v;
  const total = v.columns.reduce((a, c) => a + c.width, 0) || 1;
  const headBg = layout === 'modern' ? accent : layout === 'compact' ? '#f2f4f3' : tint(accent, 0.88);
  const headColor = layout === 'modern' ? '#ffffff' : INK;
  const pad = layout === 'compact' ? { paddingVertical: 2, paddingHorizontal: 3 } : { paddingVertical: 3, paddingHorizontal: 4 };
  const cellBorder: Style = layout === 'compact' ? { borderRightWidth: 0.5, borderRightColor: RULE } : {};
  const width = (w: number) => `${(w / total) * 100}%`;
  return (
    <View style={{ marginTop: 9, ...(layout === 'compact' ? { borderLeftWidth: 0.5, borderLeftColor: RULE, borderTopWidth: 0.5, borderTopColor: RULE } : {}) }}>
      <View fixed style={{ flexDirection: 'row', backgroundColor: headBg }}>
        {v.columns.map((c) => (
          <Text key={c.key} style={{ width: width(c.width), ...pad, ...cellBorder, color: headColor, fontWeight: 700, fontSize: (layout === 'compact' ? 7.4 : 8.2) * 0.88, textAlign: c.align }}>{c.label}</Text>
        ))}
      </View>
      {v.rows.length === 0 && <Text style={{ padding: 14, textAlign: 'center', color: FAINT }}>{v.emptyMessage}</Text>}
      {v.rows.map((r, i) => (
        <View key={r.id} wrap={false} style={{ flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: RULE, backgroundColor: layout === 'modern' && i % 2 ? tint(accent, 0.95) : undefined }}>
          {v.columns.map((c) => (
            <View key={c.key} style={{ width: width(c.width), ...pad, ...cellBorder }}>
              <Text style={{ textAlign: c.align, fontWeight: c.key === 'amount' ? 700 : 400 }}>{r.cells[c.key] ?? ''}</Text>
              {c.key === 'description' && r.details ? <Text style={{ color: SOFT, fontSize: (layout === 'compact' ? 7.4 : 8.2) * 0.88 }}>{r.details}</Text> : null}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

export function PdfDocumentView({ v }: { v: DocumentView }) {
  const { accent, layout, paper } = v;
  const size = layout === 'compact' ? 7.4 : 8.2;
  const boxed = layout !== 'classic';
  const compact = layout === 'compact';
  return (
    <Document title={`${v.title} ${v.data.meta.number}`.trim()} author={v.data.seller.name || undefined} creator="E-Way Easy document templates" producer="E-Way Easy">
      <Page
        size={paper.pdfSize}
        orientation={paper.pdfOrientation}
        style={{ paddingTop: paper.marginPt, paddingHorizontal: paper.marginPt, paddingBottom: paper.marginPt + 6, fontFamily: PDF_FONT_FAMILY[v.font], fontSize: size, color: INK }}
      >
        {/* No lineHeight on <Page>: a page-level lineHeight inherited by the dynamic page-number text crashes
            react-pdf 4.9 ("unsupported number") on documents of ~10+ pages. The font's natural line height is used. */}
        <View>
        <Header v={v} size={size} />

        <View wrap={false} style={{ flexDirection: 'row', gap: 9, marginTop: 9 }}>
          <Party p={v.buyer} accent={accent} boxed={boxed} size={size} />
          {v.shipTo && <Party p={v.shipTo} accent={accent} boxed={boxed} size={size} />}
          {v.notify && <Party p={v.notify} accent={accent} boxed={boxed} size={size} />}
        </View>

        <PairGrid pairs={v.infoRows} accent={accent} cols={compact ? 3 : 2} size={size} />
        <PairGrid title="Shipment details" pairs={v.shippingRows} accent={accent} cols={compact ? 3 : 2} size={size} />
        <PairGrid title="Transport details" pairs={v.transportRows} accent={accent} cols={3} size={size} />
        {v.taxNote && <Text style={{ marginTop: 6, fontWeight: 700, color: accent }}>{v.taxNote}</Text>}

        <ItemsTable v={v} />

        {v.schedule && <SmallTable t={v.schedule} accent={accent} title="Delivery schedule" size={size} />}

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 9, alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            {v.words && (
              <View wrap={false}>
                <Caption color={accent} size={size}>Amount in words</Caption>
                <Text style={{ fontWeight: 700 }}>{v.words}</Text>
              </View>
            )}
            {v.breakdown && <SmallTable t={v.breakdown} accent={accent} title="Tax summary" size={size} boldLast />}
            {v.bankRows.length > 0 && (
              <View wrap={false} style={{ marginTop: 7 }}>
                <Caption color={accent} size={size}>Bank details</Caption>
                {v.bankRows.map(([k, val], i) => <Text key={i}><Text style={{ color: SOFT }}>{k}: </Text><Text style={{ fontWeight: 700 }}>{val}</Text></Text>)}
              </View>
            )}
          </View>
          <View wrap={false} style={{ width: '42%' }}>
            {v.totalsRows.map((r, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row', justifyContent: 'space-between', paddingVertical: r.strong ? 4 : 1.5, paddingHorizontal: 5,
                  ...(r.strong ? { backgroundColor: layout === 'modern' ? accent : tint(accent, 0.88), borderTopWidth: 1.5, borderTopColor: accent, marginTop: 2 } : {}),
                }}
              >
                <Text style={{ color: r.strong ? (layout === 'modern' ? '#ffffff' : INK) : SOFT, fontWeight: r.strong ? 700 : 400, fontSize: r.strong ? size * 1.12 : size, flex: 1, paddingRight: 6 }}>{r.label}</Text>
                <Text style={{ fontWeight: r.strong ? 700 : 400, fontSize: r.strong ? size * 1.12 : size, color: r.strong && layout === 'modern' ? '#ffffff' : INK }}>{r.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {v.textBlocks.map((b, i) => (
          <View key={i} style={{ marginTop: 7 }}>
            <Caption color={accent} size={size}>{b.title}</Caption>
            <Text style={{ color: SOFT }}>{b.body}</Text>
          </View>
        ))}

        {(v.declaration || v.signature || v.approval) && (
          <View wrap={false} style={{ flexDirection: 'row', gap: 14, marginTop: 10, paddingTop: 7, borderTopWidth: 0.75, borderTopColor: RULE, alignItems: 'flex-end' }}>
            <View style={{ flex: 1 }}>
              {v.declaration && (
                <>
                  <Caption color={accent} size={size}>{v.declaration.title}</Caption>
                  <Text style={{ color: SOFT }}>{v.declaration.body}</Text>
                </>
              )}
              {v.approval && (
                <View style={{ flexDirection: 'row', gap: 14, marginTop: v.declaration ? 8 : 0 }}>
                  {([['Prepared by', v.approval.prepared], ['Approved by', v.approval.approved]] as const).map(([k, val]) => (
                    <View key={k} style={{ flex: 1, marginTop: 26, borderTopWidth: 0.75, borderTopColor: SOFT, paddingTop: 2 }}>
                      <Text style={{ color: SOFT }}>{k}{val ? `: ${val}` : ''}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
            {v.signature && (
              <View style={{ width: '38%', alignItems: 'flex-end' }}>
                <Text style={{ fontWeight: 700, textAlign: 'right' }}>For {v.signature.forName}</Text>
                <View style={{ height: 24 }} />
                <View style={{ borderTopWidth: 0.75, borderTopColor: SOFT, paddingTop: 2, width: '100%', alignItems: 'flex-end' }}>
                  {v.signature.name ? <Text style={{ fontWeight: 700 }}>{v.signature.name}</Text> : null}
                  <Text style={{ color: SOFT }}>{v.signature.title}</Text>
                </View>
              </View>
            )}
          </View>
        )}

        </View>

        {/* Footer, repeated on every page. */}
        <Text fixed style={{ position: 'absolute', bottom: paper.marginPt / 2, left: paper.marginPt, width: paper.widthPt / 2, fontSize: 7, color: FAINT }}>
          {`${v.title}${v.data.meta.number ? ` ${v.data.meta.number}` : ''}`}
        </Text>
        <Text
          fixed
          style={{ position: 'absolute', bottom: paper.marginPt / 2, right: paper.marginPt, width: 110, fontSize: 7, color: FAINT, textAlign: 'right' }}
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
        />
      </Page>
    </Document>
  );
}

/** Build the react-pdf <Document> element for a document. */
export function buildPdfElement(data: DocumentData) {
  return <PdfDocumentView v={buildView(data)} />;
}
