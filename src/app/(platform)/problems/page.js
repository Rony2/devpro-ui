import { getAllProblems } from "@/lib/content/problems";
import { ProblemListClient } from "@/components/problem/ProblemListClient";

export const dynamic = "force-static";

export const metadata = {
  title: "Coding Problems",
  description:
    "Practice hard and expert-level frontend coding problems. Implement data structures, DOM APIs, utility functions, and framework internals.",
  openGraph: {
    title: "Coding Problems | Devpro",
    description:
      "Practice hard and expert-level frontend coding problems. Implement data structures, DOM APIs, utility functions, and framework internals.",
    url: "/problems",
    type: "website",
    images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: "Devpro Coding Problems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coding Problems | Devpro",
    description:
      "Practice hard and expert-level frontend coding problems for senior and staff engineers.",
    images: ["/seo-icon.svg"],
  },
};

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
