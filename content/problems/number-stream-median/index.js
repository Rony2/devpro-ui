export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "number-stream-median",  category: "grind-75",
  title: "Number Stream Median",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Heap"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the median of a dynamic stream of integers.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Design a data structure that supports adding integers from a data stream and finding the median of all elements seen so far.

Implement the \`MedianFinder\` class:

- \`addNum(num)\` — adds the integer \`num\` to the data structure.
- \`findMedian()\` — returns the median of all elements added so far. If the count is even, return the average of the two middle values.

Your solution will be tested by processing a list of operations.

Implement \`processMedianOps(operations)\` where each operation is \`["addNum", num]\` or \`["findMedian"]\`, and return an array of results (null for addNum, the median for findMedian).

## Constraints

- \`-100000 ≤ num ≤ 100000\`
- There will be at least one \`addNum\` before any \`findMedian\`.
- \`findMedian\` must run in $O(1)$ time.
- \`addNum\` should run in $O(\\log n)$ time.

## Examples

\`\`\`js
processMedianOps([
  ["addNum", 1],
  ["addNum", 2],
  ["findMedian"],    // → 1.5
  ["addNum", 3],
  ["findMedian"],    // → 2
]);
// → [null, null, 1.5, null, 2]
\`\`\`

## Notes

- The classic approach uses two heaps: a max-heap for the lower half and a min-heap for the upper half.
- JavaScript has no built-in heap — you'll need to implement one or use sorted insertion.
- Balance the heaps so their sizes differ by at most 1. The median is either the top of the larger heap or the average of both tops.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function processMedianOps(operations) {
  // Simple sorted-array approach (O(n) insert, O(1) median)
  const sorted = [];
  const results = [];

  function insert(arr, val) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < val) lo = mid + 1;
      else hi = mid;
    }
    arr.splice(lo, 0, val);
  }

  for (const op of operations) {
    if (op[0] === "addNum") {
      insert(sorted, op[1]);
      results.push(null);
    } else {
      const n = sorted.length;
      if (n % 2 === 1) {
        results.push(sorted[Math.floor(n / 2)]);
      } else {
        results.push((sorted[n / 2 - 1] + sorted[n / 2]) / 2);
      }
    }
  }

  return results;
}
\`\`\`

</details>

## Resources

- [Find Median from Data Stream — LeetCode](https://leetcode.com/problems/find-median-from-data-stream/)
- [Heap (data structure) — Wikipedia](https://en.wikipedia.org/wiki/Heap_(data_structure))`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Process a sequence of median-finder operations.
 *
 * @param {Array} operations - Each is ["addNum", num] or ["findMedian"]
 * @returns {Array} Results: null for addNum, the median for findMedian
 */
function processMedianOps(operations) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function processMedianOps(operations) {
  const sorted = [];
  const results = [];

  function insert(arr, val) {
    let lo = 0, hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid] < val) lo = mid + 1;
      else hi = mid;
    }
    arr.splice(lo, 0, val);
  }

  for (const op of operations) {
    if (op[0] === "addNum") {
      insert(sorted, op[1]);
      results.push(null);
    } else {
      const n = sorted.length;
      if (n % 2 === 1) {
        results.push(sorted[Math.floor(n / 2)]);
      } else {
        results.push((sorted[n / 2 - 1] + sorted[n / 2]) / 2);
      }
    }
  }

  return results;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return processMedianOps(input.operations);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic",
      description: "Add 1, 2 → median 1.5, add 3 → median 2",
      input: {
        operations: [
          ["addNum", 1],
          ["addNum", 2],
          ["findMedian"],
          ["addNum", 3],
          ["findMedian"],
        ],
      },
      expected: [null, null, 1.5, null, 2],
      isHidden: false,
    },
    {
      id: "single",
      description: "Single element median",
      input: {
        operations: [
          ["addNum", 5],
          ["findMedian"],
        ],
      },
      expected: [null, 5],
      isHidden: false,
    },
    {
      id: "even-count",
      description: "Even count returns average of two middles",
      input: {
        operations: [
          ["addNum", 1],
          ["addNum", 3],
          ["addNum", 2],
          ["addNum", 4],
          ["findMedian"],
        ],
      },
      expected: [null, null, null, null, 2.5],
      isHidden: false,
    },
    {
      id: "hidden-negatives",
      description: "Negative numbers",
      input: {
        operations: [
          ["addNum", -1],
          ["addNum", -2],
          ["addNum", -3],
          ["findMedian"],
        ],
      },
      expected: [null, null, null, -2],
      isHidden: true,
    },
    {
      id: "hidden-duplicates",
      description: "Duplicate values",
      input: {
        operations: [
          ["addNum", 5],
          ["addNum", 5],
          ["addNum", 5],
          ["findMedian"],
        ],
      },
      expected: [null, null, null, 5],
      isHidden: true,
    },
    {
      id: "hidden-interleaved",
      description: "Multiple interleaved findMedian calls",
      input: {
        operations: [
          ["addNum", 10],
          ["findMedian"],
          ["addNum", 20],
          ["findMedian"],
          ["addNum", 30],
          ["findMedian"],
          ["addNum", 40],
          ["findMedian"],
        ],
      },
      expected: [null, 10, null, 15, null, 20, null, 25],
      isHidden: true,
    },
  ],
};
