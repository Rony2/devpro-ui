export function TableOfContents({ headings }) {
  return (
    <aside className="panel sticky top-24 hidden max-h-[80vh] overflow-auto p-4 xl:block">
      <p className="text-xs uppercase tracking-wide font-bold font-[family-name:var(--font-display)] text-[var(--text)]">Contents</p>
      <ul className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="focus-ring inline-block px-1 font-bold hover:bg-[var(--neo-yellow)]">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
