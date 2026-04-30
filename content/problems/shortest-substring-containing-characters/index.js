export const problem = {
  slug: "shortest-substring-containing-characters",  category: "grind-75",
  title: "Shortest Substring Containing Characters",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Sliding Window", "Strings", "Hash Map"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to return the smallest substring of a string containing all characters from another string.",

  problemMdx: `## Overview

Given two strings \`s\` and \`t\`, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

## Constraints

- \`1 <= s.length, t.length <= 100,000\`
- \`s\` and \`t\` consist of uppercase and lowercase English letters.
- Must run in O(n) time.

## Examples

\`\`\`js
minWindow("ADOBECODEBANC", "ABC");
// => "BANC"
\`\`\`

\`\`\`js
minWindow("a", "a");
// => "a"

minWindow("a", "aa");
// => ""  (not enough 'a's)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let have = 0, required = Object.keys(need).length;
  const window = {};
  let left = 0, minLen = Infinity, minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;

    if (need[c] && window[c] === need[c]) have++;

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const lc = s[left];
      window[lc]--;
      if (need[lc] && window[lc] < need[lc]) have--;
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}
\`\`\`

Sliding window: expand right to include all required characters, then shrink left to find the minimum window. Track how many unique characters are satisfied.

</details>

## Resources

- [Minimum Window Substring — LeetCode](https://leetcode.com/problems/minimum-window-substring/)
- [Sliding Window Technique](https://en.wikipedia.org/wiki/Sliding_window_protocol)`,

  starterCode: `/**
 * Find the smallest substring of s containing all characters from t.
 * @param {string} s
 * @param {string} t
 * @returns {string}
 */
function minWindow(s, t) {
  // your implementation
}`,

  solution: `function minWindow(s, t) {
  const need = {};
  for (const c of t) need[c] = (need[c] || 0) + 1;

  let have = 0, required = Object.keys(need).length;
  const window = {};
  let left = 0, minLen = Infinity, minStart = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    window[c] = (window[c] || 0) + 1;

    if (need[c] && window[c] === need[c]) have++;

    while (have === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      const lc = s[left];
      window[lc]--;
      if (need[lc] && window[lc] < need[lc]) have--;
      left++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}`,

  harness: `
function solve(input) {
  return minWindow(input.s, input.t);
}`,

  tests: [
    {
      id: "basic",
      description: "'ADOBECODEBANC' with 'ABC' → 'BANC'",
      input: { s: "ADOBECODEBANC", t: "ABC" },
      expected: "BANC",
      isHidden: false,
    },
    {
      id: "exact-match",
      description: "'a' with 'a' → 'a'",
      input: { s: "a", t: "a" },
      expected: "a",
      isHidden: false,
    },
    {
      id: "impossible",
      description: "'a' with 'aa' → ''",
      input: { s: "a", t: "aa" },
      expected: "",
      isHidden: false,
    },
    {
      id: "whole-string",
      description: "Entire string is the window",
      input: { s: "abc", t: "cba" },
      expected: "abc",
      isHidden: true,
    },
    {
      id: "duplicates",
      description: "Target has duplicate chars",
      input: { s: "aaab", t: "aab" },
      expected: "aab",
      isHidden: true,
    },
    {
      id: "at-end",
      description: "Minimum window at end of string",
      input: { s: "xyzABC", t: "ABC" },
      expected: "ABC",
      isHidden: true,
    },
  ],
};
