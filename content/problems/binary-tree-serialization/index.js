export const problem = {
  slug: "binary-tree-serialization",  category: "js-75",
  title: "Binary Tree Serialization and Deserialization",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Trees", "Design"],
  companies: ["Meta", "Google", "Stripe"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to serialize and deserialize a binary tree.",

  problemMdx: `## Overview

Design an algorithm to serialize a binary tree into a string and deserialize that string back into the original tree. The serialization format is up to you — the only requirement is that \`deserialize(serialize(root))\` produces a structurally identical tree.

## Constraints

- The tree can have 0 to 5,000 nodes.
- Node values are integers in range \`[-1000, 1000]\`.
- \`serialize\` must return a string.
- \`deserialize\` must accept that string and return the root node.
- \`null\` root should serialize and deserialize correctly.

## Examples

\`\`\`js
// Tree:
//       1
//      / \\
//     2   3
//        / \\
//       4   5

const tree = { val: 1, left: { val: 2, left: null, right: null }, right: { val: 3, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } } };

const str = serialize(tree);
deserialize(str);
// => structurally identical tree
\`\`\`

\`\`\`js
serialize(null);   // some string representation
deserialize(serialize(null)); // => null
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function serialize(root) {
  const parts = [];
  function dfs(node) {
    if (node === null) { parts.push("N"); return; }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(",");
}

function deserialize(data) {
  const tokens = data.split(",");
  let i = 0;
  function dfs() {
    if (tokens[i] === "N") { i++; return null; }
    const node = { val: Number(tokens[i]), left: null, right: null };
    i++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  return dfs();
}
\`\`\`

</details>

## Resources

- [Serialize and Deserialize Binary Tree — LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)
- [Preorder Traversal — Wikipedia](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order)`,

  starterCode: `/**
 * Serialize a binary tree to a string.
 * @param {{ val: number, left: TreeNode | null, right: TreeNode | null } | null} root
 * @returns {string}
 */
function serialize(root) {
  // your implementation
}

/**
 * Deserialize a string back to a binary tree.
 * @param {string} data
 * @returns {{ val: number, left: TreeNode | null, right: TreeNode | null } | null}
 */
function deserialize(data) {
  // your implementation
}`,

  solution: `function serialize(root) {
  const parts = [];
  function dfs(node) {
    if (node === null) { parts.push("N"); return; }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(",");
}

function deserialize(data) {
  const tokens = data.split(",");
  let i = 0;
  function dfs() {
    if (tokens[i] === "N") { i++; return null; }
    const node = { val: Number(tokens[i]), left: null, right: null };
    i++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }
  return dfs();
}`,

  harness: `
function solve(input) {
  const str = serialize(input.root);
  return deserialize(str);
}`,

  tests: [
    {
      id: "basic-tree",
      description: "Round-trips a 5-node tree",
      input: {
        root: {
          val: 1,
          left: { val: 2, left: null, right: null },
          right: { val: 3, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
        },
      },
      expected: {
        val: 1,
        left: { val: 2, left: null, right: null },
        right: { val: 3, left: { val: 4, left: null, right: null }, right: { val: 5, left: null, right: null } },
      },
      isHidden: false,
    },
    {
      id: "null-root",
      description: "Handles null root",
      input: { root: null },
      expected: null,
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Single node round-trips",
      input: { root: { val: 42, left: null, right: null } },
      expected: { val: 42, left: null, right: null },
      isHidden: false,
    },
    {
      id: "negative-values",
      description: "Handles negative node values",
      input: {
        root: { val: -1, left: { val: -2, left: null, right: null }, right: { val: -3, left: null, right: null } },
      },
      expected: { val: -1, left: { val: -2, left: null, right: null }, right: { val: -3, left: null, right: null } },
      isHidden: true,
    },
    {
      id: "left-only",
      description: "Left-only tree",
      input: {
        root: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: null },
      },
      expected: { val: 1, left: { val: 2, left: { val: 3, left: null, right: null }, right: null }, right: null },
      isHidden: true,
    },
    {
      id: "complex-tree",
      description: "Complex asymmetric tree",
      input: {
        root: {
          val: 5,
          left: { val: 3, left: { val: 1, left: null, right: null }, right: { val: 4, left: null, right: null } },
          right: { val: 8, left: null, right: { val: 10, left: null, right: null } },
        },
      },
      expected: {
        val: 5,
        left: { val: 3, left: { val: 1, left: null, right: null }, right: { val: 4, left: null, right: null } },
        right: { val: 8, left: null, right: { val: 10, left: null, right: null } },
      },
      isHidden: true,
    },
  ],
};
