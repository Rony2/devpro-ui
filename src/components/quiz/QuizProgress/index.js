export function QuizProgress({ current, total }) {
  const percent = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)]">
        <span>
          Question {current} / {total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="mt-2 h-3 border-2 border-[var(--border)] bg-[var(--bg)]">
        <div className="h-full bg-[var(--neo-green)]" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
