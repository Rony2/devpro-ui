export const problem = {
  slug: "matrix-spiral-traversal",  category: "grind-75",
  title: "Matrix Spiral Traversal",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Matrix", "Arrays"],
  companies: ["Google", "Meta", "Shopify"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to traverse the matrix in spiral order.",

  problemMdx: `## Overview

Given an \`m × n\` matrix, return all elements in **spiral order** — starting from the top-left, moving right, then down, then left, then up, and repeating inward.

## Constraints

- \`1 <= m, n <= 10\`
- \`-100 <= matrix[i][j] <= 100\`
- Return a flat array of all elements in spiral order.

## Examples

\`\`\`js
spiralOrder([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);
// => [1, 2, 3, 6, 9, 8, 7, 4, 5]
\`\`\`

\`\`\`js
spiralOrder([
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]);
// => [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;

    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
}
\`\`\`

Use four boundary pointers (\`top\`, \`bottom\`, \`left\`, \`right\`) and shrink them after each pass.

</details>

## Resources

- [Spiral Matrix — LeetCode](https://leetcode.com/problems/spiral-matrix/)
- [Matrix Traversal Patterns](https://en.wikipedia.org/wiki/Matrix_(mathematics))`,

  starterCode: `/**
 * Return all elements of the matrix in spiral order.
 * @param {number[][]} matrix
 * @returns {number[]}
 */
function spiralOrder(matrix) {
  // your implementation
}`,

  solution: `function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;

    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;

    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }

    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }

  return result;
}`,

  harness: `
function solve(input) {
  return spiralOrder(input.matrix);
}`,

  tests: [
    {
      id: "3x3",
      description: "3×3 matrix spiral",
      input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
      expected: [1,2,3,6,9,8,7,4,5],
      isHidden: false,
    },
    {
      id: "3x4",
      description: "3×4 matrix spiral",
      input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
      expected: [1,2,3,4,8,12,11,10,9,5,6,7],
      isHidden: false,
    },
    {
      id: "1x1",
      description: "Single element",
      input: { matrix: [[1]] },
      expected: [1],
      isHidden: false,
    },
    {
      id: "single-row",
      description: "Single row",
      input: { matrix: [[1,2,3,4]] },
      expected: [1,2,3,4],
      isHidden: true,
    },
    {
      id: "single-col",
      description: "Single column",
      input: { matrix: [[1],[2],[3]] },
      expected: [1,2,3],
      isHidden: true,
    },
    {
      id: "2x2",
      description: "2×2 matrix",
      input: { matrix: [[1,2],[3,4]] },
      expected: [1,2,4,3],
      isHidden: true,
    },
  ],
};
