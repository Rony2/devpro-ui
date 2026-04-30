export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "debounce-with-leading-trailing",  category: "js-75",
  title: "Debounce With Leading and Trailing",
  difficulty: "hard",
  type: "coding",
  topics: ["JavaScript", "Timing", "State Machines"],
  companies: ["Stripe", "Google"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-03-30",
  description:
    "Implement a debounce function with configurable leading and trailing edge invocation.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Debounce is one of the most common utility functions in frontend engineering. A debounced function delays execution until a quiet period (\`wait\` ms with no new calls) has elapsed.

The twist: real-world debounce implementations (like Lodash's) support two options:

- **\`leading\`** — fire immediately on the first call of a new burst.
- **\`trailing\`** — fire after the quiet period following the last call in a burst.

Given a stream of timestamped invocations and a configuration, your \`debounce(events, wait, options)\` function should return the exact timestamps at which the debounced function would fire.

## Constraints

- Input events are sorted in ascending order.
- \`wait\` is a positive integer in milliseconds.
- At least one of \`leading\` or \`trailing\` will be \`true\`.
- Output timestamps must be in ascending order with no duplicates.
- A "burst" is a group of calls where each consecutive pair is within \`wait\` ms.
- Complexity target: $O(n)$.

## Examples

\`\`\`js
// Both leading and trailing enabled.
debounce([0, 50, 220], 100, { leading: true, trailing: true });
// → [0, 150, 220, 320]
// Burst 1: calls at 0, 50. Leading fires at 0. Trailing fires at 50+100=150.
// Burst 2: call at 220 (gap > 100). Leading fires at 220. Trailing fires at 320.
\`\`\`

\`\`\`js
// Trailing only.
debounce([0, 20, 130], 80, { leading: false, trailing: true });
// → [100, 210]
// Burst 1: calls at 0, 20. Trailing fires at 20+80=100.
// Burst 2: call at 130 (gap > 80). Trailing fires at 130+80=210.
\`\`\`

\`\`\`js
// Leading only.
debounce([0, 10, 100, 110], 50, { leading: true, trailing: false });
// → [0, 100]
// Burst 1: calls at 0, 10. Leading fires at 0 only.
// Burst 2: calls at 100, 110. Leading fires at 100 only.
\`\`\`

## Notes

- Think of each burst as a "window" that opens on the first call after a quiet gap.
- Leading fires once per window (at window start). Trailing fires once per window (at last call + wait).
- When both are enabled and a burst has only one call, both leading and trailing fire (at different times).
- The trailing edge of one burst may overlap with the start of the next — ensure no duplicate timestamps.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function debounce(events, wait, options) {
  const { leading, trailing } = options;
  if (!events.length) return [];

  const output = [];
  let windowStart = events[0];
  let windowLast = events[0];

  if (leading) output.push(events[0]);

  for (let i = 1; i < events.length; i += 1) {
    const time = events[i];
    if (time - windowLast > wait) {
      // Gap detected — close the previous window
      if (trailing && windowLast !== windowStart) {
        output.push(windowLast + wait);
      } else if (trailing && !leading) {
        output.push(windowLast + wait);
      }
      // Start new window
      windowStart = time;
      if (leading) output.push(time);
    }
    windowLast = time;
  }

  // Close the final window
  if (trailing) {
    const trailingTime = windowLast + wait;
    output.push(trailingTime);
  }

  return output;
}
\`\`\`

</details>

## Resources

- [Lodash debounce docs](https://lodash.com/docs/4.17.15#debounce)
- [Event Loop — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [Debounce vs Throttle — CSS-Tricks](https://css-tricks.com/debouncing-throttling-explained-examples/)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Simulate debounce and return the timestamps at which the
 * debounced function would fire.
 *
 * @param {number[]} events - Sorted array of call timestamps (ms)
 * @param {number} wait - Debounce delay in ms
 * @param {{ leading: boolean, trailing: boolean }} options
 * @returns {number[]} Emission timestamps
 */
function debounce(events, wait, options) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function debounce(events, wait, options) {
  const { leading, trailing } = options;
  if (!events.length) return [];

  const output = [];
  let windowStart = events[0];
  let windowLast = events[0];

  if (leading) output.push(events[0]);

  for (let i = 1; i < events.length; i += 1) {
    const time = events[i];
    if (time - windowLast > wait) {
      if (trailing && windowLast !== windowStart) {
        output.push(windowLast + wait);
      } else if (trailing && !leading) {
        output.push(windowLast + wait);
      }
      windowStart = time;
      if (leading) output.push(time);
    }
    windowLast = time;
  }

  if (trailing) {
    const trailingTime = windowLast + wait;
    output.push(trailingTime);
  }

  return output;
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { wait, leading, trailing, events } = input;
  return debounce(events, wait, { leading, trailing });
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "leading-trailing",
      description: "Leading and trailing enabled",
      input: { wait: 100, leading: true, trailing: true, events: [0, 50, 220] },
      expected: [0, 150, 220, 320],
      isHidden: false,
    },
    {
      id: "trailing-only",
      description: "Trailing only fires after quiet period",
      input: { wait: 80, leading: false, trailing: true, events: [0, 20, 130] },
      expected: [100, 210],
      isHidden: false,
    },
    {
      id: "leading-only",
      description: "Leading only fires at burst start",
      input: { wait: 50, leading: true, trailing: false, events: [0, 10, 100, 110] },
      expected: [0, 100],
      isHidden: false,
    },
    {
      id: "hidden-single-event",
      description: "Single event with both edges",
      input: { wait: 100, leading: true, trailing: true, events: [50] },
      expected: [50, 150],
      isHidden: true,
    },
    {
      id: "hidden-empty-events",
      description: "Empty events returns empty array",
      input: { wait: 100, leading: true, trailing: true, events: [] },
      expected: [],
      isHidden: true,
    },
    {
      id: "hidden-rapid-burst",
      description: "Rapid burst with trailing only",
      input: { wait: 50, leading: false, trailing: true, events: [0, 10, 20, 30, 40] },
      expected: [90],
      isHidden: true,
    },
  ],
};
