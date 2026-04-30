export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "bst-lowest-common-ancestor",  category: "grind-75",
  title: "Binary Search Tree Lowest Common Ancestor",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Binary Search Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the LCA in a binary search tree.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given a binary search tree (BST) and two node values \`p\` and \`q\`, find the lowest common ancestor (LCA) of the two nodes.

The LCA is the deepest node that is an ancestor of both \`p\` and \`q\` (a node can be an ancestor of itself).

Implement \`lowestCommonAncestor(root, p, q)\` that returns the **value** of the LCA node.

## Constraints

- Both \`p\` and \`q\` are guaranteed to exist in the tree.
- All node values are unique.
- \`p !== q\`.
- Tree nodes have shape \`{ val, left, right }\`.
- Leverage the BST property for $O(H)$ time where \`H\` is tree height.

## Examples

\`\`\`js
//       6
//      / \\\\
//     2   8
//    / \\\\ / \\\\
//   0  4 7  9
//     / \\\\
//    3   5

lowestCommonAncestor(root, 2, 8);  // 6
lowestCommonAncestor(root, 2, 4);  // 2 — a node is its own ancestor
lowestCommonAncestor(root, 3, 5);  // 4
\`\`\`

## Notes

- BST property: all left descendants < node < all right descendants.
- If both \`p\` and \`q\` are less than the current node, the LCA is in the left subtree.
- If both are greater, it's in the right subtree.
- Otherwise, the current node is the LCA (the split point).
- This can be solved iteratively without recursion.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p < node.val && q < node.val) {
      node = node.left;
    } else if (p > node.val && q > node.val) {
      node = node.right;
    } else {
      return node.val;
    }
  }
  return -1;
}
\`\`\`

</details>

## Resources

- [Lowest Common Ancestor of a BST — LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- [Lowest Common Ancestor — Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the lowest common ancestor of two nodes in a BST.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null }} root
 * @param {number} p - First node value
 * @param {number} q - Second node value
 * @returns {number} Value of the LCA node
 */
function lowestCommonAncestor(root, p, q) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function lowestCommonAncestor(root, p, q) {
  let node = root;
  while (node) {
    if (p < node.val && q < node.val) {
      node = node.left;
    } else if (p > node.val && q > node.val) {
      node = node.right;
    } else {
      return node.val;
    }
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
  return lowestCommonAncestor(root, input.p, input.q);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "split-at-root",
      description: "LCA is the root (nodes in different subtrees)",
      input: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
      expected: 6,
      isHidden: false,
    },
    {
      id: "ancestor-of-self",
      description: "One node is ancestor of the other",
      input: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 },
      expected: 2,
      isHidden: false,
    },
    {
      id: "deep-lca",
      description: "LCA deep in the tree",
      input: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 3, q: 5 },
      expected: 4,
      isHidden: false,
    },
    {
      id: "hidden-right-subtree",
      description: "Both nodes in right subtree",
      input: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 7, q: 9 },
      expected: 8,
      isHidden: true,
    },
    {
      id: "hidden-two-nodes",
      description: "Minimal two-node tree",
      input: { tree: [2, 1], p: 1, q: 2 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "hidden-leaf-nodes",
      description: "Both are leaf nodes",
      input: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 0, q: 5 },
      expected: 2,
      isHidden: true,
    },
  ],
};
