export const problem = {
  slug: "find-all-anagrams-in-string",  category: "grind-75",
  title: "Find All Anagrams in a String",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sliding Window", "Hash Map", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find all starting indices of anagrams of p in string s.",

  problemMdx: `## Overview

Given two strings \`s\` and \`p\`, return an array of all **start indices** of \`p\`'s anagrams in \`s\`. An anagram uses all letters exactly.

## Constraints

- \`1 <= s.length, p.length <= 30,000\`
- Both consist of lowercase English letters.

## Examples

\`\`\`js
findAnagrams("cbaebabacd", "abc");
// => [0, 6]  ("cba" at 0, "bac" at 6)

findAnagrams("abab", "ab");
// => [0, 1, 2]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function findAnagrams(s, p) {
  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);
  for (const c of p) pCount[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    sCount[s.charCodeAt(i) - a]++;
    if (i >= p.length) sCount[s.charCodeAt(i - p.length) - a]--;
    if (sCount.every((v, j) => v === pCount[j])) result.push(i - p.length + 1);
  }
  return result;
}
\`\`\`

</details>

## Resources

- [Find All Anagrams in a String — LeetCode](https://leetcode.com/problems/find-all-anagrams-in-a-string/)`,

  starterCode: `/**
 * Find all start indices of anagrams of p in s.
 * @param {string} s
 * @param {string} p
 * @returns {number[]}
 */
function findAnagrams(s, p) {
  // your implementation
}`,

  solution: `function findAnagrams(s, p) {
  const result = [];
  const pCount = new Array(26).fill(0);
  const sCount = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);
  for (const c of p) pCount[c.charCodeAt(0) - a]++;
  for (let i = 0; i < s.length; i++) {
    sCount[s.charCodeAt(i) - a]++;
    if (i >= p.length) sCount[s.charCodeAt(i - p.length) - a]--;
    if (sCount.every((v, j) => v === pCount[j])) result.push(i - p.length + 1);
  }
  return result;
}`,

  harness: `function solve(input) { return findAnagrams(input.s, input.p); }`,

  tests: [
    { id: "basic", description: "'cbaebabacd' with 'abc'", input: { s: "cbaebabacd", p: "abc" }, expected: [0,6], isHidden: false },
    { id: "overlap", description: "'abab' with 'ab'", input: { s: "abab", p: "ab" }, expected: [0,1,2], isHidden: false },
    { id: "no-match", description: "No anagrams", input: { s: "xyz", p: "abc" }, expected: [], isHidden: false },
    { id: "exact", description: "Exact match", input: { s: "abc", p: "abc" }, expected: [0], isHidden: true },
    { id: "single-char", description: "Single char pattern", input: { s: "aaa", p: "a" }, expected: [0,1,2], isHidden: true },
    { id: "p-longer", description: "p longer than s", input: { s: "ab", p: "abc" }, expected: [], isHidden: true },
  ],
};
