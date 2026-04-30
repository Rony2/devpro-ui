export const problem = {
  slug: "function-prototype-bind",  category: "js-75",
  title: "Function.prototype.bind",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Prototypes"],
  companies: ["Meta","Google","Stripe"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Function.prototype.bind() function.",
  problemMdx: "## Overview\n\nImplement `fnBind(fn, thisArg, ...boundArgs)` that returns a new function with `this` bound to `thisArg` and initial arguments pre-filled.\n\n## Constraints\n\n- Do not use `Function.prototype.bind`.\n\n## Examples\n\n```js\nfunction add(a, b) { return this.x + a + b; }\nconst bound = fnBind(add, { x: 10 }, 1);\nbound(2); // 13\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction fnBind(fn, thisArg, ...boundArgs) {\n  return function(...args) {\n    const ctx = Object(thisArg);\n    const key = Symbol();\n    ctx[key] = fn;\n    const result = ctx[key](...boundArgs, ...args);\n    delete ctx[key];\n    return result;\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Simulate Function.prototype.bind.\n * @param {Function} fn\n * @param {*} thisArg\n * @param {...*} boundArgs\n * @returns {Function}\n */\nfunction fnBind(fn, thisArg, ...boundArgs) {\n  // your implementation\n}",
  solution: "function fnBind(fn, thisArg, ...boundArgs) {\n  return function(...args) {\n    const ctx = Object(thisArg);\n    const key = Symbol();\n    ctx[key] = fn;\n    const result = ctx[key](...boundArgs, ...args);\n    delete ctx[key];\n    return result;\n  };\n}",
  harness: "\nfunction solve(input) {\n  function add(a, b) { return (this.base || 0) + a + b; }\n  const bound = fnBind(add, input.thisArg, ...input.boundArgs);\n  return bound(...input.callArgs);\n}",
  tests: [
  {
    "id": "basic",
    "description": "Bound context + partial",
    "input": {
      "thisArg": {
        "base": 10
      },
      "boundArgs": [
        1
      ],
      "callArgs": [
        2
      ]
    },
    "expected": 13,
    "isHidden": false
  },
  {
    "id": "no-partial",
    "description": "No partial args",
    "input": {
      "thisArg": {
        "base": 5
      },
      "boundArgs": [],
      "callArgs": [
        3,
        4
      ]
    },
    "expected": 12,
    "isHidden": false
  },
  {
    "id": "all-bound",
    "description": "All args bound",
    "input": {
      "thisArg": {
        "base": 100
      },
      "boundArgs": [
        5,
        5
      ],
      "callArgs": []
    },
    "expected": 110,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "No base",
    "input": {
      "thisArg": {},
      "boundArgs": [
        10
      ],
      "callArgs": [
        20
      ]
    },
    "expected": 30,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negative",
    "input": {
      "thisArg": {
        "base": -10
      },
      "boundArgs": [
        5
      ],
      "callArgs": [
        5
      ]
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Zeros",
    "input": {
      "thisArg": {
        "base": 0
      },
      "boundArgs": [
        0
      ],
      "callArgs": [
        0
      ]
    },
    "expected": 0,
    "isHidden": true
  }
],
};
