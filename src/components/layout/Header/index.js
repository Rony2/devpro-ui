"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

const NAV_ITEMS = [
  { href: "/problems", label: "Problems" },
  { href: "/quiz", label: "Quiz" },
  { href: "/system-design", label: "System Design" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-3 border-[var(--border)] bg-[var(--bg)]" style={{ borderBottomWidth: '3px' }}>
      <div className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[var(--border)] bg-[var(--brand)] font-[family-name:var(--font-display)] text-lg font-bold shadow-[2px_2px_0px_0px_var(--border)]">
            D
          </span>
          <span className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">Devpro</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link",
                  pathname === item.href || pathname.startsWith(`${item.href}/`) ? "nav-link-active" : null,
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle compact />
        </div>
      </div>
    </header>
  );
}
