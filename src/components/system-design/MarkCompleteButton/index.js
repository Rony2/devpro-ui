"use client";

import { useProgress } from "@/hooks/useProgress";
import { CheckCircle } from "lucide-react";

export function MarkCompleteButton({ slug }) {
  const { progress, markSystemDesignComplete } = useProgress();
  const isComplete = progress.systemDesign?.[slug];

  if (isComplete) {
    return (
      <span className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--neo-green)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_var(--border)] font-[family-name:var(--font-display)]">
        <CheckCircle size={14} />
        Completed
      </span>
    );
  }

  return (
    <button
      onClick={() => markSystemDesignComplete(slug)}
      className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--bg)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_var(--border)] hover:bg-[var(--neo-green)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-[family-name:var(--font-display)]"
    >
      <CheckCircle size={14} />
      Mark Complete
    </button>
  );
}
