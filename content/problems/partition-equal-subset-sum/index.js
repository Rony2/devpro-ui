export const problem = {
  slug: "partition-equal-subset-sum",  category: "grind-75",
  title: "Partition Equal Subset Sum",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to determine if an array can be partitioned into two subsets with equal sum.",

  problemMdx: `## Overview

Given an integer array \`nums\`, return \`true\` if you can partition it into two subsets with **equal sum**.

## Constraints

- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\`

## Examples

\`\`\`js
canPartition([1, 5, 11, 5]); // => true  ([1,5,5] and [11])
canPartition([1, 2, 3, 5]);  // => false
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Set([0]);
  for (const num of nums) {
    const next = new Set(dp);
    for (const s of dp) {
      if (s + num === target) return true;
      next.add(s + num);
    }
    dp.clear();
    for (const v of next) dp.add(v);
  }
  return dp.has(target);
}
\`\`\`

</details>

## Resources

- [Partition Equal Subset Sum — LeetCode](https://leetcode.com/problems/partition-equal-subset-sum/)`,

  starterCode: `/**
 * Can the array be partitioned into two equal-sum subsets?
 * @param {number[]} nums
 * @returns {boolean}
 */
function canPartition(nums) {
  // your implementation
}`,

  solution: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;
  const target = total / 2;
  const dp = new Set([0]);
  for (const num of nums) {
    const next = new Set(dp);
    for (const s of dp) { next.add(s + num); }
    dp.clear();
    for (const v of next) dp.add(v);
  }
  return dp.has(target);
}`,

  harness: `function solve(input) { return canPartition(input.nums); }`,

  tests: [
    { id: "true", description: "[1,5,11,5] → true", input: { nums: [1,5,11,5] }, expected: true, isHidden: false },
    { id: "false", description: "[1,2,3,5] → false", input: { nums: [1,2,3,5] }, expected: false, isHidden: false },
    { id: "two-equal", description: "[1,1]", input: { nums: [1,1] }, expected: true, isHidden: false },
    { id: "single", description: "Single element", input: { nums: [1] }, expected: false, isHidden: true },
    { id: "odd-sum", description: "Odd total sum", input: { nums: [1,2,4] }, expected: false, isHidden: true },
    { id: "larger", description: "Larger array", input: { nums: [1,2,3,4,5,6,7] }, expected: true, isHidden: true },
  ],
};
