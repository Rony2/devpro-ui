export const problem = {
  slug: "linked-lists-combine-two-sorted",  category: "grind-75",
  title: "Linked Lists Combine Two Sorted",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Linked Lists"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to combine two sorted linked lists.",

  problemMdx: `## Overview

Given the heads of two sorted linked lists, merge them into a single **sorted** linked list by splicing together the nodes from both lists. Return the head of the merged list.

## Constraints

- Both lists are sorted in ascending order.
- The total number of nodes is in range \`[0, 100]\`.
- Node values are in range \`[-100, 100]\`.

## Examples

\`\`\`js
// list1: 1->2->4
// list2: 1->3->4
mergeTwoLists(list1, list2);
// => 1->1->2->3->4->4
\`\`\`

\`\`\`js
// Both empty
mergeTwoLists(null, null);
// => null

// One empty
mergeTwoLists(null, { val: 0, next: null });
// => 0
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  curr.next = list1 || list2;
  return dummy.next;
}
\`\`\`

</details>

## Resources

- [Merge Two Sorted Lists — LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)
- [Linked List — Wikipedia](https://en.wikipedia.org/wiki/Linked_list)`,

  starterCode: `/**
 * Merge two sorted linked lists into one sorted list.
 * @param {{ val: number, next: ListNode | null } | null} list1
 * @param {{ val: number, next: ListNode | null } | null} list2
 * @returns {{ val: number, next: ListNode | null } | null}
 */
function mergeTwoLists(list1, list2) {
  // your implementation
}`,

  solution: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  curr.next = list1 || list2;
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
  const l1 = buildList(input.list1);
  const l2 = buildList(input.list2);
  return listToArray(mergeTwoLists(l1, l2));
}`,

  tests: [
    {
      id: "basic",
      description: "Merges [1,2,4] and [1,3,4]",
      input: { list1: [1, 2, 4], list2: [1, 3, 4] },
      expected: [1, 1, 2, 3, 4, 4],
      isHidden: false,
    },
    {
      id: "both-empty",
      description: "Both empty returns empty",
      input: { list1: [], list2: [] },
      expected: [],
      isHidden: false,
    },
    {
      id: "one-empty",
      description: "One empty list",
      input: { list1: [], list2: [0] },
      expected: [0],
      isHidden: false,
    },
    {
      id: "single-elements",
      description: "Two single-element lists",
      input: { list1: [1], list2: [2] },
      expected: [1, 2],
      isHidden: true,
    },
    {
      id: "negatives",
      description: "Negative values",
      input: { list1: [-3, 0, 5], list2: [-2, 1, 4] },
      expected: [-3, -2, 0, 1, 4, 5],
      isHidden: true,
    },
    {
      id: "different-lengths",
      description: "Different length lists",
      input: { list1: [1, 2, 3, 4, 5], list2: [6] },
      expected: [1, 2, 3, 4, 5, 6],
      isHidden: true,
    },
  ],
};
