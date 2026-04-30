export const problem = {
  slug: "matrix-zeroing",  category: "grind-75",
  title: "Matrix Zeroing",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Matrix", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to set matrix rows and columns to zero.",

  problemMdx: `## Overview

Given an \`m × n\` integer matrix, if an element is **0**, set its entire row and column to 0. Do it **in place**.

## Constraints

- \`1 <= m, n <= 200\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\`
- Use O(1) extra space (use the first row/column as markers).

## Examples

\`\`\`js
setZeroes([
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
]);
// => [[1,0,1],[0,0,0],[1,0,1]]
\`\`\`

\`\`\`js
setZeroes([
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5]
]);
// => [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false, firstColZero = false;

  for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;
  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
  if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;

  return matrix;
}
\`\`\`

Use the first row and first column as markers. Track whether they themselves need zeroing with two booleans. O(1) extra space.

</details>

## Resources

- [Set Matrix Zeroes — LeetCode](https://leetcode.com/problems/set-matrix-zeroes/)
- [In-place Algorithm — Wikipedia](https://en.wikipedia.org/wiki/In-place_algorithm)`,

  starterCode: `/**
 * Set entire row and column to 0 for every cell that is 0.
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function setZeroes(matrix) {
  // your implementation
}`,

  solution: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowZero = false, firstColZero = false;

  for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowZero = true;
  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColZero = true;

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  if (firstRowZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
  if (firstColZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;

  return matrix;
}`,

  harness: `
function solve(input) {
  const m = input.matrix.map(r => [...r]);
  return setZeroes(m);
}`,

  tests: [
    {
      id: "center-zero",
      description: "Zero in center of 3×3",
      input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
      expected: [[1,0,1],[0,0,0],[1,0,1]],
      isHidden: false,
    },
    {
      id: "corners",
      description: "Zeros in corners of 3×4",
      input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] },
      expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]],
      isHidden: false,
    },
    {
      id: "no-zeros",
      description: "No zeros — unchanged",
      input: { matrix: [[1,2],[3,4]] },
      expected: [[1,2],[3,4]],
      isHidden: false,
    },
    {
      id: "all-zeros",
      description: "Already all zeros",
      input: { matrix: [[0,0],[0,0]] },
      expected: [[0,0],[0,0]],
      isHidden: true,
    },
    {
      id: "single-row",
      description: "Single row with a zero",
      input: { matrix: [[1,0,3]] },
      expected: [[0,0,0]],
      isHidden: true,
    },
    {
      id: "single-col",
      description: "Single column with a zero",
      input: { matrix: [[1],[0],[3]] },
      expected: [[0],[0],[0]],
      isHidden: true,
    },
  ],
};
