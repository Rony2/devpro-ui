export const problem = {
  slug: "middle-of-linked-list",  category: "grind-75",
  title: "Middle of the Linked List",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Linked Lists", "Two Pointers"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to find the middle node of a linked list.",

  problemMdx: `## Overview

Given the head of a singly linked list, return the **middle node**. If there are two middle nodes, return the second one.

## Constraints

- The number of nodes is in the range \`[1, 100]\`.
- \`1 <= Node.val <= 100\`

## Examples

\`\`\`js
middleNode([1, 2, 3, 4, 5]); // => [3, 4, 5]  (middle is node 3)
middleNode([1, 2, 3, 4, 5, 6]); // => [4, 5, 6]  (second middle)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
\`\`\`

</details>

## Resources

- [Middle of the Linked List — LeetCode](https://leetcode.com/problems/middle-of-the-linked-list/)`,

  starterCode: `/**
 * Find the middle node of a linked list.
 * @param {{ val: number, next: ListNode | null }} head
 * @returns {{ val: number, next: ListNode | null }}
 */
function middleNode(head) {
  // your implementation
}`,

  solution: `function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`,

  harness: `
function buildList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) head = { val: arr[i], next: head };
  return head;
}
function listToArray(head) {
  const r = []; while (head) { r.push(head.val); head = head.next; } return r;
}
function solve(input) { return listToArray(middleNode(buildList(input.list))); }`,

  tests: [
    { id: "odd", description: "Odd length [1,2,3,4,5]", input: { list: [1,2,3,4,5] }, expected: [3,4,5], isHidden: false },
    { id: "even", description: "Even length [1,2,3,4,5,6]", input: { list: [1,2,3,4,5,6] }, expected: [4,5,6], isHidden: false },
    { id: "single", description: "Single node", input: { list: [1] }, expected: [1], isHidden: false },
    { id: "two", description: "Two nodes", input: { list: [1,2] }, expected: [2], isHidden: true },
    { id: "three", description: "Three nodes", input: { list: [1,2,3] }, expected: [2,3], isHidden: true },
    { id: "four", description: "Four nodes", input: { list: [1,2,3,4] }, expected: [3,4], isHidden: true },
  ],
};
