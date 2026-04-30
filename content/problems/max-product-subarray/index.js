export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "max-product-subarray",  category: "grind-75",
  title: "Maximum Product in Contiguous Array",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the subarray which has the largest product.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an integer array, find the contiguous subarray (containing at least one number) that has the largest product, and return that product.

Implement \`maxProduct(nums)\`.

## Constraints

- Input is a non-empty array of integers (may include negatives and zero).
- The subarray must be contiguous (consecutive elements).
- The subarray must contain at least one element.
- Aim for $O(n)$ time complexity.
- Values can be negative — two negatives make a positive, so tracking both the running max and running min is essential.

## Examples

\`\`\`js
maxProduct([2, 3, -2, 4]);     // 6  — subarray [2, 3]
maxProduct([-2, 0, -1]);       // 0  — subarray [0]
maxProduct([-2, 3, -4]);       // 24 — subarray [-2, 3, -4]
maxProduct([0, 2]);            // 2
maxProduct([-2]);              // -2
\`\`\`

## Notes

- This is a twist on the classic maximum subarray (Kadane's algorithm) — but you need to track both the current max **and** current min product at each step, because a negative value can flip a min into a max.
- At each element, the new max is the largest of: \`current * prevMax\`, \`current * prevMin\`, or \`current\` alone (start fresh).
- The global answer is the maximum of all per-step maxima.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxProduct(nums) {
  let globalMax = nums[0];
  let currentMax = nums[0];
  let currentMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    const candidates = [n, n * currentMax, n * currentMin];
    currentMax = Math.max(...candidates);
    currentMin = Math.min(...candidates);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}
\`\`\`

</details>

## Resources

- [Maximum Product Subarray — LeetCode](https://leetcode.com/problems/maximum-product-subarray/)
- [Kadane's Algorithm — Wikipedia](https://en.wikipedia.org/wiki/Maximum_subarray_problem)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the contiguous subarray with the largest product.
 *
 * @param {number[]} nums - Non-empty array of integers
 * @returns {number} The maximum product of any contiguous subarray
 */
function maxProduct(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function maxProduct(nums) {
  let globalMax = nums[0];
  let currentMax = nums[0];
  let currentMin = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];
    const candidates = [n, n * currentMax, n * currentMin];
    currentMax = Math.max(...candidates);
    currentMin = Math.min(...candidates);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return maxProduct(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "positive-and-negative",
      description: "Mixed positive and negative values",
      input: { nums: [2, 3, -2, 4] },
      expected: 6,
      isHidden: false,
    },
    {
      id: "all-negative-with-zero",
      description: "Negative values with zero",
      input: { nums: [-2, 0, -1] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "double-negative-flip",
      description: "Two negatives create a large positive product",
      input: { nums: [-2, 3, -4] },
      expected: 24,
      isHidden: false,
    },
    {
      id: "hidden-single-negative",
      description: "Single negative element",
      input: { nums: [-2] },
      expected: -2,
      isHidden: true,
    },
    {
      id: "hidden-zeros-in-middle",
      description: "Zeros break the chain",
      input: { nums: [-1, -2, -3, 0, 3, 5] },
      expected: 15,
      isHidden: true,
    },
    {
      id: "hidden-all-positive",
      description: "All positive — entire array is the answer",
      input: { nums: [1, 2, 3, 4] },
      expected: 24,
      isHidden: true,
    },
  ],
};
