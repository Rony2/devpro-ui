export const problem = {
  slug: "trapping-rain-water",  category: "grind-75",
  title: "Trapping Rain Water",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Arrays", "Two Pointers", "Stack"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description: "Compute how much rainwater can be trapped between elevation bars.",

  problemMdx: `## Overview

Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

## Constraints

- \`n == height.length\`
- \`1 <= n <= 20,000\`
- \`0 <= height[i] <= 100,000\`

## Examples

\`\`\`js
trap([0,1,0,2,1,0,1,3,2,1,2,1]); // => 6
trap([4,2,0,3,2,5]);              // => 9
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
\`\`\`

Two-pointer approach: move the smaller side inward, accumulating water based on the running max.

</details>

## Resources

- [Trapping Rain Water — LeetCode](https://leetcode.com/problems/trapping-rain-water/)`,

  starterCode: `/**
 * Compute how much rainwater can be trapped.
 * @param {number[]} height
 * @returns {number}
 */
function trap(height) {
  // your implementation
}`,

  solution: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}`,

  harness: `function solve(input) { return trap(input.height); }`,

  tests: [
    { id: "basic", description: "Classic example → 6", input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, expected: 6, isHidden: false },
    { id: "v-shape", description: "[4,2,0,3,2,5] → 9", input: { height: [4,2,0,3,2,5] }, expected: 9, isHidden: false },
    { id: "flat", description: "Flat — no water", input: { height: [1,1,1,1] }, expected: 0, isHidden: false },
    { id: "ascending", description: "Ascending — no water", input: { height: [1,2,3,4,5] }, expected: 0, isHidden: true },
    { id: "descending", description: "Descending — no water", input: { height: [5,4,3,2,1] }, expected: 0, isHidden: true },
    { id: "single", description: "Single bar", input: { height: [5] }, expected: 0, isHidden: true },
  ],
};
