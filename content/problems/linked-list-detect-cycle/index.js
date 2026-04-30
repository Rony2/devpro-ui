export const problem = {
  slug: "linked-list-detect-cycle",  category: "grind-75",
  title: "Linked List Detect Cycle",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Linked Lists", "Two Pointers"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 15,
  published: true,
  addedAt: "2026-04-01",
  description:
    "Implement a function to detect if there are cycles in a linked list.",

  problemMdx: `## Overview

Given the head of a linked list, determine if the list has a **cycle** in it. A cycle exists if some node can be reached again by continuously following the \`next\` pointer.

Return \`true\` if a cycle exists, \`false\` otherwise. Use O(1) extra space.

## Constraints

- The list has 0 to 10,000 nodes.
- Node values are integers.
- Use constant extra space (no hash set).

## Examples

\`\`\`js
// 3 -> 2 -> 0 -> -4
//      ^-----------+  (cycle back to node 2)
hasCycle(head); // => true
\`\`\`

\`\`\`js
// 1 -> 2 -> null
hasCycle(head); // => false

// null (empty list)
hasCycle(null); // => false
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}
\`\`\`

Floyd's Tortoise and Hare algorithm. If there's a cycle, the fast pointer will eventually meet the slow pointer.

</details>

## Resources

- [Linked List Cycle — LeetCode](https://leetcode.com/problems/linked-list-cycle/)
- [Floyd's Cycle Detection — Wikipedia](https://en.wikipedia.org/wiki/Cycle_detection#Floyd's_tortoise_and_hare)`,

  starterCode: `/**
 * Detect if a linked list has a cycle.
 * @param {{ val: number, next: ListNode | null } | null} head
 * @returns {boolean}
 */
function hasCycle(head) {
  // your implementation
}`,

  solution: `function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`,

  harness: `
function solve(input) {
  const { values, cycleIndex } = input;
  if (!values.length) return hasCycle(null);

  const nodes = values.map(v => ({ val: v, next: null }));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }
  if (cycleIndex >= 0) {
    nodes[nodes.length - 1].next = nodes[cycleIndex];
  }

  return hasCycle(nodes[0]);
}`,

  tests: [
    {
      id: "has-cycle",
      description: "Detects a cycle",
      input: { values: [3, 2, 0, -4], cycleIndex: 1 },
      expected: true,
      isHidden: false,
    },
    {
      id: "no-cycle",
      description: "No cycle returns false",
      input: { values: [1, 2], cycleIndex: -1 },
      expected: false,
      isHidden: false,
    },
    {
      id: "empty",
      description: "Empty list returns false",
      input: { values: [], cycleIndex: -1 },
      expected: false,
      isHidden: false,
    },
    {
      id: "self-loop",
      description: "Single node pointing to itself",
      input: { values: [1], cycleIndex: 0 },
      expected: true,
      isHidden: true,
    },
    {
      id: "cycle-at-end",
      description: "Cycle at the tail",
      input: { values: [1, 2, 3, 4], cycleIndex: 3 },
      expected: true,
      isHidden: true,
    },
    {
      id: "long-no-cycle",
      description: "Long list without cycle",
      input: { values: [1, 2, 3, 4, 5, 6, 7, 8], cycleIndex: -1 },
      expected: false,
      isHidden: true,
    },
  ],
};
