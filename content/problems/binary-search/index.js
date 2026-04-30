export const problem = {
  slug: "binary-search",  category: "grind-75",
  title: "Binary Search",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Binary Search", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to search for a target in a sorted array using binary search.",

  problemMdx: `## Overview

Given a sorted (ascending) array of integers \`nums\` and a target value \`target\`, return the index of \`target\` if found. Otherwise return \`-1\`.

## Constraints

- \`1 <= nums.length <= 10,000\`
- All values in \`nums\` are unique and sorted in ascending order.
- \`-10,000 <= nums[i], target <= 10,000\`
- Must run in O(log n) time.

## Examples

\`\`\`js
search([-1, 0, 3, 5, 9, 12], 9);
// => 4

search([-1, 0, 3, 5, 9, 12], 2);
// => -1
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
\`\`\`

</details>

## Resources

- [Binary Search — LeetCode](https://leetcode.com/problems/binary-search/)
- [Binary Search — Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)`,

  starterCode: `/**
 * Search for target in a sorted array.
 * @param {number[]} nums
 * @param {number} target
 * @returns {number}
 */
function search(nums, target) {
  // your implementation
}`,

  solution: `function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,

  harness: `function solve(input) { return search(input.nums, input.target); }`,

  tests: [
    { id: "found", description: "Target exists in array", input: { nums: [-1,0,3,5,9,12], target: 9 }, expected: 4, isHidden: false },
    { id: "not-found", description: "Target not in array", input: { nums: [-1,0,3,5,9,12], target: 2 }, expected: -1, isHidden: false },
    { id: "first", description: "Target is first element", input: { nums: [1,2,3,4,5], target: 1 }, expected: 0, isHidden: false },
    { id: "last", description: "Target is last element", input: { nums: [1,2,3,4,5], target: 5 }, expected: 4, isHidden: true },
    { id: "single", description: "Single element found", input: { nums: [5], target: 5 }, expected: 0, isHidden: true },
    { id: "single-miss", description: "Single element not found", input: { nums: [5], target: 3 }, expected: -1, isHidden: true },
  ],
};
