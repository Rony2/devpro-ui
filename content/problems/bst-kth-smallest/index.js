export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "bst-kth-smallest",  category: "grind-75",
  title: "Binary Search Tree Kth Smallest Element",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Binary Search Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the kth smallest node in a BST.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given the root of a binary search tree and an integer \`k\`, return the \`k\`th smallest value (1-indexed) among all node values in the tree.

Implement \`kthSmallest(root, k)\` where \`root\` is a tree node with \`{ val, left, right }\` properties.

## Constraints

- The tree has \`n\` nodes where \`1 ≤ k ≤ n\`.
- Node values are unique integers.
- Tree nodes have the shape \`{ val: number, left: TreeNode | null, right: TreeNode | null }\`.
- Aim for $O(H + k)$ time where \`H\` is the tree height.

## Examples

\`\`\`js
//     3
//    / \\\\
//   1   4
//    \\\\
//     2
kthSmallest(root, 1);  // 1
kthSmallest(root, 3);  // 3

//       5
//      / \\\\
//     3   6
//    / \\\\
//   2   4
//  /
// 1
kthSmallest(root, 3);  // 3
\`\`\`

## Notes

- An in-order traversal of a BST visits nodes in ascending order — the \`k\`th node visited is the answer.
- You can do this iteratively with a stack to avoid traversing the entire tree once you've found the \`k\`th element.
- Alternatively, a recursive approach with an early-exit counter works well.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  let count = 0;

  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    count++;
    if (count === k) return node.val;
    node = node.right;
  }

  return -1;
}
\`\`\`

</details>

## Resources

- [Kth Smallest Element in a BST — LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
- [In-order Traversal — Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal#In-order)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the kth smallest value in a BST.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null }} root
 * @param {number} k - 1-indexed position
 * @returns {number} The kth smallest value
 */
function kthSmallest(root, k) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  let count = 0;

  while (node || stack.length > 0) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    count++;
    if (count === k) return node.val;
    node = node.right;
  }

  return -1;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = { val: arr[i], left: null, right: null };
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = { val: arr[i], left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function solve(input) {
  const root = buildTree(input.tree);
  return kthSmallest(root, input.k);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "first-smallest",
      description: "Find the 1st smallest in a small BST",
      input: { tree: [3, 1, 4, null, 2], k: 1 },
      expected: 1,
      isHidden: false,
    },
    {
      id: "third-smallest",
      description: "Find the 3rd smallest",
      input: { tree: [5, 3, 6, 2, 4, null, null, 1], k: 3 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node tree",
      input: { tree: [1], k: 1 },
      expected: 1,
      isHidden: false,
    },
    {
      id: "hidden-last",
      description: "Kth equals total node count (largest element)",
      input: { tree: [3, 1, 4, null, 2], k: 4 },
      expected: 4,
      isHidden: true,
    },
    {
      id: "hidden-left-skewed",
      description: "Left-skewed tree",
      input: { tree: [3, 2, null, 1], k: 2 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "hidden-right-skewed",
      description: "Right-skewed tree",
      input: { tree: [1, null, 2, null, 3], k: 3 },
      expected: 3,
      isHidden: true,
    },
  ],
};
