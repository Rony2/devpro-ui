export const problem = {
  slug: "count-set-bits",  category: "grind-75",
  title: "Count Set Bits in a Binary Number",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Bit Manipulation"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find set bits in binary representation of a given integer.",

  problemMdx: `## Overview

Given a non-negative integer \`n\`, return the number of \`1\` bits in its binary representation (also known as the **Hamming weight** or **popcount**).

## Constraints

- \`0 <= n <= 2^31 - 1\`
- Return a single integer.

## Examples

\`\`\`js
hammingWeight(11);
// => 3
// Binary: 1011 has three 1-bits
\`\`\`

\`\`\`js
hammingWeight(128);
// => 1
// Binary: 10000000

hammingWeight(0);
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function hammingWeight(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n = n >>> 1;
  }
  return count;
}
\`\`\`

Each iteration checks the least significant bit and right-shifts. Using \`>>> 1\` (unsigned right shift) avoids sign-extension issues.

</details>

## Resources

- [Number of 1 Bits — LeetCode](https://leetcode.com/problems/number-of-1-bits/)
- [Hamming Weight — Wikipedia](https://en.wikipedia.org/wiki/Hamming_weight)`,

  starterCode: `/**
 * Count the number of 1-bits in the binary representation of n.
 * @param {number} n - a non-negative integer
 * @returns {number}
 */
function hammingWeight(n) {
  // your implementation
}`,

  solution: `function hammingWeight(n) {
  let count = 0;
  while (n > 0) {
    count += n & 1;
    n = n >>> 1;
  }
  return count;
}`,

  harness: `
function solve(input) {
  return hammingWeight(input.n);
}`,

  tests: [
    {
      id: "eleven",
      description: "11 (1011) has 3 set bits",
      input: { n: 11 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "power-of-two",
      description: "128 (power of 2) has 1 set bit",
      input: { n: 128 },
      expected: 1,
      isHidden: false,
    },
    {
      id: "zero",
      description: "0 has 0 set bits",
      input: { n: 0 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "all-ones",
      description: "2^31 - 1 has 31 set bits",
      input: { n: 2147483647 },
      expected: 31,
      isHidden: true,
    },
    {
      id: "one",
      description: "1 has 1 set bit",
      input: { n: 1 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "255",
      description: "255 (11111111) has 8 set bits",
      input: { n: 255 },
      expected: 8,
      isHidden: true,
    },
  ],
};
