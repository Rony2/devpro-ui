export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "trie-prefix-tree",  category: "grind-75",
  title: "Trie (Prefix Tree)",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Trie"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a trie-prefix-tree with insert, search, and starts with functionality.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

A **Trie** (pronounced "try"), also called a prefix tree, is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Your solution will be tested by processing a list of operations. Implement \`processTrie(operations)\` where each operation is one of:

- \`["insert", word]\` — inserts the string \`word\` into the trie.
- \`["search", word]\` — returns \`true\` if the exact string \`word\` is in the trie, \`false\` otherwise.
- \`["startsWith", prefix]\` — returns \`true\` if there is any string in the trie that starts with the given \`prefix\`, \`false\` otherwise.

Return an array of results (\`null\` for insert, boolean for search/startsWith).

## Constraints

- \`1 ≤ word.length, prefix.length ≤ 2000\`
- \`word\` and \`prefix\` consist only of lowercase English letters.
- At most 30,000 calls total.

## Examples

\`\`\`js
processTrie([
  ["insert", "apple"],
  ["search", "apple"],      // → true
  ["search", "app"],        // → false
  ["startsWith", "app"],    // → true
  ["insert", "app"],
  ["search", "app"],        // → true
]);
// → [null, true, false, true, null, true]
\`\`\`

## Notes

- Each trie node has up to 26 children (one per letter) and a boolean flag marking end-of-word.
- Insert: walk the trie creating nodes as needed, mark the last node.
- Search: walk the trie; return \`true\` only if the final node exists and is marked as end-of-word.
- StartsWith: walk the trie; return \`true\` if the walk completes without a missing node.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function processTrie(operations) {
  const root = {};
  const results = [];

  function insert(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.$ = true;
  }

  function search(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return node.$ === true;
  }

  function startsWith(prefix) {
    let node = root;
    for (const ch of prefix) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return true;
  }

  for (const op of operations) {
    if (op[0] === "insert") { insert(op[1]); results.push(null); }
    else if (op[0] === "search") { results.push(search(op[1])); }
    else { results.push(startsWith(op[1])); }
  }

  return results;
}
\`\`\`

</details>

## Resources

- [Implement Trie — LeetCode](https://leetcode.com/problems/implement-trie-prefix-tree/)
- [Trie — Wikipedia](https://en.wikipedia.org/wiki/Trie)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Process a sequence of trie operations: insert, search, startsWith.
 *
 * @param {Array} operations - Each is ["insert", word], ["search", word], or ["startsWith", prefix]
 * @returns {Array} Results: null for insert, boolean for search/startsWith
 */
function processTrie(operations) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function processTrie(operations) {
  const root = {};
  const results = [];

  function insert(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.$ = true;
  }

  function search(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return node.$ === true;
  }

  function startsWith(prefix) {
    let node = root;
    for (const ch of prefix) {
      if (!node[ch]) return false;
      node = node[ch];
    }
    return true;
  }

  for (const op of operations) {
    if (op[0] === "insert") { insert(op[1]); results.push(null); }
    else if (op[0] === "search") { results.push(search(op[1])); }
    else { results.push(startsWith(op[1])); }
  }

  return results;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return processTrie(input.operations);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic",
      description: "Insert apple, search, startsWith, insert app",
      input: {
        operations: [
          ["insert", "apple"],
          ["search", "apple"],
          ["search", "app"],
          ["startsWith", "app"],
          ["insert", "app"],
          ["search", "app"],
        ],
      },
      expected: [null, true, false, true, null, true],
      isHidden: false,
    },
    {
      id: "not-found",
      description: "Search for non-existent word",
      input: {
        operations: [
          ["insert", "hello"],
          ["search", "hell"],
          ["search", "helloo"],
          ["search", "hello"],
        ],
      },
      expected: [null, false, false, true],
      isHidden: false,
    },
    {
      id: "prefix-only",
      description: "startsWith matches but search does not",
      input: {
        operations: [
          ["insert", "banana"],
          ["startsWith", "ban"],
          ["startsWith", "banan"],
          ["search", "ban"],
        ],
      },
      expected: [null, true, true, false],
      isHidden: false,
    },
    {
      id: "hidden-empty-prefix",
      description: "Empty prefix always matches if trie has words",
      input: {
        operations: [
          ["insert", "a"],
          ["startsWith", ""],
        ],
      },
      expected: [null, true],
      isHidden: true,
    },
    {
      id: "hidden-overlapping",
      description: "Multiple overlapping words",
      input: {
        operations: [
          ["insert", "abc"],
          ["insert", "ab"],
          ["insert", "a"],
          ["search", "a"],
          ["search", "ab"],
          ["search", "abc"],
          ["search", "abcd"],
        ],
      },
      expected: [null, null, null, true, true, true, false],
      isHidden: true,
    },
    {
      id: "hidden-no-prefix",
      description: "startsWith returns false for missing prefix",
      input: {
        operations: [
          ["insert", "cat"],
          ["insert", "car"],
          ["startsWith", "can"],
          ["startsWith", "ca"],
          ["startsWith", "d"],
        ],
      },
      expected: [null, null, false, true, false],
      isHidden: true,
    },
  ],
};
