# System Design Content Template — Principal Architect Depth

> **Audience:** Senior / Staff / Principal engineers with 10+ years of experience.
> **Interviewer lens:** Principal Architect at a FAANG company evaluating a Staff+ candidate.
> **Goal:** Every section must demonstrate depth that separates a Staff answer from a Senior answer. No hand-holding. No introductory explanations. Every claim must be justified with a concrete "why."

---

## Template Structure

Every `content.mdx` file must follow this exact section order. Each section has
mandatory subsections and a minimum depth bar described below. The section headers
(`## Section Name`) are rendered as the page's table of contents.

---

### 1. `## Problem Statement`

**Purpose:** Frame the problem crisply. A Principal interviewer expects the candidate
to restate the problem in their own words with precision.

**Must include:**

- One paragraph describing what the system is and why it exists (business context).
- Clear scope boundary: what is in scope (front-end architecture, client/server contract, rendering, state management) and what is out of scope (backend infrastructure, database design, ML ranking — unless directly relevant to the front-end contract).
- A note distinguishing this system from similar-looking systems (e.g., "a news feed is NOT a notification center — different access patterns, different staleness tolerance").
- Real-world examples (3–5 production systems).

**Depth bar:** A reader should understand what makes this problem architecturally interesting within the first 3 sentences.

---

### 2. `## Requirements Exploration`

**Purpose:** Simulate the clarifying-questions phase of a real interview. This is
where a Staff candidate demonstrates product thinking and scoping discipline.

**Must include two sub-sections:**

#### `### Functional Requirements`

Numbered list. Each requirement is a concrete user-facing capability:

```
1. Users can browse a feed of posts with infinite scrolling.
2. Users can react to posts (like, love, etc.) with < 100ms visual feedback.
3. Users can compose and publish new posts with text and image attachments.
...
```

Each requirement should specify the expected behavior precisely — not "users can search"
but "users can search across all mail by sender, subject, body text, date range,
and attachment presence, with results appearing within 200ms for local-index queries."

#### `### Non-Functional Requirements`

This is where Staff/Principal answers differentiate. Every NFR must have a
**concrete, measurable target** — not vague aspirations.

```
| Category           | Requirement                                                   | Target                          |
|--------------------|---------------------------------------------------------------|---------------------------------|
| Performance        | Time-to-interactive for feed page                             | < 2s on 4G mid-range mobile    |
| Performance        | Interaction-to-next-paint (INP) for reactions                 | < 100ms (p95)                  |
| Latency            | Feed API response time                                        | < 200ms (p50), < 500ms (p99)   |
| Scalability        | Concurrent users per deployment                               | 10M+ DAU                       |
| Availability       | Uptime SLA                                                    | 99.95% (< 22 min downtime/mo)  |
| Data freshness     | Maximum staleness of feed content                             | < 30s for new posts             |
| Offline            | Offline read capability                                       | Last 200 items cached locally   |
| Bundle size        | Initial JS payload (compressed)                               | < 150KB                         |
| Accessibility      | WCAG compliance level                                         | AA (AAA for color contrast)     |
| Security           | XSS prevention for user-generated content                     | Zero tolerance — CSP + escaping |
| Internationalization| RTL language support                                         | Full BiDi layout support        |
```

**Depth bar:** If an NFR doesn't have a number or a measurable criterion, it's not
an NFR — it's a wish.

---

### 3. `## Capacity Estimation & Constraints`

**Purpose:** Back-of-envelope math that shapes architecture decisions. This is
frequently the section that separates a Senior from a Staff candidate.

**Must include:**

- Traffic estimation (DAU, requests/sec, read:write ratio)
- Data size estimation (per-entity size × cardinality)
- Bandwidth estimation (payload sizes × request rates)
- Storage estimation (local storage budget for offline, CDN cache sizes)
- Client-side memory budget (how much state can we hold in a normalized store?)

**Example:**

```
DAU: 10M users
Average session: 15 min, 3 sessions/day
Feed fetches per session: ~5 pages × 20 posts = 100 posts/session
Read RPS: 10M × 3 × 5 / 86400 ≈ 1,740 RPS (feed endpoint)
Write RPS: 10M × 0.3 posts/day / 86400 ≈ 35 RPS (post creation)

Per-post payload: ~2KB JSON + ~50KB images (lazy loaded)
Feed page payload: 20 posts × 2KB = ~40KB JSON (gzipped ~8KB)
Client-side store: ~500 posts in memory ≈ 1MB normalized JSON
Local offline cache: ~200 posts ≈ 400KB in IndexedDB
```

**Depth bar:** The estimates must directly inform at least one architecture decision
("because we're at 1,700 RPS, we need CDN caching with 30s TTL" or "at 1MB in-memory,
normalization is essential to avoid 3x duplication").

---

### 4. `## Architecture / High-Level Design`

**Purpose:** The architectural blueprint. This is the centerpiece of the answer.

**Must include:**

#### `### Rendering Strategy`

- CSR vs SSR vs ISR vs Streaming SSR — **with explicit justification**.
- When would you deviate? (e.g., "SSR for public permalink pages for SEO, CSR for the authenticated feed")

#### `### Navigation Model`

- SPA vs MPA — with justification tied to state management needs.
- Routing strategy (client-side routing, URL-driven state, deep linking).

#### `### System Architecture Diagram`

- ASCII diagram showing all layers and their relationships.
- Minimum layers: View → State Management → Data Access / Sync → Server API → CDN/Cache.
- For offline-capable systems: add Local Storage / Service Worker layer.

#### `### Component Architecture`

- Component tree for the primary view (e.g., feed page, inbox view).
- Which components are server-rendered vs client-rendered.
- Where state boundaries live (which component owns which slice of state).
- How component composition avoids prop drilling (context, stores, composition).

#### `### State Management Strategy`

- What goes in server state vs client state vs URL state vs local storage.
- Normalization strategy for entities.
- Optimistic update strategy.
- Cache invalidation approach.

**Depth bar:** The architecture must be justified by the requirements and capacity
estimates — not presented as arbitrary choices.

---

### 5. `## Data Model / Entities`

**Purpose:** The normalized data model that powers the client-side store.

**Must include:**

- Full TypeScript types for every entity (not abbreviated).
- A normalized store type showing how entities reference each other by ID.
- Explanation of normalization benefits specific to this system.
- Index/lookup structures (e.g., "threadsByFolderId for O(1) folder-to-thread lookup").

**Must also include:**

- UI state types (selections, expanded states, loading states, error states).
- Transient state types (drafts, optimistic updates, pending mutations).

**Depth bar:** Every field must be justified. If a field exists, explain why. If a
field is notably absent, explain why it's omitted. Types should be precise — not
`string` when it should be a union, not `any` ever.

---

### 6. `## Interface Definition (API)`

**Purpose:** The contract between the front end and the backend (or sync engine).

**Must include for each endpoint:**

- Method, path, query params, request body, response shape.
- Pagination strategy (cursor vs offset) with justification.
- Error response shapes.
- Rate limiting / throttling considerations.
- Caching headers (`Cache-Control`, `ETag`, `stale-while-revalidate`).

**Must also include:**

- WebSocket / real-time event contracts (if applicable).
- Idempotency key strategy for write operations.
- Request deduplication approach.
- API versioning strategy.

Use tables for endpoints and code blocks for request/response shapes.

**Depth bar:** A backend engineer should be able to implement the API from this
contract alone.

---

### 7. `## Caching Strategy`

**Purpose:** Multi-layer caching is critical for performance. This section is
often missed entirely by Senior candidates and is where Staff candidates shine.

**Must include:**

#### `### Client-Side Caching`

- In-memory normalized store (what's cached, eviction policy, max size).
- Browser cache (Service Worker, Cache API, offline shell).
- Local persistence (IndexedDB / localStorage — what's stored, TTL, storage budget).

#### `### CDN & Edge Caching`

- Which responses are CDN-cacheable (static assets, public API responses).
- Cache-Control directives with specific TTLs.
- Cache invalidation strategy (purge-on-write, TTL-based, stale-while-revalidate).

#### `### Cache Coherence`

- How stale data is detected and refreshed.
- Cross-tab consistency (BroadcastChannel, SharedWorker).
- Optimistic update reconciliation (what happens when the server disagrees).

**Depth bar:** Every cache layer must have an explicit TTL, size limit, and
invalidation trigger.

---

### 8. `## Rendering & Performance Deep Dive`

**Purpose:** The detailed performance engineering section.

**Must include:**

#### `### Critical Rendering Path`

- What loads first (app shell, skeleton, critical CSS).
- JavaScript loading tiers (Tier 1: shell, Tier 2: above-fold, Tier 3: below-fold/deferred).
- Code splitting strategy (route-based, component-based, interaction-based).

#### `### Core Web Vitals Targets`

```
| Metric | Target (p75)    | Strategy                                    |
|--------|-----------------|---------------------------------------------|
| LCP    | < 2.5s          | SSR critical content + preloaded hero image  |
| INP    | < 200ms         | Debounce, virtualization, React.memo         |
| CLS    | < 0.1           | Reserved dimensions, font-display: swap      |
| FCP    | < 1.8s          | Inline critical CSS, streaming SSR           |
| TTFB   | < 800ms         | CDN, edge rendering, connection reuse        |
```

#### `### List Virtualization` (if applicable)

- Virtual scrolling implementation details.
- Overscan buffer size and why.
- Dynamic height measurement.
- Scroll position restoration.

#### `### Image / Media Optimization`

- Format selection (AVIF → WebP → JPEG fallback).
- Responsive images (`srcset`, `sizes`).
- Lazy loading strategy.
- Placeholder strategy (LQIP, BlurHash, skeleton).

#### `### Bundle Optimization`

- Tree shaking, dead code elimination.
- Dynamic imports for heavy dependencies (editors, charts, maps).
- Compression (Brotli > gzip).
- Module/nomodule for modern/legacy browsers.

**Depth bar:** Performance claims must reference specific metrics and techniques,
not vague "make it fast" statements.

---

### 9. `## Security Deep Dive`

**Purpose:** Security must be a first-class concern, not an afterthought.

**Must include:**

#### `### Threat Model`

List the top 3–5 threats specific to this system:

```
| Threat                          | Attack Vector                                    | Mitigation                                    |
|---------------------------------|--------------------------------------------------|-----------------------------------------------|
| XSS via user-generated content  | Injected script in post body / comment           | Output encoding + CSP + sanitization          |
| CSRF on state-changing APIs     | Forged POST from attacker site                   | SameSite cookies + CSRF token                 |
| Clickjacking                    | Iframe embedding of the app                      | X-Frame-Options: DENY + CSP frame-ancestors   |
```

#### `### Content Security Policy`

- Specific CSP directives for this application.
- How to handle inline styles (email clients, rich text editors).

#### `### Authentication & Authorization`

- Token strategy (JWT, session cookies, OAuth).
- Token storage (httpOnly cookies, never localStorage for auth tokens).
- Token refresh flow.

#### `### Input Validation & Output Encoding`

- Where user input enters the system.
- How each input vector is validated/sanitized.
- URL scheme validation (allowlist http, https, mailto).

**Depth bar:** The threat model must be specific to the system — not generic web
security advice. "Email clients must block remote images to prevent tracking pixels"
is specific. "Use HTTPS" is generic.

---

### 10. `## Scalability & Reliability`

**Purpose:** How the front-end architecture handles growth and failure.

**Must include:**

#### `### Scalability Patterns`

- Pagination strategies for large datasets (cursor-based, keyset).
- Virtualization for unbounded lists.
- Lazy loading for deep content trees.
- Data-driven code loading (only load renderers for content types present).

#### `### Failure Handling`

- Network failure: offline mode, retry with exponential backoff + jitter.
- Partial API failure: graceful degradation (show cached data + error banner).
- Server error: error boundaries, fallback UI, automatic retry.
- Timeout handling: AbortController, request timeouts, user-visible indicators.

#### `### Resilience Patterns`

- Outbox pattern for offline writes.
- Idempotency keys for safe retries.
- Circuit breaker for cascading failure prevention.
- Stale-while-revalidate for non-critical data.

**Depth bar:** Every failure mode must have a specific recovery strategy, not
"handle errors gracefully."

---

### 11. `## Accessibility Deep Dive`

**Purpose:** Accessibility is a hard requirement, not a nice-to-have.

**Must include:**

- ARIA roles and landmarks for the primary views.
- Keyboard navigation model (what Tab does, what arrow keys do, shortcuts).
- Screen reader announcements for dynamic content (aria-live regions).
- Focus management (modals, route changes, inline editing).
- Color contrast requirements (4.5:1 AA minimum).
- Motion preferences (prefers-reduced-motion).
- Touch target sizes (≥ 44×44 CSS px).

**Depth bar:** Don't just list requirements — describe the implementation. "The feed
container uses `role="feed"` with each post as `role="article"` and `aria-labelledby`
pointing to the author name element."

---

### 12. `## Monitoring & Observability`

**Purpose:** You can't improve what you can't measure. Staff candidates think about
observability from day one.

**Must include:**

#### `### Client-Side Metrics`

- Core Web Vitals (LCP, INP, CLS) collected via `web-vitals` library.
- Custom metrics: time-to-first-content, interaction latency, error rate.
- Session-level metrics: pages/session, engagement duration, error encounters.

#### `### Error Tracking`

- Unhandled exception capture (window.onerror, unhandledrejection).
- React error boundaries with reporting.
- Source map upload for production stack traces.
- Error deduplication and grouping.

#### `### Logging & Tracing`

- Structured client logs with correlation IDs.
- Request waterfall tracing (correlate client requests to server traces).
- Synthetic monitoring (Playwright-based health checks).

**Depth bar:** Specify what you'd put on a dashboard for day-1 launch.

---

### 13. `## Trade-offs`

**Purpose:** Every architecture decision has a cost. This section shows the
candidate can reason about trade-offs, not just pick the "right" answer.

**Format:** Table with Decision / Pro / Con columns.

Must include at least 6–8 meaningful trade-offs. Each trade-off must be genuine —
both sides must have real weight. Avoid strawman trade-offs where one option is
clearly inferior.

---

### 14. `## What Great Looks Like`

**Purpose:** Explicitly differentiate Senior, Staff, and Principal-level answers.

**Format:**

```
A **senior** answer covers: [3–4 bullet points of baseline expectations]

A **staff** answer additionally: [4–6 bullet points of deeper concerns]

A **principal** answer additionally: [3–4 bullet points of system-level thinking]
```

The principal tier should include:

- Organizational concerns (team boundaries, API contracts between teams).
- Migration/evolution strategy (how this system changes over 3 years).
- Cost/infrastructure implications of architecture choices.
- Cross-system dependencies and failure blast radius.

---

### 15. `## Key Takeaways`

**Purpose:** The 6–8 most important insights, each in one sentence.

---

## meta.json Schema

```json
{
  "slug": "kebab-case-name",
  "title": "Human Title (e.g. Real Product)",
  "difficulty": "hard",
  "estimatedMinutes": 45,
  "published": true,
  "description": "One sentence shown on the card. Include the core architectural challenge."
}
```

**Difficulty scale:**

- `medium` — Well-understood domain (e-commerce, blog). Strong senior solves in 30–45 min.
- `hard` — Requires deep knowledge of specific APIs or patterns (real-time, CRDT, video streaming). Most seniors struggle. 45–60 min.
- `expert` — Requires understanding of internals (browser rendering pipeline, compiler design, layout engines). Staff engineers struggle. 60–90 min.

---

## Tone & Style Rules

1. **No hedging.** Don't say "you might want to consider" — say "use X because Y."
2. **No tutorials.** Never explain what a Promise is or how React renders. The reader has 10+ years of experience.
3. **Justify every decision.** "CSR because..." not just "CSR."
4. **Concrete over abstract.** Numbers, code, specific APIs — not "use caching" but "Cache-Control: public, s-maxage=30, stale-while-revalidate=60."
5. **Use `<Callout>` blocks** for critical insights that a Staff candidate would mention but a Senior might miss.
6. **TypeScript for all code.** Full types, no `any`, no shortcuts.
7. **ASCII diagrams** for architecture. No external image dependencies.
8. **Tables** for comparisons, API definitions, and trade-offs.
9. **Minimum 600 lines** for medium difficulty, **800+ lines** for hard/expert.
