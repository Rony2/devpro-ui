import { getAllProblems } from "@/lib/content/problems";
import { ProblemListClient } from "@/components/problem/ProblemListClient";

export const dynamic = "force-static";

export default function ProblemsPage() {
  const problems = getAllProblems();

  // Collect unique topics and companies for sidebar filters
  const allTopics = Array.from(new Set(problems.flatMap((p) => p.topics))).sort();
  const allCompanies = Array.from(new Set(problems.flatMap((p) => p.companies || []))).sort();

  const totalHours = Math.round(
    problems.reduce((sum, p) => sum + (p.estimatedMinutes || 0), 0) / 60,
  );

  return (
    <div className="container-page mt-6 pb-14">
      <ProblemListClient
        problems={problems}
        allTopics={allTopics}
        allCompanies={allCompanies}
        totalHours={totalHours}
      />
    </div>
  );
}
