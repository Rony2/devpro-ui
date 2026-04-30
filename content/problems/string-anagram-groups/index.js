export const problem = {
  slug: "string-anagram-groups",  category: "grind-75",
  title: "String Anagram Groups",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Hash Map", "Strings", "Sorting"],
  companies: ["Google", "Meta", "Stripe"],
  estimatedMinutes: 25,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to group an array of strings into anagrams.",

  problemMdx: `## Overview

Given an array of strings \`strs\`, group the **anagrams** together. You can return the answer in any order.

An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.

## Constraints

- \`1 <= strs.length <= 10,000\`
- \`0 <= strs[i].length <= 100\`
- \`strs[i]\` consists of lowercase English letters.
- Each group should be sorted alphabetically, and the groups themselves sorted by the first element.

## Examples

\`\`\`js
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// => [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]
\`\`\`

\`\`\`js
groupAnagrams([""]);
// => [[""]]

groupAnagrams(["a"]);
// => [["a"]]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function groupAnagrams(strs) {
  const map = new Map();

  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }

  const groups = [...map.values()];
  groups.forEach(g => g.sort());
  groups.sort((a, b) => a[0].localeCompare(b[0]));
  return groups;
}
\`\`\`

Sort each string to create a canonical key. Group by that key using a hash map. O(n * k log k) where k is the max string length.

</details>

## Resources

- [Group Anagrams — LeetCode](https://leetcode.com/problems/group-anagrams/)
- [Anagram — Wikipedia](https://en.wikipedia.org/wiki/Anagram)`,

  starterCode: `/**
 * Group an array of strings into anagrams.
 * @param {string[]} strs
 * @returns {string[][]}
 */
function groupAnagrams(strs) {
  // your implementation
}`,

  solution: `function groupAnagrams(strs) {
  const map = new Map();

  for (const s of strs) {
    const key = s.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }

  const groups = [...map.values()];
  groups.forEach(g => g.sort());
  groups.sort((a, b) => a[0].localeCompare(b[0]));
  return groups;
}`,

  harness: `
function solve(input) {
  return groupAnagrams(input.strs);
}`,

  tests: [
    {
      id: "basic",
      description: "Groups eat/tea/ate, tan/nat, bat",
      input: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
      expected: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]],
      isHidden: false,
    },
    {
      id: "empty-string",
      description: "Single empty string",
      input: { strs: [""] },
      expected: [[""]],
      isHidden: false,
    },
    {
      id: "single",
      description: "Single element",
      input: { strs: ["a"] },
      expected: [["a"]],
      isHidden: false,
    },
    {
      id: "no-anagrams",
      description: "No anagrams — each in own group",
      input: { strs: ["abc", "def", "ghi"] },
      expected: [["abc"], ["def"], ["ghi"]],
      isHidden: true,
    },
    {
      id: "all-same",
      description: "All identical strings",
      input: { strs: ["ab", "ab", "ab"] },
      expected: [["ab", "ab", "ab"]],
      isHidden: true,
    },
    {
      id: "mixed-lengths",
      description: "Mixed length strings",
      input: { strs: ["a", "b", "ab", "ba"] },
      expected: [["a"], ["ab", "ba"], ["b"]],
      isHidden: true,
    },
  ],
};
