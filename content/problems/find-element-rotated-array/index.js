export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "find-element-rotated-array",  category: "grind-75",
  title: "Find Element in Rotated Array",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Binary Search", "JavaScript"],
  companies: ["Google", "Amazon", "Meta"],
  estimatedMinutes: 35,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find an integer in a rotated sorted array.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

A sorted array has been rotated at some unknown pivot. For example, \`[0,1,2,4,5,6,7]\` might become \`[4,5,6,7,0,1,2]\`.

Given the rotated array and a target value, return the index of the target if it exists, or \`-1\` if it does not.

Implement \`searchRotated(nums, target)\`.

## Constraints

- All values in \`nums\` are unique.
- The array was originally sorted in ascending order, then rotated.
- Must achieve $O(\\log n)$ time complexity — a linear scan is not acceptable.
- \`nums\` may have length 0.

## Examples

\`\`\`js
searchRotated([4, 5, 6, 7, 0, 1, 2], 0);  // 4
searchRotated([4, 5, 6, 7, 0, 1, 2], 3);  // -1
searchRotated([1], 0);                      // -1
searchRotated([1], 1);                      // 0
\`\`\`

## Notes

- Modified binary search: at each step, one half of the array is always sorted. Determine which half is sorted and whether the target falls within that sorted range.
- If the target falls in the sorted half, narrow search there; otherwise search the other half.
- Edge cases: single element, target not present, array not rotated at all.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function searchRotated(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }

  return -1;
}
\`\`\`

</details>

## Resources

- [Search in Rotated Sorted Array — LeetCode](https://leetcode.com/problems/search-in-rotated-sorted-array/)
- [Binary Search — Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Find the index of target in a rotated sorted array.
 *
 * @param {number[]} nums - Rotated sorted array of unique integers
 * @param {number} target - Value to search for
 * @returns {number} Index of target, or -1 if not found
 */
function searchRotated(nums, target) {
  // your implementation
}`,

  // ── Solution (server-only) ─────────────────────────────────
  solution: `function searchRotated(nums, target) {
  let lo = 0, hi = nums.length - 1;

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    if (nums[mid] === target) return mid;

    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else {
      if (target > nums[mid] && target <= nums[hi]) {
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
  }

  return -1;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return searchRotated(input.nums, input.target);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "found-in-right",
      description: "Target found in right portion after pivot",
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
      expected: 4,
      isHidden: false,
    },
    {
      id: "not-found",
      description: "Target does not exist in array",
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 },
      expected: -1,
      isHidden: false,
    },
    {
      id: "single-match",
      description: "Single element that matches",
      input: { nums: [1], target: 1 },
      expected: 0,
      isHidden: false,
    },
    {
      id: "hidden-found-in-left",
      description: "Target found in left sorted portion",
      input: { nums: [4, 5, 6, 7, 0, 1, 2], target: 5 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "hidden-no-rotation",
      description: "Array not rotated at all",
      input: { nums: [1, 2, 3, 4, 5], target: 3 },
      expected: 2,
      isHidden: true,
    },
    {
      id: "hidden-empty",
      description: "Empty array returns -1",
      input: { nums: [], target: 5 },
      expected: -1,
      isHidden: true,
    },
  ],
};
