export function MDXRenderer({ content }) {
  return <article className="mdx-body border-2 border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[4px_4px_0px_0px_var(--border)]">{content}</article>;
}
