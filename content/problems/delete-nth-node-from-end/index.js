export const problem = {
  slug: "delete-nth-node-from-end",  category: "grind-75",
  title: "Delete Nth Node from End of Linked List",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Linked Lists", "Two Pointers"],
  companies: ["Meta", "Google"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to delete the nth node from the end of a linked list.",

  problemMdx: `## Overview

Given the head of a linked list, remove the **nth node from the end** of the list and return the modified list's head.

Use a one-pass algorithm with O(1) extra space.

## Constraints

- The number of nodes is in range \`[1, 30]\`.
- \`1 <= n <= length of list\`.
- Node values are integers.

## Examples

\`\`\`js
// List: 1->2->3->4->5, n=2
removeNthFromEnd(head, 2);
// => 1->2->3->5  (removed node 4)
\`\`\`

\`\`\`js
// List: 1, n=1
removeNthFromEnd(head, 1);
// => null  (removed the only node)

// List: 1->2, n=1
removeNthFromEnd(head, 1);
// => 1  (removed node 2)
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy;
  let slow = dummy;

  // Advance fast by n+1 steps
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // Move both until fast reaches end
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // Skip the target node
  slow.next = slow.next.next;
  return dummy.next;
}
\`\`\`

Two-pointer technique: fast pointer leads by n+1 nodes. When fast reaches null, slow is right before the target.

</details>

## Resources

- [Remove Nth Node From End — LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
- [Linked List — Wikipedia](https://en.wikipedia.org/wiki/Linked_list)`,

  starterCode: `/**
 * Remove the nth node from the end of the linked list.
 * @param {{ val: number, next: ListNode | null } | null} head
 * @param {number} n
 * @returns {{ val: number, next: ListNode | null } | null}
 */
function removeNthFromEnd(head, n) {
  // your implementation
}`,

  solution: `function removeNthFromEnd(head, n) {
  const dummy = { val: 0, next: head };
  let fast = dummy;
  let slow = dummy;

  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return dummy.next;
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
  return listToArray(removeNthFromEnd(head, input.n));
}`,

  tests: [
    {
      id: "basic",
      description: "Removes 2nd from end in [1,2,3,4,5]",
      input: { list: [1, 2, 3, 4, 5], n: 2 },
      expected: [1, 2, 3, 5],
      isHidden: false,
    },
    {
      id: "single-node",
      description: "Removes only node",
      input: { list: [1], n: 1 },
      expected: [],
      isHidden: false,
    },
    {
      id: "remove-last",
      description: "Removes last node from [1,2]",
      input: { list: [1, 2], n: 1 },
      expected: [1],
      isHidden: false,
    },
    {
      id: "remove-first",
      description: "Removes first node (nth from end equals length)",
      input: { list: [1, 2, 3], n: 3 },
      expected: [2, 3],
      isHidden: true,
    },
    {
      id: "two-nodes-first",
      description: "Removes head of two-node list",
      input: { list: [1, 2], n: 2 },
      expected: [2],
      isHidden: true,
    },
    {
      id: "middle",
      description: "Removes middle node",
      input: { list: [1, 2, 3, 4, 5], n: 3 },
      expected: [1, 2, 4, 5],
      isHidden: true,
    },
  ],
};
