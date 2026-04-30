export const problem = {
  slug: "matrix-rotation",  category: "grind-75",
  title: "Matrix Rotation",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Matrix", "Arrays"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to rotate the given matrix by 90 degrees.",

  problemMdx: `## Overview

Given an \`n × n\` 2D matrix, rotate it **90 degrees clockwise** in-place.

## Constraints

- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\`
- Modify the matrix in place — do not allocate another 2D matrix.

## Examples

\`\`\`js
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
rotate(matrix);
// matrix is now:
// [[7, 4, 1],
//  [8, 5, 2],
//  [9, 6, 3]]
\`\`\`

\`\`\`js
const matrix = [
  [1, 2],
  [3, 4]
];
rotate(matrix);
// [[3, 1],
//  [4, 2]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function rotate(matrix) {
  const n = matrix.length;

  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }

  return matrix;
}
\`\`\`

Transpose the matrix (swap across the diagonal), then reverse each row. Both operations together yield a 90° clockwise rotation.

</details>

## Resources

- [Rotate Image — LeetCode](https://leetcode.com/problems/rotate-image/)
- [Rotation Matrix — Wikipedia](https://en.wikipedia.org/wiki/Rotation_matrix)`,

  starterCode: `/**
 * Rotate an n×n matrix 90 degrees clockwise in place.
 * @param {number[][]} matrix
 * @returns {number[][]}
 */
function rotate(matrix) {
  // your implementation
}`,

  solution: `function rotate(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }

  return matrix;
}`,

  harness: `
function solve(input) {
  const m = input.matrix.map(r => [...r]);
  return rotate(m);
}`,

  tests: [
    {
      id: "3x3",
      description: "Rotate 3×3 matrix",
      input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
      expected: [[7,4,1],[8,5,2],[9,6,3]],
      isHidden: false,
    },
    {
      id: "2x2",
      description: "Rotate 2×2 matrix",
      input: { matrix: [[1,2],[3,4]] },
      expected: [[3,1],[4,2]],
      isHidden: false,
    },
    {
      id: "4x4",
      description: "Rotate 4×4 matrix",
      input: { matrix: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] },
      expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]],
      isHidden: false,
    },
    {
      id: "1x1",
      description: "Single element matrix",
      input: { matrix: [[42]] },
      expected: [[42]],
      isHidden: true,
    },
    {
      id: "negatives",
      description: "Matrix with negative values",
      input: { matrix: [[-1,-2],[-3,-4]] },
      expected: [[-3,-1],[-4,-2]],
      isHidden: true,
    },
    {
      id: "zeros",
      description: "Matrix of zeros",
      input: { matrix: [[0,0,0],[0,0,0],[0,0,0]] },
      expected: [[0,0,0],[0,0,0],[0,0,0]],
      isHidden: true,
    },
  ],
};
