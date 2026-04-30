# Devpro UI

Senior-level frontend interview preparation platform built with Next.js 16 App Router.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Zustand (client state)
- Monaco Editor (`@monaco-editor/react`)
- `next-mdx-remote` for guide/problem MDX rendering

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality Commands

```bash
npm run lint
npm run build
```

## Route Structure

### Marketing

- `/`
- `/about`
- `/pricing`

### Platform

- `/problems`
- `/problems/[slug]`
- `/quizzes`
- `/quizzes/[slug]`
- `/guides`
- `/guides/[slug]`
- `/system-design`
- `/system-design/[slug]`
- `/playground`

### Auth

- `/login`
- `/signup`

### APIs

- `POST /api/problems/[slug]/run`
- `POST /api/quizzes/[slug]/submit`
- `POST /api/playground/format`

## Content-Driven Data Model

All learning content is file-based under `content/`:

- `content/problems/[slug]/`
- `content/quizzes/[slug]/`
- `content/guides/[slug]/`
- `content/system-design/[slug]/`

Loaders in `src/lib/content/` read these files server-side. Content folders are validated defensively (missing `meta.json` or required files are ignored).

## Notes

- This implementation is JavaScript-first by design (TypeScript migration intentionally deferred).
- `src/app/quiz/*` is a legacy route path retained from prior app iterations.
