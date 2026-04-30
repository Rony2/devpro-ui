import { CheckCircle2, XCircle } from "lucide-react";

export function TestResultPanel({ results }) {
  if (!results?.length) return null;

  const passed = results.filter((r) => r.passed).length;

  return (
    <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-widest font-[family-name:var(--font-display)] text-[var(--text)]">Results</h3>
        <span className={`text-xs font-bold ${
          passed === results.length ? "text-[var(--success)]" : "text-[var(--text-muted)]"
        }`}>
          {passed}/{results.length} passed
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {results.map((result) => (
          <div
            key={result.id}
            className={`border-2 border-[var(--border)] p-3 text-sm text-black ${
              result.passed
                ? "bg-[var(--neo-green)]"
                : "bg-[var(--neo-pink)]"
            }`}
          >
            <div className="flex items-center gap-2">
              {result.passed ? (
                <CheckCircle2 size={15} className="shrink-0 text-[var(--success)]" />
              ) : (
                <XCircle size={15} className="shrink-0 text-[var(--danger)]" />
              )}
              <p className="font-bold">
                {result.description}
              </p>
            </div>
            {!result.passed ? (
              <div className="mt-2 grid gap-2 pl-[23px] sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Expected</p>
                  <pre className="mt-1 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-2 text-xs code-font text-white">{JSON.stringify(result.expected, null, 2)}</pre>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">Received</p>
                  <pre className="mt-1 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-2 text-xs code-font text-white">{JSON.stringify(result.received, null, 2)}</pre>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
