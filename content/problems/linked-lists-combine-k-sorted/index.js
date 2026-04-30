export const problem = {
  slug: "linked-lists-combine-k-sorted",  category: "grind-75",
  title: "Linked Lists Combine K Sorted",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Linked Lists", "Heap"],
  companies: ["Meta", "Google", "Stripe"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to combine k sorted linked lists.",

  problemMdx: `## Overview

You are given an array of \`k\` sorted linked lists. Merge all the linked lists into **one sorted linked list** and return the head.

Each linked list is a chain of nodes: \`{ val, next }\`.

## Constraints

- \`0 <= k <= 10,000\`
- \`0 <= total nodes across all lists <= 10,000\`
- Each list is sorted in ascending order.
- Node values are integers in range \`[-10,000, 10,000]\`.

## Examples

\`\`\`js
// lists: [1->4->5, 1->3->4, 2->6]
mergeKLists([
  { val: 1, next: { val: 4, next: { val: 5, next: null } } },
  { val: 1, next: { val: 3, next: { val: 4, next: null } } },
  { val: 2, next: { val: 6, next: null } },
]);
// => 1->1->2->3->4->4->5->6
\`\`\`

\`\`\`js
mergeKLists([]);
// => null

mergeKLists([null]);
// => null
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function mergeKLists(lists) {
  if (!lists.length) return null;

  function mergeTwoLists(a, b) {
    const dummy = { val: 0, next: null };
    let curr = dummy;
    while (a && b) {
      if (a.val <= b.val) { curr.next = a; a = a.next; }
      else { curr.next = b; b = b.next; }
      curr = curr.next;
    }
    curr.next = a || b;
    return dummy.next;
  }

  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const a = lists[i];
      const b = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(a, b));
    }
    lists = merged;
  }

  return lists[0];
}
\`\`\`

Divide and conquer: pairwise merge until one list remains. O(N log k) time.

</details>

## Resources

- [Merge k Sorted Lists — LeetCode](https://leetcode.com/problems/merge-k-sorted-lists/)
- [Merge Sort — Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)`,

  starterCode: `/**
 * Merge k sorted linked lists into one sorted list.
 * @param {{ val: number, next: ListNode | null }[]} lists
 * @returns {{ val: number, next: ListNode | null } | null}
 */
function mergeKLists(lists) {
  // your implementation
}`,

  solution: `function mergeKLists(lists) {
  if (!lists.length) return null;

  function mergeTwoLists(a, b) {
    const dummy = { val: 0, next: null };
    let curr = dummy;
    while (a && b) {
      if (a.val <= b.val) { curr.next = a; a = a.next; }
      else { curr.next = b; b = b.next; }
      curr = curr.next;
    }
    curr.next = a || b;
    return dummy.next;
  }

  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const a = lists[i];
      const b = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(a, b));
    }
    lists = merged;
  }

  return lists[0];
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
  const lists = input.lists.map(buildList);
  return listToArray(mergeKLists(lists));
}`,

  tests: [
    {
      id: "three-lists",
      description: "Merges 3 sorted lists",
      input: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
      expected: [1, 1, 2, 3, 4, 4, 5, 6],
      isHidden: false,
    },
    {
      id: "empty-array",
      description: "Empty array returns empty",
      input: { lists: [] },
      expected: [],
      isHidden: false,
    },
    {
      id: "single-list",
      description: "Single list returned as-is",
      input: { lists: [[1, 2, 3]] },
      expected: [1, 2, 3],
      isHidden: false,
    },
    {
      id: "with-empty-lists",
      description: "Handles empty lists in array",
      input: { lists: [[], [1], []] },
      expected: [1],
      isHidden: true,
    },
    {
      id: "negatives",
      description: "Handles negative values",
      input: { lists: [[-3, -1, 5], [-2, 0, 4]] },
      expected: [-3, -2, -1, 0, 4, 5],
      isHidden: true,
    },
    {
      id: "four-lists",
      description: "Merges 4 lists",
      input: { lists: [[1, 5], [2, 6], [3, 7], [4, 8]] },
      expected: [1, 2, 3, 4, 5, 6, 7, 8],
      isHidden: true,
    },
  ],
};
