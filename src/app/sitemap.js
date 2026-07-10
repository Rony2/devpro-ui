import { getAllProblems } from "@/lib/content/problems";
import { getAllSystemDesign } from "@/lib/content/systemDesign";
import fs from "fs";
import path from "path";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devpro.in";

function loadQuizSlugs() {
  const quizPath = path.join(process.cwd(), "src/app/(platform)/quiz/quiz.json");
  const data = JSON.parse(fs.readFileSync(quizPath, "utf-8"));
  return data.map((q) => q.slug);
}

export default function sitemap() {
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5, lastModified: now },
    { url: `${SITE_URL}/pricing`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${SITE_URL}/problems`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/quiz`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/system-design`, changeFrequency: "weekly", priority: 0.9, lastModified: now },
  ];

  // Problems
  const problems = getAllProblems().map((p) => ({
    url: `${SITE_URL}/problems/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  // Quiz questions
  const quizzes = loadQuizSlugs().map((slug) => ({
    url: `${SITE_URL}/quiz/${slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
    lastModified: now,
  }));

  // System design
  const systemDesign = getAllSystemDesign().map((s) => ({
    url: `${SITE_URL}/system-design/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
    lastModified: now,
  }));

  return [...staticPages, ...problems, ...quizzes, ...systemDesign];
}
