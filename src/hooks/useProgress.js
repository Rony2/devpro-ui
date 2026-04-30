"use client";

import { useState } from "react";
import { getProgress, setProgress } from "@/lib/storage";

export function useProgress() {
  const [progress, setLocalProgress] = useState(() => getProgress());

  function markProblemComplete(slug) {
    const next = {
      ...progress,
      problems: { ...progress.problems, [slug]: true },
    };
    setLocalProgress(next);
    setProgress(next);
  }

  function setQuizScore(slug, score) {
    const next = {
      ...progress,
      quizzes: { ...progress.quizzes, [slug]: score },
    };
    setLocalProgress(next);
    setProgress(next);
  }

  function resetProblems() {
    const next = { ...progress, problems: {} };
    setLocalProgress(next);
    setProgress(next);
  }

  return { progress, markProblemComplete, setQuizScore, resetProblems };
}
