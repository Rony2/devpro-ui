export const problem = {
  slug: "sum-without-addition",  category: "grind-75",
  title: "Sum Without Addition",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Bit Manipulation"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the sum of two integers without using + and - operator.",

  problemMdx: `## Overview

Given two integers \`a\` and \`b\`, return their sum **without using the \`+\` or \`-\` operators**.

## Constraints

- \`-1000 <= a, b <= 1000\`
- Must use bitwise operations only.
- JavaScript handles 32-bit integers for bitwise ops.

## Examples

\`\`\`js
getSum(1, 2);
// => 3
\`\`\`

\`\`\`js
getSum(-1, 1);
// => 0

getSum(0, 0);
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}
\`\`\`

XOR gives the sum without carry. AND followed by left-shift gives the carry. Repeat until there is no carry.

</details>

## Resources

- [Sum of Two Integers — LeetCode](https://leetcode.com/problems/sum-of-two-integers/)
- [Bitwise Operations — Wikipedia](https://en.wikipedia.org/wiki/Bitwise_operation)`,

  starterCode: `/**
 * Find the sum of two integers without using + or - operators.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function getSum(a, b) {
  // your implementation
}`,

  solution: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,

  harness: `
function solve(input) {
  return getSum(input.a, input.b);
}`,

  tests: [
    {
      id: "basic",
      description: "1 + 2 = 3",
      input: { a: 1, b: 2 },
      expected: 3,
      isHidden: false,
    },
    {
      id: "negative",
      description: "-1 + 1 = 0",
      input: { a: -1, b: 1 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "zeros",
      description: "0 + 0 = 0",
      input: { a: 0, b: 0 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "both-negative",
      description: "-5 + -3 = -8",
      input: { a: -5, b: -3 },
      expected: -8,
      isHidden: true,
    },
    {
      id: "large",
      description: "100 + 200 = 300",
      input: { a: 100, b: 200 },
      expected: 300,
      isHidden: true,
    },
    {
      id: "one-zero",
      description: "7 + 0 = 7",
      input: { a: 7, b: 0 },
      expected: 7,
      isHidden: true,
    },
  ],
};
