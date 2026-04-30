export const problem = {
  slug: "graph-connected-components",  category: "grind-75",
  title: "Graph Count Connected Components",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Union Find"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to count connected components in a graph.",

  problemMdx: `## Overview

Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges, return the **number of connected components** in the graph.

## Constraints

- \`1 <= n <= 2000\`
- \`0 <= edges.length <= 5000\`
- \`edges[i].length === 2\`
- \`0 <= edges[i][0], edges[i][1] < n\`
- No duplicate edges.

## Examples

\`\`\`js
countComponents(5, [[0,1], [1,2], [3,4]]);
// => 2
// Component 1: {0, 1, 2}
// Component 2: {3, 4}
\`\`\`

\`\`\`js
countComponents(5, [[0,1], [1,2], [2,3], [3,4]]);
// => 1  (all connected)

countComponents(4, []);
// => 4  (each node is its own component)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]]; // path compression
      x = parent[x];
    }
    return x;
  }

  function union(a, b) {
    const rootA = find(a), rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootA] = rootB;
    return true;
  }

  let components = n;
  for (const [a, b] of edges) {
    if (union(a, b)) components--;
  }

  return components;
}
\`\`\`

Union-Find with path compression. Start with \`n\` components and merge on each edge.

</details>

## Resources

- [Number of Connected Components — LeetCode](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)
- [Disjoint-set Data Structure — Wikipedia](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)`,

  starterCode: `/**
 * Count the number of connected components in an undirected graph.
 * @param {number} n - number of nodes (0 to n-1)
 * @param {number[][]} edges - undirected edges
 * @returns {number}
 */
function countComponents(n, edges) {
  // your implementation
}`,

  solution: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  function union(a, b) {
    const rootA = find(a), rootB = find(b);
    if (rootA === rootB) return false;
    parent[rootA] = rootB;
    return true;
  }

  let components = n;
  for (const [a, b] of edges) {
    if (union(a, b)) components--;
  }

  return components;
}`,

  harness: `
function solve(input) {
  return countComponents(input.n, input.edges);
}`,

  tests: [
    {
      id: "two-components",
      description: "5 nodes with 2 connected components",
      input: { n: 5, edges: [[0,1], [1,2], [3,4]] },
      expected: 2,
      isHidden: false,
    },
    {
      id: "all-connected",
      description: "All nodes connected — 1 component",
      input: { n: 5, edges: [[0,1], [1,2], [2,3], [3,4]] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "no-edges",
      description: "No edges — each node is a component",
      input: { n: 4, edges: [] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node",
      input: { n: 1, edges: [] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "three-components",
      description: "6 nodes with 3 components",
      input: { n: 6, edges: [[0,1], [2,3], [4,5]] },
      expected: 3,
      isHidden: true,
    },
    {
      id: "fully-connected",
      description: "Fully connected 4-node graph",
      input: { n: 4, edges: [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3]] },
      expected: 1,
      isHidden: true,
    },
  ],
};
