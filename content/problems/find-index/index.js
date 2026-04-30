export const problem = {
  slug: "find-index",  category: "js-75",
  title: "Find Index",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the index of the first element satisfying a testing function.",
  problemMdx: "## Overview\n\nImplement `findIndex(array, predicate)` — returns the index of the first match, or -1.\n\n## Examples\n\n```js\nfindIndex([1,2,3,4], x => x > 2); // 2\nfindIndex([1,2], x => x > 5); // -1\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction findIndex(array, predicate) {\n  for (let i = 0; i < array.length; i++) {\n    if (predicate(array[i], i, array)) return i;\n  }\n  return -1;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find index of first element passing predicate.\n * @param {Array} array\n * @param {Function} predicate\n * @returns {number}\n */\nfunction findIndex(array, predicate) {\n  // your implementation\n}",
  solution: "function findIndex(array, predicate) {\n  for (let i = 0; i < array.length; i++) {\n    if (predicate(array[i], i, array)) return i;\n  }\n  return -1;\n}",
  harness: "\nfunction solve(input) {\n  return findIndex(input.array, x => input.op === 'gt' ? x > input.threshold : x === input.threshold);\n}",
  tests: [
  {
    "id": "found",
    "description": "Found at index 2",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "gt",
      "threshold": 2
    },
    "expected": 2,
    "isHidden": false
  },
  {
    "id": "not-found",
    "description": "Not found",
    "input": {
      "array": [
        1,
        2
      ],
      "op": "gt",
      "threshold": 5
    },
    "expected": -1,
    "isHidden": false
  },
  {
    "id": "first",
    "description": "First element",
    "input": {
      "array": [
        5,
        1,
        2
      ],
      "op": "gt",
      "threshold": 3
    },
    "expected": 0,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Last element",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "op": "eq",
      "threshold": 3
    },
    "expected": 2,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty",
    "input": {
      "array": [],
      "op": "gt",
      "threshold": 0
    },
    "expected": -1,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Multiple matches",
    "input": {
      "array": [
        1,
        3,
        5,
        7
      ],
      "op": "gt",
      "threshold": 2
    },
    "expected": 1,
    "isHidden": true
  }
],
};
