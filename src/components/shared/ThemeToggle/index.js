"use client";

import { MoonStar, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "focus-ring inline-flex min-h-[42px] items-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm font-bold font-[family-name:var(--font-display)] shadow-[2px_2px_0px_0px_var(--border)] transition-transform hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)]",
        compact ? "px-2.5" : "px-3",
      )}
      aria-label="Toggle color theme"
    >
      {theme === "dark" ? <MoonStar size={16} /> : <Sun size={16} />}
      {compact ? null : <span>{theme === "dark" ? "Dark" : "Light"}</span>}
    </button>
  );
}
