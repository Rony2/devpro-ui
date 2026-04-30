export function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="panel p-3">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <label key={filter.key} className="text-sm">
            <span className="mb-1 block text-xs uppercase tracking-wide font-bold font-[family-name:var(--font-display)] text-[var(--text)]">{filter.label}</span>
            <select
              value={filter.value}
              onChange={(event) => onFilterChange(filter.key, event.target.value)}
              className="focus-ring border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 font-bold shadow-[2px_2px_0px_0px_var(--border)]"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}
