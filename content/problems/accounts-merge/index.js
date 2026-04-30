export const problem = {
  slug: "accounts-merge",  category: "grind-75",
  title: "Accounts Merge",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Union Find", "DFS", "Hash Map"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to merge accounts that share common emails.",

  problemMdx: `## Overview

Given a list of accounts where each account is \`[name, email1, email2, ...]\`, merge accounts belonging to the same person. Two accounts belong to the same person if they share any email. Return merged accounts with emails sorted, name first.

## Constraints

- \`1 <= accounts.length <= 1000\`
- \`1 <= accounts[i].length <= 10\`
- All emails are valid and lowercase.

## Examples

\`\`\`js
accountsMerge([
  ["John","john@mail","john_work@mail"],
  ["John","john@mail","john00@mail"],
  ["Mary","mary@mail"],
  ["John","johnny@mail"]
]);
// => [
//   ["John","john00@mail","john@mail","john_work@mail"],
//   ["John","johnny@mail"],
//   ["Mary","mary@mail"]
// ]
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function accountsMerge(accounts) {
  const parent = {};
  function find(x) { if (parent[x] !== x) parent[x] = find(parent[x]); return parent[x]; }
  function union(a, b) { parent[find(a)] = find(b); }

  const emailToName = {};
  for (const [name, ...emails] of accounts) {
    for (const e of emails) {
      if (!parent[e]) parent[e] = e;
      emailToName[e] = name;
      union(emails[0], e);
    }
  }

  const groups = {};
  for (const email of Object.keys(parent)) {
    const root = find(email);
    if (!groups[root]) groups[root] = [];
    groups[root].push(email);
  }

  return Object.values(groups).map(emails => {
    emails.sort();
    return [emailToName[emails[0]], ...emails];
  }).sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
}
\`\`\`

</details>

## Resources

- [Accounts Merge — LeetCode](https://leetcode.com/problems/accounts-merge/)`,

  starterCode: `/**
 * Merge accounts that share common emails.
 * @param {string[][]} accounts
 * @returns {string[][]}
 */
function accountsMerge(accounts) {
  // your implementation
}`,

  solution: `function accountsMerge(accounts) {
  const parent = {};
  function find(x) { if (parent[x] !== x) parent[x] = find(parent[x]); return parent[x]; }
  function union(a, b) { parent[find(a)] = find(b); }
  const emailToName = {};
  for (const [name, ...emails] of accounts) {
    for (const e of emails) {
      if (!parent[e]) parent[e] = e;
      emailToName[e] = name;
      union(emails[0], e);
    }
  }
  const groups = {};
  for (const email of Object.keys(parent)) {
    const root = find(email);
    if (!groups[root]) groups[root] = [];
    groups[root].push(email);
  }
  return Object.values(groups).map(emails => {
    emails.sort();
    return [emailToName[emails[0]], ...emails];
  }).sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]));
}`,

  harness: `function solve(input) { return accountsMerge(input.accounts); }`,

  tests: [
    { id: "basic", description: "Merge overlapping accounts", input: { accounts: [["John","john@mail","john_work@mail"],["John","john@mail","john00@mail"],["Mary","mary@mail"],["John","johnny@mail"]] }, expected: [["John","john00@mail","john@mail","john_work@mail"],["John","johnny@mail"],["Mary","mary@mail"]], isHidden: false },
    { id: "no-merge", description: "No accounts to merge", input: { accounts: [["A","a@mail"],["B","b@mail"]] }, expected: [["A","a@mail"],["B","b@mail"]], isHidden: false },
    { id: "all-merge", description: "All merge into one", input: { accounts: [["A","a@m","b@m"],["A","b@m","c@m"]] }, expected: [["A","a@m","b@m","c@m"]], isHidden: false },
    { id: "single", description: "Single account", input: { accounts: [["X","x@m"]] }, expected: [["X","x@m"]], isHidden: true },
    { id: "same-name-different", description: "Same name, no common email", input: { accounts: [["A","a@m"],["A","b@m"]] }, expected: [["A","a@m"],["A","b@m"]], isHidden: true },
    { id: "chain", description: "Chain merge", input: { accounts: [["A","a@m","b@m"],["A","b@m","c@m"],["A","c@m","d@m"]] }, expected: [["A","a@m","b@m","c@m","d@m"]], isHidden: true },
  ],
};
