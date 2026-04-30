export const problem = {
  slug: "balanced-binary-tree",  category: "grind-75",
  title: "Balanced Binary Tree",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Binary Trees", "DFS"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to determine if a binary tree is height-balanced.",

  problemMdx: `## Overview

Given a binary tree, determine if it is **height-balanced** — a tree where the depth of the two subtrees of every node never differs by more than 1.

## Constraints

- The number of nodes is in the range \`[0, 5000]\`.
- \`-10^4 <= Node.val <= 10^4\`
- The tree is given as an array in level-order (null for missing nodes).

## Examples

\`\`\`js
isBalanced([3, 9, 20, null, null, 15, 7]);
// => true

isBalanced([1, 2, 2, 3, 3, null, null, 4, 4]);
// => false
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
  return height(root) !== -1;
}
\`\`\`

</details>

## Resources

- [Balanced Binary Tree — LeetCode](https://leetcode.com/problems/balanced-binary-tree/)`,

  starterCode: `/**
 * Determine if a binary tree is height-balanced.
 * @param {TreeNode | null} root
 * @returns {boolean}
 */
function isBalanced(root) {
  // your implementation
}`,

  solution: `function isBalanced(root) {
  function height(node) {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }
  return height(root) !== -1;
}`,

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
function solve(input) { return isBalanced(buildTree(input.tree)); }`,

  tests: [
    { id: "balanced", description: "Balanced tree", input: { tree: [3,9,20,null,null,15,7] }, expected: true, isHidden: false },
    { id: "unbalanced", description: "Unbalanced tree", input: { tree: [1,2,2,3,3,null,null,4,4] }, expected: false, isHidden: false },
    { id: "empty", description: "Empty tree", input: { tree: [] }, expected: true, isHidden: false },
    { id: "single", description: "Single node", input: { tree: [1] }, expected: true, isHidden: true },
    { id: "left-heavy", description: "Left-heavy by 1", input: { tree: [1,2,3,4,null,null,null] }, expected: true, isHidden: true },
    { id: "skewed", description: "Completely skewed", input: { tree: [1,2,null,3,null] }, expected: false, isHidden: true },
  ],
};
