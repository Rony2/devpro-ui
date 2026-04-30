"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Copy, RotateCcw, WandSparkles } from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="flex-1 animate-pulse bg-[color:var(--bg)]" />,
});

/* ── Custom theme definitions ────────────────────────────────── */

const DEVPRO_DARK = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "comment", foreground: "63636e", fontStyle: "italic" },
    { token: "keyword", foreground: "c084fc" },
    { token: "keyword.control", foreground: "c084fc" },
    { token: "storage", foreground: "c084fc" },
    { token: "storage.type", foreground: "c084fc" },
    { token: "type", foreground: "fbbf24" },
    { token: "type.identifier", foreground: "fbbf24" },
    { token: "string", foreground: "34d399" },
    { token: "string.key.json", foreground: "c084fc" },
    { token: "number", foreground: "f472b6" },
    { token: "number.hex", foreground: "f472b6" },
    { token: "regexp", foreground: "fb923c" },
    { token: "delimiter", foreground: "a0a0ab" },
    { token: "delimiter.bracket", foreground: "a0a0ab" },
    { token: "delimiter.parenthesis", foreground: "a0a0ab" },
    { token: "delimiter.array", foreground: "a0a0ab" },
    { token: "variable", foreground: "e2e8f0" },
    { token: "variable.predefined", foreground: "facc15" },
    { token: "identifier", foreground: "ededef" },
    { token: "function", foreground: "c084fc" },
    { token: "operator", foreground: "facc15" },
    { token: "tag", foreground: "f472b6" },
    { token: "attribute.name", foreground: "fbbf24" },
    { token: "attribute.value", foreground: "34d399" },
    { token: "metatag", foreground: "a0a0ab" },
    { token: "metatag.content.html", foreground: "ededef" },
  ],
  colors: {
    "editor.background": "#09090b",
    "editor.foreground": "#ededef",
    "editor.lineHighlightBackground": "#1a1a1f44",
    "editor.selectionBackground": "#a855f733",
    "editorCursor.foreground": "#a855f7",
    "editor.inactiveSelectionBackground": "#1a1a1f",
    "editorLineNumber.foreground": "#3f3f46",
    "editorLineNumber.activeForeground": "#a0a0ab",
    "editorGutter.background": "#09090b",
    "editorIndentGuide.background": "#27272a",
    "editorIndentGuide.activeBackground": "#3f3f46",
    "editor.selectionHighlightBackground": "#a855f71a",
    "editorBracketMatch.background": "#a855f722",
    "editorBracketMatch.border": "#a855f744",
    "scrollbarSlider.background": "#27272a88",
    "scrollbarSlider.hoverBackground": "#3f3f46aa",
    "scrollbarSlider.activeBackground": "#52525b",
    "editorWidget.background": "#131316",
    "editorWidget.border": "#27272a",
    "editorSuggestWidget.background": "#131316",
    "editorSuggestWidget.border": "#27272a",
    "editorSuggestWidget.selectedBackground": "#1a1a1f",
  },
};

const DEVPRO_LIGHT = {
  base: "vs",
  inherit: true,
  rules: [
    { token: "comment", foreground: "94a3b8", fontStyle: "italic" },
    { token: "keyword", foreground: "8b5cf6" },
    { token: "keyword.control", foreground: "8b5cf6" },
    { token: "storage", foreground: "8b5cf6" },
    { token: "storage.type", foreground: "8b5cf6" },
    { token: "type", foreground: "d97706" },
    { token: "type.identifier", foreground: "d97706" },
    { token: "string", foreground: "10b981" },
    { token: "string.key.json", foreground: "3b82f6" },
    { token: "number", foreground: "ec4899" },
    { token: "number.hex", foreground: "ec4899" },
    { token: "regexp", foreground: "f97316" },
    { token: "delimiter", foreground: "94a3b8" },
    { token: "delimiter.bracket", foreground: "94a3b8" },
    { token: "delimiter.parenthesis", foreground: "94a3b8" },
    { token: "delimiter.array", foreground: "94a3b8" },
    { token: "variable", foreground: "3b82f6" },
    { token: "variable.predefined", foreground: "06b6d4" },
    { token: "identifier", foreground: "334155" },
    { token: "function", foreground: "3b82f6" },
    { token: "operator", foreground: "06b6d4" },
    { token: "tag", foreground: "ec4899" },
    { token: "attribute.name", foreground: "d97706" },
    { token: "attribute.value", foreground: "10b981" },
    { token: "metatag", foreground: "94a3b8" },
    { token: "metatag.content.html", foreground: "334155" },
  ],
  colors: {
    "editor.background": "#f0f4fa",
    "editor.foreground": "#334155",
    "editor.lineHighlightBackground": "#e8edf506",
    "editor.selectionBackground": "#bfdbfe",
    "editorCursor.foreground": "#3b82f6",
    "editor.inactiveSelectionBackground": "#dbeafe",
    "editorLineNumber.foreground": "#c1ccdb",
    "editorLineNumber.activeForeground": "#64748b",
    "editorGutter.background": "#f0f4fa",
    "editorIndentGuide.background": "#e2e8f0",
    "editorIndentGuide.activeBackground": "#bfdbfe",
    "editor.selectionHighlightBackground": "#bfdbfe44",
    "editorBracketMatch.background": "#bfdbfe55",
    "editorBracketMatch.border": "#3b82f644",
    "scrollbarSlider.background": "#cbd5e188",
    "scrollbarSlider.hoverBackground": "#94a3b8aa",
    "scrollbarSlider.activeBackground": "#64748bbb",
    "editorWidget.background": "#f8fafc",
    "editorWidget.border": "#c8d8ee",
    "editorSuggestWidget.background": "#ffffff",
    "editorSuggestWidget.border": "#c8d8ee",
    "editorSuggestWidget.selectedBackground": "#eef2f8",
  },
};

/* ── Register themes once before Monaco mounts ───────────────── */

function handleBeforeMount(monaco) {
  monaco.editor.defineTheme("devpro-dark", DEVPRO_DARK);
  monaco.editor.defineTheme("devpro-light", DEVPRO_LIGHT);
}

/* ── Detect app light/dark theme via html class ──────────────── */

function useAppTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(!root.classList.contains("light"));

    const observer = new MutationObserver(() => {
      setIsDark(!root.classList.contains("light"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

/* ── Component ───────────────────────────────────────────────── */

const TOOL_BTN =
  "focus-ring inline-flex h-6 items-center gap-1 rounded px-1.5 text-[11px] text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text)] hover:bg-[color:color-mix(in_srgb,var(--text)_8%,transparent)]";

export function CodeEditor({
  language,
  value,
  onChange,
  height,
  filename = "",
  testStatus = null,
  difficulty = null,
  chrome = false,
  flexFill = false,
  onFormat,
  onReset,
  onCopy,
}) {
  const isDark = useAppTheme();
  const monacoTheme = isDark ? "devpro-dark" : "devpro-light";

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbersMinChars: 3,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    padding: { top: 12, bottom: 12 },
    renderLineHighlight: "gutter",
    fontFamily: "var(--font-mono), monospace",
    fontLigatures: true,
    bracketPairColorization: { enabled: true },
  };

  if (chrome) {
    return (
      <div className={`editor-chrome flex flex-col overflow-hidden border-l border-[var(--border)] ${flexFill ? "min-h-0 flex-1" : "rounded-2xl border"}`}>
        {/* Window chrome bar with integrated toolbar */}
        <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[color:var(--bg)] px-4 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" aria-hidden="true" />
          {filename ? (
            <span className="code-font ml-2 text-xs text-[color:var(--text-muted)]">{filename}</span>
          ) : null}

          {/* Toolbar actions — right side */}
          {(onFormat || onReset || onCopy) ? (
            <div className="ml-auto flex items-center gap-0.5">
              {onFormat ? (
                <button type="button" onClick={onFormat} className={TOOL_BTN}>
                  <WandSparkles size={12} /> Format
                </button>
              ) : null}
              {onReset ? (
                <button type="button" onClick={onReset} className={TOOL_BTN}>
                  <RotateCcw size={12} /> Reset
                </button>
              ) : null}
              {onCopy ? (
                <button type="button" onClick={onCopy} className={TOOL_BTN}>
                  <Copy size={12} /> Copy
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Editor body */}
        <div className={flexFill ? "min-h-0 flex-1" : undefined}>
          <MonacoEditor
            height={flexFill ? "100%" : height || "420px"}
            language={language}
            value={value}
            onChange={(nextValue) => onChange(nextValue || "")}
            theme={monacoTheme}
            beforeMount={handleBeforeMount}
            options={editorOptions}
          />
        </div>


      </div>
    );
  }

  return (
    <MonacoEditor
      height={height || "420px"}
      language={language}
      value={value}
      onChange={(nextValue) => onChange(nextValue || "")}
      theme={monacoTheme}
      beforeMount={handleBeforeMount}
      options={editorOptions}
    />
  );
}
