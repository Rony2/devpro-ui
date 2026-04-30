export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "count-islands-in-grid",  category: "grind-75",
  title: "Count Islands in a Grid",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Data Structures"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to count distinct islands in a 2D binary grid.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an \`m × n\` 2D grid where \`"1"\` represents land and \`"0"\` represents water, count the number of distinct islands. An island is surrounded by water and is formed by connecting adjacent land cells horizontally or vertically.

Implement \`numIslands(grid)\`.

## Constraints

- \`grid\` is a 2D array of strings (\`"0"\` or \`"1"\`).
- \`1 ≤ m, n ≤ 300\`.
- You may modify the grid in place (mark visited cells).
- Aim for $O(m \\times n)$ time.

## Examples

\`\`\`js
numIslands([
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]);
// → 1

numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]);
// → 3
\`\`\`

## Notes

- Classic DFS/BFS flood-fill: iterate every cell. When you find a \`"1"\`, increment the count and flood-fill (mark all connected land as visited).
- Mark visited cells by setting them to \`"0"\` to avoid extra space for a visited set.
- Alternatively, use Union-Find for a different approach.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
\`\`\`

</details>

## Resources

- [Number of Islands — LeetCode](https://leetcode.com/problems/number-of-islands/)
- [Flood Fill — Wikipedia](https://en.wikipedia.org/wiki/Flood_fill)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Count the number of distinct islands in a 2D binary grid.
 *
 * @param {string[][]} grid - 2D array of "0" and "1"
 * @returns {number} Number of islands
 */
function numIslands(grid) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  // Deep clone grid since the solution mutates it
  const grid = input.grid.map(row => [...row]);
  return numIslands(grid);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "single-island",
      description: "One large connected island",
      input: { grid: [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "three-islands",
      description: "Three separate islands",
      input: { grid: [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]] },
      expected: 3,
      isHidden: false,
    },
    {
      id: "all-water",
      description: "No islands — all water",
      input: { grid: [["0","0"],["0","0"]] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "hidden-all-land",
      description: "Entire grid is one island",
      input: { grid: [["1","1"],["1","1"]] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-diagonal",
      description: "Diagonal cells are separate islands (not connected)",
      input: { grid: [["1","0"],["0","1"]] },
      expected: 2,
      isHidden: true,
    },
    {
      id: "hidden-single-cell",
      description: "Single cell island",
      input: { grid: [["1"]] },
      expected: 1,
      isHidden: true,
    },
  ],
};
