export const problem = {
  slug: "task-coordination",  category: "grind-75",
  title: "Task Coordination",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Hash Map", "Greedy", "Sorting"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find minimum intervals for tasks with cooldown.",

  problemMdx: `## Overview

Given a list of tasks represented by characters and a non-negative cooldown interval \`n\`, find the **minimum number of intervals** (time units) the CPU needs to finish all tasks.

Each task takes one unit of time. Between two same tasks, there must be at least \`n\` units of cooldown. During cooldown, the CPU can execute different tasks or remain idle.

## Constraints

- \`1 <= tasks.length <= 10,000\`
- \`tasks[i]\` is an uppercase English letter.
- \`0 <= n <= 100\`

## Examples

\`\`\`js
leastInterval(["A","A","A","B","B","B"], 2);
// => 8  (A B idle A B idle A B)
\`\`\`

\`\`\`js
leastInterval(["A","A","A","B","B","B"], 0);
// => 6  (no cooldown needed)

leastInterval(["A","A","A","A","A","A","B","C","D","E","F","G"], 2);
// => 16
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function leastInterval(tasks, n) {
  const freq = {};
  for (const t of tasks) freq[t] = (freq[t] || 0) + 1;

  const maxFreq = Math.max(...Object.values(freq));
  const maxCount = Object.values(freq).filter(f => f === maxFreq).length;

  // (maxFreq - 1) full rounds of (n + 1) slots, plus the last partial round
  const result = (maxFreq - 1) * (n + 1) + maxCount;

  // Can never be less than total tasks
  return Math.max(result, tasks.length);
}
\`\`\`

The most frequent task determines the structure. Create \`(maxFreq - 1)\` rounds of \`n + 1\` slots, then add the tasks that share the maximum frequency in the last round. If there are enough different tasks, idle slots are filled and the answer is just \`tasks.length\`.

</details>

## Resources

- [Task Scheduler — LeetCode](https://leetcode.com/problems/task-scheduler/)
- [Greedy Algorithm — Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)`,

  starterCode: `/**
 * Find the minimum number of intervals to finish all tasks with cooldown n.
 * @param {string[]} tasks
 * @param {number} n - cooldown interval
 * @returns {number}
 */
function leastInterval(tasks, n) {
  // your implementation
}`,

  solution: `function leastInterval(tasks, n) {
  const freq = {};
  for (const t of tasks) freq[t] = (freq[t] || 0) + 1;

  const maxFreq = Math.max(...Object.values(freq));
  const maxCount = Object.values(freq).filter(f => f === maxFreq).length;

  const result = (maxFreq - 1) * (n + 1) + maxCount;
  return Math.max(result, tasks.length);
}`,

  harness: `
function solve(input) {
  return leastInterval(input.tasks, input.n);
}`,

  tests: [
    {
      id: "basic",
      description: "A×3, B×3 with n=2 → 8",
      input: { tasks: ["A","A","A","B","B","B"], n: 2 },
      expected: 8,
      isHidden: false,
    },
    {
      id: "no-cooldown",
      description: "n=0 — just total tasks",
      input: { tasks: ["A","A","A","B","B","B"], n: 0 },
      expected: 6,
      isHidden: false,
    },
    {
      id: "many-tasks",
      description: "Many different tasks fill idle slots",
      input: { tasks: ["A","A","A","A","A","A","B","C","D","E","F","G"], n: 2 },
      expected: 16,
      isHidden: false,
    },
    {
      id: "single-task",
      description: "One type of task",
      input: { tasks: ["A","A","A"], n: 2 },
      expected: 7,
      isHidden: true,
    },
    {
      id: "all-unique",
      description: "All unique tasks",
      input: { tasks: ["A","B","C","D"], n: 3 },
      expected: 4,
      isHidden: true,
    },
    {
      id: "one-task",
      description: "Single task instance",
      input: { tasks: ["A"], n: 5 },
      expected: 1,
      isHidden: true,
    },
  ],
};
