import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { TagPill } from "@/components/shared/TagPill";

export function ProblemCard({ problem, index = 1, isCompleted = false }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="group flex items-start gap-4 border-b-2 border-[var(--border)] px-5 py-4 transition-colors hover:bg-[var(--brand)]"
    >
      {/* Number / completion indicator */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
        {isCompleted ? (
          <CheckCircle2 size={22} className="text-[var(--success)]" aria-label="Completed" />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-xs font-bold bg-[var(--neo-yellow)] shadow-[2px_2px_0px_0px_var(--border)]">
            {index}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-bold leading-snug font-[family-name:var(--font-display)]">{problem.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
          {problem.description}
        </p>
        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          {problem.topics.slice(0, 2).map((topic) => (
            <TagPill key={topic} label={topic} />
          ))}
          <DifficultyBadge level={problem.difficulty} />
          {problem.companies?.length > 0 ? (
            <span className="text-xs font-bold text-[var(--text-muted)]">
              {problem.companies.join(" · ")}
            </span>
          ) : null}
        </div>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={16}
        aria-hidden="true"
        className="mt-1 shrink-0 text-[var(--text)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
      />
    </Link>
  );
}
