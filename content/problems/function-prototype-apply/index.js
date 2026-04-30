export const problem = {
  slug: "function-prototype-apply",  category: "js-75",
  title: "Function.prototype.apply",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Function.prototype.apply() function.",
  problemMdx: "## Overview\n\nImplement `fnApply(fn, thisArg, args)` that simulates `fn.apply(thisArg, args)`.\n\n## Constraints\n\n- Do not use `Function.prototype.apply` or `Function.prototype.call`.\n\n## Examples\n\n```js\nfunction greet(greeting) { return greeting + ' ' + this.name; }\nfnApply(greet, { name: 'Alice' }, ['Hello']); // 'Hello Alice'\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction fnApply(fn, thisArg, args) {\n  const ctx = Object(thisArg);\n  const key = Symbol();\n  ctx[key] = fn;\n  const result = ctx[key](...(args || []));\n  delete ctx[key];\n  return result;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Simulate Function.prototype.apply.\n * @param {Function} fn\n * @param {*} thisArg\n * @param {Array} args\n * @returns {*}\n */\nfunction fnApply(fn, thisArg, args) {\n  // your implementation\n}",
  solution: "function fnApply(fn, thisArg, args) {\n  const ctx = Object(thisArg);\n  const key = Symbol();\n  ctx[key] = fn;\n  const result = ctx[key](...(args || []));\n  delete ctx[key];\n  return result;\n}",
  harness: "\nfunction solve(input) {\n  function add(a, b) { return (this.base || 0) + a + b; }\n  return fnApply(add, input.thisArg, input.args);\n}",
  tests: [
  {
    "id": "basic",
    "description": "With this context",
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
    "id": "no-this",
    "description": "No context needed",
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
    "id": "base-100",
    "description": "Base 100",
    "input": {
      "thisArg": {
        "base": 100
      },
      "args": [
        5,
        5
      ]
    },
    "expected": 110,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Negative args",
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
    "description": "Zero args",
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
    "description": "Large base",
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
