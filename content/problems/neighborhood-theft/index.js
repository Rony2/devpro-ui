export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "neighborhood-theft",  category: "grind-75",
  title: "Neighborhood Theft",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find maximum money to rob without alerting police.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing every house is that **adjacent houses have security systems connected** — if two adjacent houses are broken into on the same night, the police will be alerted.

Given an array \`nums\` representing the amount of money in each house, return the **maximum amount** you can rob without alerting the police (i.e., without robbing two adjacent houses).

Implement \`robHouses(nums)\`.

## Constraints

- \`0 ≤ nums.length ≤ 100\`
- \`0 ≤ nums[i] ≤ 400\`
- You cannot rob two adjacent houses.
- Aim for $O(n)$ time, $O(1)$ space.

## Examples

\`\`\`js
robHouses([1, 2, 3, 1]);
// → 4  — rob house 0 (1) + house 2 (3)

robHouses([2, 7, 9, 3, 1]);
// → 12  — rob house 0 (2) + house 2 (9) + house 4 (1)

robHouses([2, 1, 1, 2]);
// → 4  — rob house 0 (2) + house 3 (2)
\`\`\`

## Notes

- Classic DP: at each house, decide to rob it (add its value to the max up to two houses back) or skip it (carry forward the max from the previous house).
- \`dp[i] = max(dp[i-1], dp[i-2] + nums[i])\`
- Only two variables needed — no array required.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function robHouses(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
\`\`\`

</details>

## Resources

- [House Robber — LeetCode](https://leetcode.com/problems/house-robber/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the maximum money you can rob without robbing two adjacent houses.
 *
 * @param {number[]} nums - Amount of money in each house
 * @returns {number} Maximum money you can rob
 */
function robHouses(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function robHouses(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return robHouses(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-skip",
      description: "Rob houses 0 and 2 for max",
      input: { nums: [1, 2, 3, 1] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "alternating",
      description: "Rob alternating houses",
      input: { nums: [2, 7, 9, 3, 1] },
      expected: 12,
      isHidden: false,
    },
    {
      id: "endpoints",
      description: "Rob first and last houses",
      input: { nums: [2, 1, 1, 2] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "hidden-empty",
      description: "No houses → 0",
      input: { nums: [] },
      expected: 0,
      isHidden: true,
    },
    {
      id: "hidden-single",
      description: "Single house",
      input: { nums: [42] },
      expected: 42,
      isHidden: true,
    },
    {
      id: "hidden-large-gap",
      description: "Large values with gaps",
      input: { nums: [100, 1, 1, 100, 1, 1, 100] },
      expected: 300,
      isHidden: true,
    },
  ],
};
