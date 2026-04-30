"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function QuizOption({ option, isSelected, isCorrect, isRevealed, onSelect }) {
  const stateClass = isRevealed
    ? isCorrect
      ? "border-[var(--border)] bg-[var(--neo-green)] shadow-[3px_3px_0px_0px_var(--border)]"
      : isSelected
        ? "border-[var(--border)] bg-[var(--neo-pink)] shadow-[3px_3px_0px_0px_var(--border)]"
        : "border-[var(--border)]"
    : isSelected
      ? "border-[var(--border)] bg-[var(--brand)] shadow-[3px_3px_0px_0px_var(--border)]"
      : "border-[var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_var(--border)]";

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      className={cn("focus-ring w-full border-2 p-3 text-left text-sm transition-all", stateClass)}
    >
      <p className="font-bold">{option.text}</p>
      {option.code ? <pre className="mt-2 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-2 text-xs code-font text-white">{option.code}</pre> : null}
    </motion.button>
  );
}
