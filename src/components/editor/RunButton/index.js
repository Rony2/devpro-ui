import { Play, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function RunButton({ onClick, isSubmitting = false, label = "Run", variant = "primary" }) {
  const isRun = label === "Run";
  const Icon = isRun ? Play : Send;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      className={cn(
        "focus-ring inline-flex min-h-[40px] items-center gap-2 border-2 border-[var(--border)] px-4 text-sm font-bold font-[family-name:var(--font-display)] transition-all disabled:opacity-60",
        variant === "primary"
          ? "bg-[var(--brand)] shadow-[4px_4px_0px_0px_var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border)]"
          : "text-[var(--text)] hover:bg-[var(--neo-yellow)]",
      )}
    >
      {isSubmitting ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <Icon size={15} />
      )}
      {isSubmitting ? "Running..." : label}
    </button>
  );
}
