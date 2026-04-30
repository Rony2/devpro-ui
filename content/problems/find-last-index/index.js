export const problem = {
  slug: "find-last-index",  category: "js-75",
  title: "Find Last Index",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that returns the index of the last element satisfying a testing function.",
  problemMdx: "## Overview\n\nImplement `findLastIndex(array, predicate)` — returns the index of the last match, or -1.\n\n## Examples\n\n```js\nfindLastIndex([1,2,3,4], x => x > 2); // 3\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction findLastIndex(array, predicate) {\n  for (let i = array.length - 1; i >= 0; i--) {\n    if (predicate(array[i], i, array)) return i;\n  }\n  return -1;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Find index of last element passing predicate.\n * @param {Array} array\n * @param {Function} predicate\n * @returns {number}\n */\nfunction findLastIndex(array, predicate) {\n  // your implementation\n}",
  solution: "function findLastIndex(array, predicate) {\n  for (let i = array.length - 1; i >= 0; i--) {\n    if (predicate(array[i], i, array)) return i;\n  }\n  return -1;\n}",
  harness: "\nfunction solve(input) {\n  return findLastIndex(input.array, x => input.op === 'gt' ? x > input.threshold : x === input.threshold);\n}",
  tests: [
  {
    "id": "found",
    "description": "Last > 2",
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
    "expected": 3,
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
    "id": "single-match",
    "description": "Single match first",
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
    "description": "All match",
    "input": {
      "array": [
        3,
        4,
        5
      ],
      "op": "gt",
      "threshold": 2
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
    "description": "Equal match",
    "input": {
      "array": [
        1,
        2,
        3,
        2
      ],
      "op": "eq",
      "threshold": 2
    },
    "expected": 3,
    "isHidden": true
  }
],
};
