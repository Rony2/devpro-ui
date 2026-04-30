export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "scheduler-with-priority",  category: "js-75",
  title: "Scheduler With Priority",
  difficulty: "hard",
  type: "coding",
  topics: ["Scheduling", "Data Structures", "React Internals"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 65,
  published: true,
  addedAt: "2026-03-30",
  description:
    "Build a priority task scheduler that executes highest-priority tasks first while preserving insertion order within each priority level.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Priority scheduling is at the heart of systems like React's Scheduler package, OS task managers, and job queues. Tasks arrive with different priority levels, and the scheduler must execute them in priority order while maintaining FIFO ordering for tasks at the same priority.

Implement \`createScheduler()\` that returns a scheduler object with two methods:

- **\`add(taskId, priority)\`** — enqueues a task with the given string id and numeric priority. Lower numbers = higher priority.
- **\`run()\`** — drains the queue and returns an array of task ids in execution order.

## Constraints

- Lower numeric priority means higher urgency (\`0\` runs before \`1\`).
- Tasks with the same priority execute in FIFO order (insertion order).
- \`add\` can be called multiple times before \`run\`.
- \`run\` drains the entire queue — calling \`run\` again returns \`[]\`.
- Unknown operations or invalid data should be silently ignored.
- Complexity target: $O(n \\log n)$ where \`n\` is the number of tasks.

## Examples

\`\`\`js
const scheduler = createScheduler();

scheduler.add("render", 2);
scheduler.add("urgent-update", 0);
scheduler.add("cleanup", 3);
scheduler.add("state-update", 1);

scheduler.run();
// → ["urgent-update", "state-update", "render", "cleanup"]
\`\`\`

\`\`\`js
// FIFO within same priority.
const scheduler = createScheduler();

scheduler.add("a", 1);
scheduler.add("b", 1);
scheduler.add("c", 1);

scheduler.run();
// → ["a", "b", "c"]
\`\`\`

\`\`\`js
// run() drains the queue.
const scheduler = createScheduler();

scheduler.add("x", 0);
scheduler.run(); // → ["x"]
scheduler.run(); // → []
\`\`\`

## Notes

- A bucketed approach works well: use a Map keyed by priority level, with each value being an array of tasks (preserves insertion order). Then sort the keys and flatten.
- Alternatively, you can use a single array and sort by \`(priority, insertionIndex)\` — this naturally gives you both priority ordering and FIFO within a bucket.
- This mirrors how React's Scheduler uses priority lanes to determine which work to flush first.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function createScheduler() {
  const buckets = new Map();

  return {
    add(taskId, priority) {
      if (!buckets.has(priority)) buckets.set(priority, []);
      buckets.get(priority).push(taskId);
    },
    run() {
      const priorities = [...buckets.keys()].sort((a, b) => a - b);
      const output = [];
      for (const p of priorities) {
        output.push(...buckets.get(p));
      }
      buckets.clear();
      return output;
    },
  };
}
\`\`\`

</details>

## Resources

- [Scheduling Basics — Wikipedia](https://en.wikipedia.org/wiki/Scheduling_(computing))
- [React Scheduler Package](https://github.com/facebook/react/tree/main/packages/scheduler)
- [Priority Queue — Wikipedia](https://en.wikipedia.org/wiki/Priority_queue)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Create a priority task scheduler.
 *
 * @returns {{ add: (taskId: string, priority: number) => void, run: () => string[] }}
 */
function createScheduler() {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function createScheduler() {
  const buckets = new Map();

  return {
    add(taskId, priority) {
      if (!buckets.has(priority)) buckets.set(priority, []);
      buckets.get(priority).push(taskId);
    },
    run() {
      const priorities = [...buckets.keys()].sort((a, b) => a - b);
      const output = [];
      for (const p of priorities) {
        output.push(...buckets.get(p));
      }
      buckets.clear();
      return output;
    },
  };
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { ops } = input;
  const scheduler = createScheduler();

  for (const op of ops) {
    if (op[0] === "add" && op.length >= 3) {
      scheduler.add(op[1], op[2]);
    }
  }

  return scheduler.run();
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "priority-order",
      description: "Executes highest priority (lowest number) first",
      input: { ops: [["add", "t1", 3], ["add", "t2", 1], ["add", "t3", 2]] },
      expected: ["t2", "t3", "t1"],
      isHidden: false,
    },
    {
      id: "fifo-same-priority",
      description: "Preserves FIFO within same priority level",
      input: { ops: [["add", "a", 1], ["add", "b", 1], ["add", "c", 1]] },
      expected: ["a", "b", "c"],
      isHidden: false,
    },
    {
      id: "mixed-priorities",
      description: "Handles many priority levels correctly",
      input: {
        ops: [
          ["add", "low", 10],
          ["add", "critical", 0],
          ["add", "medium", 5],
          ["add", "high", 1],
          ["add", "also-high", 1],
        ],
      },
      expected: ["critical", "high", "also-high", "medium", "low"],
      isHidden: false,
    },
    {
      id: "hidden-unknown-ops",
      description: "Ignores unknown operations gracefully",
      input: { ops: [["noop"], ["add", "x", 2], ["add", "y", 0], ["noop"], ["add", "z", 2]] },
      expected: ["y", "x", "z"],
      isHidden: true,
    },
    {
      id: "hidden-single-task",
      description: "Single task returns single-element array",
      input: { ops: [["add", "only", 5]] },
      expected: ["only"],
      isHidden: true,
    },
    {
      id: "hidden-empty-queue",
      description: "Empty queue returns empty array",
      input: { ops: [] },
      expected: [],
      isHidden: true,
    },
  ],
};
