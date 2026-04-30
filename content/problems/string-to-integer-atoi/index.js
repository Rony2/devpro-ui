export const problem = {
  slug: "string-to-integer-atoi",  category: "grind-75",
  title: "String to Integer (atoi)",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Strings", "Math"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to convert a string to a 32-bit signed integer (like C's atoi).",

  problemMdx: `## Overview

Implement \`myAtoi(s)\` which converts a string to a 32-bit signed integer:
1. Skip leading whitespace
2. Read optional \`+\` or \`-\` sign
3. Read digits until a non-digit or end
4. Clamp to \`[-2^31, 2^31 - 1]\`

## Constraints

- \`0 <= s.length <= 200\`
- \`s\` consists of English letters, digits, spaces, \`+\`, \`-\`, and \`.\`

## Examples

\`\`\`js
myAtoi("42");          // => 42
myAtoi("   -42");      // => -42
myAtoi("4193 with words"); // => 4193
myAtoi("words and 987");   // => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function myAtoi(s) {
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;
  let sign = 1;
  if (i < s.length && (s[i] === '+' || s[i] === '-')) {
    sign = s[i] === '-' ? -1 : 1;
    i++;
  }
  let result = 0;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') {
    result = result * 10 + (s[i] - '0');
    i++;
  }
  result *= sign;
  return Math.max(-(2**31), Math.min(2**31 - 1, result));
}
\`\`\`

</details>

## Resources

- [String to Integer (atoi) — LeetCode](https://leetcode.com/problems/string-to-integer-atoi/)`,

  starterCode: `/**
 * Convert a string to a 32-bit signed integer.
 * @param {string} s
 * @returns {number}
 */
function myAtoi(s) {
  // your implementation
}`,

  solution: `function myAtoi(s) {
  let i = 0;
  while (i < s.length && s[i] === ' ') i++;
  let sign = 1;
  if (i < s.length && (s[i] === '+' || s[i] === '-')) { sign = s[i] === '-' ? -1 : 1; i++; }
  let result = 0;
  while (i < s.length && s[i] >= '0' && s[i] <= '9') { result = result * 10 + (s[i] - '0'); i++; }
  result *= sign;
  return Math.max(-(2**31), Math.min(2**31 - 1, result));
}`,

  harness: `function solve(input) { return myAtoi(input.s); }`,

  tests: [
    { id: "basic", description: "'42' → 42", input: { s: "42" }, expected: 42, isHidden: false },
    { id: "neg-spaces", description: "'   -42' → -42", input: { s: "   -42" }, expected: -42, isHidden: false },
    { id: "with-words", description: "'4193 with words' → 4193", input: { s: "4193 with words" }, expected: 4193, isHidden: false },
    { id: "no-digits", description: "'words and 987' → 0", input: { s: "words and 987" }, expected: 0, isHidden: true },
    { id: "overflow", description: "Overflow clamps to INT_MAX", input: { s: "91283472332" }, expected: 2147483647, isHidden: true },
    { id: "underflow", description: "Underflow clamps to INT_MIN", input: { s: "-91283472332" }, expected: -2147483648, isHidden: true },
  ],
};
