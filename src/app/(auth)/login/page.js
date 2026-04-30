import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">Login</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">Auth wiring is intentionally stubbed in this iteration.</p>
      <form className="mt-4 space-y-3">
        <input className="focus-ring w-full border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-bold shadow-[2px_2px_0px_0px_var(--border)]" placeholder="Work email" />
        <input type="password" className="focus-ring w-full border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-2 font-bold shadow-[2px_2px_0px_0px_var(--border)]" placeholder="Password" />
        <button type="button" className="focus-ring min-h-[44px] w-full border-2 border-[var(--border)] bg-[var(--brand)] font-bold font-[family-name:var(--font-display)] shadow-[4px_4px_0px_0px_var(--border)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border)]">Continue</button>
      </form>
      <p className="mt-3 text-sm text-[var(--text-muted)]">No account? <Link href="/signup" className="font-bold underline decoration-2 underline-offset-2 hover:bg-[var(--neo-yellow)]">Create one</Link></p>
    </div>
  );
}
