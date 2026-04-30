export const problem = {
  slug: "binary-tree-subtree",  category: "grind-75",
  title: "Binary Tree Subtree",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Trees", "Recursion"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check if a binary tree is a subtree of another binary tree.",

  problemMdx: `## Overview

Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values as \`subRoot\`, and \`false\` otherwise.

A subtree of a binary tree is a tree that consists of a node in the original tree and all of its descendants.

## Constraints

- Both trees have 1 to 2,000 nodes.
- Node values are integers in range \`[-10000, 10000]\`.
- A tree is always a subtree of itself.

## Examples

\`\`\`js
// root:          subRoot:
//       3           4
//      / \\         / \\
//     4   5       1   2
//    / \\
//   1   2

isSubtree(root, subRoot); // => true
\`\`\`

\`\`\`js
// root:          subRoot:
//       3           4
//      / \\         / \\
//     4   5       1   2
//    / \\
//   1   2
//      /
//     0

isSubtree(root, subRoot); // => false (extra node 0)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
}
\`\`\`

</details>

## Resources

- [Subtree of Another Tree — LeetCode](https://leetcode.com/problems/subtree-of-another-tree/)
- [Tree Comparison — Wikipedia](https://en.wikipedia.org/wiki/Tree_(data_structure))`,

  starterCode: `/**
 * Check if subRoot is a subtree of root.
 * @param {{ val: number, left: TreeNode | null, right: TreeNode | null } | null} root
 * @param {{ val: number, left: TreeNode | null, right: TreeNode | null } | null} subRoot
 * @returns {boolean}
 */
function isSubtree(root, subRoot) {
  // your implementation
}`,

  solution: `function isSubtree(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

function isSame(a, b) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.val === b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
}`,

  harness: `
function solve(input) {
  return isSubtree(input.root, input.subRoot);
}`,

  tests: [
    {
      id: "is-subtree",
      description: "Matching subtree returns true",
      input: {
        root: {
          val: 3,
          left: { val: 4, left: { val: 1, left: null, right: null }, right: { val: 2, left: null, right: null } },
          right: { val: 5, left: null, right: null },
        },
        subRoot: { val: 4, left: { val: 1, left: null, right: null }, right: { val: 2, left: null, right: null } },
      },
      expected: true,
      isHidden: false,
    },
    {
      id: "not-subtree",
      description: "Extra node makes it not a subtree",
      input: {
        root: {
          val: 3,
          left: { val: 4, left: { val: 1, left: null, right: null }, right: { val: 2, left: { val: 0, left: null, right: null }, right: null } },
          right: { val: 5, left: null, right: null },
        },
        subRoot: { val: 4, left: { val: 1, left: null, right: null }, right: { val: 2, left: null, right: null } },
      },
      expected: false,
      isHidden: false,
    },
    {
      id: "same-tree",
      description: "Identical trees return true",
      input: {
        root: { val: 1, left: { val: 2, left: null, right: null }, right: null },
        subRoot: { val: 1, left: { val: 2, left: null, right: null }, right: null },
      },
      expected: true,
      isHidden: false,
    },
    {
      id: "single-node-match",
      description: "Single node subtree found in tree",
      input: {
        root: { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: null, right: null } },
        subRoot: { val: 2, left: null, right: null },
      },
      expected: true,
      isHidden: true,
    },
    {
      id: "different-values",
      description: "No matching subtree returns false",
      input: {
        root: { val: 1, left: { val: 2, left: null, right: null }, right: null },
        subRoot: { val: 3, left: null, right: null },
      },
      expected: false,
      isHidden: true,
    },
    {
      id: "deep-subtree",
      description: "Subtree found deep in the tree",
      input: {
        root: {
          val: 1,
          left: { val: 2, left: { val: 4, left: { val: 8, left: null, right: null }, right: null }, right: null },
          right: { val: 3, left: null, right: null },
        },
        subRoot: { val: 4, left: { val: 8, left: null, right: null }, right: null },
      },
      expected: true,
      isHidden: true,
    },
  ],
};
