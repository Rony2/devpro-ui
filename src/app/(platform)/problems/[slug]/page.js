import { notFound } from "next/navigation";
import { getAllProblems, getProblemBySlug } from "@/lib/content/problems";
import { ProblemWorkspace } from "@/components/problem/ProblemWorkspace";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const allProblems = getAllProblems();
  const meta = allProblems.find((p) => p.slug === slug);
  if (!meta) return { title: "Problem not found" };

  const title = `${meta.title} — ${meta.difficulty.charAt(0).toUpperCase() + meta.difficulty.slice(1)}`;

  return {
    title,
    description: meta.description,
    openGraph: {
      title: `${title} | Devpro`,
      description: meta.description,
      url: `/problems/${meta.slug}`,
      type: "article",
      images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Devpro`,
      description: meta.description,
      images: ["/seo-icon.svg"],
    },
    keywords: [...(meta.topics || []), meta.difficulty, "coding problem", "frontend interview"],
  };
}

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
