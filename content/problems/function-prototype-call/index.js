export const problem = {
  slug: "function-prototype-call",  category: "js-75",
  title: "Function.prototype.call",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Function.prototype.call() function.",
  problemMdx: "## Overview\n\nImplement `fnCall(fn, thisArg, ...args)` that simulates `fn.call(thisArg, ...args)`.\n\n## Constraints\n\n- Do not use `Function.prototype.call` or `Function.prototype.apply`.\n\n## Examples\n\n```js\nfunction greet(greeting) { return greeting + ' ' + this.name; }\nfnCall(greet, { name: 'Bob' }, 'Hi'); // 'Hi Bob'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction fnCall(fn, thisArg, ...args) {\n  const ctx = Object(thisArg);\n  const key = Symbol();\n  ctx[key] = fn;\n  const result = ctx[key](...args);\n  delete ctx[key];\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Simulate Function.prototype.call.\n * @param {Function} fn\n * @param {*} thisArg\n * @param {...*} args\n * @returns {*}\n */\nfunction fnCall(fn, thisArg, ...args) {\n  // your implementation\n}",
  solution: "function fnCall(fn, thisArg, ...args) {\n  const ctx = Object(thisArg);\n  const key = Symbol();\n  ctx[key] = fn;\n  const result = ctx[key](...args);\n  delete ctx[key];\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  function add(a, b) { return (this.base || 0) + a + b; }\n  return fnCall(add, input.thisArg, ...input.args);\n}",
  tests: [
  {
    "id": "basic",
    "description": "With context",
    "input": {
      "thisArg": {
        "base": 10
      },
      "args": [
        1,
        2
      ]
    },
    "expected": 13,
    "isHidden": false
  },
  {
    "id": "no-ctx",
    "description": "No base",
    "input": {
      "thisArg": {},
      "args": [
        3,
        4
      ]
    },
    "expected": 7,
    "isHidden": false
  },
  {
    "id": "base",
    "description": "Base 50",
    "input": {
      "thisArg": {
        "base": 50
      },
      "args": [
        5,
        5
      ]
    },
    "expected": 60,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Negatives",
    "input": {
      "thisArg": {
        "base": 0
      },
      "args": [
        -1,
        -2
      ]
    },
    "expected": -3,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Zeros",
    "input": {
      "thisArg": {
        "base": 50
      },
      "args": [
        0,
        0
      ]
    },
    "expected": 50,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Large",
    "input": {
      "thisArg": {
        "base": 999
      },
      "args": [
        0,
        1
      ]
    },
    "expected": 1000,
    "isHidden": true
  }
],
};
