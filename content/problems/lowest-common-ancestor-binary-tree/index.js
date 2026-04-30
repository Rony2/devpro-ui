export const problem = {
  slug: "lowest-common-ancestor-binary-tree",  category: "grind-75",
  title: "Lowest Common Ancestor of a Binary Tree",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Binary Trees", "DFS"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the lowest common ancestor of two nodes in a binary tree.",

  problemMdx: `## Overview

Given a binary tree and two nodes \`p\` and \`q\`, find their **lowest common ancestor (LCA)** — the deepest node that has both \`p\` and \`q\` as descendants (a node can be a descendant of itself).

## Constraints

- The number of nodes is in the range \`[2, 100,000]\`.
- All node values are unique.
- \`p !== q\` and both exist in the tree.

## Examples

\`\`\`js
// Tree: [3,5,1,6,2,0,8,null,null,7,4]
lowestCommonAncestor(root, 5, 1); // => 3
lowestCommonAncestor(root, 5, 4); // => 5
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}
\`\`\`

</details>

## Resources

- [Lowest Common Ancestor — LeetCode](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)`,

  starterCode: `/**
 * Find the lowest common ancestor of nodes p and q.
 * @param {TreeNode} root
 * @param {number} p
 * @param {number} q
 * @returns {TreeNode}
 */
function lowestCommonAncestor(root, p, q) {
  // your implementation
}`,

  solution: `function lowestCommonAncestor(root, p, q) {
  if (!root || root.val === p || root.val === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`,

  harness: `
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root]; let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); } i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); } i++;
  }
  return root;
}
function solve(input) {
  const root = buildTree(input.tree);
  const result = lowestCommonAncestor(root, input.p, input.q);
  return result ? result.val : null;
}`,

  tests: [
    { id: "root-is-lca", description: "LCA is root", input: { tree: [3,5,1,6,2,0,8,null,null,7,4], p: 5, q: 1 }, expected: 3, isHidden: false },
    { id: "ancestor-self", description: "Node is ancestor of itself", input: { tree: [3,5,1,6,2,0,8,null,null,7,4], p: 5, q: 4 }, expected: 5, isHidden: false },
    { id: "siblings", description: "Siblings", input: { tree: [1,2,3], p: 2, q: 3 }, expected: 1, isHidden: false },
    { id: "deep", description: "Deep nodes", input: { tree: [3,5,1,6,2,0,8,null,null,7,4], p: 7, q: 4 }, expected: 2, isHidden: true },
    { id: "two-nodes", description: "Two-node tree", input: { tree: [1,2], p: 1, q: 2 }, expected: 1, isHidden: true },
    { id: "left-subtree", description: "Both in left subtree", input: { tree: [3,5,1,6,2,0,8,null,null,7,4], p: 6, q: 2 }, expected: 5, isHidden: true },
  ],
};
