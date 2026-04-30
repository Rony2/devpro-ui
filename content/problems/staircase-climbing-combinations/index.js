export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "staircase-climbing-combinations",  category: "grind-75",
  title: "Staircase Climbing Combinations",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the number of ways to reach the top of a staircase.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can climb either **1 or 2 steps**. In how many distinct ways can you climb to the top?

Implement \`climbStairs(n)\`.

## Constraints

- \`1 ≤ n ≤ 45\`
- Return the count of distinct ways.
- Aim for $O(n)$ time, $O(1)$ space.

## Examples

\`\`\`js
climbStairs(2);
// → 2  — (1+1) or (2)

climbStairs(3);
// → 3  — (1+1+1), (1+2), (2+1)

climbStairs(5);
// → 8
\`\`\`

## Notes

- This is the Fibonacci sequence. To reach step \`n\`, you either came from step \`n-1\` (one step) or step \`n-2\` (two steps).
- \`ways(n) = ways(n-1) + ways(n-2)\` with base cases \`ways(1) = 1, ways(2) = 2\`.
- Use two variables instead of an array for $O(1)$ space.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
\`\`\`

</details>

## Resources

- [Climbing Stairs — LeetCode](https://leetcode.com/problems/climbing-stairs/)
- [Fibonacci Sequence — Wikipedia](https://en.wikipedia.org/wiki/Fibonacci_sequence)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the number of distinct ways to climb n stairs (1 or 2 steps at a time).
 *
 * @param {number} n - Number of steps
 * @returns {number} Number of distinct ways
 */
function climbStairs(n) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return climbStairs(input.n);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "two-steps",
      description: "2 steps → 2 ways",
      input: { n: 2 },
      expected: 2,
      isHidden: false,
    },
    {
      id: "three-steps",
      description: "3 steps → 3 ways",
      input: { n: 3 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "five-steps",
      description: "5 steps → 8 ways",
      input: { n: 5 },
      expected: 8,
      isHidden: false,
    },
    {
      id: "hidden-one",
      description: "1 step → 1 way",
      input: { n: 1 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-ten",
      description: "10 steps → 89 ways",
      input: { n: 10 },
      expected: 89,
      isHidden: true,
    },
    {
      id: "hidden-large",
      description: "Large n = 45",
      input: { n: 45 },
      expected: 1836311903,
      isHidden: true,
    },
  ],
};
