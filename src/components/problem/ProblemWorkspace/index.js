"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Code2,
  FileText,
  FlaskConical,
} from "lucide-react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ProblemDescription } from "@/components/problem/ProblemDescription";
import { TestCasePanel } from "@/components/problem/TestCasePanel";
import { ConsolePanel } from "@/components/problem/ConsolePanel";
import { ProblemBottomBar } from "@/components/problem/ProblemBottomBar";
import { useProgress } from "@/hooks/useProgress";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";
import { TagPill } from "@/components/shared/TagPill";
import { EditorProvider } from "@/components/problem/EditorContext";

const LEFT_TABS = [
  { key: "description", label: "Description", icon: FileText },
  { key: "tests", label: "Test Cases", icon: FlaskConical },
];

const RIGHT_TABS = [
  { key: "code", label: "Code", icon: Code2 },
  { key: "testcases", label: "Test cases", icon: FlaskConical },
];

export function ProblemWorkspace({
  problem,
  prevSlug = null,
  nextSlug = null,
  currentIndex = 0,
  totalCount = 1,
  allProblems = [],
}) {
  const {
    meta: { slug, title, difficulty, topics, type, companies, estimatedMinutes },
    content,
    tests,
    starterCode,
  } = problem;

  const [code, setCode] = useState(starterCode);
  const [leftTab, setLeftTab] = useState("description");
  const [rightTab, setRightTab] = useState("code");
  const [results, setResults] = useState([]);
  const [running, setRunning] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const { progress, markProblemComplete } = useProgress();

  const testStatus = useMemo(() => {
    if (!results.length) return { passed: 0, total: tests.length };
    return { passed: results.filter((r) => r.passed).length, total: tests.length };
  }, [results, tests]);

  const allPassed = results.length > 0 && results.every((r) => r.passed);
  const isCompleted = Boolean(progress?.problems?.[slug]);

  /* ── Mobile view state (below lg) ────────────────────────── */
  const [mobileView, setMobileView] = useState("description");

  /* ── Actions ─────────────────────────────────────────────── */
  const runCode = useCallback(async () => {
    try {
      setRunning(true);
      setConsoleOpen(true);
      const response = await fetch(`/api/problems/${slug}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, slug }),
      });
      const payload = await response.json();
      setResults(payload.data?.results || []);
    } catch (_error) {
      // silently fail
    } finally {
      setRunning(false);
    }
  }, [slug, code]);

  function resetCode() {
    setCode(starterCode);
    setResults([]);
    setConsoleOpen(false);
  }

  async function formatCode() {
    try {
      const response = await fetch("/api/playground/format", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, parser: "babel" }),
      });
      const payload = await response.json();
      if (payload.data?.formatted) setCode(payload.data.formatted);
    } catch (_error) {
      // silently fail
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(code);
  }

  const submit = useCallback(() => {
    if (allPassed) {
      markProblemComplete(slug);
    }
  }, [allPassed, markProblemComplete, slug]);

  function handleMarkComplete() {
    markProblemComplete(slug);
  }

  /* ── Keyboard shortcuts ──────────────────────────────────── */
  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (e.shiftKey) {
          submit();
        } else {
          runCode();
        }
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [runCode, submit]);

  /* ── Tab button helper ───────────────────────────────────── */
  function TabButton({ item, isActive, onClick }) {
    const Icon = item.icon;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`focus-ring inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold transition-colors ${
          isActive
            ? "border-b-3 border-[var(--text)] text-[var(--text)] bg-[var(--brand)]"
            : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
        }`}
        style={isActive ? { borderBottomWidth: '3px' } : {}}
      >
        <Icon size={13} />
        {item.label}
      </button>
    );
  }

  return (
    <div className="flex h-[calc(100vh-56px)] flex-col">
      {/* ════════════════════════════════════════════════════════
          DESKTOP LAYOUT (lg+): side-by-side split pane
          ════════════════════════════════════════════════════════ */}
      <div className="hidden flex-1 overflow-hidden lg:flex">
        {/* ── LEFT PANEL ───────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden border-r-2 border-[var(--border)]">
          {/* Left tab strip */}
          <div className="flex shrink-0 items-center gap-0.5 border-b-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4">
            {LEFT_TABS.map((item) => (
              <TabButton
                key={item.key}
                item={item}
                isActive={leftTab === item.key}
                onClick={() => setLeftTab(item.key)}
              />
            ))}
          </div>

          {/* Left scrollable content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Problem header (always visible in left pane) */}
            <div className="mb-5">
              <div className="flex items-start gap-3">
                <Link
                  href="/problems"
                  className="focus-ring mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[var(--border)] text-[var(--text-muted)] transition-colors hover:text-[var(--text)] hover:bg-[var(--neo-yellow)]"
                  aria-label="Back to problems"
                >
                  <ArrowLeft size={14} />
                </Link>
                <div className="min-w-0 flex-1">
                  <h1 className="font-[family-name:var(--font-display)] text-xl font-bold leading-snug tracking-tight">
                    {title}
                  </h1>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <DifficultyBadge level={difficulty} />
                    <TagPill label={type} variant="outline" />
                    {topics.map((topic) => (
                      <TagPill key={topic} label={topic} />
                    ))}
                    {estimatedMinutes ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--text-muted)]">
                        <Clock size={11} aria-hidden="true" />
                        ~{estimatedMinutes} min
                      </span>
                    ) : null}
                  </div>
                  {companies?.length > 0 ? (
                    <p className="mt-1 text-[11px] font-bold text-[var(--text-muted)]">
                      Asked at {companies.join(", ")}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Tab content */}
            {leftTab === "description" ? (
              <EditorProvider setCode={setCode}>
                <ProblemDescription content={content} />
              </EditorProvider>
            ) : null}

            {leftTab === "tests" ? <TestCasePanel tests={tests} /> : null}
          </div>
        </div>

        {/* ── RIGHT PANEL ──────────────────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Right tab strip */}
          <div className="flex shrink-0 items-center gap-0.5 border-b-2 border-[var(--border)] bg-[var(--bg-elevated)] px-4">
            {RIGHT_TABS.map((item) => (
              <TabButton
                key={item.key}
                item={item}
                isActive={rightTab === item.key}
                onClick={() => setRightTab(item.key)}
              />
            ))}
          </div>

          {/* Right content */}
          {rightTab === "code" ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                chrome
                flexFill
                filename={`${slug}.js`}
                testStatus={testStatus}
                difficulty={difficulty}
                onFormat={formatCode}
                onReset={resetCode}
                onCopy={copyCode}
              />
              <ConsolePanel
                results={results}
                isOpen={consoleOpen}
                onToggle={() => setConsoleOpen((v) => !v)}
              />
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5">
              <TestCasePanel tests={tests} />
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          MOBILE LAYOUT (<lg): single-panel with tabs
          ════════════════════════════════════════════════════════ */}
      <div className="flex flex-1 flex-col overflow-hidden lg:hidden">
        {/* Mobile tab strip */}
        <div className="flex shrink-0 items-center border-b-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3">
          {[
            { key: "description", label: "Problem", icon: FileText },
            { key: "code", label: "Code", icon: Code2 },
            { key: "tests", label: "Tests", icon: FlaskConical },
          ].map((item) => (
            <TabButton
              key={item.key}
              item={item}
              isActive={mobileView === item.key}
              onClick={() => setMobileView(item.key)}
            />
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {mobileView === "description" ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-4">
                <h1 className="font-[family-name:var(--font-display)] text-xl font-bold">{title}</h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <DifficultyBadge level={difficulty} />
                  <TagPill label={type} variant="outline" />
                  {topics.slice(0, 2).map((topic) => (
                    <TagPill key={topic} label={topic} />
                  ))}
                </div>
              </div>
              <EditorProvider setCode={setCode}>
                <ProblemDescription content={content} />
              </EditorProvider>
            </div>
          ) : null}

          {mobileView === "code" ? (
            <div className="flex min-h-0 flex-1 flex-col">
              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                chrome
                flexFill
                filename={`${slug}.js`}
                testStatus={testStatus}
                difficulty={difficulty}
                onFormat={formatCode}
                onReset={resetCode}
                onCopy={copyCode}
              />
              <ConsolePanel
                results={results}
                isOpen={consoleOpen}
                onToggle={() => setConsoleOpen((v) => !v)}
              />
            </div>
          ) : null}

          {mobileView === "tests" ? (
            <div className="flex-1 overflow-y-auto p-4">
              <TestCasePanel tests={tests} />
            </div>
          ) : null}
        </div>
      </div>

      {/* ── Bottom action bar ──────────────────────────────────── */}
      <ProblemBottomBar
        language={language}
        onLanguageChange={setLanguage}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        currentIndex={currentIndex}
        totalCount={totalCount}
        allProblems={allProblems}
        currentSlug={slug}
        onRun={runCode}
        onSubmit={submit}
        onMarkComplete={handleMarkComplete}
        isRunning={running}
        allPassed={allPassed}
        isCompleted={isCompleted}
        progress={progress}
      />
    </div>
  );
}
