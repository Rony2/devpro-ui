export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "array-product-excluding-current",  category: "grind-75",
  title: "Array Product Excluding Current",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta", "Stripe"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the product of elements in an array excluding the current element.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an integer array \`nums\`, return an array \`output\` where \`output[i]\` is the product of all elements in \`nums\` except \`nums[i]\`.

Implement \`productExceptSelf(nums)\`.

## Constraints

- Input is an array with at least 2 elements.
- **You must not use division.**
- Aim for $O(n)$ time complexity.
- Aim for $O(1)$ extra space (the output array doesn't count).
- The product of any prefix or suffix of \`nums\` fits in a 32-bit integer.

## Examples

\`\`\`js
productExceptSelf([1, 2, 3, 4]);    // [24, 12, 8, 6]
productExceptSelf([-1, 1, 0, -3, 3]); // [0, 0, 9, 0, 0]
productExceptSelf([2, 3]);           // [3, 2]
\`\`\`

## Notes

- The key insight: \`output[i] = (product of all elements to left of i) * (product of all elements to right of i)\`.
- **Two-pass approach**: first pass computes prefix products (left-to-right), second pass multiplies in suffix products (right-to-left).
- This avoids division entirely and runs in $O(n)$ with $O(1)$ extra space (using the output array to store prefix products, then multiplying suffix in-place).

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function productExceptSelf(nums) {
  const n = nums.length;
  const output = new Array(n);

  // Left pass: output[i] = product of all elements to the left of i
  output[0] = 1;
  for (let i = 1; i < n; i++) {
    output[i] = output[i - 1] * nums[i - 1];
  }

  // Right pass: multiply in the product of all elements to the right
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= right;
    right *= nums[i];
  }

  return output;
}
\`\`\`

</details>

## Resources

- [Product of Array Except Self — LeetCode](https://leetcode.com/problems/product-of-array-except-self/)
- [Prefix Sum Pattern](https://en.wikipedia.org/wiki/Prefix_sum)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Return an array where each element is the product of all other elements.
 * You must NOT use division.
 *
 * @param {number[]} nums - Array of integers (length >= 2)
 * @returns {number[]} Product of all elements except self at each index
 */
function productExceptSelf(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function productExceptSelf(nums) {
  const n = nums.length;
  const output = new Array(n);

  output[0] = 1;
  for (let i = 1; i < n; i++) {
    output[i] = output[i - 1] * nums[i - 1];
  }

  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    output[i] *= right;
    right *= nums[i];
  }

  return output;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return productExceptSelf(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "basic-positive",
      description: "All positive integers",
      input: { nums: [1, 2, 3, 4] },
      expected: [24, 12, 8, 6],
      isHidden: false,
    },
    {
      id: "with-zero",
      description: "Array containing zero",
      input: { nums: [-1, 1, 0, -3, 3] },
      expected: [0, 0, 9, 0, 0],
      isHidden: false,
    },
    {
      id: "two-elements",
      description: "Minimum length array",
      input: { nums: [2, 3] },
      expected: [3, 2],
      isHidden: false,
    },
    {
      id: "hidden-all-ones",
      description: "All ones",
      input: { nums: [1, 1, 1, 1] },
      expected: [1, 1, 1, 1],
      isHidden: true,
    },
    {
      id: "hidden-two-zeros",
      description: "Two zeros make all products zero",
      input: { nums: [0, 4, 0] },
      expected: [0, 0, 0],
      isHidden: true,
    },
    {
      id: "hidden-negatives",
      description: "All negative values",
      input: { nums: [-2, -3, -4] },
      expected: [12, 8, 6],
      isHidden: true,
    },
  ],
};
