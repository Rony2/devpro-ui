export const problem = {
  slug: "graph-clone",  category: "grind-75",
  title: "Graph Clone",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "DFS"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to deeply clone a connected and undirected graph.",

  problemMdx: `## Overview

Given a reference to a node in a connected undirected graph, return a **deep copy** (clone) of the graph.

Each node has a \`val\` (integer) and a \`neighbors\` array (list of adjacent nodes). Your clone must create entirely new node objects — no references to the original graph should remain.

## Constraints

- The graph has 1 to 100 nodes.
- \`1 <= val <= 100\` and all values are unique.
- No self-loops or repeated edges.
- The graph is connected.
- Input/output uses adjacency list representation: \`{ val, neighbors: [...] }\`.

## Examples

\`\`\`js
// Graph: 1 -- 2
//        |    |
//        4 -- 3

// Input adjacency list: [[2,4],[1,3],[2,4],[1,3]]
// Node 1 neighbors: [2, 4]
// Node 2 neighbors: [1, 3]
// etc.

cloneGraph(node1);
// => deep copy of the entire graph
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function cloneGraph(node) {
  if (!node) return null;
  const visited = new Map();

  function dfs(n) {
    if (visited.has(n.val)) return visited.get(n.val);
    const clone = { val: n.val, neighbors: [] };
    visited.set(n.val, clone);
    for (const neighbor of n.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }

  return dfs(node);
}
\`\`\`

</details>

## Resources

- [Clone Graph — LeetCode](https://leetcode.com/problems/clone-graph/)
- [Graph Theory — Wikipedia](https://en.wikipedia.org/wiki/Graph_theory)`,

  starterCode: `/**
 * Deep clone a connected undirected graph.
 * @param {{ val: number, neighbors: GraphNode[] } | null} node
 * @returns {{ val: number, neighbors: GraphNode[] } | null}
 */
function cloneGraph(node) {
  // your implementation
}`,

  solution: `function cloneGraph(node) {
  if (!node) return null;
  const visited = new Map();

  function dfs(n) {
    if (visited.has(n.val)) return visited.get(n.val);
    const clone = { val: n.val, neighbors: [] };
    visited.set(n.val, clone);
    for (const neighbor of n.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }
    return clone;
  }

  return dfs(node);
}`,

  harness: `
function solve(input) {
  // Build graph from adjacency list
  const { adjList } = input;
  if (!adjList.length) return null;

  const nodes = adjList.map((_, i) => ({ val: i + 1, neighbors: [] }));
  for (let i = 0; i < adjList.length; i++) {
    for (const neighborVal of adjList[i]) {
      nodes[i].neighbors.push(nodes[neighborVal - 1]);
    }
  }

  const cloned = cloneGraph(nodes[0]);

  // Convert clone back to adjacency list for comparison
  if (!cloned) return null;
  const result = [];
  const visited = new Map();
  const queue = [cloned];
  visited.set(cloned.val, cloned);

  while (queue.length > 0) {
    const n = queue.shift();
    result[n.val - 1] = n.neighbors.map(nb => nb.val).sort((a, b) => a - b);
    for (const nb of n.neighbors) {
      if (!visited.has(nb.val)) {
        visited.set(nb.val, nb);
        queue.push(nb);
      }
    }
  }

  return result;
}`,

  tests: [
    {
      id: "square",
      description: "Clones a 4-node square graph",
      input: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] },
      expected: [[2, 4], [1, 3], [2, 4], [1, 3]],
      isHidden: false,
    },
    {
      id: "single",
      description: "Single node with no neighbors",
      input: { adjList: [[]] },
      expected: [[]],
      isHidden: false,
    },
    {
      id: "triangle",
      description: "3-node fully connected triangle",
      input: { adjList: [[2, 3], [1, 3], [1, 2]] },
      expected: [[2, 3], [1, 3], [1, 2]],
      isHidden: false,
    },
    {
      id: "line",
      description: "Linear graph 1-2-3",
      input: { adjList: [[2], [1, 3], [2]] },
      expected: [[2], [1, 3], [2]],
      isHidden: true,
    },
    {
      id: "star",
      description: "Star graph — center connected to all",
      input: { adjList: [[2, 3, 4], [1], [1], [1]] },
      expected: [[2, 3, 4], [1], [1], [1]],
      isHidden: true,
    },
    {
      id: "two-nodes",
      description: "Two connected nodes",
      input: { adjList: [[2], [1]] },
      expected: [[2], [1]],
      isHidden: true,
    },
  ],
};
