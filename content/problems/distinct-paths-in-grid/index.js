export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "distinct-paths-in-grid",  category: "grind-75",
  title: "Distinct Paths in Grid",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Data Structures"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to calculate distinct paths for a robot moving on an m x n grid.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

A robot is located at the top-left corner of an \`m × n\` grid. It can only move **right** or **down** at each step. Count the number of unique paths from the top-left to the bottom-right corner.

Implement \`uniquePaths(m, n)\`.

## Constraints

- \`1 ≤ m, n ≤ 100\`.
- The answer fits in a 32-bit integer.
- Aim for $O(m \\times n)$ time with $O(n)$ space using a rolling array.

## Examples

\`\`\`js
uniquePaths(3, 7);  // 28
uniquePaths(3, 2);  // 3
uniquePaths(1, 1);  // 1
uniquePaths(2, 2);  // 2
\`\`\`

## Notes

- **DP approach**: \`dp[i][j] = dp[i-1][j] + dp[i][j-1]\`. The first row and first column are all 1 (only one way to reach any cell on the edge).
- **Space optimization**: you only need the previous row, so a 1D array of size \`n\` suffices.
- **Math approach**: the answer is the binomial coefficient $\\binom{m+n-2}{m-1}$ — choosing which \`m-1\` of \`m+n-2\` steps are "down".

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}
\`\`\`

</details>

## Resources

- [Unique Paths — LeetCode](https://leetcode.com/problems/unique-paths/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Count distinct paths from top-left to bottom-right of an m × n grid.
 * The robot can only move right or down.
 *
 * @param {number} m - Number of rows
 * @param {number} n - Number of columns
 * @returns {number} Number of unique paths
 */
function uniquePaths(m, n) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return uniquePaths(input.m, input.n);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "3x7",
      description: "3×7 grid",
      input: { m: 3, n: 7 },
      expected: 28,
      isHidden: false,
    },
    {
      id: "3x2",
      description: "3×2 grid",
      input: { m: 3, n: 2 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "1x1",
      description: "1×1 grid — already at destination",
      input: { m: 1, n: 1 },
      expected: 1,
      isHidden: false,
    },
    {
      id: "hidden-2x2",
      description: "2×2 grid",
      input: { m: 2, n: 2 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "hidden-single-row",
      description: "Single row — only one path",
      input: { m: 1, n: 10 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-large",
      description: "Larger grid",
      input: { m: 10, n: 10 },
      expected: 48620,
      isHidden: true,
    },
  ],
};
