export const problem = {
  slug: "is-graph-a-tree",  category: "grind-75",
  title: "Is the Graph a Tree",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Union Find"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine if a graph is a valid tree.",

  problemMdx: `## Overview

Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges, determine if these edges form a **valid tree**.

A valid tree must satisfy:
1. It is **connected** — all nodes are reachable from any node.
2. It has **no cycles**.

An equivalent check: a graph with \`n\` nodes is a tree if and only if it is connected and has exactly \`n - 1\` edges.

## Constraints

- \`1 <= n <= 2000\`
- \`0 <= edges.length <= 5000\`
- \`edges[i].length === 2\`
- \`0 <= edges[i][0], edges[i][1] < n\`
- No duplicate edges.

## Examples

\`\`\`js
isTree(5, [[0,1], [0,2], [0,3], [1,4]]);
// => true
//    0
//   /|\\
//  1 2 3
//  |
//  4
\`\`\`

\`\`\`js
isTree(5, [[0,1], [1,2], [2,3], [1,3], [1,4]]);
// => false  (cycle: 1-2-3-1)

isTree(4, [[0,1], [2,3]]);
// => false  (not connected)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isTree(n, edges) {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  for (const [a, b] of edges) {
    const rootA = find(a), rootB = find(b);
    if (rootA === rootB) return false; // cycle detected
    parent[rootA] = rootB;
  }

  return true;
}
\`\`\`

A tree with \`n\` nodes has exactly \`n - 1\` edges. If we also verify no cycle exists via Union-Find, the graph must be a connected tree.

</details>

## Resources

- [Graph Valid Tree — LeetCode](https://leetcode.com/problems/graph-valid-tree/)
- [Tree (Graph Theory) — Wikipedia](https://en.wikipedia.org/wiki/Tree_(graph_theory))`,

  starterCode: `/**
 * Determine if the undirected graph forms a valid tree.
 * @param {number} n - number of nodes (0 to n-1)
 * @param {number[][]} edges - undirected edges
 * @returns {boolean}
 */
function isTree(n, edges) {
  // your implementation
}`,

  solution: `function isTree(n, edges) {
  if (edges.length !== n - 1) return false;

  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  for (const [a, b] of edges) {
    const rootA = find(a), rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootA] = rootB;
  }

  return true;
}`,

  harness: `
function solve(input) {
  return isTree(input.n, input.edges);
}`,

  tests: [
    {
      id: "valid-tree",
      description: "Valid tree with 5 nodes",
      input: { n: 5, edges: [[0,1], [0,2], [0,3], [1,4]] },
      expected: true,
      isHidden: false,
    },
    {
      id: "has-cycle",
      description: "Graph with a cycle",
      input: { n: 5, edges: [[0,1], [1,2], [2,3], [1,3], [1,4]] },
      expected: false,
      isHidden: false,
    },
    {
      id: "disconnected",
      description: "Disconnected graph is not a tree",
      input: { n: 4, edges: [[0,1], [2,3]] },
      expected: false,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node is a tree",
      input: { n: 1, edges: [] },
      expected: true,
      isHidden: true,
    },
    {
      id: "line",
      description: "Linear chain is a tree",
      input: { n: 4, edges: [[0,1], [1,2], [2,3]] },
      expected: true,
      isHidden: true,
    },
    {
      id: "too-many-edges",
      description: "Too many edges — not a tree",
      input: { n: 3, edges: [[0,1], [1,2], [0,2]] },
      expected: false,
      isHidden: true,
    },
  ],
};
