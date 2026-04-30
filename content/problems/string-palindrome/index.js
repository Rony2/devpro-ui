export const problem = {
  slug: "string-palindrome",  category: "grind-75",
  title: "String Palindrome",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Strings", "Two Pointers"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine if a string is a palindrome.",

  problemMdx: `## Overview

Given a string \`s\`, return \`true\` if it is a **palindrome** after converting all uppercase letters to lowercase and removing all non-alphanumeric characters. Otherwise return \`false\`.

## Constraints

- \`1 <= s.length <= 200,000\`
- \`s\` consists of printable ASCII characters.
- Only alphanumeric characters are considered for the palindrome check.

## Examples

\`\`\`js
isPalindrome("A man, a plan, a canal: Panama");
// => true  ("amanaplanacanalpanama")
\`\`\`

\`\`\`js
isPalindrome("race a car");
// => false

isPalindrome(" ");
// => true  (empty after stripping → trivially a palindrome)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++;
    r--;
  }
  return true;
}
\`\`\`

</details>

## Resources

- [Valid Palindrome — LeetCode](https://leetcode.com/problems/valid-palindrome/)
- [Palindrome — Wikipedia](https://en.wikipedia.org/wiki/Palindrome)`,

  starterCode: `/**
 * Determine if a string is a palindrome (ignoring non-alphanumeric characters).
 * @param {string} s
 * @returns {boolean}
 */
function isPalindrome(s) {
  // your implementation
}`,

  solution: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++;
    r--;
  }
  return true;
}`,

  harness: `
function solve(input) {
  return isPalindrome(input.s);
}`,

  tests: [
    {
      id: "classic",
      description: "'A man, a plan, a canal: Panama' → true",
      input: { s: "A man, a plan, a canal: Panama" },
      expected: true,
      isHidden: false,
    },
    {
      id: "not-palindrome",
      description: "'race a car' → false",
      input: { s: "race a car" },
      expected: false,
      isHidden: false,
    },
    {
      id: "empty",
      description: "Space-only string → true",
      input: { s: " " },
      expected: true,
      isHidden: false,
    },
    {
      id: "single-char",
      description: "Single character",
      input: { s: "a" },
      expected: true,
      isHidden: true,
    },
    {
      id: "numbers",
      description: "Palindrome with numbers",
      input: { s: "12321" },
      expected: true,
      isHidden: true,
    },
    {
      id: "mixed-case",
      description: "Mixed case palindrome",
      input: { s: "Aba" },
      expected: true,
      isHidden: true,
    },
  ],
};
