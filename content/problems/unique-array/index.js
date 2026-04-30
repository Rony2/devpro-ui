export const problem = {
  slug: "unique-array",  category: "js-75",
  title: "Unique Array",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function to remove all duplicate values from an array.",
  problemMdx: "## Overview\n\nImplement `uniqueArray(array)` that returns a new array with duplicates removed, preserving first occurrence order.\n\n## Examples\n\n```js\nuniqueArray([1,2,2,3,3,3]); // [1,2,3]\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction uniqueArray(array) {\n  return [...new Set(array)];\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Remove duplicates from array.\n * @param {Array} array\n * @returns {Array}\n */\nfunction uniqueArray(array) {\n  // your implementation\n}",
  solution: "function uniqueArray(array) {\n  return [...new Set(array)];\n}",
  harness: "\nfunction solve(input) { return uniqueArray(input.array); }",
  tests: [
  {
    "id": "basic",
    "description": "Duplicates removed",
    "input": {
      "array": [
        1,
        2,
        2,
        3,
        3,
        3
      ]
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "no-dups",
    "description": "No duplicates",
    "input": {
      "array": [
        1,
        2,
        3
      ]
    },
    "expected": [
      1,
      2,
      3
    ],
    "isHidden": false
  },
  {
    "id": "strings",
    "description": "String values",
    "input": {
      "array": [
        "a",
        "b",
        "a",
        "c"
      ]
    },
    "expected": [
      "a",
      "b",
      "c"
    ],
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": []
    },
    "expected": [],
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Single element",
    "input": {
      "array": [
        5
      ]
    },
    "expected": [
      5
    ],
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "All same",
    "input": {
      "array": [
        1,
        1,
        1,
        1
      ]
    },
    "expected": [
      1
    ],
    "isHidden": true
  }
],
};
