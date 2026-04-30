# Instruction: Content Strategy

# Defines schemas for all content types. Follow exactly — the content loaders depend on these shapes.

---

## Philosophy

Devpro is for **Senior / Lead / Staff engineers only**. Content must reflect that:

- No "what is a closure" explanations
- Problems start at Hard. Expert is the ceiling.
- Quiz questions test nuanced understanding, not recall
- Guides assume the reader has 5+ years of experience
- "Companies" tags are real (Vercel, Stripe, Meta, Google, Shopify) — only tag when the problem type is genuinely asked there

---

## 1. Problems

### Difficulty levels

| Level    | Definition                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `hard`   | Requires deep knowledge of a specific API or algorithm. A strong senior can solve in 30–45 min.                 |
| `expert` | Requires understanding of internals (browser, runtime, framework). Most seniors will struggle. Takes 45–90 min. |

### File structure

```
content/problems/[slug]/
├── meta.json
├── problem.mdx
├── starter.ts
├── solution.ts       ← server-side only, never sent to client
└── tests.ts          ← server-side only
```

### `meta.json` schema

```json
{
  "slug": "implement-virtual-dom-diff",
  "title": "Implement Virtual DOM Diffing",
  "difficulty": "expert",
  "type": "coding",
  "topics": ["DOM", "Algorithms", "React Internals"],
  "companies": ["Meta", "Vercel"],
  "estimatedMinutes": 60,
  "published": true,
  "addedAt": "2024-01-15",
  "description": "One sentence summary shown in the problem card."
}
```

### `type` values

- `coding` — implement a function/class
- `debugging` — fix broken code
- `architecture` — design a system/API (no test runner, explanation-based)

### `problem.mdx` structure

Every problem MDX must follow this section order:

1. `## Overview` — what and why. No hand-holding.
2. `## Constraints` — bullet list of rules (e.g. "No external libraries", "Must run in O(n)")
3. `## Examples` — input/output pairs with explanation
4. `## Notes` — hints only if genuinely needed for expert problems. Omit for hard.
5. `## Resources` — 2–3 links to specs/articles, no tutorials

### `tests.ts` schema

```ts
import type { TestCase } from "@/types/executor";

export const tests: TestCase[] = [
  {
    id: "basic-text-update",
    description: "Updates a text node value",
    input: {
      /* structured input */
    },
    expected: {
      /* expected output */
    },
    isHidden: false, // shown in test panel
  },
  {
    id: "hidden-edge-case",
    description: "Handles deeply nested removals",
    input: {
      /* ... */
    },
    expected: {
      /* ... */
    },
    isHidden: true, // not shown — only pass/fail revealed
  },
];
```

### `starter.ts` conventions

- Include the function signature with TypeScript types
- Include a docstring with the problem statement (one-liner)
- Do NOT include any hints or partial implementation

```ts
/**
 * Compute the minimal set of DOM operations to transform `oldTree` into `newTree`.
 */
export function diff(oldTree: VNode, newTree: VNode): Patch[] {
  // your implementation
}
```

---

## 2. Quizzes

### File structure

```
content/quizzes/[slug]/
├── meta.json
└── questions.json
```

### `meta.json` schema

```json
{
  "slug": "js-event-loop-advanced",
  "title": "JavaScript Event Loop — Advanced",
  "topic": "JavaScript",
  "difficulty": "hard",
  "estimatedMinutes": 15,
  "questionCount": 10,
  "published": true,
  "description": "Deep dive into microtasks, queueMicrotask, scheduler priority, and async ordering."
}
```

### `questions.json` schema

```json
[
  {
    "id": "q1",
    "type": "mcq",
    "question": "What is the output order of the following code?",
    "code": "console.log('a');\nPromise.resolve().then(() => console.log('b'));\nqueueMicrotask(() => console.log('c'));\nconsole.log('d');",
    "language": "javascript",
    "options": [
      { "id": "a", "text": "a, b, c, d" },
      { "id": "b", "text": "a, d, b, c" },
      { "id": "c", "text": "a, d, c, b" },
      { "id": "d", "text": "a, b, d, c" }
    ],
    "correctOptionId": "b",
    "explanation": "Synchronous code runs first (a, d). Then the microtask queue drains: Promise.then callbacks and queueMicrotask are both microtasks, but Promise.then was queued first, so b before c.",
    "difficulty": "hard",
    "topic": "Event Loop"
  },
  {
    "id": "q2",
    "type": "spot-the-bug",
    "question": "This React component has a subtle bug. Identify it.",
    "code": "function Counter() {\n  const [count, setCount] = useState(0);\n  useEffect(() => {\n    const id = setInterval(() => setCount(count + 1), 1000);\n    return () => clearInterval(id);\n  }, []);\n  return <div>{count}</div>;\n}",
    "language": "tsx",
    "options": [
      { "id": "a", "text": "Missing key prop" },
      { "id": "b", "text": "Stale closure — count never updates" },
      { "id": "c", "text": "setInterval is not cleaned up" },
      { "id": "d", "text": "useEffect dependency array is wrong" }
    ],
    "correctOptionId": "b",
    "explanation": "The empty dependency array causes the effect to close over the initial value of count (0). setCount(count + 1) always sets count to 1. Fix: use the functional update form setCount(c => c + 1).",
    "difficulty": "hard",
    "topic": "React"
  }
]
```

### `type` values for questions

- `mcq` — standard multiple choice
- `true-false` — binary question
- `spot-the-bug` — code snippet with a bug, pick the correct diagnosis
- `order` — drag to arrange (future — leave stub in type union)

### Explanation quality bar

Every explanation must:

- Say WHY the correct answer is correct (not just repeat it)
- Say WHY the most common wrong answer is wrong
- Be 3–6 sentences max
- Include an MDX code block if the fix involves code

---

## 3. Guides

### File structure

```
content/guides/[slug]/
├── meta.json
└── content.mdx
```

### `meta.json` schema

```json
{
  "slug": "understanding-react-fiber",
  "title": "Understanding React Fiber Architecture",
  "category": "Architecture",
  "difficulty": "expert",
  "readingTimeMin": 18,
  "lastUpdated": "2024-03-10",
  "published": true,
  "description": "A deep dive into the Fiber reconciler: work units, priority scheduling, and concurrent mode."
}
```

### `category` values

`Performance` | `Architecture` | `TypeScript` | `Testing` | `Security` | `Runtime` | `Browser`

### `content.mdx` conventions

- Use `##` for top-level sections (these become TOC entries)
- Use `###` for sub-sections
- Every code block must have a language tag: ` ```tsx `
- Custom MDX components available: `<Callout>`, `<CodeComparison>`, `<KeyTakeaway>`
- No affiliate links, no self-promotion
- End every guide with a `## Key Takeaways` section (bullet list, max 6 items)

---

## 4. System Design

### File structure

```
content/system-design/[slug]/
├── meta.json
└── content.mdx
```

### `meta.json` schema

```json
{
  "slug": "design-a-component-library",
  "title": "Design a Component Library for a Design System",
  "difficulty": "expert",
  "estimatedMinutes": 45,
  "published": true,
  "description": "Architecture decisions, API design, bundling strategy, and versioning for a production component library."
}
```

### `content.mdx` structure

1. `## Problem Statement` — what you're asked to design
2. `## Clarifying Questions` — what a good candidate asks
3. `## Core Requirements` — functional + non-functional
4. `## High-Level Architecture` — diagram description or ASCII art
5. `## Deep Dives` — 2–3 sub-sections on the hardest parts
6. `## Trade-offs` — what you're accepting and why
7. `## What Great Looks Like` — what separates a staff answer from a senior answer

---

## Content Loader Conventions (`lib/content/`)

All loaders follow this pattern:

```ts
// lib/content/problems.ts

import fs from "fs";
import path from "path";
import type { Problem, ProblemMeta } from "@/types/content";

const PROBLEMS_DIR = path.join(process.cwd(), "content/problems");

export function getAllProblems(): ProblemMeta[] {
  // Read all meta.json files, parse, filter published: true, sort by addedAt desc
}

export function getProblemBySlug(slug: string): Problem {
  // Read meta.json + compile problem.mdx
  // NEVER read solution.ts or tests.ts here — those are for the API route only
}
```

- Loaders run server-side only — they use `fs`
- Use `next/cache`'s `cache()` to deduplicate reads within a request
- Never expose `solution.ts` content through any loader used in page components

# Instruction: Folder Structure

# Read this before creating any file or directory.

## Guiding principle

Every directory has one job. If you are unsure where a file goes, ask:
"Is this content, a component, a library utility, or app routing?" That answer
determines its home.

---

## Full annotated tree

```
Devpro/
│
├── .instructions/                  ← Agent instruction files. Never modify at runtime.
│   ├── FOLDER_STRUCTURE.md
│   ├── CONTENT_STRATEGY.md
│   ├── COMPONENT_CONVENTIONS.md
│   ├── UX_PRINCIPLES.md
│   └── HTTP_SERVICE.md
│
├── app/                            ← Next.js 16 App Router. Route segments only.
│   │                                 No business logic. No data transformation here.
│   │
│   ├── (marketing)/                ← Public-facing, no auth required
│   │   ├── page.tsx                   Landing page /
│   │   ├── about/page.tsx
│   │   └── layout.tsx                 Marketing shell (different from platform shell)
│   │
│   ├── (platform)/                 ← All practice content
│   │   ├── layout.tsx                 Platform shell: Sidebar + Header + main
│   │   ├── problems/
│   │   │   ├── page.tsx               /problems — list
│   │   │   └── [slug]/
│   │   │       └── page.tsx           /problems/[slug] — detail + editor
│   │   ├── quizzes/
│   │   │   ├── page.tsx               /quizzes — list
│   │   │   └── [slug]/
│   │   │       └── page.tsx           /quizzes/[slug] — session
│   │   ├── guides/
│   │   │   ├── page.tsx               /guides — list
│   │   │   └── [slug]/
│   │   │       └── page.tsx           /guides/[slug] — full article
│   │   ├── system-design/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── playground/
│   │       └── page.tsx
│   │
│   ├── (auth)/                     ← Auth UI stubs. No backend wiring yet.
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx                 Centered card layout
│   │
│   └── api/                        ← Next.js API routes (BFF layer)
│       ├── problems/[slug]/run/
│       │   └── route.ts               POST: execute code, return test results
│       ├── quizzes/[slug]/submit/
│       │   └── route.ts               POST: score quiz, return breakdown
│       └── playground/format/
│           └── route.ts               POST: format code with prettier
│
├── components/                     ← All React components. Never import from app/.
│   │
│   ├── ui/                         ← shadcn/ui primitives. DO NOT MODIFY.
│   │                                 Add new shadcn components here via CLI only.
│   │
│   ├── layout/                     ← Structural chrome components
│   │   ├── Header/
│   │   │   ├── index.tsx
│   │   │   └── Header.test.tsx
│   │   ├── Sidebar/
│   │   │   ├── index.tsx
│   │   │   └── Sidebar.test.tsx
│   │   ├── Footer/
│   │   │   └── index.tsx
│   │   └── PlatformShell/
│   │       └── index.tsx              Composes Header + Sidebar + main content area
│   │
│   ├── problem/                    ← Problem-specific components
│   │   ├── ProblemDescription/        Renders MDX description
│   │   ├── TestCasePanel/             Shows test case inputs/expected outputs
│   │   ├── TestResultPanel/           Pass/fail per test case after run
│   │   └── ProblemCard/               Card for the list page
│   │
│   ├── quiz/                       ← Quiz-specific components
│   │   ├── QuizCard/                  Card for the list page
│   │   ├── QuizQuestion/              Single question with options
│   │   ├── QuizOption/                Single selectable option (handles code snippets)
│   │   ├── QuizTimer/                 Countdown display
│   │   ├── QuizProgress/              Step indicator
│   │   └── QuizResultScreen/          End screen with score + per-question breakdown
│   │
│   ├── editor/                     ← Monaco editor wrappers
│   │   ├── CodeEditor/                Monaco wrapper — dynamically imported
│   │   ├── LanguageSelector/          Dropdown: JS / TS / HTML / CSS
│   │   ├── RunButton/                 Triggers code execution
│   │   └── EditorToolbar/             Format + reset + copy actions
│   │
│   ├── guide/                      ← Guide/article components
│   │   ├── MDXRenderer/               Renders MDX with custom component map
│   │   ├── TableOfContents/           Sticky right-rail TOC
│   │   ├── ReadingProgress/           Top progress bar
│   │   └── GuideCard/                 Card for the list page
│   │
│   └── shared/                     ← Reusable cross-domain components
│       ├── DifficultyBadge/           Hard / Expert badge with colour coding
│       ├── TagPill/                   Topic tag
│       ├── ProgressRing/              SVG ring for completion %
│       ├── EmptyState/                Consistent empty state UI
│       └── FilterBar/                 Reusable filter + sort controls
│
├── content/                        ← File-based content. Treat as a CMS.
│   │                                 See CONTENT_STRATEGY.md for schemas.
│   ├── problems/
│   │   └── implement-virtual-dom-diff/
│   │       ├── problem.mdx            Problem description (rendered in left pane)
│   │       ├── meta.json              Frontmatter: title, difficulty, tags, companies
│   │       ├── starter.ts             Starter code shown in editor
│   │       ├── solution.ts            Reference solution (never sent to client)
│   │       └── tests.ts               Test cases — run server-side
│   │
│   ├── quizzes/
│   │   └── js-event-loop-advanced/
│   │       ├── meta.json              title, topic, difficulty, estimatedMinutes
│   │       └── questions.json         Array of question objects (see CONTENT_STRATEGY.md)
│   │
│   ├── guides/
│   │   └── understanding-react-fiber/
│   │       ├── meta.json              title, category, readingTimeMin, lastUpdated
│   │       └── content.mdx            Full article content
│   │
│   └── system-design/
│       └── design-a-component-library/
│           ├── meta.json
│           └── content.mdx
│
├── lib/                            ← Pure utility and service modules. No React here.
│   │
│   ├── content/                    ← Content loading and parsing
│   │   ├── problems.ts                getAllProblems(), getProblemBySlug()
│   │   ├── quizzes.ts                 getAllQuizzes(), getQuizBySlug()
│   │   ├── guides.ts                  getAllGuides(), getGuideBySlug()
│   │   └── mdx.ts                     MDX compilation utility
│   │
│   ├── http/                       ← HTTP service layer (see HTTP_SERVICE.md)
│   │   ├── index.ts                   Public barrel
│   │   ├── types/
│   │   ├── logger/
│   │   ├── errors/
│   │   ├── http/
│   │   ├── interceptors/
│   │   └── hooks/
│   │
│   ├── executor/                   ← Browser-safe code execution sandbox
│   │   ├── index.ts                   runCode(code, testCases) → TestResult[]
│   │   └── sandbox.ts                 Function() wrapper with timeout
│   │
│   ├── storage/                    ← localStorage abstraction
│   │   └── index.ts                   getProgress(), setProgress(), clearProgress()
│   │
│   ├── db/                         ← DATABASE STUB — do not implement yet
│   │   └── index.ts                   See stub template in AGENT_PROMPT.md
│   │
│   └── auth/                       ← AUTH STUB — do not implement yet
│       └── index.ts                   See stub template in AGENT_PROMPT.md
│
├── hooks/                          ← Custom React hooks
│   ├── useProgress.ts                 Reads/writes problem completion from localStorage
│   ├── useKeyboardNav.ts              Quiz keyboard navigation (1/2/3/4 + Enter)
│   ├── useTheme.ts                    Dark/light toggle
│   └── useReadingProgress.ts          Scroll % for guide progress bar
│
├── store/                          ← Zustand stores. Client state only.
│   ├── quizStore.ts                   currentQuestion, answers, timer state
│   └── editorStore.ts                 language, code, runResults
│
├── types/                          ← Global TypeScript types
│   ├── content.ts                     Problem, Quiz, Guide, SystemDesign types
│   ├── executor.ts                    TestCase, TestResult types
│   └── index.ts                       Re-exports
│
├── public/
│   ├── og/                            OG images (static)
│   └── icons/
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json                      strict: true, no exceptions
├── .env.example
└── README.md
```

---

## Rules

1. **Never put business logic in `app/`**. Pages are thin — they import Server Components from `components/` and call loaders from `lib/content/`.
2. **`lib/` is framework-agnostic**. Nothing in `lib/` should import from `next/*` except `lib/content/` which may use `cache()`.
3. **`components/ui/`** is sacred. Add components via `npx shadcn add`. Never hand-edit.
4. **One component per folder**. Each folder has `index.tsx` as the entry point and a co-located `.test.tsx`.
5. **Content is immutable at runtime**. `content/` is read at build time. No writes, no dynamic generation.
6. **`solution.ts` files are never bundled client-side**. The executor API route reads them server-side only.

# Instruction: Component Conventions

# Rules for authoring every React component in this codebase.

---

## Component anatomy

Every component lives in its own named folder under `components/`:

```
components/quiz/QuizCard/
├── index.tsx          ← component implementation
├── QuizCard.test.tsx  ← Vitest + Testing Library tests
└── types.ts           ← (optional) component-local types if complex
```

`index.tsx` always exports a **named export**, not a default:

```tsx
// ✅ correct
export function QuizCard({ quiz }: QuizCardProps) { ... }

// ❌ wrong
export default function QuizCard() { ... }
```

---

## Server vs client components

**Default: Server Component.** Add `'use client'` only when the component uses:

- `useState`, `useReducer`, `useEffect`, `useRef`
- Browser APIs (`window`, `document`, `localStorage`)
- Event handlers (`onClick`, `onChange`, etc.)
- Zustand store subscription
- Framer Motion animations

**The rule of thumb**: if a component can be rendered as HTML on the server, it should be.

```tsx
// ✅ Server Component — no directive needed
// components/guide/GuideCard/index.tsx
import type { GuideMeta } from "@/types/content";
import { DifficultyBadge } from "@/components/shared/DifficultyBadge";

interface GuideCardProps {
  guide: GuideMeta;
}

export function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="...">
      <h3>{guide.title}</h3>
      <DifficultyBadge level={guide.difficulty} />
    </article>
  );
}
```

```tsx
// ✅ Client Component — has interactivity
// components/quiz/QuizOption/index.tsx
"use client";

interface QuizOptionProps {
  option: { id: string; text: string };
  isSelected: boolean;
  isRevealed: boolean;
  isCorrect: boolean;
  onSelect: (id: string) => void;
}

export function QuizOption({
  option,
  isSelected,
  isRevealed,
  isCorrect,
  onSelect,
}: QuizOptionProps) {
  return (
    <button
      onClick={() => onSelect(option.id)}
      className="..."
      aria-pressed={isSelected}
    >
      {option.text}
    </button>
  );
}
```

---

## Props conventions

- Always define a named `interface` for props (not `type`):
  ```ts
  interface QuizCardProps {
    quiz: QuizMeta;
    isCompleted?: boolean;
  }
  ```
- No `React.FC` — just type the props inline
- No prop drilling beyond 2 levels — use Zustand or composition
- No `any` — use `unknown` and narrow explicitly

---

## Styling

- **Tailwind only** — no inline `style={}`, no CSS modules
- Exception: Monaco Editor requires CSS overrides — put them in `app/globals.css` under a `/* Monaco */` comment block
- Use CSS variables (defined in `globals.css`) for theme colours, never hardcode hex values in Tailwind classes
- Use `cn()` from `lib/utils` (shadcn's utility) for conditional class merging:
  ```tsx
  import { cn } from "@/lib/utils";
  <div className={cn("base-classes", isActive && "active-classes")} />;
  ```

---

## Icons

- **All icons from `lucide-react`** — no inline SVGs in component files
- Size icons explicitly: `<ChevronRight size={16} />`
- Exception: logo and OG images live in `public/` as SVG files

---

## Dynamic imports

Monaco Editor **must** be dynamically imported to avoid SSR issues and keep the initial bundle small:

```tsx
// components/editor/CodeEditor/index.tsx
"use client";

import dynamic from "next/dynamic";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="h-full animate-pulse bg-muted" />,
});
```

---

## Animations

Use Framer Motion sparingly — only when animation aids comprehension:

| Use                                | Don't use        |
| ---------------------------------- | ---------------- |
| Quiz option selection state change | Page fade-ins    |
| Quiz result reveal                 | Hover effects    |
| Sidebar open/close                 | Card hover lifts |

```tsx
// ✅ Purposeful — communicates state change
<motion.div
  animate={{ backgroundColor: isCorrect ? '#22c55e' : '#ef4444' }}
  transition={{ duration: 0.2 }}
/>

// ❌ Decorative — adds no information
<motion.div whileHover={{ y: -4 }} />
```

---

## Accessibility

- Every interactive element must be keyboard accessible
- `<button>` for actions, `<a>` for navigation — never `<div onClick>`
- `aria-label` on icon-only buttons
- `role="alert"` on error messages
- Focus visible styles must not be removed (Tailwind's `focus-visible:ring` classes)
- Colour contrast: minimum AA (4.5:1) — WCAG

---

## Testing conventions

Every component has a co-located `.test.tsx`. At minimum:

```tsx
// QuizCard.test.tsx
import { render, screen } from "@testing-library/react";
import { QuizCard } from ".";

const mockQuiz = {
  slug: "test-quiz",
  title: "Test Quiz",
  topic: "JavaScript",
  difficulty: "hard" as const,
  estimatedMinutes: 10,
  questionCount: 5,
  published: true,
  description: "A test quiz",
};

describe("QuizCard", () => {
  it("renders the quiz title", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText("Test Quiz")).toBeInTheDocument();
  });

  it("shows difficulty badge", () => {
    render(<QuizCard quiz={mockQuiz} />);
    expect(screen.getByText("Hard")).toBeInTheDocument();
  });
});
```

---

## Shared components reference

| Component         | Purpose                       | Key props                                                |
| ----------------- | ----------------------------- | -------------------------------------------------------- |
| `DifficultyBadge` | Coloured badge: Hard / Expert | `level: 'hard' \| 'expert'`                              |
| `TagPill`         | Topic tag chip                | `label: string; variant?: 'default' \| 'outline'`        |
| `ProgressRing`    | SVG completion ring           | `percent: number; size?: number`                         |
| `EmptyState`      | Consistent empty/zero state   | `title: string; description: string; action?: ReactNode` |
| `FilterBar`       | Filter + sort controls        | `filters: FilterConfig[]; onFilterChange: fn`            |

---

## What NOT to do

```tsx
// ❌ No default exports
export default function Thing() {}

// ❌ No any
function doThing(x: any) {}

// ❌ No inline styles
<div style={{ color: 'red' }} />

// ❌ No useEffect for data fetching
useEffect(() => { fetch('/api/...').then(...) }, []);
// → fetch in Server Component instead

// ❌ No prop drilling past 2 levels
<A><B><C value={deepProp} /></B></A>
// → use Zustand or component composition

// ❌ No decorative animations
<motion.div whileHover={{ scale: 1.05 }} />
```

# Instruction: HTTP Service Layer

# How to make HTTP calls anywhere in the codebase.

---

## Overview

The HTTP service lives in `lib/http/`. It is a lightweight, correlated fetch
wrapper. Use it for **all** outbound HTTP calls — never use raw `fetch()` directly
outside of `lib/http/`.

For Devpro specifically, outbound HTTP calls happen only in:

- `app/api/` route handlers (server-side calls to external services if needed)
- Future integrations (auth provider, analytics, etc.)

Most data is **static and file-based** — no HTTP needed for content loading.

---

## Creating a logger

Every module that makes HTTP calls should create its own correlated logger:

```ts
import { createCorrelatedLogger } from "@/lib/http";

// Use the route/module path as the namespace
const logger = createCorrelatedLogger("/api/problems/[slug]/run");
```

This ensures every log line is filterable by namespace and correlation ID.

---

## Making requests

```ts
import { createHttpService } from "@/lib/http";

const client = createHttpService({
  baseUrl: process.env.EXTERNAL_API_URL ?? "",
  logger: createCorrelatedLogger("/lib/someService"),
});

// GET
const { data } = await client.get<ResponseType>("/endpoint", {
  params: { key: "value" },
});

// POST
const { data } = await client.post<ResponseType>("/endpoint", {
  field: "value",
});
```

---

## In API routes

```ts
// app/api/problems/[slug]/run/route.ts
import { withApiHandler } from "@/lib/http";
import { createCorrelatedLogger } from "@/lib/http";

const logger = createCorrelatedLogger("/api/problems/[slug]/run");

export const POST = withApiHandler(
  "/api/problems/[slug]/run",
  async (req, correlationId) => {
    const reqLogger = logger.withCorrelationId(correlationId);
    const { code, slug } = await req.json();

    reqLogger.info("Running code", { slug });

    // ... execute code, return results
    return results;
  },
);
```

---

## Error handling

```ts
import { isHttpError } from "@/lib/http";

try {
  const { data } = await client.get<Thing>("/things/1");
} catch (err) {
  if (isHttpError(err)) {
    const { kind, status, message } = err.apiError;
    // kind: 'NETWORK' | 'HTTP_4XX' | 'HTTP_5XX' | 'UNKNOWN'
  }
  throw err;
}
```

---

## Auth interceptor

When the auth layer is implemented, wire the token provider here:

```ts
// lib/http/appClient.ts — TODO: connect when auth is ready
import { createHttpService, createAuthInterceptor } from '@/lib/http';

export const appClient = createHttpService({ ... });

// TODO: replace null with real token getter
appClient.addRequestInterceptor(
  createAuthInterceptor(() => null /* await getToken() */)
);
```
