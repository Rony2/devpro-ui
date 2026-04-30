export const problem = {
  slug: "longest-non-repeating-substring",  category: "grind-75",
  title: "Longest Non-repeating Substring",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sliding Window", "Strings", "Hash Map"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the length of longest substring with unique characters.",

  problemMdx: `## Overview

Given a string \`s\`, find the length of the **longest substring** without repeating characters.

## Constraints

- \`0 <= s.length <= 50,000\`
- \`s\` consists of English letters, digits, symbols, and spaces.
- Must run in O(n) time.

## Examples

\`\`\`js
lengthOfLongestSubstring("abcabcbb");
// => 3  (substring: "abc")
\`\`\`

\`\`\`js
lengthOfLongestSubstring("bbbbb");
// => 1  (substring: "b")

lengthOfLongestSubstring("pwwkew");
// => 3  (substring: "wke")

lengthOfLongestSubstring("");
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function lengthOfLongestSubstring(s) {
  const map = new Map();
  let max = 0, left = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }

  return max;
}
\`\`\`

Sliding window with a map storing the last index of each character. When a duplicate is found, jump \`left\` past it.

</details>

## Resources

- [Longest Substring Without Repeating Characters — LeetCode](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- [Sliding Window Technique — Wikipedia](https://en.wikipedia.org/wiki/Sliding_window_protocol)`,

  starterCode: `/**
 * Find the length of the longest substring without repeating characters.
 * @param {string} s
 * @returns {number}
 */
function lengthOfLongestSubstring(s) {
  // your implementation
}`,

  solution: `function lengthOfLongestSubstring(s) {
  const map = new Map();
  let max = 0, left = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right]) && map.get(s[right]) >= left) {
      left = map.get(s[right]) + 1;
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }

  return max;
}`,

  harness: `
function solve(input) {
  return lengthOfLongestSubstring(input.s);
}`,

  tests: [
    {
      id: "basic",
      description: "'abcabcbb' → 3",
      input: { s: "abcabcbb" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "all-same",
      description: "'bbbbb' → 1",
      input: { s: "bbbbb" },
      expected: 1,
      isHidden: false,
    },
    {
      id: "mixed",
      description: "'pwwkew' → 3",
      input: { s: "pwwkew" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "empty",
      description: "Empty string → 0",
      input: { s: "" },
      expected: 0,
      isHidden: true,
    },
    {
      id: "single-char",
      description: "Single character → 1",
      input: { s: "a" },
      expected: 1,
      isHidden: true,
    },
    {
      id: "all-unique",
      description: "All unique characters",
      input: { s: "abcdefg" },
      expected: 7,
      isHidden: true,
    },
  ],
};
