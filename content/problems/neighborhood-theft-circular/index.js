export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "neighborhood-theft-circular",  category: "grind-75",
  title: "Neighborhood Theft (Circular)",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find maximum money to rob in circular houses without alerting police.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

This is the circular variant of the classic house robber problem. All houses are arranged in a **circle**, meaning the first house is adjacent to the last house. You cannot rob two adjacent houses, and because of the circular arrangement, you cannot rob both the first and last houses.

Given an array \`nums\` representing the amount of money in each house, return the **maximum amount** you can rob without alerting the police.

Implement \`robCircular(nums)\`.

## Constraints

- \`1 ≤ nums.length ≤ 100\`
- \`0 ≤ nums[i] ≤ 1000\`
- House 0 and house n-1 are adjacent (circular).
- You cannot rob two adjacent houses.
- Aim for $O(n)$ time, $O(1)$ space.

## Examples

\`\`\`js
robCircular([2, 3, 2]);
// → 3  — cannot rob house 0 and house 2 (adjacent in circle), so rob house 1

robCircular([1, 2, 3, 1]);
// → 4  — rob house 0 (1) + house 2 (3)

robCircular([1, 2, 3]);
// → 3  — rob house 2 only
\`\`\`

## Notes

- Key insight: since house 0 and house n-1 are adjacent, you can never rob both. So the answer is \`max(rob(houses[0..n-2]), rob(houses[1..n-1]))\` — run the linear house robber on two sub-ranges and take the max.
- Reuse the linear DP from the non-circular version as a helper.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function robCircular(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function robLinear(arr, lo, hi) {
    let prev2 = 0, prev1 = 0;
    for (let i = lo; i <= hi; i++) {
      const curr = Math.max(prev1, prev2 + arr[i]);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  return Math.max(
    robLinear(nums, 0, nums.length - 2),
    robLinear(nums, 1, nums.length - 1)
  );
}
\`\`\`

</details>

## Resources

- [House Robber II — LeetCode](https://leetcode.com/problems/house-robber-ii/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the maximum money you can rob in a circular neighborhood
 * without robbing two adjacent houses.
 *
 * @param {number[]} nums - Amount of money in each house (circular)
 * @returns {number} Maximum money you can rob
 */
function robCircular(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function robCircular(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function robLinear(arr, lo, hi) {
    let prev2 = 0, prev1 = 0;
    for (let i = lo; i <= hi; i++) {
      const curr = Math.max(prev1, prev2 + arr[i]);
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }

  return Math.max(
    robLinear(nums, 0, nums.length - 2),
    robLinear(nums, 1, nums.length - 1)
  );
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return robCircular(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "three-houses",
      description: "Three houses in circle — pick middle",
      input: { nums: [2, 3, 2] },
      expected: 3,
      isHidden: false,
    },
    {
      id: "four-houses",
      description: "Four houses — rob first and third",
      input: { nums: [1, 2, 3, 1] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "pick-last",
      description: "Best to pick last house only",
      input: { nums: [1, 2, 3] },
      expected: 3,
      isHidden: false,
    },
    {
      id: "hidden-single",
      description: "Single house",
      input: { nums: [50] },
      expected: 50,
      isHidden: true,
    },
    {
      id: "hidden-two",
      description: "Two houses — pick the larger",
      input: { nums: [10, 20] },
      expected: 20,
      isHidden: true,
    },
    {
      id: "hidden-longer",
      description: "Longer circular array",
      input: { nums: [6, 6, 4, 8, 4, 3, 3, 10] },
      expected: 27,
      isHidden: true,
    },
  ],
};
