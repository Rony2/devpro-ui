export const problem = {
  slug: "combinations-for-target-sum",  category: "grind-75",
  title: "Combinations for Target Sum",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Backtracking", "Dynamic Programming"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to count combinations that sum to the target.",

  problemMdx: `## Overview

Given an array of distinct positive integers \`candidates\` and a target integer \`target\`, return the **number of possible combinations** that add up to \`target\`.

Each number in \`candidates\` may be used an **unlimited number of times**. Two combinations are different if the sequence of numbers differs (order matters).

## Constraints

- \`1 <= candidates.length <= 200\`
- \`1 <= candidates[i] <= 1000\`
- All elements of \`candidates\` are distinct.
- \`1 <= target <= 1000\`

## Examples

\`\`\`js
combinationSum([1, 2, 3], 4);
// => 7
// The combinations are:
// (1,1,1,1), (1,1,2), (1,2,1), (1,3),
// (2,1,1), (2,2), (3,1)
\`\`\`

\`\`\`js
combinationSum([9], 3);
// => 0  (no way to reach 3 with only 9s)

combinationSum([2, 3], 5);
// => 3  (2+3, 3+2, 2+2+... no, just: 2+3, 3+2, 2+2 won't work... => 2+3, 3+2 = 2 ... wait)
// Actually: (2,3), (3,2) = 2... let me recalc
// Actually for target 5 with [2,3]: 2+3=5, 3+2=5 => 2
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function combinationSum(candidates, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const c of candidates) {
      if (c <= i) dp[i] += dp[i - c];
    }
  }
  return dp[target];
}
\`\`\`

This is a bottom-up DP where \`dp[i]\` counts the number of ordered combinations summing to \`i\`. For each amount, we try adding each candidate.

</details>

## Resources

- [Combination Sum IV — LeetCode](https://leetcode.com/problems/combination-sum-iv/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  starterCode: `/**
 * Count the number of combinations that sum to the target.
 * Each candidate can be used unlimited times. Order matters.
 * @param {number[]} candidates
 * @param {number} target
 * @returns {number}
 */
function combinationSum(candidates, target) {
  // your implementation
}`,

  solution: `function combinationSum(candidates, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const c of candidates) {
      if (c <= i) dp[i] += dp[i - c];
    }
  }
  return dp[target];
}`,

  harness: `
function solve(input) {
  return combinationSum(input.candidates, input.target);
}`,

  tests: [
    {
      id: "basic",
      description: "3 candidates summing to 4",
      input: { candidates: [1, 2, 3], target: 4 },
      expected: 7,
      isHidden: false,
    },
    {
      id: "impossible",
      description: "No way to reach target",
      input: { candidates: [9], target: 3 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "single-way",
      description: "Only one combination possible",
      input: { candidates: [5], target: 5 },
      expected: 1,
      isHidden: false,
    },
    {
      id: "two-candidates",
      description: "Two candidates for target 5",
      input: { candidates: [2, 3], target: 5 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "target-one",
      description: "Target is 1",
      input: { candidates: [1, 2, 3], target: 1 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "larger",
      description: "Larger target with multiple candidates",
      input: { candidates: [1, 2, 5], target: 5 },
      expected: 9,
      isHidden: true,
    },
  ],
};
