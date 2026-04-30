export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "flip-binary-tree",  category: "grind-75",
  title: "Flip Binary Tree",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to flip the nodes in a binary tree.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given the root of a binary tree, invert it — swap the left and right children of every node — and return the root.

Implement \`invertTree(root)\`.

This was famously the subject of a tweet by Max Howell about the Google interview process.

## Constraints

- Tree nodes have shape \`{ val, left, right }\`.
- The tree may be \`null\` (return \`null\`).
- The inversion must be applied recursively to **all** nodes, not just the root.
- Modify the tree in place and return the root.

## Examples

\`\`\`js
//     4              4
//    / \\\\           / \\\\
//   2   7   →     7   2
//  / \\\\ / \\\\      / \\\\ / \\\\
// 1  3 6  9    9  6 3  1
invertTree(root);  // returns the modified root

//   2        2
//  /    →     \\\\
// 1            1
invertTree(root);  // returns modified root
\`\`\`

## Notes

- Recursive approach: swap left and right children, then recursively invert each subtree.
- Base case: if the node is \`null\`, return \`null\`.
- Can also be done iteratively with a queue (BFS) — process each node, swap its children, and enqueue them.
- $O(n)$ time, $O(H)$ space for recursion stack.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}
\`\`\`

</details>

## Resources

- [Invert Binary Tree — LeetCode](https://leetcode.com/problems/invert-binary-tree/)
- [Binary Tree — Wikipedia](https://en.wikipedia.org/wiki/Binary_tree)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Invert (flip) a binary tree — swap left/right children of every node.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null } | null} root
 * @returns {{ val: number, left: object|null, right: object|null } | null} The inverted tree root
 */
function invertTree(root) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function invertTree(root) {
  if (!root) return null;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function buildTree(arr) {
  if (!arr || !arr.length || arr[0] === null) return null;
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

function serializeTree(node) {
  if (!node) return [];
  const result = [];
  const queue = [node];
  while (queue.length) {
    const n = queue.shift();
    if (n) {
      result.push(n.val);
      queue.push(n.left);
      queue.push(n.right);
    } else {
      result.push(null);
    }
  }
  while (result.length && result[result.length - 1] === null) result.pop();
  return result;
}

function solve(input) {
  const root = buildTree(input.tree);
  const inverted = invertTree(root);
  return serializeTree(inverted);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "balanced-tree",
      description: "Invert a balanced tree",
      input: { tree: [4, 2, 7, 1, 3, 6, 9] },
      expected: [4, 7, 2, 9, 6, 3, 1],
      isHidden: false,
    },
    {
      id: "left-only",
      description: "Left-only child becomes right-only",
      input: { tree: [2, 1] },
      expected: [2, null, 1],
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node remains unchanged",
      input: { tree: [1] },
      expected: [1],
      isHidden: false,
    },
    {
      id: "hidden-null-tree",
      description: "Null tree returns empty",
      input: { tree: [] },
      expected: [],
      isHidden: true,
    },
    {
      id: "hidden-right-only",
      description: "Right-only child becomes left-only",
      input: { tree: [1, null, 2] },
      expected: [1, 2],
      isHidden: true,
    },
    {
      id: "hidden-deeper",
      description: "Deeper tree inversion",
      input: { tree: [1, 2, 3, 4, 5] },
      expected: [1, 3, 2, null, null, 5, 4],
      isHidden: true,
    },
  ],
};
