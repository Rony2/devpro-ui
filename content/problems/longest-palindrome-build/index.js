export const problem = {
  slug: "longest-palindrome-build",  category: "grind-75",
  title: "Longest Palindrome",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Hash Map", "Strings", "Greedy"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the length of the longest palindrome that can be built from given letters.",

  problemMdx: `## Overview

Given a string \`s\` consisting of lowercase and/or uppercase letters, return the length of the **longest palindrome** that can be built with those letters. Letters are case-sensitive.

## Constraints

- \`1 <= s.length <= 2000\`
- \`s\` consists of lowercase and uppercase English letters.

## Examples

\`\`\`js
longestPalindrome("abccccdd");
// => 7  (e.g. "dccaccd")

longestPalindrome("a");
// => 1
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function longestPalindrome(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  let length = 0;
  let hasOdd = false;
  for (const count of Object.values(freq)) {
    length += Math.floor(count / 2) * 2;
    if (count % 2 === 1) hasOdd = true;
  }
  return hasOdd ? length + 1 : length;
}
\`\`\`

Count character frequencies. Use pairs for both sides, and add one odd character in the center if any exist.

</details>

## Resources

- [Longest Palindrome — LeetCode](https://leetcode.com/problems/longest-palindrome/)`,

  starterCode: `/**
 * Find the length of the longest palindrome buildable from the letters.
 * @param {string} s
 * @returns {number}
 */
function longestPalindrome(s) {
  // your implementation
}`,

  solution: `function longestPalindrome(s) {
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  let length = 0, hasOdd = false;
  for (const count of Object.values(freq)) {
    length += Math.floor(count / 2) * 2;
    if (count % 2 === 1) hasOdd = true;
  }
  return hasOdd ? length + 1 : length;
}`,

  harness: `function solve(input) { return longestPalindrome(input.s); }`,

  tests: [
    { id: "basic", description: "'abccccdd' → 7", input: { s: "abccccdd" }, expected: 7, isHidden: false },
    { id: "single", description: "Single char → 1", input: { s: "a" }, expected: 1, isHidden: false },
    { id: "all-same", description: "All same chars", input: { s: "aaaa" }, expected: 4, isHidden: false },
    { id: "all-unique", description: "All unique → 1", input: { s: "abcdef" }, expected: 1, isHidden: true },
    { id: "mixed-case", description: "Case sensitive", input: { s: "Aa" }, expected: 1, isHidden: true },
    { id: "pairs", description: "All pairs", input: { s: "aabb" }, expected: 4, isHidden: true },
  ],
};
