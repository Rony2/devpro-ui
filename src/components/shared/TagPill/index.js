import { cn } from "@/lib/utils";

export function TagPill({ label, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex border-2 border-[var(--border)] px-2.5 py-1 text-xs font-bold",
        variant === "outline"
          ? "bg-[var(--bg-elevated)] text-[var(--text)]"
          : "bg-[var(--neo-blue)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]",
      )}
    >
      {label}
    </span>
  );
}
