export const problem = {
  slug: "longest-common-subsequence",  category: "grind-75",
  title: "Longest Common Subsequence",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Strings"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to find the longest common subsequence in two strings.",

  problemMdx: `## Overview

Given two strings \`text1\` and \`text2\`, return the length of their **longest common subsequence**. If there is no common subsequence, return 0.

A subsequence is a sequence derived from another by deleting some or no elements without changing the order of remaining elements.

## Constraints

- \`1 <= text1.length, text2.length <= 1000\`
- Strings contain only lowercase English letters.
- Return an integer (the length, not the subsequence itself).

## Examples

\`\`\`js
longestCommonSubsequence("abcde", "ace");
// => 3  (subsequence: "ace")
\`\`\`

\`\`\`js
longestCommonSubsequence("abc", "abc");
// => 3  (identical strings)

longestCommonSubsequence("abc", "def");
// => 0  (no common characters)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
\`\`\`

Classic 2D DP. If characters match, extend the diagonal. Otherwise take the max of dropping either character.

</details>

## Resources

- [Longest Common Subsequence — LeetCode](https://leetcode.com/problems/longest-common-subsequence/)
- [LCS — Wikipedia](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)`,

  starterCode: `/**
 * Find the length of the longest common subsequence of two strings.
 * @param {string} text1
 * @param {string} text2
 * @returns {number}
 */
function longestCommonSubsequence(text1, text2) {
  // your implementation
}`,

  solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}`,

  harness: `
function solve(input) {
  return longestCommonSubsequence(input.text1, input.text2);
}`,

  tests: [
    {
      id: "basic",
      description: "LCS of 'abcde' and 'ace' is 3",
      input: { text1: "abcde", text2: "ace" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "identical",
      description: "Identical strings",
      input: { text1: "abc", text2: "abc" },
      expected: 3,
      isHidden: false,
    },
    {
      id: "no-common",
      description: "No common characters",
      input: { text1: "abc", text2: "def" },
      expected: 0,
      isHidden: false,
    },
    {
      id: "single-char",
      description: "Single common character",
      input: { text1: "a", text2: "a" },
      expected: 1,
      isHidden: true,
    },
    {
      id: "partial",
      description: "Partial overlap",
      input: { text1: "oxcpqrsvwf", text2: "shmtulqrypy" },
      expected: 2,
      isHidden: true,
    },
    {
      id: "longer",
      description: "Longer strings",
      input: { text1: "abcba", text2: "abcbcba" },
      expected: 5,
      isHidden: true,
    },
  ],
};
