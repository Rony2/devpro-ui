import fs from "fs";
import path from "path";
import { cache } from "react";
import { compileMdx } from "./mdx";

const SYSTEM_DIR = path.join(process.cwd(), "content/system-design");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function hasSystemDesignFiles(slug) {
  const dir = path.join(SYSTEM_DIR, slug);
  return ["meta.json", "content.mdx"].every((file) =>
    fs.existsSync(path.join(dir, file)),
  );
}

export const getAllSystemDesign = cache(() => {
  return fs
    .readdirSync(SYSTEM_DIR)
    .filter(hasSystemDesignFiles)
    .map((slug) => readJson(path.join(SYSTEM_DIR, slug, "meta.json")))
    .filter((meta) => meta.published);
});

export const getSystemDesignBySlug = cache(async (slug) => {
  const dir = path.join(SYSTEM_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const meta = readJson(path.join(dir, "meta.json"));
  const source = fs.readFileSync(path.join(dir, "content.mdx"), "utf-8");
  const content = await compileMdx(source);

  return { meta, content };
});
