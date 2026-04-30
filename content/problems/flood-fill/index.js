export const problem = {
  slug: "flood-fill",  category: "grind-75",
  title: "Flood Fill",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "BFS", "DFS", "Matrix"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to perform flood fill on an image grid.",

  problemMdx: `## Overview

Given an \`m × n\` image grid, a starting pixel \`(sr, sc)\`, and a new color, perform a **flood fill**: change the starting pixel and all connected pixels with the same original color to the new color. Connected means sharing an edge (up, down, left, right).

## Constraints

- \`1 <= m, n <= 50\`
- \`0 <= image[i][j], color <= 65535\`
- \`0 <= sr < m, 0 <= sc < n\`

## Examples

\`\`\`js
floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2);
// => [[2,2,2],[2,2,0],[2,0,1]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function floodFill(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const m = image.length, n = image[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (image[r][c] !== orig) return;
    image[r][c] = color;
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }

  dfs(sr, sc);
  return image;
}
\`\`\`

</details>

## Resources

- [Flood Fill — LeetCode](https://leetcode.com/problems/flood-fill/)
- [Flood Fill — Wikipedia](https://en.wikipedia.org/wiki/Flood_fill)`,

  starterCode: `/**
 * Perform flood fill starting from (sr, sc) with the given color.
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @returns {number[][]}
 */
function floodFill(image, sr, sc, color) {
  // your implementation
}`,

  solution: `function floodFill(image, sr, sc, color) {
  const orig = image[sr][sc];
  if (orig === color) return image;
  const m = image.length, n = image[0].length;
  function dfs(r, c) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    if (image[r][c] !== orig) return;
    image[r][c] = color;
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  }
  dfs(sr, sc);
  return image;
}`,

  harness: `function solve(input) {
  const img = input.image.map(r => [...r]);
  return floodFill(img, input.sr, input.sc, input.color);
}`,

  tests: [
    { id: "basic", description: "Fill connected region", input: { image: [[1,1,1],[1,1,0],[1,0,1]], sr: 1, sc: 1, color: 2 }, expected: [[2,2,2],[2,2,0],[2,0,1]], isHidden: false },
    { id: "same-color", description: "New color same as original", input: { image: [[0,0,0],[0,0,0]], sr: 0, sc: 0, color: 0 }, expected: [[0,0,0],[0,0,0]], isHidden: false },
    { id: "single-pixel", description: "1x1 grid", input: { image: [[1]], sr: 0, sc: 0, color: 5 }, expected: [[5]], isHidden: false },
    { id: "corner", description: "Fill from corner", input: { image: [[1,1,0],[1,0,0],[0,0,0]], sr: 0, sc: 0, color: 3 }, expected: [[3,3,0],[3,0,0],[0,0,0]], isHidden: true },
    { id: "entire", description: "Fill entire grid", input: { image: [[2,2],[2,2]], sr: 0, sc: 0, color: 9 }, expected: [[9,9],[9,9]], isHidden: true },
    { id: "isolated", description: "Isolated pixel", input: { image: [[0,1,0],[1,1,1],[0,1,0]], sr: 1, sc: 1, color: 7 }, expected: [[0,7,0],[7,7,7],[0,7,0]], isHidden: true },
  ],
};
