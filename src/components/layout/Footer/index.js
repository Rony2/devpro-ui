export function Footer() {
  return (
    <footer className="border-t-3 border-[var(--border)] bg-[var(--text)] py-6 text-[var(--bg)]" style={{ borderTopWidth: '3px' }}>
      <div className="container-page">
        <p className="text-sm font-bold font-[family-name:var(--font-display)]">Devpro</p>
        <p className="mt-1 text-xs text-[var(--text-faint)]">Senior/Lead/Staff frontend practice platform</p>
      </div>
    </footer>
  );
}
