export const problem = {
  slug: "drop-while",  category: "js-75",
  title: "Drop While",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that excludes elements from the beginning until predicate returns false.",
  problemMdx: "## Overview\n\nImplement `dropWhile(array, predicate)` that drops elements from the start while `predicate` returns true.\n\n## Examples\n\n```js\ndropWhile([1,2,3,4], x => x < 3); // [3,4]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction dropWhile(array, predicate) {\n  let i = 0;\n  while (i < array.length && predicate(array[i], i, array)) i++;\n  return array.slice(i);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Drop elements from start while predicate is true.\n * @param {Array} array\n * @param {Function} predicate\n * @returns {Array}\n */\nfunction dropWhile(array, predicate) {\n  // your implementation\n}",
  solution: "function dropWhile(array, predicate) {\n  let i = 0;\n  while (i < array.length && predicate(array[i], i, array)) i++;\n  return array.slice(i);\n}",
  harness: "\nfunction solve(input) {\n  return dropWhile(input.array, x => input.op === 'lt' ? x < input.threshold : x > input.threshold);\n}",
  tests: [
  {
    "id": "basic",
    "description": "Drop while < 3",
    "input": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "op": "lt",
      "threshold": 3
    },
    "expected": [
      3,
      4
    ],
    "isHidden": false
  },
  {
    "id": "none",
    "description": "None dropped",
    "input": {
      "array": [
        5,
        6,
        7
      ],
      "op": "lt",
      "threshold": 3
    },
    "expected": [
      5,
      6,
      7
    ],
    "isHidden": false
  },
  {
    "id": "all",
    "description": "All dropped",
    "input": {
      "array": [
        1,
        2
      ],
      "op": "lt",
      "threshold": 10
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Drop while > 3",
    "input": {
      "array": [
        5,
        4,
        3,
        2
      ],
      "op": "gt",
      "threshold": 3
    },
    "expected": [
      3,
      2
    ],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Empty",
    "input": {
      "array": [],
      "op": "lt",
      "threshold": 1
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Single element kept",
    "input": {
      "array": [
        1,
        5
      ],
      "op": "lt",
      "threshold": 2
    },
    "expected": [
      5
    ],
    "isHidden": true
  }
],
};
