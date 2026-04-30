export const problem = {
  slug: "extraterrestrial-language",  category: "grind-75",
  title: "Extraterrestrial Language",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Graphs", "Topological Sort"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 45,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to verify and return an extraterrestrial language's alphabet order.",

  problemMdx: `## Overview

You are given a list of words sorted in lexicographic order according to an **alien language's** alphabet. Derive the order of characters in this language.

Given the sorted list, determine the ordering of characters. If the order is invalid (contains a cycle), return an empty string. If multiple valid orderings exist, return any one of them.

## Constraints

- \`1 <= words.length <= 100\`
- \`1 <= words[i].length <= 100\`
- Words contain only lowercase English letters.
- The sorted order is derived from the alien alphabet.
- Return \`""\` if the ordering is invalid.

## Examples

\`\`\`js
alienOrder(["wrt", "wrf", "er", "ett", "rftt"]);
// => "wertf"
// From comparisons: w < e, e < r, t < f, r < t
\`\`\`

\`\`\`js
alienOrder(["z", "x"]);
// => "zx"

alienOrder(["z", "x", "z"]);
// => ""  (invalid — z < x and z > x)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function alienOrder(words) {
  const adj = new Map();
  const inDegree = new Map();

  // Initialize all chars
  for (const word of words) {
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }
  }

  // Build edges from adjacent word comparisons
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    // Check invalid: w1 is longer and is a prefix of w2
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  // Topological sort (Kahn's)
  const queue = [];
  for (const [ch, deg] of inDegree) {
    if (deg === 0) queue.push(ch);
  }

  const result = [];
  while (queue.length > 0) {
    const ch = queue.shift();
    result.push(ch);
    for (const next of adj.get(ch)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  return result.length === inDegree.size ? result.join("") : "";
}
\`\`\`

</details>

## Resources

- [Alien Dictionary — LeetCode](https://leetcode.com/problems/alien-dictionary/)
- [Topological Sorting — Wikipedia](https://en.wikipedia.org/wiki/Topological_sorting)`,

  starterCode: `/**
 * Derive the character order of an alien language from sorted words.
 * @param {string[]} words - sorted list in alien lexicographic order
 * @returns {string} - the character order, or "" if invalid
 */
function alienOrder(words) {
  // your implementation
}`,

  solution: `function alienOrder(words) {
  const adj = new Map();
  const inDegree = new Map();

  for (const word of words) {
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }
  }

  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j]).has(w2[j])) {
          adj.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break;
      }
    }
  }

  const queue = [];
  for (const [ch, deg] of inDegree) {
    if (deg === 0) queue.push(ch);
  }

  const result = [];
  while (queue.length > 0) {
    const ch = queue.shift();
    result.push(ch);
    for (const next of adj.get(ch)) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) queue.push(next);
    }
  }

  return result.length === inDegree.size ? result.join("") : "";
}`,

  harness: `
function solve(input) {
  return alienOrder(input.words);
}`,

  tests: [
    {
      id: "basic",
      description: "Derives order from 5 words",
      input: { words: ["wrt", "wrf", "er", "ett", "rftt"] },
      expected: "wertf",
      isHidden: false,
    },
    {
      id: "two-words",
      description: "Two words determine one edge",
      input: { words: ["z", "x"] },
      expected: "zx",
      isHidden: false,
    },
    {
      id: "invalid-cycle",
      description: "Cycle results in empty string",
      input: { words: ["z", "x", "z"] },
      expected: "",
      isHidden: false,
    },
    {
      id: "prefix-invalid",
      description: "Longer word before its prefix is invalid",
      input: { words: ["abc", "ab"] },
      expected: "",
      isHidden: true,
    },
    {
      id: "single-word",
      description: "Single word — all chars in any order",
      input: { words: ["abc"] },
      expected: "abc",
      isHidden: true,
    },
    {
      id: "same-words",
      description: "Identical words — trivially valid",
      input: { words: ["a", "a"] },
      expected: "a",
      isHidden: true,
    },
  ],
};
