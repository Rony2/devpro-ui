export const problem = {
  slug: "palindromic-substrings",  category: "grind-75",
  title: "Palindromic Substrings",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Strings", "Dynamic Programming"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to count all palindromic substrings in a string.",

  problemMdx: `## Overview

Given a string \`s\`, return the number of **palindromic substrings** in it.

A substring is a contiguous sequence of characters within the string. A string is palindromic if it reads the same backward as forward.

## Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consists of lowercase English letters.

## Examples

\`\`\`js
countSubstrings("abc");
// => 3  ("a", "b", "c")
\`\`\`

\`\`\`js
countSubstrings("aaa");
// => 6  ("a", "a", "a", "aa", "aa", "aaa")
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd-length
    expand(i, i + 1); // even-length
  }

  return count;
}
\`\`\`

Expand around each center (both odd and even). Each expansion that matches increments the count. O(n²) time, O(1) space.

</details>

## Resources

- [Palindromic Substrings — LeetCode](https://leetcode.com/problems/palindromic-substrings/)
- [Palindrome — Wikipedia](https://en.wikipedia.org/wiki/Palindrome)`,

  starterCode: `/**
 * Count the number of palindromic substrings in a string.
 * @param {string} s
 * @returns {number}
 */
function countSubstrings(s) {
  // your implementation
}`,

  solution: `function countSubstrings(s) {
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return count;
}`,

  harness: `
function solve(input) {
  return countSubstrings(input.s);
}`,

  tests: [
    {
      id: "no-palindromes",
      description: "'abc' → 3 (single chars only)",
      input: { s: "abc" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "all-same",
      description: "'aaa' → 6",
      input: { s: "aaa" },
      expected: 6,
      isHidden: false,
    },
    {
      id: "mixed",
      description: "'aba' → 4 (a, b, a, aba)",
      input: { s: "aba" },
      expected: 4,
      isHidden: false,
    },
    {
      id: "single",
      description: "Single character → 1",
      input: { s: "a" },
      expected: 1,
      isHidden: true,
    },
    {
      id: "even-palindrome",
      description: "'abba' → 6",
      input: { s: "abba" },
      expected: 6,
      isHidden: true,
    },
    {
      id: "longer",
      description: "'abcba' → 7",
      input: { s: "abcba" },
      expected: 7,
      isHidden: true,
    },
  ],
};
