export const problem = {
  slug: "binary-tree-max-depth",  category: "grind-75",
  title: "Binary Tree Maximum Depth",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Trees", "Recursion"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the maximum depth of a binary tree.",

  problemMdx: `## Overview

Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root node down to the farthest leaf node.

A tree with a single node has depth 1. An empty tree (null root) has depth 0.

## Constraints

- The tree can have 0 to 10,000 nodes.
- Node values are integers (irrelevant to the solution).
- Return an integer representing the depth.

## Examples

\`\`\`js
// Tree:
//       1
//      / \\
//     2   3
//    /
//   4

maxDepth({ val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: null }, right: { val: 3, left: null, right: null } });
// => 3
\`\`\`

\`\`\`js
// Single node
maxDepth({ val: 1, left: null, right: null });
// => 1

// Empty tree
maxDepth(null);
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
\`\`\`

</details>

## Resources

- [Maximum Depth of Binary Tree — LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [Tree Traversal — Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)`,

  starterCode: `/**
 * Find the maximum depth of a binary tree.
 * @param {{ val: number, left: TreeNode | null, right: TreeNode | null } | null} root
 * @returns {number}
 */
function maxDepth(root) {
  // your implementation
}`,

  solution: `function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,

  harness: `
function solve(input) {
  return maxDepth(input.root);
}`,

  tests: [
    {
      id: "basic-tree",
      description: "Three-level tree returns 3",
      input: {
        root: { val: 1, left: { val: 2, left: { val: 4, left: null, right: null }, right: null }, right: { val: 3, left: null, right: null } },
      },
      expected: 3,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node returns 1",
      input: {
        root: { val: 1, left: null, right: null },
      },
      expected: 1,
      isHidden: false,
    },
    {
      id: "null-root",
      description: "Null root returns 0",
      input: { root: null },
      expected: 0,
      isHidden: false,
    },
    {
      id: "left-skewed",
      description: "Left-skewed tree returns correct depth",
      input: {
        root: { val: 1, left: { val: 2, left: { val: 3, left: { val: 4, left: null, right: null }, right: null }, right: null }, right: null },
      },
      expected: 4,
      isHidden: true,
    },
    {
      id: "right-skewed",
      description: "Right-skewed tree returns correct depth",
      input: {
        root: { val: 1, left: null, right: { val: 2, left: null, right: { val: 3, left: null, right: null } } },
      },
      expected: 3,
      isHidden: true,
    },
    {
      id: "balanced",
      description: "Balanced tree returns correct depth",
      input: {
        root: {
          val: 1,
          left: { val: 2, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
          right: { val: 3, left: { val: 6, left: null, right: null }, right: { val: 7, left: null, right: null } },
        },
      },
      expected: 3,
      isHidden: true,
    },
  ],
};
