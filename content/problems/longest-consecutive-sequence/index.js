export const problem = {
  slug: "longest-consecutive-sequence",  category: "grind-75",
  title: "Longest Consecutive Number Sequence",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Hash Set", "Arrays"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the length of the longest consecutive number sequence.",

  problemMdx: `## Overview

Given an unsorted array of integers \`nums\`, return the length of the **longest consecutive elements sequence**.

You must solve this in O(n) time.

## Constraints

- \`0 <= nums.length <= 100,000\`
- \`-10^9 <= nums[i] <= 10^9\`
- Must run in O(n) time — sorting is not allowed.

## Examples

\`\`\`js
longestConsecutive([100, 4, 200, 1, 3, 2]);
// => 4  (sequence: 1, 2, 3, 4)
\`\`\`

\`\`\`js
longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]);
// => 9  (sequence: 0, 1, 2, 3, 4, 5, 6, 7, 8)

longestConsecutive([]);
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (const num of set) {
    // Only start counting from the beginning of a sequence
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;

      while (set.has(current + 1)) {
        current++;
        streak++;
      }

      longest = Math.max(longest, streak);
    }
  }

  return longest;
}
\`\`\`

Put all numbers in a Set. For each number that has no predecessor (\`num - 1\` not in set), count the consecutive run forward. O(n) because each number is visited at most twice.

</details>

## Resources

- [Longest Consecutive Sequence — LeetCode](https://leetcode.com/problems/longest-consecutive-sequence/)
- [Hash Table — Wikipedia](https://en.wikipedia.org/wiki/Hash_table)`,

  starterCode: `/**
 * Find the length of the longest consecutive elements sequence.
 * @param {number[]} nums
 * @returns {number}
 */
function longestConsecutive(nums) {
  // your implementation
}`,

  solution: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let longest = 0;

  for (const num of set) {
    if (!set.has(num - 1)) {
      let current = num;
      let streak = 1;

      while (set.has(current + 1)) {
        current++;
        streak++;
      }

      longest = Math.max(longest, streak);
    }
  }

  return longest;
}`,

  harness: `
function solve(input) {
  return longestConsecutive(input.nums);
}`,

  tests: [
    {
      id: "basic",
      description: "Finds sequence 1,2,3,4 in unsorted array",
      input: { nums: [100, 4, 200, 1, 3, 2] },
      expected: 4,
      isHidden: false,
    },
    {
      id: "long-sequence",
      description: "Finds sequence 0-8 in scrambled array",
      input: { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] },
      expected: 9,
      isHidden: false,
    },
    {
      id: "empty",
      description: "Empty array returns 0",
      input: { nums: [] },
      expected: 0,
      isHidden: false,
    },
    {
      id: "single",
      description: "Single element",
      input: { nums: [42] },
      expected: 1,
      isHidden: true,
    },
    {
      id: "duplicates",
      description: "Handles duplicates",
      input: { nums: [1, 2, 0, 1] },
      expected: 3,
      isHidden: true,
    },
    {
      id: "negatives",
      description: "Handles negative numbers",
      input: { nums: [-3, -2, -1, 0, 1] },
      expected: 5,
      isHidden: true,
    },
  ],
};
