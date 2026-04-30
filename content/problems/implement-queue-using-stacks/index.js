export const problem = {
  slug: "implement-queue-using-stacks",  category: "js-75",
  title: "Implement Queue using Stacks",
  difficulty: "easy",
  type: "coding",
  topics: ["Algorithms", "Stacks", "Queues", "Design"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a first-in-first-out queue using only two stacks.",

  problemMdx: `## Overview

Implement a **FIFO queue** using only two stacks. The queue should support \`push\`, \`pop\`, \`peek\`, and \`empty\`.

## Constraints

- Only use standard stack operations: push to top, pop from top, peek at top, size, isEmpty.
- All calls to \`pop\` and \`peek\` are valid (queue is not empty).

## Examples

\`\`\`js
const q = new MyQueue();
q.push(1);
q.push(2);
q.peek();  // => 1
q.pop();   // => 1
q.empty(); // => false
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
class MyQueue {
  constructor() { this.inStack = []; this.outStack = []; }
  push(x) { this.inStack.push(x); }
  pop() { this._move(); return this.outStack.pop(); }
  peek() { this._move(); return this.outStack[this.outStack.length - 1]; }
  empty() { return !this.inStack.length && !this.outStack.length; }
  _move() { if (!this.outStack.length) while (this.inStack.length) this.outStack.push(this.inStack.pop()); }
}
\`\`\`

</details>

## Resources

- [Implement Queue using Stacks — LeetCode](https://leetcode.com/problems/implement-queue-using-stacks/)`,

  starterCode: `/**
 * Implement a FIFO queue using two stacks.
 */
class MyQueue {
  constructor() {
    // your implementation
  }
  push(x) { }
  pop() { }
  peek() { }
  empty() { }
}`,

  solution: `class MyQueue {
  constructor() { this.inStack = []; this.outStack = []; }
  push(x) { this.inStack.push(x); }
  pop() { this._move(); return this.outStack.pop(); }
  peek() { this._move(); return this.outStack[this.outStack.length - 1]; }
  empty() { return !this.inStack.length && !this.outStack.length; }
  _move() { if (!this.outStack.length) while (this.inStack.length) this.outStack.push(this.inStack.pop()); }
}`,

  harness: `
function solve(input) {
  const q = new MyQueue();
  const results = [];
  for (const op of input.operations) {
    if (op[0] === "push") { q.push(op[1]); results.push(null); }
    else if (op[0] === "pop") results.push(q.pop());
    else if (op[0] === "peek") results.push(q.peek());
    else if (op[0] === "empty") results.push(q.empty());
  }
  return results;
}`,

  tests: [
    { id: "basic", description: "Push, peek, pop, empty", input: { operations: [["push",1],["push",2],["peek"],["pop"],["empty"]] }, expected: [null,null,1,1,false], isHidden: false },
    { id: "fifo", description: "FIFO ordering", input: { operations: [["push",1],["push",2],["push",3],["pop"],["pop"],["pop"]] }, expected: [null,null,null,1,2,3], isHidden: false },
    { id: "empty-check", description: "Empty after all pops", input: { operations: [["push",5],["pop"],["empty"]] }, expected: [null,5,true], isHidden: false },
    { id: "interleaved", description: "Interleaved push/pop", input: { operations: [["push",1],["pop"],["push",2],["pop"]] }, expected: [null,1,null,2], isHidden: true },
    { id: "peek-no-remove", description: "Peek doesn't remove", input: { operations: [["push",1],["peek"],["peek"],["pop"]] }, expected: [null,1,1,1], isHidden: true },
    { id: "many", description: "Many operations", input: { operations: [["push",10],["push",20],["push",30],["peek"],["pop"],["peek"]] }, expected: [null,null,null,10,10,20], isHidden: true },
  ],
};
