export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "smallest-element-rotated-array",  category: "grind-75",
  title: "Smallest Element in Rotated Sorted Array",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Binary Search", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the smallest element in rotated sorted array.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

A sorted array of unique integers has been rotated between 1 and \`n\` times. Find the minimum element.

For example, \`[0,1,2,4,5,6,7]\` rotated 4 times becomes \`[4,5,6,7,0,1,2]\`. The minimum is \`0\`.

Implement \`findMin(nums)\`.

## Constraints

- All values in \`nums\` are unique.
- \`nums\` is a sorted array that has been rotated 1 to \`n\` times.
- \`nums\` always has at least one element.
- Must achieve $O(\\log n)$ time complexity.

## Examples

\`\`\`js
findMin([3, 4, 5, 1, 2]);        // 1
findMin([4, 5, 6, 7, 0, 1, 2]);  // 0
findMin([11, 13, 15, 17]);       // 11 — no effective rotation
findMin([2, 1]);                  // 1
\`\`\`

## Notes

- Binary search variant: compare the mid element with the rightmost element. If \`nums[mid] > nums[hi]\`, the minimum is in the right half; otherwise it's in the left half (including mid).
- If the array isn't actually rotated (already sorted), the first element is the minimum — the binary search handles this naturally.
- Unlike the standard rotated search, you don't need a target — you're always converging on the inflection point.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function findMin(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] > nums[hi]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return nums[lo];
}
\`\`\`

</details>

## Resources

- [Find Minimum in Rotated Sorted Array — LeetCode](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)
- [Binary Search — Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the minimum element in a rotated sorted array.
 *
 * @param {number[]} nums - Rotated sorted array of unique integers
 * @returns {number} The minimum element
 */
function findMin(nums) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function findMin(nums) {
  let lo = 0, hi = nums.length - 1;

  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] > nums[hi]) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }

  return nums[lo];
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return findMin(input.nums);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "rotated-mid",
      description: "Minimum in the middle of rotation",
      input: { nums: [3, 4, 5, 1, 2] },
      expected: 1,
      isHidden: false,
    },
    {
      id: "rotated-large",
      description: "Larger rotated array",
      input: { nums: [4, 5, 6, 7, 0, 1, 2] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "not-rotated",
      description: "Already sorted (no effective rotation)",
      input: { nums: [11, 13, 15, 17] },
      expected: 11,
      isHidden: false,
    },
    {
      id: "hidden-two-elements",
      description: "Two elements rotated",
      input: { nums: [2, 1] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-single",
      description: "Single element",
      input: { nums: [42] },
      expected: 42,
      isHidden: true,
    },
    {
      id: "hidden-rotated-once",
      description: "Rotated by one position",
      input: { nums: [5, 1, 2, 3, 4] },
      expected: 1,
      isHidden: true,
    },
  ],
};
