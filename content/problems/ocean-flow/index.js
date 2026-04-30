export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "ocean-flow",  category: "grind-75",
  title: "Ocean Flow",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Graph", "DFS", "Matrix"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function returning cells with water flow to both oceans.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

There is an \`m x n\` rectangular island that borders two oceans: the **Pacific Ocean** (top and left edges) and the **Atlantic Ocean** (bottom and right edges).

The island receives rain. Water can flow from a cell to an adjacent cell (up, down, left, right) if the adjacent cell's height is **less than or equal to** the current cell's height. Water can also flow from the island to the ocean bordering it.

Return a list of grid coordinates \`[r, c]\` where water can flow to **both** the Pacific and Atlantic oceans.

Implement \`pacificAtlantic(heights)\`.

## Constraints

- \`m == heights.length\`, \`n == heights[0].length\`
- \`1 ≤ m, n ≤ 200\`
- \`0 ≤ heights[r][c] ≤ 100000\`
- Return coordinates sorted by row, then by column.

## Examples

\`\`\`js
pacificAtlantic([
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
]);
// → [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]

pacificAtlantic([[1]]);
// → [[0,0]]
\`\`\`

## Notes

- **Reverse DFS/BFS**: instead of flowing water downhill from each cell, start from the ocean edges and flow **uphill**. Run one pass from Pacific edges and one from Atlantic edges. Cells reachable from both are the answer.
- This avoids visiting every cell from every cell ($O(m \\cdot n)$ vs $O((m \\cdot n)^2)$).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));

  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  function dfs(r, c, reachable) {
    reachable[r][c] = true;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n
          && !reachable[nr][nc]
          && heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, reachable);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0, pacific);
    dfs(r, n - 1, atlantic);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pacific);
    dfs(m - 1, c, atlantic);
  }

  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }
  return result;
}
\`\`\`

</details>

## Resources

- [Pacific Atlantic Water Flow — LeetCode](https://leetcode.com/problems/pacific-atlantic-water-flow/)
- [Depth-First Search — Wikipedia](https://en.wikipedia.org/wiki/Depth-first_search)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find all cells from which water can flow to both Pacific and Atlantic oceans.
 *
 * @param {number[][]} heights - m x n elevation grid
 * @returns {number[][]} Array of [row, col] coordinates
 */
function pacificAtlantic(heights) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function pacificAtlantic(heights) {
  const m = heights.length;
  const n = heights[0].length;
  const pacific = Array.from({ length: m }, () => new Array(n).fill(false));
  const atlantic = Array.from({ length: m }, () => new Array(n).fill(false));
  const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

  function dfs(r, c, reachable) {
    reachable[r][c] = true;
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n
          && !reachable[nr][nc]
          && heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, reachable);
      }
    }
  }

  for (let r = 0; r < m; r++) {
    dfs(r, 0, pacific);
    dfs(r, n - 1, atlantic);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pacific);
    dfs(m - 1, c, atlantic);
  }

  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pacific[r][c] && atlantic[r][c]) {
        result.push([r, c]);
      }
    }
  }
  return result;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  const result = pacificAtlantic(input.heights.map(row => [...row]));
  result.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  return result;
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-5x5",
      description: "5x5 grid with mixed elevations",
      input: {
        heights: [
          [1, 2, 2, 3, 5],
          [3, 2, 3, 4, 4],
          [2, 4, 5, 3, 1],
          [6, 7, 1, 4, 5],
          [5, 1, 1, 2, 4],
        ],
      },
      expected: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]],
      isHidden: false,
    },
    {
      id: "single-cell",
      description: "1x1 grid — flows to both",
      input: { heights: [[1]] },
      expected: [[0,0]],
      isHidden: false,
    },
    {
      id: "flat",
      description: "All same height — every cell flows to both",
      input: {
        heights: [
          [1, 1],
          [1, 1],
        ],
      },
      expected: [[0,0],[0,1],[1,0],[1,1]],
      isHidden: false,
    },
    {
      id: "hidden-single-row",
      description: "Single row — all cells reach both",
      input: { heights: [[3, 2, 1]] },
      expected: [[0,0],[0,1],[0,2]],
      isHidden: true,
    },
    {
      id: "hidden-descending",
      description: "Descending from top-left to bottom-right",
      input: {
        heights: [
          [5, 4, 3],
          [4, 3, 2],
          [3, 2, 1],
        ],
      },
      expected: [[0,0],[0,1],[0,2],[1,0],[2,0]],
      isHidden: true,
    },
    {
      id: "hidden-valley",
      description: "High edges with low center",
      input: {
        heights: [
          [10, 10, 10],
          [10, 1, 10],
          [10, 10, 10],
        ],
      },
      expected: [[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]],
      isHidden: true,
    },
  ],
};
