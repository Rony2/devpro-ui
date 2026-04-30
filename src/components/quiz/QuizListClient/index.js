"use client";

import { useMemo, useState } from "react";
import { FilterBar } from "@/components/shared/FilterBar";
import { QuizCard } from "@/components/quiz/QuizCard";

export function QuizListClient({ quizzes }) {
  const [topic, setTopic] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [format, setFormat] = useState("all");

  const topicOptions = useMemo(() => {
    const topics = Array.from(new Set(quizzes.map((quiz) => quiz.topic)));
    return [{ value: "all", label: "All" }, ...topics.map((value) => ({ value, label: value }))];
  }, [quizzes]);

  const filtered = quizzes.filter((quiz) => {
    if (topic !== "all" && quiz.topic !== topic) return false;
    if (difficulty !== "all" && quiz.difficulty !== difficulty) return false;
    if (format !== "all" && !quiz.formats?.includes(format)) return false;
    return true;
  });

  const filters = [
    { key: "topic", label: "Topic", value: topic, options: topicOptions },
    {
      key: "difficulty",
      label: "Difficulty",
      value: difficulty,
      options: [
        { value: "all", label: "All" },
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
      ],
    },
    {
      key: "format",
      label: "Format",
      value: format,
      options: [
        { value: "all", label: "All" },
        { value: "mcq", label: "MCQ" },
        { value: "true-false", label: "True / False" },
        { value: "spot-the-bug", label: "Spot the Bug" },
      ],
    },
  ];

  function onFilterChange(key, value) {
    if (key === "topic") setTopic(value);
    if (key === "difficulty") setDifficulty(value);
    if (key === "format") setFormat(value);
  }

  return (
    <div className="space-y-4">
      <FilterBar filters={filters} onFilterChange={onFilterChange} />
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((quiz) => (
          <QuizCard key={quiz.slug} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
