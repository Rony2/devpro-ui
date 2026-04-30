export default function AuthLayout({ children }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--neo-pink)] px-4">
      <div className="w-full max-w-md border-3 border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[6px_6px_0px_0px_var(--border)]" style={{ borderWidth: '3px' }}>{children}</div>
    </div>
  );
}
