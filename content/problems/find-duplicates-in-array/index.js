export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "find-duplicates-in-array",  category: "grind-75",
  title: "Find Duplicates in Array",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check if there are any duplicate numbers in the array.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given an array of integers, determine whether any value appears at least twice. Return \`true\` if any duplicate exists, \`false\` if every element is distinct.

Implement \`hasDuplicates(nums)\`.

## Constraints

- Input is always an array of numbers (may be empty).
- An empty array and a single-element array return \`false\`.
- Must handle negative numbers and zero.
- Aim for $O(n)$ time complexity.

## Examples

\`\`\`js
hasDuplicates([1, 2, 3, 1]);        // true  — 1 appears twice
hasDuplicates([1, 2, 3, 4]);        // false — all distinct
hasDuplicates([]);                   // false
hasDuplicates([1, 1, 1, 3, 3, 4]);  // true
\`\`\`

## Notes

- A Set-based approach gives $O(n)$ time: iterate and check membership before inserting.
- Alternatively, sort first ($O(n \\log n)$) and scan for adjacent duplicates — but this mutates the input.
- Watch for the early-exit optimization: return \`true\` as soon as you find the first duplicate.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function hasDuplicates(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
\`\`\`

</details>

## Resources

- [Contains Duplicate — LeetCode](https://leetcode.com/problems/contains-duplicate/)
- [Set — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Check if there are any duplicate numbers in the array.
 *
 * @param {number[]} nums - Array of integers
 * @returns {boolean} True if any value appears more than once
 */
function hasDuplicates(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function hasDuplicates(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return hasDuplicates(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "has-duplicate",
      description: "Detects duplicates in array",
      input: { nums: [1, 2, 3, 1] },
      expected: true,
      isHidden: false,
    },
    {
      id: "no-duplicate",
      description: "Returns false when all distinct",
      input: { nums: [1, 2, 3, 4] },
      expected: false,
      isHidden: false,
    },
    {
      id: "empty-array",
      description: "Empty array returns false",
      input: { nums: [] },
      expected: false,
      isHidden: false,
    },
    {
      id: "hidden-multiple-dupes",
      description: "Multiple duplicate values",
      input: { nums: [1, 1, 1, 3, 3, 4] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-negative-numbers",
      description: "Handles negative numbers",
      input: { nums: [-1, -2, -3, -1] },
      expected: true,
      isHidden: true,
    },
    {
      id: "hidden-single-element",
      description: "Single element returns false",
      input: { nums: [42] },
      expected: false,
      isHidden: true,
    },
  ],
};
