export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "binary-tree-equal",  category: "grind-75",
  title: "Binary Tree Equal",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Trees"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine whether two binary trees are equal.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given the roots of two binary trees, determine if they are structurally identical and have the same node values.

Implement \`isSameTree(p, q)\`.

## Constraints

- Tree nodes have shape \`{ val, left, right }\`.
- Both trees may be \`null\` (two null trees are equal).
- Node values are integers.
- Aim for $O(n)$ time where \`n\` is the number of nodes in the smaller tree.

## Examples

\`\`\`js
//   1       1
//  / \\\\    / \\\\
// 2   3  2   3
isSameTree(p, q);  // true

//   1       1
//  /         \\\\
// 2           2
isSameTree(p, q);  // false — different structure

//   1       1
//  / \\\\    / \\\\
// 2   1  1   2
isSameTree(p, q);  // false — different values
\`\`\`

## Notes

- Recursive approach: two trees are equal if their roots have the same value, **and** their left subtrees are equal, **and** their right subtrees are equal.
- Base cases: both null → true, one null → false.
- Can also be solved iteratively with a queue (BFS comparison).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
\`\`\`

</details>

## Resources

- [Same Tree — LeetCode](https://leetcode.com/problems/same-tree/)
- [Tree Traversal — Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Determine whether two binary trees are structurally identical with same values.
 * Tree nodes have shape: { val, left, right }
 *
 * @param {{ val: number, left: object|null, right: object|null } | null} p
 * @param {{ val: number, left: object|null, right: object|null } | null} q
 * @returns {boolean} True if the trees are equal
 */
function isSameTree(p, q) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
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
  const p = buildTree(input.tree1);
  const q = buildTree(input.tree2);
  return isSameTree(p, q);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "equal-trees",
      description: "Two identical trees",
      input: { tree1: [1, 2, 3], tree2: [1, 2, 3] },
      expected: true,
      isHidden: false,
    },
    {
      id: "different-structure",
      description: "Same values but different structure",
      input: { tree1: [1, 2, null], tree2: [1, null, 2] },
      expected: false,
      isHidden: false,
    },
    {
      id: "different-values",
      description: "Same structure but different values",
      input: { tree1: [1, 2, 1], tree2: [1, 1, 2] },
      expected: false,
      isHidden: false,
    },
    {
      id: "hidden-both-null",
      description: "Both trees are null",
      input: { tree1: [], tree2: [] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-one-null",
      description: "One tree is null, other is not",
      input: { tree1: [1], tree2: [] },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-deep-equal",
      description: "Deeper trees that are equal",
      input: { tree1: [1, 2, 3, 4, 5, 6, 7], tree2: [1, 2, 3, 4, 5, 6, 7] },
      expected: true,
      isHidden: true,
    },
  ],
};
