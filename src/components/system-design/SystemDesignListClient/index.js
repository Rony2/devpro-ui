"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ArrowUpDown,
  Clock,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { useProgress } from "@/hooks/useProgress";

const DIFFICULTY_FILTERS = [
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "expert", label: "Expert" },
];

const SORT_OPTIONS = [
  { value: "difficulty", label: "Difficulty" },
  { value: "time-asc", label: "Time ↑" },
  { value: "time-desc", label: "Time ↓" },
  { value: "title", label: "A – Z" },
];

function SidebarSection({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b-2 border-[var(--border)] last:border-b-0">
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

export function SystemDesignListClient({ scenarios, totalHours }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("difficulty");
  const [showSort, setShowSort] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState(new Set());
  const [selectedProgress, setSelectedProgress] = useState("all");
  const { progress, resetSystemDesign } = useProgress();

  const toggleDifficulty = useCallback((value) => {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let list = scenarios.filter((s) => {
      if (selectedDifficulties.size > 0 && !selectedDifficulties.has(s.difficulty)) return false;
      if (selectedProgress === "completed" && !progress.systemDesign?.[s.slug]) return false;
      if (selectedProgress === "incomplete" && progress.systemDesign?.[s.slug]) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !s.title.toLowerCase().includes(q) &&
          !s.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    if (sort === "difficulty") {
      const order = { medium: 0, hard: 1, expert: 2 };
      list = [...list].sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1));
    } else if (sort === "time-asc") {
      list = [...list].sort((a, b) => (a.estimatedMinutes || 0) - (b.estimatedMinutes || 0));
    } else if (sort === "time-desc") {
      list = [...list].sort((a, b) => (b.estimatedMinutes || 0) - (a.estimatedMinutes || 0));
    } else if (sort === "title") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [scenarios, selectedDifficulties, selectedProgress, search, sort, progress]);

  /* ── Computed stats ──────────────────────────────────────── */
  const completedCount = useMemo(
    () => scenarios.filter((s) => progress.systemDesign?.[s.slug]).length,
    [scenarios, progress],
  );
  const totalCount = scenarios.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const difficultyStats = useMemo(() => {
    const stats = { medium: { total: 0, done: 0 }, hard: { total: 0, done: 0 }, expert: { total: 0, done: 0 } };
    for (const s of scenarios) {
      const d = stats[s.difficulty] ? s.difficulty : "hard";
      stats[d].total++;
      if (progress.systemDesign?.[s.slug]) stats[d].done++;
    }
    return stats;
  }, [scenarios, progress]);

  const hasFilters = selectedDifficulties.size > 0 || selectedProgress !== "all" || search;

  function clearAll() {
    setSelectedDifficulties(new Set());
    setSelectedProgress("all");
    setSearch("");
  }

  return (
    <div className="flex gap-8">
      {/* ── LEFT: Main list ────────────────────────────────── */}
      <div className="min-w-0 flex-1">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)]">System Design</h1>
          <p className="mt-1 text-sm font-bold text-[var(--text-muted)]">
            Frontend system design scenarios with staff-level answer frameworks.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search system design scenarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
            {showSort ? (
              <div className="absolute right-0 top-full z-20 mt-1 w-44 border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-1 shadow-[4px_4px_0px_0px_var(--border)]">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className={`w-full px-3 py-2 text-left text-sm font-bold transition-colors ${sort === opt.value ? "bg-[var(--brand)] text-[var(--text)]" : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Difficulty pills */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {DIFFICULTY_FILTERS.map((df) => {
            const active = selectedDifficulties.has(df.value);
            return (
              <button
                key={df.value}
                type="button"
                onClick={() => toggleDifficulty(df.value)}
                className={`focus-ring flex items-center gap-1.5 border-2 border-[var(--border)] px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? "bg-[var(--brand)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                }`}
              >
                {df.label}
              </button>
            );
          })}
        </div>

        {/* Total hours */}
        <div className="mb-4 flex items-center gap-1.5 text-xs text-[color:var(--text-muted)]">
          <Clock size={13} />
          <span>{totalHours} hours total · {scenarios.length} scenarios</span>
        </div>

        {/* Scenario list */}
        {filtered.length > 0 ? (
          <div className="divide-y-2 divide-[var(--border)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
            {filtered.map((scenario, i) => {
              const isCompleted = !!progress.systemDesign?.[scenario.slug];
              return (
                <Link
                  key={scenario.slug}
                  href={`/system-design/${scenario.slug}`}
                  className="group flex items-start gap-4 border-b-2 border-[var(--border)] px-5 py-4 transition-colors hover:bg-[var(--brand)] last:border-b-0"
                >
                  {/* Number / completion */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 size={22} className="text-[var(--success)]" aria-label="Completed" />
                    ) : (
                      <span className="flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] text-xs font-bold bg-[var(--neo-blue)] shadow-[2px_2px_0px_0px_var(--border)]">
                        {i + 1}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-snug font-[family-name:var(--font-display)]">
                      {scenario.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {scenario.description}
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      <DifficultyBadge level={scenario.difficulty} />
                      <span className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)]">
                        <Clock size={12} />
                        {scenario.estimatedMinutes} min
                      </span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-[var(--text)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No scenarios match"
            description="Try adjusting your filters or search query."
            action={
              hasFilters ? (
                <button
                  type="button"
                  onClick={clearAll}
                  className="focus-ring border-2 border-[var(--border)] bg-[var(--brand)] px-4 py-2 text-sm font-bold font-[family-name:var(--font-display)] shadow-[2px_2px_0px_0px_var(--border)]"
                >
                  Reset Filters
                </button>
              ) : null
            }
          />
        )}
      </div>

      {/* ── RIGHT: Sidebar widgets ─────────────────────────── */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">

          {/* ── Progress Widget ─────────────────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                {percent}% Progress
              </span>
              <button
                type="button"
                onClick={resetSystemDesign}
                className="border-2 border-[var(--border)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                title="Reset progress"
              >
                <RotateCcw size={15} />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg)]">
                <div
                  className="h-full bg-[var(--neo-green)] transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="shrink-0 text-xs font-bold text-[var(--text-muted)]">
                {completedCount}/{totalCount}
              </span>
            </div>
          </div>

          {/* ── Difficulty Breakdown Widget ─────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
              Difficulty Breakdown
            </span>
            <div className="mt-3 space-y-3">
              {[
                { key: "medium", label: "Medium", color: "var(--brand-2)" },
                { key: "hard", label: "Hard", color: "var(--brand)" },
                { key: "expert", label: "Expert", color: "var(--neo-pink)" },
              ].map(({ key, label, color }) => {
                const s = difficultyStats[key];
                if (s.total === 0) return null;
                const pct = Math.round((s.done / s.total) * 100);
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold" style={{ color }}>{label}</span>
                      <span className="text-[var(--text-muted)] font-bold">{s.done}/{s.total}</span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg)]">
                      <div
                        className="h-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Estimated Time Widget ──────────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
              Time Estimate
            </span>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-bold">Total</span>
                <span className="font-bold text-[var(--text)]">{totalHours}h</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-bold">Avg per scenario</span>
                <span className="font-bold text-[var(--text)]">
                  {totalCount > 0 ? Math.round((totalHours * 60) / totalCount) : 0} min
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--text-muted)] font-bold">Remaining</span>
                <span className="font-bold text-[var(--text)]">
                  {Math.round(
                    scenarios
                      .filter((s) => !progress.systemDesign?.[s.slug])
                      .reduce((sum, s) => sum + (s.estimatedMinutes || 0), 0) / 60
                  )}h
                </span>
              </div>
            </div>
          </div>

          {/* ── Filters ────────────────────────────────────── */}
          <SidebarSection title="Difficulty" defaultOpen>
            <div className="space-y-0.5">
              {["medium", "hard", "expert"].map((d) => (
                <label
                  key={d}
                  className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.has(d)}
                    onChange={() => toggleDifficulty(d)}
                    className="h-4 w-4 border-2 border-[var(--border)] bg-transparent accent-[var(--brand)]"
                  />
                  <span className="capitalize">{d}</span>
                </label>
              ))}
            </div>
          </SidebarSection>

          <SidebarSection title="Progress">
            <div className="space-y-0.5">
              {[
                { value: "all", label: "All" },
                { value: "completed", label: "Completed" },
                { value: "incomplete", label: "Not completed" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                >
                  <input
                    type="radio"
                    name="sd-progress"
                    checked={selectedProgress === opt.value}
                    onChange={() => setSelectedProgress(opt.value)}
                    className="h-4 w-4 border-2 border-[var(--border)] bg-transparent accent-[var(--brand)]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </SidebarSection>

          {/* Clear all */}
          {hasFilters ? (
            <button
              type="button"
              onClick={clearAll}
              className="mt-3 text-xs font-bold text-[var(--brand)] hover:underline decoration-2"
            >
              Clear all filters
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
