export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "triplet-sum",  category: "grind-75",
  title: "Triplet Sum",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Two Pointers", "Sorting", "Arrays"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find all unique triplets with distinct indices that sum to 0.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an integer array \`nums\`, return all the **unique triplets** \`[nums[a], nums[b], nums[c]]\` such that \`a\`, \`b\`, and \`c\` are distinct indices and \`nums[a] + nums[b] + nums[c] === 0\`.

The solution set must not contain duplicate triplets. Return triplets sorted in ascending order, and the list of triplets sorted lexicographically.

Implement \`threeSum(nums)\`.

## Constraints

- \`3 ≤ nums.length ≤ 3000\`
- \`-100000 ≤ nums[i] ≤ 100000\`
- No duplicate triplets in the output.
- Aim for $O(n^2)$ time.

## Examples

\`\`\`js
threeSum([-1, 0, 1, 2, -1, -4]);
// → [[-1, -1, 2], [-1, 0, 1]]

threeSum([0, 1, 1]);
// → []  — no triplet sums to 0

threeSum([0, 0, 0]);
// → [[0, 0, 0]]
\`\`\`

## Notes

- Sort the array first. Fix one element and use two pointers on the remaining subarray to find pairs that sum to its negation.
- Skip duplicates at every level to avoid repeating triplets.
- Early termination: if the fixed element is positive, no further triplets can sum to 0.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        result.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
        lo++;
        hi--;
      }
    }
  }

  return result;
}
\`\`\`

</details>

## Resources

- [3Sum — LeetCode](https://leetcode.com/problems/3sum/)
- [Two-pointer technique — Wikipedia](https://en.wikipedia.org/wiki/Two-pointer_technique)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find all unique triplets that sum to zero.
 *
 * @param {number[]} nums - Array of integers
 * @returns {number[][]} Array of unique triplets [a, b, c] where a + b + c = 0
 */
function threeSum(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break;
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum < 0) lo++;
      else if (sum > 0) hi--;
      else {
        result.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++;
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--;
        lo++;
        hi--;
      }
    }
  }

  return result;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  const result = threeSum([...input.nums]);
  result.forEach(t => t.sort((a, b) => a - b));
  result.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
  return result;
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic",
      description: "Two triplets found",
      input: { nums: [-1, 0, 1, 2, -1, -4] },
      expected: [[-1, -1, 2], [-1, 0, 1]],
      isHidden: false,
    },
    {
      id: "no-triplet",
      description: "No triplet sums to 0",
      input: { nums: [0, 1, 1] },
      expected: [],
      isHidden: false,
    },
    {
      id: "all-zeros",
      description: "Three zeros",
      input: { nums: [0, 0, 0] },
      expected: [[0, 0, 0]],
      isHidden: false,
    },
    {
      id: "hidden-negatives",
      description: "All negative numbers — no triplet",
      input: { nums: [-5, -3, -1] },
      expected: [],
      isHidden: true,
    },
    {
      id: "hidden-multiple",
      description: "Multiple valid triplets with duplicates in input",
      input: { nums: [-2, 0, 0, 2, 2] },
      expected: [[-2, 0, 2]],
      isHidden: true,
    },
    {
      id: "hidden-larger",
      description: "Larger input with several triplets",
      input: { nums: [-4, -2, -1, 0, 1, 2, 3] },
      expected: [[-4, 1, 3], [-2, -1, 3], [-2, 0, 2], [-1, 0, 1]],
      isHidden: true,
    },
  ],
};
