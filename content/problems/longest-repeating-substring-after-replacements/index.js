export const problem = {
  slug: "longest-repeating-substring-after-replacements",  category: "grind-75",
  title: "Longest Repeating Substring After Replacements",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Sliding Window", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the longest uniform substring after up to k replacements.",

  problemMdx: `## Overview

Given a string \`s\` consisting of uppercase English letters and an integer \`k\`, you can choose any character and change it to any other uppercase letter at most \`k\` times. Return the length of the **longest substring** containing the same letter after performing at most \`k\` replacements.

## Constraints

- \`1 <= s.length <= 100,000\`
- \`s\` consists of only uppercase English letters.
- \`0 <= k <= s.length\`
- Must run in O(n) time.

## Examples

\`\`\`js
characterReplacement("ABAB", 2);
// => 4  (replace both A's or both B's → "AAAA" or "BBBB")
\`\`\`

\`\`\`js
characterReplacement("AABABBA", 1);
// => 4  (replace one B at index 3 → "AAAAABA", substring "AAAA")
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function characterReplacement(s, k) {
  const count = {};
  let left = 0, maxFreq = 0, result = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]] = (count[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[s[right]]);

    // window size - most frequent char count = replacements needed
    while ((right - left + 1) - maxFreq > k) {
      count[s[left]]--;
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}
\`\`\`

Sliding window: track the frequency of each character in the window. The number of replacements needed equals window size minus the most frequent character's count. Shrink from the left when replacements exceed \`k\`.

</details>

## Resources

- [Longest Repeating Character Replacement — LeetCode](https://leetcode.com/problems/longest-repeating-character-replacement/)
- [Sliding Window Technique](https://en.wikipedia.org/wiki/Sliding_window_protocol)`,

  starterCode: `/**
 * Find the longest uniform substring after up to k replacements.
 * @param {string} s - uppercase English letters
 * @param {number} k - max replacements allowed
 * @returns {number}
 */
function characterReplacement(s, k) {
  // your implementation
}`,

  solution: `function characterReplacement(s, k) {
  const count = {};
  let left = 0, maxFreq = 0, result = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]] = (count[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, count[s[right]]);

    while ((right - left + 1) - maxFreq > k) {
      count[s[left]]--;
      left++;
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}`,

  harness: `
function solve(input) {
  return characterReplacement(input.s, input.k);
}`,

  tests: [
    {
      id: "basic",
      description: "'ABAB' with k=2 → 4",
      input: { s: "ABAB", k: 2 },
      expected: 4,
      isHidden: false,
    },
    {
      id: "one-replace",
      description: "'AABABBA' with k=1 → 4",
      input: { s: "AABABBA", k: 1 },
      expected: 4,
      isHidden: false,
    },
    {
      id: "no-replace",
      description: "'AAAA' with k=0 → 4",
      input: { s: "AAAA", k: 0 },
      expected: 4,
      isHidden: false,
    },
    {
      id: "single-char",
      description: "Single character string",
      input: { s: "A", k: 0 },
      expected: 1,
      isHidden: true,
    },
    {
      id: "all-different",
      description: "All different chars with k=2",
      input: { s: "ABCDE", k: 2 },
      expected: 3,
      isHidden: true,
    },
    {
      id: "large-k",
      description: "k >= string length",
      input: { s: "ABCDEF", k: 10 },
      expected: 6,
      isHidden: true,
    },
  ],
};
