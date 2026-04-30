export const problem = {
  slug: "basic-calculator",  category: "grind-75",
  title: "Basic Calculator",
  difficulty: "hard",
  type: "coding",
  topics: ["Algorithms", "Stack", "Math", "Strings"],
  companies: ["Google", "Meta"],
  estimatedMinutes: 40,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a basic calculator to evaluate a string expression with +, -, and parentheses.",

  problemMdx: `## Overview

Implement a basic calculator to evaluate a simple expression string containing:
- digits (\`0-9\`)
- \`+\`, \`-\`
- \`(\`, \`)\`
- spaces

## Constraints

- \`1 <= s.length <= 30,000\`
- \`s\` consists of digits, \`+\`, \`-\`, \`(\`, \`)\`, and spaces.
- The expression is always valid.

## Examples

\`\`\`js
calculate("1 + 1");           // => 2
calculate(" 2-1 + 2 ");       // => 3
calculate("(1+(4+5+2)-3)+(6+8)"); // => 23
\`\`\`

## Solution

<details>
<summary>Reveal solution</summary>

\`\`\`js
function calculate(s) {
  let result = 0, num = 0, sign = 1;
  const stack = [];
  for (const c of s) {
    if (c >= '0' && c <= '9') {
      num = num * 10 + (c - '0');
    } else if (c === '+' || c === '-') {
      result += sign * num;
      num = 0;
      sign = c === '+' ? 1 : -1;
    } else if (c === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop(); // sign
      result += stack.pop(); // prev result
    }
  }
  return result + sign * num;
}
\`\`\`

</details>

## Resources

- [Basic Calculator — LeetCode](https://leetcode.com/problems/basic-calculator/)`,

  starterCode: `/**
 * Evaluate a basic expression with +, -, and parentheses.
 * @param {string} s
 * @returns {number}
 */
function calculate(s) {
  // your implementation
}`,

  solution: `function calculate(s) {
  let result = 0, num = 0, sign = 1;
  const stack = [];
  for (const c of s) {
    if (c >= '0' && c <= '9') {
      num = num * 10 + (c - '0');
    } else if (c === '+' || c === '-') {
      result += sign * num;
      num = 0;
      sign = c === '+' ? 1 : -1;
    } else if (c === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (c === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop();
      result += stack.pop();
    }
  }
  return result + sign * num;
}`,

  harness: `function solve(input) { return calculate(input.s); }`,

  tests: [
    { id: "simple", description: "'1 + 1' → 2", input: { s: "1 + 1" }, expected: 2, isHidden: false },
    { id: "subtract", description: "' 2-1 + 2 ' → 3", input: { s: " 2-1 + 2 " }, expected: 3, isHidden: false },
    { id: "nested", description: "Nested parens → 23", input: { s: "(1+(4+5+2)-3)+(6+8)" }, expected: 23, isHidden: false },
    { id: "neg-paren", description: "Negative of paren", input: { s: "1-(5)" }, expected: -4, isHidden: true },
    { id: "double-neg", description: "Double nested neg", input: { s: "1-(2-(3-(4-5)))" }, expected: 3, isHidden: true },
    { id: "single-num", description: "Single number", input: { s: "42" }, expected: 42, isHidden: true },
  ],
};
