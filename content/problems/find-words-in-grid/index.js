export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "find-words-in-grid",  category: "grind-75",
  title: "Find Words in Grid",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Trie"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 55,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find all the words present in the grid.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an \`m × n\` board of characters and a list of words, return all words that can be formed on the board.

Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically). A cell cannot be reused within a single word, but **can** be reused across different words.

Implement \`findWords(board, words)\`.

## Constraints

- \`board\` is a 2D array of lowercase letters.
- \`words\` is an array of lowercase strings.
- Same cell cannot be used twice in one word path.
- Return words in any order, with no duplicates.
- Naive approach (run word-search per word) is too slow — use a Trie for $O(m \\times n \\times 4^L)$ total instead of $O(W \\times m \\times n \\times 4^L)$.

## Examples

\`\`\`js
const board = [
  ["o","a","a","n"],
  ["e","t","a","e"],
  ["i","h","k","r"],
  ["i","f","l","v"]
];

findWords(board, ["oath","pea","eat","rain"]);
// → ["eat", "oath"]  (any order)
\`\`\`

\`\`\`js
findWords([["a","b"],["c","d"]], ["abcb"]);
// → []  — can't reuse cells
\`\`\`

## Notes

- **Trie + backtracking**: Build a Trie from the word list. Then DFS from every cell, walking the Trie in parallel. When you reach a Trie node that marks a complete word, record it.
- Prune Trie nodes after finding a word to avoid duplicate results and speed up future searches.
- This is significantly faster than running the single-word search for each word independently.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function findWords(board, words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.word = w;
  }

  const rows = board.length, cols = board[0].length;
  const result = [];

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const ch = board[r][c];
    if (ch === "#" || !node[ch]) return;

    const next = node[ch];
    if (next.word) {
      result.push(next.word);
      delete next.word; // avoid duplicates
    }

    board[r][c] = "#";
    dfs(r + 1, c, next);
    dfs(r - 1, c, next);
    dfs(r, c + 1, next);
    dfs(r, c - 1, next);
    board[r][c] = ch;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return result;
}
\`\`\`

</details>

## Resources

- [Word Search II — LeetCode](https://leetcode.com/problems/word-search-ii/)
- [Trie — Wikipedia](https://en.wikipedia.org/wiki/Trie)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find all words from the list that can be formed on the board.
 * Adjacent = horizontal/vertical. Each cell used at most once per word.
 *
 * @param {string[][]} board - 2D grid of lowercase characters
 * @param {string[]} words - List of words to search for
 * @returns {string[]} Found words (any order, no duplicates)
 */
function findWords(board, words) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function findWords(board, words) {
  const root = {};
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node[ch]) node[ch] = {};
      node = node[ch];
    }
    node.word = w;
  }

  const rows = board.length, cols = board[0].length;
  const result = [];

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const ch = board[r][c];
    if (ch === "#" || !node[ch]) return;

    const next = node[ch];
    if (next.word) {
      result.push(next.word);
      delete next.word;
    }

    board[r][c] = "#";
    dfs(r + 1, c, next);
    dfs(r - 1, c, next);
    dfs(r, c + 1, next);
    dfs(r, c - 1, next);
    board[r][c] = ch;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return result;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  const board = input.board.map(row => [...row]);
  const result = findWords(board, input.words);
  return result.slice().sort();
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "two-found",
      description: "Finds two words out of four",
      input: {
        board: [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
        words: ["oath", "pea", "eat", "rain"],
      },
      expected: ["eat", "oath"],
      isHidden: false,
    },
    {
      id: "none-found",
      description: "No words found due to reuse constraint",
      input: { board: [["a","b"],["c","d"]], words: ["abcb"] },
      expected: [],
      isHidden: false,
    },
    {
      id: "single-char",
      description: "Single character words",
      input: { board: [["a","b"],["c","d"]], words: ["a", "e"] },
      expected: ["a"],
      isHidden: false,
    },
    {
      id: "hidden-all-found",
      description: "All words found",
      input: { board: [["a","b"],["c","d"]], words: ["ab", "cd", "ac"] },
      expected: ["ab", "ac", "cd"],
      isHidden: true,
    },
    {
      id: "hidden-overlapping-paths",
      description: "Words share overlapping paths",
      input: {
        board: [["a","b","c"],["d","e","f"],["g","h","i"]],
        words: ["abed", "abc", "defi"],
      },
      expected: ["abc", "abed", "defi"],
      isHidden: true,
    },
    {
      id: "hidden-duplicate-words",
      description: "Duplicate words in input — no duplicate output",
      input: { board: [["a"]], words: ["a", "a"] },
      expected: ["a"],
      isHidden: true,
    },
  ],
};
