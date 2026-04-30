export const problem = {
  slug: "add-binary",  category: "grind-75",
  title: "Add Binary",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Strings", "Math"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to add two binary strings and return the result as a binary string.",

  problemMdx: `## Overview

Given two binary strings \`a\` and \`b\`, return their sum as a **binary string**.

## Constraints

- \`1 <= a.length, b.length <= 10,000\`
- Each string consists only of '0' or '1'.
- Neither string has leading zeros (except "0" itself).

## Examples

\`\`\`js
addBinary("11", "1");    // => "100"
addBinary("1010", "1011"); // => "10101"
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function addBinary(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0;
  let result = "";
  while (i >= 0 || j >= 0 || carry) {
    let sum = carry;
    if (i >= 0) sum += +a[i--];
    if (j >= 0) sum += +b[j--];
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }
  return result;
}
\`\`\`

</details>

## Resources

- [Add Binary — LeetCode](https://leetcode.com/problems/add-binary/)`,

  starterCode: `/**
 * Add two binary strings.
 * @param {string} a
 * @param {string} b
 * @returns {string}
 */
function addBinary(a, b) {
  // your implementation
}`,

  solution: `function addBinary(a, b) {
  let i = a.length - 1, j = b.length - 1, carry = 0;
  let result = "";
  while (i >= 0 || j >= 0 || carry) {
    let sum = carry;
    if (i >= 0) sum += +a[i--];
    if (j >= 0) sum += +b[j--];
    result = (sum % 2) + result;
    carry = Math.floor(sum / 2);
  }
  return result;
}`,

  harness: `function solve(input) { return addBinary(input.a, input.b); }`,

  tests: [
    { id: "basic", description: "'11' + '1' = '100'", input: { a: "11", b: "1" }, expected: "100", isHidden: false },
    { id: "equal-len", description: "'1010' + '1011' = '10101'", input: { a: "1010", b: "1011" }, expected: "10101", isHidden: false },
    { id: "zeros", description: "'0' + '0' = '0'", input: { a: "0", b: "0" }, expected: "0", isHidden: false },
    { id: "one-zero", description: "'1' + '0' = '1'", input: { a: "1", b: "0" }, expected: "1", isHidden: true },
    { id: "carry-chain", description: "'1111' + '1' = '10000'", input: { a: "1111", b: "1" }, expected: "10000", isHidden: true },
    { id: "both-ones", description: "'1' + '1' = '10'", input: { a: "1", b: "1" }, expected: "10", isHidden: true },
  ],
};
