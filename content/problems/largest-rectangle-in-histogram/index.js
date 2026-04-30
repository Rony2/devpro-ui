export const problem = {
  slug: "largest-rectangle-in-histogram",  category: "grind-75",
  title: "Largest Rectangle in Histogram",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Stack", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description: "Find the area of the largest rectangle in a histogram.",

  problemMdx: `## Overview

Given an array of integers \`heights\` representing a histogram where each bar has width 1, find the area of the **largest rectangle** in the histogram.

## Constraints

- \`1 <= heights.length <= 100,000\`
- \`0 <= heights[i] <= 10,000\`

## Examples

\`\`\`js
largestRectangleArea([2, 1, 5, 6, 2, 3]); // => 10 (bars 5,6 → 5×2)
largestRectangleArea([2, 4]);              // => 4
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}
\`\`\`

Monotonic stack: maintain ascending heights. On pop, compute the rectangle using the popped height and the width to the new stack top.

</details>

## Resources

- [Largest Rectangle in Histogram — LeetCode](https://leetcode.com/problems/largest-rectangle-in-histogram/)`,

  starterCode: `/**
 * Find the largest rectangle area in a histogram.
 * @param {number[]} heights
 * @returns {number}
 */
function largestRectangleArea(heights) {
  // your implementation
}`,

  solution: `function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`,

  harness: `function solve(input) { return largestRectangleArea(input.heights); }`,

  tests: [
    { id: "basic", description: "[2,1,5,6,2,3] → 10", input: { heights: [2,1,5,6,2,3] }, expected: 10, isHidden: false },
    { id: "two", description: "[2,4] → 4", input: { heights: [2,4] }, expected: 4, isHidden: false },
    { id: "uniform", description: "All same height", input: { heights: [3,3,3,3] }, expected: 12, isHidden: false },
    { id: "single", description: "Single bar", input: { heights: [5] }, expected: 5, isHidden: true },
    { id: "descending", description: "Descending", input: { heights: [5,4,3,2,1] }, expected: 9, isHidden: true },
    { id: "ascending", description: "Ascending", input: { heights: [1,2,3,4,5] }, expected: 9, isHidden: true },
  ],
};
