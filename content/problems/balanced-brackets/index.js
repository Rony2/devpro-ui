export const problem = {
  // ── Meta ────────────────────────────────────────────────────
  slug: "balanced-brackets",  category: "grind-75",
  title: "Balanced Brackets",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Data Structures", "JavaScript"],
  companies: ["Google", "Meta", "Amazon"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to determine if a string contains balanced brackets.",

  // ── Problem description (MDX) ──────────────────────────────
  problemMdx: `## Overview

Given a string containing brackets \`()\`, \`[]\`, \`{}\` and other characters, determine whether every opening bracket has a corresponding closing bracket in the correct order.

Implement \`isBalanced(str)\` that returns \`true\` if all brackets are properly nested and matched, and \`false\` otherwise.

## Constraints

- Input is always a string (may be empty).
- Only \`()\`, \`[]\`, and \`{}\` are considered brackets — all other characters should be ignored.
- An empty string is considered balanced.
- Brackets must be closed in the correct order: \`"([])"\` is valid, \`"([)]"\` is not.
- Strings with only non-bracket characters are considered balanced.

## Examples

\`\`\`js
isBalanced("()[]{}");           // true
isBalanced("([{}])");           // true
isBalanced("(]");               // false
isBalanced("([)]");             // false
isBalanced("a]b(c)[d]");       // false — stray closing bracket
isBalanced("");                 // true
isBalanced("hello world");     // true — no brackets
\`\`\`

## Notes

- A classic stack-based approach works well here — push opening brackets, pop on closing brackets, and verify the match.
- Edge cases: strings with only opening brackets, only closing brackets, deeply nested brackets, and mixed non-bracket characters.
- Time complexity should be $O(n)$ where $n$ is the string length.

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function isBalanced(str) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const openers = new Set(["(", "[", "{"]);

  for (const ch of str) {
    if (openers.has(ch)) {
      stack.push(ch);
    } else if (pairs[ch] !== undefined) {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) return false;
    }
  }

  return stack.length === 0;
}
\`\`\`

</details>

## Resources

- [Stack Data Structure — Wikipedia](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
- [Matching Brackets — LeetCode](https://leetcode.com/problems/valid-parentheses/)`,

  // ── Starter code ───────────────────────────────────────────
  starterCode: `/**
 * Determine if a string contains balanced brackets.
 *
 * @param {string} str - The input string
 * @returns {boolean} True if all brackets are properly nested and matched
 */
function isBalanced(str) {
  // your implementation
}`,

  // ── Solution (server-only, never sent to client) ───────────
  solution: `function isBalanced(str) {
  const stack = [];
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const openers = new Set(["(", "[", "{"]);

  for (const ch of str) {
    if (openers.has(ch)) {
      stack.push(ch);
    } else if (pairs[ch] !== undefined) {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) return false;
    }
  }

  return stack.length === 0;
}`,

  // ── Harness ────────────────────────────────────────────────
  harness: `
function solve(input) {
  return isBalanced(input.str);
}`,

  // ── Test cases ─────────────────────────────────────────────
  tests: [
    {
      id: "simple-balanced",
      description: "Simple balanced brackets",
      input: { str: "()[]{}" },
      expected: true,
      isHidden: false,
    },
    {
      id: "nested-balanced",
      description: "Deeply nested brackets are balanced",
      input: { str: "([{}])" },
      expected: true,
      isHidden: false,
    },
    {
      id: "mismatched",
      description: "Mismatched brackets return false",
      input: { str: "(]" },
      expected: false,
      isHidden: false,
    },
    {
      id: "hidden-interleaved",
      description: "Interleaved brackets are not balanced",
      input: { str: "([)]" },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-with-chars",
      description: "Non-bracket characters are ignored",
      input: { str: "a]b(c)[d]" },
      expected: false,
      isHidden: true,
    },
    {
      id: "hidden-empty",
      description: "Empty string is balanced",
      input: { str: "" },
      expected: true,
      isHidden: true,
    },
  ],
};
