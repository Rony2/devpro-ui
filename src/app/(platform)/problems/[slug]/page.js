import { notFound } from "next/navigation";
import { getAllProblems, getProblemBySlug } from "@/lib/content/problems";
import { ProblemWorkspace } from "@/components/problem/ProblemWorkspace";

export default async function ProblemDetailPage({ params }) {
  const { slug } = await params;
  const problem = await getProblemBySlug(slug);

  if (!problem) notFound();

  const allProblems = getAllProblems();
  const currentIndex = allProblems.findIndex((p) => p.slug === slug);
  const prevSlug = currentIndex > 0 ? allProblems[currentIndex - 1].slug : null;
  const nextSlug = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1].slug : null;

  return (
    <ProblemWorkspace
      problem={problem}
      prevSlug={prevSlug}
      nextSlug={nextSlug}
      currentIndex={currentIndex}
      totalCount={allProblems.length}
      allProblems={allProblems}
    />
  );
}
