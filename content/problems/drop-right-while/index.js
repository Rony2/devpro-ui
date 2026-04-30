export const problem = {
  slug: "drop-right-while",  category: "js-75",
  title: "Drop Right While",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Functions"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that excludes elements from the end until predicate returns false.",
  problemMdx: "## Overview\n\nImplement `dropRightWhile(array, predicate)` that removes elements from the end while `predicate` is true.\n\n## Examples\n\n```js\ndropRightWhile([1,2,3,4], x => x > 2); // [1,2]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction dropRightWhile(array, predicate) {\n  let i = array.length - 1;\n  while (i >= 0 && predicate(array[i], i, array)) i--;\n  return array.slice(0, i + 1);\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Drop elements from end while predicate is true.\n * @param {Array} array\n * @param {Function} predicate\n * @returns {Array}\n */\nfunction dropRightWhile(array, predicate) {\n  // your implementation\n}",
  solution: "function dropRightWhile(array, predicate) {\n  let i = array.length - 1;\n  while (i >= 0 && predicate(array[i], i, array)) i--;\n  return array.slice(0, i + 1);\n}",
  harness: "\nfunction solve(input) {\n  return dropRightWhile(input.array, x => input.op === 'gt' ? x > input.threshold : x < input.threshold);\n}",
  tests: [
  {
    "id": "basic",
    "description": "Drop while > 2",
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
    "expected": [
      1,
      2
    ],
    "isHidden": false
  },
  {
    "id": "none",
    "description": "None dropped",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "op": "gt",
      "threshold": 5
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "all",
    "description": "All dropped",
    "input": {
      "array": [
        5,
        6,
        7
      ],
      "op": "gt",
      "threshold": 1
    },
    "expected": [],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Drop < 3 from right",
    "input": {
      "array": [
        5,
        4,
        1,
        2
      ],
      "op": "lt",
      "threshold": 3
    },
    "expected": [
      5,
      4
    ],
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
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Single kept",
    "input": {
      "array": [
        5,
        1
      ],
      "op": "lt",
      "threshold": 3
    },
    "expected": [
      5
    ],
    "isHidden": true
  }
],
};
