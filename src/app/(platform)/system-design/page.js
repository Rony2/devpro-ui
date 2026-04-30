import Link from "next/link";
import { getAllSystemDesign } from "@/lib/content/systemDesign";

export default function SystemDesignPage() {
  const scenarios = getAllSystemDesign();

  return (
    <section className="container-page mt-6 pb-14 space-y-4">
      <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">System Design</h1>
      <p className="text-sm font-bold text-[var(--text-muted)]">Frontend system design scenarios with staff-level answer frameworks.</p>

      <div className="grid gap-4 md:grid-cols-2">
        {scenarios.map((scenario) => (
          <Link key={scenario.slug} href={`/system-design/${scenario.slug}`} className="card focus-ring block p-4">
            <h2 className="text-lg font-bold font-[family-name:var(--font-display)]">{scenario.title}</h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{scenario.description}</p>
            <p className="mt-3 text-xs uppercase tracking-wide font-bold text-[var(--text-muted)]">{scenario.difficulty} · {scenario.estimatedMinutes} min</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
