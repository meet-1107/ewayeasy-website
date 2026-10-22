/** @jsxRuntime automatic */
// Small visual preview of a template, rendered from its sample data with the default layout.
// Server-safe (no hooks, no browser APIs): the real DocumentPreview is drawn inside an SVG
// <foreignObject>, so it scales to any container width with the paper's aspect ratio and no JS.
import DocumentPreview from './DocumentPreview';
import type { TemplateId } from '@/lib/templates/ids';
import { getPreset, SAMPLE_DATE } from '@/lib/templates/presets';
import { paperDims } from '@/lib/templates/render';

const PX_PER_MM = 96 / 25.4;

export default function TemplateThumbnail({ templateId, className = '' }: { templateId: TemplateId; className?: string }) {
  const preset = getPreset(templateId);
  const data = preset.sample(SAMPLE_DATE);
  data.paper = { ...data.paper, size: 'A4', orientation: 'portrait' };
  const dims = paperDims(data.paper);
  const w = Math.round(dims.widthMm * PX_PER_MM);
  const h = Math.round(dims.heightMm * PX_PER_MM);
  const label = `Preview of the ${preset.name.toLowerCase()} template: a sample ${preset.title.toLowerCase()} from ${data.seller.name} to ${data.buyer.name}`;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMin meet"
      className={`block h-auto w-full overflow-hidden rounded-xl bg-white ${className}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <title>{label}</title>
      <foreignObject x="0" y="0" width={w} height={h}>
        <div
          // XHTML namespace is required for HTML content inside SVG.
          {...{ xmlns: 'http://www.w3.org/1999/xhtml' }}
          aria-hidden="true"
          style={{ width: `${w}px`, height: `${h}px`, overflow: 'hidden', background: '#fff', pointerEvents: 'none', userSelect: 'none' }}
        >
          <DocumentPreview data={data} mode="thumb" />
        </div>
      </foreignObject>
    </svg>
  );
}
