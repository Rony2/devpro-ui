export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "string-anagram",  category: "grind-75",
  title: "String Anagram",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Strings", "Hash Map"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine if two strings are anagrams of each other.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\`, and \`false\` otherwise.

An anagram is a word or phrase formed by rearranging the letters of another, using all the original letters exactly once.

Implement \`isAnagram(s, t)\`.

## Constraints

- \`1 ≤ s.length, t.length ≤ 50000\`
- \`s\` and \`t\` consist of lowercase English letters only.
- Aim for $O(n)$ time, $O(1)$ space (the char frequency map has at most 26 entries).

## Examples

\`\`\`js
isAnagram("anagram", "nagaram");
// → true

isAnagram("rat", "car");
// → false

isAnagram("listen", "silent");
// → true
\`\`\`

## Notes

- If lengths differ, immediately return false.
- Count character frequencies for \`s\`, then decrement for \`t\`. If any count goes below 0, return false.
- Alternatively, count both and compare.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const counts = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - aCode]++;
    counts[t.charCodeAt(i) - aCode]--;
  }

  return counts.every(c => c === 0);
}
\`\`\`

</details>

## Resources

- [Valid Anagram — LeetCode](https://leetcode.com/problems/valid-anagram/)
- [Anagram — Wikipedia](https://en.wikipedia.org/wiki/Anagram)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Determine if two strings are anagrams of each other.
 *
 * @param {string} s - First string
 * @param {string} t - Second string
 * @returns {boolean} True if t is an anagram of s
 */
function isAnagram(s, t) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const counts = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - aCode]++;
    counts[t.charCodeAt(i) - aCode]--;
  }

  return counts.every(c => c === 0);
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return isAnagram(input.s, input.t);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "anagram-true",
      description: "Classic anagram pair",
      input: { s: "anagram", t: "nagaram" },
      expected: true,
      isHidden: false,
    },
    {
      id: "not-anagram",
      description: "Different letters",
      input: { s: "rat", t: "car" },
      expected: false,
      isHidden: false,
    },
    {
      id: "listen-silent",
      description: "listen / silent",
      input: { s: "listen", t: "silent" },
      expected: true,
      isHidden: false,
    },
    {
      id: "hidden-diff-length",
      description: "Different lengths → false",
      input: { s: "abc", t: "abcd" },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-single-char",
      description: "Single character strings",
      input: { s: "a", t: "a" },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-same-chars-diff-count",
      description: "Same characters but different frequencies",
      input: { s: "aab", t: "abb" },
      expected: false,
      isHidden: true,
    },
  ],
};
