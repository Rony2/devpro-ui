export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "merge-overlapping-intervals",  category: "grind-75",
  title: "Merge Overlapping Intervals",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sorting", "Data Structures"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to merge overlapping intervals.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of intervals where \`intervals[i] = [start, end]\`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the ranges.

Implement \`mergeIntervals(intervals)\`.

## Constraints

- Each interval is a two-element array \`[start, end]\` where \`start ≤ end\`.
- Input may be unsorted.
- Return merged intervals sorted by start time.
- Aim for $O(n \\log n)$ time (dominated by sorting).

## Examples

\`\`\`js
mergeIntervals([[1,3],[2,6],[8,10],[15,18]]);
// → [[1,6],[8,10],[15,18]]

mergeIntervals([[1,4],[4,5]]);
// → [[1,5]]  — touching intervals merge

mergeIntervals([[1,4],[0,4]]);
// → [[0,4]]
\`\`\`

## Notes

- Sort intervals by start time. Then iterate: if the current interval overlaps with the last merged one (its start ≤ previous end), extend the previous end. Otherwise, push a new interval.
- Two intervals \`[a,b]\` and \`[c,d]\` overlap if \`c ≤ b\` (after sorting \`a ≤ c\`).
- Edge cases: single interval, all overlapping, none overlapping.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }

  return merged;
}
\`\`\`

</details>

## Resources

- [Merge Intervals — LeetCode](https://leetcode.com/problems/merge-intervals/)
- [Interval Scheduling — Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Merge all overlapping intervals.
 *
 * @param {number[][]} intervals - Array of [start, end] pairs
 * @returns {number[][]} Merged non-overlapping intervals sorted by start
 */
function mergeIntervals(intervals) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]);
    } else {
      merged.push(intervals[i]);
    }
  }

  return merged;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return mergeIntervals(input.intervals);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "mixed-overlap",
      description: "Some intervals overlap, some don't",
      input: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
      expected: [[1,6],[8,10],[15,18]],
      isHidden: false,
    },
    {
      id: "touching",
      description: "Touching intervals merge",
      input: { intervals: [[1,4],[4,5]] },
      expected: [[1,5]],
      isHidden: false,
    },
    {
      id: "unsorted",
      description: "Unsorted input",
      input: { intervals: [[1,4],[0,4]] },
      expected: [[0,4]],
      isHidden: false,
    },
    {
      id: "hidden-single",
      description: "Single interval returned as-is",
      input: { intervals: [[5,7]] },
      expected: [[5,7]],
      isHidden: true,
    },
    {
      id: "hidden-all-overlap",
      description: "All intervals merge into one",
      input: { intervals: [[1,10],[2,6],[3,5],[7,9]] },
      expected: [[1,10]],
      isHidden: true,
    },
    {
      id: "hidden-no-overlap",
      description: "No intervals overlap",
      input: { intervals: [[1,2],[3,4],[5,6]] },
      expected: [[1,2],[3,4],[5,6]],
      isHidden: true,
    },
  ],
};
