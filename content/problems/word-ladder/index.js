export const problem = {
  slug: "word-ladder",  category: "grind-75",
  title: "Word Ladder",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "BFS", "Graph", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description: "Find the length of the shortest transformation sequence from beginWord to endWord.",

  problemMdx: `## Overview

Given \`beginWord\`, \`endWord\`, and a word list, find the **shortest transformation sequence** length from \`beginWord\` to \`endWord\`, where:
- Only one letter can be changed at a time.
- Each transformed word must exist in the word list.

Return 0 if no such sequence exists.

## Constraints

- \`1 <= beginWord.length <= 10\`
- All words are the same length
- \`1 <= wordList.length <= 5000\`

## Examples

\`\`\`js
ladderLength("hit", "cog", ["hot","dot","dog","lot","log","cog"]);
// => 5 (hit → hot → dot → dog → cog)

ladderLength("hit", "cog", ["hot","dot","dog","lot","log"]);
// => 0 (no path to "cog")
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length) {
    const [word, steps] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (next === endWord) return steps + 1;
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next);
          queue.push([next, steps + 1]);
        }
      }
    }
  }
  return 0;
}
\`\`\`

</details>

## Resources

- [Word Ladder — LeetCode](https://leetcode.com/problems/word-ladder/)`,

  starterCode: `/**
 * Shortest transformation sequence length from beginWord to endWord.
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @returns {number}
 */
function ladderLength(beginWord, endWord, wordList) {
  // your implementation
}`,

  solution: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  while (queue.length) {
    const [word, steps] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const next = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (next === endWord) return steps + 1;
        if (wordSet.has(next) && !visited.has(next)) {
          visited.add(next);
          queue.push([next, steps + 1]);
        }
      }
    }
  }
  return 0;
}`,

  harness: `function solve(input) { return ladderLength(input.beginWord, input.endWord, input.wordList); }`,

  tests: [
    { id: "basic", description: "hit → cog = 5", input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log","cog"] }, expected: 5, isHidden: false },
    { id: "no-path", description: "No path → 0", input: { beginWord: "hit", endWord: "cog", wordList: ["hot","dot","dog","lot","log"] }, expected: 0, isHidden: false },
    { id: "one-step", description: "One letter diff", input: { beginWord: "hot", endWord: "dot", wordList: ["dot"] }, expected: 2, isHidden: false },
    { id: "same", description: "Same word but not in list", input: { beginWord: "abc", endWord: "abc", wordList: ["abc"] }, expected: 1, isHidden: true },
    { id: "no-end", description: "endWord not in list", input: { beginWord: "a", endWord: "c", wordList: ["b"] }, expected: 0, isHidden: true },
    { id: "longer", description: "Longer path", input: { beginWord: "aa", endWord: "zz", wordList: ["az","zz"] }, expected: 3, isHidden: true },
  ],
};
