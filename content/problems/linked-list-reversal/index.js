export const problem = {
  slug: "linked-list-reversal",  category: "grind-75",
  title: "Linked List Reversal",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Linked Lists"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to reverse a linked list.",

  problemMdx: `## Overview

Given the head of a singly linked list, reverse the list and return the new head.

## Constraints

- The list has 0 to 5,000 nodes.
- Node values are integers.
- Solve iteratively using O(1) extra space.

## Examples

\`\`\`js
// 1 -> 2 -> 3 -> 4 -> 5
reverseList(head);
// => 5 -> 4 -> 3 -> 2 -> 1
\`\`\`

\`\`\`js
// 1 -> 2
reverseList(head);
// => 2 -> 1

// null
reverseList(null);
// => null
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
\`\`\`

</details>

## Resources

- [Reverse Linked List — LeetCode](https://leetcode.com/problems/reverse-linked-list/)
- [Linked List — Wikipedia](https://en.wikipedia.org/wiki/Linked_list)`,

  starterCode: `/**
 * Reverse a singly linked list.
 * @param {{ val: number, next: ListNode | null } | null} head
 * @returns {{ val: number, next: ListNode | null } | null}
 */
function reverseList(head) {
  // your implementation
}`,

  solution: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,

  harness: `
function buildList(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) {
    head = { val: arr[i], next: head };
  }
  return head;
}

function listToArray(head) {
  const result = [];
  while (head) { result.push(head.val); head = head.next; }
  return result;
}

function solve(input) {
  const head = buildList(input.list);
  return listToArray(reverseList(head));
}`,

  tests: [
    {
      id: "basic",
      description: "Reverses [1,2,3,4,5]",
      input: { list: [1, 2, 3, 4, 5] },
      expected: [5, 4, 3, 2, 1],
      isHidden: false,
    },
    {
      id: "two-nodes",
      description: "Reverses [1,2]",
      input: { list: [1, 2] },
      expected: [2, 1],
      isHidden: false,
    },
    {
      id: "empty",
      description: "Empty list returns empty",
      input: { list: [] },
      expected: [],
      isHidden: false,
    },
    {
      id: "single",
      description: "Single node stays the same",
      input: { list: [42] },
      expected: [42],
      isHidden: true,
    },
    {
      id: "three",
      description: "Reverses [1,2,3]",
      input: { list: [1, 2, 3] },
      expected: [3, 2, 1],
      isHidden: true,
    },
    {
      id: "negatives",
      description: "Handles negative values",
      input: { list: [-1, 0, 5, -3] },
      expected: [-3, 5, 0, -1],
      isHidden: true,
    },
  ],
};
