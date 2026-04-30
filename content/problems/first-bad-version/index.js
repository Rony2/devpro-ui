export const problem = {
  slug: "first-bad-version",  category: "grind-75",
  title: "First Bad Version",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Binary Search"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the first bad version using minimum API calls.",

  problemMdx: `## Overview

You are a product manager with \`n\` versions \`[1, 2, ..., n]\`. One version is bad, and all subsequent versions are also bad. Given an API \`isBadVersion(version)\`, find the **first bad version** while minimizing calls.

## Constraints

- \`1 <= bad <= n <= 2^31 - 1\`
- Must use O(log n) calls to \`isBadVersion\`.

## Examples

\`\`\`js
// n = 5, bad = 4
firstBadVersion(5); // => 4
// isBadVersion(3) → false, isBadVersion(5) → true, isBadVersion(4) → true
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function solution(isBadVersion) {
  return function(n) {
    let lo = 1, hi = n;
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      if (isBadVersion(mid)) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };
}
\`\`\`

</details>

## Resources

- [First Bad Version — LeetCode](https://leetcode.com/problems/first-bad-version/)`,

  starterCode: `/**
 * Find the first bad version.
 * isBadVersion is provided — returns true if version is bad.
 * @param {number} n
 * @returns {number}
 */
function firstBadVersion(n) {
  // isBadVersion(version) is available
  // your implementation
}`,

  solution: `function firstBadVersion(n) {
  let lo = 1, hi = n;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (isBadVersion(mid)) hi = mid;
    else lo = mid + 1;
  }
  return lo;
}`,

  harness: `
function solve(input) {
  const bad = input.bad;
  globalThis.isBadVersion = (v) => v >= bad;
  return firstBadVersion(input.n);
}`,

  tests: [
    { id: "basic", description: "n=5, bad=4", input: { n: 5, bad: 4 }, expected: 4, isHidden: false },
    { id: "first-is-bad", description: "First version is bad", input: { n: 3, bad: 1 }, expected: 1, isHidden: false },
    { id: "last-is-bad", description: "Last version is bad", input: { n: 5, bad: 5 }, expected: 5, isHidden: false },
    { id: "single", description: "Only one version", input: { n: 1, bad: 1 }, expected: 1, isHidden: true },
    { id: "two-first", description: "Two versions, first bad", input: { n: 2, bad: 1 }, expected: 1, isHidden: true },
    { id: "large", description: "Large n", input: { n: 100, bad: 50 }, expected: 50, isHidden: true },
  ],
};
