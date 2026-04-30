export const problem = {
  slug: "bit-reversal",  category: "grind-75",
  title: "Bit Reversal",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Bit Manipulation"],
  companies: ["Google", "Stripe"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to flip the order of the bits in a given number.",

  problemMdx: `## Overview

Given a 32-bit unsigned integer \`n\`, reverse its bits and return the result as an unsigned integer.

For example, the 32-bit representation of \`43261596\` is \`00000010100101000001111010011100\`. Reversing gives \`00111001011110000010100101000000\`, which is \`964176192\`.

## Constraints

- Input is a 32-bit unsigned integer (\`0 <= n <= 2^32 - 1\`).
- Return a 32-bit unsigned integer.
- Use bitwise operations for an efficient solution.

## Examples

\`\`\`js
reverseBits(43261596);
// => 964176192
// Binary: 00000010100101000001111010011100
// Reversed: 00111001011110000010100101000000
\`\`\`

\`\`\`js
reverseBits(0);
// => 0

reverseBits(1);
// => 2147483648  (1 followed by 31 zeros)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result * 2) + (n & 1);
    n = Math.floor(n / 2);
  }
  return result;
}
\`\`\`

We avoid \`>>>\` and \`<<\` issues with large JS numbers by using multiplication and division.

</details>

## Resources

- [Reverse Bits — LeetCode](https://leetcode.com/problems/reverse-bits/)
- [Bitwise Operations — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)`,

  starterCode: `/**
 * Reverse the bits of a 32-bit unsigned integer.
 * @param {number} n - a 32-bit unsigned integer
 * @returns {number}
 */
function reverseBits(n) {
  // your implementation
}`,

  solution: `function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result * 2) + (n & 1);
    n = Math.floor(n / 2);
  }
  return result;
}`,

  harness: `
function solve(input) {
  return reverseBits(input.n);
}`,

  tests: [
    {
      id: "basic",
      description: "Reverses bits of 43261596",
      input: { n: 43261596 },
      expected: 964176192,
      isHidden: false,
    },
    {
      id: "zero",
      description: "Reversing 0 returns 0",
      input: { n: 0 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "one",
      description: "Reversing 1 returns 2^31",
      input: { n: 1 },
      expected: 2147483648,
      isHidden: false,
    },
    {
      id: "all-ones",
      description: "Reversing all 1s returns all 1s",
      input: { n: 4294967295 },
      expected: 4294967295,
      isHidden: true,
    },
    {
      id: "power-of-two",
      description: "Reversing 2 (10) returns 2^30",
      input: { n: 2 },
      expected: 1073741824,
      isHidden: true,
    },
    {
      id: "large",
      description: "Reverses bits of a large number",
      input: { n: 4294967293 },
      expected: 3221225471,
      isHidden: true,
    },
  ],
};
