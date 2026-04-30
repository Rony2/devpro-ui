export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "end-of-array-reachable",  category: "grind-75",
  title: "End of Array Reachable",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine if the end of the array is reachable.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of non-negative integers \`nums\`, you are initially positioned at the first index. Each element represents the **maximum jump length** from that position.

Determine if you can reach the last index.

Implement \`canReachEnd(nums)\`.

## Constraints

- Input is a non-empty array of non-negative integers.
- You start at index \`0\`.
- Each element \`nums[i]\` represents the maximum forward jump from index \`i\` (you can jump any distance from 1 to \`nums[i]\`).
- Aim for $O(n)$ time and $O(1)$ space — a greedy approach is optimal.

## Examples

\`\`\`js
canReachEnd([2, 3, 1, 1, 4]);  // true  — jump 1→2→3→4 or 1→3→4
canReachEnd([3, 2, 1, 0, 4]);  // false — stuck at index 3
canReachEnd([0]);               // true  — already at the end
canReachEnd([2, 0, 0]);        // true  — jump directly from 0 to 2
\`\`\`

## Notes

- **Greedy approach**: track the farthest index you can reach. Iterate through the array — at each position, update the farthest reachable index. If you ever land on an index beyond your reach, return \`false\`.
- At each index \`i\`, if \`i <= farthest\`, then \`farthest = max(farthest, i + nums[i])\`.
- If \`farthest >= nums.length - 1\`, return \`true\` early.
- This is a classic greedy problem that avoids the exponential cost of trying all jump combinations.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function canReachEnd(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return true;
}
\`\`\`

</details>

## Resources

- [Jump Game — LeetCode](https://leetcode.com/problems/jump-game/)
- [Greedy Algorithms — Wikipedia](https://en.wikipedia.org/wiki/Greedy_algorithm)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Determine if you can reach the last index of the array.
 *
 * @param {number[]} nums - Array of non-negative integers (max jump length at each position)
 * @returns {boolean} True if the last index is reachable
 */
function canReachEnd(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function canReachEnd(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false;
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return true;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return canReachEnd(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "reachable",
      description: "Can reach end with multiple paths",
      input: { nums: [2, 3, 1, 1, 4] },
      expected: true,
      isHidden: false,
    },
    {
      id: "stuck-at-zero",
      description: "Stuck at a zero — cannot proceed",
      input: { nums: [3, 2, 1, 0, 4] },
      expected: false,
      isHidden: false,
    },
    {
      id: "single-element",
      description: "Single element — already at the end",
      input: { nums: [0] },
      expected: true,
      isHidden: false,
    },
    {
      id: "hidden-just-enough",
      description: "Jump exactly reaches the end",
      input: { nums: [2, 0, 0] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-all-ones",
      description: "All ones — step by step to the end",
      input: { nums: [1, 1, 1, 1, 1] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-large-first-jump",
      description: "First element covers entire array",
      input: { nums: [10, 0, 0, 0, 0, 0, 1] },
      expected: true,
      isHidden: true,
    },
  ],
};
