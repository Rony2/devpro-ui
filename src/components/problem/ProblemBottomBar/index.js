"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Play,
  Send,
  Loader2,
  Settings,
  Search,
  X,
  ListFilter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/useProgress";

/* ── Topic group pills for the sidebar ─────────────────────── */
const TOPIC_GROUPS = [
  { key: "all", label: "All" },
  { key: "arrays", label: "Arrays & Strings", match: ["Arrays", "Strings", "Two Pointers", "Sliding Window", "Hash Map", "Hash Set", "Sorting"] },
  { key: "trees", label: "Trees & Graphs", match: ["Trees", "Binary Trees", "Binary Search Trees", "Graphs", "DFS", "BFS", "Trie", "Topological Sort", "Union Find", "Graph"] },
  { key: "dp", label: "Dynamic Programming", match: ["Dynamic Programming", "Greedy"] },
  { key: "linked", label: "Linked Lists", match: ["Linked Lists"] },
  { key: "stack", label: "Stacks & Queues", match: ["Stack", "Stacks", "Queues", "Heap"] },
  { key: "js", label: "JavaScript", match: ["JavaScript", "Functions", "Promises", "Async", "DOM", "Events", "Timing", "Closures", "APIs", "API Design", "Scheduling", "State Machines"] },
  { key: "design", label: "Design", match: ["Design", "React Internals"] },
];

const DIFFICULTY_COLOR = {
  easy: "text-[var(--success)]",
  medium: "text-[var(--brand-2)]",
  hard: "text-[var(--danger)]",
};

/* ── Problem list sidebar drawer ───────────────────────────── */
function getStoredTab() {
  if (typeof window === "undefined") return "grind-75";
  try { return localStorage.getItem("devpro:problems-tab") || "grind-75"; } catch { return "grind-75"; }
}

function ProblemDrawer({ open, onClose, allProblems, currentSlug }) {
  const [category, setCategoryRaw] = useState(getStoredTab);
  const setCategory = useCallback((tab) => {
    setCategoryRaw(tab);
    try { localStorage.setItem("devpro:problems-tab", tab); } catch {}
  }, []);
  const [search, setSearch] = useState("");
  const [topicGroup, setTopicGroup] = useState("all");
  const [showCatDropdown, setShowCatDropdown] = useState(false);
  const { progress } = useProgress();
  const drawerRef = useRef(null);
  const activeRef = useRef(null);

  const grindProblems = useMemo(() => allProblems.filter((p) => p.category !== "js-75"), [allProblems]);
  const jsProblems = useMemo(() => allProblems.filter((p) => p.category === "js-75"), [allProblems]);
  const categoryProblems = category === "grind-75" ? grindProblems : jsProblems;

  const filtered = useMemo(() => {
    return categoryProblems.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.title.toLowerCase().includes(q) && !p.topics.some((t) => t.toLowerCase().includes(q))) return false;
      }
      if (topicGroup !== "all") {
        const group = TOPIC_GROUPS.find((g) => g.key === topicGroup);
        if (group && !p.topics.some((t) => group.match.includes(t))) return false;
      }
      return true;
    });
  }, [categoryProblems, search, topicGroup]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Scroll to active problem on open
  useEffect(() => {
    if (open && activeRef.current) {
      activeRef.current.scrollIntoView({ block: "center", behavior: "instant" });
    }
  }, [open, category]);

  // Reset topic group when category changes
  useEffect(() => {
    setTopicGroup("all");
    setSearch("");
  }, [category]);

  const catLabel = category === "grind-75" ? "Grind 75" : "JS 75";
  const catCount = category === "grind-75" ? grindProblems.length : jsProblems.length;

  return (
    <>
      {/* Backdrop */}
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden
        />
      ) : null}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-[420px] max-w-[90vw] flex-col border-r-2 border-[var(--border)] bg-[var(--bg)] shadow-[6px_0px_0px_0px_var(--border)] transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* ── Header with category dropdown ──────────────────── */}
        <div className="flex shrink-0 items-center justify-between border-b-2 border-[var(--border)] px-4 py-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowCatDropdown((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)] transition-colors hover:text-[var(--brand)]"
            >
              <ListFilter size={15} className="text-[var(--brand)]" />
              {catLabel}
              <ChevronDown size={14} className="text-[var(--text-muted)]" />
            </button>
            {showCatDropdown ? (
              <div className="absolute left-0 top-full z-10 mt-1 w-48 border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-[4px_4px_0px_0px_var(--border)]">
                {[
                  { value: "grind-75", label: "Grind 75", count: grindProblems.length },
                  { value: "js-75", label: "JS 75", count: jsProblems.length },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { setCategory(opt.value); setShowCatDropdown(false); }}
                    className={cn(
                      "flex w-full items-center justify-between px-3 py-2 text-left text-sm font-bold transition-colors",
                      category === opt.value
                        ? "bg-[var(--brand)] text-[var(--text)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]",
                    )}
                  >
                    {opt.label}
                    <span className="text-xs opacity-70">{opt.count}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-pink)] hover:text-[var(--text)]"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Search ─────────────────────────────────────────── */}
        <div className="shrink-0 border-b-2 border-[var(--border)] px-4 py-2.5">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search within this list..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-full border-2 border-[var(--border)] bg-[var(--bg-elevated)] pl-8 pr-3 text-xs font-bold shadow-[2px_2px_0px_0px_var(--border)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
          </div>
        </div>

        {/* ── Topic group pills ──────────────────────────────── */}
        <div className="flex shrink-0 flex-wrap gap-1.5 border-b-2 border-[var(--border)] px-4 py-2.5">
          {TOPIC_GROUPS.map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setTopicGroup(g.key)}
              className={cn(
                "border-2 border-[var(--border)] px-2.5 py-1 text-[11px] font-bold transition-colors",
                topicGroup === g.key
                  ? "bg-[var(--brand)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]"
                  : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* ── Column headers ─────────────────────────────────── */}
        <div className="flex shrink-0 items-center gap-3 border-b-2 border-[var(--border)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-faint)] font-[family-name:var(--font-display)]">
          <span className="flex-1">Name</span>
          <span className="w-24 text-right">Topic</span>
          <span className="w-16 text-right">Difficulty</span>
        </div>

        {/* ── Problem list ───────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filtered.length > 0 ? (
            filtered.map((p) => {
              const isActive = p.slug === currentSlug;
              const isCompleted = Boolean(progress?.problems?.[p.slug]);
              const primaryTopic = p.topics[0] || "";
              return (
                <Link
                  key={p.slug}
                  href={`/problems/${p.slug}`}
                  ref={isActive ? activeRef : null}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 border-b-2 border-[var(--border)] px-4 py-3 text-sm transition-colors",
                    isActive
                      ? "bg-[var(--brand)]"
                      : "hover:bg-[var(--neo-yellow)]",
                  )}
                >
                  {/* Completion indicator */}
                  <span className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 size={18} className="text-[var(--success)]" />
                    ) : (
                      <span className="inline-block h-[18px] w-[18px] border-2 border-[var(--border)]" />
                    )}
                  </span>

                  {/* Name */}
                  <span className={cn(
                    "min-w-0 flex-1 truncate font-bold",
                    isActive ? "text-[var(--text)]" : "text-[var(--text)]",
                  )}>
                    {p.title}
                  </span>

                  {/* Primary topic */}
                  <span className="w-24 truncate text-right text-[11px] font-bold text-[var(--text-muted)]">
                    {primaryTopic}
                  </span>

                  {/* Difficulty */}
                  <span className={cn(
                    "w-16 text-right text-xs font-bold capitalize",
                    DIFFICULTY_COLOR[p.difficulty] || "text-[var(--text-muted)]",
                  )}>
                    {p.difficulty}
                  </span>
                </Link>
              );
            })
          ) : (
            <div className="px-4 py-8 text-center text-sm font-bold text-[var(--text-muted)]">
              No problems match your filters
            </div>
          )}
        </div>

        {/* ── Footer count ───────────────────────────────── */}
        <div className="shrink-0 border-t-2 border-[var(--border)] px-4 py-2 text-center text-[11px] font-bold text-[var(--text-faint)]">
          {filtered.length} of {catCount} problems
        </div>
      </div>
    </>
  );
}

export function ProblemBottomBar({
  language,
  onLanguageChange,
  prevSlug,
  nextSlug,
  currentIndex,
  totalCount,
  allProblems = [],
  currentSlug,
  onRun,
  onSubmit,
  onMarkComplete,
  isRunning,
  allPassed,
  isCompleted,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <ProblemDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        allProblems={allProblems}
        currentSlug={currentSlug}
      />
      <div className="flex h-12 items-center justify-between border-t-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4">
        {/* ── Left: language selector ────────────────────── */}
        <div className="flex items-center gap-2">
          <Settings size={14} className="text-[var(--text-muted)]" />
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-7 border-2 border-[var(--border)] bg-transparent px-2 text-xs font-bold text-[var(--text-muted)] focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {/* ── Center: problem navigation ───────────────────────── */}
        <div className="flex items-center gap-1">
          {prevSlug ? (
            <Link
              href={`/problems/${prevSlug}`}
              className="focus-ring inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
              aria-label="Previous problem"
            >
              <ChevronLeft size={15} />
            </Link>
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] opacity-40">
              <ChevronLeft size={15} />
            </span>
          )}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="focus-ring mx-1 inline-flex items-center gap-1 border-2 border-[var(--border)] px-2.5 py-1 text-xs font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
          >
            All problems
            <span className="text-[10px] opacity-60">
              ({currentIndex + 1}/{totalCount})
            </span>
          </button>

          {nextSlug ? (
            <Link
              href={`/problems/${nextSlug}`}
              className="focus-ring inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
              aria-label="Next problem"
            >
              <ChevronRight size={15} />
            </Link>
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] opacity-40">
              <ChevronRight size={15} />
            </span>
          )}
        </div>

        {/* ── Right: actions ───────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMarkComplete}
            className={cn(
              "focus-ring inline-flex h-8 items-center gap-1.5 border-2 border-[var(--border)] px-2.5 text-xs font-bold transition-colors",
              isCompleted
                ? "bg-[var(--neo-green)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]"
                : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]",
            )}
          >
            <CheckCircle2 size={13} />
            {isCompleted ? "Completed" : "Mark complete"}
          </button>

          <button
            type="button"
            onClick={onRun}
            disabled={isRunning}
            className="focus-ring inline-flex h-8 items-center gap-1.5 border-2 border-[var(--border)] bg-[var(--brand)] px-3 text-xs font-bold shadow-[2px_2px_0px_0px_var(--border)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)] disabled:opacity-60"
          >
            {isRunning ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />}
            Run
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className={cn(
              "focus-ring inline-flex h-8 items-center gap-1.5 border-2 border-[var(--border)] px-3 text-xs font-bold transition-all",
              allPassed
                ? "bg-[var(--neo-green)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_var(--border)]"
                : "text-[var(--text)] hover:bg-[var(--neo-yellow)]",
            )}
          >
            <Send size={13} />
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
