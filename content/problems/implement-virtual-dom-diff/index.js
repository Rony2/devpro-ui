export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "implement-virtual-dom-diff",  category: "js-75",
  title: "Implement Virtual DOM Diffing",
  difficulty: "hard",
  type: "coding",
  topics: ["DOM", "Algorithms", "React Internals"],
  companies: ["Meta", "Vercel"],
  estimatedMinutes: 60,
  published: true,
  addedAt: "2026-03-30",
  description:
    "Compute a minimal patch list to transform one virtual tree into another.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Virtual DOM diffing is the core algorithm behind React's reconciler. Given two virtual trees — \`oldTree\` and \`newTree\` — compute a minimal list of **patches** that describe the mutations needed to transform one into the other.

Each node in the virtual tree has:
- \`type\` — a string tag name (\`"div"\`, \`"span"\`, \`"text"\`)
- \`children\` — an array of child nodes (optional, defaults to \`[]\`)
- \`value\` — the text content (only for \`type: "text"\` nodes)

Your \`diff(oldTree, newTree)\` function must return an array of patch objects, each with an \`op\` field describing the operation and a \`path\` array of child indices from the root.

## Constraints

- No external libraries.
- Must run in $O(n)$ relative to compared node count (single pass, no backtracking).
- Preserve child order — children are compared positionally (index-based).
- Include patch \`path\` as an array of integer indices from the root.
- Supported operations: \`TEXT\`, \`REPLACE\`, \`INSERT\`, \`REMOVE\`.
- If both trees are identical, return an empty array.

## Examples

\`\`\`js
// Text update — child at index 0 changed value.
const oldTree = { type: "div", children: [{ type: "text", value: "hello" }] };
const newTree = { type: "div", children: [{ type: "text", value: "world" }] };

diff(oldTree, newTree);
// [{ op: "TEXT", path: [0], value: "world" }]
\`\`\`

\`\`\`js
// Node replacement — root node type changed.
const oldTree = { type: "span", children: [] };
const newTree = { type: "div", children: [] };

diff(oldTree, newTree);
// [{ op: "REPLACE", path: [], node: { type: "div", children: [] } }]
\`\`\`

\`\`\`js
// Child insertion — new child appended.
const oldTree = { type: "ul", children: [{ type: "text", value: "a" }] };
const newTree = { type: "ul", children: [{ type: "text", value: "a" }, { type: "text", value: "b" }] };

diff(oldTree, newTree);
// [{ op: "INSERT", path: [1], node: { type: "text", value: "b" } }]
\`\`\`

## Notes

- Compare node identity (\`type\`) first — if types differ, emit a \`REPLACE\` and stop recursing.
- For text nodes, compare \`value\` and emit a \`TEXT\` patch if different.
- Recurse children using the max length of both arrays to detect inserts and removals at the tail.
- An absent node at position \`i\` in the old tree means \`INSERT\`; absent in new tree means \`REMOVE\`.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function diff(oldTree, newTree) {
  const patches = [];

  function walk(oldNode, newNode, path) {
    if (!oldNode && newNode) {
      patches.push({ op: "INSERT", path, node: newNode });
      return;
    }
    if (oldNode && !newNode) {
      patches.push({ op: "REMOVE", path });
      return;
    }
    if (oldNode.type !== newNode.type) {
      patches.push({ op: "REPLACE", path, node: newNode });
      return;
    }
    if (oldNode.type === "text" && oldNode.value !== newNode.value) {
      patches.push({ op: "TEXT", path, value: newNode.value });
      return;
    }

    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxLen = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLen; i += 1) {
      walk(oldChildren[i], newChildren[i], [...path, i]);
    }
  }

  walk(oldTree, newTree, []);
  return patches;
}
\`\`\`

</details>

## Resources

- [React Reconciliation](https://react.dev/learn/render-and-commit)
- [DOM Standard](https://dom.spec.whatwg.org/)
- [Tree Edit Distance Overview](https://en.wikipedia.org/wiki/Tree_edit_distance)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Compute the minimal set of DOM patch operations to transform oldTree into newTree.
 *
 * @param {{ type: string, children?: object[], value?: string }} oldTree
 * @param {{ type: string, children?: object[], value?: string }} newTree
 * @returns {Array<{ op: string, path: number[], node?: object, value?: string }>}
 */
function diff(oldTree, newTree) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function diff(oldTree, newTree) {
  const patches = [];

  function walk(oldNode, newNode, path) {
    if (!oldNode && newNode) {
      patches.push({ op: "INSERT", path, node: newNode });
      return;
    }
    if (oldNode && !newNode) {
      patches.push({ op: "REMOVE", path });
      return;
    }
    if (oldNode.type !== newNode.type) {
      patches.push({ op: "REPLACE", path, node: newNode });
      return;
    }
    if (oldNode.type === "text" && oldNode.value !== newNode.value) {
      patches.push({ op: "TEXT", path, value: newNode.value });
      return;
    }

    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxLen = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLen; i += 1) {
      walk(oldChildren[i], newChildren[i], [...path, i]);
    }
  }

  walk(oldTree, newTree, []);
  return patches;
}`,

  // ── Harness (appended server-side to user code before execution) ──
  harness: `
function solve(input) {
  const { oldTree, newTree } = input;
  return diff(oldTree, newTree);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "text-update",
      description: "Updates text node value",
      input: {
        oldTree: { type: "div", children: [{ type: "text", value: "a" }] },
        newTree: { type: "div", children: [{ type: "text", value: "b" }] },
      },
      expected: [{ op: "TEXT", path: [0], value: "b" }],
      isHidden: false,
    },
    {
      id: "replace-node",
      description: "Replaces differing node types",
      input: {
        oldTree: { type: "span", children: [] },
        newTree: { type: "div", children: [] },
      },
      expected: [{ op: "REPLACE", path: [], node: { type: "div", children: [] } }],
      isHidden: false,
    },
    {
      id: "child-insert",
      description: "Detects appended child node",
      input: {
        oldTree: { type: "ul", children: [{ type: "text", value: "x" }] },
        newTree: {
          type: "ul",
          children: [{ type: "text", value: "x" }, { type: "text", value: "y" }],
        },
      },
      expected: [{ op: "INSERT", path: [1], node: { type: "text", value: "y" } }],
      isHidden: false,
    },
    {
      id: "hidden-identical-trees",
      description: "Returns empty patches for identical trees",
      input: {
        oldTree: { type: "div", children: [{ type: "text", value: "same" }] },
        newTree: { type: "div", children: [{ type: "text", value: "same" }] },
      },
      expected: [],
      isHidden: true,
    },
    {
      id: "hidden-child-remove",
      description: "Detects removed child",
      input: {
        oldTree: { type: "ul", children: [{ type: "text", value: "a" }, { type: "text", value: "b" }] },
        newTree: { type: "ul", children: [{ type: "text", value: "a" }] },
      },
      expected: [{ op: "REMOVE", path: [1] }],
      isHidden: true,
    },
    {
      id: "hidden-deep-nested",
      description: "Handles deeply nested text change",
      input: {
        oldTree: { type: "div", children: [{ type: "div", children: [{ type: "text", value: "deep" }] }] },
        newTree: { type: "div", children: [{ type: "div", children: [{ type: "text", value: "changed" }] }] },
      },
      expected: [{ op: "TEXT", path: [0, 0], value: "changed" }],
      isHidden: true,
    },
  ],
};
