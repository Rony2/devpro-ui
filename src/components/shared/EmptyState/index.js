export function EmptyState({ title, description, action = null }) {
  return (
    <div className="panel p-8 text-center">
      <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
