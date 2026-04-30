export const problem = {
  slug: "longest-increasing-subsequence",  category: "grind-75",
  title: "Longest Increasing Subsequence",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Arrays"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the length of the longest increasing subsequence.",

  problemMdx: `## Overview

Given an integer array \`nums\`, return the length of the **longest strictly increasing subsequence**.

A subsequence is derived from the array by deleting some or no elements without changing the relative order of the remaining elements.

## Constraints

- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\`
- Aim for O(n log n) but O(n²) DP is acceptable.

## Examples

\`\`\`js
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]);
// => 4  (subsequence: [2, 3, 7, 101])
\`\`\`

\`\`\`js
lengthOfLIS([0, 1, 0, 3, 2, 3]);
// => 4  (subsequence: [0, 1, 2, 3])

lengthOfLIS([7, 7, 7, 7]);
// => 1  (all equal — strictly increasing means length 1)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }

  return tails.length;
}
\`\`\`

The patience sorting approach: maintain an array \`tails\` where \`tails[i]\` is the smallest tail element for an increasing subsequence of length \`i+1\`. Binary search for the insertion point of each element. O(n log n).

</details>

## Resources

- [Longest Increasing Subsequence — LeetCode](https://leetcode.com/problems/longest-increasing-subsequence/)
- [Patience Sorting — Wikipedia](https://en.wikipedia.org/wiki/Patience_sorting)`,

  starterCode: `/**
 * Find the length of the longest strictly increasing subsequence.
 * @param {number[]} nums
 * @returns {number}
 */
function lengthOfLIS(nums) {
  // your implementation
}`,

  solution: `function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;
  }

  return tails.length;
}`,

  harness: `
function solve(input) {
  return lengthOfLIS(input.nums);
}`,

  tests: [
    {
      id: "basic",
      description: "Classic example [10,9,2,5,3,7,101,18]",
      input: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "with-zeros",
      description: "Sequence [0,1,0,3,2,3]",
      input: { nums: [0, 1, 0, 3, 2, 3] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "all-equal",
      description: "All equal elements",
      input: { nums: [7, 7, 7, 7] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "single",
      description: "Single element",
      input: { nums: [5] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "decreasing",
      description: "Strictly decreasing",
      input: { nums: [5, 4, 3, 2, 1] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "increasing",
      description: "Already sorted ascending",
      input: { nums: [1, 2, 3, 4, 5, 6] },
      expected: 6,
      isHidden: true,
    },
  ],
};
