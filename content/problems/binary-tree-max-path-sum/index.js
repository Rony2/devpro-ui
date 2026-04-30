export const problem = {
  slug: "binary-tree-max-path-sum",  category: "grind-75",
  title: "Binary Tree Maximum Total Path",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Trees", "Dynamic Programming"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the maximum total of nodes in a binary tree path.",

  problemMdx: `## Overview

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes has a parent-child edge. The path does not need to pass through the root, and each node can appear at most once in the path.

Given the root of a binary tree, return the maximum **path sum** — the largest sum of node values along any path in the tree.

## Constraints

- The tree has 1 to 10,000 nodes.
- Node values can be negative (range: -1000 to 1000).
- A path must contain at least one node.
- The path can start and end at any node.

## Examples

\`\`\`js
// Tree:
//       1
//      / \\
//     2   3
maxPathSum({ val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } });
// => 6  (path: 2 -> 1 -> 3)
\`\`\`

\`\`\`js
// Tree with negatives:
//      -10
//      / \\
//     9   20
//        / \\
//      15   7
maxPathSum({
  val: -10,
  left: { val: 9, left: null, right: null },
  right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } }
});
// => 42  (path: 15 -> 20 -> 7)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (node === null) return 0;
    const leftGain = Math.max(dfs(node.left), 0);
    const rightGain = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return maxSum;
}
\`\`\`

</details>

## Resources

- [Binary Tree Maximum Path Sum — LeetCode](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [DFS on Trees — GeeksforGeeks](https://www.geeksforgeeks.org/dfs-traversal-of-a-tree-using-recursion/)`,

  starterCode: `/**
 * Find the maximum path sum in a binary tree.
 * @param {{ val: number, left: TreeNode | null, right: TreeNode | null }} root
 * @returns {number}
 */
function maxPathSum(root) {
  // your implementation
}`,

  solution: `function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (node === null) return 0;
    const leftGain = Math.max(dfs(node.left), 0);
    const rightGain = Math.max(dfs(node.right), 0);
    maxSum = Math.max(maxSum, node.val + leftGain + rightGain);
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return maxSum;
}`,

  harness: `
function solve(input) {
  return maxPathSum(input.root);
}`,

  tests: [
    {
      id: "simple-tree",
      description: "Path through root with positive nodes",
      input: {
        root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
      },
      expected: 6,
      isHidden: false,
    },
    {
      id: "negatives",
      description: "Tree with negative root, optimal path skips root",
      input: {
        root: {
          val: -10,
          left: { val: 9, left: null, right: null },
          right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } },
        },
      },
      expected: 42,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node returns its value",
      input: {
        root: { val: 5, left: null, right: null },
      },
      expected: 5,
      isHidden: false,
    },
    {
      id: "all-negative",
      description: "All negative values — picks the least negative",
      input: {
        root: { val: -3, left: { val: -2, left: null, right: null }, right: { val: -5, left: null, right: null } },
      },
      expected: -2,
      isHidden: true,
    },
    {
      id: "linear-path",
      description: "Linear tree picks optimal subpath",
      input: {
        root: { val: 2, left: { val: -1, left: { val: 3, left: null, right: null }, right: null }, right: null },
      },
      expected: 4,
      isHidden: true,
    },
    {
      id: "large-values",
      description: "Handles large positive values",
      input: {
        root: {
          val: 100,
          left: { val: 200, left: { val: 300, left: null, right: null }, right: null },
          right: { val: 400, left: null, right: null },
        },
      },
      expected: 1000,
      isHidden: true,
    },
  ],
};
