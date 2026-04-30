export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "merge-new-interval",  category: "grind-75",
  title: "Merge New Interval",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sorting", "Data Structures"],
  companies: ["Google", "Meta", "Amazon"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

You are given a sorted array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start, end]\`, and a new interval \`newInterval = [start, end]\`. Insert \`newInterval\` into \`intervals\` such that the list remains sorted and non-overlapping (merge overlapping intervals if necessary).

Implement \`insertInterval(intervals, newInterval)\`.

## Constraints

- \`intervals\` is sorted by start in ascending order and already non-overlapping.
- You must return a new sorted, non-overlapping array of intervals.
- Aim for $O(n)$ time — no need to re-sort since input is already sorted.

## Examples

\`\`\`js
insertInterval([[1,3],[6,9]], [2,5]);
// → [[1,5],[6,9]]

insertInterval([[1,2],[3,5],[6,7],[8,10],[12,16]], [4,8]);
// → [[1,2],[3,10],[12,16]]

insertInterval([], [5,7]);
// → [[5,7]]

insertInterval([[1,5]], [2,3]);
// → [[1,5]]  — newInterval fully contained
\`\`\`

## Notes

- Three-phase approach: (1) add all intervals that end before the new one starts, (2) merge all overlapping intervals with the new one, (3) add all remaining intervals.
- During the merge phase, update \`newInterval\` start/end with min/max of overlapping bounds.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function insertInterval(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  // Phase 1: intervals that come entirely before newInterval
  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: merge overlapping intervals
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Phase 3: intervals that come entirely after
  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}
\`\`\`

</details>

## Resources

- [Insert Interval — LeetCode](https://leetcode.com/problems/insert-interval/)
- [Interval Scheduling — Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Insert newInterval into a sorted list of non-overlapping intervals,
 * merging overlapping intervals as needed.
 *
 * @param {number[][]} intervals - Sorted, non-overlapping intervals
 * @param {number[]} newInterval - The interval to insert [start, end]
 * @returns {number[][]} Merged result
 */
function insertInterval(intervals, newInterval) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function insertInterval(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;

  while (i < n && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  while (i < n) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return insertInterval(
    input.intervals.map(i => [...i]),
    [...input.newInterval]
  );
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "merge-middle",
      description: "New interval merges with one existing interval",
      input: { intervals: [[1,3],[6,9]], newInterval: [2,5] },
      expected: [[1,5],[6,9]],
      isHidden: false,
    },
    {
      id: "merge-multiple",
      description: "New interval merges across multiple existing intervals",
      input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] },
      expected: [[1,2],[3,10],[12,16]],
      isHidden: false,
    },
    {
      id: "empty-list",
      description: "Insert into empty list",
      input: { intervals: [], newInterval: [5,7] },
      expected: [[5,7]],
      isHidden: false,
    },
    {
      id: "hidden-contained",
      description: "New interval fully contained within existing",
      input: { intervals: [[1,5]], newInterval: [2,3] },
      expected: [[1,5]],
      isHidden: true,
    },
    {
      id: "hidden-no-overlap",
      description: "New interval doesn't overlap with any",
      input: { intervals: [[1,2],[5,6]], newInterval: [3,4] },
      expected: [[1,2],[3,4],[5,6]],
      isHidden: true,
    },
    {
      id: "hidden-merge-all",
      description: "New interval merges all existing into one",
      input: { intervals: [[1,3],[4,6],[7,9]], newInterval: [0,10] },
      expected: [[0,10]],
      isHidden: true,
    },
  ],
};
