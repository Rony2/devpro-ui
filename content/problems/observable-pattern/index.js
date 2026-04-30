export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "observable-pattern",  category: "js-75",
  title: "Observable Pattern",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript", "Events", "API Design"],
  companies: ["Shopify", "Meta"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-03-30",
  description:
    "Implement a minimal Observable class with subscribe, next, and unsubscribe that supports multiple subscribers.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

The Observer pattern is a foundational design pattern in event-driven programming. Libraries like RxJS, Node's \`EventEmitter\`, and React's state management are all built on this concept.

Implement a \`createObservable()\` factory that returns an observable object with three methods:

- **\`subscribe(id, callback)\`** — registers a subscriber with a unique id and a callback function.
- **\`next(value)\`** — pushes a value to all active subscribers by calling their callbacks.
- **\`unsubscribe(id)\`** — removes a subscriber so it no longer receives future values.

## Constraints

- Subscriber ids are unique strings.
- Unsubscribed observers must not receive future events.
- Calling \`subscribe\` with an existing id should replace the old callback.
- \`next\` should call subscribers in the order they were first subscribed.
- \`unsubscribe\` on a non-existent id is a no-op.
- Complexity target: $O(1)$ per operation (amortised).

## Examples

\`\`\`js
const obs = createObservable();

const logA = [];
const logB = [];

obs.subscribe("a", (v) => logA.push(v));
obs.subscribe("b", (v) => logB.push(v));
obs.next(1);
obs.unsubscribe("a");
obs.next(2);

logA; // [1]
logB; // [1, 2]
\`\`\`

\`\`\`js
// Re-subscribing replaces the callback.
const obs = createObservable();
const log = [];

obs.subscribe("x", (v) => log.push("old:" + v));
obs.next(1);
obs.subscribe("x", (v) => log.push("new:" + v));
obs.next(2);

log; // ["old:1", "new:2"]
\`\`\`

## Notes

- Think about the data structure: a \`Map\` is ideal for O(1) lookup while preserving insertion order.
- The callback is invoked synchronously inside \`next\`.
- This is not a full Rx-style Observable — no error/complete channels, just the core subscribe/next/unsubscribe contract.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function createObservable() {
  const subscribers = new Map();

  return {
    subscribe(id, callback) {
      subscribers.set(id, callback);
    },
    next(value) {
      for (const cb of subscribers.values()) {
        cb(value);
      }
    },
    unsubscribe(id) {
      subscribers.delete(id);
    },
  };
}
\`\`\`

</details>

## Resources

- [Observer Pattern — Wikipedia](https://en.wikipedia.org/wiki/Observer_pattern)
- [RxJS Overview](https://rxjs.dev/guide/overview)
- [EventEmitter — Node.js](https://nodejs.org/api/events.html)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Create a minimal observable with subscribe, next, and unsubscribe.
 *
 * @returns {{ subscribe: (id: string, cb: Function) => void, next: (value: any) => void, unsubscribe: (id: string) => void }}
 */
function createObservable() {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function createObservable() {
  const subscribers = new Map();

  return {
    subscribe(id, callback) {
      subscribers.set(id, callback);
    },
    next(value) {
      for (const cb of subscribers.values()) {
        cb(value);
      }
    },
    unsubscribe(id) {
      subscribers.delete(id);
    },
  };
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { ops } = input;
  const obs = createObservable();
  const emitted = {};

  for (const op of ops) {
    if (op[0] === "subscribe") {
      const id = op[1];
      if (!emitted[id]) emitted[id] = [];
      obs.subscribe(id, (v) => emitted[id].push(v));
    } else if (op[0] === "unsubscribe") {
      obs.unsubscribe(op[1]);
    } else if (op[0] === "next") {
      obs.next(op[1]);
    }
  }

  return emitted;
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-subscribe-next",
      description: "Dispatches values to active subscribers",
      input: {
        ops: [
          ["subscribe", "a"],
          ["subscribe", "b"],
          ["next", 1],
          ["unsubscribe", "a"],
          ["next", 2],
        ],
      },
      expected: { a: [1], b: [1, 2] },
      isHidden: false,
    },
    {
      id: "unsubscribe-stops-delivery",
      description: "Unsubscribed observer receives no more events",
      input: {
        ops: [
          ["subscribe", "x"],
          ["next", 10],
          ["next", 20],
          ["unsubscribe", "x"],
          ["next", 30],
        ],
      },
      expected: { x: [10, 20] },
      isHidden: false,
    },
    {
      id: "multiple-subscribers",
      description: "All active subscribers receive each value",
      input: {
        ops: [
          ["subscribe", "a"],
          ["subscribe", "b"],
          ["subscribe", "c"],
          ["next", "hello"],
        ],
      },
      expected: { a: ["hello"], b: ["hello"], c: ["hello"] },
      isHidden: false,
    },
    {
      id: "hidden-re-subscribe",
      description: "Re-subscribing continues receiving events",
      input: {
        ops: [
          ["subscribe", "a"],
          ["next", 1],
          ["unsubscribe", "a"],
          ["subscribe", "a"],
          ["next", 3],
        ],
      },
      expected: { a: [1, 3] },
      isHidden: true,
    },
    {
      id: "hidden-no-subscribers",
      description: "next with no subscribers does nothing",
      input: {
        ops: [
          ["next", 999],
          ["subscribe", "late"],
          ["next", 1],
        ],
      },
      expected: { late: [1] },
      isHidden: true,
    },
    {
      id: "hidden-unsubscribe-noop",
      description: "Unsubscribing non-existent id is a no-op",
      input: {
        ops: [
          ["unsubscribe", "ghost"],
          ["subscribe", "a"],
          ["next", 42],
        ],
      },
      expected: { a: [42] },
      isHidden: true,
    },
  ],
};
