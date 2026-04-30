export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "word-finder",  category: "grind-75",
  title: "Word Finder",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "Trie", "DFS"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a data structure where words can be added and support wildcard searching.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Design a data structure that supports adding new words and searching for words with wildcard support.

Your solution will be tested by processing a list of operations. Implement \`processWordFinder(operations)\` where each operation is:

- \`["addWord", word]\` — adds \`word\` to the data structure.
- \`["search", pattern]\` — returns \`true\` if any previously added word matches the pattern. A \`.\` in the pattern matches **any single letter**.

Return an array of results (\`null\` for addWord, boolean for search).

## Constraints

- \`1 ≤ word.length ≤ 25\`
- \`word\` in addWord consists only of lowercase English letters.
- \`pattern\` in search consists of lowercase English letters and \`.\` (dot).
- At most 10,000 calls total.

## Examples

\`\`\`js
processWordFinder([
  ["addWord", "bad"],
  ["addWord", "dad"],
  ["addWord", "mad"],
  ["search", "pad"],    // → false
  ["search", "bad"],    // → true
  ["search", ".ad"],    // → true  — matches bad, dad, mad
  ["search", "b.."],    // → true  — matches bad
]);
// → [null, null, null, false, true, true, true]
\`\`\`

## Notes

- Use a Trie for storage. For search, when encountering a \`.\`, branch to **all** children and continue recursively.
- Exact characters follow the normal trie path.
- This is a DFS/backtracking search over the trie.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function processWordFinder(operations) {
  const root = {};
  const results = [];

  function addWord(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.$ = true;
  }

  function searchNode(word, idx, node) {
    if (idx === word.length) return node.$ === true;
    const ch = word[idx];
    if (ch === '.') {
      for (const key of Object.keys(node)) {
        if (key !== '$' && searchNode(word, idx + 1, node[key])) return true;
      }
      return false;
    }
    if (!node[ch]) return false;
    return searchNode(word, idx + 1, node[ch]);
  }

  for (const op of operations) {
    if (op[0] === "addWord") {
      addWord(op[1]);
      results.push(null);
    } else {
      results.push(searchNode(op[1], 0, root));
    }
  }

  return results;
}
\`\`\`

</details>

## Resources

- [Design Add and Search Words — LeetCode](https://leetcode.com/problems/design-add-and-search-words-data-structure/)
- [Trie — Wikipedia](https://en.wikipedia.org/wiki/Trie)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Process a sequence of word-finder operations: addWord and search (with '.' wildcard).
 *
 * @param {Array} operations - Each is ["addWord", word] or ["search", pattern]
 * @returns {Array} Results: null for addWord, boolean for search
 */
function processWordFinder(operations) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function processWordFinder(operations) {
  const root = {};
  const results = [];

  function addWord(word) {
    let node = root;
    for (const ch of word) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.$ = true;
  }

  function searchNode(word, idx, node) {
    if (idx === word.length) return node.$ === true;
    const ch = word[idx];
    if (ch === '.') {
      for (const key of Object.keys(node)) {
        if (key !== '$' && searchNode(word, idx + 1, node[key])) return true;
      }
      return false;
    }
    if (!node[ch]) return false;
    return searchNode(word, idx + 1, node[ch]);
  }

  for (const op of operations) {
    if (op[0] === "addWord") {
      addWord(op[1]);
      results.push(null);
    } else {
      results.push(searchNode(op[1], 0, root));
    }
  }

  return results;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return processWordFinder(input.operations);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic",
      description: "Add words, search exact and wildcard",
      input: {
        operations: [
          ["addWord", "bad"],
          ["addWord", "dad"],
          ["addWord", "mad"],
          ["search", "pad"],
          ["search", "bad"],
          ["search", ".ad"],
          ["search", "b.."],
        ],
      },
      expected: [null, null, null, false, true, true, true],
      isHidden: false,
    },
    {
      id: "all-dots",
      description: "Pattern of all dots matches any word of same length",
      input: {
        operations: [
          ["addWord", "cat"],
          ["search", "..."],
          ["search", "...."],
        ],
      },
      expected: [null, true, false],
      isHidden: false,
    },
    {
      id: "no-match",
      description: "Search before any insert returns false",
      input: {
        operations: [
          ["search", "abc"],
          ["addWord", "abc"],
          ["search", "abc"],
        ],
      },
      expected: [false, null, true],
      isHidden: false,
    },
    {
      id: "hidden-single-char",
      description: "Single character words with dot search",
      input: {
        operations: [
          ["addWord", "a"],
          ["addWord", "b"],
          ["search", "."],
          ["search", "c"],
        ],
      },
      expected: [null, null, true, false],
      isHidden: true,
    },
    {
      id: "hidden-prefix-not-word",
      description: "Prefix exists but is not a complete word",
      input: {
        operations: [
          ["addWord", "apple"],
          ["search", "app"],
          ["search", "app.."],
          ["search", ".pple"],
        ],
      },
      expected: [null, false, true, true],
      isHidden: true,
    },
    {
      id: "hidden-mixed-dots",
      description: "Dots in various positions",
      input: {
        operations: [
          ["addWord", "hello"],
          ["addWord", "world"],
          ["search", "h.llo"],
          ["search", "wor.d"],
          ["search", "....d"],
          ["search", "h...."],
        ],
      },
      expected: [null, null, true, true, true, true],
      isHidden: true,
    },
  ],
};
