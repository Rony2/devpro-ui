export const problem = {
  slug: "array-prototype-at",  category: "js-75",
  title: "Array.prototype.at",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Prototypes"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement the Array.prototype.at() method.",
  problemMdx: "## Overview\n\nImplement `at(array, index)` that returns the element at the given index, supporting negative indices.\n\n## Examples\n\n```js\nat([1,2,3], 0); // 1\nat([1,2,3], -1); // 3\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction at(array, index) {\n  const i = index < 0 ? array.length + index : index;\n  return array[i];\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Access array element by index (supports negative).\n * @param {Array} array\n * @param {number} index\n * @returns {*}\n */\nfunction at(array, index) {\n  // your implementation\n}",
  solution: "function at(array, index) {\n  const i = index < 0 ? array.length + index : index;\n  return array[i];\n}",
  harness: "\nfunction solve(input) { return at(input.array, input.index); }",
  tests: [
  {
    "id": "positive",
    "description": "Positive index",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "index": 0
    },
    "expected": 1,
    "isHidden": false
  },
  {
    "id": "negative",
    "description": "Negative index",
    "input": {
      "array": [
        1,
        2,
        3
      ],
      "index": -1
    },
    "expected": 3,
    "isHidden": false
  },
  {
    "id": "middle",
    "description": "Middle element",
    "input": {
      "array": [
        "a",
        "b",
        "c",
        "d"
      ],
      "index": 2
    },
    "expected": "c",
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "-2 index",
    "input": {
      "array": [
        10,
        20,
        30
      ],
      "index": -2
    },
    "expected": 20,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Out of bounds",
    "input": {
      "array": [
        1,
        2
      ],
      "index": 5
    },
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Last element",
    "input": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "index": 4
    },
    "expected": 5,
    "isHidden": true
  }
],
};
