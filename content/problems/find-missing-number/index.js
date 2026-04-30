export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "find-missing-number",  category: "grind-75",
  title: "Find Missing Number in Sequence",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the missing element in a sorted array.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array containing \`n\` distinct numbers taken from the range \`0\` to \`n\`, find the one number that is missing from the array.

Implement \`findMissing(nums)\`.

## Constraints

- Input is an array of \`n\` distinct integers in the range \`[0, n]\`.
- Exactly one number in the range is missing.
- The array is **not** necessarily sorted.
- Aim for $O(n)$ time and $O(1)$ extra space.

## Examples

\`\`\`js
findMissing([3, 0, 1]);          // 2
findMissing([0, 1]);             // 2
findMissing([9, 6, 4, 2, 3, 5, 7, 0, 1]);  // 8
findMissing([0]);                // 1
\`\`\`

## Notes

- The Gauss formula approach: the sum of \`0..n\` is \`n*(n+1)/2\`. Subtract the actual sum of the array to find the missing value.
- An XOR-based approach also works in $O(1)$ space: XOR all numbers \`0..n\` with all array values — the result is the missing number.
- Beware of overflow with very large arrays if using the sum approach (not a concern in JS with \`Number\`, but good to know).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function findMissing(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, v) => sum + v, 0);
  return expectedSum - actualSum;
}
\`\`\`

</details>

## Resources

- [Missing Number — LeetCode](https://leetcode.com/problems/missing-number/)
- [Gauss Summation Formula](https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the missing number in the range [0, n].
 *
 * @param {number[]} nums - Array of n distinct integers from range [0, n]
 * @returns {number} The missing number
 */
function findMissing(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function findMissing(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((sum, v) => sum + v, 0);
  return expectedSum - actualSum;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return findMissing(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "missing-middle",
      description: "Missing number in the middle",
      input: { nums: [3, 0, 1] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "missing-end",
      description: "Missing number at the end",
      input: { nums: [0, 1] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "larger-array",
      description: "Larger array with missing value",
      input: { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] },
      expected: 8,
      isHidden: false,
    },
    {
      id: "hidden-missing-zero",
      description: "Zero is the missing number",
      input: { nums: [1, 2, 3] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "hidden-single-element",
      description: "Single-element array",
      input: { nums: [0] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-large-range",
      description: "Larger range missing one value",
      input: { nums: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10] },
      expected: 8,
      isHidden: true,
    },
  ],
};
