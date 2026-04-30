import { notFound } from "next/navigation";
import { getSystemDesignBySlug } from "@/lib/content/systemDesign";
import { MDXRenderer } from "@/components/guide/MDXRenderer";

export default async function SystemDesignDetailPage({ params }) {
  const { slug } = await params;
  const scenario = await getSystemDesignBySlug(slug);

  if (!scenario) notFound();

  return (
    <section className="container-page mt-6 pb-14 space-y-4">
      <h1 className="text-3xl font-semibold">{scenario.meta.title}</h1>
      <p className="text-sm text-[color:var(--text-muted)]">{scenario.meta.description}</p>
      <MDXRenderer content={scenario.content} />
    </section>
  );
}
