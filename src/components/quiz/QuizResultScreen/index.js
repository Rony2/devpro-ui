export function QuizResultScreen({ score, total, elapsedSeconds, breakdown }) {
  return (
    <div className="panel p-5">
      <h2 className="text-2xl font-bold font-[family-name:var(--font-display)]">Quiz Complete</h2>
      <p className="mt-1 text-sm font-bold text-[var(--text-muted)]">
        Score: {score}/{total} · Time: {Math.round(elapsedSeconds / 60)}m {elapsedSeconds % 60}s
      </p>

      <div className="mt-4 space-y-3">
        {breakdown.map((item) => (
          <div key={item.id} className="card p-3 text-sm">
            <p className={item.correct ? "text-[var(--success)] font-bold" : "text-[var(--danger)] font-bold"}>
              {item.correct ? "Correct" : "Incorrect"} · {item.question}
            </p>
            <p className="mt-1 text-[var(--text-muted)]">{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
