export function Callout({ children }) {
  return (
    <div className="my-4 border-2 border-[var(--border)] p-4 text-sm leading-relaxed shadow-[3px_3px_0px_0px_var(--border)]" style={{ background: 'color-mix(in srgb, var(--neo-blue) 15%, var(--bg-elevated))' }}>
      <span className="mr-2 text-base">💡</span>
      {children}
    </div>
  );
}
