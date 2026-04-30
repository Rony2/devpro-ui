export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "pair-sum",  category: "grind-75",
  title: "Pair Sum",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Hash Map", "Arrays"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find two numbers within an array of integers that add up to a target integer.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of integers \`nums\` and an integer \`target\`, return the **indices** of the two numbers such that they add up to \`target\`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice. Return the indices in ascending order.

Implement \`twoSum(nums, target)\`.

## Constraints

- \`2 ≤ nums.length ≤ 10000\`
- \`-1000000000 ≤ nums[i] ≤ 1000000000\`
- Exactly one valid pair exists.
- Return indices sorted ascending: \`[i, j]\` where \`i < j\`.
- Aim for $O(n)$ time using a hash map.

## Examples

\`\`\`js
twoSum([2, 7, 11, 15], 9);
// → [0, 1]  — nums[0] + nums[1] = 2 + 7 = 9

twoSum([3, 2, 4], 6);
// → [1, 2]  — nums[1] + nums[2] = 2 + 4 = 6

twoSum([3, 3], 6);
// → [0, 1]
\`\`\`

## Notes

- Use a hash map to store each number's index as you iterate. For each element, check if the complement (\`target - nums[i]\`) exists in the map.
- Single-pass $O(n)$ solution.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}
\`\`\`

</details>

## Resources

- [Two Sum — LeetCode](https://leetcode.com/problems/two-sum/)
- [Hash Table — Wikipedia](https://en.wikipedia.org/wiki/Hash_table)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find two indices whose values add up to the target.
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @returns {number[]} Indices [i, j] where i < j
 */
function twoSum(nums, target) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return twoSum(input.nums, input.target);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic",
      description: "First two elements sum to target",
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1],
      isHidden: false,
    },
    {
      id: "middle-pair",
      description: "Pair in the middle of array",
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2],
      isHidden: false,
    },
    {
      id: "duplicates",
      description: "Duplicate values form the pair",
      input: { nums: [3, 3], target: 6 },
      expected: [0, 1],
      isHidden: false,
    },
    {
      id: "hidden-negatives",
      description: "Negative numbers",
      input: { nums: [-3, 4, 3, 90], target: 0 },
      expected: [0, 2],
      isHidden: true,
    },
    {
      id: "hidden-large",
      description: "Large values",
      input: { nums: [1000000000, -1000000000, 3, 7], target: 0 },
      expected: [0, 1],
      isHidden: true,
    },
    {
      id: "hidden-last-pair",
      description: "Pair at the end of array",
      input: { nums: [1, 5, 8, 3, 9, 2], target: 11 },
      expected: [2, 4],
      isHidden: true,
    },
  ],
};
