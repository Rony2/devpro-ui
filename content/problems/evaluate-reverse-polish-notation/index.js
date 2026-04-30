export const problem = {
  slug: "evaluate-reverse-polish-notation",  category: "grind-75",
  title: "Evaluate Reverse Polish Notation",
  difficulty: "medium",
  type: "coding",
  topics: ["Algorithms", "Stacks", "Math"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 30,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to evaluate an expression in Reverse Polish Notation.",

  problemMdx: `## Overview

Evaluate the value of an arithmetic expression in **Reverse Polish Notation** (postfix). Valid operators are \`+\`, \`-\`, \`*\`, \`/\`. Division truncates toward zero.

## Constraints

- \`1 <= tokens.length <= 10,000\`
- Each token is an operator or an integer in the range \`[-200, 200]\`.
- The expression is always valid.

## Examples

\`\`\`js
evalRPN(["2","1","+","3","*"]);
// => 9  ((2+1)*3)

evalRPN(["4","13","5","/","+"]);
// => 6  (4+(13/5))
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if ("+-*/".includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(t));
    }
  }
  return stack[0];
}
\`\`\`

</details>

## Resources

- [Evaluate Reverse Polish Notation — LeetCode](https://leetcode.com/problems/evaluate-reverse-polish-notation/)`,

  starterCode: `/**
 * Evaluate an expression in Reverse Polish Notation.
 * @param {string[]} tokens
 * @returns {number}
 */
function evalRPN(tokens) {
  // your implementation
}`,

  solution: `function evalRPN(tokens) {
  const stack = [];
  for (const t of tokens) {
    if ("+-*/".includes(t)) {
      const b = stack.pop(), a = stack.pop();
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(parseInt(t));
    }
  }
  return stack[0];
}`,

  harness: `function solve(input) { return evalRPN(input.tokens); }`,

  tests: [
    { id: "basic", description: "(2+1)*3 = 9", input: { tokens: ["2","1","+","3","*"] }, expected: 9, isHidden: false },
    { id: "division", description: "4+(13/5) = 6", input: { tokens: ["4","13","5","/","+"] }, expected: 6, isHidden: false },
    { id: "complex", description: "Complex expression", input: { tokens: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"] }, expected: 22, isHidden: false },
    { id: "single-num", description: "Single number", input: { tokens: ["42"] }, expected: 42, isHidden: true },
    { id: "negative", description: "Negative result", input: { tokens: ["3","5","-"] }, expected: -2, isHidden: true },
    { id: "trunc-neg", description: "Division truncates toward zero", input: { tokens: ["7","-3","/"] }, expected: -2, isHidden: true },
  ],
};
