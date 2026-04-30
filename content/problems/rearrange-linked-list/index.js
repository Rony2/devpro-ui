export const problem = {
  slug: "rearrange-linked-list",  category: "grind-75",
  title: "Rearrange Linked List",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Linked Lists", "Two Pointers"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to rearrange the nodes in a linked list.",

  problemMdx: `## Overview

Given a singly linked list \`L0 → L1 → … → Ln-1 → Ln\`, reorder it to: \`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …\`

You must modify the list **in-place** — do not create new nodes, only rearrange the pointers.

## Constraints

- The list has 1 to 50,000 nodes.
- Node values are integers.
- Modify the list in place and return the head.

## Examples

\`\`\`js
// 1 -> 2 -> 3 -> 4
reorderList(head);
// => 1 -> 4 -> 2 -> 3
\`\`\`

\`\`\`js
// 1 -> 2 -> 3 -> 4 -> 5
reorderList(head);
// => 1 -> 5 -> 2 -> 4 -> 3
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function reorderList(head) {
  if (!head || !head.next) return head;

  // 1. Find middle
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Merge alternating
  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }

  return head;
}
\`\`\`

Three steps: find middle with slow/fast, reverse the second half, merge by alternating nodes.

</details>

## Resources

- [Reorder List — LeetCode](https://leetcode.com/problems/reorder-list/)
- [Linked List — Wikipedia](https://en.wikipedia.org/wiki/Linked_list)`,

  starterCode: `/**
 * Reorder the linked list: L0→Ln→L1→Ln-1→L2→Ln-2→…
 * @param {{ val: number, next: ListNode | null } | null} head
 * @returns {{ val: number, next: ListNode | null } | null}
 */
function reorderList(head) {
  // your implementation
}`,

  solution: `function reorderList(head) {
  if (!head || !head.next) return head;

  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  let prev = null, curr = slow.next;
  slow.next = null;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  let first = head, second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }

  return head;
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
  return listToArray(reorderList(head));
}`,

  tests: [
    {
      id: "even",
      description: "Even-length list [1,2,3,4]",
      input: { list: [1, 2, 3, 4] },
      expected: [1, 4, 2, 3],
      isHidden: false,
    },
    {
      id: "odd",
      description: "Odd-length list [1,2,3,4,5]",
      input: { list: [1, 2, 3, 4, 5] },
      expected: [1, 5, 2, 4, 3],
      isHidden: false,
    },
    {
      id: "two-nodes",
      description: "Two-node list stays the same",
      input: { list: [1, 2] },
      expected: [1, 2],
      isHidden: false,
    },
    {
      id: "single",
      description: "Single node",
      input: { list: [1] },
      expected: [1],
      isHidden: true,
    },
    {
      id: "three",
      description: "Three-node list",
      input: { list: [1, 2, 3] },
      expected: [1, 3, 2],
      isHidden: true,
    },
    {
      id: "six",
      description: "Six-node list",
      input: { list: [1, 2, 3, 4, 5, 6] },
      expected: [1, 6, 2, 5, 3, 4],
      isHidden: true,
    },
  ],
};
