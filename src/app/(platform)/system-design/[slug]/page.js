import { notFound } from "next/navigation";
import { getAllSystemDesign, getSystemDesignBySlug } from "@/lib/content/systemDesign";
import { MDXRenderer } from "@/components/guide/MDXRenderer";
import { TableOfContents } from "@/components/guide/TableOfContents";
import { ReadingProgress } from "@/components/guide/ReadingProgress";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { MarkCompleteButton } from "@/components/system-design/MarkCompleteButton";
import { Clock, FileText } from "lucide-react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const allScenarios = getAllSystemDesign();
  const meta = allScenarios.find((s) => s.slug === slug);
  if (!meta) return { title: "System Design not found" };

  const title = `${meta.title} — Frontend System Design`;

  return {
    title,
    description: meta.description,
    openGraph: {
      title: `${title} | Devpro`,
      description: meta.description,
      url: `/system-design/${meta.slug}`,
      type: "article",
      images: [{ url: "/seo-icon.svg", width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Devpro`,
      description: meta.description,
      images: ["/seo-icon.svg"],
    },
    keywords: ["system design", "frontend architecture", meta.difficulty, "interview prep"],
  };
}

export default async function SystemDesignDetailPage({ params }) {
  const { slug } = await params;
  const scenario = await getSystemDesignBySlug(slug);

  if (!scenario) notFound();

  const { meta, content, headings } = scenario;

  return (
    <>
      <ReadingProgress />

      <section className="container-page mt-6 pb-14">
        {/* Hero header */}
        <header className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] shadow-[4px_4px_0px_0px_var(--border)] overflow-hidden">
          {/* Color stripe */}
          <div className="flex h-2">
            <div className="flex-1 bg-[var(--neo-pink)]" />
            <div className="flex-1 bg-[var(--neo-blue)]" />
            <div className="flex-1 bg-[var(--neo-green)]" />
            <div className="flex-1 bg-[var(--neo-yellow)]" />
            <div className="flex-1 bg-[var(--neo-purple)]" />
          </div>
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <DifficultyBadge level={meta.difficulty} />
                  <span className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--neo-purple)] px-2.5 py-1 text-xs font-bold uppercase tracking-wide shadow-[2px_2px_0px_0px_var(--border)] font-[family-name:var(--font-display)]">
                    <FileText size={12} />
                    System Design
                  </span>
                </div>
                <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                  {meta.title}
                </h1>
                <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-2xl">
                  {meta.description}
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <MarkCompleteButton slug={meta.slug} />
                <span className="inline-flex items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--neo-blue)] px-2.5 py-1 text-xs font-bold font-[family-name:var(--font-display)] uppercase tracking-wide shadow-[2px_2px_0px_0px_var(--border)]">
                  <Clock size={14} />
                  {meta.estimatedMinutes} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Two-column layout: content + TOC */}
        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_260px]">
          <MDXRenderer content={content} />
          {headings.length > 0 && <TableOfContents headings={headings} />}
        </div>
      </section>
    </>
  );
}
