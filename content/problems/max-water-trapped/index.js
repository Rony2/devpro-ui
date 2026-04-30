export const problem = {
  slug: "max-water-trapped",  category: "grind-75",
  title: "Maximum Water Trapped Between Walls",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Two Pointers", "Arrays"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the maximum water volume between two walls in an array of walls.",

  problemMdx: `## Overview

Given \`n\` non-negative integers representing wall heights where the width of each wall is 1, find two walls that together with the x-axis form a container that holds the **most water**.

Return the maximum amount of water the container can store.

## Constraints

- \`2 <= height.length <= 100,000\`
- \`0 <= height[i] <= 10,000\`
- Must run in O(n) time.
- You may not slant the container.

## Examples

\`\`\`js
maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
// => 49  (walls at index 1 and 8: min(8,7) * 7 = 49)
\`\`\`

\`\`\`js
maxArea([1, 1]);
// => 1

maxArea([4, 3, 2, 1, 4]);
// => 16  (walls at index 0 and 4: min(4,4) * 4 = 16)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return max;
}
\`\`\`

Two pointers start at opposite ends. The area is limited by the shorter wall, so move the shorter pointer inward. O(n) time, O(1) space.

</details>

## Resources

- [Container With Most Water — LeetCode](https://leetcode.com/problems/container-with-most-water/)
- [Two Pointer Technique — GeeksforGeeks](https://www.geeksforgeeks.org/two-pointers-technique/)`,

  starterCode: `/**
 * Find the maximum water volume between two walls.
 * @param {number[]} height
 * @returns {number}
 */
function maxArea(height) {
  // your implementation
}`,

  solution: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let max = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    max = Math.max(max, area);

    if (height[left] < height[right]) left++;
    else right--;
  }

  return max;
}`,

  harness: `
function solve(input) {
  return maxArea(input.height);
}`,

  tests: [
    {
      id: "basic",
      description: "Classic example → 49",
      input: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
      expected: 49,
      isHidden: false,
    },
    {
      id: "min-case",
      description: "Two walls [1,1] → 1",
      input: { height: [1, 1] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "symmetric",
      description: "Symmetric with tall ends",
      input: { height: [4, 3, 2, 1, 4] },
      expected: 16,
      isHidden: false,
    },
    {
      id: "ascending",
      description: "Ascending heights",
      input: { height: [1, 2, 3, 4, 5] },
      expected: 6,
      isHidden: true,
    },
    {
      id: "descending",
      description: "Descending heights",
      input: { height: [5, 4, 3, 2, 1] },
      expected: 6,
      isHidden: true,
    },
    {
      id: "all-same",
      description: "All equal heights",
      input: { height: [3, 3, 3, 3, 3] },
      expected: 12,
      isHidden: true,
    },
  ],
};
