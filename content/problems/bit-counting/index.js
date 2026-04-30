export const problem = {
  slug: "bit-counting",  category: "grind-75",
  title: "Bit Counting",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Bit Manipulation"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find number of set bits from 0 to n.",

  problemMdx: `## Overview

Given a non-negative integer \`n\`, return an array \`result\` of length \`n + 1\` where \`result[i]\` is the number of \`1\`s in the binary representation of \`i\`.

This is also known as the **popcount** or **Hamming weight** for each number from 0 to n.

## Constraints

- \`0 <= n <= 100,000\`
- Return an array of length \`n + 1\`.
- Aim for O(n) time — avoid counting bits from scratch for each number.

## Examples

\`\`\`js
countBits(5);
// => [0, 1, 1, 2, 1, 2]
// 0: 000 -> 0
// 1: 001 -> 1
// 2: 010 -> 1
// 3: 011 -> 2
// 4: 100 -> 1
// 5: 101 -> 2
\`\`\`

\`\`\`js
countBits(2);
// => [0, 1, 1]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function countBits(n) {
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i >> 1] + (i & 1);
  }
  return result;
}
\`\`\`

The key insight: \`countBits(i) = countBits(i >> 1) + (i & 1)\`. The number of set bits in \`i\` equals the set bits in \`i/2\` (right-shifted) plus whether the last bit is set.

</details>

## Resources

- [Counting Bits — LeetCode](https://leetcode.com/problems/counting-bits/)
- [Hamming Weight — Wikipedia](https://en.wikipedia.org/wiki/Hamming_weight)`,

  starterCode: `/**
 * Return an array where result[i] is the count of 1-bits in i, for i from 0 to n.
 * @param {number} n
 * @returns {number[]}
 */
function countBits(n) {
  // your implementation
}`,

  solution: `function countBits(n) {
  const result = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i >> 1] + (i & 1);
  }
  return result;
}`,

  harness: `
function solve(input) {
  return countBits(input.n);
}`,

  tests: [
    {
      id: "five",
      description: "countBits(5) returns correct counts",
      input: { n: 5 },
      expected: [0, 1, 1, 2, 1, 2],
      isHidden: false,
    },
    {
      id: "two",
      description: "countBits(2) returns [0, 1, 1]",
      input: { n: 2 },
      expected: [0, 1, 1],
      isHidden: false,
    },
    {
      id: "zero",
      description: "countBits(0) returns [0]",
      input: { n: 0 },
      expected: [0],
      isHidden: false,
    },
    {
      id: "one",
      description: "countBits(1) returns [0, 1]",
      input: { n: 1 },
      expected: [0, 1],
      isHidden: true,
    },
    {
      id: "eight",
      description: "countBits(8) handles power of 2",
      input: { n: 8 },
      expected: [0, 1, 1, 2, 1, 2, 2, 3, 1],
      isHidden: true,
    },
    {
      id: "fifteen",
      description: "countBits(15) — all 4-bit numbers",
      input: { n: 15 },
      expected: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4],
      isHidden: true,
    },
  ],
};
