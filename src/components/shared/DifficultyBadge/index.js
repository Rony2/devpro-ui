import { cn } from "@/lib/utils";

const MAP = {
  easy: "bg-[var(--neo-green)] border-[var(--border)]",
  medium: "bg-[var(--neo-yellow)] border-[var(--border)]",
  hard: "bg-[var(--neo-pink)] border-[var(--border)]",
};

export function DifficultyBadge({ level }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border-2 border-[var(--border)] px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)] font-[family-name:var(--font-display)]",
        MAP[level] || "bg-[var(--neo-blue)] border-[var(--border)]",
      )}
    >
      {level}
    </span>
  );
}
