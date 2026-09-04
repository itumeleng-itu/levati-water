interface ComparisonRow {
  label: string;
  values: string[];
}

interface ComparisonTableProps {
  columns: string[];
  rows: ComparisonRow[];
  /** Label for the top-left corner cell — must be real text, not empty,
   * for the table to make sense to screen reader users. */
  cornerLabel?: string;
}

// Horizontal scroll with a sticky first column on small screens, full table
// at md+ (spec §4) — the scroll container is what actually scrolls, so the
// sticky column works without any JS.
function ComparisonTable({ columns, rows, cornerLabel = "Feature" }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface">
            <th className="sticky left-0 z-10 bg-surface p-4 text-small font-semibold text-ink-900">
              {cornerLabel}
            </th>
            {columns.map((col) => (
              <th key={col} className="p-4 text-small font-semibold text-ink-900">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-0">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-white p-4 text-small font-semibold text-ink-900"
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td key={columns[i]} className="p-4 text-body text-ink-600">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ComparisonTable };
