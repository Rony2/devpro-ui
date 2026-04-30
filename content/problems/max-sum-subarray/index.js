export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "max-sum-subarray",  category: "grind-75",
  title: "Maximum Sum in Contiguous Array",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Stripe"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the subarray with the maximum sum.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum, and return that sum.

Implement \`maxSubarraySum(nums)\`.

This is the classic **Kadane's algorithm** problem — a foundational dynamic programming pattern used in financial analysis, signal processing, and performance optimization.

## Constraints

- Input is a non-empty array of integers (may include negatives).
- The subarray must be contiguous and contain at least one element.
- Aim for $O(n)$ time and $O(1)$ extra space.
- Do not use brute-force $O(n^2)$ or $O(n^3)$ approaches.

## Examples

\`\`\`js
maxSubarraySum([-2, 1, -3, 4, -1, 2, 1, -5, 4]);  // 6  — subarray [4, -1, 2, 1]
maxSubarraySum([1]);                                 // 1
maxSubarraySum([5, 4, -1, 7, 8]);                    // 23 — entire array
maxSubarraySum([-1, -2, -3]);                        // -1 — least negative
\`\`\`

## Notes

- Kadane's insight: at each position, either extend the current subarray or start fresh. Track the running sum and reset to the current element when the running sum drops below it.
- The global answer is the maximum running sum seen across all positions.
- Edge case: when all elements are negative, the answer is the maximum single element (the least negative).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxSubarraySum(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
\`\`\`

</details>

## Resources

- [Maximum Subarray — LeetCode](https://leetcode.com/problems/maximum-subarray/)
- [Kadane's Algorithm — Wikipedia](https://en.wikipedia.org/wiki/Maximum_subarray_problem)
- [Dynamic Programming Patterns](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the contiguous subarray with the maximum sum.
 *
 * @param {number[]} nums - Non-empty array of integers
 * @returns {number} The maximum sum of any contiguous subarray
 */
function maxSubarraySum(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function maxSubarraySum(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return maxSubarraySum(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "classic-kadane",
      description: "Classic mixed-sign array",
      input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      expected: 6,
      isHidden: false,
    },
    {
      id: "all-positive",
      description: "All positive — entire array is the answer",
      input: { nums: [5, 4, -1, 7, 8] },
      expected: 23,
      isHidden: false,
    },
    {
      id: "single-element",
      description: "Single element array",
      input: { nums: [1] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "hidden-all-negative",
      description: "All negative — returns the least negative",
      input: { nums: [-1, -2, -3] },
      expected: -1,
      isHidden: true,
    },
    {
      id: "hidden-alternating",
      description: "Alternating positive and negative",
      input: { nums: [3, -1, 4, -1, 5, -9, 2, 6] },
      expected: 10,
      isHidden: true,
    },
    {
      id: "hidden-large-negative-then-positive",
      description: "Large negative followed by positives",
      input: { nums: [-100, 1, 2, 3, 4] },
      expected: 10,
      isHidden: true,
    },
  ],
};
