export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "binary-tree-level-order",  category: "grind-75",
  title: "Binary Tree Level Order Traversal",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the level order traversal of a binary tree.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given the root of a binary tree, return its level order traversal — an array of arrays, where each inner array contains the values of nodes at that depth level, from left to right.

Implement \`levelOrder(root)\`.

## Constraints

- Tree nodes have shape \`{ val, left, right }\`.
- A \`null\` root returns an empty array \`[]\`.
- Each level's nodes are listed left to right.
- Aim for $O(n)$ time and $O(n)$ space.

## Examples

\`\`\`js
//     3
//    / \\\\
//   9  20
//     /  \\\\
//    15   7
levelOrder(root);  // [[3], [9, 20], [15, 7]]

//   1
levelOrder(root);  // [[1]]

levelOrder(null);  // []
\`\`\`

## Notes

- Classic BFS with a queue. For each level, drain all current queue items (one level's worth) and collect their values, then enqueue their children.
- Track the level boundary by recording the queue length at the start of each iteration.
- Can also be solved with DFS by passing depth as a parameter and building the result array by index.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
}
\`\`\`

</details>

## Resources

- [Binary Tree Level Order Traversal — LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [Breadth-First Search — Wikipedia](https://en.wikipedia.org/wiki/Breadth-first_search)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Return level order traversal of a binary tree.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null } | null} root
 * @returns {number[][]} Array of arrays, each containing values at that depth
 */
function levelOrder(root) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }

  return result;
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

function solve(input) {
  const root = buildTree(input.tree);
  return levelOrder(root);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "three-levels",
      description: "Three-level tree",
      input: { tree: [3, 9, 20, null, null, 15, 7] },
      expected: [[3], [9, 20], [15, 7]],
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node tree",
      input: { tree: [1] },
      expected: [[1]],
      isHidden: false,
    },
    {
      id: "null-tree",
      description: "Null tree returns empty array",
      input: { tree: [] },
      expected: [],
      isHidden: false,
    },
    {
      id: "hidden-left-skewed",
      description: "Left-skewed tree — one node per level",
      input: { tree: [1, 2, null, 3] },
      expected: [[1], [2], [3]],
      isHidden: true,
    },
    {
      id: "hidden-complete",
      description: "Complete binary tree",
      input: { tree: [1, 2, 3, 4, 5, 6, 7] },
      expected: [[1], [2, 3], [4, 5, 6, 7]],
      isHidden: true,
    },
    {
      id: "hidden-unbalanced",
      description: "Unbalanced tree with gaps",
      input: { tree: [1, 2, 3, null, 4, null, 5] },
      expected: [[1], [2, 3], [4, 5]],
      isHidden: true,
    },
  ],
};
