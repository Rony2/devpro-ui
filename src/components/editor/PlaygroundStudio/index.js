"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { LanguageSelector } from "@/components/editor/LanguageSelector";

const STARTERS = {
  html: "<div class=\"card\">Hello Devpro Playground</div>",
  css: ".card { padding: 16px; border: 1px solid #4a89ff; border-radius: 12px; color: #fff; }",
  javascript: "console.log('Playground ready');",
  typescript: "const message: string = 'Playground ready';\nconsole.log(message);",
};

export function PlaygroundStudio() {
  const [tab, setTab] = useState("html");
  const [files, setFiles] = useState(STARTERS);

  const srcDoc = useMemo(
    () => `<!doctype html><html><head><style>${files.css}</style></head><body>${files.html}<script>${files.javascript}</script></body></html>`,
    [files],
  );

  function onChange(value) {
    setFiles((state) => ({ ...state, [tab]: value }));
  }

  function onReset() {
    setFiles(STARTERS);
  }

  async function onFormat() {
    const response = await fetch("/api/playground/format", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: files[tab], parser: tab === "css" ? "css" : tab === "html" ? "html" : "babel" }),
    });
    const payload = await response.json();
    if (payload.data?.formatted) {
      setFiles((state) => ({ ...state, [tab]: payload.data.formatted }));
    }
  }

  function onCopy() {
    navigator.clipboard.writeText(files[tab]);
  }

  function onShare() {
    const query = new URLSearchParams({
      html: btoa(unescape(encodeURIComponent(files.html))),
      css: btoa(unescape(encodeURIComponent(files.css))),
      js: btoa(unescape(encodeURIComponent(files.javascript))),
      ts: btoa(unescape(encodeURIComponent(files.typescript))),
    });

    const url = `${window.location.origin}/playground?${query.toString()}`;
    navigator.clipboard.writeText(url);
    alert("Share URL copied");
  }

  return (
    <div className="space-y-4">
      <div className="panel rounded-2xl p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {["html", "css", "javascript", "typescript"].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`focus-ring rounded-lg px-3 py-1.5 text-sm ${tab === item ? "bg-[var(--brand)] text-white" : "border border-[var(--border)]"}`}
            >
              {item.toUpperCase()}
            </button>
          ))}
          <LanguageSelector
            value={tab}
            onChange={setTab}
            options={[
              { value: "html", label: "HTML" },
              { value: "css", label: "CSS" },
              { value: "javascript", label: "JS" },
              { value: "typescript", label: "TS" },
            ]}
          />
          <button type="button" onClick={onShare} className="focus-ring ml-auto rounded-lg border border-[var(--border)] px-3 py-2 text-sm">
            Share
          </button>
        </div>

        <EditorToolbar onFormat={onFormat} onReset={onReset} onCopy={onCopy} />
        <CodeEditor language={tab === "typescript" ? "typescript" : tab} value={files[tab]} onChange={onChange} height="360px" />
      </div>

      <div className="panel rounded-2xl p-4">
        <h2 className="mb-2 text-sm uppercase tracking-wide text-[color:var(--text-muted)]">Live Preview</h2>
        <iframe title="preview" srcDoc={srcDoc} sandbox="allow-scripts" className="h-[320px] w-full rounded-xl border border-[var(--border)] bg-white" />
      </div>
    </div>
  );
}
