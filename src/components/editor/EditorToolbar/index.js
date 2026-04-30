import { Copy, RotateCcw, WandSparkles } from "lucide-react";

export function EditorToolbar({ onFormat, onReset, onCopy }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <button
        type="button"
        onClick={onFormat}
        className="focus-ring inline-flex min-h-[36px] items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 text-xs font-bold text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
      >
        <WandSparkles size={14} /> Format
      </button>
      <button
        type="button"
        onClick={onReset}
        className="focus-ring inline-flex min-h-[36px] items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 text-xs font-bold text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-pink)] hover:text-[var(--text)]"
      >
        <RotateCcw size={14} /> Reset
      </button>
      <button
        type="button"
        onClick={onCopy}
        className="focus-ring inline-flex min-h-[36px] items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-2.5 text-xs font-bold text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-blue)] hover:text-[var(--text)]"
      >
        <Copy size={14} /> Copy
      </button>
    </div>
  );
}
