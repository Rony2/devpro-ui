export const problem = {
  slug: "mean",  category: "js-75",
  title: "Mean",
  difficulty: "easy",
  type: "coding",
  topics: ["JavaScript","Arrays","Math"],
  companies: ["Google","Meta","Amazon"],
  estimatedMinutes: 10,
  published: true,
  addedAt: "2026-04-01",
  description: "Implement a function that finds the mean of the values inside an array.",
  problemMdx: "## Overview\n\nImplement `mean(array)` that returns the arithmetic mean of all numbers.\n\n## Constraints\n\n- Input contains only numbers.\n- Return 0 for empty array.\n\n## Examples\n\n```js\nmean([1, 2, 3]); // 2\nmean([1, 5, 3, 7]); // 4\n```\n\n## Solution\n\n<details>\n<summary>Reveal solution</summary>\n\n\`\`\`js\nfunction mean(array) {\n  if (array.length === 0) return 0;\n  return array.reduce((s, n) => s + n, 0) / array.length;\n}\n\`\`\`\n\n</details>",
  starterCode: "/**\n * Compute the arithmetic mean.\n * @param {number[]} array\n * @returns {number}\n */\nfunction mean(array) {\n  // your implementation\n}",
  solution: "function mean(array) {\n  if (array.length === 0) return 0;\n  return array.reduce((s, n) => s + n, 0) / array.length;\n}",
  harness: "\nfunction solve(input) { return mean(input.array); }",
  tests: [
  {
    "id": "basic",
    "description": "Simple mean",
    "input": {
      "array": [
        1,
        2,
        3
      ]
    },
    "expected": 2,
    "isHidden": false
  },
  {
    "id": "four",
    "description": "Four values",
    "input": {
      "array": [
        1,
        5,
        3,
        7
      ]
    },
    "expected": 4,
    "isHidden": false
  },
  {
    "id": "single",
    "description": "Single element",
    "input": {
      "array": [
        10
      ]
    },
    "expected": 10,
    "isHidden": false
  },
  {
    "id": "h1",
    "description": "Empty",
    "input": {
      "array": []
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h2",
    "description": "Negative numbers",
    "input": {
      "array": [
        -2,
        -4,
        6
      ]
    },
    "expected": 0,
    "isHidden": true
  },
  {
    "id": "h3",
    "description": "Decimal result",
    "input": {
      "array": [
        1,
        2
      ]
    },
    "expected": 1.5,
    "isHidden": true
  }
],
};
