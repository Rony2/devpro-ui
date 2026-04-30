"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass-soft sticky top-0 z-30 border-b border-[var(--glass-border)]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label="DevPro home">
          <Image
            src="/logo.svg"
            alt="DevPro logo"
            className="rounded-md ring-1 ring-slate-200 transition group-hover:ring-blue-300 dark:ring-slate-700 dark:group-hover:ring-blue-400"
            height={34}
            width={34}
          />
          <div>
            <p className="font-display text-lg font-semibold leading-tight text-slate-900 dark:text-slate-100">
              DevPro
            </p>
            <p className="hidden text-xs font-medium text-slate-500 sm:block dark:text-slate-400">
              Frontend Interview Prep
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Primary navigation">
          <button
            type="button"
            onClick={toggleTheme}
            className="glass-pill glass-interactive inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] dark:text-slate-200"
            aria-label="Toggle color theme"
          >
            <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-purple-400" aria-hidden="true" />
            {theme === "dark" ? "Dark" : "Light"}
          </button>
          <Link
            href="/"
            className="glass-pill glass-interactive rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] dark:text-slate-200"
          >
            Home
          </Link>
          <Link
            href="/quiz"
            className="rounded-lg bg-[var(--brand-primary)] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
          >
            Practice Questions
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;