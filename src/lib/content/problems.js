import fs from "fs";
import path from "path";
import vm from "node:vm";
import { cache } from "react";
import { compileMdx } from "./mdx";
import { CodeBlock } from "@/components/shared/CodeBlock";

const mdxComponents = {
  pre: CodeBlock,
};

const PROBLEMS_DIR = path.join(process.cwd(), "content/problems");

/**
 * Read a single-file problem (index.js) and return the exported `problem` object.
 * File format: `export const problem = { slug, title, ..., description, starterCode, solution, tests };`
 */
function readProblemFile(filePath) {
  const source = fs.readFileSync(filePath, "utf-8");
  const normalized = source.replace(/export\s+const\s+problem\s*=\s*/, "const problem = ");
  const script = `${normalized}\n;problem;`;
  return vm.runInNewContext(script, Object.create(null), {
    filename: filePath,
    timeout: 2000,
  });
}

function hasProblemFile(slug) {
  return fs.existsSync(path.join(PROBLEMS_DIR, slug, "index.js"));
}

export const getAllProblems = cache(() => {
  const slugs = fs
    .readdirSync(PROBLEMS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter(hasProblemFile);

  const metas = slugs
    .map((slug) => {
      const p = readProblemFile(path.join(PROBLEMS_DIR, slug, "index.js"));
      return {
        slug: p.slug,
        category: p.category || "grind-75",
        title: p.title,
        difficulty: p.difficulty,
        type: p.type,
        topics: p.topics,
        companies: p.companies,
        estimatedMinutes: p.estimatedMinutes,
        published: p.published,
        addedAt: p.addedAt,
        description: p.description,
      };
    })
    .filter((meta) => meta.published)
    .sort((a, b) => {
      const order = { easy: 0, medium: 1, hard: 2 };
      const diff = (order[a.difficulty] ?? 3) - (order[b.difficulty] ?? 3);
      if (diff !== 0) return diff;
      return a.title.localeCompare(b.title);
    });

  return metas;
});

export const getProblemBySlug = cache(async (slug) => {
  const filePath = path.join(PROBLEMS_DIR, slug, "index.js");
  if (!fs.existsSync(filePath)) return null;

  const p = readProblemFile(filePath);
  const content = await compileMdx(p.problemMdx, mdxComponents);

  return {
    meta: {
      slug: p.slug,
      title: p.title,
      difficulty: p.difficulty,
      type: p.type,
      topics: p.topics,
      companies: p.companies,
      estimatedMinutes: p.estimatedMinutes,
      published: p.published,
      addedAt: p.addedAt,
      description: p.description,
    },
    content,
    starterCode: p.starterCode,
    tests: p.tests,
  };
});

/**
 * Read tests for a specific problem slug — used by the API run route.
 */
export function getTestsBySlug(slug) {
  const filePath = path.join(PROBLEMS_DIR, slug, "index.js");
  const p = readProblemFile(filePath);
  return p.tests;
}

/**
 * Read optional harness code for a problem — appended to user code server-side.
 */
export function getHarnessBySlug(slug) {
  const filePath = path.join(PROBLEMS_DIR, slug, "index.js");
  const p = readProblemFile(filePath);
  return p.harness || null;
}
