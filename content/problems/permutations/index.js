export const problem = {
  slug: "permutations",  category: "grind-75",
  title: "Permutations",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Backtracking", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to generate all permutations of an array of distinct integers.",

  problemMdx: `## Overview

Given an array \`nums\` of **distinct** integers, return all possible permutations in any order.

## Constraints

- \`1 <= nums.length <= 6\`
- \`-10 <= nums[i] <= 10\`
- All integers are unique.

## Examples

\`\`\`js
permute([1, 2, 3]);
// => [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

permute([1]);
// => [[1]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function permute(nums) {
  const result = [];
  function backtrack(path, used) {
    if (path.length === nums.length) { result.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return result;
}
\`\`\`

</details>

## Resources

- [Permutations — LeetCode](https://leetcode.com/problems/permutations/)`,

  starterCode: `/**
 * Return all permutations of distinct integers.
 * @param {number[]} nums
 * @returns {number[][]}
 */
function permute(nums) {
  // your implementation
}`,

  solution: `function permute(nums) {
  const result = [];
  function backtrack(path, used) {
    if (path.length === nums.length) { result.push([...path]); return; }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true; path.push(nums[i]);
      backtrack(path, used);
      path.pop(); used[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return result;
}`,

  harness: `function solve(input) {
  const res = permute(input.nums);
  return res.map(p => [...p]).sort((a,b) => { for (let i=0;i<a.length;i++) { if (a[i]!==b[i]) return a[i]-b[i]; } return 0; });
}`,

  tests: [
    { id: "three", description: "3 elements → 6 permutations", input: { nums: [1,2,3] }, expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]], isHidden: false },
    { id: "single", description: "Single element", input: { nums: [1] }, expected: [[1]], isHidden: false },
    { id: "two", description: "Two elements", input: { nums: [0,1] }, expected: [[0,1],[1,0]], isHidden: false },
    { id: "negative", description: "With negatives", input: { nums: [-1,0] }, expected: [[-1,0],[0,-1]], isHidden: true },
    { id: "four", description: "Four elements → 24 permutations", input: { nums: [1,2,3,4] }, expected: [[1,2,3,4],[1,2,4,3],[1,3,2,4],[1,3,4,2],[1,4,2,3],[1,4,3,2],[2,1,3,4],[2,1,4,3],[2,3,1,4],[2,3,4,1],[2,4,1,3],[2,4,3,1],[3,1,2,4],[3,1,4,2],[3,2,1,4],[3,2,4,1],[3,4,1,2],[3,4,2,1],[4,1,2,3],[4,1,3,2],[4,2,1,3],[4,2,3,1],[4,3,1,2],[4,3,2,1]], isHidden: true },
    { id: "zeros", description: "Includes zero", input: { nums: [0] }, expected: [[0]], isHidden: true },
  ],
};
