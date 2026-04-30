export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "validate-bst",  category: "grind-75",
  title: "Validate Binary Search Tree",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Binary Search Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to validate whether a binary tree is a valid binary search tree.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as:
- The left subtree of a node contains only nodes with values **strictly less than** the node's value.
- The right subtree contains only nodes with values **strictly greater than** the node's value.
- Both subtrees must also be valid BSTs.

Implement \`isValidBST(root)\`.

## Constraints

- Tree nodes have shape \`{ val, left, right }\`.
- Node values are integers (may be negative).
- An empty tree (\`null\`) is a valid BST.
- A single node is a valid BST.
- Must validate the **entire subtree** constraint — not just immediate children.

## Examples

\`\`\`js
//   2
//  / \\\\
// 1   3
isValidBST(root);  // true

//   5
//  / \\\\
// 1   4
//    / \\\\
//   3   6
isValidBST(root);  // false — 3 is in right subtree of 5 but < 5… wait, 
//                    4 is in the right subtree of 5 but 4 < 5, so invalid.

//   1
//  / \\\\
// 1   1
isValidBST(root);  // false — duplicates not allowed
\`\`\`

## Notes

- The naive approach of checking only immediate children is **wrong** — a node in the right subtree could violate the root's constraint while satisfying its parent's.
- Pass down min/max bounds: each recursive call narrows the valid range for that subtree.
- Alternatively, an in-order traversal should produce a strictly increasing sequence.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}
\`\`\`

</details>

## Resources

- [Validate Binary Search Tree — LeetCode](https://leetcode.com/problems/validate-binary-search-tree/)
- [Binary Search Tree — Wikipedia](https://en.wikipedia.org/wiki/Binary_search_tree)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Validate whether a binary tree is a valid BST.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null } | null} root
 * @returns {boolean} True if the tree is a valid BST
 */
function isValidBST(root) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
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
  return isValidBST(root);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "valid-simple",
      description: "Valid BST with three nodes",
      input: { tree: [2, 1, 3] },
      expected: true,
      isHidden: false,
    },
    {
      id: "invalid-right-subtree",
      description: "Invalid — right child violates BST property",
      input: { tree: [5, 1, 4, null, null, 3, 6] },
      expected: false,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node is always valid",
      input: { tree: [1] },
      expected: true,
      isHidden: false,
    },
    {
      id: "hidden-duplicates",
      description: "Duplicate values are not valid BST",
      input: { tree: [1, 1] },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-deep-violation",
      description: "Violation deep in left subtree of right child",
      input: { tree: [10, 5, 15, null, null, 6, 20] },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-left-skewed-valid",
      description: "Left-skewed tree that is valid",
      input: { tree: [3, 2, null, 1] },
      expected: true,
      isHidden: true,
    },
  ],
};
