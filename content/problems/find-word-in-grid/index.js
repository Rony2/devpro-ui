export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "find-word-in-grid",  category: "grind-75",
  title: "Find Word in Grid",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Backtracking"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check the existence of a word in a grid.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an \`m × n\` grid of characters and a string \`word\`, return \`true\` if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Each cell may be used only once per word.

Implement \`wordExists(board, word)\`.

## Constraints

- \`board\` is a 2D array of single characters.
- \`word\` is a non-empty string.
- Same cell cannot be reused within a single path.
- Cells are adjacent horizontally or vertically (not diagonally).
- Aim for $O(m \\times n \\times 4^L)$ where \`L\` is the word length (backtracking with pruning).

## Examples

\`\`\`js
const board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
];

wordExists(board, "ABCCED");  // true
wordExists(board, "SEE");     // true
wordExists(board, "ABCB");    // false — can't reuse B
\`\`\`

## Notes

- DFS/backtracking from every cell that matches the first character.
- Mark cells as visited during recursion (e.g. replace with \`#\`), restore on backtrack.
- Prune early: if the current character doesn't match, return immediately.
- No need for a separate visited set if you temporarily mutate the board.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function wordExists(board, word) {
  const rows = board.length, cols = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[idx]) return false;

    const saved = board[r][c];
    board[r][c] = "#";

    const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) ||
                  dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);

    board[r][c] = saved;
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}
\`\`\`

</details>

## Resources

- [Word Search — LeetCode](https://leetcode.com/problems/word-search/)
- [Backtracking — Wikipedia](https://en.wikipedia.org/wiki/Backtracking)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Check if a word exists in a character grid.
 * Adjacent = horizontal/vertical. Each cell used at most once.
 *
 * @param {string[][]} board - 2D grid of characters
 * @param {string} word - Word to search for
 * @returns {boolean} True if the word can be formed
 */
function wordExists(board, word) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function wordExists(board, word) {
  const rows = board.length, cols = board[0].length;

  function dfs(r, c, idx) {
    if (idx === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[idx]) return false;

    const saved = board[r][c];
    board[r][c] = "#";

    const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) ||
                  dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);

    board[r][c] = saved;
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }

  return false;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  const board = input.board.map(row => [...row]);
  return wordExists(board, input.word);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "found-path",
      description: "Word found via winding path",
      input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" },
      expected: true,
      isHidden: false,
    },
    {
      id: "found-simple",
      description: "Short word found",
      input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" },
      expected: true,
      isHidden: false,
    },
    {
      id: "no-reuse",
      description: "Cannot reuse a cell in the same path",
      input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" },
      expected: false,
      isHidden: false,
    },
    {
      id: "hidden-single-char",
      description: "Single character word",
      input: { board: [["A"]], word: "A" },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-not-found",
      description: "Word with a character not in graph",
      input: { board: [["A","B"],["C","D"]], word: "ABZ" },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-full-board",
      description: "Word uses every cell",
      input: { board: [["A","B"],["D","C"]], word: "ABCD" },
      expected: true,
      isHidden: true,
    },
  ],
};
