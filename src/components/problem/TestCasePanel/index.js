"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Eye, EyeOff, Lock } from "lucide-react";

export function TestCasePanel({ tests }) {
  const visible = tests.filter((t) => !t.isHidden);
  const hiddenCount = tests.length - visible.length;
  const [expanded, setExpanded] = useState(() => {
    // first visible test open by default
    const first = tests.find((t) => !t.isHidden);
    return first ? new Set([first.id]) : new Set();
  });

  function toggle(id) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)] text-[var(--text)]">
          Test Cases
        </h3>
        <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-muted)]">
          <span className="inline-flex items-center gap-1">
            <Eye size={11} /> {visible.length}
          </span>
          {hiddenCount > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Lock size={11} /> {hiddenCount}
            </span>
          ) : null}
        </div>
      </div>

      {/* Test cases */}
      <div className="space-y-1.5">
        {tests.map((test, i) => {
          const isOpen = expanded.has(test.id);
          const num = i + 1;

          return (
            <div
              key={test.id}
              className="overflow-hidden border-2 border-[var(--border)] bg-[var(--bg-elevated)]"
            >
              {/* Clickable header row */}
              <button
                type="button"
                onClick={() => !test.isHidden && toggle(test.id)}
                className={`focus-ring flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors ${
                  test.isHidden
                    ? "cursor-default"
                    : "hover:bg-[var(--neo-yellow)]"
                }`}
              >
                {/* Number pill */}
                <span
                  className={`inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-[var(--border)] text-[10px] font-bold ${
                    test.isHidden
                      ? "bg-[var(--bg)] text-[var(--text-muted)]"
                      : "bg-[var(--neo-yellow)] text-[var(--text)]"
                  }`}
                >
                  {num}
                </span>

                {/* Description */}
                <span className="min-w-0 flex-1 truncate font-bold">
                  {test.description}
                </span>

                {/* Visibility / chevron */}
                {test.isHidden ? (
                  <span className="inline-flex items-center gap-1 border-2 border-[var(--border)] px-2 py-0.5 text-[10px] font-bold text-[var(--text-muted)]">
                    <EyeOff size={10} /> Hidden
                  </span>
                ) : isOpen ? (
                  <ChevronDown size={14} className="shrink-0 text-[var(--text-muted)]" />
                ) : (
                  <ChevronRight size={14} className="shrink-0 text-[var(--text-muted)]" />
                )}
              </button>

              {/* Expanded I/O content */}
              {isOpen && !test.isHidden ? (
                <div className="border-t-2 border-[var(--border)] px-3 py-3">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                        Input
                      </p>
                      <pre className="overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-2.5 text-xs leading-5 code-font text-white">
                        {JSON.stringify(test.input, null, 2)}
                      </pre>
                    </div>
                    <div>
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                        Expected
                      </p>
                      <pre className="overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-2.5 text-xs leading-5 code-font text-white">
                        {JSON.stringify(test.expected, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
