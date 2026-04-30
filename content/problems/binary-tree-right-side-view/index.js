export const problem = {
  slug: "binary-tree-right-side-view",  category: "grind-75",
  title: "Binary Tree Right Side View",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Binary Trees", "BFS"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to return the right side view of a binary tree.",

  problemMdx: `## Overview

Given the root of a binary tree, return the values of nodes visible from the **right side**, ordered from top to bottom.

## Constraints

- The number of nodes is in the range \`[0, 100]\`.
- \`-100 <= Node.val <= 100\`

## Examples

\`\`\`js
rightSideView([1, 2, 3, null, 5, null, 4]);
// => [1, 3, 4]

rightSideView([1, null, 3]);
// => [1, 3]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}
\`\`\`

</details>

## Resources

- [Binary Tree Right Side View — LeetCode](https://leetcode.com/problems/binary-tree-right-side-view/)`,

  starterCode: `/**
 * Return the right side view of a binary tree.
 * @param {TreeNode | null} root
 * @returns {number[]}
 */
function rightSideView(root) {
  // your implementation
}`,

  solution: `function rightSideView(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
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
function solve(input) { return rightSideView(buildTree(input.tree)); }`,

  tests: [
    { id: "basic", description: "Standard right view", input: { tree: [1,2,3,null,5,null,4] }, expected: [1,3,4], isHidden: false },
    { id: "right-only", description: "Right-only chain", input: { tree: [1,null,3] }, expected: [1,3], isHidden: false },
    { id: "empty", description: "Empty tree", input: { tree: [] }, expected: [], isHidden: false },
    { id: "single", description: "Single node", input: { tree: [1] }, expected: [1], isHidden: true },
    { id: "left-deep", description: "Left subtree deeper", input: { tree: [1,2,3,4] }, expected: [1,3,4], isHidden: true },
    { id: "full", description: "Full binary tree", input: { tree: [1,2,3,4,5,6,7] }, expected: [1,3,7], isHidden: true },
  ],
};
