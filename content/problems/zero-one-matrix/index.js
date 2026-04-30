export const problem = {
  slug: "zero-one-matrix",  category: "grind-75",
  title: "01 Matrix",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "BFS", "Matrix"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the distance of each cell to the nearest 0 in a binary matrix.",

  problemMdx: `## Overview

Given an \`m × n\` binary matrix \`mat\`, return a matrix where each cell contains the **distance to the nearest 0**. Distance is measured in terms of adjacent cells (up, down, left, right).

## Constraints

- \`1 <= m, n <= 10,000\`
- \`mat[i][j]\` is either 0 or 1.
- There is at least one 0 in the matrix.

## Examples

\`\`\`js
updateMatrix([[0,0,0],[0,1,0],[0,0,0]]);
// => [[0,0,0],[0,1,0],[0,0,0]]

updateMatrix([[0,0,0],[0,1,0],[1,1,1]]);
// => [[0,0,0],[0,1,0],[1,2,1]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
  const queue = [];
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (mat[i][j] === 0) { dist[i][j] = 0; queue.push([i, j]); }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let idx = 0;
  while (idx < queue.length) {
    const [r, c] = queue[idx++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}
\`\`\`

Multi-source BFS from all 0 cells simultaneously.

</details>

## Resources

- [01 Matrix — LeetCode](https://leetcode.com/problems/01-matrix/)`,

  starterCode: `/**
 * Find the distance of each cell to the nearest 0.
 * @param {number[][]} mat
 * @returns {number[][]}
 */
function updateMatrix(mat) {
  // your implementation
}`,

  solution: `function updateMatrix(mat) {
  const m = mat.length, n = mat[0].length;
  const dist = Array.from({length: m}, () => new Array(n).fill(Infinity));
  const queue = [];
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (mat[i][j] === 0) { dist[i][j] = 0; queue.push([i, j]); }
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let idx = 0;
  while (idx < queue.length) {
    const [r, c] = queue[idx++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] > dist[r][c] + 1) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }
  return dist;
}`,

  harness: `function solve(input) { return updateMatrix(input.mat); }`,

  tests: [
    { id: "all-zeros-near", description: "Center 1 surrounded by 0s", input: { mat: [[0,0,0],[0,1,0],[0,0,0]] }, expected: [[0,0,0],[0,1,0],[0,0,0]], isHidden: false },
    { id: "corner-ones", description: "1s in bottom row", input: { mat: [[0,0,0],[0,1,0],[1,1,1]] }, expected: [[0,0,0],[0,1,0],[1,2,1]], isHidden: false },
    { id: "single-zero", description: "Single 0 in corner", input: { mat: [[0,1],[1,1]] }, expected: [[0,1],[1,2]], isHidden: false },
    { id: "all-zeros", description: "All zeros", input: { mat: [[0,0],[0,0]] }, expected: [[0,0],[0,0]], isHidden: true },
    { id: "single-cell", description: "1x1 matrix", input: { mat: [[0]] }, expected: [[0]], isHidden: true },
    { id: "row", description: "Single row", input: { mat: [[1,0,1,1]] }, expected: [[1,0,1,2]], isHidden: true },
  ],
};
