export const problem = {
  slug: "longest-palindromic-substring",  category: "grind-75",
  title: "Find the Longest Palindromic Substring",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Strings", "Dynamic Programming"],
  companies: ["Google", "Meta", "Shopify"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the longest palindromic substring.",

  problemMdx: `## Overview

Given a string \`s\`, return the **longest palindromic substring** in \`s\`.

If there are multiple answers of the same length, return the first one found.

## Constraints

- \`1 <= s.length <= 1000\`
- \`s\` consists of only lowercase English letters.
- O(n²) expand-around-center is the expected approach.

## Examples

\`\`\`js
longestPalindrome("babad");
// => "bab" (or "aba" — both valid)
\`\`\`

\`\`\`js
longestPalindrome("cbbd");
// => "bb"

longestPalindrome("a");
// => "a"
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function longestPalindrome(s) {
  let start = 0, maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd-length
    expand(i, i + 1); // even-length
  }

  return s.substring(start, start + maxLen);
}
\`\`\`

Expand around every index as center for both odd and even length palindromes. O(n²) time, O(1) space.

</details>

## Resources

- [Longest Palindromic Substring — LeetCode](https://leetcode.com/problems/longest-palindromic-substring/)
- [Palindrome — Wikipedia](https://en.wikipedia.org/wiki/Palindrome)`,

  starterCode: `/**
 * Find the longest palindromic substring.
 * @param {string} s
 * @returns {string}
 */
function longestPalindrome(s) {
  // your implementation
}`,

  solution: `function longestPalindrome(s) {
  let start = 0, maxLen = 1;

  function expand(l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      if (r - l + 1 > maxLen) {
        start = l;
        maxLen = r - l + 1;
      }
      l--;
      r++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }

  return s.substring(start, start + maxLen);
}`,

  harness: `
function solve(input) {
  return longestPalindrome(input.s);
}`,

  tests: [
    {
      id: "odd-palindrome",
      description: "'babad' → 'bab' or 'aba'",
      input: { s: "babad" },
      expected: "bab",
      isHidden: false,
    },
    {
      id: "even-palindrome",
      description: "'cbbd' → 'bb'",
      input: { s: "cbbd" },
      expected: "bb",
      isHidden: false,
    },
    {
      id: "single",
      description: "Single char 'a' → 'a'",
      input: { s: "a" },
      expected: "a",
      isHidden: false,
    },
    {
      id: "entire-string",
      description: "Entire string is palindrome",
      input: { s: "racecar" },
      expected: "racecar",
      isHidden: true,
    },
    {
      id: "two-chars",
      description: "Two identical chars",
      input: { s: "bb" },
      expected: "bb",
      isHidden: true,
    },
    {
      id: "no-repeat",
      description: "All unique — first char",
      input: { s: "abcde" },
      expected: "a",
      isHidden: true,
    },
  ],
};
