"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Terminal, FlaskConical } from "lucide-react";
import { CheckCircle2, XCircle } from "lucide-react";

export function ConsolePanel({ results, isOpen, onToggle }) {
  const [activeTab, setActiveTab] = useState("results");

  const passed = results?.length ? results.filter((r) => r.passed).length : 0;
  const total = results?.length || 0;

  // Aggregate all console.log output across all test runs
  const allLogs = useMemo(() => {
    if (!results?.length) return [];
    const logs = [];
    for (const result of results) {
      if (result.logs?.length > 0) {
        for (const line of result.logs) {
          logs.push(line);
        }
      }
    }
    return logs;
  }, [results]);

  return (
    <div className="flex flex-col border-t-2 border-[var(--border)] bg-[var(--bg-elevated)]">
      {/* Tab strip — acts as both tabs and collapse toggle */}
      <div className="flex items-center border-b-2 border-[var(--border)]">
        <div className="flex flex-1 items-center gap-0.5 px-3">
          <button
            type="button"
            onClick={() => { setActiveTab("results"); if (!isOpen) onToggle(); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold transition-colors ${
              activeTab === "results" && isOpen
                ? "border-b-2 border-[var(--text)] text-[var(--text)] bg-[var(--brand)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
            }`}
          >
            <FlaskConical size={12} />
            Test Results
            {total > 0 ? (
              <span className={`ml-0.5 text-[10px] font-bold ${passed === total ? "text-green-400" : "text-[var(--text-muted)]"}`}>
                {passed}/{total}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("console"); if (!isOpen) onToggle(); }}
            className={`inline-flex items-center gap-1.5 px-2.5 py-2 text-[11px] font-bold transition-colors ${
              activeTab === "console" && isOpen
                ? "border-b-2 border-[var(--text)] text-[var(--text)] bg-[var(--brand)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
            }`}
          >
            <Terminal size={12} />
            Console
            {allLogs.length > 0 ? (
              <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center border-2 border-[var(--border)] bg-[var(--neo-pink)] px-1 text-[9px] font-bold text-black">
                {allLogs.length}
              </span>
            ) : null}
          </button>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="px-3 py-2 text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          aria-label={isOpen ? "Collapse panel" : "Expand panel"}
        >
          {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>

      {/* Tab content */}
      {isOpen ? (
        <div className="max-h-[220px] overflow-y-auto px-4 py-3">
          {activeTab === "results" ? (
            total > 0 ? (
              <div className="space-y-2">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className={`border-2 border-[var(--border)] p-2.5 text-xs text-black ${
                      result.passed
                        ? "bg-[var(--neo-green)]"
                        : "bg-[var(--neo-pink)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle2 size={13} className="shrink-0 text-[var(--success)]" />
                      ) : (
                        <XCircle size={13} className="shrink-0 text-[var(--danger)]" />
                      )}
                      <span className="font-bold">
                        {result.description}
                      </span>
                    </div>
                    {!result.passed ? (
                      <div className="mt-1.5 grid gap-2 pl-[21px] sm:grid-cols-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Expected</p>
                          <pre className="mt-0.5 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-1.5 text-[11px] code-font text-white">{JSON.stringify(result.expected, null, 2)}</pre>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Received</p>
                          <pre className="mt-0.5 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-1.5 text-[11px] code-font text-white">{JSON.stringify(result.received, null, 2)}</pre>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-bold text-[var(--text-muted)]">Run your code to see results here.</p>
            )
          ) : (
            /* Console tab */
            allLogs.length > 0 ? (
              <pre className="overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-3 text-[12px] leading-[1.7] code-font text-white">
                {allLogs.map((line, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="select-none text-[var(--text-faint)] opacity-40">{`>`}</span>
                    <span>{line}</span>
                  </div>
                ))}
              </pre>
            ) : (
              <p className="text-xs font-bold text-[var(--text-muted)]">
                {total > 0
                  ? "No console.log output captured."
                  : "Run your code to see console output here. Use console.log() to debug."}
              </p>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}
