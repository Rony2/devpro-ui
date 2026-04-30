import Link from "next/link";

const links = [
  { href: "/problems", label: "Problems" },
  { href: "/quiz", label: "Quiz" },
  { href: "/system-design", label: "System Design" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 lg:block">
      <p className="mb-4 text-xs uppercase tracking-wide font-bold font-[family-name:var(--font-display)] text-[var(--text)]">Practice Areas</p>
      <nav className="space-y-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="focus-ring block border-2 border-transparent px-3 py-2 text-sm font-bold hover:border-[var(--border)] hover:bg-[var(--brand)] hover:shadow-[2px_2px_0px_0px_var(--border)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
