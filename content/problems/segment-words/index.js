export const problem = {
  slug: "segment-words",  category: "grind-75",
  title: "Segment Words",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Dynamic Programming", "Strings"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to check whether a string be formed from dictionary words.",

  problemMdx: `## Overview

Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

The same word in the dictionary may be reused multiple times.

## Constraints

- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 1000\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` and \`wordDict[i]\` consist of lowercase English letters.
- All strings in \`wordDict\` are unique.

## Examples

\`\`\`js
wordBreak("leetcode", ["leet", "code"]);
// => true  ("leet" + "code")
\`\`\`

\`\`\`js
wordBreak("applepenapple", ["apple", "pen"]);
// => true  ("apple" + "pen" + "apple")

wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);
// => false
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}
\`\`\`

Bottom-up DP. \`dp[i]\` is true if \`s[0..i)\` can be segmented. For each position, check all possible last words.

</details>

## Resources

- [Word Break — LeetCode](https://leetcode.com/problems/word-break/)
- [Dynamic Programming — Wikipedia](https://en.wikipedia.org/wiki/Dynamic_programming)`,

  starterCode: `/**
 * Check whether a string can be segmented into dictionary words.
 * @param {string} s
 * @param {string[]} wordDict
 * @returns {boolean}
 */
function wordBreak(s, wordDict) {
  // your implementation
}`,

  solution: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}`,

  harness: `
function solve(input) {
  return wordBreak(input.s, input.wordDict);
}`,

  tests: [
    {
      id: "basic",
      description: "'leetcode' with [leet, code] → true",
      input: { s: "leetcode", wordDict: ["leet", "code"] },
      expected: true,
      isHidden: false,
    },
    {
      id: "reuse",
      description: "'applepenapple' — reuse 'apple'",
      input: { s: "applepenapple", wordDict: ["apple", "pen"] },
      expected: true,
      isHidden: false,
    },
    {
      id: "impossible",
      description: "'catsandog' → false",
      input: { s: "catsandog", wordDict: ["cats", "dog", "sand", "and", "cat"] },
      expected: false,
      isHidden: false,
    },
    {
      id: "single-word",
      description: "Entire string is one word",
      input: { s: "hello", wordDict: ["hello"] },
      expected: true,
      isHidden: true,
    },
    {
      id: "single-char",
      description: "Single character words",
      input: { s: "ab", wordDict: ["a", "b"] },
      expected: true,
      isHidden: true,
    },
    {
      id: "no-match",
      description: "No matching words at all",
      input: { s: "xyz", wordDict: ["a", "b", "c"] },
      expected: false,
      isHidden: true,
    },
  ],
};
