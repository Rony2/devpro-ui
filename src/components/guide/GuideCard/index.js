import Link from "next/link";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";

export function GuideCard({ guide }) {
  return (
    <Link href={`/guides/${guide.slug}`} className="card focus-ring block p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold font-[family-name:var(--font-display)]">{guide.title}</h3>
        <DifficultyBadge level={guide.difficulty} />
      </div>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{guide.description}</p>
      <p className="mt-3 text-xs uppercase tracking-wide font-bold text-[var(--text-muted)]">
        {guide.category} · {guide.readingTimeMin} min read · Updated {guide.lastUpdated}
      </p>
    </Link>
  );
}
