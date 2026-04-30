export const problem = {
  slug: "rotting-oranges",  category: "grind-75",
  title: "Rotting Oranges",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "BFS", "Matrix"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the minimum time for all oranges to rot.",

  problemMdx: `## Overview

In an \`m × n\` grid, each cell can be: \`0\` (empty), \`1\` (fresh orange), or \`2\` (rotten orange). Every minute, fresh oranges adjacent (4-directionally) to rotten ones become rotten. Return the minimum minutes until no fresh orange remains, or \`-1\` if impossible.

## Constraints

- \`1 <= m, n <= 10\`
- \`grid[i][j]\` is 0, 1, or 2.

## Examples

\`\`\`js
orangesRotting([[2,1,1],[1,1,0],[0,1,1]]);
// => 4

orangesRotting([[2,1,1],[0,1,1],[1,0,1]]);
// => -1  (bottom-left fresh orange is unreachable)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      else if (grid[i][j] === 1) fresh++;
    }
  if (fresh === 0) return 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let minutes = 0, idx = 0;
  while (idx < queue.length) {
    const size = queue.length - idx;
    let rotted = false;
    for (let s = 0; s < size; s++) {
      const [r, c] = queue[idx++];
      for (const [dr, dc] of dirs) {
        const nr = r+dr, nc = c+dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          queue.push([nr, nc]);
          rotted = true;
        }
      }
    }
    if (rotted) minutes++;
  }
  return fresh === 0 ? minutes : -1;
}
\`\`\`

</details>

## Resources

- [Rotting Oranges — LeetCode](https://leetcode.com/problems/rotting-oranges/)`,

  starterCode: `/**
 * Find minimum minutes until no fresh orange remains.
 * @param {number[][]} grid
 * @returns {number}
 */
function orangesRotting(grid) {
  // your implementation
}`,

  solution: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;
  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j]);
      else if (grid[i][j] === 1) fresh++;
    }
  if (fresh === 0) return 0;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  let minutes = 0, idx = 0;
  while (idx < queue.length) {
    const size = queue.length - idx;
    let rotted = false;
    for (let s = 0; s < size; s++) {
      const [r, c] = queue[idx++];
      for (const [dr, dc] of dirs) {
        const nr = r+dr, nc = c+dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; queue.push([nr, nc]); rotted = true;
        }
      }
    }
    if (rotted) minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,

  harness: `function solve(input) { return orangesRotting(input.grid.map(r => [...r])); }`,

  tests: [
    { id: "basic", description: "4 minutes to rot all", input: { grid: [[2,1,1],[1,1,0],[0,1,1]] }, expected: 4, isHidden: false },
    { id: "impossible", description: "Unreachable fresh orange", input: { grid: [[2,1,1],[0,1,1],[1,0,1]] }, expected: -1, isHidden: false },
    { id: "no-fresh", description: "No fresh oranges", input: { grid: [[0,2]] }, expected: 0, isHidden: false },
    { id: "all-empty", description: "All empty", input: { grid: [[0]] }, expected: 0, isHidden: true },
    { id: "immediate", description: "Already all rotten", input: { grid: [[2,2],[2,2]] }, expected: 0, isHidden: true },
    { id: "single-fresh", description: "One fresh next to rotten", input: { grid: [[2,1]] }, expected: 1, isHidden: true },
  ],
};
