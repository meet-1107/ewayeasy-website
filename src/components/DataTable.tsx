import type { ReactNode } from 'react';

const WIDTH = { fit: '!min-w-0', default: '', wide: '!min-w-[760px]' } as const;

/**
 * Semantic table with a caption and column and row headers, so the facts stay readable as plain
 * HTML. Wide tables scroll inside their own wrapper on phones; `fit` is for two-column tables.
 */
export default function DataTable({
  caption, columns, rows, width = 'default',
}: {
  caption: string;
  columns: string[];
  rows: { label: ReactNode; cells: ReactNode[] }[];
  width?: keyof typeof WIDTH;
}) {
  return (
    <div className="prose-content">
      <div className="table-wrap" role="region" aria-label={caption} tabIndex={0}>
        <table className={WIDTH[width]}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <th scope="row" className="border-t border-brand-900/10 align-top">{r.label}</th>
                {r.cells.map((c, j) => (
                  <td key={j}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
