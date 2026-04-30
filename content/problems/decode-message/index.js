export const problem = {
  slug: "decode-message",  category: "grind-75",
  title: "Decode Message",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Strings"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to count ways to decode a numeric string.",

  problemMdx: `## Overview

A message containing letters \`A-Z\` can be encoded as numbers using the mapping: \`'A' -> "1", 'B' -> "2", ..., 'Z' -> "26"\`.

Given a string \`s\` containing only digits, return the **number of ways** to decode it. The answer is guaranteed to fit in a 32-bit integer.

## Constraints

- \`1 <= s.length <= 100\`
- \`s\` contains only digits and may contain leading zeros.
- A leading zero (like "06") is not a valid encoding.

## Examples

\`\`\`js
numDecodings("12");
// => 2  ("AB" or "L")
\`\`\`

\`\`\`js
numDecodings("226");
// => 3  ("BZ", "VF", "BBF")

numDecodings("06");
// => 0  (leading zero — no valid decoding)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function numDecodings(s) {
  if (s[0] === "0") return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;

  for (let i = 1; i < n; i++) {
    let curr = 0;
    if (s[i] !== "0") curr += prev1;
    const two = parseInt(s.substring(i - 1, i + 1));
    if (two >= 10 && two <= 26) curr += prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
\`\`\`

DP with two variables. At each position, check if the single digit is valid (non-zero) and if the two-digit number is between 10 and 26.

</details>

## Resources

- [Decode Ways — LeetCode](https://leetcode.com/problems/decode-ways/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  starterCode: `/**
 * Count the number of ways to decode a numeric string.
 * @param {string} s
 * @returns {number}
 */
function numDecodings(s) {
  // your implementation
}`,

  solution: `function numDecodings(s) {
  if (s[0] === "0") return 0;
  const n = s.length;
  let prev2 = 1, prev1 = 1;

  for (let i = 1; i < n; i++) {
    let curr = 0;
    if (s[i] !== "0") curr += prev1;
    const two = parseInt(s.substring(i - 1, i + 1));
    if (two >= 10 && two <= 26) curr += prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,

  harness: `
function solve(input) {
  return numDecodings(input.s);
}`,

  tests: [
    {
      id: "basic",
      description: "'12' → 2 ways",
      input: { s: "12" },
      expected: 2,
      isHidden: false,
    },
    {
      id: "three-digits",
      description: "'226' → 3 ways",
      input: { s: "226" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "leading-zero",
      description: "'06' → 0 ways",
      input: { s: "06" },
      expected: 0,
      isHidden: false,
    },
    {
      id: "single-digit",
      description: "Single digit '5'",
      input: { s: "5" },
      expected: 1,
      isHidden: true,
    },
    {
      id: "all-ones",
      description: "'1111' → 5 ways",
      input: { s: "1111" },
      expected: 5,
      isHidden: true,
    },
    {
      id: "with-zeros",
      description: "'10' → 1 way",
      input: { s: "10" },
      expected: 1,
      isHidden: true,
    },
  ],
};
