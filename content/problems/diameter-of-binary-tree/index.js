export const problem = {
  slug: "diameter-of-binary-tree",  category: "grind-75",
  title: "Diameter of Binary Tree",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Binary Trees", "DFS"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the diameter (longest path) of a binary tree.",

  problemMdx: `## Overview

Given the root of a binary tree, return the **diameter** — the length of the longest path between any two nodes. The path may or may not pass through the root. Length is measured in number of edges.

## Constraints

- The number of nodes is in the range \`[1, 10,000]\`.
- \`-100 <= Node.val <= 100\`

## Examples

\`\`\`js
diameterOfBinaryTree([1, 2, 3, 4, 5]);
// => 3  (path: 4 → 2 → 1 → 3)

diameterOfBinaryTree([1, 2]);
// => 1
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function diameterOfBinaryTree(root) {
  let diameter = 0;
  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return Math.max(left, right) + 1;
  }
  depth(root);
  return diameter;
}
\`\`\`

</details>

## Resources

- [Diameter of Binary Tree — LeetCode](https://leetcode.com/problems/diameter-of-binary-tree/)`,

  starterCode: `/**
 * Find the diameter of a binary tree (longest path in edges).
 * @param {TreeNode | null} root
 * @returns {number}
 */
function diameterOfBinaryTree(root) {
  // your implementation
}`,

  solution: `function diameterOfBinaryTree(root) {
  let diameter = 0;
  function depth(node) {
    if (!node) return 0;
    const left = depth(node.left);
    const right = depth(node.right);
    diameter = Math.max(diameter, left + right);
    return Math.max(left, right) + 1;
  }
  depth(root);
  return diameter;
}`,

  harness: `
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) { node.left = { val: arr[i], left: null, right: null }; queue.push(node.left); } i++;
    if (i < arr.length && arr[i] !== null) { node.right = { val: arr[i], left: null, right: null }; queue.push(node.right); } i++;
  }
  return root;
}
function solve(input) { return diameterOfBinaryTree(buildTree(input.tree)); }`,

  tests: [
    { id: "basic", description: "Tree [1,2,3,4,5] → 3", input: { tree: [1,2,3,4,5] }, expected: 3, isHidden: false },
    { id: "two-nodes", description: "Two nodes → 1", input: { tree: [1,2] }, expected: 1, isHidden: false },
    { id: "single", description: "Single node → 0", input: { tree: [1] }, expected: 0, isHidden: false },
    { id: "linear", description: "Linear chain", input: { tree: [1,2,null,3,null] }, expected: 2, isHidden: true },
    { id: "balanced", description: "Perfect binary tree", input: { tree: [1,2,3,4,5,6,7] }, expected: 4, isHidden: true },
    { id: "not-through-root", description: "Longest path not through root", input: { tree: [1,2,null,3,4,null,null,5,null,null,6] }, expected: 4, isHidden: true },
  ],
};
