/** @jsxRuntime automatic */
// HTML render of a business document for the live preview, browser printing and thumbnails.
// Server-safe: no hooks, no browser APIs. All user text is rendered as React text nodes (never as HTML).
// Sizes are in pt/mm so the on-screen sheet mirrors the PDF produced by pdf/PdfDocument.tsx.
import type { CSSProperties, ReactNode } from 'react';
import type { DocumentData } from '@/lib/templates/model';
import { buildView, tint, type DocumentView, type Pair, type PartyView, type TableView } from '@/lib/templates/render';

export type PreviewMode = 'screen' | 'print' | 'thumb';

const FONT_STACK = {
  sans: "'Noto Sans', 'Segoe UI', Roboto, Arial, sans-serif",
  serif: "'Noto Serif', Georgia, 'Times New Roman', serif",
};
const INK = '#1d2622';
const SOFT = '#55625c';
const FAINT = '#8a958f';
const RULE = '#d9dfdc';

const wrap: CSSProperties = { overflowWrap: 'anywhere', wordBreak: 'break-word', whiteSpace: 'pre-line' };
const avoid: CSSProperties = { breakInside: 'avoid', pageBreakInside: 'avoid' };

function Caption({ children, color = FAINT }: { children: ReactNode; color?: string }) {
  return <div style={{ fontSize: '0.8em', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color, marginBottom: '2pt' }}>{children}</div>;
}

function Party({ p, accent, boxed }: { p: PartyView; accent: string; boxed: boolean }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0, ...(boxed ? { border: `0.75pt solid ${RULE}`, borderRadius: '3pt', padding: '6pt 7pt' } : {}) }}>
      <Caption color={accent}>{p.title}</Caption>
      <div style={{ fontWeight: 700, fontSize: '1.08em', ...wrap }}>{p.name || '—'}</div>
      {p.lines.map((l, i) => <div key={i} style={{ color: SOFT, ...wrap }}>{l}</div>)}
    </div>
  );
}

function PairGrid({ title, pairs, accent, cols = 2 }: { title?: string; pairs: Pair[]; accent: string; cols?: number }) {
  if (!pairs.length) return null;
  return (
    <div style={{ marginTop: '7pt', ...avoid }}>
      {title && <Caption color={accent}>{title}</Caption>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, columnGap: '10pt', rowGap: '1.5pt' }}>
        {pairs.map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', gap: '4pt', minWidth: 0 }}>
            <span style={{ color: SOFT, flex: '0 0 auto', maxWidth: '45%' }}>{k}:</span>
            <span style={{ fontWeight: 600, minWidth: 0, ...wrap }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmallTable({ t, accent, title }: { t: TableView; accent: string; title: string }) {
  return (
    <div style={{ marginTop: '7pt', ...avoid }}>
      <Caption color={accent}>{title}</Caption>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: t.widths ? 'fixed' : 'auto' }}>
        {t.widths && (
          <colgroup>{t.widths.map((w, i) => <col key={i} style={{ width: `${(w / t.widths!.reduce((a, b) => a + b, 0)) * 100}%` }} />)}</colgroup>
        )}
        <thead>
          <tr>{t.headers.map((h, i) => <th key={i} style={{ textAlign: t.align[i] ?? 'left', padding: '2pt 4pt', borderBottom: `0.75pt solid ${RULE}`, color: SOFT, fontWeight: 600 }}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {t.rows.map((r, ri) => (
            <tr key={ri} style={avoid}>
              {r.map((c, i) => <td key={i} style={{ textAlign: t.align[i] ?? 'left', padding: '2pt 4pt', borderBottom: `0.5pt solid ${RULE}`, fontVariantNumeric: 'tabular-nums', fontWeight: ri === t.rows.length - 1 && t.headers[0] === 'GST rate' ? 700 : 400, ...wrap }}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Header({ v }: { v: DocumentView }) {
  const { accent, layout } = v;
  const modern = layout === 'modern';
  const logo = v.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={v.logo} alt="" style={{ width: `${v.logoWidth * 0.75}pt`, maxWidth: '100%', maxHeight: '60pt', objectFit: 'contain', display: 'block', marginBottom: '4pt' }} />
  ) : null;
  const meta = (
    <div style={{ textAlign: 'right', flex: '0 0 auto', maxWidth: '48%' }}>
      <div style={{ fontSize: layout === 'compact' ? '1.45em' : '1.75em', fontWeight: 800, letterSpacing: '0.04em', color: modern ? '#fff' : accent, ...wrap }}>{v.title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', justifyContent: 'end', columnGap: '6pt', marginTop: '3pt' }}>
        {v.metaRows.map(([k, val], i) => (
          <div key={i} style={{ display: 'contents' }}>
            <span style={{ color: modern ? 'rgba(255,255,255,.8)' : SOFT }}>{k}</span>
            <span style={{ fontWeight: 700, color: modern ? '#fff' : INK, ...wrap }}>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
  const sellerName = <div style={{ fontSize: '1.45em', fontWeight: 800, color: modern ? '#fff' : accent, ...wrap }}>{v.seller.name || 'Your business name'}</div>;
  const sellerLines = v.seller.lines.map((l, i) => <div key={i} style={{ color: modern ? 'rgba(255,255,255,.85)' : SOFT, ...wrap }}>{l}</div>);

  if (modern) {
    return (
      <div style={{ background: accent, color: '#fff', padding: '10pt 12pt', borderRadius: '4pt', display: 'flex', justifyContent: 'space-between', gap: '12pt', ...avoid }}>
        <div style={{ minWidth: 0, flex: '1 1 auto' }}>
          {logo && <div style={{ background: '#fff', borderRadius: '3pt', padding: '3pt', display: 'inline-block', marginBottom: '4pt' }}>{logo}</div>}
          {sellerName}
          {sellerLines}
        </div>
        {meta}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12pt', paddingBottom: '7pt', borderBottom: `${layout === 'compact' ? 1 : 2.5}pt solid ${accent}`, ...avoid }}>
      <div style={{ minWidth: 0, flex: '1 1 auto' }}>
        {logo}
        <Caption>{v.seller.title}</Caption>
        {sellerName}
        {sellerLines}
      </div>
      {meta}
    </div>
  );
}

function ItemsTable({ v }: { v: DocumentView }) {
  const { accent, layout } = v;
  const total = v.columns.reduce((a, c) => a + c.width, 0) || 1;
  const headBg = layout === 'modern' ? accent : layout === 'compact' ? '#f2f4f3' : tint(accent, 0.88);
  const headColor = layout === 'modern' ? '#fff' : INK;
  const pad = layout === 'compact' ? '2pt 3pt' : '3pt 4pt';
  const border = layout === 'compact' ? `0.5pt solid ${RULE}` : undefined;
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '9pt' }}>
      <colgroup>{v.columns.map((c) => <col key={c.key} style={{ width: `${(c.width / total) * 100}%` }} />)}</colgroup>
      <thead style={{ display: 'table-header-group' }}>
        <tr>
          {v.columns.map((c) => (
            <th key={c.key} scope="col" style={{ background: headBg, color: headColor, textAlign: c.align, padding: pad, fontSize: '0.88em', fontWeight: 700, border, ...wrap, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {v.rows.length === 0 && (
          <tr><td colSpan={v.columns.length} style={{ padding: '14pt 4pt', textAlign: 'center', color: FAINT }}>{v.emptyMessage}</td></tr>
        )}
        {v.rows.map((r, i) => (
          <tr key={r.id} style={{ ...avoid, background: layout === 'modern' && i % 2 ? tint(accent, 0.95) : undefined }}>
            {v.columns.map((c) => (
              <td key={c.key} style={{ textAlign: c.align, padding: pad, verticalAlign: 'top', borderBottom: `0.5pt solid ${RULE}`, border, fontVariantNumeric: 'tabular-nums', fontWeight: c.key === 'amount' ? 700 : 400, ...wrap }}>
                {r.cells[c.key]}
                {c.key === 'description' && r.details && <div style={{ color: SOFT, fontSize: '0.88em' }}>{r.details}</div>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** The document itself. Pass `data`; the view model is built here so all callers render identically. */
export default function DocumentPreview({ data, mode = 'screen', id }: { data: DocumentData; mode?: PreviewMode; id?: string }) {
  const v = buildView(data);
  const { accent, layout, paper } = v;
  const compact = layout === 'compact';
  const boxed = layout !== 'classic';
  const sheet: CSSProperties = mode === 'print'
    ? { width: '100%', background: '#fff' }
    : { width: `${paper.widthMm}mm`, minHeight: `${paper.heightMm}mm`, padding: `${paper.marginMm}mm`, background: '#fff', boxSizing: 'border-box' };

  return (
    <div
      id={id}
      className="ee-doc"
      style={{
        ...sheet, color: INK, fontFamily: FONT_STACK[v.font], fontSize: compact ? '7.4pt' : '8.2pt', lineHeight: 1.36,
        textAlign: 'left', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact',
      }}
    >
      <Header v={v} />

      <div style={{ display: 'flex', gap: '9pt', marginTop: '9pt', ...avoid }}>
        <Party p={v.buyer} accent={accent} boxed={boxed} />
        {v.shipTo && <Party p={v.shipTo} accent={accent} boxed={boxed} />}
        {v.notify && <Party p={v.notify} accent={accent} boxed={boxed} />}
      </div>

      <PairGrid pairs={v.infoRows} accent={accent} cols={compact ? 3 : 2} />
      <PairGrid title="Shipment details" pairs={v.shippingRows} accent={accent} cols={compact ? 3 : 2} />
      <PairGrid title="Transport details" pairs={v.transportRows} accent={accent} cols={3} />
      {v.taxNote && <div style={{ marginTop: '6pt', fontWeight: 700, color: accent, ...wrap }}>{v.taxNote}</div>}

      <ItemsTable v={v} />

      {v.schedule && <SmallTable t={v.schedule} accent={accent} title="Delivery schedule" />}

      <div style={{ display: 'flex', gap: '12pt', marginTop: '9pt', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 0', minWidth: 0 }}>
          {v.words && (
            <div style={avoid}>
              <Caption color={accent}>Amount in words</Caption>
              <div style={{ fontWeight: 700, ...wrap }}>{v.words}</div>
            </div>
          )}
          {v.breakdown && <SmallTable t={v.breakdown} accent={accent} title="Tax summary" />}
          {v.bankRows.length > 0 && (
            <div style={{ marginTop: '7pt', ...avoid }}>
              <Caption color={accent}>Bank details</Caption>
              {v.bankRows.map(([k, val], i) => <div key={i} style={wrap}><span style={{ color: SOFT }}>{k}: </span><span style={{ fontWeight: 600 }}>{val}</span></div>)}
            </div>
          )}
        </div>
        <div style={{ flex: '0 0 42%', ...avoid }}>
          {v.totalsRows.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex', justifyContent: 'space-between', gap: '8pt', padding: r.strong ? '4pt 5pt' : '1.5pt 5pt',
                fontVariantNumeric: 'tabular-nums', fontWeight: r.strong ? 800 : 400, fontSize: r.strong ? '1.12em' : undefined,
                ...(r.strong ? { background: layout === 'modern' ? accent : tint(accent, 0.88), color: layout === 'modern' ? '#fff' : INK, borderTop: `1.5pt solid ${accent}`, marginTop: '2pt', WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' } : {}),
              }}
            >
              <span style={{ color: r.strong ? undefined : SOFT, ...wrap }}>{r.label}</span>
              <span style={{ whiteSpace: 'nowrap' }}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      {v.textBlocks.map((b, i) => (
        <div key={i} style={{ marginTop: '7pt', ...avoid }}>
          <Caption color={accent}>{b.title}</Caption>
          <div style={{ color: SOFT, ...wrap }}>{b.body}</div>
        </div>
      ))}

      {(v.declaration || v.signature || v.approval) && (
        <div style={{ display: 'flex', gap: '14pt', marginTop: '10pt', paddingTop: '7pt', borderTop: `0.75pt solid ${RULE}`, alignItems: 'flex-end', ...avoid }}>
          <div style={{ flex: '1 1 0', minWidth: 0 }}>
            {v.declaration && (
              <>
                <Caption color={accent}>{v.declaration.title}</Caption>
                <div style={{ color: SOFT, ...wrap }}>{v.declaration.body}</div>
              </>
            )}
            {v.approval && (
              <div style={{ display: 'flex', gap: '14pt', marginTop: v.declaration ? '8pt' : 0 }}>
                {([['Prepared by', v.approval.prepared], ['Approved by', v.approval.approved]] as const).map(([k, val]) => (
                  <div key={k} style={{ flex: '1 1 0' }}>
                    <div style={{ height: '26pt' }} />
                    <div style={{ borderTop: `0.75pt solid ${SOFT}`, paddingTop: '2pt', color: SOFT }}>{k}{val ? `: ${val}` : ''}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {v.signature && (
            <div style={{ flex: '0 0 38%', textAlign: 'right' }}>
              <div style={{ fontWeight: 700, ...wrap }}>For {v.signature.forName}</div>
              <div style={{ height: '28pt' }} />
              <div style={{ borderTop: `0.75pt solid ${SOFT}`, paddingTop: '2pt' }}>
                {v.signature.name && <div style={{ fontWeight: 600, ...wrap }}>{v.signature.name}</div>}
                <div style={{ color: SOFT }}>{v.signature.title}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
