import type { ToolIcon as IconKey } from '@/lib/tools';

const PATHS: Record<IconKey, string> = {
  calculator: 'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm1 3v3h8V6H8Zm0 6h2m3 0h2m-7 3h2m3 0h2m-7 3h2m3 0h2',
  swap: 'M7 7h12l-3-3m3 3-3 3M17 17H5l3 3m-3-3 3-3',
  boxes: 'M3 7l5-3 5 3v5l-5 3-5-3V7Zm10 5 4-2.5L21 12v5l-4 2.5-4-2.5v-5ZM8 10v5m9-1v5.5',
  check: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4',
  route: 'M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4M8 11h6',
  invoice: 'M6 3h9l4 4v14H6V3Zm9 0v4h4M9 11h7m-7 3h7m-7 3h4',
  receipt: 'M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21V3Zm3 5h6m-6 4h6m-6 4h3',
  shield: 'M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-2 7h4m-4 3h4',
  table: 'M4 5h16v14H4V5Zm0 5h16M4 15h16M10 5v14',
  compare: 'M5 4h6v16H5V4Zm8 0h6v16h-6V4ZM7 8h2m-2 4h2m6-4h2m-2 4h2m-2 4h2',
  hash: 'M5 9h14M5 15h14M10 4 8 20M16 4l-2 16',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2',
  percent: 'M5 19 19 5M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  map: 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6Zm6-2v14m6-12v14',
  text: 'M4 6h16M4 10h16M4 14h10M4 18h7',
  truck: 'M3 6h11v10H3V6Zm11 4h4l3 3v3h-7v-6ZM7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  quote: 'M6 3h9l4 4v14H6V3Zm3 7h7m-7 3h7m-7 3h3m4-1 1.5 1.5L19 13',
  chip: 'M7 7h10v10H7V7Zm3-4v4m4-4v4m-4 10v4m4-4v4M3 10h4m-4 4h4m10-4h4m-4 4h4',
};

export default function ToolIcon({ icon, className = 'h-6 w-6' }: { icon: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={PATHS[icon]} />
    </svg>
  );
}
