export const problem = {
  slug: "letter-combinations-phone-number",  category: "grind-75",
  title: "Letter Combinations of a Phone Number",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Backtracking", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to return all letter combinations that a phone number could represent.",

  problemMdx: `## Overview

Given a string containing digits \`2-9\`, return all possible letter combinations the number could represent (phone keypad mapping). Return in any order.

Mapping: 2→abc, 3→def, 4→ghi, 5→jkl, 6→mno, 7→pqrs, 8→tuv, 9→wxyz

## Constraints

- \`0 <= digits.length <= 4\`
- \`digits[i]\` is between '2' and '9'.

## Examples

\`\`\`js
letterCombinations("23");
// => ["ad","ae","af","bd","be","bf","cd","ce","cf"]

letterCombinations("");
// => []
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function letterCombinations(digits) {
  if (!digits.length) return [];
  const map = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' };
  const result = [];
  function backtrack(i, path) {
    if (i === digits.length) { result.push(path); return; }
    for (const c of map[digits[i]]) backtrack(i + 1, path + c);
  }
  backtrack(0, "");
  return result;
}
\`\`\`

</details>

## Resources

- [Letter Combinations of a Phone Number — LeetCode](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)`,

  starterCode: `/**
 * Return all letter combinations for phone digits.
 * @param {string} digits
 * @returns {string[]}
 */
function letterCombinations(digits) {
  // your implementation
}`,

  solution: `function letterCombinations(digits) {
  if (!digits.length) return [];
  const map = { '2':'abc','3':'def','4':'ghi','5':'jkl','6':'mno','7':'pqrs','8':'tuv','9':'wxyz' };
  const result = [];
  function backtrack(i, path) {
    if (i === digits.length) { result.push(path); return; }
    for (const c of map[digits[i]]) backtrack(i + 1, path + c);
  }
  backtrack(0, "");
  return result;
}`,

  harness: `function solve(input) { return letterCombinations(input.digits).sort(); }`,

  tests: [
    { id: "basic", description: "'23' → 9 combinations", input: { digits: "23" }, expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"], isHidden: false },
    { id: "empty", description: "Empty string → []", input: { digits: "" }, expected: [], isHidden: false },
    { id: "single", description: "Single digit '2'", input: { digits: "2" }, expected: ["a","b","c"], isHidden: false },
    { id: "four-letters", description: "Digit 7 has 4 letters", input: { digits: "7" }, expected: ["p","q","r","s"], isHidden: true },
    { id: "three-digits", description: "Three digits", input: { digits: "234" }, expected: ["adg","adh","adi","aeg","aeh","aei","afg","afh","afi","bdg","bdh","bdi","beg","beh","bei","bfg","bfh","bfi","cdg","cdh","cdi","ceg","ceh","cei","cfg","cfh","cfi"], isHidden: true },
    { id: "nine", description: "Digit 9", input: { digits: "9" }, expected: ["w","x","y","z"], isHidden: true },
  ],
};
