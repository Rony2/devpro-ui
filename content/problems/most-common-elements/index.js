export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "most-common-elements",  category: "grind-75",
  title: "Most Common Elements",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine the most common elements in an integer array.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an integer array and an integer \`k\`, return the \`k\` most frequent elements. The answer may be returned in any order.

Implement \`topKFrequent(nums, k)\`.

## Constraints

- Input is a non-empty array of integers and a positive integer \`k\`.
- \`k\` is always valid: \`1 ≤ k ≤ number of unique elements\`.
- The answer is guaranteed to be unique (no ties at the k-th boundary).
- Aim for better than $O(n \\log n)$ — a bucket sort approach gives $O(n)$.

## Examples

\`\`\`js
topKFrequent([1, 1, 1, 2, 2, 3], 2);  // [1, 2]
topKFrequent([1], 1);                  // [1]
topKFrequent([4, 4, 4, 6, 6, 2], 1);  // [4]
topKFrequent([1, 2, 2, 3, 3, 3], 3);  // [3, 2, 1] (any order)
\`\`\`

## Notes

- **Frequency map** first: count occurrences of each element in $O(n)$.
- **Bucket sort approach**: create an array of buckets where index = frequency. Elements with the same frequency go into the same bucket. Then iterate from the highest frequency bucket down, collecting elements until you have \`k\` results.
- Alternatively, use a min-heap of size \`k\` for $O(n \\log k)$.
- The result order doesn't matter — only the set of elements matters.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }

  // Bucket sort: index = frequency
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
\`\`\`

</details>

## Resources

- [Top K Frequent Elements — LeetCode](https://leetcode.com/problems/top-k-frequent-elements/)
- [Bucket Sort — Wikipedia](https://en.wikipedia.org/wiki/Bucket_sort)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Return the k most frequent elements in the array.
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of top frequent elements to return
 * @returns {number[]} The k most frequent elements (any order)
 */
function topKFrequent(nums, k) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  const result = topKFrequent(input.nums, input.k);
  // Sort for deterministic comparison
  return result.slice().sort((a, b) => a - b);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "top-2",
      description: "Returns top 2 most frequent elements",
      input: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
      expected: [1, 2],
      isHidden: false,
    },
    {
      id: "single-element",
      description: "Single element array with k=1",
      input: { nums: [1], k: 1 },
      expected: [1],
      isHidden: false,
    },
    {
      id: "top-1",
      description: "Returns only the most frequent element",
      input: { nums: [4, 4, 4, 6, 6, 2], k: 1 },
      expected: [4],
      isHidden: false,
    },
    {
      id: "hidden-all-unique",
      description: "All unique elements — k equals array length",
      input: { nums: [1, 2, 3], k: 3 },
      expected: [1, 2, 3],
      isHidden: true,
    },
    {
      id: "hidden-negatives",
      description: "Handles negative numbers",
      input: { nums: [-1, -1, -2, -2, -2, 3], k: 2 },
      expected: [-2, -1],
      isHidden: true,
    },
    {
      id: "hidden-top-3",
      description: "Returns top 3 from varied frequencies",
      input: { nums: [5, 5, 5, 5, 3, 3, 3, 1, 1, 7], k: 3 },
      expected: [1, 3, 5],
      isHidden: true,
    },
  ],
};
