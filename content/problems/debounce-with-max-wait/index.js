export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "debounce-with-max-wait",  category: "js-75",
  title: "Debounce With Max Wait",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript", "Timing", "State Machines"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 55,
  published: true,
  addedAt: "2026-03-31",
  description:
    "Simulate debounce emission timestamps with a maxWait ceiling that forces periodic invocations during sustained activity.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Standard debounce delays execution until a quiet period elapses. In real-world scenarios (scroll handlers, search-as-you-type), this can starve the callback indefinitely during sustained activity. The \`maxWait\` option guarantees the function fires at least once every \`maxWait\` milliseconds, even if calls keep arriving.

Given a stream of timestamped invocations and a configuration object, implement \`debounceMaxWait(events, wait, maxWait)\` that computes the exact timestamps at which the debounced function would fire.

## Constraints

- Input events are sorted in ascending order.
- \`wait\` and \`maxWait\` are positive integers in milliseconds.
- \`maxWait >= wait\` is always true.
- Output timestamps must be in ascending order with no duplicates.
- Only trailing-edge fires (no leading option for this problem).
- Complexity target: $O(n)$.

## Examples

\`\`\`js
// maxWait forces mid-burst fire.
debounceMaxWait([0, 50, 120, 180, 250, 500], 100, 200);
// → [200, 350, 600]
// Events 0–180 keep resetting the debounce timer. But maxWait: 200 forces
// a fire at t=200 (200ms after first call at t=0). Window resets.
// Event at 250: gap from 180 is 70 < wait, but elapsed from 200 is 50 < maxWait.
// Gap 250→500 exceeds wait so trailing fires at 350. Event 500 → trailing at 600.
\`\`\`

\`\`\`js
// Natural gaps — maxWait never triggers.
debounceMaxWait([0, 250, 500], 100, 300);
// → [100, 350, 600]
// Each event spaced > wait, so each fires trailing normally.
// maxWait never kicks in because no window lasts > 300ms.
\`\`\`

\`\`\`js
// Continuous rapid fire with periodic maxWait fires.
debounceMaxWait([0, 30, 60, 90, 130, 160, 190, 220, 400], 50, 120);
// → [120, 250, 450]
// Continuous calls 0–220 trigger maxWait at 120 and 250. Gap to 400 > 50 so trailing at 250.
// Event 400 starts new window with trailing at 450.
\`\`\`

## Notes

- The first event in a window starts both the debounce timer (\`wait\`) and the maxWait timer.
- When \`maxWait\` forces a fire, it closes the current window and the next event starts a new window.
- A trailing edge fires at \`lastEventInWindow + wait\` unless \`maxWait\` fires first.
- The fire time is always \`Math.min(lastEvent + wait, windowStart + maxWait)\`.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function debounceMaxWait(events, wait, maxWait) {
  if (!events.length) return [];

  const output = [];
  let windowStart = events[0];
  let lastEvent = events[0];

  for (let i = 1; i < events.length; i += 1) {
    const time = events[i];
    const gap = time - lastEvent;
    const elapsed = time - windowStart;
    const maxWaitDeadline = windowStart + maxWait;
    const trailingDeadline = lastEvent + wait;

    if (gap > wait) {
      output.push(Math.min(trailingDeadline, maxWaitDeadline));
      windowStart = time;
    } else if (elapsed >= maxWait) {
      output.push(maxWaitDeadline);
      windowStart = time;
    }

    lastEvent = time;
  }

  const trailingDeadline = lastEvent + wait;
  const maxWaitDeadline = windowStart + maxWait;
  output.push(Math.min(trailingDeadline, maxWaitDeadline));

  return output;
}
\`\`\`

</details>

## Resources

- [Lodash debounce maxWait](https://lodash.com/docs/4.17.15#debounce)
- [Event Loop — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Debounce vs Throttle](https://css-tricks.com/debouncing-throttling-explained-examples/)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Simulate debounce with maxWait — return the timestamps at which
 * the debounced function would fire.
 *
 * @param {number[]} events - Sorted array of call timestamps (ms)
 * @param {number} wait - Debounce delay in ms
 * @param {number} maxWait - Maximum time a burst can go without firing
 * @returns {number[]} Emission timestamps
 */
function debounceMaxWait(events, wait, maxWait) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function debounceMaxWait(events, wait, maxWait) {
  if (!events.length) return [];

  const output = [];
  let windowStart = events[0];
  let lastEvent = events[0];

  for (let i = 1; i < events.length; i += 1) {
    const time = events[i];
    const gap = time - lastEvent;
    const elapsed = time - windowStart;
    const maxWaitDeadline = windowStart + maxWait;
    const trailingDeadline = lastEvent + wait;

    if (gap > wait) {
      output.push(Math.min(trailingDeadline, maxWaitDeadline));
      windowStart = time;
    } else if (elapsed >= maxWait) {
      output.push(maxWaitDeadline);
      windowStart = time;
    }

    lastEvent = time;
  }

  const trailingDeadline = lastEvent + wait;
  const maxWaitDeadline = windowStart + maxWait;
  output.push(Math.min(trailingDeadline, maxWaitDeadline));

  return output;
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { wait, maxWait, events } = input;
  return debounceMaxWait(events, wait, maxWait);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "maxwait-forces-fire",
      description: "maxWait forces fire during sustained burst",
      input: { wait: 100, maxWait: 200, events: [0, 50, 120, 180, 250, 500] },
      expected: [200, 350, 600],
      isHidden: false,
    },
    {
      id: "natural-gaps",
      description: "Natural gaps — maxWait never triggers",
      input: { wait: 100, maxWait: 300, events: [0, 250, 500] },
      expected: [100, 350, 600],
      isHidden: false,
    },
    {
      id: "continuous-rapid-fire",
      description: "Continuous rapid calls with periodic maxWait fires",
      input: { wait: 50, maxWait: 120, events: [0, 30, 60, 90, 130, 160, 190, 220, 400] },
      expected: [120, 250, 450],
      isHidden: false,
    },
    {
      id: "hidden-single-event",
      description: "Single event only produces one trailing fire",
      input: { wait: 100, maxWait: 200, events: [42] },
      expected: [142],
      isHidden: true,
    },
    {
      id: "hidden-empty-events",
      description: "Empty events returns empty output",
      input: { wait: 100, maxWait: 200, events: [] },
      expected: [],
      isHidden: true,
    },
    {
      id: "hidden-maxwait-equals-wait",
      description: "maxWait equals wait — behaves like throttle",
      input: { wait: 100, maxWait: 100, events: [0, 30, 60, 200, 230, 260, 400] },
      expected: [100, 300, 500],
      isHidden: true,
    },
  ],
};
