import fs from "fs";
import path from "path";
import { cache } from "react";

const QUIZZES_DIR = path.join(process.cwd(), "content/quizzes");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function hasQuizFiles(slug) {
  const dir = path.join(QUIZZES_DIR, slug);
  return ["meta.json", "questions.json"].every((file) =>
    fs.existsSync(path.join(dir, file)),
  );
}

export const getAllQuizzes = cache(() => {
  return fs
    .readdirSync(QUIZZES_DIR)
    .filter(hasQuizFiles)
    .map((slug) => readJson(path.join(QUIZZES_DIR, slug, "meta.json")))
    .filter((meta) => meta.published);
});

export const getQuizBySlug = cache((slug) => {
  const dir = path.join(QUIZZES_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  const meta = readJson(path.join(dir, "meta.json"));
  const questions = readJson(path.join(dir, "questions.json"));
  return { meta, questions };
});
