export function LanguageSelector({ value, onChange, options }) {
  return (
    <label className="text-xs uppercase tracking-wide text-[color:var(--text-muted)]">
      Language
      <select value={value} onChange={(event) => onChange(event.target.value)} className="focus-ring ml-2 rounded-md border border-[var(--border)] bg-transparent px-2 py-1 text-sm normal-case">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
