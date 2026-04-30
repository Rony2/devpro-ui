export const problem = {
  slug: "ransom-note",  category: "grind-75",
  title: "Ransom Note",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Hash Map", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to check if a ransom note can be formed from a magazine.",

  problemMdx: `## Overview

Given two strings \`ransomNote\` and \`magazine\`, return \`true\` if \`ransomNote\` can be constructed using the letters from \`magazine\`. Each letter in \`magazine\` can only be used once.

## Constraints

- \`1 <= ransomNote.length, magazine.length <= 100,000\`
- Both consist of lowercase English letters.

## Examples

\`\`\`js
canConstruct("a", "b");     // => false
canConstruct("aa", "ab");   // => false
canConstruct("aa", "aab");  // => true
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function canConstruct(ransomNote, magazine) {
  const freq = {};
  for (const c of magazine) freq[c] = (freq[c] || 0) + 1;
  for (const c of ransomNote) {
    if (!freq[c]) return false;
    freq[c]--;
  }
  return true;
}
\`\`\`

</details>

## Resources

- [Ransom Note — LeetCode](https://leetcode.com/problems/ransom-note/)`,

  starterCode: `/**
 * Check if ransomNote can be constructed from magazine letters.
 * @param {string} ransomNote
 * @param {string} magazine
 * @returns {boolean}
 */
function canConstruct(ransomNote, magazine) {
  // your implementation
}`,

  solution: `function canConstruct(ransomNote, magazine) {
  const freq = {};
  for (const c of magazine) freq[c] = (freq[c] || 0) + 1;
  for (const c of ransomNote) {
    if (!freq[c]) return false;
    freq[c]--;
  }
  return true;
}`,

  harness: `function solve(input) { return canConstruct(input.ransomNote, input.magazine); }`,

  tests: [
    { id: "false-1", description: "'a' from 'b' → false", input: { ransomNote: "a", magazine: "b" }, expected: false, isHidden: false },
    { id: "false-2", description: "'aa' from 'ab' → false", input: { ransomNote: "aa", magazine: "ab" }, expected: false, isHidden: false },
    { id: "true-1", description: "'aa' from 'aab' → true", input: { ransomNote: "aa", magazine: "aab" }, expected: true, isHidden: false },
    { id: "empty", description: "Empty note → true", input: { ransomNote: "", magazine: "abc" }, expected: true, isHidden: true },
    { id: "exact", description: "Exact match", input: { ransomNote: "abc", magazine: "abc" }, expected: true, isHidden: true },
    { id: "long", description: "Longer note", input: { ransomNote: "aabb", magazine: "aab" }, expected: false, isHidden: true },
  ],
};
