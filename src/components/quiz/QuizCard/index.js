import Link from "next/link";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";

export function QuizCard({ quiz }) {
  return (
    <Link href={`/quizzes/${quiz.slug}`} className="card focus-ring block p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">{quiz.title}</h3>
        <DifficultyBadge level={quiz.difficulty} />
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{quiz.description}</p>
      <p className="mt-3 text-xs uppercase tracking-wide font-bold text-[var(--text-muted)]">
        {quiz.topic} · {quiz.questionCount} questions · {quiz.estimatedMinutes} min
      </p>
    </Link>
  );
}
