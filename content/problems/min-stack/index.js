export const problem = {
  slug: "min-stack",  category: "js-75",
  title: "Min Stack",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Stacks", "Design"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 20,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a stack that supports push, pop, top, and retrieving the minimum element in O(1).",

  problemMdx: `## Overview

Design a stack that supports \`push\`, \`pop\`, \`top\`, and \`getMin\` — all in **O(1)** time.

## Constraints

- \`-2^31 <= val <= 2^31 - 1\`
- \`pop\`, \`top\`, and \`getMin\` are always called on non-empty stacks.

## Examples

\`\`\`js
const s = new MinStack();
s.push(-2); s.push(0); s.push(-3);
s.getMin(); // => -3
s.pop();
s.top();    // => 0
s.getMin(); // => -2
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) { this.stack.push(val); this.minStack.push(Math.min(val, this.minStack.length ? this.minStack[this.minStack.length-1] : val)); }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}
\`\`\`

</details>

## Resources

- [Min Stack — LeetCode](https://leetcode.com/problems/min-stack/)`,

  starterCode: `/**
 * Design a stack with O(1) getMin.
 */
class MinStack {
  constructor() { }
  push(val) { }
  pop() { }
  top() { }
  getMin() { }
}`,

  solution: `class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) { this.stack.push(val); this.minStack.push(Math.min(val, this.minStack.length ? this.minStack[this.minStack.length-1] : val)); }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}`,

  harness: `
function solve(input) {
  const s = new MinStack();
  const results = [];
  for (const op of input.operations) {
    if (op[0] === "push") { s.push(op[1]); results.push(null); }
    else if (op[0] === "pop") { s.pop(); results.push(null); }
    else if (op[0] === "top") results.push(s.top());
    else if (op[0] === "getMin") results.push(s.getMin());
  }
  return results;
}`,

  tests: [
    { id: "basic", description: "Push, getMin, pop, getMin", input: { operations: [["push",-2],["push",0],["push",-3],["getMin"],["pop"],["top"],["getMin"]] }, expected: [null,null,null,-3,null,0,-2], isHidden: false },
    { id: "ascending", description: "Ascending pushes", input: { operations: [["push",1],["push",2],["push",3],["getMin"]] }, expected: [null,null,null,1], isHidden: false },
    { id: "descending", description: "Descending pushes", input: { operations: [["push",3],["push",2],["push",1],["getMin"],["pop"],["getMin"]] }, expected: [null,null,null,1,null,2], isHidden: false },
    { id: "same", description: "Same values", input: { operations: [["push",0],["push",0],["getMin"],["pop"],["getMin"]] }, expected: [null,null,0,null,0], isHidden: true },
    { id: "single", description: "Single element", input: { operations: [["push",5],["top"],["getMin"]] }, expected: [null,5,5], isHidden: true },
    { id: "negative", description: "All negative", input: { operations: [["push",-1],["push",-5],["push",-3],["getMin"],["pop"],["getMin"]] }, expected: [null,null,null,-5,null,-5], isHidden: true },
  ],
};
