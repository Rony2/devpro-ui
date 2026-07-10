---
name: system-design-content
description: "Create new frontend system design content for devpro-ui. Use when: adding a system design question, creating system design content, generating system design scenarios, writing system design MDX. Actions: create, add, generate, write system design problems. Creates both meta.json and content.mdx following the Principal Architect depth template with 15 mandatory sections. Targets senior/staff/principal engineers with 10+ years experience."
argument-hint: "Topic name, e.g. 'Email Client like Gmail' or 'Notification System'"
---

# System Design Content Generator

Create production-quality frontend system design content for the devpro-ui platform. Each system design scenario targets Senior / Staff / Principal engineers and follows a strict 15-section template at Principal Architect interview depth.

## When to Use

- Adding a new system design question/scenario to the platform
- Regenerating or rewriting an existing system design content.mdx
- Creating batch system design content

## Output Structure

Every system design topic produces two files:

```
content/system-design/{slug}/
├── meta.json       # Metadata for listing page
└── content.mdx     # Full content (15 sections, 600-800+ lines)
```

## Procedure

### Step 1: Determine the Topic

If the user hasn't specified a topic, ask for:

- The system name (e.g. "Email Client like Gmail")
- Difficulty level (medium / hard / expert)
- Estimated completion time (default: 45 min for hard, 35 for medium, 60 for expert)

### Step 2: Generate the Slug

Convert the topic to a kebab-case slug:

- "Email Client like Gmail" → `email-client`
- "News Feed (Facebook)" → `news-feed-facebook`
- "Real-time Collaboration Editor" → `realtime-collaboration-editor`

### Step 3: Create meta.json

Create `content/system-design/{slug}/meta.json`:

```json
{
  "slug": "{slug}",
  "title": "{Title (e.g. Real Product)}",
  "difficulty": "hard",
  "estimatedMinutes": 45,
  "published": true,
  "description": "One sentence with the core architectural challenge."
}
```

**Difficulty scale:**

- `medium` — Well-understood domain (e-commerce, blog). Strong senior solves in 30–45 min.
- `hard` — Deep knowledge of specific APIs/patterns (real-time, CRDT, video). 45–60 min.
- `expert` — Requires understanding of internals (browser rendering, compilers, layout engines). 60–90 min.

### Step 4: Create content.mdx

Create `content/system-design/{slug}/content.mdx` with ALL 15 sections below in exact order. Reference [the full template](./references/TEMPLATE.md) for depth requirements per section.

## Required Sections (exact order)

Every `content.mdx` MUST include these 15 sections as `##` headers:

```
## Problem Statement
## Requirements Exploration
## Capacity Estimation & Constraints
## Architecture / High-Level Design
## Data Model / Entities
## Interface Definition (API)
## Caching Strategy
## Rendering & Performance Deep Dive
## Security Deep Dive
## Scalability & Reliability
## Accessibility Deep Dive
## Monitoring & Observability
## Trade-offs
## What Great Looks Like
## Key Takeaways
```

## Section Depth Requirements

### `## Problem Statement`

- One paragraph: what the system is + business context
- Scope boundary: what's in vs out of scope
- How this differs from similar systems
- 3–5 real-world production examples
- Architecturally interesting within first 3 sentences

### `## Requirements Exploration`

Must have two sub-sections:

**`### Functional Requirements`** — Numbered list with precise behavior:

```
1. Users can browse a feed of posts with infinite scrolling.
2. Users can react to posts with < 100ms visual feedback.
```

**`### Non-Functional Requirements`** — Table with measurable targets:

```
| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | TTI | < 2s on 4G mid-range mobile |
| Bundle size | Initial JS | < 150KB compressed |
```

### `## Capacity Estimation & Constraints`

- Traffic: DAU, RPS, read:write ratio
- Data: per-entity size × cardinality
- Bandwidth: payload × request rate
- Client memory budget
- Estimates MUST inform architecture decisions

### `## Architecture / High-Level Design`

Must have sub-sections:

- `### Rendering Strategy` — CSR/SSR/ISR with justification
- `### Navigation Model` — SPA/MPA, routing, URL state
- `### System Architecture Diagram` — ASCII art, minimum layers: View → State → Data Access → API → CDN
- `### Component Architecture` — Component tree, server vs client, state boundaries
- `### State Management Strategy` — Server state vs client vs URL vs localStorage

### `## Data Model / Entities`

- Full TypeScript types (no abbreviations, no `any`)
- Normalized store type with ID references
- UI state types (selections, loading, errors)
- Transient state (drafts, optimistic updates)
- Every field justified

### `## Interface Definition (API)`

- Method, path, params, request/response shapes
- Pagination (cursor vs offset) with justification
- Error shapes, rate limiting, caching headers
- WebSocket contracts if applicable
- Idempotency strategy for writes

### `## Caching Strategy`

Sub-sections:

- `### Client-Side Caching` — In-memory normalized store (what's cached, LRU eviction policy, max entity count), Service Worker strategy (cache-first for shell, network-first for API, stale-while-revalidate for assets), IndexedDB for offline data (schema, TTL per entity type, storage budget in MB)
- `### CDN & Edge Caching` — Which responses are CDN-cacheable, specific Cache-Control directives with TTLs (e.g. `public, s-maxage=30, stale-while-revalidate=60`), invalidation strategy (purge-on-write vs TTL-based), edge compute for personalization
- `### Cache Coherence` — Stale data detection and refresh triggers, cross-tab consistency via BroadcastChannel or SharedWorker, optimistic update reconciliation (rollback when server disagrees), cache versioning on deploy

Must specify:

- Every cache layer has an explicit TTL, size limit, and invalidation trigger
- What happens when cache is full (eviction policy)
- How cache warms on first visit vs return visit

### `## Rendering & Performance Deep Dive`

Sub-sections:

- `### Critical Rendering Path` — App shell strategy, loading tiers (Tier 1: shell + critical CSS, Tier 2: above-fold JS, Tier 3: below-fold/interaction-triggered), code splitting (route-based + component-based + interaction-based)
- `### Core Web Vitals Targets` — Table with LCP, INP, CLS, FCP, TTFB targets + specific strategies per metric
- `### List Virtualization` (if applicable) — Library choice, overscan buffer size with justification, dynamic height measurement approach, scroll position restoration on navigation
- `### Image / Media Optimization` — Format negotiation (AVIF → WebP → JPEG), responsive images with `srcset`/`sizes`, lazy loading with Intersection Observer, placeholder strategy (LQIP, BlurHash, skeleton, dominant-color)
- `### Bundle Optimization` — Tree shaking, dead code elimination, dynamic imports for heavy deps (editors, charts, maps, date libs), Brotli compression, module/nomodule pattern, dependency analysis and deduplication

Must specify:

- Concrete numbers for every performance target (not "make it fast")
- Which metrics are monitored in CI (bundle size budget, Lighthouse score gate)
- What gets loaded at each tier and why

### `## Security Deep Dive`

Sub-sections:

- `### Threat Model` — Table: Threat / Attack Vector / Mitigation (3–5 threats SPECIFIC to THIS system, not generic web advice)
- `### Content Security Policy` — Specific directives for this app, inline style handling, nonce strategy for scripts
- `### Authentication & Authorization` — Token strategy (JWT vs session cookies vs OAuth), storage (httpOnly cookies, NEVER localStorage for auth tokens), refresh flow with race condition handling, silent refresh via iframe/background fetch
- `### Input Validation & Output Encoding` — Every user input vector identified, sanitization approach per vector, URL scheme allowlisting (http, https, mailto only)
- `### Data Protection` — Sensitive data handling (PII in logs, memory, network), data retention policies on client, secure clipboard operations

Must specify:

- Threats that are UNIQUE to this system (not "use HTTPS")
- How CSP interacts with third-party scripts (analytics, payment)
- Token refresh race conditions and how to queue requests during refresh

### `## Scalability & Reliability`

Sub-sections:

- `### Scalability Patterns` — Pagination (cursor-based with justification over offset), virtualization for unbounded lists (overscan buffer, dynamic heights), lazy loading for deep content trees, data-driven code loading (only load renderers for content types actually present)
- `### Failure Handling` — Network failure (offline mode, queue mutations, retry with exponential backoff + jitter), partial API failure (graceful degradation, show cached data + error banner), server error (error boundaries with fallback UI, automatic retry with backoff), timeout handling (AbortController, configurable timeouts per endpoint, user-visible loading indicators)
- `### Resilience Patterns` — Outbox pattern for offline writes, idempotency keys for safe retries, circuit breaker for cascading failure prevention, stale-while-revalidate for non-critical data, request deduplication for rapid re-renders
- `### Graceful Degradation` — Feature flags for progressive rollout, capability detection (what works without JS, without WebSocket, on slow connections), fallback experiences per connection quality tier

Must specify:

- Every failure mode has a SPECIFIC recovery strategy (not "handle errors gracefully")
- What the user sees during each failure state
- How long before retry, how many retries, what happens after max retries

### `## Accessibility Deep Dive`

- ARIA roles and landmarks for primary views (specific role assignments, not generic)
- Keyboard navigation model (Tab order, arrow key behavior, shortcuts with `aria-keyshortcuts`)
- Screen reader announcements for dynamic content (`aria-live="polite"` for async updates, `aria-live="assertive"` for errors)
- Focus management (trap focus in modals, restore on close, manage focus on route changes, focus visible indicators)
- Color contrast (4.5:1 AA minimum, 3:1 for large text, test with forced-colors mode)
- Motion preferences (`prefers-reduced-motion` media query, disable animations, provide alternative)
- Touch targets (≥ 44×44 CSS px per WCAG 2.5.5)
- High contrast mode support (Windows forced-colors, transparent borders)
- Screen magnification compatibility (200% zoom, no horizontal scroll)

Must specify:

- Implementation details, not just requirements ("role='feed' on container, role='article' on each post")
- What happens when dynamic content loads (where focus goes, what's announced)
- How complex interactions degrade for assistive technology (drag-and-drop alternatives, gesture alternatives)

### `## Monitoring & Observability`

Sub-sections:

- `### Client-Side Metrics` — Core Web Vitals (LCP, INP, CLS via `web-vitals` lib), custom business metrics (time-to-first-content, interaction latency, error rate), session-level metrics (pages/session, engagement duration, error encounters per session)
- `### Error Tracking` — Unhandled exception capture (`window.onerror`, `unhandledrejection`), React error boundaries with reporting, source map upload for production stack traces, error deduplication and grouping strategy
- `### Logging & Tracing` — Structured client logs with correlation IDs, request waterfall tracing (correlate client requests to server traces), synthetic monitoring (Playwright-based health checks)
- `### Alerting & Dashboards` — Day-1 launch dashboard specification (what 5–8 panels to show), alerting thresholds (error rate > 1%, LCP > 4s, API p99 > 2s), PagerDuty/Slack integration triggers
- `### Real User Monitoring (RUM)` — Sampling strategy (100% for errors, 10% for performance), segment by device/geo/connection, funnel drop-off tracking, rage-click detection

Must specify:

- What you'd put on a dashboard for day-1 launch
- Which metrics trigger alerts vs are informational
- How to distinguish between user errors vs system errors
- Performance budget monitoring (bundle size regression detection in CI)

### `## Trade-offs`

- Table: Decision / Pro / Con
- Minimum 6–8 genuine trade-offs (both sides must have real weight)

### `## What Great Looks Like`

```
A **senior** answer covers: [3–4 bullets]
A **staff** answer additionally: [4–6 bullets]
A **principal** answer additionally: [3–4 bullets]
```

### `## Key Takeaways`

- 6–8 bullet points, one sentence each

## Tone & Style Rules

1. **No hedging.** Say "use X because Y" not "you might consider X."
2. **No tutorials.** Reader has 10+ years experience.
3. **Justify every decision.** "CSR because..." not just "CSR."
4. **Concrete over abstract.** Numbers, code, specific APIs.
5. **Use `<Callout>` blocks** for insights a Staff candidate mentions but Senior might miss.
6. **TypeScript for all code.** Full types, no `any`.
7. **ASCII diagrams** for architecture.
8. **Tables** for comparisons, APIs, trade-offs.
9. **Minimum 600 lines** for medium, **800+ lines** for hard/expert.

## MDX Components Available

- `<Callout>` — For critical insights
- Code blocks with language tags: ` ```typescript `

## Validation Checklist

After creating content, verify:

- [ ] meta.json has all required fields (slug, title, difficulty, estimatedMinutes, published, description)
- [ ] content.mdx has all 15 `##` section headers in order
- [ ] All code blocks use TypeScript with full types
- [ ] Architecture diagram is ASCII (no image dependencies)
- [ ] Trade-offs table has 6+ entries
- [ ] NFR table has measurable targets (numbers, not adjectives)
- [ ] Capacity estimation has actual math that informs decisions
- [ ] Security section has system-specific threats (not generic "use HTTPS")
- [ ] Monitoring section specifies a day-1 dashboard with 5–8 panels
- [ ] Monitoring section includes alerting thresholds with specific numbers
- [ ] Caching section has explicit TTLs and size limits per layer
- [ ] Performance section has Core Web Vitals table with concrete targets
- [ ] Accessibility section has implementation details (role assignments, not just "be accessible")
- [ ] Failure handling has specific recovery strategy per failure mode
- [ ] "What Great Looks Like" has all 3 tiers (senior/staff/principal)
- [ ] File is 600+ lines (medium) or 800+ lines (hard/expert)
