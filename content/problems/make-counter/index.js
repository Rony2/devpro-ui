export const problem = {
  slug: "make-counter",  category: "js-75",
  title: "Make Counter",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Closures","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that accepts an integer value and returns a function that can be repeatedly called to return increasing values.",
  problemMdx: "## Overview\n\nImplement `makeCounter(initialValue)` that returns a function. Each call returns the current value and increments by 1.\n\n## Constraints\n\n- The initial value is always an integer.\n- The returned function takes no arguments.\n\n## Examples\n\n```js\nconst counter = makeCounter(5);\ncounter(); // 5\ncounter(); // 6\ncounter(); // 7\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction makeCounter(initialValue) {\n  let count = initialValue;\n  return function() { return count++; };\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Create a counter function starting from initialValue.\n * @param {number} initialValue\n * @returns {Function}\n */\nfunction makeCounter(initialValue) {\n  // your implementation\n}",
  solution: "function makeCounter(initialValue) {\n  let count = initialValue;\n  return function() { return count++; };\n}",
  harness: "\nfunction solve(input) {\n  const counter = makeCounter(input.start);\n  const results = [];\n  for (let i = 0; i < input.calls; i++) results.push(counter());\n  return results;\n}",
  tests: [
  {
    "id": "basic",
    "description": "Counter from 5",
    "input": {
      "start": 5,
      "calls": 3
    },
    "expected": [
      5,
      6,
      7
    ],
    "isHidden": false
  },
  {
    "id": "from-zero",
    "description": "Counter from 0",
    "input": {
      "start": 0,
      "calls": 4
    },
    "expected": [
      0,
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single call",
    "input": {
      "start": 10,
      "calls": 1
    },
    "expected": [
      10
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Large start",
    "input": {
      "start": 100,
      "calls": 3
    },
    "expected": [
      100,
      101,
      102
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Many calls",
    "input": {
      "start": 0,
      "calls": 6
    },
    "expected": [
      0,
      1,
      2,
      3,
      4,
      5
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Negative start",
    "input": {
      "start": -2,
      "calls": 5
    },
    "expected": [
      -2,
      -1,
      0,
      1,
      2
    ],
    "isHidden": true
  }
],
};
