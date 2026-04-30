"use client";

import { useMemo, useState, useCallback } from "react";
import { Search, Clock, ChevronDown, ChevronUp, ArrowUpDown, Code2, Bug, Compass, RotateCcw, Trophy, Cpu, Braces } from "lucide-react";
import { ProblemCard } from "@/components/problem/ProblemCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { useProgress } from "@/hooks/useProgress";

const TABS = [
  { value: "grind-75", label: "Grind 75", icon: Cpu, description: "DSA & Algorithms" },
  { value: "js-75", label: "JS 75", icon: Braces, description: "JavaScript Deep Dives" },
];

const TYPE_FILTERS = [
  { value: "coding", label: "Coding", icon: Code2 },
  { value: "debugging", label: "Debugging", icon: Bug },
  { value: "architecture", label: "Architecture", icon: Compass },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "difficulty", label: "Difficulty" },
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

function CheckboxFilter({ label, checked, onChange, icon = null }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 px-1 py-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-2 border-[var(--border)] bg-transparent accent-[var(--brand)]"
      />
      {icon ? <span className="flex items-center">{icon}</span> : null}
      <span className="truncate">{label}</span>
    </label>
  );
}

function getStoredTab() {
  if (typeof window === "undefined") return "grind-75";
  try { return localStorage.getItem("devpro:problems-tab") || "grind-75"; } catch { return "grind-75"; }
}

export function ProblemListClient({ problems, allTopics, allCompanies, totalHours }) {
  const [activeTab, setActiveTabRaw] = useState(getStoredTab);
  const setActiveTab = useCallback((tab) => {
    setActiveTabRaw(tab);
    try { localStorage.setItem("devpro:problems-tab", tab); } catch {}
  }, []);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [showSort, setShowSort] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());
  const [selectedDifficulties, setSelectedDifficulties] = useState(new Set());
  const [selectedProgress, setSelectedProgress] = useState("all"); // all, completed, incomplete
  const { progress, resetProblems } = useProgress();

  const toggleSet = useCallback((setter, value) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  // Split problems by category
  const grindProblems = useMemo(() => problems.filter((p) => p.category !== "js-75"), [problems]);
  const jsProblems = useMemo(() => problems.filter((p) => p.category === "js-75"), [problems]);
  const categoryProblems = activeTab === "grind-75" ? grindProblems : jsProblems;

  const filtered = useMemo(() => {
    let list = categoryProblems.filter((p) => {
      if (selectedTypes.size > 0 && !selectedTypes.has(p.type)) return false;
      if (selectedDifficulties.size > 0 && !selectedDifficulties.has(p.difficulty)) return false;
      if (selectedTopics.size > 0 && !p.topics.some((t) => selectedTopics.has(t))) return false;
      if (selectedCompanies.size > 0 && !(p.companies || []).some((c) => selectedCompanies.has(c))) return false;
      if (selectedProgress === "completed" && !progress.problems?.[p.slug]) return false;
      if (selectedProgress === "incomplete" && progress.problems?.[p.slug]) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q) &&
          !p.topics.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });

    if (sort === "newest") list = [...list].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    else if (sort === "oldest") list = [...list].sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    else if (sort === "difficulty") {
      const order = { easy: 0, medium: 1, hard: 2 };
      list = [...list].sort((a, b) => (order[a.difficulty] ?? 2) - (order[b.difficulty] ?? 2));
    }

    return list;
  }, [categoryProblems, selectedTypes, selectedDifficulties, selectedTopics, selectedCompanies, selectedProgress, search, sort, progress]);

  const activeTypes = useMemo(() => new Set(categoryProblems.map((p) => p.type)), [categoryProblems]);

  /* ── Computed stats for widgets ─────────────────────────────── */
  const completedCount = useMemo(
    () => categoryProblems.filter((p) => progress.problems?.[p.slug]).length,
    [categoryProblems, progress],
  );
  const totalCount = categoryProblems.length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const difficultyStats = useMemo(() => {
    const stats = { easy: { total: 0, done: 0 }, medium: { total: 0, done: 0 }, hard: { total: 0, done: 0 } };
    for (const p of categoryProblems) {
      const d = stats[p.difficulty] ? p.difficulty : "hard";
      stats[d].total++;
      if (progress.problems?.[p.slug]) stats[d].done++;
    }
    return stats;
  }, [categoryProblems, progress]);

  const topicStats = useMemo(() => {
    const map = {};
    for (const p of categoryProblems) {
      for (const t of p.topics) {
        if (!map[t]) map[t] = { total: 0, done: 0 };
        map[t].total++;
        if (progress.problems?.[p.slug]) map[t].done++;
      }
    }
    return Object.entries(map)
      .map(([name, s]) => ({ name, ...s, pct: s.total > 0 ? Math.round((s.done / s.total) * 100) : 0 }))
      .sort((a, b) => b.pct - a.pct || b.done - a.done)
      .slice(0, 6);
  }, [categoryProblems, progress]);

  // Per-tab stats for the tab badges
  const grindCompleted = useMemo(() => grindProblems.filter((p) => progress.problems?.[p.slug]).length, [grindProblems, progress]);
  const jsCompleted = useMemo(() => jsProblems.filter((p) => progress.problems?.[p.slug]).length, [jsProblems, progress]);

  const hasFilters = selectedTypes.size > 0 || selectedTopics.size > 0 || selectedCompanies.size > 0 || selectedDifficulties.size > 0 || selectedProgress !== "all" || search;

  function clearAll() {
    setSelectedTypes(new Set());
    setSelectedTopics(new Set());
    setSelectedCompanies(new Set());
    setSelectedDifficulties(new Set());
    setSelectedProgress("all");
    setSearch("");
  }

  return (
    <div className="flex gap-8">
      {/* ── LEFT: Main list ──────────────────────────────────── */}
      <div className="min-w-0 flex-1">

        {/* ── Tab switcher ────────────────────────────────────── */}
        <div className="mb-6 flex gap-3">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.value;
            const count = tab.value === "grind-75" ? grindProblems.length : jsProblems.length;
            const done = tab.value === "grind-75" ? grindCompleted : jsCompleted;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`group relative flex flex-1 items-center gap-3 border-2 border-[var(--border)] p-4 transition-all duration-200 ${
                  active
                    ? "bg-[var(--brand)] shadow-[4px_4px_0px_0px_var(--border)]"
                    : "bg-[var(--bg-elevated)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_var(--border)]"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center border-2 border-[var(--border)] transition-colors ${
                  active
                    ? "bg-[var(--text)] text-[var(--bg)]"
                    : "bg-[var(--neo-yellow)] text-[var(--text)] group-hover:text-[var(--text)]"
                }`}>
                  <Icon size={20} />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold font-[family-name:var(--font-display)] ${active ? "text-[var(--text)]" : "text-[var(--text)]"}`}>
                      {tab.label}
                    </span>
                    <span className="border-2 border-[var(--border)] bg-[var(--neo-blue)] px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-[var(--text)]">
                      {count}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {tab.description}
                    {done > 0 ? <span className="ml-1.5 text-[var(--success)] font-bold">· {done} done</span> : null}
                  </p>
                </div>
                {active ? (
                  <div className="absolute -bottom-px left-4 right-4 h-1 bg-[var(--text)]" />
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Search + Sort */}
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search within this list of problems..."
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
              Sort by
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

        {/* Type category pills */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {TYPE_FILTERS.filter((tf) => activeTypes.has(tf.value)).map((tf) => {
            const Icon = tf.icon;
            const active = selectedTypes.has(tf.value);
            return (
              <button
                key={tf.value}
                type="button"
                onClick={() => toggleSet(setSelectedTypes, tf.value)}
                className={`focus-ring flex items-center gap-1.5 border-2 border-[var(--border)] px-3 py-1.5 text-xs font-bold transition-colors ${
                  active
                    ? "bg-[var(--brand)] text-[var(--text)] shadow-[2px_2px_0px_0px_var(--border)]"
                    : "text-[var(--text-muted)] hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                }`}
              >
                <Icon size={13} />
                {tf.label}
              </button>
            );
          })}
        </div>

        {/* Total hours */}
        <div className="mb-4 flex items-center gap-1.5 text-xs text-[color:var(--text-muted)]">
          <Clock size={13} />
          <span>{totalHours} hours total</span>
        </div>

        {/* Problem list */}
        {filtered.length > 0 ? (
          <div className="divide-y-2 divide-[var(--border)] border-2 border-[var(--border)] shadow-[4px_4px_0px_0px_var(--border)]">
            {filtered.map((problem, i) => (
              <ProblemCard
                key={problem.slug}
                problem={problem}
                index={i + 1}
                isCompleted={!!progress.problems?.[problem.slug]}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No problems match"
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

      {/* ── RIGHT: Sidebar filters ───────────────────────────── */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-5 overflow-y-auto overscroll-contain pr-1 scrollbar-thin">

          {/* ── Progress Widget ───────────────────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
                {percent}% Progress
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetProblems}
                  className="border-2 border-[var(--border)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                  title="Reset progress"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  type="button"
                  className="border-2 border-[var(--border)] p-1.5 text-[var(--text-muted)] transition-colors hover:bg-[var(--neo-yellow)] hover:text-[var(--text)]"
                  title="All problems"
                >
                  <Trophy size={15} />
                </button>
              </div>
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

          {/* ── Difficulty Breakdown Widget ────────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
              Difficulty Breakdown
            </span>
            <div className="mt-3 space-y-3">
              {[
                { key: "easy", label: "Easy", color: "var(--success)" },
                { key: "medium", label: "Medium", color: "var(--brand-2)" },
                { key: "hard", label: "Hard", color: "var(--brand)" },
              ].map(({ key, label, color }) => {
                const s = difficultyStats[key];
                const pct = s.total > 0 ? Math.round((s.done / s.total) * 100) : 0;
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

          {/* ── Topic Coverage Widget ─────────────────────────── */}
          <div className="border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-4 shadow-[4px_4px_0px_0px_var(--border)]">
            <span className="text-sm font-bold font-[family-name:var(--font-display)] text-[var(--text)]">
              Topic Coverage
            </span>
            <div className="mt-3 space-y-2.5">
              {topicStats.map(({ name, done, total, pct }) => (
                <div key={name} className="flex items-center gap-2.5 text-xs">
                  <span className="w-20 shrink-0 truncate font-bold text-[var(--text-muted)]" title={name}>
                    {name}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden border-2 border-[var(--border)] bg-[var(--bg)]">
                    <div
                      className="h-full bg-[var(--neo-green)] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-6 shrink-0 text-right tabular-nums font-bold text-[var(--text-faint)]">
                    {pct}%
                  </span>
                </div>
              ))}
              {topicStats.length === 0 ? (
                <p className="text-xs text-[var(--text-faint)]">Solve problems to see coverage</p>
              ) : null}
            </div>
          </div>

          {/* ── Filters ──────────────────────────────────────── */}
          <SidebarSection title="Topics" defaultOpen>
            <div className="grid grid-cols-2 gap-x-2">
              {allTopics.map((topic) => (
                <CheckboxFilter
                  key={topic}
                  label={topic}
                  checked={selectedTopics.has(topic)}
                  onChange={() => toggleSet(setSelectedTopics, topic)}
                />
              ))}
            </div>
          </SidebarSection>

          {/* Company */}
          <SidebarSection title="Company" defaultOpen>
            <div className="grid grid-cols-2 gap-x-2">
              {allCompanies.map((company) => (
                <CheckboxFilter
                  key={company}
                  label={company}
                  checked={selectedCompanies.has(company)}
                  onChange={() => toggleSet(setSelectedCompanies, company)}
                />
              ))}
            </div>
          </SidebarSection>

          {/* Difficulty */}
          <SidebarSection title="Difficulty">
            <div className="space-y-0.5">
              {["easy", "medium", "hard"].map((d) => (
                <CheckboxFilter
                  key={d}
                  label={d.charAt(0).toUpperCase() + d.slice(1)}
                  checked={selectedDifficulties.has(d)}
                  onChange={() => toggleSet(setSelectedDifficulties, d)}
                />
              ))}
            </div>
          </SidebarSection>

          {/* Progress */}
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
                    name="progress"
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
