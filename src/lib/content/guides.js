import fs from "fs";
import path from "path";
import { cache } from "react";
import { compileMdx, extractHeadings } from "./mdx";

const GUIDES_DIR = path.join(process.cwd(), "content/guides");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getSlugsWithMeta(baseDir) {
  return fs
    .readdirSync(baseDir)
    .filter((slug) => fs.existsSync(path.join(baseDir, slug, "meta.json")));
}

export const getAllGuides = cache(() => {
  return getSlugsWithMeta(GUIDES_DIR)
    .map((slug) => readJson(path.join(GUIDES_DIR, slug, "meta.json")))
    .filter((meta) => meta.published)
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
});

export const getGuideBySlug = cache(async (slug) => {
  const dir = path.join(GUIDES_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const meta = readJson(path.join(dir, "meta.json"));
  const source = fs.readFileSync(path.join(dir, "content.mdx"), "utf-8");
  const headings = extractHeadings(source);
  const content = await compileMdx(source);

  return { meta, headings, content };
});
