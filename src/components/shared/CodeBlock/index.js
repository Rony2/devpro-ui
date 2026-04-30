"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Check, ClipboardPaste } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useEditorContext } from "@/components/problem/EditorContext";

export function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const editorCtx = useEditorContext();

  useEffect(() => setMounted(true), []);

  // Extract the raw text and language from the <code> child
  const codeElement = typeof children === "string" ? null : children;
  const codeString = (
    typeof children === "string"
      ? children
      : children?.props?.children ?? ""
  ).replace(/\n$/, "");

  const className = codeElement?.props?.className ?? "";
  const language = className.replace(/language-/, "") || "javascript";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [codeString]);

  const handleApply = useCallback(() => {
    if (editorCtx?.setCode) {
      editorCtx.setCode(codeString);
      setApplied(true);
      setTimeout(() => setApplied(false), 1800);
    }
  }, [codeString, editorCtx]);

  return (
    <div className="code-block-container group relative mt-4 overflow-hidden border-2 border-[var(--border)] bg-[var(--code-bg)] shadow-[3px_3px_0px_0px_var(--border)]">
      {/* Action buttons */}
      <div className="absolute right-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-all group-hover:opacity-100">
        {editorCtx?.setCode ? (
          <button
            type="button"
            onClick={handleApply}
            className="inline-flex h-7 items-center gap-1 border-2 border-[var(--border)] bg-[var(--neo-green)] px-2 text-[11px] font-bold text-black transition-all hover:bg-[var(--brand)]"
            aria-label="Apply to editor"
          >
            {applied ? <Check size={13} /> : <ClipboardPaste size={13} />}
            {applied ? "Applied!" : "Apply"}
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-7 w-7 items-center justify-center border-2 border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-muted)] transition-all hover:bg-[var(--brand)]"
          aria-label="Copy code"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>

      {/* Defer Highlight to client-only to avoid hydration mismatch */}
      {mounted ? (
        <Highlight theme={themes.oneDark} code={codeString} language={language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="m-0 overflow-x-auto border-0 bg-transparent p-0">
              <table className="w-full border-collapse" role="presentation">
                <tbody>
                  {tokens.map((line, i) => (
                    <tr key={i} {...getLineProps({ line })}>
                      <td
                        className="select-none border-0 px-3 py-0 text-right align-top text-[13px] leading-[1.7] text-[color:var(--text-faint)] opacity-50"
                        style={{ fontFamily: "var(--font-mono), monospace", width: "1%", whiteSpace: "nowrap" }}
                      >
                        {i + 1}
                      </td>
                      <td
                        className="border-0 px-3 py-0 text-[13px] leading-[1.7]"
                        style={{ fontFamily: "var(--font-mono), monospace" }}
                      >
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                        {line.length === 1 && line[0].empty && "\u00A0"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </pre>
          )}
        </Highlight>
      ) : (
        <pre className="m-0 overflow-x-auto border-0 bg-transparent p-4 text-[13px] leading-[1.7] text-[color:var(--text-muted)]" style={{ fontFamily: "var(--font-mono), monospace" }}>
          {codeString}
        </pre>
      )}
    </div>
  );
}
