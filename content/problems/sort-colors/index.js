export const problem = {
  slug: "sort-colors",  category: "grind-75",
  title: "Sort Colors",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Two Pointers", "Arrays", "Sorting"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to sort an array of 0s, 1s, and 2s in-place (Dutch National Flag).",

  problemMdx: `## Overview

Given an array \`nums\` containing only \`0\`, \`1\`, and \`2\`, sort it **in-place** so that objects of the same color are adjacent (0s, then 1s, then 2s). Do not use the library sort function.

This is the **Dutch National Flag** problem.

## Constraints

- \`1 <= nums.length <= 300\`
- \`nums[i]\` is 0, 1, or 2.
- One-pass with O(1) extra space.

## Examples

\`\`\`js
sortColors([2,0,2,1,1,0]);
// => [0,0,1,1,2,2]

sortColors([2,0,1]);
// => [0,1,2]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
  return nums;
}
\`\`\`

</details>

## Resources

- [Sort Colors — LeetCode](https://leetcode.com/problems/sort-colors/)
- [Dutch National Flag — Wikipedia](https://en.wikipedia.org/wiki/Dutch_national_flag_problem)`,

  starterCode: `/**
 * Sort array of 0s, 1s, and 2s in-place.
 * @param {number[]} nums
 * @returns {number[]}
 */
function sortColors(nums) {
  // your implementation
}`,

  solution: `function sortColors(nums) {
  let lo = 0, mid = 0, hi = nums.length - 1;
  while (mid <= hi) {
    if (nums[mid] === 0) { [nums[lo], nums[mid]] = [nums[mid], nums[lo]]; lo++; mid++; }
    else if (nums[mid] === 1) mid++;
    else { [nums[mid], nums[hi]] = [nums[hi], nums[mid]]; hi--; }
  }
  return nums;
}`,

  harness: `function solve(input) { return sortColors([...input.nums]); }`,

  tests: [
    { id: "basic", description: "[2,0,2,1,1,0] → sorted", input: { nums: [2,0,2,1,1,0] }, expected: [0,0,1,1,2,2], isHidden: false },
    { id: "three", description: "[2,0,1]", input: { nums: [2,0,1] }, expected: [0,1,2], isHidden: false },
    { id: "already-sorted", description: "Already sorted", input: { nums: [0,1,2] }, expected: [0,1,2], isHidden: false },
    { id: "all-same", description: "All same value", input: { nums: [1,1,1] }, expected: [1,1,1], isHidden: true },
    { id: "reversed", description: "Reverse sorted", input: { nums: [2,1,0] }, expected: [0,1,2], isHidden: true },
    { id: "single", description: "Single element", input: { nums: [0] }, expected: [0], isHidden: true },
  ],
};
