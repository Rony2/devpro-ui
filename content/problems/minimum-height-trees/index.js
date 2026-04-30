export const problem = {
  slug: "minimum-height-trees",  category: "grind-75",
  title: "Minimum Height Trees",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "BFS", "Graph", "Trees"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find all root labels that give minimum height trees.",

  problemMdx: `## Overview

Given a tree of \`n\` nodes labeled \`0\` to \`n-1\` and \`n-1\` undirected edges, find all root labels that minimize the tree height. These are called **Minimum Height Trees (MHTs)**.

## Constraints

- \`1 <= n <= 20,000\`
- The input forms a valid tree.
- Return at most 2 roots (MHTs always have 1 or 2 roots).

## Examples

\`\`\`js
findMinHeightTrees(4, [[1,0],[1,2],[1,3]]);
// => [1]

findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]]);
// => [3, 4]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function findMinHeightTrees(n, edges) {
  if (n === 1) return [0];
  const adj = Array.from({length: n}, () => new Set());
  for (const [a, b] of edges) { adj[a].add(b); adj[b].add(a); }
  let leaves = [];
  for (let i = 0; i < n; i++) if (adj[i].size === 1) leaves.push(i);
  let remaining = n;
  while (remaining > 2) {
    remaining -= leaves.length;
    const newLeaves = [];
    for (const leaf of leaves) {
      const neighbor = [...adj[leaf]][0];
      adj[neighbor].delete(leaf);
      if (adj[neighbor].size === 1) newLeaves.push(neighbor);
    }
    leaves = newLeaves;
  }
  return leaves;
}
\`\`\`

Iteratively remove leaf nodes (degree 1) until 1 or 2 nodes remain.

</details>

## Resources

- [Minimum Height Trees — LeetCode](https://leetcode.com/problems/minimum-height-trees/)`,

  starterCode: `/**
 * Find roots that give minimum height trees.
 * @param {number} n
 * @param {number[][]} edges
 * @returns {number[]}
 */
function findMinHeightTrees(n, edges) {
  // your implementation
}`,

  solution: `function findMinHeightTrees(n, edges) {
  if (n === 1) return [0];
  const adj = Array.from({length: n}, () => new Set());
  for (const [a, b] of edges) { adj[a].add(b); adj[b].add(a); }
  let leaves = [];
  for (let i = 0; i < n; i++) if (adj[i].size === 1) leaves.push(i);
  let remaining = n;
  while (remaining > 2) {
    remaining -= leaves.length;
    const newLeaves = [];
    for (const leaf of leaves) {
      const neighbor = [...adj[leaf]][0];
      adj[neighbor].delete(leaf);
      if (adj[neighbor].size === 1) newLeaves.push(neighbor);
    }
    leaves = newLeaves;
  }
  return leaves;
}`,

  harness: `function solve(input) { return findMinHeightTrees(input.n, input.edges).sort((a,b) => a-b); }`,

  tests: [
    { id: "star", description: "Star graph → center", input: { n: 4, edges: [[1,0],[1,2],[1,3]] }, expected: [1], isHidden: false },
    { id: "path", description: "Path graph → middle two", input: { n: 6, edges: [[3,0],[3,1],[3,2],[3,4],[5,4]] }, expected: [3,4], isHidden: false },
    { id: "single", description: "Single node", input: { n: 1, edges: [] }, expected: [0], isHidden: false },
    { id: "two", description: "Two nodes", input: { n: 2, edges: [[0,1]] }, expected: [0,1], isHidden: true },
    { id: "line", description: "Linear chain of 5", input: { n: 5, edges: [[0,1],[1,2],[2,3],[3,4]] }, expected: [2], isHidden: true },
    { id: "line-4", description: "Linear chain of 4", input: { n: 4, edges: [[0,1],[1,2],[2,3]] }, expected: [1,2], isHidden: true },
  ],
};
