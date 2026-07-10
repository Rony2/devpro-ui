export function TableOfContents({ headings }) {
  return (
    <aside className="sticky top-24 hidden max-h-[80vh] overflow-auto border-2 border-[var(--border)] bg-[var(--bg-elevated)] shadow-[4px_4px_0px_0px_var(--border)] xl:block">
      <div className="bg-[var(--neo-pink)] border-b-2 border-[var(--border)] px-4 py-2">
        <p className="text-xs uppercase tracking-wide font-bold font-[family-name:var(--font-display)] text-[#000]">Contents</p>
      </div>
      <ul className="p-4 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="focus-ring inline-block px-1 font-bold hover:bg-[var(--neo-blue)] transition-colors">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
