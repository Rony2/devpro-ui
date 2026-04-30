export const problem = {
  slug: "binary-tree-from-traversals",  category: "grind-75",
  title: "Binary Tree Rebuilding from Preorder and Inorder Traversals",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Trees", "Recursion"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to construct a binary tree from preorder and inorder traversals.",

  problemMdx: `## Overview

Given two integer arrays \`preorder\` and \`inorder\` representing the preorder and inorder traversals of a binary tree, construct and return the binary tree.

The preorder traversal visits: root → left subtree → right subtree.
The inorder traversal visits: left subtree → root → right subtree.

## Constraints

- \`preorder.length === inorder.length\` (1 to 3,000 nodes).
- All values in \`preorder\` and \`inorder\` are unique.
- Each value in \`preorder\` also appears in \`inorder\`.
- Return a tree node object: \`{ val, left, right }\`.

## Examples

\`\`\`js
buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
// =>
//       3
//      / \\
//     9   20
//        / \\
//      15   7
\`\`\`

\`\`\`js
buildTree([1], [1]);
// => { val: 1, left: null, right: null }
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal);
  return {
    val: rootVal,
    left: buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid)),
    right: buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1)),
  };
}
\`\`\`

</details>

## Resources

- [Construct Binary Tree from Preorder and Inorder — LeetCode](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)
- [Tree Traversals — Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)`,

  starterCode: `/**
 * Build a binary tree from preorder and inorder traversal arrays.
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @returns {{ val: number, left: TreeNode | null, right: TreeNode | null } | null}
 */
function buildTree(preorder, inorder) {
  // your implementation
}`,

  solution: `function buildTree(preorder, inorder) {
  if (!preorder.length) return null;
  const rootVal = preorder[0];
  const mid = inorder.indexOf(rootVal);
  return {
    val: rootVal,
    left: buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid)),
    right: buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1)),
  };
}`,

  harness: `
function solve(input) {
  return buildTree(input.preorder, input.inorder);
}`,

  tests: [
    {
      id: "basic",
      description: "Builds a 5-node tree correctly",
      input: { preorder: [3, 9, 20, 15, 7], inorder: [9, 3, 15, 20, 7] },
      expected: {
        val: 3,
        left: { val: 9, left: null, right: null },
        right: { val: 20, left: { val: 15, left: null, right: null }, right: { val: 7, left: null, right: null } },
      },
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single-element arrays produce a leaf",
      input: { preorder: [1], inorder: [1] },
      expected: { val: 1, left: null, right: null },
      isHidden: false,
    },
    {
      id: "left-skewed",
      description: "All nodes go left",
      input: { preorder: [3, 2, 1], inorder: [1, 2, 3] },
      expected: {
        val: 3,
        left: { val: 2, left: { val: 1, left: null, right: null }, right: null },
        right: null,
      },
      isHidden: false,
    },
    {
      id: "right-skewed",
      description: "All nodes go right",
      input: { preorder: [1, 2, 3], inorder: [1, 2, 3] },
      expected: {
        val: 1,
        left: null,
        right: { val: 2, left: null, right: { val: 3, left: null, right: null } },
      },
      isHidden: true,
    },
    {
      id: "two-nodes",
      description: "Two-node tree",
      input: { preorder: [1, 2], inorder: [2, 1] },
      expected: { val: 1, left: { val: 2, left: null, right: null }, right: null },
      isHidden: true,
    },
    {
      id: "balanced",
      description: "Balanced tree reconstruction",
      input: { preorder: [4, 2, 1, 3, 6, 5, 7], inorder: [1, 2, 3, 4, 5, 6, 7] },
      expected: {
        val: 4,
        left: { val: 2, left: { val: 1, left: null, right: null }, right: { val: 3, left: null, right: null } },
        right: { val: 6, left: { val: 5, left: null, right: null }, right: { val: 7, left: null, right: null } },
      },
      isHidden: true,
    },
  ],
};
