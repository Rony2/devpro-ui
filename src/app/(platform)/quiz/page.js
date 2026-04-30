"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import questions from "./quiz.json";

const SORT_OPTIONS = [
  { value: "importance-high-to-low", label: "Importance: High to Low" },
  { value: "importance-low-to-high", label: "Importance: Low to High" },
  { value: "a-to-z", label: "A to Z" },
  { value: "z-to-a", label: "Z to A" },
];

const importanceWeight = { high: 3, medium: 2, low: 1 };

const IMPORTANCE_BADGE = {
  high: "bg-[var(--neo-pink)] border-[var(--border)]",
  medium: "bg-[var(--neo-yellow)] border-[var(--border)]",
  low: "bg-[var(--neo-green)] border-[var(--border)]",
};

const DIFFICULTY_BADGE = {
  hard: "bg-[var(--neo-pink)] border-[var(--border)]",
  medium: "bg-[var(--neo-yellow)] border-[var(--border)]",
  easy: "bg-[var(--neo-green)] border-[var(--border)]",
};

const uniqueTopics = Array.from(new Set(questions.flatMap((item) => item.topics))).sort();

const capitalizeWord = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const truncateText = (value, maxLength = 168) => {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
};

const sortQuestions = (questionList, sortBy) => {
  const sorted = [...questionList];
  switch (sortBy) {
    case "importance-low-to-high":
      return sorted.sort((a, b) => (importanceWeight[a.importance] || 0) - (importanceWeight[b.importance] || 0) || a.title.localeCompare(b.title));
    case "importance-high-to-low":
      return sorted.sort((a, b) => (importanceWeight[b.importance] || 0) - (importanceWeight[a.importance] || 0) || a.title.localeCompare(b.title));
    case "a-to-z":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "z-to-a":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
};

function SidebarSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-1 py-3 text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)] hover:text-[var(--brand)] transition-colors"
      >
        {title}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open ? <div className="pb-3">{children}</div> : null}
    </div>
  );
}

const QuizPage = () => {
  const [sortBy, setSortBy] = useState("importance-high-to-low");
  const [selectedImportance, setSelectedImportance] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [showSort, setShowSort] = useState(false);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filtered = useMemo(() => {
    let list = questions.filter((item) => {
      if (normalizedSearch) {
        const searchableText = `${item.title} ${item.description || ""}`.toLowerCase();
        if (!searchableText.includes(normalizedSearch)) return false;
      }
      if (selectedImportance !== "all" && item.importance !== selectedImportance) return false;
      if (selectedTopics.size > 0) {
        if (!item.topics.some((t) => selectedTopics.has(t))) return false;
      }
      return true;
    });
    return sortQuestions(list, sortBy);
  }, [normalizedSearch, selectedImportance, selectedTopics, sortBy]);

  const topicCounts = useMemo(() => {
    const counts = {};
    uniqueTopics.forEach((t) => (counts[t] = 0));
    questions.forEach((item) => item.topics.forEach((t) => { if (counts[t] !== undefined) counts[t]++; }));
    return counts;
  }, []);

  const totalQuestions = questions.length;
  const highPriorityCount = useMemo(() => questions.filter((q) => q.importance === "high").length, []);

  const hasFilters = normalizedSearch.length > 0 || selectedImportance !== "all" || selectedTopics.size > 0;

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic); else next.add(topic);
      return next;
    });
  };

  const clearAll = () => {
    setSearchTerm("");
    setSelectedImportance("all");
    setSelectedTopics(new Set());
  };

  return (
    <div className="container-page mt-6 pb-14">
      <div className="flex gap-8">
        {/* ── Main list ──────────────────────────────────── */}
        <div className="min-w-0 flex-1">
          <p className="mb-5 text-sm leading-relaxed text-[var(--text-muted)]">
            Master <span className="font-bold text-[var(--text)]">{totalQuestions}</span> curated questions covering the concepts most frequently tested at top companies — filtered by priority, topic, and difficulty.
          </p>

          {/* Search + Sort */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search questions by topic, concept, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus-ring h-10 w-full border-2 border-[var(--border)] bg-[var(--bg-elevated)] pl-9 pr-3 text-sm font-bold shadow-[2px_2px_0px_0px_var(--border)] placeholder:text-[var(--text-muted)]"
              />
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowSort((s) => !s)}
                className="focus-ring flex h-10 items-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 text-sm font-bold text-[var(--text-muted)] shadow-[2px_2px_0px_0px_var(--border)] hover:text-[var(--text)] transition-colors"
              >
                <ArrowUpDown size={14} />
                Sort
              </button>
              {showSort && (
                <div className="absolute right-0 top-full z-20 mt-1 w-52 border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-[4px_4px_0px_0px_var(--border)]">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                      className={`w-full px-3 py-2 text-left text-sm font-bold transition-colors ${
                        sortBy === opt.value
                          ? "bg-[var(--brand)] text-[var(--text)]"
                          : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Priority filter pills */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {["all", "high", "medium", "low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSelectedImportance(level)}
                className={`focus-ring border-2 border-[var(--border)] px-3 py-1.5 text-xs font-bold transition-colors ${
                  selectedImportance === level
                    ? "bg-[var(--brand)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                }`}
              >
                {level === "all" ? "All Priorities" : `${capitalizeWord(level)} Priority`}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-auto flex items-center gap-1 border-2 border-[var(--border)] px-3 py-1.5 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--neo-pink)] transition-colors"
              >
                <X size={12} />
                Clear filters
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="mb-4 text-xs font-bold text-[var(--text-muted)]">
            {filtered.length} of {totalQuestions} questions
          </div>

          {/* Question list */}
          {filtered.length > 0 ? (
            <div className="divide-y-2 divide-[var(--border)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
              {filtered.map((item, idx) => (
                <Link
                  key={item.slug}
                  href={`/quiz/${item.slug}#${item.index}`}
                  className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[var(--brand)]"
                >
                  {/* Number */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[var(--border)] bg-[var(--neo-yellow)] text-xs font-bold text-[var(--text)]">
                    {idx + 1}
                  </span>
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold leading-snug font-[family-name:var(--font-display)]">{item.title}</h3>
                      <span className={`inline-flex shrink-0 items-center border-2 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--text)] ${IMPORTANCE_BADGE[item.importance] || "border-[var(--border)] text-[var(--text-muted)]"}`}>
                        {item.importance}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {truncateText(item.description)}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center border-2 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[var(--text)] ${DIFFICULTY_BADGE[item.difficulty] || "border-[var(--border)] text-[var(--text-muted)]"}`}>
                        {item.difficulty}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-faint)]">{item.duration} min</span>
                      <span className="text-[var(--text-faint)]">·</span>
                      <span className="text-xs font-bold text-[var(--text-faint)]">{item.section}</span>
                      {item.featured && (
                        <span className="inline-flex items-center border-2 border-[var(--border)] bg-[var(--brand)] px-2 py-0.5 text-[11px] font-bold text-[var(--text)]">
                          Featured
                        </span>
                      )}
                      {item.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex border-2 border-[var(--border)] bg-[var(--neo-blue)] px-2.5 py-0.5 text-[11px] font-bold text-[var(--text)]"
                        >
                          {capitalizeWord(topic)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-[var(--border)] px-5 py-12 text-center">
              <p className="text-sm font-bold text-[var(--text)]">No questions match</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">Broaden topics, clear search, or switch priorities.</p>
              <button type="button" onClick={clearAll} className="focus-ring mt-4 border-2 border-[var(--border)] bg-[var(--brand)] px-4 py-2 text-sm font-bold shadow-[2px_2px_0px_0px_var(--border)]">
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* ── Right sidebar ──────────────────────────────── */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">
            {/* Stats */}
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
              <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">Overview</span>
              <div className="mt-3 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-bold">Total Questions</span>
                  <span className="font-bold text-[var(--text)]">{totalQuestions}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-bold">High Priority</span>
                  <span className="font-bold text-[var(--text)]">{highPriorityCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-bold">Topics</span>
                  <span className="font-bold text-[var(--text)]">{uniqueTopics.length}</span>
                </div>
              </div>
            </div>

            {/* Topics filter */}
            <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
              <SidebarSection title="Topics" defaultOpen>
                <div className="space-y-1">
                  {uniqueTopics.map((topic) => (
                    <label
                      key={topic}
                      className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.has(topic)}
                        onChange={() => toggleTopic(topic)}
                        className="h-4 w-4 border-2 border-[var(--border)] bg-transparent accent-[var(--brand)]"
                      />
                      <span className="truncate">{capitalizeWord(topic)}</span>
                      <span className="ml-auto text-xs font-bold text-[var(--text-faint)]">{topicCounts[topic]}</span>
                    </label>
                  ))}
                </div>
              </SidebarSection>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default QuizPage;
