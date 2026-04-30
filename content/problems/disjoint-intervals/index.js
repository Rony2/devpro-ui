export const problem = {
  slug: "disjoint-intervals",  category: "grind-75",
  title: "Disjoint Intervals",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Greedy", "Sorting"],
  companies: ["Google", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine the minimum amount of removals to get non-overlapping intervals.",

  problemMdx: `## Overview

Given an array of intervals where \`intervals[i] = [start, end]\`, return the **minimum number of intervals you need to remove** to make the rest non-overlapping.

Intervals that only touch at a point (e.g. \`[1,2]\` and \`[2,3]\`) are **not** overlapping.

## Constraints

- \`1 <= intervals.length <= 100,000\`
- \`intervals[i].length === 2\`
- \`-50,000 <= start < end <= 50,000\`

## Examples

\`\`\`js
eraseOverlap([[1,2], [2,3], [3,4], [1,3]]);
// => 1  (remove [1,3] to keep [1,2], [2,3], [3,4])
\`\`\`

\`\`\`js
eraseOverlap([[1,2], [1,2], [1,2]]);
// => 2  (keep one, remove two)

eraseOverlap([[1,2], [2,3]]);
// => 0  (already non-overlapping)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function eraseOverlap(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++;
    }
  }

  return count;
}
\`\`\`

Greedy: sort by end time, always keep the interval that finishes earliest. If the next interval starts before the current end, it must be removed.

</details>

## Resources

- [Non-overlapping Intervals — LeetCode](https://leetcode.com/problems/non-overlapping-intervals/)
- [Interval Scheduling — Wikipedia](https://en.wikipedia.org/wiki/Interval_scheduling)`,

  starterCode: `/**
 * Return the minimum number of intervals to remove for non-overlapping result.
 * @param {number[][]} intervals - array of [start, end] pairs
 * @returns {number}
 */
function eraseOverlap(intervals) {
  // your implementation
}`,

  solution: `function eraseOverlap(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end;
    } else {
      count++;
    }
  }

  return count;
}`,

  harness: `
function solve(input) {
  return eraseOverlap(input.intervals);
}`,

  tests: [
    {
      id: "basic",
      description: "Remove one to eliminate overlap",
      input: { intervals: [[1,2], [2,3], [3,4], [1,3]] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "all-same",
      description: "All identical intervals — remove all but one",
      input: { intervals: [[1,2], [1,2], [1,2]] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "no-overlap",
      description: "Already non-overlapping",
      input: { intervals: [[1,2], [2,3]] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "nested",
      description: "Nested intervals",
      input: { intervals: [[1,10], [2,3], [4,5], [6,7]] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "single",
      description: "Single interval needs no removal",
      input: { intervals: [[0, 5]] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "chain-overlap",
      description: "Overlapping chain",
      input: { intervals: [[1,3], [2,4], [3,5], [4,6]] },
      expected: 1,
      isHidden: true,
    },
  ],
};
