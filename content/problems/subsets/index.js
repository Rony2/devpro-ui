export const problem = {
  slug: "subsets",  category: "grind-75",
  title: "Subsets",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Backtracking", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to generate all possible subsets (the power set) of an array.",

  problemMdx: `## Overview

Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set). No duplicate subsets.

## Constraints

- \`1 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
- All elements are unique.

## Examples

\`\`\`js
subsets([1, 2, 3]);
// => [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}
\`\`\`

</details>

## Resources

- [Subsets — LeetCode](https://leetcode.com/problems/subsets/)`,

  starterCode: `/**
 * Generate all subsets of an array of unique integers.
 * @param {number[]} nums
 * @returns {number[][]}
 */
function subsets(nums) {
  // your implementation
}`,

  solution: `function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,

  harness: `function solve(input) {
  const res = subsets(input.nums);
  return res.map(s => [...s].sort((a,b)=>a-b)).sort((a,b) => a.length-b.length || JSON.stringify(a).localeCompare(JSON.stringify(b)));
}`,

  tests: [
    { id: "three", description: "[1,2,3] → 8 subsets", input: { nums: [1,2,3] }, expected: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]], isHidden: false },
    { id: "single", description: "Single element", input: { nums: [0] }, expected: [[],[0]], isHidden: false },
    { id: "two", description: "Two elements", input: { nums: [1,2] }, expected: [[],[1],[2],[1,2]], isHidden: false },
    { id: "negative", description: "With negatives", input: { nums: [-1,0] }, expected: [[],[-1],[0],[-1,0]], isHidden: true },
    { id: "count-4", description: "4 elements → 16 subsets", input: { nums: [1,2,3,4] }, expected: [[],[1],[2],[3],[4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,2,3],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]], isHidden: true },
    { id: "single-neg", description: "Single negative", input: { nums: [-5] }, expected: [[],[-5]], isHidden: true },
  ],
};
