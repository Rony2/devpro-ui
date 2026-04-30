export const problem = {
  slug: "sum",  category: "js-75",
  title: "Sum",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Functions","Closures"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that can be continuously called to add numbers: sum(1)(2)(3)().",
  problemMdx: "## Overview\n\nImplement `sum(a)` that returns a function accepting more numbers. When called with no arguments, returns the total.\n\n## Examples\n\n```js\nsum(1)(2)(3)(); // 6\nsum(5)(); // 5\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction sum(a) {\n  return function next(b) {\n    if (b === undefined) return a;\n    return sum(a + b);\n  };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Chainable sum function.\n * @param {number} a\n * @returns {Function|number}\n */\nfunction sum(a) {\n  // your implementation\n}",
  solution: "function sum(a) {\n  return function next(b) {\n    if (b === undefined) return a;\n    return sum(a + b);\n  };\n}",
  harness: "\nfunction solve(input) {\n  let fn = sum(input.values[0]);\n  for (let i = 1; i < input.values.length; i++) fn = fn(input.values[i]);\n  return fn();\n}",
  tests: [
  {
    "id": "three",
    "description": "Three numbers",
    "input": {
      "values": [
        1,
        2,
        3
      ]
    },
    "expected": 6,
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single number",
    "input": {
      "values": [
        5
      ]
    },
    "expected": 5,
    "isHidden": false
  },
  {
    "id": "many",
    "description": "Five numbers",
    "input": {
      "values": [
        1,
        2,
        3,
        4,
        5
      ]
    },
    "expected": 15,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "With zero",
    "input": {
      "values": [
        10,
        0,
        5
      ]
    },
    "expected": 15,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negatives",
    "input": {
      "values": [
        -1,
        -2,
        -3
      ]
    },
    "expected": -6,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Large",
    "input": {
      "values": [
        100,
        200,
        300
      ]
    },
    "expected": 600,
    "isHidden": true
  }
],
};
